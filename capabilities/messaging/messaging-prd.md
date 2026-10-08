# Messaging PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Messaging |
| **Capability ID** | messaging |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Full specification with features, functionality, scenarios, and enablers |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST provide a unified inbox for SMS, WhatsApp, and Slack conversations.

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

Source feature area(s): Messaging, Unified Inbox, WhatsApp Integration

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Thread list with unread badges** | ✅ Built / Required | The messaging screen shows a vertical list of conversation threads on the left. Each thread row shows the contact's avatar (initial circle with a unique background color), their name, and an unread count badge in the accent color when there are unread messages. Clicking a thread opens the conversation panel on the right and marks it as the active thread. |
| F02 | **Bubble message view** | ✅ Built / Required | The right panel shows the conversation as a bubble chat — sent messages on the right in blue, received on the left in a gray card. Each bubble shows the message text and a timestamp. The bottom of the panel has a text input with a Send button. Pressing Send or clicking the button appends a new bubble to the thread in the current session. |
| F03 | **Channel sidebar** | ✅ Built / Required | The contextual sidebar for Messaging groups communication channels (SMS, WhatsApp, Email) at the top, followed by the individual thread list below. This lets users quickly filter to a specific channel type before drilling into a thread. |
| F04 | **Single inbox — all channels, one view** | 🔵 Planned | Use case: The user is active across multiple communication surfaces — WhatsApp, email, Instagram DMs, Twitter/X mentions, LinkedIn messages, Telegram, Discord, Facebook comments, and more. Currently they must open each app separately, check each inbox, and mentally track what needs a response and what has been handled. Plenix's Unified Inbox funnels every inbound interaction from every connected channel into a single chronological or priority-sorted feed. The user opens one screen and sees everything: a WhatsApp message from a client, an email from a supplier, a Twitter mention, an Instagram story reaction, a LinkedIn connection request, a Telegram bot message. Each item shows the source channel (color-coded icon), the sender's name and avatar, a preview of the message or interaction, the time received, and a read/unread state. The user can reply directly from the inbox without switching apps or opening a separate thread view. This is the operational hub for anyone managing communication across multiple platforms. |
| F05 | **Interaction types — messages, mentions, reactions, comments, emails** | 🔵 Planned | The Unified Inbox aggregates every type of inbound interaction, not just direct messages. Supported interaction types: Direct messages (WhatsApp, Telegram, Instagram DM, Twitter/X DM, Facebook Messenger, LinkedIn message, Discord DM); Email (Gmail, Outlook — full threads, not just notifications); Mentions (Twitter/X @mentions, Instagram tags in posts and stories, LinkedIn mentions, Reddit username mentions); Comments (Instagram post comments, Facebook post comments, YouTube video comments); Reactions (Instagram story reactions, Facebook post reactions — someone reacted to your content); Notifications (GitHub PR review requests, Asana task assignments, Slack @mentions). Each interaction type has its own visual indicator — a reply bubble for messages, an @ symbol for mentions, a heart for reactions, a speech bubble for comments — so the user can scan the inbox type at a glance without reading every item. |
| F06 | **Inbox filters and views — channel, type, assignee, status** | 🔵 Planned | Use case: A busy inbox with hundreds of interactions needs to be manageable. The Unified Inbox supports multiple filter dimensions: by channel (show only WhatsApp, or only email, or only social mentions); by interaction type (messages only, mentions only, comments only); by status (Unread, Needs reply, Replied, Resolved, Snoozed); by assignee (in team mode — show only interactions assigned to me, or to a specific team member); by contact (show all interactions from a specific person across all channels); by date range; and by keyword search across all message content. Filter combinations are saveable as named views (e.g. 'Client WhatsApps', 'Unresolved mentions', 'Team queue') that appear as tabs at the top of the inbox for quick switching. The default view shows everything unread, sorted by most recent. |
| F07 | **Reply from inbox — channel-native responses** | 🔵 Planned | Use case: The user sees a WhatsApp message and an Instagram comment in the same inbox and wants to reply to both without opening WhatsApp or Instagram separately. Each inbox item has an inline reply panel that opens below it. The reply is sent via the correct API for that channel — a WhatsApp reply goes via the WhatsApp Cloud API, an Instagram comment reply goes via the Instagram Graph API, a Twitter mention reply goes via the Twitter API — but the user just types their response in one consistent composer. The composer is context-aware: for WhatsApp it shows the option to use a message template (required for first-contact messages outside the 24h window); for email it shows a full reply editor with subject threading; for social comments it shows a plain text field with character count. Sent replies are marked as Resolved in the inbox automatically unless the user marks them otherwise. |
| F08 | **Personalized customer service — contact context in inbox** | 🔵 Planned | Use case: When a message arrives in the inbox, the user needs context immediately — who is this person, what's the history, are they a client or a prospect, have they had issues before? Every inbox item shows a contact card panel on the right: the sender's full contact record from Plenix's Contacts section (name, company, role, tags), their interaction history across all channels (previous WhatsApp messages, emails, mentions — not just the current channel), any notes previously added by the user, any open tasks linked to this contact, and any projects they are associated with. If the sender is not yet in Contacts, a one-click 'Add to Contacts' button creates a record pre-filled with what Plenix already knows (name from the platform, handle, profile image). This eliminates the need to context-switch to CRM or email history while composing a reply. |
| F09 | **Team collaboration — assign, comment, and hand off** | 🔵 Planned | Use case: A team where multiple people manage communications needs to coordinate without duplicating responses or dropping items. The Unified Inbox supports team workflows: Assign — any inbox item can be assigned to a specific team member; they receive a notification and the item appears in their personal queue; the inbox shows who each item is assigned to. Internal comments — team members can leave internal notes on any inbox item (visible only to the team, not the external sender) to add context, ask questions, or brief the assignee ('This is the client from Project X — they're unhappy about the delay'). Collision detection — if two team members open the same inbox item at the same time, a 'Someone is viewing this' indicator prevents duplicate replies. Status tracking — items move through statuses (New → In Progress → Resolved) with timestamps so the team can see response times and workload distribution. SLA indicators show items that have been waiting too long without a response. |
| F10 | **Snooze, reminders, and follow-up scheduling** | 🔵 Planned | Use case: Not every message needs an immediate reply — some need to be acted on later. The user can snooze any inbox item to a specific time (e.g. 'remind me tomorrow at 9 AM') or a relative delay (e.g. 'in 3 hours'). Snoozed items disappear from the inbox and reappear at the scheduled time as if they just arrived — with a snooze badge so the user knows it was deferred. A separate 'Scheduled follow-ups' view lists all snoozed items. Additionally, the user can set a follow-up reminder on a sent message ('if I don't get a reply in 48 hours, remind me to follow up') — Plenix monitors for a reply and triggers the reminder only if no response is received by the deadline. This prevents hot leads, supplier RFQs, and client questions from silently falling through the cracks. |
| F11 | **Inbox analytics — response times, volume, channel breakdown** | 🔵 Planned | Use case: The user or team lead wants to understand communication patterns — how fast are we responding, which channels generate the most inbound, are we keeping up with volume? The Inbox Analytics view shows: average first response time per channel, median resolution time, inbound volume by channel and by day/week/month, breakdown by interaction type (messages vs mentions vs comments), top senders by volume, and unresolved item age distribution. For teams, it shows per-member response time and resolved count. All metrics are filterable by date range and channel. The data helps the user identify which channels need more attention, at what times of day inbound volume peaks, and whether response time targets are being met. |
| F12 | **WhatsApp Cloud API — native send and receive** | 🔵 Planned | Use case: The user wants to send and receive WhatsApp messages directly from Plenix — to contacts, clients, and suppliers — without switching to a separate app. Plenix integrates with the WhatsApp Cloud API (Meta's official API, v25.0) rather than unofficial automation tools. The user connects their WhatsApp Business Account by providing a Phone Number ID and a permanent access token from the Meta Developer portal. Outbound messages are sent via POST to the /messages endpoint on the business phone number. Inbound messages are received via a webhook that Plenix registers with Meta. Once connected, WhatsApp conversations appear in Plenix's Messaging section alongside other channels. All messages are stored in Plenix's thread model — the same thread view used for email and other messaging channels. This is the foundation layer on which all other WhatsApp features are built. |
| F13 | **Message types — text, media, audio, documents, location, reactions** | 🔵 Planned | Use case: WhatsApp conversations involve more than plain text — the user needs to send voice notes, images, documents, location pins, and react to messages. Plenix supports all core WhatsApp Cloud API message types: Text messages (plain and with URL preview); Image messages (JPEG/PNG, with optional caption); Audio messages (MP3, OGG — sent as voice notes; the recipient hears them as native WhatsApp voice messages); Video messages (MP4, with caption); Document messages (PDF, DOCX, XLSX, etc. — displayed with filename and file type icon); Sticker messages (WebP format); Location messages (latitude, longitude, name, and address — renders as a map pin in the recipient's chat); Contact card messages (vCard format); Reaction messages (emoji reactions to a specific message, referencing the message ID). Each type maps to a specific API payload structure. File uploads are handled by first uploading media to the Meta media endpoint to obtain a media ID, then referencing that ID in the message payload. |
| F14 | **Message templates — HSM for business-initiated conversations** | 🔵 Planned | Use case: WhatsApp requires pre-approved message templates (called HSMs — Highly Structured Messages) for any business-initiated conversation outside the 24-hour customer service window. The user needs to create, submit for approval, and send these templates from within Plenix without touching the Graph API directly. Plenix's template manager connects to the WhatsApp Business Account via the Graph API (v25.0 /message_templates endpoint) to: list all existing templates with their approval status (APPROVED, PENDING, REJECTED), create new templates with a name, language, category (MARKETING, UTILITY, AUTHENTICATION), and structured components, submit templates to Meta for review, and delete templates that are no longer needed. Template components include: Header (TEXT, IMAGE, VIDEO, or DOCUMENT — sets the top section of the message), Body (the main message text with variable placeholders in {{1}} format), Footer (optional small text at the bottom), and Buttons (QUICK_REPLY buttons or CALL_TO_ACTION buttons linking to a URL or phone number). When sending a template, variable values are passed in the components array to fill the placeholders dynamically (e.g. customer name, order number, tracking link). |
| F15 | **Template variable personalization — dynamic placeholders** | 🔵 Planned | Use case: A template like 'Hello {{1}}, your order {{2}} is ready for collection' needs to be personalized for each recipient before sending. Plenix's template sending flow shows the template with its placeholders highlighted and lets the user fill each variable from: manual text input, a contact field (first name, company name, phone), a project field, a task field, or a custom data source. For bulk sends (e.g. sending the same template to a list of contacts), Plenix maps each placeholder to a column in the contact list so every message is personalized automatically. A preview panel shows the rendered message for each recipient before sending. This eliminates the need to manually construct API payloads with nested components arrays. |
| F16 | **Interactive messages — buttons and list messages** | 🔵 Planned | Use case: The user wants to send WhatsApp messages that the recipient can respond to by tapping a button rather than typing, reducing friction and enabling structured responses. Two interactive types: Button messages — up to 3 quick-reply buttons; the recipient taps one and Plenix receives the button payload as a webhook event, which can trigger an automation (e.g. 'Confirm appointment' button triggers a calendar event creation). List messages — a header, body, footer, and a 'View options' button that opens a scrollable list of up to 10 sections with multiple rows each; useful for menus, service selections, or appointment time slots. Plenix's message composer includes a visual builder for both types — the user adds buttons or list rows without writing JSON. Incoming button responses are captured in the thread view with the selected option highlighted. |
| F17 | **Webhook handling — inbound messages and status updates** | 🔵 Planned | Use case: Plenix needs to receive incoming WhatsApp messages and delivery status updates in real time so the user's conversation thread stays current. Plenix registers a webhook URL with Meta that receives POST notifications for: incoming messages (text, media, audio, interactive replies, and all other message types), message status updates (sent, delivered, read — displayed as single tick, double tick, blue tick on sent messages in the thread view), and template status updates (when a submitted template is approved or rejected by Meta). The webhook endpoint verifies the X-Hub-Signature-256 header on every request to ensure the payload is genuinely from Meta. Inbound media messages trigger a media download from the Meta media URL and store the file in Plenix's Files section linked to the contact's thread. All webhook events are processed in order and idempotently — duplicate deliveries from Meta do not create duplicate messages. |
| F18 | **WhatsApp gateway via Ultramsg — simplified API layer** | 🔵 Planned | Use case: The full WhatsApp Cloud API requires a Meta Business account, a verified business phone number, and direct API integration — which has significant setup friction. For users who want WhatsApp messaging without managing the Meta developer infrastructure directly, Plenix supports Ultramsg as an alternative gateway. Ultramsg is a WhatsApp API gateway that handles the underlying connection and exposes a simpler REST API. The user connects by entering their Ultramsg instance ID and token in Settings → WhatsApp. Plenix then uses Ultramsg's /sendMessage, /sendImage, /sendAudio, /sendDocument, and /sendVoice endpoints as a drop-in replacement for direct Meta API calls. The messaging experience in Plenix is identical regardless of which underlying method is used — the gateway choice is an implementation detail hidden from the end user. The Meta Cloud API path is recommended for production and scale; Ultramsg is recommended for faster setup and testing. |
| F19 | **Audio and voice note messages** | 🔵 Planned | Use case: The user wants to send voice notes to WhatsApp contacts — the same way users send voice messages natively in WhatsApp — directly from Plenix. Audio messages are sent as OGG audio files encoded with the Opus codec (WhatsApp's native voice note format) or as MP3 for general audio. The Plenix message composer includes a voice recording button that captures audio via the browser microphone, encodes it to OGG/Opus, uploads it to the Meta media endpoint to obtain a media ID, then sends it as a WhatsApp audio message with type: voice set to true so it renders as a native voice note (with the waveform player) rather than a generic audio file attachment. The recipient's WhatsApp shows the message exactly as a normal voice note. Incoming audio messages received via webhook are downloaded and displayed in the Plenix thread with an inline audio player. |
| F20 | **Contact and broadcast list management** | 🔵 Planned | Use case: The user needs to send WhatsApp messages to groups of contacts — supplier outreach, client updates, appointment reminders — without manually sending one at a time. Plenix's broadcast feature lets the user select contacts from the Contacts section (filtered by group, tag, or custom criteria), compose a message or select a pre-approved template, personalize variables per contact, and send to the entire list. Each message is sent as a separate individual conversation (not a group message) so replies come back privately to the user. Broadcast send status is tracked per recipient — showing delivered/read status for each contact in the batch. Opt-out handling: contacts who reply with a stop keyword are automatically flagged and excluded from future broadcasts. Send rate is throttled to respect Meta's per-phone-number message limits. |

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

1. **Architectural staging — V2 webview first, V3 protocol bridge later.** Do not attempt to build protocol-level bridges in the first release. V2 uses webview wrappers (reference: Ferdium) to give users access to their existing messaging accounts with zero credential extraction. V3 introduces mautrix bridges for full message data access. The two approaches are not mutually exclusive: ship V2 to unblock users, migrate to V3 per-channel as bridges mature. The capability surface visible to the user (unified inbox, search, AI, project linking) is only achievable in V3 — V2 is a holding pattern.

2. **Ferdium (Apache 2.0) — reference and embed for V2.** Ferdium is an Electron-based webview wrapper that supports 100+ services as isolated browser tabs with shared notification aggregation. It is the most capable OSS unified messaging client built on webviews. License: Apache 2.0 — safe to embed or fork. Study its service recipe format (JSON + JS service descriptors) for the pattern of wrapping third-party web apps. Do not ship Ferdium as-is; extract its recipe system and adapt it to {APP_NAME}'s windowing model. Key limitation: webviews give zero access to message data — no unified inbox, no search, no AI, no project linking. Ferdium is V2 scaffolding only.

3. **mautrix bridges (AGPL) — self-hosted service for V3.** mautrix-whatsapp, mautrix-telegram, mautrix-signal, mautrix-imessage, mautrix-meta, and the full mautrix family are the gold standard for protocol-level bridging. Each bridge runs as a separate daemon connected to a Matrix homeserver via the Application Service API. Coverage: WhatsApp, Telegram, Signal, iMessage, Facebook Messenger, Instagram, Discord, Slack, Google Messages, LinkedIn, X (Twitter DMs), Bluesky. License: AGPL-3.0. This means any modification to the bridge code must be released under AGPL if distributed. The recommended model is self-hosted service — {APP_NAME} ships a Docker Compose stack or managed bridge infrastructure; users do not interact with bridge configuration directly. Do not embed mautrix code into the main {APP_NAME} application binary; keep it as a sidecar service to contain the AGPL boundary.

4. **Beeper — architecture reference only (not embed).** Beeper is the best consumer unified messaging product built on Matrix and mautrix. Study its architecture at both stages: the original bridge model (Matrix homeserver + mautrix bridges per network, with a polished client on top) and the July 2025 on-device relaunch influenced by Texts.com (bridges running locally on the user's device rather than on Beeper's servers). The on-device model is the direction {APP_NAME} should target for V3 — it avoids user data transiting third-party infrastructure and reduces operational cost. Beeper's client is proprietary; its bridges are AGPL open-source and are the same mautrix bridges referenced in note 3.

5. **Matterbridge (Apache 2.0) — channel relay only, not personal inbox.** Matterbridge is an OSS bridge for relaying messages between community channels (Slack channels, Discord servers, IRC, Matrix rooms, etc.). It is useful for team/community scenarios where two group channels need to be mirrored. It is not useful for personal inbox aggregation — it does not model individual conversations, contact identity, or DM threads. Reference it for community/team channel bridging use cases (relevant if {APP_NAME} adds a team workspace feature), but do not use it as the foundation for the unified personal inbox.

6. **Chatwoot (MIT) — already locked for business/customer channels, separate from personal messaging.** Chatwoot is designated as the OSS foundation for {APP_NAME}'s customer and business communication channels (inbound customer support, business inbox). It is MIT-licensed and safe to self-host. It must not be conflated with personal messaging: Chatwoot models contacts as customers and conversations as support tickets — the data model is incompatible with personal inbox semantics. The Messaging capability described in this PRD covers personal communication (the user's own WhatsApp, Telegram, iMessage, etc.). Chatwoot covers the user's business-facing inbox. These are two distinct subsystems with separate data stores.

7. **E2EE termination warning — mandatory user disclosure.** Matrix bridging terminates the original end-to-end encryption at the bridge daemon. A WhatsApp message encrypted with the Signal Protocol is decrypted inside the mautrix-whatsapp bridge process, then re-encrypted for transit over Matrix (optionally with Matrix E2EE). The original E2EE guarantee from WhatsApp does not survive bridging. This is a fundamental architectural constraint, not a solvable implementation problem. {APP_NAME} must surface this clearly in onboarding (not buried in fine print) when a user connects a bridged network: "Connecting this network means {APP_NAME}'s bridge can read your messages. Your original app's end-to-end encryption does not extend to {APP_NAME}." Failure to disclose this is both a trust risk and a potential regulatory liability in GDPR-covered regions.

8. **WhatsApp and Meta platform fragility — active enforcement risk.** Meta actively detects and bans accounts using unofficial API clients, including mautrix-whatsapp. Bans happen at the WhatsApp account level — the user's phone number can be permanently banned from WhatsApp. The risk is real and periodic: bridges break after Meta client updates, and some users have reported account bans. For V2 (webview), this risk is lower because the webview mimics a real browser session. For V3 (mautrix bridge), disclose the risk to the user before connection and build a monitoring mechanism that detects bridge disconnection and alerts the user immediately. The official WhatsApp Cloud API (Meta-sanctioned) is the only safe production path for sending business messages at scale; it does not support receiving messages from personal accounts.

9. **iMessage Mac relay — platform lock-in and Apple enforcement.** mautrix-imessage requires a Mac running macOS with an Apple ID signed into Messages, with the bridge daemon running 24/7 on that machine. There is no iMessage API. Apple has no official cross-platform iMessage support and actively fights third-party implementations (see: Beeper Mini shutdown, November 2023). The Mac relay approach works but is operationally fragile: the Mac must stay online, macOS updates can break the bridge, and Apple may further restrict local Messages database access. Present iMessage bridging as an advanced, self-managed feature — not a standard connector. Do not promise iMessage reliability in marketing copy.

10. **Integration pattern — Matrix homeserver as the message bus.** The recommended V3 architecture is: one Matrix homeserver (Synapse or Dendrite, both Apache 2.0) per {APP_NAME} user or per {APP_NAME} instance, with mautrix bridge daemons connecting each external network to the homeserver via the Application Service API. {APP_NAME}'s backend connects to the homeserver via the Matrix Client-Server API to read and write messages. This keeps {APP_NAME}'s application code network-agnostic — it speaks Matrix, and the bridges handle protocol translation. Message storage lives in the Matrix homeserver's database (PostgreSQL). {APP_NAME}'s own database stores only metadata (thread references, project links, AI annotations) layered on top of Matrix event IDs.

11. **What {APP_NAME} builds natively vs defers to a service.** Build natively: the unified inbox UI, thread model, contact identity resolution, read/unread state, project linking, AI annotation layer, notification dispatch, and the bridge orchestration layer (starting and monitoring bridge daemons). Defer to OSS services: the Matrix homeserver (Synapse/Dendrite), the mautrix bridge daemons per network, and the WhatsApp Cloud API gateway for business messaging. Do not attempt to implement protocol-level clients (WhatsApp Web protocol, Signal protocol, iMessage protocol) from scratch — these are years of reverse-engineering work that the mautrix project has already done and maintains.

12. **License boundary summary and compliance checklist.** Before shipping any V3 bridge feature: (a) Synapse/Dendrite — Apache 2.0, embed or self-host freely; (b) mautrix bridges — AGPL-3.0, must run as separate service processes, any modifications must be open-sourced; (c) Ferdium recipes — Apache 2.0, can be embedded in {APP_NAME}'s Electron/webview layer with attribution; (d) Matterbridge — Apache 2.0, safe to embed or self-host; (e) Chatwoot — MIT, safe to self-host with no copyleft obligation. Conduct a license audit before each release that includes AGPL components. Consult legal before distributing any binary that statically links AGPL code.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| Contacts | Contact identity resolution — every thread is associated with a Contacts record; sender matching, avatar, name, and history are pulled from Contacts |
| Search | Message search — full-text search across all thread content is delegated to the Search capability |
| AI Engine | Summaries — thread summarization, suggested replies, and priority scoring are provided by the AI Engine capability |
| Projects | Message-to-project linking — threads and individual messages can be linked to a Project record; this dependency enables context surfacing inside the project view |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| Dashboard | Messaging widget — the Dashboard displays an unread-count and recent-threads widget sourced from the Messaging capability |
| Connectors | Channel data — the Connectors capability consumes Messaging's channel configuration and credential model to enumerate which external messaging services are connected |

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
