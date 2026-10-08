# Projects PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Projects |
| **Capability ID** | projects |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-11 |
| **Revision summary** | Major rewrite — added Project Workspace / Hub concept (Basecamp-inspired), deduplicated features, filled all 13 sections, defined the cross-project fabric model |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST provide a **Project Workspace** — a hub-style experience that surfaces every capability the user has enabled, filtered and scoped to a single initiative. A project is not a container that owns items; it is a **relational anchor** that associates items from independent capability tables. The same task, file, note, or contact can belong to zero, one, or many projects simultaneously. The project workspace is the primary UX for managing any initiative — the user opens a project and finds everything relevant in one place, organized into capability tabs.

### 1.1 The Fabric / Connector Model

Every item type in {APP_NAME} carries four **anchor fields**: `projectType`, `projects[]`, `categories[]`, and `tags[]`. When a user assigns a task to "Kitchen Renovation," that task appears in:

- The **project workspace** → Tasks tab (filtered by `projects[] contains "Kitchen Renovation"`)
- The **universal Tasks view** (all tasks across all projects and personal)
- Any **smart filter or saved search** that matches its tags, categories, or dates

This is the "fabric" — items are not moved into a project; they are *tagged* to it. The project workspace is a lens, not a folder. Removing a project association from an item does not delete the item; it simply stops appearing in that project's filtered views.

### 1.2 Workspace vs Universal View

| View | What it shows | Scope |
|---|---|---|
| **Project Workspace** | All items anchored to one project, organized by capability tabs | Single project |
| **Universal View** (per capability) | All items across all projects + unassigned personal items | Global |

The user can work entirely within a project workspace or entirely in universal views. Both show the same underlying data through different lenses.

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

### UC-01 — Freelance Designer Creates a Client Project

| Item | Detail |
|---|---|
| Actor | Freelance graphic designer |
| Goal | Set up a new project workspace for a branding client |
| Main Flow | 1. Creates project "Acme Rebrand" with color orange, client contact "Acme Corp." 2. Enables tabs: Tasks, Files, Mood Boards, Calendar, People, Invoices. 3. Adds team contacts with roles (Designer=Owner, Copywriter=Team Member, Acme CEO=Client). 4. Creates task columns: Brief, Design, Review, Approved. 5. Uploads brand assets to Files. 6. Creates two mood boards: "Direction A: Bold" and "Direction B: Minimal." 7. Shares mood board links with client for feedback. |
| System Response | Workspace is ready. Client receives portal access. All items created are auto-anchored to this project. |
| Alternate Flow | If the designer starts from a "Client Project" template, steps 2-4 are pre-configured. |

### UC-02 — User Finds a Task in Both Project and Universal View

| Item | Detail |
|---|---|
| Actor | Knowledge worker with multiple active projects |
| Goal | Verify that a task assigned to a project also appears in the universal Tasks view |
| Main Flow | 1. Opens project "Q3 Marketing" → Tasks tab. 2. Creates task "Write blog post" with due date and priority. 3. Navigates to universal Tasks view. 4. Sees "Write blog post" in the list with a project badge showing "Q3 Marketing." 5. Edits the task from the universal view — changes are reflected in the project workspace. |
| System Response | Task exists once in the Tasks table with `projects[]` = ["Q3 Marketing"]. Both views render the same record. |
| Alternate Flow | User assigns the task to a second project — it now appears in both project workspaces and the universal view. |

### UC-03 — Project Manager Tracks Progress Across Sub-Projects

| Item | Detail |
|---|---|
| Actor | Project manager overseeing a multi-phase initiative |
| Goal | See aggregated progress from child projects in the parent |
| Main Flow | 1. Creates parent project "Office Relocation." 2. Creates child projects: "Lease Negotiation," "IT Setup," "Furniture Procurement." 3. Opens parent project dashboard. 4. Sees sub-project rollup widget with each child's status, progress %, and overdue count. 5. Clicks into a child to manage its tasks independently. |
| System Response | Parent dashboard aggregates. Each child is a full independent workspace. |
| Alternate Flow | Promotes "IT Setup" to standalone project — it disconnects from the parent but retains all its data. |

### UC-04 — Client Reviews Deliverables via Portal

| Item | Detail |
|---|---|
| Actor | External client contact |
| Goal | Review uploaded files and approve a milestone |
| Main Flow | 1. Receives portal link via email. 2. Opens the project portal (scoped view). 3. Sees only client-visible tabs: Files, Mood Boards, Invoices. 4. Downloads the latest design proof from Files. 5. Leaves a comment on the mood board. 6. Views and pays an invoice. |
| System Response | Comment appears in the project Activity Feed. Payment status updates on the invoice. |
| Alternate Flow | Client does not have portal access — they see nothing. Access must be explicitly granted by project owner. |

