# Dashboard PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Dashboard |
| **Capability ID** | dashboard |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST provide a home screen with configurable widgets — projects, emails, calendar, contacts, tasks, notes, weather, and summary metrics — in a drag-and-drop grid layout with condensed density defaults and settings-driven display preferences.

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

Source feature area(s): Dashboard

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **3-column × 2-row CSS grid** | ✅ Built / Required | The dashboard uses a single CSS grid with gridTemplateColumns: 2fr 1fr 1fr and gridAutoRows: auto. This means the left column is twice as wide as each of the right two columns. Critically, every cell in a grid row is exactly as tall as the tallest widget in that row — not taller, not shorter. This was the key fix that replaced three separate flex columns which caused widgets to stretch vertically to fill all available space. |
| F02 | **6 core widgets** | ✅ Built / Required | Projects (top-left, wide), Emails (top-center), Calendar (top-right), Tasks (bottom-left, wide), Notes (bottom-center), and Contacts (bottom-right). Each widget has a draggable handle bar at its top, a header row with a title and View All link, and a scrollable content area sized to its content rather than the window height. |
| F03 | **Drag-and-drop widget rearrangement** | ✅ Built / Required | Each widget card is draggable. Dragging a widget over another and dropping swaps their positions in the layout order array. The drag target is highlighted with a blue top bar and blue box shadow. The layout order is stored in state and persists for the session. |
| F04 | **Live clock strip** | ✅ Built / Required | A compact strip above the widgets shows the current time (12h format, updates every second) and the full date. Rendered in the monospace font for alignment precision. A thin vertical rule separates time from date. |
| F05 | **Projects widget card view** | ✅ Built / Required | Project cards in a 2-column grid with gridAutoRows: max-content. Each card has a 3px left border in the project color, the project name tinted in that color, and a subtle color wash on hover. |
| F06 | **Contacts widget** | ✅ Built / Required | Horizontal contact rows — avatar, name, message icon (blue), call icon (green). Icons use stopPropagation and have hover states. |
| F07 | **Tasks widget — today, overdue, and upcoming** | 🔵 Planned | Use case: The most important thing on the dashboard is knowing what needs to be done today without opening the Tasks section. The Tasks widget shows a consolidated, prioritized list covering three scopes: Today (tasks due today), Overdue (tasks past their due date, shown with a red date indicator), and Upcoming (tasks due in the next 7 days). Each scope is a labeled sub-section within the widget. Tasks are ordered by priority within each scope. Each row shows the checkbox, priority dot, task title, and due date. Checking a task from the widget marks it complete in the Tasks section in real time. The widget respects the task settings (show/hide priority dot, show/hide project label). A count badge on the widget header shows total incomplete items across all three scopes. |
| F08 | **Active timer widget — running session visibility** | 🔵 Planned | Use case: When the user starts a focus session (Pomodoro or manual timer) from a task, the active timer should be visible from the dashboard without navigating away. The Active Timer widget shows: the current task being worked on, the elapsed time for the session (counting up) or remaining time (counting down for Pomodoro), a pause/resume button, and a stop/complete button. If no timer is running, the widget shows a prompt to start a focus session and a list of the top 3 priority tasks as quick-start options. The timer state is shared with the Calendar timeline view — starting a timer from the dashboard marks that time block as In Progress on the timeline. |
| F09 | **Habit tracking widget — streaks and daily completion** | 🔵 Planned | Use case: The user tracks daily habits (exercise, reading, meditation, water intake, etc.) and wants to see and update their habit status from the dashboard without opening a separate Habits section. The Habits widget shows each tracked habit as a row with: the habit name, an icon, a check button (tap to mark today's habit complete), and a streak counter (consecutive days completed). Completed habits are shown with a green checkmark and a faded appearance so uncompleted ones stand out. The streak number updates immediately when a habit is checked. A mini progress bar shows how many habits have been completed today vs total (e.g. 3/5). Habits are configured in Settings → Habits with name, icon, color, and target frequency. This widget is the daily entry point for habit logging — not a full habit analytics view. |
| F10 | **Calendar events widget — today's schedule inline** | 🔵 Planned | Use case: The user needs to see today's calendar events from the dashboard without opening the Calendar section. The Calendar widget shows: a compact timeline of today's events (title, time, duration as a colored bar), the next upcoming event highlighted at the top, and events color-coded by their source calendar. All-day events appear at the top of the list. The widget reads from all connected calendar providers and the user's Plenix time blocks simultaneously, so it is a unified view of committed time. Clicking any event opens the full event detail (and its linked note if one exists). A 'Join' button appears on events with a detected video conference link (Zoom, Meet, Teams). The widget updates in real time as connected calendar providers push new events. |
| F11 | **Notes widget — recent notes with project context** | 🔵 Planned | Use case: The user wants quick access to recently edited notes without navigating to the Notes section — especially notes tied to active projects. The Notes widget shows the most recently created or modified notes as compact rows: note title, folder, a one-line preview, and timestamp. If a note is linked to a project, the project's color dot and name appear as a badge. Clicking a note row opens it in the Notes section. A 'New note' quick-add button at the top of the widget creates a new note and navigates to the editor. The number of notes shown is configurable (3, 5, or 7 rows). This gives the user a contextual anchor to ongoing work — seeing a project note surfaces the context of what they were working on last. |
| F12 | **Shopping list widget — manage list from dashboard** | 🔵 Planned | Use case: The user maintains a shopping list as part of their daily life and wants to add items and check things off without navigating anywhere. The Shopping List widget is a lightweight checklist embedded directly in the dashboard. Key design principle: speed and simplicity above all — no categories, no tags, no labels, no extra structure. Item entry: a text input at the top of the widget accepts a new item name; pressing Enter adds it instantly and it appears at the top of the list for immediate visibility. Items are displayed in a single continuous list with no sub-sections. Completion: each item has a checkbox; checking it applies a strikethrough state and removes the item from the active list after a brief animation (rather than staying in a completed pile). Reordering: items can be dragged up and down to match store layout or shopping priority — the new order saves immediately with no manual save step. The order persists across sessions. The list is available as a full-screen view in the Tasks section (under a dedicated Shopping List area) and as a dashboard widget. Data is the same underlying list in both places — the widget is a shortcut, not a separate store. Cloud sync keeps the list current across devices (useful when one device is at home making the list and another is at the store checking items off). |
| F13 | **Summary metrics cards — system-wide counts at a glance** | 🔵 Planned | Use case: The user wants a quick health check of their whole system — how many projects are active, how many tasks are outstanding, whether they are on top of their notes and habits — without drilling into each section. The dashboard includes a row of summary metric cards (KPI-style), each showing a count and a label: Total projects, Active tasks, Completed tasks today, Total notes, Calendar events today, Tracked habits, and Current habit streak (longest active streak in days). Each card is clickable — clicking 'Active tasks' navigates to the Tasks section filtered to incomplete items. Metric cards update in real time. A subtle trend indicator (up/down arrow) shows whether each metric has increased or decreased since yesterday, giving the user a sense of momentum. |
| F14 | **Weather widget** | 🔵 Planned | Sits in the dashboard as a lightweight status strip. Shows current weather conditions (icon + short description) and temperature. Configurable: actual vs feels-like temperature, Celsius vs Fahrenheit. Auto-refreshes every 5 minutes. Location determined via IP-based geolocation — the user can tap the location label to verify the inferred city. Enabled/disabled in Settings → Dashboard. |
| F15 | **Widget settings — per-widget configuration** | ✅ Built / Required | Each widget type has its own configurable fields accessible from the dashboard Settings panel: density (card vs list view for Projects), visible fields (show/hide category, status, file count, tags, description), filtering (include/exclude archived or paused projects), and max item count. Changes apply immediately without reloading. |

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

1. **Study Homepage as a layout and widget-pattern reference only (Apache 2.0 — reference).** Homepage (github.com/gethomepage/homepage, 31k stars) is a fast service-launcher dashboard with 100+ service integrations, Docker auto-discovery, and a mature widget grid system. Its grid layout conventions, widget card anatomy (header row, scrollable content area, count badges), and drag-and-drop interaction patterns are worth studying directly. Do not embed or fork it — {APP_NAME}'s dashboard is a fundamentally different product category (personal productivity hub, not a service launcher) and Homepage's data model cannot serve project health, task state, habits, or AI suggestions.

2. **{APP_NAME} builds the dashboard natively; no third-party dashboard framework is embedded.** Homepage, Dasherr, Heimdall, and similar OSS tools are all service-launcher dashboards. None of them model projects, tasks, linked notes, habit streaks, or AI-driven productivity insights. Embedding any of them would require stripping out more than it provides. Build the dashboard as a first-party React component tree using the same design system as the rest of {APP_NAME}.

3. **Use a CSS grid for the widget layout, not flex columns (key architectural decision).** The proven layout is `gridTemplateColumns: 2fr 1fr 1fr` with `gridAutoRows: auto`. This ensures every cell in a row is exactly as tall as its tallest widget — no vertical stretching. Three independent flex columns (the naive approach) cause widgets to stretch to fill all available space and lose content-driven height. All widget resize and reflow logic must operate on the grid, not on individual column heights.

4. **Drag-and-drop widget rearrangement: swap positions in a layout-order array, do not manipulate DOM positions directly.** Store widget order as an ordered array of widget IDs in state (and persisted to the user's settings record). On drop, swap the indices of the dragged widget and the drop target. Re-render from the updated array. This keeps layout state authoritative and serializable. Highlight the drop target with a colored top border and box shadow — not opacity or z-index changes — to preserve readability during drag.

5. **Real-time widget data must flow through the same data layer as the rest of {APP_NAME} — no widget-local polling.** Tasks, projects, notes, habits, and calendar events are already maintained in the core data layer. Widgets are read-only projections of that data. Do not introduce per-widget polling intervals or local caches. Subscribe widgets to the relevant store slices (React context, Zustand, or equivalent) so they update reactively when underlying data changes. The Active Timer widget (F08) and task completion from the Tasks widget (F07) are the two places where widgets write back to the data layer — treat these as the same mutation path used by the Tasks section itself.

6. **Calendar and weather widgets require external service integration — isolate behind a provider abstraction layer.** The Calendar widget (F10) reads from connected calendar providers (Google Calendar, Outlook, iCal) plus {APP_NAME}'s own time blocks. Abstract this behind a unified CalendarProvider interface so the widget does not know which providers are connected. The Weather widget (F14) calls an OSS-friendly weather API (Open-Meteo is recommended: open-source, no API key required for basic use, Apache 2.0 — self-hosted service option exists). Use IP-based geolocation for the initial location, configurable by the user in Settings. Refresh weather data every 5 minutes maximum; do not refresh on every render.

7. **Video conference link detection in the Calendar widget must be pattern-matched client-side — do not send event data to a third-party service.** Detect Zoom, Google Meet, and Microsoft Teams URLs by matching known URL patterns (zoom.us/j/, meet.google.com/, teams.microsoft.com/l/meetup-join/) in the event description and location fields. Surface a 'Join' button only when a match is found. This is purely a string-match operation with no external call. This also sidesteps E2EE and calendar data-privacy concerns.

8. **Habit tracking (F09) and summary metrics (F13) are {APP_NAME}-native with no viable OSS equivalent to reference.** Habit streak logic (consecutive-day counting, reset-on-miss, timezone-boundary handling) must be implemented natively. Streak computation should happen server-side at the start of each local day (determined by the user's timezone setting), not on every widget render. The summary metrics row (F13) reads pre-aggregated counts from the server — do not compute totals by scanning full collections client-side. Add a metrics aggregation job or materialized view to the server layer.

9. **Shopping list widget (F12) requires a shared data store with conflict resolution for multi-device use.** The shopping list must be the same underlying record whether accessed from the dashboard widget, the Tasks section full view, or a mobile device at the store. Use optimistic local updates with server reconciliation. Item order is user-defined (drag-to-reorder) and must be stored explicitly (e.g., as a fractional index or linked-list order field) rather than inferred from insertion order. On conflict (two devices reorder simultaneously), last-write-wins per item is acceptable given the low stakes of the data.

10. **Per-widget configuration (F15) must be stored in the user's settings record, not in component state or localStorage.** Widget visibility, density, field toggles, and item counts must survive page reload, device switch, and app update. Store widget config as a JSON blob keyed by widget ID within the user's dashboard settings record. Apply config server-side where possible (e.g., filtering archived projects before sending to the client) to avoid sending unnecessary data to the browser.

11. **License warning: Homepage is Apache 2.0 — safe to reference and study, but attribution is not required for reference use.** No GPL or AGPL code is being pulled into {APP_NAME}. If any widget library is evaluated for embedding (e.g., a drag-and-drop primitive), verify its license before adding it as a dependency. Prefer MIT or Apache 2.0 dependencies. Avoid AGPL libraries in any module that runs server-side, as AGPL's network-use copyleft would require open-sourcing {APP_NAME}'s server code.

12. **Platform fragility warning for calendar and video-conference integrations.** Google Calendar, Outlook, and Zoom/Meet/Teams OAuth scopes and webhook APIs change without notice. The Join-button URL-pattern detection (note 7) is fragile if providers change their URL schemes. Wrap all provider-specific logic in versioned adapter classes and add integration smoke tests that run against live provider sandboxes on a schedule. Do not couple widget rendering to provider SDK versions — use the abstraction layer described in note 6.

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
