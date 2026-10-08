# 00 — PRD Conventions

**Document type:** Shared conventions for capability PRDs  
**Product language:** {APP_NAME} — unified organizer platform  
**Purpose:** Establish shared requirement language, terminology, status values, document structure, and cross-capability rules for all capability PRDs.

---

## 1. Conformance Language

| Term | Meaning |
|---|---|
| **MUST / REQUIRED** | Required for a compliant implementation. |
| **MUST NOT** | Prohibited behavior unless the specification is intentionally revised. |
| **SHOULD / RECOMMENDED** | Expected behavior, but a documented reason may justify deviation. |
| **SHOULD NOT** | Discouraged behavior, but may be allowed with a documented reason. |
| **MAY / OPTIONAL** | Allowed behavior that is not required for baseline compliance. |

---

## 2. Status Legend

### PRD Status

| Status | Meaning |
|---|---|
| **Skeleton** | Template only — no content in any section. |
| **Draft** | Some sections filled — not ready for development. |
| **Canonical** | All sections filled — under review. |
| **Ready** | Readiness gate passed — cleared for development. |

### Feature Status

| Status | Meaning |
|---|---|
| ✅ Built / Required | Confirmed requirement, already implemented in prototype. |
| 🔵 Planned | Planned for implementation. |
| 🔴 Not Defined | Needs additional specification work. |
| 🟠 Product Decision | Requires a product/business decision before implementation. |
| ⚪ Capability Split | Belongs primarily in another capability PRD. |

---

## 3. Product Language Rules

### 3.1 Name Variable

Never hardcode the application name. Use `{APP_NAME}` everywhere.

### 3.2 Source-Aligned Terms

| Term | Meaning |
|---|---|
| **Bookmark** | A saved link, article, file, video, image, or other captured content. |
| **Tag** | A flexible label that can apply across items and projects. |
| **Highlight** | A saved text selection or annotated passage. |
| **Trash** | Deleted items that may be restored or permanently removed. |
| **Web archive** | A saved copy of a page/content. |
| **Favorite** | An item marked for quick access. |

### 3.3 Anchor Fields

Every item type carries four anchor fields: `projectType`, `projects[]`, `categories[]`, `tags[]`. These are the "fabric" connecting items across capabilities and projects.

---

## 4. System Layer Model

| Layer | Term | Definition | Example |
|---|---|---|---|
| Product | **Capability** | What the system enables at a high level. | Tasks, Notes, Contacts |
| Feature | **Feature** | User-facing tools inside each capability. | Create Task, Board View |
| Usage | **Use Case** | How a user achieves a goal. | Actor + Goal + Steps |
| Behavior | **Business Rule** | What the system does internally. | Overdue tasks turn red |
| Data | **Specification** | Fields, types, constraints. | `title: string, required` |
| UI | **Screen / Component** | Visual elements. | TasksScreen, KanbanBoard |

---

## 5. Cross-Capability Boundary Rules

Each PRD defines one capability deeply. Related behavior may be referenced but full rules belong in the relevant capability PRD.

Cross-capability references MUST use: `see [Capability Name] PRD`

Do not use filenames or section numbers in cross-references.

---

## 6. PRD Template — 28 Sections

Every capability PRD MUST follow this structure. Each section is numbered and titled exactly as shown. Empty sections MUST contain "Not yet defined." rather than being omitted.

```
# <Capability Name> PRD

## Metadata
(Capability name, ID, status, priority, phase, last revised, revision summary)

## 1. Capability Summary
## 2. Problem Statement
## 3. Goals & Non-Goals
## 4. User Types / Actors
## 5. User Stories
## 6. Use Cases / Scenarios
## 7. Scope: MVP vs Future
## 8. Feature List
## 9. Business Rules & Edge Cases
## 10. Data Model
## 11. Field-Level Specification
## 12. Database / Schema Notes
## 13. Permissions Matrix
## 14. UI / UX Requirements
## 15. Workflow Requirements
## 16. API Requirements
## 17. Search / Indexing Rules
## 18. AI Requirements
## 19. OSS / Build-vs-Buy Decision
## 20. Integration Map
## 21. Notifications / Activity
## 22. Non-Functional Requirements
## 23. Reporting / Analytics
## 24. Migration / Import / Export
## 25. Open Questions
## 26. Risks & Decisions
## 27. Verification & Testing
## 28. Readiness Gate
```

---

## 7. Section Descriptions

### Section 1 — Capability Summary

Basic identity. One-line purpose statement and a plain-English description of what this capability does and why it exists.

### Section 2 — Problem Statement

What problem does this capability solve? Who has the problem? Why does it matter? What happens if {APP_NAME} does not solve it? What existing tools do poorly?

### Section 3 — Goals & Non-Goals

**Goals:** Product goals, user goals, business goals, admin goals, AI goals, integration goals.

**Non-Goals:** What this capability will NOT do. Prevents scope creep.

### Section 4 — User Types / Actors

Define who uses this capability: Owner, Admin, Team Member, Consultant, Client Portal User, Guest, AI Agent, System Worker, API Integration.

### Section 5 — User Stories

Format: `As a [user type], I want to [action], so that [benefit].`

Target: 8-15 stories per capability.

