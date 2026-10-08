# AI Agents PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | AI Agents |
| **Capability ID** | ai_agents |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST enable users to create, configure, deploy, and manage AI agent personas that respond to messages across connected channels with defined system prompts, tool permissions, and escalation rules.

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

Source feature area(s): AI Agents

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **AI Agent creation and management** | 🔵 Planned | Use case: A user wants to deploy an AI persona that responds to messages across connected channels autonomously. An AI Agent is a configured LLM instance (e.g. Claude Sonnet) with a name, avatar, system prompt, tone settings, and permitted tools (web search, calendar lookup, file retrieval, contact lookup, task creation). The Agents screen lists all configured agents as cards showing: name, short description, assigned channels, and Active/Paused status. Clicking an agent opens its full configuration. |
| F02 | **Agent system prompt and persona** | 🔵 Planned | The agent configuration includes a multi-line system prompt editor where the user writes the agent's instructions, personality, role, and constraints. Preset persona templates are offered as starting points: Customer Support, Personal Assistant, Research Helper, Sales Assistant. A 'Test agent' button opens a live chat preview panel so the user can interact with the agent before deploying it to any channel. |
| F03 | **Agent tool permissions** | 🔵 Planned | A toggle list controls what the agent is allowed to do: Web Search, Calendar Read, Task Creation, Contact Lookup, File Search, Email Draft, and custom Webhooks. Each tool shows a brief description of what it enables. Disabling a tool removes it from the agent's available functions at the API level, not just at the prompt level — so it is a hard constraint, not just an instruction. |
| F04 | **Agent–channel assignment** | 🔵 Planned | A user may have multiple agents (e.g. customer-facing support and internal productivity) and multiple channels (Telegram, WhatsApp, Discord). The assignment UI lets the user assign agents to channels via dropdown on each channel card. One channel can only have one active agent at a time. One agent can be assigned to multiple channels simultaneously with consistent behavior across all. |
| F05 | **Agent conversation logs** | 🔵 Planned | Each agent has a Logs tab: chronological conversations showing who sent the message, which channel it came from, the user's message, and the agent's reply. Filterable by channel, date range, and outcome (success / escalated / error). Clicking a row opens the full thread. A 'Flag for review' action marks a conversation for follow-up. |
| F06 | **Human escalation and handoff** | 🔵 Planned | When the agent cannot confidently answer (based on a confidence threshold or keyword triggers), it escalates to a human. The human receives a notification in Plenix Messaging with the full conversation context pre-loaded. They can reply directly and return control to the agent when done. The agent monitors the handoff and resumes autonomously when the human marks it resolved. |

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

1. **Embed LangChain (MIT) as the primary agent framework.** LangChain is the most widely adopted OSS LLM orchestration library (50k+ GitHub stars). It provides chains, agents, RAG pipelines, tool-calling abstractions, and memory primitives that map directly onto {APP_NAME}'s agent feature set (F01–F06). License: MIT — embed directly into the {APP_NAME} server layer with no distribution restrictions. Do not vendor a fork; track upstream releases and pin to a minor version to control breaking changes.

2. **Embed LangGraph (MIT) for stateful multi-actor agent workflows.** LangGraph extends LangChain with a graph-based execution model that supports branching, loops, and persistent state across turns. Use it to model the escalation and handoff flow (F06): the graph has nodes for agent-reply, confidence-check, human-handoff, and resume-from-handoff. Each edge is a conditional transition. License: MIT — embed alongside LangChain. LangGraph's checkpointing API is the natural backing store for agent conversation state; connect it to {APP_NAME}'s primary database rather than its default in-memory store.

3. **Tool permissions are enforced at the API call layer, not the prompt layer.** Feature F03 specifies that disabling a tool is a hard constraint. Implement this by building a ToolRegistry that resolves the active permission set for each agent at request time and constructs the tools list passed to the LLM API. If Calendar Read is disabled, the calendar tool object is never included in the API call — the model cannot invoke it even if the system prompt were to instruct it to. Never rely on a prompt instruction like "do not use calendar" as the sole enforcement mechanism.

4. **Reference AutoGen (MIT) for multi-agent patterns, but do not embed it.** Microsoft's AutoGen (MIT) is the leading OSS framework for multi-agent conversation patterns (round-robin, selector, nested chats). {APP_NAME}'s V1 does not need multi-agent orchestration, but studying AutoGen's GroupChat and AssistantAgent abstractions is recommended before designing the agent-to-agent delegation extension planned for a later milestone. License: MIT — reference only; do not embed in V1 to avoid dependency bloat and a larger attack surface.

