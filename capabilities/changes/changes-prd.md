# Changes PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Changes |
| **Capability ID** | changes |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST track and manage change requests within a project — impact, approval, and implementation.

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

1. **No dominant OSS change-management tool exists — build natively.** There is no OSS equivalent of ServiceNow Change or Jira Change Management that Plenix can embed or fork. The changes module must be built as a first-party specialized issue type. Study OpenProject work packages (GPL-2.0) and Plane issues (AGPL-3.0) as structural references for field layout and state machines, but do not embed or fork either codebase. Both are reference only.

2. **OpenProject — reference only (GPL-2.0).** OpenProject work packages model arbitrary structured items with custom fields, workflow states, and role-based permissions. Study its work package type system and workflow engine for inspiration on how to attach approval steps and status transitions to a record type. Do not embed; GPL-2.0 would require Plenix to open-source all derivative code.

3. **Plane — reference only (AGPL-3.0).** Plane's issue model (state groups, priority, assignees, modules, cycles) is the closest OSS analog to a change request record. Review its data model and REST API design for field naming and grouping conventions. Do not embed; AGPL-3.0 would require publishing Plenix source on network use.

4. **Core architectural decision — changes as a specialized issue type, not a separate entity.** Implement the Change as a subtype of a shared Record base (aligned with the Plenix unified-organizer data model). This allows changes to participate in cross-capability search, linking, and notifications without duplicating infrastructure. Distinguish change-specific fields (impact assessment, risk rating, rollback plan, approval chain, implementation window) from the base record fields at the schema level, not the UI level.

5. **Approval workflow — build natively with a lightweight state machine.** Do not integrate an external BPM engine (Camunda, Activiti) at this stage. Implement a simple ordered approver list with per-approver status (pending, approved, rejected, delegated) and a configurable rule for advancement (unanimous, first-approval, quorum). Defer complex conditional routing to a later phase. The state machine must be auditable: every transition records actor, timestamp, and optional comment in an immutable event log.

6. **Impact assessment fields — structured, not free-text.** Impact assessment must be machine-readable to support filtering and reporting. Define an enum for impact scope (data, infrastructure, user-facing, security, compliance) and a separate severity enum (low, medium, high, critical). Free-text rationale fields accompany each structured field but are not the primary data. This mirrors how incident severity is handled in production-grade tools.

7. **Integration pattern for linked tasks and milestones.** A Change record must be able to reference implementing tasks (from the Tasks capability) and a target milestone or release window. Use a typed link relation (implements, blocked-by, verified-by) rather than a flat reference. Implementing tasks must surface their parent Change context in task views so engineers see change accountability without opening the change record.

8. **E2EE warning.** If Plenix ever adds end-to-end encryption for record content, change records present a compliance conflict: audit logs and approval histories cannot be encrypted in a way that blocks administrator access during an investigation. Approval event logs must remain readable to workspace admins regardless of user-level E2EE settings. Document this exception explicitly before shipping any E2EE layer.

9. **Notification and escalation — defer to a shared notification service, do not build change-specific alerting.** Approval requests, overdue reviews, and implementation-window reminders must route through Plenix's shared notification capability. The changes module emits typed events (change.approval_requested, change.approved, change.rejected, change.overdue, change.implemented); the notification service owns delivery channel logic. Do not hardcode email or push logic inside the changes module.

10. **Rollback plan field — treat as a required structured attachment, not optional prose.** For changes rated medium severity or higher, a rollback plan must be explicitly present before the approval workflow can advance past the first approver. Enforce this as a schema invariant, not a UI hint. The rollback plan can be a linked document, an inline text block, or a reference to a runbook record, but its presence must be verifiable programmatically.

11. **Platform fragility warning for calendar and window integrations.** If the implementation window field integrates with external calendar systems (Google Calendar, Outlook) to block time or send invites, treat those integrations as non-critical enhancement paths, not core functionality. Change window scheduling must work entirely within Plenix (start datetime, end datetime, timezone) without requiring any external calendar connection. External calendar sync is additive and can break without blocking the change workflow.

12. **What Plenix builds natively vs defers.** Build natively: change record schema, impact and risk enums, approval state machine, implementation window scheduling, audit event log, rollback plan enforcement, cross-capability linking to tasks and milestones, and in-app notifications. Defer to later phases or third-party services: integration with ITSM tools (ServiceNow, Jira Service Management), calendar invite delivery, PDF export of change records for compliance handoff, and AI-assisted risk scoring.

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
