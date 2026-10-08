# Prompt Studio — Logical Schema & OSS Provenance Map (Canonical / Merged)

**Document type:** Logical data model — Step 1 of the schema pipeline
**Capability:** Prompt Studio (see `prompt-studio-prd.md`)
**Status:** Canonical. Merge of two independent logical-schema drafts, reconciled.
**Do not treat this as SQL.** Entities, relationships, lifecycle, invariants, provenance only.

> **Pipeline.** PRD → **this logical schema** → `prompt-studio-domain-types.ts` → `prompt-studio-schema.sql` (DDL v0.2). The Gemini "Physical Model v0.1" DDL is **retired** (PRD §27.4) and must not be carried forward without re-derivation from this document.
>
> **Merge note.** This canonical version unifies both prior drafts. Resolved merge decisions: **D7** normalized `LicenseMetadata` entity; **D8** `PromptTrace` + `PromptTraceSpan`; **D9** `PromptTestSuite` + `PromptTestCase` + `PromptAssertion`; **D10** foundational V1 scope (heavier V1 per §15). Still open (resolve in TS domain step): **D1, D3, D4** (§16).

---

## 1. Schema Philosophy

Prompt Studio is a structured prompt **workspace**, not a single prompt table. It is a **composite, provenance-grounded model** — no single OSS product is the base:

```
Langfuse + Opik        → versions, traces, runs, scores, datasets/suites
Agenta                 → variants as branches
Promptfoo              → tests, assertions, matrix evaluation
Helicone               → hot/cold telemetry strategy
Dify/Flowise/Langflow  → workflow graph concepts (normalized for determinism)
Espanso                → typed variable / form model
ComfyUI PromptManager  → output asset gallery
prompts.chat / PromptSource → seed import format
Prompt Studio native   → execution targets, syntax profiles, license provenance,
                         use_only, packs, environment stack, insertion/trigger profiles,
                         style profiles, project kits, usage records
```

**Foundational invariant:** a prompt is a structured, versioned, executable record — never a text snippet.

---

## 2. Provenance Tags

| Tag | Meaning |
|---|---|
| **ADOPT** | Closely follows a proven OSS model/pattern |
| **ADAPT** | Borrows a proven OSS idea, modified for Prompt Studio |
| **NATIVE** | Prompt Studio-specific; no sufficient OSS equivalent |

---

## 3. Canonical Entity Catalog

56 entities across 10 domains. Phase per §15 (D10 = foundational V1).

