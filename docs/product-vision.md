# Product Vision

**The founding document. Why {APP_NAME} exists, what it solves, and how it works.**

---

## The Problem

Modern digital life is fragmented. A single person may use 8–12+ separate tools daily just to stay organized. This creates three core pain points:

| Pain Point | Description |
|---|---|
| **Data Duplication** | The same information gets copied across tools. A note in OneNote, a reminder in a task app, a bookmark in the browser, a saved post on social media — all related to the same thing, living in different places. |
| **Lost Context** | When data lives in silos, the relationships between items disappear. A saved recipe video has no connection to the grocery list in your task manager or the bookmark to the kitchen supply store. |
| **Retrieval Failure** | Users forget where they saved something, why they saved it, and links expire. Files get saved with meaningless names like `Document1.pdf` or `IMG_4023.jpg` because saving prioritizes speed over organization. |

---

## The Vision

A single, AI-powered ecosystem that unifies how a person captures, organizes, connects, communicates, retrieves, and acts on all forms of personal information — without duplicating data or replacing the heavy-duty tools they already use.

---

## Core Philosophy

| Principle | Description |
|---|---|
| **One ecosystem, not one more app** | This isn't another silo — it's the connective layer across all your information. |
| **Link, don't duplicate** | Data stays where it lives (OneDrive, Google Drive, Dropbox). The platform connects to source files via metadata and linking — not by importing copies. |
| **Metadata is the fabric** | Tags, timestamps, sources, AI-generated summaries, and relationships tie everything together. A single item can belong to multiple projects, categories, and contexts simultaneously. |
| **Capture everything, lose nothing** | Whether it's a video, a screenshot of text, an audio clip, or a webpage — the system captures and preserves the content (not just a fragile link), enriched with metadata. |
| **AI as the organizing assistant** | AI handles the tedious work — auto-tagging, summarizing, OCR, transcription, facial recognition, intelligent file naming — so the user focuses on using their information, not filing it. |
| **Communicate without switching** | Conversations happen across SMS, WhatsApp, Slack, and more — but the user shouldn't have to jump between five apps. One interface, all channels. |

---

## What the Platform Unifies

| Traditional Silo | Unified in {APP_NAME} |
|---|---|
| Calendar app | Calendar — events, scheduling, availability |
| Task manager | Tasks — to-dos, subtasks, Kanban, priorities |
| Note-taking app | Notes — rich text, folders, AI summarization |
| File manager | Files — OneDrive/GDrive/Dropbox integration, Smart File Naming |
| Bookmark manager | Bookmarks — metadata, collections, content archival, reader |
| Social media saved items | Capture — video, image, audio with transcription and OCR |
| Photo gallery / DAM | Images, Video, Audio — digital asset management with AI tagging |
| Contacts / CRM | Contacts — people, companies, suppliers, linked records |
| SMS, MMS, WhatsApp, Slack, Teams | Messaging — unified inbox across all channels |
| Zoom, Google Meet, etc. | Scheduling — meeting launcher integrated into Project Home |
| Email client | Email — send, receive, manage from within the platform |
| Password manager | Password Manager — encrypted vault, generator, auto-clear |
| Spreadsheets / Accounting | Bookkeeping, Invoices, Expenses, Income — financial modules |
| CRM / Sales pipeline | Deals, Leads, Estimates, Proposals, Contracts — client pipeline |
| Project management tool | Projects — workspace hubs that surface all capabilities scoped to one initiative |
| AI assistant | AI Chat, AI Agents, Prompt Studio, Model Selection — AI layer |
| Wiki / Knowledge base | Wiki, Documents, Journal, Books — long-form knowledge |
| Automation platform | Automations — scheduled tasks, event triggers, AI workflows |
| Content planner | Content Calendar, Campaigns, Channels — marketing modules |
| Time tracker | Time Tracking, Timesheets — billable hours and reporting |

---

## Unified Messaging Hub

| Phase | Description |
|---|---|
| **V1 Scope** | A single messaging interface with tabbed views aggregating SMS, MMS, and WhatsApp. Read, respond, and search across all channels from one place. |
| **Future Phases** | Expand to Slack, Teams, and other platforms. Conversations linked to Projects — a WhatsApp thread with a contractor auto-associates with the Kitchen Renovation project. |
| **Key Principle** | {APP_NAME} does not replace these services — it integrates with them. Messages are sent and received through the native platforms. The unified hub is the interface, not the infrastructure. |

