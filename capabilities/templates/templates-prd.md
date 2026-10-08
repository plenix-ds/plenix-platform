# Text Templates PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Text Templates |
| **Capability ID** | templates |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-11 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST enable users to create, manage, and insert reusable text templates and snippets across notes, documents, messages, and other text fields.

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

Source feature area(s): Text Templates & Snippets

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Snippet library — save any text as a reusable template** | 🔵 Planned | Use case: The user types the same phrases, responses, email openers, signatures, product descriptions, and RFQ paragraphs dozens of times per week. Instead of retyping or copy-pasting from old documents, they define a snippet once and insert it anywhere with a short shortcut. The Snippet Library is a collection of named text templates, each assigned a keyboard shortcut trigger (e.g. /ty for a thank-you sentence, /rfq for a full RFQ email template, /sig for an email signature, /addr for a shipping address). Snippets can be plain text or rich text (with formatting preserved when inserted into a rich-text field). They are organized into folders (Personal, Work, Client Communication, Procurement, Support) for browsability. Each snippet shows a preview of its content and its shortcut. Snippets are created from a library panel in Plenix Settings → Templates, or on-the-fly by selecting text and choosing 'Save as snippet'. |
| F02 | **Text expansion — type shortcut, text inserts instantly** | 🔵 Planned | When the user types a defined shortcut (e.g. /rfq) in any text field in Plenix — a note, an email compose window, a WhatsApp message, a task description, a database cell — the shortcut is detected and replaced immediately with the snippet's full content. The replacement is instant and invisible — the user types the shortcut, it disappears, and the expanded text appears as if typed at full speed. The trigger character is configurable: /shortcut (default, using forward slash as a namespace), ;shortcut, or any other prefix the user sets. The expansion happens without any modal or confirmation — just type and it expands. If the user types the shortcut but does not want to expand it (rare), pressing Escape before the expansion fires cancels it. This is the core Text Blaze / TextExpander interaction model applied natively within Plenix. |
| F03 | **Dynamic templates — form fields and variable placeholders** | 🔵 Planned | Static snippets expand the same text every time. Dynamic templates include interactive form fields that prompt the user to fill in values at the time of insertion. A template like 'Dear {name}, thank you for your enquiry about {product}...' pops up a small inline form with fields for Name and Product when the shortcut is triggered. The user fills in the fields and presses Enter — the completed text inserts with the variables substituted. Field types: text input (single-line or multi-line), dropdown (pre-defined options — e.g. choose from a list of product categories), date picker (inserts a formatted date), and checkbox (inserts a conditional phrase — 'If checked, add the urgency note'). Fields can have default values. This makes it possible to have a single RFQ template that handles dozens of different supplier and product combinations without creating a separate snippet for each. |
| F04 | **Dynamic formulas — dates, calculations, and system values** | 🔵 Planned | Snippets can include formula commands that compute their value at the moment of insertion: {date} inserts today's date in the configured format (e.g. '25 April 2026'), {date+7} inserts a date 7 days from now (useful for payment terms: 'Payment due by {date+30}'), {time} inserts the current time, {day} inserts the day of the week, {clipboard} inserts the current clipboard contents (useful for 'Following up on your message: {clipboard}' patterns), {cursor} sets the cursor position after insertion (the cursor lands at a designated spot in the expanded text so the user can continue typing immediately). Formulas eliminate the most common manual adjustments users make after expanding a template — today's date, a future deadline, a reference number from the clipboard. |
| F05 | **System-wide expansion — works everywhere in Plenix** | 🔵 Planned | Text expansion works in every text input across Plenix without needing to be enabled per-section: Notes editor, Document editor, Email compose, WhatsApp message compose, Task title and description, Calendar event title and description, Database cells, Contact notes, AI Chat input, Search bar, and any other text field. The expansion engine hooks into the global keyboard input handler so it is a single system — not a per-section implementation. A future desktop-app version will also expand snippets in external applications (Gmail in the browser, Google Docs, LinkedIn, Slack, any desktop app) similar to how Text Blaze works as a Chrome extension or macOS/Windows app. |
| F06 | **Shared snippet folders — team templates** | 🔵 Planned | Use case: A team uses the same email responses, product descriptions, and support replies. Instead of each person maintaining their own snippet library, a shared folder allows one person to create and maintain templates that everyone on the team can use. Shared folders are created in the Snippet Library and shared with specific Plenix users or made available to everyone in a workspace. When the owner updates a snippet in the shared folder, all users immediately get the updated version — no redistribution needed. Each shared snippet shows who created it and when it was last updated. Read-only sharing (use but not edit) and collaborative sharing (any member can edit) are configurable per folder. This makes the snippet library a living team knowledge base for communication standards. |
| F07 | **Snippet search and quick-insert panel** | 🔵 Planned | A quick-insert panel (triggered by a keyboard shortcut, e.g. Ctrl+Shift+V or a dedicated button in any toolbar) opens a searchable list of all snippets. The user types to filter by snippet name, folder, or content. Clicking a result or pressing Enter inserts the snippet at the current cursor position. This is the mouse-driven alternative to typing the shortcut — useful when the user cannot remember the exact shortcut but knows roughly what they are looking for. The panel shows the snippet name, its shortcut, and a preview of the first line of content. Frequently used snippets are surfaced at the top of the list regardless of alphabetical order. |
| F08 | **Snippet analytics — usage tracking** | 🔵 Planned | The Snippet Library shows usage data per snippet: how many times it has been expanded in the last 7 days, 30 days, and all time. A summary statistic estimates the total characters saved (expansions × average snippet length) and converts that to an estimated time saved (at a configured typing speed, default 200 characters per minute). Snippets with zero uses in 90 days are flagged as stale — the user can decide to delete them or update them. Frequently-used snippets are highlighted so the user knows which templates are pulling their weight. For team shared folders, per-member usage data shows who is using the shared templates and who is not. |

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

