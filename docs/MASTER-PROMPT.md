# MASTER PROMPT — Capability PRDs

You are creating formal internal PRD capability documents for a generic custom bookmark management system.

The source material may include help pages, extension files, developer/API documentation, screenshots, competitor behavior, or runtime observations. Use those sources only as research evidence to infer product behavior, schema, constraints, fields, rules, and edge cases.

Do not write the final PRD as API documentation, competitor documentation, or reverse-engineering notes. Write it as if these are native requirements for our own product.

Use **00-conventions.md** as the controlling style and terminology guide.

The **01-bookmarks-prd.md** file is the reference for section depth and subsection layout. New capability PRDs SHOULD match its level of specification detail, adjusted for the capability's natural scope.

---

## Required Output

Produce a standalone Markdown PRD file.

Filename format:

```txt
capability-name-prd.md
```

Examples:

```txt
bookmarks-prd.md
tags-prd.md
time-tracking-prd.md
```

---

## Global Rules

### 1. Conventions Reference

Each PRD must include:

```md
## Requirement Language

This PRD uses the shared requirement language, status legend, terminology rules, and cross-capability reference rules defined in **00-conventions.md**.
```

Do **not** repeat the full conformance table or status legend in every PRD.

### 2. Product Language

Use source-aligned product terminology for this documentation pass.

Do not invent alternate labels unless the source term is clearly branded or the user explicitly requests a rename.

Use these terms exactly:

- Bookmarks
- Collections
- Tags
- Highlights
- Trash
- Web archive
- Favorite

A Bookmark means a saved item.

A Collection means a grouped category/folder used to organize multiple bookmarks/files. Use **Collection**, not Folder, unless a source screen specifically says folder.

A Favorite means a bookmark marked to keep it close at hand.

Use Favorite UI terms:

- Favorite
- Mark as favorite
- Remove favorite

The internal schema may use:

```ts
important?: boolean;
// false or missing = not marked as favorite
// true = marked as favorite
```

Do not replace Favorite with Star, Priority, Important, or another label during this documentation pass.

Web archive means a saved copy of content. It does not mean Gmail-style archive-as-hide unless a separate Archive-as-hide feature is later defined.

### 3. Source Material Use

Use source material only as evidence.

Do not write:

- “API docs say…”
- “The endpoint is…”
- “Developer docs define…”
- `GET /...`
- `POST /...`

Instead write:

- “The system MUST…”
- “The internal service MUST support…”
- “The [capability noun] service SHOULD…”
- “The system response MUST include…”

When source material does not specify a behavior, do not invent precise behavior. Mark gaps as **🔴 Not Defined** or **🟠 Product Decision** in Open Questions / Product Decisions.

If behavior is inferred, mark it clearly as inferred or put it in Open Questions.

### 4. Core Operations

Create, Edit, Delete, and Search are required baseline operations for every capability where applicable.

They must exist in the application.

They are not value-added roadmap features.

If handled by a shared/core application framework, reference the shared application behavior rather than redefining it.

Feature lists must focus on value-added behavior beyond Create, Edit, Delete, and Search.

### 5. Section Sizing Targets

Use these targets to gauge whether sections are thorough enough. Narrow capabilities may be smaller; broad capabilities may be larger. Do not pad with minor variations.

| Section | Target |
|---|---|
| §3 Features | 15–30 entries |
| §4 Use Cases | 6–15 entries |
| §5 Functionality | 5–15 numbered subsections |
| §7 Scenarios | 15–30 entries |
| §9 Enablers | 10–25 entries |
| §13 Implementation Notes | 8–12 numbered notes |

### 6. Capability Boundaries

Each PRD defines one capability deeply.

Do not overload one capability with full rules from related capabilities.

Use cross-capability references in this exact form:

```txt
see [Capability Name] PRD
```

Examples:

- see Tags PRD
- see Collections PRD
- see Search & Filters PRD

Do not use filenames or numbers in cross-capability references.

---

## Required PRD Structure

Use this exact structure:

```md
# NN — [Capability Name] PRD

**Document type:** Product Requirements Document / Capability Specification
**Capability name:** [Capability Name]
**Product language:** Generic bookmark management tool
**Spec status:** Draft / Canonical / Review

---

## Requirement Language

This PRD uses the shared requirement language, status legend, terminology rules, and cross-capability reference rules defined in **00-conventions.md**.

## 0. Dependency Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|

### Related Capabilities

| Capability | Relationship |
|---|---|

## 1. Capability

The system must be able to [one-sentence capability statement].

## 2. Baseline Operations

Create, Edit, Delete, and Search are required core application operations for this capability.

| Operation | Required Behavior | Shared/Core Handling |
|---|---|---|
| Create |  |  |
| Edit |  |  |
| Delete |  |  |
| Search |  |  |

## 3. Features

Value-added behavior beyond Create, Edit, Delete, and Search.

Aim for 15–30 feature entries when the capability scope supports that depth.

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 |  | ✅ Built / Required |  |
| F02 |  | 🔵 Planned |  |
| F03 |  | 🔴 Not Defined |  |

Status values:
- ✅ Built / Required
- 🔵 Planned
- 🔴 Not Defined
- 🟠 Product Decision
- ⚪ Capability Split
- ✅ Decided

## 4. Use Cases

Aim for 6–15 use cases per capability. Fewer is acceptable for narrow capabilities; more is acceptable for broad capabilities.

### UC-01 — [Use Case Name]

| Item | Detail |
|---|---|
| Actor |  |
| Goal |  |
| Main Flow | 1. … 2. … 3. … |
| System Response |  |
| Alternate Flow |  |

## 5. Functionality

System behavior details behind features. Explain logic, rules, outcomes, fallback behavior, validation, indexing, sync behavior, background jobs, and cross-capability interactions.

Aim for 5–15 numbered functionality subsections.

Use numbered subsections:

### 5.1 [Functionality Area]

| Rule | Behavior |
|---|---|

## 6. Internal System Rules and Constants

This section replaces API-reference language.

Use internal product language only.

Replace “[Capability Noun]” with the current capability noun in subsection titles. For example:
- Internal Bookmark Service Capabilities
- Internal Collection Service Capabilities
- Internal Tag Service Capabilities

Include where relevant:
- internal service capabilities
- response conventions
- error/condition handling
- throttling rules
- reserved IDs
- sort values
- batch limits
- system rules
- internal action types

## 7. Scenarios

Aim for 15–30 scenarios when the capability scope supports that depth.

| Scenario | Expected Behavior |
|---|---|

Include unsupported data, missing permissions, partial failures, deleted/missing parent entities, duplicate conditions, broken references, sync conflicts, permission/access issues, and fallback behavior where relevant.

## 8. Specification

Include exact fields, types, required/optional status, constraints, rules, and design notes.

Required subsections, in this order:

### 8.1 Field Rules

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|

### 8.2 Enums

Use TypeScript-style code blocks where useful.

### 8.X Internal Inputs / Commands

A PRD MAY add additional subsections between Enums and Entity / Schema for distinct command or input shapes, for example:

- single-create input
- single-update input
- bulk-create input
- bulk-update input
- internal action types

Group these logically. Use them when the field sets differ meaningfully between shapes; do not split if the shapes are identical.

### 8.Y Entity / Schema

Use TypeScript-style code blocks where useful.

### 8.Z Schema Invariants

Schema Invariants MUST be the last subsection of §8.

Use MUST / MUST NOT / SHOULD language.

Examples:
- ID fields MUST be immutable after creation.
- Required references MUST point to valid existing entities.
- Empty values used as update instructions MUST NOT be persisted as stored records.
- System collection behavior MUST be enforced server-side, not only hidden in UI.

## 9. Enablers

Technical/internal work needed to support the capability. These are not user-facing features.

Aim for 10–25 enabler entries when the capability scope supports that depth.

| Enabler | Purpose |
|---|---|

## 10. UI

### 10.1 Screens

| Screen | Purpose |
|---|---|

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|

Use user-facing names only.

## 11. Modules

Group modules by layer.

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

## 12. Open Questions / Product Decisions

| Question | Status | Notes |
|---|---:|---|

Use:
- ✅ Decided
- 🔴 Not Defined
- 🟠 Product Decision
- 🔵 Planned
- ⚪ Capability Split

Make every open question actionable.

## 13. Implementation Notes for a Custom Tool

Use a numbered list.

Aim for 8–12 notes.

Cover naming guidance, shared operation handling, schema naming guidance, cross-capability boundaries, UI wording notes, server-side enforcement notes, testing implications, and implementation risks.
```

---

## Capability PRD File List

Files are named by capability ID: `{capability-id}-prd.md`.

### Conventions

```txt
00-conventions.md
```

### Universal Layer — Platform (7)

```txt
about-prd.md
activity-prd.md
dashboard-prd.md
navigation-prd.md
projects-prd.md
search-prd.md
settings-prd.md
```

### Universal Layer — Communication (4)

```txt
calendar-prd.md
contacts-prd.md
email-prd.md
messaging-prd.md
```

### Universal Layer — Productivity (7)

```txt
forms-prd.md
goals-prd.md
habits-prd.md
journal-prd.md
notes-prd.md
tasks-prd.md
templates-prd.md
```

### Universal Layer — Files (2)

```txt
files-prd.md
smart-file-naming-prd.md
```

### Universal Layer — Media (4)

```txt
audio-prd.md
digital-asset-management-prd.md
images-prd.md
video-prd.md
```

### Universal Layer — Knowledge (12)

```txt
bookmarks-prd.md
books-prd.md
browser-extension-mobile-capture-prd.md
capture-prd.md
duplicates-broken-links-prd.md
highlights-prd.md
import-export-backup-prd.md
reader-articles-prd.md
sharing-collaboration-prd.md
tags-prd.md
web-archive-prd.md
wiki-prd.md
```

### Universal Layer — AI (7)

```txt
ai-agents-prd.md
ai-chat-prd.md
automations-prd.md
connectors-prd.md
model-selection-prd.md
prompt-studio-prd.md
voice-input-prd.md
```

### Universal Layer — Finance (3)

```txt
bookkeeping-prd.md
expenses-prd.md
income-prd.md
```

### Universal Layer — Utilities (2)

```txt
password-manager-prd.md
translation-prd.md
```

### Client Layer — Pipeline (11)

```txt
client-portal-prd.md
contracts-prd.md
deals-prd.md
estimates-prd.md
invoices-prd.md
leads-prd.md
payments-prd.md
proposals-prd.md
rate-cards-prd.md
scheduling-prd.md
services-prd.md
```

### Project / Work Layer — Marketing (5)

```txt
analytics-prd.md
campaigns-prd.md
channels-prd.md
content-calendar-prd.md
mood-boards-prd.md
```

### Project / Work Layer — Project Control (9)

```txt
changes-prd.md
issues-prd.md
purchase-orders-prd.md
resourcing-prd.md
risks-prd.md
roadmap-prd.md
suppliers-prd.md
time-tracking-prd.md
timesheets-prd.md
```
