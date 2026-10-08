# Wiki PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Wiki |
| **Capability ID** | wiki |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST store structured, hierarchical knowledge in a searchable, linkable format.

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

Source feature area(s): Knowledge Graph

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Block-based outliner — every bullet is a first-class object** | 🔵 Planned | Use case: Traditional notes treat the page as the atomic unit — you write a note, then link notes together. A block-based outliner treats every individual bullet point as a discrete, addressable object. In Plenix's Knowledge Graph mode, every bullet can be: referenced from anywhere else in the system (embed a specific bullet in another note without duplicating it), linked to (a backlink is automatically created on the source block), tagged, queried, and zoomed into (click any bullet to treat it as its own page with its own children). This structure means a note about a supplier can reference a specific paragraph from a market research note, a task, and a journal entry simultaneously — and all three links show up as backlinks on the original block. The outliner is hierarchical (parent–child indentation) and collapsible — parent blocks can be expanded to show children or collapsed to a single line for a high-level view. This is the Logseq / Roam Research model applied natively within Plenix. |
| F02 | **Bidirectional links — automatic backlinks with [[double brackets]]** | 🔵 Planned | Typing [[page name]] anywhere in a note or block creates a link to that page and simultaneously creates a backlink on the target page. The backlink is automatic — the user does not need to go to the target page and manually add a reference back. Every page in Plenix's knowledge graph has a Linked References section at the bottom showing every block across the entire system that references it. This is the defining feature of networked note-taking: ideas connect in both directions, so the user can navigate from a concept to every place it appears across their notes, tasks, projects, and journal — not just from the source to the target. Block-level linking is also supported: [[page name#block-id]] links to a specific bullet within a page, enabling fine-grained cross-referencing. |
| F03 | **Graph view — visual knowledge map** | 🔵 Planned | The Graph view renders every page and block in the knowledge base as a node, with links between them as edges. The result is an interactive visual map of how ideas connect. Nodes are sized by the number of connections (more-linked nodes appear larger). The user can click any node to navigate to that page. Filters allow the user to show/hide nodes by tag, by date range, or by connection count — useful for decluttering a large graph. The graph reveals patterns that are invisible in a folder-based system: clusters of tightly interconnected notes (a dense knowledge area), orphaned nodes (notes with no links — candidates for deletion or integration), and bridge nodes (notes that connect otherwise separate clusters). The graph is a diagnostic and navigation tool, not just a visual novelty. |
| F04 | **Daily journal — chronological capture with automatic date pages** | 🔵 Planned | Every day, Logseq automatically opens a fresh daily page dated to today. Plenix's Knowledge Graph mode replicates this: a dedicated Journal section creates a new dated page each day (e.g. 'March 5, 2026') where the user can write anything — a free-form brain dump, a meeting note, a quick task, an idea. Because everything written on the daily page is a block, any bullet can be tagged with [[page name]] to link it to a topic page. The next time the user opens the topic page, that daily journal entry appears in its backlinks. Over time, the daily journal becomes a searchable, cross-referenced archive of thinking — not just a diary. The user can navigate back through any previous day. This combines the benefits of chronological journaling (easy capture) with the benefits of a knowledge graph (retroactive organization through links). |
| F05 | **Block references and block embeds** | 🔵 Planned | A block reference inserts a read-only copy of a specific block (bullet) from anywhere in the system into the current page. It looks like a quoted excerpt but it is live — if the original block is edited, the reference updates everywhere it is embedded. A block embed is similar but renders the block's full content including all its children (a sub-outline). Use cases: referencing a supplier's key specification in both a project plan and a purchasing note without duplicating it; embedding a meeting action items block in both the meeting note and the relevant project page; referencing a specific task's status in a weekly review note. Block references are created with ((block-id)) syntax. All block references are tracked — the original block's backlinks show every place it has been referenced or embedded. |
| F06 | **Datalog-style queries — filter and surface content across the graph** | 🔵 Planned | Use case: The user wants to answer questions like 'show me all blocks tagged #supplier that were created this week', or 'list all tasks that are TODO and linked to the Kitchen project'. Plenix's Knowledge Graph supports structured queries that filter across all blocks in the system using a Datalog-inspired syntax. Queries can filter by: page name or tag, block property values, creation or modification date, task status, and link relationships. The result is a live view — a dynamic table or list that updates automatically as new matching content is created. Queries are embedded directly in any note page as a block, so a project page can contain a live query showing all currently open tasks linked to that project. This transforms the knowledge base into a queryable database without requiring the user to manually maintain lists or dashboards. |
| F07 | **PDF annotation — highlight and link directly to notes** | 🔵 Planned | PDFs can be dragged into the knowledge base and opened in a built-in PDF viewer. The user can highlight any text passage in the PDF — the highlight is saved as a block in the associated note, including: the highlighted text, the page number, and a link back to the exact position in the PDF. Clicking the link in the note jumps back to that location in the PDF. This makes Plenix's Knowledge Graph an academic-research-grade tool: the user can read a supplier specification, highlight the key technical requirements, and have those highlights automatically appear as linked blocks in their project notes. All annotations are stored locally alongside the PDF and are fully searchable. Zotero integration (for academic users) can import citation metadata alongside PDFs. |
| F08 | **Flashcards with spaced repetition** | 🔵 Planned | Any block in the knowledge base can be converted to a flashcard with a single action. The front of the card is the block content; the back is its children (the answer or explanation). Flashcards use a spaced repetition algorithm (similar to Anki's SM-2) to schedule reviews — cards the user answers correctly are shown less frequently, cards answered incorrectly are shown more often. A daily review session surfaces the day's due cards. The review UI is minimal: front of card shown, user self-rates their recall (Again / Hard / Good / Easy), the algorithm schedules the next review. Flashcards remain linked to their source page — studying a flashcard is one click away from its full context in the knowledge graph. This makes the flashcard system genuinely useful for any domain: vocabulary, supplier specifications, product knowledge, regulatory requirements. |
| F09 | **SQLite DB version — performance for large knowledge bases** | 🔵 Planned | The original file-based knowledge graph (storing notes as plain Markdown files) has a practical performance ceiling — graphs with more than 2,000 pages experience slow load times. Logseq addressed this with a SQLite-backed DB version in 2025–2026. Plenix's Knowledge Graph uses SQLite storage from the start, avoiding the performance ceiling entirely. The trade-off Logseq faced (abandoning portable plain-text files) is handled differently in Plenix: the knowledge graph data is stored in SQLite for performance, but a Markdown export function generates a portable plain-text version of the entire graph on demand. This gives the user both performance (SQLite) and portability (Markdown export) without choosing between them. Real-time collaboration (RTC) is possible with the database backend in a way that file-based systems cannot support. |
| F10 | **Whiteboard — spatial canvas linked to the knowledge graph** | 🔵 Planned | The Whiteboard is a free-form canvas where blocks, pages, and new content can be arranged spatially. Unlike standalone whiteboard tools, Plenix's whiteboard is deeply integrated with the knowledge graph — blocks placed on the canvas remain connected to their original locations, changes sync bidirectionally, and entire pages can be embedded as cards on the canvas. Use cases: visualizing the structure of a complex project by dragging related pages and blocks into clusters; mapping relationships between suppliers, products, and certifications; creating a presentation layout while maintaining live links to the underlying notes. The canvas supports: text boxes (new blocks created directly on canvas), sticky notes, shapes, arrows with labels, and image embeds. The whiteboard is an alternative view into the knowledge graph, not a separate silo. |
| F11 | **Plugin ecosystem — extend with community and custom plugins** | 🔵 Planned | The knowledge graph supports a plugin API that allows community-developed and user-written plugins to extend functionality. Logseq's plugin ecosystem (on which this is inspired) includes plugins for: enhanced task management, Pomodoro timers, Zotero citation import, GitHub issue sync, custom themes, spaced repetition enhancements, and many workflow-specific tools. Plenix's plugin API exposes: block creation and editing, page creation and linking, UI injection (adding buttons, panels, and sidebar items), query execution, and connection to Plenix's other sections (create a task from a plugin, add a calendar event, look up a contact). Plugins are installed from a marketplace and sandboxed for security. Users can also write custom plugins in JavaScript using the documented API. |

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

1. **Wiki.js is the primary self-hosted wiki module (AGPL — embed/self-host).** Deploy Wiki.js on Plenix infrastructure as the backing engine for structured, hierarchical knowledge pages. It provides Markdown rendering, multi-language support, full-text search, and a Git storage backend out of the box. Study its page-tree data model, permission system, and storage adapter pattern when designing Plenix's own wiki data layer.

2. **Outline is a design reference only — do not embed or self-host commercially (BSL license).** Outline's Business Source License prohibits commercial self-hosting until the 4-year conversion window passes. Use Outline solely as a UI/UX reference: its editor chrome, page hierarchy sidebar, real-time collaboration affordances, and inline comment patterns are all worth studying and adapting. Do not ship any Outline code in Plenix.

3. **Logseq is the reference for linked knowledge patterns (AGPL — reference only).** Study Logseq for bidirectional link mechanics, block-level addressing, graph-view rendering, daily journal patterns, and the DB-version SQLite architecture. Logseq's plugin API surface is also a useful benchmark for Plenix's own plugin contract. Do not embed Logseq; build these patterns natively using Logseq as the conceptual blueprint.

4. **Architectural decision — SQLite-backed block store from day one.** Do not start with a flat-file Markdown store. Logseq's migration from files to SQLite (2025–2026) demonstrated the performance ceiling of file-based graphs at scale (~2,000 pages). Plenix's knowledge graph uses SQLite for block and link storage from the start. Expose a Markdown export function for portability so users are never locked in.

5. **Integration pattern — wiki pages as first-class objects in the shared data model.** Wiki pages must be referenceable from tasks, calendar events, contacts, and projects using the same `[[double-bracket]]` link syntax used across the knowledge graph. The link resolver must be a shared service, not a wiki-specific module, so any capability can link to any other.

6. **Git storage backend (Wiki.js feature) — evaluate carefully before exposing to end users.** Wiki.js supports a Git backend where every page edit is a commit. This is architecturally appealing (version history, conflict resolution, offline sync) but adds operational complexity (Git repo management, merge conflict UX, large binary handling). Evaluate whether Plenix's wiki exposes Git directly or provides its own version-history abstraction backed by SQLite change tables.

7. **Full-text search — use Wiki.js's built-in search or delegate to a shared search service.** Wiki.js ships with Elasticsearch, Postgres, and SQLite search adapters. If Plenix runs a unified search service across all capabilities (recommended), the wiki should feed its index to that shared service rather than maintaining a separate search silo. Avoid duplicate indexes.

8. **Warning — AGPL license obligations for Wiki.js.** AGPL requires that any user who interacts with the software over a network must be able to receive the complete corresponding source code. If Plenix modifies Wiki.js and deploys it as a service, those modifications must be made available. Maintain a clean fork boundary: do not intertwine Plenix proprietary code with Wiki.js internals. Keep modifications minimal and well-documented to simplify AGPL compliance.

9. **Warning — platform fragility for real-time collaboration.** Real-time collaborative editing (multiple users on the same page simultaneously) requires a CRDT or OT layer (e.g., Yjs, Automerge). Wiki.js does not natively support real-time co-editing. If Plenix commits to real-time collaboration (as Outline demonstrates), plan to integrate Yjs with the SQLite backend independently — do not assume Wiki.js will provide this.

10. **What Plenix builds natively.** The block-level outliner (F01), bidirectional link resolution (F02), graph view (F03), daily journal (F04), block references and embeds (F05), and datalog-style queries (F06) are all built natively — they are not features of Wiki.js and cannot be delegated. Wiki.js provides the structured-page layer (hierarchical pages, Markdown rendering, auth integration, search indexing). The knowledge-graph layer above it is entirely Plenix's own work.

11. **What Plenix defers to a service.** PDF rendering and annotation (F07) can defer to an open-source PDF.js integration or a Mozilla PDF.js embed rather than building a renderer from scratch. Spaced repetition scheduling (F08) can adopt the SM-2 algorithm directly (public domain) without a third-party service. Plugin sandboxing (F11) should defer to an established iframe or Web Worker isolation pattern rather than building a custom sandbox.

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