### UC-05 — AI Generates a Project Summary

| Item | Detail |
|---|---|
| Actor | Team lead preparing for a weekly review |
| Goal | Get a quick executive summary of project status |
| Main Flow | 1. Opens project "Product Launch" → AI Summary tab. 2. Reads auto-generated summary: "72% tasks complete. 3 overdue tasks (all assigned to Design). Next milestone: Beta Release in 5 days. Budget at 68% utilized. Risk: no QA tasks created yet." 3. Clicks a suggested action: "Create QA task checklist." |
| System Response | AI uses project-scoped context (tasks, milestones, budget, activity) to generate the summary. Suggested actions link to relevant creation flows. |
| Alternate Flow | User requests a weekly digest email — AI sends a formatted summary every Monday morning. |

### UC-06 — Cross-Project Personal Dashboard

| Item | Detail |
|---|---|
| Actor | Solopreneur managing 5 active client projects |
| Goal | See all overdue tasks across all projects in one view |
| Main Flow | 1. Opens universal Tasks view. 2. Filters by: status = overdue. 3. Sees tasks from all 5 projects, each with a colored project badge. 4. Sorts by due date. 5. Clicks a task to edit — context panel shows project name and quick-link to the project workspace. |
| System Response | Universal view aggregates all tasks. Project badge uses the project's assigned color for instant recognition. |
| Alternate Flow | User filters universal view by a single project — equivalent to the project Tasks tab. |

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

Value-added behavior beyond Create, Edit, Delete, and Search.

Source feature area(s): Projects, Basecamp-inspired Workspace

### 3.A — Project Workspace / Hub

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Project Workspace — hub with capability tabs** | 🔵 Planned | When the user opens a project, they enter a full workspace. The left side shows the project sidebar (enabled tabs), the main area shows the active tab's content. Tabs are capability-scoped filtered views — Tasks tab shows tasks where `projects[]` includes this project, Files tab shows files anchored to this project, etc. The user can enable or disable any tab from the project settings. Tab order is drag-reorderable. |
| F02 | **Overview tab — project mission control** | 🔵 Planned | The default landing tab. Shows: project description, status badge, progress bar (from Tasks completion), key metrics (task count, file count, overdue items, upcoming milestones), pinned items (user-pinned tasks, files, or notes for quick access), recent activity (last 10 events), and quick-action buttons (New Task, Upload File, Add Note). The Overview is a read-only dashboard — each widget links to its source tab. |
| F03 | **Tasks tab — project-scoped task management** | 🔵 Planned | Displays all tasks where `projects[]` includes this project. Supports three view modes: List (sortable, groupable flat list), Kanban (drag-and-drop board with project-specific columns), and Calendar (tasks plotted by due date). Tasks created from within this tab auto-populate `projects[]` with the current project. All other task features (subtasks, priorities, assignees, time estimates) come from the Tasks capability. |
| F04 | **Files tab — project-scoped file browser** | 🔵 Planned | Displays all files where `projects[]` includes this project. Grid and list view modes. Supports upload (auto-anchors to this project), linking existing files from the universal Files view, and OneDrive/cloud integration. File previews, metadata, and version history come from the Files capability. Includes DAM assets tagged to this project. |
| F05 | **Notes tab — project-scoped notes** | 🔵 Planned | Displays all notes where `projects[]` includes this project. Supports creating new notes (auto-anchored) and linking existing notes. Notes retain full editing capabilities from the Notes capability. |
| F06 | **Wiki / Knowledge Base tab** | 🔵 Planned | A project-scoped wiki for long-form documentation — project briefs, specifications, guidelines, meeting notes, decision logs. Pages are wiki items anchored to this project. Supports hierarchical page structure (parent/child pages), rich text editing, and internal linking between wiki pages. |
| F07 | **Calendar tab — project-scoped calendar** | 🔵 Planned | Displays all calendar events where `projects[]` includes this project. Month, week, and day views. Events created here auto-anchor to this project. Milestones from the Roadmap tab also appear as diamond markers. |
| F08 | **Roadmap / Milestones tab** | 🔵 Planned | Gantt-style timeline scoped to the project. Task bars span start-to-end dates, milestones are diamond markers. Drag to reschedule, resize to change duration. Dependency arrows between tasks. Multiple named roadmaps per project (e.g., Development Roadmap, Marketing Roadmap). Zoom levels: day, week, month, quarter. |
| F09 | **People tab — project contacts with roles** | 🔵 Planned | Lists all contacts associated with this project, grouped by role: Owner (internal, full control), Team Member (internal, assigned work), Client (external, portal access), Consultant (external, specialist), Reviewer (approves deliverables), Stakeholder (read-only visibility). Adding a contact here creates a project-contact association record — it does not duplicate the contact. Clicking any person opens their full Contacts profile. |
| F10 | **Links tab — project bookmarks** | 🔵 Planned | Filtered view of the master Bookmarks library showing all bookmarks where `projects[]` includes this project. Supports saving new links (auto-anchored) with auto-detected favicons and domain icons (Figma, GitHub, Notion, etc.). Each link has: URL, display name, type badge (Design, Dev, Client, Reference, Supplier, Tool), and domain icon. Bidirectional — bookmarks saved here appear in the master Bookmarks library tagged to this project. |
| F11 | **Images / Gallery tab** | 🔵 Planned | Masonry or grid gallery of all images anchored to this project. Upload (drag-and-drop), URL import, and Unsplash integration. Images are the source pool for project Mood Boards. Lightbox preview with metadata. |
| F12 | **Mood Boards tab** | 🔵 Planned | Named visual direction boards per project. Each mood board is a curated image collection with Grid or Masonry layout, drag-and-drop reorder, captions. Shareable as a read-only public link for client presentations. Multiple mood boards per project for different visual directions. |
| F13 | **Activity Feed tab** | 🔵 Planned | Chronological log of every event in this project: task changes, file uploads, contact additions, status updates, comments, milestone completions. Each entry shows actor, action, target item (linked), and timestamp. Filterable by event type. Team members can post manual status updates as announcement entries. |
| F14 | **AI Summary tab** | 🔵 Planned | AI-generated project intelligence: executive summary of current state, risk flags (overdue tasks, stalled items, budget concerns), suggested next actions, weekly digest of what changed. Powered by the AI Agents capability with project-scoped context. Refreshes on demand or on a schedule. |
| F15 | **Search Within Project** | 🔵 Planned | A search bar scoped to the current project. Queries the global Search index filtered by `projects[]` = this project. Returns results across all capability types (tasks, files, notes, contacts, bookmarks, wiki pages, events) with type badges. |
| F16 | **Client / Consultant Access** | 🔵 Planned | Project contacts with the Client or Consultant role can be granted portal access to a scoped view of the project. The portal shows only the tabs and items the project owner has marked as client-visible. Clients can: view files, leave comments, approve deliverables, view invoices, and submit payments. No access to internal tasks, notes, or team-only content unless explicitly shared. |

