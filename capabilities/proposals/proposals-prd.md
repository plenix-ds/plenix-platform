# Proposals PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Proposals |
| **Capability ID** | proposals |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST create and send formal proposals to prospective or existing clients.

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

Source feature area(s): RFP & Consultant Platform

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Project / RFP creation — structured proposal document** | 🔵 Planned | Use case: A project owner needs to create a structured project specification that can be shared with consultants who will bid on the work. This is a formal RFP/RFQ document that defines the engagement clearly enough for a consultant to price it accurately. The creation form collects: Basic info (product name, authors); Content sections in rich text (About Us, Evaluation criteria, Deliverables, Payment terms, NDA with e-signature requirement, Release criteria); Purpose section (target audience, objective, product description); Timeline (deadline, milestones, dependencies); and Media attachments — images are watermarked and low-quality during bidding, unlocked to full resolution after a consultant is hired, and documents require an annotation/description field. The structure is section-based with rich text editors per section, giving the RFP professional document quality rather than a form-fill feel. |
| F02 | **Consultant discovery — expertise matching and invite links** | 🔵 Planned | Consultants find projects two ways: direct invite (the project owner generates a link and sends it) or expertise matching (the project is visible to any consultant whose expertise tags overlap with the project's category). Visibility settings: Public (any matched consultant can see and bid) or Private (invite-only). Consultants can request access to private projects; the owner reviews and approves. Invite links expire after a configurable period. Before viewing full project details including sensitive documents, consultants must accept the project's NDA — enforced as a platform gate before access is granted. |
| F03 | **Proposal submission — bid structure and work samples** | 🔵 Planned | Each consultant submits: Total offer (USD or configured currency), Milestone-based cost breakdown (how the total splits across deliverables — e.g. 30% on design approval, 40% on delivery, 30% on final sign-off), Proposal narrative (approach, methodology, why they are the right fit), Work sample uploads (documents and images), and External portfolio links. The platform detects and renders icons for known platforms: Alibaba, ArtStation, Behance, Dribbble, Fiverr, GitHub, Instagram, LinkedIn, Upwork, personal portfolio, Pinterest, VK, and others. Submitted proposals queue in the project owner's Offers Table. Consultants can save drafts before submitting. |
| F04 | **Offers table — compare, rate, filter, and select bids** | 🔵 Planned | Each project has an Offers Table showing all submitted proposals. Columns: Company, Contact person (with communication icons for WhatsApp, email, phone, LinkedIn), Status (Draft / Submitted / Under Review / Shortlisted / Counter-offered / Accepted / Rejected), Decline reason (hidden unless Rejected), Star rating (1–5 set by owner), Internal notes, Counter-offer amount (hidden unless active), Portfolio icons, Contact icons. Table features: sortable, filterable by status/rating, groupable by expertise/country, and a side-by-side comparison mode (select 2–4 proposals, all fields aligned in columns). This is the primary evaluation surface — the owner works through submissions here rather than opening each proposal individually. |
| F05 | **Proposal lifecycle and counter-offer negotiation** | 🔵 Planned | Proposals move through: Draft → Submitted → Under Review → Shortlisted → Counter-offered → Accepted / Rejected. Counter-offers are handled in-platform: the owner enters a counter amount and note; the consultant receives a notification and can accept, decline, or counter back. Each iteration is recorded with timestamps for a clear negotiation trail. Per-proposal messaging allows direct communication scoped to a specific bid — visible only to the two parties. Once Accepted, the status changes to Hired and the project moves into execution. Rejected proposals show a decline reason visible to the consultant. |
| F06 | **Project lifecycle — 6 fixed phases from Startup to Closure** | 🔵 Planned | Once a consultant is hired, the project enters a 6-phase lifecycle: Startup (kick-off, access setup, NDA counter-signing), Initiation (requirements finalization, stakeholder alignment, project charter), Planning (task scheduling, risk identification, resource confirmation), Design (creative or technical work, review cycles, approval gates), Execution (primary delivery, progress tracking, issue management, change requests), and Closure (final delivery, acceptance sign-off, invoice settlement, lessons learned, archive). Each phase has a status (Not started / In progress / Complete) shown as a visual progress bar on the project dashboard. Tasks belong to exactly one phase. Phase names are customizable per project; the 6-phase structure reflects industry-standard methodology. |
| F07 | **Smart task system — phase-based with auto-generated recommendations** | 🔵 Planned | When a project enters a new phase, the system recommends a standard task set for that phase based on project type. For a branding project entering Design phase: Create mood board, Develop logo concepts, Present initial concepts, Incorporate feedback round 1, Finalize for approval. The owner accepts, modifies, or declines each suggestion. Task features: Dependencies (task B blocks until task A is complete, with critical path highlighting), Subtasks, Recurring tasks, Priority levels (Urgent/High/Medium/Low), Time tracking (hours logged), Milestone-based grouping, Deadline tracking with overdue highlights. Tasks assigned to a consultant appear in their Consultant Portal dashboard. |
| F08 | **Risk, issue, assumption, and constraint log — RIAC** | 🔵 Planned | Beyond tasks, projects track four item types: Risks (potential future problems — likelihood, impact, owner, mitigation plan), Issues (current problems — severity, owner, resolution plan), Assumptions (things the project depends on being true — if disproved, triggers a change request), and Constraints (fixed limitations — budget ceiling, regulatory requirement, technology lock-in). The RIAC log is a table on the project dashboard. Risks can be converted to Issues with one click when they materialize. All items have owners assigned from the project team. The log is included in auto-generated status reports. |
| F09 | **Change management — formal change request approval workflow** | 🔵 Planned | Scope changes follow a structured change request (CR) flow. A CR is created by either party and contains: description of proposed change, reason (client request / error correction / scope clarification / external dependency), timeline impact (days added or removed), cost impact (additional or reduced amount), and supporting documents. Flow: Drafted → Submitted → Under Review → Approved / Rejected. Approved CRs automatically update the project timeline and trigger a revised payment adjustment. All CRs are logged chronologically — the project's change history is a permanent record of every scope modification and its approval status. |
| F10 | **Financial system — milestone payments, invoices, multi-currency** | 🔵 Planned | Payments are milestone-based: when a milestone is accepted by the project owner, the associated payment is triggered. The consultant raises a Payment Request linked to the milestone; the owner approves, initiating payment. Invoice management: consultants generate invoices within the platform pre-populated with project name, milestone description, amount, payment terms, and both parties' details. Payment history shows all transactions per project with status (Pending / Processing / Paid). Gateway integration: Stripe, PayPal, bank transfer reference tracking. Multi-currency: USD, EUR, GBP, and other configured currencies with exchange rate display. Planned enhancement: escrow model holding funds in trust until milestone acceptance. |
| F11 | **Document management — version control, approval workflow, collaboration** | 🔵 Planned | Project documents have: version history (every revised upload creates a new version, previous versions restorable), document approval workflow (submitted for review, approved or rejected with comments, locked once approved), inline comments and section-level annotations (similar to Google Docs), and collaborative editing for supported formats. Google Drive/Docs/Sheets/Slides integration links documents from Drive rather than uploading — always fetches the latest version. Image IP protection: uploaded images are watermarked and low-quality during bidding; full-resolution unlocked for the hired consultant only. |
| F12 | **Consultant portal — discovery, bidding, and execution view** | 🔵 Planned | Consultants access a tailored portal showing: Discovery view (projects matching their expertise with name, category, budget range, deadline, required skills); Project detail view (full RFP after NDA acceptance); Proposal submission; and Execution view after being hired (their assigned tasks, milestone tracker, document repository, change requests, payment history, message threads). The portal's task dashboard shows all tasks assigned across all active projects, sorted by priority and deadline. Consultants see only their own proposals — never other consultants' bids or negotiation details. |
| F13 | **Project owner dashboard — modular project control panel** | 🔵 Planned | The project dashboard shows: Phase progress bar (Startup → Closure with completion percentage per phase), open tasks by assignee and phase, risks and issues summary (counts by severity), budget gauge (spent vs allocated), milestone timeline (next 3 milestones with linked task completion), pending proposals count, pending change requests, pending payment requests, and recent document activity. Each widget links to the relevant section. The dashboard is the daily management surface — checked each morning to see what needs attention without opening every sub-section. |
| F14 | **Knowledge base and lessons learned** | 🔵 Planned | At Closure phase, a Lessons Learned record is created: what went well, what went wrong, root causes, and recommendations. Lessons are tagged by project category, consultant, and topic. The Knowledge Base makes them searchable across all completed projects. When starting a new project of the same category, relevant lessons from past projects are surfaced for the owner to review at kick-off. Reusable assets (document templates, task lists, risk registers) can be saved as project templates and applied to new projects. |
| F15 | **Role-based access control — four roles with scoped permissions** | 🔵 Planned | Four roles: Project Owner/Admin (full access — create projects, manage proposals, approve tasks, process payments, all documents and reports); Consultant (scoped — only projects they are invited to or hired for; submit proposals; view and complete assigned tasks; raise payment requests; access unlocked documents); Internal Team Member (view and manage tasks, documents, and risks but not approve proposals or trigger payments); Viewer/Stakeholder (read-only — project status, milestones, reports). Roles are per-project — the same person can be Admin on one and Viewer on another. Row-level security ensures consultants cannot see each other's proposals or negotiation details. |
| F16 | **Reporting — project status, financial summary, consultant performance** | 🔵 Planned | Auto-generated reports from live data: Project Status Report (phase, task completion rate, risks/issues summary, milestone progress, budget — exportable as PDF); Financial Summary (total budget, amount paid, outstanding, cost by milestone and consultant — CSV export); Consultant Performance Report (on-time delivery rate, task completion rate, change requests raised, client rating — internal only by default). Reports can be scheduled for automatic generation and email delivery via the Automations section. Custom report builder selects which sections to include and in which order. |

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

1. Not yet defined.

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
