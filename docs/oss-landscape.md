# Plenix — OSS Landscape & Tool Decisions

> Single authoritative reference for all open-source tool decisions across every Plenix capability.
> Last updated: 2026-06-05

---

## 1. Architecture Principles

### Principle 1 — Self-Hosted Stack Model

All Plenix tools and services run on the user's own server, orchestrated via Docker Compose. Data never leaves the user's infrastructure. There is no Plenix cloud, no shared telemetry endpoint, and no third-party SaaS dependency required for core functionality. External integrations (Gmail, OneDrive, GitHub) are opt-in connectors that route data into Plenix — they do not push data out.

### Principle 2 — License Matrix

The license of a dependency determines how it can be integrated:

- **MIT / Apache 2.0** — Embed directly inside Plenix source code
- **AGPL / GPL** — Run as a separate Docker container on the Plenix server (self-hosted service). This satisfies copyleft requirements because no AGPL/GPL code is distributed inside Plenix itself
- **BSL (Business Source License) / Commercial** — Reference patterns and design inspiration only. Do not deploy or embed
- **MPL 2.0** — File-level copyleft. Generally safe for self-hosted deployment; modified MPL files must be disclosed

### Principle 3 — Critical AI/ML License Rule

For any AI or ML tool, verify **both** the code license AND the model weight license separately. They are almost always different documents with different commercial terms. A codebase being MIT does not make the model weights freely usable commercially. This applies to every OCR engine, every LLM, every embedding model, and every transcription tool in the stack.

### Principle 4 — Data Ownership

Plenix owns all data created within it. No third-party cloud service holds copies of user data. External integrations follow a strict **"link, don't duplicate"** model: Plenix fetches metadata and streams files on demand via OAuth2 tokens stored locally — it does not copy files to its own storage unless the user explicitly chooses Paradigm 2 (native self-hosted storage).

### Principle 5 — Three Integration Roles

Every tool in the stack has one of four roles:

| Symbol | Role | Meaning |
|--------|------|---------|
| 🔵 | **Embed** | MIT/Apache code runs inside Plenix application code |
| ⚙️ | **Self-hosted service** | Separate Docker container on Plenix server (AGPL/GPL safe this way) |
| 📖 | **Reference** | Study patterns, build natively. Do not deploy |
| 🏗️ | **Custom** | Build entirely in Plenix. No OSS tool satisfies the requirement |

---

## 2. License Matrix

| License | What It Means | Plenix Approach | Examples in Stack |
|---------|--------------|-----------------|-------------------|
| **MIT** | Permissive. Use, modify, distribute freely | Embed directly in Plenix source | LibreChat, ArchiveBox, Super Productivity, Argos Translate, Docling |
| **Apache 2.0** | Permissive. Patent grant included | Embed directly in Plenix source | PaddleOCR, Tesseract, WhisperLive, Airbyte, OpenRMF |
| **MPL 2.0** | File-level copyleft. Modified files must be open | Self-hosted or embed with file-level disclosure | ActivityWatch, Syncthing, OCRmyPDF |
| **AGPL v3** | Network copyleft. Any modification served over network must be open | Run as separate Docker container. Never embed | n8n, Meilisearch, Plane, Wiki.js, Mautic, SiYuan |
| **GPL v2 / v3** | Strong copyleft. Derivative works must be GPL | Run as separate Docker container. Never embed | OpenProject, Radicale, Paperless-ngx, Marker |
| **BSL** | Not free for commercial use until 4-year conversion to Apache | Reference design patterns ONLY. Do not deploy | Outline |
| **AAL** | Attribution Assurance License (Invoice Ninja) | Self-hosted for personal use. Verify commercial terms | Invoice Ninja |
| **Custom / Conditional** | Non-standard terms. May have commercial restrictions | Verify current license before any use | MinerU |
| **OpenRAIL-M (weights)** | Restricts certain commercial applications at model level | Verify model weight terms independently from code license | Surya model weights |

---

## 3. Self-Hosted Stack Model

Plenix runs as a Docker Compose stack on a single server (VPS, home server, or dedicated machine). The compose file defines all services, networks, and volumes. No service requires an external cloud endpoint to function.

**What runs on the server:**

- Plenix application server (Node.js / Next.js core)
- All embedded tools (MIT/Apache — compiled into or called from Plenix)
- All self-hosted services (AGPL/GPL containers): n8n, Meilisearch, Wiki.js, OpenProject, Plane, Radicale, Cal.com, Vaultwarden, PostHog, Mautic, Formbricks, Chatwoot, ActivityWatch, LibreTranslate, Karakeep, ArchiveBox
- All AI/ML inference (Whisper, PaddleOCR, Docling, Argos Translate, local LLMs via Ollama)
- All databases (PostgreSQL, Redis, object storage)

**What never leaves the server:**

- Notes, tasks, habits, goals, journal entries
- Email content and attachments (stored locally, synced via IMAP/SMTP)
- Calendar events and contacts (stored in Radicale on the server)
- Files (either streamed from external clouds on demand, or stored natively)
- Password vault (Vaultwarden — encrypted locally, never synced to Bitwarden cloud)
- Search index (Meilisearch — all content indexed locally)
- Analytics data (PostHog self-hosted — no external reporting)
- OCR output, document extractions, AI summaries

**What leaves the server only when explicitly opted in:**

- Prompts sent to cloud AI providers (OpenAI, Anthropic, Google Gemini) — opt-in only
- OAuth tokens transmitted to external APIs during authentication flow (tokens then stored locally)
- Outbound email via user's own SMTP server (e.g., Gmail SMTP with user credentials)

---

## 4. Critical AI/ML License Warning

When evaluating any AI or ML tool, two licenses must be reviewed independently:

**Code License** — governs the software, training scripts, inference server, and API wrapper. This is what GitHub displays. This is NOT sufficient for commercial use evaluation.

**Model Weight License** — governs the trained model file (the `.bin`, `.gguf`, `.safetensors`, or `.pt` file). This is a separate document, often found in a model card on Hugging Face or in a separate LICENSE file in the weights repository. Model weight licenses frequently contain commercial use restrictions, attribution requirements, or prohibited use clauses even when the code is MIT.

**Examples of the split:**

| Tool | Code License | Weight License | Plenix Status |
|------|-------------|----------------|---------------|
| Whisper (OpenAI) | MIT | MIT | Verify current Whisper model card before commercial use |
| Surya | Apache 2.0 | OpenRAIL-M style | Model weights have commercial conditions — verify before embedding |
| MinerU | Custom Apache-based | Separate model terms | Verify current terms — license changed from AGPL |
| PaddleOCR | Apache 2.0 | Apache 2.0 (most models) | Generally clean — verify per model |
| Docling (IBM) | MIT | MIT | Cleanest candidate — verify per model |

**Rule:** Before embedding or deploying any AI/ML tool in Plenix, file a license verification note confirming both the code license and the model weight license have been reviewed and are compatible with Plenix's deployment model.

---