| # | Entity | Domain | Provenance | Phase |
|---|---|---|---|---|
| E01 | **Prompt** | Vault | ADAPT (Opik parent + vault UX) | V1 |
| E02 | **PromptVariant** | Vault | ADOPT (Agenta) | V1 |
| E03 | **PromptVersion** | Vault | ADAPT (Langfuse int + Opik hash) | V1 |
| E04 | **PromptDraftSnapshot** | Vault | NATIVE | V1 |
| E05 | **PromptRelationship** | Vault | NATIVE | V2 |
| E06 | **Folder** | Organization | ADAPT (PromptBox/Superpower) | V1 |
| E07 | **Tag** | Organization | ADAPT (Tags module) | V1 |
| E08 | **PromptTag** (join) | Organization | ADAPT (ComfyUI normalized join) | V1 |
| E09 | **PromptPack** | Organization | ADAPT (PromptBase bundles) | V1 |
| E10 | **PromptPackItem** (join) | Organization | ADAPT | V1 |
| E11 | **ProjectPromptKit** | Organization | NATIVE | V2 |
| E12 | **PromptVariable** | Variables | ADAPT (Espanso + Text Blaze) | V1 |
| E13 | **GlobalVariable** | Variables | NATIVE (+ Text Templates) | V1 |
| E14 | **VariableEnvironment** | Variables | NATIVE (+ Dify env vars) | V1 |
| E15 | **PromptFillSnapshot** | Variables | ADAPT (Langfuse/Promptfoo repro) | V1 (often embedded on run) |
| E16 | **StyleProfile** | Variables | NATIVE | V1.5 |
| E17 | **PromptBlock** | Variables | NATIVE | V1.5 |
| E18 | **SyntaxProfile** | Builder | NATIVE | V1 (basic), V3 (editor) |
| E19 | **SyntaxProfileTokenConflictRule** | Builder | NATIVE | V3 |
| E20 | **RenderedPromptSnapshot** | Builder | NATIVE | V2 |
| E21 | **VisualToken** | Builder | ADAPT (PromptoMANIA + ComfyUI) | V2 |
| E22 | **SelectedVisualToken** | Builder | NATIVE | V2 |
| E23 | **ImageFields** (value object) | Builder | ADAPT (PromptoMANIA/ComfyUI) | V2 |
| E24 | **ExecutionTarget** | Execution | NATIVE (+ Langfuse/Helicone meta) | V1 |
| E25 | **ExecutionCredential** | Execution | NATIVE | V2 |
| E26 | **ExecutionQuotaPolicy** | Execution | ADAPT (Helicone cost/rate) | V2 |
| E27 | **PromptRunBatch** | Telemetry | ADAPT (Opik experiment + Promptfoo matrix) | V1 |
| E28 | **PromptRun** | Telemetry | ADAPT (Langfuse Observation + Helicone) | V1 |
| E29 | **PromptTrace** | Telemetry | ADAPT (Langfuse/Opik Trace) | V2 |
| E30 | **PromptTraceSpan** | Telemetry | ADAPT (Langfuse Observation tree / Opik spans) | V2 |
| E31 | **PromptRunPayload** | Telemetry | ADAPT (Helicone hot/cold) | V2 |
| E32 | **PromptUsageRecord** | Telemetry | NATIVE | V1 |
| E33 | **PromptOutputAsset** | Output | ADAPT (ComfyUI generated_images) | V1 |
| E34 | **PromptExample** | Output | ADAPT (PromptBase/PromptHero samples) | V2 |
| E35 | **PromptTestSuite** | Testing | ADAPT (Langfuse/Opik Dataset) | V2 |
| E36 | **PromptTestCase** | Testing | ADAPT (DatasetItem + Promptfoo tests) | V2 |
| E37 | **PromptAssertion** | Testing | ADAPT (Promptfoo assertions) | V2 |
| E38 | **TestBenchSession** | Testing | ADOPT (Langfuse DatasetRuns / Opik experiments) | V2 |
| E39 | **TestBenchItem** | Testing | ADOPT (Langfuse DatasetRunItems / Opik experiment_items) | V2 |
| E40 | **PromptScore** | Testing | ADOPT (Langfuse Score / Opik feedback_scores) | V2 |
| E41 | **PromptWorkflow** | Workflow | ADAPT (Dify/Flowise/Langflow, normalized) | V3 |
| E42 | **WorkflowStep** | Workflow | ADAPT | V3 |
| E43 | **WorkflowInputMap** | Workflow | NATIVE (+ Langflow I/O maps) | V3 |
| E44 | **WorkflowRunSnapshot** | Workflow | NATIVE | V3 |
| E45 | **WorkflowExecutionBranch** | Workflow | NATIVE | V3 |
| E46 | **WorkflowMergeStep** | Workflow | NATIVE | V3 |
| E47 | **PromptPermission** | Governance | NATIVE | V1 |
| E48 | **PromptSecurityPolicy** | Governance | NATIVE | V2 |
| E49 | **PromptAuditEvent** | Governance | ADAPT (standard audit) | V1 (security events) |
| E50 | **RetentionPolicy** | Governance | ADAPT (observability retention) | V2 |
| E51 | **LicenseMetadata** | Licensing | NATIVE | V1 |
| E52 | **PromptPackManifest** | Import/Export | NATIVE | V2 |
| E53 | **ImportJob** | Import/Export | NATIVE (+ prompts.chat/PromptSource) | V1 |
| E54 | **ImportItemResult** | Import/Export | NATIVE | V1 |
| E55 | **TriggerProfile / ExtensionOverlayProfile** | Reuse | NATIVE (ref Browser Extension PRD) | V1.5 |
| E56 | **InsertionProfile** | Reuse | NATIVE | V2 |

---

## 4. Relationship & Cardinality Map

Notation: `1` one, `N` many, `0..1` optional one.

