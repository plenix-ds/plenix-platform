# Resourcing PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Resourcing |
| **Capability ID** | resourcing |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST allocate people and resources to projects with availability and capacity tracking.

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

1. **Study OpenProject first (GPL v3, self-hosted).** OpenProject (github.com/opf/openproject, ~15k stars) is the most mature OSS resource management tool and covers resource allocation, Gantt charts, budgets, timesheets, and cost tracking. It must be treated as a reference implementation only — not embedded, not linked — because GPL v3 is copyleft and would infect the Plenix codebase if its code were included. Study its data model, scheduling algorithms, and UX conventions, then implement independently.

2. **Reference dhtmlx Gantt or Frappe Gantt for the Gantt renderer (MIT/GPL split, reference/embed decision).** Frappe Gantt (MIT, ~3.5k stars) is lightweight, embeddable, and MIT-licensed — safe to embed directly in Plenix. dhtmlx Gantt (dual license: GPL v2 for open-source, commercial otherwise) must not be embedded in a proprietary product without a paid license. Use Frappe Gantt or build a native renderer inspired by both.

3. **Reference Plane (Apache 2.0, self-hosted) for modern resource and sprint workflows.** Plane (github.com/makeplane/plane) provides a modern take on project and resource management with a clean API and Apache 2.0 license, which permits embedding and derivative works without copyleft obligations. Its resource assignment and member capacity models are a safe architectural reference and code study source.

4. **Architectural decision — pull scheduling over push.** Resource availability should be computed on read (pull), not maintained as a continuously updated materialized state (push). Availability windows are derived from: assigned allocations, calendar blocks, declared capacity per member, and time-off entries. Pre-materialized state becomes stale and is expensive to keep consistent across edits. Compute on demand and cache with short TTL.

5. **Integration pattern — treat resourcing as a projection layer over Tasks and Calendar.** Plenix builds tasks and calendar natively. Resourcing must not own a parallel assignment store; it reads task assignments and due dates from the Tasks capability and calendar events from the Calendar capability, then projects capacity and allocation on top. This avoids dual-write and keeps the resourcing view always in sync.

6. **Plenix builds natively: allocation records, capacity profiles, availability computation, and the allocation UI.** These are core to the value proposition and must not be deferred to a third-party service. Native ownership ensures E2EE compatibility, offline support, and data sovereignty.

7. **Defer to a service for advanced CPM/PERT scheduling and critical-path computation.** Critical path method scheduling across large project networks is algorithmically complex and rarely needed by Plenix's target user. If needed, evaluate integrating with a headless scheduling engine (e.g., a WASM-compiled subset of a CPM library) rather than building from scratch. Do not block the MVP on this.

8. **Warning — platform fragility on calendar integrations.** Availability computation depends on reading calendar blocks from Google Calendar, Outlook, and Apple Calendar. All three providers change API scopes and OAuth policies frequently. Design the calendar-read pathway as a thin, replaceable adapter behind an internal interface, so a provider change does not cascade into the resourcing engine.

9. **Warning — E2EE constraints on server-side scheduling.** If Plenix enforces E2EE for task and calendar data, server-side availability computation over encrypted payloads is not possible without a trusted execution environment. Plan for client-side computation of availability as the default path, with server-side aggregation only for non-sensitive summary data (e.g., utilization percentages without names).

10. **Key decision — capacity granularity.** Decide early whether capacity is tracked at day granularity or hour granularity. Day granularity is simpler to compute, display, and explain to users, and sufficient for most knowledge-work resourcing. Hour granularity is required for scheduling tradespeople or shift workers but adds significant UI and data complexity. Default to day granularity for MVP; design the schema to support hour granularity as a future mode without a breaking migration.

11. **Reference Toggl Track (proprietary) and Kimai (MIT, self-hosted) for timesheet UX patterns.** Kimai (github.com/kimai/kimai, MIT) is embeddable and a strong reference for timesheet entry, approval workflows, and per-project time reporting. Do not embed Kimai directly — it is a full application — but its REST API design and data model are worth adopting as conventions for Plenix's native timesheet module.

12. **Build the budget and cost-tracking layer as a thin module, not a finance system.** OpenProject includes budget and cost tracking tightly coupled to its project model. For Plenix, budget tracking should cover: budgeted hours per project, actual hours logged, and a simple cost rate (hourly rate per member). Full financial reporting, invoicing, and GL integration must be deferred to accounting integrations (e.g., QuickBooks, Xero). Do not build an internal ledger.

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
