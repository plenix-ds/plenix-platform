# 04 — Search & Filters PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Search & Filters |
| **Capability ID** | search |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Full specification with features, functionality, scenarios, and enablers |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST allow users to find any saved item — bookmark, collection, tag, highlight, or annotation — through a single search field with full-text and operator-based queries, and to narrow any view through a dynamic filter list whose entries reflect what is actually present in the current scope.

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

### UC-01 — Find a bookmark by remembering a word from its title

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Locate a specific bookmark using a word the user remembers from its title or page. |
| Main Flow | 1. User clicks the search field. 2. User types the word. 3. System returns matching bookmarks ranked by relevance, grouped with any matching collections / tags / highlights. 4. User clicks the desired result. |
| System Response | Result list updates as the user types or on submit. Match fragments are visually highlighted. |
| Alternate Flow | If the word matches inside indexed page content but not title, results MAY take a moment longer; the system MUST still match. |

### UC-02 — Search within a specific collection

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Limit search to a chosen collection rather than the entire library. |
| Main Flow | 1. User opens the target collection. 2. User clicks the search field. 3. User selects **In current collection** from the field's options. 4. User types a query. |
| System Response | Results are limited to bookmarks in that collection. The filter list narrows to filters that are non-empty inside that collection. |
| Alternate Flow | The user MAY clear the In-current-collection scope to broaden back to the full library at any time. |

### UC-03 — Combine a tag filter with a text query

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Find bookmarks tagged `recipes` that mention `chocolate`. |
| Main Flow | 1. User clicks the `recipes` tag in the filter list. 2. With the filter active, user types `chocolate` in the search field. 3. System returns bookmarks that are tagged `recipes` AND match `chocolate`. |
| System Response | Result list reflects the combined predicate. |
| Alternate Flow | The same query MAY be expressed entirely in operators: `#recipes chocolate`. |

### UC-04 — Find bookmarks of a specific type

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | View only video bookmarks across the library. |
| Main Flow | 1. User clicks **Video** in the filter list. 2. System returns only bookmarks whose detected content type is video. |
| System Response | The Video filter is highlighted as active. |
| Alternate Flow | The same intent MAY be expressed as `type:video` typed directly. |

### UC-05 — Find bookmarks without any tag

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Surface bookmarks that have not yet been labeled. |
| Main Flow | 1. User clicks **Without tags** in the filter list. 2. System returns bookmarks with `tags: []`. |
| System Response | The user can then bulk-tag from the result list (see **Bookmarks PRD UC-11 Manage multiple bookmarks** and **Tags PRD UC-05 Bulk add tags**). |
| Alternate Flow | The query `notag:true` is equivalent. |

### UC-06 — Find favorites

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | View only bookmarks the user has marked as favorite. |
| Main Flow | 1. User clicks **Favorites** in the filter list. 2. System returns bookmarks where `important = true`. |
| System Response | Filter is highlighted active. |
| Alternate Flow | The query `❤️` is equivalent. |

### UC-07 — Find bookmarks created in a specific month

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Surface bookmarks saved during a particular month — for review or recall. |
| Main Flow | 1. User opens the Creation Date section of the filter list. 2. User picks a month. 3. System returns bookmarks created in that month. |
| System Response | The selected month chip is shown active in the filter list. |
| Alternate Flow | The query `created:2024-07` is equivalent. The user MAY use `<` or `>` for "before" / "after" semantics in operator form (`created:>2024-07-01`). |

### UC-08 — Find broken links to repair

| Item | Detail |
|---|---|
| Actor | Paid-plan user. |
| Goal | Triage bookmarks pointing to pages that may no longer work. |
| Main Flow | 1. User clicks **Broken links** in the filter list. 2. System returns bookmarks flagged broken by the broken-link checker. |
| System Response | The user can act on each result (replace URL, restore from web archive, delete). Detection logic and management UI are owned by **Duplicates & Broken Links PRD**. |
| Alternate Flow | If the user is on a free plan, the Broken links filter MUST display a paywall explanation rather than results. |

### UC-09 — Find duplicate bookmarks

| Item | Detail |
|---|---|
| Actor | Paid-plan user. |
| Goal | Locate bookmarks where the same URL has been saved more than once. |
| Main Flow | 1. User clicks **Duplicates** in the filter list. 2. System returns the duplicate set. |
| System Response | The user can review and remove duplicates. Cross-collection rules and merge behavior are owned by **Duplicates & Broken Links PRD**. |
| Alternate Flow | Free-tier users MUST see a paywall message instead of the result list. |

### UC-10 — Search via the browser address bar

| Item | Detail |
|---|---|
| Actor | Browser extension user. |
| Goal | Find a saved bookmark without leaving the current page. |
| Main Flow | 1. User types `rd` in the address bar and presses Tab. 2. User types a query. 3. The browser shows up to 10 suggestions ranked by relevance, with match-emphasized titles and URLs. 4. User selects a suggestion. 5. The bookmark URL opens in the chosen tab disposition. |
| System Response | If the suggestion is a result, the URL opens. If the user presses Enter on a non-URL input, the system opens the in-app search results page for that query. |
| Alternate Flow | The user MAY use the browser-native modifier keys to open the result in the current tab, a new foreground tab, or a new background tab. |

### UC-11 — Refine a query with exact phrase, exclusion, and OR

| Item | Detail |
|---|---|
| Actor | Power user. |
| Goal | Express a precise, multi-clause query: "exact phrase `css grid`, OR-mode with `flexbox`, exclude `superman`". |
| Main Flow | 1. User types `"css grid" flexbox -superman match:OR`. 2. System returns bookmarks matching the exact phrase or `flexbox`, with `superman` excluded. |
| System Response | The query parser MUST honor quoting, `-` exclusion, `match:OR` mode, and combine them. |
| Alternate Flow | If `match:OR` is omitted, the default AND-combination applies and only bookmarks matching every term are returned. |

### UC-12 — Sort search results by relevance vs. date

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Rank a set of results either by best match or by recency. |
| Main Flow | 1. With a search query active, user opens the sort menu. 2. User picks **Relevance** (`score`) or **Newest** (`-created`) or another sort. 3. System re-orders results. |
| System Response | The chosen sort persists for the remainder of the search session. |
| Alternate Flow | If the user clears the query, **Relevance** MUST become unavailable; the system reverts to the previously chosen non-score sort or the default. |

### UC-13 — Page through long result lists

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Browse beyond the first page of results. |
| Main Flow | 1. User scrolls or pages through results. 2. System loads the next page (up to 50 per page) on demand. |
| System Response | New results append (infinite scroll) or replace (paged controls), depending on platform. |
| Alternate Flow | If there are no more results, the system MUST clearly indicate "end of results" rather than appearing to load indefinitely. |

### UC-14 — Field-scoped search to disambiguate

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Find a bookmark whose URL contains `github` without matching every bookmark whose page content mentions GitHub. |
| Main Flow | 1. User types `link:github`. 2. System returns only bookmarks whose URL contains the substring. |
| System Response | The query parser MUST honor the field scope and not match the substring in title / description / notes / page content. |
| Alternate Flow | `title:`, `excerpt:`, `note:` follow identical semantics for their respective fields. |

