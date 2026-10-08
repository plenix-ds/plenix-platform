# Terminology

**{APP_NAME} mapped to standard software development structure. Use these definitions consistently across design, development, and documentation.**

---

## System Layer Model

Every term in the {APP_NAME} documentation maps to a defined layer. This model governs how capabilities are documented and how PRD sections are structured.

| Layer | Term | Definition | Example |
|---|---|---|---|
| Product | **Capability** | What the system enables at a high level. | Tasks, Notes, Contacts, Invoices |
| Feature | **Feature** | User-facing tools inside each capability. | Create Task, Assign Task, Due Dates, Board View |
| Usage | **Use Case** | How a user achieves a goal. | Actor + Goal + Steps + System Response |
| Behavior | **Functionality** | What the feature actually does internally. | Saves entity, links to contact, detects overdue |
| Code | **Function** | Implementation-level operation. | `filterItems()`, `toggleArr()`, `saveEdit()` |
| Edge cases | **Scenario** | Specific variation or condition. | Task has no assignee → show as unassigned |
| Data | **Specification** | Exact fields, types, constraints. | `title: string, required`, `status: enum` |
| Technical | **Enabler** | Internal work needed to support features. | Search index, state management, auth |
| UI | **Screen / Component / Widget** | Visual elements. | TasksScreen, ClassificationWidget |
| Code structure | **Module** | Grouped code with a responsibility. | Tasks Module, Classification Module |

---

## Layer → PRD Section Mapping

| Layer | PRD Section |
|---|---|
| Product | §1 Capability |
| Feature | §3 Features |
| Usage | §4 Use Cases |
| Behavior | §5 Functionality |
| Edge cases | §7 Scenarios |
| Data | §8 Specification |
| Technical | §9 Enablers |
| UI | §10 UI |
| Code structure | §11 Modules |

---

## Capability Hierarchy

```
Capability
  → Feature
    → Functionality
      → Scenario

Use Case
  = Actor + Goal + Steps + System Response + Alternate Flows

Specification
  = Exact fields, rules, constraints, behavior, design
```

---

## 1. Product Layer — Capability

What {APP_NAME} enables at a high level.

| Capability | Purpose |
|---|---|
| Projects | Manage project containers and project-related work |
| Tasks | Track work, assignments, priorities, and deadlines |
| Notes | Capture written information and documentation |
| Files | Store and organize documents and media |
| Images | Manage visual assets |
| Contacts | Manage people, companies, and relationships |
| Invoices | Track billing requests and invoice records |
| Payments | Track payments received or owed |
| Time Tracking | Track time spent on work |
| Campaigns | Manage marketing or outreach efforts |
| Wiki | Store structured knowledge |
| Bookmarks | Save useful links and resources |

---

## 2. Feature Layer — Feature

User-facing tools inside each Capability.

**Example: Tasks Capability**

| Feature | Description |
|---|---|
| Create Task | User can add a new task |
| Assign Task | Task can be assigned to a person |
| Due Dates | Task can have a deadline |
| Priority Levels | Task can be marked low / medium / high |
| Status Tracking | Task can move through workflow states |
| Subtasks | Task can be broken into smaller tasks |
| Recurring Tasks | Task can repeat automatically |
| Board View | Tasks can be viewed by status or stage |
| Reminders | User receives due date alerts |

---

## 3. Usage Layer — Use Case

How a user achieves a goal in {APP_NAME}.

**Use Case: Create and Assign a Task**

| Part | Description |
|---|---|
| Actor | Admin, team member, or project manager |
| Goal | Create a task and assign it to someone |
| Main Flow | User opens Tasks → clicks Add Task → enters title/details → selects assignee → sets due date → saves |
| System Response | Task is created, stored, classified, and shown in task list |
| Alternate Flow | Missing title → system shows validation error |
| Scenario | Task is overdue, task has no assignee, task is linked to multiple projects |

---

## 4. Behavior Layer — Functionality

What the feature actually does in use.

**For Tasks:**

| Feature | Functionality |
|---|---|
| Create Task | Saves a new task entity |
| Assign Task | Links task to contact or user |
| Due Date | Stores deadline and detects overdue status |
| Priority | Marks task importance |
| Status | Updates progress state |
| Classification (Anchors) | Applies Project Type, Project, Category, Tags |
| Search | Filters tasks by text or metadata |
| Reminder | Triggers alert before due date |

### Function / Code

Implementation-level operation.

| Code Function | Purpose |
|---|---|
| `filterItems()` | Filters lists by search or query |
| `toggleArr()` | Adds or removes values from arrays |
| `saveEdit()` | Saves edited category, tag, or project data |
| `updateCount()` | Recalculates classification count |

---