### 4.1 Core spine
```
Prompt 1 ──< N PromptVariant         ;  Prompt 1 ──0..1 default PromptVariant
PromptVariant 1 ──< N PromptVersion  ;  Prompt 1 ──< N PromptVersion (base, no variant)
Prompt 1 ──< N PromptDraftSnapshot
Prompt N ──< N PromptRelationship >── N Prompt   (self-referential graph)
Prompt 1 ──0..1 LicenseMetadata (via license_metadata_id)   ; D7
```
> **SQL-D1 (revised):** a `PromptVersion` **always belongs to a variant** (`variant_id` required); `version.prompt_id` must equal the variant's `prompt_id`. Bodies live only in versions; `Prompt` and `PromptVariant` hold no body. Capture creates a default variant + first version. (This supersedes the earlier "version may belong to prompt OR variant" base-line model.)

### 4.2 Organization
```
Folder 1 ──< N Prompt   ;  Folder 1 ──< N Folder (hierarchy)
Prompt N ──< N Tag via PromptTag (join)
PromptPack 1 ──< N PromptPackItem >── 1 {Prompt|PromptVariant|PromptVersion}
Project 1 ──0..1 ProjectPromptKit ──< N Prompt
```

### 4.3 Variables
```
Prompt 1 ──< N PromptVariable   ;  PromptVariant 1 ──< N PromptVariable (overrides, merge by key)
PromptVariable 0..1 ──> 1 GlobalVariable
VariableEnvironment applied at runtime (not stored on Prompt)
PromptFillSnapshot per run (often embedded as PromptRun.variables_used_snapshot)
StyleProfile / PromptBlock referenced N..N by prompts
```

### 4.4 Builder / image
```
SyntaxProfile 1 ──< N SyntaxProfileTokenConflictRule
SyntaxProfile 1 ──< N {Prompt|PromptVariant|PromptVersion} (active/recommended profile)
VisualToken 1 ──< N SelectedVisualToken
Prompt/PromptVariant 1 ──< N SelectedVisualToken (per image field)
RenderedPromptSnapshot per preview/copy/run (storage by privacy)
```

### 4.5 Execution & telemetry
```
ExecutionTarget 1 ──0..1 ExecutionCredential   ;  ExecutionTarget 1 ──0..1 ExecutionQuotaPolicy
ExecutionTarget 1 ──< N PromptRun
PromptRunBatch 1 ──< N PromptRun                ; one run per target
PromptRun 1 ──> 1 PromptVersion                 ; pins exact version (RESTRICT delete)
PromptRun 0..1 ──> 1 PromptVariant
PromptRun 0..1 ──> 1 PromptTrace                ; detailed/agentic runs
PromptTrace 1 ──< N PromptTraceSpan (parent_span self-ref tree)
PromptRun 1 ──0..1 PromptRunPayload             ; cold/controlled body store
PromptRun 1 ──< N PromptOutputAsset
PromptRun 1 ──< N PromptUsageRecord             ; + copy/insert/export events not tied to a run
```

### 4.6 Testing & scoring
```
Prompt 1 ──< N PromptTestSuite
PromptTestSuite 1 ──< N PromptTestCase
PromptTestCase 1 ──< N PromptAssertion
TestBenchSession 1 ──< N TestBenchItem
TestBenchItem 1 ──> 1 PromptTestCase ; 1 ──> 1 PromptVersion ; 0..1 ──> 1 PromptVariant
TestBenchItem 1 ──> 1 ExecutionTarget ; 0..1 ──> 1 PromptRun ; 0..1 ──> 1 PromptTrace
PromptScore N ──> 1 {PromptRun | PromptTrace | PromptTraceSpan | TestBenchItem | PromptOutputAsset | PromptVersion}  (polymorphic)
```

### 4.7 Workflow
```
PromptWorkflow 1 ──< N WorkflowStep
WorkflowStep 1 ──< N WorkflowInputMap   ;  WorkflowStep 0..1 ──> 1 Prompt
PromptWorkflow 1 ──< N WorkflowRunSnapshot
WorkflowRunSnapshot 1 ──< N WorkflowExecutionBranch
WorkflowMergeStep 1 ──< N WorkflowExecutionBranch
```

### 4.8 Governance & import
```
Prompt 1 ──< N PromptPermission   ;  Prompt 1 ──0..1 PromptSecurityPolicy
{any entity} ──< N PromptAuditEvent (append-only)
ImportJob 1 ──< N ImportItemResult
PromptPack 1 ──0..1 PromptPackManifest (on export)
LicenseMetadata referenced by Prompt / PromptPack / imported items
```