### UC-15 — Find bookmarks with a permanent / web archive copy

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | View only bookmarks that have a usable saved copy. |
| Main Flow | 1. User types `cache.status:ready`. 2. System returns bookmarks whose web archive state is ready. |
| System Response | Results show only bookmarks for which a web archive copy is available. |
| Alternate Flow | Pro page-content search MUST require this state for full-text matches inside the page content of a bookmark. |

### UC-16 — Filter on mobile via the search field suggestions

| Item | Detail |
|---|---|
| Actor | Mobile user (Android pattern). |
| Goal | Apply a filter without a sidebar. |
| Main Flow | 1. User taps the search field. 2. The field suggests applicable filters (Tags, Favorites, Without tags, content types, library health). 3. User picks a filter. |
| System Response | Result list updates with the chosen filter active. |
| Alternate Flow | iOS exposes the same filters through a Filter sheet from the top-right toolbar. Data semantics are identical across platforms. |

### UC-17 — Use natural-language AI search

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Find a bookmark without remembering exact words — describe what they're looking for in plain language. |
| Main Flow | 1. User opens the AI-assisted search entry point from the search field options. 2. User describes the target in natural language ("the article about morning routines", "the recipe with the weird ingredient"). 3. The AI capability interprets intent and returns candidate bookmarks. 4. User picks a result. |
| System Response | The AI capability owns interpretation and ranking; this PRD owns only the entry point and the rendering of returned bookmark candidates. |
| Alternate Flow | If the AI capability is unavailable, the user MUST be able to fall back to deterministic keyword search and filters without leaving the same surface. AI search MUST NOT be required for any core search workflow. |

---

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

Value-added behavior beyond baseline.

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Universal search field** | ✅ Built | A persistent search field at the top of every primary view accepts text input and operators. |
| F02 | **Multi-entity search results** | ✅ Built | A single search query MUST search across bookmarks, collections, tags, highlights, and annotations. Results are grouped by entity type. |
| F03 | **Bookmark text search across multiple fields** | ✅ Built | A bare keyword query matches against bookmark title, description (excerpt), URL (link), notes, and indexed page content. |
| F04 | **Field-scoped operators** | ✅ Built | The query language MUST support `title:`, `excerpt:`, `note:`, `link:`, and `info:` (title and description only) to limit a term to a specific field. |
| F05 | **Exact phrase matching** | ✅ Built | Wrapping a phrase in double quotes (`"phrase"`) MUST match the literal phrase. |
| F06 | **Term exclusion** | ✅ Built | A leading `-` on a term, tag, type, or operator MUST exclude matches (`-superman`, `-#coffee`, `-type:video`). |
| F07 | **OR-mode combination** | ✅ Built | The `match:OR` operator MUST switch the query from default AND-combination to OR-combination across the supplied terms and active filters. |
| F08 | **Tag operators** | ✅ Built | `#tag` filters by tag; `-#tag` excludes a tag; `#"multi word tag"` quotes a tag containing whitespace. |
| F09 | **"Without tags" filter** | ✅ Built | The `notag:true` operator and a corresponding sidebar entry MUST surface bookmarks with no tags. |
| F10 | **Attribute filters** | ✅ Built | The system MUST expose Favorites (`❤️`), Reminder (`reminder:true`), Note (note presence), and Highlights (highlight presence) as filterable attributes. |
| F11 | **Content-type filters** | ✅ Built | The system MUST auto-detect content type and surface Article, Image, Video, Audio, Document, and Book as filters via `type:article`, `type:image`, `type:video`, `type:audio`, `type:document` (and `book` where applicable). |
| F12 | **Files filter** | ✅ Built | Uploaded files MUST be filterable via `file:true`. |
| F13 | **Web archive readiness filter** | ✅ Built | Bookmarks with a saved web archive copy MUST be filterable via `cache.status:ready`. |
| F14 | **Date filters — creation** | ✅ Built | Bookmarks MUST be filterable by creation date via `created:YYYY-MM-DD`, with `<` / `>` prefixes for before / after, and a sidebar list of months. |
| F15 | **Date filters — last update** | ✅ Built | Bookmarks MUST be filterable by last update date via `lastUpdate:YYYY-MM-DD`, with `<` / `>` for before / after. |
| F16 | **Library health filters** | ✅ Built | Broken links and Duplicates MUST appear in the filter list with current counts. Detection logic and management UI are owned by **Duplicates & Broken Links PRD**. |
| F17 | **Dynamic filter visibility** | ✅ Built | A filter MUST appear in the filter list only when at least one bookmark in the current scope matches it. Empty filters MUST be hidden. |
| F18 | **Filter list scope inheritance** | ✅ Built | The filter list MUST narrow when the user is inside a specific collection — only filters relevant to that collection's content appear. |
| F19 | **Combine search and filters** | ✅ Built | Active filters and free-text search MUST combine: results MUST satisfy both the query and every active filter. |
| F20 | **In-current-collection search scope** | ✅ Built | The search field MUST expose an "In current collection" option to scope a query to the open collection. |
| F21 | **In-title-and-description search scope** | ✅ Built | The search field MUST expose an "In title / description" option (equivalent to prefixing the query with `info:`). |
| F22 | **Sort by relevance** | ✅ Built | When a search query is present, sort by relevance score MUST be available. Relevance sort MUST NOT be selectable when no query is active. |
| F23 | **Sort by creation, title, domain, manual order** | ✅ Built | The system MUST support sort by creation date (asc / desc), title (asc / desc), domain (asc / desc), and manual order (`-sort`). Default sort is creation date descending. |
| F24 | **Pagination of bookmark search results** | ✅ Built | Bookmark search results MUST be paginated. Maximum page size is 50. |
| F25 | **Browser address bar omnibox integration** | ✅ Built | Typing the keyword `rd` followed by Tab in the browser address bar MUST enter a search-from-address-bar mode. The system MUST surface up to 10 ranked-by-score suggestions while the user types and MUST open the chosen suggestion or perform a fallback in-app search on Enter. |
| F26 | **Search-result highlight markup** | ✅ Built | Result entries SHOULD include match-emphasized fragments (e.g. wrapping the matched substring) so the user can see why a result matched. |
| F27 | **Result indexing latency disclosure** | ✅ Built | The system MUST acknowledge that newly saved bookmarks may take a short period before page content is indexed, and that title / description / URL are searchable immediately. |
| F28 | **Trash exclusion from search by default** | ✅ Built | Bookmarks in Trash (`_id = -99`) MUST NOT appear in normal search results. The user MUST explicitly view the Trash scope to find them. |
| F29 | **Plan-gated features** | ✅ Built | Page-content / PDF / EPUB content indexing, Broken Links filter, and Duplicates filter MUST be gated to the paid plan tier. The free tier MUST search title, description, URL, and notes only. |
| F30 | **Saved searches / filter presets** | 🔵 Planned | The system MAY allow naming and saving a query and filter combination so the user can return to it. Not required for initial implementation. |
| F31 | **Recent searches** | 🔵 Planned | The system MAY surface recent search queries as quick-pick suggestions in the search field. |
| F32 | **Search auto-completion of operators** | 🔵 Planned | The search field MAY suggest operators (e.g. `type:`, `created:`, `#`) as the user types. |
| F33 | **Result item density / preview controls** | ⚪ Capability Split | View mode (list / grid / masonry) and density controls are owned by **Bookmarks PRD §5 view modes**. |
| F34 | **Semantic / AI natural-language search** | 🔴 Not Defined | A meaning-based search interface where the user describes what they want in plain language is conceptually planned but not specified in this PRD. |
| F35 | **Limitations — no OCR, no audio / video transcripts** | ✅ Decided | Text inside images is not searchable. Audio and video transcripts are not searched. |
| F36 | **Browser side panel search** | ✅ Built | The browser extension's side panel MUST expose a compact search surface that delegates to the same backend, so users can search without opening the full application. |