## 5. Capability → Tool Map

| Capability | Primary Tool(s) | Role | License | Stars |
|------------|----------------|------|---------|-------|
| Messaging (V2) | Ferdium | Reference/Embed | Apache 2.0 | — |
| Messaging (V3) | mautrix bridges | Self-hosted service | AGPL | — |
| Email | imapflow + nodemailer | Embed | MIT | — |
| Email (reference) | Cypht, Thunderbird, Mailspring, Mail0 | Reference | MIT/MPL/GPL | — |
| Calendar (Core) | Radicale | Self-hosted service | GPL v3 | — |
| Calendar (Project) | OpenProject | Self-hosted service | GPL v3 | 15k |
| Calendar (Client) | Cal.com | Self-hosted service | AGPL | 42k |
| Contacts | Radicale | Self-hosted service | GPL v3 | — |
| Notes | SiYuan | Reference | AGPL | — |
| Tasks (personal) | Super Productivity | Embed | MIT | — |
| Tasks (project) | Plane | Self-hosted service | AGPL | 46k |
| Habits | Loop Habit Tracker, Habitica | Reference | GPL v3 | — |
| Goals | Leantime | Reference | MIT | — |
| Projects | OpenProject + Plane | Self-hosted service | GPL v3 / AGPL | 15k / 46k |
| Activity | ActivityWatch | Self-hosted service | MPL 2.0 | 17k |
| Audio | Navidrome (ref) + Whisper + WhisperLive | Reference / Embed | GPL / MIT / Apache | 76k / 101k / 4.1k |
| Video | Jellyfin | Reference | GPL v2 | — |
| Files | Rclone (ref) + Nextcloud (ref) + Syncthing (ref) | Reference | MIT/AGPL/MPL | — |
| Books | Calibre | Reference | GPL v3 | 22k |
| Documents | Paperless-ngx + paperless-gpt + paperless-ai | Self-hosted / Embed | GPL / MIT / MIT | 42k / 2.4k / 5.7k |
| Forms | Formbricks | Self-hosted service | AGPL | 12.4k |
| Journal | Moodiary, StoryPad, Daily You | Reference | AGPL/GPL | — |
| Text Templates | Espanso | Reference | GPL v3 | 12k |
| Translation | Argos Translate + LibreTranslate | Embed / Self-hosted | MIT / AGPL | 6.1k / 14k |
| Wiki | Wiki.js | Self-hosted service | AGPL | 26k |
| AI Chat | LibreChat | Embed | MIT | 38k |
| AI Agents | LangChain + LangGraph | Embed | MIT | 50k+ |
| Automations | n8n | Self-hosted service | AGPL | 100k+ |
| Voice Input | Whisper + WhisperLive | Embed | MIT / Apache 2.0 | 101k / 4.1k |
| Search | Meilisearch | Self-hosted service | AGPL | 58k |
| Password Manager | Vaultwarden | Self-hosted service | AGPL | 60k |
| Connectors | Airbyte | Self-hosted service | Apache 2.0 | 21k |
| Dashboard | Homepage | Reference | Apache 2.0 | 31k |
| Bookmarks | Karakeep + ArchiveBox | Self-hosted service | AGPL / MIT | 24k / 24k |
| Smart File Naming | paperless-gpt + paperless-ai | Embed (patterns) | MIT / MIT | 2.4k / 5.7k |
| OCR | PaddleOCR + Tesseract + OCRmyPDF + Docling | Embed | Apache/Apache/MPL/MIT | 76k / 73k / 32k / 61k |
| CRM | Frappe CRM | Embed | MIT | 2.8k |
| Agreements | DocuSeal + OpenCLM + OpenContracts | Reference | AGPL/TBD/TBD | 8k |
| Billing | Invoice Ninja (V1) + ERPNext (V2) | Reference | AAL / GPL v3 | 9.1k / 35k |
| Client Scheduling | Cal.com | Self-hosted service | AGPL | 42k |
| Analytics | PostHog + Umami | Self-hosted service | AGPL / MIT | 31k / 24k |
| Campaigns | Mautic | Self-hosted service | MIT | 7.2k |
| Social Publishing | Mixpost + Postiz | Reference | MIT / AGPL | — |
| Mood Boards | Penpot + Excalidraw | Reference | MPL / MIT | 49k / 100k |
| Project Control | Plane + OpenProject | Self-hosted service | AGPL / GPL v3 | 46k / 15k |
| Communication | Chatwoot | Self-hosted service | MIT | 30k |
| Prompt Studio | Plenix-native spine + schema refs (Langfuse, Agenta, Opik, Helicone, Espanso, ComfyUI PM) | Plenix-native + Schema Reference | MIT/Apache refs adaptable; GPL/AGPL reference-only | — |

---

> **Prompt Studio note.** No single OSS or commercial tool combines vault + builder + variables + versioning. Prompt Studio is **Plenix-native** for its UX and differentiating layers, but its **data schema is a composite spine grounded in verified OSS data models** (not invented): Langfuse/Opik (versions, runs, scores, datasets), Agenta (variant-as-branch), Helicone (hot/cold telemetry), Espanso (typed variables), ComfyUI PromptManager (image output assets), prompts.chat/PromptSource (seed import). UX references: PromptoMANIA (image token-card builder, *commercial*), Text Blaze (variable forms, *commercial*), PromptBox/Superpower (vault, *commercial*). Seed content bundles CC0 (prompts.chat) + CC-BY (Wharton GAIL) + Apache (PromptSource); all proprietary sources are link-only. Full UX/landscape detail in **prompt-studio-prd.md** §23; full schema lineage in §6.40 below and **prompt-studio-logical-schema.md**. `*` = commercial, study-for-UX-only, not embeddable.

---

## 6. Capability Deep Reference

---

### 6.1 Messaging

**Architecture: Two-Stage Approach**

Messaging is implemented in two staged versions.

**V2 — Webview Wrapper (practical, limited)**

Ferdium (Apache 2.0) provides a browser-based webview container that loads 100+ messaging services as isolated tabs. This is the fastest path to a "unified" messaging view without any backend infrastructure. However, because it uses webviews, Plenix has no access to message data — no unified inbox, no cross-service search, no AI processing, no project linking.

**V3 — Protocol Bridge (full capability)**

The mautrix bridge suite (AGPL) creates protocol-level daemons that translate each messaging network's proprietary protocol to Matrix. Each network runs as its own container:

- mautrix-whatsapp
- mautrix-telegram
- mautrix-signal
- mautrix-imessage
- mautrix-meta (Facebook Messenger, Instagram)
- Community bridges: Discord, Slack, Google Messages, LinkedIn, X, Bluesky

V3 gives Plenix full message data — enabling true unified inbox, universal search, AI summaries, and project linking.

**License Notes:**
All mautrix bridges are AGPL — each runs as a separate Docker container. Ferdium is Apache 2.0.

Beeper (OSS bridges + proprietary client) is an architecture reference only — study both the old Matrix bridge model and the July 2025 on-device model influenced by Texts.com. Matterbridge (Apache 2.0) is for community channel relay only, not personal inbox bridging.

