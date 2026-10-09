/**
 * Prompt Studio — TypeScript Domain Model  (Canonical / Merged)
 * ============================================================
 * Step 2 of the schema pipeline:
 *   PRD → Archived/docs/prompt-studio-logical-schema.md → [THIS FILE] → prompt-studio-schema.sql (DDL v0.3)
 *
 * Application-level domain types, unions, value objects, entity shapes, and guard
 * contracts. NOT an ORM mapping and NOT SQL. Physical concerns (indexes, JSONB-vs-column,
 * cascades) are decided in DDL v0.2, guided by this file.
 *
 * Source of truth for entities/relationships: Archived/docs/prompt-studio-logical-schema.md (56 entities).
 *
 * -------------------------------------------------------------------------------------
 * RESOLVED OPEN DECISIONS (locked here)
 * -------------------------------------------------------------------------------------
 * D1 — Version identity: DUAL-TRACK. `version_number` (monotonic, canonical, unique per
 *      {prompt|variant}) + optional `commit_hash` (integrity/dedup/display only).
 * D3 — Variable storage: NORMALIZED `PromptVariable` table (revised by SQL-D4). Definitions
 *      are relational rows (prompt- or variant-scoped); runtime values ALWAYS frozen into a
 *      snapshot (`variables_used_snapshot` / PromptFillSnapshot).
 * D4 — Workflow output contract: FIELD on WorkflowStep (`WorkflowOutputContractInline`);
 *      promote to a standalone entity only if contracts are shared/reused.
 *
 * SQL-MERGE DECISIONS (physical model, prompt-studio-schema.sql v0.3):
 * SQL-D1 — Body/variant model: NORMALIZED. `Prompt` holds metadata only (NO `body`); bodies
 *          live in `PromptVersion`; `PromptVersion.variant_id` is REQUIRED (every prompt has
 *          ≥1 variant; capture creates a default variant + first version). `PromptVariant`
 *          also holds no body. Raw→cleaned lineage lives on the version.
 * SQL-D4 — Variables persisted as the normalized `prompt_variables` table (not JSONB-on-record).
 * SQL-D5 — Selected image tokens persisted as the `selected_visual_tokens` table.
 *
 * MERGE RESOLUTIONS (this file consolidates two drafts):
 * DT1 — Provenance is documentation/comment metadata, NOT a runtime field on entities.
 * DT2 — PromptRunBatch keeps TWO distinct status fields: `run_status` (runtime) and
 *       `retention_status` (GC). Do NOT collapse into one enum (§26.5/§27.8).
 * DT3 — License values keep PRD hyphen naming; `link-only` added.
 * DT4 — `allow_recursive_resolution` lives inside `VariableSafetyPolicy`.
 * DT5 — `VisualTokenCategory` is the union of both drafts; `color_palette` matches ImageFields.
 * -------------------------------------------------------------------------------------
 */

/* =====================================================================================
 * 0. Shared primitives & mixins
 * ===================================================================================== */

/** UUID primary key. */
export type UUID = string;
/** Slug-style identifier (execution targets, syntax profiles). */
export type Slug = string;
export type ISODateTime = string;
export type URI = string;

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export interface JsonObject { [key: string]: JsonValue; }
export type JsonArray = JsonValue[];

export interface Timestamped {
  created_at: ISODateTime;
  updated_at?: ISODateTime;
}
export interface SoftDeletable {
  deleted_at?: ISODateTime | null;
}

export type OwnerType = "user" | "team" | "project" | "admin";

/* =====================================================================================
 * 1. Enums / union types  (values grounded in the PRD)
 * ===================================================================================== */

export type PromptType =
  | "chat" | "writing" | "coding" | "image" | "video" | "audio"
  | "agent" | "system" | "workflow" | "evaluation" | "template";

/** Lifecycle state. NOTE: `favorite` is a boolean flag, NOT a status. */
export type PromptStatus =
  | "inbox" | "draft" | "active" | "needs_review" | "deprecated" | "archived";

export type Visibility = "private" | "team" | "public";

/** DT3: PRD hyphen naming preserved; `link-only` added. */
export type LicenseStatus =
  | "owned" | "cc0" | "cc-by" | "open-source"
  | "personal-use-only" | "unknown" | "proprietary" | "link-only";

export type VerificationStatus =
  | "unverified" | "verified" | "needs_review" | "expired" | "conflict";

export type PromptVariantType =
  | "model" | "channel" | "audience" | "language" | "modality"
  | "experiment" | "workflow" | "custom";

export type VersionBodyStorageState =
  | "full" | "redacted" | "hash_only" | "cold_storage" | "soft_pruned";

export type StorageMode =
  | "store_resolved_prompt" | "store_redacted_prompt" | "store_hash_only" | "do_not_store_prompt";

/** Per-child run lifecycle. */
export type ExecutionStatus = "queued" | "running" | "succeeded" | "failed" | "cancelled";

/** DT2: batch RUNTIME status (derived from children) — distinct from retention. */
export type BatchRunStatus =
  | "queued" | "running" | "partial_success_running"
  | "partial_success" | "succeeded" | "failed" | "cancelled";

/** DT2: batch RETENTION/GC status — distinct from runtime. */
export type BatchRetentionStatus = "active" | "partial_purged" | "empty_purged";

export type ProviderType =
  | "hosted_api" | "hosted_ui" | "local_llm" | "local_image" | "specialized_app" | "sandbox";

export type ExecutionMode =
  | "api_run" | "local_run" | "sandbox_run" | "insert_only" | "manual_copy";

export type AuthMode = "api_key" | "oauth" | "local" | "none" | "team_gateway";

export type UseOnlyEnforcementLevel = "none" | "weak" | "strong" | "sandbox_required";

export type UseOnlyWeakTargetPolicy =
  | "block" | "owner_override_required" | "allow_with_visible_downgrade_warning";