---

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Search field placement and visibility

| Rule | Behavior |
|---|---|
| Persistent placement | The search field MUST be present at the top of every primary view (All bookmarks, individual collection, Trash, search results). |
| Mobile placement | On mobile, the search field MAY collapse to an icon that expands on tap. |
| Focus shortcut | The system MAY expose a keyboard shortcut to focus the search field on web and desktop. (Specific binding 🔴 Not Defined.) |
| Clear control | The search field MUST expose a clear / cancel control once it contains text. |

### 5.2 Query language — bare terms

| Rule | Behavior |
|---|---|
| Bare term match | A token without an operator prefix MUST match against bookmark `title`, `excerpt` (description), `link` (URL), `note`, and indexed page content. |
| Token splitting | Whitespace separates tokens. Multiple bare tokens MUST combine with AND by default. |
| Quoted phrase | A phrase inside double quotes MUST match the literal phrase across the same multi-field set as a bare term. |
| Stop-token handling | Whether common stop words are dropped is 🔴 Not Defined. |
| Diacritic / case folding | Whether diacritic-insensitive and case-insensitive matching apply by default is 🟠 Product Decision (see §12). |

### 5.3 Query language — field-scoped operators

| Operator | Field |
|---|---|
| `title:term` | Bookmark `title` only. |
| `excerpt:term` | Bookmark `excerpt` (description) only. |
| `note:term` | Bookmark `note` only. |
| `link:term` | Bookmark `link` (URL) only — substring match. |
| `info:term` | Title and description (combined). |

| Rule | Behavior |
|---|---|
| Quoting in scoped operators | A quoted phrase MAY follow the operator: `title:"css grid"`. |
| Exclusion combined with scope | `-title:term` MUST exclude bookmarks whose title contains the term. |
| Multiple scoped operators | Multiple scoped operators in one query combine with AND by default and OR under `match:OR`. |

### 5.4 Query language — tag operators

| Operator | Behavior |
|---|---|
| `#tag` | Match bookmarks carrying that tag. |
| `-#tag` | Exclude bookmarks carrying that tag. |
| `#"multi word tag"` | Quote tags containing whitespace. |
| `notag:true` | Match bookmarks with empty `tags` array. |

The semantics of "carries that tag" are governed by **Tags PRD §5.1 Tag identity** and the active normalization policy defined there.

### 5.5 Query language — attribute, type, and date operators

| Operator | Behavior |
|---|---|
| `❤️` | Favorites (`important = true`). |
| `file:true` | Uploaded files only. |
| `reminder:true` | Bookmarks with an active reminder. |
| `cache.status:ready` | Bookmarks with a ready web archive copy. |
| `type:article` / `type:image` / `type:video` / `type:audio` / `type:document` | Filter by detected content type. |
| `created:YYYY-MM-DD` | Bookmarks created on / in that date or month. `<` and `>` prefixes mean before and after. |
| `lastUpdate:YYYY-MM-DD` | Bookmarks last updated on / in that date or month. `<` and `>` prefixes mean before and after. |
| `match:OR` | Switch the entire query and active filter set from AND-combination to OR-combination. |

| Rule | Behavior |
|---|---|
| Date format | Date operator values SHOULD accept `YYYY-MM-DD`, `YYYY-MM`, and `YYYY` granularities. Whether `YYYY-MM` is treated as the entire month is ✅ Decided yes. |
| Date range exclusivity | `<` MUST mean strictly before; `>` MUST mean strictly after. Whether equals matches that day is ✅ Decided: a bare value matches the entire day / month / year specified. |
| Note attribute filter | "Note" as a sidebar attribute MUST match bookmarks whose `note` field is non-empty. The exact operator form (e.g. `note:true`) is 🔴 Not Defined; sidebar surface MUST work regardless. |
| Highlights attribute filter | "Highlights" as a sidebar attribute MUST match bookmarks with at least one highlight. The exact operator form is 🔴 Not Defined; sidebar surface MUST work regardless. |

### 5.6 Filter list — dynamic visibility

| Rule | Behavior |
|---|---|
| Source of truth | The filter list MUST be computed from live data over the current scope (library-wide or selected collection). |
| Empty filter hiding | Filters with `count = 0` for the current scope MUST NOT appear. |
| Live recomputation | The filter list MUST recompute when the scope changes (collection switch, search query change, active-filter change). |
| Counts | Each filter entry MUST display a count of matching bookmarks in the current scope, where applicable. |
| Filter sort — tags | Tag filters within the filter list MAY be sorted by count (default) or by name. |
| Filter sort — content types | Content type filters MAY be sorted by count or by a fixed order; the default is 🟠 Product Decision. |

### 5.7 Filter combination semantics

| Rule | Behavior |
|---|---|
| Default combination | Multiple active filters MUST combine with AND. |
| OR-mode | When `match:OR` is set in the search field, all active filters AND search terms MUST combine with OR instead. |
| Exclusion in filters | A filter MAY be inverted by typing `-` in the search field with the operator form (e.g. `-type:video`). UI affordances for inverting a filter from a click are 🟠 Product Decision. |
| Combine with text query | Active filters and free-text terms MUST combine: the result set MUST satisfy both the filters and the text query. |
| Filter conflict | If a filter and an exclusion of the same filter are both set (e.g. `type:video -type:video`), the exclusion MUST win and the result MUST be empty for that predicate. |

### 5.8 Scope rules

| Scope | Behavior |
|---|---|
| Library-wide (default) | Search MUST run against every bookmark accessible to the user, except Trash. |
| In current collection | When set, search MUST be restricted to the open collection's bookmarks. |
| With descendants | The system MUST support an option to include nested collection descendants in the scope. The default value (include vs. exclude descendants) is 🟠 Product Decision. |
| Trash-only | When the user is viewing Trash, search MUST run only inside Trash and surface bookmarks in Trash. |
| Shared collection | When the user is viewing a shared collection, search MUST be restricted to bookmarks visible at the user's `access.level`. |

### 5.9 Sorting

| Sort | Use |
|---|---|
| `-created` | Default. Newest first. |
| `created` | Oldest first. |
| `score` | Relevance. **Available only when a search query is active.** |
| `title` | Title ascending. |
| `-title` | Title descending. |
| `domain` | Hostname ascending. |
| `-domain` | Hostname descending. |
| `-sort` | Manual order (user-defined within a collection). |

| Rule | Behavior |
|---|---|
| Score availability | Selecting `score` without an active query MUST be refused (UI grays out the option, internal call returns a validation error). |
| Sort persistence | The user's chosen sort SHOULD persist per-collection within the session. Persistence across sessions is 🟠 Product Decision. |
| Sort within search | When a query is active and `score` is selected, ties SHOULD break by `-created`. |

### 5.10 Pagination

| Rule | Behavior |
|---|---|
| Page size | Default page size MUST be ≤ 50. Maximum supported page size MUST be 50. |
| Pagination model | Web / desktop SHOULD use infinite scroll for the bookmark list. Paged numeric navigation MAY be offered as a power-user option. |
| Mobile | Mobile MUST use infinite scroll. |
| End-of-results | The system MUST clearly indicate when no further results are available; it MUST NOT appear to load forever. |
| Stable ordering | Within a single search session, page-to-page ordering MUST be stable for the same query, scope, and sort. |

