# 05 — Highlights PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Highlights |
| **Capability ID** | highlights |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-05-02 |
| **Revision summary** | Full specification with features, functionality, scenarios, and enablers |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST allow users to save passages of text from any saved page, PDF, or EPUB — color-coded and optionally annotated — and to revisit, edit, search, share, and export those highlights across every device.

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

### UC-01 — Save a highlight from a web page using the browser extension

| Item | Detail |
|---|---|
| Actor | Browser extension user. |
| Goal | Capture a sentence or paragraph from a public web page for later reference. |
| Main Flow | 1. User selects text on a third-party page. 2. User invokes the save action — right-click → **Save highlight**, or the keyboard shortcut. 3. On first use the browser MAY prompt for the page-data permission. 4. System persists the highlight against the bookmark for that URL. |
| System Response | The highlight is saved instantly. If the page is not yet a bookmark, the system creates the bookmark and attaches the highlight in the same operation. The highlight syncs to every signed-in device. |
| Alternate Flow | If the user denies the page-data permission, the highlight MAY still be saved, but auto-display on revisit will not work until the permission is granted. |

### UC-02 — Save a highlight inside the application reader

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Highlight a passage inside the application's Preview / reader surface for an already-saved bookmark. |
| Main Flow | 1. User opens a bookmark and switches to Preview / reader. 2. User selects text. 3. A toolbar appears with the color palette and an optional note field. 4. User picks a color (and optionally writes a note). 5. System persists the highlight. |
| System Response | The highlight is rendered inline in the reader, the bookmark's highlights list is updated, and the bookmark's "has highlights" state becomes true. |
| Alternate Flow | If the user does not pick a color, the system MUST apply the default color (`yellow`). |

### UC-03 — Save a highlight inside an uploaded PDF or EPUB

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Capture a passage from a PDF or EPUB the user has uploaded. |
| Main Flow | 1. User opens an uploaded PDF or EPUB inside the application's viewer. 2. User selects text. 3. User picks a color from the toolbar. 4. System persists the highlight against the file's bookmark record. |
| System Response | The highlight is anchored to its position in the file. On revisit, the highlight is restored at the same position. |
| Alternate Flow | If the file format is not supported by the in-app viewer (e.g. a host-browser PDF viewer), the user MUST be told to open the file inside the application instead. |

### UC-04 — Save a highlight from iOS in-app reader

| Item | Detail |
|---|---|
| Actor | iOS user. |
| Goal | Highlight text on mobile while reading a saved bookmark. |
| Main Flow | 1. User taps a bookmark to open its content. 2. User selects text using the system text-selection gesture. 3. User taps the color button. 4. System persists the highlight. |
| System Response | The highlight is stored and synced. |
| Alternate Flow | The same flow applies on Android. |

### UC-05 — Save a highlight from Safari on iOS using the Safari extension

| Item | Detail |
|---|---|
| Actor | iOS user with the Safari extension installed and enabled. |
| Goal | Highlight text on a third-party site without leaving Safari. |
| Main Flow | 1. User selects text in Safari. 2. User taps the color button surfaced by the Safari extension. 3. System persists the highlight against the bookmark for that URL. |
| System Response | If no bookmark exists for that URL, the system creates one and attaches the highlight. |
| Alternate Flow | If the Safari extension is not enabled, the user MUST enable it under iOS Settings → Safari → Extensions before this flow becomes available. |

### UC-06 — Add an annotation (note) to a highlight

| Item | Detail |
|---|---|
| Actor | Paid-plan user. |
| Goal | Capture personal commentary alongside a saved passage. |
| Main Flow | 1. User taps or clicks an existing highlight. 2. User selects the note action from the action toolbar. 3. User writes the note. 4. System persists `note` on the highlight. |
| System Response | The note is stored and synced. |
| Alternate Flow | If the user is on the free tier, the note action MUST surface a paywall message. Existing notes on highlights MUST remain visible to free-tier users; only adding and editing is gated. |

### UC-07 — Change a highlight's color

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Recolor a highlight to reorganize after the fact. |
| Main Flow | 1. User taps or clicks an existing highlight. 2. User picks a different color from the action toolbar. 3. System persists the new `color`. |
| System Response | The highlight re-renders in the new color across every device on next sync. |
| Alternate Flow | None. |

### UC-08 — Delete a highlight

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Remove a highlight that was created by mistake or is no longer relevant. |
| Main Flow | 1. User taps or clicks an existing highlight. 2. User selects delete from the action toolbar. 3. System removes the highlight. |
| System Response | The highlight is removed from the parent bookmark's highlights array, removed from the page on next visit, and removed from every device on next sync. |
| Alternate Flow | Whether deletion is reversible (undo within a window) is 🔴 Not Defined. See §12. |

### UC-09 — Revisit a highlighted page with the browser extension

| Item | Detail |
|---|---|
| Actor | Browser extension user with page-data permission granted. |
| Goal | See previously saved highlights when returning to the original web page. |
| Main Flow | 1. User navigates to a previously highlighted URL. 2. The extension detects the URL matches a saved bookmark. 3. The extension renders the saved highlights in the page. |
| System Response | Highlights appear at their original positions with their original colors. The user MAY click a highlight to surface the action toolbar. |
| Alternate Flow | If the page content has changed and a highlight cannot be re-anchored, the system SHOULD still expose the highlight in the per-bookmark list, even if it cannot be rendered inline. |

### UC-10 — Browse all highlights across the library

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Scan every highlight the user has ever saved, independent of the parent bookmark. |
| Main Flow | 1. User opens the global highlights list. 2. System returns highlights in reverse-chronological order, paginated. 3. User MAY scroll, filter, or click a highlight to navigate to its bookmark. |
| System Response | Each row shows the highlight `text`, `color`, optional `note`, parent bookmark title, and source link. |
| Alternate Flow | The user MAY scope the list to a single collection (per UC-11). |

### UC-11 — Browse highlights inside one collection

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Review highlights captured from bookmarks inside a particular collection. |
| Main Flow | 1. User opens the highlights list scoped to a collection. 2. System returns highlights only from bookmarks in that collection, paginated. |
| System Response | Same row content as UC-10. |
| Alternate Flow | If the user lacks read access to the collection (shared scope), the list MUST be empty rather than partial. |

### UC-12 — Jump from a highlight in the per-bookmark list to its position in Preview

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Locate a saved highlight in the original reader context. |
| Main Flow | 1. User opens a bookmark's highlights list (in Preview). 2. User clicks a highlight row. 3. System scrolls the reader to the highlight's position and visually focuses it. |
| System Response | The reader scrolls and the highlight is briefly emphasized. |
| Alternate Flow | If re-anchoring fails, the row remains clickable but a fallback message MUST explain that the position cannot be located. |

### UC-13 — Tag a highlight

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Apply tags directly to a highlight, distinct from its parent bookmark's tags. |
| Main Flow | 1. User opens an existing highlight. 2. User adds one or more tags via a tag input. 3. System persists `tags` on the highlight. |
| System Response | The highlight's tags update. The bookmark's tags are unaffected. |
| Alternate Flow | Whether highlight-level tags appear in the user's library-wide tag aggregation alongside bookmark-level tags is 🟠 Product Decision. See §12. |

