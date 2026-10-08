-- =====================================================================================
-- Prompt Studio — PostgreSQL Schema (DDL v0.3, Migration Candidate)
-- =====================================================================================
-- Final artifact of the schema pipeline:
--   PRD → prompt-studio-logical-schema.md → prompt-studio-domain-types.ts → [THIS FILE]
-- Supersedes the retired Gemini "Physical Model v0.1" (PRD §27.4).
-- Grounded in verified OSS schemas (Langfuse, Opik, Agenta, Helicone, Promptfoo,
-- Dify, Espanso, ComfyUI PromptManager) — see oss-landscape.md §6.40.
--
-- MERGE DECISIONS (this file consolidates two SQL drafts):
--   SQL-D1  Body/variant model ... NORMALIZED (ChatGPT): prompts hold metadata only;
--           bodies live in prompt_versions; prompt_versions.variant_id is NOT NULL
--           (every prompt has ≥1 variant; capture creates a default variant + first version).
--   SQL-D2  Batch status ......... DUAL columns (Claude): run_status (runtime) +
--           retention_status (GC). Do NOT collapse into one enum.
--   SQL-D3  License enum ......... HYPHEN values + 'link-only' (Claude); matches PRD/domain-types.
--   SQL-D4  Variable storage ..... NORMALIZED prompt_variables table (ChatGPT).
--   SQL-D5  Selected tokens ...... selected_visual_tokens table (ChatGPT).
--
-- Adopted hardening (ChatGPT): BEGIN/COMMIT, set_updated_at() triggers, idempotent
--   enum/table/index creation, version↔variant parent-match trigger, DEFERRABLE FKs,
--   value CHECKs, hosted_ui execution-mode CHECK, rendered_prompt_snapshots.
-- Kept completeness (Claude): usage records, style profiles, prompt blocks, project
--   kits, trigger/overlay/insertion profiles, token-conflict-rule table, rich target caps.
--
-- v0.2.1 patches (Gemini review):
--   A. payload_type CHECK → proper ENUM type (extensibility)
--   B. idx_runs_batch partial index (WHERE batch_id IS NOT NULL) for cascade perf
--   F. CHECK constraint on prompt_variables blocking allow_recursive_resolution
--      on variant-scoped rows (DB-layer use_only protection)
--   REJECTED D: polymorphic prompt_scores kept (PRD design decision; entity_type bounded by enum)
--   REJECTED E: multi-column GIN(owner_id, tags) invalid — PG GIN cannot mix scalar+array
--
-- v0.2.2 patches (ChatGPT review):
--   1. REMOVED Gemini-F recursive CHECK — variant_id ≠ use_only; app-layer enforces
--   2. Added PromptVersion immutability trigger (committed versions cannot be mutated)
--   3. Added default_variant_id same-prompt enforcement trigger
--   5. prompt_usage_records now references version_id UUID (not bare INTEGER)
--   6. prompts_trigger_unique expanded to (owner_id, owner_type, trigger)
--   7. JSONB shape checks on prompt_variables (typeof = 'object')
--   REJECTED 4: polymorphic prompt_scores — same rationale as Gemini-D
--
-- v0.2.2b patches (ChatGPT review round 2):
--   2b. Immutability trigger now unconditional (all versions, not just commit_hash).
--       Body fields allow non-null→null transition for retention/cold-storage.
--   3b. JSONB shape checks extended to prompt_runs, pack_manifests, workflows.
--
-- Requires PostgreSQL 14+ and pgcrypto (gen_random_uuid()).
-- =====================================================================================

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================================================================================
-- 0. Helper: auto-maintain updated_at
-- =====================================================================================
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- =====================================================================================
-- 1. ENUM TYPES (idempotent)
-- =====================================================================================
DO $$ BEGIN CREATE TYPE owner_type AS ENUM ('user','team','project','admin'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE prompt_type AS ENUM ('chat','writing','coding','image','video','audio','agent','system','workflow','evaluation','template'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE prompt_status AS ENUM ('inbox','draft','active','needs_review','deprecated','archived'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE visibility_type AS ENUM ('private','team','public'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
-- SQL-D3: hyphen values + link-only
DO $$ BEGIN CREATE TYPE license_status AS ENUM ('owned','cc0','cc-by','open-source','personal-use-only','unknown','proprietary','link-only'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE verification_status AS ENUM ('unverified','verified','needs_review','expired','conflict'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE prompt_source_kind AS ENUM ('user_authored','imported','clipped','seeded','generated','unknown'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
-- Gemini-A: payload_type as proper ENUM (was CHECK constraint)
DO $$ BEGIN CREATE TYPE payload_type AS ENUM ('resolved_prompt','redacted_prompt','raw_provider_request','raw_provider_response','output_body','compressed_trace'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE prompt_variant_type AS ENUM ('model','channel','audience','language','modality','experiment','workflow','custom'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE body_storage_state AS ENUM ('full','redacted','hash_only','cold_storage','soft_pruned'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE storage_mode AS ENUM ('store_resolved_prompt','store_redacted_prompt','store_hash_only','do_not_store_prompt'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE execution_status AS ENUM ('queued','running','succeeded','failed','cancelled'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
-- SQL-D2: two distinct batch status enums
DO $$ BEGIN CREATE TYPE batch_run_status AS ENUM ('queued','running','partial_success_running','partial_success','succeeded','failed','cancelled'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE batch_retention_status AS ENUM ('active','partial_purged','empty_purged'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE provider_type AS ENUM ('hosted_api','hosted_ui','local_llm','local_image','specialized_app','sandbox'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE execution_mode AS ENUM ('api_run','local_run','sandbox_run','insert_only','manual_copy'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE use_only_enforcement_level AS ENUM ('none','weak','strong','sandbox_required'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE use_only_weak_target_policy AS ENUM ('block','owner_override_required','allow_with_visible_downgrade_warning'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE permission_level AS ENUM ('owner','editor','viewer','use_only'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE permission_context AS ENUM ('private','shared_project','shared_team','view_only','use_only','export_restricted','license_restricted'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE variable_type AS ENUM ('text','long_text','dropdown','multi_select','boolean','date','number','conditional','json','file_ref','document_ref','contact_ref','project_ref','image_ref'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE variable_env_layer AS ENUM ('system_default','global','prompt','variant','pack','project_kit','runtime'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE visual_token_category AS ENUM ('style','medium','camera','lighting','composition','color_palette','render','mood','artist','quality','custom'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE token_conflict_behavior AS ENUM ('block','warn','allow','auto_replace'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE negative_prompt_mode AS ENUM ('inline_flag','separate_field','unsupported'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE style_profile_kind AS ENUM ('tone','brand_voice','writing','visual','coding'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE score_entity_type AS ENUM ('run','trace','span','test_bench_item','output_asset','prompt_version'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE score_source AS ENUM ('human','assertion','llm_judge','system','imported'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE score_data_type AS ENUM ('numeric','categorical','boolean'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE asset_type AS ENUM ('text','image','video','audio','file'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE usage_event AS ENUM ('run','copy','insert','export','share','test_run'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE span_type AS ENUM ('model_generation','tool_call','retrieval','workflow_step','event','span'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE workflow_step_type AS ENUM ('prompt','inline_prompt','tool','retrieval','merge','condition','transform','human_review'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE workflow_output_kind AS ENUM ('raw_text','markdown','json','structured_fields','asset','boolean','number'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE workflow_merge_strategy AS ENUM ('choose_one','compare_side_by_side','concatenate','rank_and_select','manual_select'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE import_source_type AS ENUM ('prompt_pack','prompts_chat_csv','promptsource_yaml','json','markdown','browser_capture','manual'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE import_job_status AS ENUM ('queued','running','succeeded','partial_success','failed'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE import_item_status AS ENUM ('imported','skipped','failed','conflict','needs_review'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE credential_status AS ENUM ('active','revoked','expired','needs_reauth'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE credential_kind AS ENUM ('api_key','oauth_token','local_endpoint','team_gateway_secret'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE audit_event_type AS ENUM (
  'prompt_created','prompt_updated','prompt_deleted','prompt_restored','prompt_exported','pack_exported',
  'license_changed','visibility_changed','permission_granted','permission_revoked',
  'use_only_run_attempted','use_only_weak_target_blocked','use_only_downgraded_with_override',
  'secret_detected','secret_redacted','public_share_attempt_blocked',
  'execution_target_added','execution_target_removed','api_key_connection_changed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- =====================================================================================
-- 2. LICENSING & ORGANIZATION  [V1]
-- =====================================================================================
CREATE TABLE IF NOT EXISTS license_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license license_status NOT NULL DEFAULT 'unknown',
  source_url TEXT, license_source_url TEXT, license_captured_at TIMESTAMPTZ,
  attribution TEXT,
  verification_status verification_status NOT NULL DEFAULT 'unverified',
  is_shareable BOOLEAN NOT NULL DEFAULT FALSE,
  redistribution_allowed BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_license_metadata_updated BEFORE UPDATE ON license_metadata FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(240) NOT NULL,
  parent_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  owner_id VARCHAR(160) NOT NULL,
  owner_type owner_type NOT NULL DEFAULT 'user',
  is_builtin_scaffold BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (owner_id, owner_type, parent_id, name)
);
CREATE TRIGGER trg_folders_updated BEFORE UPDATE ON folders FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(160) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  owner_id VARCHAR(160), owner_type owner_type,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (owner_id, owner_type, slug)
);
CREATE TRIGGER trg_tags_updated BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =====================================================================================
-- 3. BUILDER / SYNTAX / VISUAL TOKENS  [V1 profiles; V2 tokens; V3 conflict rules]
-- =====================================================================================
CREATE TABLE IF NOT EXISTS syntax_profiles (
  id VARCHAR(160) PRIMARY KEY,                       -- slug
  name VARCHAR(240) NOT NULL,
  target_family VARCHAR(80) NOT NULL DEFAULT 'generic',
  profile_version VARCHAR(80) NOT NULL DEFAULT '1.0.0',
  render_rules JSONB NOT NULL DEFAULT '{}'::jsonb,
  parameter_rules JSONB NOT NULL DEFAULT '{}'::jsonb,
  negative_prompt_mode negative_prompt_mode,
  negative_prompt_rules JSONB NOT NULL DEFAULT '{}'::jsonb,
  conflict_rules JSONB NOT NULL DEFAULT '{}'::jsonb,  -- default behavior; per-token rules below
  is_builtin BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (target_family IN ('generic','chatgpt','claude','gemini','ollama','midjourney','stable_diffusion','flux','comfyui','custom'))
);
CREATE TRIGGER trg_syntax_profiles_updated BEFORE UPDATE ON syntax_profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS visual_tokens (                            -- [V2]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_text VARCHAR(240) NOT NULL,
  category visual_token_category NOT NULL,
  preview_ref TEXT,
  compatible_models TEXT[] NOT NULL DEFAULT '{}',
  synonyms TEXT[] NOT NULL DEFAULT '{}',
  incompatible_with UUID[] NOT NULL DEFAULT '{}',
  mutually_exclusive_group_id VARCHAR(160),
  source VARCHAR(20) NOT NULL DEFAULT 'builtin',      -- builtin | user
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  use_count INTEGER NOT NULL DEFAULT 0,
  syntax_profile_rules JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (category, token_text)
);
CREATE TRIGGER trg_visual_tokens_updated BEFORE UPDATE ON visual_tokens FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_visual_tokens_category ON visual_tokens(category);

CREATE TABLE IF NOT EXISTS syntax_profile_token_conflict_rules (      -- [V3] explicit per-model overrides
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  syntax_profile_id VARCHAR(160) NOT NULL REFERENCES syntax_profiles(id) ON DELETE CASCADE,
  token_id UUID NOT NULL REFERENCES visual_tokens(id) ON DELETE CASCADE,
  incompatible_with UUID[] NOT NULL DEFAULT '{}',
  mutually_exclusive_group_id VARCHAR(160),
  behavior token_conflict_behavior NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================================
-- 4. EXECUTION TARGETS  [V1 targets; V2 credentials/quota]   (rich capabilities kept)
-- =====================================================================================
CREATE TABLE IF NOT EXISTS execution_targets (
  id VARCHAR(160) PRIMARY KEY,                         -- slug
  name VARCHAR(240) NOT NULL,
  provider_type provider_type NOT NULL,
  provider_name VARCHAR(160) NOT NULL,
  model_name VARCHAR(160),
  endpoint_url TEXT,
  auth_mode VARCHAR(60),
  credential_owner_type owner_type,
  syntax_profile_id VARCHAR(160) REFERENCES syntax_profiles(id) ON DELETE SET NULL,
  execution_mode execution_mode NOT NULL,
  can_run_directly BOOLEAN NOT NULL DEFAULT TRUE,
  can_insert_only BOOLEAN NOT NULL DEFAULT FALSE,
  supports_text BOOLEAN NOT NULL DEFAULT TRUE,
  supports_image BOOLEAN NOT NULL DEFAULT FALSE,
  supports_video BOOLEAN NOT NULL DEFAULT FALSE,
  supports_audio BOOLEAN NOT NULL DEFAULT FALSE,
  supports_files BOOLEAN NOT NULL DEFAULT FALSE,
  supports_streaming BOOLEAN NOT NULL DEFAULT TRUE,
  supports_parallel_runs BOOLEAN NOT NULL DEFAULT TRUE,
  supports_tools BOOLEAN,
  supports_json_mode BOOLEAN,
  supports_system_messages BOOLEAN,
  supports_seed BOOLEAN,
  supports_negative_prompt BOOLEAN,
  supports_aspect_ratio BOOLEAN,
  context_window_tokens INTEGER,
  max_output_tokens INTEGER,
  cost_model VARCHAR(20),                              -- free|metered|subscription|unknown
  capability_source VARCHAR(20),                      -- manual|discovered|best_effort
  use_only_enforcement_level use_only_enforcement_level NOT NULL DEFAULT 'none',
  is_local BOOLEAN,
  is_team_controlled BOOLEAN,
  is_sandboxed BOOLEAN,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (auth_mode IS NULL OR auth_mode IN ('api_key','oauth','local','none','team_gateway')),
  -- hosted_ui targets are insert/copy unless an approved integration enables api_run
  CHECK (provider_type <> 'hosted_ui' OR execution_mode IN ('insert_only','manual_copy','api_run'))
);
CREATE TRIGGER trg_execution_targets_updated BEFORE UPDATE ON execution_targets FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_execution_targets_provider ON execution_targets(provider_type, provider_name, model_name);

CREATE TABLE IF NOT EXISTS execution_credentials (                    -- [V2]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_target_id VARCHAR(160) NOT NULL REFERENCES execution_targets(id) ON DELETE CASCADE,
  owner_id VARCHAR(160) NOT NULL,
  owner_type owner_type NOT NULL DEFAULT 'user',
  credential_kind credential_kind NOT NULL,
  secret_ref TEXT NOT NULL,                            -- secrets-vault pointer; NEVER inline
  status credential_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_execution_credentials_updated BEFORE UPDATE ON execution_credentials FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_execution_credentials_owner ON execution_credentials(owner_id, owner_type);

CREATE TABLE IF NOT EXISTS execution_quota_policies (                 -- [V2]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id VARCHAR(160),
  execution_target_id VARCHAR(160) REFERENCES execution_targets(id) ON DELETE CASCADE,
  daily_run_limit INTEGER,
  monthly_run_limit INTEGER,
  budget_limit NUMERIC(12,4),
  budget_currency VARCHAR(12),
  warn_before_expensive_run BOOLEAN NOT NULL DEFAULT TRUE,
  cancel_batch_on_cost_threshold NUMERIC(12,4),
  disabled_target_ids TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (daily_run_limit IS NULL OR daily_run_limit >= 0),
  CHECK (monthly_run_limit IS NULL OR monthly_run_limit >= 0)
);
CREATE TRIGGER trg_execution_quota_policies_updated BEFORE UPDATE ON execution_quota_policies FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =====================================================================================
-- 5. VARIABLES  [V1]   (SQL-D4: normalized prompt_variables table)
-- =====================================================================================
CREATE TABLE IF NOT EXISTS global_variables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id VARCHAR(160) NOT NULL, owner_type owner_type NOT NULL DEFAULT 'user',
  key VARCHAR(160) NOT NULL, label VARCHAR(240),
  type variable_type NOT NULL, value JSONB NOT NULL,
  params JSONB NOT NULL DEFAULT '{}'::jsonb,
  validation_rules JSONB NOT NULL DEFAULT '{}'::jsonb,
  safety_policy JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (owner_id, owner_type, key)
);
CREATE TRIGGER trg_global_variables_updated BEFORE UPDATE ON global_variables FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS variable_environments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope_type variable_env_layer NOT NULL,
  scope_id VARCHAR(160), owner_id VARCHAR(160),
  values JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_variable_environments_updated BEFORE UPDATE ON variable_environments FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_variable_environments_scope ON variable_environments(scope_type, scope_id);

CREATE TABLE IF NOT EXISTS style_profiles (                            -- [V1.5]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(240) NOT NULL, kind style_profile_kind NOT NULL,
  body TEXT NOT NULL, variable_key VARCHAR(160), owner_id VARCHAR(160) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_style_profiles_updated BEFORE UPDATE ON style_profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS prompt_blocks (                             -- [V1.5]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(240) NOT NULL, body TEXT NOT NULL,
  scope VARCHAR(20) NOT NULL, scope_id UUID, tags TEXT[] NOT NULL DEFAULT '{}',
  owner_id VARCHAR(160) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (scope IN ('personal','global','project','pack'))
);
CREATE TRIGGER trg_prompt_blocks_updated BEFORE UPDATE ON prompt_blocks FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =====================================================================================
-- 6. CORE SPINE  [V1]
--    SQL-D1: prompts = metadata only (NO body); bodies live in prompt_versions;
--            prompt_versions.variant_id NOT NULL (every prompt has ≥1 variant).
-- =====================================================================================
CREATE TABLE IF NOT EXISTS prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(240) NOT NULL,
  description TEXT,
  prompt_type prompt_type NOT NULL,
  owner_id VARCHAR(160) NOT NULL,
  owner_type owner_type NOT NULL DEFAULT 'user',
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  category_id UUID,
  status prompt_status NOT NULL DEFAULT 'inbox',
  favorite BOOLEAN NOT NULL DEFAULT FALSE,             -- flag, NOT a status
  source prompt_source_kind NOT NULL DEFAULT 'unknown',
  source_url TEXT,
  license_metadata_id UUID REFERENCES license_metadata(id) ON DELETE SET NULL,
  captured_from_app VARCHAR(160),
  capture_timestamp TIMESTAMPTZ,
  target_tool VARCHAR(160),
  target_model VARCHAR(160),
  syntax_profile_id VARCHAR(160) REFERENCES syntax_profiles(id) ON DELETE SET NULL,
  default_execution_target_id VARCHAR(160) REFERENCES execution_targets(id) ON DELETE SET NULL,
  default_variant_id UUID,                             -- FK added after prompt_variants
  trigger VARCHAR(160),
  trigger_scope TEXT[] NOT NULL DEFAULT '{}',
  uses_blocks UUID[] NOT NULL DEFAULT '{}',
  style_profile_ids UUID[] NOT NULL DEFAULT '{}',
  visibility visibility_type NOT NULL DEFAULT 'private',
  pack_ids UUID[] NOT NULL DEFAULT '{}',
  remix_of UUID,
  attribution_chain JSONB,
  version INTEGER NOT NULL DEFAULT 0,                  -- head version_number (0 until first commit)
  use_count INTEGER NOT NULL DEFAULT 0,
  tags_search_cache TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_used_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  CONSTRAINT prompts_trigger_unique UNIQUE (owner_id, owner_type, trigger)
);
CREATE TRIGGER trg_prompts_updated BEFORE UPDATE ON prompts FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_prompts_owner_status ON prompts(owner_id, owner_type, status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_prompts_folder ON prompts(folder_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_prompts_type ON prompts(prompt_type) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_prompts_favorite ON prompts(owner_id) WHERE favorite;
CREATE INDEX IF NOT EXISTS idx_prompts_tags_gin ON prompts USING GIN(tags_search_cache);
CREATE INDEX IF NOT EXISTS idx_prompts_pack_ids_gin ON prompts USING GIN(pack_ids);

CREATE TABLE IF NOT EXISTS prompt_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  name VARCHAR(240) NOT NULL,
  description TEXT,
  variant_type prompt_variant_type NOT NULL DEFAULT 'custom',
  target_tool VARCHAR(160),
  target_model VARCHAR(160),
  default_execution_target_id VARCHAR(160) REFERENCES execution_targets(id) ON DELETE SET NULL,
  default_syntax_profile_id VARCHAR(160) REFERENCES syntax_profiles(id) ON DELETE SET NULL,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  status prompt_status NOT NULL DEFAULT 'draft',
  version INTEGER NOT NULL DEFAULT 0,                  -- head version_number for this variant
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (status IN ('draft','active','needs_review','deprecated','archived'))   -- never inbox
);
CREATE TRIGGER trg_prompt_variants_updated BEFORE UPDATE ON prompt_variants FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE UNIQUE INDEX IF NOT EXISTS ux_variant_default_per_prompt ON prompt_variants(prompt_id) WHERE is_default;
CREATE UNIQUE INDEX IF NOT EXISTS ux_variant_name_per_prompt ON prompt_variants(prompt_id, name);

ALTER TABLE prompts
  ADD CONSTRAINT fk_prompts_default_variant FOREIGN KEY (default_variant_id)
  REFERENCES prompt_variants(id) ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED;

-- ChatGPT-3: enforce default_variant_id belongs to the same prompt
CREATE OR REPLACE FUNCTION enforce_default_variant_same_prompt()
RETURNS TRIGGER AS $$
DECLARE v_prompt_id UUID;
BEGIN
  IF NEW.default_variant_id IS NULL THEN RETURN NEW; END IF;
  SELECT prompt_id INTO v_prompt_id FROM prompt_variants WHERE id = NEW.default_variant_id;
  IF v_prompt_id IS NULL OR v_prompt_id <> NEW.id THEN
    RAISE EXCEPTION 'default_variant_id must belong to the same prompt (prompt %, variant prompt %)', NEW.id, v_prompt_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_prompts_default_variant_same_prompt
  BEFORE INSERT OR UPDATE OF default_variant_id ON prompts
  FOR EACH ROW EXECUTE FUNCTION enforce_default_variant_same_prompt();

-- Body lives here (SQL-D1). Immutable once committed; raw→cleaned lineage retained.
CREATE TABLE IF NOT EXISTS prompt_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  variant_id UUID NOT NULL REFERENCES prompt_variants(id) ON DELETE CASCADE,   -- SQL-D1: required
  version_number INTEGER NOT NULL,                    -- D1 canonical identity
  commit_hash VARCHAR(64),                            -- D1 optional integrity/dedup
  body TEXT,
  raw_body TEXT,                                      -- capture lineage
  normalized_body TEXT,
  refactored_from_raw BOOLEAN NOT NULL DEFAULT FALSE,
  body_hash VARCHAR(128),
  body_storage_state body_storage_state NOT NULL DEFAULT 'full',
  negative_prompt TEXT,
  parameters_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  variables_snapshot JSONB NOT NULL DEFAULT '[]'::jsonb,
  builder_state_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,  -- blocks / image subject / custom_modifiers
  syntax_profile_id VARCHAR(160) REFERENCES syntax_profiles(id) ON DELETE SET NULL,
  commit_message TEXT,
  created_by VARCHAR(160) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  soft_pruned_at TIMESTAMPTZ,
  UNIQUE (variant_id, version_number),
  UNIQUE (variant_id, commit_hash),
  -- a 'full' version must carry a body or structured builder state
  CHECK (body_storage_state <> 'full' OR body IS NOT NULL OR builder_state_snapshot <> '{}'::jsonb)
);
CREATE INDEX IF NOT EXISTS idx_versions_prompt ON prompt_versions(prompt_id);
CREATE INDEX IF NOT EXISTS idx_versions_variant ON prompt_versions(variant_id);
CREATE INDEX IF NOT EXISTS idx_versions_commit ON prompt_versions(commit_hash) WHERE commit_hash IS NOT NULL;

-- integrity: version.prompt_id must equal its variant's prompt_id
CREATE OR REPLACE FUNCTION enforce_version_variant_parent() RETURNS TRIGGER AS $$
DECLARE parent UUID;
BEGIN
  SELECT prompt_id INTO parent FROM prompt_variants WHERE id = NEW.variant_id;
  IF parent IS NULL OR parent <> NEW.prompt_id THEN
    RAISE EXCEPTION 'prompt_versions.prompt_id must match prompt_variants.prompt_id';
  END IF;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER trg_versions_parent_match BEFORE INSERT OR UPDATE ON prompt_versions
  FOR EACH ROW EXECUTE FUNCTION enforce_version_variant_parent();

-- ChatGPT-2/2b: PromptVersion immutability trigger.
-- ALL versions are immutable (version_number is canonical identity; commit_hash is optional).
-- Narrow maintenance path: body may be cleared (→ NULL) during soft-prune/cold-storage
-- transitions, but never changed from one text value to another.
CREATE OR REPLACE FUNCTION enforce_version_immutability() RETURNS TRIGGER AS $$
BEGIN
  -- Identity / structural fields — never mutable
  IF NEW.prompt_id       IS DISTINCT FROM OLD.prompt_id
  OR NEW.variant_id      IS DISTINCT FROM OLD.variant_id
  OR NEW.version_number  IS DISTINCT FROM OLD.version_number
  OR NEW.commit_hash     IS DISTINCT FROM OLD.commit_hash
  OR NEW.parameters_snapshot  IS DISTINCT FROM OLD.parameters_snapshot
  OR NEW.variables_snapshot   IS DISTINCT FROM OLD.variables_snapshot
  OR NEW.builder_state_snapshot IS DISTINCT FROM OLD.builder_state_snapshot
  OR NEW.syntax_profile_id IS DISTINCT FROM OLD.syntax_profile_id
  OR NEW.commit_message  IS DISTINCT FROM OLD.commit_message
  OR NEW.created_by      IS DISTINCT FROM OLD.created_by
  OR NEW.created_at      IS DISTINCT FROM OLD.created_at
  THEN
    RAISE EXCEPTION 'Prompt version (%) is immutable. Create a new version instead.', OLD.id;
  END IF;

  -- Body fields: only allowed transition is non-null → NULL (retention/cold-storage).
  -- Blocks: text→different text AND null→new text (prevents rehydration with altered content).
  IF NEW.body IS DISTINCT FROM OLD.body
     AND NOT (OLD.body IS NOT NULL AND NEW.body IS NULL) THEN
    RAISE EXCEPTION 'Prompt version (%) body can only be cleared for retention, not changed or restored.', OLD.id;
  END IF;
  IF NEW.raw_body IS DISTINCT FROM OLD.raw_body
     AND NOT (OLD.raw_body IS NOT NULL AND NEW.raw_body IS NULL) THEN
    RAISE EXCEPTION 'Prompt version (%) raw_body can only be cleared for retention, not changed or restored.', OLD.id;
  END IF;
  IF NEW.normalized_body IS DISTINCT FROM OLD.normalized_body
     AND NOT (OLD.normalized_body IS NOT NULL AND NEW.normalized_body IS NULL) THEN
    RAISE EXCEPTION 'Prompt version (%) normalized_body can only be cleared for retention, not changed or restored.', OLD.id;
  END IF;
  IF NEW.negative_prompt IS DISTINCT FROM OLD.negative_prompt
     AND NOT (OLD.negative_prompt IS NOT NULL AND NEW.negative_prompt IS NULL) THEN
    RAISE EXCEPTION 'Prompt version (%) negative_prompt can only be cleared for retention, not changed or restored.', OLD.id;
  END IF;

  -- Lineage flag — immutable once set
  IF NEW.refactored_from_raw IS DISTINCT FROM OLD.refactored_from_raw THEN
    RAISE EXCEPTION 'Prompt version (%) refactored_from_raw is immutable.', OLD.id;
  END IF;

  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER trg_versions_immutability BEFORE UPDATE ON prompt_versions
  FOR EACH ROW EXECUTE FUNCTION enforce_version_immutability();

-- SQL-D4: normalized variable definitions (prompt- or variant-level)
CREATE TABLE IF NOT EXISTS prompt_variables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE CASCADE,
  global_id UUID REFERENCES global_variables(id) ON DELETE SET NULL,
  key VARCHAR(160) NOT NULL,
  label VARCHAR(240),
  type variable_type NOT NULL,
  default_value JSONB,
  required BOOLEAN NOT NULL DEFAULT FALSE,
  params JSONB NOT NULL DEFAULT '{}'::jsonb,
  validation_rules JSONB NOT NULL DEFAULT '{}'::jsonb,
  safety_policy JSONB NOT NULL DEFAULT
    '{"sanitize_injection_risks":true,"allow_urls":false,"allow_markdown":false,"allow_html":false,"allow_recursive_resolution":false}'::jsonb,
  ref_filter TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (prompt_id IS NOT NULL OR variant_id IS NOT NULL),
  -- JSONB shape guards
  CHECK (jsonb_typeof(params) = 'object'),
  CHECK (jsonb_typeof(validation_rules) = 'object'),
  CHECK (jsonb_typeof(safety_policy) = 'object')
  -- NOTE: Gemini-F recursive-resolution CHECK removed (ChatGPT review).
  -- variant_id IS NOT NULL does NOT imply use_only — normal variants also have variant_id.
  -- The use_only recursive-resolution block is enforced at the execution service layer,
  -- keyed on the prompt's effective permission context, NOT on variant_id presence.
);
CREATE TRIGGER trg_prompt_variables_updated BEFORE UPDATE ON prompt_variables FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE UNIQUE INDEX IF NOT EXISTS ux_prompt_variables_prompt_key ON prompt_variables(prompt_id, key) WHERE variant_id IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_prompt_variables_variant_key ON prompt_variables(variant_id, key) WHERE variant_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS prompt_fill_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE SET NULL,
  version_id UUID REFERENCES prompt_versions(id) ON DELETE RESTRICT,
  values JSONB NOT NULL DEFAULT '[]'::jsonb,          -- [{key,value,source_layer,resolved_at}]
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prompt_draft_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE CASCADE,
  body_snapshot TEXT,
  builder_state_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_prompt_draft_snapshots_updated BEFORE UPDATE ON prompt_draft_snapshots FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_drafts_prompt ON prompt_draft_snapshots(prompt_id, created_at DESC);

CREATE TABLE IF NOT EXISTS prompt_relationships (                      -- [V2]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  target_prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  relationship_type VARCHAR(80) NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (source_prompt_id <> target_prompt_id),
  UNIQUE (source_prompt_id, target_prompt_id, relationship_type)
);

CREATE TABLE IF NOT EXISTS prompt_tags (
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (prompt_id, tag_id)
);

-- SQL-D5: selected image tokens as a normalized table (per committed version)
CREATE TABLE IF NOT EXISTS selected_visual_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_version_id UUID NOT NULL REFERENCES prompt_versions(id) ON DELETE CASCADE,
  token_id UUID REFERENCES visual_tokens(id) ON DELETE SET NULL,
  cached_token_text VARCHAR(240) NOT NULL,            -- REQUIRED fallback
  category visual_token_category NOT NULL,
  source_profile_id VARCHAR(160) REFERENCES syntax_profiles(id) ON DELETE SET NULL,
  position INTEGER NOT NULL DEFAULT 0,
  selected_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_selected_tokens_version ON selected_visual_tokens(prompt_version_id);

CREATE TABLE IF NOT EXISTS rendered_prompt_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE SET NULL,
  version_id UUID REFERENCES prompt_versions(id) ON DELETE SET NULL,
  syntax_profile_id VARCHAR(160) REFERENCES syntax_profiles(id) ON DELETE SET NULL,
  mode VARCHAR(12),                                   -- stored|builder|rendered
  rendered_body TEXT,
  rendered_messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  storage_mode storage_mode NOT NULL DEFAULT 'store_resolved_prompt',
  rendered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================================
-- 7. PACKS / KITS  [V1 packs; V2 kits/manifest]
-- =====================================================================================
CREATE TABLE IF NOT EXISTS prompt_packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id VARCHAR(160) NOT NULL,
  name VARCHAR(240) NOT NULL,
  description TEXT,
  cover_ref TEXT,
  category_id UUID,
  visibility visibility_type NOT NULL DEFAULT 'private',
  shared_variables JSONB NOT NULL DEFAULT '[]'::jsonb,
  license_metadata_id UUID REFERENCES license_metadata(id) ON DELETE SET NULL,
  license_summary TEXT,
  version VARCHAR(20) NOT NULL DEFAULT '1.0',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (owner_id, name)
);
CREATE TRIGGER trg_prompt_packs_updated BEFORE UPDATE ON prompt_packs FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS prompt_pack_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id UUID NOT NULL REFERENCES prompt_packs(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE SET NULL,
  version_id UUID REFERENCES prompt_versions(id) ON DELETE RESTRICT,
  included_as VARCHAR(40) NOT NULL DEFAULT 'prompt',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (included_as IN ('prompt','variant','version','example','workflow'))
);
CREATE INDEX IF NOT EXISTS idx_pack_items_pack ON prompt_pack_items(pack_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_pack_items_prompt ON prompt_pack_items(prompt_id);

CREATE TABLE IF NOT EXISTS prompt_pack_manifests (                    -- [V2]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id UUID REFERENCES prompt_packs(id) ON DELETE CASCADE,
  schema_version VARCHAR(80) NOT NULL,
  min_app_version VARCHAR(80),
  exported_from_app_version VARCHAR(80),
  exported_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  compatibility_notes TEXT[] NOT NULL DEFAULT '{}',
  migration_required BOOLEAN NOT NULL DEFAULT FALSE,
  license_list JSONB NOT NULL DEFAULT '[]'::jsonb,
  manifest_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  CHECK (jsonb_typeof(manifest_json) = 'object')
);

CREATE TABLE IF NOT EXISTS project_prompt_kits (                      -- [V2]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL,
  prompt_ids UUID[] NOT NULL DEFAULT '{}',
  shared_variables JSONB NOT NULL DEFAULT '[]'::jsonb,
  style_profile_ids UUID[] NOT NULL DEFAULT '{}',
  example_ids UUID[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_project_prompt_kits_updated BEFORE UPDATE ON project_prompt_kits FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =====================================================================================
-- 8. RUN / TELEMETRY  [V1 batches/runs/usage; V2 trace/spans/payload]
-- =====================================================================================
CREATE TABLE IF NOT EXISTS prompt_run_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE SET NULL,
  version_id UUID NOT NULL REFERENCES prompt_versions(id) ON DELETE RESTRICT,
  selected_targets JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- SQL-D2: two distinct status fields
  run_status batch_run_status NOT NULL DEFAULT 'queued',
  retention_status batch_retention_status NOT NULL DEFAULT 'active',
  created_by VARCHAR(160) NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_prompt_run_batches_updated BEFORE UPDATE ON prompt_run_batches FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_batches_prompt ON prompt_run_batches(prompt_id, created_at DESC);

CREATE TABLE IF NOT EXISTS prompt_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES prompt_run_batches(id) ON DELETE SET NULL,   -- purging a batch keeps runs
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE SET NULL,
  version_id UUID NOT NULL REFERENCES prompt_versions(id) ON DELETE RESTRICT,  -- pins version
  execution_target_id VARCHAR(160) NOT NULL REFERENCES execution_targets(id) ON DELETE RESTRICT,
  syntax_profile_id VARCHAR(160) REFERENCES syntax_profiles(id) ON DELETE SET NULL,
  status execution_status NOT NULL DEFAULT 'queued',
  provider_type provider_type NOT NULL,
  provider_name VARCHAR(160) NOT NULL,
  model_name VARCHAR(160),
  variables_used_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  parameters_used_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  prompt_tokens INTEGER, completion_tokens INTEGER, total_tokens INTEGER,
  latency_ms INTEGER, time_to_first_token_ms INTEGER,
  cost_estimate NUMERIC(12,6), cost_currency VARCHAR(12), cost_calculated_at TIMESTAMPTZ,
  storage_mode storage_mode NOT NULL DEFAULT 'store_redacted_prompt',
  use_only_sandbox BOOLEAN NOT NULL DEFAULT FALSE,
  user_rating_cache INTEGER CHECK (user_rating_cache BETWEEN 1 AND 5),  -- D5/DT5 cache only
  error_code VARCHAR(160), error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  CHECK (prompt_tokens IS NULL OR prompt_tokens >= 0),
  CHECK (completion_tokens IS NULL OR completion_tokens >= 0),
  CHECK (total_tokens IS NULL OR total_tokens >= 0),
  CHECK (latency_ms IS NULL OR latency_ms >= 0),
  CHECK (jsonb_typeof(variables_used_snapshot) = 'object'),
  CHECK (jsonb_typeof(parameters_used_snapshot) = 'object')
);
CREATE TRIGGER trg_prompt_runs_updated BEFORE UPDATE ON prompt_runs FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_runs_prompt ON prompt_runs(prompt_id, created_at DESC);
-- Gemini-B: partial index — avoids seq-scan on cascade when GC purges batches
CREATE INDEX IF NOT EXISTS idx_runs_batch ON prompt_runs(batch_id) WHERE batch_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_runs_version ON prompt_runs(version_id);
CREATE INDEX IF NOT EXISTS idx_runs_target ON prompt_runs(execution_target_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_runs_status ON prompt_runs(status);

CREATE TABLE IF NOT EXISTS prompt_traces (                            -- [V2]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_run_id UUID REFERENCES prompt_runs(id) ON DELETE SET NULL,
  test_bench_item_id UUID,                            -- deferred FK
  workflow_run_snapshot_id UUID,                      -- deferred FK
  name VARCHAR(240), session_id VARCHAR(160), user_id VARCHAR(160),
  status execution_status,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_prompt_traces_updated BEFORE UPDATE ON prompt_traces FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_traces_run ON prompt_traces(prompt_run_id);

CREATE TABLE IF NOT EXISTS prompt_trace_spans (                       -- [V2]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trace_id UUID NOT NULL REFERENCES prompt_traces(id) ON DELETE CASCADE,
  parent_span_id UUID REFERENCES prompt_trace_spans(id) ON DELETE SET NULL,
  span_type span_type NOT NULL,
  name VARCHAR(240),
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  input_snapshot JSONB, output_snapshot JSONB,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  status execution_status, error_info JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_spans_trace ON prompt_trace_spans(trace_id);
CREATE INDEX IF NOT EXISTS idx_spans_parent ON prompt_trace_spans(parent_span_id);

CREATE TABLE IF NOT EXISTS prompt_run_payloads (                      -- [V2] cold/controlled bodies
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_run_id UUID NOT NULL REFERENCES prompt_runs(id) ON DELETE CASCADE,
  payload_type payload_type NOT NULL,
  storage_mode storage_mode NOT NULL,
  content_ref TEXT, content_inline TEXT, content_hash VARCHAR(128),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (content_ref IS NOT NULL OR content_inline IS NOT NULL OR content_hash IS NOT NULL)
);
CREATE INDEX IF NOT EXISTS idx_payloads_run ON prompt_run_payloads(prompt_run_id);

CREATE TABLE IF NOT EXISTS prompt_usage_records (                     -- [V1]  (Claude-kept)
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE SET NULL,
  version_id UUID REFERENCES prompt_versions(id) ON DELETE RESTRICT,
  version_number INTEGER NOT NULL,                       -- snapshot for fast queries
  event usage_event NOT NULL,
  target_tool VARCHAR(160), target_model VARCHAR(160), surface VARCHAR(160),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_usage_prompt ON prompt_usage_records(prompt_id, created_at DESC);

-- =====================================================================================
-- 9. OUTPUT  [V1 assets; V2 examples]
-- =====================================================================================
CREATE TABLE IF NOT EXISTS prompt_output_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_run_id UUID NOT NULL REFERENCES prompt_runs(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE SET NULL,
  version_id UUID REFERENCES prompt_versions(id) ON DELETE RESTRICT,
  asset_type asset_type NOT NULL,
  file_id UUID, text_output TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  parameters_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  model_badge VARCHAR(160), seed VARCHAR(160),
  width INTEGER, height INTEGER, duration_ms INTEGER,
  favorite BOOLEAN NOT NULL DEFAULT FALSE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (width IS NULL OR width >= 0),
  CHECK (height IS NULL OR height >= 0),
  CHECK (duration_ms IS NULL OR duration_ms >= 0)
);
CREATE TRIGGER trg_output_assets_updated BEFORE UPDATE ON prompt_output_assets FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_assets_run ON prompt_output_assets(prompt_run_id);
CREATE INDEX IF NOT EXISTS idx_assets_prompt ON prompt_output_assets(prompt_id, created_at DESC);

CREATE TABLE IF NOT EXISTS prompt_examples (                          -- [V2]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE SET NULL,
  version_id UUID REFERENCES prompt_versions(id) ON DELETE RESTRICT,
  output_asset_id UUID REFERENCES prompt_output_assets(id) ON DELETE SET NULL,
  title VARCHAR(240), description TEXT,
  example_input JSONB, example_output JSONB,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_prompt_examples_updated BEFORE UPDATE ON prompt_examples FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =====================================================================================
-- 10. TESTING / EVAL  [V2]
-- =====================================================================================
CREATE TABLE IF NOT EXISTS prompt_test_suites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
  owner_id VARCHAR(160) NOT NULL,
  name VARCHAR(240) NOT NULL, description TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_test_suites_updated BEFORE UPDATE ON prompt_test_suites FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS prompt_test_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  suite_id UUID NOT NULL REFERENCES prompt_test_suites(id) ON DELETE CASCADE,
  name VARCHAR(240),
  input_variables JSONB NOT NULL DEFAULT '{}'::jsonb,
  expected_output JSONB, expected_notes TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  valid_from TIMESTAMPTZ, valid_to TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_test_cases_updated BEFORE UPDATE ON prompt_test_cases FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_cases_suite ON prompt_test_cases(suite_id);

CREATE TABLE IF NOT EXISTS prompt_assertions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_case_id UUID NOT NULL REFERENCES prompt_test_cases(id) ON DELETE CASCADE,
  assertion_type VARCHAR(80) NOT NULL,
  value JSONB, threshold NUMERIC(12,4), metric VARCHAR(160), weight NUMERIC(12,4),
  provider_override VARCHAR(160), config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (assertion_type IN ('contains','not_contains','regex','equals','json_schema','llm_judge','custom'))
);

CREATE TABLE IF NOT EXISTS test_bench_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  name VARCHAR(240), description TEXT,
  test_case_ids UUID[] NOT NULL DEFAULT '{}',
  version_ids UUID[] NOT NULL DEFAULT '{}',
  variant_ids UUID[] NOT NULL DEFAULT '{}',
  execution_target_ids TEXT[] NOT NULL DEFAULT '{}',
  created_by VARCHAR(160) NOT NULL,
  status execution_status NOT NULL DEFAULT 'queued',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_bench_sessions_updated BEFORE UPDATE ON test_bench_sessions FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS test_bench_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES test_bench_sessions(id) ON DELETE CASCADE,
  test_case_id UUID NOT NULL REFERENCES prompt_test_cases(id) ON DELETE RESTRICT,
  prompt_version_id UUID NOT NULL REFERENCES prompt_versions(id) ON DELETE RESTRICT,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE SET NULL,
  execution_target_id VARCHAR(160) NOT NULL REFERENCES execution_targets(id) ON DELETE RESTRICT,
  prompt_run_id UUID REFERENCES prompt_runs(id) ON DELETE SET NULL,
  trace_id UUID REFERENCES prompt_traces(id) ON DELETE SET NULL,
  status execution_status NOT NULL DEFAULT 'queued',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (session_id, test_case_id, prompt_version_id, execution_target_id)
);
CREATE INDEX IF NOT EXISTS idx_bench_items_session ON test_bench_items(session_id);
CREATE INDEX IF NOT EXISTS idx_bench_items_run ON test_bench_items(prompt_run_id);

-- deferred FK: trace → test_bench_item
ALTER TABLE prompt_traces
  ADD CONSTRAINT fk_trace_bench_item FOREIGN KEY (test_bench_item_id)
  REFERENCES test_bench_items(id) ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED;

-- polymorphic scores (no FK; entity_type + entity_id). Eval source of truth.
CREATE TABLE IF NOT EXISTS prompt_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type score_entity_type NOT NULL,
  entity_id UUID NOT NULL,
  name VARCHAR(160) NOT NULL,
  value_numeric NUMERIC(16,6), value_string VARCHAR(240), value_boolean BOOLEAN,
  data_type score_data_type NOT NULL,
  source score_source NOT NULL,
  comment TEXT, author_user_id VARCHAR(160),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (value_numeric IS NOT NULL OR value_string IS NOT NULL OR value_boolean IS NOT NULL)
);
CREATE INDEX IF NOT EXISTS idx_scores_entity ON prompt_scores(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_scores_name_source ON prompt_scores(name, source);

-- =====================================================================================
-- 11. WORKFLOW  [V3]   (normalized; canvas_graph_json UI-only)
-- =====================================================================================
CREATE TABLE IF NOT EXISTS prompt_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID REFERENCES prompts(id) ON DELETE SET NULL,
  name VARCHAR(240) NOT NULL, description TEXT,
  status prompt_status NOT NULL DEFAULT 'draft',
  canvas_graph_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by VARCHAR(160) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (status IN ('draft','active','deprecated','archived')),
  CHECK (jsonb_typeof(canvas_graph_json) = 'object')
);
CREATE TRIGGER trg_prompt_workflows_updated BEFORE UPDATE ON prompt_workflows FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS workflow_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES prompt_workflows(id) ON DELETE CASCADE,
  step_key VARCHAR(160) NOT NULL,
  step_type workflow_step_type NOT NULL,
  prompt_id UUID REFERENCES prompts(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE SET NULL,
  version_id UUID REFERENCES prompt_versions(id) ON DELETE RESTRICT,
  inline_body TEXT,
  execution_target_id VARCHAR(160) REFERENCES execution_targets(id) ON DELETE SET NULL,
  -- D4: output contract as fields on the step
  output_key VARCHAR(160),
  output_kind workflow_output_kind,
  output_schema JSONB,
  output_required BOOLEAN NOT NULL DEFAULT FALSE,
  model_override VARCHAR(160),
  sort_order INTEGER NOT NULL DEFAULT 0,
  config_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (workflow_id, step_key),
  CHECK (prompt_id IS NOT NULL OR inline_body IS NOT NULL
         OR step_type IN ('tool','retrieval','merge','condition','transform','human_review'))
);
CREATE TRIGGER trg_workflow_steps_updated BEFORE UPDATE ON workflow_steps FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_steps_workflow ON workflow_steps(workflow_id, sort_order);

CREATE TABLE IF NOT EXISTS workflow_input_maps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_step_id UUID NOT NULL REFERENCES workflow_steps(id) ON DELETE CASCADE,
  from_step_id UUID REFERENCES workflow_steps(id) ON DELETE SET NULL,
  from_output_key VARCHAR(160),
  from_run_id UUID REFERENCES prompt_runs(id) ON DELETE SET NULL,
  from_branch_id UUID,                                 -- deferred FK
  from_execution_target_id VARCHAR(160) REFERENCES execution_targets(id) ON DELETE SET NULL,
  into_variable_key VARCHAR(160) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_inputmaps_step ON workflow_input_maps(workflow_step_id);

CREATE TABLE IF NOT EXISTS workflow_run_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES prompt_workflows(id) ON DELETE CASCADE,
  prompt_run_batch_id UUID REFERENCES prompt_run_batches(id) ON DELETE SET NULL,
  workflow_version_ref VARCHAR(160),
  step_snapshots JSONB NOT NULL DEFAULT '[]'::jsonb,
  input_maps_snapshot JSONB NOT NULL DEFAULT '[]'::jsonb,
  output_contracts_snapshot JSONB NOT NULL DEFAULT '[]'::jsonb,
  branch_rules_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  merge_rules_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  status execution_status NOT NULL DEFAULT 'queued',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE prompt_traces
  ADD CONSTRAINT fk_trace_wf_snapshot FOREIGN KEY (workflow_run_snapshot_id)
  REFERENCES workflow_run_snapshots(id) ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED;

CREATE TABLE IF NOT EXISTS workflow_execution_branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_run_snapshot_id UUID NOT NULL REFERENCES workflow_run_snapshots(id) ON DELETE CASCADE,
  branch_key VARCHAR(160) NOT NULL,
  originating_step_id UUID NOT NULL REFERENCES workflow_steps(id) ON DELETE RESTRICT,
  originating_run_id UUID NOT NULL REFERENCES prompt_runs(id) ON DELETE RESTRICT,
  originating_execution_target_id VARCHAR(160) NOT NULL REFERENCES execution_targets(id) ON DELETE RESTRICT,
  status execution_status NOT NULL DEFAULT 'queued',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (workflow_run_snapshot_id, branch_key)
);

ALTER TABLE workflow_input_maps
  ADD CONSTRAINT fk_inputmap_branch FOREIGN KEY (from_branch_id)
  REFERENCES workflow_execution_branches(id) ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED;

CREATE TABLE IF NOT EXISTS workflow_merge_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES prompt_workflows(id) ON DELETE CASCADE,
  step_id UUID REFERENCES workflow_steps(id) ON DELETE SET NULL,
  input_branch_ids UUID[] NOT NULL DEFAULT '{}',
  merge_strategy workflow_merge_strategy NOT NULL,
  output_key VARCHAR(160) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================================
-- 12. GOVERNANCE  [V1 permissions/audit; V2 security/retention]
-- =====================================================================================
CREATE TABLE IF NOT EXISTS prompt_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
  pack_id UUID REFERENCES prompt_packs(id) ON DELETE CASCADE,
  grantee_id VARCHAR(160) NOT NULL,
  grantee_type owner_type NOT NULL DEFAULT 'user',
  permission_level permission_level NOT NULL,
  context permission_context,
  granted_by VARCHAR(160),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (prompt_id IS NOT NULL OR pack_id IS NOT NULL)
);
CREATE TRIGGER trg_prompt_permissions_updated BEFORE UPDATE ON prompt_permissions FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX IF NOT EXISTS idx_perms_prompt ON prompt_permissions(prompt_id);

CREATE TABLE IF NOT EXISTS prompt_security_policies (                 -- [V2]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL UNIQUE REFERENCES prompts(id) ON DELETE CASCADE,
  use_only_weak_target_policy use_only_weak_target_policy NOT NULL DEFAULT 'block',
  allow_local_targets_for_use_only BOOLEAN NOT NULL DEFAULT FALSE,
  allow_insert_only_for_use_only BOOLEAN NOT NULL DEFAULT FALSE,
  require_sandbox_for_use_only BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (allow_insert_only_for_use_only = FALSE)       -- structurally always false
);
CREATE TRIGGER trg_security_policies_updated BEFORE UPDATE ON prompt_security_policies FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- append-only (REVOKE UPDATE/DELETE from app roles); never stores secret values
CREATE TABLE IF NOT EXISTS prompt_audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type audit_event_type NOT NULL,
  actor_id VARCHAR(160),
  prompt_id UUID REFERENCES prompts(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES prompt_variants(id) ON DELETE SET NULL,
  version_id UUID REFERENCES prompt_versions(id) ON DELETE SET NULL,
  execution_target_id VARCHAR(160) REFERENCES execution_targets(id) ON DELETE SET NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_audit_prompt ON prompt_audit_events(prompt_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_type ON prompt_audit_events(event_type, created_at DESC);

CREATE TABLE IF NOT EXISTS retention_policies (                       -- [V2]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id VARCHAR(160),
  purge_runs_after_days INTEGER DEFAULT 0,
  purge_versions_keep_last_n INTEGER DEFAULT 50,
  strip_images_from_runs_after_days INTEGER DEFAULT 0,
  purge_usage_events_after_days INTEGER DEFAULT 0,
  preserve_favorited_runs BOOLEAN NOT NULL DEFAULT TRUE,
  preserve_runs_used_as_examples BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (purge_runs_after_days IS NULL OR purge_runs_after_days >= 0),
  CHECK (purge_versions_keep_last_n IS NULL OR purge_versions_keep_last_n >= 0)
);
CREATE TRIGGER trg_retention_policies_updated BEFORE UPDATE ON retention_policies FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =====================================================================================
-- 13. IMPORT / EXPORT  [V1]
-- =====================================================================================
CREATE TABLE IF NOT EXISTS import_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type import_source_type NOT NULL,
  source_ref TEXT,
  status import_job_status NOT NULL DEFAULT 'queued',
  created_by VARCHAR(160) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
CREATE TRIGGER trg_import_jobs_updated BEFORE UPDATE ON import_jobs FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS import_item_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  import_job_id UUID NOT NULL REFERENCES import_jobs(id) ON DELETE CASCADE,
  source_item_ref TEXT,
  status import_item_status NOT NULL,
  prompt_id UUID REFERENCES prompts(id) ON DELETE SET NULL,
  error_message TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_importitems_job ON import_item_results(import_job_id);

-- =====================================================================================
-- 14. REUSE — triggers / insertion  [V1.5 triggers; V2 insertion]   (Claude-kept)
-- =====================================================================================
CREATE TABLE IF NOT EXISTS trigger_profiles (
  app_key VARCHAR(160) PRIMARY KEY,
  template_prefix VARCHAR(8) NOT NULL DEFAULT ';',
  prompt_prefix VARCHAR(8) NOT NULL DEFAULT '/',
  reserved_prefixes TEXT[] NOT NULL DEFAULT '{}',
  conflict_strategy VARCHAR(20) NOT NULL DEFAULT 'warn',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (conflict_strategy IN ('warn','block','fallback'))
);

CREATE TABLE IF NOT EXISTS extension_overlay_profiles (
  app_key VARCHAR(160) PRIMARY KEY,
  overlay_mode VARCHAR(20) NOT NULL,
  anchor_strategy VARCHAR(30) NOT NULL,
  input_observation VARCHAR(10) NOT NULL,
  allow_dom_mutation_during_composition BOOLEAN NOT NULL DEFAULT FALSE,
  reserved_native_commands TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (overlay_mode IN ('shadow_dom','isolated_root','native_popup')),
  CHECK (anchor_strategy IN ('viewport_coordinates','input_bounding_rect','caret_position')),
  CHECK (input_observation IN ('passive','active'))
);

CREATE TABLE IF NOT EXISTS insertion_profiles (                       -- [V2]
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_key VARCHAR(160) NOT NULL,
  target_name VARCHAR(240) NOT NULL,
  target_selector_hint TEXT,
  command_prefix VARCHAR(40),
  fill_variables_before_insert BOOLEAN,
  max_insert_chars_soft INTEGER,
  max_insert_chars_hard INTEGER,
  supports_large_paste BOOLEAN,
  supports_files BOOLEAN,
  supports_markdown BOOLEAN,
  supports_multiline BOOLEAN,
  fallback_strategy VARCHAR(20) NOT NULL,
  is_builtin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (fallback_strategy IN ('truncate','file_reference','section_picker','block_insert'))
);

-- =====================================================================================
-- 15. APP-LAYER INVARIANTS (not enforceable purely in DDL)
-- =====================================================================================
-- * Versions immutable: INSERT only; never UPDATE a committed body.
-- * Version referenced by a run / batch / bench item is delete-RESTRICTed → soft-prune.
-- * use_only runs: storage_mode <> 'store_resolved_prompt'; copy/insert/export disabled.
-- * allow_recursive_resolution (prompt_variables.safety_policy) forced false for use_only.
-- * Variant variable merge: parent safety metadata inherits unless redefined; a TYPE change
--   stops inheritance and applies strict defaults.
-- * VariableEnvironment layers never mutate prompts/variants/versions rows.
-- * selected_visual_tokens.cached_token_text required; render falls back to it.
-- * prompt_scores is eval source of truth; prompt_runs.user_rating_cache is a cache only.
-- * prompt_audit_events append-only: REVOKE UPDATE, DELETE from application roles.
-- * Batch run_status derived from child runs; one failed child does not fail the batch.
-- * Capture flow (SQL-D1): creating a prompt also creates a default variant + first version.
-- =====================================================================================

COMMIT;
-- End of DDL v0.3