---

## 5. Vault Domain (Prompt / Variant / Version)

### 5.1 Prompt (E01) — parent anchor — ADAPT (Opik)
Logical fields: `id`, `title`, `description`, canonical `body`, `raw_body`/`normalized_body`/`refactored_from_raw`, `prompt_type`, `owner_id`, `folder_id`, `category_id`, `status`, `favorite` (flag, not a status), `source`, `source_url`, `license_metadata_id` (→ E51, **D7**), `default_variant_id`, `default_execution_target_id?`, `syntax_profile_id?`, `trigger`/`trigger_scope`, counters (`use_count`, `version`), timestamps, `deleted_at`, remix fields (inert until V4).

> Do not repeat the prompt name on every version row (the Langfuse approach). Keep a normalized parent (Opik).

### 5.2 PromptVariant (E02) — branch — ADOPT (Agenta)
`id`, `prompt_id`, `name`, `description`, `variant_type` (model/channel/audience/language/modality/experiment), `default_execution_target_id?`, `default_syntax_profile_id?`, `is_default`, `status`, own `version` counter, timestamps.

### 5.3 PromptVersion (E03) — immutable snapshot — ADAPT (Langfuse/Opik)
`id`, `prompt_id`, `variant_id`, `version_number` **+ optional `commit_hash`** (D1), `body`, `body_hash`, `body_storage_state ∈ {full,redacted,hash_only,cold_storage,soft_pruned}`, `negative_prompt`, `parameters_snapshot`, `variables_snapshot`, `builder_state_snapshot`, `syntax_profile_id`, `commit_message`, `created_by`, `created_at`, `soft_pruned_at`.

### 5.4 PromptDraftSnapshot (E04) — NATIVE
Autosave; expiring; never a committed version.

### 5.5 PromptRelationship (E05) — NATIVE
`source_prompt_id`, `target_prompt_id`, `relationship_type` (improves/replaces/depends_on/forked_from/derived_from/pairs_with/companion_to/translation_of/workflow_step_of), `note`.

### 5.6 Invariants
1. Body canonical/required; builder prompts regenerate body before save.
2. Committed versions are **immutable** — append `INSERT`, never `UPDATE`-on-body. Body fields allow only `non-null → NULL` (retention/cold-storage); `NULL → non-null` and `text → different text` blocked. **DB trigger enforced** (DDL v0.3).
3. New version only on a **meaningful commit** (explicit save, accepted AI refactor, promotion to active, committed param/negative change, committed variant body) — never per keystroke (drafts use E04).
4. A version **always belongs to a variant** (SQL-D1); `version.prompt_id` = variant's `prompt_id` (**DB trigger enforced**). Bodies live only in versions.
5. Exactly one `default` variant per prompt. `default_variant_id` must point to a variant belonging to the same prompt (**DB trigger enforced**).
6. Variants = alternatives (own version line); versions = chronological history.
7. `favorite` is a boolean flag, never a status.
8. A version referenced by a run/test-bench-item/workflow-snapshot/audit/output-asset MUST NOT be hard-deleted (soft-prune only).

---

## 6. Variable Domain

### 6.1 PromptVariable (E12) — edit layer — ADAPT (Espanso)
`id`, `prompt_id?`, `variant_id?`, `key`, `label`, `type` (text/long_text/dropdown/multi_select/boolean/date/number/file_ref/document_ref/contact_ref/project_ref/conditional/json), `default_value`, `required`, `params`, `validation_rules`, `safety_policy` (sanitize_injection, allow_markdown/html/urls, max_length, validation_pattern), `allow_recursive_resolution` (default false), `sort_order`.

### 6.2 GlobalVariable (E13) / VariableEnvironment (E14) / PromptFillSnapshot (E15)
Global = reusable definition; PromptVariable may reference by `global_id`. Environment = runtime layers, **never mutate the record**: `system → global → prompt → variant → pack → project → run` (later overrides earlier for that run only). FillSnapshot = frozen values per run (usually embedded as `PromptRun.variables_used_snapshot`).

### 6.3 StyleProfile (E16) / PromptBlock (E17) — NATIVE
Style profiles resolve as a variable (live update); blocks are copied text at insert (provenance via `uses_blocks`).