### UC-14 — Export highlights for use in an external tool

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Move highlights into a personal knowledge tool, read-later service, or backup file. |
| Main Flow | 1. User initiates an export (whole library or scoped). 2. The export pipeline emits highlights in a supported format. 3. User downloads or sends the file. |
| System Response | The export contains every highlight's `text`, `color`, optional `note`, `created`, parent bookmark title, source link, and (where supported) tags. |
| Alternate Flow | Owned by **Import / Export / Backup PRD**. |

### UC-15 — Find a bookmark via the Highlights filter

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Surface only bookmarks that carry at least one highlight. |
| Main Flow | 1. User selects the Highlights filter from the sidebar (or filter sheet on mobile). 2. System returns bookmarks where `highlights.length > 0`. |
| System Response | Standard filtered bookmark list. |
| Alternate Flow | Owned by **Search & Filters PRD §3 F10 Attribute filters**. |

---

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Save a highlight from a web page (browser extension)** | ✅ Built | The browser extension MUST allow the user to select text on any web page and save the selection as a highlight. |
| F02 | **Save a highlight from a saved page in the application reader** | ✅ Built | Inside the application's Preview / reader surface, the user MUST be able to select text and save it as a highlight against the current bookmark. |
| F03 | **Save a highlight from an uploaded PDF or EPUB** | ✅ Built | The application's PDF and EPUB viewer MUST support text selection and highlight save. |
| F04 | **Save a highlight on iOS (in-app)** | ✅ Built | The iOS app MUST support text selection and highlight save inside the app's bookmark / reader surface. |
| F05 | **Save a highlight on iOS (Safari extension)** | ✅ Built | An iOS Safari extension MUST allow the user to highlight text directly inside Safari, without entering the application. |
| F06 | **Save a highlight on Android (in-app)** | ✅ Built | The Android app MUST support text selection and highlight save inside the app's bookmark / reader surface. |
| F07 | **Color-coded highlights** | ✅ Built | Each highlight MUST carry a `color` from a fixed palette of 12 named colors. The default color is `yellow`. |
| F08 | **Annotation (note) on a highlight** | ✅ Built / Plan-gated | Each highlight MAY carry an optional free-form note. Adding or editing notes MUST require a paid plan; viewing existing notes MUST remain available on all plans. |
| F09 | **Edit highlight color** | ✅ Built | The user MUST be able to change a highlight's color through an action toolbar that appears when the highlight is tapped or clicked. |
| F10 | **Delete a highlight** | ✅ Built | The user MUST be able to delete a highlight from the same action toolbar. Deletion MUST remove the highlight from every device on next sync. |
| F11 | **Highlight action toolbar** | ✅ Built | Tapping or clicking a saved highlight MUST surface an action toolbar exposing change-color, add-note, and delete on every supported platform. |
| F12 | **Auto-display on revisit (browser extension)** | ✅ Built | When the browser extension is installed and granted page-data access, saved highlights MUST appear on the original page when the user revisits it. |
| F13 | **Auto-create bookmark on first highlight** | ✅ Built | If the user highlights text on a page that has not yet been saved, the system MUST create the bookmark and attach the highlight in the same operation, transparent to the user. |
| F14 | **Cross-device sync** | ✅ Built | Highlights MUST sync across every device the user is signed in to. |
| F15 | **No limit on highlight count** | ✅ Decided | The system MUST NOT impose a per-page or per-account limit on the number of highlights. |
| F16 | **Highlights included in backups** | ✅ Built | Backups MUST include highlights alongside collections, bookmarks, and tags. |
| F17 | **Find bookmarks that have highlights (filter)** | ⚪ Capability Split | Surfacing bookmarks that carry at least one highlight is owned by **Search & Filters PRD** (Highlights attribute filter). |
| F18 | **Search highlight text** | ⚪ Capability Split | Full-text search across highlight `text` and `note` is owned by **Search & Filters PRD**. |
| F19 | **Highlight-level tags** | ✅ Built | Each highlight MAY carry its own `tags` array, distinct from its parent bookmark's tags. Tag identity and operations follow **Tags PRD**. |
| F20 | **Highlight as standalone library item** | ✅ Built | The system MUST expose a flat list of all the user's highlights, paginated, independent of the parent bookmark's location. |
| F21 | **Per-collection highlight listing** | ✅ Built | The system MUST expose a flat list of highlights inside a single collection. |
| F22 | **Keyboard shortcut to save selection (browser extension)** | ✅ Built | The browser extension MUST expose a keyboard shortcut to save the current selection as a highlight. The default binding is `Ctrl+Shift+S` (`Cmd+Shift+S` on macOS) on Chrome and Safari, and `Alt+X` (`⌃X` on macOS) on Edge, Firefox, and other browsers. |
| F23 | **Context-menu save (browser extension)** | ✅ Built | The browser extension MUST expose a "Save highlight" entry in the right-click context menu when text is selected. |
| F24 | **Jump from highlight list to position in page** | ✅ Built | Clicking a highlight in the application's per-bookmark highlight list MUST jump to that highlight's position in the Preview / reader surface. |
| F25 | **Color picker remembers last choice** | 🟠 Product Decision | Whether the highlight save UI remembers the user's most recently chosen color and preselects it on the next save is not pinned. |
| F26 | **Highlight reactions / emoji** | 🔴 Not Defined | Whether collaborators can react to a highlight in shared collections is not defined. |
| F27 | **Drag to reorder highlights** | 🔴 Not Defined | Whether users can manually reorder a bookmark's highlight list is not defined. The default order is by position on the page or by `created`. |
| F28 | **Export highlights to a file** | ⚪ Capability Split | Exporting highlights as a discrete file (Markdown, CSV, etc.) is owned by **Import / Export / Backup PRD**. |
| F29 | **Third-party export (e.g. read-later, knowledge tools)** | 🔵 Planned | Direct export to external knowledge tools is conceptually planned but not specified here. |
| F30 | **Highlight on browser-native PDF viewer** | ✅ Decided | Not supported. The host browser's built-in PDF viewer cannot be highlighted; users MUST upload the PDF as a file or save it as a bookmark and open it inside the application. |
| F31 | **Highlight on audio / video / image content** | ✅ Decided | Not supported. Highlights MUST be over text. |
| F32 | **Limit on highlight `text` length** | 🟠 Product Decision | Whether a single highlight's `text` is capped is not pinned. The system MUST gracefully reject obviously-abusive selections (e.g. an entire page captured as one highlight) is acceptable but not required. |
| F33 | **Bulk highlight operations** | 🔴 Not Defined | Whether users can select multiple highlights from a list and bulk-recolor, bulk-delete, or bulk-export them is not defined. |

---

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Highlight identity

