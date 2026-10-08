# Deals PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Deals |
| **Capability ID** | deals |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST track sales opportunities from initial contact through to close.

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

1. **Primary OSS reference — Frappe CRM (MIT, Embed).** Study and embed Frappe CRM directly. MIT license permits embedding without copyleft obligations. Covers pipeline management, contacts, deals, activities, and a customizable field model. 2.8k stars. Repository: `frappe/crm`.

2. **Secondary OSS reference — Twenty CRM (AGPL, Reference only).** Use Twenty as a design-pattern reference for modern CRM UI — kanban pipeline views, inline editing, relationship graphs, and GraphQL + REST API shape. Do not embed: AGPL requires source disclosure for any networked use. 49k stars. Repository: `twentyhq/twenty`.

3. **License classification summary.** Frappe CRM = MIT = safe to embed in Plenix directly or run as a self-hosted service behind an internal API boundary. Twenty CRM = AGPL = reference only; any code derived from or linked to Twenty must be treated as AGPL and disclosed. Do not copy Twenty source into Plenix.

4. **Architectural decision — Frappe CRM over Twenty.** Frappe CRM was chosen because: (a) MIT license allows embedding without copyleft exposure, (b) deep UI customization via Frappe's DocType system maps well to Plenix's flexible field requirements, and (c) the Frappe framework is the same foundation as ERPNext, making a future finance integration path natural and low-friction.

5. **Integration pattern — internal service boundary.** Run Frappe CRM as an internal service (self-hosted, not exposed publicly). Plenix communicates with it over an internal REST/Frappe API boundary. This isolates Plenix's data layer from Frappe's opinionated schema and allows Plenix to own the canonical data model while delegating CRM workflow execution to Frappe.

6. **Native builds vs. deferred to service.** Plenix builds natively: deal record UI, pipeline kanban board, stage-transition rules, field validation, and cross-capability linkage (e.g., deal-to-contact, deal-to-task). Plenix defers to Frappe CRM service: activity logging, email threading on deals, notification dispatch, and report generation. Do not rebuild what Frappe already handles reliably under MIT.

7. **Key architectural decision — GraphQL vs. REST.** Twenty's native MCP server and GraphQL API are the reference for how a modern CRM exposes data to AI agents and automations. Plenix should design its deals API surface (even if backed by Frappe's REST) to be agent-consumable — structured, filterable, and exposable via MCP or a thin GraphQL wrapper.

8. **Platform fragility warning — Frappe framework upgrades.** Frappe CRM's DocType customizations and custom scripts are tightly coupled to the Frappe framework version. Major Frappe upgrades can silently break customizations. Pin the Frappe and Frappe CRM versions in the self-hosted deployment and treat upgrades as a planned migration event, not a routine update.

9. **E2EE warning.** Frappe CRM does not provide end-to-end encryption for deal data at rest by default. If Plenix's threat model requires E2EE for sensitive pipeline data (e.g., deal values, contact PII), encryption must be layered at the Plenix application level before data is written to the Frappe service, not delegated to Frappe.

10. **Data model ownership — keep canonical schema in Plenix.** Do not let Frappe CRM's DocType schema become the source of truth for Plenix's deal entity. Define the canonical deal schema in Plenix's own data model spec (Section 8) and treat Frappe as a storage and workflow engine that conforms to it, not the reverse. This preserves the ability to migrate away from Frappe without a schema crisis.

11. **Twenty's MCP server as an integration pattern reference.** Twenty ships a native MCP server exposing CRM records to AI agents. Study this implementation as the reference pattern for how Plenix should expose deals, contacts, and pipeline data to its own agent layer — structured tool definitions, typed filters, and mutation operations with clear capability boundaries.

12. **Vendor and community risk.** Frappe CRM is maintained by Frappe Technologies with active community support; low abandonment risk for core features. Twenty is VC-backed and high-growth but AGPL; community trajectory is strong but license risk remains if Twenty ever re-licenses or if Plenix inadvertently imports AGPL code. Monitor both repositories for license changes at each dependency review cycle.

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