**Critical Warnings:**
- E2EE terminates at the bridge. WhatsApp end-to-end encryption does not survive Matrix bridging. Plenix must communicate this clearly to users before they enable bridges.
- WhatsApp/Meta actively bans unofficial API clients. Bridges break periodically when Meta changes their protocol.
- iMessage bridging requires a Mac running mautrix-imessage relay 24/7. Apple actively fights this. This is inherently fragile.

---

### 6.2 Email

**Architecture: Native IMAP/SMTP Client**

Plenix builds its own email module. It is not a webview of Gmail or Outlook. All email data is fetched via IMAP and stored on the Plenix server. Sending uses SMTP. OAuth2 is required for Gmail and Outlook authentication — tokens are stored locally.

**Embedded Libraries:**
- **imapflow** (MIT) — Node.js IMAP library for fetching and syncing email
- **nodemailer** (MIT) — Node.js SMTP library for sending email

**Reference Tools:**
- **Cypht** (MIT) — Primary reference for multi-account aggregation. Purpose-built to combine disparate email accounts and RSS into one interface. Study the unified feed architecture and account badge system.
- **Thunderbird** (MPL 2.0) — Best reference for Unified Folders UX, account management, filter rules, and folder logic.
- **Mailspring** (GPL v3) — Best reference for modern desktop email UI patterns: snooze, send later, templates, link tracking.
- **Mail0/Zero** (MIT) — Most modern OSS email codebase. AI-first and privacy-first design reference.

**Key Implementation Notes:**
- Multiple accounts must collapse into a Unified Inbox (Cypht pattern: aggregate into one chronological feed with per-account color badges)
- JMAP (modern email protocol used by Fastmail) is worth tracking as a future IMAP replacement
- No email data is stored externally — all fetched content lives on the Plenix server

---

### 6.3 Calendar

**Architecture: Five Distinct Calendar Types**

Plenix has five calendar types. Each is owned by a different module. The Unified Calendar View is a display layer only — it renders all object types on one timeline without moving data between modules.

| Calendar Type | Owner Module | Protocol/Tool |
|--------------|-------------|---------------|
| Core Calendar (meetings, appointments) | Calendar module | CalDAV via Radicale |
| Project Calendar (milestones, phases) | Projects module | OpenProject |
| Content Calendar (publishing schedule) | Social Publishing module | Mixpost/Postiz |
| Campaign Calendar (campaign phases) | Campaigns module | Mautic |
| Client Scheduling (booking links) | Scheduling module | Cal.com |

**Tool Decisions:**
- **Radicale** (GPL v3, self-hosted) — CalDAV/CardDAV protocol server. Core Calendar and Contacts protocol layer.
- **Cal.com** (AGPL, self-hosted) — Client Scheduling ONLY. Booking links, availability windows, video call integration. Not for core calendar events.
- **OpenProject** (GPL v3, self-hosted) — Project Calendar, Roadmap, and Milestones.
- **Nextcloud Calendar** (AGPL, reference) — Calendar UI patterns: month/week/day views, event management.
- **Nextcloud Contacts** (AGPL, reference) — Contacts UI patterns: CardDAV-based, groups, sharing.

**License Notes:** Radicale and OpenProject are GPL — self-hosted containers. Cal.com is AGPL — self-hosted container.

---

### 6.4 Contacts

**Architecture: CardDAV Protocol**

Contacts data is stored on the Plenix server via Radicale's CardDAV server. A contact in Plenix represents a unified identity across all communication channels: email addresses, messaging handles, social profiles, and phone numbers resolve to a single contact record.

- **Radicale** (GPL v3, self-hosted) — CardDAV server, contacts protocol layer
- **Nextcloud Contacts** (AGPL, reference) — UI patterns for groups, sharing, and CardDAV sync

---

### 6.5 Notes

**Primary Reference: SiYuan**

SiYuan (AGPL) is the primary reference because it aligns most closely with Plenix philosophy: block-based (every paragraph is addressable), bidirectional links, native AI integration, iOS and Android mobile apps, flashcards, E2EE, and local-first storage.

**Additional References:**
- **TriliumNext** (AGPL) — Hierarchical tree organization, rich attribute system, powerful scripting API. Best reference for Plenix's tree navigation patterns and the custom metadata-fabric concept (key-value attributes on any node).
- **Logseq** (AGPL) — Graph view, daily journal pattern, backlinks. Reference for linked knowledge patterns.

**Implementation Notes:**
- Notes data is owned by Plenix natively — not stored in SiYuan's service. SiYuan is a reference, not a deployed service.
- The block-based model (every paragraph is a distinct addressable block) is essential for AI integration — an AI agent can reference, edit, or summarize individual blocks rather than entire documents.
- TriliumNext's attribute system (custom key-value metadata on any note) is the best reference for Plenix's metadata fabric concept.

---

### 6.6 Tasks

**Architecture: Three-Layer Task System**

The three layers are additive, not competing. Each answers a different question:

| Layer | Tool | Question Answered |
|-------|------|-------------------|
| Personal execution | Super Productivity | What am I doing today? |
| Project issues | Plane | What is the project doing? |
| Resource/enterprise | OpenProject | What are the resources doing? |

**Tool Decisions:**
- **Super Productivity** (MIT, embed) — Personal task execution with timeboxing, time tracking, focus mode, and integrations with Jira/GitLab/GitHub. Has kanban and lists. No Gantt, no team features. MIT = embed directly.
- **Plane** (AGPL, self-hosted) — Project issue tracking. Issues, sprints, cycles, roadmap, triage. Team-oriented PM, not personal execution.
- **Vikunja** (AGPL, reference) — Self-hosted task manager with lists, kanban, Gantt, CalDAV integration. Study for Gantt implementation patterns.

**License Notes:** Super Productivity is MIT — embed directly. Plane and Vikunja are AGPL — self-hosted containers only.

**Integration Note:** Time tracking data from Super Productivity integrates with project cost tracking in OpenProject.

---

### 6.7 Habits

**Architecture: Plenix-Native (OSS as Reference)**

Plenix builds habits natively. Loop Habit Tracker and Habitica are UX references only. No external service dependency for habits.

- **Loop Habit Tracker (uhabits)** (GPL v3, reference) — Best reference for habit UI patterns: graphs, statistics, streaks, ad-free, privacy-friendly.
- **Habitica** (GPL v3, reference) — Gamified web habit tracker. RPG-style motivation. Reference for gamification patterns.

---

### 6.8 Goals

**Architecture: Custom-Built**

No dominant OSS tool exists for goal management. Goals capability is built entirely in Plenix. Goals link to projects (vehicle), tasks (milestones), and habits (supporting behaviors).

- **Leantime** (MIT, reference) — PM tool with goals/strategy module designed for neurodiverse users. Reference for the goal-to-task connection architecture.

---

### 6.9 Projects