### 5.11 Indexing lifecycle

| Stage | Behavior |
|---|---|
| Title / description / URL / notes | MUST be searchable immediately upon save or edit. |
| Page content | SHOULD be indexed asynchronously after the web archive copy is ready; full availability MAY take a few minutes. |
| PDF / EPUB content | SHOULD be indexed asynchronously after the file is processed. |
| Trash exclusion | Bookmarks in Trash MUST NOT appear in normal search results. Restoring a bookmark MUST restore its discoverability. |
| OCR | Text inside images MUST NOT be indexed. (✅ Decided.) |
| Audio / video transcripts | MUST NOT be indexed. (✅ Decided.) |
| Plan-tier gate | Page-content / PDF / EPUB indexing MUST be available only on the paid plan tier. |
| Re-index on edit | When a bookmark's title, description, URL, notes, tags, or web archive content changes, the index MUST update. |

### 5.12 Multi-entity search results

| Rule | Behavior |
|---|---|
| Result groups | Results from a single query MUST be grouped by entity type: Bookmarks, Collections, Tags, Highlights, Annotations. |
| Bookmark group ordering | Within the bookmark group, the user's chosen sort applies. |
| Non-bookmark groups | Collection / tag / highlight / annotation matches SHOULD appear in compact rows above or beside the bookmark list. |
| Match-emphasized fragments | Each result row SHOULD include a snippet showing the matched text. |
| Empty groups | An entity-type group MUST be hidden when its result count is zero. |

### 5.13 Browser address bar omnibox

| Rule | Behavior |
|---|---|
| Activation keyword | The keyword `rd` followed by Tab MUST activate omnibox mode in supported browsers. |
| Suggestion source | Suggestions MUST be drawn from a relevance-ranked search of the user's library (max 10 results, sort `score`). |
| Suggestion content | Each suggestion MUST include a match-emphasized title and the bookmark URL. |
| Selection — URL result | Selecting a suggestion MUST open the bookmark URL in the chosen tab disposition (current, new foreground, new background). |
| Selection — fallback | If the user submits a non-URL string with Enter, the system MUST open the in-app search results page for that query. |
| Browser support | The omnibox MUST be available where the host browser supports a `keyword` field on the omnibox API; on browsers without that capability the feature MAY be omitted. |
| Authentication | If the user is not signed in, the omnibox MUST surface a sign-in prompt rather than silently returning empty. |

### 5.14 Cross-capability data flow

| Source | This capability uses it for |
|---|---|
| Bookmark `tags` | Tag operators, `notag:true`, dynamic tag filter list. Tag rename / merge / delete is owned by **Tags PRD**. |
| Bookmark `important` | Favorites filter and `❤️` operator. |
| Bookmark `note` | Notes filter and `note:` field-scoped search. |
| Bookmark `highlights` | Highlights filter and the highlight-results group. |
| Bookmark `media`, `cover`, content type detection | `type:` operator and content-type filter list. |
| Bookmark `cache.status` | `cache.status:ready` operator. Detection and storage owned by **Web archive PRD**. |
| Bookmark `reminder` | Reminder filter and `reminder:true` operator. |
| Bookmark `file` flag | `file:true` operator and Files filter. |
| Broken / Duplicate flags | Library-health filter list. Detection logic owned by **Duplicates & Broken Links PRD**. |
| Collection `_id` and nesting | In-current-collection scope and the include-descendants flag. |
| User `access.level` on shared collection | Result visibility in shared scopes. |

### 5.15 Platform-Specific Interaction Patterns

| Platform | Behavior |
|---|---|
| Web / Desktop | Search field at top; sidebar filter list always visible; sort menu and view-mode controls in the toolbar; infinite-scroll bookmark list. |
| Browser Extension | The extension popup MAY include a search field that delegates to the same backend. The address-bar omnibox is the first-class browser-extension search surface. |
| iOS | Search field at top; **Filter** action in the top-right toolbar opens a filter sheet listing the same filter set. **In current collection** is set by tapping the field while inside a collection. |
| Android | Search field at top; tapping the field surfaces filter suggestions inline. Filter sheet is also available. |
| Cross-platform invariant | Operator parsing, scope rules, sort options, pagination, plan gating, and Trash exclusion MUST be identical across platforms. Only the gesture surface differs. |
| Shared-collection visibility | Filter and search result visibility on every platform MUST reflect the requesting user's `access.level`. |

---

### System Constants

### 6.1 Internal Search Service Capabilities

| System Capability | Requirement |
|---|---|
| Parse query | The system MUST parse a search string into a structured predicate covering bare terms, quoted phrases, exclusion, field-scoped operators, tag operators, attribute operators, type operator, date operators, and the `match:OR` modifier. |
| Resolve scope | The system MUST resolve the active scope (library-wide / collection / Trash / shared / nested) into a bookmark candidate set before evaluating predicates. |
| Evaluate predicate | The system MUST evaluate the parsed predicate over the candidate set and return matching bookmark IDs along with relevance scores. |
| Compute filter list | The system MUST compute, for the current scope and any active text query, the dynamic filter list with per-filter counts. |
| Sort results | The system MUST sort the result set according to the requested sort, refusing `score` when no query is active. |
| Paginate | The system MUST paginate results with a maximum page size of 50. |
| Surface non-bookmark matches | The system MUST also evaluate the query against collections, tags, highlights, and annotations, returning grouped result blocks. |

### 6.2 System Response Conventions

| Response | Behavior |
|---|---|
| Bookmark result list | A page of bookmark IDs (with summary fields) plus pagination metadata. |
| Filter list response | The dynamic filter set, including: per-tag counts, per-content-type counts, attribute counts (favorites, no-tag, note, highlights, reminder, file), library-health counts (broken, duplicates), and creation-date buckets. |
| Empty result | An empty list with a clear "no matches" indicator. The system MUST NOT silently return a default unrelated set. |
| Error | A typed error (validation, authentication, permission, throttle, server). |

### 6.3 Error and Condition Handling

| Condition | Behavior |
|---|---|
| `score` sort without query | Refused as a validation error. UI SHOULD prevent selection in the first place. |
| Plan-gated query (page content / PDF / EPUB / broken / duplicates) on free tier | Refused with a paywall message. The query MUST NOT silently fall back to a degraded result set without informing the user. |
| Invalid operator syntax | The unparseable token MUST be treated as a bare term rather than rejecting the entire query, unless the entire query is empty after recovery. See §6.8 for per-condition parser behavior. |
| Authentication missing | The system MUST refuse and surface a sign-in prompt; it MUST NOT return cross-user results. |
| Permission denied (shared collection scope) | The system MUST refuse and explain the access constraint. |
| Throttle / rate limit | The system MAY rate-limit unusually frequent searches. The user MUST receive feedback rather than silent failure. |
| Index lag | The system SHOULD indicate that recent saves may take a moment to be fully searchable. |

### 6.4 Reserved Operators and Keywords