export type PromptPermissionLevel = "owner" | "editor" | "viewer" | "use_only";

export type PermissionContext =
  | "private" | "shared_project" | "shared_team" | "view_only"
  | "use_only" | "export_restricted" | "license_restricted";

export type ScoreEntityType =
  | "run" | "trace" | "span" | "test_bench_item" | "output_asset" | "prompt_version";

export type ScoreSource = "human" | "assertion" | "llm_judge" | "system" | "imported";

export type ScoreDataType = "numeric" | "categorical" | "boolean";

export type AssetType = "text" | "image" | "video" | "audio" | "file";

export type WorkflowMergeStrategy =
  | "choose_one" | "compare_side_by_side" | "concatenate" | "rank_and_select" | "manual_select";

/** DT5: union of both drafts. `color_palette` matches the ImageFields key. */
export type VisualTokenCategory =
  | "style" | "medium" | "camera" | "lighting" | "composition"
  | "color_palette" | "render" | "mood" | "artist" | "quality" | "custom";

export type TokenConflictBehavior = "block" | "warn" | "allow" | "auto_replace";

export type NegativePromptMode = "inline_flag" | "separate_field" | "unsupported";

export type StyleProfileKind = "tone" | "brand_voice" | "writing" | "visual" | "coding";

export type PreviewMode = "stored" | "builder" | "rendered";

export type PromptUsageEvent =
  | "run" | "copy" | "insert" | "export" | "share" | "test_run";

export type PromptSourceKind =
  | "user_authored" | "imported" | "clipped" | "seeded" | "generated" | "unknown";

/* =====================================================================================
 * 2. License & provenance
 * ===================================================================================== */

/** D7: normalized license/provenance entity. */
export interface LicenseMetadata extends Timestamped {
  id: UUID;
  license: LicenseStatus;
  source_url?: URI;
  license_source_url?: URI;
  license_captured_at?: ISODateTime;
  attribution?: string;
  verification_status: VerificationStatus;
  is_shareable: boolean;            // derived
  redistribution_allowed: boolean;  // derived
  notes?: string;
}

/**
 * Unknown/proprietary/personal-use-only/link-only ⇒ private active use only;
 * public share/export blocked until resolved.
 */
export function canShareLicense(license: LicenseMetadata): boolean {
  const blocked: LicenseStatus[] = ["unknown", "proprietary", "personal-use-only", "link-only"];
  return (
    license.is_shareable &&
    license.redistribution_allowed &&
    !blocked.includes(license.license)
  );
}

/* =====================================================================================
 * 3. Value objects (embedded; not standalone tables)
 * ===================================================================================== */

export type VariableType =
  | "text" | "long_text" | "dropdown" | "multi_select" | "boolean" | "date" | "number"
  | "conditional" | "json"
  | "file_ref" | "document_ref" | "contact_ref" | "project_ref" | "image_ref";

export interface VariableValidationRules {
  max_length?: number;
  min_length?: number;
  validation_pattern?: string;     // regex
  allowed_values?: JsonValue[];
  required_shape?: JsonObject;
}

/** DT4: recursion flag grouped with safety. ALWAYS forced false for use_only prompts. */
export interface VariableSafetyPolicy {
  sanitize_injection_risks: boolean;
  allow_urls: boolean;             // default false
  allow_markdown: boolean;         // default false
  allow_html: boolean;             // default false
  allow_recursive_resolution: boolean; // default false; forced false for use_only
}

/** PromptVariable — typed fill-form definition (edit layer). D3: persisted JSONB on prompt/variant in V1. */
export interface PromptVariable extends Timestamped {
  id: UUID;
  prompt_id?: UUID;
  variant_id?: UUID;
  global_id?: UUID;                // → GlobalVariable
  key: string;                     // matches {{key}} in body
  label?: string;
  type: VariableType;
  default_value?: JsonValue;
  required: boolean;
  params?: JsonObject;             // Espanso-style type config (choices, date format, layout)
  validation_rules?: VariableValidationRules;
  safety_policy: VariableSafetyPolicy;
  ref_filter?: string;             // scope for *_ref types
  sort_order?: number;
}

/** Definition snapshot embedded inside PromptVersion / PromptRun (no id/timestamps). */
export interface PromptVariableDefinitionSnapshot {
  key: string;
  label?: string;
  type: VariableType;
  default_value?: JsonValue;
  required?: boolean;
  params?: JsonObject;
  validation_rules?: VariableValidationRules;
  safety_policy?: VariableSafetyPolicy;
}

/** A resolved runtime value with the env layer it came from (powers the env-stack inspector). */
export interface VariableValueSnapshot {
  key: string;
  value: JsonValue;
  source_layer: VariableEnvironmentLayer;
  resolved_at: ISODateTime;
}

/** A key/value model parameter (e.g. --ar 16:9, temperature 0.7). */
export interface PromptParameter {
  key: string;
  value: string;
}

/** A selected image token with mandatory cached fallback (survives library changes). */
export interface SelectedVisualToken {
  token_id?: UUID;                 // live → VisualToken
  cached_token_text: string;       // REQUIRED fallback
  category: VisualTokenCategory;
  source_profile_id?: Slug;
  selected_at: ISODateTime;
}

/** Structured image-prompt builder state (value object). */
export interface ImageFieldsSnapshot {
  subject: string;                 // free text, always leads
  style?: SelectedVisualToken[];
  medium?: SelectedVisualToken[];
  camera?: SelectedVisualToken[];
  lighting?: SelectedVisualToken[];
  composition?: SelectedVisualToken[];
  color_palette?: SelectedVisualToken[];
  render?: SelectedVisualToken[];
  custom_modifiers?: string[];
  negative_prompt?: string;
  parameters?: JsonObject;
}

