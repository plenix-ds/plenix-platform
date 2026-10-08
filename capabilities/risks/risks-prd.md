# Risks PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Risks |
| **Capability ID** | risks |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST identify, assess, and manage project risks with mitigation plans.

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

1. **Reference OpenProject's risk-via-work-packages pattern.** OpenProject (GPL-2.0) models risk tracking as a work package type with custom fields for probability, impact, and status. Study this pattern for risk-to-task and risk-to-date linking mechanics. License classification: reference only — do not embed GPL code; re-implement the data model independently.

2. **Reference OpenRMF for risk scoring vocabulary.** OpenRMF (Apache 2.0, ~500 stars) is a compliance/risk framework for security controls. Its risk severity enums, scoring formulas (likelihood × impact matrices), and residual-risk concepts are worth studying. License classification: reference — the domain model is instructive but the tool is too niche and compliance-specific to embed directly.

3. **Build the risks module natively.** Neither OpenRMF nor OpenProject covers Plenix's UX scope (unified organizer, cross-project risk aggregation, task-linked mitigations). Plenix owns the schema, scoring engine, and UI in-house. No third-party risk library is embedded.

4. **Risk entity core fields.** The native schema must capture at minimum: title, description, probability (enum or 1–5 scale), impact (enum or 1–5 scale), inherent score (computed = probability × impact), mitigation plan (rich text), residual score (computed post-mitigation), status (identified / mitigating / closed / accepted), owner (user ref), linked tasks (M:M), linked dates/milestones (M:M), and created/updated timestamps.

5. **Risk-to-task linking pattern.** Follow OpenProject's approach of a join table (risk_task_links) rather than embedding risk IDs inside task records. This keeps the task schema clean and allows a risk to surface across multiple tasks without duplication. Cascade-delete links (not the task or risk itself) when either side is removed.

6. **Risk-to-date linking pattern.** Risks tied to deadlines or milestones use a symmetric join table (risk_date_links). When a linked date changes, re-evaluate and surface risk status in the dates view — this is a Plenix-native behavior not present in either reference tool.

7. **Scoring engine architecture decision.** Implement scoring as a pure server-side computed field (not stored), recalculated on every read or on a dirty flag. Avoid client-side scoring to prevent score drift between clients. If performance requires caching the score, store it with a computed_at timestamp and invalidate on field change.

8. **No external risk-intelligence service at launch.** Defer any AI-assisted risk suggestion, industry benchmark probability data, or third-party risk feed integration to a later phase. The v1 risks module is fully self-contained — probability and impact values are user-entered, not inferred.

9. **Platform fragility warning — avoid browser-extension risk capture.** Risk management requires deliberate, structured input; do not attempt to capture risks via the browser extension's passive capture path. The extension layer (11.2) has no role in this capability at launch.

10. **License warning for any future embedding.** If a future phase evaluates embedding a risk library, verify its license before inclusion. OpenProject is GPL-2.0 — linking to it in a distributed product requires open-sourcing Plenix under compatible terms. OpenRMF (Apache 2.0) is safe to embed with attribution. Re-check license status at time of adoption, as OSS licenses can change on major versions.

11. **Cross-project risk aggregation deferred.** The initial implementation scopes risks to a single project. Cross-project risk roll-ups (portfolio risk view) require a separate aggregation layer and are deferred to the roadmap phase following core per-project risk stability.

12. **E2EE warning.** Risk records may contain sensitive strategic or financial information. If Plenix adds end-to-end encryption to any capability in a future phase, the risks module must be included in scope. Storing unencrypted risk data in a shared cloud database is a liability for enterprise users — flag this during any security architecture review.

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
