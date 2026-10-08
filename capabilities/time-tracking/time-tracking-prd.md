# Time Tracking PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Time Tracking |
| **Capability ID** | time_tracking |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST log time spent on client work for billing and reporting.

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

Source feature area(s): Time Tracking

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Live timer — start/stop with project and task association** | 🔵 Planned | Use case: The user starts working on a task and wants to record exactly how long they spend on it — for billing, for self-awareness, or for project estimation. A global timer button is accessible from the header bar or from any task's detail panel. Clicking Start begins a live timer. The timer runs continuously and is visible as an elapsed time display (HH:MM:SS) in the header. Clicking Stop records the entry with the elapsed duration. During tracking, the user can associate the timer with a project and/or a specific task — or leave it unassociated and categorize it later. The timer continues running if the user navigates to a different section of Plenix. If the app is closed accidentally, the timer state is recovered from local storage on next open. Only one timer can run at a time. |
| F02 | **Manual time entry — retrospective logging** | 🔵 Planned | Time entries can be added manually for time not captured by the live timer — time spent in meetings, on calls, or work done before the user started tracking. A manual entry panel collects: Start time (date + time), End time (date + time — duration is calculated automatically), Description (optional free-text), Project association, Task association, and Billable status (toggle with hourly rate field). Manual entries appear in the same time log as live-tracked entries. Editing a live-recorded entry is also done via this panel — the user can adjust the start/end times, add a description, or change the project association after the fact. |
| F03 | **Billable time — hourly rates and billing tracking** | 🔵 Planned | Each time entry can be marked as billable or non-billable. Billable entries can have an hourly rate assigned — either inherited from the associated project (set at the project level) or overridden per entry. The time log shows a calculated value for each billable entry (duration × hourly rate). Aggregate views show total billable hours and total billable value for a project, a date range, or a client. This supports freelancers and agencies who need to track invoiceable time across multiple clients and projects. A 'Mark as invoiced' action on a set of entries flags them so they do not appear in future unbilled totals, maintaining an accurate running balance of what has been billed and what is outstanding. |
| F04 | **Weekly and monthly views — time distribution** | 🔵 Planned | The Time Tracking section has two aggregate views. Weekly view: a horizontal bar chart showing total tracked time per day across the current week (Mon–Sun). Each bar is color-segmented by project, so the user can see not just how much time was tracked each day but how it was distributed across projects. A total for the week is shown alongside a billable/non-billable split. Monthly view: same structure but across the full month, with weekly subtotals. Both views include a table of individual time entries below the chart so the user can drill into the detail behind any bar. Date navigation (previous/next week or month) is available from the toolbar. |
| F05 | **Statistics and reporting — totals, distribution, trends** | 🔵 Planned | The Reports view in Time Tracking provides: Total tracked time (for any configurable date range), Billable vs non-billable split (hours and percentage), Time by project (a pie or bar chart showing what proportion of total time went to each project), Time by task (within a selected project), Daily average (total time divided by working days in the range), and Comparison to previous period (e.g. this week vs last week, this month vs last month). Reports can be filtered by project, by billable status, and by date range. A CSV export button downloads the filtered time entries as a spreadsheet for use in invoicing tools or external reporting. The Automations section can be configured to generate a Weekly Time Report note automatically every Friday. |
| F06 | **Integration with tasks, projects, calendar, and Pomodoro timer** | 🔵 Planned | Time entries are bidirectionally linked to tasks and projects. When a task has time entries, the task detail panel shows the total time logged against it. When a project has time entries, the project detail shows total tracked time alongside task completion progress — giving a dual view of effort (time) and output (tasks done). The Calendar integration works in both directions: time blocks placed on the Calendar timeline can be converted to time entries (confirming that the planned time was actually worked), and time entries can be shown as blocks on the Calendar for a visual record of how the day was actually spent. The Pomodoro timer in the Calendar section creates time entries automatically — each completed Pomodoro is logged as a 25-minute entry against the active task. |

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

1. Not yet defined.

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
