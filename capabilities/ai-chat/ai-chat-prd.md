# AI Chat PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | AI Chat |
| **Capability ID** | ai_chat |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST provide a conversational AI interface as the primary AI entry point, with real-time streaming responses, file processing, artifact generation, voice input, thread management, and access to all connected data via the Connectors layer.

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

Source feature area(s): AI Chat

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Conversational AI interface — the primary AI entry point** | 🔵 Planned | Use case: The user wants to interact with an AI assistant in natural language to get things done — drafting content, analyzing data, writing code, researching topics, processing files — without leaving Plenix. The AI Chat section is a full conversational interface: a message thread on the left and an artifact/output panel on the right. The user types or speaks a request, the AI streams its response in real time, and any generated files (HTML pages, documents, charts, code) open in an interactive preview panel on the right. This is not a simple chatbot — it is the primary AI assistant surface for Plenix, with access to all connected data (files, contacts, calendar, tasks, notes) via the Connectors layer. The AI works as an assistant to the user, not autonomously. |
| F02 | **Chat input bar — text, file upload, voice, @ mentions** | 🔵 Planned | The input bar sits at the bottom of the chat. It contains: a text field for natural language requests; a Send button (or Enter key); a Stop button that appears during streaming to cancel the current response; a paperclip/file upload button to attach images (PNG, JPG, GIF, WebP), documents (PDF, TXT, CSV), and code files (HTML, CSS, JS, Python, etc.) for the AI to read and process; a microphone button for voice input; and an @ mention trigger that opens a menu of available skills and connectors by name (e.g. '@web-search Find the latest React best practices'). The input bar is always visible and accessible from anywhere in the chat thread. |
| F03 | **Voice input — dictate messages with live waveform** | 🔵 Planned | Tapping the microphone icon transforms the input bar into a voice recording interface. A live waveform visualization shows audio levels in real time. A timer shows the recording duration (up to 2 minutes). Two buttons appear: a checkmark to stop recording and transcribe, and an X to cancel and discard. After recording, a 'Transcribing...' indicator appears while the audio is processed. The transcribed text populates the input field where the user can review and edit before sending, or tap the mic again to append more dictation. Uses a high-accuracy speech-to-text model supporting multiple languages. Works in all major browsers after the first microphone permission grant. |
| F04 | **Streaming responses — thinking indicator, tool execution, progressive output** | 🔵 Planned | Responses stream token by token in real time. During streaming the user sees: an animated thinking indicator while the AI plans its approach; status messages like 'Running search...' or 'Generating file...'; tool execution — each tool call and its result streams inline so the user can see exactly what the AI is doing step by step; text content appearing progressively; and the artifact panel opening on the right as soon as a file is generated. The user never waits for a complete response before seeing progress. A red Stop button appears during streaming and cancels the response immediately when clicked. |
| F05 | **Queued follow-up messages** | 🔵 Planned | The user can send additional messages while the AI is still processing a previous request. Instead of waiting, they type the follow-up and send — it enters a queue. Two modes: Automatic (the AI picks up the next queued message and processes it without user interaction; the queue continues even if the browser is closed) and Manual (the next queued message is promoted into the input field for review and editing before sending). This enables multi-step workflows where the user queues several instructions upfront and lets the AI work through them in sequence. |
| F06 | **Artifacts — interactive previews for generated files** | 🔵 Planned | When the AI generates an HTML page, SVG, PDF, chart, or other file, an artifact panel opens on the right side of the chat with an interactive preview. An artifact chip appears in the chat message so the panel can be reopened later. Generated HTML pages are fully interactive — buttons, forms, and JavaScript all execute in the preview panel. The user can switch between Preview and Code views, download the file, or copy the source. This panel is also where dynamic dashboards render when the AI produces data analyses or visual summaries. |
| F07 | **Dynamic dashboards — inline data visualizations** | 🔵 Planned | When the user asks for data analysis, metric comparisons, or visual summaries (e.g. 'analyze my project costs for Q1' or 'build a dashboard comparing this month's tasks vs last month'), the AI renders an interactive dashboard directly in the chat. Dashboards are composed of reusable widgets that assemble into a layout and stream progressively — the user sees the dashboard build piece by piece. Widget types: KPI cards (headline metrics with growth badges), area/bar/line charts, tables (comparisons, breakdowns), alert callouts for key findings, and progress bars for distribution data. All widgets can reference data from connected sources (Google Sheets, files, task data, calendar events). |
| F08 | **Text-to-speech — summarize and read aloud** | 🔵 Planned | A three-dot menu on any AI message includes a 'Summarize & read aloud' option. The AI automatically condenses long or complex responses into concise spoken sentences and plays them back as natural-sounding audio. Useful for consuming long outputs without reading. Clicking again stops playback. The summary is generated specifically for audio consumption — shorter and more conversational than the written response. |
| F09 | **Thread management — history, pinning, sharing** | 🔵 Planned | Each conversation is a persistent thread with an auto-generated title (derived from the first message) and timestamp. The left sidebar lists recent threads grouped by recency. Actions per thread: continue (resume any previous conversation with full context), start fresh (New Chat creates a new thread), pin (keeps frequently used threads at the top of the sidebar). Thread sharing: a share icon generates a read-only public link. Anyone with the link can view the full conversation including messages, artifacts, and generated files without needing a Plenix account. Sharing can be revoked at any time, immediately invalidating the URL. |
| F10 | **Extended thinking — max reasoning mode** | 🔵 Planned | For complex tasks — multi-step code generation, intricate analysis, long-horizon planning — an 'Extended thinking' mode gives the AI more time to reason through the problem before responding. Enabled via a toggle in the model selector. During extended thinking, the AI works through intermediate reasoning steps internally before streaming its final answer. More credits are consumed per response. If the thinking budget is exhausted mid-response, the AI automatically retries to ensure a complete answer. Visible to the user as a longer thinking indicator before the first token streams. |

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

1. **Primary reference: LibreChat (MIT — embed).** Study and embed LibreChat as the core AI chat engine. It provides multi-provider model routing (OpenAI, Anthropic, Google, Azure, Ollama), an agent framework, MCP server support, artifacts, a code interpreter, and custom actions — the most complete open-source match to the AI Chat feature surface. 38k stars. Repository: `danny-avila/LibreChat`. License: MIT. Decision: embed directly in Plenix infrastructure rather than self-hosting as a separate service.

2. **Secondary reference: Open WebUI (MIT — reference only).** Open WebUI (135k stars) is the most widely deployed self-hosted AI chat UI. It is simpler and less capable than LibreChat — no native agent framework, no MCP support, no artifact panel — but its UI interaction patterns, sidebar layout, thread management conventions, and voice input handling are worth studying before building Plenix UI components. Do not embed; reference for UX patterns only.

3. **Model weight license vs. code license — verify both separately.** LibreChat's code is MIT, but it routes requests to external models whose weights carry separate licenses. Before enabling any model in Plenix: (a) confirm the code/API client license permits embedding; (b) confirm the model weight license permits the intended commercial use. An MIT wrapper around a non-commercial model weight does not grant commercial rights. This check is mandatory for every AI/ML component added to the stack.

4. **Local LLM support via Ollama — keep data on-server.** Route local model inference through Ollama. When a user selects a local model, no prompt data leaves the Plenix server. Ollama itself is MIT-licensed and embeds cleanly. LibreChat has first-class Ollama support. This is the default privacy posture — local models run fully on-premises with zero external API calls.

5. **Cloud AI providers are opt-in with explicit data-egress disclosure.** OpenAI, Anthropic, and Google APIs are supported but disabled by default. When a user enables a cloud provider, {APP_NAME} must display a clear disclosure that prompts and file contents will leave the server and be processed by that provider under their data policies. The user must acknowledge this per-provider before any API call is made. Never silently route to a cloud model.

6. **Streaming architecture — use server-sent events (SSE) end-to-end.** LibreChat uses SSE for token streaming from backend to browser. Adopt the same pattern: the Plenix API server proxies the upstream provider stream and forwards it to the client via SSE. This enables the thinking indicator, per-tool status messages, and progressive artifact rendering described in F04. Avoid WebSocket for this path — SSE is simpler, HTTP-compatible, and restores more cleanly after reconnection.

7. **Artifact panel — sandbox generated HTML with a restrictive Content Security Policy.** F06 requires fully interactive HTML artifact previews. Render generated HTML inside a sandboxed `<iframe>` with `sandbox="allow-scripts allow-forms"` and a strict CSP that blocks external resource loads and disallows `allow-same-origin`. This prevents generated code from reading Plenix session data or exfiltrating content. Treat every artifact as untrusted third-party code regardless of source.

8. **Voice input — use Whisper (MIT — embed) for transcription.** Run OpenAI Whisper locally for speech-to-text (F03). The `openai/whisper` repository is MIT-licensed; model weights for the base and small variants are also openly licensed for commercial use. Embed a Whisper inference server (e.g. `faster-whisper` with CTranslate2) on the Plenix backend. Do not send voice audio to an external transcription API by default — voice data is at least as sensitive as text prompts.

9. **Text-to-speech — use Kokoro or Coqui TTS (reference: Apache 2.0) for on-server synthesis.** F08 requires natural-sounding TTS. Kokoro-82M (Apache 2.0 code and weights) is a strong candidate for on-server synthesis with low latency. Coqui TTS (MPL 2.0 code; verify per-model weight license) is a fallback. Both run on CPU. Avoid routing TTS requests to ElevenLabs or a cloud provider by default — voice output can reveal what content the user is consuming. Cloud TTS is an opt-in setting alongside cloud LLMs.

10. **Thread persistence and sharing — build natively, do not defer.** F09 (thread history, pinning, public share links) is core to the chat experience and tightly coupled to the Plenix data model (user identity, connector data, artifact storage). Build this natively in the Plenix backend. A share link renders a read-only snapshot of the thread including message content and artifact files; revocation immediately invalidates the URL by deleting the share token from the database. No third-party sharing service is appropriate here.

11. **MCP server integration — implement the MCP client in the Plenix API layer, not in the browser.** LibreChat supports MCP servers as tool providers. When adopting this pattern, the MCP client must live in the server-side API layer so that connector credentials and internal data sources are never exposed to the browser. The browser sends natural language; the server resolves tool calls, executes MCP requests against connectors, and streams results back. This is also required for the queued follow-up message mode (F05) where processing must continue after the browser closes.

12. **Platform fragility warning — provider API changes break model routing.** Cloud AI provider APIs (especially function calling schemas, streaming formats, and model capability flags) change without notice and sometimes without versioning. Any abstraction layer built over multiple providers will require ongoing maintenance. Maintain a provider adapter registry with per-adapter version pins and integration tests that run against provider sandboxes. LibreChat's provider adapter code is the best starting reference for how to structure these adapters, but expect to fork and maintain Plenix-specific versions as the product diverges from LibreChat's general-purpose scope.

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
