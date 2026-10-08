# Audio PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Audio |
| **Capability ID** | audio |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST capture, store, organize, and retrieve audio assets and recordings.

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

1. **Navidrome as reference architecture for music library** — Study Navidrome (GPL v3) for music library design: folder scanning, metadata indexing, playlist management, and the Subsonic API surface. Do not embed or redistribute; use as a reference only. {APP_NAME} may self-host Navidrome as an optional companion service for users who want a full music library, but the Navidrome codebase must not be bundled into the {APP_NAME} distribution.

2. **Whisper for transcription — embed under MIT** — OpenAI Whisper (MIT) may be embedded directly in {APP_NAME} server builds. It is the primary engine for transcribing voice memos, meeting recordings, and any user-uploaded audio. MIT license permits bundling, modification, and commercial use with attribution. Ship a quantised model (e.g. `medium` or `large-v3-turbo`) to balance accuracy against resource cost.

3. **WhisperLive for real-time transcription — embed under Apache 2.0** — WhisperLive (Apache 2.0) extends Whisper with streaming / real-time capability. Embed for live meeting transcription and live voice-memo capture where the user needs to see text as they speak. Apache 2.0 permits embedding with notice preservation; no copyleft obligations.

4. **Architecture split: music library vs. broader audio** — Treat these as two distinct subsystems. The music library subsystem (streaming, playlists, album art, Subsonic compatibility) is architecturally separable and can delegate to a self-hosted Navidrome instance via Subsonic API. The broader audio subsystem (voice memos, meeting recordings, transcription, AI summaries, Smart File Naming, project-linked audio clips) is built natively in {APP_NAME} and must not depend on Navidrome.

5. **Transcription pipeline integration pattern** — Voice memo or recording capture → server-side Whisper/WhisperLive inference → raw transcript stored as a child document linked to the audio asset → AI summarization pass (via {APP_NAME} AI module) → summary and Smart File Name surfaced to the user. Keep the transcript and summary as first-class entities so they are searchable and cross-linkable to Projects, Tasks, and Notes.

6. **Project-linked audio** — Audio assets must carry an optional `project_id` foreign key so recordings (e.g. client calls, field notes) are automatically surfaced within the linked Project view. This is a native {APP_NAME} data-model concern; no OSS tool covers it.

7. **Key architectural decision — inference location** — For self-hosted deployments, run Whisper/WhisperLive on the {APP_NAME} server. For cloud deployments, offer a choice: on-server inference (GPU-provisioned tier) or delegate to a third-party transcription API (e.g. Deepgram, AssemblyAI). Document the delegation path as a pluggable adapter so the inference backend can be swapped without changing the pipeline contract.

8. **E2EE warning** — Audio files and transcripts may contain sensitive personal or business content. Any cloud storage or cloud inference path must encrypt audio at rest and in transit. If a third-party transcription API is used, clearly disclose to the user that audio leaves their device/server. Do not silently forward audio to an external service. E2EE for audio blobs should be a roadmap item for the self-hosted tier.

9. **Platform fragility warning (mobile audio capture)** — iOS and Android impose background audio recording restrictions and microphone permission revocation policies that change across OS versions. Do not build live meeting recording on mobile without explicitly handling session interruption, permission loss mid-recording, and background-mode entitlements. Treat mobile as a trigger/upload surface; do heavy processing server-side.

10. **GPL v3 contamination warning** — Navidrome is GPL v3. Any code directly derived from or linking to Navidrome source would require the combined work to be released under GPL v3. Use Navidrome only as a reference and communicate with a running Navidrome instance exclusively over its Subsonic HTTP API. Never copy Navidrome source into the {APP_NAME} codebase.

11. **What {APP_NAME} builds natively** — Voice memo capture and playback; meeting recording ingestion; Whisper/WhisperLive transcription pipeline; AI summarization and Smart File Naming for audio assets; project-linked audio data model; unified audio search across memos, recordings, and music metadata; audio asset management UI (waveform preview, trim, re-transcribe actions).

12. **What {APP_NAME} defers to a service or companion tool** — Full music library streaming and playlist management (defer to self-hosted Navidrome via Subsonic API, or to an external music service integration); GPU-intensive Whisper inference at scale (defer to a provisioned cloud inference adapter when self-hosted hardware is unavailable); audio format transcoding at scale (defer to FFmpeg as a server-side subprocess, not an embedded library, to avoid LGPL linking concerns).

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