5. **Use LiteLLM (MIT) as the model-provider abstraction layer.** LiteLLM provides a unified OpenAI-compatible interface over 100+ LLM providers (Anthropic, OpenAI, Gemini, Mistral, local Ollama instances). Embedding LiteLLM means {APP_NAME} can let users select their preferred model (F01: "e.g. Claude Sonnet") without writing provider-specific integration code for each one. License: MIT — embed directly. Route all LLM API calls through LiteLLM; never call provider SDKs directly from agent logic. This also centralizes cost tracking and retry logic.

6. **Self-host a vector store for agent RAG and file search.** The File Search tool permission (F03) requires semantic retrieval over user-uploaded documents. Qdrant (Apache 2.0) or Chroma (Apache 2.0) are the recommended OSS options: both are embeddable for development and support a self-hosted Docker deployment for production. Do not use a managed third-party vector service (e.g. Pinecone) in V1 — it creates a dependency on a paid external service and routes user document data off-platform. License: Apache 2.0 — self-hosted service. Integrate via LangChain's VectorStore abstraction so the backing store is swappable.

7. **Implement Web Search via a self-hostable or privacy-respecting proxy; do not hardcode a commercial search API key into the agent.** SearXNG (AGPL-3.0) is the recommended self-hosted metasearch engine. Warning: AGPL-3.0 requires that any modifications to SearXNG itself be open-sourced — {APP_NAME} must run it as an unmodified self-hosted service and call it over HTTP, never embed its source into the {APP_NAME} codebase. Alternatively, use the Brave Search API (commercial, privacy-respecting, no user-data retention) as a managed fallback. Clearly document which provider is active in the agent configuration UI.

8. **Treat channel webhook integrations (Telegram, WhatsApp, Discord) as platform-fragile surfaces.** Third-party messaging platform APIs change Terms of Service, rate limits, and webhook schemas without notice. Isolate all channel adapter code behind a ChannelAdapter interface with one concrete implementation per platform. When a platform breaks (e.g. WhatsApp restricts automated messaging), only the adapter needs updating — agent logic and conversation logging are unaffected. Warning: WhatsApp Business API requires Meta approval and has strict template-message policies for outbound automated messages; non-compliant use risks account termination.

9. **Build conversation logging and the flag-for-review workflow natively; do not defer to a third-party observability SaaS.** F05 (Agent conversation logs) and F06 (Human escalation) require structured storage of every agent turn with channel, timestamp, message content, tool calls, and outcome. Store this in {APP_NAME}'s primary relational database. LangSmith (LangChain's hosted tracing product) is useful during development but must not be the production data store — user conversation content must remain on-platform. LangChain's callbacks API allows attaching a custom logging handler that writes to {APP_NAME}'s database; use this rather than enabling LangSmith in production.

10. **The confidence-threshold escalation trigger (F06) requires explicit design; do not rely on the model self-reporting uncertainty.** LLM self-assessed confidence is unreliable. Implement escalation triggers as a layered system: (a) keyword/phrase matching on the agent reply (configurable per agent), (b) tool-call failure — if a required tool returns an error, escalate rather than hallucinate an answer, and (c) an optional structured output schema where the model returns a structured object with a `confidence` field and the agent runtime compares it against the user-configured threshold. Document the limitations of approach (c) clearly in the UI — it is a soft signal, not a guarantee.

11. **Never store raw LLM API keys in agent configuration records.** Agent configuration (F01) includes the model selection and implicitly the credentials used to call that model. Store provider API keys in a secrets manager (e.g. environment variables injected at runtime, or a dedicated secrets store) and reference them by a non-secret identifier in the agent config record. If {APP_NAME} allows users to supply their own API keys (BYOK), encrypt the key at rest using a per-user encryption key before persisting it, and never log or return the raw key value in any API response.

12. **Defer voice and real-time streaming agent interfaces to a later milestone.** The current feature set (F01–F06) covers text-based async agent messaging. Streaming LLM responses over WebSocket and voice I/O (speech-to-text, text-to-speech) introduce significant additional complexity in latency management, partial-token rendering, and audio pipeline integration. OSS options to evaluate at that milestone include Whisper (MIT, OpenAI) for STT and Kokoro (Apache 2.0) for TTS — both embeddable. Do not architect the V1 agent runtime in a way that blocks streaming adoption; ensure the LangChain callback chain is async-compatible from the start.

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