## 5. Scenario Layer — Scenario

Specific variation or condition.

**For Tasks:**

| Scenario | Expected Behavior |
|---|---|
| Task has no assignee | Show as unassigned |
| Task is overdue | Highlight as overdue |
| Task belongs to multiple projects | Appears in each project context |
| Task has no category | Still saves, but category remains blank |
| User filters by tag | Only matching tasks appear |
| User deletes project | System must decide whether tasks remain, archive, or unlink |

---

## 6. Specification Layer — Specification

Exact rules, fields, constraints, and design requirements.

**Example: Task Entity Specification**

| Field | Type | Required | Notes |
|---|---|---:|---|
| `id` | string | Yes | Unique identifier |
| `createdAt` | datetime | Yes | Created timestamp |
| `updatedAt` | datetime | Yes | Last updated timestamp |
| `title` | string | Yes | Task name |
| `description` | text | No | Task details |
| `status` | enum | Yes | Not Started / In Progress / Blocked / Done |
| `priority` | enum | No | Low / Medium / High |
| `dueDate` | date | No | Used for overdue logic |
| `assignee` | contact id | No | Assigned person |
| `projectType` | string | No | Anchor field |
| `projects[]` | array | No | Anchor field |
| `categories[]` | array | No | Anchor field |
| `tags[]` | array | No | Anchor field |

---

## 7. Enabler Layer — Enabler

Technical or internal work needed to support features.

| Enabler | Supports |
|---|---|
| Classification system | Tags, categories, project filtering |
| Shared schema system | All item and entity types |
| State management | Screens, widgets, filters |
| Search / filter engine | Tasks, notes, files, contacts |
| Authentication / permissions | Future user access control |
| Notification engine | Reminders and alerts |
| File storage integration | Documents, images, media |
| API layer | Future backend and data sync |
| Database structure | Persistence across entities |

---

## 8. UI Layer — Screen / Component / Widget

How the interface is structured and named.

| UI Term | {APP_NAME} Meaning |
|---|---|
| Screen | Full-page view — e.g. TasksScreen, NotesScreen, ProjectsScreen |
| Component | Reusable UI building block |
| Widget | Complex reusable component — e.g. ClassificationWidget |
| Modal | Temporary overlay for create or edit actions |
| Panel | Section of a screen, often for details or settings |

**Important:** A Widget is a type of Component, not a separate technical category.

---

## 9. Architecture Layer — Module

Grouped code with a responsibility.

| Module | Includes |
|---|---|
| Tasks Module | Task screen, task data, task filters, task actions |
| Notes Module | Notes screen, editor, folders, note data |
| Projects Module | Project list, project detail, project navigation |
| Classification Module | Anchors, categories, tags, project types |
| Settings Module | Feature progress, schema docs, configuration |
| Finance Module | Invoices, payments, income, expenses |
| Media Module | Files, images, documents |

**Important:** A Module is not always equal to a Capability. Finance Module supports multiple Capabilities (Invoices, Payments, Income, Expenses). Classification Module supports almost every Capability. One Capability may depend on several Modules.

---

## 10. Data Layer — Entity / Schema

Objects with identity, lifecycle, and formal structure.

| Entity | Capability |
|---|---|
| Task | Tasks |
| Note | Notes |
| File | Files |
| Image | Images |
| Contact | Contacts |
| Invoice | Invoices |
| Payment | Payments |
| Campaign | Campaigns |
| Project | Projects |
| Wiki Page | Wiki |
| Bookmark | Bookmarks |

{APP_NAME} uses schema-style definitions for item types, base fields, and Anchor fields. `window.SCHEMA` is the source of truth for item structures.

---

## Worked Example: Recurring Tasks

| Layer | Term | Example |
|---|---|---|
| Capability | Tasks | The system tracks work items, assignments, priorities, and deadlines. |
| Feature | Recurring Tasks | A task can repeat automatically on a defined schedule. |
| Use Case | User creates a weekly recurring task | User creates a task for a project, sets it to repeat weekly. |
| Functionality | Schedule engine | System saves the task, stores recurrence rules, generates or displays repeated instances. |
| Scenario | Due date on weekend | Task repeats weekly but the due date falls on a Saturday. |
| Specification | Recurrence fields | Frequency: daily / weekly / monthly. Required: title, frequency, start date. Optional: end date, assignee. |
| Enabler | Recurring schedule engine | Background service that generates/displays recurring task instances. |
| UI | TasksScreen + task form | ClassificationWidget for anchors. |
| Module | Tasks Module + Classification Module | Both needed to support recurring task creation. |
| Entity / Schema | `SCHEMA.types.task` + `SCHEMA.anchors` | Task entity with Anchor fields. |
