# Plenix Notes Native Capability Direction

## Capability: Native Notes Workspace

Plenix Notes MUST be built as a native Plenix capability, not as a fork, embedded deployment, or adapted base of SiYuan, Trilium, Memos, or any other full note application.

Plenix MUST own the Notes data model, permissions, anchors, search behavior, AI behavior, integrations, and cross-capability relationships.

## Capability Stack

| Layer | Choice |
|---|---|
| App/module base | Plenix-native |
| Editor engine | TipTap |
| Underlying editor model | ProseMirror |
| Block/workspace inspiration | SiYuan |
| Metadata/tree/relations inspiration | Trilium |
| Fast capture inspiration | Memos |
| Optional higher-level reference | BlockNote |

## Core Product Capability

Plenix Notes MUST provide a structured, searchable, AI-aware note workspace for capturing, organizing, linking, and acting on written knowledge across Plenix.

Notes are not only text records. They are connected knowledge objects that can link to projects, tasks, files, calendar events, contacts, journal entries, bookmarks, and AI workflows.

## Native Ownership Capabilities

Plenix Notes MUST own:

- The note entity model.
- The block/document model.
- Block IDs and anchors.
- Permissions and sharing rules.
- Search and indexing rules.
- Backlinks and relations.
- AI-readable structure.
- Cross-capability links.
- Capture and inbox flows.
- Import, export, and migration behavior.
- Activity, audit, and version history behavior.

Plenix Notes MUST NOT depend on SiYuan, Trilium, or Memos as a runtime service or application base.

## Editor Capability

Plenix Notes MUST use TipTap as the primary editor framework.

TipTap MUST sit on top of ProseMirror, and the saved document structure MUST remain compatible with ProseMirror's document model.

The editor MUST support:

- Headings.
- Paragraphs.
- Lists.
- Checklists.
- Blockquotes.
- Code blocks.
- Inline formatting.
- Links.
- Tables where required.
- Embeds where required.
- Slash-command insertion where appropriate.
- Keyboard-first editing.
- Undo and redo.
- Auto-save.
- Structured JSON storage rather than raw HTML.

## Block Workspace Capabilities Inspired by SiYuan

Plenix Notes SHOULD borrow the following product capabilities from SiYuan:

- Block-based editing.
- Stable block identifiers.
- Block-level backlinks.
- Block references.
- Split-pane document workspaces.
- Block zoom.
- Polished long-document navigation.
- Local document outline behavior.
- Document-level and block-level search targeting.
- Workspace patterns for moving between related notes without losing context.

Plenix MUST implement these as native Plenix behaviors, not by reusing SiYuan code or adopting SiYuan's full data model.

## Metadata, Tree, and Relations Capabilities Inspired by Trilium

Plenix Notes SHOULD borrow the following product capabilities from Trilium:

- Hierarchical note tree organization.
- Cloned notes that can appear in more than one location.
- Note attributes.
- Typed notes.
- Relations between notes.
- Custom metadata fields.
- Note templates.
- Scriptable or automatable note behavior where appropriate.
- AI-assisted note tools.

Plenix MUST adapt these ideas into Plenix's own anchor, permission, project, and cross-capability model.

## Fast Capture Capabilities Inspired by Memos

Plenix Notes SHOULD borrow the following product capabilities from Memos:

- Fast note capture.
- Lightweight inbox flow.
- Frictionless note entry.
- Chronological capture stream.
- Minimal required metadata at capture time.
- Later triage into projects, folders, tags, relations, or tasks.

Fast capture MUST be available without forcing the user to choose a full folder, project, template, or metadata structure before saving the note.

## Optional Higher-Level Reference: BlockNote

BlockNote MAY be used as a higher-level product and implementation reference for block editor behavior.

BlockNote MUST NOT replace the core decision to build Plenix Notes natively with TipTap on ProseMirror unless a future architecture decision explicitly changes the editor stack.

## Required Native Notes Capabilities

### Note Creation

Users MUST be able to create notes from:

- The Notes workspace.
- Quick capture.
- Project context.
- Calendar events.
- Tasks.
- Browser or mobile capture.
- AI-generated drafts.
- Imported files or text.

### Fast Inbox

Notes MUST support a lightweight inbox for unprocessed captured notes.

The inbox MUST allow users to capture first and organize later.

### Rich Editing

Notes MUST support rich structured editing through TipTap/ProseMirror.

The system MUST preserve the structured document model for search, AI processing, export, and cross-linking.

### Block Anchors

Notes SHOULD support stable block-level anchors from the start.

Block anchors enable backlinks, references, AI citations, block zoom, transclusion-like behavior, and precise cross-capability links.

### Backlinks

Notes MUST support backlinks between notes and between notes and other Plenix objects where applicable.

Backlinks SHOULD work at both note level and block level when block anchors are available.

### Split Panes

Notes SHOULD support split-pane workflows so users can view or edit multiple related notes side by side.

### Block Zoom

Notes SHOULD support zooming into a block or subtree so users can focus on a single section while preserving its relationship to the parent note.

### Note Tree

Notes SHOULD support a tree or outline structure for organizing notes.

The tree MUST remain compatible with Plenix's broader project, tag, category, and anchor model.

### Cloned Notes

Notes SHOULD support cloned notes, where one note can appear in multiple tree locations without duplicating the underlying note content.

### Attributes

Notes SHOULD support structured attributes for metadata such as type, status, project, source, template, review state, confidentiality, and custom user-defined fields.

### Note Types

Notes SHOULD support typed notes, such as:

- General note.
- Meeting note.
- Project note.
- Research note.
- Contact note.
- Decision note.
- Journal-linked note.
- Inbox memo.
- Template note.

### Relations

Notes SHOULD support explicit relations between notes and other Plenix objects.

Examples include:

- Relates to.
- Depends on.
- References.
- Summarizes.
- Created from.
- Follow-up for.
- Decision for.
- Source for.

### AI Tools

Notes MUST be designed for AI-assisted workflows.

AI tools SHOULD support:

- Cleanup of rough notes.
- Summarization.
- Action item extraction.
- Task creation.
- Meeting note structuring.
- Relation suggestions.
- Duplicate note detection.
- Backlink suggestions.
- Metadata suggestions.
- Search and question-answering across notes.

AI MUST operate on Plenix-owned note structure, permissions, and anchors.

### Search

Notes MUST support full-text search.

Notes SHOULD support structured search across:

- Titles.
- Body text.
- Blocks.
- Tags.
- Attributes.
- Relations.
- Source URLs.
- Linked projects.
- Linked tasks.
- Linked contacts.

Search MUST respect user permissions.

### Cross-Capability Integration

Notes MUST integrate with Plenix capabilities including:

- Projects.
- Tasks.
- Calendar.
- Contacts.
- Files.
- Journal.
- Bookmarks.
- Highlights.
- Search.
- AI agents.
- Automations.
- Import/export/backup.

Notes SHOULD act as a connective knowledge layer across Plenix.

## Final Direction

Build Notes natively in Plenix using TipTap on top of ProseMirror.

Borrow the strongest product ideas from SiYuan, Trilium, and Memos, but do not adapt any one full note app as the application base.

Plenix Notes MUST remain a first-class Plenix capability with native data ownership, permissions, anchors, search, AI behavior, and cross-capability integrations.
