# Mood Boards PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Mood Boards |
| **Capability ID** | mood_boards |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST collect and organize visual inspiration — images, colors, fonts — for creative projects.

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

1. **Study Penpot (MPL 2.0 — Reference only, do not embed or self-host).** Penpot is the primary reference for design-grade canvas behavior: structured frame layouts, component systems, brand color/font management, and collaborative multiplayer state. Do not ship Penpot as a dependency; extract patterns for grid snapping, layer ordering, and artboard semantics and reimplement natively in Plenix.

2. **Study Excalidraw (MIT — Reference only, do not embed or self-host).** Excalidraw is the primary reference for lightweight infinite-canvas interaction: free-form drag placement, hand-drawn shapes, loose grouping, and fast ideation feel. Its MIT license would technically permit embedding, but Plenix builds mood boards natively; use Excalidraw purely as a UX and architecture reference for gesture handling and viewport math.

3. **Build the mood-board canvas natively.** Plenix owns the canvas renderer end-to-end — a hybrid of Penpot's structured layout model and Excalidraw's free-form placement model. Native ownership avoids license inheritance risk from MPL 2.0 and keeps the data model consistent with the rest of the Plenix object graph.

4. **Use Immich as the media and asset library layer.** Immich (already in the Plenix stack) provides photo/asset ingestion, EXIF metadata, album grouping, and thumbnail generation. Mood boards do not maintain their own media store; they reference Immich asset IDs. This keeps media deduplication and storage management in one place.

5. **Metadata schema — each board item carries visual metadata.** Each pinned asset on a mood board stores: Immich asset ID, canvas position (x, y, w, h, rotation), dominant color palette (extracted at ingest), font references if applicable, user-authored tags, and a creation timestamp. This metadata lives in the Plenix database, not in Immich.

6. **Dominant-color extraction is a V1 native feature.** Extract a 5-swatch dominant color palette from each image at pin time (server-side, e.g. using a Rust or Python palette library). Store swatches in the metadata record. This enables color-based filtering and palette view without AI infrastructure.

7. **AI visual search (style/mood similarity) is deferred to V2+.** Inspired by the Google Mood Board Search concept, vector-embedding-based "find visually similar" search requires a vector store and embedding model. Do not architect V1 around this — keep the metadata schema embedding-ready (nullable vector column) but do not ship the feature until V2 requirements are defined.

8. **Integration pattern — canvas state as a JSON document.** Store each mood board's canvas layout as a versioned JSON document (array of item records) in the Plenix database. This is append-only for history and diffable for sync. Avoid binary or proprietary canvas formats; plain JSON keeps the data portable and testable.

9. **Platform fragility warning — Immich API stability.** Plenix's media layer depends on Immich's internal REST API. Immich is under active development and has broken API contracts between minor versions. Pin Immich to a tested version in the Plenix stack and treat Immich upgrades as a coordinated release event, not a routine dependency bump.

10. **License warning — do not ship MPL 2.0 code.** Penpot is MPL 2.0. Any file copied or derived from Penpot source must be disclosed and kept MPL 2.0. Since Plenix uses Penpot only as a reference (reading architecture, not copying code), no MPL obligation attaches — but this boundary must be enforced in code review. Add a repository policy note prohibiting copy-paste from Penpot source.

11. **Collaborative editing is out of scope for V1.** Real-time multiplayer canvas (as in Penpot) requires a CRDT or OT layer, a WebSocket presence server, and conflict resolution logic. V1 supports single-user editing with last-write-wins persistence. Design the data model so a CRDT layer can be introduced later without a schema migration.

12. **What Plenix builds natively vs defers.** Builds natively: canvas renderer, item placement and resize, color palette extraction, metadata storage, Immich asset linking, board CRUD, and search by tag/color. Defers to a service: AI vector search (V2+, external embedding API or self-hosted model). Does not deploy: Penpot, Excalidraw, or any third-party canvas engine.

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
