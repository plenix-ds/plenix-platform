# 03 — Tags PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Tags |
| **Capability ID** | tags |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-05-01 |
| **Revision summary** | Full canonical specification — all 13 PRD sections documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system must be able to label bookmarks with one or more flexible keyword tags, list all tags with usage counts, rename a tag everywhere it appears, merge multiple tags into one, and remove tags across the user's library or within a single collection.

---

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

### UC-01 — Add tags while saving a bookmark on web or desktop

| Item | Detail |
|---|---|
| Actor | Web or desktop user. |
| Goal | Label a new bookmark at save time so it can be found from multiple angles later. |
| Main Flow | 1. User opens the save flow from the web or desktop app. 2. User types tags in the Tags field, separating tokens with commas. 3. User optionally selects from existing-tag autocomplete or AI-suggested tags. 4. User confirms save. 5. System persists the bookmark with the supplied `tags` array. |
| System Response | Bookmark is created with the listed tags. Each tag's running count increases. New tag strings begin appearing in autocomplete and the sidebar tag list. |
| Alternate Flow | If the user enters no tags, the bookmark is saved with `tags: []` and is eligible for the **Without tags** filter (see **Search & Filters PRD**). |

### UC-02 — Add tags while saving from the browser extension

| Item | Detail |
|---|---|
| Actor | Browser extension user. |
| Goal | Tag a page at save time directly from the extension popup, without opening the full app. |
| Main Flow | 1. User clicks the extension icon on the current page. 2. User types tags in the Tags field. 3. User optionally picks from AI-suggested tags surfaced in the popup. 4. User saves. |
| System Response | Bookmark is created with the listed tags; tag state is synchronized back to the application. |
| Alternate Flow | If the extension is offline or sync fails, the system SHOULD preserve the draft when offline behavior is supported (offline rules are 🔴 Not Defined; see **Browser Extension / Mobile Capture PRD**). |

### UC-03 — Add tags from the mobile share flow

| Item | Detail |
|---|---|
| Actor | iOS or Android user. |
| Goal | Tag content shared into the bookmark app from another app. |
| Main Flow | 1. User shares content from another app to the bookmark app. 2. User selects a destination collection. 3. User taps the Tags field. 4. User enters tags. 5. User saves. |
| System Response | Bookmark is saved with the assigned tags; the user's tag listing reflects the new tag(s) on next sync. |
| Alternate Flow | If the user skips the Tags field, the bookmark is saved without tags. |

### UC-04 — Add or remove tags on an existing bookmark

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Adjust a single bookmark's tags after the fact. |
| Main Flow | 1. User opens the bookmark's edit screen (right-click → Edit on web/desktop; long-press → Edit on iOS; tap edit icon on Android). 2. User modifies the Tags field. 3. User saves. |
| System Response | The bookmark's `tags` array is updated. Tag counts update accordingly; tags whose `count` reaches zero disappear from listings. |
| Alternate Flow | This flow's UX is fully owned by **Bookmarks PRD**; this PRD describes only the data effect on tag listings. |

### UC-05 — Bulk add tags to selected bookmarks

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Apply the same tag (or tags) to many bookmarks at once. |
| Main Flow | 1. User enters bookmark selection mode and selects multiple bookmarks. 2. User picks **Add tags** from the bulk action toolbar. 3. User types or selects the tag(s) to add. 4. User confirms. 5. System adds the listed tags to each selected bookmark. |
| System Response | Selected bookmarks now carry the added tags; tag counts update; partial failures are reported per-bookmark. |
| Alternate Flow | If a selected bookmark already carries an added tag, the system MUST NOT create a duplicate occurrence on that bookmark — the bookmark's `tags` array remains valid (no duplicates). |

### UC-06 — Bulk remove tags from selected bookmarks

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Strip a specific tag (or tags) from many bookmarks at once without deleting the bookmarks. |
| Main Flow | 1. User enters bookmark selection mode and selects multiple bookmarks. 2. User picks **Remove tags** from the bulk action toolbar (web/desktop: **More…** → **Delete tags**). 3. User specifies the tag(s) to remove. 4. User confirms. 5. System strips the listed tags from each selected bookmark. |
| System Response | Selected bookmarks lose the listed tags; bookmarks themselves are unaffected; tag counts update; partial failures are reported per-bookmark. |
| Alternate Flow | If a selected bookmark does not carry a listed tag, the system leaves that bookmark unchanged (no-op for that bookmark). |

### UC-07 — Rename a tag across the entire library

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Standardize a tag's spelling or label across every bookmark that uses it. |
| Main Flow | 1. User right-clicks a tag in the sidebar (web/desktop) or swipes it (mobile). 2. User picks **Rename**. 3. User types the new name. 4. User confirms. 5. System rewrites the tag on every bookmark that carries it. |
| System Response | The old tag disappears from listings (count reaches zero); the new tag appears (or its count increases if it already existed). Bookmarks affected by the rename have their `lastUpdate` advanced. |
| Alternate Flow | If the new name collides with an existing tag on a given bookmark, the system MUST deduplicate so the bookmark ends up with one occurrence of the target tag, not two. |

### UC-08 — Rename a tag inside one collection only

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Change a tag's name only for bookmarks living in a specific collection. |
| Main Flow | 1. User invokes the rename action with a target collection scope. 2. System rewrites the tag only on bookmarks whose `collection.$id` matches the supplied collection. |
| System Response | Bookmarks inside the scope are updated; bookmarks outside it retain the old tag. Both old and new tag strings continue to exist in user-wide listings until the old tag's library-wide count reaches zero. |
| Alternate Flow | If the user does not specify a collection, the rename applies library-wide (UC-04). |

### UC-09 — Merge multiple tags into one

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Unify several near-duplicate tags (e.g. `react`, `reactjs`, `React`) under one canonical name. |
| Main Flow | 1. User picks the merge action and supplies the list of source tags and the target name. 2. System rewrites every bookmark that had any source tag so it carries the target tag instead. |
| System Response | All source tags disappear from listings; the target tag's count includes the unioned membership (deduplicated per bookmark). |
| Alternate Flow | Merge MAY be scoped to one collection (F08). Merge with a target name equal to one of the sources is allowed; that source survives and absorbs the others. |

