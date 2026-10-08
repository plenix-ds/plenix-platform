# Analytics PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Analytics |
| **Capability ID** | analytics |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST track and visualize performance metrics across marketing channels and campaigns.

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

1. **Study PostHog (AGPL, self-hosted) for all in-app product analytics.** PostHog covers session replay, funnel analysis, feature flags, A/B testing, surveys, and LLM observability. It is the primary reference and deployment target for understanding user behavior inside {APP_NAME}. Do not embed PostHog source; run it as a self-hosted service on Plenix infrastructure.

2. **Study Umami (MIT, self-hosted or embedded) for website and marketing analytics.** Umami is cookie-free, privacy-first, and lightweight. Because it is MIT-licensed, it can be embedded directly into the {APP_NAME} codebase or run as a self-hosted service — either path is legally clean. Use Umami for external traffic (the marketing site, landing pages, sign-up funnel before the user is authenticated).

3. **Reference Plausible (AGPL) for privacy design patterns only — do not self-host or embed.** Plausible's AGPL license means any network-exposed modification must be open-sourced. Treat it as a conceptual reference for privacy-first metric selection and data minimization, not a deployment candidate.

4. **License boundary: AGPL services must remain network-isolated from the {APP_NAME} codebase.** PostHog is AGPL. As long as {APP_NAME} communicates with PostHog over its SDK/API (client-to-service), the AGPL does not propagate to {APP_NAME}'s proprietary code. Never statically link or bundle PostHog source into the {APP_NAME} build artifacts.

5. **Keep all analytics data on Plenix-controlled infrastructure.** Neither PostHog nor Umami should route data to PostHog Cloud or Umami Cloud. Deploy both on Plenix servers (or a Plenix-controlled cloud tenant) so that no user behavioral or traffic data leaves Plenix's custody. This is a hard privacy commitment, not a preference.

6. **Split the data plane by surface.** PostHog handles in-app events (authenticated sessions, feature interactions, task completions, AI-assist usage). Umami handles pre-auth surfaces (marketing site, docs, public pages). Never cross-instrument: do not fire PostHog events from the marketing site or Umami events from inside the authenticated app.

7. **Key architectural decision — event schema ownership.** {APP_NAME} must own and version its event taxonomy centrally (event names, property keys, enum values). Do not let PostHog's autocapture define the schema; disable autocapture and instrument explicitly. This prevents schema drift and makes the event log meaningful across product iterations.

8. **E2EE warning — do not log encrypted content as event properties.** If {APP_NAME} implements end-to-end encryption for any user data, analytics event properties must never include plaintext content, decrypted field values, or anything that could reconstruct private data. Log structural signals only (e.g., "note created", not the note body).

9. **Platform fragility warning — self-hosted PostHog upgrades are breaking.** PostHog releases frequent schema migrations. Pin the PostHog version, schedule a quarterly upgrade window, and run the migration against a staging replica before production. Factor this operational overhead into the infrastructure plan.

10. **{APP_NAME} builds natively: the event instrumentation layer** (typed event emitter, property schema, PII scrubbing middleware) and any analytics UI surfaced inside the product (usage dashboards, personal stats). {APP_NAME} defers to PostHog for the analytics engine, query layer, session replay, and flag evaluation; defers to Umami for web traffic reporting.

11. **Integration pattern — use official SDKs with a local proxy.** Route PostHog events through a first-party proxy endpoint (e.g., `/api/analytics/ingest`) rather than pointing the SDK directly at the PostHog host. This allows {APP_NAME} to scrub or enrich events server-side, survives future backend changes without SDK updates on clients, and prevents ad-blockers from silently dropping analytics calls.

12. **Personal analytics are a product feature, not just ops telemetry.** The Plenix vision includes giving users visibility into their own productivity patterns. Design the event schema with user-facing dashboards in mind from day one — properties logged for operational insight should double as the data source for in-app personal analytics screens, avoiding a second instrumentation layer later.

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
