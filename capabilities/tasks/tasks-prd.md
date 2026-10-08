# Tasks PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Tasks |
| **Capability ID** | tasks |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST track work items, assignments, priorities, and deadlines across all contexts.

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

Source feature area(s): Tasks

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Task list — core row anatomy** | ✅ Built / Required | Each task row shows: a checkbox (toggles completion, adds strikethrough and fades to 60% opacity), a priority color dot (red for urgent, orange for high, yellow for medium, gray for low), the task title, a project label badge, and a due date in monospace. Checking a task updates the progress bar on the associated project detail view in real time. |
| F02 | **Task structure — rich metadata object** | 🔵 Planned | Each task is a structured object that can carry: Priority level (Urgent / High / Medium / Low — four levels, color-coded); Due date with optional time (e.g. March 10 at 2:30 PM — the time makes it schedulable on the day timeline); Subtasks (nested checklist); Labels and tags (custom, color-coded, multi-value); Comments (threaded discussion history); Notes (a formatted text area for context); Time estimate; Status (Not started / In progress / Blocked / Done / Canceled); and links to related projects, calendar events, habits, goals, or journal entries. Tasks can exist independently or as part of a project workflow. All metadata is optional — a task can be as simple as a title with a checkbox. |
| F03 | **Four-level priority system — Urgent, High, Medium, Low** | 🔵 Planned | Tasks support four priority levels rather than three: Urgent (red — time-critical, needs immediate action), High (orange — important but not on fire), Medium (yellow — standard work), and Low (gray — nice to do, no deadline pressure). The four levels allow finer-grained sorting and filtering. The priority dot is visible on every task row, in the Kanban card, and on the Calendar timeline block. Auto-sort rule: Urgent tasks always surface above High, which surfaces above Medium and Low, regardless of due date. The priority level is also used by the AI day planner to assign earlier time slots to higher-priority tasks. |
| F04 | **Due dates with optional time and overdue tracking** | 🔵 Planned | Tasks can have a due date (date only) or a due date + time (specific deadline). Date-only tasks appear as all-day markers on the Calendar. Tasks with a time appear as a schedulable block on the day timeline. Overdue detection: at midnight, any incomplete task whose due date has passed is automatically flagged as overdue. Overdue tasks appear with a red date indicator in the task list, in the Tasks dashboard widget's Overdue section, and in the Today view of the Calendar. The overdue indicator persists until the task is completed or the due date is updated. Overdue tasks are sorted above other tasks in the active list regardless of priority. |
| F05 | **Task organization — lists, areas, and projects** | 🔵 Planned | Tasks are organized at three levels. Areas of responsibility are top-level containers (Work, Personal, Health, Finance). Within an area, Projects or goals collect related tasks. Individual tasks sit within a project. The sidebar reflects this three-level hierarchy with count badges. A task can belong to one project but be visible across multiple views (Today, Due Soon, All Tasks) simultaneously — its organizational home and its temporal urgency are independent. |
| F06 | **Priority-based workflow — Current vs Future** | 🔵 Planned | Tasks are separated into two buckets: Current (active focus — what you are working on today or this week) and Future (deferred items — acknowledged but not yet acted upon). The user manually moves tasks between Current and Future, keeping the active list short and focused. Tasks can also be scheduled to move from Future to Current on a specific date, surfacing automatically when the time comes. |
| F07 | **Multiple workflow views** | 🔵 Planned | Four views of the same underlying task data: Priority list (ordered, drag to re-prioritize); Kanban board (columns by status, cards draggable between stages); Date-based planning (calendar timeline showing tasks by due date); Categorization matrix (2x2 urgency/importance Eisenhower grid). Switching views is a presentation change, not a data change. |
| F08 | **Subtasks and task hierarchy** | 🔵 Planned | Tasks can contain subtasks — nested checklist items with their own checkboxes, priority, and due dates. The parent task shows a progress indicator (e.g. 3/5 subtasks done). Subtasks can be promoted to full tasks. Up to three levels of nesting (task → subtask → sub-subtask). The task detail panel shows the full subtask list, notes, attributes, and activity log. |
| F09 | **Labels and tags — color-coded cross-workflow categorization** | 🔵 Planned | Tasks can be assigned one or more custom labels. Each label has a name and a color. Labels are user-defined and reusable across all tasks and projects — not scoped to a single project. Common uses: 'client', 'waiting', 'admin', 'deep-work', 'quick-win'. Labels appear as colored pills on task cards and rows. Filtering by label in the sidebar or toolbar instantly shows all tasks with that label regardless of which project they belong to. Labels are distinct from project membership — a task has one project but can have many labels. |
| F10 | **Threaded comments — discussion history per task** | 🔵 Planned | Each task has a Comments tab in its detail panel. Comments are threaded — a comment can have replies forming a sub-thread. Each comment shows the author, timestamp, and formatted text (supports bold, italic, inline code, and links). Comments are used to store: decisions made about the task, questions and answers between team members, status updates that are not reflected in the task fields themselves, and references to related information. The comment history is immutable — comments can be edited within a short window after posting but not deleted after that, preserving a reliable audit trail. Comments are separate from the task's Notes field (which is a personal scratchpad) — comments are for shared discussion. |
| F11 | **Task detail panel — full metadata view** | 🔵 Planned | Clicking any task row opens the task detail panel as a right-side drawer. The panel shows all task fields: title (editable), priority, status, due date + time, time estimate, project, labels, assignee (team mode), subtask list with progress, Notes (formatted text area), Comments (threaded), and an Activity log (auto-generated history of all changes: who changed what field, when). The panel is open while the task list remains scrollable behind it — the user does not lose their place in the list. All fields are editable inline within the panel. |
| F12 | **Workflow interaction — move between stages, drag-and-drop** | 🔵 Planned | Tasks can be moved between workflow stages (Kanban columns) by dragging the card or by changing the Status field in the task detail panel. Within a column, tasks can be reordered by dragging. In the list view, tasks can be reordered by dragging rows within their group. Reordering updates the manual sort order, which is preserved independently of any sort setting. Marking a task as complete (checkbox or 'Done' status) moves it to the completed state and removes it from the active list unless 'Show completed tasks' is enabled in Settings. |
| F13 | **Calendar and habit integration** | 🔵 Planned | Tasks with due dates appear directly on the Calendar timeline alongside events — the user sees their full commitment picture in one view. Tasks with a specific time appear as a schedulable block. Tasks can also be linked to habits (e.g. a daily exercise task that is also a tracked habit) or goals (the task is a milestone toward a defined goal). When a habit-linked task is completed, it logs the habit completion for that day simultaneously. When a goal-linked task is completed, the goal progress updates automatically. |
| F14 | **Task capture — quick add, voice, email, integrations** | 🔵 Planned | Quick add: persistent input at top of any task list, natural language date parsing. Voice: microphone button in Capture flow. Email: forwarding to a Plenix capture address creates a task with subject as title, body as notes, sender linked to contact. Integrations: GitHub issues, Asana, Google Tasks via Connectors with bidirectional status. All captured tasks land in an Inbox for triage before entering the active system. |
| F15 | **Reminders and scheduling** | 🔵 Planned | Each task can have multiple reminders: specific date+time, relative to due date ('2 hours before'), or location-based (future). Fires as in-app and browser notifications. Scheduling view shows tasks on a timeline to redistribute load by dragging. Over-committed days highlighted in orange. |
| F16 | **Sidebar filters and grouping** | 🔵 Planned | Sidebar items: All Tasks, Today, Due Soon (7 days), By Project, By Area, Flagged, Completed. Each is a live query. Toolbar grouping: by project, by priority, by due date, or flat. Active filter and grouping remembered per session. |
| F17 | **Sidebar filter → task list live connection** | ✅ Built / Required | Clicking any sidebar item filters the main task list to that scope. Active filter shown as highlighted sidebar row and label above list. Clearing returns to All Tasks. |
| F18 | **Automation and API** | 🔵 Planned | Automations create tasks from triggers (new client email, GitHub PR assignment, Monday morning review prompt). API allows any external system to POST a task. Zapier and Make connectors planned. Captured tasks land in the Inbox for triage. |

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

