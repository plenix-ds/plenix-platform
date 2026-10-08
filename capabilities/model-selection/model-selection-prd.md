# Model Selection PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Model Selection |
| **Capability ID** | model_selection |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST allow users to select and configure AI models for different tasks — choosing between providers, balancing quality vs speed vs cost, and setting per-capability model preferences.

## 2. Problem Statement

Not yet defined.

## 3. Goals & Non-Goals

### Goals

Not yet defined.

### Non-Goals

Not yet defined.

## 4. User Types / Actors

| Actor | Description |
|---|---|
| Owner | Full control over this capability |
| Admin | Administrative access |
| Team Member | Internal user with scoped access |
| Consultant | External specialist with limited access |
| Client Portal User | External client with restricted view |
| AI Agent | Automated AI operations |

## 5. User Stories

Not yet defined.

## 6. Use Cases / Scenarios

### UC-01 — Not yet defined

| Item | Detail |
|---|---|
| Actor | Not yet defined. |
| Goal | Not yet defined. |
| Main Flow | Not yet defined. |
| System Response | Not yet defined. |
| Alternate Flow | Not yet defined. |

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

Value-added behavior beyond Create, Edit, Delete, and Search.

Source feature area(s): Model Selection

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Multi-model support — choose the right AI for each task** | 🔵 Planned | Use case: Different tasks need different AI capabilities. Writing a quick email requires a different model than generating a complex multi-file codebase or analyzing 500 pages of legal documents. Plenix gives the user access to multiple AI models from different providers — Anthropic (Claude), Google (Gemini), OpenAI (GPT), xAI (Grok), and others. The model selector is accessible from the chat input area. The selected model persists per thread, so the user can use Claude Opus for deep research in one thread and Claude Haiku for quick drafts in another. All models have equal access to the same tools: web search, file handling, data analysis, and all connected integrations. |
| F02 | **Model catalog — context windows, capabilities, cost tiers** | 🔵 Planned | The model selector shows a comparison table or card list with: model name, provider, context window size, whether prompt caching is supported, cost tier (Economy / Standard / Premium), and a one-line 'best for' description. Documented models: Claude Opus 4.7 (Anthropic, 1M context, Premium — hardest software engineering and long-horizon agent work), Claude Opus 4.6 (Anthropic, 1M, Premium — previous flagship, complex reasoning), Claude Sonnet 4.6 (Anthropic, 1M, Standard — best balance of speed and intelligence), Claude Haiku 4.5 (Anthropic, 200K, Economy — fast and cost-efficient), Gemini 3.1 Pro (Google, 1M, Standard — advanced reasoning with multimodal input), GPT-5.4 (OpenAI, 1M, Standard — capable all-rounder with reasoning), MiniMax M2.7 (MiniMax, 196K, Economy — agentic coding at very low cost), Grok 4.20 (xAI, 2M context, Standard — largest available context window). This list grows as new models release. |
| F03 | **Extended thinking toggle in model selector** | 🔵 Planned | When a thinking-capable model is selected (Claude Sonnet 4.6 or Claude Opus variants), a 'Max Thinking' toggle appears at the top of the model selector dropdown. Enabling it activates extended reasoning mode for that thread. The brain icon and toggle state are visually prominent so the user always knows whether extended thinking is active. The toggle is per-thread and defaults to off. Turning it on increases credit consumption per message. |
| F04 | **Prompt caching — automatic cost and latency reduction** | 🔵 Planned | Most models support prompt caching, which reduces both cost and response latency on follow-up messages within the same thread. When the AI processes a message, repeated parts of the conversation (system prompt, earlier messages, uploaded files already seen) are served from cache at a lower token rate rather than re-processed in full. Caching is automatic — the user does not need to configure anything. The model selector card for each model shows whether caching is supported. For long research threads or multi-turn workflows, caching can meaningfully reduce credit consumption. |
| F05 | **Credit system — usage tracking and cost transparency** | 🔵 Planned | Model usage is measured in credits deducted based on actual token consumption. Three cost tiers: Economy (~0.1–1 credits per message: MiniMax M2.7, Claude Haiku 4.5), Standard (~1–6 credits: Claude Sonnet 4.6, GPT-5.4, Gemini 3.1 Pro, Grok 4.20), Premium (~5–20 credits: Claude Opus 4.7, Claude Opus 4.6). Exact cost per message depends on message length, conversation history length, and output length. Remaining credits are displayed in the sidebar. A credit usage breakdown is available in Account settings showing spend by model, date range, and task type. Prompt caching lowers effective cost for long threads. Extended thinking increases cost for that message. |

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Not yet defined

| Rule | Behavior |
|---|---|

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|

## 12. Database / Schema Notes

Not yet defined.

## 13. Permissions Matrix