/** Discriminated builder-state snapshot across modalities. */
export interface PromptBuilderStateSnapshot {
  mode: PromptType;
  blocks?: JsonObject;             // writing/coding block fields
  image_fields?: ImageFieldsSnapshot;
  agent_fields?: JsonObject;
  workflow_fields?: JsonObject;
}

/** Remix-attribution preparation (inert until V4). */
export interface AttributionLink {
  name: string;
  license: LicenseStatus;
  url?: URI;
}

/* =====================================================================================
 * 4. Vault domain — Prompt / Variant / Version
 * ===================================================================================== */

export interface Prompt extends Timestamped, SoftDeletable {
  id: UUID;
  title: string;
  description?: string;

  // SQL-D1: Prompt is metadata only — NO body. Bodies live in PromptVersion (under a variant).
  // Capture lineage (raw_body/normalized_body) lives on the version. Variable definitions are
  // PromptVariable rows (SQL-D4); image tokens are SelectedVisualToken rows (SQL-D5).

  prompt_type: PromptType;
  owner_id: string;
  owner_type?: OwnerType;
  folder_id?: UUID | null;
  category_id?: UUID | null;

  status: PromptStatus;            // default "inbox"
  favorite: boolean;               // independent flag (default false)

  source: PromptSourceKind;
  source_url?: URI;
  license_metadata_id?: UUID | null; // D7 → LicenseMetadata
  captured_from_app?: string;
  capture_timestamp?: ISODateTime;

  target_tool?: string;
  target_model?: string;
  syntax_profile_id?: Slug | null;
  default_execution_target_id?: Slug | null;
  default_variant_id?: UUID | null;

  // Reuse / triggers / components
  trigger?: string;                // Prompt Studio namespace "/..."
  trigger_scope?: string[];
  uses_blocks?: UUID[];            // → PromptBlock
  style_profile_ids?: UUID[];

  visibility: Visibility;          // default "private"
  pack_ids?: UUID[];

  // Remix prep (inert until V4)
  remix_of?: UUID;
  attribution_chain?: AttributionLink[];

  version: number;                 // current head version_number
  use_count: number;

  /** Search/cache only; normalized source of truth is Tag + PromptTag. */
  tags_search_cache?: string[];

  last_used_at?: ISODateTime;
}

/** Agenta branch concept. A variant is a branch/strategy, NOT chronological history. */
export interface PromptVariant extends Timestamped {
  id: UUID;
  prompt_id: UUID;
  name: string;
  description?: string;
  variant_type: PromptVariantType;
  // SQL-D1: variant holds NO body — bodies live in PromptVersion. Variant-level variable
  // overrides are PromptVariable rows scoped by variant_id (SQL-D4).

  target_tool?: string;
  target_model?: string;
  default_execution_target_id?: Slug | null;
  default_syntax_profile_id?: Slug | null;

  is_default: boolean;
  status: Extract<PromptStatus, "draft" | "active" | "needs_review" | "deprecated" | "archived">;
  version: number;                 // head version_number for this variant's own version line
}

/** Immutable committed snapshot. Append-only; never UPDATE the body. Body lives HERE (SQL-D1). */
export interface PromptVersion extends Timestamped {
  id: UUID;
  prompt_id: UUID;
  variant_id: UUID;                // SQL-D1: REQUIRED — a version always belongs to a variant

  // D1: dual-track identity
  version_number: number;          // canonical, monotonic per variant
  commit_hash?: string;            // optional integrity/dedup/display only

  body?: string;
  raw_body?: string;               // capture lineage (raw → cleaned → committed)
  normalized_body?: string;
  refactored_from_raw?: boolean;
  body_hash?: string;
  body_storage_state: VersionBodyStorageState; // default "full"

  negative_prompt?: string;
  parameters_snapshot?: PromptParameter[];
  variables_snapshot?: PromptVariableDefinitionSnapshot[];
  builder_state_snapshot?: PromptBuilderStateSnapshot; // blocks / image subject / custom_modifiers
  syntax_profile_id?: Slug | null;

  commit_message?: string;
  created_by: string;
  soft_pruned_at?: ISODateTime | null;
}

/** Autosave draft — never a committed version; expires. */
export interface PromptDraftSnapshot extends Timestamped {
  id: UUID;
  prompt_id: UUID;
  variant_id?: UUID;
  body_snapshot?: string;
  builder_state_snapshot?: PromptBuilderStateSnapshot;
  expires_at?: ISODateTime;
}

export type PromptRelationshipType =
  | "variant_of" | "inspired_by" | "uses_block" | "part_of_workflow"
  | "replaces" | "companion_to" | "translation_of" | "forked_from"
  | "derived_from" | "depends_on" | "improves" | "pairs_with" | "related";

export interface PromptRelationship extends Timestamped {
  id: UUID;
  source_prompt_id: UUID;
  target_prompt_id: UUID;
  relationship_type: PromptRelationshipType;
  note?: string;
}

/** Guard: a version must belong to the given variant + prompt. */
export function assertVersionBelongsToVariant(version: PromptVersion, variant: PromptVariant): void {
  if (version.variant_id !== variant.id || version.prompt_id !== variant.prompt_id) {
    throw new Error("PromptVersion must belong to the specified PromptVariant and Prompt.");
  }
}

/* =====================================================================================
 * 5. Organization domain
 * ===================================================================================== */

export interface Folder extends Timestamped {
  id: UUID;
  name: string;
  parent_id?: UUID | null;
  owner_id: string;
  owner_type?: OwnerType;
  is_builtin_scaffold?: boolean;
  sort_order?: number;
}

export interface Tag extends Timestamped {
  id: UUID;
  name: string;
  slug: string;
  owner_id?: string;
  owner_type?: OwnerType;
}

export interface PromptTag {
  prompt_id: UUID;
  tag_id: UUID;
  created_at: ISODateTime;
}