| Rule | Behavior |
|---|---|
| Identifier | Each highlight MUST carry an immutable `_id` assigned by the system at creation. |
| Parent reference | Each highlight MUST reference its parent bookmark via `bookmarkRef` (or equivalent internal field). |
| Embedded storage | Highlights MUST be stored as elements of the parent bookmark's `highlights` array. |
| Required field | `text` MUST be required and non-empty at creation. |
| Immutable text | `text` MUST be immutable after creation. To change the captured text, the user MUST delete and recreate the highlight. |

### 5.2 Color

| Rule | Behavior |
|---|---|
| Default | If no `color` is supplied at creation, the system MUST persist `yellow`. |
| Allowed values | The `color` field MUST be one of the 12 named colors enumerated in §8.2. |
| Invalid values | The system MUST reject unknown color values; the highlight MUST NOT be persisted with an out-of-enum color. |
| Color edit | `color` MUST be editable after creation; updating it MUST advance `lastUpdate`. |
| Color rendering | The visual representation of each color name (exact RGB) is owned by the design system, not by this PRD. |

### 5.3 Annotation (note)

| Rule | Behavior |
|---|---|
| Optional field | `note` MUST be optional. Empty string and missing field are equivalent. |
| Plan gating | Adding or editing a `note` on a highlight MUST require a paid plan. Free-tier users MUST be able to view existing notes (e.g. created on a previous paid period) but MUST NOT be able to add or edit them. |
| Length | A maximum length for `note` is 🟠 Product Decision. The field is free-form. |
| Note edit | Changing `note` MUST advance `lastUpdate`. |
| Note delete | The user MAY clear `note` by setting it to empty string; the highlight itself MUST remain. |

### 5.4 Add a highlight

| Rule | Behavior |
|---|---|
| Required input | An add operation MUST supply `text`. `color` and `note` are optional. |
| Auto-create bookmark | If the user is highlighting on a page that is not yet bookmarked (browser extension flow), the system MUST create the bookmark and attach the highlight in the same operation, transparent to the user. |
| Server-set fields | `_id`, `created`, and `lastUpdate` MUST be set by the system. The client MUST NOT supply them at creation. |
| Per-bookmark batch | Multiple highlights MAY be added in a single operation by passing an array of `{text, color, note}` entries. |
| `tags` at creation | A highlight MAY carry a `tags` array at creation. Tag identity follows **Tags PRD**. |
| Position anchoring | The system SHOULD anchor each highlight against its source content so that re-rendering on revisit places it correctly. The exact anchoring algorithm is an implementation detail. |
| Failure mode | If the bookmark cannot be created or located (auto-create failed, network error, permission denied), the highlight MUST NOT be silently lost; the system MUST surface the failure to the user. |

### 5.5 Edit a highlight

| Rule | Behavior |
|---|---|
| Editable fields | `color`, `note`, and `tags` MUST be editable after creation. |
| Immutable fields | `_id`, `text`, `created`, and `bookmarkRef` MUST be immutable. |
| Update semantics | An update operation MUST identify the target by `_id` and supply the fields to change. Fields not supplied MUST be left unchanged. |
| `lastUpdate` advancement | Any successful edit MUST advance `lastUpdate` to the current timestamp. |
| Sync | Edits MUST propagate to every device the user is signed in to. |

### 5.6 Delete a highlight

| Rule | Behavior |
|---|---|
| Delete sentinel | A delete operation MUST be expressible as an update with `text: ""`. The empty-`text` sentinel MUST be interpreted as "remove this highlight" rather than "set text to empty string". |
| Removal scope | A successful delete MUST remove the highlight from the parent bookmark's `highlights` array and from every device on next sync. |
| Page rendering | On the next page revisit (browser extension flow), the deleted highlight MUST NOT be rendered. |
| Reversibility | Whether delete is reversible (undo window) is 🔴 Not Defined. See §12. |
| Bookmark deletion | When a bookmark is moved to Trash or permanently deleted, its highlights MUST follow the bookmark's lifecycle (see **Bookmarks PRD §5 Trash / restore / permanent delete**). |

### 5.7 Highlight listings

| Surface | Behavior |
|---|---|
| Global highlights list | The system MUST expose a paginated list of every highlight the user has access to, default sort `-created`. |
| Per-collection highlights list | The system MUST expose a paginated list of highlights from bookmarks inside one collection, default sort `-created`. |
| Per-bookmark highlights list | The bookmark detail / Preview surface MUST expose the parent bookmark's highlights, ordered by position on the page (or by `created` when position is unavailable). |
| Pagination defaults | Default page size MUST be 25; maximum page size MUST be 50. |
| Empty state | An empty list MUST surface a clear "no highlights yet" indicator with copy explaining how to create one. |

### 5.8 Auto-display on revisit (browser extension)

| Rule | Behavior |
|---|---|
| Activation prerequisite | The extension MUST have been granted access to page data on the relevant origin. Without that permission, auto-display MUST NOT occur. |
| Per-page lookup | When the user navigates to a URL, the extension MUST check whether a bookmark exists for that URL. If it does, the extension MUST fetch and apply the highlights for that bookmark. |
| URL normalization | URL matching for revisit MUST follow the same normalization rules used for bookmark identity (see **Bookmarks PRD §5 URL normalization**). |
| Re-anchoring | The extension SHOULD attempt to re-anchor each highlight to its original DOM position. If the page content has changed, re-anchoring MAY fail; the system SHOULD log this without losing the highlight in the data store. |
| Safari macOS exception | In Safari on macOS, the system MUST guide the user to grant "Always Allow on Every Website" so that auto-display works across origins. |
| Configuration | Whether auto-display is enabled MUST be a per-user setting that the user MAY disable. |

### 5.9 Action toolbar

| Rule | Behavior |
|---|---|
| Activation | Tapping or clicking an existing highlight MUST surface an action toolbar adjacent to the highlight. |
| Required actions | The toolbar MUST expose: change color, add or edit note, delete. |
| Optional actions | The toolbar MAY expose: copy text, share, jump to source. |
| Dismissal | Tapping outside the highlight MUST dismiss the toolbar without applying any change. |
| Keyboard equivalence | Where keyboard shortcuts apply (web / desktop), the same actions MUST be reachable. Specific shortcut bindings are 🔴 Not Defined. |

### 5.10 Highlight-level tags

| Rule | Behavior |
|---|---|
| Independent of bookmark tags | A highlight's `tags` array MUST be independent of its parent bookmark's `tags` array. Adding a tag to a highlight MUST NOT affect the parent bookmark. |
| Tag identity | Tag identity, normalization, and operations follow **Tags PRD**. A tag string used on a highlight is identical to the same tag string used on a bookmark. |
| Tag rename / merge / delete | Whether a tag rename, merge, or delete operation invoked from the Tags surface affects highlight-level tags is 🟠 Product Decision. See §12. |
| Aggregation | Whether highlight-level tags appear in the user's library-wide tag count aggregation alongside bookmark-level tags is 🟠 Product Decision. See §12. |

### 5.11 Sync