---

## Smart File Naming

**Example:**

~~`IMG_4891.png`~~ → `2025-03-02_KitchenReno_ContractorQuote_ABCPlumbing.png`

Derived from: date + linked project + OCR content + identified contact. User always has final say.

See Smart File Naming PRD for full specification.

---

## Project Workspace

A Project Workspace is a hub-style experience that surfaces every capability the user has enabled, filtered and scoped to a single initiative. The architecture is capability-based; the user experience is workspace-based.

**Key principle — the fabric model:** Items are not moved into a project; they are *anchored* to it via the `projects[]` field. A task, file, note, or contact can belong to zero, one, or many projects simultaneously. The project workspace is a lens, not a folder.

**What lives inside a Project Workspace:**

| Tab | Source Capability | What it shows |
|---|---|---|
| Overview | Projects | Mission control — metrics, pinned items, recent activity, quick actions |
| Tasks | Tasks | All tasks anchored to this project — list, Kanban, or calendar view |
| Files | Files + DAM | All files and digital assets anchored to this project |
| Notes | Notes | All notes anchored to this project |
| Wiki | Wiki | Project-scoped knowledge base with hierarchical pages |
| Calendar | Calendar | All events anchored to this project + milestone markers |
| Roadmap | Roadmap | Gantt-style timeline with tasks, milestones, and dependencies |
| People | Contacts | Project contacts with roles (Owner, Client, Consultant, etc.) |
| Links | Bookmarks | Project-scoped bookmarks with auto-detected domain icons |
| Images | Images | Project gallery — upload, URL, Unsplash |
| Mood Boards | Mood Boards | Named visual direction boards, shareable with clients |
| Proposals | Proposals | Estimates and proposals for this project |
| Invoices | Invoices | Billing scoped to this project |
| Activity | Activity | Chronological event log for everything that happened in this project |
| AI Summary | AI Agents | AI-generated executive summary, risk flags, suggested actions |

Each tab is a standard capability view with a pre-applied anchor filter — build once, filter everywhere. Users enable or disable tabs per project. The same data appears in both the project workspace and the universal capability view.

### The Presentation Use Case

Today a user presenting on Zoom alt-tabs frantically between PowerPoint, a spreadsheet, file explorer, and notes. With the Project Workspace, all linked resources are accessible from one hub. The project view becomes the cockpit for the meeting — everything is one click away, not five windows deep.

---

## Key Use Cases

| # | Use Case | Description |
|---|---|---|
| 1 | **Research & Presentation** | Gather notes, images, bookmarks, and files for a presentation. During a virtual meeting, all materials accessible from one workspace. |
| 2 | **Social Media Content Capture** | See a recipe on Instagram — the system saves the actual content (not just an expiring link). Metadata, transcription, and tags auto-generated. |
| 3 | **Private Media Saving** | Save video content without exposing the social media source. Content preserved with metadata. |
| 4 | **Image as Text** | Screenshot text — OCR automatically extracts the words, making it searchable and usable. |
| 5 | **Intelligent Retrieval** | Search "that contractor I found last month" — system finds it via tags, dates, AI summaries, and linked projects. |
| 6 | **Unified Conversations** | Coordinate a renovation via WhatsApp with the contractor, SMS with a spouse, email with the designer — all visible in one hub, all linked to the project. |
| 7 | **Smart File Saving** | Save a document and the system auto-suggests a meaningful, convention-based name derived from content and context. |

---

## What {APP_NAME} Is Not

- **Not** a replacement for heavy productivity tools (MS Office, Adobe, etc.)
- **Not** a social media app — it captures and preserves content from social platforms
- **Not** a messaging service — it aggregates and unifies existing messaging channels

---

## Target User

{APP_NAME} is for people whose work and life depend on managing high volumes of information across many tools — and who are already frustrated enough to seek a solution.

- Knowledge workers / professionals juggling projects across tools
- Freelancers / solopreneurs who are their own admin, manager, and operator
- Power users / digital hoarders — someone who saves everything but can never find anything
- Creative professionals managing reference material, inspiration, client work across platforms
- Students / researchers drowning in sources, notes, and reference material

**This is not for the casual user.**