### UC-10 — Delete a tag everywhere it appears

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Remove a tag from the user's library entirely. |
| Main Flow | 1. User right-clicks the tag in the sidebar (or swipes it on mobile). 2. User picks **Delete**. 3. User confirms. 4. System removes the tag string from every bookmark's `tags` array. |
| System Response | The tag disappears from the sidebar list. Bookmarks that carried it remain; only the tag string is removed. |
| Alternate Flow | Delete MAY be scoped to one collection (F10); the tag is removed only from bookmarks in that collection. |

### UC-11 — Browse and find tagged bookmarks via the sidebar

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Find bookmarks labeled with a specific tag. |
| Main Flow | 1. User opens the sidebar tag list. 2. User clicks a tag. 3. System opens the tag-filtered bookmark view. |
| System Response | The bookmark list is filtered to bookmarks carrying that tag. The filter UX is owned by **Search & Filters PRD**. |
| Alternate Flow | On mobile, the user opens the filter sheet and selects the tag; data effect is identical. |

### UC-12 — Find untagged bookmarks

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | See bookmarks that have not been labeled at all. |
| Main Flow | 1. User opens the filter UI. 2. User picks **Without tags**. |
| System Response | The bookmark list is filtered to bookmarks where `tags` is empty. Filter mechanism is owned by **Search & Filters PRD**. |
| Alternate Flow | None. |

### UC-13 — Type-ahead tag entry with autocomplete

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Reuse existing tags consistently rather than typo a new variant. |
| Main Flow | 1. User focuses a Tags input field (save form, edit screen, bulk action). 2. User starts typing. 3. System surfaces matching existing tags as suggestions. 4. User selects a suggestion or types a comma to commit a new tag. |
| System Response | Selected/committed tags appear as chips in the input. |
| Alternate Flow | If the user types a token that exactly matches an existing tag, the system MUST treat it as that existing tag — not create a parallel tag with subtle whitespace or case differences. (Tag normalization rules are 🟠 Product Decision; see §12.) |

### UC-14 — Review tag usage and counts

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Understand how the user's library is currently labeled — which tags are heavily used, which are rarely used, which are candidates for cleanup. |
| Main Flow | 1. User opens the sidebar tag list (web/desktop) or the mobile tag list. 2. System shows each tag with its current count in the active scope (library-wide by default; per-collection when viewed from a collection). 3. User scans the list. |
| System Response | The list reflects the live tag aggregation. Counts SHOULD update in near-real-time as bookmarks change. |
| Alternate Flow | After a large rename, merge, or remove, the system MAY surface counts asynchronously; the UI SHOULD indicate when a refresh is in progress. The user MAY then act on the list (rename, merge, delete) via UC-07, UC-09, or UC-10. |

### UC-15 — Use AI-suggested tags during save or edit

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Quickly classify a bookmark without manually inventing tags. |
| Main Flow | 1. User opens a save or edit flow. 2. System surfaces AI-suggested tags based on page content. 3. User reviews suggestions and selects one or more to apply. 4. User confirms save. 5. System persists the bookmark with the accepted suggested tags merged into the `tags` array. |
| System Response | Accepted suggestions are stored as ordinary tag strings, indistinguishable from user-typed tags after persistence. Counts and listings update accordingly. |
| Alternate Flow | If no suggestions are available (model offline, no extractable content, low confidence), the user falls back to typing tags manually (UC-01 / UC-04). The system MUST NOT auto-apply suggestions without explicit user action — see §5.10. |

### UC-16 — Manage tags from mobile UI

| Item | Detail |
|---|---|
| Actor | iOS or Android user. |
| Goal | Rename, delete, filter, or reassign tags from the mobile interface. |
| Main Flow | 1. User opens the mobile tag list (at the bottom of the main screen) or filter sheet. 2. User performs the platform-specific gesture: swipe-left a tag (iOS / Android) to expose **Rename** and **Delete**, tap a tag to filter, or use selection mode + bulk action sheet to add or remove tags across many bookmarks. 3. User confirms the action. |
| System Response | Tag operation is applied with the same data semantics as web/desktop. Tag counts and bookmark `tags` arrays update; sync propagates to other devices. |
| Alternate Flow | If a desired tag operation is not directly exposed by the mobile gesture surface, the system SHOULD provide it through the bookmark edit, selection, or filter flows. Mobile data rules MUST be identical to web/desktop; only the gesture surface differs. |

---

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