**Architecture: OpenProject + Plane Complementary Stack**

- **OpenProject** (GPL v3, self-hosted) — Gantt charts, resource management, budgets, time tracking, work packages, agile boards, wiki. Mature enterprise-grade PM. Primary Projects reference because of Resource management, Budgets, and Time tracking.
- **Plane** (AGPL, self-hosted) — Modern Jira/Linear alternative. Issues, sprints, cycles, roadmap, docs, triage. Most-starred OSS PM tool.
- **Leantime** (MIT, reference) — Strategy-to-execution PM. Neurodiversity-friendly patterns. Reference only.

OpenProject and Plane are complementary: OpenProject for the resource/Gantt/budget layer, Plane for the issues/sprints layer.

---

### 6.10 Activity (Time Tracking)

**Single Tool: ActivityWatch**

- **ActivityWatch** (MPL 2.0, self-hosted) — Automatic cross-platform privacy-focused time tracker. Passively records what the user does on their computer. 17k stars.

MPL 2.0 (Mozilla Public License) is file-level copyleft — generally safe for self-hosted deployment. Modified MPL files must be disclosed. ActivityWatch runs as a background service on Plenix infrastructure. All tracking data stays on the Plenix server.

---

### 6.11 Audio

**Two Distinct Audio Capabilities**

1. **Music Library** — Reference architecture from Navidrome (GPL v3). Navidrome provides a self-hosted music server with Subsonic API, web UI, and playlist management. This is a reference for the music library architecture only.

2. **Voice, Recordings, and Transcription** — Custom-built Plenix capability using:
   - **Whisper** (MIT, embed) — OpenAI speech-to-text for batch transcription
   - **WhisperLive** (Apache 2.0, embed) — Real-time transcription built on Whisper

Voice memos and recordings feed into Whisper for transcription, then into AI for summaries and Smart File Naming. The broader audio capability (voice memos, meeting recordings, AI summaries, project-linked audio) is custom-built in Plenix.

---

### 6.12 Video

**Reference: Jellyfin**

- **Jellyfin** (GPL v2, reference) — Free media system for streaming, metadata, thumbnails, and cross-device clients. Reference for video library architecture.

The broader Plenix video capability is custom-built: project video assets, captured social videos, meeting recordings, AI transcripts, and summaries. Video transcription feeds into Whisper, then AI for summaries.

---

### 6.13 Files

**Architecture: Dual-Paradigm**

**Paradigm 1 — External Cloud Abstraction:**
Files live in OneDrive, Google Drive, Dropbox, or other cloud storage. Plenix abstracts these APIs, mirrors metadata locally, and streams files on demand via OAuth2. "Link, do not duplicate." Files are never copied to Plenix storage unless the user explicitly requests it.

References:
- **Rclone** (MIT) — 70+ cloud provider abstraction, CLI sync. Reference for the external cloud API abstraction layer.
- **Alist** (AGPL) — Web UI mounting distributed cloud drives into one view. Reference for unified files presentation.

**Paradigm 2 — Native Self-Hosted Storage:**
Files are created or uploaded inside Plenix. Plenix is the storage. Bi-directional sync with user devices via desktop and mobile sync clients. WebDAV endpoint enables any WebDAV-compatible client.

References:
- **Nextcloud Files** (AGPL) — Primary reference. Desktop/mobile sync clients, WebDAV, sharing, permissions, public links.
- **Syncthing** (MPL 2.0) — P2P file sync daemon. Bi-directional sync, conflict resolution, block-level tracking.
- **Seafile** (AGPL) — Lean, fast file sync alternative. Reference for leaner sync patterns.

Both paradigms operate entirely on Plenix infrastructure.

---

### 6.14 Books

**Reference: Calibre**

- **Calibre** (GPL v3, reference) — Definitive e-book manager. View, convert, edit, and catalog e-books in all formats. 22k stars.

Calibre is a reference for library management, format conversion, and metadata patterns. The Plenix Books module is built natively using Calibre as the primary UX reference.

---

### 6.15 Documents

**Stack: Paperless-ngx + paperless-gpt + paperless-ai**

- **Paperless-ngx** (GPL v3, self-hosted) — Scan, OCR, tag, archive, and search documents. 42k stars. The document archive model and metadata architecture reference.
- **paperless-gpt** (MIT, embed) — LLM Vision for automated document title and tag generation. 2.4k stars.
- **paperless-ai** (MIT, embed) — AI document analyzer for classification, smart tagging, semantic search, and contextual analysis. 5.7k stars.

Both paperless-gpt and paperless-ai are MIT — they can be embedded directly in Plenix. The document pipeline feeds Smart File Naming, Universal Search, and AI Summaries.

Note: Plenix's Smart File Naming is a Plenix-owned pipeline inspired by these tools — not dependent on Paperless-ngx assumptions or data model.

---

### 6.16 Forms

**Primary: Formbricks**

- **Formbricks** (AGPL, self-hosted) — Survey and experience platform. Conditional logic, multi-language support, in-product surveys, analytics. 12.4k stars. Chosen because it is the most complete, has in-product survey capability (useful for Plenix itself to gather user feedback), and the best analytics.
- **HeyForm** (AGPL, reference) — Conversational form builder (Typeform-like). 9k stars.
- **OhMyForm** (AGPL, reference) — Lightweight Typeform/Google Forms alternative. 2.9k stars.

Formbricks is AGPL — runs as a self-hosted service on Plenix infrastructure.

---

### 6.17 Journal

**Primary Reference: Moodiary**

- **Moodiary** (AGPL, reference) — Cross-platform diary for Android, iOS, Windows, macOS, Linux. Multimedia attachments, full-text search, biometric lock, on-device TensorFlow AI, LAN/WebDAV sync. 1.9k stars. Chosen for the richest feature set, on-device AI, and true cross-platform including desktop.
- **StoryPad** (GPL v3, reference) — Timeline-based journal UI. Continuous chronological scroll, 45+ mood options, throwback feature, multi-page entries. The StoryPad timeline (continuous chronological scroll) is worth implementing in Plenix journal.
- **Daily You** (GPL v3, reference) — Lightweight local-first journal. Markdown, mood tracking, active development.
- **Journiv** (Open Core, reference) — Self-hosted web journal with analytics dashboard and prompts. Beta — not production-ready.

No OSS journal fully covers self-hosted web + polished mobile + full multimedia + AI. This is Plenix whitespace.

---

### 6.18 Text Templates

**Reference: Espanso**

- **Espanso** (GPL v3, reference) — Cross-platform privacy-first text expander built in Rust. Regex triggers, forms, shell command expansion, date expansions. 12k stars.

Plenix Text Templates is built natively. Espanso is studied for trigger patterns and template logic.

---

### 6.19 Translation

**Two-Tool Stack: Argos Translate + LibreTranslate**

- **Argos Translate** (MIT, embed) — Offline Python translation library. The underlying engine that powers LibreTranslate. MIT license — embed directly. 6.1k stars.
- **LibreTranslate** (AGPL, self-hosted) — Self-hosted offline translation API. 30+ languages, REST API. Built on Argos Translate. 14k stars.