export interface PromptPack extends Timestamped {
  id: UUID;
  owner_id: string;
  name: string;
  description?: string;
  cover_ref?: string;
  category_id?: UUID;
  visibility: Visibility;
  shared_variables?: PromptVariable[];
  license_metadata_id?: UUID;
  license_summary?: string;
  version: string;                 // e.g. "1.2"
}

export interface PromptPackItem extends Timestamped {
  id: UUID;
  pack_id: UUID;
  prompt_id: UUID;
  variant_id?: UUID;
  version_id?: UUID;
  included_as?: "prompt" | "variant" | "version" | "example" | "workflow";
  sort_order?: number;
}

export interface ProjectPromptKit extends Timestamped {
  id: UUID;
  project_id: UUID;
  prompt_ids: UUID[];
  shared_variables?: PromptVariable[];
  style_profile_ids?: UUID[];
  example_ids?: UUID[];
}

/* =====================================================================================
 * 6. Variable domain (definitions + environment)
 * ===================================================================================== */

export interface GlobalVariable extends Timestamped {
  id: UUID;
  owner_id: string;
  owner_type?: OwnerType;
  key: string;
  label?: string;
  type: VariableType;
  value: JsonValue;
  params?: JsonObject;
  validation_rules?: VariableValidationRules;
  safety_policy?: VariableSafetyPolicy;
}

export type VariableEnvironmentLayer =
  | "system_default" | "global" | "prompt" | "variant" | "pack" | "project_kit" | "runtime";

/** Runtime layer — applied at run/copy/insert; NEVER mutates the prompt record. */
export interface VariableEnvironment extends Timestamped {
  id: UUID;
  scope_type: VariableEnvironmentLayer;
  scope_id?: string;
  owner_id?: string;
  values: Record<string, JsonValue>;
}

/** Later layers override earlier layers for a single fill/run only. */
export const VARIABLE_RESOLUTION_ORDER: VariableEnvironmentLayer[] = [
  "system_default", "global", "prompt", "variant", "pack", "project_kit", "runtime",
];

/** Frozen values for one fill/copy/run (often embedded as PromptRun.variables_used_snapshot). */
export interface PromptFillSnapshot {
  id: UUID;
  prompt_id: UUID;
  variant_id?: UUID;
  version_id?: UUID;
  values: VariableValueSnapshot[];
  created_at: ISODateTime;
}

export interface StyleProfile extends Timestamped {
  id: UUID;
  name: string;
  kind: StyleProfileKind;
  body: string;                    // resolved/inserted text
  variable_key?: string;           // e.g. "brand_voice" → {{brand_voice}}
  owner_id: string;
}

export interface PromptBlock extends Timestamped {
  id: UUID;
  name: string;
  body: string;
  scope: "personal" | "global" | "project" | "pack";
  scope_id?: UUID;
  tags?: string[];
  owner_id: string;
}

/* =====================================================================================
 * 7. Builder / Syntax / Image domain
 * ===================================================================================== */

export interface SyntaxProfileTokenConflictRule {
  token_id: UUID;
  incompatible_with?: UUID[];
  mutually_exclusive_group_id?: string;
  behavior: TokenConflictBehavior;
}

export interface SyntaxProfile extends Timestamped {
  id: Slug;
  name: string;
  target_family:
    | "generic" | "chatgpt" | "claude" | "gemini" | "ollama"
    | "midjourney" | "stable_diffusion" | "flux" | "comfyui" | "custom";
  profile_version: string;
  render_rules: JsonObject;
  parameter_rules?: JsonObject;
  negative_prompt_mode?: NegativePromptMode;
  negative_prompt_rules?: JsonObject;
  /** Active profile is the FINAL authority on token-conflict behavior. */
  conflict_rules?: SyntaxProfileTokenConflictRule[];
}

/** Exact rendered output at preview/copy/run (storage governed by privacy). */
export interface RenderedPromptSnapshot {
  id: UUID;
  prompt_id: UUID;
  variant_id?: UUID;
  version_id?: UUID;
  syntax_profile_id?: Slug;
  mode?: PreviewMode;
  rendered_body?: string;
  rendered_messages?: Array<{ role: string; content: string }>;
  storage_mode: StorageMode;
  rendered_at: ISODateTime;
}

export interface VisualToken extends Timestamped {
  id: UUID;
  token_text: string;
  category: VisualTokenCategory;
  preview_ref?: string;
  compatible_models?: string[];
  synonyms?: string[];
  incompatible_with?: UUID[];
  mutually_exclusive_group_id?: string;
  source: "builtin" | "user";
  rating?: number | null;          // 1–5
  use_count?: number;
  syntax_profile_rules?: JsonObject;
}

/* =====================================================================================
 * 8. Execution target domain
 * ===================================================================================== */

export interface ExecutionTargetCapabilities {
  supports_text: boolean;
  supports_image: boolean;
  supports_video: boolean;
  supports_audio: boolean;
  supports_files: boolean;
  supports_streaming: boolean;
  supports_parallel_runs: boolean;
  supports_tools?: boolean;
  supports_json_mode?: boolean;
  supports_system_messages?: boolean;
  supports_seed?: boolean;
  supports_negative_prompt?: boolean;
  supports_aspect_ratio?: boolean;
  context_window_tokens?: number;
  max_output_tokens?: number;
  cost_model?: "free" | "metered" | "subscription" | "unknown";
  capability_source?: "manual" | "discovered" | "best_effort";
}

export interface ExecutionTarget extends Timestamped, ExecutionTargetCapabilities {
  id: Slug;
  name: string;
  provider_type: ProviderType;
  provider_name: string;
  model_name?: string;
  endpoint_url?: URI;
  auth_mode?: AuthMode;
  credential_owner_type?: OwnerType;
  syntax_profile_id?: Slug;

