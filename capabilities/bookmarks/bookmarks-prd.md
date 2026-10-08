# 01 — Bookmarks PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Bookmarks |
| **Capability ID** | bookmarks |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Full canonical specification — all 13 PRD sections documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system must allow users to save, manage, organize, preview, annotate, search, sort, bulk-manage, restore, and export web bookmarks across browser extension, web/desktop, iOS, Android, and import entry points.

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

### UC-01 — Save a bookmark from browser toolbar

| Item | Detail |
|---|---|
| **Actor** | Browser extension user |
| **Goal** | Save the currently open page as a bookmark. |
| **Main Flow** | 1. User clicks browser toolbar icon. 2. System opens save popup. 3. System detects current tab URL and attempts local metadata extraction. 4. User chooses a collection. 5. User optionally adds tags. 6. User confirms save. |
| **System Response** | System creates bookmark, assigns selected collection, stores extracted metadata, starts background parse/indexing, and updates saved-page badge state. |
| **Alternate Flow** | If current page is unsupported, system shows an error and does not create the bookmark. |

### UC-02 — Save a bookmark from web/desktop app

| Item | Detail |
|---|---|
| **Actor** | Web/desktop user |
| **Goal** | Manually save a URL into a collection. |
| **Main Flow** | 1. User opens a collection. 2. User clicks Add. 3. User pastes URL. 4. User confirms Save. |
| **System Response** | System creates bookmark in open collection and starts metadata/preview extraction. |
| **Alternate Flow** | If metadata cannot be parsed, bookmark is still saved with URL and fallback/user-provided title; preview can be refreshed later. |

### UC-03 — Save from iOS share sheet

| Item | Detail |
|---|---|
| **Actor** | iOS user |
| **Goal** | Save content from another app. |
| **Main Flow** | 1. User taps Share in another app. 2. User chooses bookmark tool from share sheet. 3. User selects collection. 4. User optionally adds tags. 5. User taps Save. |
| **System Response** | System receives shared URL/content reference and creates bookmark in selected collection. |
| **Alternate Flow** | If app is missing from share sheet, user enables it in platform share configuration. |

### UC-04 — Save from Android share menu

| Item | Detail |
|---|---|
| **Actor** | Android user |
| **Goal** | Save content from another Android app. |
| **Main Flow** | 1. User taps Share. 2. User chooses bookmark tool from share list. 3. User chooses collection. 4. User optionally adds tags. 5. User confirms Save. |
| **System Response** | System creates bookmark from shared item and stores it in selected collection. |
| **Alternate Flow** | If share target is unavailable, mobile app must be installed or enabled. |

### UC-05 — Save page, link, image, video, or selected text from context menu

| Item | Detail |
|---|---|
| **Actor** | Browser extension user |
| **Goal** | Save a specific page element or selected text without opening full app. |
| **Main Flow** | 1. User right-clicks page/link/image/video/text selection. 2. User chooses relevant save action. 3. System extracts correct source: page URL, link URL, media source URL, or selection text. 4. System opens save flow or highlight flow. |
| **System Response** | System creates bookmark draft using source context. For selected text, system creates or updates bookmark with highlight. |
| **Alternate Flow** | Unsupported URLs or restricted browser pages are rejected. |

### UC-06 — Save current page or highlight by keyboard shortcut

| Item | Detail |
|---|---|
| **Actor** | Browser extension user |
| **Goal** | Save quickly with shortcut. |
| **Main Flow** | 1. User presses configured save shortcut. 2. System checks whether current page has selected text. 3. If text is selected, route to highlight save. 4. If no text is selected, route to page save. |
| **System Response** | System opens save flow or sends selected text to highlight capture. |
| **Alternate Flow** | If shortcut conflicts with browser/OS, user configures shortcut in extension settings. |

### UC-07 — Save all open tabs

| Item | Detail |
|---|---|
| **Actor** | Browser extension user |
| **Goal** | Capture many browser tabs as bookmarks in one flow. |
| **Main Flow** | 1. User opens extension action menu. 2. User chooses Save tabs. 3. System opens tab-saving route/screen. 4. User reviews/selects tabs. 5. User saves them to a collection. |
| **System Response** | System converts selected tabs into bookmark create requests, applies collection/tags, and reports success/failure. |
| **Alternate Flow** | If extension lacks tab permission, system requests permission before reading all tabs. |

### UC-08 — Manage one bookmark

| Item | Detail |
|---|---|
| **Actor** | User |
| **Goal** | Update bookmark details and organization. |
| **Main Flow** | 1. User opens bookmark edit controls. 2. User modifies title, excerpt, cover, note, tags, collection, reminder, favorite state, type, or highlights. 3. User saves changes. |
| **System Response** | System updates bookmark, refreshes indexes as needed, and updates collection/tag/filter counts. |
| **Alternate Flow** | If user deletes bookmark, system moves it to Trash rather than immediately destroying it. |

### UC-09 — Sort bookmarks

| Item | Detail |
|---|---|
| **Actor** | User |
| **Goal** | Change bookmark display order. |
| **Main Flow** | 1. User opens sort controls. 2. User chooses date, title/name, domain, relevance, or manual arrangement. 3. If manual arrangement is active, user drags bookmarks into desired order. |
| **System Response** | System updates collection view ordering. Manual order is persisted using `order`/sort field. |
| **Alternate Flow** | If manual mode is not active, drag/drop reorder is disabled. |

### UC-10 — Find bookmarks

| Item | Detail |
|---|---|
| **Actor** | User |
| **Goal** | Locate a saved bookmark. |
| **Main Flow** | 1. User opens search field. 2. User types query. 3. User optionally applies filters. 4. User opens result. |
| **System Response** | System returns matching bookmarks by title, URL, domain, excerpt, note, full text, tags, and/or highlight text. |
| **Alternate Flow** | Bookmarks in Trash are excluded from normal search/filter results unless user is viewing Trash. |

### UC-11 — Manage multiple bookmarks

| Item | Detail |
|---|---|
| **Actor** | User |
| **Goal** | Apply an action to several bookmarks at once. |
| **Main Flow** | 1. User enters selection mode. 2. User selects multiple bookmarks. 3. User chooses Move, Add tags, Open, Delete, Mark as Favorite, Remove Favorite, Set cover, or another available action. |
| **System Response** | System applies selected operation to all target bookmarks and reports partial failures. |
| **Alternate Flow** | Entry points differ: web uses hover checkboxes, iOS uses Select, Android uses long-press. |

