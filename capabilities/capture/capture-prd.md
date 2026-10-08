# Capture PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Capture |
| **Capability ID** | capture |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST provide a universal capture surface that accepts content from any entry point — browser extension, mobile share sheet, desktop hotkey, drag-and-drop, API, or manual creation — and routes it to the appropriate capability with AI-powered metadata enrichment.

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

Source feature area(s): Capture

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **AI File Naming** | ✅ Built / Required | The Capture button in the header opens a modal that lets you select an unorganized file from a list of candidates. The AI reads the file's context (date, project association, content type, description) and generates a structured filename in the format: YYYY-MM-DD — Project — Type — Description.ext. Each part of the filename is color-coded (date in blue, project in orange, type in green, description in purple) so you can immediately understand the naming logic. You can accept the name and save the file to a suggested folder. |

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

1. **Study Karakeep (formerly Hoarder) as the primary capture/curation reference.** AGPL-licensed, self-hosted. Do not embed directly — study its UX model (link capture, AI auto-tagging, collections, reading list, full-text search) and replicate the interaction patterns natively in {APP_NAME}. Architecture reference only; no code vendoring.

2. **Study ArchiveBox as the preservation infrastructure reference.** MIT-licensed, self-hosted. ArchiveBox is the closest OSS analog to a personal Wayback Machine — it saves HTML, PDF, screenshots, WARC, and media. For the "Preserve full page" action in Capture, evaluate running ArchiveBox as a background self-hosted service rather than embedding it. MIT license permits this cleanly.

3. **Linkwarden is reference only.** AGPL-licensed. Study its annotation and collaborative bookmark model for design inspiration. Do not embed or bundle; AGPL terms make service embedding legally complex for a commercial product.

4. **Architectural split: Karakeep model for curation UX, ArchiveBox pattern for deep archival.** Capture handles user-facing curation (save, tag, organize, retrieve). When the user explicitly triggers "Preserve full page," the request is handed to an archival pipeline modeled on ArchiveBox — full-fidelity snapshot saved to local or self-hosted storage. These are separate concerns; do not conflate them in the data model.

5. **OCR routing by content type — architecturally selected, benchmarks pending.** Screenshot or image input: route to PaddleOCR (Apache 2.0, embed). Scanned PDF input: route to OCRmyPDF + Tesseract (MPL 2.0 + Apache 2.0, embed). Structured document or AI pipeline input: route to Docling (MIT, embed — primary embeddable candidate). Table-only PDF input: route to Tabula or Camelot (both MIT, embed) as narrow fallbacks. Handwriting recognition deferred to V2+ via Calamari (Apache 2.0) or Kraken (MIT).

6. **Docling is the primary embeddable AI document parsing candidate.** MIT codebase from IBM Research. Handles layout analysis, table extraction, reading order, and produces Markdown/JSON output suitable for downstream LLM pipelines. Cleanest commercial-use license in the AI document parsing space. Benchmark against real {APP_NAME} documents (contracts, invoices, receipts, church documents) before finalizing.

7. **Critical license rule: verify code license AND model weight license separately before embedding any AI/OCR tool.** These are frequently different documents with different commercial terms. Specifically: Surya code is Apache 2.0 but model weights carry OpenRAIL-M conditions with commercial restrictions — verify before embedding. MinerU has shifted from AGPL to a custom Apache-based license with additional conditions — verify current terms before any commercial use. Marker is GPL v3 — run as a background service only; do not embed in the application binary.

8. **AI auto-tagging aligns directly with the {APP_NAME} "AI as the organizing assistant" philosophy.** Karakeep demonstrates this pattern at scale. Implement auto-tagging as a post-capture enrichment step: when an item lands in Capture, the AI pipeline reads content type, infers tags, suggests a collection, and proposes a structured filename (per F01). User confirms or edits; AI learns from corrections over time.

9. **Capture feeds the OCR pipeline, not the reverse.** Capture is the entry point; OCR is a processing service. The correct dependency direction: Capture detects content type → dispatches to the appropriate OCR or parsing tool → enriched text returned to Capture for AI tagging and routing. OCR modules must be callable as stateless services from the Capture pipeline and must not hold Capture-layer state.

10. **Platform fragility warning for browser extension capture.** Browser share APIs, extension manifest versions (MV3), and clipboard access policies change with browser updates. Build the browser extension capture surface against a stable abstraction layer so that platform-specific breakage is isolated. Do not assume clipboard or DOM access is universally available; degrade gracefully to a manual paste fallback.

11. **E2EE warning for cloud-synced captures.** If capture items are synced to a cloud store, content captured via OCR (especially sensitive documents — contracts, receipts, medical) must be encrypted client-side before upload. The OCR pipeline runs locally or on a trusted self-hosted instance; plaintext content must never transit an untrusted network layer without encryption. Design the sync architecture with this constraint from the start.

12. **What {APP_NAME} builds natively vs defers to a service.** Build natively: capture entry points (browser extension, mobile share sheet, desktop hotkey, drag-and-drop, API), AI auto-tagging, filename generation (F01), content-type detection, routing logic, and the curation UX (collections, reading list, search). Defer to self-hosted services or embedded libraries: deep web archival (ArchiveBox pattern), OCR processing (PaddleOCR, Tesseract, Docling), and complex PDF table extraction (Tabula/Camelot). Do not rebuild what OSS handles well; own the UX and the data model.

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