  execution_mode: ExecutionMode;
  can_run_directly: boolean;
  can_insert_only: boolean;

  is_local?: boolean;
  is_team_controlled?: boolean;
  is_sandboxed?: boolean;
  is_available: boolean;
  use_only_enforcement_level: UseOnlyEnforcementLevel;
}

/** Hosted-UI targets are insert/copy only unless an approved integration exists. */
export function isDirectRunTarget(target: ExecutionTarget): boolean {
  return (
    target.can_run_directly &&
    target.execution_mode !== "insert_only" &&
    target.execution_mode !== "manual_copy"
  );
}

/** Credentials never exposed to prompt users or use_only grantees. */
export interface ExecutionCredential extends Timestamped {
  id: UUID;
  execution_target_id: Slug;
  owner_id: string;
  owner_type: OwnerType;
  credential_kind: "api_key" | "oauth_token" | "local_endpoint" | "team_gateway_secret";
  secret_ref: string;              // points to a secrets vault; never inline
  status: "active" | "revoked" | "expired" | "needs_reauth";
}

export interface ExecutionQuotaPolicy extends Timestamped {
  id: UUID;
  owner_id?: string;
  execution_target_id?: Slug;
  daily_run_limit?: number;
  monthly_run_limit?: number;
  budget_limit?: number;
  budget_currency?: string;
  warn_before_expensive_run: boolean;
  cancel_batch_on_cost_threshold?: number;
  disabled_target_ids?: Slug[];
}

/* =====================================================================================
 * 9. Run / Telemetry domain
 * ===================================================================================== */

export interface ExecutionTargetRef {
  execution_target_id: Slug;
  provider_type: ProviderType;
  provider_name: string;
  model_name?: string;
}

export interface PromptRunBatch extends Timestamped {
  id: UUID;
  prompt_id: UUID;
  variant_id?: UUID;
  version_id: UUID;
  selected_targets: ExecutionTargetRef[];

  // DT2: two distinct status fields (do NOT collapse)
  run_status: BatchRunStatus;            // runtime, derived from children
  retention_status: BatchRetentionStatus; // GC lifecycle

  created_by: string;
  metadata?: JsonObject;
}

export interface PromptRun extends Timestamped {
  id: UUID;
  batch_id?: UUID;
  prompt_id: UUID;
  variant_id?: UUID;
  version_id: UUID;                       // pins exact version (RESTRICT delete)

  execution_target_id: Slug;
  provider_type: ProviderType;
  provider_name: string;
  model_name?: string;
  syntax_profile_id?: Slug;
  trace_id?: UUID;

  status: ExecutionStatus;
  error_code?: string;
  error_message?: string;

  // Reproducibility snapshots (frozen)
  variables_used_snapshot: Record<string, JsonValue>;
  parameters_used_snapshot?: JsonObject;

  // Hot metrics (token counts canonical; cost optional/computed)
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  latency_ms?: number;
  time_to_first_token_ms?: number;
  cost_estimate?: number;
  cost_currency?: string;
  cost_calculated_at?: ISODateTime;

  // Privacy (use_only ≠ store_resolved_prompt)
  storage_mode: StorageMode;
  use_only_sandbox?: boolean;

  /** D5: cached UX shortcut only; PromptScore is source of truth. */
  user_rating_cache?: number | null;     // 1–5

  completed_at?: ISODateTime | null;
}

export interface PromptTrace extends Timestamped {
  id: UUID;
  prompt_run_id?: UUID;
  test_bench_item_id?: UUID;
  workflow_run_snapshot_id?: UUID;
  name?: string;
  session_id?: string;
  user_id?: string;
  status?: ExecutionStatus;
  metadata?: JsonObject;
}

export type PromptTraceSpanType =
  | "model_generation" | "tool_call" | "retrieval" | "workflow_step" | "event" | "span";

export interface PromptTraceSpan extends Timestamped {
  id: UUID;
  trace_id: UUID;
  parent_span_id?: UUID | null;          // self-referential tree
  span_type: PromptTraceSpanType;
  name?: string;
  start_time: ISODateTime;
  end_time?: ISODateTime;
  input_snapshot?: JsonValue;
  output_snapshot?: JsonValue;
  metadata?: JsonObject;
  status?: ExecutionStatus;
  error_info?: JsonObject;
}

/** Cold/controlled storage for heavy or sensitive bodies (Helicone pattern). */
export interface PromptRunPayload extends Timestamped {
  id: UUID;
  prompt_run_id: UUID;
  payload_type:
    | "resolved_prompt" | "redacted_prompt" | "raw_provider_request"
    | "raw_provider_response" | "output_body" | "compressed_trace";
  storage_mode: StorageMode;
  content_ref?: string;            // object-storage pointer
  content_inline?: string;         // small payloads only
  content_hash?: string;
  metadata?: JsonObject;
}

/** Every meaningful use; drives Prompt.use_count. */
export interface PromptUsageRecord {
  id: UUID;
  prompt_id: UUID;
  variant_id?: UUID;
  version_id?: UUID;                // FK to PromptVersion (DDL v0.3)
  version_number: number;           // snapshot for fast queries
  event: PromptUsageEvent;
  target_tool?: string;
  target_model?: string;
  surface?: string;                // app/site for insert/copy
  created_at: ISODateTime;
}

/* =====================================================================================
 * 10. Output domain
 * ===================================================================================== */

export interface PromptOutputAsset extends Timestamped {
  id: UUID;
  prompt_run_id: UUID;
  prompt_id: UUID;
  variant_id?: UUID;
  version_id?: UUID;
  asset_type: AssetType;
  file_id?: UUID;                  // → Files capability
  text_output?: string;           // inline for small text
  metadata?: JsonObject;          // EXIF/workflow/PNG metadata
  parameters_snapshot?: JsonObject;
  model_badge?: string;
  seed?: string | number;
  width?: number;
  height?: number;
  duration_ms?: number;
  favorite: boolean;
  rating?: number | null;
}

