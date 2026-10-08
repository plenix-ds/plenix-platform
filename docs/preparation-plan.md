# {APP_NAME} — Pre-Development Preparation Plan

**Purpose:** Everything that must be decided, designed, and documented *before* writing application code. When the server is ready, development should be execution — not discovery.

---

## Overview

Preparation falls into 3 phases:

| Phase | Scope | Output |
|-------|-------|--------|
| **1. Foundation** | Done once — architecture decisions that every capability depends on | 10 architecture docs |
| **2. Per-Capability** | Applied to each of the 73 capabilities | Completed PRD + spec sheet per capability |
| **3. Integration** | Cross-cutting systems that span all capabilities | 6 system design docs |

---

## Phase 1 — Foundation (Do First)

These decisions gate everything else. Each produces a single authoritative document.

### F1. Core Tech Stack Decision Doc

**File:** `architecture/tech-stack.md`

Decide and document:

- [ ] Frontend framework (e.g., React/Next.js, SvelteKit, Solid)
- [ ] Component library (e.g., shadcn/ui, Radix, custom)
- [ ] State management (e.g., Zustand, Jotai, Redux Toolkit)
- [ ] Backend framework (e.g., Express, Fastify, Hono, tRPC)
- [ ] Database — primary (e.g., PostgreSQL, SQLite, CockroachDB)
- [ ] Database — search (already evaluated: Meilisearch)
- [ ] ORM / query builder (e.g., Drizzle, Prisma, Knex)
- [ ] Object storage for files/media (e.g., MinIO, local filesystem, S3-compatible)
- [ ] Real-time layer (e.g., WebSockets, SSE, CRDT library)
- [ ] Build tooling (e.g., Vite, Turbopack)
- [ ] Monorepo structure (e.g., Turborepo, Nx, pnpm workspaces)
- [ ] Language: TypeScript everywhere? Strict mode?

**Depends on:** Nothing. Do this first.

### F2. Auth / Identity / Sessions

**File:** `architecture/auth-identity.md`

- [ ] User account model (fields, avatar, preferences)
- [ ] Authentication method (email+password, magic link, OAuth providers, passkeys)
- [ ] Session management (JWT, secure cookies, refresh tokens)
- [ ] Single-user vs multi-user vs multi-tenant decision
- [ ] Account recovery flow
- [ ] API key / token model for integrations

**Depends on:** F1 (database choice)

### F3. Permissions / RBAC Model

**File:** `architecture/permissions.md`

- [ ] Role definitions (Owner, Admin, Member, Guest, Client-Portal-User)
- [ ] Permission granularity (capability-level? item-level? field-level?)
- [ ] Sharing model (per-item, per-project, per-capability, public link)
- [ ] Client Portal access scoping — what clients can see/do
- [ ] Team/workspace model (if multi-user)
- [ ] Permission inheritance (project → items within project)

**Depends on:** F2

### F4. API Design Conventions

**File:** `architecture/api-conventions.md`

- [ ] REST vs tRPC vs GraphQL decision
- [ ] URL structure / resource naming pattern
- [ ] Versioning strategy (URL path, header, none)
- [ ] Request/response envelope format
- [ ] Error response format (error codes, messages, validation errors)
- [ ] Pagination convention (cursor vs offset, page size defaults)
- [ ] Filtering / sorting / field selection query syntax
- [ ] Batch operations pattern
- [ ] File upload convention (multipart, presigned URLs)
- [ ] Rate limiting strategy
- [ ] Webhook format for outgoing events

**Depends on:** F1

### F5. Database Architecture

**File:** `architecture/database.md`

- [ ] Schema naming conventions (snake_case, singular/plural)
- [ ] Primary key strategy (UUID v7, ULID, auto-increment)
- [ ] Timestamp conventions (UTC, ISO 8601, created_at/updated_at)
- [ ] Soft-delete vs hard-delete pattern
- [ ] Audit/versioning pattern (history table, event sourcing, changelog)
- [ ] The 4 Anchor fields implementation (projectType, projects[], categories[], tags[])
  - Junction tables vs JSON arrays vs JSONB
  - Indexing strategy for anchor queries
- [ ] Full-text search integration (Meilisearch sync strategy)
- [ ] Migration tooling and workflow
- [ ] Seed data strategy
- [ ] Backup/restore procedure

**Depends on:** F1, F4

### F6. Deployment Architecture

**File:** `architecture/deployment.md`