| Item | Rule |
|---|---|
| `match:OR` | Reserved for OR-mode. Tags, titles, etc. that would otherwise match this string MUST be quote-escaped (`#"match:OR"`). |
| `notag:true`, `file:true`, `reminder:true`, `cache.status:ready` | Reserved attribute operators. |
| `title:`, `excerpt:`, `note:`, `link:`, `info:` | Reserved field-scoped operator prefixes. |
| `type:` | Reserved content-type operator. |
| `created:`, `lastUpdate:` | Reserved date operator prefixes. |
| `#`, `-#` | Reserved tag operator prefixes. |
| `-` (leading) | Reserved as exclusion prefix. To search for a literal `-` at the start of a term, the user MUST quote the term. |
| `❤️` | Reserved alias for the Favorites filter. |
| `rd` (browser keyword) | Reserved as the omnibox activation keyword in browsers that support keyword-based omnibox APIs. |

### 6.5 Result Limits and Constants

| Item | Rule |
|---|---|
| `MAX_PAGE_SIZE` | 50 bookmarks per page. |
| `OMNIBOX_RESULTS` | 10 suggestions. |
| `RESULT_GROUPS` | Bookmarks, Collections, Tags, Highlights, Annotations. |
| `DEFAULT_SORT` | `-created`. |
| `DEFAULT_TAG_FILTER_SORT` | `-count` (by usage count, descending). |

### 6.6 Internal Action Types

| Action | Purpose |
|---|---|
| `search.parse` | Parse a query string into a structured predicate. |
| `search.execute` | Run the parsed predicate against the candidate set under the active scope. |
| `filters.compute` | Compute the dynamic filter list for the current scope and query. |
| `omnibox.suggest` | Return up to 10 ranked suggestions for an in-progress address-bar query. |
| `omnibox.enter` | Resolve a final omnibox submission — open the chosen URL or perform an in-app fallback. |
| `search.indexUpdate` | Recompute index entries when a bookmark changes. |

### 6.7 Index Update Triggers

| Trigger | Required Behavior |
|---|---|
| Bookmark created | Add bookmark fields to the search index; immediate availability for title / description / URL / notes; page-content indexing follows asynchronously. |
| Bookmark edited (title / excerpt / link / note) | Update the affected fields in the index. |
| Tags changed on a bookmark | Update the tag operator index and the dynamic tag filter list. |
| Highlight added / edited / removed | Update the highlights presence flag and the highlights search index. |
| Note changed | Update the note presence flag and the note search index. |
| Collection changed (move) | Update collection-scope membership; existing matches MUST shift scope on next read. |
| Favorite (`important`) changed | Update the Favorite filter count. |
| Reminder added / removed / due | Update the Reminder filter count. |
| File uploaded or processed | Update the file flag, content type, and PDF / EPUB content index. |
| Web archive cache status changed | Update `cache.status:ready` filter eligibility and unblock page-content indexing. |
| Broken-link state changed | Update the Broken Links filter count. |
| Duplicate state changed | Update the Duplicates filter count. |
| Bookmark moved to Trash | Remove from normal search and filter scopes immediately. |
| Bookmark restored from Trash | Reintroduce to normal search and filter scopes. |
| Bookmark permanently deleted | Remove from all search indexes. |

### 6.8 Parser Error Handling

| Condition | Required Behavior |
|---|---|
| Unknown operator (`xxx:value` where `xxx` is not a recognized prefix) | Treat the token as a bare term; surface a non-blocking warning if persistent. |
| Malformed date value (`created:not-a-date`) | Drop that date clause; preserve the rest of the query; surface validation feedback. |
| Unterminated quote (`"phrase` with no closing quote) | The exact behavior is 🟠 Product Decision (treat as literal text vs. show validation feedback). The system MUST NOT crash and MUST preserve the user's typed text. |
| Invalid `type:` value (`type:foobar`) | Return zero matches for the type clause; preserve the rest of the query; surface validation feedback. |
| Invalid tag syntax (`#` with nothing following) | Drop that tag clause; preserve the rest of the query; show validation feedback. |
| Plan-gated operator on free tier (`cache.status:ready` for content-search use, broken / duplicates filters) | Surface a paywall / upgrade message rather than silently degrading to a wrong result set. |
| Empty query after recovery | Treat the request as "no text query"; the request remains valid and runs as a pure-filter query. |

### 6.9 Plan-Tier Gating

| Capability | Required Plan |
|---|---|
| Title / description / URL / note search | Free. |
| Tag, type, attribute, date, file, cache, reminder filters | Free. |
| Page-content full-text search | Paid. |
| PDF / EPUB content full-text search | Paid. |
| Broken Links filter | Paid. |
| Duplicates filter | Paid. |
| Address-bar omnibox | Free. |

---

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| User saves a bookmark and immediately searches its title | The bookmark MUST appear in results immediately — title, description, URL, and notes are searchable on save. |
| User saves a long article and immediately searches a phrase from page body | Result MAY take a few minutes to surface; before indexing completes, the bookmark MUST still match on title / description / URL. |
| User searches `"css grid"` | Only bookmarks containing the exact phrase MUST match. Matching `"css"` and `"grid"` separately MUST NOT satisfy the query. |
| User searches `apple iphone -superman` | Bookmarks containing both `apple` and `iphone` MUST match; any bookmark also containing `superman` MUST be excluded. |
| User searches `apple iphone match:OR` | Bookmarks containing either `apple` OR `iphone` MUST match. |
| User searches `link:github` | Only bookmarks whose URL contains `github` MUST match. A bookmark whose page content mentions GitHub but URL does not MUST NOT match. |
| User clicks the Video filter, then types `tutorial` | Result list MUST contain only video-type bookmarks whose title / description / URL / notes / page content match `tutorial`. |
| User selects In current collection, then searches `recipe` | Only bookmarks inside that collection MUST match. The filter list MUST narrow to filters non-empty inside that collection. |
| User clicks a tag filter that has 0 matches in a different collection | The tag filter MUST NOT appear in that collection's filter list. |
| User selects `score` sort with no query | The system MUST refuse and revert to the previous sort or `-created`. |
| User selects `score` sort with a query, then clears the query | `score` MUST become unavailable; the system MUST revert to a non-score sort. |
| User on free plan clicks Broken Links filter | The system MUST surface a paywall explanation; it MUST NOT return broken-link results. |
| User on free plan searches a phrase that exists only inside page content | The system MUST NOT return that bookmark via page-content match; title / description / URL / notes are still matched. |
| User searches `#"machine learning"` | Bookmarks tagged with the exact tag string `machine learning` MUST match. |
| User searches `notag:true` and applies the Video filter | Result list MUST contain only video-type bookmarks with empty `tags`. |
| User searches `created:>2024-07-01 -type:video` | Bookmarks created after 2024-07-01 that are not videos MUST match. |
| User searches in Trash | Trash bookmarks MUST appear; non-Trash bookmarks MUST NOT appear. |
| User searches a query with a typo and gets no results | The system MUST display "No results" cleanly. Whether to suggest spelling corrections is 🔵 Planned. |
| User opens the address bar and types `rd` then Tab then `tutorial` | Up to 10 suggestions MUST appear, ranked by score, with match-emphasized titles. |
| User picks an omnibox suggestion and presses Cmd+Enter (or browser equivalent) | The bookmark URL MUST open in the new-foreground-tab disposition. |
| User submits an omnibox query with no matching results | The system MUST fall back to opening the in-app search results page for the query. |
| User changes a bookmark's title and re-runs an in-progress search | New results MUST reflect the change; the index MUST update. |
| Bookmark is moved to Trash mid-search | The bookmark MUST disappear from non-Trash result sets on next refresh. |
| Concurrent edits change tags on a bookmark while a `#tag` query is active | Result set MUST converge to the post-edit state on next refresh. |
| User searches inside a shared collection as a viewer (level 2) | Result set MUST reflect the bookmarks the viewer is permitted to see. |
| User constructs a query whose entire content is invalid (`title:` with no term) | The system MUST treat the malformed operator as a bare term or ignore it; it MUST NOT crash. |
| Filter list is requested for a collection containing 0 bookmarks | The filter list MUST be empty (no entries). The UI MUST display a clear "this collection is empty" state. |
| User searches for a tag whose count is 0 | Result list MUST be empty. The tag MUST NOT appear in the filter list. |
| User combines `match:OR` with three tag filters and a text query | All four predicates MUST combine with OR. Bookmarks matching any one MUST appear. |
| User pages past the last page of results | The system MUST clearly indicate "end of results"; it MUST NOT loop. |
| User triggers omnibox while not signed in | The system MUST surface a sign-in prompt rather than empty results. |
| User searches for `title:"foo bar" excerpt:baz` | Bookmarks whose title contains the phrase `foo bar` AND whose description contains `baz` MUST match. |

