# Purchase Orders PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Purchase Orders |
| **Capability ID** | purchase_orders |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST create and manage purchase orders sent to suppliers.

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

Source feature area(s): Procurement & Sourcing

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Supplier discovery — AI-powered global search** | 🔵 Planned | Use case: The user needs to find qualified manufacturers or suppliers for a product, component, or category — globally — without spending days manually searching directories, trade show records, and industry databases. Plenix's supplier discovery feature uses AI to search across a database of millions of manufacturers spanning 200+ countries, sourced from customs records, trade show exhibitor lists, B2B directories (Alibaba, Global Sources, Kompass), and verified business registries. The user enters a product description, category, material, or specification and the AI returns a ranked list of recommended suppliers with profiles showing: company name, country, primary product categories, certifications held (ISO, CE, RoHS, etc.), estimated annual revenue, number of employees, and a match score explaining why the AI recommended them. Results can be filtered by country, MOQ range, lead time, certification, and diversity status. This is the starting point of every sourcing workflow in Plenix. |
| F02 | **Supplier profiles — verified data and hierarchy mapping** | 🔵 Planned | Use case: Before engaging a supplier, the user needs to know they are dealing with the correct legal entity, understand the corporate structure, and trust that the contact information and credentials are accurate. Plenix resolves each supplier to its verified legal entity — distinguishing between trading companies, manufacturers, subsidiaries, and parent corporations. Corporate hierarchy mapping shows the full family tree: parent company, subsidiaries, related entities, and known trade names. Each profile is enriched with 30+ attributes including: registered business name, tax ID / VAT number, incorporation country, industry classification (NAICS/HS codes), diversity certifications (woman-owned, minority-owned, small business), active certifications (ISO 9001, ISO 14001, IATF 16949, etc.), and primary export markets. This eliminates the 'vendor master data tax' — the hidden cost of sourcing decisions made on incomplete, duplicate, or mismatched supplier records. |
| F03 | **Supplier outreach — automated RFQs and follow-ups** | 🔵 Planned | Use case: Once the user has identified candidate suppliers, they need to send Request for Quotation (RFQ) emails, track responses, and follow up with non-responders — a process that is time-consuming and repetitive at scale. Plenix automates the RFQ workflow: the user defines the product specification, quantity tiers, required lead times, packaging requirements, and target price. Plenix generates a professional RFQ document and sends it to selected suppliers via email or the supplier's preferred channel. Follow-up messages are sent automatically on a configured schedule (e.g. day 3, day 7, day 14) if no response is received. All supplier replies are captured, parsed, and displayed in a unified comparison view so the user can evaluate quotes side by side without managing a complex email thread. The user makes the decisions — Plenix handles the coordination. |
| F04 | **RFQ comparison and supplier shortlisting** | 🔵 Planned | Use case: After receiving quotes from multiple suppliers, the user needs to compare them objectively — not just on price but on lead time, payment terms, MOQ, sample cost, certifications, and quality indicators. The RFQ comparison table shows all responding suppliers as rows with quote attributes as columns. The user can weight each attribute (e.g. price 40%, lead time 30%, certifications 30%) and Plenix calculates a weighted score for each supplier. Columns can be sorted and filtered. A 'Shortlist' action flags the top candidates for the next stage (sampling or negotiation). Non-selected suppliers receive a polite decline message automatically if the user chooses. The shortlist is saved to the relevant Project in Plenix so it is accessible from the project's Files and Notes. |
| F05 | **Product ideation — from inspiration to BOM** | 🔵 Planned | Use case: The user has a product idea, a reference image, or a competitor product they want to develop or improve. Plenix's product ideation tools let the user upload an image or describe a product concept, and the AI generates: product variations (different materials, colors, configurations), a first-pass Bill of Materials (BOM) listing likely components, materials, and sub-assemblies, and suggested product categories to search for relevant suppliers. The BOM is editable — the user can add, remove, or modify line items — and each BOM line can be directly connected to a supplier discovery search, so clicking a component immediately shows candidate suppliers for that specific part. This closes the loop between concept and sourcing in a single workflow. |
| F06 | **Vendor master management — cleanse, deduplicate, enrich** | 🔵 Planned | Use case: Users who manage procurement at scale accumulate a vendor master file (a database of all known suppliers) that becomes cluttered with duplicates, outdated records, missing attributes, and mismatched legal names over time. This 'supplier data tax' slows down every downstream decision. Plenix's vendor master tools let the user import an existing supplier list (CSV, Excel, or sync from an ERP), run an AI deduplication pass that identifies records referring to the same legal entity, resolve conflicts (which record is the authoritative one), and enrich all records with verified attributes. Ongoing enrichment keeps records fresh — when a supplier's certification expires, their contact details change, or a corporate acquisition occurs, Plenix flags the affected records for review. The cleaned vendor master can be exported back to source systems (SAP Ariba, Coupa, Oracle) or used natively within Plenix. |
| F07 | **Supplier relationship tracking** | 🔵 Planned | Use case: The user works with multiple suppliers across multiple projects and needs to track the full history of each relationship — communications, orders, quotes, samples, issues, and notes — in one place rather than scattered across email and spreadsheets. Each supplier in Plenix has a relationship record that aggregates: all RFQs sent and received, all email threads (via connected email), all notes added by the user, any tasks or follow-ups linked to that supplier, sample and order history, and a relationship health indicator based on response rate, on-time delivery, and quality issues logged. This is the procurement equivalent of a CRM — Plenix acts as the system of record for every supplier relationship, linked to the project and contact records that already exist in the app. |

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