| Rule | Behavior |
|---|---|
| Cross-device sync | All highlight create / edit / delete operations MUST sync to every device the user is signed in to. |
| Eventual consistency | Brief sync delays of seconds are acceptable; minutes are not. |
| Conflict resolution | When two devices edit the same highlight concurrently, the system MUST converge to a single valid state. The exact rule (last-write-wins on `lastUpdate`, field-level merge, or per-field rule) is 🟠 Product Decision. |
| Offline edits | Whether edits are queued offline and reconciled on reconnect is 🔴 Not Defined. |

### 5.12 Backup and export

| Rule | Behavior |
|---|---|
| Backup inclusion | Backups MUST include every highlight on every accessible bookmark. |
| Export format | Highlights MUST be exportable as part of bookmark exports. The shape MUST include `text`, `color`, optional `note`, `created`, parent bookmark `link` and `title`, and (where supported) tags. |
| Round-trip | A backup → restore round-trip MUST preserve highlights without loss of `_id`, `text`, `color`, `note`, `created`, or `tags`. |
| Standalone highlight export | A discrete export of just-the-highlights as a Markdown / CSV file is owned by **Import / Export / Backup PRD**. |

### 5.13 Sharing and collaboration

| Rule | Behavior |
|---|---|
| Visibility scope | Highlights inside shared collections MUST be visible to collaborators with read access (level 2 or higher). |
| Edit rights | Whether collaborators MAY edit or delete each other's highlights is governed by the collaborator's `access.level` (see **Collections PRD §6.7 Access Levels**). The default is that highlights are owned by their creator and only the creator may edit or delete. |
| Public pages | When a collection is public, whether each bookmark's highlights are surfaced on the public page is owned by **Public Page / Embed PRD**. |
| Provenance | A highlight MUST carry the user identity of its creator. The user-facing presentation of provenance is 🟠 Product Decision. |

### 5.14 Cross-capability data flow

| Source | This capability uses it for |
|---|---|
| Bookmark `_id` | Parent reference (`bookmarkRef`) on every highlight. |
| Bookmark `link` (URL) | URL matching for browser-extension auto-display. |
| Bookmark `collection.$id` | Collection scope for the per-collection highlights list. |
| Web archive page render | The reader / Preview surface that hosts in-app highlight selection. |
| Extension page-data permission | Required for auto-display on revisit. |
| User plan tier | Annotation (note add / edit) gating. |
| Collection `access.level` | Visibility and edit rights for highlights inside shared collections. |

### 5.15 Platform-Specific Interaction Patterns

| Platform | Save | Revisit | Edit |
|---|---|---|---|
| **Web / Desktop (in-app)** | Right-click bookmark → **Preview** → select text → toolbar → pick color, optionally add note. | Open Preview → highlights are rendered inline. | Click a highlight → action toolbar. |
| **Browser Extension** | Select text on any page → right-click **Save highlight** OR keyboard shortcut. | Highlights appear inline on the original page when revisited. | Click a highlight on the page → action toolbar. |
| **iOS (in-app)** | Tap bookmark → select text → tap color button. | Open bookmark → highlights are rendered inline. | Tap a highlight → action toolbar. |
| **iOS (Safari extension)** | Select text in Safari → tap color button surfaced by the extension. | Same as in-app, when the user opens the bookmark. | Tap a highlight in the bookmark view → action toolbar. |
| **Android (in-app)** | Tap bookmark → select text → tap color button. | Open bookmark → highlights are rendered inline. | Tap a highlight → action toolbar. |
| **Cross-platform invariant** | Data semantics (color enum, required `text`, immutable `text`, delete sentinel, sync, plan-gating of `note`) MUST be identical across platforms. Only the gesture surface differs. | | |

### 5.16 Source-content compatibility

| Source content type | Supported? |
|---|---|
| HTML page (in-app reader / Preview) | ✅ |
| HTML page (browser extension) | ✅ |
| Uploaded PDF (in-app viewer) | ✅ |
| Uploaded EPUB (in-app viewer) | ✅ |
| Browser-native PDF viewer | ❌ — host browser's built-in PDF viewer does not support highlights. The user MUST upload the PDF as a file or save it as a bookmark and open it inside the application. |
| Image | ❌ — text inside images is not selectable for highlighting. |
| Video / audio | ❌ — highlights MUST be over text. |
| Audio / video transcripts | 🔴 Not Defined — see §12. |

---

### System Constants

### 6.1 Internal Highlight Service Capabilities

| System Capability | Requirement |
|---|---|
| Add highlight to a bookmark | The system MUST support adding one or more highlights to an existing bookmark in a single operation. |
| Add highlight with auto-create bookmark | The system MUST support a flow that creates a new bookmark and attaches a highlight in one operation, given a URL, page metadata, and a highlight payload. |
| Update highlight | The system MUST support updating `color`, `note`, and `tags` on a highlight identified by `_id`. |
| Delete highlight | The system MUST support deleting a highlight via the empty-`text` sentinel in an update operation. |
| List highlights — global | The system MUST support paginated retrieval of every highlight the user has access to, default sort `-created`. |
| List highlights — collection | The system MUST support paginated retrieval of highlights inside one collection. |
| List highlights — bookmark | The system MUST support retrieval of all highlights attached to a single bookmark, ordered by position on the page or by `created`. |
| Auto-display lookup (extension) | The system MUST support a per-URL lookup that returns whether the URL matches a saved bookmark and, if so, the highlights to render. |
| Re-anchoring | The system SHOULD support re-anchoring of highlights to changed page content, with graceful degradation when re-anchoring fails. |

### 6.2 System Response Conventions

| Response | Behavior |
|---|---|
| Add response | The full updated bookmark `highlights` array, including newly assigned `_id`, `created`, and `lastUpdate` for each new highlight. |
| Update response | The full updated bookmark `highlights` array. |
| Delete response | The full updated bookmark `highlights` array, with the deleted highlight removed. |
| List response | An array of highlight records plus pagination metadata. |
| Empty list | An empty array with a clear "no highlights" indicator. |
| Error | A typed error (validation, authentication, permission, plan-gated, throttle, server). |

### 6.3 Error and Condition Handling

| Condition | Behavior |
|---|---|
| Add with empty `text` | Refused as a validation error. The highlight MUST NOT be persisted. |
| Add with unknown `color` | Refused as a validation error. |
| Update on a `text` field | Refused — `text` is immutable after creation. (Empty-`text` is the delete sentinel and follows different semantics.) |
| Update on a missing highlight | Refused with a "highlight not found" error. The bookmark's other highlights MUST NOT be affected. |
| Note add or edit on free tier | Refused with a paywall message. The highlight's other fields MAY still be edited. |
| Auto-create bookmark — origin blocked | If the system has a do-not-bookmark policy on the origin (e.g. `chrome://`), the highlight save MUST be refused with a clear explanation. |
| Permission denied (shared collection, viewer attempts edit) | Refused with an access-level error. |
| Throttle / rate limit | The system MAY rate-limit unusually frequent highlight operations. Feedback MUST be surfaced to the user. |
| Page-data permission missing (extension) | Save MAY still succeed; auto-display on revisit MUST NOT occur. The user MUST be guided to grant the permission. |
| Concurrent edit on the same highlight | The system MUST converge to a single state per the §5.11 conflict-resolution rule. |

