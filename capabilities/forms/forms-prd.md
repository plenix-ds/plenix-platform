# Forms PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Forms |
| **Capability ID** | forms |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST create data-collection forms that can be sent to contacts or embedded in portals.

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

1. **Primary OSS reference — Formbricks (AGPL, self-hosted service).** Run Formbricks as a self-hosted service on Plenix infrastructure rather than embedding it. AGPL requires that any modifications to Formbricks source be published; isolating it as a networked service avoids copyleft propagation into the core {APP_NAME} codebase.

2. **Secondary reference — HeyForm (AGPL, reference only).** Study HeyForm's conversational, one-question-at-a-time UX pattern and its conditional-logic data model as a design reference. Do not embed or fork; use only as architectural inspiration given the AGPL license risk.

3. **Tertiary reference — OhMyForm (AGPL, reference only).** Consult OhMyForm for lightweight field-type definitions and its Google Forms-style response grid. Reference only; same AGPL boundary rule applies.

4. **Architectural decision — API-gateway pattern.** {APP_NAME} communicates with the Formbricks service exclusively through its REST/webhook API. The {APP_NAME} server owns form metadata (title, linked record, portal assignment) while Formbricks owns submission storage and analytics. This boundary keeps AGPL code entirely within the Formbricks service boundary.

5. **What {APP_NAME} builds natively.** Form-record linkage (attaching a form to a contact, project, or portal entity), trigger rules (send on event X), response routing (write parsed answers back to the linked record's fields), and the form-picker UI inside the {APP_NAME} composer. These are built in the core codebase under a permissive or commercial license without touching Formbricks internals.

6. **What {APP_NAME} defers to Formbricks.** The visual form builder, conditional-logic engine, multi-language support, response analytics dashboard, partial-response capture, and in-product survey embedding. These run inside the Formbricks service and are accessed via iframe embed or redirect URL in portals and emails.

7. **Integration pattern — webhook-to-record write.** On submission, Formbricks posts a webhook to a {APP_NAME} endpoint. The endpoint maps each answer field (by Formbricks field ID, stored in the form metadata) to the corresponding {APP_NAME} record field and executes an upsert. Field-ID mapping is configured at form-creation time and stored in {APP_NAME}'s own database, not in Formbricks.

8. **E2EE warning.** Formbricks stores responses on its own database. If a form collects sensitive data (health, legal, financial), responses transit and rest inside the Formbricks service container. Ensure the self-hosted deployment uses encrypted volumes and TLS termination. {APP_NAME} must not expose raw Formbricks API keys to the client; all Formbricks API calls must be proxied through the {APP_NAME} server.

9. **Platform-fragility warning — Formbricks API versioning.** Formbricks is under active development; REST API endpoints change between minor releases. Pin the Formbricks container image to a specific release tag in the infrastructure manifest and treat upgrades as a migration event that requires endpoint re-validation.

10. **License compliance checkpoint.** Before any Plenix engineer modifies Formbricks source (even for a hotfix), legal must confirm the AGPL disclosure obligation. The default policy is zero modifications to Formbricks source; all customization goes through configuration, environment variables, or the public API.

11. **In-product survey opportunity.** Formbricks natively supports in-product surveys triggered by user events. Plenix can use this capability to collect user feedback from within {APP_NAME} itself (satisfaction surveys, NPS, feature feedback) by embedding the Formbricks JS SDK in the {APP_NAME} web client — subject to the same self-hosted boundary and the AGPL isolation rule above.

12. **Fallback / degraded-mode behavior.** If the Formbricks service is unreachable, {APP_NAME} must surface a clear error at the form-send step rather than silently dropping the request. Form send should be a synchronous, user-visible action; async fire-and-forget is not acceptable. Queue retries server-side with a bounded TTL and notify the owner if delivery fails permanently.

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