---

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| `query` | string | optional | Free-form. Empty string MUST be treated as "no text query". | Operators are parsed within. |
| `collectionId` | integer | optional | `0` for all-except-Trash, `-1` for Unsorted, `-99` for Trash, or a user collection ID. | Default `0`. |
| `nested` | boolean | optional | When `true`, include descendants of `collectionId` in scope. | Default 🟠 Product Decision. |
| `sort` | enum | optional | One of the sort enum values. | Default `-created`. `score` requires non-empty `query`. |
| `page` | integer | optional | ≥ 0. | Default `0`. |
| `perpage` | integer | optional | 1 ≤ value ≤ 50. | Default 50 or implementation-chosen ≤ 50. |
| `ids` | integer[] | optional | Used for batch operations and direct ID retrieval. | Not the primary search interface. |

## 12. Database / Schema Notes

### Enums

```ts
type Sort =
  | "-created"   // newest first (default)
  | "created"    // oldest first
  | "score"      // relevance, requires non-empty query
  | "-sort"      // manual order
  | "title"      // A→Z
  | "-title"     // Z→A
  | "domain"     // hostname A→Z
  | "-domain";   // hostname Z→A

type ContentType =
  | "article"
  | "image"
  | "video"
  | "audio"
  | "document"
  | "book";

type ResultGroup =
  | "bookmark"
  | "collection"
  | "tag"
  | "highlight"
  | "annotation";

type CacheStatus =
  | "ready"
  | "retry"
  | "failed"
  | "invalid-origin"
  | "invalid-timeout"
  | "invalid-size";
// Cache status values are owned by Web archive PRD; this PRD references the "ready" value.
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
| **Universal search field** | Persistent input at the top of every primary view; entry point for all queries. |
| **Search field options dropdown** | Surfaces "In current collection", "In title / description", and (where supported) "Ask AI / semantic" entry. |
| **Filter list (sidebar)** | Web / desktop dynamic filter list including Tags, Without tags, Attributes, Content type, Creation date, Library health. |
| **Filter sheet (mobile iOS)** | The mobile equivalent of the sidebar filter list, opened from the toolbar. |
| **Filter suggestions inline (mobile Android)** | Filter chips surfaced inline below the search field as the user taps it. |
| **Search results view** | The bookmark list reskinned with grouped multi-entity results above. |
| **No-results state** | Clear "no matches" indicator with copy explaining filters and Trash exclusion. |
| **Paywall message screen / modal** | Plan-gated Broken Links / Duplicates / page-content explanation. |
| **Omnibox suggestion list** | Browser-rendered suggestion list driven by the omnibox handler. |
| **Side panel search view** | Browser side-panel surface exposing the search field, filter list, and compact result rows. |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| **Search field** | Text input with clear control, scope dropdown, and (planned) operator auto-completion. |
| **Filter chip** | Single filter entry showing label and count; click to activate. Active state uses a distinct visual treatment. |
| **Without-tags chip** | Special filter chip surfacing untagged bookmarks. |
| **Favorites filter chip** | Heart-icon chip; equivalent to the `❤️` operator. |
| **Content-type chips** | Article / Image / Video / Audio / Document / Book. |
| **Date-range row** | Per-month chip list under Creation date. |
| **Library-health chips** | Broken Links and Duplicates chips with paywall affordance for free tier. |
| **Sort menu** | Dropdown with the eight sort options; `score` is shown only when a query is active. |
| **Result row** | Bookmark summary card with match-emphasized title and snippet. |
| **Result group header** | Section header showing entity type and result count. |
| **Pagination indicator** | Either infinite-scroll loader or numeric page navigation, depending on platform. |
| **Match emphasis tag** | Inline visual treatment around matched substrings in titles and snippets. |
| **Omnibox suggestion row** | Browser-rendered row showing match-emphasized title and URL. |
| **Filter overflow / "show more"** | When the dynamic tag list is long, a "show more" affordance MAY collapse the list. |

---

## 15. Workflow Requirements

Create, Edit, Delete, and Search are required core application operations. For this capability, **Search is the central operation**; Create / Edit / Delete apply to saved searches and saved filter presets.

| Operation | Required Behavior | Shared / Core Handling |
|---|---|---|
| **Create** | Saved searches and filter presets MAY be created. (🔵 Planned — see §12.) | Owned by this capability when introduced. |
| **Edit** | Saved searches MAY be renamed and re-edited. | Owned by this capability when introduced. |
| **Delete** | Saved searches MAY be deleted. | Owned by this capability when introduced. |
| **Search** | The system MUST support text query, field-scoped operators, tag operators, attribute operators, date operators, content-type operators, exclusion, OR-mode, exact phrase, and combination with active filters. | Owned by this capability. |

---

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|
| **Query parser service** | Implements the search query language. |
| **Search execution service** | Resolves scope, evaluates predicate, sorts, paginates. |
| **Filter list service** | Computes dynamic filter lists per scope and query. |
| **Index manager** | Maintains bookmark search, page-content, and PDF / EPUB indexes. |
| **Plan-tier guard** | Enforces paid-tier gating for content indexing and library-health filters. |
| **Multi-entity dispatcher** | Coordinates parallel bookmark / collection / tag / highlight / annotation searches. |
| **Permission guard** | Enforces shared-collection visibility. |
| **Throttle / rate limit module** | Limits unusually frequent search traffic. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| **Omnibox handler** | Implements the `rd` keyword + Tab integration: live suggestions during typing, final disposition on Enter. |
| **Suggestion renderer** | Produces match-emphasized titles for omnibox suggestion rows. |
| **Tab-disposition resolver** | Maps the user's gesture to current / new-foreground / new-background tab. |
| **Extension popup search field** | Optional search field in the extension popup; delegates to the same backend. |
| **Side panel search surface** | Compact search and filter UI in the browser side panel; uses the same parser, scope rules, and result shape as the main app. |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| **Search field component** | UI control with scope dropdown, clear control, and operator surfacing. |
| **Filter sidebar** | Dynamic sidebar reflecting filter list response. |
| **Search results view** | Result rendering with grouped multi-entity blocks. |
| **Sort menu** | Sort selector with `score` gating logic. |
| **Pagination controller** | Infinite scroll or paged navigation. |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| **iOS search & filter sheet** | Search field at top; Filter sheet from top-right toolbar. |
| **Android search field with inline filter chips** | Search field at top; tapping the field surfaces filter suggestions. |
| **Mobile result list** | Infinite-scroll list with match-emphasized rows. |
| **Mobile paywall handling** | Inline paywall messaging for plan-gated filters. |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| **Search index storage** | Storage and retrieval primitives for inverted indexes. |
| **Index update queue** | Async job queue for re-indexing bookmarks when fields change or when web archive copies become ready. |
| **Plan-tier policy** | Centralized definition of what each tier can search and filter. |
| **Observability module** | Logs anonymized query patterns, latency metrics, and failure modes. |
| **Match-emphasis renderer** | Shared utility for wrapping matched substrings in result rows and omnibox suggestions. |

---

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| **Search query parser** | Tokenizes the raw search string, recognizes operators, exclusions, quoted phrases, and the `match:OR` modifier; produces a structured `ParsedQuery`. |
| **Predicate evaluator** | Evaluates a `ParsedQuery` against a candidate bookmark set, returning IDs and relevance scores. |
| **Scope resolver** | Resolves `collectionId` plus `nested` plus shared-collection access into a candidate bookmark set. |
| **Bookmark search index** | Inverted index over bookmark `title`, `excerpt`, `link`, `note`. |
| **Tag index integration** | Reuses the tag index (owned by **Tags PRD**) for tag operators and the dynamic tag filter list. |
| **Page-content index** | Inverted index over indexed page-content text, populated asynchronously after web archive readiness. Plan-gated. |
| **PDF / EPUB content index** | Inverted index over text extracted from uploaded PDF and EPUB files. Plan-gated. |
| **Content-type detector** | Classifies bookmarks as Article / Image / Video / Audio / Document / Book based on metadata, MIME, and source URL signals. |
| **Date bucket aggregator** | Computes per-month creation-date buckets for the dynamic filter list. |
| **Library-health flag store** | Maintains `broken` and `duplicate` flags per bookmark for the corresponding filters. Owned by **Duplicates & Broken Links PRD**; exposed to this capability via a read interface. |
| **Filter list aggregator** | Computes the dynamic filter list (tag, type, attribute, date, library health) and counts for the current scope and query. |
| **Sort engine** | Applies the requested `sort` to result sets, enforcing the `score`-requires-query rule and stable ordering across pages. |
| **Pagination engine** | Pages results with stable offset semantics and surfaces an end-of-results signal. |
| **Multi-entity search dispatcher** | Routes a single query to bookmark, collection, tag, highlight, and annotation searchers and assembles the grouped response. |
| **Match fragment renderer** | Produces match-emphasized title / snippet HTML for result rows and omnibox suggestions. |
| **Omnibox handler** | Implements the browser address-bar `rd` keyword integration: `onInputChanged` for live suggestions, `onInputEntered` for final disposition. |
| **Tab-disposition resolver** | Maps the user's gesture (Enter, Cmd+Enter, middle-click equivalent) to current-tab / new-foreground-tab / new-background-tab dispositions. |
| **Plan-tier guard** | Enforces that page-content, PDF / EPUB, Broken Links, and Duplicates queries are refused on free tier and surfaced as paywall messaging. |
| **Permission guard** | Enforces shared-collection visibility: result sets MUST reflect the requesting user's `access.level`. |
| **Re-index worker** | Recomputes index entries when bookmark fields change or when web archive copies become ready. |
| **Throttle / rate limiter** | Caps unusually frequent search requests and surfaces feedback. |
| **Observability module** | Logs query patterns (anonymized), failure modes, index lag, and partial-results conditions for debugging. |

---

## 19. OSS / Build-vs-Buy Decision

1. **Primary search engine: Meilisearch (AGPL, self-hosted).** Meilisearch is the chosen search backend. It is a Rust binary that ships as a single executable, making it straightforward to self-host on Plenix infrastructure. License classification: **self-hosted service** — Meilisearch runs as a server process alongside the Plenix backend; Plenix does not embed Meilisearch source into its own codebase, so AGPL copyleft does not extend to Plenix's application code. Study the Meilisearch documentation for index configuration, search parameter API, and update webhook patterns before writing the search execution service.

2. **Acceptable alternative: Typesense (GPL v3, self-hosted).** Typesense is a C++ search engine with comparable feature parity — typo tolerance, faceted search, geo search, autocomplete, and vector search. License classification: **self-hosted service** (same reasoning as Meilisearch; GPL v3 does not extend to Plenix code when Typesense is run as a standalone server). If Meilisearch is dropped for any reason, Typesense is a drop-in conceptual substitute, though the API shape differs and the integration layer would need to be re-skinned. Prefer Meilisearch: it has a larger community (58k stars vs. 26k), better documentation, and the Rust binary is more portable across deployment targets.

3. **Keep the search index entirely on Plenix infrastructure.** Both Meilisearch and Typesense are self-hosted. The search index — which contains all bookmark titles, descriptions, notes, URLs, page content, tags, and eventually messages, contacts, and files — MUST NOT be sent to a third-party search SaaS (Algolia, Elasticsearch Cloud, etc.). This is a hard architectural constraint: user data stays on Plenix servers.

4. **Use hybrid search (keyword + vector) from the start.** Meilisearch supports hybrid search combining BM25 keyword scoring with vector/semantic embeddings in a single query. This is the technical foundation for the "semantic / AI natural-language search" entry in the feature table (F34, currently Not Defined). Wire up the vector dimension even before the AI search surface ships — retrofitting embeddings into an already-live index is painful. Decide on an embedding model (local inference vs. an API call) as a separate product decision, but reserve the index shape for it now.

5. **Universal search indexes ALL Plenix content, not just bookmarks.** The search index must be designed for a multi-entity, multi-content-type corpus from day one: notes, tasks, files, contacts, emails, messages, bookmarks, and documents. The current PRD scopes search to bookmarks and a handful of related entities (collections, tags, highlights, annotations), but the underlying Meilisearch index configuration MUST use separate indexes per entity type (Meilisearch's recommended pattern) with a federated search call at query time. Retrofitting a multi-entity model onto a bookmark-only index is a significant re-architecture.

6. **Key architectural decision — query parser is Plenix-native; Meilisearch receives a normalized query, not raw user text.** The operator language defined in §5.2–5.5 (`title:`, `#tag`, `notag:true`, `match:OR`, date operators, etc.) is Plenix-specific. The query parser service (§9, §11.1) translates the `ParsedQuery` structure into Meilisearch search parameters (`filter`, `q`, `sort`, `matchingStrategy`, etc.). Meilisearch must never receive raw, unvalidated user query text — this layer is also the plan-tier guard and the scope resolver.

