# Journal PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Journal |
| **Capability ID** | journal |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST provide a daily journal with optional prompts, templates, and the ability to link entries to people, events, and projects.

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

Source feature area(s): Journal

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Daily journal entries with prompts and templates** | 🔵 Planned | Use case: The user wants a private space for daily reflection — what happened, how they felt, what they are grateful for, what they want to focus on tomorrow. The Journal section provides a chronological log of dated entries. Each entry can be free-form (open text) or guided by a template (e.g. Morning Pages: 3 things I am grateful for, 1 intention for the day, 1 thing I am looking forward to; Evening Reflection: What went well, What was challenging, What I learned). Templates are user-defined with named sections. Prompts can be configured to appear automatically at set times (e.g. a morning prompt at 8 AM, an evening prompt at 9 PM). Journal entries support the same rich-text formatting as Notes. |
| F02 | **People and event linking** | 🔵 Planned | Journal entries can be linked to contacts from the People section — the entry appears in that person's interaction history. Entries can also be linked to calendar events (post-meeting reflection), projects (project retrospective), habits (reflection on habit progress), and goals (notes on progress toward a goal). |

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

1. **Primary OSS reference — Moodiary (AGPL).** Study Moodiary as the richest available journal reference: cross-platform diary supporting Android, iOS, Windows, Mac, and Linux; multimedia attachments; full-text search; biometric lock; on-device TensorFlow AI; LAN/WebDAV sync. License classification: Reference only — AGPL prohibits embedding without open-sourcing {APP_NAME}. Derive patterns and UX ideas; do not copy or link code.

2. **Timeline UI reference — StoryPad (GPL v3).** Study StoryPad for its continuous chronological scroll, 45+ mood options, throwback feature, and multi-page entry model. The timeline-based layout (entries flowing in unbroken chronological sequence rather than paginated lists) is worth implementing natively in {APP_NAME}. License classification: Reference only — GPL v3 cannot be embedded. Treat as a design benchmark.

3. **Minimal local-first patterns reference — Daily You (GPL v3).** Study Daily You for lightweight local-first architecture: Markdown storage, mood tracking, and active development practices. License classification: Reference only — GPL v3 prohibits embedding. Use as an architectural benchmark for offline-first behavior and minimal-footprint on-device storage.

4. **Journiv (Open Core) — monitor, do not depend on.** Journiv demonstrates a self-hosted web journal with analytics dashboard and prompts. Currently in beta and not production-ready. License classification: Reference — monitor for maturation. Do not integrate or take a runtime dependency. Revisit when it reaches a stable release.

5. **Key architectural decision — local-first storage with self-hosted sync.** No OSS journal fully covers self-hosted web + polished mobile + full multimedia + AI in one package. This is {APP_NAME} whitespace. Architecture must be local-first (entries written to device storage immediately) with an optional self-hosted sync layer (e.g. WebDAV or {APP_NAME} server) — never requiring a cloud dependency for core journaling.

6. **Integration pattern — entry linking via shared entity graph.** Journal entries link to People, Events, Projects, Habits, and Goals through a shared entity reference system. Design entries to carry an array of typed entity references (entity_type, entity_id) resolved at read time. This decouples the journal module from the schema of each linked capability and avoids hard foreign-key dependencies across modules.

7. **Integration pattern — prompt and template scheduling.** Daily prompts (morning/evening) are scheduled notifications that deep-link directly into a pre-populated entry form with the selected template loaded. Implement as a local notification job (platform notification APIs on mobile; system tray / scheduled task on desktop) rather than a server-side push, so prompts work offline and without an account.

8. **On-device AI — defer to a local model service, do not embed TensorFlow directly.** Moodiary's on-device TensorFlow integration is instructive but tightly coupled to its native stack. For {APP_NAME}, route on-device AI requests (mood inference, entry summarization, writing prompts) through a local model service interface (e.g. Ollama or a bundled ONNX runtime shim) behind an abstraction layer. This keeps the journal module model-agnostic and avoids a hard TensorFlow dependency.

9. **Warning — AGPL and GPL contagion.** Moodiary (AGPL), StoryPad (GPL v3), and Daily You (GPL v3) cannot contribute any code to {APP_NAME} without triggering copyleft obligations over the entire application. All implementation work must be original. Code review should include a license-provenance check before any external snippet is accepted into the codebase.

10. **Warning — biometric lock and E2EE scope.** Biometric lock (as seen in Moodiary) protects local access only — it does not encrypt entries in transit or at rest against the server operator. If {APP_NAME} offers a biometric lock feature, clearly distinguish it from E2EE in UI copy. True E2EE (client-side encryption before sync) requires a separate key management design and must be specified as its own PRD section before implementation begins.

11. **Warning — multimedia attachment storage sizing.** Multimedia attachments (photos, audio, video) can cause journal storage to grow rapidly, especially on mobile. Define per-entry and per-account attachment limits early. Design the attachment pipeline to store thumbnails locally and defer full-resolution assets to the sync layer, with clear user controls for local vs. synced storage.

12. **What {APP_NAME} builds natively vs. defers.** Build natively: entry editor (rich text + Markdown), template engine, prompt scheduler, entity linking, local storage and indexing, mood/tag system, continuous timeline UI. Defer to a service or platform API: cloud backup beyond self-hosted WebDAV, voice-to-text transcription (platform speech APIs), large-model AI features (routed through the local model service abstraction described in note 8).

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