1. **Three-layer architecture — additive, not competing.** The OSS landscape maps cleanly onto three non-overlapping layers: Super Productivity answers "what am I doing today" (personal execution), Plane answers "what is the project doing" (issue and sprint tracking), and OpenProject answers "what are the resources doing" (enterprise PM, cost tracking, Gantt). {APP_NAME} should design its data model and UI to serve all three layers simultaneously, not collapse them into one lowest-common-denominator task list.

2. **Super Productivity — MIT license, suitable for direct embedding.** Study and embed Super Productivity (https://github.com/johannesjo/super-productivity) for the personal execution layer: timeboxing, focus mode, Pomodoro-style work sessions, per-task time tracking, and the Today view. Because it is MIT-licensed, code can be incorporated directly into the {APP_NAME} codebase or its compiled output bundled with the app. Attribution is required in the license file; no copyleft obligations are triggered.

3. **Plane — AGPL license, run as a self-hosted service, do not embed.** Plane (https://github.com/makeplane/plane) covers project issue tracking — issues, sprints, cycles, roadmap, and triage. AGPL requires any modified version distributed over a network to release source code. The correct integration pattern is to run Plane as an internal self-hosted service and connect to it via its REST/GraphQL API, keeping it architecturally separate from the {APP_NAME} codebase. Do not copy Plane source into the {APP_NAME} repo.

4. **Vikunja — AGPL license, reference only for Gantt implementation.** Vikunja (https://github.com/go-vikunja/vikunja) provides a self-hosted task manager with lists, Kanban, Gantt, and CalDAV sync. The primary value here is as a reference implementation for Gantt chart rendering and CalDAV integration — study its approach rather than embedding its code. The same AGPL self-hosting rule applies if any Vikunja instance is deployed.

5. **Time tracking bridges personal and project layers.** Super Productivity's per-task time log should be the canonical source of time-tracking truth for individual users. That data must flow to OpenProject's project cost tracking so that logged hours on tasks appear as resource consumption on the corresponding project. Design a sync adapter or webhook bridge at the data layer; do not build two independent time-tracking systems.

6. **{APP_NAME} builds natively: task data model, unified inbox, day planning view, cross-capability links.** The core task object (F02), priority system (F03), overdue logic (F04), area/project hierarchy (F05), labels (F09), and the links between tasks and calendar events, habits, and goals (F13) are {APP_NAME}-native. No OSS tool owns this cross-capability glue — it is a core differentiator and must be built in-house.

7. **{APP_NAME} defers to services: issue tracking workflow, enterprise Gantt, resource planning.** Sprint boards, backlog grooming, story-point estimation, team velocity reporting, and resource allocation Gantt are not personal task features — they belong to the Plane and OpenProject layers. Avoid duplicating this functionality natively; surface it through embedded iframes or deep-link handoffs to the appropriate service.

8. **Integration pattern — bidirectional sync via adapters, not direct DB coupling.** Connect to Plane and OpenProject through their published APIs with an adapter module per service. Each adapter is responsible for: mapping external issue/task IDs to internal {APP_NAME} task IDs, translating status enums (Plane's "In Progress" → {APP_NAME}'s "In progress"), and handling conflict resolution (last-write-wins with a sync timestamp). Never couple {APP_NAME}'s database schema directly to an external tool's schema.

9. **Platform fragility warning — Plane and OpenProject API surfaces change across major versions.** Pin the API version in each adapter (e.g. Plane v1 REST API) and treat upgrades as a breaking-change migration. Add integration smoke tests that run against a local Docker instance of each service. Document the minimum supported version of each self-hosted service in the {APP_NAME} deployment guide.

10. **License hygiene — audit before every dependency addition.** Any OSS code that enters the {APP_NAME} codebase must be MIT, Apache 2.0, BSD, or ISC. AGPL and GPL code must never be imported or vendored directly. Run a license audit (e.g. `license-checker` for Node, `pip-licenses` for Python) in CI. Flag any AGPL transitive dependency introduced by the Super Productivity embed as a build warning requiring manual review.

11. **E2EE and privacy boundary warning.** If {APP_NAME} proxies task data from a user's self-hosted Plane or OpenProject instance, that data passes through {APP_NAME}'s servers unless the integration is purely client-side. Clearly document this data-flow boundary. For users who require end-to-end encryption of task content, the personal task layer (MIT-embedded Super Productivity logic) should operate on encrypted-at-rest local data with server-side storage of ciphertext only. The self-hosted service layer is inherently user-controlled and outside {APP_NAME}'s E2EE scope.

12. **Gantt and CalDAV — defer and federate.** Do not build a native Gantt renderer in the initial release. For users who need Gantt, surface OpenProject's Gantt view via a deep link or embedded frame. For CalDAV sync (exporting tasks as calendar items), study Vikunja's CalDAV implementation as a reference and implement a read-only iCal export endpoint first, then full CalDAV CRUD in a later milestone once the task data model is stable.

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
