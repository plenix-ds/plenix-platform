# Bookkeeping PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Bookkeeping |
| **Capability ID** | bookkeeping |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST record and reconcile financial transactions in a general ledger.

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

Source feature area(s): Finance Planner

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Income and expense tracking** | 🔵 Planned | Use case: The user wants to track their personal or business finances — income, recurring expenses, one-off purchases, and overall budget health — without using a separate app. The Finance Planner allows the user to log income and expense transactions with: amount, date, category (user-defined — e.g. Rent, Utilities, Salary, Freelance income, Travel), description, and a Paid/Pending status. Transactions can be marked as recurring (with a frequency and end date) so regular items like rent, subscriptions, and salary auto-populate without manual re-entry each period. The transaction list is filterable by date range, category, and type (income vs expense). |
| F02 | **Budget planning and category limits** | 🔵 Planned | The user can define a budget — a monthly allocation per category (e.g. Groceries: £400, Entertainment: £100, Utilities: £150). The Finance Planner compares actual spending to the budget in real time, showing a progress bar per category that fills as spending accumulates. Categories over budget are highlighted in red. The budget view shows total income, total expenses, and the net surplus or deficit for the period. Budget limits can be set independently for each month, allowing for variable months (e.g. higher entertainment budget in December). |
| F03 | **Reporting and trends** | 🔵 Planned | The Finance Planner reports view shows: monthly totals (income and expenses by month, as a bar chart), category breakdown (pie chart of expense distribution), year-to-date summary, and trend lines for key categories over time. The user can compare any two months side by side. An export function downloads transactions as a CSV for use in a spreadsheet or tax preparation tool. The Finance Planner is personal/small business in scope — it is not a full accounting system but a clear, fast tool for tracking where money goes. |

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

1. **Study Invoice Ninja as the V1 reference model.** Invoice Ninja (AAL license, 9.1k stars) covers the full freelancer/solopreneur billing surface: invoices, quotes, recurring billing, payments, expenses, vendors, purchase orders, projects, tasks, time tracking, and a client portal. Use it as the design and data-model reference for Plenix V1 bookkeeping. Do not embed or redistribute it — reference only.

2. **Study ERPNext for V2/V3 accounting depth.** ERPNext (GPL v3, 35k stars) provides true double-entry accounting: chart of accounts, general ledger, P&L, balance sheet, payroll, and inventory. Because ERPNext is built on the Frappe framework — the same framework as Frappe CRM — there is a natural integration path: shared ORM, shared permission system, shared data layer. Reference only; do not embed.

3. **Study Akaunting as the middle-ground reference.** Akaunting (GPL v3, 9.9k stars) sits between Invoice Ninja and ERPNext: double-entry accounting, chart of accounts, invoices, bills, expenses, and financial reports, but lighter than a full ERP. Use it as the reference for the V2 accounting layer when users need real bookkeeping without ERP complexity.

4. **Reference InvoicePlane for minimal invoicing scope.** InvoicePlane (MIT, 3.1k stars) is a simple, focused self-hosted invoicing tool. Use it as a reference for the minimum viable invoicing feature set and clean data models. MIT license allows closer code study and pattern extraction.

5. **Do not conflate personal finance with business bookkeeping.** Firefly III (AGPL, self-hosted, 24k stars) is a personal finance manager — budgets, expense tracking, rules — not a business accounting system. It is relevant only if Plenix adds a personal finance mode. Its AGPL license means any network-exposed derivative must be open-sourced; treat as a self-hosted service reference only and never embed.

6. **Build V1 as Invoice Ninja-style, not ERP-style.** The first release MUST prioritize the freelancer and solopreneur use case: invoice creation, expense logging, recurring billing, time tracking, and basic P&L summary. Do not expose a chart of accounts, journal entries, or debit/credit UI in V1. Adding ERP complexity too early will alienate the core user.

7. **Defer true double-entry accounting to V2/V3.** Plenix builds its own transaction and invoice engine natively in V1. The double-entry ledger (chart of accounts, journal entries, trial balance, formal P&L and balance sheet) is deferred to V2. When V2 lands, the ERPNext/Akaunting data models are the architectural reference — adopt their account type taxonomy and posting logic rather than inventing a custom one.

8. **License classification governs what Plenix can do with each tool.** Invoice Ninja (AAL): reference only — the AAL restricts commercial SaaS redistribution. ERPNext and Akaunting (GPL v3): reference only — GPL requires source disclosure for distributed binaries but not for internal SaaS use; confirm legal position before embedding any GPL module. InvoicePlane (MIT): patterns and code may be studied and adapted freely. Firefly III (AGPL): self-hosted reference only — AGPL copyleft extends to network use, so never embed or wrap it as a Plenix service.

9. **ERPNext/Frappe synergy is the long-term integration path.** If Plenix already integrates Frappe CRM, the ERPNext accounting modules run on the same stack. In V3, evaluate whether to surface ERPNext accounting as an embedded Plenix module (with a Frappe backend) rather than building a custom double-entry engine from scratch. This avoids duplicating a complex, well-tested accounting core.

10. **Warn: platform fragility on bank feed integrations.** Any automatic bank transaction import relies on third-party aggregators (Plaid, TrueLayer, Salt Edge, etc.). These APIs change pricing, deprecate endpoints, and alter data-sharing agreements with minimal notice. Do not build bank sync as a core dependency in V1. Offer CSV import as the primary path; treat live bank feeds as an optional V2/V3 enhancement behind a feature flag.

11. **Warn: E2EE incompatibility with server-side accounting logic.** True end-to-end encryption of financial records is architecturally incompatible with server-side aggregation, reporting, and rule-based categorization. If Plenix pursues E2EE for sensitive data, financial records must be scoped to a plaintext-on-server model with access controls, or the accounting feature must operate in a separate trust boundary. Decide this before V2 data model work begins.

12. **What Plenix builds natively vs defers.** Natively (V1): invoice/quote creation, expense logging, recurring billing schedules, time tracking, basic income/expense summary, CSV export. Natively (V2): chart of accounts, double-entry posting engine, formal P&L and balance sheet, VAT/tax line items. Deferred to service or integration: payroll processing (defer to a payroll provider API), bank feed sync (defer to an aggregator), inventory management (defer to ERPNext or a dedicated service if needed).

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
