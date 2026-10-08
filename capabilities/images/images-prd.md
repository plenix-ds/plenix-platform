# Images PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Images |
| **Capability ID** | images |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST manage visual assets with AI captioning, facial recognition, and location-based organization.

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

1. **Primary OSS reference — Immich (AGPL-3.0, ~98k stars):** Study Immich as the primary architectural blueprint for photo backup, mobile-native sync, face clustering, and CLIP-based semantic search. Immich is self-hosted on Plenix infrastructure; its AGPL license means any modifications to Immich itself must be open-sourced, but {APP_NAME} can call it as a self-hosted service over its REST/gRPC API without triggering AGPL obligations on {APP_NAME}'s own codebase. Do not embed Immich code directly.

2. **Secondary OSS reference — PhotoPrism (AGPL-3.0, ~40k stars):** Reference PhotoPrism's AI photo organization patterns, particularly its TensorFlow-based scene classification and color palette extraction, as a complementary data point. Same AGPL posture applies: consume via self-hosted API, do not embed source. Treat PhotoPrism as a fallback or cross-validation reference rather than a running dependency.

3. **License classification summary:**
   - Immich: AGPL-3.0 — self-hosted service; call via API only, never embed
   - PhotoPrism: AGPL-3.0 — self-hosted service or reference only, never embed
   - CLIP model weights (OpenAI): MIT-adjacent research release — may be embedded or bundled for on-device or server-side inference; verify per exact checkpoint used
   - face-api.js / InsightFace: MIT / Apache-2.0 — safe to embed for client-side or server-side face detection
   - ExifTool (Perl, GPL): reference for metadata extraction patterns; invoke as subprocess, do not embed GPL source into {APP_NAME}

4. **Architectural decision — Immich as the storage and AI backbone:** Run a private Immich instance on Plenix infrastructure. {APP_NAME} delegates photo ingestion, automatic device backup, thumbnail generation, face clustering, and CLIP vector indexing to Immich. {APP_NAME}'s own server layer communicates with Immich exclusively over its documented REST API. This keeps the heavy ML pipeline outside {APP_NAME}'s core codebase and lets Immich's upstream evolve independently.

5. **Architectural decision — what {APP_NAME} builds natively vs defers:**
   - **Builds natively:** the unified {APP_NAME} UI surfaces (grid, timeline, album views, search input), the {APP_NAME} data model linking image assets to contacts/events/places used across other capabilities, permission and sharing rules, and the sync-status indicator in the mobile app.
   - **Defers to Immich:** raw file storage, backup protocol, thumbnail pipeline, face-embedding database, CLIP vector index, and ML model hosting.
   - **Defers to platform (iOS/Android):** on-device photo library access and the initial backup trigger; {APP_NAME} mobile app uses native photo-library APIs to push assets to Immich, mirroring Immich's own mobile app approach.

6. **Integration pattern — REST API bridge:** {APP_NAME}'s server exposes a thin adapter layer that translates {APP_NAME} domain queries (e.g. "photos of person X at location Y in date range Z") into Immich API calls (person search + GPS bounding box + date filter), merges results, and re-shapes them into {APP_NAME}'s canonical asset response schema. This adapter is the only place that knows about Immich; all other {APP_NAME} modules talk to the adapter.

7. **Integration pattern — vector search for semantic queries:** CLIP embeddings generated by Immich are stored in Immich's own pgvector-backed index. For semantic search ("photos from the lake house last summer"), {APP_NAME} passes the query string to Immich's smart-search endpoint rather than running its own embedding pipeline. If Immich's search proves insufficient, evaluate hosting a dedicated pgvector instance fed by Immich's embedding export API.

8. **E2EE warning:** Immich does not currently offer end-to-end encryption of stored media; files are encrypted at rest by the storage layer (disk/object-store encryption) but the Immich server can read them. Communicate this limitation clearly in {APP_NAME}'s privacy documentation. Do not advertise E2EE for the Images capability until a verified E2EE layer is independently implemented and audited.

9. **Platform fragility warning — mobile backup:** The iOS and Android background-upload APIs that power automatic photo backup are subject to OS-level battery and background-process restrictions. Immich's mobile app has already solved most edge cases here; study its background-task implementation before writing {APP_NAME}'s own mobile sync layer, and prefer re-using Immich's mobile client logic via its open-source app if the license permits the use case.

10. **Face recognition caution:** Face clustering and recognition features carry legal exposure in several jurisdictions (GDPR biometric data classification in the EU, BIPA in Illinois, etc.). Treat face data as a special category: store face embeddings separately from general asset metadata, provide explicit opt-in UI before enabling face features, and make deletion of all face data for a given person a first-class operation. Reference Immich's face-management API for the deletion surface.

11. **Metadata extraction pattern:** Use ExifTool (invoked as a subprocess, not embedded) or the libexif / sharp libraries (MIT) for reading EXIF/XMP/IPTC metadata at ingest time. Normalize GPS coordinates, capture timestamps, camera model, and ISO into {APP_NAME}'s canonical `ImageMetadata` schema before storing. Immich already does this internally; if consuming Immich's API, pull the normalized metadata from Immich's asset detail endpoint rather than re-parsing raw files.

12. **Scalability and cost checkpoint:** Self-hosting Immich on Plenix infrastructure is appropriate for the private-beta scale. As user count grows, benchmark the ML inference queue (face clustering and CLIP indexing are CPU/GPU-intensive). Plan for horizontal scaling of Immich's microservices (separate `immich-machine-learning` container) before public launch, and establish a cost model for storage at scale before committing to unlimited backup as a product promise.

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