### Section 6 — Use Cases / Scenarios

Detailed real-world scenarios. Each includes: Actor, Goal, Starting Condition, Steps, Expected Result, Related Data, Related Permissions.

Target: 6-15 use cases per capability.

### Section 7 — Scope: MVP vs Future

**MVP Scope:** Required features, fields, screens, API endpoints, permissions, integrations for the first usable version. Must be strict.

**Future Scope:** Advanced features, automation, AI enhancements, integrations, reporting that wait until later.

### Section 8 — Feature List

Table of every feature. Columns: Feature ID, Feature Name, MVP/Future, Description, Status.

Feature IDs use format: `CAP-NNN` (e.g., `FILE-001`, `TASK-001`).

Target: 15-30 features per capability.

### Section 9 — Business Rules & Edge Cases

How the system behaves. Numbered rules (BR-001, BR-002...) covering normal operation AND edge cases/error conditions.

Target: 10-30 rules per capability.

### Section 10 — Data Model

Main objects/entities, relationships, cardinality. Include relationship diagram in text form.

### Section 11 — Field-Level Specification

Every field for every object. Columns: Field, Type, Required, Searchable, Filterable, AI-readable, Client-visible, Notes.

### Section 12 — Database / Schema Notes

Expected tables, key columns, foreign keys, join tables, indexes, unique constraints, soft-delete behavior, audit requirements.

### Section 13 — Permissions Matrix

Table: Role vs Operations (Create, View, Edit, Delete, Archive, Export, Share, AI Access). Include permission inheritance, project-level permissions, client portal visibility.

### Section 14 — UI / UX Requirements

Screens: List view, grid view, detail view, create/edit form, filters, sorting, search, bulk actions, related records, activity panel, AI panel, mobile behavior, empty/loading/error states.

### Section 15 — Workflow Requirements

Step-by-step workflows: Create, Edit, Delete, Archive, Restore, Approve, Import, Export, Link, Share, AI process. Each includes: Trigger, Actor, Steps, System Behavior, Result, Error Behavior.

### Section 16 — API Requirements

Expected endpoints (CRUD, search, filter, bulk, import, export, related records, webhooks, AI processing). Request/response shapes. Pagination. Rate limits.

### Section 17 — Search / Indexing Rules

Searchable fields, filterable fields, sortable fields, full-text indexing, semantic/vector indexing, OCR indexing, permission-aware search, ranking logic.

### Section 18 — AI Requirements

What AI can read, generate, suggest, modify. What requires approval. Confidence score rules. Audit trail. Prompt templates. Model/provider abstraction. Privacy exclusions.

### Section 19 — OSS / Build-vs-Buy Decision

Built native, integrated with OSS, embedded library, self-hosted service, or hybrid. Include: OSS name, license, what {APP_NAME} uses, skips, replaces. Data flow. Risks. Upgrade strategy.

### Section 20 — Integration Map

Table: Capability | Direction | Data Flow. Events produced. Events consumed. Failure behavior.

### Section 21 — Notifications / Activity

Events that create notifications or activity log entries. Notification rules (who gets notified, when, how).

### Section 22 — Non-Functional Requirements

**Performance:** Max records, page load targets, search response targets, upload limits, rate limits.

**Accessibility:** Keyboard navigation, screen reader labels, color contrast, focus states, ARIA labels, mobile usability.

**Security / Privacy:** Sensitive fields, encryption, audit logging, access control, data retention, export rules.

### Section 23 — Reporting / Analytics

What should be measurable. Examples: item counts, completion rates, usage metrics, AI usage per capability.

### Section 24 — Migration / Import / Export

Import formats, export formats, required mapping fields, deduplication rules, validation rules, rollback behavior.

### Section 25 — Open Questions

Unresolved items. Each marked: Must Answer Before Dev | Can Defer to MVP | Future Decision | Resolved.

### Section 26 — Risks & Decisions

**Risks:** Technical, product, UX, security, OSS dependency, scope creep, data migration risks with mitigation.

**Decisions Made:** Mini decision log. Decision + Reason + Date.

### Section 27 — Verification & Testing

**Acceptance Criteria:** Checkbox list of conditions for capability acceptance.

**Testing Requirements:** Unit tests, integration tests, permission tests, API tests, UI tests, search tests, AI tests, import/export tests.

### Section 28 — Readiness Gate

```
Capability is Ready for Development only when:
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
[ ] Open questions resolved or explicitly deferred
[ ] Risks documented
[ ] Final decisions recorded
```

---

## 8. Section Sizing Targets

| Section | Target |
|---|---|
| §5 User Stories | 8-15 stories |
| §6 Use Cases | 6-15 entries |
| §8 Feature List | 15-30 features |
| §9 Business Rules | 10-30 rules |
| §19 OSS Notes | 5-12 notes |

---

## 9. Markdown Style Rules

- Use clean Markdown.
- Use numbered sections exactly as defined in the template.
- Use tables for features, fields, permissions, integrations, and open questions.
- Use simple, direct requirement language.
- Avoid marketing language.
- Avoid long paragraphs when a table is clearer.
- Do not mention competitor/source product names in final PRD text.
- Use `{APP_NAME}` variable — never hardcode the application name.
