# Notes PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Notes |
| **Capability ID** | notes |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Full specification with features, functionality, scenarios, and enablers |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST enable users to capture, organize, retrieve, and act on written information in any context.

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

### UC-01 — Post-meeting note cleanup

| Item | Detail |
|---|---|
| Actor | Individual user (meeting attendee). |
| Goal | Convert rough, unstructured meeting notes into a clean, shareable document and promote action items to tasks — in under 60 seconds. |
| Main Flow | 1. User opens Notes and creates a new note (or opens one pre-populated from a calendar event). 2. User types or pastes raw, unstructured notes during or after the meeting. 3. User selects a meeting template (e.g. "Customer Discovery") from the AI Notepad toolbar. 4. User taps "Clean up notes." 5. AI processes the raw input against the template schema and replaces the content with a structured document. 6. User reviews the structured output, makes minor edits. 7. User taps "Create tasks" — each action item becomes a linked task. |
| System Response | AI output is placed in the same note with an undo option. A "Tasks created" badge appears listing linked tasks. The note's status indicator shows "Saved." |
| Alternate Flow | If the user did not select a template, the AI uses a generic structure (Decisions, Action items, Context, Next steps). If the save fails, the status indicator shows an error state with a Retry button and the unsaved content is preserved in local state. |

### UC-02 — Quick capture and retrieval

| Item | Detail |
|---|---|
| Actor | Individual user. |
| Goal | Capture a note quickly and find it again later by content, date, or project. |
| Main Flow | 1. User creates a new note, types content, and optionally links it to a project. 2. Note is auto-saved within 500 ms of last keystroke. 3. Days later, user opens Notes and types a keyword in the search bar. 4. Full-text search returns the note with matching terms highlighted. |
| System Response | Search results are ranked by recency by default; the user can switch to relevance ranking. |
| Alternate Flow | If the note was captured via the browser extension, it is also searchable by source URL. |

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

Value-added behavior beyond Create, Edit, Delete, and Search.