- [ ] Service topology diagram (app server, DB, search, object storage, OSS containers)
- [ ] Docker Compose for development
- [ ] Docker Compose for production (or Kubernetes if planned)
- [ ] Environment variable management
- [ ] SSL / TLS termination
- [ ] Reverse proxy (Caddy, Traefik, Nginx)
- [ ] Log aggregation
- [ ] Health checks and monitoring
- [ ] Resource sizing estimates
- [ ] Domain and DNS plan

**Depends on:** F1, F5

### F7. Security Architecture

**File:** `architecture/security.md`

- [ ] Encryption at rest (database, file storage)
- [ ] Encryption in transit (TLS everywhere)
- [ ] End-to-end encryption scope (which data? vault isolation?)
- [ ] Input sanitization / XSS prevention
- [ ] CSRF protection
- [ ] Content Security Policy
- [ ] File upload validation (type, size, scanning)
- [ ] Secret management (API keys, tokens, credentials for OSS services)
- [ ] Dependency vulnerability scanning

**Depends on:** F1, F2, F6

### F8. Event / Message Bus Design

**File:** `architecture/event-system.md`

- [ ] Internal event model (what triggers events: CRUD, status change, assignment)
- [ ] Event payload structure
- [ ] Pub/sub mechanism (in-process, Redis, NATS, PostgreSQL LISTEN/NOTIFY)
- [ ] Event consumers (Activity feed, notifications, automations, AI, search index sync)
- [ ] Webhook dispatch for external integrations
- [ ] Real-time push to frontend (which events, what transport)

**Depends on:** F1, F4, F5

### F9. AI Pipeline Architecture

**File:** `architecture/ai-pipeline.md`

- [ ] Model provider abstraction (OpenAI, Anthropic, Ollama, local models)
- [ ] Model selection storage (user preferences per-task)
- [ ] Prompt management (Prompt Studio integration, versioning, templates)
- [ ] Embedding pipeline (which models, storage, vector DB or PG+pgvector)
- [ ] RAG architecture (how capabilities feed context to AI)
- [ ] AI agent execution model (LangGraph integration, tool definitions)
- [ ] Token usage tracking and billing
- [ ] Offline/local model fallback

**Depends on:** F1, F5, F8

### F10. File / Media Pipeline

**File:** `architecture/file-pipeline.md`

- [ ] Upload flow (chunked upload, progress, resumable)
- [ ] Storage backend (MinIO, local, S3)
- [ ] File processing pipeline (thumbnails, OCR, transcription, virus scan)
- [ ] Smart File Naming integration point
- [ ] Quota management
- [ ] CDN / media serving
- [ ] Supported format matrix (by capability: audio, video, images, documents)
- [ ] Preview/viewer architecture (PDF, office docs, images, audio, video)

**Depends on:** F1, F5, F6

---

## Phase 2 — Per-Capability Checklist

Apply this checklist to every one of the 73 capabilities. This is the repeatable unit of work.

### Capability Readiness Checklist

```
Capability: _______________
PRD file:   _______________-prd.md
Status:     [ ] Not started  [ ] In progress  [ ] Ready for dev
```

#### A. PRD Completion (all 13 sections)

- [ ] **S1. Capability** — One-line purpose statement
- [ ] **S2. Baseline Operations** — Create, Edit, Delete, Search definitions
- [ ] **S3. Features** — Complete feature table (ID, name, status, description)
- [ ] **S4. Use Cases** — 6-15 real-world scenarios with actor, goal, steps
- [ ] **S5. Functionality** — Business rules table (feature → behavior)
- [ ] **S6. Scenarios** — Edge cases and error conditions (condition → expected)
- [ ] **S7. Specification** — Technical constraints, performance targets, limits
- [ ] **S8. Dependencies** — Other capabilities this one requires or integrates with
- [ ] **S9. Enablers** — AI features, automations, integrations specific to this capability
- [ ] **S10. UI Skeleton** — Component hierarchy, layout regions, key interactions
- [ ] **S11. Modules** — Logical code modules / packages this capability maps to
- [ ] **S12. Open Questions** — Unresolved design decisions (answered before dev starts)
- [ ] **S13. Implementation Notes** — OSS integration, build-vs-buy, technical approach

#### B. Data Model

- [ ] Item type(s) defined in `data-model.md` with complete field tables
- [ ] Field validation rules (min/max, regex, enum values, character limits)
- [ ] Relationship cardinality documented (1:1, 1:N, M:N with join entity)
- [ ] Anchor fields confirmed (projectType, projects[], categories[], tags[])
- [ ] Sub-entities identified (e.g., Calendar → Event + Recurrence + Reminder)