Value-added behavior beyond Create, Edit, Delete, and Search.

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Tag list with counts** | ✅ Built | The system exposes a list of tags the user has applied, each with a usage count of bookmarks that carry it. The list is filtered to tags applied to bookmarks the user can access. |
| F02 | **Library-wide tag scope** | ✅ Built | The default scope for tag listings, autocomplete, and rename / merge / remove operations is library-wide — every bookmark the user can access, excluding Trash. |
| F03 | **Per-collection tag scope** | ✅ Built | Tag listings, rename, merge, and remove operations MAY be restricted to a single collection. Counts and rewrites in this mode reflect only bookmarks in that collection. |
| F04 | **Sidebar tag list** | ✅ Built | A dedicated section of the sidebar shows the user's tags as clickable items. |
| F05 | **Tag context menu (rename / delete)** | ✅ Built | Right-click (web/desktop) or swipe (mobile) on a sidebar tag exposes Rename and Delete actions that apply across every bookmark using the tag. |
| F06 | **Rename tag across library** | ✅ Built | Renaming a tag rewrites the tag string on every bookmark that uses it, in one operation. |
| F07 | **Rename tag scoped to one collection** | ✅ Built | Rename MAY be restricted to a single collection. Bookmarks outside that collection retain the original tag. |
| F08 | **Merge tags** | ✅ Built | Multiple source tags are unified into one target tag; every bookmark that had any of the source tags ends up with the target tag instead. |
| F09 | **Merge tags scoped to one collection** | ✅ Built | Merge MAY be restricted to a single collection. |
| F10 | **Remove tag across library** | ✅ Built | A tag is removed from every bookmark that uses it. |
| F11 | **Remove tag(s) scoped to one collection** | ✅ Built | Remove MAY be restricted to a single collection. |
| F12 | **Bulk remove of multiple tags** | ✅ Built | A single remove operation accepts a list of tags and removes all of them in one pass. |
| F13 | **Free-form tag strings** | ✅ Built | Tag strings MAY contain any characters, any language, including spaces. |
| F14 | **Multiple tags per bookmark** | ⚪ Capability Split | A bookmark MAY carry many tags. The bookmark's `tags` field is owned by **Bookmarks PRD §8**; this PRD only owns operations across many bookmarks at once. |
| F15 | **Add / remove tags on a bookmark** | ⚪ Capability Split | Adding or removing a tag on one bookmark is part of bookmark edit; see **Bookmarks PRD UC-08 (Manage one bookmark)**. |
| F16 | **Bulk add / remove tags across selected bookmarks** | ⚪ Capability Split | The bulk action toolbar in the bookmark list owns this; see **Bookmarks PRD UC-11 (Manage multiple bookmarks)** and §5.9 (Bulk Action Contract). |
| F17 | **Tag autocomplete in save / edit forms** | ✅ Built | When typing in a Tags input field, the system surfaces matching existing tags as suggestions. |
| F18 | **AI-suggested tags on save** | ⚪ Capability Split | Defined in **Bookmarks PRD F11 (AI suggest)**. The suggestion source is owned there; this PRD owns only the canonical tag list. |
| F19 | **Tag click acts as a filter** | ⚪ Capability Split | Clicking a tag opens the tag-filtered bookmark view. The filter mechanism belongs to **Search & Filters PRD**. |
| F20 | **"Without tags" filter** | ⚪ Capability Split | Defined in **Search & Filters PRD**. |
| F21 | **Tag normalization** | 🟠 Product Decision | Whether the system trims whitespace, lower-cases, or otherwise canonicalizes tag strings before matching is not pinned. The source allows free-form strings; whether `"AI"` and `"ai"` collapse is a product call. See §12. |
| F22 | **Comma-as-separator on input** | ✅ Built | In the Tags input field, typing a comma commits the current token as a tag and starts a new one. |
| F23 | **Per-tag color** | 🔴 Not Defined | Whether tags carry user-chosen colors (similar to collection color) is not defined. |
| F24 | **Tag groups / hierarchy** | 🔴 Not Defined | Whether tags can be nested (e.g. `linux/distro`) as a hierarchy is not defined. The source treats tags as a flat list. |
| F25 | **AI-assisted bulk tag cleanup** | 🔵 Planned | A natural-language interface for batch tag operations (e.g. "merge `react`, `reactjs`, and `react.js` into `react`"). The interface and orchestration belong to the AI capability; this PRD owns only the tag operations such an interface would invoke. |
| F26 | **Mobile tag management gestures** | ✅ Built | Mobile clients expose tag management through swipe (rename, delete), edit, filter, and selection flows. Data semantics MUST match web/desktop; only the gesture surface differs. |
| F27 | **Offline tag editing** | 🔴 Not Defined | Whether tag add, remove, rename, merge, and delete are queued offline and how they reconcile on reconnect is not defined. |
| F28 | **Shared-collection tag ownership** | 🟠 Product Decision | When a tag is applied or modified inside a shared collection, the rules for cross-user visibility and edit propagation are not pinned. See §5.9 and §12. Coordinate with **Sharing / Collaboration PRD**. |

---

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Tag identity

| Rule | Behavior |
|---|---|
| Identity is the string | A tag's identity is its string value. There is no separate numeric ID. The tag-listing entity exposes `_id` as the string itself. |
| String constraints | A tag string MAY contain any characters, any language, including spaces. The system MUST NOT silently strip spaces. |
| Comma reservation | A literal comma MUST be reserved as the separator in the Tags input field; commas inside a single tag MUST be entered through paste or programmatic input, not through the inline typing flow. |
| Case | Whether tag identity is case-sensitive is 🟠 Product Decision (see §12). |
| Trimming | Leading and trailing whitespace **SHOULD** be trimmed before persistence; internal whitespace MUST be preserved. |
| Empty | An empty string MUST NOT be a valid tag. |

### 5.2 Tag listings and counts

| Rule | Behavior |
|---|---|
| Library-wide listing | The system MUST expose every tag the user has applied to any accessible bookmark, with a usage count. |
| Per-collection listing | The listing MAY be scoped to one collection. Counts in this mode reflect only bookmarks in that collection. |
| Aggregated counts | Counts SHOULD be derived from the bookmark store; they MAY be cached for performance but MUST reconcile with bookmark state. |
| Zero count | A tag with `count = 0` MUST NOT appear in user-visible listings; it has effectively been deleted. |
| Update timing | Tag counts SHOULD update in near-real-time as bookmarks gain or lose tags. Brief eventual-consistency delays for very large operations are acceptable. |
| Trash exclusion | Tags applied only to bookmarks in Trash (`_id = -99`) MUST NOT appear in normal tag listings. Tag counts MUST exclude Trash bookmarks unless the user is explicitly viewing the Trash scope. |
| Sort order | The default sort order for the sidebar tag list is 🟠 Product Decision (alphabetical, by count, or user-defined). See §12. |

### 5.3 Adding and removing tags on a bookmark

| Rule | Behavior |
|---|---|
| Bookmark ownership | The `tags` field is part of the bookmark entity and is owned by **Bookmarks PRD §8**. |
| Bulk action contract | The bulk add-tags and remove-tags actions on a bookmark selection are owned by **Bookmarks PRD §5.9 (Bulk Action Contract)**; see also UC-03. |
| Empty array semantics | Setting a bookmark's `tags` to `[]` removes every tag from that bookmark. This is a Bookmarks-PRD invariant; it is referenced here only to make the data effect on tag counts explicit. |

### 5.4 Rename a tag

| Rule | Behavior |
|---|---|
| Operation | The rename operation accepts exactly **one** source tag string and a `replace` value (the new name). |
| Scope | Optional collection scoping limits the rename to bookmarks whose `collection.$id` matches; without a scope, the rewrite is library-wide. |
| Rewrite | Every targeted bookmark's `tags` array MUST have the source tag string replaced with the new name. |
| Deduplication | If a targeted bookmark already carries both the source tag and the new name, the resulting `tags` array MUST contain the new name **once**, not duplicated. |
| `lastUpdate` | Bookmarks whose tag arrays change MUST have `lastUpdate` advanced. Bookmarks unaffected by the rename MUST NOT have `lastUpdate` advanced. |
| Atomicity | The rewrite SHOULD be atomic per-bookmark. The cross-bookmark operation MAY proceed bookmark by bookmark; partial-progress states MUST eventually converge to a fully-renamed state on retry. |
| No-op rename | Rename to the same string MUST be a no-op. Rename to an empty string MUST be refused. |

