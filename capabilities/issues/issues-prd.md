# Issues PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Issues |
| **Capability ID** | issues |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST log, track, and resolve problems or bugs within a project.

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

1. **Study Plane (AGPL, self-hosted) as the primary reference for issue tracking and roadmap views.** Plane's data model covers issues, sprints, cycles, modules, and timeline/roadmap views at 46k stars of production validation. Review its schema and API surface before designing Plenix's own issue entity — most field conventions (priority, state machine, assignees, labels, due dates) can be adopted directly without reinvention.

2. **Plane is AGPL-licensed — do not embed or bundle its source code.** AGPL requires any modified version served over a network to be open-sourced. Treat Plane as a self-hosted reference implementation only: study it, run it locally for UX research, but build Plenix's issue module independently. No code copy-paste from the Plane repository.

3. **Study OpenProject (GPL v3, self-hosted) for resourcing, Gantt, and budget tracking patterns.** OpenProject's work-package model, Gantt scheduling logic, and timesheet/budget structures are the strongest open reference for those sub-capabilities. Use it the same way as Plane: self-hosted for study, never embedded. GPL v3 carries the same network-service copyleft risk as AGPL.

4. **Use OpenRMF (Apache 2.0) as a reference-only source for risk and compliance framework patterns.** At ~500 stars it is niche but its risk-scoring schema and compliance-control linking patterns are directly applicable to Plenix's Risks and Changes modules. Apache 2.0 is permissive — code snippets or data-model ideas from OpenRMF can be adapted into Plenix without license concern, provided attribution is retained in source comments.

5. **Build the Risks and Changes modules natively inside Plenix.** No OSS tool covers these adequately for a unified organizer context. Design them from first principles using OpenRMF as a pattern reference. Key entities to define: Risk (id, title, probability, impact, mitigation, owner, status), Change Request (id, linked issues, impact assessment, approver, state machine).

6. **Architectural decision — embed a lightweight issue state machine, not a full workflow engine.** Plane and OpenProject both overengineer workflow for Plenix's target user. Implement a fixed state set (Triage, Open, In Progress, Blocked, In Review, Done, Closed) with allowed transitions as a simple config map. Defer pluggable workflow engines (e.g., XState) until there is clear user demand.

7. **Integration pattern — Issues link bidirectionally to Tasks, Risks, and Changes via a shared `linkedItems` junction table.** Do not create separate foreign-key columns per capability; a generic link table (sourceType, sourceId, targetType, targetId, linkType) keeps the schema extensible as new capabilities are added. This pattern is validated by Plane's module-issue and cycle-issue linking approach.

8. **Defer Gantt and resource allocation to a later phase.** OpenProject's Gantt implementation is complex and tightly coupled to its scheduling engine. Plenix should ship a simple timeline view (date bars on a horizontal axis) first, then evaluate whether to implement critical-path scheduling natively or integrate a library such as Frappe Gantt (MIT) when the user need is confirmed.

9. **Warning — platform fragility on browser-extension–based capture.** If Issues supports capturing bugs or feedback directly from a browser extension (screenshot, URL, context), that surface is fragile across browser updates and Manifest V3 restrictions. Isolate extension capture code behind a feature flag and version it independently from the core issue module.

10. **Warning — E2EE is incompatible with server-side full-text search on issue body/comments.** If Plenix introduces end-to-end encryption for issue content, full-text search must move client-side (e.g., MiniSearch over a locally decrypted index) or be scoped to unencrypted metadata fields only. Decide encryption scope before designing the search index — retrofitting is expensive.

11. **{APP_NAME} must never be hardcoded in any issue-module string, config key, or API route prefix.** All user-facing labels, email notification templates, and API namespace references must consume the global `{APP_NAME}` variable. This applies to auto-generated issue IDs if they include a product prefix (e.g., `{APP_NAME}-1042`).

12. **License summary for quick reference.** Plane: AGPL — self-hosted study only, no embed. OpenProject: GPL v3 — self-hosted study only, no embed. OpenRMF: Apache 2.0 — reference and adapt freely with attribution. Everything Plenix ships in production for Issues, Risks, and Changes is custom-built code owned by Plenix.

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
