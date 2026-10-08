# Video PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Video |
| **Capability ID** | video |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST capture, store, and organize video assets with transcription and metadata.

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

1. **Reference Jellyfin (GPL v2 — reference only) for media library architecture.** Study how Jellyfin handles video library organization, metadata ingestion, thumbnail generation, and cross-device streaming. Do not embed or redistribute Jellyfin code; treat it as a design reference and a self-hostable companion service for users who want a full media server alongside {APP_NAME}.

2. **Use OpenAI Whisper (MIT — embeddable) for audio transcription.** Whisper can be run locally or via API. For the initial build, defer to the hosted Whisper API to avoid bundling a large model. Plan a self-hosted path (whisper.cpp or faster-whisper) for users who require on-premise E2EE workflows.

3. **Use FFmpeg (LGPL 2.1 — embeddable with dynamic linking) for all video processing.** FFmpeg handles thumbnail extraction, format normalization, duration probing, and HLS segmentation for streaming. Link dynamically to stay within LGPL terms; do not statically bundle FFmpeg binaries in a closed-source distribution without legal review.

4. **Build the video asset model natively in {APP_NAME}.** The core data model — project video assets, captured social videos, meeting recordings, AI transcripts, summaries, and tags — is custom. Jellyfin's schema does not map to {APP_NAME}'s project-centric and social-capture context.

5. **AI summarization pipeline: Whisper transcript → LLM summary.** After Whisper produces a timestamped transcript, pass it to the configured LLM (Claude by default) for chapter detection, keyword extraction, and a plain-language summary. Store transcript and summary as structured fields on the video record, not as flat files.

6. **Treat platform-captured social videos as fragile.** Videos captured from third-party platforms (Instagram, TikTok, YouTube, etc.) are subject to ToS changes, link rot, and format shifts. Store a local copy at capture time; do not rely on remote URLs remaining valid. Surface a clear warning in the UI when the source platform is third-party.

7. **Key architectural decision — streaming vs. download.** For playback, serve video via HLS (HTTP Live Streaming) with server-side segmentation via FFmpeg rather than direct file download. This enables adaptive bitrate, seek performance, and future CDN offload. Use signed, time-limited URLs for all segment requests.

8. **Key architectural decision — storage tiering.** Hot storage (recent or active project videos) stays on the application server or a fast object store (e.g. S3-compatible). Cold storage (archived recordings, completed-project assets) moves to cheaper tiers automatically. Expose storage location as a user-visible field so power users can reason about where their files live.

9. **E2EE warning.** End-to-end encryption for video is architecturally expensive: server-side transcription and thumbnail generation require decrypted access. If E2EE is offered as a mode, transcription and summarization must happen client-side or in a trusted enclave — both are significant engineering commitments. Do not promise E2EE for video without scoping this separately.

10. **Meeting recording ingestion.** For meeting recordings (Zoom, Teams, Google Meet), prefer pull-based ingestion via official OAuth APIs over local file import where available. This avoids users manually exporting large files. Store the meeting metadata (participants, date, platform) alongside the video record.

11. **{APP_NAME} builds natively:** video asset model and schema, project/social/meeting record types, AI transcript and summary pipeline, thumbnail extraction, HLS streaming layer, storage tiering logic, search index over transcripts and metadata. **{APP_NAME} defers to services:** raw transcription compute (Whisper API initially), LLM summarization (Claude API), object storage backend (S3-compatible), and optionally Jellyfin as a user-run companion media server for personal libraries.

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