Use Argos Translate for embedded/offline translation. Use LibreTranslate if an API service approach is preferred. Both support 30+ languages, run fully offline, and have no dependency on Google Translate or any cloud service.

**Critical:** Verify both code license AND model license before commercial use. This applies to all ML translation models.

---

### 6.20 Wiki

**Primary: Wiki.js**

- **Wiki.js** (AGPL, self-hosted) — Markdown editor, multiple auth options (LDAP/OAuth2/SAML), Git storage backend, WebDAV, multi-language, full-text search. 26k stars.
- **Outline** (BSL, reference ONLY) — Modern Notion-like team wiki. Real-time collaboration, beautiful UI. 39k stars. **BSL license — NOT free for commercial use.** Converts to Apache 2.0 after 4 years. Design patterns reference only. Do not deploy.
- **Logseq** (AGPL, reference) — Linked knowledge graph concepts. Bidirectional links, graph view, daily journal pattern. 43k stars. Reference for linked knowledge patterns, separate from the wiki module.

---

### 6.21 AI Chat

**Primary: LibreChat**

- **LibreChat** (MIT, embed) — Unified AI chat with multi-provider support (OpenAI, Anthropic, Google, Azure, Ollama), agents, MCP server support, artifacts, code interpreter, and custom actions. 38k stars.
- **Open WebUI** (MIT, reference) — Most popular self-hosted AI chat UI. Simpler but less capable. 135k stars. Reference for UI patterns.

LibreChat is chosen over Open WebUI because of multi-provider model selection, full agent framework, MCP server support, artifacts, and code interpreter. LibreChat is MIT — embed directly.

Local LLM support is via Ollama — no data leaves the Plenix server for local models. Cloud AI providers (OpenAI, Anthropic, Google) are opt-in only. User data leaves the server only when the user explicitly enables a cloud AI provider.

**Critical:** Verify both code license AND model weight license for every model used with LibreChat.

---

### 6.22 AI Agents

**Framework: LangChain + LangGraph**

- **LangChain** (MIT, embed) — Most adopted LLM agent framework. Chains, agents, RAG. 50k+ stars.
- **LangGraph** (MIT, embed) — LangChain extension for stateful multi-actor agent workflows.

Both are MIT — embed directly in Plenix. Agent tool permissions are hard constraints at the API level, not just prompt instructions. Each tool permission is enforced in code.

---

### 6.23 Automations

**Primary: n8n**

- **n8n** (AGPL, self-hosted) — Workflow automation with 400+ integrations, native AI/LangChain nodes, JavaScript/Python code support. 100k+ stars. Data stays on Plenix server.
- **Activepieces** (Apache 2.0, reference) — AI automation with MCP-style extensibility. 22.6k stars. Apache 2.0 — embeddable if n8n AGPL creates a constraint.

n8n is chosen over Activepieces because of a much larger ecosystem (400+ integrations) and more mature LangChain integration. If direct embedding is required instead of a self-hosted service, Activepieces (Apache 2.0) is the alternative.

---

### 6.24 Voice Input

**Stack: Whisper + WhisperLive**

- **Whisper** (MIT, embed) — OpenAI speech-to-text for batch transcription of recordings. 101k stars.
- **WhisperLive** (Apache 2.0, embed) — Real-time transcription built on Whisper for live voice input and dictation. 4.1k stars.

Whisper handles processed recordings (batch). WhisperLive handles real-time dictation (live). Both run locally on the Plenix server — audio never leaves the server. Whisper supports multilingual transcription including Arabic.

**Critical:** Code is MIT/Apache but model weights are a separate license. Verify the Whisper model card on Hugging Face for current commercial use terms.

---

### 6.25 Search

**Primary: Meilisearch**

- **Meilisearch** (AGPL, self-hosted) — Lightning-fast search API in Rust. Typo tolerance, faceted search, vector/semantic search, sub-50ms responses. 58k stars.
- **Typesense** (GPL v3, self-hosted) — Fast typo-tolerant search in C++. Geo search, autocomplete, vector search. 26k stars. Acceptable alternative.

Meilisearch is chosen for its larger community, better documentation, and highly portable Rust binary. The search index stays on the Plenix server. Meilisearch supports hybrid search (keyword + vector/semantic) — critical for AI-powered universal search.

Universal Search indexes all Plenix content: notes, tasks, files, contacts, emails, messages, bookmarks, and documents.

---

### 6.26 Password Manager

**Primary: Vaultwarden**

- **Vaultwarden** (AGPL, self-hosted) — Bitwarden-compatible server built in Rust. 50MB RAM, single Docker container, full compatibility with all official Bitwarden client apps. 60k stars.
- **Bitwarden Server** (AGPL, reference) — Official Bitwarden server. 1GB+ RAM, multi-container. Reference for enterprise features.

Vaultwarden uses the same Bitwarden client apps (desktop, mobile, browser extension) while requiring 50MB vs 1GB+ RAM and running as a single container vs multi-container.

**Security isolation rule:** The password vault is deliberately isolated from all other Plenix data. A breach of notes, tasks, or files must not compromise the vault. Vault data is encrypted with AES-256-GCM, key derived via PBKDF2. Vault data stays on the Plenix server — no sync to Bitwarden cloud servers.

---

### 6.27 Connectors

**Primary: Airbyte**

- **Airbyte** (Apache 2.0, self-hosted) — Open-source data integration platform with 600+ pre-built connectors for moving data between APIs, databases, and warehouses. 21k stars.

Airbyte is Apache 2.0 — can be embedded or run as a self-hosted service. Connectors route external data into Plenix sections:

| Source | Plenix Destination |
|--------|-------------------|
| Gmail | Email module |
| Google Calendar | Calendar module |
| GitHub Issues | Tasks module |
| Notion | Notes/Wiki module |
| Slack | Messaging module |
| Shopify | Billing/CRM module |
| SEMrush | Analytics module |

All OAuth tokens and API keys are stored in local encrypted storage on the Plenix server. Credentials are never transmitted externally except during the OAuth flow itself.

---

### 6.28 Dashboard

**Reference: Homepage**

- **Homepage** (Apache 2.0, reference) — Fast service dashboard with 100+ integrations, Docker auto-discovery, and widget patterns. 31k stars.

Homepage is a reference for dashboard layout and widget patterns only. The Plenix dashboard is fully custom — it is not a service launcher. Plenix dashboard requirements: projects health, task queue, calendar, habits, AI productivity suggestions, activity heatmap, notifications, and linked items. Homepage does not provide project health, pending actions, or AI-driven productivity insights.

---

### 6.29 Bookmarks

**Two-Tool Stack: Karakeep + ArchiveBox**