### 5.5 Merge tags

| Rule | Behavior |
|---|---|
| Operation | The merge operation accepts a list of source tag strings and a `replace` value (the target name). |
| Source list | The list MAY contain two or more strings. A single-string list MUST be treated as a rename. |
| Target equality | The target MAY equal one of the sources; that source survives and absorbs the others. |
| Scope | Optional collection scoping is supported, identical to rename. |
| Rewrite | Every targeted bookmark's `tags` array MUST replace each occurrence of any source tag with the target name. |
| Deduplication | The resulting `tags` array MUST contain the target name **at most once** per bookmark. |
| `lastUpdate` | Bookmarks whose tag arrays change MUST have `lastUpdate` advanced. |
| Atomicity | Same as rename: per-bookmark rewrite is atomic; the cross-bookmark operation converges. |

### 5.6 Remove tag(s)

| Rule | Behavior |
|---|---|
| Operation | The remove operation accepts a list of tag strings. |
| Scope | Optional collection scoping limits removal to bookmarks in that collection. |
| Rewrite | Every targeted bookmark's `tags` array MUST have all listed tag strings stripped. Other tags are preserved. |
| Empty result | Removing the only tag(s) from a bookmark leaves its `tags` array empty (`[]`); the bookmark itself is unaffected. |
| `lastUpdate` | Bookmarks whose tag arrays change MUST have `lastUpdate` advanced. |
| Atomicity | Same atomicity contract as rename and merge. |

### 5.7 Tag autocomplete

| Rule | Behavior |
|---|---|
| Source | Autocomplete suggestions MUST be drawn from the user's existing tag list. |
| Match | Suggestions SHOULD match by case-insensitive substring of the typed token. |
| Ordering | Suggestions SHOULD be ordered by relevance (prefix match first, then substring), with usage count as a secondary sort. |
| New tags | Users MAY commit a token that does not match any existing tag. That token becomes a new tag the moment the bookmark is saved. |
| AI suggestions | AI-suggested tags MAY appear above or alongside existing-tag autocomplete. AI suggest logic is owned by **Bookmarks PRD F11 (AI suggest)**. |

### 5.8 Cross-capability data flow

| Rule | Behavior |
|---|---|
| Bookmark `tags` field | Source of truth for which tags exist. The tag listing is derived from this field across the user's bookmarks. |
| Tag operations rewrite bookmarks | Rename, merge, and remove are bookmark-level rewrites driven by tag-level intent. They MUST go through the same write path as bookmark edits, so search indexes and filter counts stay in sync. |
| Search indexes | The search indexer MUST update when bookmark tag arrays change. See **Search & Filters PRD**. |
| Filter counts | The dynamic-filter count for a tag MUST reflect the live `count`. |

### 5.9 Sharing and per-user tag visibility

| Rule | Behavior |
|---|---|
| Tag listing scope | Each user's tag listing reflects only the tags applied to bookmarks the user can access. |
| Shared collections | When a tag is applied to a bookmark inside a shared collection, the tag appears in every collaborator's listing for that collection scope. |
| Cross-user rename / merge / delete | Whether a non-owner collaborator's rename / merge / delete inside a shared collection affects the owner's library-wide tag (or only their view) is 🟠 Product Decision. See §12. |
| Public pages | Tags shown on a public page MUST be drawn from the published bookmarks' `tags` arrays. Tag operations MUST NOT silently mutate published content; collection owners are accountable for tag changes that propagate to public pages. |

### 5.10 AI suggested tags — integration contract

This subsection defines what this PRD accepts from the AI suggestion path. The suggestion logic itself (how candidates are generated from page content, how the model is selected, how suggestions are ranked) is owned by **Bookmarks PRD F11 (AI suggest)**.

| Rule | Behavior |
|---|---|
| Suggestion source | AI-suggested tags MAY appear in save and edit forms alongside existing-tag autocomplete. The source of suggestions is a separate capability; this PRD treats them as opaque tag-string candidates. |
| User control | Suggested tags **MUST NOT** be auto-applied. The user MUST explicitly accept each suggestion before it is added to the bookmark's `tags` array. |
| Existing-tag preference | When an AI suggestion exactly matches an existing tag in the user's library, the system MUST treat it as that existing tag — not create a parallel tag with subtle whitespace or case differences. |
| Manual override | Users MAY type tags freely regardless of suggestions. Suggestions never block manual entry. |
| Persistence parity | Once accepted, a suggested tag is indistinguishable from a user-typed tag; it has no provenance flag and follows all rename / merge / remove rules in this PRD. |

### 5.11 Import and export behavior

Tag round-tripping through import and export is governed by **Import / Export / Backup PRD**. This subsection defines only the tag-side contract that import and export must honor.

| Rule | Behavior |
|---|---|
| Export inclusion | Bookmark exports MUST include each bookmark's `tags` array verbatim when the export format supports tags. |
| Tag list aggregation | The aggregated tag list (with counts) is **derived** from bookmark exports; it is not separately serialized. Import re-derives it from the imported bookmarks' `tags` arrays. |
| Import preservation | Imported tag strings MUST be preserved as-is, subject only to the configured normalization policy (§5.1, see also §12). |
| External folder → tag conversion | Whether external folder structures from imported bookmark files become tags or collections is a 🟠 Product Decision; see Import / Export / Backup PRD. |
| Round-trip fidelity | Export → import of an unmodified file MUST produce the same tag set on each bookmark, with no character drift, case folding, or whitespace changes beyond the configured normalization. |
| Conflicts on import | If an imported tag string conflicts (after normalization) with an existing tag, the system MUST follow the same rules as a user typing the existing tag — collapse to one tag, deduplicate per bookmark. |

### 5.12 Platform-Specific Interaction Patterns

