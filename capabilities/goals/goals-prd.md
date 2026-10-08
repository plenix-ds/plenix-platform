# Goals PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Goals |
| **Capability ID** | goals |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST enable users to define measurable goals with target metrics, deadlines, and progress tracking, linked to projects and reviewed on a configurable cadence.

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

Source feature area(s): Goal Tracker

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Goal definition and progress tracking** | 🔵 Planned | Use case: The user wants to track progress toward medium and long-term objectives — not just individual tasks, but outcome-level goals like 'Launch the new product line by Q3', 'Read 24 books this year', 'Reach 10kg weight loss by June'. Goals are defined with: a title, a description of the desired outcome, a target date, a measurement type (binary complete/incomplete, numerical target with a current value and unit, or percentage-based), and a review cadence (weekly, monthly). The Goal Tracker shows all active goals with their current progress visually represented as a progress bar or numerical gauge. Goals can be linked to projects (the project is the vehicle for achieving the goal), tasks (specific milestones toward the goal), and habits (recurring behaviors that support the goal). |
| F02 | **Goal review cadence and weekly check-in** | 🔵 Planned | Each goal has a configurable review cadence. When a review is due, the user is prompted to: update the goal's current progress value, write a brief reflection note (what is going well, what is blocked), and optionally adjust the target date or measurement. Review notes are stored in a timeline on the goal's detail page — building a running journal of the goal's progress over time. The Weekly Review automation in the Automations section can automatically generate a goal progress summary every week, pulling the latest values from all active goals and presenting them in a structured note. |

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

1. **No dominant OSS solution — build natively.** Goals is a custom-built capability in {APP_NAME}. No single open-source tool covers the full requirement set (goal definition, measurement types, review cadences, linked projects/tasks/habits, and a progressive reflection journal). Plenix owns this implementation end-to-end.

2. **Reference: Leantime (MIT — Reference only, do not embed).** Leantime is the closest OSS analog worth studying. It ships a goals-and-strategy module explicitly designed for neurodiverse users, with goal-to-task connection patterns. Study its data model and UX flows as a reference, but do not embed or redistribute it. License: MIT, but the reference classification means no code is copied — pattern-study only.

3. **Architectural decision — goals as a first-class entity, not a task attribute.** Goals must live in their own data layer (`goals` table/collection), not as a tagged task or a project property. This enables cross-capability linking: one goal can be linked to multiple projects, multiple tasks as milestones, and multiple habits as supporting behaviors. A flat task-attribute approach cannot support this graph.

4. **Measurement type enum must be locked at schema level.** Three measurement types — `binary` (complete/incomplete), `numeric` (current value + target value + unit string), and `percentage` — must be enforced as a closed enum in the schema. Mixed or free-form measurement types will break progress bar rendering and the weekly review automation. Do not allow user-defined measurement types in v1.

5. **Review cadence is goal-scoped, not global.** Each goal carries its own `review_cadence` field (`weekly` | `monthly` | `quarterly`). The notification/reminder system must query per-goal cadence rather than applying a single global schedule. The Automations module depends on this field to generate the weekly goal progress summary.

6. **Review notes form a time-series journal — model accordingly.** Each check-in creates an immutable `goal_review` record (timestamp, updated progress value, reflection note, optional target-date adjustment). These records must never be edited or deleted after creation — they constitute the audit trail of the goal's history. Store them append-only. The detail page renders them as a chronological timeline.

7. **Integration pattern — goals link to projects, tasks, and habits via a join table, not foreign keys.** Use a polymorphic association table (`goal_links`: goal_id, linked_entity_type, linked_entity_id) rather than nullable foreign keys on each entity. This keeps the Goals schema stable as new linkable entity types are added, and avoids cascading schema changes when any linked capability evolves.

8. **Weekly Review automation is a consumer, not an owner.** The Automations capability pulls live progress values from the Goals data layer on demand. Goals does not push data to Automations. The Goals module exposes a read API (`getActiveGoalsWithProgress`) that the Automations module calls. This prevents tight coupling and lets each capability evolve independently.

9. **Warning — do not implement real-time collaborative goal editing in v1.** Multi-user goal ownership introduces conflict resolution complexity (two users updating a numeric progress value simultaneously). In v1, each goal has a single owner. Shared visibility (read-only for teammates) is acceptable, but write access must be gated to the owner. Revisit collaborative ownership when the core capability is stable.

10. **Warning — platform fragility on habit-to-goal linking.** Habits is also a custom-built capability with its own cadence and completion model. The link between a habit and a goal is informational in v1 — it does not automatically update goal progress when a habit is completed. Automatic progress propagation from habit completions to goal numeric values requires a well-defined mapping rule that does not yet exist. Do not build this automation until the rule is specified. Flag as an open question.

11. **Progress bar rendering must handle all three measurement types without special-casing in the UI layer.** The backend must normalize all measurement types to a `0.0–1.0` progress ratio before sending to the frontend. `binary` maps to 0.0 or 1.0. `numeric` maps to `current / target` (clamped to 1.0). `percentage` is divided by 100. The UI renders one universal progress component that consumes the ratio. This keeps the frontend free of measurement-type logic.

12. **Defer AI-generated goal suggestions and coaching to a later phase.** The PRD features (F01, F02) do not include AI goal recommendation, smart target-setting, or coaching prompts. These are high-value but architecturally separable. Do not couple the core Goals data model to any AI inference layer in v1. When AI features are added, they must be implemented as an overlay that reads goal data without modifying the schema.

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
