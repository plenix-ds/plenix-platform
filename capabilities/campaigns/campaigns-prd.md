# Campaigns PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Campaigns |
| **Capability ID** | campaigns |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST plan, execute, and track marketing or outreach campaigns.

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

1. **Primary OSS reference — Mautic (MIT, self-hosted).** Mautic is the core engine to study and embed for campaign automation: email campaigns, audience segments, lead scoring, drip sequences, and multi-channel dispatch (email + SMS + social). License is MIT; Plenix runs it on its own infrastructure with no copyleft obligation to users. Study its segment builder, campaign canvas (directed graph of steps + conditions), and contact lifecycle model as the authoritative reference for Plenix's own campaign data model.

2. **Communication channel layer — Chatwoot (MIT, self-hosted).** Chatwoot is already locked for the Communication Channels capability and provides the omnichannel conversation layer (email inboxes, WhatsApp, SMS, live chat). Campaigns that send outbound messages MUST dispatch through Chatwoot's contact and inbox abstractions rather than building a parallel send path, to keep conversation history unified and avoid duplicate contact records.

3. **Reference pattern — Listmonk (AGPL-3.0, reference only, do not embed).** Listmonk is a high-performance single-binary email campaign tool written in Go. Its license (AGPL-3.0) means any distribution or SaaS use requires open-sourcing the combined work; do not embed or link it. Use it as a read-only architectural reference for: subscriber list management, template rendering pipelines, bounce/unsubscribe handling, and high-throughput queue design. Plenix builds these natively informed by Listmonk's patterns.

4. **Campaign canvas architecture.** Model campaigns as a directed acyclic graph (DAG) of nodes — triggers, conditions, wait steps, and actions (send email, add tag, update field, notify agent). This mirrors Mautic's campaign builder. Plenix builds this canvas natively in the UI; Mautic's graph schema and execution engine are the reference for how to evaluate the graph at runtime.

5. **Audience segment integration.** Segments defined in the Contacts/CRM capability are the audience source for campaigns. The Campaigns module MUST read segments via a shared query interface — it must not maintain its own copy of contact records. Dynamic segments (re-evaluated at send time) and static lists (snapshot at campaign creation) are both required patterns; study Mautic's segment types for the rule-based dynamic model.

6. **Social publishing integration.** The campaigns calendar uses Mautic for email/SMS/multi-channel automation and Mixpost or Postiz for social publishing dispatch. Social posts scheduled via a campaign node MUST be written as jobs to whichever social publishing adapter is active; the Campaigns module must not call social platform APIs directly. Define an abstract `SocialPublishJob` interface so the social publishing backend can be swapped without touching campaign logic.

7. **Email deliverability — defer sending infrastructure to a transactional service.** Plenix does not run its own SMTP relay for campaign volume. Email dispatch MUST route through a configurable transactional provider (AWS SES, Postmark, Mailgun, or Resend). Store provider credentials per workspace. Study Mautic's mailer transport abstraction as the pattern for keeping campaign logic decoupled from the sending provider.

8. **Unsubscribe and compliance handling (MUST).** Every outbound campaign email MUST include a one-click unsubscribe link (RFC 8058 `List-Unsubscribe-Post`) and honor suppression lists. Unsubscribe events from the sending provider's webhook MUST immediately suppress the contact in the shared contact store — not only in the campaign module. Non-compliance with CAN-SPAM / GDPR unsubscribe requirements is a legal risk; treat this as a hard requirement, not a nice-to-have.

9. **E2EE warning.** Campaign messages are by definition bulk-dispatched plaintext or HTML content; end-to-end encryption is not applicable to email campaigns. If Plenix ever offers encrypted messaging (e.g. Signal-protocol DMs), campaigns MUST be kept architecturally separate — do not route campaign sends through any E2EE channel.

10. **Platform fragility warning — social channel APIs.** Social dispatch nodes (LinkedIn, Instagram, X/Twitter) depend on third-party APIs that change rate limits, revoke access, or deprecate endpoints with short notice. Implement social dispatch as a thin adapter layer with per-platform feature flags, and surface API errors in the campaign run log as actionable user-facing failures rather than silent drops.

11. **What Plenix builds natively.** Campaign canvas UI (DAG editor), campaign scheduling and calendar view, segment-to-audience resolution, campaign run log and delivery metrics dashboard, unsubscribe/suppression list management, and the `SocialPublishJob` dispatch interface. These are core product surfaces and must not be outsourced to an embedded third-party UI.

12. **What Plenix defers to services.** Bulk email sending infrastructure (transactional provider), SMS routing (Twilio or equivalent, via Chatwoot or direct adapter), social API calls (via Mixpost/Postiz adapter), and bounce/complaint webhook processing (provider-side webhooks feeding into Plenix's suppression store). Keep these as swappable adapters behind well-defined interfaces so providers can be changed per workspace or per deployment.

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