### 3.B — Project Identity and Structure

| ID | Feature | Status | Description |
|---|---|---:|---|
| F17 | **Color-coded project cards** | ✅ Built / Required | Each project has an assigned color used in: 3px solid left border on the card, project name text tinted in that color, subtle background wash (color at ~7% opacity) on hover. 16 palette colors + custom hex input. |
| F18 | **Project detail hero header** | ✅ Built / Required | When a project is open: 4px colored accent border, project name in project color at 22px, category label above, description below. Progress bar based on task completion. File count, note count, and sync status indicators. |
| F19 | **Project identity — status, tags, icon, client association** | 🔵 Planned | Status: Active, At Risk, Off Track, Paused, Completed, Archived — colored badge on card and header. Tags: freeform, multi-value, color-coded. Icon/emoji: chosen at creation, shown in sidebar and header. Client association: linking to a Client-type contact enables the Client Portal for that contact. Status can be set manually or by automations (e.g., auto-mark At Risk when overdue count exceeds threshold). |
| F20 | **Project templates** | 🔵 Planned | Save any project's structure (enabled tabs, tab order, column definitions, contact roles, default tags) as a reusable template. Create new projects from a template to instantly scaffold the workspace. Built-in starter templates: Client Project, Research, Marketing Campaign, Event Planning, Product Build. |
| F21 | **Sub-projects — parent/child hierarchy** | 🔵 Planned | A project can contain child projects (one level deep). The parent project dashboard aggregates status, task completion, and overdue items from all children. The sidebar shows the parent with an expand arrow revealing children as indented sub-tree. Each child is fully independent with its own workspace, tabs, and data — but rolls up into parent reporting. A child can be promoted to standalone at any time. |

### 3.C — Views, Navigation, and Dashboard