1. **Study Espanso as the primary reference.** Espanso (GPL v3, ~12k stars, Rust) is the most complete open-source cross-platform text expander available. Study its trigger detection model, regex trigger support, form/variable system, shell command integration, date expansion syntax, and YAML-based snippet definition format. Do not embed or ship Espanso — use it as a behavioral and architectural reference only. License classification: Reference.

2. **Build the expansion engine natively inside {APP_NAME}.** Because {APP_NAME} is a single-surface product (all text fields are owned by the same application), a global OS-level input hook is not required in v1. Implement the trigger detection engine as a shared input middleware layer that all text editors and input fields in {APP_NAME} subscribe to. This is simpler, more reliable, and avoids the elevated OS permissions that tools like Espanso require for system-wide interception.

3. **Defer system-wide (cross-app) expansion to a later desktop phase.** System-wide expansion — where snippets fire inside Gmail in the browser, Google Docs, Slack, or any native app — requires either a browser extension (Chrome/Edge content-script model, as used by Text Blaze) or a privileged background process with accessibility/input-monitoring permissions (as used by Espanso on macOS/Windows). Both carry platform fragility risk and OS-permission prompts. Scope v1 to within-{APP_NAME} only. Flag system-wide expansion as a future desktop milestone.

4. **Model the trigger system on Espanso's three trigger modes.** Espanso supports plain word triggers, regex triggers, and prefix triggers. For {APP_NAME} v1, implement prefix triggers (e.g. `/rfq`, `;addr`) as the primary pattern — they are the lowest-friction model for business users. Add regex triggers as a power-user feature in a later iteration. Store trigger strings as plain text fields in the snippet schema; reserve a `trigger_type` enum (`prefix` | `regex` | `word`) for future extension.

5. **Form fields and variable substitution: reference Espanso's form system, build a simplified version natively.** Espanso supports forms with text, choice, and list field types rendered as OS-native dialogs. {APP_NAME} should render inline floating form panels (not OS dialogs) that are consistent with the application's own design system. Field types for v1: single-line text, multi-line text, dropdown (static option list), date picker. Field definitions are stored as a JSON array in the snippet record. The expansion engine evaluates the form, substitutes values, and inserts the final string.

6. **Dynamic formula tokens: implement a minimal set natively.** Espanso supports date, time, random, clipboard, and shell-command expansions via a token system. For {APP_NAME} v1, implement: `{date}` (today in locale format), `{date+N}` / `{date-N}` (offset days), `{time}`, `{day}`, `{clipboard}`, and `{cursor}` (post-insertion cursor placement). Do not implement shell command execution in the web/cloud version — it is a security boundary violation. Shell expansion may be revisited for a sandboxed desktop build only.

7. **Snippet storage: own the data model entirely.** Snippets are stored in {APP_NAME}'s own database (server-side for sync, with local cache for offline). Schema fields: `id`, `name`, `shortcut`, `trigger_type`, `content_plain`, `content_rich` (JSON/ProseMirror document), `variables` (JSON array of field definitions), `folder_id`, `workspace_id`, `owner_id`, `is_shared`, `share_mode` (`read` | `collaborate`), `created_at`, `updated_at`, `use_count`, `last_used_at`. No dependency on any third-party snippet storage service.

8. **License warning: do not bundle or statically link Espanso.** Espanso is GPL v3. Embedding its code or linking it into {APP_NAME} would require {APP_NAME} to be released under GPL v3. The correct posture is reference-only: study the codebase, adapt ideas, write original implementation. If a pre-built binary distribution of Espanso is ever offered as an optional companion tool to the desktop app, it must be distributed as a separate process under its own license terms — not embedded in {APP_NAME}'s binary.

9. **Shared snippet folders: implement as a server-side permission layer.** Shared folders are resolved at query time using workspace membership and per-folder `share_mode`. Do not replicate shared snippets into each member's personal library — maintain a single canonical copy owned by the creator. All members read from the same record. Edits by collaborators are logged with `edited_by` and `edited_at`. Invalidate local caches on update so all users receive changes within one sync cycle.

10. **Usage analytics: track locally and aggregate server-side.** Log each expansion event (snippet id, timestamp, surface) to a lightweight event table. Aggregate into per-snippet counters (`use_count_7d`, `use_count_30d`, `use_count_all`) via a scheduled background job. Characters-saved and estimated-time-saved are computed client-side from `use_count_all` × `avg_content_length` at display time — do not store derived values. Stale-snippet detection (zero uses in 90 days) runs as a periodic server-side query and surfaces results in the snippet library UI as a badge, not a notification.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| **Prompt Studio** | Reuses this capability's `{{variable}}` token-parsing and fill-in form engine, and shares the trigger-expansion engine through a distinct namespace (Text Templates default `;`, Prompt Studio default `/`). The global Trigger Registry enforces per-namespace uniqueness and warns on cross-library conflicts. Prompt Studio MUST NOT implement a second parser or trigger engine. see Prompt Studio PRD |

### Related Capabilities

| Capability | Relationship |
|---|---|
| **Prompt Studio** | Sibling. Text Templates = reusable human-readable text inserted into the user's own writing (no AI run history, no target model). Prompt Studio = reusable AI instructions with target tool/model, syntax profiles, runs, and lifecycle. Shared variable + trigger engines; separate libraries, UX, and trigger namespaces. A snippet belongs to exactly one library; "send to AI" intent ⇒ Prompt Studio. see Prompt Studio PRD |

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