| Platform | Behavior |
|---|---|
| Web / Desktop | Tags entered in the Tags field on save and edit forms; bulk Add tags / Remove tags actions in the bookmark bulk-action toolbar; right-click on sidebar tag exposes Rename and Delete; tag click filters the bookmark list. |
| Browser Extension | Tags entered in the Tags field of the save popup with autocomplete and AI-suggested tags inline. |
| iOS | Tags entered on the bookmark edit screen (long-press → Edit); bulk Add tags / Remove tags via Select mode + Actions sheet; swipe-left a tag in the mobile tag list to expose Rename and Delete; filter by tag through the filter sheet. |
| Android | Tags entered on the bookmark edit screen (tap edit icon); bulk Add tags / Remove tags via long-press selection mode + ⋮ overflow; swipe-left a tag in the mobile tag list to expose Rename and Delete; filter by tag through the search field suggestions. |
| Mobile shared behavior | Long-press or swipe MAY expose tag management controls; exact gestures are platform-conventional and MUST NOT change the underlying data rules. |
| Cross-platform invariant | Data rules (deduplication, scope, normalization, server-side enforcement, `lastUpdate` advancement) MUST be identical across platforms. Only the gesture surface differs. |
| Shared-collection visibility | Tag UI on every platform MUST reflect the requesting user's `access.level`. Edit affordances (rename, delete, add, remove) MUST NOT be exposed to viewers (level 2) unless sharing rules grant write access. |

---

### System Constants

### 6.1 Internal Tag Service Capabilities

| System Capability | Requirement |
|---|---|
| Retrieve tag list | The system MUST return all tags the user has applied to any accessible bookmark, each with a usage count. The retrieval MAY be scoped to a single collection. |
| Rename tag | The system MUST rewrite a single source tag to a new name across every bookmark in scope. |
| Merge tags | The system MUST rewrite a list of source tags to one target name across every bookmark in scope, with deduplication. |
| Remove tag(s) | The system MUST strip a list of tags from every bookmark in scope. |
| Autocomplete | The system SHOULD support substring lookup against the user's tag list for type-ahead UIs. |
| Filter scope | The system MUST honor optional collection scoping on rename, merge, and remove operations. |

### 6.2 System Response Conventions

| Item | Product Requirement |
|---|---|
| Successful operation | The system SHOULD return a success state. The affected tag-list view (with updated counts) SHOULD be retrievable on the next read. |
| Failed operation | The system SHOULD return a structured error with a machine-readable code and a human-readable message. |
| Long-running operations | Library-wide rename, merge, and remove on very large libraries MAY run asynchronously. The UI SHOULD reflect progress and final state. |

### 6.3 Error and Condition Handling

| Condition | System Meaning | Retry Rule |
|---|---|---|
| Validation error | Tag string is empty, exceeds maximum length, or violates normalization rules. | Do not retry without changing input. |
| Source tag not found | The source tag has zero current usages. | Treat as no-op success or return a "no tag matched" warning, per product policy. |
| Target tag invalid | The `replace` value is empty or otherwise invalid. | Reject and ask for a valid value. |
| Permission denied | A user attempts to rename, merge, or delete tags inside a collection where they lack write access. | Do not retry unless permissions change. |
| Rate limited | User exceeded allowed operation rate. | Retry after backoff. |
| Temporary server failure | Service failed unexpectedly mid-operation. | Safe operations SHOULD retry with backoff; the system MUST converge to a fully-applied state. |

### 6.4 Tag Scope Rules

The following named scopes are conceptual references for product and engineering. The scope is communicated to the system via an optional `collectionId` (and a future `nested` flag, where applicable). It is **not** a typed enum on tag inputs — see §8.

| Scope | Meaning | Product Rule |
|---|---|---|
| **Library-wide** | All accessible bookmarks outside Trash. | Default when `collectionId` is omitted or `0`. |
| **Per-collection** | Bookmarks in one selected collection. | Used when `collectionId` references a user collection. |
| **Per-collection with descendants** | Selected collection plus its child collections. | 🔴 Not Defined. Whether collection-scoped operations include descendants is a product decision; see §12 and **Collections PRD**. |
| **Shared collection** | Bookmarks visible through a sharing relationship. | Tag visibility and edit rights MUST follow the requesting user's `access.level`; see §5.9 and **Sharing PRD**. |
| **Trash** | Bookmarks in Trash (`_id = -99`). | Excluded from all normal tag listings and counts. Surfaced only in an explicit Trash view. |

### 6.5 Reserved Behavior

| Item | Behavior |
|---|---|
| Comma | A literal comma is reserved as a separator in the Tags input field. |
| Empty string | Empty string MUST NOT be a valid persisted tag. |
| Whitespace-only string | A string consisting only of whitespace MUST NOT be a valid persisted tag. |

### 6.6 Tag List Entity

The tag-list response represents tags as a flat array of `{ _id, count }` records, where `_id` is the tag string itself.

```ts
type TagListItem = {
  _id: string;    // the tag string is the identity
  count: number;  // bookmarks carrying this tag in the requested scope
};
```

### 6.7 Internal Action Types

```ts
type TagAction =
  | "rename_tag"
  | "rename_tag_in_collection"
  | "merge_tags"
  | "merge_tags_in_collection"
  | "remove_tag"
  | "remove_tag_in_collection"
  | "remove_tags_bulk";
```

### 6.8 Bulk Limits

| Limit | Value | Notes |
|---|---|---|
| Tags per bookmark | No fixed cap; SHOULD warn at high counts | Implementation guidance, not a hard rule. |
| Tags removed per remove operation | No fixed cap; SHOULD chunk for very large requests | Implementation guidance. |
| Rename source array | Exactly **1** source tag | Multi-source uses merge. |
| Merge source array | At least **2** source tags | Single-source uses rename. |

