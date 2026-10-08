# Habits PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Habits |
| **Capability ID** | habits |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST enable users to define daily habits, log completion, and track streaks and analytics over time.

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

Source feature area(s): Habit Tracker

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Daily habit logging and streaks** | 🔵 Planned | The user defines habits with a name, icon, color, and target frequency (daily, specific days, or X times per week). Each habit has a daily check-in view with a checkbox. Completing increments the streak counter. Missing a day breaks the streak. Streaks shown prominently as motivation. The Habits widget on the dashboard allows one-tap daily logging. Historical data preserved from creation date. |
| F02 | **Habit analytics — completion rates and trends** | 🔵 Planned | Analytics view shows: completion rate per habit (percentage of days completed over a configurable period), streak history (longest, current, average streak), weekly and monthly heatmap colored by completion (similar to GitHub contribution graph), and comparison between habits to identify which are sticky vs being neglected. |

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

1. **Primary UX reference — Loop Habit Tracker (uhabits).** Study Loop Habit Tracker's open-source codebase for habit UI patterns: daily check-in grid, streak counter display, heatmap calendar, frequency configuration (daily / specific days / X times per week), and per-habit color/icon assignment. License: GPL v3. Classification: Reference only — no code embedded, no service dependency. Plenix builds all habit logic natively.

2. **Gamification reference — Habitica.** Study Habitica for motivational design patterns: streak rewards, visual progress indicators, and habit category organization. Habitica exposes a public API; do not integrate it as a live service — use it as a UX and product design reference only. License: GPL v3. Classification: Reference only.

3. **All habit data is owned by {APP_NAME} — no external service dependency.** Habit definitions, daily logs, streaks, and analytics are stored in {APP_NAME}'s own database. There is no third-party habit service at the data layer. This is a firm architectural decision: user habit data must never leave the platform without explicit user export action.

4. **Streak computation must be deterministic and timezone-aware.** Streak logic MUST anchor each "day" to the user's local timezone, not UTC. A check-in at 23:58 local time counts for that local calendar day. Timezone is stored on the user profile and applied server-side at log time. Edge cases to handle: DST transitions, timezone changes by the user, and retroactive log entries (if permitted).

5. **Heatmap rendering built natively — do not embed a charting library for this.** The contribution-graph-style heatmap (as described in F02) is a core UI component that must match {APP_NAME}'s Win11-gray design system exactly. Build it as a purpose-built canvas or SVG component rather than wrapping a general-purpose chart library, which would add bundle weight and create a styling seam. The GitHub contribution graph (public domain concept) and Loop Habit Tracker's heatmap are the visual references.

6. **Completion rate and analytics computed server-side, not client-side.** Percentage completion, streak history, longest/current/average streak, and weekly/monthly aggregates are calculated in a server module and returned as pre-aggregated payloads to the client. This keeps the client thin, ensures consistency across platforms (mobile, desktop, web), and makes the data available to the dashboard widget without re-running calculations.

7. **Dashboard widget requires a one-tap logging path.** The Habits widget (F01) must allow daily log submission without navigating to the full Habits view. The widget communicates with the same habit-logging endpoint as the full view. Optimistic UI update is required: mark the habit complete immediately on tap, then confirm or roll back on server response. Do not block the tap on a network round-trip.

8. **License warning — GPL v3 contamination risk.** Both Loop Habit Tracker and Habitica are GPL v3. Any code copied or derived from either project would require {APP_NAME} to be released under GPL v3. The classification "Reference only" is mandatory — no source files, algorithms, or non-trivial code structures from these projects may be incorporated. Treat them as UX case studies, not code libraries.

9. **No E2EE constraint on habit data at launch — document the decision.** Habit logs and streaks are stored in plaintext in the {APP_NAME} database (encrypted at rest by the hosting provider). End-to-end encryption for habit data is deferred. If {APP_NAME} later adopts a client-side encryption model for notes or other personal data, habit data should be migrated to the same model for consistency. Record this as an open architectural debt item.

10. **Frequency model must support future recurrence types without a migration.** Store habit frequency as a structured object (e.g. `{ type: "weekly_days", days: [1,3,5] }` or `{ type: "x_per_week", count: 3 }`) rather than a flat enum. This allows new frequency types (e.g. monthly, custom intervals) to be added without a schema migration or breaking existing habit records.

11. **Mobile platform fragility — notification reliability varies by OS.** Daily habit reminder notifications depend on OS-level scheduling (iOS BGAppRefreshTask / UNUserNotificationCenter, Android AlarmManager or WorkManager). Both platforms restrict background execution and can silently drop scheduled notifications under battery-saving modes. Document this as a known platform limitation; do not promise guaranteed delivery in user-facing copy. Test notification delivery explicitly on each OS version in QA.

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