- **Karakeep** (formerly Hoarder) (AGPL, self-hosted) — AI-tagged bookmark manager for links, notes, images, and PDFs. AI auto-tagging, full-text search, collections, reading list. 24k stars.
- **ArchiveBox** (MIT, self-hosted) — Web archiving. Saves HTML, PDF, screenshots, WARC, and media. Personal Wayback Machine. 24k stars.
- **Linkwarden** (AGPL, reference) — Collaborative bookmark manager with annotations and web content preservation. 18.5k stars.

Karakeep and ArchiveBox are complementary:
- Karakeep = capture, organize, retrieve (user-facing bookmarks)
- ArchiveBox = preserve, archive, prove (preservation infrastructure when user chooses "save full page")

AI auto-tagging in Karakeep directly aligns with the Plenix "AI as organizing assistant" philosophy.

---

### 6.30 Smart File Naming

**Architecture: Plenix-Owned Pipeline**

Smart File Naming is a Plenix-owned pipeline — not dependent on Paperless-ngx assumptions.

Pipeline:
1. OCR output (PaddleOCR / Tesseract)
2. Docling structured extraction (layout, tables, reading order)
3. LLM analysis (paperless-gpt / paperless-ai patterns)
4. Plenix metadata (date, project, contact, category)
5. Suggested filename output

Example: A scanned PDF of a plumbing estimate becomes `2026-06-05_KitchenReno_ABCPlumbing_Estimate3021.pdf`

**References (patterns only, not dependencies):**
- **Paperless-ngx** (GPL v3) — Document archive and OCR metadata model
- **paperless-gpt** (MIT, embed candidate) — LLM Vision for automated title/tag generation
- **paperless-ai** (MIT, embed candidate) — AI document analysis patterns

---

### 6.31 CRM

**Primary: Frappe CRM**

- **Frappe CRM** (MIT, embed) — Open-source CRM for modern sales teams. Pipeline, contacts, deals, activities. MIT = embed directly. Same Frappe framework as ERPNext = natural finance integration path. 2.8k stars.
- **Twenty CRM** (AGPL, reference) — Modern Salesforce alternative. Polished UI, GraphQL + REST, native MCP server. 49k stars. Reference for modern CRM UI design patterns.

Frappe CRM is chosen over Twenty because of its MIT license (embeddable), deep UI customization capability, and the Frappe framework synergy with ERPNext (same ORM, same permission system, natural integration path to full accounting).

---

### 6.32 Agreements

**Four Distinct Jobs**

Agreements capability covers four separate jobs that require four separate tools:

| Job | Tool | License |
|-----|------|---------|
| E-signature execution | DocuSeal | AGPL |
| Contract lifecycle management | OpenCLM | TBD — needs license review |
| AI contract review | OpenContracts/cite | TBD — needs maturity/license review |
| Smart legal contracts (V2+) | Accord Project | Apache 2.0 |

**Tool Details:**
- **DocuSeal** (AGPL, reference) — PDF form builder, multiple submitters, SMTP, storage, API, webhooks. 8k stars.
- **OpenSign** (TBD, reference) — E-signature alternative similar to DocuSeal. Needs license review.
- **OpenCLM** (TBD, reference) — CLM lifecycle: templates, clause library, approvals, renewals, obligation tracking. Needs maturity and license review.
- **OpenContracts/cite** (TBD, reference) — AI contract review: clause extraction, risk identification, legal document intelligence.
- **Accord Project** (Apache 2.0, future reference) — Machine-readable smart legal contracts. Not V1.

**Plenix Agreement Object Structure:**
Title, party, status (draft/review/sent/signed/expired/renewed), signed PDF, linked project, linked contact, effective date, expiration date, renewal reminder, obligations, payment terms, approval status, AI summary, key clauses, risk flags.

---

### 6.33 Billing

See Section 10 — Financial Stack for the full billing architecture.

---

### 6.34 Client Scheduling

**Primary: Cal.com**

- **Cal.com** (AGPL, self-hosted) — Scheduling platform with booking links, round-robin routing, routing forms, 70+ integrations, and workflow automation. 42k stars.

Cal.com runs as a self-hosted service on Plenix infrastructure. Client Scheduling is a separate capability from Core Calendar (which uses Radicale/CalDAV). Cal.com generates video call links (Zoom, Google Meet, Microsoft Teams) automatically upon booking.

---

### 6.35 Analytics

**Two-Tool Stack: PostHog + Umami**

- **PostHog** (AGPL, self-hosted) — Product analytics. Session replay, funnels, feature flags, A/B testing, surveys, LLM observability. 31k stars.
- **Umami** (MIT, self-hosted or embed) — Web and marketing analytics. Cookie-free, privacy-first, lightweight. 24k stars.
- **Plausible** (AGPL, reference) — Privacy-first web analytics. 21k stars.

PostHog is for Plenix product analytics (understanding user behavior inside the app). Umami is for website/marketing analytics (external traffic analysis). Both are self-hosted on Plenix infrastructure — no analytics data is sent to external providers.

---

### 6.36 Campaigns

**Primary: Mautic**

- **Mautic** (MIT, self-hosted) — Full marketing automation. Email campaigns, audience segments, lead scoring, multi-channel (email + SMS + social), CRM features. 7.2k stars. MIT = self-hosted on Plenix infrastructure.
- **Chatwoot** (MIT, self-hosted) — Omnichannel customer conversations. Already locked for Communication Channels — separate from campaign automation.
- **Listmonk** (AGPL, reference) — High-performance email campaigns as a single Go binary. Reference for simpler email campaign patterns. 20k stars.

Mautic is chosen for full marketing automation, CRM features, and multi-channel support. Campaigns calendar uses Mautic for campaign automation plus Mixpost/Postiz for social publishing.

---

### 6.37 Social Publishing

**Two-Tool Reference Stack**

- **Mixpost** (MIT, reference) — Primary reference. Unified dashboard for 11 platforms. Analytics, media library, templates, connected accounts, approval workflow, team/client model, white-label. Strongest traditional social media management.
- **Postiz** (AGPL, reference) — Secondary reference. 30+ platforms, AI content generation, n8n/Make/Zapier integration, agentic social scheduling.

Mixpost is the primary reference for the social media management dashboard, content calendar UI, analytics, and templates. Postiz is the primary reference for AI/agentic content automation and broader platform coverage (30+ vs 11).

Content Calendar (publishing posts) is a separate capability from Campaign Calendar (managing campaign phases).

---

### 6.38 Mood Boards

**Architecture: Custom with Reference Tools**

Plenix Mood Board = visual canvas + media library (Immich) + metadata + AI visual search.

- **Penpot** (MPL 2.0, reference) — Design-grade visual workspace. Layouts, brand systems, collaborative design, open web standards. 49k stars. Reference for structured layout approach.
- **Excalidraw** (MIT, reference) — Lightweight infinite canvas. Free-form arrangement, sketches, notes, shapes, quick ideation. 100k stars. Reference for free-form canvas approach.

Plenix builds mood boards natively, drawing from both references. Immich (already in the stack) provides the media/asset library layer. AI visual search (style/mood-based) is a V2+ feature inspired by Google Mood Board Search.

