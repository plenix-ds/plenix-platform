# Automations PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Automations |
| **Capability ID** | automations |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST enable users to create scheduled and event-triggered automated tasks — daily briefings, monitoring alerts, periodic reports, and workflow automations — using AI as an assistant to process connected data sources.

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

Source feature area(s): Automations

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Scheduled tasks — overview and grouping** | 🔵 Planned | Use case: The user wants to offload repetitive daily work — morning briefings, inbox triage, end-of-day summaries, competitor monitoring — to run automatically on a schedule. The Automations screen lists all configured tasks grouped into four categories: Daily (fixed-time daily tasks), Monitoring (continuous or periodic background checks), Reports (periodic summaries compiled from connected data sources), and Automation (event-triggered workflows). A left sidebar nav jumps between categories. A '+ New task' button opens the task creation flow. Each task is a card with an emoji icon, name, and one-line description. These are user-defined automations with AI as assistant — not autonomous agents acting independently. The user initiates, configures, and reviews all outputs. |
| F02 | **Daily tasks — Morning Briefing, Standup Prep, End-of-Day, Inbox Triage** | 🔵 Planned | Morning Briefing compiles at a set time: today's weather, filtered headlines, calendar events, top 3 priority tasks — delivered as a digest to Notes or notifications. Standup Prep scans recent calendar events, task completions, and file activity to draft a bullet-point standup the user can review and send. End-of-Day Wrap-up summarizes progress against today's tasks, flags open items, and suggests tomorrow's priorities. Inbox Triage reviews unread email and surfaces highest-urgency messages first, suggesting which to reply to, defer, or archive. |
| F03 | **Monitoring tasks — Competitor Watch, Trending Topics, Tech Radar, Dependency Check** | 🔵 Planned | Competitor Watch runs daily or weekly and searches the web for news, product updates, pricing changes, and press releases from named competitors — delivering a digest to Notes. Trending Topics monitors communities, news sources, and social feeds for emerging industry discussions. Tech Radar watches for new releases and security advisories for the specific packages and frameworks in the user's tech stack (informed by connected GitHub repos). Dependency Check audits project dependencies against vulnerability databases and flags outdated packages, optionally creating a task to resolve each. |
| F04 | **Report tasks — Weekly Review, Code Quality, Git Activity, User Feedback Digest** | 🔵 Planned | Weekly Review runs every Friday: summarizes the week's commits, completed tasks, open items, and suggested next-week priorities as a structured note. Code Quality Report runs lint and type-check tools on connected repos and summarizes errors and trends. Git Activity Summary compiles recent commits, active branches, and hotspot files. User Feedback Digest aggregates recurring themes from connected feedback sources (support tickets, app reviews, surveys) and surfaces sentiment trends and top pain points. |
| F05 | **Automation tasks — event-triggered workflows** | 🔵 Planned | Use case: The user wants Plenix to react to events automatically — new email from a client creates a task, GitHub PR opened notifies a contact, calendar event ends prompts for notes. Each automation has a trigger (event from a connected service), a condition (optional filter, e.g. 'only if sender is in Clients group'), and one or more actions (create task, send message, create note, update calendar). A visual trigger → condition → action builder makes these configurable without code. The user reviews automation outputs before finalization. |
| F06 | **Task creation and configuration** | 🔵 Planned | Clicking '+ New task' opens a creation panel: name, category selector (Daily/Monitoring/Reports/Automation), schedule picker (specific time, recurring interval, or event trigger), description, data sources to read from (informed by active Connectors), and output destination (Notes folder, Notification, Email draft, Task). Preset templates (Morning Briefing, Competitor Watch, etc.) offered as starting points. The user can preview a dry run before enabling. All tasks can be paused, edited, or deleted at any time. |

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

1. **Primary engine — n8n (AGPL, self-hosted service).** n8n is the recommended automation engine for {APP_NAME}. Run it as a self-hosted service on Plenix infrastructure. Do not embed n8n source into the {APP_NAME} codebase; instead, deploy it as a sidecar service and communicate with it over its REST API and webhook endpoints. All workflow data remains on the Plenix server. License classification: **self-hosted service** (AGPL does not propagate to {APP_NAME} code because {APP_NAME} interacts with n8n only over the network, not by linking or distributing its source).