### 6.4 Reserved Fields and Sentinels

| Item | Rule |
|---|---|
| `text: ""` on update | Reserved as the delete sentinel for a highlight. MUST NOT be interpreted as "set text to empty string." |
| `_id` | Server-assigned, immutable. MUST NOT be supplied by the client at creation. |
| `created`, `lastUpdate` | Server-set. `created` is set once at creation and is immutable. `lastUpdate` advances on every successful edit. |
| `bookmarkRef` | Server-set parent reference. MUST NOT be modified by the client; reparenting requires deleting and recreating the highlight. |

### 6.5 Result Limits and Constants

| Item | Rule |
|---|---|
| `MAX_PAGE_SIZE` | 50 highlights per page. |
| `DEFAULT_PAGE_SIZE` | 25 highlights per page. |
| `DEFAULT_COLOR` | `yellow`. |
| `COLOR_PALETTE_SIZE` | 12 named colors. |
| `DEFAULT_LIST_SORT` | `-created` (newest first). |

### 6.6 Internal Action Types

| Action | Purpose |
|---|---|
| `highlight.add` | Add one or more highlights to an existing bookmark. |
| `highlight.addWithBookmark` | Create a bookmark and attach one or more highlights in a single operation. |
| `highlight.update` | Update `color`, `note`, or `tags` on a highlight identified by `_id`. |
| `highlight.delete` | Delete a highlight via the empty-`text` sentinel. |
| `highlight.listGlobal` | Paginated retrieval of all highlights the user has access to. |
| `highlight.listCollection` | Paginated retrieval of highlights inside a collection. |
| `highlight.listBookmark` | Retrieve highlights for a single bookmark. |
| `highlight.lookupByUrl` | Per-URL lookup for browser-extension auto-display. |

### 6.7 Plan-Tier Gating

| Capability | Required Plan |
|---|---|
| Save a highlight (any platform) | Free. |
| View existing highlights | Free. |
| Edit highlight color | Free. |
| Delete a highlight | Free. |
| Add or edit a `note` (annotation) | Paid. |
| View existing notes | Free. |
| Auto-display on revisit (browser extension) | Free. |
| Backup includes highlights | Free. |

### 6.8 Extension Message Types

The browser extension and the application surface communicate through a small message protocol. The exact wire format is an implementation detail; the message types below MUST be supported.

| Message | Purpose |
|---|---|
| **Highlight ready** | The page has loaded and the extension is ready to apply existing highlights. |
| **Apply highlights** | The application sends the list of highlights to render on the current page. |
| **Configuration** | The application sends per-user settings (e.g. enabled, navigation visible, plan tier) to the extension's content script. |
| **Add highlight** | The user has saved a new highlight. The content script sends `text`, `color`, optional `note` to the application. |
| **Update highlight** | The user has changed an existing highlight's `color`, `note`, or `tags`. |
| **Remove highlight** | The user has deleted an existing highlight. |
| **Add from selection** | The user has invoked the keyboard shortcut or context-menu action to save the current text selection. |

### 6.9 Browser Extension Permissions

| Permission | Required For |
|---|---|
| **Tabs** | Detecting the active tab's URL for the saved-page indicator and bookmark lookup. |
| **Access data on websites** (host permission, all URLs) | Auto-display of saved highlights when the user revisits a page; required for content-script injection on third-party origins. |
| **Scripting** | Injecting the highlight content script into the page on demand. |
| **Always Allow on Every Website** (Safari macOS) | The Safari-specific equivalent of the broad host permission; required for cross-origin auto-display. |

---

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| User saves a highlight from a web page using the keyboard shortcut | Highlight is saved against the bookmark for that URL; if no bookmark exists, one is created. The highlight syncs to every device. |
| User saves a highlight on a page with no existing bookmark | The system creates the bookmark transparently and attaches the highlight in the same operation. The user is not asked to confirm the bookmark creation. |
| User saves a highlight without picking a color | The system MUST persist `color: "yellow"` (default). |
| User attempts to save a highlight with empty `text` | The system MUST refuse with a validation error. |
| User attempts to save a highlight with `color: "magenta"` (not in enum) | The system MUST refuse with a validation error. |
| User edits a highlight's color | `color` is updated; `lastUpdate` advances; sync propagates. |
| User edits a highlight's `text` directly | The system MUST refuse — `text` is immutable. |
| Free-tier user attempts to add a note on a highlight | The system MUST refuse with a paywall message; the highlight's other fields remain editable. |
| Free-tier user views a note that was created during a previous paid period | The note MUST be visible. Only adding and editing are gated. |
| User deletes a highlight using the empty-`text` sentinel | The highlight is removed from the bookmark's `highlights` array and from every device on next sync. |
| User attempts to delete a highlight that doesn't exist (`_id` not found) | The system MUST refuse with a "highlight not found" error and MUST NOT modify other highlights on the bookmark. |
| User saves multiple highlights in a single operation | The system MUST persist all of them and assign `_id`, `created`, and `lastUpdate` to each. |
| User revisits a previously highlighted page with the browser extension installed and granted permission | Saved highlights MUST appear inline at their original positions. |
| User revisits a previously highlighted page without granting page-data permission | Highlights MUST NOT auto-display; the user MAY still see them in the per-bookmark list inside the application. |
| User revisits a page where the content has changed and re-anchoring fails | The highlight MUST remain in the data store; the system SHOULD log the re-anchoring failure; the per-bookmark list still shows the highlight. |
| User opens the global highlights list | The system returns all accessible highlights, default page size 25, sorted by `-created`. |
| User opens the per-collection highlights list | The system returns highlights from bookmarks inside that collection. |
| User clicks a highlight in the per-bookmark list | The reader scrolls to the highlight's position and visually focuses it. |
| User adds a tag to a highlight | The highlight's `tags` array updates; the parent bookmark's `tags` array is unaffected. |
| User performs a tag rename on the Tags surface | Whether the rename affects highlight-level tags is 🟠 Product Decision; behavior MUST be documented and consistent. |
| User moves a bookmark to Trash | The bookmark's highlights MUST follow the bookmark — they MUST NOT appear in normal highlight lists while the bookmark is in Trash. |
| User restores a bookmark from Trash | The bookmark's highlights MUST be restored alongside it. |
| User permanently deletes a bookmark | All of the bookmark's highlights MUST be removed from every index and list. |
| Highlight is created on Device A while Device B is offline | When Device B reconnects, the highlight MUST appear there. |
| Two devices edit the same highlight's `color` concurrently | The system MUST converge to a single state per the §5.11 conflict-resolution rule. |
| User uploads a PDF and saves a highlight inside it | The highlight is anchored to its position in the PDF. On revisit, the highlight is restored at the same position. |
| User opens a PDF in the host browser's built-in viewer and tries to highlight | Not supported — the user MUST be told to open the file inside the application. |
| User attempts to highlight on an image or video | Not supported — highlight MUST be over text. |
| Viewer (level 2) opens a shared collection containing highlighted bookmarks | Viewer MUST see the highlights but MUST NOT be able to edit or delete them. |
| Member (level 3) attempts to delete another collaborator's highlight | The exact rule (own-only vs. any-in-collection) is 🟠 Product Decision; whatever the rule, it MUST be enforced server-side. |
| User exports their library | Backup MUST include every highlight's `text`, `color`, `note`, `created`, parent bookmark info, and tags. |
| User clears the page-data permission after previously granting it | Auto-display MUST stop; existing highlights MUST remain in the data store and still be visible inside the application. |
| User triggers RDH_ADD_SELECTION (shortcut) with no text selected | The action MUST surface a clear "select text first" message rather than persisting an empty highlight. |
| The application's highlight content script fails to inject on a restricted page (e.g. `chrome://`) | The save MUST fail gracefully with a clear explanation; no partial state is persisted. |

