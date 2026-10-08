# Invoices PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Invoices |
| **Capability ID** | invoices |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype; descriptions documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST generate, send, and track invoices and their payment status.

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

1. **Primary reference — Invoice Ninja (AAL, reference only):** Study Invoice Ninja as the V1 design model. It covers the full practical billing surface: invoices, quotes, recurring billing, payments, expenses, vendors, purchase orders, projects, tasks, time tracking, and a client portal. Do not embed or ship its code; use it as a specification and UX reference only. AAL license prohibits redistribution as a competing SaaS product.

2. **V2/V3 accounting reference — ERPNext (GPL v3, reference only):** ERPNext defines the target architecture for true double-entry accounting: chart of accounts, journals, P&L, balance sheet, payroll, and inventory. Reference its data model and ledger design. Do not embed GPL v3 code into a proprietary build without legal review. ERPNext shares the Frappe framework with Frappe CRM — this is the primary integration path for V2/V3 and should be treated as a strategic alignment decision, not an afterthought.

3. **Middle-ground reference — Akaunting (GPL v3, reference only):** Akaunting sits between Invoice Ninja and ERPNext: double-entry accounting, chart of accounts, invoices, bills, expenses, and financial reports without full ERP weight. Reference its schema and report logic when designing the V2 accounting layer. Same GPL v3 caution applies.

4. **Supplementary reference — InvoicePlane (MIT, reference or embed):** InvoicePlane is MIT-licensed and focused solely on invoicing. Its code may be studied or selectively adapted. Useful for understanding a minimal invoice + quote + payment cycle without ERP entanglement. Confirm any embedded code is properly attributed.

5. **Exclude Firefly III from business accounting scope:** Firefly III (AGPL) is a personal finance manager — budgets, personal expense tracking, rules-based categorization. It is not a business accounting tool and should not be used as a reference for invoice or ledger design. AGPL license also imposes strong network-use copyleft obligations; avoid embedding.

6. **Architectural decision — two-tier capability model:** Do not force all users into ERP complexity from day one. V1 ships the Invoice Ninja model: invoices, expenses, time tracking, purchase orders, and payment status. V2/V3 adds true double-entry accounting via an opt-in accounting layer (ERPNext/Akaunting model). The UI must accommodate progressive disclosure — a freelancer and an accountant should both feel at home in Plenix without mode-switching complexity.

7. **Integration pattern — Frappe/ERPNext synergy:** ERPNext and Frappe CRM share the same ORM, permission system, and REST API conventions. If Plenix adopts Frappe CRM as a backend component, the ERPNext accounting module becomes a low-friction addition for V2/V3. Design the invoice data model to be forward-compatible with Frappe's DocType system so the migration path does not require a schema rewrite.

8. **What Plenix builds natively (V1):** Invoice creation and editing, line-item management, tax and discount rules, recurring invoice scheduling, payment status tracking (sent, viewed, paid, overdue), basic expense logging, vendor records, purchase orders, and PDF generation. These are owned features — no third-party service dependency for core billing.

9. **What Plenix defers to a service:** Payment processing (Stripe, PayPal, or equivalent — never build a payment processor), currency conversion rates (external FX API), e-signature for contracts (DocuSign or equivalent), and tax jurisdiction lookup (Avalara or TaxJar for V2+). These carry regulatory, security, and compliance burdens that outweigh the cost of a third-party dependency.

10. **PDF generation:** Invoice PDF output must be native and offline-capable — no SaaS PDF renderer. Evaluate Puppeteer (headless Chrome, MIT), WeasyPrint (BSD), or a React-to-PDF approach via Remotion/react-pdf (MIT). The template engine must support custom branding per workspace. Lock the PDF spec early; layout changes after client adoption cause support burden.

11. **License and platform fragility warnings:** AAL (Invoice Ninja) prohibits competitive SaaS redistribution — use for reference only and document this constraint in the engineering wiki. GPL v3 (ERPNext, Akaunting) requires full source disclosure for distributed binaries and network-use derivatives depending on interpretation — get legal sign-off before embedding any GPL v3 code in a proprietary product. AGPL (Firefly III) extends GPL obligations to network use — treat as off-limits for embedding. Platform fragility risk: Stripe API changes and regional payment regulation changes can break payment integrations without notice; build a payment-provider abstraction layer from day one.

12. **E2EE and data sensitivity warning:** Invoice data contains financial PII — client names, amounts, payment history, bank details in some workflows. If Plenix offers E2EE for notes or tasks, invoices must be evaluated separately: server-side search and tax reporting requirements may conflict with client-side-only encryption. Define the encryption boundary explicitly before V1 ships and document which fields are plaintext on the server and why.

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
