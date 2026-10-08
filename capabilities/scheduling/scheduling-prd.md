# Scheduling PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Scheduling |
| **Capability ID** | scheduling |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST manage client-facing meeting booking, appointment scheduling, and calendar availability.

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

1. **Primary OSS tool — Cal.com (AGPL, self-hosted service):** Run Cal.com as a self-hosted service on Plenix infrastructure. Do not embed its source into the Plenix monorepo. Treat it as a sidecar service accessed over its REST/webhook API. Study its booking-link model, routing forms, round-robin assignment logic, and workflow automation (email/SMS reminders) as the reference implementation for all client-facing scheduling requirements.

2. **License classification — Cal.com is AGPL:** AGPL requires that any modifications to Cal.com's own source be published if the service is exposed over a network. Plenix must not fork and privately patch Cal.com unless it is willing to open-source those changes. Configuration, theming, and integration via its public API are safe. Document this constraint explicitly in the infrastructure runbook.

3. **Architectural separation — Client Scheduling is NOT Core Calendar:** Cal.com owns client-facing booking. Core Calendar (availability display, personal event storage, team free/busy) is handled by Radicale via CalDAV. These two systems must never be merged into a single data store. Cal.com reads availability from Core Calendar via a CalDAV or iCal feed; it does not write back to it except through explicit confirmation events.

4. **Availability sync pattern:** Cal.com must consume a read-only iCal/CalDAV busy feed from Radicale to block off times that are already occupied. Plenix builds a thin adapter service that translates Radicale's CalDAV feed into the format Cal.com's "connected calendar" integration expects. This adapter is the only point where Core Calendar and Client Scheduling touch.

5. **Video call link generation — defer to Cal.com integrations:** Cal.com natively generates Zoom, Google Meet, and Microsoft Teams links per booking via its integration layer. Plenix does not build its own video-link provisioning. Configure the appropriate integration on the Cal.com instance; expose the resulting link to the user inside the Plenix UI by reading it from Cal.com's booking payload via webhook.

6. **Webhook-driven event propagation:** Cal.com emits webhooks on booking.created, booking.rescheduled, and booking.canceled. Plenix must register a webhook receiver that processes these events and updates the user's relevant data stores (task list, contact timeline, notification queue). Do not poll the Cal.com API for booking state; rely exclusively on webhooks for real-time consistency.

7. **Embedding and white-labeling:** Cal.com's embed SDK (JavaScript snippet or iframe) can be used to surface booking flows inside the Plenix UI without sending the user to a separate domain. Evaluate the embed approach against platform E2EE requirements — the iframe communicates with the Cal.com origin, so any data entered in the embed is subject to Cal.com's session handling, not Plenix's.

8. **E2EE warning:** Cal.com stores booking data (attendee name, email, notes, answers to routing-form questions) in its own database. This data is NOT end-to-end encrypted by default. If Plenix makes E2EE guarantees to users, those guarantees do not extend to data held by the Cal.com instance. The self-hosted deployment mitigates third-party exposure but does not provide E2EE at rest without additional database-level encryption configured separately.

9. **Platform fragility — Cal.com API surface:** Cal.com's API and webhook schema have changed across major versions. Pin the Cal.com instance to a specific release in the infrastructure manifest and gate upgrades behind a compatibility test against Plenix's webhook receiver and embed integration. Do not auto-update the Cal.com instance.

10. **What Plenix builds natively vs. defers:** Plenix builds natively — the availability adapter (CalDAV-to-Cal.com feed), the webhook receiver and event router, the in-app booking entry point (button/embed trigger), and the booking confirmation display in the contact/task UI. Plenix defers to Cal.com — booking-link generation, round-robin and collective event types, routing form logic, reminder/workflow automation, and video conferencing link provisioning.

11. **Routing forms and intake data:** Cal.com's routing forms can collect pre-meeting intake information (project type, budget range, preferred contact method). Treat routing-form responses as structured contact data. The webhook receiver must parse and store them in the Plenix contact record, not only in Cal.com's own database, so the information is accessible in context during the meeting.

12. **70+ integrations scope warning:** Cal.com ships with integrations for payment processors, CRMs, video platforms, and more. Only enable integrations that have been reviewed by the Plenix security and compliance process. Disable all unused integrations in the Cal.com admin panel at deployment time to reduce attack surface and avoid unintended data egress.

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