### 6.4 Invariants
1. **Edit layer ≠ runtime layer:** typed definitions vs frozen JSONB snapshot.
2. User values **literal by default**; recursion only if `allow_recursive_resolution` and **never for `use_only`**.
3. Variant variables merge over parent by normalized key; parent safety/validation inherits unless redefined; **a type change stops inheritance → strict defaults**.
4. Pack/project/run variables are environment layers, not record mutations.

---

## 7. Builder / Image Domain

- **SyntaxProfile (E18) + TokenConflictRule (E19)** — NATIVE: per tool/model field set, parameter rules, negative-prompt mode (`inline_flag|separate_field|unsupported`), conflict overrides (`block|warn|allow|auto_replace`). The **active profile is the final authority** on token conflicts.
- **RenderedPromptSnapshot (E20)** — exact rendered string at preview/copy/run (storage by privacy).
- **VisualToken (E21)** — ADAPT (ComfyUI): `token_text`, `category`, `preview_ref`, `synonyms`, `incompatible_with`, `mutually_exclusive_group_id`, `syntax_profile_rules`, source, rating, use_count.
- **SelectedVisualToken (E22)** — NATIVE: `token_id` (live) **+ mandatory `cached_token_text` fallback** + category + source_profile + selected_at. Rendering MUST NOT depend solely on live lookup.
- **ImageFields (E23)** — value object: `subject` + token arrays (`style[]`,`medium[]`,`camera[]`,`lighting[]`,`composition[]`,`color_palette[]`,`render[]`) of SelectedVisualToken + `custom_modifiers[]` + `negative_prompt` + `parameters`. Assembly: subject , joined-tokens trailing-flags.

---

## 8. Execution Target Domain

- **ExecutionTarget (E24)** — NATIVE: `provider_type` (`hosted_api|hosted_ui|local_llm|local_image|specialized_app|sandbox`), `provider_name`, `model_name`, `endpoint_url`, `auth_mode`, `credential_owner_type`, `execution_mode` (`api_run|local_run|sandbox_run|insert_only|manual_copy`), `can_run_directly`/`can_insert_only`, capability flags (text/image/video/audio/files/streaming/parallel/tools/json_mode/system_messages/seed/negative_prompt/aspect_ratio), context_window/max_output, cost_model, `use_only_enforcement_level` (`none|limited|strong|sandbox_required`), `syntax_profile_id`, `is_available`.
- **ExecutionCredential (E25)** — NATIVE: owner classes user/team/project/admin-sandbox; never exposed to prompt users or `use_only` grantees; team-owned requires audit.
- **ExecutionQuotaPolicy (E26)** — ADAPT (Helicone): per-user run limits, target budget caps, est-cost warning, batch-cancel threshold, admin disable of high-cost targets.

**Invariants:** deterministic target resolution (user → prompt default → variant default → project/kit → last-used → system default → copy/manual); `provider_type` ≠ `execution_mode`; `hosted_ui` defaults to Insert/Copy unless approved integration; `use_only` strong enforcement only on sandbox/team-server targets; weak-target handling is **owner-policy-controlled** (E48), never grantee-controlled.

---

## 9. Run / Telemetry Domain

- **PromptRunBatch (E27)** — ADAPT (Opik experiment): groups multi-target runs. Two distinct status fields — runtime `run_status` (`queued|running|partial_success_running|partial_success|succeeded|failed|canceled`) and retention `status` (`active|partial_purged|empty_purged`). One failed child does not fail the batch.
- **PromptRun (E28)** — ADAPT (Langfuse Observation + Helicone): hot fields (refs, target, provider/model snapshot, `status`, token counts, `latency_ms`, `time_to_first_token_ms`, `cost_estimate`, `storage_mode`, `user_rating_cache` [D5 cache only], `error_code/message`, timestamps) + snapshot fields (`variables_used_snapshot`, `parameters_used_snapshot`). Heavy bodies/raw responses off-path → E31.
- **PromptTrace (E29)** + **PromptTraceSpan (E30)** — ADAPT (Langfuse/Opik): parent trace for workflows/agents/multi-step; spans are a self-referential tree (`parent_span_id`, `span_type`, in/out snapshots, status, error_info). **D8 resolved.**
- **PromptRunPayload (E31)** — ADAPT (Helicone): cold/controlled store for resolved/redacted prompt, raw request/response, output body; governed by `storage_mode` + retention + use_only policy.
- **PromptUsageRecord (E32)** — NATIVE: run/copy/insert/export/share/test_run events; drives `use_count`. References `version_id` (FK to PromptVersion) + `version_number` snapshot (DDL v0.3).