---

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| User adds a tag with leading/trailing whitespace | System trims and persists the tag without the surrounding whitespace. |
| User adds a tag containing only whitespace | System rejects the input and surfaces a validation error. |
| User adds a tag containing a comma via the input field | The comma commits the current token; everything after the comma starts a new tag. |
| User adds a tag containing a comma via paste or programmatic input | The comma is preserved as part of the tag string. |
| User adds the same tag twice on one bookmark | System deduplicates so the bookmark carries the tag once. |
| User renames `react` → `React` and case-insensitive normalization is on | `react` and `React` collapse into one tag; counts merge accordingly. |
| User renames `react` → `React` and normalization is off | `react` and `React` remain distinct. (Whether normalization is on is 🟠 Product Decision.) |
| User renames a tag that doesn't exist | System returns success with no change, or surfaces a "no tag matched" warning per product policy. |
| User renames a tag to its current name | No-op success; nothing is modified. |
| User renames a tag to an empty string | System refuses with a validation error. |
| User merges `[a, b, c]` → `c` | `a` and `b` are rewritten to `c`. Bookmarks that had any combination of `a`, `b`, `c` end up with one `c`. |
| User merges with a single-element source list | System treats the operation as a rename. |
| User merges in a scope where no bookmark carries any source tag | System returns success with no change. |
| User deletes a tag that exists on 1,000 bookmarks | System rewrites every affected bookmark; the tag disappears from listings; `lastUpdate` advances on each affected bookmark. |
| User deletes a tag scoped to one collection | Tag is removed only from bookmarks in that collection; bookmarks elsewhere retain the tag. The tag persists in the library-wide listing if any bookmark elsewhere still uses it. |
| User deletes a tag, but a sync-conflict arrives mid-operation that re-applies the tag to a bookmark | The system MUST converge: either the late-arriving change wins (tag remains on the affected bookmark) or the delete wins, per the conflict-resolution policy. The final state MUST be consistent. |
| User attempts rename inside a shared collection without write access | System refuses with a permission error. |
| User attempts merge with the target equal to one of the sources | Operation succeeds; the target survives and absorbs the others. |
| User searches autocomplete for `re` | Suggestions include all tags whose substring contains `re`, ordered by prefix-match-first then count. |
| User commits an autocomplete token that exactly matches an existing tag | System uses the existing tag, not a near-duplicate. |
| User adds 50 tags to one bookmark | System persists all 50; the UI MAY warn that the count is unusually high but MUST NOT silently drop tags. |
| Bulk add-tags is invoked on a selection where some bookmarks already have the tag | The tag is added only where missing; bookmarks that already had it are unchanged. |
| Bulk remove-tags is invoked with a tag that's missing from some bookmarks | The operation succeeds; bookmarks without the tag are unchanged. |
| User exports the library | Each bookmark's `tags` array is preserved verbatim. The tag-listing aggregation is derived on import; it is not separately exported. |
| User imports a bookmark file with new tag strings | The new tags begin appearing in listings the moment the imported bookmarks are persisted. |
| User saves a bookmark with no tags | Bookmark is persisted with `tags: []` and is eligible for the **Without tags** filter. |
| User enters a multilingual tag (e.g. `日本語`, `العربية`, `español`) | Tag is preserved as a single tag value. Search and autocomplete MUST handle the Unicode value identically to ASCII tags. |
| User removes the last tag(s) from a bookmark via bulk remove | Bookmark's `tags` array becomes `[]`; the bookmark itself is preserved; it now appears in the Without tags filter. |
| Tag count reaches zero after a delete or rename | Tag MUST disappear from user-visible listings on next read. Cached counts MUST reconcile. |
| Bookmark moves to Trash carrying tags | Those tags' counts MUST decrease in normal listings; if a tag exists only on Trash bookmarks, it MUST NOT appear in normal listings. Restoring the bookmark restores its tags into the count. |
| Viewer (level 2) opens a shared collection | Viewer MUST see tag chips and counts for visible bookmarks but MUST NOT see edit affordances (Add tags, Remove tags, Rename, Delete). Server MUST refuse any tag-mutation request from a viewer. |
| Collection-scoped tag operation targets an inaccessible or deleted collection | System MUST refuse with a "collection not found / not accessible" error and make no changes. |
| Bulk tag operation partially fails (some bookmarks update, some error) | Successful per-bookmark changes MUST remain applied; failed bookmarks MUST be reported per-bookmark with retry guidance. The user MUST NOT have to start over. |
| AI-suggested tags are unavailable (model offline, no extractable content, low confidence) | Save and edit forms MUST gracefully degrade to existing-tag autocomplete only. Manual tag entry MUST remain fully functional. |
| Library-wide tag merge is running on a very large library | The operation MAY run asynchronously. The UI SHOULD indicate progress and final state. The aggregated tag list MAY surface stale counts during the operation; counts MUST converge once the operation completes. |

---

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| `_id` (in tag list) | string | System | The tag string is the identity. Non-empty. | Returned by tag-list operations. |
| `count` (in tag list) | number | System | Non-negative integer. | Reflects the user's accessible bookmarks in the requested scope. |

The bookmark-side `tags` field (`string[]`) is owned by **Bookmarks PRD §8.1**. This PRD does not redefine it.

## 12. Database / Schema Notes

### Enums

```ts
// No enums. Tag strings are free-form per F12.
// Tag actions are listed in §6.6 as an internal-action enum.
```

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
| **Sidebar Tag List** | Shows the user's tags with counts; click a tag to filter the bookmark list. Right-click (web/desktop) opens the tag context menu. |
| **Mobile Tag List (bottom of main screen)** | Shows the user's tags on iOS and Android; swipe a tag to expose Rename and Delete. |
| **Tag Context Menu** | Rename, Delete actions for a single tag from the sidebar/list. |
| **Rename Tag Dialog** | Single input for the new tag name, with the source tag shown. |
| **Bulk Tag Action Sheet** | Add Tags / Remove Tags surfaces invoked from the bookmark bulk action bar; defined alongside the bookmark bulk action UX in **Bookmarks PRD**. |
| **Filter Sheet (Tags section)** | The mobile filter UI's tag picker. Owned by **Search & Filters PRD**; this PRD provides the data. |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| **Tag Chip** | Compact rendering of a tag in lists, bookmark cards, autocomplete results, and edit forms. |
| **Tag Input Field** | Multi-tag input with comma-as-separator, autocomplete, and chip rendering for committed tags. |
| **Autocomplete Dropdown** | Suggestion list under the Tag Input Field; shows existing tags and (where available) AI-suggested tags. |
| **Tag List Row** | Sidebar row showing tag string, count, and (on hover/long-press) action affordances. |
| **Tag Context Menu** | Rename and Delete actions for a single tag. |
| **Without Tags Filter** | Owned by **Search & Filters PRD**; mentioned here for discoverability. |
| **Tag Action Confirmation Dialog** | Confirmation surface for destructive actions (rename, delete) that affect many bookmarks. |

