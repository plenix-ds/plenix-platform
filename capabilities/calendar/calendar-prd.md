# Calendar PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Calendar |
| **Capability ID** | calendar |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST enable users to view, create, and manage events and appointments across all contexts.

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

Source feature area(s): Calendar

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Month view** | ✅ Built / Required | A standard 7-column grid showing all days in the current month. Each cell has a minimum height of 78px and can grow to fit multiple events. Today has a distinct background. The selected day gets a blue border and selection background. Events are rendered as colored pills with a left border in the event's calendar color. Cells showing more than 2 events show a '+N more' label. |
| F02 | **Week view** | ✅ Built / Required | A 7-column time grid running from 8 AM to 6 PM in 60px-high hour rows. Events are plotted into the correct hour slot. Today's column gets a subtle blue tint. Clicking any day number in the column header navigates directly to the Day view for that date. |
| F03 | **Day view** | ✅ Built / Required | A single-day timeline with a large date number and day name at the top. Each hour from 8 AM to 6 PM is a 70px row. Events render as full-width blocks with title, time, and calendar name. All-day events are listed separately. The Today button jumps to this view for today. |
| F04 | **Event creation — start/end time, all-day, recurrence, color, project link** | 🔵 Planned | Events are created from any calendar view by clicking a time slot (Day/Week view) or a date cell (Month view). The event creation panel collects: Title, Start time and End time (or All-day toggle — all-day events display at the top of the day rather than in the time grid), Recurrence pattern (Daily / Weekly / Monthly / Yearly — with optional end date or occurrence count), Color (individual color override, or inherits the project color if linked to a project), Project association (links the event to a project so it appears in that project's timeline and is color-matched), Description/notes, and Location or video conference link (auto-detected if a meet/zoom/teams URL is pasted). Created events are stored in Plenix's local event store and optionally pushed to a connected calendar provider if two-way sync is enabled in future. |
| F05 | **Recurring events — defined recurrence patterns** | 🔵 Planned | Events can repeat on a defined schedule: Daily (every day, or every N days), Weekly (on selected days of the week — e.g. every Monday and Wednesday), Monthly (on a specific date — e.g. the 15th of every month, or on a weekday — e.g. the first Monday of every month), and Yearly (e.g. an annual review every January 1st). Each recurrence rule follows the iCalendar RRULE standard, ensuring compatibility with exported ICS files and external calendar apps. Editing a recurring event offers three options: edit this occurrence only, edit this and all future occurrences, or edit all occurrences. Deleting follows the same three-option pattern. |
| F06 | **All-day events — separate display above time grid** | 🔵 Planned | Events marked as all-day are displayed in a dedicated all-day row at the top of the Day and Week views, above the timed hour slots. This ensures they are always visible without taking up space in the timeline grid. Multiple all-day events on the same day are stacked vertically in the all-day row. In Month view, all-day events appear as full-width pills spanning the relevant days. Tasks flagged as due on a specific date (without a time) are also shown in the all-day row as task markers, distinguishable from events by a different visual treatment. |
| F07 | **Event color customization and project color inheritance** | 🔵 Planned | Each event can be assigned an individual color from a palette. If an event is linked to a project, it can inherit the project's color automatically — making all project-related events immediately identifiable on the calendar without manual coloring. The color inheritance rule: if an event has an individually set color, that takes priority; if no color is set and the event is project-linked, the project color is used; if neither, the event uses the source calendar's color. Color is shown on the event pill in Month view, on the event block in Week/Day view, and on the event dot in the sidebar upcoming list. |
| F08 | **Task integration — due dates on the calendar timeline** | 🔵 Planned | Tasks with assigned due dates appear directly on the Calendar timeline alongside scheduled events, providing a unified planning view. Date-only tasks appear as markers in the all-day row. Tasks with a specific time appear as schedulable blocks in the time grid. A visual distinction separates tasks from events: tasks have a checkbox overlay on the calendar block, and checking it completes the task without opening the task detail. This integration means the Calendar is a complete picture of the day — not just meetings but all commitments. Tasks completed from the calendar are reflected immediately in the Tasks section. |
| F09 | **Today and Tomorrow views — hour-by-hour daily planning** | 🔵 Planned | The calendar defaults to a Today view — a vertical hour-by-hour timeline of the current day showing calendar events and any time blocks the user has placed. On desktop when the panel is expanded, a Tomorrow view appears alongside Today, enabling the user to plan the next day while reviewing the current one. This side-by-side layout is designed for the end-of-day planning routine: reviewing what was accomplished today and intentionally scheduling tomorrow before closing out. Mobile shows Today only. Both views show the same event and block data — the difference is purely temporal. |
| F10 | **Calendar integrations — supported providers** | 🔵 Planned | Use case: The user's events already live in Google Calendar, Outlook, or iCloud. Plenix displays these events alongside tasks and time blocks without requiring the user to re-enter anything. Supported providers and protocols: Google Calendar (OAuth, real-time sync on desktop), Outlook/Microsoft 365 (OAuth, real-time sync on desktop), iCloud (CalDAV), Proton Calendar (CalDAV or via system calendar workaround — see note), FastMail (CalDAV), Hey (CalDAV), Facebook Events (iCal feed), and any iCal/ICS feed URL (manual subscription). All providers also support CalDAV as a universal fallback. Sync is one-way only (external calendar → Plenix) — Plenix reads events but does not write back to the provider. Two-way sync is planned but not in the current scope. |
| F11 | **Sync behavior — frequency and platform differences** | 🔵 Planned | Sync frequency varies by provider and platform. On desktop: Google and Outlook sync in real time via their respective push/subscription APIs, so new events appear in Plenix within seconds of being created. All other providers (iCloud, CalDAV sources, ICS feeds) sync every 5 minutes on a background poll. On mobile: all providers sync automatically every 2 minutes via the native calendar API (iOS EventKit / Android Calendar Provider), which reads from the device's system calendar. A manual sync is always available (pull-to-refresh gesture or a refresh button in the calendar toolbar). The mobile approach mirrors events from the device's system calendar rather than connecting to each provider's API individually — this means any calendar the user has synced to their device (including Proton, FastMail, etc.) is automatically visible in Plenix on mobile without additional configuration. |
| F12 | **Mobile calendar — native API integration** | 🔵 Planned | On mobile devices, Plenix reads calendar data through the native system calendar API rather than connecting to each cloud provider directly. On iOS this uses EventKit, which reads from the iOS Calendar app. On Android this uses the Android Calendar Provider, which reads from the device's calendar database. The practical effect is that any calendar the user has already configured on their phone — Google, Outlook, iCloud, Exchange, or any CalDAV source — appears in Plenix automatically once calendar permission is granted. No per-provider OAuth is required on mobile. The user grants Plenix calendar read access once and all synced calendars become available immediately. |
| F13 | **Proton Calendar on Android — workaround** | 🔵 Planned | Proton Calendar on Android does not expose events through the Android system calendar interface by default, which means Plenix's native API approach does not read Proton events on Android. The recommended workaround is to use a compatible CalDAV client app (such as DAVx⁵) that connects to Proton Calendar via CalDAV and syncs events into the Android system calendar. Once events are in the system calendar, Plenix reads them normally. This workaround is documented in Plenix's help content for users who need Proton Calendar support on Android. iOS users with Proton Calendar can use the Proton Mail app's calendar export or connect via CalDAV directly in iOS Settings. |
| F14 | **Tag filters — event type pills** | ✅ Built / Required | A row of pill buttons sits between the toolbar and the calendar grid. Each pill represents a unique event type derived from event titles. Clicking a pill filters the entire calendar to only show matching events. The active pill takes on the event's color. Clicking All or re-clicking the active pill clears the filter. Filters combine with calendar toggles in the sidebar. |
| F15 | **Calendar sidebar — My Calendars, All Calendars, Import** | ✅ Built / Required | The left sidebar lists all calendars with a colored square indicator per calendar. 'All Calendars' at the top selects all. Clicking a calendar highlights it and filters the grid. Import Calendar at the bottom (separated by a divider) will open a file picker for .ics import. Upcoming events are listed below. |
| F16 | **Video conference detection — one-click join** | 🔵 Planned | Use case: When a meeting has a Zoom, Google Meet, or Teams link in its description or location field, the user should be able to join directly from the calendar event without hunting for the link. Plenix automatically scans event descriptions and location fields for video conference URLs and displays a Join button on the event when one is detected. Supported platforms: Zoom (zoom.us links), Google Meet (meet.google.com links), Microsoft Teams (teams.microsoft.com links), and BBB (BigBlueButton — specifically noted for the Technical University of Munich instance at bbb.rbg.tum.de). The Join button opens the meeting link in a new tab or in the platform's native app if installed. No manual configuration is required — detection is automatic on every event that has a recognized link pattern. |
| F17 | **Event-linked notes** | 🔵 Planned | Use case: The user has a meeting on their calendar and wants to create a note for it — meeting agenda, prep notes, or post-meeting action items — linked directly to the event so it is always findable from the calendar. From any event in Day or Week view, a 'Create note' action opens a note creation panel. A default note name is generated from the event title and date (e.g. 'Contractor call — March 5, 2026'). The user can optionally select a notebook/folder and apply a note template (e.g. 'Meeting notes' template with sections for Attendees, Agenda, Decisions, Action items). Once created, the note is linked to the event — a note icon appears on the event in the calendar view, and clicking it opens the note directly. The event title and date are also stored in the note's metadata for reverse lookup. Currently desktop only; mobile support planned. |
| F18 | **Keyboard shortcut — toggle calendar panel** | 🔵 Planned | The calendar panel (or day planning sidebar on desktop) can be toggled open and closed via a keyboard shortcut: Cmd+S on Mac, Ctrl+S on other platforms. This lets the user quickly check their schedule without navigating away from whatever they are working on. The shortcut is documented in the keyboard shortcuts reference panel in Settings. |
| F19 | **Visual day timeline — duration-proportional blocks** | 🔵 Planned | Use case: A standard task list shows items as equal-height rows regardless of how long each one takes. A 10-minute call looks the same as a 4-hour deep-work session. The visual timeline makes time honest — each task and event is rendered as a colored block whose height is proportional to its duration. A 30-minute task takes up half the vertical space of a 1-hour task. Back-to-back commitments show immediately as crowded. Empty space shows clearly as available time. The user can see at a glance whether their day is realistic before it starts. Calendar events from connected providers appear automatically as blocks alongside manually placed tasks, creating a unified visual picture of the whole day. This is the defining planning insight that list-based views cannot provide. |
| F20 | **Drag-and-drop timeline editing** | 🔵 Planned | Tasks and time blocks on the timeline are draggable. Dragging a block vertically moves it to a different time slot. Dragging the bottom edge resizes it (changes the duration). Dragging a task from the Capture inbox onto the timeline assigns it a time and adds it to the day plan. Blocks snap to 15-minute increments by default (configurable: 5, 10, 15, or 30 minutes). Dragging a block over an existing block highlights the conflict. Completed tasks cannot be dragged — they are locked in place as a record of what was done. On mobile, long-press activates drag mode on a block. |
| F21 | **Replan — AI reschedules missed or overrun tasks** | 🔵 Planned | Use case: It is 2 PM and three morning tasks were not completed because a meeting ran long. The user needs to redistribute the unfinished work into the remaining day without manually dragging each block. The Replan function looks at all incomplete tasks from the current day, the remaining available time (free gaps between now and end of day), and each task's estimated duration, then proposes a revised schedule. The user sees the proposed rearrangement as a before/after timeline and can accept, modify, or reject it. Replan also works cross-day — if there is no room today, it can push tasks to tomorrow or the next available day. The AI accounts for task priority (higher-priority tasks get earlier slots) and recurring commitments (does not schedule over a daily recurring task). |
| F22 | **AI day planning — draft a full schedule from natural language** | 🔵 Planned | Use case: The user wants to plan their day but does not want to manually place every block. AI day planning generates a full schedule from a brief description: 'I have a supplier call at 10, need to work on the project proposal, exercise, and finish the tax documents — I want to be done by 6 PM.' The AI reads connected calendar events (fills in the supplier call automatically), estimates durations for each task (pulling from the task's time-estimate field if set, or using AI estimation), and produces a proposed timeline. The user reviews the proposal on the visual timeline and can drag blocks to adjust. Multiple images can be attached to the AI prompt (e.g. a photo of a handwritten to-do list, a screenshot of a meeting agenda) and the AI incorporates that information into the schedule. |
| F23 | **Recurring tasks and routines — daily structure that persists** | 🔵 Planned | Use case: The user has a morning routine (8:00 Rise, 8:15 Exercise, 9:00 Review priorities) and recurring work rituals (Daily standup at 9:30, Weekly review every Friday at 4 PM, Monthly supplier check-in first Monday of the month). These should appear on the timeline automatically without re-creating them every day. Recurring tasks are created with a repeat schedule: daily, weekly on specific days, every N days, monthly on a date, monthly on a weekday (e.g. first Monday), yearly. Each occurrence is an independent instance — completing today's does not affect tomorrow's. Skipping one occurrence is possible without breaking the series. The routine framing (Rise and Shine / Wind Down anchor tasks) bookends the day so the timeline always has a clear start and end point. |
| F24 | **Energy monitor — plan around personal energy levels** | 🔵 Planned | Use case: Cognitive demanding tasks (writing, analysis, complex decisions) are best done when the user's energy is highest, while low-effort tasks (admin, email) can fill low-energy periods. The Energy Monitor lets the user define their typical daily energy curve — a simple high/medium/low profile across the hours of the day (e.g. High: 9–12, Medium: 2–4, Low: 12–2 and after 5). This profile is shown as a subtle color gradient on the timeline background. When AI day planning is used, it schedules high-priority, cognitively demanding tasks during high-energy periods automatically. The user can update their energy profile anytime. A daily energy log lets the user rate their actual energy at the end of each day, over time building a personalized baseline that improves AI scheduling accuracy. |
| F25 | **Color coding and icons — visual task categorization** | 🔵 Planned | Every task and time block on the timeline has a color and an icon. Color is used for categorization: the user assigns colors to categories (Work = blue, Personal = green, Health = orange, Finance = red) and each task inherits its category's color, making the timeline scannable at a glance. Icons are chosen per task from a library (hundreds of icons covering activities, objects, emotions, work types) — a task titled 'Gym' gets a dumbbell icon, 'Call Marcus' gets a phone icon, 'Write proposal' gets a document icon. Color and icon are independent — two tasks can share a color but have different icons. The visual density of the timeline (how much is packed in) and the color distribution (how much work vs personal) give the user an immediate read of their day's character before it starts. |
| F26 | **Pomodoro focus timer — built into timeline tasks** | 🔵 Planned | Any task on the timeline can be started in Pomodoro mode. Tapping 'Start focus' on a task launches a countdown timer (default 25 minutes work / 5 minute break, configurable) visible as a Live Activity on mobile and a menu bar indicator on desktop. When the work interval ends, a gentle sound plays and the break timer starts automatically. After 4 Pomodoros, a longer break (15–30 minutes) is suggested. The completed Pomodoro count is shown on the task and in the day summary. The timer is non-intrusive — it runs in the background and does not block the rest of the app. This integrates with the time-estimate field: if a task is estimated at 2 hours, the system suggests 4 Pomodoros and tracks progress toward the estimate. |

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

1. **Taxonomy is non-negotiable — five distinct calendar types, not one.** Core Calendar (meetings/appointments), Project Calendar/Roadmap (milestones), Content Calendar (publishing schedule), Campaign Calendar (campaign phases), and Client Scheduling (booking links) are owned by five separate modules. No module reaches into another module's event store. The Unified Calendar View is a read-only display layer that renders objects from all five modules onto one timeline; it owns no data of its own.

2. **Core Calendar protocol layer — study and self-host Radicale (GPL v3).** Radicale is the CalDAV/CardDAV server. Self-host it as an internal service; do not embed it in the {APP_NAME} process. It handles CalDAV event storage, CardDAV contact storage, iCal/ICS import-export, and RRULE recurrence. Because it is GPL v3, {APP_NAME} need not ship its source — it is a network service, not a linked library. License classification: **self-hosted service**.

3. **Core Calendar UI patterns — reference Nextcloud Calendar (AGPL).** Study Nextcloud Calendar for month/week/day view implementation, event pill rendering, all-day row behavior, conflict detection, and timezone handling. Do not embed or fork it; use it as a reference implementation only. License classification: **reference only**. AGPL applies if code is distributed or served; studying and reimplementing patterns in {APP_NAME}'s own codebase is acceptable.

4. **Contacts protocol layer — Radicale CardDAV (same server instance).** Contacts use CardDAV, served by the same Radicale instance as calendar events. Study Nextcloud Contacts (AGPL, reference only) for vCard field mapping, group handling, avatar storage, and sharing patterns. Do not embed Nextcloud Contacts. License classification: **reference only**.

5. **Client Scheduling — self-host Cal.com (AGPL) as an isolated service.** Cal.com is the booking-link engine for the Client module only. It handles availability windows, buffer times, booking confirmation emails, and video-call link injection. It is strictly scoped to Client → Scheduling. Do not use Cal.com to store or display core meeting events; booked appointments are surfaced in Core Calendar via a read event pushed from Cal.com to Radicale after booking confirmation. License classification: **self-hosted service**. AGPL requires that source modifications be made available if the service is offered to end users — plan accordingly.

6. **Project Calendar / Roadmap / Milestones — self-host OpenProject (GPL v3).** OpenProject provides milestone tracking, Gantt/roadmap views, and work-package scheduling. The Project Calendar module in {APP_NAME} either embeds OpenProject views via iframe or replicates relevant data through its API. Milestones and roadmap items are fed into the Unified Calendar View as a distinct object type. License classification: **self-hosted service**. No source-disclosure obligation when run as a private internal service (GPL v3 network use clause).

7. **Unified Calendar View architecture — display layer with typed object rendering.** The view layer queries each module's read API for objects in the current time window: Core Calendar events (from Radicale via CalDAV), project milestones (from OpenProject), content posts (from the Content Calendar module — Mixpost/Postiz), campaign phases (from the Campaigns module — Mautic), and booked appointments (from Cal.com). Each object type is rendered with a distinct visual treatment (pill shape, icon, color prefix) so the user can distinguish meeting from milestone from post at a glance. The view layer applies no business logic and writes no data.

8. **CalDAV/iCal as the canonical interchange format.** All core calendar data — events, recurrence rules, attendees, timezone info — is stored and transported as iCalendar (RFC 5545). RRULE is the only recurrence representation; never invent a custom recurrence schema. ICS import and export must round-trip cleanly through Radicale. This ensures interoperability with Google Calendar, Outlook, iCloud, Proton Calendar, FastMail, and any future provider.

9. **Integration pattern for external calendar providers.** External providers (Google Calendar, Outlook/M365, iCloud, FastMail, Proton via DAVx5) sync into Radicale as additional calendar collections. On desktop, Google and Outlook use OAuth + push/subscription for near-real-time sync. All CalDAV sources (iCloud, FastMail, any ICS feed) poll every 5 minutes. On mobile, iOS EventKit and the Android Calendar Provider are the integration point — {APP_NAME} reads from the system calendar database, not from each provider's API directly. No per-provider OAuth is needed on mobile.

10. **Warnings — license obligations.** Cal.com (AGPL) and Nextcloud Calendar/Contacts (AGPL): if {APP_NAME} modifies and serves these to users, the modified source must be made publicly available. Radicale and OpenProject are GPL v3: running them as internal network services does not trigger source-disclosure obligations, but distributing binaries does. Review each dependency before shipping a packaged or cloud-hosted version of {APP_NAME}.

11. **Warnings — platform fragility.** Google Calendar and Outlook push APIs are subject to quota limits and OAuth policy changes. Proton Calendar on Android deliberately does not expose events through the Android Calendar Provider — the DAVx5 workaround is user-managed, not something {APP_NAME} can automate. Apple EventKit on iOS imposes strict background-refresh throttling; do not assume real-time sync on mobile. iCloud CalDAV app-specific passwords are required for non-Apple OAuth flows.

12. **What {APP_NAME} builds natively vs defers to a service.** Natively built: Unified Calendar View display layer, typed object rendering pipeline, AI day-planning and Replan logic, Pomodoro timer, energy-monitor profile, drag-and-drop timeline editing, task-to-calendar integration, video-conference link detection, event-linked notes, keyboard shortcuts, and all mobile UI. Deferred to self-hosted services: CalDAV/CardDAV storage (Radicale), booking-link engine (Cal.com), project milestones/roadmap (OpenProject). Referenced but not embedded: Nextcloud Calendar and Nextcloud Contacts (UI patterns only).

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