**Invariants:** run pins exact `version_id` (RESTRICT); `use_only` runs MUST NOT persist full resolved prompt client-visible; metrics on hot path, bodies/cost off-path; every meaningful use emits a UsageRecord.

---

## 10. Output Domain

- **PromptOutputAsset (E33)** — ADAPT (ComfyUI): `prompt_run_id`, snapshot links, `asset_type` (text/image/video/audio/file), `file_id`, `text_output?`, `metadata`, `parameters_snapshot`, `model_badge`, `seed`, `width`/`height`, `duration_ms`, `favorite`, timestamps. Outputs are gallery items + reusable examples, not run fields.
- **PromptExample (E34)** — ADAPT (PromptBase/PromptHero): curated reusable sample attached to prompt/version/pack; may be promoted from an output asset.

---

## 11. Testing / Eval Domain  (D9 resolved — three-tier)

- **PromptTestSuite (E35)** — ADAPT (Langfuse/Opik Dataset): `name`, `description`, `prompt_id`, `owner_id`, `metadata`.
- **PromptTestCase (E36)** — ADAPT (DatasetItem + Promptfoo tests): `suite_id`, `input_variables`, `expected_output`, `metadata`, `tags`, `valid_from`/`valid_to`.
- **PromptAssertion (E37)** — ADAPT (Promptfoo): `test_case_id`, `assertion_type`, `value`, `threshold`, `metric`, `weight`, `provider_override`, `config`.
- **TestBenchSession (E38)** — ADAPT (Langfuse DatasetRun / Opik experiment): `prompt_id`, `name`, `created_by`, `status`, `metadata`.
- **TestBenchItem (E39)** — ADOPT (Langfuse DatasetRunItems / Opik experiment_items): the universal join — `session_id`, `test_case_id`, `prompt_version_id`, `variant_id?`, `execution_target_id`, `prompt_run_id?`, `trace_id?`, `status`.
- **PromptScore (E40)** — ADOPT (Langfuse Score / Opik feedback_scores): `entity_type` (`run|trace|span|test_bench_item|output_asset|prompt_version`) + `entity_id`, `name`, typed triple (`value_numeric`/`value_string`/`value_boolean`) + `data_type`, `source` (`human|assertion|llm_judge|system|imported`), `comment`, `author_user_id`, `created_at`.

**Invariants:** every executed matrix cell produces a TestBenchItem; scores attach polymorphically (never overload the run; `PromptRun.user_rating_cache` is a derived shortcut only); Test Bench reuses the run/score model, not a separate path.

---

## 12. Workflow Domain  (normalized — reject monolithic blob)

- **PromptWorkflow (E41)** — ADAPT (Dify/Flowise/Langflow): `prompt_id`, `name`, `status`, `canvas_graph_json` (UI layout only, **not** execution truth), audit.
- **WorkflowStep (E42)** — `workflow_id`, `step_key`, `step_type`, `prompt_id`/`variant_id`/`version_id`/`inline_body`, `execution_target_id`, `output_contract` (**field per D4**) + `output_schema`, `sort_order`, `config_snapshot`.
- **WorkflowInputMap (E43)** — `workflow_step_id`, `from_step_id`, `from_output_key`, `from_run_id?`, `from_branch_id?`, `from_execution_target_id?`, `into_variable_key`.
- **WorkflowRunSnapshot (E44)** — NATIVE: freezes workflow/step versions, syntax profiles, target selections, input maps, output contracts, branch/merge rules at run start.
- **WorkflowExecutionBranch (E45)** — NATIVE: branch per multi-target step, bound to a specific `PromptRun.id`.
- **WorkflowMergeStep (E46)** — NATIVE: `choose_one|compare_side_by_side|concatenate|rank_and_select|manual_select`.

**Invariants:** execution reads immutable snapshot + static checkpoints, never live index; output mismatch → normalize to contract → pause on unrecoverable; multi-target step → branches; downstream binds to specific run/branch/target, never a generic key; collapse only via merge step.

---

## 13. Governance, Licensing, Import/Export, Reuse

