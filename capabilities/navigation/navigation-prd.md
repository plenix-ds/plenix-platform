# Navigation PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Navigation |
| **Capability ID** | navigation |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST provide a single-row topbar with icon-based capability navigation, centered search, capture access, and settings — with a context-aware left sidebar that updates per active section.

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

Source feature area(s): Navigation

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Single-row header bar** | ✅ Built / Required | The entire navigation system — logo, section icons, search, and actions — collapses into a single 52px horizontal bar. This was a deliberate design decision to maximize vertical space for content. The bar is split into three segments using CSS Grid (1fr auto 1fr) so the search input is always mathematically centered regardless of how wide the left or right segments grow. |
| F02 | **9 section icons with tooltips** | ✅ Built / Required | Home, Projects, Messages, Contacts, Calendar, Tasks, Notes, Bookmarks, and Files are each represented by an outline icon in the nav bar. Each icon shows a tooltip on hover. The active section is highlighted with the accent background color. Icons are rendered as inline SVG paths so they scale perfectly at any DPI without external font or image dependencies. |
| F03 | **3-segment header layout** | ✅ Built / Required | Segment 1 (left): Plenix logo followed by section icons and a settings icon separated by a vertical rule. Segment 2 (center): search bar, always centered. Segment 3 (right): Capture button and user avatar. This structure ensures the search bar never shifts when the left nav grows or shrinks. |
| F04 | **Header bar themes** | ✅ Built / Required | Three header styles are available and switchable in Settings → Appearance: Accent blue (Windows blue background, white icons — bold brand statement), White (clean minimal with shadow), and Frost (cool blue-gray gradient, slightly translucent). The active theme updates the bar background, icon colors, search input style, keyboard shortcut badge, and Capture button style all simultaneously. |
| F05 | **Sidebar collapse & drag-resize** | ✅ Built / Required | Every contextual sidebar (Projects, Contacts, Calendar, etc.) can be collapsed to a 32px rail by clicking the chevron button in its top-right corner. It can also be resized by dragging the right edge anywhere between 140px and 320px wide. Both interactions use native mouse events with no external library. The resize handle highlights in the accent color on hover. |
| F06 | **Section-specific sidebar content** | ✅ Built / Required | The left sidebar changes its content entirely based on which section is active. Projects shows a grouped project list. Calendar shows the calendars list and import option. Contacts shows groups. Tasks shows filters (All, Due soon, By Project). Notes shows folders. Files shows folders. Messaging shows channels and threads. Each sidebar is context-aware and shares the same collapse/resize infrastructure. |

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