---

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| `_id` | string | ✅ | Server-assigned, immutable. | Globally unique per highlight. |
| `text` | string | ✅ | Non-empty at creation; immutable thereafter. Empty string on update is the delete sentinel. | Required at create. |
| `color` | enum | optional | One of the 12 named colors in §8.2. Default `yellow` if omitted. | Editable. |
| `note` | string | optional | Plan-gated for add and edit. | Editable; clear by setting to `""`. |
| `created` | string (ISO 8601) | system | Set once at creation; immutable. | Server-set. |
| `lastUpdate` | string (ISO 8601) | system | Advances on every successful edit. | Server-set. |
| `tags` | string[] | optional | Tag identity per **Tags PRD**; deduplicated per highlight. | Independent of bookmark `tags`. |
| `anchor` | object | optional | Position information used to re-place the highlight on the source content. Advisory; failure to resolve MUST NOT corrupt or delete the highlight. See §8.2 for the typed shape. | Best-effort. |
| `sourceContext` | enum | optional | The capture surface that originated the highlight (extension, in-app reader, mobile, file viewer, import). Used for analytics and platform-specific debugging. | Server-set when known; client MAY supply it. |
| `link` | string | system | Mirror of the parent bookmark's `link` for convenience in flat listings. **Derived — parent bookmark remains authoritative.** | Server-set. |
| `title` | string | system | Mirror of the parent bookmark's `title` for convenience in flat listings. **Derived — parent bookmark remains authoritative.** | Server-set. |
| `bookmarkRef` | number | system | Parent bookmark `_id`. | Server-set; immutable. |

## 12. Database / Schema Notes

### Enums

