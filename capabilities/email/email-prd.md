# Email PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Email |
| **Capability ID** | email |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST enable users to send, receive, and manage email from within the platform.

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

Source feature area(s): Email Client, Unified Inbox

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Native IMAP/SMTP email client — built into Plenix** | 🔵 Planned | Use case: The user does not want to switch between Plenix and a separate email app (Apple Mail, Thunderbird, Spark, Outlook) to handle their inbox. Plenix includes a full email client built directly into the app — not a webview of Gmail or Outlook, but a native IMAP/SMTP client that connects directly to any email provider. The user connects their account(s) by entering IMAP server, IMAP port, SMTP server, SMTP port, username, and password (or OAuth for Google/Microsoft accounts). Plenix fetches mail via IMAP and sends via SMTP. Multiple accounts can be connected simultaneously. All email stays in sync with the provider — actions taken in Plenix (read, archive, delete, move) are reflected on the server and in any other mail client the user has connected. The email client lives inside Plenix so it shares context with tasks, projects, calendar, contacts, and notes — no duplicate data, no context switching. |
| F02 | **Folder browsing and mailbox navigation** | 🔵 Planned | The Email sidebar shows all IMAP folders for each connected account: Inbox, Sent, Drafts, Trash, Spam, and any custom folders or labels the user has created in their mail provider. Folders are listed under a collapsible account header (useful when multiple accounts are connected). Clicking a folder loads its messages in the main panel. Unread counts are shown on folder rows. IMAP folder sync is real-time for providers that support IMAP IDLE (Gmail, Fastmail, most modern providers); otherwise it polls every 2 minutes. The folder list refreshes automatically when new mail arrives. |
| F03 | **Email composition — rich text, reply, forward, attachments** | 🔵 Planned | The compose panel supports: rich-text body (bold, italic, underline, inline links, bullet lists — same editor as Notes), To/CC/BCC fields with contact autocomplete (pulls from the Contacts section), Subject line, Attachments (drag-and-drop or file picker — files from the Files section can be attached directly without downloading), Reply (quotes the original message with attribution header), Reply All (adds all original recipients to CC), and Forward (pre-fills body with original message). Drafts are auto-saved to the IMAP Drafts folder every 30 seconds. A send delay option (configurable: 5, 10, 30 seconds) allows the user to undo a sent email before it is transmitted. Sent emails are stored in the IMAP Sent folder on the server. |
| F04 | **Unified Inbox — multiple accounts in one view** | 🔵 Planned | When multiple email accounts are connected, the Unified Inbox aggregates all inboxes into a single chronological feed — the user sees all unread email from all accounts without switching between account views. Each message shows a small account badge (colored by account) so the user always knows which account it belongs to. Replying from the Unified Inbox automatically uses the correct From address for that account. The Unified Inbox is distinct from but complementary to the broader Unified Inbox feature (which also includes WhatsApp, social mentions, etc.) — the email Unified Inbox is an email-only view within the Email section. |
| F05 | **Search across the full mailbox** | 🔵 Planned | Search in the Email section queries the full mailbox — subject, sender, recipient, and body text — across all connected accounts. Search is executed against both locally cached messages and the IMAP server (via IMAP SEARCH command) so older messages not yet downloaded are also findable. Results show the matching messages with the search term highlighted. Filters can be applied to the search results: by account, by date range, by folder, by read/unread status, and by whether the message has attachments. Search results are sorted by date (most recent first) by default. |
| F06 | **Read/unread flags and message management** | 🔵 Planned | Marking a message as read or unread updates the IMAP Seen flag on the server — the change is reflected in all clients. Other per-message actions: Archive (moves to the provider's archive folder), Delete (moves to Trash — permanent deletion requires emptying Trash or a second delete action), Move to folder (folder picker dropdown), Star/Flag (sets the IMAP Flagged flag), and Mark as spam (moves to the Spam folder and reports to the provider if the provider supports feedback). Bulk actions: select multiple messages and apply any of the above actions simultaneously. A swipe gesture on mobile performs configurable quick actions (e.g. swipe right = archive, swipe left = delete). |
| F07 | **Email linked to contacts, tasks, and projects** | 🔵 Planned | Every email from a known contact (a sender whose email address matches a record in the Contacts section) shows that contact's profile card in the right panel when the email is open — name, company, role, tags, interaction history, and linked tasks. From any open email, the user can: Create a task linked to this email (the email subject becomes the task title, the email body becomes the task notes, the sender is linked as the contact), Save as a note (useful for email threads that contain reference information), Add to a project (link the email thread to a project so it appears in that project's activity feed). This turns the email client into a lightweight CRM layer — every inbound email is an opportunity to capture context without manually copying information. |
| F08 | **Single inbox — all channels, one view** | 🔵 Planned | Use case: The user is active across multiple communication surfaces — WhatsApp, email, Instagram DMs, Twitter/X mentions, LinkedIn messages, Telegram, Discord, Facebook comments, and more. Currently they must open each app separately, check each inbox, and mentally track what needs a response and what has been handled. Plenix's Unified Inbox funnels every inbound interaction from every connected channel into a single chronological or priority-sorted feed. The user opens one screen and sees everything: a WhatsApp message from a client, an email from a supplier, a Twitter mention, an Instagram story reaction, a LinkedIn connection request, a Telegram bot message. Each item shows the source channel (color-coded icon), the sender's name and avatar, a preview of the message or interaction, the time received, and a read/unread state. The user can reply directly from the inbox without switching apps or opening a separate thread view. This is the operational hub for anyone managing communication across multiple platforms. |
| F09 | **Interaction types — messages, mentions, reactions, comments, emails** | 🔵 Planned | The Unified Inbox aggregates every type of inbound interaction, not just direct messages. Supported interaction types: Direct messages (WhatsApp, Telegram, Instagram DM, Twitter/X DM, Facebook Messenger, LinkedIn message, Discord DM); Email (Gmail, Outlook — full threads, not just notifications); Mentions (Twitter/X @mentions, Instagram tags in posts and stories, LinkedIn mentions, Reddit username mentions); Comments (Instagram post comments, Facebook post comments, YouTube video comments); Reactions (Instagram story reactions, Facebook post reactions — someone reacted to your content); Notifications (GitHub PR review requests, Asana task assignments, Slack @mentions). Each interaction type has its own visual indicator — a reply bubble for messages, an @ symbol for mentions, a heart for reactions, a speech bubble for comments — so the user can scan the inbox type at a glance without reading every item. |
| F10 | **Inbox filters and views — channel, type, assignee, status** | 🔵 Planned | Use case: A busy inbox with hundreds of interactions needs to be manageable. The Unified Inbox supports multiple filter dimensions: by channel (show only WhatsApp, or only email, or only social mentions); by interaction type (messages only, mentions only, comments only); by status (Unread, Needs reply, Replied, Resolved, Snoozed); by assignee (in team mode — show only interactions assigned to me, or to a specific team member); by contact (show all interactions from a specific person across all channels); by date range; and by keyword search across all message content. Filter combinations are saveable as named views (e.g. 'Client WhatsApps', 'Unresolved mentions', 'Team queue') that appear as tabs at the top of the inbox for quick switching. The default view shows everything unread, sorted by most recent. |
| F11 | **Reply from inbox — channel-native responses** | 🔵 Planned | Use case: The user sees a WhatsApp message and an Instagram comment in the same inbox and wants to reply to both without opening WhatsApp or Instagram separately. Each inbox item has an inline reply panel that opens below it. The reply is sent via the correct API for that channel — a WhatsApp reply goes via the WhatsApp Cloud API, an Instagram comment reply goes via the Instagram Graph API, a Twitter mention reply goes via the Twitter API — but the user just types their response in one consistent composer. The composer is context-aware: for WhatsApp it shows the option to use a message template (required for first-contact messages outside the 24h window); for email it shows a full reply editor with subject threading; for social comments it shows a plain text field with character count. Sent replies are marked as Resolved in the inbox automatically unless the user marks them otherwise. |
| F12 | **Personalized customer service — contact context in inbox** | 🔵 Planned | Use case: When a message arrives in the inbox, the user needs context immediately — who is this person, what's the history, are they a client or a prospect, have they had issues before? Every inbox item shows a contact card panel on the right: the sender's full contact record from Plenix's Contacts section (name, company, role, tags), their interaction history across all channels (previous WhatsApp messages, emails, mentions — not just the current channel), any notes previously added by the user, any open tasks linked to this contact, and any projects they are associated with. If the sender is not yet in Contacts, a one-click 'Add to Contacts' button creates a record pre-filled with what Plenix already knows (name from the platform, handle, profile image). This eliminates the need to context-switch to CRM or email history while composing a reply. |
| F13 | **Team collaboration — assign, comment, and hand off** | 🔵 Planned | Use case: A team where multiple people manage communications needs to coordinate without duplicating responses or dropping items. The Unified Inbox supports team workflows: Assign — any inbox item can be assigned to a specific team member; they receive a notification and the item appears in their personal queue; the inbox shows who each item is assigned to. Internal comments — team members can leave internal notes on any inbox item (visible only to the team, not the external sender) to add context, ask questions, or brief the assignee ('This is the client from Project X — they're unhappy about the delay'). Collision detection — if two team members open the same inbox item at the same time, a 'Someone is viewing this' indicator prevents duplicate replies. Status tracking — items move through statuses (New → In Progress → Resolved) with timestamps so the team can see response times and workload distribution. SLA indicators show items that have been waiting too long without a response. |
| F14 | **Snooze, reminders, and follow-up scheduling** | 🔵 Planned | Use case: Not every message needs an immediate reply — some need to be acted on later. The user can snooze any inbox item to a specific time (e.g. 'remind me tomorrow at 9 AM') or a relative delay (e.g. 'in 3 hours'). Snoozed items disappear from the inbox and reappear at the scheduled time as if they just arrived — with a snooze badge so the user knows it was deferred. A separate 'Scheduled follow-ups' view lists all snoozed items. Additionally, the user can set a follow-up reminder on a sent message ('if I don't get a reply in 48 hours, remind me to follow up') — Plenix monitors for a reply and triggers the reminder only if no response is received by the deadline. This prevents hot leads, supplier RFQs, and client questions from silently falling through the cracks. |
| F15 | **Inbox analytics — response times, volume, channel breakdown** | 🔵 Planned | Use case: The user or team lead wants to understand communication patterns — how fast are we responding, which channels generate the most inbound, are we keeping up with volume? The Inbox Analytics view shows: average first response time per channel, median resolution time, inbound volume by channel and by day/week/month, breakdown by interaction type (messages vs mentions vs comments), top senders by volume, and unresolved item age distribution. For teams, it shows per-member response time and resolved count. All metrics are filterable by date range and channel. The data helps the user identify which channels need more attention, at what times of day inbound volume peaks, and whether response time targets are being met. |

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

1. **Core transport layer — embed imapflow (MIT) and nodemailer (MIT).** These two libraries are the only direct dependencies Plenix needs to build a fully functional IMAP/SMTP client in Node.js. imapflow handles IMAP connection management, IDLE push, flag mutations, folder listing, and message fetching with streaming support for large messages. nodemailer handles SMTP authentication (plain, STARTTLS, OAuth2 token injection), message construction (MIME, attachments, inline images), and delivery. Both are MIT-licensed — embed them directly into the {APP_NAME} server process. No wrapping service, no third-party relay. License risk: none.

2. **OAuth2 for Gmail and Outlook is mandatory — plain password auth is blocked by both providers.** Google requires OAuth2 via the Gmail API scope (`https://mail.google.com/`) or a custom OAuth app registered in Google Cloud Console. Microsoft requires OAuth2 via Microsoft Identity Platform (Azure AD app registration) for Outlook.com and Microsoft 365 accounts. Tokens (access token + refresh token) must be stored server-side in the {APP_NAME} database, encrypted at rest. The imapflow `auth` option accepts `{ user, accessToken }` directly — no additional OAuth middleware required at the IMAP layer. nodemailer accepts the same token format for SMTP. Plan for token refresh: refresh tokens expire or are revoked; the email sync loop must catch `AUTHENTICATIONFAILED` and trigger a re-auth flow surfaced to the user.

3. **Study Cypht (MIT) as the primary architectural reference for multi-account aggregation.** Cypht was purpose-built to unify disparate email accounts plus RSS into one interface — the exact pattern {APP_NAME} needs for F04 (Unified Inbox). Key patterns to extract: the account abstraction layer (each account is a registered "source" with its own connection config); the message list normalization layer (each source produces a common message envelope schema — from, subject, date, unread, account ID — that the UI renders identically regardless of provider); the Unified Inbox merge algorithm (sorted merge of N sorted per-account cursor sets, deduplicated by message-ID). Cypht's codebase is PHP but the architecture is language-agnostic — treat it as a design reference, not code to copy. Do not embed or ship Cypht.

4. **Study Thunderbird (MPL 2.0) for folder management UX and filter rules — reference only, do not embed.** Thunderbird is the most mature open-source desktop email client and sets the standard for: collapsible per-account folder trees with unread counts; Unified Folders (virtual folders that aggregate Inbox, Sent, etc. across all accounts); message filter rules (if sender contains X → move to folder Y); and account settings UI (IMAP/SMTP server, port, TLS mode, authentication method). Do not embed any Thunderbird code — MPL 2.0 requires file-level source disclosure for modified files, which creates compliance overhead in a proprietary product. Use Thunderbird as a UX and feature-set benchmark only.

5. **Study Mailspring (GPL v3) for modern UI patterns — reference only, strict license boundary.** Mailspring provides the best open-source reference for modern desktop email UI conventions: snooze (defer-to-later UX and data model), send later (scheduled outbox), message templates, link tracking, and the reading pane layout with contact card sidebar. Do not embed, fork, or ship any Mailspring code — GPL v3 is a copyleft license that would require {APP_NAME}'s full source to be published if Mailspring code is distributed. Use Mailspring for UX inspiration and to validate design decisions only. Any implementation must be a clean-room build.

6. **Study Mail0/Zero (MIT) as the most modern OSS email codebase.** Mail0 is an MIT-licensed, AI-first, privacy-focused email client built with modern web stack conventions. It is the best reference for: how to structure a Next.js-based email UI (thread list, reading pane, compose drawer as route segments); how to integrate LLM-powered features (draft assist, summarization, smart reply) into an email client without over-engineering; and how a modern OSS project handles the IMAP abstraction layer in a JavaScript/TypeScript runtime. Because it is MIT, individual patterns and utility functions can be adapted into {APP_NAME}'s codebase — always verify on a file-by-file basis and attribute in comments.

7. **Local message cache is required — do not fetch from IMAP on every render.** All fetched message headers and bodies must be stored in a local SQLite database (via the {APP_NAME} server's existing D1/SQLite layer). The cache schema should store: message UID per folder per account, envelope fields (from, to, subject, date, flags), plain-text body excerpt (first 500 chars for list previews), full MIME body (stored as a blob or file reference for opened messages), and attachment metadata. Full-text search indexes (subject + body) should be built via SQLite FTS5. The cache is the source of truth for the UI; IMAP is the source of truth for flag state. Flag mutations (read, archive, delete, move) must write to IMAP first, then update the local cache — never update the cache optimistically without confirming the IMAP write succeeded.

8. **IMAP IDLE for push — fall back to polling at 2-minute intervals.** Modern IMAP providers (Gmail, Fastmail, most managed hosting) support IMAP IDLE, which holds an open TCP connection and pushes a notification when the mailbox changes. imapflow supports IDLE natively via the `idle()` method on an open mailbox connection. Maintain one IDLE connection per account (per inbox folder). When a new message notification arrives, fetch only the delta (new UIDs since last known UID). For providers that do not support IDLE (some legacy IMAP servers, corporate Exchange without IMAP IDLE), fall back to polling every 120 seconds. Warn: keeping many simultaneous IDLE connections open is resource-intensive — if the user has more than 5 accounts, implement a round-robin IDLE manager that rotates coverage across accounts.

9. **JMAP is the protocol to watch as a long-term IMAP replacement.** JMAP (JSON Meta Application Protocol, RFC 8620 / RFC 8621) is a modern email protocol used by Fastmail and an expanding set of providers. It replaces IMAP's stateful TCP connection model with a stateless HTTP/JSON API, making it vastly simpler to implement, cache, and sync. Do not build a JMAP client in the initial version — IMAP coverage is sufficient for all major providers. However, design the account abstraction layer (the internal interface between the sync engine and the transport protocol) so that a JMAP transport can be swapped in per-account without changing the UI or the cache schema. Concretely: the sync engine should call `account.fetchEnvelopes()`, `account.fetchBody(uid)`, `account.setFlag(uid, flag, value)` — not raw IMAP commands — so the transport is replaceable.

10. **E2EE warning — Plenix does not add end-to-end encryption on top of IMAP/SMTP.** Email is not an E2EE protocol by default. Messages transit between the user's IMAP server and the {APP_NAME} server in TLS-encrypted connections, but the {APP_NAME} server can read message content in plaintext while processing (for search indexing, contact matching, task creation). This is the same trust model as any IMAP client (Spark, Airmail, Superhuman). Users who require E2EE email must use PGP/S-MIME at the message level — {APP_NAME} should not attempt to implement PGP in v1. This limitation must be disclosed clearly in onboarding and privacy documentation. Do not position {APP_NAME}'s email as "private" or "secure" without qualifying that IMAP itself is not E2EE.

11. **Platform fragility warning — Gmail and Outlook API policies can break IMAP access.** Google has periodically tightened access to Gmail via IMAP (disabling basic auth, restricting OAuth app review requirements for apps accessing sensitive scopes). Microsoft has similarly deprecated basic auth for Exchange Online. Treat IMAP/SMTP access to Google and Microsoft accounts as a dependency with real revocation risk. Mitigations: monitor Google Workspace and Microsoft 365 developer policy changelogs; design the connector registration flow so a re-auth can be triggered per-account without losing cached messages; maintain a fallback plan to integrate with the official Gmail API (REST) or Microsoft Graph API (REST) as alternative transports if IMAP access is revoked for a significant percentage of users.

12. **Attachment handling — stream large attachments, do not buffer in memory.** Email attachments can be arbitrarily large (PDFs, ZIP files, videos). imapflow supports streaming MIME body parts — use this to pipe attachment data directly to a temp file or to the {APP_NAME} Files module storage layer without buffering the full attachment in server memory. When displaying attachments in the reading pane, show a list of attachment chips with filename, size, and type icon. Offer: preview (open in-app viewer for PDF, images), download (save to local filesystem), and save to Files (copy into the {APP_NAME} Files module). Do not auto-download all attachments on message fetch — only fetch attachment bodies on explicit user action or when a message is opened for the first time.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| Contacts | Sender matching — inbound email addresses are resolved against Contact records to display profile cards, interaction history, and linked tasks in the reading pane. |
| Tasks | Email-to-task creation — any email can be converted to a task; the subject becomes the task title, the body becomes the task notes, and the sender is linked as the associated contact. |
| Projects | Email-to-project linking — email threads can be pinned to a project so they appear in that project's activity feed and timeline. |
| Search | Full mailbox search — the global Search module executes IMAP SEARCH queries and indexes locally cached message content so the user can find emails from anywhere in {APP_NAME}. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| Dashboard | Email widget — the Dashboard displays an unread count and a preview list of the most recent inbox messages, drawn from the Email module's local cache. |
| Connectors | Gmail / Outlook integration — the Connectors module delegates OAuth token exchange and account registration to the Email module, which owns the IMAP/SMTP credential store. |

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
