# Connectors PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Connectors |
| **Capability ID** | connectors |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST provide a directory of integrations connecting external services — collaboration tools, productivity platforms, social media, developer tools, sales/marketing systems, and AI/search services — to enable data routing, sync, and context sharing across capabilities.

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

Source feature area(s): Connectors

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Connectors directory — browse, search, filter by category** | 🔵 Planned | Use case: The user works across many tools and wants Plenix to consolidate all their data in one place. The Connectors screen is a searchable, filterable directory of every supported integration. A search bar filters by name. Category tabs let the user browse by type: All, AI & Search, Collaboration & Communication, Productivity & Project Management, Social & Media, Developer Tools, and Sales & Marketing. A summary strip shows total connectors and how many are live. A Refresh button re-checks all statuses. Each connector is a card showing the platform logo, name, a one-line capability description, and a status badge — Connected (green, Disconnect button), Not Connected (gray, + Connect button), or Coming Soon (dimmed, non-interactive). Connectors are data bridges that bring information from other platforms into Plenix for the user to work with directly. AI is available as an assistant. This is distinct from Channels, which are outbound messaging platforms for AI agents. |
| F02 | **Collaboration & Communication connectors** | 🔵 Planned | Use case: All the user's communication — across multiple platforms — accessible from Plenix's Messaging and Email sections without context-switching. Documented connectors: Gmail — full mailbox, read/draft/send, labels, search; inbox appears in Plenix Email section. Microsoft Teams — read channels, post updates, access meeting transcripts; appears in Messaging. Outlook — email + calendar sync for Microsoft accounts. Slack — read and post to channels, DMs, message search; threads appear in Messaging alongside other channels. Asana — read projects and tasks, create and update tasks from Plenix's Tasks section; changes sync back to Asana. All use OAuth 2.0 with credentials stored locally. |
| F03 | **Productivity & Project Management connectors** | 🔵 Planned | Use case: The user's planning and tracking tools reflected inside Plenix without duplicating data entry. Documented connectors: Google Calendar — two-way sync; events appear in Plenix's Calendar section and can push back. Google Tasks — read and create tasks; appear in Plenix Tasks with a source badge. Google Docs — linked docs appear in project Files tabs. Google Sheets — read sheet data into Plenix (supplier lists, budgets, inventory); can power Automation report tasks. Notion — read pages and databases; entries appear as tasks, notes, or project records. All support real-time or scheduled sync depending on API capabilities. |
| F04 | **Social & Media connectors** | 🔵 Planned | Use case: Social and community engagement data visible inside Plenix without logging into each platform. Documented connectors: Discord — read and post to guild channels; community activity appears in Messaging. YouTube — channel analytics (views, watch time, subscribers), video metadata, comment monitoring. Reddit — subreddit monitoring for mentions, trending discussions, keyword alerts; surfaces in the monitoring feed. Data is read-only by default; write permissions require explicit opt-in during the connect flow. |
| F05 | **Developer Tools connectors** | 🔵 Planned | Use case: Code activity and web research integrated with project management and notes. GitHub — repositories, issues, pull requests, commit history; issues sync to Tasks, commits appear in project activity feeds, PRs can trigger automation tasks. Firecrawl — scrape and extract structured data from any URL for use by Automation tasks (Competitor Watch, Tech Radar). Firecrawl outputs are delivered as notes or feed items, not raw HTML. |
| F06 | **Sales & Marketing connectors** | 🔵 Planned | Use case: Consolidated marketing and ecommerce reporting inside Plenix. Documented connectors: SEMrush — domain analytics, keyword rankings, backlink data, competitor comparisons. Google Analytics — GA4 sessions, conversion events, channel performance; weekly reports automatable. Google Ads — campaign performance, wasted spend identification, cost-per-conversion. Google Search Console — search performance, indexed pages, crawl errors. Shopify — orders, inventory, product data, customer records; order data can trigger task creation. eBay — listings, sales, offers, seller performance metrics. Meta Ads Manager — ad insights and optimization reports. |
| F07 | **AI & Search connectors** | 🔵 Planned | Use case: Plenix's AI assistant needs access to real-time web information beyond the user's own data. Perplexity Search — gives the AI assistant real-time web search with citations, enabling answers about current events, recent releases, and competitor news post-dating training data. Planned additions: direct model provider APIs (Anthropic, OpenAI, Gemini) for configuring which model powers the AI assistant; specialized search APIs for procurement (customs data, trade directory search) and legal/compliance research. |
| F08 | **Connector data routing into Plenix sections** | 🔵 Planned | Use case: Connecting a service makes its data appear in the correct Plenix section automatically — no manual import needed. Routing rules: Gmail/Outlook → Email section. Google Calendar/Outlook Calendar → Calendar section. Asana/Google Tasks → Tasks section (with source badge). Google Docs/Notion → Notes or Files (user configures). GitHub issues → Tasks. GitHub repos → Files. Shopify/eBay → Commerce dashboard (planned). Social connectors → Social feed (planned). SEMrush/Analytics/Ads → Marketing dashboard (planned). All data shows a source badge so the user always knows whether a task came from Asana, Google Tasks, or was created natively. |
| F09 | **OAuth, token management, and permission scopes** | 🔵 Planned | Use case: The user needs to connect services securely, understand exactly what Plenix can access, and revoke or narrow that access at any time. OAuth services open the provider's authorization page in a popup; the user grants scopes and is redirected back; the access token is stored in local encrypted storage. Token-based services prompt the user to paste their API key. A 'Manage permissions' view shows exact scopes granted (e.g. 'gmail.readonly, gmail.send') and allows re-authorizing with different scopes. Disconnecting revokes the token and removes all cached data. No credentials are ever transmitted to a Plenix server. |

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