### UC-12 — Restore a deleted bookmark

| Item | Detail |
|---|---|
| **Actor** | User |
| **Goal** | Recover a deleted bookmark. |
| **Main Flow** | 1. User opens Trash. 2. User selects or drags bookmark out of Trash. 3. User chooses destination collection if needed. |
| **System Response** | System restores bookmark and includes it again in search/filter results. |
| **Alternate Flow** | If user deletes an item already in Trash, system may permanently remove it. |

### UC-13 — Search from browser address bar

| Item | Detail |
|---|---|
| **Actor** | Browser extension user |
| **Goal** | Search saved bookmarks without opening full app. |
| **Main Flow** | 1. User types configured keyword in address bar. 2. User enters search phrase. 3. Extension queries bookmarks. 4. Browser displays matching suggestions. |
| **System Response** | System returns bookmark suggestions and opens selected result or search page. |
| **Alternate Flow** | If query looks like a navigable URL, browser behavior may open URL instead of app search. |

---

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

Value-added behavior beyond Create, Edit, Delete, and Search.

Source feature area(s): Bookmarks & Browser Capture

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Bookmarks section — save and organize web content** | 🔵 Planned | Use case: The user wants to save web pages, articles, videos, tools, and reference links for later — organized into collections rather than a flat browser bookmark list. Plenix's Bookmarks section stores saved URLs as rich entries with: the page title, URL, a thumbnail or favicon, the date saved, tags, a personal note, and the collection it belongs to. Collections replace the browser's folders concept: the user creates named collections (Reading List, Watch Later, Research, Suppliers, Inspiration, Tools) and assigns bookmarks to one or more. The sidebar shows all collections with item counts. A search bar filters by title, URL, tags, or note content. Each bookmark can be opened, annotated further, moved to a different collection, or converted to a Task (useful when a saved page requires action — e.g. 'Fill out this application'). |
| F02 | **Browser bookmarklet — one-click save from any web page** | 🔵 Planned | The primary capture method is a browser bookmarklet — a small JavaScript snippet saved as a browser bookmark. When the user clicks it on any web page, it extracts the page title and URL and sends them to Plenix, creating a new bookmark entry in the configured target collection. Setup: the user generates a personalized bookmarklet in Settings → Bookmarks by selecting a target collection (or Inbox) and copying their access token. The generated bookmarklet code is dragged to the browser bookmarks bar. From that point, clicking it on any page saves the page instantly — no form to fill, no modal to dismiss. The bookmarklet works in Chrome, Firefox, Safari, and Edge. It is the fastest possible save action: one click, zero friction, no context switch. |
| F03 | **Bookmarklet technical details — metadata extraction and API call** | 🔵 Planned | When triggered, the bookmarklet executes in the context of the current web page. It reads document.title and window.location.href, then constructs a POST request to the Plenix task/bookmark creation API endpoint with the captured metadata and the user's access token as an authorization header. The server creates the bookmark entry and returns a success response. The bookmarklet shows a brief visual confirmation (a small toast or color flash on the bookmark bar icon) to indicate success. No additional page content is extracted — body text, images, and cookies are not read. The entire script is a few lines of JavaScript encoded as a data: URI in the bookmark's URL field. |
| F04 | **CSP limitations and browser extension alternative** | 🔵 Planned | Bookmarklets operate within the security context of the host web page. Some websites implement a Content Security Policy (CSP) that blocks outgoing network requests from inline scripts — these sites will cause the bookmarklet to fail with a 'Failed to fetch' or 'Failed to load' error. This is a browser security restriction, not a Plenix bug, and affects all bookmarklet-based tools. Affected sites include some major platforms that use strict CSP headers. The solution is a Plenix browser extension (planned for Chrome and Firefox) which runs in a privileged extension context rather than the page context and is not subject to page-level CSP restrictions. The extension provides the same one-click save behavior with more reliable cross-site compatibility, plus additional capabilities like selecting text to save as a quote alongside the URL. |
| F05 | **Plenix browser extension — enhanced capture with CSP bypass** | 🔵 Planned | The Plenix browser extension (Chrome Web Store and Firefox Add-ons) replaces the bookmarklet for users who need more reliable capture. The extension runs as a browser extension in a privileged context, bypassing page-level CSP restrictions that block bookmarklets. Additional capabilities beyond the bookmarklet: save selected text as a quote alongside the URL (useful for saving a specific passage from an article); detect the main article content on editorial sites and save a clean reader-mode version; capture media links (YouTube videos, podcast episodes) with the media title and embed URL; add a note at the time of saving without opening Plenix; choose the target collection from a popup without pre-configuring the bookmarklet; and show a preview of the captured item before confirming. The extension requires the same access token as the bookmarklet and connects to the same Plenix API. |
| F06 | **Reading list and Watch Later — curated queues** | 🔵 Planned | Use case: The user saves articles and videos faster than they consume them. Without structure, bookmarks pile up into an undifferentiated mass. Plenix provides two first-class queue collections pre-created for every account: Reading List (for articles, blog posts, documentation, long-form content) and Watch Later (for YouTube videos, conference talks, tutorials, short films). Items in these collections are displayed as a prioritized queue — not an alphabetical list. The user can reorder items by dragging, mark items as read/watched (which moves them to an archive rather than deleting), and set a reading/viewing target (e.g. 'read 2 articles per day'). Progress is tracked: the Reading List shows how many items were consumed this week vs added. Items older than a configurable threshold (e.g. 90 days) are flagged as stale so the list stays actionable. |
| F07 | **Inbox area — unsorted capture before organizing** | 🔵 Planned | The Bookmark Inbox is a holding area for items captured before the user has decided which collection they belong to. It mirrors the Tasks Inbox pattern: capture fast, organize later. When the bookmarklet or extension is used without a pre-configured target collection, items land in the Inbox. The Inbox view shows all unsorted items with a quick triage interface: the user can assign a collection, add tags, write a note, convert to a task, or delete — for each item in sequence, similar to email triage. A count badge on the Bookmarks nav icon shows how many unsorted Inbox items are waiting. The Inbox is intentionally kept separate from curated collections so that the Reading List stays clean and intentional rather than becoming a dumping ground. |
| F08 | **Convert bookmark to task** | 🔵 Planned | Any bookmark can be promoted to a Task with one click. Use cases: a saved job posting becomes a task ('Apply to this role'); a saved form becomes a task ('Complete supplier registration'); a saved article becomes a task ('Read and summarize for team'). The task is created with the bookmark's title as the task title, the URL in the task notes, and the user can immediately set a due date and priority. The original bookmark remains in the Bookmarks section and a link to the associated task appears on the bookmark card. This bidirectional link means the task's notes always contain the source URL and the bookmark always shows whether action has been taken. |
| F09 | **Bookmarks search and full-text indexing** | 🔵 Planned | The search bar in the Bookmarks section searches across title, URL, personal notes, and tags. For bookmarks where a clean article body was captured (via the browser extension's reader mode), full-text search also searches the article content — finding bookmarks by a phrase mentioned in the article even if it is not in the title or notes. Search results are ranked by recency and relevance. A 'find similar' action on any bookmark uses AI to surface other saved items with related content — useful for discovering connections between research items saved weeks apart. Bookmarks can also be found via the global search bar in the Plenix header, which returns bookmark results alongside tasks, notes, and contacts. |

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Metadata Extraction

When a bookmark is created, system attempts to populate metadata automatically.

| Metadata | Behavior |
|---|---|
| `title` | Extract from page metadata, structured data, or document title. Max 1,000 characters. |
| `excerpt` | Extract from page description metadata or structured data. Max 10,000 characters. |
| `cover` | Use explicit social/metadata image where available; otherwise select suitable visible page image. |
| `media` | Store candidate media objects such as image URLs. |
| `type` | Classify as `link`, `article`, `image`, `video`, `document`, or `audio`. |
| `domain` | Derive hostname from URL. |
| `full_text_index` | Index web page text and supported file text where available. |

### 5.2 Local Browser Extraction Rules

Observed browser-extension page parser behavior:

| Rule | Behavior |
|---|---|
| Primary link | `location.href`. |
| Canonical/source URL check | Reads `twitter:url` / `og:url`; accepts it only when similar to current page path/search or when on root path / simple page state. |
| Title priority | `twitter:title` / `og:title` → `meta[name=title]` → JSON-LD `name` or `headline` → `document.title`. |
| Title cleanup | If fallback title starts with hostname pattern, hostname prefix is stripped. If title is empty or `home`, fallback to `document.title`. |
| Title max length | Truncated to 1,000 characters. |
| Excerpt priority | `twitter:description` / `og:description` → `meta[name=description]` → JSON-LD `description`. |
| Excerpt max length | Truncated to 10,000 characters. |
| Excerpt duplicate rule | If excerpt equals title, excerpt is cleared. |
| Cover priority | `twitter:image`, `twitter:image:src`, `og:image`, `og:image:src`, JSON-LD image. |
| Cover URL handling | Relative cover URL is resolved against current page URL; invalid cover is removed. |
| JSON-LD support | Reads `application/ld+json`, accepts schema.org context, supports `@graph`, `name`, `headline`, `description`, `image`, `thumbnailUrl`. |
| Similar URL rule | JSON-LD URL or `@id` must match current path/search when supplied. |
| Image scanning | Scans visible `img` elements. |
| Image exclusions | Skips unloaded images, missing source, `.svg`, invisible images, images inside `header`, `footer`, or `aside`. |
| Image size rule | Keeps images where effective width and height are both greater than 100px. |
| Image candidate limit | Stops after 9 image candidates. |
| Media format | Candidate images are stored as `{ type: "image", link: url }`. |
| Selection capture | If user selected text, parser adds `highlights: [{ _id: timestampString, text }]`. |
| Fallback | If parser fails, returns `{ link: location.href, title: document.title }`. |

### 5.3 URL Normalization for Saved-Page Detection

Observed extension behavior for saved-page indicator and local URL map:

| Rule | Behavior |
|---|---|
| Case | Normalized URL is lowercased. |
| `www` | `www.` is stripped. |
| Hash fragments | Hash is stripped unless the URL appears to use `/#/` routing. |
| Tracking parameters | Removes query parameters matching `utm_*`. |
| Known referral parameters | Removes `ref`, `ref_src`, and `source`. |
| YouTube time parameter | Removes `t` for `youtube` / `youtu.be` URLs. |
| Query ordering | Query parameters are normalized/sorted by the URL-normalization library. |
| Stored comparison length | URL comparison key is truncated to 500 characters. |
| Existing bookmark lookup | Extension compares normalized URLs against the user’s saved-bookmark map. |

### 5.4 Bookmark Organization

| Rule | Behavior |
|---|---|
| One-collection ownership | Bookmark belongs to one collection through `collection.$id`. |
| Same URL in another collection | Creates another bookmark copy. |
| Tags are cross-cutting | Tags are labels, not containers; they can apply across collections. |
| Collection move | Moving bookmark changes `collection.$id` and updates counts/filter state. |
| Reserved collection IDs | `0` = all bookmarks except Trash; `-1` = Unsorted; `-99` = Trash. |

### 5.5 Notes

| Rule | Behavior |
|---|---|
| Note storage | Bookmark-level note is stored as text. |
| Note length | Maximum 10,000 characters. |
| Markdown | UI may allow Markdown-style formatting. |
| Search/export | Notes are included in search/export. |

### 5.6 Favorite Marker

| Rule | Behavior |
|---|---|
| Internal field | `important: boolean`. |
| Default value | `false` means not marked as favorite. |
| UI terms | Use **Favorite**, **Mark as favorite**, and **Remove favorite**. |
| Bulk behavior | Bulk actions MAY mark selected bookmarks as favorite or remove favorite from selected bookmarks. |
| Filter behavior | `important = true` means the bookmark is marked as favorite. Filters SHOULD support a Favorite filter. |
| Sort behavior | Bookmark lists MAY support sorting favorites before non-favorites. |

### 5.7 Reminders

| Rule | Behavior |
|---|---|
| Reminder field | `reminder.date`. |
| Date format | ISO 8601 date/time string. |
| Outcome | System can notify or surface bookmark at reminder time. |

### 5.8 Preview Refresh

| Rule | Behavior |
|---|---|
| Refresh action | User requests re-parse/re-extraction. |
| Re-parse behavior | Save/update flow may request background metadata parsing. |
| Outcome | Cover, type, excerpt, and preview content may be replaced. |

### 5.9 Bulk Action Contract

| Rule | Behavior |
|---|---|
| Bulk create limit | Maximum 100 bookmark objects per batch. |
| Bulk page size | List retrieval is paginated; maximum page size is 50 items. |
| Bulk update targeting | Batch update can target by `ids[]`, `search`, and/or collection. |
| `ids[]` rule | Exact bookmark IDs can limit batch update/remove. |
| `search` rule | Search text can limit batch update/remove. |
| Intersection rule | When both `ids[]` and `search` are supplied, implementation SHOULD treat targets as the intersection unless product deliberately defines otherwise. |
| `nested=true` | Includes bookmarks from nested collections when retrieving/updating/removing in collection context. |
| Empty `tags: []` | Removes all tags from targeted bookmarks. |
| Empty `media: []` | Removes all media from targeted bookmarks. |
| Bulk move | Body `collection: { $id: collectionId }` moves targets to another collection. |
| Bulk cover screenshot | A special cover value such as `<screenshot>` can request screenshots for targets. |
| Bulk delete from normal collection | Moves targets to Trash. |
| Bulk delete from Trash | Permanently removes targets. |

### 5.10 Trash and Deletion

| Rule | Behavior |
|---|---|
| First delete | Moves bookmark to Trash. |
| Search behavior | Trash bookmarks are excluded from normal search and filters. |
| Restore behavior | Moving bookmark out of Trash restores it. |
| Delete from Trash | Permanently removes bookmark. |
| System ID | Trash collection ID is `-99`. |


#### Trash System Invariants

These rules are normative because Trash is a system collection, not an ordinary user collection.

1. Trash **MUST** use reserved collection ID `-99`.
2. Trash **MUST NOT** be renameable by users.
3. Trash **MUST NOT** be reparentable or moved into another collection.
4. Trash **MUST NOT** be shareable as a normal collaborative collection.
5. Trash **MUST NOT** be treated as a normal destination in collection pickers, except explicit restore/delete workflows.
6. Normal delete **MUST** move a bookmark to Trash first.
7. Delete while already in Trash **MUST** permanently remove the bookmark, unless the product intentionally adds a separate retention/confirmation layer.
8. Bookmarks in Trash **MUST** be excluded from normal search, normal filters, duplicate cleanup, and broken-link work queues unless the user is explicitly viewing Trash.
9. Restoring from Trash **MUST** move the bookmark to a non-Trash collection. If the original collection is missing or inaccessible, the system **SHOULD** ask for a destination or default to Unsorted.
10. System collection behavior **MUST** be enforced server-side, not only hidden in UI.

### 5.11 Highlight Attachment

Although Highlights is its own capability, Bookmarks must support highlight attachment because highlights are stored on bookmark items.

| Rule | Behavior |
|---|---|
| Add highlight to saved bookmark | Update bookmark with `highlights: [newHighlight]`. |
| Add highlight to unsaved page | Create bookmark with `link`, `title`, `highlights`, and `pleaseParse`. |
| Update highlight | Use highlight `_id` and updated `text`, `color`, and/or `note`. |
| Remove highlight | Use highlight `_id` and `text: ""` to remove. |
| Default color | `yellow` if not supplied. |
| Runtime sync | Browser extension reapplies saved highlights to page when permissions allow and page is loaded. |
| Required URL support | Highlight overlay is attempted only for `http`/`https` pages. |

### 5.12 Browser Extension Runtime Details

| Detail | Behavior |
|---|---|
| Manifest version | `3`. |
| Default popup | `index.html?action`. |
| Side panel page | `sidepanel.html`. |
| Address-bar keyword | `rd`. |
| Required permissions | `contextMenus`, `activeTab`, `scripting`, `storage`, `sidePanel`. |
| Optional permissions | `tabs`; optional host permissions `*://*/*`. |
| Save command | `save_page`; observed shortcut `Ctrl+Shift+S`. |
| Side panel command | `execute_side_panel`; observed shortcut `Ctrl+.` (Windows/Linux), `Cmd+.` (Mac). |
| Open app command | `open_bookmark_web`; no default key required. |
| Badge text | Checkmark `✓` when current normalized URL is saved. |
| Badge color | Background `#0087EA`; text `#FFFFFF` when supported. |
| Unsupported highlight/page URLs | Non-HTTP/HTTPS pages are rejected for highlight overlay behavior. |

### 5.13 Retry, Timeout, and Permission Behavior

| Rule | Behavior |
|---|---|
| Extension request timeout | Some extension reads are allowed to run without a short timeout when building the saved-link map. |
| Retry recommendation | The system SHOULD retry safe server failures with backoff and SHOULD NOT retry unmodified validation or permission failures. |
| Recommended backoff | 3 attempts; delay `100ms × attemptNumber` as a minimal extension-style backoff. |
| Recommended hard timeout | 30 seconds for normal service calls unless the operation is intentionally long-running. |
| Permission check before saved indicator | Extension checks `tabs` permission before building saved-link map. |
| Permission check before highlight overlay | Extension checks `scripting` and origin permission before injecting highlight overlay. |

---

### System Constants

This section defines product-level system behavior and internal constants. It is **not** an external integration contract. These values exist so engineering, design, QA, and data modeling stay aligned.

### 6.1 System Response Conventions

| Item | Product Requirement |
|---|---|
| Successful operation | System SHOULD return a success state with the created, updated, or retrieved bookmark data available to the UI. |
| Failed operation | System SHOULD return a structured error state with a machine-readable error code and human-readable message. |
| Timestamp format | All stored timestamps MUST use ISO 8601 date-time strings. |
| Service throttling | User-level write/read operations SHOULD be protected by rate limiting; recommended limit is 120 operations per minute per authenticated user. |
| Long-running operations | Operations such as metadata parsing, archive generation, and bulk processing MAY complete asynchronously with status updates. |

### 6.2 Error and Retry Rules

| Condition | System Meaning | Retry Rule |
|---|---|---|
| Success with data | Operation completed and returned data. | No retry. |
| Success without data | Operation completed but no returned entity is needed. | No retry. |
| Validation error | Input is invalid, missing, or unsupported. | Do not retry without changing input. |
| Authentication required | User is not signed in or session expired. | Re-authenticate, then retry. |
| Permission denied | User lacks access to the bookmark, collection, or browser permission. | Do not retry unless permission changes. |
| Not found | Bookmark or related entity no longer exists. | Do not retry unmodified. |
| Rate limited | User exceeded allowed operation rate. | Retry after reset/backoff. |
| Temporary server failure | Service failed unexpectedly. | Safe operations SHOULD retry with backoff. |

### 6.3 System Collection IDs

| ID | Meaning | Product Rule |
|---:|---|---|
| `0` | All bookmarks except Trash | Used for library-wide views and search. MUST NOT be treated as a normal editable collection. |
| `-1` | Unsorted collection | Default destination when no collection is selected. |
| `-99` | Trash collection | Delete from this collection permanently removes items. MUST be protected by Trash invariants. |

### 6.4 Sort Values

| Sort Value | Meaning | Product Rule |
|---|---|---|
| `-created` | Date descending | Default newest-first ordering. |
| `created` | Date ascending | Oldest-first ordering. |
| `score` | Search relevance | Applies only when a search query is active. |
| `-sort` | Manual/custom order | Enables persisted drag/drop ordering. |
| `title` | Title ascending | Alphabetical A–Z. |
| `-title` | Title descending | Alphabetical Z–A. |
| `domain` | Hostname ascending | Groups by source domain A–Z. |
| `-domain` | Hostname descending | Groups by source domain Z–A. |

### 6.5 Internal Bookmark Service Capabilities

The product requires internal service support for the following operations. These are listed as product system capabilities, not external integration requirements.

| System Capability | Requirement |
|---|---|
| Retrieve one bookmark | System MUST retrieve a bookmark by numeric ID. |
| Save one bookmark | System MUST save one bookmark with required `link` and optional metadata. |
| Update one bookmark | System MUST update mutable bookmark fields. |
| Delete one bookmark | System MUST move a bookmark to Trash unless it is already in Trash. |
| Upload file bookmark | System MUST support creating bookmark-like records for uploaded files. |
| Upload custom cover | System SHOULD support assigning a custom cover image. |
| Open Web archive | System SHOULD open cached content when available. |
| Suggest collection/tags | System SHOULD suggest destination collection and tags. |
| Retrieve bookmarks in collection | System MUST support collection-scoped retrieval, sorting, pagination, search, and nested collection traversal. |
| Save many bookmarks | System SHOULD support batch creation with a maximum of 100 items per batch. |
| Update many bookmarks | System SHOULD support bulk updates by selected IDs and/or search result targeting. |
| Delete many bookmarks | System SHOULD support bulk delete; deleting from Trash MUST permanently remove selected items. |
| Retrieve filter counts | System SHOULD provide counts for tags, types, favorite, untagged, broken, and duplicate states. |
| Retrieve highlights | System SHOULD retrieve highlights globally and by collection. |

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| User saves normal webpage | Bookmark is created; metadata extraction starts; preview/search index is updated. |
| Page has poor metadata | Bookmark is still saved; fallback title/URL are used; preview can be refreshed later. |
| User refreshes preview | System re-parses original URL and may update cover, excerpt, type, and preview content. |
| User saves article/video | Bookmark can open in clean preview where supported. |
| User saves PDF/EPUB/TXT/Markdown file link | Full text may be indexed where supported. |
| User saves image/video from context menu | Bookmark link is set to media source URL, not necessarily page URL. |
| User selects text and uses save shortcut | System saves selection as highlight rather than only saving page. |
| User saves all tabs | System reads tab URLs and creates multiple bookmark drafts/items. |
| User lacks tab permission | Extension requests tab permission before reading tabs or saved-page state. |
| User lacks host/scripting permission | Highlight overlay is not injected; permission prompt/path is shown. |
| User tries to save browser-internal URL | System rejects or cannot save page. |
| User deletes bookmark by mistake | Bookmark is recoverable from Trash. |
| User deletes bookmark from Trash | Bookmark is permanently removed. |
| User searches for trashed bookmark | Bookmark does not appear in normal results. |
| User wants bookmark in two collections | User creates a separate copy in second collection. |
| User manually sorts in non-manual mode | Drag/drop reorder is disabled. |
| User bulk deletes selected bookmarks | All selected bookmarks move to Trash; failures are reported. |
| User opens many selected bookmarks | Web/desktop opens selected URLs in browser tabs. |
| Duplicate URL saved in same collection | 🔴 Not fully defined: system may allow, warn, merge, block, or update existing. |
| Bookmark link is unreachable | Broken-link capability may flag it, but bookmark remains in library. |
| Web archive exists | User can open cached copy. |
| Web archive failed/missing | User continues to original link or sees archive unavailable state. |
| Rate limit exceeded | system returns 429; client waits until reset/backoff before retry. |
| Batch operation has partial failures | Successful items remain changed; failed items are reported with retry options. |

---

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| `_id` | number | System | Unique numeric bookmark identifier. | Generated by system. |
| `link` | string URL | Yes | Must be valid/supported URL. | Primary bookmark target. |
| `title` | string | Recommended/System | Max 1,000 characters. | Extracted or user-edited. |
| `excerpt` | string | Optional | Max 10,000 characters. | UI may call this Description. |
| `note` | string | Optional | Max 10,000 characters. | User note. |
| `type` | enum | Optional/System | `link`, `article`, `image`, `video`, `document`, `audio`. | Content classification. |
| `collection.$id` | number | Yes | Numeric collection ID. | Destination collection. |
| `tags` | string[] | Optional | Tag strings. | Used for filtering/search. |
| `cover` | string URL | Optional | URL or uploaded cover reference. | Main visual cover. |
| `media` | array | Optional | Array of media objects. | Usually `{ link }`; browser parser adds `{ type: "image", link }`. |
| `important` | boolean | Optional | Default `false`. | True when the bookmark is marked as favorite. |
| `reminder.date` | string date-time | Optional | ISO timestamp. | Reminder date. |
| `highlights` | array | Optional | Highlight objects. | Text passages attached to bookmark. |
| `created` | string date-time | System/Optional Input | ISO timestamp. | Creation date. |
| `lastUpdate` | string date-time | System/Optional Input | ISO timestamp. | Last update date. |
| `domain` | string | System | Hostname from link. | Uploaded files may use internal host. |
| `broken` | boolean | System | True if original link unreachable. | Broken-link capability. |
| `cache.status` | enum | System | `ready`, `retry`, `failed`, `invalid-origin`, `invalid-timeout`, `invalid-size`. | Archive/Web archive state. |
| `cache.size` | number | System | Bytes. | Archive size. |
| `cache.created` | string date-time | System | ISO timestamp. | Archive created date. |
| `file.name` | string | Optional/System | File name. | Uploaded file items. |
| `file.size` | number | Optional/System | Bytes. | Uploaded file items. |
| `file.type` | string | Optional/System | MIME type. | Uploaded file items. |
| `creatorRef._id` | number | Optional/System | User ID. | Original creator in shared collection. |
| `creatorRef.fullName` | string | Optional/System | Name string. | Display only. |
| `user.$id` | number | System | Owner user ID. | Ownership. |
| `order` | number | Optional | Ascending; `0` can place first. | Used for manual sorting/system writes. |
| `source_context` | enum | Optional/Product | How item was captured. | Custom implementation field. |
| `source_platform` | enum | Optional/Product | Where item was captured. | Custom implementation field. |

## 12. Database / Schema Notes

### Enums

```ts
type BookmarkType =
  | "link"
  | "article"
  | "image"
  | "video"
  | "document"
  | "audio";

type CacheStatus =
  | "ready"
  | "retry"
  | "failed"
  | "invalid-origin"
  | "invalid-timeout"
  | "invalid-size";

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
  | "yellow";

type BookmarkSourceContext =
  | "page"
  | "link"
  | "image"
  | "video"
  | "selection"
  | "tabs"
  | "manual_url"
  | "drag_drop"
  | "import"
  | "api";

type BookmarkSourcePlatform =
  | "web"
  | "desktop"
  | "browser_extension"
  | "ios_share_sheet"
  | "android_share"
  | "import"
  | "api";
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
| **Bookmark List / Collection View** | Shows bookmarks inside a collection. |
| **Add Bookmark Dialog** | Paste URL, choose collection/tags, and save. |
| **Bookmark Edit Screen** | Edit title, excerpt, cover, note, tags, collection, reminder, favorite state, and delete. |
| **Clean Preview Screen** | Read article/video/file content without page clutter. |
| **Search Results Screen** | Search and display matching bookmarks. |
| **Filter Panel** | Narrow bookmarks by tags, types, dates, favorite state, highlights, notes, broken links, duplicates, etc. |
| **Sort Menu** | Choose date, title, domain, relevance, or manual order. |
| **Bulk Selection Toolbar** | Move, add tags, open, mark as favorite, remove favorite, set cover/media, delete, more actions. |
| **Trash Screen** | Browse, restore, or permanently delete trashed bookmarks. |
| **Browser Toolbar Popup** | Save current page quickly from extension. |
| **Browser Side Panel** | Browse, search, organize, and add bookmarks from side panel. |
| **Browser Extension Settings** | Configure default collection behavior, saved-page indicator, permissions, shortcuts, and side panel behavior. |
| **Tab Saver Screen** | Save multiple open tabs as bookmarks. |
| **Highlight Saver / Overlay** | Save selected text as highlight and display highlights on page where permitted. |
| **iOS Share Save Sheet** | Save shared content from iOS apps. |
| **Android Share Save Sheet** | Save shared content from Android apps. |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| **Bookmark Card / Row** | Display cover, title, excerpt, domain, tags, favorite marker, and actions. |
| **Collection Picker** | Select destination collection during save/edit/move. |
| **Tag Picker** | Add/remove tags on one or many bookmarks. |
| **Note Editor** | Write bookmark note. |
| **Cover Picker / Upload** | Choose, refresh, or upload cover image. |
| **Favorite Control** | Mark bookmark as favorite or remove favorite. |
| **Reminder Picker** | Assign reminder date/time. |
| **Context Menu** | Edit, refresh preview, move, duplicate-related actions, delete, copy link, etc. |
| **Bulk Checkbox / Selection Control** | Select multiple bookmarks. |
| **Bulk Action Bar** | Move, add tags, open, mark as favorite, remove favorite, set cover/media, delete, more. |
| **Search Input** | Query across bookmark fields and indexed content. |
| **Filter Chips / Sidebar** | Apply tags, type, date, favorite, no-tag, broken, duplicate, highlighted filters. |
| **Sort Dropdown** | Switch sort mode. |
| **Saved-Page Badge** | Shows checkmark when current normalized page URL is already saved. |
| **Address-Bar Suggestion Row** | Displays bookmark result in browser address bar suggestions. |
| **Permission Prompt Panel** | Explains why browser permissions are needed. |
| **Preview Refresh Button** | Re-parse bookmark metadata. |
| **Trash Restore Control** | Restore selected bookmark(s) out of Trash. |

---

## 15. Workflow Requirements

Create, Edit, Delete, and Search are required core application operations for this capability. They must exist in the application, but they are not value-added roadmap features.

When these operations are implemented by a shared application framework, this capability MUST reference the main application handling for Create, Edit, Delete, and Search instead of redefining the full rules in every capability document.

| Operation | Required Behavior |
|---|---|
| **Create** | Save a new bookmark from a URL, browser extension, context menu, mobile share sheet, tab saver, drag/drop, or import. |
| **Edit** | Update title, description/excerpt, note, cover, collection, tags, favorite state, reminder, type, highlights, file metadata, or preview-related metadata. |
| **Delete** | Move bookmark to Trash first. If the bookmark is already in Trash, permanent deletion may be performed. |
| **Search** | Locate bookmarks by title, URL, domain, description/excerpt, note, tags, full text, highlight text, filters, and indexed search. |

---

## 16. API Requirements

### Modules

Modules are grouped by implementation layer so engineering ownership is clearer.

### 11.1 Server / Application Layer

| Module | Responsibility |
|---|---|
| **Bookmarks Module** | Core bookmark entity, create/edit/delete/restore, metadata fields, favorite state, reminder, sort order. |
| **Collections Module** | Collection assignment, move behavior, Trash/Unsorted/system collections. |
| **Tags Module** | Tag assignment, bulk tags, tag indexing. |
| **Search Module** | Bookmark text search, full-text search, field search, result ranking. |
| **Filters Module** | Dynamic filters for tags, types, favorite, untagged, broken, duplicates, dates. |
| **Preview Module** | Clean preview, metadata parse/re-parse, cover/media extraction. |
| **Highlights Module** | Store bookmark highlights and integrate selected-text saving. |
| **Reminders Module** | Reminder date storage and notifications. |
| **Archive Module** | Web archive/cache status and retrieval. |
| **Files Module** | File upload as bookmark item and file metadata. |
| **Duplicates Module** | Duplicate detection and cleanup support. |
| **Broken Links Module** | Broken-link scanner and broken flag. |
| **Bulk Actions Module** | Multi-select operations and partial failure handling. |
| **Import Module** | URL parse, URL existence check, bookmark file parsing. |
| **Export Module** | Export selected/bookmark/collection data including notes and highlights. |
| **Application Services Module** | Internal services for bookmark operations and data access. |
| **Rate Limit Module** | Request throttling, reset handling, and retry rules. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| **Toolbar Popup Module** | Save current page and open add/edit bookmark flow. |
| **Context Menu Module** | Save page, link, image, video, selection/highlight, tabs, and app commands. |
| **Side Panel Module** | Browse, search, organize, and add bookmarks in browser side panel. |
| **Address-Bar Search Module** | Provide bookmark suggestions from the browser address bar keyword. |
| **Saved-Page Indicator Module** | Normalize current URL, check saved-link map, and set badge text/color. |
| **Local Parser Module** | Extract title, excerpt, cover, media candidates, structured data, and selected text. |
| **Highlight Overlay Module** | Inject and render saved highlights on supported pages when permissions allow. |
| **Extension Settings Module** | Manage default collection behavior, permissions, shortcuts, and extension preferences. |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| **Bookmark List UI Module** | Render collection views, cards/rows, sorting, and selection. |
| **Add/Edit UI Module** | Present save/edit forms, collection picker, tag picker, note editor, and cover controls. |
| **Bulk UI Module** | Render selection toolbar and bulk action feedback. |
| **Trash UI Module** | Restore and permanent delete workflows. |
| **Preview UI Module** | Open clean previews and permanent-copy/cached views. |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| **iOS Share Module** | Receive shared URLs/files from iOS share sheet and open save flow. |
| **Android Share Module** | Receive shared URLs/files from Android share menu and open save flow. |
| **Mobile Selection Module** | Long-press/select mode and mobile bulk actions. |
| **Mobile Offline Sync Module** | Optional queueing, retry, and conflict handling if offline behavior is supported. |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| **Permission Module** | Browser and OS permission handling. |
| **URL Normalization Module** | Stable comparison keys for saved-page indicator and duplicate detection. |
| **Metadata Extraction Worker** | Background parsing, refresh preview, and indexing pipeline. |
| **Notification Module** | Reminder notifications and long-running export/import completion notices. |
| **Observability Module** | Logs, metrics, retries, partial failure reporting, and audit/debug traces. |

---

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

Technical/internal work needed to support the features.

| Enabler | Purpose |
|---|---|
| **URL ingestion service** | Accept URLs from app, extension, share sheets, imports, tab saver, and drag/drop. |
| **Metadata extraction service** | Extract title, excerpt, cover, media, type, domain, and full text. |
| **Browser extension parser** | Locally inspect page metadata and selected text where permissions allow. |
| **URL normalization service** | Generate stable keys for saved-page indicator and duplicate detection. |
| **Preview generation service** | Produce clean previews and support preview refresh. |
| **Search indexing service** | Index title, URL, domain, excerpt, note, tags, highlights, and full text. |
| **Collection assignment engine** | Validate/update `collection.$id`; maintain collection counts. |
| **Tag assignment engine** | Apply and remove tags individually and in bulk. |
| **Highlight engine** | Add/update/remove bookmark-attached highlights. |
| **Reminder scheduler** | Store reminder date and trigger future notification/surfacing. |
| **Favorite index** | Support favorite filter and visual marker. |
| **Bulk action processor** | Move, tag, open, delete, mark as favorite, remove favorite, update media/cover, report partial failures. |
| **Trash lifecycle service** | Move to Trash, restore, permanently delete from Trash, exclude Trash from standard search. |
| **Archive/cache service** | Retrieve or create Web archive where available. |
| **Duplicate detection service** | Detect duplicate bookmarks and apply duplicate policy. |
| **Broken-link scanner** | Mark unreachable bookmarks as broken. |
| **Browser extension integration** | Toolbar popup, context menus, keyboard commands, address-bar search, side panel, saved-page indicator. |
| **Mobile share integrations** | iOS share extension and Android share target. |
| **Application service layer** | Provide internal create/read/update/delete, file upload, cover upload, cache retrieval, and suggestion behavior. |
| **Permission manager** | Request and track browser permissions for tabs, host access, scripting, and highlight display. |
| **Export pipeline** | Include bookmarks, notes, tags, highlights, and file references in export. |
| **Rate-limit / retry manager** | Enforce 120 req/min limit awareness and safe retry behavior. |

---

## 19. OSS / Build-vs-Buy Decision

1. **Study Karakeep (formerly Hoarder) as the primary reference for curation UX.** Karakeep is licensed AGPL-3.0 and must be treated as a reference/self-hosted study tool — do not embed its source in a proprietary Plenix build. It demonstrates AI auto-tagging, full-text search, reading-list queues, collections, and a multi-platform capture model (browser extension, mobile share, API). Its architecture maps closely to what Plenix Bookmarks requires and should be the first codebase read when making structural decisions about capture, organization, and tagging pipelines.

2. **Use ArchiveBox as the reference and self-hosted backend for Web archive / permanent-copy functionality.** ArchiveBox is MIT-licensed and may be embedded or bundled in a self-hosted Plenix deployment without license conflict. It saves HTML, PDF, screenshots, WARC, and media — functioning as a personal Wayback Machine. Treat it as the preservation infrastructure layer, not the user-facing curation layer. The two tools are complementary: Karakeep for capture and organize, ArchiveBox for deep archival when the user chooses "preserve full page."

3. **Review Linkwarden for collaborative and annotation patterns only.** Linkwarden is AGPL-3.0 and must not be embedded in a proprietary build. Its value as a reference is its annotation model and web-content preservation approach for shared/collaborative collections. Consult it when designing Highlights storage, shared collection permissions, and annotation-on-saved-content workflows. Do not lift its data model directly without auditing the license boundary.

4. **License classification summary.**

   | Tool | License | Classification | Usage rule |
   |---|---|---|---|
   | Karakeep (Hoarder) | AGPL-3.0 | Reference / self-hosted study | Read source; do not embed in proprietary product |
   | ArchiveBox | MIT | Embed or self-hosted service | May bundle in self-hosted Plenix deployment |
   | Linkwarden | AGPL-3.0 | Reference only | Study patterns; do not embed |

5. **Adopt the Karakeep/ArchiveBox split as Plenix's architectural boundary.** Plenix builds the curation layer natively: capture, metadata extraction, tag assignment (including AI auto-tagging), collections, reading list, search, and browser extension. Plenix defers deep archival to an ArchiveBox-compatible backend when the user explicitly requests "preserve full page." The `cache.*` fields in the Bookmark schema are the integration surface — `cache.status`, `cache.size`, and `cache.created` map to ArchiveBox job outcomes.

6. **AI auto-tagging is a first-class Plenix feature, not a bolt-on.** Karakeep proves the model: tags suggested by AI at capture time reduce the organization burden on the user and align with the Plenix "AI as organizing assistant" philosophy. Build the AI tag suggestion pipeline into the metadata extraction worker from the start. The `tags` field on the Bookmark entity is the output surface. Treat AI-suggested tags the same as user-applied tags in storage; distinguish them in UI only if the product explicitly requires a "suggested vs confirmed" UX.

7. **Key architectural decision — extraction pipeline design.** Karakeep runs a server-side extraction worker that processes URLs asynchronously after capture. Plenix should follow the same pattern: capture is synchronous (fast, returns bookmark ID immediately), metadata extraction and AI tagging are async workers, and the client polls or receives a push update when extraction completes. The `pleaseParse` flag in `CreateBookmarkInput` signals that background parsing is requested. Do not block the capture response on extraction.

8. **Integration pattern for ArchiveBox.** When the user triggers "preserve full page" (a product-level action mapped to Web archive), Plenix queues a job to an ArchiveBox instance (self-hosted or managed). The job returns a URL to the archived snapshot. Plenix stores the result in `cache.status = "ready"` and the snapshot URL as the cached copy reference. If ArchiveBox is unavailable or the job fails, set `cache.status = "failed"` and surface a retry option. Never block the bookmark save on archive completion.

9. **Platform fragility warning — browser extension capture.** The browser extension layer is the most fragile surface: Manifest V3 lifecycle changes, CSP blocking, and store review delays are ongoing risks. Design the extension as a thin capture client that calls the Plenix API — keep business logic server-side. Do not store primary bookmark data in extension storage; use it only for the saved-URL map (badge indicator) and auth token. This minimizes breakage surface when browser vendors change extension APIs.

10. **E2EE warning — full-text indexing and AI tagging.** If Plenix ever offers end-to-end encryption for bookmark content, full-text search and server-side AI tagging cannot operate on ciphertext. Karakeep and ArchiveBox both process plaintext on the server. Make the encryption boundary decision before building the extraction/tagging pipeline — retrofitting E2EE onto a server-side extraction architecture requires fundamental redesign of the search index and AI pipeline.

11. **What Plenix builds natively vs defers.**

    | Capability | Build natively | Defer to service/OSS backend |
    |---|---|---|
    | Capture (URL, extension, mobile share, tab saver) | Yes | — |
    | Metadata extraction (title, excerpt, cover, type) | Yes | — |
    | AI auto-tagging | Yes | — |
    | Full-text indexing | Yes | — |
    | Collections, tags, highlights, notes | Yes | — |
    | Browser extension (toolbar, context menu, side panel) | Yes | — |
    | Reading list / queue management | Yes | — |
    | Broken-link scanning | Yes | — |
    | Duplicate detection | Yes | — |
    | Deep web archival (HTML, PDF, WARC, screenshot) | No | ArchiveBox (MIT) |
    | Collaborative bookmark sharing (if added later) | Evaluate | Study Linkwarden patterns |

12. **AGPL compliance boundary.** Both Karakeep and Linkwarden are AGPL-3.0. If any AGPL code is incorporated into a Plenix server binary and that binary is offered as a network service, AGPL requires the full source of the modified binary to be made available to users. To avoid this obligation: study the source for patterns and ideas, reimplement independently, and do not copy or import AGPL-licensed modules. ArchiveBox (MIT) has no such restriction and may be bundled, forked, or called as a subprocess freely.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| **Collections** | Every bookmark belongs to one collection through `collection.$id`. |
| **Tags** | Bookmarks can carry tags and bulk tag changes. |
| **Search** | Bookmarks must be searchable by title, URL, domain, description, notes, highlights, and indexed text. |
| **Filters** | Bookmarks are narrowed by type, favorite, no-tag, broken, duplicate, Web archive/cache state, date, tags, etc. |
| **Highlights** | Highlights are stored on bookmark items and can be created from selected text. |
| **Files** | Uploaded files can be represented as bookmark-like items. |
| **Web archive** | Bookmark can have cache/permanent-copy state. |
| **Browser Extension** | Toolbar save, context menu, side panel, omnibox, saved-page badge, highlight overlay. |
| **Mobile Share Capture** | iOS and Android save flows. |

### Depended On By

| Capability / Module | Why it depends on Bookmarks |
|---|---|
| **Articles / Reader** | Reader opens bookmark content. |
| **Files** | File items reuse bookmark structure. |
| **Highlights** | Highlight objects attach to bookmarks. |
| **Duplicates** | Duplicate cleanup operates on saved bookmark URLs. |
| **Broken Links** | Broken-link scanner marks bookmark links. |
| **Export / Backup** | Exports bookmark data, tags, notes, highlights, and file references. |
| **Import** | Imports create bookmark records. |
| **Sharing** | Shared collections contain bookmark records. |

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
| What is the exact duplicate behavior when saving same URL into same collection? | 🔴 Product decision | Choose: allow, warn, merge, block, or update existing. |
| What is the exact default collection fallback algorithm? | 🔴 Not fully defined | Known options: explicit default, last used, recent; define priority. |
| Should bookmarks support multiple collections directly? | ✅ Decided | No. Use separate copies unless custom product intentionally changes model. |
| Should full-text indexing be plan-gated? | 🔴 Product decision | Decide free vs paid behavior. |
| Should archive/Web archive be plan-gated? | 🔴 Product decision | Decide free vs paid behavior. |
| Should selected-text highlights be in Bookmarks or Highlights? | ✅ Decided | Store on Bookmark entity but document full management under Highlights capability. |
| What are exact mobile offline behaviors? | 🔴 Not defined | Define queue, retries, conflict resolution. |
| What happens when bulk save tabs has partial failures? | 🔴 Product decision | Recommended: create successful items, show failed tabs with retry. |
| How long do Trash items remain before permanent deletion? | 🔴 Product decision | Source-style behavior: not permanent until user chooses. Custom product can add retention. |
| What file-size/media limits apply to bookmark metadata and covers? | 🔴 Capability split | Define exact limits in Files and Archive capabilities. |
| Should retry/backoff use extension-style minimums or full exponential backoff? | 🔴 Product decision | Recommended: exponential backoff with jitter for server errors and 429. |

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
