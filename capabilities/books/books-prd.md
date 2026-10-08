# Books PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Books |
| **Capability ID** | books |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST track a personal or professional reading library with status, notes, highlights, and ratings.

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

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | 🔴 Features not yet defined | 🔴 Not Defined | Use this PRD template to complete this capability document. |

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

1. **Primary OSS reference — Calibre (GPL v3 | Reference):** Study Calibre as the definitive e-book manager for library management patterns, format conversion pipelines, and metadata handling. Do not embed or redistribute Calibre code; treat it as a UX and architecture reference only. GPL v3 viral terms make embedding legally hazardous without full source disclosure.

2. **Format conversion — defer to a self-hosted service:** Calibre's `ebook-convert` CLI covers EPUB, MOBI, AZW3, PDF, DOCX, and more. Run it as an isolated background service (containerized) rather than embedding it into the {APP_NAME} binary, isolating GPL scope and preventing runtime dependency conflicts.

3. **Metadata sourcing — reference Calibre's plugin model:** Calibre fetches metadata from ISBN databases (Open Library, Google Books, Amazon). {APP_NAME} should build a thin native metadata resolver that calls Open Library API (CC0 data) and Google Books API directly, avoiding any Calibre plugin code.

4. **Library data model — borrow Calibre's entity shape, not its SQLite schema:** Calibre uses a SQLite database with books, authors, tags, ratings, series, and custom columns. Model the {APP_NAME} Books schema after this entity graph but store it in the platform's unified data layer, not a separate Calibre-compatible database file.

5. **Reading progress and highlights — build natively:** Calibre does not track per-session reading progress or inline highlights. These are first-class {APP_NAME} features built natively: page/percentage progress, highlight anchors keyed to CFI (EPUB canonical fragment identifiers) or PDF page+offset, and linked notes.

6. **E2EE warning:** If the platform stores book files or highlights in the cloud, the full file payload (EPUB/PDF binary) must be encrypted at rest and in transit. Highlight CFI strings may expose paragraph-level content; treat them as user content requiring the same E2EE treatment as notes.

7. **Platform fragility warning — MOBI/AZW3:** Amazon's proprietary formats (MOBI, AZW3, KFX) have no stable open specification. KFX in particular is reverse-engineered. If {APP_NAME} accepts Amazon sideloads, conversion to EPUB via Calibre's service layer is the safest path; do not attempt native KFX parsing.

8. **License classification summary:**

   | Tool / Source | License | Classification | Usage |
   |---|---|---|---|
   | Calibre | GPL v3 | Reference | UX and architecture reference only; no code embedded |
   | Calibre `ebook-convert` CLI | GPL v3 | Self-hosted service | Run in isolated container; not linked into app binary |
   | Open Library API | CC0 / open API | Reference / API call | Metadata fetch; no library code embedded |
   | Google Books API | Proprietary API | Reference / API call | Metadata fallback; subject to quota and ToS |
   | epub.js | BSD 2-Clause | Embed | In-app EPUB renderer for web/desktop layer |

9. **EPUB rendering — embed epub.js (BSD 2-Clause | Embed):** epub.js is a permissively licensed JavaScript EPUB renderer suitable for direct embedding in the {APP_NAME} web and desktop layers. It handles CFI-based navigation and text selection needed for highlight anchoring.

10. **What {APP_NAME} builds natively:** library CRUD, reading status workflow, rating and tagging, highlight and note creation, reading progress tracking, metadata editing UI, and cover image management. These require no external OSS beyond epub.js for rendering.

11. **What {APP_NAME} defers to a service:** format conversion (Calibre container), metadata enrichment from ISBN (Open Library / Google Books API calls), and PDF text extraction for highlight anchoring (consider Apache PDFBox or pdf.js — both permissively licensed).

12. **Integration pattern — import flow:** when a user adds a book file, the import pipeline must (a) detect format, (b) extract metadata via the metadata resolver, (c) convert to canonical EPUB via the Calibre service if the source is not already EPUB or PDF, (d) store the canonical file, and (e) write the Books record. Conversion should be asynchronous with progress feedback; the record should be created immediately in a pending state.

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