/** Curated reusable sample attached to a prompt/version/pack. */
export interface PromptExample extends Timestamped {
  id: UUID;
  prompt_id: UUID;
  variant_id?: UUID;
  version_id?: UUID;
  output_asset_id?: UUID;         // may be promoted from an asset
  title?: string;
  description?: string;
  example_input?: JsonValue;
  example_output?: JsonValue;
  sort_order?: number;
}

/* =====================================================================================
 * 11. Testing / Eval domain  (three-tier)
 * ===================================================================================== */

export interface PromptTestSuite extends Timestamped {
  id: UUID;
  prompt_id?: UUID;
  owner_id: string;
  name: string;
  description?: string;
  metadata?: JsonObject;
}

export interface PromptTestCase extends Timestamped {
  id: UUID;
  suite_id: UUID;
  name?: string;
  input_variables: Record<string, JsonValue>;
  expected_output?: JsonValue;
  expected_notes?: string;
  tags?: string[];
  metadata?: JsonObject;
  valid_from?: ISODateTime;
  valid_to?: ISODateTime;
}

export interface PromptAssertion extends Timestamped {
  id: UUID;
  test_case_id: UUID;
  assertion_type:
    | "contains" | "not_contains" | "regex" | "equals"
    | "json_schema" | "llm_judge" | "custom";
  value?: JsonValue;
  threshold?: number;
  metric?: string;
  weight?: number;
  provider_override?: string;
  config?: JsonObject;
}

export interface TestBenchSession extends Timestamped {
  id: UUID;
  prompt_id: UUID;
  name?: string;
  description?: string;
  test_case_ids?: UUID[];
  version_ids?: UUID[];
  variant_ids?: UUID[];
  execution_target_ids?: Slug[];
  created_by: string;
  status: ExecutionStatus;
  metadata?: JsonObject;
}

/** Universal eval join: case × version × variant × target → run/trace. */
export interface TestBenchItem extends Timestamped {
  id: UUID;
  session_id: UUID;
  test_case_id: UUID;
  prompt_version_id: UUID;
  variant_id?: UUID;
  execution_target_id: Slug;
  prompt_run_id?: UUID;
  trace_id?: UUID;
  status: ExecutionStatus;
}

/** Polymorphic evaluation score — source of truth (not PromptRun.user_rating_cache). */
export interface PromptScore extends Timestamped {
  id: UUID;
  entity_type: ScoreEntityType;
  entity_id: UUID;
  name: string;
  value_numeric?: number;
  value_string?: string;
  value_boolean?: boolean;
  data_type: ScoreDataType;
  source: ScoreSource;
  comment?: string;
  author_user_id?: string;
}

/* =====================================================================================
 * 12. Workflow domain  (normalized; canvas_graph_json is UI-only)
 * ===================================================================================== */

export interface PromptWorkflow extends Timestamped {
  id: UUID;
  prompt_id?: UUID;
  name: string;
  description?: string;
  status: Extract<PromptStatus, "draft" | "active" | "deprecated" | "archived">;
  /** UI layout + imported graph snapshot ONLY — never the execution source of truth. */
  canvas_graph_json?: JsonObject;
  created_by: string;
}

export type WorkflowStepType =
  | "prompt" | "inline_prompt" | "tool" | "retrieval"
  | "merge" | "condition" | "transform" | "human_review";

export type WorkflowOutputKind =
  | "raw_text" | "markdown" | "json" | "structured_fields" | "asset" | "boolean" | "number";

/** D4: contract bundled as a field on the step (not a separate entity in V1). */
export interface WorkflowOutputContractInline {
  output_key: string;
  output_kind: WorkflowOutputKind;
  output_schema?: JsonObject;
  required: boolean;
}

export interface WorkflowStep extends Timestamped {
  id: UUID;
  workflow_id: UUID;
  step_key: string;
  step_type: WorkflowStepType;
  prompt_id?: UUID;
  variant_id?: UUID;
  version_id?: UUID;
  inline_body?: string;
  execution_target_id?: Slug;
  output_contract?: WorkflowOutputContractInline; // D4
  model_override?: string;
  sort_order: number;
  config_snapshot?: JsonObject;
}

export interface WorkflowInputMap extends Timestamped {
  id: UUID;
  workflow_step_id: UUID;          // consuming step
  from_step_id?: UUID;
  from_output_key?: string;
  from_run_id?: UUID;              // bind to a specific run (parallel/multi-target)
  from_branch_id?: UUID;
  from_execution_target_id?: Slug;
  into_variable_key: string;
}

export interface WorkflowRunSnapshot extends Timestamped {
  id: UUID;
  workflow_id: UUID;
  prompt_run_batch_id?: UUID;
  workflow_version_ref?: string;
  step_snapshots: JsonObject[];
  input_maps_snapshot: JsonObject[];
  output_contracts_snapshot: JsonObject[];
  branch_rules_snapshot?: JsonObject;
  merge_rules_snapshot?: JsonObject;
  status: ExecutionStatus;
}

export interface WorkflowExecutionBranch extends Timestamped {
  id: UUID;
  workflow_run_snapshot_id: UUID;
  branch_key: string;
  originating_step_id: UUID;
  originating_run_id: UUID;
  originating_execution_target_id: Slug;
  status: ExecutionStatus;
}

export interface WorkflowMergeStep extends Timestamped {
  id: UUID;
  workflow_id: UUID;
  step_id: UUID;
  input_branch_ids: UUID[];
  merge_strategy: WorkflowMergeStrategy;
  output_key: string;
}

/* =====================================================================================
 * 13. Governance / Licensing domain
 * ===================================================================================== */

