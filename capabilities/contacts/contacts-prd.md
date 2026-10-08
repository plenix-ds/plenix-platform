# Contacts PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Contacts |
| **Capability ID** | contacts |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST manage people, companies, consultants, suppliers, and any external party with full profile, skills, portfolio, and linked records.

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

Source feature area(s): People & Contacts

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Contact list and detail panel — current implementation** | ✅ Built / Required | The Contacts screen shows a scrollable list of contacts on the left, each row showing an avatar circle, full name, role title, and company. Clicking a contact opens a right panel with more detail. The list supports group filtering via the sidebar (Clients, Contractors, Personal, Professional). The dashboard widget shows horizontal contact rows with a message icon and call icon on the right. This is the baseline — the features below describe the full planned system. |
| F02 | **Relationship hierarchy — organizing people by closeness** | 🔵 Planned | Use case: A flat alphabetical contact list treats a close friend the same as someone you met once at a conference. Plenix organizes people within a relationship-based hierarchy that reflects the strength and nature of each connection. The hierarchy tiers are: Family, Extended Family, Close Connections, Casual Connections, Acquaintances, Professional/Business Contacts, and Distant/Minimal Contact. Each tier is a collapsible section in the People sidebar. This structure gives the user an immediate overview of their network distribution — how many close vs casual connections they have — and makes it obvious where attention may be needed. Tiers can be filtered or hidden by context (e.g. show only Personal tiers when not in work mode). The user assigns each person to a tier and can move them as the relationship evolves over time. |
| F03 | **Relationship focus — satisfactory vs needs attention** | 🔵 Planned | Use case: Within any tier, some relationships are healthy and some have drifted. Each person can be marked with a relationship status: Satisfactory (things are good, no action needed) or Needs Attention (the relationship requires effort, more frequent contact, or a specific action). This single flag creates an actionable filtered view: 'Show me everyone who needs attention right now.' This is not a judgment about the person but a self-directed signal to the user about where to invest relational energy. The Needs Attention view is the most action-oriented view in the People section — it is the starting point for intentional relationship maintenance. |
| F04 | **Reconnect tracking — intervals, last contact, next due** | 🔵 Planned | Use case: Important relationships fade when contact becomes irregular. Plenix supports configurable reconnect intervals per person so the system surfaces reminders when it is time to reach out. For each person the user defines: a desired reconnect frequency (daily, weekly, fortnightly, monthly, quarterly, annually, or custom); the date of the last interaction (manually logged or auto-detected from a connected messaging/email channel); an automatically calculated next reconnect date (last interaction + frequency interval); and an optional scheduled future interaction (a specific date when contact is already planned). The People list highlights people whose next reconnect date has passed or is approaching. A 'Reconnect due' filtered view shows only these people, sorted by most overdue first. This prevents important relationships from silently lapsing without the user noticing. |
| F05 | **Custom data fields — flexible person profiles** | 🔵 Planned | Use case: Different relationships require tracking different information. A supplier contact needs a company name, VAT number, and product categories. A close friend needs a birthday, spouse's name, and shared interests. Plenix does not impose a fixed schema. Each person's profile supports user-defined fields of multiple types: Email (with click-to-compose and direct message action); Phone (with click-to-call and WhatsApp message action); Link (general URL or platform-specific profile link — LinkedIn, Instagram, Twitter/X, GitHub, personal site); Social profiles (recognized platforms get branded icons); Date — one-time (e.g. a meeting date, anniversary); Date — recurring (e.g. birthday, work anniversary — automatically recalculates each year); Birthday (special case of recurring date — auto-calculates age and years known); and Text/notes (formatted, multi-paragraph, supports markdown). Field names are fully customizable — the user labels each field (e.g. 'Dog's name', 'Preferred coffee', 'Last gift given'). There is no required field except a name. |
| F06 | **Event and date tracking — birthdays, anniversaries, upcoming events** | 🔵 Planned | Use case: Missing a birthday or anniversary damages a relationship. Plenix tracks all date-type fields across all contacts and surfaces upcoming events proactively. The Events view shows a chronological list of upcoming dates across the entire contact database: birthdays, anniversaries, scheduled reconnects, and any custom date fields. Each event shows the person's name, the event type, the date, and how many days away it is. For birthday fields, the person's age is automatically calculated and shown. Optional advance notifications fire a configurable number of days before the event (e.g. 7 days before a birthday). The Calendar section also shows these events when the relevant calendar is enabled, so relationship events appear alongside work and personal calendar items. |
| F07 | **Interaction history and memory timeline** | 🔵 Planned | Use case: The user wants to remember what they talked about last time, what they gave as a gift, what the person mentioned about their family, or what shared experience they had. Each person in Plenix has a chronological interaction timeline. Entries in the timeline can include: logged interactions (a note with date, channel, and a summary of what was discussed); shared events or experiences (a memory the user wants to preserve); linked tasks (a follow-up action that arose from an interaction, linked bidirectionally); and linked journal entries (if the user journals, entries can be associated with one or more people so the full context is accessible from the person's profile). The timeline provides continuity — the user can scroll back through months or years of interactions and quickly recall the full context of a relationship before reaching out. Entries can be added manually or captured automatically from connected messaging/email channels. |
| F08 | **Notes and context — running record per person** | 🔵 Planned | Use case: Every conversation reveals things worth remembering — someone mentioned they are looking for a new job, they have a child starting school, they are allergic to shellfish, they prefer to be contacted by WhatsApp not email. The Notes field on each person's profile is a formatted, persistent text area that the user maintains over time. It supports markdown formatting (bold, bullets, headings) and can be as long as needed. Unlike interaction timeline entries (which are date-stamped events), notes are a living document — a running record of context that the user edits and updates. The notes field is searchable across all contacts, so typing 'shellfish' finds the person who mentioned the allergy even if the user doesn't remember the name. |
| F09 | **Task integration — follow-up actions from contacts** | 🔵 Planned | From any person's profile, the user can create a task linked to that contact. The task appears in the Tasks section with the contact's name as context, and in the contact's profile under a 'Linked tasks' tab. Examples: 'Send proposal to [name]', 'Follow up with [name] about the contract', 'Buy birthday gift for [name]'. Tasks created this way inherit the contact's project association if one exists. Completing the task in the Tasks section marks it as resolved in the contact's profile. This bidirectional link means the user never needs to duplicate information — the task lives in one place but is visible from both the task list and the contact record. |
| F10 | **Privacy and security — encrypted contact data** | 🔵 Planned | Use case: Contact profiles contain sensitive personal information — family details, private notes, health information, financial context. This data requires protection beyond normal app security. Plenix applies encryption to stored contact data and interaction histories. An optional additional access control (device PIN or biometric) can be required to open the People section, separate from the main app login. This is particularly important if the user's device is shared or if the contact database contains sensitive relationship notes that should not be visible to casual observers. Encrypted export is available so the user can back up their contact data to a file without it being readable if the backup is accessed by a third party. |
| F11 | **People section sidebar — tiers, views, and filters** | 🔵 Planned | The People sidebar reflects the full hierarchy and filter options: All Contacts (total count); Needs Attention (contacts flagged for relationship maintenance); Reconnect Due (contacts whose reconnect interval has elapsed); Upcoming Events (birthdays and anniversaries in the next 30 days); then the relationship tier sections — Family, Extended Family, Close Connections, Casual Connections, Acquaintances, Professional, Distant. Each tier section shows a count. Below tiers, Groups (Clients, Contractors, etc.) appear as before. A search bar at the top of the sidebar filters the visible list by name across all tiers. The user can create custom groups (e.g. 'Book club', 'Surf friends', 'Investors') as additional organizational layers that cut across the tier hierarchy. |
| F12 | **Widget action icons — message and call** | ✅ Built / Required | In the dashboard widget, each contact row has two circular action buttons: a blue message bubble (navigates to that contact's thread in the Messaging section) and a green phone circle (initiates a call). Both use event stopPropagation to prevent row selection on click. Both have hover state color changes. |

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

1. **Study Radicale as the CardDAV protocol layer.** Radicale (GPL v3) is a lightweight Python CardDAV/CalDAV server. Run it as a self-hosted service on Plenix infrastructure — do not embed the source directly into the application. It handles vCard storage, collection management, and the CardDAV wire protocol so Plenix does not need to implement RFC 6352 from scratch.

2. **License classification — Radicale.** GPL v3 applies to Radicale itself. Because it runs as a standalone network service (not linked into the Plenix application binary), the GPL copyleft boundary does not extend to Plenix's own code. Treat it as a self-hosted service dependency, not an embedded library.

3. **Study Nextcloud Contacts as a UI reference only.** Nextcloud Contacts (AGPL) provides mature UI patterns for contact groups, vCard field editing, sharing, and CardDAV sync. Reference it for UX inspiration and data model conventions. Do not embed any Nextcloud code — AGPL would require open-sourcing any modified version distributed to users. Classification: reference only.

4. **Contact = unified identity across all communication channels.** A contact record is the canonical identity object that ties together email address(es), phone numbers, messaging handles (WhatsApp, Signal, Telegram), and social profile URLs. Every communication event in {APP_NAME} (email thread, message, call log) links to a contact ID, not a raw address. This is the architectural commitment that makes cross-channel relationship intelligence possible.

5. **Store contact data in vCard 4.0 format via Radicale.** vCard 4.0 supports custom extension properties (X- prefix) for {APP_NAME}-specific fields (relationship tier, reconnect interval, last interaction date, relationship status flag). Store these as vCard extensions so the data remains portable and importable/exportable via standard clients.

6. **{APP_NAME} builds the relationship intelligence layer natively; Radicale owns only raw storage.** Radicale stores and syncs vCards. {APP_NAME}'s application layer owns: relationship tier assignment, reconnect interval logic, needs-attention flagging, interaction timeline, linked tasks, and upcoming events aggregation. None of this logic lives in or depends on Radicale's internals.

7. **Sync pattern: {APP_NAME} backend acts as CardDAV client to Radicale.** The application server syncs to Radicale over the standard CardDAV HTTP API (REPORT, PUT, DELETE). The mobile and desktop clients do not connect to Radicale directly — they talk to the {APP_NAME} API, which abstracts the CardDAV layer. This keeps the protocol complexity server-side and allows future migration away from Radicale without client changes.

8. **E2EE warning — Radicale stores plaintext vCards.** Radicale does not provide at-rest encryption of vCard data. Sensitive contact notes (health information, private relationship context) require an additional encryption layer applied by {APP_NAME} before writing to Radicale, or a separate encrypted store for sensitive fields. Do not rely on Radicale's storage confidentiality for F10 (Privacy and security — encrypted contact data).

9. **Platform fragility warning — do not rely on third-party social profile APIs.** Importing contact enrichment data from LinkedIn, Twitter/X, Instagram, or similar platforms via unofficial scraping or unofficial APIs is fragile and violates most platforms' terms of service. {APP_NAME} stores social profile URLs (as vCard URL fields) entered manually or via user-authorized OAuth flows only. Do not build automatic social graph enrichment that depends on undocumented endpoints.

10. **Import/export via standard vCard (.vcf) files.** The contact database must support full import and export in .vcf format so users are never locked in. Import handles vCard 3.0 and 4.0. Export produces a single .vcf archive. Encrypted export (password-protected ZIP containing the .vcf) satisfies the F10 encrypted backup requirement without a custom format.

11. **Defer external contact sync (Google Contacts, iCloud, Exchange) to a later phase.** Two-way sync with Google Contacts, Apple iCloud, and Microsoft Exchange introduces significant conflict-resolution complexity and platform-specific OAuth scope management. Defer this to a post-launch capability. For launch, support manual .vcf import only. Flag this as a known gap — do not architect Radicale integration in a way that blocks adding external sync later.

12. **Access control: Radicale collections are per-user.** Each {APP_NAME} user account maps to a dedicated Radicale collection (address book). Multi-user sharing of contacts (e.g. a shared team address book) requires explicit collection-level permission grants in Radicale's auth config. Design the Radicale deployment to support per-user isolation from day one, with shared collections as an optional overlay rather than the default model.

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