| ID | Feature | Status | Description |
|---|---|---:|---|
| F22 | **Project sidebar — grouped navigation with counts** | ✅ Built / Required | The global Projects sidebar groups projects by tag/area (Personal, Client Work, Research, Travel, Finance). Each project listed with color dot, name, status indicator, and task count badge. Supports collapse/resize. Starred/pinned projects appear at top. |
| F23 | **Project list view — sortable, filterable project index** | 🔵 Planned | All projects in a sortable table: name, status, client, progress %, task count, last activity date, project type. Filterable by status, tags, categories, project type, client. Bulk actions: archive, change status, add tag. |
| F24 | **Project dashboard widget — home screen summary** | 🔵 Planned | A widget on the global {APP_NAME} dashboard showing: active project count, projects needing attention (overdue tasks, stalled, at risk), recent project activity, and quick-launch buttons for starred projects. |
| F25 | **Kanban board view — drag-and-drop workflow stages** | 🔵 Planned | Within the Tasks tab: task cards in vertical columns representing workflow stages. Fully customizable columns per project (e.g., Todo / In Progress / Review / Done). Cards show title, priority dot, due date, assignee avatar, tags. Drag between columns changes status. Count badge per column header. Optional WIP limit per column. |
| F26 | **List view — structured task list** | 🔵 Planned | Within the Tasks tab: all project tasks in a flat or grouped list. Checkbox, priority, title, status, due date, tags, assignee. Groupable by column/stage, priority, due date, or section. Inline editing. Bulk actions on multi-select. |
| F27 | **Roadmap view — Gantt-style timeline** | 🔵 Planned | Within the Roadmap tab: horizontal bars spanning start-to-end dates. Drag to move, resize to change duration. Zoom: month, week, day. Status colors: planned (gray), in progress (blue), completed (green), blocked (red). Dependency arrows. Milestone diamonds. Multiple named roadmaps per project. |
| F28 | **Project dashboard tab — customizable widget canvas** | 🔵 Planned | A Dashboard tab within the project workspace. Drag-and-drop widget canvas: Upcoming Tasks, Overdue Tasks, Client Action Required, Recently Completed, Phase Progress, Budget Gauge, Roadmap Summary (next 3 milestones), Team Members with roles, Goals/KPI Cards (user-defined metrics), Quick Links, Activity Feed. Widgets added from picker, positioned by drag, sized by dragging corners. Layout persists per project. Sub-project rollup widget for parent projects. |

### 3.D — Progress, Archiving, Financials

| ID | Feature | Status | Description |
|---|---|---:|---|
| F29 | **Progress tracking — completion rates and counts** | 🔵 Planned | Task completion count (e.g., 12 of 30 done) and percentage. Visible in hero header, project card, dashboard widget. Calculated from tasks in the Done column. Separate manual project status (Active, Paused, etc.) is independent of calculated percentage. |
| F30 | **Project archiving and restoration** | 🔵 Planned | Completed or inactive projects can be archived — removed from all active views without deleting data. Accessible from Archived section. All items preserved. One-click restoration reinstates the project in all views. |
| F31 | **Proposals / Estimates tab** | 🔵 Planned | Project-scoped view of proposals and estimates from the Proposals capability. Create, send, and track proposals anchored to this project. Status tracking: Draft, Sent, Viewed, Accepted, Declined. Links to the Invoices tab when a proposal is accepted and converted. |
| F32 | **Invoices / Payments tab** | 🔵 Planned | Project-scoped view of invoices from the Invoices capability. Generate invoices from project time entries, milestones, or custom line items. Track payment status: Draft, Sent, Viewed, Paid, Overdue. Links to the Payments capability for recording payments. |
| F33 | **Budget tracking** | 🔵 Planned | Optional budget for each project: estimated total, actual spend (from time entries at hourly rates + expenses), remaining, and burn rate. Budget gauge widget on the project dashboard. Alerts when spend exceeds threshold (75%, 90%, 100%). |

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Workspace Tab Management

| Rule | Behavior |
|---|---|
| Default tabs | New projects start with: Overview, Tasks, Files, Notes, Calendar. User can change defaults in Settings. |
| Enable/disable tabs | Any capability tab can be toggled on/off per project. Disabling a tab hides it from the sidebar — it does not delete anchored items. |
| Tab order | Tabs are drag-reorderable in the project sidebar. Order persists per project. |
| Tab badges | Tabs with content show count badges (e.g., Tasks: 24, Files: 12). Overdue indicators show in red. |

### 5.2 Anchor / Fabric Rules

| Rule | Behavior |
|---|---|
| Multi-project items | An item can belong to multiple projects via `projects[]` array. It appears in each project's workspace. |
| Unanchored items | Items with empty `projects[]` appear only in the universal view — they are "personal" or unassigned. |
| Anchor on create | Items created from within a project workspace auto-populate `projects[]` with the current project ID. User can add additional project anchors. |
| Anchor removal | Removing a project from an item's `projects[]` removes it from that project workspace but does not delete the item. |
| Project deletion | Soft-deleting a project does not modify any anchored items. Items retain the project ID in `projects[]` but the project no longer resolves in views. Hard-delete clears the project ID from all items' `projects[]`. |