1. **Study Invoice Ninja for PO structure and workflow.** Invoice Ninja (license: Attribution Assurance License — AAL) includes purchase orders as a first-class feature alongside invoices and quotes. Study its PO data model (line items, supplier linkage, status state machine, PDF generation, approval flags) and its REST API contract. Classification: **reference only** — AAL is non-permissive and prohibits embedding; Plenix builds this capability natively but uses Invoice Ninja's field schema and workflow as a design reference.

2. **Study ERPNext for procure-to-pay cycle depth.** ERPNext (license: GNU GPL v3) implements a full procure-to-pay cycle: purchase requisition → request for quotation → supplier quotation → purchase order → purchase receipt → purchase invoice → payment entry. Study its approval routing (role-based, multi-level), goods receipt note (GRN) structure, and landed cost voucher model. Classification: **reference only** — GPL v3 is copyleft and cannot be embedded in a proprietary product; ERPNext is also a self-hosted service option if Plenix ever needs to expose a power-user ERP backend, but the default plan is to build natively.

3. **Build PO document generation natively using a headless PDF renderer.** Do not embed Invoice Ninja or ERPNext for document output. Use a headless renderer (Puppeteer/Playwright against a React template, or a server-side PDF library such as pdf-lib or React PDF / @react-pdf/renderer) to produce PO PDFs from Plenix's own data model. This keeps branding, field layout, and locale formatting fully under Plenix's control and avoids any AAL attribution surface.

4. **Model the PO status machine explicitly.** Core statuses: `draft` → `pending_approval` → `approved` → `sent` → `partially_received` → `fully_received` → `closed`. Also: `canceled`, `on_hold`. Do not conflate payment status with receipt status — a PO can be fully received but unpaid, or partially paid against a partially received shipment. Align this state machine with the Invoices capability state machine so shared UI components (status badges, timeline views) can render both without branching logic.

5. **Defer multi-level approval routing to a configurable rules engine rather than hardcoding.** ERPNext's approval model is role + amount threshold based. Plenix should store approval rules as data (e.g. "POs above $10,000 require Finance Manager sign-off") rather than code. This makes the feature configurable per workspace without a code deploy. In the initial release, a simple single-approver flow is sufficient; the rules engine slot must exist in the schema from day one so it can be extended without a migration.

6. **Goods receipt (GRN) is a first-class object, not a PO sub-field.** When items arrive, Plenix creates a Goods Receipt Note linked to the originating PO line items. This allows partial receipts (item A received, item B backordered), quantity discrepancies, and inspection hold flags. The GRN feeds inventory if Plenix has an inventory module, and triggers the payable milestone if the PO is set to receipt-triggered payment terms. Design the GRN schema now even if the UI ships later.

7. **Supplier linkage must resolve to the verified legal entity in the vendor master.** Every PO must be linked to a supplier record, not a free-text name. This enforces vendor master hygiene (Feature F06) and prevents duplicate supplier records from accumulating on the PO list. At PO creation, if the user types a supplier name that does not match an existing vendor master record, Plenix must prompt to create or select a record — never silently create a dangling name string.

8. **Currency and exchange rate handling is a day-one requirement.** Purchase orders to international suppliers will be denominated in supplier currency (USD, EUR, CNY, etc.) while the workspace may operate in a different functional currency. Store both the transaction currency and the exchange rate at the time of PO creation. Lock the rate on approval. Log rate-at-receipt for landed cost accuracy. Do not defer multi-currency to a later milestone — retrofitting it onto an established schema is expensive.

9. **Line item structure must support both product-catalog items and freeform items.** Some PO lines reference a product in Plenix's product catalog (linked by ID, with auto-populated description and unit cost). Others will be freeform (a service, a one-off material, a freight charge). The line item schema must accommodate both without forcing catalog linkage. Enforce that at least one of {product_id, description} is non-null per line.

10. **E2EE warning: PO documents sent via email are not end-to-end encrypted.** When Plenix sends a PO PDF to a supplier via email (or generates a shareable link), the document is transmitted and stored in plaintext on mail servers and Plenix's storage layer. This is standard procurement practice but must be documented in the privacy model. Do not represent the supplier portal link as "secure" in marketing copy without qualifying that it means TLS in transit, not E2EE at rest.

11. **Platform fragility warning for supplier email automation.** Automated RFQ follow-ups and PO delivery via email (Feature F03) depend on deliverability infrastructure (SPF/DKIM/DMARC alignment, sending reputation, bounce handling). If Plenix uses a third-party transactional email service (SendGrid, Postmark, Resend), supplier email delivery is subject to that provider's uptime and policy changes. Build a dead-letter queue and retry mechanism so failed deliveries are surfaced to the user, not silently dropped. Never mark a PO as "sent" until delivery confirmation (SMTP 250 or webhook) is received.

12. **What Plenix builds natively vs defers.** Build natively: PO data model, status machine, line item engine, GRN schema, PDF generation, approval rules storage, supplier linkage, currency handling, PO list and detail UI, export to CSV/PDF. Defer to a service or later milestone: ERP bi-directional sync (SAP Ariba, Coupa, Oracle), electronic data interchange (EDI 850 PO / 855 acknowledgment), supplier self-service portal for order confirmation, and automated three-way match (PO vs GRN vs invoice reconciliation). The deferral boundary should be enforced at a clean API surface so integrations can be added without restructuring core PO logic.

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