```ts
type HighlightColor =
  | "blue"
  | "brown"
  | "cyan"
  | "gray"
  | "green"
  | "indigo"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "teal"
  | "yellow";   // default

type HighlightListScope =
  | "global"      // all of the user's accessible highlights
  | "collection"  // highlights inside one collection
  | "bookmark";   // highlights on one bookmark

type HighlightSort =
  | "-created"   // newest first (default)
  | "created"    // oldest first
  | "position";  // by position on the page (per-bookmark only, when supported)

type HighlightSourceContext =
  | "web_page"              // captured via the browser extension on a third-party page
  | "web_preview"            // captured inside the web/desktop application's reader
  | "ios_app"                // captured inside the iOS application's reader
  | "ios_safari_extension"   // captured via the iOS Safari extension
  | "android_app"            // captured inside the Android application's reader
  | "pdf_reader"             // captured inside the application's PDF viewer
  | "epub_reader"            // captured inside the application's EPUB viewer
  | "import"                 // imported from a backup or external source
  | "api";                   // created via internal automation or programmatic flow

// Web-annotation-style anchor model. The system stores enough context to
// re-place a highlight when the source content is revisited or has drifted.
// All sub-fields are optional because some surfaces (PDF, EPUB) supply only
// position selectors while others (HTML pages) supply text-quote selectors.
interface HighlightAnchor {
  // Text-quote selector (W3C-style): preferred for HTML pages.
  exact?: string;             // the exact text captured
  prefix?: string;            // a small amount of preceding text for disambiguation
  suffix?: string;            // a small amount of following text for disambiguation

  // Position selectors: useful for fixed-layout content (PDF, EPUB, file viewers).
  startOffset?: number;
  endOffset?: number;
  textPositionSelector?: {
    start: number;
    end: number;
  };
}
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
| **Bookmark Preview / reader** | Hosts in-app text selection, the color toolbar, and inline rendered highlights. Owned visually by **Reader / Articles PRD**; the highlight controls live here. |
| **Per-bookmark highlight list** | Inside Preview, a panel showing every highlight on the current bookmark with `text`, `color`, optional `note`, and a jump-to-position affordance. |
| **Global highlight library** | A flat, paginated view of every highlight the user has access to. |
| **Per-collection highlight list** | A flat list of highlights from bookmarks inside one collection. |
| **Highlight action toolbar** | Floating toolbar surfaced when an existing highlight is tapped or clicked. |
| **PDF / EPUB viewer with highlight controls** | The application's own file viewer with text selection and highlight save. |
| **Browser extension content overlay** | The on-page rendering of saved highlights when the user revisits an original web page. |
| **Permission prompt screen** | Guides the user to grant page-data access (and, on Safari macOS, "Always Allow on Every Website"). |
| **Plan-gated note paywall** | Surfaced when a free-tier user attempts to add or edit a note. |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| **Color picker** | Twelve color swatches plus the default `yellow`. |
| **Highlight chip in the per-bookmark list** | One row per highlight, showing `text`, color, optional `note`, and jump affordance. |
| **Action toolbar** | Change color, add or edit note, delete; surfaced on highlight tap or click. |
| **Note editor** | Free-form text input attached to a highlight. |
| **Page-data permission banner** | Inline notice when auto-display is unavailable due to missing permission. |
| **Empty-state illustration / copy** | Surfaced when a highlight list is empty. |
| **Tag input on a highlight** | Input control for highlight-level `tags` array. |
| **Color swatch in the bookmark card** | Compact indicator showing the colors of highlights present on a bookmark. |
| **Save-highlight context menu entry** | Right-click → **Save highlight** in the browser extension. |

---

## 15. Workflow Requirements

| Operation | Required Behavior | Shared / Core Handling |
|---|---|---|
| **Create** | The system MUST allow a user to add a highlight by selecting text on a supported surface and choosing a color. The minimum required field is `text`. |
| **Edit** | The system MUST allow editing a highlight's `color` and `note`. The `text` field is immutable after creation; "editing the text" requires deleting and recreating the highlight. |
| **Delete** | The system MUST allow deleting a highlight, both individually and as part of bookmark deletion. Deletion uses the empty-`text` sentinel pattern in batched updates. |
| **Search** | The system MUST surface highlight `text` and `note` content through the universal search field. Detailed search behavior is owned by **Search & Filters PRD**. |

---

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|
| **Highlight write service** | Adds, updates, and deletes highlights on a parent bookmark; enforces immutability of `_id`, `text`, `created`, `bookmarkRef`. |
| **Highlight read service** | Returns highlights scoped global, per-collection, or per-bookmark. |
| **Auto-create bookmark coordinator** | Handles the extension flow where a highlight is saved against a not-yet-saved URL. |
| **Plan-tier guard** | Enforces `note` add / edit gating. |
| **Permission guard** | Enforces shared-collection visibility and edit rights. |
| **Conflict-resolution module** | Reconciles concurrent edits on the same highlight. |
| **Re-anchoring engine** | Server-side fallback for highlights whose original DOM position cannot be located by the extension content script. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| **Content script** | Renders saved highlights on the page, surfaces the action toolbar, and listens for selection / shortcut / context-menu events. |
| **Selection capture handler** | Reads the current text selection and packages it into an add-highlight request. |
| **Keyboard shortcut binding** | `Ctrl+Shift+S` / `Cmd+Shift+S` on Chrome / Safari; `Alt+X` / `⌃X` on Edge / Firefox / others. |
| **Context-menu entry** | Provides the right-click "Save highlight" action when text is selected. |
| **Permission probe** | Detects whether the extension has page-data access; prompts when needed. |
| **Per-URL bookmark lookup** | On navigation, asks the application whether the active URL corresponds to a saved bookmark with highlights. |
| **Apply-highlights renderer** | Receives the list of highlights from the application and renders them inline. |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| **Preview / reader integration** | Wires text selection, color toolbar, and highlight rendering into the Preview surface. |
| **Per-bookmark highlight panel** | Component listing the highlights on the current bookmark. |
| **Global highlight library view** | Flat paginated listing of all highlights. |
| **Action toolbar component** | Web / desktop rendering of the change-color / note / delete toolbar. |
| **Note editor component** | Plan-gated rich-text or plain-text input for `note`. |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| **iOS in-app reader integration** | Text selection + color button + action toolbar inside the iOS app. |
| **iOS Safari extension** | Surfaces the color button inside Safari and posts the selection to the app. |
| **Android in-app reader integration** | Text selection + color button + action toolbar inside the Android app. |
| **Mobile highlight list** | Mobile presentation of the per-bookmark and per-collection highlight lists. |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| **Sync engine integration** | Propagates highlight changes across devices. |
| **Search index integration** | Pushes `text` and `note` updates into the search index. |
| **Filter count integration** | Maintains the bookmark "has highlights" flag. |
| **Backup / export integration** | Includes highlights in backup and bookmark export pipelines. |
| **Observability module** | Logs anonymized operation patterns, re-anchoring failures, plan-gating refusals. |

---

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| **Highlight storage** | Persists each highlight as an embedded element of its parent bookmark's `highlights` array. |
| **Highlight ID assignment** | Generates immutable `_id` values at creation. |
| **Per-bookmark highlight worker** | Applies add / update / delete operations to a bookmark's `highlights` array, including the empty-`text` delete sentinel. |
| **Auto-create-bookmark-on-highlight worker** | Handles the extension flow where the user highlights on a page that has not yet been saved; creates the bookmark and attaches the highlight in a single operation. |
| **Color enum validator** | Rejects out-of-enum color values at create and update time. |
| **Plan-tier guard** | Enforces that `note` add and edit require the paid plan. |
| **Highlight aggregation service** | Computes per-user highlight lists scoped global, per-collection, or per-bookmark. |
| **Highlight tag aggregator** | Reuses the tag index (owned by **Tags PRD**) to apply tag identity rules to highlight-level tags. |
| **URL match service for auto-display** | Normalizes URLs and looks up whether the active page corresponds to a saved bookmark with highlights. |
| **Re-anchoring service** | Attempts to re-place each highlight at its original DOM position when the page is revisited; degrades gracefully on content drift. |
| **Extension content script** | Injected into supported pages to render highlights, surface the action toolbar, and handle the keyboard shortcut and context menu. |
| **Selection capture handler** | Reads the user's current text selection and packages it into an add-highlight request. |
| **Permission probe** | Detects whether the host browser has granted page-data access; prompts when needed; degrades gracefully when denied. |
| **Sync engine integration** | Propagates highlight create / edit / delete operations across devices. |
| **Conflict-resolution module** | Reconciles concurrent edits to the same highlight. |
| **Search index integration** | Ensures `text` and `note` content propagate into the search index used by **Search & Filters PRD**. |
| **Filter count integration** | Maintains the highlights presence flag used by the Highlights attribute filter in **Search & Filters PRD**. |
| **Backup and export integration** | Includes highlights in backups and bookmark exports per **Import / Export / Backup PRD**. |
| **Sharing access guard** | Enforces that highlight operations inside shared collections respect the requesting user's `access.level`. |
| **Observability module** | Logs highlight operations, re-anchoring failures, permission state changes, and partial-failure details. |

---

## 19. OSS / Build-vs-Buy Decision

1. **Highlights are an embedded array on the parent bookmark, not a top-level entity.** Storage, identity, and lifecycle all flow from the parent bookmark. List endpoints that return highlights flat-fashion are read-side projections, not separate write surfaces. Engineering should treat the bookmark's `highlights[]` as the source of truth and derive every flat listing from it.

2. **The empty-`text` delete sentinel is a real product rule, not just a wire-format convenience.** Server-side validation MUST distinguish "create a highlight with empty text" (refused) from "delete the highlight identified by this `_id`" (accepted). Conflating these is a data-loss bug.

3. **`text` is immutable. Make this enforced server-side.** A client that sends a non-empty `text` on update MUST be refused. Allowing text edits would orphan re-anchoring data and break the audit trail of what was originally captured.

4. **Auto-create-bookmark-on-highlight is a flow, not a UX detail.** The extension code path that creates a bookmark and attaches a highlight in one operation is the most common save path for net-new pages. Treat it as a first-class feature with its own atomic guarantee: either both succeed or neither persists.

5. **Plan gating applies only to add and edit of `note`.** Reading existing notes — whether the user is on a free or paid tier — MUST remain available. A free-tier user who downgraded after creating notes during a paid period must not lose visibility of their own notes.

6. **The browser-extension permission model is a real UX hurdle.** Auto-display on revisit requires the broad host permission. On Safari macOS, the user must explicitly choose "Always Allow on Every Website." Any onboarding that hides this requirement results in the user thinking highlights are broken. Be explicit in the UI.

7. **Re-anchoring is best-effort.** Page content drifts. The data store MUST keep the highlight even when re-anchoring fails; the per-bookmark highlight list is the fallback surface for "I know I highlighted this somewhere on this page." Logging re-anchoring failures helps the team improve the algorithm over time.

8. **Highlight-level tags are independent of bookmark-level tags.** Two parallel `tags` arrays exist at different scopes. Cross-effect rules (rename / merge / delete propagation) are a product decision, but the storage MUST keep them separate. Conflating them at the storage layer is the kind of "convenient at first" decision that becomes impossible to undo later.

9. **Shared-collection edit rights are a sharp edge.** The default rule — only the creator can edit or delete a highlight — is the safest. Any expansion (editors can delete each other's highlights) MUST be explicit, server-enforced, and clearly communicated in the UI to avoid collaborators accidentally removing each other's work.

10. **The extension content script and the application share a small message protocol.** Treat the message types in §6.8 as a stable contract. Adding new types is fine; renaming or repurposing existing ones requires coordinated extension and application releases because users on stale extensions will continue to send the old shapes.

11. **Highlights propagate through every read surface in the product.** Search indexes, attribute filters, bookmark cards (for the count badge), backup files, exports, public pages — every one of these has to react when a highlight is added, edited, or deleted. Build a single change-notification path rather than ad-hoc per-surface triggers.

12. **Color rendering belongs to the design system.** This PRD locks the 12 named-color enum because the persisted value is the name. The exact RGB values for each name MAY change between design iterations without any data migration. Storing hex codes instead of names would make every color refresh a data migration.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| **Bookmarks PRD** | Highlights are attached to bookmarks. The bookmark `highlights` array is the canonical storage; the bookmark must exist (or be created in the same flow) before a highlight can be saved. |
| **Collections PRD** | Highlights inherit collection scope from their parent bookmark. Per-collection highlight listings rely on collection IDs and access rules. |
| **Tags PRD** | Highlights MAY carry their own `tags` array. Tag identity, normalization, and tag-related operations follow Tags PRD rules. |
| **Reader / Articles PRD** | The Preview / reader surface is where users select text and apply highlights inside the application. |
| **Web archive PRD** | Inside the application, highlights are anchored against the web archive copy of a page. Page-content rendering and re-anchoring depend on web archive state. |
| **Files PRD** | Highlights inside uploaded PDF and EPUB files require the application's own PDF / EPUB viewer; the host browser's built-in PDF viewer does not support highlights. |
| **Browser Extension / Mobile Capture PRD** | Selecting text on a third-party page and saving a highlight is a browser-extension flow. Mobile share extensions and Safari extensions on iOS are equivalent surfaces. |
| **Sharing / Collaboration PRD** | Highlight visibility inside shared collections follows the collaborator's `access.level`. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| **Search & Filters PRD** | The Highlights attribute filter and the highlight-text search target depend on this capability's storage and lifecycle. |
| **Bookmarks PRD** | Bookmark detail views and bookmark cards surface highlight counts and previews. |
| **Import / Export / Backup PRD** | Backups and exports include highlights; the backup format depends on this capability's persistence shape. |
| **Public Page / Embed PRD** | Public bookmark pages MAY surface highlights to anonymous viewers when the parent collection is public. |

### Related Capabilities

| Capability | Relationship |
|---|---|
| **Bookmarks PRD** | Owns the bookmark entity; this PRD owns the embedded `highlights` array. |
| **Tags PRD** | Owns tag identity, rename, merge, delete; this PRD applies those rules to highlight-level tags. |
| **Search & Filters PRD** | Owns the search and filter surfaces; this PRD provides the indexed `text` and `note` fields and the highlight presence flag. |
| **Reader / Articles PRD** | Owns the reader surface where highlights are placed and revisited inside the app. |

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
| Color picker remembers last choice | 🟠 Product Decision | Whether the highlight save UI preselects the user's most recently chosen color on the next save. Recommendation: yes. |
| `note` length cap | 🟠 Product Decision | Maximum allowed length for an annotation. |
| `text` length cap | 🟠 Product Decision | Whether to cap a single highlight's selected text length, and at what threshold. |
| Highlight delete reversibility | 🔴 Not Defined | Whether a deleted highlight can be restored within an undo window. |
| Tag rename / merge / delete affecting highlight tags | 🟠 Product Decision | Whether a Tags-surface rename or merge operates on highlight-level tags too. Recommendation: yes (single tag identity across the user's library). |
| Highlight tags in library-wide tag aggregation | 🟠 Product Decision | Whether highlight-level tags appear in the user's library-wide tag count alongside bookmark-level tags. Recommendation: yes. |
| Conflict-resolution rule | 🟠 Product Decision | Last-write-wins on `lastUpdate`, field-level merge, or per-field rule. |
| Offline highlight edits | 🔴 Not Defined | Whether highlight edits are queued offline and reconciled on reconnect. |
| Drag to reorder highlights on a bookmark | 🔴 Not Defined | Whether users can manually reorder a bookmark's highlight list. |
| Highlight reactions / emoji in shared collections | 🔴 Not Defined | Whether collaborators can react to highlights. |
| Provenance display in shared collections | 🟠 Product Decision | How to surface the user identity of each highlight's creator. |
| Edit / delete rights across collaborators | 🟠 Product Decision | Whether editors can edit / delete other collaborators' highlights, or only their own. |
| Public-page surfacing of highlights | 🟠 Product Decision | Whether each bookmark's highlights are surfaced on the public page when the parent collection is public. Coordinate with **Public Page / Embed PRD**. |
| Audio / video transcript highlights | 🔴 Not Defined | If transcripts are introduced as a content type, whether they support highlights. |
| Default order of per-bookmark highlight list | 🟠 Product Decision | Whether the default is "by position on the page" or "by `created`." |
| Auto-display preference per-domain | 🔴 Not Defined | Whether the user can opt out of auto-display on specific domains. |
| `note` rich-text vs. plain-text | 🟠 Product Decision | Whether annotations support formatting (bold, italics, links). |
| Color palette extensibility | 🔴 Not Defined | Whether users can define custom colors. |
| Highlight tags on the parent bookmark count | 🟠 Product Decision | Whether a highlight's tags contribute to the parent bookmark's filter visibility (e.g. tagging a highlight `react` does NOT make the parent bookmark match `#react` by default; recommendation: keep them separate). |
| Duplicate highlights on the same bookmark | 🟠 Product Decision | Whether saving the same `text` twice on a bookmark is allowed, deduplicated, or silently merged. Recommendation: allow duplicates (each is a distinct user gesture), with a UI affordance to reconcile if desired. |
| Collection-scoped highlights include nested descendants | 🟠 Product Decision | Whether the per-collection highlights list (§5.7) includes highlights from descendant collections. Recommendation: mirror the same default chosen for **Search & Filters PRD §5.8 nested scope**. |
| Default color | ✅ Decided | `yellow`. |
| Color palette | ✅ Decided | The 12 named colors enumerated in §8.2. |
| Plan gating of `note` add and edit | ✅ Decided | Paid plan. |
| Free `note` viewing on free tier | ✅ Decided | Visible. |
| `text` immutability | ✅ Decided | Immutable after creation. |
| `text: ""` as delete sentinel | ✅ Decided | Reserved. |
| Highlights free for all users with no count limit | ✅ Decided | Free; no per-page or per-account cap. |
| Browser-native PDF viewer support | ✅ Decided | Not supported. |
| Highlights on images / video / audio | ✅ Decided | Not supported. |
| Default page size | ✅ Decided | 25. |
| Maximum page size | ✅ Decided | 50. |
| Default sort | ✅ Decided | `-created`. |
| Browser-extension keyboard shortcut bindings | ✅ Decided | `Ctrl+Shift+S` / `Cmd+Shift+S` (Chrome, Safari); `Alt+X` / `⌃X` (Edge, Firefox, others). |

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