### 5.3 Kanban Board Rules

| Rule | Behavior |
|---|---|
| Columns per project | Each project defines its own columns independently. No global column set. |
| Done column | One column designated as Done — tasks here count toward completion %. |
| WIP limit | Optional per column. Exceeding highlights the column in amber. |
| Cross-column drag | Changes the task's `status` field. |
| Within-column drag | Changes the task's `position` field (sort order). |

### 5.4 Sub-Project Rules

| Rule | Behavior |
|---|---|
| Nesting depth | One level only. A child cannot have children. |
| Independence | Each child has its own workspace, tabs, columns, contacts, and data. |
| Rollup | Parent dashboard aggregates: total tasks, completed tasks, overdue count, status summary from all children. |
| Promotion | A child can be promoted to standalone — disconnects from parent, retains all data. |
| Demotion | A standalone project can be demoted to a child of another project. |

### System Constants

| Constant | Value | Notes |
|---|---|---|
| MAX_PROJECTS | 500 | Soft limit; extendable per plan |
| MAX_SUB_PROJECTS | 20 | Per parent project |
| MAX_TABS_PER_PROJECT | 25 | All capability tabs available |
| MAX_KANBAN_COLUMNS | 20 | Per project |
| MAX_ROADMAPS_PER_PROJECT | 10 | Named roadmap views |
| MAX_CONTACTS_PER_PROJECT | 100 | People linked with roles |
| MAX_MOOD_BOARDS_PER_PROJECT | 20 | Visual direction boards |
| DEFAULT_TAB_SET | Overview, Tasks, Files, Notes, Calendar | Configurable in Settings |
| PALETTE_COLORS | 16 | Plus custom hex input |
| PROJECT_STATUSES | Active, At Risk, Off Track, Paused, Completed, Archived | Enum; not user-extensible |
| CONTACT_ROLES | Owner, Team Member, Client, Consultant, Reviewer, Stakeholder | Enum; not user-extensible in V1 |

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| User creates a task in universal Tasks view and assigns it to a project | Task appears in the project's Tasks tab immediately |
| User removes a project anchor from a task via the project Tasks tab | Task disappears from the project workspace but remains in universal Tasks view |
| User archives a project with 50 anchored tasks | All 50 tasks remain in universal Tasks view; project workspace is hidden from active views |
| User hard-deletes a project from Trash | Project record deleted; all items' `projects[]` arrays have this project ID removed |
| User enables Invoices tab on a project that had it disabled | Tab appears; existing invoices anchored to this project become visible |
| User drags a task between Kanban columns | Task status updates; progress bar recalculates; Activity Feed logs the event |
| Sub-project is promoted to standalone | Parent dashboard no longer includes its metrics; child retains all data |
| Client portal user tries to access a non-shared tab | 403 — tab is not visible in their portal view |
| Two projects share the same task | Editing the task in either project workspace updates the single record |
| User searches within a project for "invoice" | Search returns all items anchored to this project matching "invoice" across all types |

## 10. Data Model