- **PromptPermission (E47)** — NATIVE: `owner|editor|viewer|use_only` + context grants (`private|shared_project|shared_team|view_only|use_only|export_restricted|license_restricted`).
- **PromptSecurityPolicy (E48)** — NATIVE: `use_only_weak_target_policy` (`block|owner_override_required|allow_with_visible_downgrade_warning`), `allow_local_targets_for_use_only`, `allow_insert_only_for_use_only`(=false), `require_sandbox_for_use_only?`. Grantees cannot self-downgrade; weak-target behavior owner-controlled.
- **PromptAuditEvent (E49)** — ADAPT: append-only, never stores secret values; event types per PRD §26.15. Security events logged even single-user.
- **RetentionPolicy (E50)** — ADAPT: `purge_runs_after_days`, `purge_versions_keep_last_n`, `strip_images_from_runs_after_days`, `purge_usage_events_after_days`, `preserve_favorited_runs`, `preserve_runs_used_as_examples`. Referenced versions cannot be hard-deleted (soft-prune).
- **LicenseMetadata (E51)** — NATIVE, **D7 normalized entity**: `license`, `source_url`, `license_source_url`, `license_captured_at`, `attribution`, `verification_status`, `is_shareable`, `redistribution_allowed`, `notes`. Referenced by `Prompt.license_metadata_id`, packs, and imported items (dedup + single verification record). Unknown license → private active use only; blocks public share/export until resolved.
- **PromptPackManifest (E52)** — NATIVE: `schema_version`, `min_app_version`, `exported_from_app_version`, `exported_at`, `compatibility_notes`, `migration_required`, `license_list`.
- **ImportJob (E53) / ImportItemResult (E54)** — NATIVE: bulk import run + per-item outcome (created/skipped/merged/duplicate/license-blocked). Seed map (prompts.chat): `act→title`, `prompt→body`, `for_devs→tag/audience`, `type→prompt_type/category`, `contributor→attribution`.
- **TriggerProfile / ExtensionOverlayProfile (E55)** — NATIVE: `;` (Text Templates) vs `/` (Prompt Studio) namespaces, `::`/`//` fallbacks, Shadow-DOM overlay isolation. Full impl in Browser Extension PRD.
- **InsertionProfile (E56)** — NATIVE: per-app target selector, command prefix, fill-before-insert, soft/hard insert limits, fallback strategy.

---

## 14. Relational vs Snapshot Storage Boundary

| Stable relational (identity / integrity / permission / query) | Snapshot / blob / cold (reproducibility / flexibility) |
|---|---|
| Prompt, PromptVariant, PromptVersion, PromptVariable | `variables_used_snapshot`, `parameters_used_snapshot` |
| ExecutionTarget, PromptRunBatch, PromptRun, PromptTrace, PromptTraceSpan | `provider_raw_response`, `resolved_prompt_payload` (E31) |
| PromptTestSuite/Case/Assertion, TestBench*, PromptScore | `builder_state_snapshot`, `image_fields_snapshot` |
| PromptOutputAsset (row), PromptWorkflow/Step/InputMap | `output_contract_snapshot`, `canvas_graph_json`, `imported_raw_graph` |
| PromptPack/Item, Permission, AuditEvent, LicenseMetadata | `assertion_config`, `workflow_config_snapshot` |

Rule: relational = identity/integrity/permission/queryability; snapshots = reproducibility/flexibility; heavy bodies + computed cost off the hot path (Helicone).

---

## 15. V1 / V2 / V3 Phasing  (D10 = foundational V1 per ChatGPT)

### V1 (required — foundational)
```
Prompt · PromptVariant · PromptVersion · PromptDraftSnapshot
Folder · Tag · PromptTag · PromptPack · PromptPackItem
PromptVariable · GlobalVariable · VariableEnvironment · PromptFillSnapshot
SyntaxProfile (basic) · ExecutionTarget
PromptRunBatch · PromptRun · PromptUsageRecord · PromptOutputAsset
LicenseMetadata · PromptPermission · PromptAuditEvent (security)
ImportJob · ImportItemResult
```

