# Activity PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Activity |
| **Capability ID** | activity |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST display a real-time log of system events — creates, edits, deletes, and status changes — across all capabilities.

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

1. **Primary OSS reference — ActivityWatch (MPL 2.0, self-hosted).** ActivityWatch is the canonical open-source time tracker for this capability. Study its watcher architecture, event bucket model, and REST API design. It runs as a local/server-side background service, making it compatible with {APP_NAME}'s server-hosted deployment model. License classification: self-hosted service — MPL 2.0 is file-level copyleft, meaning only modified MPL-licensed files must be disclosed; proprietary application code surrounding it is not affected as long as the service boundary is preserved.

2. **Do not embed ActivityWatch — run it as a sidecar service.** Because MPL 2.0 requires source disclosure for any modified files, the safest integration pattern is to run ActivityWatch as an isolated background process (e.g., a Docker sidecar or system service) and communicate with it exclusively over its local REST API (`http://localhost:5600/api/`). {APP_NAME} never imports or statically links ActivityWatch source code; it only consumes the API. This keeps the license boundary clean and the codebases independent.

3. **ActivityWatch watcher selection.** ActivityWatch ships domain-specific watchers (aw-watcher-window for active window titles, aw-watcher-afk for idle detection). Study these as reference implementations before building any native {APP_NAME} watchers. For the initial release, prefer deploying the upstream watchers unmodified; only build a custom watcher if {APP_NAME} requires event types that ActivityWatch cannot produce (e.g., in-app entity-level events from the {APP_NAME} data model).

4. **{APP_NAME}-native activity events vs. OS-level events.** Distinguish two event streams: (a) OS-level events captured by ActivityWatch watchers (window focus, application use, idle time) and (b) {APP_NAME}-internal events (record created, task status changed, note edited). The internal stream MUST be produced natively by {APP_NAME}'s own event bus and stored in {APP_NAME}'s database — ActivityWatch is not the store for these. The Activity capability merges both streams into a unified timeline view for the user.

5. **Event bucket and schema design.** ActivityWatch uses a bucket-per-watcher model with typed events (`{"timestamp", "duration", "data": {...}}`). When ingesting ActivityWatch events into {APP_NAME}'s own store, normalize them into a shared `activity_event` schema that also accommodates internal {APP_NAME} events. Define a `source` field (`"activitywatch"` vs `"plenix_internal"`) and a `capability` field to link internal events back to the originating capability (Tasks, Notes, etc.).

6. **Data residency and privacy architecture.** ActivityWatch is explicitly privacy-focused — all data stays local/on-server with no external transmission. {APP_NAME} MUST preserve this guarantee: the ActivityWatch service and its data store must be co-located with the {APP_NAME} server instance. Never route raw activity data through a third-party analytics service or cloud function. Document this residency guarantee explicitly in user-facing privacy settings.

7. **Idle and afk handling.** Deploy `aw-watcher-afk` alongside the window watcher. Establish a configurable AFK threshold (default: 3 minutes) used to automatically break activity sessions. The Activity timeline MUST visually distinguish active, idle, and offline periods. This threshold must be a user-configurable setting, not a hardcoded constant.

8. **Platform fragility warning — OS permission dependencies.** On macOS, window-title capture requires Screen Recording permission; on Windows, it requires no special permission but may conflict with UAC-elevated processes. On Linux, X11 is well-supported but Wayland support in ActivityWatch is incomplete as of 2025 — document this gap and fall back to application-level tracking only on Wayland sessions. Treat OS permission prompts as a first-run onboarding step, not a background assumption.

9. **Browser activity integration.** ActivityWatch has a companion browser extension (`aw-watcher-web`) that captures URL and page-title events, enabling web browsing to appear in the timeline. Study this extension as a reference if {APP_NAME} ships its own browser extension. License: MPL 2.0 — same file-level copyleft applies. If {APP_NAME} builds a native browser extension for other purposes, consider bundling ActivityWatch-compatible web event reporting within it rather than shipping a separate extension.

10. **Aggregation and bucketing for the UI.** Raw ActivityWatch events are high-frequency (sub-second resolution). The Activity timeline view MUST aggregate events server-side before rendering: group by application/capability with configurable time-bucket granularity (5 min, 15 min, 1 hr). Never stream raw events to the client. Build a server-side aggregation module that the Activity UI queries — this module can be reused by reporting and analytics capabilities.

11. **What {APP_NAME} builds natively vs. defers.** Defer to ActivityWatch for: OS-level window tracking, AFK detection, browser URL tracking, local data storage of raw OS events, and the time-tracking REST API. Build natively in {APP_NAME}: the unified event schema, internal {APP_NAME} event bus emission, the merged timeline UI, aggregation queries, per-user privacy controls, and any entity-linking logic that connects an OS window title to a specific {APP_NAME} record (e.g., associating "Figma — ProjectX" window events with the ProjectX task).

12. **License and legal warnings summary.** MPL 2.0 requires that any modifications to ActivityWatch's own source files be released under MPL 2.0 — avoid modifying ActivityWatch source to keep obligations minimal. If {APP_NAME} ever forks or patches ActivityWatch, track the delta in a dedicated repository and comply with MPL disclosure requirements. Do not embed ActivityWatch binaries in a closed-source distribution without auditing the full dependency tree for stricter licenses (LGPL/GPL components in transitive dependencies). Conduct a license audit before the first production deployment.

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