---

## 15. Workflow Requirements

Create, Edit, Delete, and Search are required core application operations for this capability. Tags are unusual in that they are created and removed implicitly through bookmark edits. The shared core application framework handles the underlying primitives; this capability adds tag-level operations that span many bookmarks at once.

| Operation | Required Behavior | Shared / Core Handling |
|---|---|---|
| **Create** | A tag comes into existence the first time it appears on any bookmark; there is no separate "create tag" action. The tag's identity is its string value. | Implicit through bookmark create/edit. |
| **Edit** | A tag's string value is changed across every bookmark that uses it via the tag-rename operation; or multiple tags are unified via the tag-merge operation. | Owned by this capability. |
| **Delete** | A tag is removed from every bookmark that uses it via the tag-remove operation. The tag disappears from listings when its `count` reaches zero. | Owned by this capability. |
| **Search** | Tag listings are searchable by substring; tag-scoped bookmark search is owned by **Search & Filters PRD**. | Shared search input behavior; this capability provides the tag-list data. |

---

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|
| **Tag Aggregation Module** | Compute and cache per-user tag list with counts. |
| **Tag Rewrite Module** | Apply rename, merge, and remove operations across bookmarks; ensure per-bookmark deduplication and `lastUpdate` advancement. |
| **Tag Normalization Module** | Apply trim and optional case-fold rules consistently across persistence and matching. |
| **Tag Autocomplete Module** | Substring lookup against the user's tag list; order by prefix match and count. |
| **Sharing Access Guard** | Enforce access-level checks for tag operations inside shared collections. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| **Save Form Tag Input** | Tag input field in the save popup with autocomplete and AI-suggest integration. |
| **Extension Tag Autocomplete** | Lightweight client of the autocomplete service for use in the compact extension UI. |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| **Sidebar Tag UI** | Render the sidebar tag list with counts, search/scroll, and right-click context menu. |
| **Tag Context Menu UI** | Rename, Delete actions on a single tag. |
| **Tag Action Confirmation UI** | Confirmation surfaces for rename and delete that affect many bookmarks. |
| **Bulk Tag Action UI** | Add tags / Remove tags actions invoked from the bookmark bulk action bar. (Coordinated with **Bookmarks PRD**.) |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| **Mobile Tag List UI** | Render the tag list at the bottom of the main screen on iOS and Android, with swipe-to-rename / swipe-to-delete gestures. |
| **Mobile Tag Edit UI** | Tag input field on edit screens with autocomplete and AI-suggest integration. |
| **Mobile Bulk Tag UI** | Add tags / Remove tags actions in the mobile bulk-selection toolbar. |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| **Search Index Module** | Index bookmark `tags` arrays and update the index when tag operations rewrite bookmarks. |
| **Filter Count Module** | Maintain dynamic-filter counts per tag; reconcile with the tag aggregation. |
| **Observability Module** | Audit and metrics for tag operations, including partial failures and rate-limit hits. |

---

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| **Tag aggregation service** | Computes the per-user tag list with counts from the bookmark store, scoped library-wide or per-collection. |
| **Tag parser** | Splits comma-separated input from the Tags field into individual tag tokens while preserving spaces and other characters within each tag. Distinct from normalization, which runs after parsing. |
| **Tag rename worker** | Rewrites the tag string on every bookmark in scope, with per-bookmark deduplication and `lastUpdate` advancement. |
| **Tag merge worker** | Rewrites a set of source tags to one target across every bookmark in scope, with deduplication. |
| **Tag remove worker** | Strips listed tag strings from every bookmark in scope. |
| **Tag autocomplete service** | Provides type-ahead suggestions from the user's existing tag list, ordered by prefix match and usage count. |
| **Tag index** | Inverted index mapping tag strings to bookmark IDs that carry them, used by tag autocomplete, the sidebar tag list, tag-scoped filters, and bookmark search. |
| **Normalization layer** | Applies the configured normalization policy (trim, optional case-fold) before persisting and matching tag strings. |
| **Collection scope resolver** | Resolves an optional `collectionId` parameter into the set of bookmarks the operation MUST affect; honors access rules and excludes Trash from default scope. Shared with other capabilities that accept collection scoping. |
| **Search index integration** | Ensures that bookmark `tags` array changes propagate into the search index in near-real-time. |
| **Filter count integration** | Ensures dynamic-filter counts (per-tag) reflect the live tag aggregation. |
| **Import/export tag mapper** | Preserves bookmark `tags` arrays through import and export round-trips; applies normalization on import without altering source identity beyond the configured policy. |
| **Sharing access guard** | Enforces that tag operations inside shared collections respect the requesting user's access level. |
| **Bulk operation processor** | Handles long-running rename, merge, and remove across very large libraries with chunking, progress reporting, and convergence on retry. |
| **Conflict-resolution module** | Reconciles concurrent tag changes (e.g. delete-vs-add races) into a consistent final state. |
| **Observability module** | Logs tag operations for audit and debugging; surfaces partial-failure details. |

---

## 19. OSS / Build-vs-Buy Decision