```
Project {
  id: UUID v7
  name: string
  description: string?
  color: string
  icon: string?
  status: ProjectStatus
  projectType: string?
  categories: string[]
  tags: string[]
  clientContactId: UUID? -> Contact
  parentProjectId: UUID? -> Project
  enabledTabs: TabKey[]
  tabOrder: TabKey[]
  kanbanColumns: KanbanColumn[]
  budget: { estimated: number, currency: string }?
  created_at: timestamp
  updated_at: timestamp
  deleted_at: timestamp?
}

KanbanColumn {
  id: UUID
  name: string
  position: integer
  wipLimit: integer?
  isDone: boolean
  color: string?
}

ProjectContact {
  projectId: UUID -> Project
  contactId: UUID -> Contact
  role: ContactRole
  portalAccess: boolean
  created_at: timestamp
}

-- Items are NOT embedded in projects.
-- Each item type has: projects UUID[] (or M:N join table)
-- Example: Task.projects[] = [project_id_1, project_id_2]
```

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| id | UUID v7 | Yes | System-generated | Primary key |
| name | string | Yes | 1-200 chars, must be non-empty after trim | Displayed in sidebar, cards, header |
| description | string | No | 0-2000 chars | Shown in Overview tab and hero header |
| color | string | No | Valid hex color (#RRGGBB) or palette index (0-15). Default: palette[0] | Used throughout UI |
| icon | string | No | Emoji or icon key from the icon set | Shown in sidebar and header |
| status | enum | Yes | One of: active, at_risk, off_track, paused, completed, archived. Default: active | |
| projectType | string | No | User-defined label from Settings (e.g., "Client Project," "Research") | Anchor field |
| categories | string[] | No | Hierarchical taxonomy references | Anchor field |
| tags | string[] | No | Flat keyword identifiers | Anchor field |
| clientContactId | UUID | No | FK to Contacts table; must be a Contact with type=Client | Enables Client Portal |
| parentProjectId | UUID | No | FK to Projects table; null = top-level. Only one level of nesting. | Sub-project hierarchy |
| enabledTabs | string[] | Yes | Array of capability keys. Default: ["overview","tasks","files","notes","calendar"] | Tab visibility |
| tabOrder | string[] | No | Ordered array of capability keys. Default: same as enabledTabs | Sidebar tab order |
| kanbanColumns | JSON | No | Array of {id, name, position, wipLimit, isDone, color}. Default: [Todo, In Progress, Done] | Per-project board |
| budget | JSON | No | {estimated: number, currency: string} or null | Optional budget tracking |
| created_at | timestamp | Yes | UTC ISO 8601, system-generated | |
| updated_at | timestamp | Yes | UTC ISO 8601, auto-updated on any change | |
| deleted_at | timestamp | No | Null = active; set on soft-delete | Soft-delete pattern |

## 12. Database / Schema Notes

### Enums

**ProjectStatus:** `active`, `at_risk`, `off_track`, `paused`, `completed`, `archived`

**ContactRole:** `owner`, `team_member`, `client`, `consultant`, `reviewer`, `stakeholder`

**TabKey:** `overview`, `dashboard`, `tasks`, `files`, `notes`, `wiki`, `calendar`, `roadmap`, `people`, `links`, `images`, `mood_boards`, `activity`, `ai_summary`, `search`, `proposals`, `invoices`, `payments`, `budget`, `time_tracking`

### Schema Invariants

- A project with `parentProjectId` set MUST reference a project where `parentProjectId` is null (no grandchildren).
- `enabledTabs` MUST always contain "overview" (cannot be disabled).
- Exactly one `kanbanColumns` entry MUST have `isDone = true`.
- `clientContactId` MUST reference a Contact with `type = "client"` or `type = "company"`.
- Soft-deleted projects (`deleted_at IS NOT NULL`) MUST NOT appear in any active view or sidebar.

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
| Project List | All projects in list/grid view with filters, sort, and bulk actions |
| Project Workspace | The hub — sidebar tabs + main content area for the active tab |
| Project Settings | Metadata, enabled tabs, tab order, column configuration, client access |
| Project Create/Edit Dialog | Name, color, icon, description, project type, client, template selection |
| Client Portal | Scoped external view for client contacts |
| Template Manager | Create, edit, delete, and apply project templates |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| ProjectCard | Color-coded card with name, status badge, progress bar, task count |
| ProjectHeroHeader | Full-width header with color accent, name, description, metrics |
| ProjectSidebar | Vertical tab navigation with icons, labels, count badges |
| TabContainer | Dynamic content area that renders the active capability's filtered view |
| KanbanBoard | Drag-and-drop column board (from Tasks capability, project-scoped) |
| RoadmapTimeline | Gantt chart (from Roadmap capability, project-scoped) |
| OverviewDashboard | Widget grid for the Overview tab |
| ProjectDashboard | Customizable drag-and-drop widget canvas |
| SubProjectRollup | Aggregated metrics from child projects |
| BudgetGauge | Visual budget utilization indicator |
| ProgressBar | Color-matched task completion bar |
| ActivityFeedPanel | Chronological event log with filters |

## 15. Workflow Requirements

| Operation | Required Behavior | Shared/Core Handling |
|---|---|---|
| Create | User creates a project with: name (required), color, icon/emoji, description, project type, client association, and enabled capability tabs. A default set of tabs is pre-selected (Overview, Tasks, Files, Notes, Calendar) but the user can enable/disable any tab. | Standard create dialog with anchor fields. |
| Edit | All project metadata is editable at any time: name, color, icon, description, status, project type, client, tags, categories, enabled tabs, and tab order. | Inline editing in the project header. |
| Delete | Soft-delete moves the project to Trash. All anchor associations are preserved — items remain in their capability tables but the project filter no longer resolves. Hard-delete (from Trash) removes the project record and clears `projects[]` references from all associated items. | Standard soft-delete with 30-day retention. |
| Search | Projects are searchable by name, description, status, project type, tags, categories, client name, and any item within the project (delegated to the Search capability). | Global search includes project results as a top-level entity. |

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|
| `projects/project.service` | CRUD, status transitions, sub-project management, template operations |
| `projects/project-contact.service` | Contact-role associations, portal access grants |
| `projects/kanban.service` | Column CRUD, WIP validation, position management |
| `projects/budget.service` | Budget tracking, spend aggregation from time entries and expenses |
| `projects/template.service` | Save project as template, create project from template |
| `projects/project.controller` | REST endpoints for all project operations |
| `projects/project.events` | Event emitters for activity feed, automations, notifications |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| `extension/quick-save` | Save current page as a bookmark anchored to a project (project picker in popup) |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| `views/ProjectList` | Project index with filters, sort, bulk actions |
| `views/ProjectWorkspace` | Hub layout — sidebar + tab content area |
| `views/ProjectSettings` | Settings panel for metadata, tabs, columns, access |
| `components/ProjectCard` | Card component with color, status, progress |
| `components/ProjectSidebar` | Tab navigation component |
| `components/OverviewTab` | Mission control dashboard |
| `components/ProjectDashboardTab` | Customizable widget canvas |
| `components/SubProjectRollup` | Parent aggregation widget |
| `components/ClientPortal` | Scoped external view renderer |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| `mobile/ProjectList` | Condensed project list with swipe actions |
| `mobile/ProjectWorkspace` | Tab bar at bottom, swipe between tabs |
| `mobile/QuickCapture` | Quick task/note/file creation anchored to a selected project |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| `shared/anchor-filter` | Utility to filter any item type by `projects[]` anchor — used by all tabs |
| `shared/project-color` | Color resolution — hex lookup, CSS variable generation |
| `shared/tab-registry` | Maps capability keys to tab components, labels, and icons |

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| AI Project Summary | Generates executive summary, risk flags, suggested actions from project-scoped data |
| AI Weekly Digest | Automated weekly project status email using AI summarization |
| Smart Project Creation | AI suggests project type, tabs, and columns based on project name and description |
| Automation Triggers | Project events (status change, milestone complete, budget threshold) trigger automation workflows |
| Activity Feed Integration | All project events emit to the global Activity Feed, filtered by project context |
| Search Index | Project metadata and all anchored items indexed for project-scoped and global search |
| Client Portal | Scoped read-only/interactive view for external contacts with Client or Consultant role |
| Template System | Save and apply project structure templates |

## 19. OSS / Build-vs-Buy Decision

1. **Primary OSS reference — OpenProject (GPL v3 | Self-hosted service).** Study OpenProject for resource management, Gantt/roadmap, budget, time tracking, and work package layers. GPL v3 means {APP_NAME} cannot embed its source code — run as a self-hosted backend service or reimplement independently. Study its data model, API shape, and UX patterns as reference only.

2. **Secondary OSS reference — Plane (AGPL | Self-hosted service).** Plane covers issues/sprints/cycles/roadmap. Primary reference for Kanban board, column customization, and list view. AGPL prohibits embedding — use as behavioral reference only.

3. **Tertiary OSS reference — Leantime (MIT | Embeddable reference).** MIT permits direct study and selective adaptation. Value: strategy-to-execution model and neurodiversity-friendly patterns (focus mode, ADHD-aware task entry). Inform {APP_NAME}'s task creation UX and condensed-defaults principle.

4. **Architectural decision — build natively.** The Kanban board, Gantt roadmap, and progress tracking MUST be built natively in {APP_NAME}'s data layer. This keeps the data model unified — tasks and projects are first-class entities shared with Calendar, Notes, and Contacts. The OSS tools above are references for schema design, not runtime dependencies.

5. **Key architectural decision — project as a relational hub, not a container.** A project does not own its linked items. Tasks, Notes, Files, Contacts, Bookmarks, and Calendar events each live in their own capability tables and carry `projects[]` (many-to-many). This enables the fabric model where the same item appears in multiple project workspaces and the universal view simultaneously. Never embed sub-documents inside a project record.

6. **Workspace rendering — dynamic tab composition.** The project workspace is a shell with a sidebar and a content area. Each tab is a standard capability view component wrapped with an anchor filter (`projects[] contains this_project_id`). This means the Tasks tab inside a project is literally the Tasks capability's list/kanban/calendar view with a pre-applied filter — not a separate implementation. Build once, filter everywhere.

7. **Gantt rendering — `frappe-gantt` (MIT).** Embeddable SVG timeline. Wrap in a React component reading from {APP_NAME}'s task/phase data. Do not use dhtmlx-gantt (commercial) or OpenProject's Gantt module (GPL).

8. **Drag-and-drop — `@dnd-kit/core` (MIT).** For Kanban board cross-column and within-column drag. Persist optimistically with server reconciliation on drop-end.

9. **Client Portal — scoped auth, not a separate app.** The portal is a filtered rendering of the project workspace using the same React components but with a permission mask that hides non-shared tabs and items. Served at a unique URL with a portal-specific auth token. No separate codebase.

10. **Warning — GPL v3 / AGPL contamination risk.** No source code from OpenProject or Plane may be copied into {APP_NAME}'s codebase. API calls to self-hosted instances are safe. UI patterns and data model ideas are safe to reproduce independently. Only Leantime (MIT) code may be directly adapted.

11. **Warning — Microsoft Graph API fragility.** OneDrive integration depends on Graph webhooks (expire, throttle, require public HTTPS endpoint). Plan for: renewal background job, exponential backoff on 429s, fallback polling, and UI signaling when connection is degraded.

12. **What {APP_NAME} builds natively vs defers.** Build natively: project entity, relational hub model, workspace shell, tab composition, Kanban board, Gantt roadmap, progress tracking, project identity, sub-project hierarchy, activity feed, contacts with roles, links, templates, overview dashboard. Defer: full time tracking approval workflow (consider OpenProject service), advanced budget forecasting, client portal billing integration, and cross-project resource allocation.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| Tasks | Task items surface inside the project workspace; project-scoped task boards and lists |
| Calendar | Calendar events tagged to a project appear in the project Calendar tab |
| Files | Project Files tab surfaces all files anchored to the project |
| Notes | Project Notes tab surfaces all notes anchored to the project |
| Contacts | Project People tab links contacts with roles (Owner, Client, Consultant, etc.) |
| Bookmarks | Project Links tab is a filtered view of the master Bookmarks library |
| Tags | Anchor field — tags on any item determine cross-project membership |
| Search | Project-scoped search filters the global index by project anchor |
| Activity | Project Activity tab consumes the global activity feed filtered by project |
| Sharing | Project sharing controls and Client Portal access scoping |
| Images | Project gallery tab sourced from the Images capability |
| Mood Boards | Visual direction boards per project |
| Roadmap | Gantt-style timeline planning scoped to a project |
| Time Tracking | Time entries logged against a project; budget tracking |
| Invoices | Invoice generation scoped to a project and its time entries |
| Proposals | Proposals and estimates associated with a project |
| Digital Asset Management | DAM assets tagged to a project surface in the project Files/Media tab |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| Tasks | Tasks carry `projects[]` anchor — project provides the grouping context |
| Calendar | Events carry `projects[]` anchor — project Calendar is a filtered view |
| Files | Files carry `projects[]` anchor — project Files tab is a filtered view |
| Notes | Notes carry `projects[]` anchor — project Notes tab is a filtered view |
| Contacts | Contact-to-project association with role (Client, Consultant, etc.) |
| Bookmarks | Bookmarks carry `projects[]` anchor — project Links tab is a filtered view |
| Invoices | Invoices scoped to a project for billing |
| Proposals | Proposals linked to a project for pipeline |
| Time Tracking | Time entries scoped to a project for reporting |
| Deals | Deals associated with a project for pipeline tracking |
| Client Portal | Portal access scoped per-project |
| Automations | Project events trigger automation workflows |
| AI Agents | AI agents operate within project context for scoped actions |

### Related Capabilities

| Capability | Relationship |
|---|---|
| Wiki | Project wiki pages provide long-form documentation within the workspace |
| Content Calendar | Marketing projects may embed a content calendar view |
| Campaigns | Campaign items can be anchored to a project |
| Channels | Channel items can be anchored to a project |
| Email | Email threads can be linked to a project |
| Messaging | Message threads can be linked to a project for context |
| Scheduling | Meeting scheduling within a project context |
| Expenses | Expense tracking scoped to a project for budget visibility |
| Payments | Payment tracking for project invoices |

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
| Should projects support custom fields (user-defined metadata per project)? | Open | Would enable CRM-like flexibility but adds complexity. Defer to V2? |
| Should the Client Portal be a separate URL/subdomain or an in-app scoped view? | Open | Separate URL is cleaner for clients; in-app is simpler to build. |
| Should project templates be shareable between users / exportable? | Open | Useful for teams but requires a template marketplace or sharing mechanism. |
| How should project-level notifications differ from capability-level notifications? | Open | User may want "notify me of all activity in Project X" as a blanket setting. |
| Should budget tracking include expense line items natively or only aggregate from Time Tracking and Expenses? | Open | Native line items are more flexible but duplicate the Expenses capability. |
| Maximum number of projects a user can have — should this be plan-gated? | Open | Free tier: 5 active, Pro: unlimited? |

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