#### C. Database Schema

- [ ] Table(s) defined with columns, types, constraints, defaults
- [ ] Primary key and foreign key relationships
- [ ] Indexes (search fields, anchor fields, frequently filtered columns)
- [ ] Junction tables for M:N relationships
- [ ] Migration file drafted

#### D. OSS Integration Decision

For each capability, one of:

- [ ] **Build native** — No suitable OSS; building from scratch. Document why.
- [ ] **Embed library** — MIT/Apache library integrated directly (e.g., TipTap for Notes). Document: library name, version, what we use, what we override.
- [ ] **Self-hosted service** — Docker container (e.g., Meilisearch for Search). Document: service name, image, ports, data volume, sync strategy, API wrapper needed.
- [ ] **Hybrid** — Library for core + service for heavy processing (e.g., ProseMirror + Docling for OCR). Document both layers.

For each OSS decision:
- [ ] License confirmed compatible (MIT, Apache 2.0, LGPL OK; AGPL = container only; BSL/SSPL = no)
- [ ] What we take: specific features/APIs we use
- [ ] What we skip: features we ignore or replace with native implementation
- [ ] Data flow: how data moves between {APP_NAME} and the OSS component
- [ ] Customization needed: patches, config, theme, or wrapper required
- [ ] Update strategy: how we handle upstream version bumps

#### E. API Endpoints

- [ ] Resource endpoints listed (CRUD + any custom actions)
- [ ] Request/response shapes for each endpoint
- [ ] Query parameters for filtering, sorting, pagination
- [ ] Batch operation endpoints (if applicable)
- [ ] Webhook events emitted by this capability

#### F. UI Component Spec

- [ ] View modes (list, grid, kanban, calendar, timeline — whichever apply)
- [ ] Create/edit form fields with control types
- [ ] Detail/preview panel layout
- [ ] Inline editing behavior
- [ ] Keyboard shortcuts
- [ ] Empty state design
- [ ] Loading / skeleton state
- [ ] Error states
- [ ] Mobile responsive behavior

#### G. Integration Map

- [ ] List every other capability this one reads from or writes to
- [ ] For each integration: what data flows, in which direction, triggered by what
- [ ] Verify the linked capability's PRD acknowledges this integration back
- [ ] Events this capability produces (for Activity feed, automations, AI)
- [ ] Events this capability consumes

#### H. Acceptance Criteria

- [ ] Happy-path test scenarios (minimum 5)
- [ ] Edge-case test scenarios (minimum 3)
- [ ] Performance targets (load time, search response time, max dataset size)
- [ ] Accessibility requirements (keyboard nav, screen reader, ARIA)

---

## Phase 3 — Cross-Cutting Integration Specs

These span multiple capabilities and should be designed after Phase 1 foundations are set but can be done in parallel with Phase 2 capability work.

### I1. Search Infrastructure

**File:** `architecture/search-design.md`

- [ ] What is indexed (which item types, which fields, anchor fields)
- [ ] Index update strategy (sync on write, async queue, periodic rebuild)
- [ ] Faceted search design (filter by layer, capability, project, category, tag)
- [ ] Search result ranking logic
- [ ] Saved searches / smart filters
- [ ] Search analytics (popular queries, zero-result queries)

### I2. Notification System

**File:** `architecture/notifications.md`

- [ ] Notification types (in-app, email digest, push, webhook)
- [ ] Per-capability notification events
- [ ] User preference model (subscribe/unsubscribe per type)
- [ ] Notification storage and read/unread tracking
- [ ] Digest batching logic

### I3. Activity Feed Design

**File:** `architecture/activity-feed.md`

- [ ] Event format (actor, action, target, context, timestamp)
- [ ] Feed scoping (global, per-project, per-capability, per-item)
- [ ] Feed pagination and real-time append
- [ ] Retention policy

### I4. Import / Migration Framework

**File:** `architecture/import-framework.md`

- [ ] Standard import formats per capability (CSV, JSON, vCard, iCal, OPML, MBOX, etc.)
- [ ] Bulk import pipeline (upload → parse → validate → preview → commit)
- [ ] Deduplication during import
- [ ] Source platform importers (Google, Apple, Notion, etc.)
- [ ] Export formats (same list, for data portability)

### I5. Automation / Workflow Engine

**File:** `architecture/automation-engine.md`

- [ ] Trigger types (event, schedule, manual, webhook)
- [ ] Action types (CRUD, send notification, call API, run AI, update field)
- [ ] Condition/filter model
- [ ] n8n integration boundary (what runs in n8n vs native)
- [ ] User-facing automation builder UX model

