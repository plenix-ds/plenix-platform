# Roadmap PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Roadmap |
| **Capability ID** | roadmap |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST plan and visualize project milestones, features, and timelines.

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

1. **Study Plane for timeline and milestone patterns (AGPL, 46k stars — self-hosted service, do not embed).** Plane's roadmap and cycle-planning views are the closest OSS analog to {APP_NAME}'s roadmap capability. Treat it as a reference implementation for data modeling (cycles, modules, milestones, state sequences) and for timeline layout heuristics, but do not ship its code inside {APP_NAME}. If a self-hosted Plane instance is ever offered as an enterprise add-on, run it as a separate container behind {APP_NAME}'s API gateway, never as an embedded library.

2. **Study OpenProject for Gantt dependency modeling (GPL, 15k stars — self-hosted service, do not embed).** OpenProject's Gantt engine handles predecessor/successor links, lag offsets, critical-path highlighting, and baseline comparisons. Mine its data model and rendering approach for reference. Because GPL propagation risk is non-trivial, do not copy source; build {APP_NAME}'s own dependency resolver inspired by the concepts. A self-hosted OpenProject instance is acceptable as a power-user escape hatch but must not be a required runtime dependency.

3. **Build the core timeline renderer natively using a permissively licensed canvas or SVG library.** Candidates: DHTMLX Gantt (Commercial — reference only for UI patterns), Frappe Gantt (MIT — safe to embed), or a custom SVG/Canvas layer built on top of D3 (BSD — safe to embed). Frappe Gantt is the lowest-friction starting point for a Gantt strip; evaluate it first before building from scratch.

4. **Separate the data model from the rendering layer as a strict architectural decision.** The roadmap data model (milestones, releases, features, date ranges, dependencies, status) must live entirely in {APP_NAME}'s core schema and be queryable independently of any view. The timeline, board, and list views are read projections over that schema. This prevents renderer lock-in and allows future views (calendar heatmap, burndown, etc.) without schema changes.

5. **Model milestones as first-class entities, not tags or field values.** A milestone has its own ID, owner, target date, completion status, and a many-to-many relationship to work items. Avoid the common shortcut of treating a milestone as a special issue type — it makes dependency queries and progress roll-ups unnecessarily complex.

6. **Integration pattern — expose a stable internal REST/GraphQL roadmap API before building any UI.** Other capabilities (Tasks, Notes, Goals if added later) depend on roadmap milestones for due-date anchoring. Define the API contract first, then build the Gantt/timeline UI against it. This prevents the UI layer from encoding business logic that other capabilities need to call.

7. **Warning — AGPL contagion from Plane.** If any Plane source file (including frontend components) is copied or linked into {APP_NAME}'s codebase, the entire product becomes subject to AGPL copyleft. Study Plane's UI patterns and data model from documentation and public screenshots only; never paste its source. The same applies to OpenProject under GPL.

8. **Warning — timeline data is structurally incompatible with E2EE.** Roadmap views require server-side aggregation (computing completion percentages, sorting by date, resolving dependency chains). If {APP_NAME} ever extends E2EE to roadmap items, these aggregations become impossible without client-side computation or a trusted enclave. Decide at architecture time whether roadmap data sits inside or outside the E2EE boundary; defaulting it outside is the pragmatic choice.

9. **Warning — third-party calendar and project tool sync is platform-fragile.** Syncing milestone dates to Google Calendar, Jira, Linear, or Notion via their APIs introduces surface area that breaks whenever those vendors change rate limits, webhook schemas, or OAuth scopes. Treat these integrations as best-effort and surface sync errors clearly in the UI rather than silently failing. Gate each integration behind a feature flag so it can be disabled without a release.

10. **{APP_NAME} builds natively: data model, dependency graph, timeline renderer, milestone roll-up logic, and status propagation rules.** These are core differentiators and must not be deferred to a third-party service.

11. **{APP_NAME} defers to a service or skips initially: critical-path scheduling algorithms, resource leveling, earned-value analysis, and baseline comparison.** These are advanced project-management concepts needed by a minority of users. If demand emerges, evaluate embedding a lightweight CPM library (e.g., a permissively licensed JS scheduler) rather than integrating a full PM platform.

12. **Versioning and baseline snapshots must be designed into the schema from day one.** A roadmap changes frequently; stakeholders need to compare the current plan against a baseline taken at a fixed point (e.g., start of quarter). Retrofitting snapshot support into a schema that assumed a single mutable state is expensive. Reserve a `baseline_snapshots` table or document collection in the initial migration even if the UI surface for it ships later.

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