7. **Integration pattern — thin async HTTP client, not a native SDK.** Call Meilisearch over its REST API from the Plenix server. Do not embed the Meilisearch JavaScript/Rust SDK as a hard dependency in the application layer; wrap it in a search adapter interface so the engine can be swapped or mocked in tests. The index update queue (§9, §11.5) sends document upserts and deletes to Meilisearch asynchronously; the Meilisearch task queue handles the indexing commitment. Poll or webhook for task completion rather than blocking the HTTP request thread.

8. **Treat search and filters as a single capability with two surfaces.** The operator language is the canonical query model — every sidebar filter chip is a UI shortcut for an operator combination. Implement the parser first; the UI affordances feed the same `ParsedQuery`. The dynamic filter list (facets in Meilisearch terminology) is computed via Meilisearch's `facetDistribution` feature on the same query call that returns search results; this means the filter list and result set are always in sync without a second round trip.

9. **Omnibox handler is a tight latency budget — Meilisearch sub-50ms responses are the design assumption.** Each address-bar keystroke triggers a search suggestion call. Meilisearch's documented sub-50ms response time (on well-configured hardware) is what makes this viable. Cap omnibox queries at 10 results, skip the multi-entity dispatcher, and route directly to the bookmark index with `sort: ["_relevance:desc"]` and `limit: 10`. Do not add facet distribution or filter-list computation to the omnibox code path.

