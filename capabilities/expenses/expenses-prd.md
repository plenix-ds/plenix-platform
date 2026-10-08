# Expenses PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Expenses |
| **Capability ID** | expenses |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST track and categorize business expenses with receipt management.

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

1. **Study Firefly III as the primary reference model.** Firefly III (AGPL-3.0, ~24k GitHub stars) is the most complete self-hosted personal finance manager available in OSS. Its transaction model (double-entry bookkeeping, piggy banks, rules engine, recurring transactions, budget envelopes) directly maps to F01–F03. Study its schema design and rule-trigger architecture; do not embed or redistribute its code. Classification: reference only.

2. **Study Invoice Ninja for business-expense patterns.** Invoice Ninja (AAL — Ariel Source License) covers vendor payments, expense categories linked to projects/clients, receipt attachment, and tax-rate fields relevant to small-business expense tracking. Its expense-to-invoice promotion flow is a useful reference if Plenix ever bridges expense capture to billing. Classification: reference only (AAL is source-visible but not freely embeddable without a commercial license).

3. **Embed a double-entry bookkeeping core natively.** Plenix should build its own lightweight double-entry ledger rather than embedding a full engine from a third party. Each transaction records a debit account and a credit account (e.g. debit Groceries expense, credit Checking asset). This keeps the data model correct under the hood and makes future reporting, reconciliation, and multi-currency support tractable without a rewrite. This is a native-build decision.

4. **Defer OCR receipt parsing to a managed service.** Receipt scanning (image-to-structured-data: merchant, amount, date, VAT number) is high-accuracy ML work. Do not build a custom OCR pipeline. Evaluate: Google Document AI (per-page pricing), AWS Textract (per-page pricing), or Mindee (expense-specific, generous free tier). Call the chosen API from the Plenix server layer; never from the client. Store the raw image in the user's own storage (R2 or local); send only a temporary signed URL to the OCR service to avoid persistent third-party data retention.

5. **Build currency handling and FX conversion natively.** Store all monetary values as integers in the minor unit of the base currency (e.g. pence, cents) with an explicit currency code column. For FX conversion in reports, fetch daily mid-market rates from an open API (e.g. frankfurter.app, which is free and MIT-compatible data) and cache rates server-side. Never convert at write time — store the original currency and amount, convert only at query/display time. This is a native-build decision.

6. **Use a rules engine modeled on Firefly III's rule triggers.** Firefly III's rule system (trigger: merchant name contains X → action: set category Y, set budget Z) is the proven pattern for automatic categorization. Plenix should implement an equivalent lightweight rules engine stored as user-owned JSON/DB rows, evaluated server-side on transaction create/edit. Do not embed Firefly III's PHP implementation; model the data structure after its published API schema. Native build.

7. **Recurring transactions must be stored as templates, not pre-generated rows.** Store a RecurringTransaction record (amount, category, frequency, next-due date, end date) and generate concrete Transaction rows lazily — either on a server-side cron job or on first access after the due date passes. Pre-generating years of future rows wastes storage and makes edits complex. Reference: Firefly III uses the same lazy-generation pattern internally.

8. **Budget envelope data must be per-period, not a single global limit.** Store BudgetLimit rows keyed to (category_id, year, month, currency) so limits can vary by month (F02 requirement). A missing row for a given month means "no limit set" — do not default to the previous month's limit. This avoids silent carry-forward bugs.

9. **CSV export must be Plenix-native; do not embed a third-party export library for this scope.** The export is a simple flat-file projection of Transaction rows to RFC 4180 CSV. Build it with a streaming server-side response (no in-memory buffer for large exports). Column set: date, description, amount, currency, category, account, type (income/expense), status (paid/pending), notes. This is in-scope for native build.

10. **E2EE warning: expense data contains sensitive financial PII.** If Plenix ever adopts end-to-end encryption at the record level, expense amounts, merchant names, and receipt images must all be included in the encrypted payload. OCR receipt parsing is incompatible with client-side E2EE (the server cannot forward an encrypted blob to an OCR API). Document this tension early; plan for an explicit user choice: "receipt scanning requires server-side access to this image."

11. **Platform fragility warning for bank import / open banking.** Any future "import from bank" feature (OFX, QFX, Plaid, TrueLayer, GoCardless BankAccountData) carries significant fragility: institution-specific quirks, credential re-auth cycles, and regulatory exposure (PSD2 in the UK/EU). Defer all open-banking connectivity to a dedicated licensed aggregator service; never build a screen-scraping layer. Plenix's initial scope (manual entry + CSV import + receipt OCR) avoids this entirely and should be the shipped v1.

12. **License guardrail: AGPL contagion.** Firefly III is AGPL-3.0. Any code copied or derived from its repository would require Plenix's full server-side source to be published under AGPL if Plenix is offered as a network service. The decision is to use Firefly III as a reference (read its architecture, study its API docs, inspect its schema) without copying any source. Enforce this in code review. Invoice Ninja's AAL has similar, stricter restrictions. All third-party libraries embedded in Plenix must be MIT, Apache-2.0, BSD, or ISC; audit with a license checker (e.g. license-checker, FOSSA) as part of CI.

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