| Role | Create | View | Edit | Delete | Archive | Export | Share | AI Access |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Owner | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Admin | Yes | Yes | Yes | Limited | Yes | Yes | Yes | Yes |
| Team Member | Yes | Scoped | Scoped | No | Maybe | Maybe | No | Scoped |
| Consultant | Maybe | Assigned | Limited | No | No | No | No | Limited |
| Client Portal | No | Client-visible | Limited | No | No | Maybe | No | Limited |

## 14. UI / UX Requirements

### 10.1 Screens

| Screen | Purpose |
|---|---|

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|

## 15. Workflow Requirements

| Operation | Required Behavior | Shared/Core Handling |
|---|---|---|
| Create | Not yet defined. | |
| Edit | Not yet defined. | |
| Delete | Not yet defined. | |
| Search | Not yet defined. | |

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|

## 19. OSS / Build-vs-Buy Decision

1. **Primary reference: LibreChat (MIT license — embed or self-host).** LibreChat is the closest OSS analog to {APP_NAME}'s model-selection capability. It implements multi-provider routing (OpenAI, Anthropic, Google, Mistral, Ollama, and others) through a unified API abstraction, a per-thread model selector UI, agent frameworks, MCP tool integration, artifacts, and a code interpreter. Study its `api/server/services/Endpoints/` directory for provider adapters and its `client/src/components/Chat/Input/ModelSelector/` for the selector UI pattern. License classification: **MIT — safe to embed source patterns directly or run as a self-hosted service on Plenix infrastructure.** Do not wholesale fork and redistribute under a proprietary name without attribution.