---

### 6.39 Project Control

**Architecture: Plane + OpenProject + Custom**

- **Plane** (AGPL, self-hosted) — Issues, sprints, cycles, roadmap, timeline views, triage. 46k stars. Handles Issue Tracking and Roadmap planning.
- **OpenProject** (GPL v3, self-hosted) — Resource allocation, Gantt, budgets, timesheets, work packages. 15k stars. Handles Resourcing, Gantt, and budget tracking.
- **OpenRMF** (Apache 2.0, reference) — Risk/compliance framework. 500 stars. Reference for risk management patterns.

Risks and Changes modules are largely custom-built in Plenix. OpenRMF is a reference for risk management patterns despite its niche status.

---

### 6.40 Prompt Studio

**Architecture: Plenix-native workspace over a composite, OSS-grounded schema spine**

No single OSS or commercial product combines vault + builder + variables + versioning + multi-target execution. Prompt Studio's UX and differentiating layers are native, but its **data schema reuses proven OSS data models** rather than being invented. Verified from primary source (Prisma schemas, SQL migrations, ORM models). Full detail in `prompt-studio-prd.md` §27, `prompt-studio-logical-schema.md`, and `prompt-studio-domain-types.ts`.

**Schema lineage (Adopt / Adapt / Native):**

| Layer | OSS source | License | Role |
|---|---|---|---|
| Prompt + Version | **Langfuse** (MIT core) + **Opik** (Apache 2.0) | MIT / Apache | Adapt — normalized parent (Opik) + immutable versions (Langfuse); `(name,version)` identity + optional commit hash |
| Variant-as-branch | **Agenta** (MIT) | MIT | Adopt — `Application→Variant→Revision`; the only OSS tool with true branches |
| Run / Trace / Span | **Langfuse** + **Opik** | MIT / Apache | Adapt — `Observation`/`spans`, run pins exact version |
| Telemetry (hot/cold) | **Helicone** (Apache 2.0) | Apache | Adapt — token/latency on hot path; bodies + cost off-path |
| Test bench join | **Langfuse** `DatasetRunItems` / **Opik** `experiment_items` | MIT / Apache | Adopt — universal eval join (`TestBenchSession`/`TestBenchItem`) |
| Scores / evals | **Langfuse** `Score` / **Opik** `feedback_scores` | MIT / Apache | Adopt — polymorphic `PromptScore` |
| Assertions | **Promptfoo** (MIT) | MIT | Adapt — `PromptAssertion` (type/value/threshold/metric) |
| Typed variables | **Espanso** (GPL-3.0) | GPL — **reference only** | Adapt — `{name,type,params}` shape (do not embed) |
| Workflow graph | **Dify** / **Flowise** / **Langflow** | Dify-OSS / Apache / MIT | Adapt — normalized steps for determinism (reject monolithic graph blob) |
| Image output assets | **ComfyUI PromptManager** (MIT) | MIT | Adapt — `generated_images` → `PromptOutputAsset` |
| Seed import format | **prompts.chat** (CC0) / **PromptSource** (Apache) | CC0 / Apache | Adapt — CSV/Jinja import mapping |

**Native layers (no adequate OSS model):** execution targets + credentials, syntax profiles, license provenance (`LicenseMetadata`), `use_only`/security/permissions/audit, packs, variable-environment stack, style profiles/blocks, project kits, trigger/insertion profiles, usage records.

**Key corrections from the audit (assumptions that were wrong):**
- Langfuse has **no** variant table and **no** label/alias table — only versions + a `labels[]` column; it does **not** model variants-as-branches (only Agenta does).
- Opik versions by **git-style commit hash**, not an int.
- Helicone stores **no cost column and no bodies** in its hot table — validates the `storage_mode`/cold-payload split.
- Dify embeds workflow nodes in a **JSON graph blob**, not tables — Plenix deliberately normalizes for determinism.

**License posture:** MIT/Apache references (Langfuse, Agenta, Opik, Helicone, ComfyUI PM, Promptfoo, Flowise, Langflow, prompts.chat, PromptSource) are adaptable into the self-hosted build. **Espanso (GPL-3.0)** and any AGPL tools are reference-only — study patterns, reimplement; do not embed (§13 boundary).

**Seed content:** bundle CC0 (prompts.chat, ~1,870), CC-BY (Wharton GAIL, with attribution), Apache (PromptSource, optional technical set). All proprietary/community sources (PromptHero, Snack, FlowGPT, God of Prompt, Anthropic/OpenAI/Google/Microsoft libraries) are **Discover link-only** — never copied (`license = link-only`).

---

## 7. OCR / Document Intelligence Stack

The OCR stack is the most architecturally complex area of Plenix. Multiple tools handle different document types. Routing logic determines which tool processes which input.

### 7.1 Tool Inventory

| Tool | License (Code) | License (Weights) | Role | Stars | Status |
|------|---------------|------------------|------|-------|--------|
| **PaddleOCR** | Apache 2.0 | Apache 2.0 (most models) | General OCR: images, screenshots, multilingual | 76k | Primary — embed |
| **Tesseract** | Apache 2.0 | Apache 2.0 | Classic OCR engine for scanned documents | 73k | Primary — embed |
| **OCRmyPDF** | MPL 2.0 | N/A | Scanned PDF → searchable PDF pipeline | 32k | Primary — embed |
| **Docling** (IBM Research) | MIT | MIT | AI-ready document parsing: layout, tables, reading order, Markdown/JSON output | 61k | Primary AI pipeline — embed |
| **Unstructured** | Apache 2.0 | N/A | Document ETL for LLMs: 30+ file types, chunking, LangChain integration | 15k | Embed |
| **MinerU** | Custom Apache-based | Separate model terms | Complex PDF/doc parsing → Markdown/JSON | 62k | Verify current license before use |
| **Surya** | Apache 2.0 | OpenRAIL-M style | Layout, tables, reading order, 90+ languages | 20k | Verify weight license before embedding |
| **Marker** | GPL v3 | Separate | PDF → Markdown/JSON | 34k | Self-hosted service only (GPL) |
| **olmOCR** | Apache 2.0 | TBD | PDF linearization for LLMs via VLMs | 17k | Benchmark candidate |
| **Tabula** | MIT | N/A | Table extraction from text-based PDFs | 5k | Embed — narrow fallback |
| **Camelot** | MIT | N/A | Python PDF table extraction: lattice + stream modes | 3k | Embed — narrow fallback |
| **Calamari** | Apache 2.0 | TBD | Handwriting recognition — multi-model voting | 1k | V2+ |
| **Kraken** | MIT | TBD | Historical/handwritten OCR — custom trainable | 2k | V2+ |

### 7.2 Routing Logic

| Input Type | Routing | Tool |
|-----------|---------|------|
| Screenshot or image | → General OCR | PaddleOCR |
| Scanned PDF (image-based) | → Searchable PDF pipeline | OCRmyPDF + Tesseract |
| Structured document for AI pipeline | → AI document parsing | Docling |
| Table-only PDF (text-based) | → Table extraction | Tabula or Camelot |
| Handwriting (V2+) | → Handwriting OCR | Calamari or Kraken |