1. **Study and reference Airbyte as the primary OSS foundation.** Airbyte (Apache 2.0, 21k stars) is the leading open-source data integration platform with 600+ pre-built connectors covering Gmail, Google Calendar, Notion, GitHub, Slack, Asana, Shopify, SEMrush, and more. Its connector catalog, protocol specification, and sync-state model are the canonical reference for how Plenix should think about connector architecture. License classification: **self-hosted service** — run as a sidecar or internal service alongside the Plenix server; do not bundle its runtime into the Plenix binary.

2. **Adopt the Airbyte connector protocol as an internal interface contract.** Airbyte connectors expose a standard interface: `spec` (declare config schema), `check` (validate credentials), `discover` (enumerate available streams), and `read` (emit records). Plenix's connector layer should mirror this contract internally so that any Airbyte-compatible connector can be adapted with minimal glue code. This also means Plenix can reuse community-maintained connector definitions as a starting point rather than writing OAuth and pagination logic from scratch.

3. **Credential storage is a hard architectural boundary — nothing leaves the local machine.** OAuth access tokens, refresh tokens, and API keys are encrypted at rest using the host OS keychain (Keychain on macOS, DPAPI/Windows Credential Manager on Windows, libsecret on Linux) or a local secrets store managed by the Plenix server process. Credentials are never transmitted to any Plenix-operated server, third-party analytics service, or telemetry endpoint. This must be enforced by code review policy, not just documentation. Violations break the product's core privacy promise.

4. **OAuth flows run in a sandboxed popup, not an embedded webview.** For OAuth 2.0 connectors (Gmail, Google Calendar, GitHub, Slack, Asana, Notion, etc.), open the provider's authorization URL in the system browser or a dedicated popup window — never in an embedded webview that could intercept the exchange. Use PKCE (RFC 7636) wherever the provider supports it. The redirect URI should target a local loopback server (`http://127.0.0.1:{ephemeral_port}/callback`) so no token fragment is exposed to the network. Token refresh is handled silently in the background before expiry.