10. **Warning — AGPL license boundary must be maintained.** Meilisearch is AGPL v3. Running it as a network service is safe under AGPL when Plenix's code does not incorporate Meilisearch source. Do not fork or patch Meilisearch; use only its published binary or Docker image. If a bug or missing feature requires a code-level fix to Meilisearch, the fix must be contributed upstream and the modified source published — otherwise the AGPL obligation applies. Legal review is required before vendoring any Meilisearch source file.

11. **Warning — platform fragility: Meilisearch API surface can change between major versions.** Meilisearch has had breaking API changes between major releases (v0.x to v1.x involved significant migration). Pin the Meilisearch server version in the deployment configuration and test upgrades in a staging environment before production rollout. The search adapter interface (note 7) isolates the breakage surface.

12. **What Plenix builds natively vs. defers to Meilisearch.** Plenix builds natively: the query parser, plan-tier guard, scope resolver, permission guard, index update queue, and the match-emphasis renderer. Plenix defers to Meilisearch: BM25 relevance scoring, typo tolerance, faceted counts, pagination, vector similarity (when enabled), and the physical inverted index. Plenix does not build its own relevance engine or inverted index. The only exception would be if Meilisearch cannot express a required filter predicate — in that case, post-filter in the Plenix server layer, not by rebuilding a search engine.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| **Bookmarks PRD** | Search and filters operate over the bookmark store; their primary result list is bookmarks. The bookmark `tags`, `important`, `note`, `highlights`, `reminder`, `media`, and `cache` fields are the filter inputs. |
| **Tags PRD** | The list of tags applied to bookmarks supplies the dynamic per-tag filter list and powers tag-scoped search operators (`#tag`, `-#tag`, `notag:true`). |
| **Collections PRD** | Search MAY be scoped to a single collection. The system collections (`0` All except Trash, `-1` Unsorted, `-99` Trash) and the `nested` parameter are owned there; this capability uses them. |
| **Highlights PRD** | The `highlights:true` attribute filter and the cross-type "highlights" search results depend on highlight presence on bookmarks. |
| **Web archive PRD** | Page content / PDF / EPUB indexing requires a saved web archive copy; the `cache.status:ready` operator depends on web archive state. |
| **Duplicates & Broken Links PRD** | The Broken links and Duplicates filters surface counts that capability owns. |
| **Reminders PRD** | The `reminder:true` attribute filter depends on reminder state on bookmarks. |
| **Files PRD** | The `file:true` operator depends on the file flag on bookmarks. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| **Bookmarks PRD** | The bookmark list view consumes search and filter state to display the filtered/sorted/paginated bookmark set. |
| **Browser Extension / Mobile Capture PRD** | The omnibox keyword integration (`rd` + Tab) is implemented through this capability's search service. |
| **Sharing / Collaboration PRD** | Collaborator-scoped views apply this capability's filter and search rules over the visible-bookmark subset. |
| **Public Page / Embed PRD** | Public pages MAY surface filters and search over the published bookmark subset. |

### Related Capabilities

| Capability | Relationship |
|---|---|
| **Tags PRD** | Tag operations (rename, merge, delete) belong there; tag-as-filter and tag operators live here. |
| **Duplicates & Broken Links PRD** | Detection and management workflow live there; the filter surfaces live here. |
| **AI Assistant capability** (out of current PRD scope) | A natural-language search and semantic-meaning-search interface is conceptually adjacent; this PRD defines only the structured operator-based search. |

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
| Stop-word dropping | 🔴 Not Defined | Whether common terms like "the", "and", "is" are dropped from queries. |
| Default case sensitivity | 🟠 Product Decision | Whether bare-term and operator-value matches are case-insensitive by default. Recommendation: case-insensitive. |
| Default diacritic folding | 🟠 Product Decision | Whether `cafe` matches `café` by default. |
| Stemming / lemmatization | 🟠 Product Decision | Whether `running` matches `run`. Affects relevance scoring quality. |
| `nested` scope default | 🟠 Product Decision | Whether searches inside a collection include descendants by default or require explicit opt-in. |
| Sort persistence across sessions | 🟠 Product Decision | Whether the chosen sort persists across sessions per-collection or resets. |
| Filter inversion via UI click | 🟠 Product Decision | Whether clicking an active filter once more inverts (excludes) it, or only deactivates it. |
| Default filter sort for content types | 🟠 Product Decision | Alphabetical, by-count, or fixed canonical order. |
| Recent searches persistence | 🟠 Product Decision | Whether to persist a user's recent queries across sessions and across devices. |
| Operator auto-completion in the search field | 🔵 Planned | Suggest `type:`, `created:`, `#`, `link:`, etc. as the user types. |
| Saved searches / filter presets | 🔵 Planned | Persist a named query + filter combination. |
| Spelling correction / "did you mean" | 🔵 Planned | Whether to suggest corrections when a query yields no results. |
| Semantic / AI natural-language search | 🔴 Not Defined | A meaning-based search interface. Conceptually planned but not specified in this PRD. |
| Per-language analyzer choice | 🟠 Product Decision | Whether the index uses language-specific tokenization for non-English bookmarks. |
| OR-mode UI affordance | 🟠 Product Decision | Whether a toggle is exposed as a chip in the filter list, only as the `match:OR` operator, or both. |
| Trash search keyboard shortcut | 🔴 Not Defined | Whether a shortcut jumps directly to Trash search. |
| Per-collection default sort | 🟠 Product Decision | Whether each collection can have its own default sort independent of the user-wide default. |
| Highlight search result navigation | 🟠 Product Decision | Whether clicking a highlight result opens the parent bookmark, the reader view, or the highlight in-place. |
| Match-emphasis HTML format | 🟠 Product Decision | Tag name to wrap matched substrings (`<em>`, `<mark>`, custom). |
| Address-bar omnibox keyword | ✅ Decided | The activation keyword is `rd` followed by Tab in supported browsers. |
| `score` sort requires query | ✅ Decided | Selecting `score` without a query MUST be refused. |
| Trash exclusion from default search | ✅ Decided | Trash bookmarks MUST be excluded unless explicitly viewed. |
| OCR support | ✅ Decided | Not supported. |
| Audio / video transcript indexing | ✅ Decided | Not supported. |
| Page-content indexing latency | ✅ Decided | "A few minutes" is acceptable user-facing wording; SLA target is 🟠 Product Decision. |
| Plan-tier gating (page content, broken, duplicates) | ✅ Decided | Paid plan only. |
| Maximum page size | ✅ Decided | 50. |
| Default sort | ✅ Decided | `-created`. |
| Omnibox suggestion count | ✅ Decided | Up to 10. |

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
