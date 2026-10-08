# Channels PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Channels |
| **Capability ID** | channels |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST manage social media and content channels — platform, metrics, and publishing status.

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

Source feature area(s): Channels

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Channel card dashboard — grid layout** | 🔵 Planned | The Channels screen renders a 3-column card grid. Each card shows: platform branded icon (~48px), platform name, bot identifier, Connected/Disconnected status badge (top-right), and a summary strip above the grid showing total channels and how many are live (e.g. '5 channels · 5 connected' with a green pulse dot). |
| F02 | **Per-card stats row — Users, Groups, Requests** | 🔵 Planned | Each card contains a three-cell stats row: Users (unique users who have messaged the bot), Groups (group chats the bot is active in — 'Groups unsupported' shown for platforms like WeChat that don't allow bots in groups), and Requests (messages currently pending or in-flight). Each stat is in its own bordered box — label above, number below in larger weight. Updates live via webhook or API polling. |
| F03 | **Assigned AI Agent row** | 🔵 Planned | Below the stats row, an agent row shows the assigned AI Agent's logo, name, truncated one-line description, and a right-pointing chevron. Clicking navigates directly to that agent's configuration page. Makes the agent–channel relationship visible at a glance without opening Settings. |
| F04 | **Channel action buttons — Settings, Disconnect, Re-bind, Unbind** | 🔵 Planned | Two buttons at the bottom of each card. Most platforms: Settings (gear icon, opens configuration panel) and Disconnect (power icon, revokes connection). OAuth platforms like WeChat: Re-bind (re-launches OAuth, preserves stats and agent assignments) and Unbind (fully removes connection and wipes data). Re-bind refreshes credentials; Unbind starts over. |
| F05 | **Connect a new channel** | 🔵 Planned | A 'Connect Channel' button opens a stepped modal: (1) select platform — Telegram, Discord, WhatsApp, WeChat, DingTalk, Feishu, Slack, and more; (2) enter bot token or complete OAuth flow; (3) test with a live ping; (4) assign an AI Agent. Once connected, the new card appears with a Connected badge. All credentials stored locally — no cloud relay required. |
| F06 | **Per-channel configuration panel** | 🔵 Planned | Each channel's Settings panel: bot token or API key (masked, show/hide toggle), webhook URL (auto-generated, copyable), user/group whitelists, message rate limit (messages per minute), response language preference, and assigned AI Agent (switchable without disconnecting). A 'Test connection' button sends a live ping to verify the channel. Changes save on blur. |

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

1. **Study Chatwoot for channel-adapter architecture (MIT, embed-eligible).** Chatwoot (MIT, ~30k stars) is the primary OSS reference. Its `app/services/channel` directory maps cleanly to the bot-connector pattern Plenix needs: one adapter class per platform, each implementing a uniform interface (receive, send, webhook_verify). Read its channel adapter code before writing any platform connector. License: MIT — code may be embedded directly in a closed product with attribution in NOTICE file.

2. **Study Rocket.Chat for inbox and agent-assignment patterns (MIT, reference only).** Rocket.Chat (MIT, ~45k stars) demonstrates how to route an inbound message to a specific agent or bot, manage concurrent channel state, and present a unified inbox. Use it as a reference for the architectural shape of the Channels module — do not embed Rocket.Chat code wholesale, as its codebase is tightly coupled to Meteor. License: MIT — reference and adapt patterns; avoid copy-paste of non-trivial code blocks without review.

3. **Key architectural decision: local-first credential store, no cloud relay.** Bot tokens, OAuth credentials, and webhook secrets MUST be stored in the local Plenix data store (encrypted at rest), never sent to a Plenix cloud service. This is a hard constraint stated in F05. The channel module must support fully offline credential management; live API calls to platforms happen from the user's machine or their self-hosted Plenix instance.

4. **Implement a uniform ChannelAdapter interface; platforms are plugins.** Define a single interface — e.g., `connect(config)`, `disconnect()`, `send(message)`, `onMessage(handler)`, `testPing()` — that every platform adapter must satisfy. Telegram, Discord, WhatsApp (via Cloud API or Baileys), Slack, DingTalk, Feishu, and WeChat are all adapters behind this interface. This makes F05's stepped-modal flow platform-agnostic and lets new platforms be added without touching core Channels logic.

5. **WhatsApp: do not embed Baileys without legal review (AGPL-3.0, high risk).** Baileys (AGPL-3.0) reverse-engineers the WhatsApp Web protocol. Embedding it in a product distributed to end users triggers AGPL copyleft obligations on the entire application. Options in priority order: (a) use the official WhatsApp Business Cloud API (no OSS license risk, requires Meta approval); (b) self-host a Baileys-based bridge (e.g., whatsapp-web.js or mautrix-whatsapp) as a sidecar service the user runs separately — Plenix connects to it via a local socket, keeping Baileys outside the main application boundary. Do not ship Baileys inside the Plenix binary.

6. **WeChat: OAuth re-bind flow is mandatory, treat as a first-class case.** WeChat tokens expire aggressively (~2 hours for access tokens) and the platform bans bots in groups (see F02, F04). The Re-bind / Unbind distinction in F04 must be implemented as distinct state machine transitions, not just a UI label difference. Re-bind must preserve the channel's stats, agent assignment, and whitelist without resetting them. Store token refresh timestamps and surface expiry warnings in the card UI before the token lapses.

7. **Webhook architecture: generate per-channel URLs, handle signature verification locally.** Each connected channel gets a unique webhook endpoint (e.g., `/webhooks/channels/{channel_id}`). Signature verification (HMAC-SHA256 for Telegram/Slack/Discord, token-based for WeChat) must happen synchronously before any message is dispatched to the AI Agent. Do not accept unsigned payloads. For local-only deployments, an ngrok-compatible tunnel utility or a user-supplied public URL must be documented as a setup step — Plenix does not provide a relay.

8. **Platform fragility warning: unofficial APIs and ToS changes break adapters.** Platforms routinely change undocumented APIs, revoke bot permissions, or tighten webhook requirements without notice (WeChat, DingTalk, Feishu in particular). Build adapter health checks — the `testPing` call in F06 must run on a schedule (e.g., every 15 minutes) and surface degraded/broken status on the card without user action. Log platform errors with timestamps so users can correlate outages. Plan to maintain adapters as a recurring engineering cost.

9. **Integration pattern for AI Agent assignment: event bus, not direct call.** When a message arrives on a channel, the adapter should emit a typed event (`channel.message.received`) onto an internal event bus. The AI Agent subsystem subscribes to this event and picks up the message based on the channel-to-agent mapping stored in config. This decouples Channels from the AI Agent module and allows the assignment to be changed at runtime (F06) without restarting the adapter. Chatwoot's conversation-assignment service is a useful shape reference here.

10. **Stats counters (Users, Groups, Requests) are local aggregates, not platform-pulled.** Platforms do not expose these counts via API in a uniform way. Plenix MUST maintain its own counters: increment Users on first-seen sender ID per channel, Groups on first-seen group/chat ID, and Requests on each inbound message with a pending AI response. These are stored in the local database alongside channel config. Do not attempt to sync counts from the platform — treat platform data as the message stream only.

11. **E2EE warning: Plenix cannot provide end-to-end encryption for platform messages.** Messages received via Telegram bots, Discord, WhatsApp Cloud API, or WeChat are delivered to Plenix in plaintext after the platform decrypts them. Plenix can encrypt the stored message log at rest, but the platform itself sees message content. This must be clearly disclosed in onboarding for any channel. Do not represent the channel integration as E2EE to users.

12. **Plenix builds natively: channel card UI, adapter interface, credential store, local stats, webhook router, agent-assignment event bus, per-channel config panel. Plenix defers to external services: the platform APIs and bot infrastructure themselves (Telegram Bot API, Discord Gateway, WhatsApp Business API, etc.), and optionally a user-run sidecar for AGPL-licensed bridges (Baileys, mautrix). Plenix does not build or operate a message relay, a cloud inbox, or a shared team inbox — those are Chatwoot's domain and explicitly out of scope for this capability.**

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