5. **Route connector data into the correct Plenix section via a declarative routing table.** Each connector definition declares which Plenix section(s) it populates: Gmail/Outlook → Email; Google Calendar/Outlook Calendar → Calendar; Asana/Google Tasks/GitHub Issues → Tasks; Google Docs/Notion → Notes or Files; GitHub Repos → Files; Shopify/eBay → Commerce dashboard; SEMrush/Google Analytics/Ads → Marketing dashboard; Discord/Slack/Teams → Messaging. This routing table must be version-controlled and human-readable (YAML or JSON). Adding a new connector requires only a new routing entry plus a connector adapter — no changes to section code.

6. **Attach a source badge to every record imported by a connector.** Every task, note, email, or calendar event that originates from a connector carries an immutable `source` field (e.g. `asana`, `github`, `google-tasks`) rendered as a small icon badge in the UI. This satisfies the product rule that users always know where a record came from and prevents confusion when the same item appears in both Plenix and the originating tool.

7. **Plan for sync modes from day one: full-refresh vs. incremental.** Full-refresh (re-fetch everything on each sync) is simple but expensive for large mailboxes or GitHub repos. Incremental sync (track a cursor — last-modified timestamp, sequence number, or event ID — and fetch only deltas) is required for any connector with more than a few hundred records. Airbyte's state/checkpoint model is the reference implementation. Design the connector runner to persist cursor state between runs so a crashed sync can resume rather than restart.

8. **Treat platform fragility as a first-class risk for social and scraping connectors.** Connectors that depend on undocumented APIs or scraping (Reddit, YouTube community features, eBay) are inherently fragile — provider-side changes can silently break them. Firecrawl (scrape/extract) is particularly sensitive. These connectors must be versioned independently, have an explicit `health-check` endpoint that runs on schedule, and surface degraded/broken status in the Connectors directory UI immediately. Do not allow a broken connector to block the rest of the sync pipeline.

9. **Build connector sync as an isolated, restartable background job — not a request-response call.** Syncs are long-running operations (seconds to minutes for large datasets). Run each connector sync as an independent job managed by a local job queue (e.g. BullMQ, pg-boss, or a simple SQLite-backed queue). Each job logs progress, captures errors per-stream, and writes results to the local database. The UI polls job status — it never blocks waiting for a sync to complete. Failed jobs retry with exponential backoff up to a configurable limit, then surface the error in the Connectors directory card.

10. **What {APP_NAME} builds natively vs. defers to a service.** Plenix builds natively: the connector configuration UI, credential vault integration, routing table evaluation, source-badge rendering, sync job scheduler, and status dashboard. Plenix defers to a self-hosted Airbyte instance (or adapted Airbyte connector code): the actual connector implementations for each third-party platform, the sync-state checkpoint model, and the stream discovery protocol. For the AI & Search category (Perplexity, model provider APIs), Plenix calls those APIs directly — no Airbyte layer is needed since these are stateless request/response calls rather than data replication jobs.

11. **License boundary: Apache 2.0 permits commercial embedding with attribution; watch for ELv2 connectors.** The Airbyte platform core and most community connectors are Apache 2.0. However, some newer Airbyte components (the Airbyte Platform UI, certain enterprise connectors) are licensed under the Elastic License v2 (ELv2), which prohibits offering the software as a managed service to third parties. Plenix's use case — a locally-run personal tool, not a SaaS product reselling Airbyte — is within ELv2 bounds, but any future hosted/cloud version of Plenix would require a legal review of which Airbyte components are in use. Audit every dependency against Apache 2.0 / MIT / BSD before shipping.

12. **E2EE and multi-device sync require a separate key management design.** The current architecture stores credentials locally, which works for a single-device install. If {APP_NAME} adds multi-device sync or cloud backup, connector credentials cannot be included in any unencrypted sync payload. A zero-knowledge key derivation scheme (e.g. user-supplied passphrase → HKDF-derived key encrypting a device keychain export) is required before that feature ships. Do not retrofit this — design the credential storage abstraction now to accept a pluggable encryption backend so the single-device and multi-device cases share one interface.

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