Source feature area(s): Notes

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Two-pane notes layout** | ✅ Built / Required | Notes screen splits into a left list and a right preview pane. The list shows note title, first-line preview, folder label, tags, and date. Clicking a note renders its content in the right pane. Selected note is highlighted with the accent selection background. |
| F02 | **Rich-text editor — headings, formatting, lists, code blocks** | 🔵 Planned | Notes are created using a rich-text editor supporting: Headings (H1–H3), Bold, italic, and underline, Ordered lists (numbered), Unordered lists (bulleted), Checklists (interactive checkboxes within the note body — useful for meeting agendas or packing lists), Blockquotes (indented quoted text with a left border), and Code blocks with syntax highlighting (identifies the language from the first line — JavaScript, Python, SQL, etc.). The editor is a contenteditable div with a formatting toolbar above it, replacing the plain textarea in the current implementation. All formatting is stored as structured JSON (similar to a ProseMirror document model) rather than raw HTML, making it portable and safe to render in different contexts. |
| F03 | **Auto-save with status indicator** | 🔵 Planned | Notes are saved automatically during editing using a debounce mechanism — the save fires 500ms after the user stops typing, so rapid keystrokes do not trigger dozens of saves. A status indicator in the editor's top-right corner shows three states: Editing (unsaved changes present), Saving... (debounce fired, save in progress), and Saved (with a timestamp — 'Saved 2 minutes ago'). If the save fails (network error, storage error), the indicator shows an error state with a Retry button. Auto-save means the user never needs to press a Save button. The editor is always in a consistent saved state within 500ms of any change. |
| F04 | **Pinned notes — quick access to important notes** | 🔵 Planned | Any note can be pinned. Pinned notes appear in a dedicated Pinned section at the top of the notes list, above all other notes, regardless of date or folder. The pin is toggled from the note's action menu (three-dot menu on the list row or in the editor toolbar). Multiple notes can be pinned simultaneously. Pinned notes are useful for: a current project's main reference note, a meeting template that is re-used frequently, a personal OKR or goal document that the user refers to daily. Unpinning moves the note back to its chronological position in the list. |
| F05 | **Project association — notes linked to projects** | 🔵 Planned | Any note can be linked to a project. The link is set from a Project field in the note metadata panel (accessible from the editor's sidebar or a dropdown in the note action menu). Once linked: the note appears in the Project Detail's Notes tab alongside other project notes, a colored project badge appears on the note in the list view, and the note is findable by filtering the notes list by project. A note can only be linked to one project but can have multiple tags. Project-linked notes are also shown in the Project Overview mini widget on the dashboard. Notes created from calendar events (event-linked notes) are automatically linked to the event's associated project if one exists. |
| F06 | **Full-text search across all notes** | 🔵 Planned | The search bar in the Notes section searches across the full text of every note — not just titles. Typing a word finds all notes where that word appears anywhere in the content. Search results are highlighted with the matching terms bolded in the preview. Results are ranked by recency (most recently edited first) with an option to rank by relevance (number of matches). Search is also accessible from the global header search bar, which returns note results alongside tasks, contacts, and files. For users with the browser extension installed, notes whose body text was captured from a web page are also searchable by URL. |
| F07 | **Date-based grouping and chronological browsing** | 🔵 Planned | Notes in the list view are grouped by date: Today, Yesterday, This week, Last week, Earlier this month, and then by month for older notes. Within each group, notes are sorted by most recently modified. This makes it easy to find a note from a specific time period by scrolling rather than searching. The user can switch to Alphabetical sort (by title, A–Z), or Folder sort (grouped by folder/collection). Date grouping is the default because it mirrors how people actually remember notes — by when they were written, not by name. |
| F08 | **Note editor toolbar and word count** | 🔵 Planned | A formatting toolbar appears above the editor with buttons for: Bold (Cmd/Ctrl+B), Italic (Cmd/Ctrl+I), Underline (Cmd/Ctrl+U), Heading level selector (H1/H2/H3), Bullet list, Numbered list, Checklist, Blockquote, Code block, Insert link, and Clear formatting. A live word count and character count sit in the bottom-right corner of the editor, updating with each keystroke. The toolbar is sticky — it stays visible when the note is long and the user scrolls down through the content. |
| F09 | **AI note processing — raw input to structured output** | 🔵 Planned | Use case: The user types rough, unstructured notes during a meeting — fragmented sentences, bullet dumps, shorthand, half-finished thoughts — and wants them transformed into clean, readable documentation without manual reformatting. The AI Notepad mode accepts raw note content and processes it into structured output with a single action ('Clean up notes' button in the editor toolbar or a keyboard shortcut). The AI: identifies and separates different types of content (decisions made, action items, questions raised, context/background, next steps), applies consistent formatting (headings, bullets, bold for key names), removes filler words and redundancy, and preserves all substantive content without inventing anything that was not present in the raw input. The output is placed in the same note, replacing the raw content (with an undo option to restore the original), or in a new note linked to the original as a 'cleaned version'. |
| F10 | **Meeting note templates — structured sections per meeting type** | 🔵 Planned | Use case: Different meetings have different structures. A customer discovery call needs different sections than a one-on-one, a sprint planning session, or a supplier negotiation. Meeting templates define the section structure that the AI uses when processing notes. Built-in templates: Customer Discovery (sections: Customer background, Problem being solved, Current solution, Key pain points, Opportunities, Follow-ups), User Interview (Participant, Context, Questions asked, Key insights, Quotes, Action items), One-on-One (Wins since last meeting, Current blockers, Priorities this week, Career/growth discussion, Action items), Supplier Meeting (Supplier name and contact, Products discussed, Pricing discussed, Lead times, Sample requests, Follow-up actions), Sprint Planning (Goals for sprint, Stories committed, Dependencies, Risks, Action items), and Post-mortem (What went well, What went wrong, Root causes, Action items). The user selects a template before or after writing raw notes. The AI uses the template's section structure as the output schema. Templates are fully customizable — the user can rename sections, add new sections, reorder them, or create a template from scratch. |
| F11 | **Action item extraction and task creation** | 🔵 Planned | After AI processing, the structured note contains an Action Items section listing every task that was identified in the raw notes. A 'Create tasks' button in the processed note converts each action item into a real task in the Tasks section, pre-filled with: the action item text as the task title, the meeting date as the creation date, and (if detectable from the text) a due date and an assignee linked to the People section. Each created task is linked back to the source note — the task's detail panel shows 'From meeting note: [note title]', and the note shows a 'Tasks created' badge listing the linked tasks. This closes the loop between note-taking and task management — action items from a meeting do not stay buried in notes; they become trackable tasks with one click. |
| F12 | **Calendar event linking — meeting context in notes** | 🔵 Planned | When creating a new note from a calendar event (via the Event-linked notes feature in Calendar), the AI Notepad automatically pre-populates the note with context from the event: the meeting title, date and time, attendees (from the event's guest list, linked to contacts in the People section where they match), and the event description or agenda. This gives the note a structured starting point before the meeting begins. During or after the meeting, the user adds their raw notes below the pre-populated context. When the AI processes the note, it uses the attendee names and agenda topics as additional context to produce more accurate section headings and action item attributions (e.g. 'Marcus to send revised proposal by Friday' is attributed to Marcus's contact record rather than appearing as an anonymous action item). |
| F13 | **Consistent output for teams — shared templates and standardized formats** | 🔵 Planned | In team environments, inconsistent note formats create friction — meeting notes from different team members are structured differently, making it hard to scan, search, or share them. Shared meeting templates (stored in the Snippet Library's Teams section or a dedicated Templates library) allow a team to define a standard note format once and have all members use it. When a team member opens the AI Notepad and selects a shared template, their notes are processed into the same structure as everyone else's. A team's customer discovery notes always have the same sections, making it easy to compare insights across calls. The template owner can update the template and the change is immediately available to all team members — no redistribution required. Notes produced from a shared template display the template name as a badge so team members can identify the format at a glance. |
| F14 | **Note integration — tasks, calendar, projects, journal** | 🔵 Planned | Notes can be bidirectionally linked to: Tasks (a note can be attached to a task as context; the task appears in the note's metadata as a linked task); Calendar events (notes created from events are linked back; a note icon appears on the event in calendar views); Projects (described above); and Journal entries (if the user journals, a note can be referenced from a journal entry, connecting a structured reference document with a personal reflection). These links are shown in a Related section at the bottom of each note, making it easy to navigate between connected content without losing context. |

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Auto-save

| Rule | Behavior |
|---|---|
| Debounce interval | Save fires 500 ms after the user stops typing. Rapid keystrokes do not trigger multiple saves. |
| Status states | Editor shows one of: Editing (unsaved), Saving... (in progress), Saved (with relative timestamp). |
| Save failure | Status shows an error state. A Retry button is displayed. Unsaved content is preserved in local state until retry succeeds. |
| No manual save | There is no Save button. The system is always in a consistent saved state within 500 ms of inactivity. |

### 5.2 Pinning

| Rule | Behavior |
|---|---|
| Pin location | Pinned notes appear in a dedicated "Pinned" section at the top of the list, above all date groups. |
| Pin limit | No limit on number of pinned notes. |
| Pin toggle | Toggle from the note's three-dot action menu in either list view or editor toolbar. |
| Unpin | Unpinning returns the note to its chronological position in the list. |

### 5.3 AI processing

| Rule | Behavior |
|---|---|
| Trigger | "Clean up notes" button in the editor toolbar or assigned keyboard shortcut. |
| No invention | AI must not add information that was not present in the raw input. It restructures, it does not fabricate. |
| Undo | After AI replacement, a single undo action restores the original raw content. |
| Template schema | If a template is selected, AI uses the template's section list as the output schema. If no template, AI uses the generic fallback schema. |
| Action item extraction | AI identifies action items in the structured output. These are surfaced with a "Create tasks" button. |

### System Constants

| Constant | Value | Purpose |
|---|---|---|
| AUTO_SAVE_DEBOUNCE_MS | 500 | Milliseconds after last keystroke before auto-save fires. |
| SEARCH_RESULT_DEFAULT_SORT | recency | Default ranking for full-text search results. |
| MAX_PREVIEW_CHARS | TBD | Max characters shown in the note list's first-line preview. |
| DOCUMENT_MODEL | Structured JSON (ProseMirror-compatible) | Storage format for rich-text note content — not raw HTML. |
| AI_FALLBACK_SCHEMA | Decisions / Action items / Context / Next steps | Default output structure when no meeting template is selected. |

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| User types quickly for 10 seconds then pauses | Auto-save fires 500 ms after the last keystroke. Status shows "Saving..." then "Saved." |
| Save fails due to network error | Status indicator shows error state. Retry button appears. Content is not lost. |
| User pins three notes | All three appear in a "Pinned" section at the top of the list in the order they were pinned. |
| User selects "Customer Discovery" template and taps "Clean up" | AI produces a structured document with sections: Customer background, Problem, Current solution, Pain points, Opportunities, Follow-ups. No content outside the raw input is added. |
| User taps "Create tasks" after AI cleanup | Each action item becomes a task in the Tasks section. Each task carries a "From meeting note: [title]" back-link. The note shows a "Tasks created" badge. |
| User creates a note from a calendar event | Note is pre-populated with meeting title, date/time, attendee names, and event description. Attendees are linked to matching contact records. |
| User searches "quarterly review" | Full-text search returns all notes containing that phrase. Matching terms are bolded in the preview. Results are sorted by most recently edited. |
| Team member opens a shared template | Note processing output uses the shared template's section schema. A template-name badge appears on the finished note. |

## 10. Data Model

```
Note {
  id:                UUID          PK
  title:             String        max 255
  body:              JSON          ProseMirror document
  body_text:         String        server-maintained plaintext index
  created_at:        Timestamp     immutable
  updated_at:        Timestamp     auto-updated
  pinned:            Boolean       default false
  project_id:        UUID?         FK → Projects
  calendar_event_id: String?       external event reference
  template_id:       UUID?         FK → Templates
  tags:              String[]
  source_url:        String?       browser-extension capture URL
}

Template {
  id:         UUID    PK
  name:       String
  sections:   String[]   ordered list of section headings
  is_shared:  Boolean    team-visible if true
  owner_id:   UUID    FK → Users
}
```

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| id | UUID | Yes | System-generated, immutable. | Primary key. |
| title | String | Yes | Max 255 chars. Derived from first H1 heading if not explicitly set. | Shown in list view. |
| body | JSON (ProseMirror document) | Yes | Structured document model. Not raw HTML. | Rich-text content of the note. |
| body_text | String | No | Plaintext extraction of body for full-text search indexing. | Maintained by the server; not user-editable. |
| created_at | Timestamp (UTC) | Yes | Immutable after creation. | Used for date-based grouping. |
| updated_at | Timestamp (UTC) | Yes | Updated on every save. | Drives "most recently edited" sort. |
| pinned | Boolean | No | Default: false. | Determines position in list (pinned section vs date groups). |
| project_id | UUID (FK → Projects) | No | Nullable. One note → at most one project. | Set from note metadata panel. |
| calendar_event_id | String | No | Nullable. External event ID from calendar integration. | Links note to originating calendar event. |
| template_id | UUID (FK → Templates) | No | Nullable. | Records which meeting template was used for AI processing. |
| tags | String[] | No | Each tag max 50 chars. No limit on count enforced at schema level. | Used for filtering in list view. |
| source_url | String | No | Nullable. Set when note is captured via the browser extension. | Enables URL-based search for browser-captured notes. |

## 12. Database / Schema Notes

### Enums

| Enum | Values | Usage |
|---|---|---|
| NoteListSort | recency, alphabetical, folder | Controls sort order of the notes list. Default: recency. |
| SaveStatus | editing, saving, saved, error | UI-only state machine for the auto-save indicator. |
| SearchRankMode | recency, relevance | Controls ranking of full-text search results. Default: recency. |

### Schema Invariants

| Invariant | Rule |
|---|---|
| body_text sync | body_text must always be a plaintext projection of body. It is never user-editable directly. |
| project uniqueness | A note may be linked to at most one project_id at a time. |
| template immutability on note | template_id on a note records which template was used; updating the template does not retroactively alter existing processed notes. |
| calendar pre-population | If calendar_event_id is set on creation, the system must pre-populate title, attendees, and event description before the note is first opened for editing. |

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
| Notes list + preview (two-pane) | Primary notes screen. Left pane: scrollable list grouped by date with title, first-line preview, folder label, tags, date. Right pane: rendered note content. |
| Note editor | Full editor view with formatting toolbar, content area, metadata sidebar, and auto-save status indicator. |
| Template selector | Modal or dropdown for choosing a meeting template before or during AI processing. |
| Template editor | Screen for creating, editing, and reordering sections in a custom meeting template. |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| NoteListRow | Displays note in the list: title, first-line preview (plain text), folder badge, tags, relative date. Highlighted with accent background when selected. |
| SaveStatusIndicator | Top-right of editor. Three-dot or text indicator cycling through Editing / Saving... / Saved (with relative timestamp) / Error + Retry. |
| FormattingToolbar | Sticky toolbar above the editor with buttons for all rich-text actions and a template/AI Notepad trigger. |
| WordCountBar | Bottom-right of editor. Live word count and character count. Updates per keystroke. |
| PinnedSection | Appears at the top of the notes list when one or more notes are pinned. Contains pinned NoteListRows. |
| DateGroupHeader | Non-interactive list separator: Today / Yesterday / This week / Last week / Earlier this month / [Month Year]. |
| RelatedPanel | Shown at the bottom of a rendered note. Lists bidirectional links to tasks, calendar events, projects, and journal entries. |
| TasksCreatedBadge | Appears on a note after action items have been promoted to tasks. Lists linked task titles inline. |
| ProjectBadge | Colored chip on a NoteListRow showing the linked project name. |

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
| NoteService | CRUD operations for Note entities. Enforces schema invariants. Maintains body_text index on every save. |
| NoteSearchService | Full-text search across body_text. Returns ranked results with highlight metadata. |
| AINotePadService | Receives raw note body and template schema. Calls the shared LLM service. Returns structured ProseMirror document. |
| ActionItemExtractor | Post-processes AI output to identify action items. Returns structured list for task promotion. |
| TemplateService | CRUD for meeting templates. Handles shared-template team-visibility rules. |
| CalendarNotePrePopulator | Resolves calendar_event_id → pulls event title, attendees, description. Pre-populates a new note body. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| WebCaptureHandler | Captures selected page content or full page text. Creates a new Note with source_url set to the current tab URL. |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| NoteEditor | ProseMirror-based rich-text editor. Manages local document state, debounced save dispatch, and toolbar actions. |
| NoteListView | Renders grouped, sorted notes list. Handles selection, pinning, and project/tag filters. |
| TemplateSelector | UI for browsing and selecting meeting templates before AI processing. |
| NoteMetadataPanel | Sidebar panel within the editor for setting project link, tags, template, and viewing related items. |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| MobileNoteEditor | Simplified rich-text editor optimized for touch input. Supports same formatting set as web editor. |
| MobileNoteList | Single-column list view with swipe actions for pin, delete, and project-link. |
| QuickCaptureWidget | Home-screen widget / share-sheet extension for rapid note capture from any app. |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| DocumentModel | ProseMirror schema definition shared across web, desktop, and mobile layers. Ensures consistent serialization. |
| FullTextIndexer | Maintains body_text as a plaintext projection of body JSON on every write. Used by NoteSearchService. |
| SyncLayer | Offline-first sync for notes — queues saves when offline, replays on reconnect. Handles conflict resolution (last-write-wins per note). |

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| Shared AI / LLM service | Powers AI Notepad processing, template-guided structuring, and action item extraction across all notes. |
| Full-text search index | Maintains body_text index for sub-second full-text search across all notes. |
| Debounced save infrastructure | Server-side save endpoint that handles rapid sequential writes gracefully (idempotent, last-write-wins per note). |
| Calendar integration adapter | Resolves calendar event IDs into attendee lists, titles, and agendas for event-linked note pre-population. |
| Contact resolution service | Matches attendee names/emails from calendar events to People records for attribution. |
| Template storage | Persistent storage for user-defined and team-shared meeting templates. |

## 19. OSS / Build-vs-Buy Decision

1. **Primary OSS reference — SiYuan (AGPL-3.0, reference only).** SiYuan is the closest architectural match to {APP_NAME}'s Notes capability: block-based document model, bidirectional links, native AI integration, iOS and Android mobile apps, E2EE, local-first storage, and built-in flashcards. Study SiYuan's block ID system, document JSON schema, and sync protocol as the primary design reference. Do not embed or redistribute SiYuan code — AGPL requires derivative works to be open source. Use it as a reference only.

2. **Secondary OSS reference — TriliumNext (AGPL-3.0, reference only).** TriliumNext's attribute system (custom key-value metadata on any note) is the best available reference for {APP_NAME}'s metadata-fabric concept — the idea that any note can carry structured metadata (project link, template used, source URL, tags) without schema migrations. Study TriliumNext's attribute API and tree navigation patterns. Same AGPL caveat: reference only, do not embed.

3. **Tertiary OSS reference — Logseq (AGPL-3.0, reference only).** Logseq's graph view, daily journal pattern, and backlink panel are the best available reference for bidirectional-link UX. If {APP_NAME} adds a graph view or journal-linked notes in a later phase, Logseq's implementation is the benchmark to study.

4. **License classification summary.**

   | Tool | License | Disposition |
   |---|---|---|
   | SiYuan | AGPL-3.0 | Reference only — do not embed, do not self-host as a service for users |
   | TriliumNext | AGPL-3.0 | Reference only |
   | Logseq | AGPL-3.0 | Reference only |
   | ProseMirror | MIT | Embed — safe to use as the editor engine in a commercial product |
   | TipTap (ProseMirror wrapper) | MIT (core) / Pro features proprietary | Embed MIT core; evaluate Pro license cost for advanced features |

5. **{APP_NAME} builds the document model natively — not via SiYuan or TriliumNext.** Notes data is owned and stored by {APP_NAME}'s own database. SiYuan is a design reference, not a deployed service. There is no SiYuan process running behind {APP_NAME}; there is no TriliumNext instance in the infrastructure. The AGPL exposure only arises from embedding source code, which does not happen here.

6. **Rich-text editor: embed ProseMirror or TipTap (MIT core).** ProseMirror is the safest embed choice — MIT-licensed, battle-tested by Notion, Linear, and others, and capable of the full formatting set required by F02 and F08. TipTap provides a friendlier API surface over ProseMirror and its core is also MIT. Evaluate TipTap Pro extensions only if required features are not available in the MIT core; Pro requires a commercial license.

7. **Block-level addressing is architecturally important and should be decided early.** SiYuan's core insight is that every block (every paragraph, heading, list item) has a stable UUID. This is what enables block-level bidirectional links, AI integration at paragraph granularity, and future features like transclusion. If {APP_NAME} wants these capabilities, the document schema must assign stable IDs to blocks from day one — retrofitting this later is expensive. Adopt a block-ID scheme in the initial document model even if block-level links are not in the MVP feature set.

8. **E2EE warning.** SiYuan supports end-to-end encryption for its sync. If {APP_NAME} ever advertises E2EE for notes (e.g. for sensitive meeting content), this is a significant engineering commitment: E2EE breaks server-side full-text search unless client-side search is implemented. Do not imply E2EE in marketing without explicit engineering sign-off. For MVP, notes are encrypted at rest on the server (standard) but not end-to-end encrypted.

9. **Calendar integration fragility warning.** Event-linked note pre-population (F12) depends on third-party calendar APIs (Google Calendar, Microsoft 365). These APIs change authentication scopes, rate limits, and webhook delivery without notice. The CalendarNotePrePopulator module must treat calendar data as best-effort: if the event cannot be resolved, the note opens blank rather than erroring. Build with graceful degradation from day one.

10. **AI processing must be idempotent and undoable.** The "Clean up notes" action replaces the note body with AI output. This is a destructive operation from the user's perspective. The undo stack must preserve the full pre-processing body so a single Ctrl+Z restores the original. Additionally, the server should store the pre-processing snapshot for a short retention window (e.g. 24 hours) as a recovery option in case the client undo stack is lost.

11. **Full-text search: build the index natively, do not defer to a third-party SaaS search service for MVP.** For the scale of a personal organizer (tens of thousands of notes per user), a server-side plaintext index maintained in the primary database (PostgreSQL full-text search, or SQLite FTS5 for local deployments) is sufficient and avoids an external dependency. Escalate to a dedicated search service (e.g. Typesense, Meilisearch) only if query latency becomes a problem at scale.

12. **Platform fragility: mobile rich-text editing is hard.** SiYuan ships native iOS and Android apps for a reason — contenteditable in a mobile WebView has known input method (IME) bugs for CJK languages and voice dictation. If {APP_NAME} ships mobile notes as a WebView wrapper, budget for IME testing and a fallback to a native text input for devices where the rich-text editor behaves poorly. A quick-capture path (plain text only, formatted later on desktop) mitigates the worst mobile friction without requiring a fully native editor in the MVP.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| Tasks | Action items extracted from notes are promoted to tasks; task records link back to source notes. |
| Calendar | Event-linked notes pull attendee lists, titles, and agenda from calendar events. |
| Projects | Notes are associated with projects; project detail shows linked notes. |
| People / Contacts | Attendee names from calendar events are resolved against the contacts database for attribution. |
| AI / LLM layer | AI Notepad processing, action item extraction, and template-guided structuring all depend on the shared AI service. |
| Snippet Library | Shared meeting templates for teams are stored in or alongside the Snippet Library. |
| Journal | Notes can be referenced from journal entries via bidirectional links. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| Tasks | Tasks created from action item extraction carry a "From meeting note" back-link to Notes. |
| Projects | Project detail's Notes tab is powered by this capability. |
| Calendar | Calendar events display a note-icon badge when a linked note exists. |
| Dashboard | The Project Overview mini widget surfaces project-linked notes via this capability. |
| Browser Extension | Web-captured notes are stored and searchable through this capability. |

### Related Capabilities

| Capability | Relationship |
|---|---|
| Journal | Bidirectional link — notes reference journal entries and vice versa. |
| Snippet Library | Shared team templates are co-managed; templates defined here drive note structuring. |
| Files | Attachments embedded in notes may eventually route through the Files capability. |

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
| Should notes support block-level addressing (every paragraph has a stable ID)? | Open | Required for deep AI integration and future bidirectional-link granularity. SiYuan implements this natively — adopt for Plenix if AI features warrant it. |
| Should the document model be ProseMirror or a custom block format? | Open | ProseMirror is the most battle-tested option. A custom block model (SiYuan/Notion-style) gives more addressability but higher implementation cost. |
| What is the conflict resolution strategy for collaborative real-time editing? | Open | MVP: last-write-wins. Future: OT or CRDT if multiplayer editing is prioritized. |
| Should Plenix support offline-first notes with full sync? | Open | Offline capture is high-value for mobile. Offline-first adds sync complexity. Decide before mobile implementation. |
| How many pinned notes before the list becomes unwieldy? Should there be a soft cap with a UI warning? | Open | No hard limit defined yet. UX decision. |
| Should tag taxonomy be freeform or controlled (predefined list with user additions)? | Open | Freeform is faster to implement; controlled improves searchability and consistency across team notes. |
| What is the maximum note body size supported? | Open | Needs a server-side limit to prevent unbounded storage. Suggested: 1 MB of JSON document body per note. |
| Should AI processing be streamed (tokens appear progressively) or batch (full output appears at once)? | Open | Streaming feels faster and more interactive. Batch is simpler to implement. UX preference drives this. |

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