### V1.5 / V2
```
PromptRelationship · ProjectPromptKit · StyleProfile · PromptBlock
RenderedPromptSnapshot · VisualToken · SelectedVisualToken · ImageFields
ExecutionCredential · ExecutionQuotaPolicy
PromptTrace · PromptTraceSpan · PromptRunPayload · PromptExample
PromptTestSuite · PromptTestCase · PromptAssertion · TestBenchSession · TestBenchItem · PromptScore
PromptSecurityPolicy · RetentionPolicy · PromptPackManifest
TriggerProfile/ExtensionOverlayProfile · InsertionProfile
```

### V3+
```
SyntaxProfile editor · SyntaxProfileTokenConflictRule
PromptWorkflow · WorkflowStep · WorkflowInputMap · WorkflowRunSnapshot · WorkflowExecutionBranch · WorkflowMergeStep
Public marketplace · remix attribution chain · advanced LLM-as-judge · team sandbox gateway
```

> **D10 note:** V1 is the *foundational* scope (spine + variants + packs + targets + runs + output + license + permissions), not the minimal capture-only loop. This was the chosen position; it front-loads the durable structures so later phases add behavior, not core re-modeling. The capture→fill→reuse user loop (PRD §26.1) remains the V1 *experience* priority even though the foundational entities are provisioned.

---

## 16. Open Decisions → TypeScript Domain Model

| ID | Decision | Status | Current logical position |
|---|---|---|---|
| **D1** | Version identity: int vs commit hash | **Resolved (TS)** | Dual-track: `version_number` (canonical, monotonic) + optional `commit_hash` (integrity/dedup/display only). |
| **D3** | Variable storage: relational vs JSONB | **Resolved → normalized (SQL-D4)** | Normalized `prompt_variables` table (prompt- or variant-scoped); runtime values always frozen into a snapshot. (Revised from the earlier JSONB-on-record lean.) |
| **SQL-D1** | Body/variant model | **Resolved → normalized** | `Prompt`/`PromptVariant` hold metadata only; bodies live in `PromptVersion`; `version.variant_id` required; capture creates a default variant + first version. |
| **SQL-D5** | Selected image tokens | **Resolved → table** | `selected_visual_tokens` table per committed version (with `cached_token_text` fallback). |
| **D4** | Output contract: entity vs field | **Resolved (TS)** | Field on `WorkflowStep` (`output_contract` + `output_schema`); promote to entity only if shared. |
| **D7** | License modeling | **Resolved** | Normalized `LicenseMetadata` entity (E51); `Prompt.license_metadata_id`. |
| **D8** | Trace granularity | **Resolved** | `PromptTrace` + `PromptTraceSpan` (E29/E30). |
| **D9** | Test-layer depth | **Resolved** | `PromptTestSuite` + `PromptTestCase` + `PromptAssertion` (E35–E37). |
| **D10** | V1 scope | **Resolved** | Foundational V1 (§15). |

Cosmetic: cached rating column — `user_rating_cache` (chosen) over `rating`.

---

## 17. Provenance Summary

| Tag | Count | Examples |
|---|---|---|
| **ADOPT** | 5 | PromptVariant (Agenta), PromptVersion (Langfuse/Opik), TestBenchItem + PromptScore (Langfuse), … |
| **ADAPT** | ~22 | Prompt (Opik), PromptVariable (Espanso), PromptRun/Trace/Span/Payload (Langfuse/Helicone/Opik), Suite/Case/Assertion (Langfuse+Promptfoo), VisualToken/OutputAsset/Example (ComfyUI/PromptBase), Workflow* (Dify), Folder/Tag, ImportJob, RetentionPolicy, QuotaPolicy |
| **NATIVE** | ~29 | execution targets/credentials, syntax profiles + conflict rules, LicenseMetadata, governance (permission/security/audit), packs, environment stack, style profiles/blocks, selected tokens, workflow snapshots/branches/merge, trigger/insertion profiles, usage records, relationships, project kits, drafts, global variables |

**Determination:** spine + telemetry + eval are borrowed from proven OSS; the differentiating ~55% (execution targets, license provenance, governance, packs, environment stack, reuse profiles) is Plenix-native — the moat.

---

## 18. Next Step

Per PRD §27.6: next artifact is **`prompt-studio-domain-types.ts`** — TypeScript interfaces resolving D1/D3/D4 and modeling nested types (variables, syntax profiles, output contracts, environment stacks) — then `prompt-studio-schema.sql` (DDL v0.2). SQL last.