export interface PromptPermission extends Timestamped {
  id: UUID;
  prompt_id?: UUID;
  pack_id?: UUID;
  grantee_id: string;
  grantee_type: OwnerType;
  permission_level: PromptPermissionLevel;
  context?: PermissionContext;
  granted_by?: string;
}

export interface PromptSecurityPolicy extends Timestamped {
  id: UUID;
  prompt_id: UUID;
  use_only_weak_target_policy: UseOnlyWeakTargetPolicy;
  allow_local_targets_for_use_only: boolean;
  allow_insert_only_for_use_only: false; // structurally always false
  require_sandbox_for_use_only?: boolean;
}

export type PromptAuditEventType =
  | "prompt_created" | "prompt_updated" | "prompt_deleted" | "prompt_restored"
  | "prompt_exported" | "pack_exported" | "license_changed" | "visibility_changed"
  | "permission_granted" | "permission_revoked"
  | "use_only_run_attempted" | "use_only_weak_target_blocked" | "use_only_downgraded_with_override"
  | "secret_detected" | "secret_redacted" | "public_share_attempt_blocked"
  | "execution_target_added" | "execution_target_removed" | "api_key_connection_changed";

export interface PromptAuditEvent extends Timestamped {
  id: UUID;
  event_type: PromptAuditEventType;
  actor_id?: string;
  prompt_id?: UUID;
  variant_id?: UUID;
  version_id?: UUID;
  execution_target_id?: Slug;
  /** MUST NOT contain secret values. */
  metadata?: JsonObject;
}

export interface RetentionPolicy extends Timestamped {
  id: UUID;
  owner_id?: string;
  purge_runs_after_days?: number;             // 0 = never
  purge_versions_keep_last_n?: number;        // default 50
  strip_images_from_runs_after_days?: number; // 0 = never
  purge_usage_events_after_days?: number;     // 0 = never
  preserve_favorited_runs: boolean;           // default true
  preserve_runs_used_as_examples: boolean;    // default true
}

/* =====================================================================================
 * 14. Import / Export domain
 * ===================================================================================== */

export interface PromptPackManifest {
  schema_version: string;
  min_app_version?: string;
  exported_from_app_version?: string;
  exported_at: ISODateTime;
  compatibility_notes?: string[];
  migration_required?: boolean;
  license_list?: LicenseMetadata[];
}

export type ImportSourceType =
  | "prompt_pack" | "prompts_chat_csv" | "promptsource_yaml"
  | "json" | "markdown" | "browser_capture" | "manual";

export interface ImportJob extends Timestamped {
  id: UUID;
  source_type: ImportSourceType;
  source_ref?: string;
  status: "queued" | "running" | "succeeded" | "partial_success" | "failed";
  created_by: string;
  completed_at?: ISODateTime;
}

export interface ImportItemResult extends Timestamped {
  id: UUID;
  import_job_id: UUID;
  source_item_ref?: string;
  status: "imported" | "skipped" | "failed" | "conflict" | "needs_review";
  prompt_id?: UUID;
  error_message?: string;
  metadata?: JsonObject;
}

/* =====================================================================================
 * 15. Reuse domain — triggers / insertion (impl detail in Browser Extension PRD)
 * ===================================================================================== */

export interface TriggerProfile {
  app_key: string;
  template_prefix?: string;        // default ";"
  prompt_prefix?: string;          // default "/", fallback "::" / "//"
  reserved_prefixes?: string[];
  conflict_strategy?: "warn" | "block" | "fallback";
}

export interface ExtensionOverlayProfile {
  app_key: string;
  overlay_mode: "shadow_dom" | "isolated_root" | "native_popup";
  anchor_strategy: "viewport_coordinates" | "input_bounding_rect" | "caret_position";
  input_observation: "passive" | "active";
  allow_dom_mutation_during_composition: boolean; // default false
  reserved_native_commands?: string[];
}

export interface InsertionProfile {
  id: UUID;
  app_key: string;
  target_name: string;
  target_selector_hint?: string;
  command_prefix?: string;         // e.g. "/imagine prompt:"
  fill_variables_before_insert?: boolean;
  max_insert_chars_soft?: number;
  max_insert_chars_hard?: number;
  supports_large_paste?: boolean;
  supports_files?: boolean;
  supports_markdown?: boolean;
  supports_multiline?: boolean;
  fallback_strategy: "truncate" | "file_reference" | "section_picker" | "block_insert";
  is_builtin?: boolean;
}

/* =====================================================================================
 * 16. Constants (PRD §6.2 / §18.1 / §26)
 * ===================================================================================== */

export const PROMPT_LIMITS = {
  TITLE_MAX: 200,
  BODY_MAX: 50_000,
  DESCRIPTION_MAX: 2_000,
  NOTES_MAX: 10_000,
  VARIABLES_MAX: 50,
  BULK_IMPORT_BATCH: 500,
  MANUAL_COMPILE_CHARS_SOFT: 20_000,
  MANUAL_COMPILE_CHARS_HARD: 100_000,
} as const;

/** Prompt Health weighted formula (advisory; never blocks save). Weights sum to 100. */
export const HEALTH_WEIGHTS = {
  task: 20, context: 15, variables: 15, format: 15,
  constraints: 10, examples: 10, model_syntax: 10, safety_license: 5,
} as const;

export const HEALTH_BANDS = {
  excellent: [85, 100],
  good: [70, 84],
  needs_improvement: [50, 69],
  weak: [0, 49],
} as const;

/* =====================================================================================
 * 17. Lifecycle & promotion guards
 * ===================================================================================== */

export interface PromptPromotionCheckInput {
  prompt: Prompt;
  has_body_or_builder_state_or_variant_version: boolean;
  license?: LicenseMetadata;
  has_blocking_lint_issue: boolean;
  has_folder_or_pack: boolean;
}