1. **Tags have no separate IDs.** The tag string is the identity. Do not introduce numeric tag IDs unless you are explicitly designing a parallel canonical-tag table — and if you do, treat it as a different feature with its own PRD revision.
2. **Tag operations rewrite bookmarks.** Rename, merge, and delete are not "tag-table" operations; they are mass-edit operations on the `tags` arrays of every affected bookmark. Implement them through the same write path as bookmark edits so the search index, filter counts, and `lastUpdate` advancement all stay consistent.
3. **Lock the normalization policy early.** Whether `"AI"` and `"ai"` collapse is a one-time decision that affects every part of the system (autocomplete, dedup, rename matching, search indexing). Decide before the first user touches the product, and document the choice in §12.
4. **Comma is reserved as the input separator.** Treat the input field's typed comma as a token boundary, but preserve commas inside tag strings that arrive through paste, import, or programmatic save flows.
5. **Deduplicate on every bookmark write.** Rename and merge can produce duplicate entries in a bookmark's `tags` array; the final stored array MUST be deduplicated server-side. Do not rely on the UI to prevent duplicates.
6. **Optional collection scoping is a real product feature, not just a query parameter.** Users will expect that "rename in this collection only" leaves their other bookmarks untouched. Test this carefully; the easy implementation bug is to apply the rewrite library-wide because the scope filter was missed.
7. **`lastUpdate` advancement is the contract that downstream search and filters rely on.** A tag operation that rewrites a bookmark's `tags` array MUST advance the bookmark's `lastUpdate` so search indexers and clients re-fetch. A tag operation that doesn't change a particular bookmark MUST NOT touch `lastUpdate` for that bookmark.
8. **Merge with target equal to a source is a feature, not a bug.** The user wants `[react, reactjs] → react`; the source `react` should absorb `reactjs` and survive. Test this case explicitly.
9. **Tag aggregation is derived, not authoritative.** The user's tag list is computed from the bookmark store. Cache it for performance, but treat the bookmark store as the source of truth and reconcile on every relevant write.
10. **Be careful about the boundary with Search & Filters.** This PRD owns tag operations; **Search & Filters PRD** owns tag filtering, the "Without tags" filter, and tag-scoped bookmark search. When a tag is clicked in the sidebar, the action surface belongs here; the resulting filter view belongs there.
11. **Rate-limit destructive tag operations.** A user-triggered library-wide delete can rewrite millions of bookmarks. Apply rate limits, show progress, and make the operation idempotent so retries converge instead of duplicating effects.
12. **Test convergence under concurrent edits.** A user renaming `react` → `React` while a collaborator simultaneously adds `react` to a new bookmark is a real race. Decide which wins, document it (§12), and test the loser's behavior explicitly.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| **Bookmarks** | Tags are stored on bookmark records; tag operations operate over the bookmark store. |
| **Collections** | Tag operations MAY be scoped to one collection. Tag counts MAY be presented per-collection. |
| **User / Account** | Tag listings are per-user. The same string can be a different tag for different users until an explicit cross-user model is defined. |
| **Search** | The bookmark search index drives tag autocomplete and tag-filter listings. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| **Bookmarks** | Bookmarks expose a `tags` array; rename/merge/delete operations on tags rewrite that array across bookmarks. |
| **Search & Filters** | Tag filters and tag autocomplete read the canonical tag list and counts from this capability. |
| **Highlights** | Highlight searches and listings MAY surface tags carried by the parent bookmark. |
| **Browser Extension / Mobile Capture** | Save flows expose a Tags input field with autocomplete; the autocomplete source is this capability. |
| **Import / Export / Backup** | Imports MAY introduce new tag strings; exports MUST preserve bookmark tag arrays verbatim. |
| **Public Page / Embed** | Public pages MAY surface tag chips; the canonical tag list lives here. |

### Related Capabilities

| Capability | Relationship |
|---|---|
| **Bookmarks** | The `tags` field on a bookmark is owned by Bookmarks PRD; this PRD owns tag-level operations (rename, merge, delete) that rewrite many bookmarks at once. |
| **Search & Filters** | The "Without tags" filter, tag filter chips, and tag-scoped searches live in **Search & Filters PRD**. |
| **Sharing / Collaboration** | When tags appear on bookmarks in shared collections, cross-user tag visibility is governed by Sharing PRD. |
| **AI Suggest** | AI-suggested tags on save belong to **Bookmarks PRD F11 (AI suggest)** — the suggestion logic and the surface that presents it. This PRD owns only the tag identity and management. |

---

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
| Tag normalization rules (case sensitivity, Unicode normalization, internal whitespace handling) | 🟠 Product Decision | Pin whether `"AI"` and `"ai"` collapse, whether `"machine learning"` and `"machine  learning"` collapse, etc. |
| Maximum tag length | 🔴 Not Defined | Source allows free-form strings without a stated cap; pin a sensible limit. |
| Maximum tags per bookmark | 🟠 Product Decision | No hard cap in source; decide whether to enforce one or only warn. |
| Default sort order for the sidebar tag list | 🟠 Product Decision | Alphabetical, by count descending, or user-configurable. |
| Cross-user tag visibility in shared collections | 🟠 Product Decision | When user A applies a tag in a shared collection, does it appear in user B's library-wide tag listing? Or only inside the shared collection scope? |
| Cross-user rename / merge / delete in shared collections | 🟠 Product Decision | When a member (level 3) renames a tag inside a shared collection, does the change propagate library-wide for the owner, or only inside the shared scope? |
| Per-tag color | 🔴 Not Defined | Whether tags carry user-chosen colors (similar to collection color). |
| Tag groups / hierarchy (e.g. `linux/distro`) | 🔴 Not Defined | Source treats tags as flat; many users want hierarchical tags. Defer or design. |
| AI-suggested tag attribution | ⚪ Capability Split | Suggestion source and presentation belong to **Bookmarks PRD F11 (AI suggest)**. |
| Tag rename source-not-found behavior | 🟠 Product Decision | Silent success vs explicit "no tag matched" warning. |
| Public-page tag visibility | 🟠 Product Decision | Whether tags are exposed on public pages and whether viewers can click them as filters. Coordinate with **Public Page / Embed PRD**. |
| Conflict resolution for concurrent tag changes | 🟠 Product Decision | When user A is mid-rename and user B (collaborator) adds the source tag to a bookmark, does the late add win or the rename? |
| Soft-delete window for tag delete | 🔴 Not Defined | Whether tag delete is reversible within a window (similar to bookmark Trash). |
| Tag count inclusion of Trash | ✅ Decided | Normal tag counts MUST exclude Trash bookmarks. Trash-scope counts are surfaced only when the user is explicitly viewing Trash. |
| Viewer (level 2) tag editing in shared collections | ✅ Decided | Viewers MUST NOT edit tags. Read access only. (Mirrors Collections PRD §6.7 access-level matrix.) |
| AI-suggested tag auto-apply | ✅ Decided | Suggested tags MUST NOT be auto-applied. Each suggestion requires explicit user acceptance. |
| Confirmation threshold for destructive tag operations | 🟠 Product Decision | Above what number of affected bookmarks should the system require confirmation before a rename, merge, or delete? |
| Reversibility of rename and merge | 🔵 Planned | Whether rename and merge can be undone within a window via an audit / recent-activity surface. |
| External folder → tag conversion on import | 🟠 Product Decision | Whether imported folder structures from external bookmark files become tags or collections. Coordinate with **Import / Export / Backup PRD**. |

---

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