2. **Local model inference: Ollama (MIT license — self-hosted service).** Ollama exposes a local OpenAI-compatible REST API (`/api/chat`, `/api/generate`) and manages model weight downloads, quantisation, and GPU/CPU scheduling. Run one Ollama instance per Plenix server node. {APP_NAME} routes local model requests to Ollama; no user data leaves the server. License classification: **MIT — self-host on Plenix infrastructure; no redistribution concern.** CRITICAL: the Ollama binary license is MIT, but each model weight loaded through Ollama carries its own separate license (e.g., Llama 3 uses the Meta Community License, Mistral uses Apache 2.0, Gemma uses Google's custom terms). Audit the weight license for every model offered to users before enabling it — do not assume MIT just because the runner is MIT.

3. **Model weight license audit is mandatory before enabling any local model.** For every model weight exposed through Ollama or any other local inference runtime, verify: (a) whether commercial use is permitted, (b) whether redistribution of the weights is permitted, (c) whether there are user-count or revenue thresholds that trigger different terms, and (d) whether the license requires displaying attribution to end-users. Maintain an internal model registry table with columns: model name, weight source, weight license, commercial-use status, redistribution status, and review date. Block deployment of any model whose weight license is unclear or commercially restricted until legal review is complete.

4. **Provider API abstraction layer — build a single internal interface.** Do not scatter provider-specific SDK calls across the codebase. Define one `ModelClient` interface with methods `chat(messages, options)`, `stream(messages, options)`, and `countTokens(messages)`. Implement one adapter per provider: `AnthropicAdapter`, `OpenAIAdapter`, `GoogleAdapter`, `OllamaAdapter`. The model selector UI and all downstream capabilities (Notes AI, Tasks AI, Search AI, etc.) call only the interface — they never import a provider SDK directly. LibreChat's endpoint service layer is the reference for this pattern.

5. **Cloud provider credentials are opt-in and user-supplied or admin-supplied — never bundled.** OpenAI, Anthropic, Google, and xAI API keys must be configured explicitly (either per-user in account settings or per-deployment in server config). {APP_NAME} must never ship with a hardcoded API key. On a fresh install with no cloud keys configured, the model selector must still function using local Ollama models. The UI must clearly distinguish local models (no egress, no cost) from cloud models (data leaves the server, credit consumption applies).

6. **MCP (Model Context Protocol) integration — use LibreChat's MCP client as the reference.** LibreChat supports MCP tool registration and invocation through its agent framework. Study its `api/server/services/ToolService.js` and the MCP client implementation for the pattern of registering tools from MCP servers, injecting them into the system prompt, and routing tool-call responses back to the model. {APP_NAME} will host an internal MCP server that exposes its own capabilities (notes, tasks, calendar, files) as tools available to every model uniformly. License classification: **MCP specification is MIT (Anthropic open standard) — no license concern.**

7. **Extended thinking / reasoning mode — Anthropic-specific, handle gracefully for non-Anthropic models.** The `thinking` parameter (`{"type": "enabled", "budget_tokens": N}`) is available only on Claude Sonnet 4.6 and Claude Opus variants via the Anthropic API. For all other providers the Max Thinking toggle must be hidden or disabled, not silently ignored. The adapter layer must declare a `supportsThinking: boolean` capability flag so the UI can conditionally render the toggle. Budget tokens should be configurable by tier: Standard thinking (~8K budget), Max Thinking (~32K–64K budget). Warn users that extended thinking increases credit consumption proportionally.

8. **Prompt caching — implement per-provider, not as a generic abstraction.** Anthropic caching uses explicit `cache_control: {"type": "ephemeral"}` markers on system prompt blocks and large document blocks. OpenAI caching is automatic (no client-side markers needed) but only applies to prompts over 1,024 tokens. Google Gemini uses the separate Caching API with explicit cache object creation. Each adapter must implement caching in the provider-native way. The `ModelClient` interface should expose a `supportsCaching: boolean` flag and a `buildCachedMessages(messages)` helper so upstream code does not need to know provider details. Do not attempt a unified caching abstraction that maps poorly to all three providers.

9. **Credit metering — decouple from provider billing, own the accounting layer.** {APP_NAME}'s credit system is internal: 1 credit does not equal $0.01 or any fixed dollar amount. The credit cost per message is computed server-side from actual token counts (input tokens, output tokens, cache-read tokens, cache-write tokens, thinking tokens) multiplied by a per-model-tier rate table stored in the database. Never expose raw dollar costs or raw token counts to end-users — only credits. The rate table must be updatable without a code deploy (store in DB or config, not hardcoded). Implement a post-request hook in the adapter layer that records token usage and deducts credits atomically; if the deduction fails, log but do not surface a billing error to the user for the current message.

10. **E2EE warning — cloud models break end-to-end encryption by design.** If {APP_NAME} implements E2EE for notes or messages in a future capability, sending that content to a cloud AI provider (Anthropic, OpenAI, Google) requires decrypting it server-side before the API call. This means cloud AI usage is architecturally incompatible with true E2EE. The UI must surface a clear, non-dismissible warning the first time a user enables a cloud model in any context that touches encrypted content: "Sending this content to [Provider] means it leaves {APP_NAME}'s servers in readable form. Local models never send your data externally." Local Ollama models do not have this limitation.

11. **Platform fragility — provider APIs change without notice.** Model names, parameter schemas, rate limits, pricing, and feature availability (e.g., thinking mode, context windows) change frequently across all cloud providers. Mitigations: (a) store model catalog metadata (context window, capability flags, cost tier) in the database rather than hardcoding in the adapter, (b) implement a nightly job that fetches each provider's model list API and diffs against the catalog, alerting on discrepancies, (c) version-pin provider SDKs and test on upgrade, (d) treat any model that disappears from a provider's API as immediately hidden from the selector rather than erroring at inference time.

12. **What {APP_NAME} builds natively vs defers.** Build natively: the `ModelClient` interface and all provider adapters, the model selector UI component, the per-thread model preference store, the credit metering and accounting layer, the model catalog DB table and admin management UI, the Ollama integration and local model weight audit process, and the MCP server that exposes {APP_NAME} capabilities as tools. Defer to existing services: raw inference compute for cloud models (Anthropic API, OpenAI API, Google API), local inference runtime (Ollama), and the MCP protocol specification itself. Do not build a custom inference runtime or attempt to run model weights outside of Ollama — that is out of scope until dedicated infrastructure and ML engineering capacity exist.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|

### Related Capabilities

| Capability | Relationship |
|---|---|

## 21. Notifications / Activity

Not yet defined.

## 22. Non-Functional Requirements

### Performance

Not yet defined.

### Accessibility

Not yet defined.

### Security / Privacy

Not yet defined.

## 23. Reporting / Analytics

Not yet defined.

## 24. Migration / Import / Export

Not yet defined.

## 25. Open Questions

| Question | Status | Notes |
|---|---:|---|

## 26. Risks & Decisions

### Risks

Not yet defined.

### Decisions Made

Not yet defined.

## 27. Verification & Testing

### Acceptance Criteria

Not yet defined.

### Testing Requirements

Not yet defined.

## 28. Readiness Gate

```
[ ] PRD sections 1-27 complete
[ ] Data model approved
[ ] Field-level spec complete
[ ] Schema drafted
[ ] Permissions matrix approved
[ ] API contract drafted
[ ] UI skeleton approved
[ ] Workflow rules documented
[ ] OSS decision finalized
[ ] Integration map confirmed both directions
[ ] AI/search rules defined
[ ] Notification/activity rules defined
[ ] Security/privacy rules defined
[ ] Edge cases documented
[ ] Acceptance criteria written
[ ] Testing requirements written
[ ] Performance requirements defined
[ ] MVP/future scope separated
[ ] Open questions resolved or deferred
[ ] Risks documented
[ ] Decisions recorded
```