### 7.3 License Warning Matrix

| Tool | Action Required |
|------|----------------|
| Docling | Cleanest primary candidate. MIT codebase. Verify per-model weight terms. |
| PaddleOCR | Apache 2.0 for most models. Verify per specific model checkpoint. |
| Surya | Code is Apache 2.0. Model weights are OpenRAIL-M style with commercial conditions. Verify before embedding. |
| MinerU | License changed from AGPL to custom Apache-based with additional conditions. Verify current terms before any commercial use. |
| Marker | GPL v3 — cannot embed. Run as background service container only. |
| OCRmyPDF | MPL 2.0 — file-level copyleft. Modified MPL files must be disclosed. |

### 7.4 Implementation Status

Status: **Architecturally selected — pending benchmark testing** on real Plenix documents including contracts, invoices, receipts, and church documents. Benchmark results may adjust tool selection at the routing level.

---

## 8. Calendar Architecture

Plenix has five distinct calendar types. This is not a single calendar with different event colors — each type is owned by a different module with its own data model.

### 8.1 Five-Type Taxonomy

| Calendar Type | What It Tracks | Owner Module | Protocol/Tool | Displayed In |
|--------------|---------------|-------------|---------------|--------------|
| **Core Calendar** | Meetings, appointments, personal events | Calendar module | CalDAV (Radicale) | Unified Calendar View |
| **Project Calendar** | Milestones, phases, project deadlines | Projects module | OpenProject | Unified Calendar View |
| **Content Calendar** | Social media publishing schedule | Social Publishing module | Mixpost / Postiz | Unified Calendar View |
| **Campaign Calendar** | Campaign phases, launch windows | Campaigns module | Mautic | Unified Calendar View |
| **Client Scheduling** | Booking availability, client-facing appointments | Scheduling module | Cal.com | Separate booking interface |

### 8.2 Unified Calendar View

The Unified Calendar View is a display-only layer. It renders all object types — events, milestones, content posts, campaign phases — on one timeline. Each object remains owned by its source module. The Unified Calendar View does not store any calendar data itself.

### 8.3 Protocol Layer

- Core Calendar uses CalDAV protocol via Radicale (GPL v3, self-hosted)
- Contacts use CardDAV protocol via Radicale (same service)
- Cal.com handles client-facing booking separately — it is not the core calendar

---

## 9. Messaging Architecture

### 9.1 V2 — Webview Approach

**Tool:** Ferdium (Apache 2.0)

Ferdium loads messaging services as isolated browser webview tabs. Implementation is fast and covers 100+ services. However, because Plenix only sees a webview and not the underlying message data, V2 provides:

- No unified inbox (messages stay inside each webview tab)
- No cross-service search
- No AI message summaries
- No project or task linking from messages
- No notification aggregation

V2 is appropriate for early releases where unified messaging infrastructure is not yet available.

### 9.2 V3 — Protocol Bridge Approach

**Tool:** mautrix bridge suite (AGPL, self-hosted services)

Each messaging network runs as its own protocol bridge daemon. The bridge translates the network's proprietary protocol to Matrix protocol, giving Plenix full message data access.

**Bridge coverage:**

| Network | Bridge |
|---------|--------|
| WhatsApp | mautrix-whatsapp |
| Telegram | mautrix-telegram |
| Signal | mautrix-signal |
| iMessage | mautrix-imessage |
| Facebook Messenger | mautrix-meta |
| Instagram | mautrix-meta |
| Discord | Community bridge |
| Slack | Community bridge |
| Google Messages | Community bridge |
| LinkedIn | Community bridge |
| X (Twitter) | Community bridge |
| Bluesky | Community bridge |

V3 enables: true unified inbox, universal search across all messages, AI summaries, project linking, and cross-capability integration.

**Architecture reference:** Beeper (OSS bridges + proprietary client) — study both the old Matrix bridge model and the July 2025 on-device model influenced by Texts.com.

### 9.3 Critical Warnings

**E2EE Termination:** Bridging terminates the original end-to-end encryption at the bridge daemon. WhatsApp E2EE does not survive Matrix bridging. Signal E2EE does not survive Matrix bridging. Plenix must communicate this clearly and prominently to users before they enable any bridge. This is not a Plenix limitation — it is a fundamental property of protocol bridging.

**Platform Risk:** WhatsApp and Meta actively ban unofficial API clients. Bridges break periodically when Meta changes their protocol. This cannot be fully mitigated — it is an ongoing operational reality.

**iMessage Requirement:** iMessage bridging requires a Mac running the mautrix-imessage relay daemon 24/7. Apple actively attempts to prevent unofficial iMessage access. This capability is inherently fragile and should be clearly flagged as experimental.

---

## 10. Financial Stack

### 10.1 Two-Tier Architecture

The financial stack is deliberately tiered to avoid forcing all users into enterprise ERP complexity.

**Tier 1 (V1) — Practical Billing**

Modeled on Invoice Ninja (AAL license, reference). Suitable for freelancers, solopreneurs, and small businesses. Covers:
- Invoices and quotes
- Recurring billing
- Payment tracking
- Expenses and vendor management
- Purchase orders
- Project-linked time tracking
- Client portal

**Tier 2 (V2/V3) — Full Accounting**

Modeled on ERPNext (GPL v3, reference) and Akaunting (GPL v3, reference). For users who need real bookkeeping. Covers:
- True double-entry accounting
- Chart of accounts
- Profit & Loss statements
- Balance sheets
- Payroll
- Inventory management
- Tax reporting

### 10.2 Tool Reference Map

| Tool | Tier | License | Stars | Role |
|------|------|---------|-------|------|
| Invoice Ninja | V1 | AAL | 9.1k | Billing UI patterns — invoices, expenses, projects, time tracking |
| ERPNext | V2/V3 | GPL v3 | 35k | Full ERP reference — double-entry, P&L, balance sheet, payroll. Same Frappe framework as Frappe CRM |
| Akaunting | V2 | GPL v3 | 9.9k | Middle-ground — double-entry without full ERP complexity |
| Firefly III | Personal | AGPL | 24k | Personal finance manager — personal budgets, expense tracking only. NOT business accounting |
| InvoicePlane | V1 alt | MIT | 3.1k | Simple focused invoicing. MIT = embed |

### 10.3 ERPNext Synergy Note

ERPNext shares the Frappe framework with Frappe CRM (the chosen CRM tool). This creates a natural integration path in V2/V3: same ORM, same permission system, same frontend framework. A user who starts with Frappe CRM in V1 can expand into ERPNext accounting without a framework boundary crossing.

### 10.4 Scope Boundary

Firefly III is for personal finance management (personal budgets, expense tracking, rules) — it is NOT a business accounting tool and must not be confused with the business billing/accounting stack.

---

*End of Plenix OSS Landscape & Tool Decisions*