export interface PromptPromotionResult {
  can_promote: boolean;
  private_only?: boolean;
  blocking_reasons: string[];
  warnings: string[];
}

/** Encodes PRD §26.14 promotion-to-active rules. */
export function canPromotePromptToActive(input: PromptPromotionCheckInput): PromptPromotionResult {
  const blocking_reasons: string[] = [];
  const warnings: string[] = [];
  let private_only = false;

  if (!input.prompt.prompt_type) blocking_reasons.push("prompt_type is required.");
  if (!input.license) blocking_reasons.push("license metadata is required.");
  if (!input.prompt.source) blocking_reasons.push("source is required or must be user_authored.");
  if (!input.has_folder_or_pack) blocking_reasons.push("Prompt must belong to a folder or pack.");
  if (input.has_blocking_lint_issue) blocking_reasons.push("Blocking lint issues must be resolved.");
  if (!input.has_body_or_builder_state_or_variant_version) {
    blocking_reasons.push("At least one body, builder state, or variant version is required.");
  }
  if (input.license && input.license.license === "unknown") {
    private_only = true;
    warnings.push("Unknown license allows private/internal active use only; share/export blocked.");
  }

  return { can_promote: blocking_reasons.length === 0, private_only, blocking_reasons, warnings };
}

/* =====================================================================================
 * 18. Phasing (informational; mirrors logical schema §15)
 * ===================================================================================== */

export const V1_REQUIRED_ENTITIES = [
  "Prompt", "PromptVariant", "PromptVersion", "PromptDraftSnapshot",
  "Folder", "Tag", "PromptTag", "PromptPack", "PromptPackItem",
  "PromptVariable", "GlobalVariable", "VariableEnvironment", "PromptFillSnapshot",
  "SyntaxProfile", "ExecutionTarget",
  "PromptRunBatch", "PromptRun", "PromptUsageRecord", "PromptOutputAsset",
  "LicenseMetadata", "PromptPermission", "PromptAuditEvent",
  "ImportJob", "ImportItemResult",
] as const;

export const V1_5_V2_ENTITIES = [
  "PromptRelationship", "ProjectPromptKit", "StyleProfile", "PromptBlock",
  "RenderedPromptSnapshot", "VisualToken", "SelectedVisualToken",
  "ExecutionCredential", "ExecutionQuotaPolicy",
  "PromptTrace", "PromptTraceSpan", "PromptRunPayload", "PromptExample",
  "PromptTestSuite", "PromptTestCase", "PromptAssertion",
  "TestBenchSession", "TestBenchItem", "PromptScore",
  "PromptSecurityPolicy", "RetentionPolicy", "PromptPackManifest",
  "TriggerProfile", "ExtensionOverlayProfile", "InsertionProfile",
] as const;

export const V3_ENTITIES = [
  "SyntaxProfileTokenConflictRule",
  "PromptWorkflow", "WorkflowStep", "WorkflowInputMap",
  "WorkflowRunSnapshot", "WorkflowExecutionBranch", "WorkflowMergeStep",
] as const;

/* =====================================================================================
 * 19. Domain invariants (service contract — enforced by services)
 * =====================================================================================
 *  1. PromptVersion is immutable — body fields allow only non-null→NULL (retention);
 *     structural/identity fields never change. Enforced by DB trigger (DDL v0.3).
 *  2. A version ALWAYS belongs to a variant (SQL-D1: version.variant_id required); its
 *     prompt_id must equal the variant's prompt_id (DB trigger). Capture creates a
 *     default variant + first version.
 *  3. Exactly one default variant per prompt. default_variant_id must point to a variant
 *     belonging to the same prompt (DB trigger).
 *  4. favorite is a flag, never a PromptStatus value.
 *  5. PromptRun.version_id required; referenced version is delete-RESTRICTed (soft-prune only).
 *  6. use_only runs: storage_mode ≠ store_resolved_prompt; no copy/insert/export.
 *  7. User variable values literal unless safety_policy.allow_recursive_resolution=true,
 *     which is FORCED false for use_only.
 *  8. Variant variable merge: parent safety metadata inherits unless redefined;
 *     a TYPE change stops inheritance → strict defaults.
 *  9. Pack/project/run VariableEnvironment layers never mutate Prompt/Variant records.
 * 10. SelectedVisualToken.cached_token_text required; render falls back to it.
 * 11. PromptScore is the eval source of truth; user_rating_cache is a cache only.
 * 12. Every executed TestBenchItem links case → version → target → run.
 * 13. Workflow runs execute against WorkflowRunSnapshot; edits apply to future runs only.
 * 14. Multi-target workflow step → branches; downstream binds to a specific
 *     run/branch/target, never a generic output_key; collapse via WorkflowMergeStep.
 * 15. PromptRunBatch keeps run_status and retention_status as SEPARATE fields (DT2).
 * 16. PromptAuditEvent append-only; never stores secret values.
 * 17. Unknown/proprietary/personal-use-only/link-only license ⇒ private active only;
 *     public share/export blocked (see canShareLicense()).
 * ===================================================================================== */

/* =====================================================================================
 * 20. Next step
 * =====================================================================================
 * prompt-studio-schema.sql (DDL v0.3) — COMPLETE. Migration candidate.
 *  - D3/SQL-D4: normalized prompt_variables table (not JSONB-on-record).
 *  - Unique index (variant_id, version_number); optional unique(variant_id, commit_hash).
 *  - Hot/cold partitioning: PromptRun metrics vs PromptRunPayload bodies.
 *  - Cascades: version RESTRICT; batch→runs SET NULL; pack→items CASCADE.
 *  - DB triggers: version immutability, version↔variant parent match,
 *    default_variant same-prompt enforcement.
 * ===================================================================================== */