### I6. Theming / White-Label

**File:** `architecture/theming.md`

- [ ] CSS variable system (already started in style-guide.md)
- [ ] Dark/light mode implementation
- [ ] Custom accent color per user
- [ ] Client Portal branding (logo, colors)
- [ ] {APP_NAME} variable system for white-label

---

## Execution Order

```
PHASE 1 — FOUNDATION (do sequentially, each gates the next)
│
├─ F1. Tech Stack ─────────────────────── FIRST (gates everything)
├─ F2. Auth / Identity ────────────────── after F1
├─ F3. Permissions ────────────────────── after F2
├─ F4. API Conventions ────────────────── after F1
├─ F5. Database Architecture ──────────── after F1, F4
├─ F6. Deployment ─────────────────────── after F1, F5
├─ F7. Security ───────────────────────── after F1, F2, F6
├─ F8. Event System ───────────────────── after F1, F4, F5
├─ F9. AI Pipeline ────────────────────── after F1, F5, F8
└─ F10. File Pipeline ─────────────────── after F1, F5, F6

PHASE 2 — PER-CAPABILITY (parallelisable, grouped by layer)
│
│  Recommended order within each layer: start with the capabilities
│  that have the most integrations (they define the patterns others follow).
│
│  Suggested first 10 (high-integration, pattern-setting):
│  1. Tasks ──────── touches Calendar, Projects, Contacts, Activity, AI
│  2. Files ──────── touches every capability (attachments everywhere)
│  3. Notes ──────── touches Wiki, AI Chat, Tags, Sharing, Files
│  4. Calendar ───── touches Tasks, Contacts, Scheduling, Email
│  5. Contacts ───── touches Email, Messaging, Invoices, Deals, Leads
│  6. Projects ───── touches every capability (anchor system)
│  7. Bookmarks ──── touches Tags, Capture, Browser Extension, Web Archive
│  8. Search ─────── touches every capability (indexes all item types)
│  9. Email ──────── touches Contacts, Calendar, Tasks, Files, AI
│ 10. Invoices ───── touches Payments, Contacts, Services, Time Tracking
│
│  Then proceed layer by layer:
│  Universal (remaining 37) → Client (remaining 10) → Project/Work (14)

PHASE 3 — CROSS-CUTTING (after Phase 1, parallel with Phase 2)
│
├─ I1. Search Infrastructure ──────────── after F5, F8
├─ I2. Notification System ────────────── after F8
├─ I3. Activity Feed ──────────────────── after F8
├─ I4. Import Framework ───────────────── after F4, F5
├─ I5. Automation Engine ──────────────── after F8, F9
└─ I6. Theming ────────────────────────── after F1
```

---

## Current State (as of 2026-06-11)

| Artifact | Status |
|----------|--------|
| Product vision | Done |
| PRD framework | Done |
| Style guide | Done |
| OSS landscape | Done (40+ tools evaluated) |
| Data model (49 item types) | Done — needs validation rules, relationships, and ~10 missing sub-entities |
| Metadata corpus | Done (117 XML schemas) |
| 4 Canonical PRDs | Done (Bookmarks, Tags, Smart File Naming, Prompt Studio) |
| 9 Draft PRDs | Done (Search, Import/Export, Sharing, Browser Ext, Files, Reader, Web Archive, Highlights, Duplicates) |
| 34 Partial PRDs | Features defined, Sections 4-12 empty |
| 25 Skeleton PRDs | All sections empty |
| Foundation docs (F1-F10) | Not started |
| Cross-cutting specs (I1-I6) | Not started |
| Per-capability full readiness | 0 of 72 complete |

---

## Tracking

Update this section as work progresses. Mark items:
- Pending
- In Progress
- Review
- Done

### Phase 1 Progress

| Doc | Status |
|-----|--------|
| F1. Tech Stack | Pending |
| F2. Auth / Identity | Pending |
| F3. Permissions | Pending |
| F4. API Conventions | Pending |
| F5. Database Architecture | Pending |
| F6. Deployment | Pending |
| F7. Security | Pending |
| F8. Event System | Pending |
| F9. AI Pipeline | Pending |
| F10. File Pipeline | Pending |

### Phase 3 Progress

| Doc | Status |
|-----|--------|
| I1. Search | Pending |
| I2. Notifications | Pending |
| I3. Activity Feed | Pending |
| I4. Import Framework | Pending |
| I5. Automation Engine | Pending |
| I6. Theming | Pending |