2. **Study — Activepieces (Apache 2.0, reference).** If embedding a workflow engine directly into the {APP_NAME} process becomes a hard requirement (e.g., single-binary distribution, offline desktop mode), Activepieces is the fallback. Apache 2.0 permits embedding without AGPL propagation. Its MCP-style extensibility model is also worth studying when designing {APP_NAME}'s own trigger/action plugin interface. License classification: **reference / conditional embed**.

3. **AGPL warning on n8n.** n8n is AGPL-3.0. As long as {APP_NAME} accesses n8n exclusively via its REST/webhook API (i.e., n8n runs as a separate process or container), AGPL does not impose copyleft obligations on {APP_NAME}'s own source. If n8n code is ever imported, vendored, or bundled inside {APP_NAME}'s process, full AGPL obligations apply. Confirm this boundary with legal counsel before shipping.

4. **Trigger architecture — webhooks and polling.** n8n supports both webhook triggers (real-time, pushed by the source service) and polling triggers (n8n polls on an interval). {APP_NAME} should register webhooks with connected services where the service supports them (e.g., GitHub, email providers via IMAP IDLE, Slack Events API). Fall back to polling for services that lack webhook support. n8n's built-in Schedule node handles cron-based daily and report tasks natively — no separate cron infrastructure is needed for most cases.

5. **Credential isolation.** OAuth tokens and API keys for connected services (Connectors) must be stored in {APP_NAME}'s own credential vault, not in n8n's credential store. Pass credentials to n8n workflows at execution time via environment injection or encrypted HTTP headers so n8n never becomes an independent credential silo. This keeps revocation, rotation, and audit in a single place.

6. **AI node integration.** n8n ships native LangChain and AI nodes (OpenAI, Anthropic, Hugging Face, vector store connections). Use these for the AI-assisted tasks in F02–F04 (briefing compilation, digest generation, sentiment analysis). Treat the AI nodes as the processing layer inside a workflow; the trigger/action scaffolding around them is what {APP_NAME} configures and surfaces to the user.

7. **{APP_NAME} builds natively — the configuration UI.** The visual trigger-condition-action builder described in F05 and F06, and the task card list in F01, are built natively in {APP_NAME}'s frontend. These screens write to {APP_NAME}'s own automation schema, which is then translated into n8n workflow JSON via an internal adapter layer. Users never interact with the n8n editor UI.

8. **{APP_NAME} defers to n8n — execution, scheduling, and retry logic.** Workflow execution, step-level retry, error handling, execution history, and rate-limit backoff are all delegated to n8n. {APP_NAME} reads execution logs back from n8n's API to display run history and surface errors in the task card UI. Do not reimplement these in {APP_NAME}.

9. **Output routing — Notes, Notifications, Tasks.** When an automation completes, n8n calls a {APP_NAME} webhook (or internal API endpoint) with the output payload. {APP_NAME}'s output router is responsible for materializing the result: writing a Note, creating a Task, triggering a push notification, or drafting an email. This keeps all entity creation inside {APP_NAME}'s data model and ensures automations produce first-class objects that the rest of the product can reference.

10. **Platform fragility warning — third-party API changes.** Automations that depend on external APIs (competitor watch, GitHub activity, email triage) are fragile by nature. Third-party services change APIs, revoke scopes, or impose rate limits without notice. The n8n workflow layer should catch HTTP errors and surface them to {APP_NAME} as task health warnings rather than silently failing. Display last-successful-run time on each task card so users can detect stale automations.

11. **E2EE boundary warning.** If {APP_NAME} offers end-to-end encryption for Notes or Tasks, automation output that passes through n8n breaks that E2EE boundary — n8n processes content in plaintext on the server. Document this clearly in the product. If E2EE for automation output is a requirement, the decryption and content processing must happen client-side, which is architecturally incompatible with a server-side automation engine. Treat these as mutually exclusive modes until a client-side agent architecture is designed.

12. **Dry-run and preview mode.** The task creation flow (F06) requires a dry-run preview before the user enables an automation. Implement this by running the n8n workflow in test mode (n8n supports manual execution via API) and returning the output to {APP_NAME} without committing it to the user's data. This is critical for building user trust in automated outputs before they run unattended.

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
