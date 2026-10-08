# 07 — Reader / Articles PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Reader / Articles |
| **Capability ID** | reader_articles |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-05-02 |
| **Revision summary** | Full specification with features, functionality, scenarios, and enablers |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST allow users to read any saved web article in a clean, ad-free, customizable preview surface — independent of the original page's chrome — and MUST provide an equivalent preview surface for video, PDF, EPUB, and image content. The preview surface MUST host highlight gestures, AI-assisted chat about the content, and fast access from any bookmark on any platform.

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

### UC-01 — Open the reader on a saved article (web / desktop)

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Read a saved article in a clean preview, free of ads and clutter. |
| Main Flow | 1. User locates a bookmark in any collection or list. 2. User right-clicks the bookmark and selects **Preview**. 3. The reader opens with the parsed article body. |
| System Response | The reader renders the article using the user's saved theme, font, and text-size preferences. Saved highlights, if any, render inline. |
| Alternate Flow | If the bookmark's content type is `video`, `image`, `document`, or the bookmark backs a file upload, the reader renders the appropriate surface for that type rather than article text. |

### UC-02 — Open the reader on a saved article (mobile)

| Item | Detail |
|---|---|
| Actor | iOS or Android user with the in-app browser setting enabled. |
| Goal | Read a saved article on mobile in a clean preview. |
| Main Flow | 1. User taps a bookmark. 2. The reader opens automatically with the parsed article body when one is available. |
| System Response | Same chrome and rendering as web / desktop, adapted for mobile. |
| Alternate Flow | If no parsed body is available (e.g. paywalled, parse failed), the original page MUST load instead. The user MAY return to the bookmark detail view and trigger Refresh preview. |

### UC-03 — Adjust reader appearance (theme, font, size)

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Make the reader comfortable for current conditions (lighting, eyes, screen). |
| Main Flow | 1. User opens the reader. 2. User opens the action toolbar. 3. User changes theme, font, or text size. |
| System Response | The reader re-renders with the new preference. The choice MUST persist across sessions and devices. |
| Alternate Flow | The user MAY revert to defaults via a reset action. |

### UC-04 — Add a highlight inside the reader

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Capture a passage from the article for later reference. |
| Main Flow | Owned by **Highlights PRD UC-02**. From this PRD's perspective, the reader MUST expose the text-selection gesture and the highlight color picker and MUST render the saved highlight inline immediately. |
| System Response | The highlight is persisted; the reader re-renders with the new highlight visible. |
| Alternate Flow | None. |

### UC-05 — Ask the AI about the article

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Summarize, extract key points, translate, or ask a question about the article. |
| Main Flow | 1. User opens the reader. 2. User switches to the **Ask** tab. 3. The AI Assistant capability handles the chat. |
| System Response | The reader hosts the chat surface; the underlying AI behavior is owned by **AI Assistant PRD**. |
| Alternate Flow | If the AI capability is unavailable (plan, outage), the Ask tab MUST surface a clear unavailability state and the user MUST be able to keep reading without interruption. |

### UC-06 — Refresh the preview

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Re-extract the parsed article body when the saved version is missing, wrong, or stale. |
| Main Flow | 1. User right-clicks the bookmark (web / desktop) or opens the bookmark action menu (mobile). 2. User selects **Refresh preview**. 3. The system re-fetches the source URL and re-parses the body. |
| System Response | The reader updates with the new parsed body. Saved highlights re-anchor where possible (per F32). |
| Alternate Flow | If the source URL is unreachable or has become paywalled, the system MUST NOT silently delete the previously-parsed body. The previous body MUST remain available, and the user MUST be told the refresh failed. |

### UC-07 — Open the original page from the reader

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Leave the reader and visit the source URL in a real browser. |
| Main Flow | 1. User opens the reader. 2. User selects **Open original** from the action toolbar. 3. The system opens the source URL in a new tab (web / desktop) or the system browser (mobile). |
| System Response | The reader remains open or closes per platform convention. The original source URL is opened. |
| Alternate Flow | None. |

### UC-08 — Read on mobile when in-app browser is disabled

| Item | Detail |
|---|---|
| Actor | iOS or Android user with the in-app browser setting disabled. |
| Goal | (Negative case) The user expects the reader but it does not appear. |
| Main Flow | 1. User taps a bookmark. 2. The system opens the original URL in the system browser instead of the in-app reader. |
| System Response | The user MUST be able to discover and toggle the in-app browser setting in the app's settings (iOS: Settings → Browser → Open links in → the application; Android: Settings → Open in browser → In app). |
| Alternate Flow | None. |

### UC-09 — Try to read a paywalled article

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | (Negative case) The article is behind a paywall. |
| Main Flow | 1. User saves a paywalled URL. 2. The system attempts to parse the publicly-accessible portion. 3. If insufficient content is available, the bookmark is saved without a parsed body. 4. User opens the reader. |
| System Response | The reader surfaces a clear "no preview available" state with an "Open original" affordance. The bookmark itself remains saved with title, URL, and (where available) thumbnail. |
| Alternate Flow | The user MUST NOT be able to invoke any system feature that bypasses the paywall. |

### UC-10 — Read a video bookmark in the reader

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Watch a saved video without leaving the application. |
| Main Flow | 1. User opens the reader on a video-type bookmark. 2. The system renders an inline player using the bookmark's `media[]` URLs or platform-recognized embed. |
| System Response | The video plays inline with standard transport controls. |
| Alternate Flow | If embedding is not possible, the user MUST be offered the **Open original** action to play in a real browser. |

### UC-11 — Read an image bookmark in the reader

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | View a saved image at full resolution. |
| Main Flow | 1. User opens the reader on an image-type bookmark. 2. The system renders the image inline. |
| System Response | The image renders at full resolution; the user MAY zoom or pan. |
| Alternate Flow | None. |

### UC-12 — Read a PDF or EPUB inside the reader chrome

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Read an uploaded PDF or EPUB with the reader's theme and text-size controls. |
| Main Flow | 1. User opens the reader on a file-backed bookmark with `type: "document"` or `type: "book"`. 2. The PDF or EPUB viewer (owned by **Files PRD**) renders inside the reader chrome. 3. The user MAY adjust theme, font, or text size where the underlying viewer supports it. |
| System Response | The viewer renders the file. Highlights, the action toolbar, and the Ask tab all integrate as for articles. |
| Alternate Flow | When the underlying viewer cannot honor a chrome control (e.g. PDF text-size in a fixed-layout document), the control MUST be hidden or disabled with a clear explanation rather than silently ignored. |

### UC-13 — Manually reclassify a bookmark's content type

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Override the auto-classification when the system gets it wrong. |
| Main Flow | 1. User edits the bookmark and changes its `type` field. 2. The reader chrome adjusts on next open. |
| System Response | A bookmark reclassified from `article` to `video` MUST surface the video player on next reader open; conversely a `video` reclassified to `article` MUST attempt to surface the parsed article body where one exists. |
| Alternate Flow | If the new `type` has no parseable content available (e.g. `article` reclassification on a URL whose parsed body is empty), the reader MUST fall back to "no preview available" rather than silently rendering the wrong surface. |

### UC-14 — Reader on a bookmark in a shared collection

| Item | Detail |
|---|---|
| Actor | Collaborator with read access (level ≥ 2) on a shared collection. |
| Goal | Read an article that another collaborator saved. |
| Main Flow | 1. Collaborator opens the bookmark from the shared collection. 2. The reader renders the parsed article body. |
| System Response | The reader works identically; theme/font/size preferences are the *viewing* user's preferences, not the saver's. |
| Alternate Flow | The collaborator MAY add their own highlights per **Highlights PRD** sharing rules. |

### UC-15 — Open the reader from search results and return to the same query

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Read one of many search results without losing the search context. |
| Main Flow | 1. User runs a search and scrolls to a deep result. 2. User opens the reader on a result. 3. User reads. 4. User closes the reader. |
| System Response | The user MUST be returned to the same search query, the same result list, and the same scroll position (where practical). The search field MUST still contain the original query. |
| Alternate Flow | The same return-context behavior MUST apply when the reader was opened from an active filter, a collection view, or a highlight jump. If the prior list was refreshed or invalidated while the reader was open, the system SHOULD return to the closest equivalent context rather than the top-level library. |

---

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Auto-detect article-type bookmarks at save time** | ✅ Built | The system MUST analyze the saved page and assign a content-type classification (`article`, `video`, `image`, `document`, `audio`) without user action. |
| F02 | **Clean article reader (web / desktop)** | ✅ Built | The system MUST render a saved article in a clean, ad-free, sidebar-free preview surface that strips the original page's chrome. |
| F03 | **Clean article reader (iOS)** | ✅ Built | iOS MUST open the same preview surface when the user taps a bookmark with an article-type classification. |
| F04 | **Clean article reader (Android)** | ✅ Built | Android MUST open the same preview surface when the user taps a bookmark with an article-type classification. |
| F05 | **Activation via right-click → Preview (web / desktop)** | ✅ Built | The reader MUST be reachable from a bookmark's right-click context menu via a **Preview** action. |
| F06 | **Activation via tap-to-open (mobile)** | ✅ Built | On iOS and Android, tapping a bookmark MUST open the reader automatically when a parsed body is available; otherwise the original page loads. |
| F07 | **Theme control** | ✅ Built | The reader MUST expose a theme selector with at least light, dark, and sepia options. |
| F08 | **Font control** | ✅ Built | The reader MUST expose a font-family selector with at least serif, sans-serif, and monospace options. |
| F09 | **Text-size control** | ✅ Built | The reader MUST expose a text-size adjustment with at least 5 discrete steps. |
| F10 | **Persist reader preferences per user** | ✅ Built | Theme, font, and text-size choices MUST persist across sessions and devices for the signed-in user. |
| F11 | **Article body persisted at save time** | ✅ Decided | The parsed article body MUST be persisted at the time the bookmark is created. Subsequent loss of the original page (deletion, paywall, takedown) MUST NOT remove the saved reader content. |
| F12 | **Refresh preview** | ✅ Built | The user MUST be able to trigger a re-extraction of the parsed article body from the original URL via a **Refresh preview** action. |
| F13 | **Paywalled content not parsed** | ✅ Decided | The system MUST NOT attempt to bypass paywalls. Pages that are not publicly accessible at parse time MUST NOT have a parsed article body, and the reader MUST surface a clear "no preview available" state. |
| F14 | **Reader hosts highlights** | ✅ Built | The reader MUST host the text-selection gestures and inline rendering required for highlights inside articles, PDFs, and EPUBs (per **Highlights PRD**). |
| F15 | **Highlight overlay rendering** | ✅ Built | Saved highlights MUST be rendered inline at their saved positions whenever the reader is opened on a bookmark that has highlights. |
| F16 | **Reader for video** | ✅ Built | When a bookmark's content type is `video` and a viewable preview is available (e.g. embedded player or platform-recognized video), the reader MUST render an inline player rather than the original page. |
| F17 | **Reader for image** | ✅ Built | When a bookmark's content type is `image` and an image is reachable, the reader MUST render the image inline at full resolution. |
| F18 | **Reader for PDF / EPUB (file uploads)** | ⚪ Capability Split | The PDF and EPUB viewer renderers are owned by **Files PRD §5.5**. This PRD provides the surrounding reader chrome (theme, font, text size, action toolbar, Ask tab integration). |
| F19 | **"Ask" tab — AI chat about the article** | ⚪ Capability Split | The AI chat capability that lets the user summarize, extract key points, translate, or ask questions about the article is owned by the **AI Assistant PRD**. This PRD owns the tab affordance inside the reader. |
| F20 | **Articles filter** | ⚪ Capability Split | Surfacing only article-type bookmarks via `type:article` is owned by **Search & Filters PRD §3 F09 Type filters**. |
| F21 | **Body-text search** | ⚪ Capability Split | Full-text search across parsed article bodies is owned by **Search & Filters PRD §3 F11 Page-content search**. Plan-gated. |
| F22 | **In-app browser setting (mobile)** | ✅ Built | iOS and Android MUST expose a per-user setting that determines whether tapped bookmarks open in the in-app reader / browser or in the system browser. The reader is only reachable when in-app browsing is enabled. |
| F23 | **Action toolbar inside reader** | ✅ Built | The reader MUST expose an action toolbar with at least: change theme/font/size, refresh preview, open original page, share, and reach the Ask tab. |
| F24 | **Open original page from reader** | ✅ Built | The user MUST always be able to leave the reader and open the original source URL in a new tab or in the system browser. |
| F25 | **Reader scroll position persistence** | 🟠 Product Decision | Whether the reader remembers per-bookmark scroll position across sessions is not pinned. |
| F26 | **Reading-time estimate** | 🟠 Product Decision | Whether the reader displays an estimated reading time (e.g. "5 min read") is not pinned. |
| F27 | **Tracking-pixel and ad stripping** | ✅ Decided | The reader MUST NOT load third-party trackers, ads, or analytics scripts from the original page. |
| F28 | **Inline images preserved** | ✅ Built | Inline images that are part of the article body MUST be preserved and rendered in the reader. |
| F29 | **Inline embeds (tweets, code blocks, videos)** | 🟠 Product Decision | How the reader handles inline embeds (re-embed, render as link, strip) is not pinned. Recommendation: render code blocks and quoted tweets inline; strip third-party trackers from embed origins. |
| F30 | **Reader-mode keyboard shortcuts (web / desktop)** | 🔴 Not Defined | Whether the reader exposes keyboard shortcuts (next/previous bookmark, jump to highlights, toggle theme) is not defined. |
| F31 | **Audio bookmark playback inside reader** | 🔴 Not Defined | Whether bookmarks classified as `audio` get an inline player inside the reader is not defined. |
| F32 | **Re-anchoring of saved highlights on refreshed body** | 🟠 Product Decision | When the user runs Refresh Preview and the parsed body changes, whether saved highlights re-anchor automatically, are flagged as stale, or are silently dropped is not pinned. Recommendation: re-anchor where possible; flag as stale otherwise; never silently drop. |
| F33 | **Manual reclassification of content type** | ⚪ Capability Split | The user MAY override the auto-classified content type via bookmark edit per **Bookmarks PRD**. The reader chrome adjusts accordingly. |
| F34 | **Reader available offline (cached)** | 🔴 Not Defined | Whether the parsed article body is cached on-device for offline reading is not defined. |
| F35 | **TTS / read-aloud** | 🔴 Not Defined | Text-to-speech reading of an article inside the reader is not defined. |
| F36 | **Return-context preservation** | ✅ Built | When the user opens the reader from a list (collection view, search results, an active filter, or a highlight jump), closing the reader MUST return the user to the prior list and, where practical, the prior scroll position. The reader MUST NOT dump the user back to the top-level library. |

---

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Content-type classification

| Rule | Behavior |
|---|---|
| Source of truth | The auto-classified `type` lives on the wrapping bookmark and follows **Bookmarks PRD §8** field rules. |
| Allowed values | `link` (default for unknown), `article`, `video`, `image`, `document`, `audio`, `book`. The values `document` and `book` are also used by **Files PRD §5.9** for file-backed bookmarks. |
| Classification timing | Classification MUST run server-side at bookmark save time, transparent to the user. |
| Inputs | The classifier MAY use HTML `<meta>` tags (Open Graph, Twitter Card, oEmbed), MIME type, structural cues (article markup density, headline + body pattern), and (for file-backed bookmarks) extension-based rules from **Files PRD §5.9**. |
| Override | The user MAY manually change the `type` via bookmark edit. Manual override MUST persist across re-classification runs (e.g. Refresh preview MUST NOT silently revert a user-set `type`). |
| Classification failure | If classification cannot determine a type with reasonable confidence, the bookmark `type` MUST default to `link`. |

### 5.2 Article body extraction

| Rule | Behavior |
|---|---|
| Trigger | Article body extraction MUST run when the wrapping bookmark is created and whenever the user invokes Refresh preview. |
| Persistence | The parsed article body MUST be persisted server-side at the time the bookmark is created. It MUST remain available even if the original page later becomes unreachable, paywalled, or deleted. |
| Eligibility | Extraction is attempted on bookmarks classified as `article`. The system MAY also extract a body for bookmarks not yet classified, to use the extraction success as a classification signal. |
| Storage layer | The parsed body is logically distinct from the full web archive snapshot (owned by **Web archive PRD**). Both MAY be derived from the same fetch but serve different surfaces (reader vs. archived copy). |
| Failure | If extraction returns insufficient content (paywall, login wall, JavaScript-only render, antibot block), the bookmark MUST NOT be persisted with a misleading partial body. The reader MUST surface "no preview available." |
| Sanitization | The persisted body MUST be sanitized to remove `<script>`, event handlers, third-party trackers, and ad iframes before storage. |

### 5.3 Reader chrome and controls

| Control | Behavior |
|---|---|
| Theme | At least three options: light, dark, sepia. The user's choice MUST persist per user across sessions and devices. |
| Font | At least three options: serif, sans-serif, monospace. The user's choice MUST persist per user. |
| Text size | At least 5 discrete steps. The user's choice MUST persist per user. |
| Action toolbar | MUST expose: change theme / font / size, refresh preview, open original, share, reach the Ask tab. |
| Tabs | MUST expose at minimum: **Read** (the article body) and **Ask** (the AI chat surface, per **AI Assistant PRD**). MAY expose additional tabs (highlights list, original source preview). |
| Reset | The user MAY reset reader preferences to defaults via a single action. |

### 5.4 Activation paths per platform

| Platform | Default activation |
|---|---|
| Web / Desktop | Right-click a bookmark → **Preview**. The reader is NOT a primary navigation; it is reached from the context menu (or equivalent action button on the bookmark card). |
| iOS | Tap a bookmark with the in-app browser setting set to the application. The reader opens automatically when a parsed body is available; the original page loads otherwise. |
| Android | Same pattern as iOS. The in-app browser setting MUST be enabled. |
| Browser Extension | Not a primary reader surface. The extension MAY link out to the reader inside the application. |

### 5.5 Refresh preview

| Rule | Behavior |
|---|---|
| Trigger | The user invokes Refresh preview from the bookmark's right-click menu (web / desktop), the bookmark action menu (mobile), or the reader's action toolbar. |
| Behavior | The system MUST re-fetch the source URL and re-run extraction. |
| Successful refresh | The new parsed body replaces the old one. The bookmark's `lastUpdate` MUST advance. |
| Failed refresh | If the source URL is unreachable or returns insufficient content, the previously-parsed body MUST NOT be deleted. The user MUST be informed of the failure. |
| Highlight re-anchoring | When the parsed body changes meaningfully, saved highlights SHOULD be re-anchored using the algorithm in **Highlights PRD §5.4** (best-effort). Highlights that cannot re-anchor MUST be flagged as stale rather than silently deleted. |
| Refresh on classification change | A user reclassifying `link` → `article` MAY trigger an automatic Refresh preview attempt to populate a missing body. |

### 5.6 Paywalled and login-walled content

| Rule | Behavior |
|---|---|
| Bypass forbidden | The system MUST NOT include any mechanism (header spoofing, account credentials, scraping evasion) intended to bypass paywalls or login walls. |
| Detection | The extractor SHOULD detect common paywall and login-wall patterns and refuse to persist a partial body that misrepresents the article. |
| User communication | The reader MUST surface a clear "no preview available" state with an Open Original affordance. The bookmark itself MUST remain fully saved (title, URL, thumbnail where available). |
| Manual override | The user MUST NOT have a "force parse" affordance. The Refresh preview action retries the same extraction; it does not change the access model. |

### 5.7 Reader for non-article content types

| Type | Reader Behavior |
|---|---|
| `article` | Cleaned article body with theme / font / size controls and inline highlights. |
| `video` | Inline player using the bookmark's `media[]` URLs or a platform-recognized embed. Theme / font / size controls MAY be hidden when not meaningful. |
| `image` | Inline image at full resolution; the user MAY zoom and pan. |
| `document` (file-backed) | PDF or in-app document viewer per **Files PRD §5.5**, wrapped in this PRD's reader chrome. |
| `book` (file-backed) | EPUB viewer per **Files PRD §5.5**, wrapped in this PRD's reader chrome. |
| `audio` | 🔴 Not Defined. Whether `audio`-type bookmarks get an inline player is open. |
| `link` (no parsed body) | Reader surfaces "no preview available" with Open Original. |

### 5.8 Highlights inside the reader

| Rule | Behavior |
|---|---|
| Surface | The reader MUST host text-selection gestures wherever the underlying surface supports text selection (article body, PDF, EPUB, plain-text and Markdown file viewers). |
| Identity and lifecycle | Owned by **Highlights PRD**. |
| Inline rendering | When the reader opens on a bookmark that has highlights, every saved highlight MUST be rendered at its anchored position with its persisted color. |
| Highlight click | Tapping or clicking a rendered highlight MUST surface the action toolbar defined in **Highlights PRD §5.9**. |
| Re-anchoring failures | A highlight whose anchor cannot be resolved on the current body MUST still appear in the per-bookmark highlights list (per **Highlights PRD §5.7**); inline rendering is best-effort. |

### 5.9 The "Ask" tab

| Rule | Behavior |
|---|---|
| Surface | The reader MUST expose an **Ask** tab adjacent to the **Read** tab. |
| Backend | The chat behavior is owned by **AI Assistant PRD**. This PRD owns the tab affordance and the integration handoff (current bookmark `_id`, parsed body content, source URL). |
| Plan gating | Plan gating of the AI capability is owned by **AI Assistant PRD**. The reader MUST NOT pretend the Ask tab works when the user's plan does not include it; an unavailability state MUST be surfaced clearly. |
| Privacy | The body content sent to the AI capability is the parsed article body, not the user's other bookmarks or notes. |

### 5.10 Browser extension chat affordance

| Rule | Behavior |
|---|---|
| Where | The browser extension MAY surface a chat affordance inside the save / edit popup that opens an Ask conversation about the current page. |
| Backend | Same AI capability as the reader's Ask tab (per **AI Assistant PRD**). |
| Difference from reader | The extension affordance operates on the active browser tab's URL even before the bookmark is saved; the reader operates on a saved bookmark's parsed body. |

### 5.11 Reader preferences persistence

| Rule | Behavior |
|---|---|
| Scope | Theme, font, and text-size choices MUST persist per user across sessions and devices. |
| Reset | The user MUST be able to reset all reader preferences to defaults. |
| Per-bookmark | The system MUST NOT persist per-bookmark preferences by default. (A future feature could allow per-collection or per-bookmark overrides; out of scope here.) |
| Public viewers | When a public viewer (anonymous, non-signed-in) opens the reader on a public bookmark, system defaults MUST be used; no preferences are persisted for them. |

### 5.12 Sharing and access

| Rule | Behavior |
|---|---|
| Read access | A user MAY open the reader on any bookmark whose parent collection grants them at least read access (`access.level >= 2`). |
| Refresh access | A user MAY invoke Refresh preview only when they have at least edit access (`access.level >= 3`) on the parent collection. Refresh changes persisted server-side state. |
| Public collections | When a collection is public, anonymous viewers MAY open the reader on its bookmarks (per **Public Page / Embed PRD**). |
| Highlights inside shared bookmarks | Visible per **Collections PRD §6.7** access rules; highlight write rights are governed by **Highlights PRD §5.13**. |

### 5.13 Cross-capability data flow

| Source | This capability uses it for |
|---|---|
| Bookmark `_id`, `link`, `type`, `cover`, `media`, `highlights` | Reader source-of-truth. |
| Parsed article body (owned here) | The cleaned body rendered in the **Read** tab. |
| Web archive snapshot (owned by **Web archive PRD**) | Distinct full-fidelity copy; not the reader's source. |
| User reader preferences (theme, font, size) | Render-time formatting. |
| AI Assistant integration | The **Ask** tab. |
| Collection access level | Read vs. refresh permissions. |
| File payload (owned by **Files PRD**) | Wrapped reader chrome for PDF, EPUB, image, video viewers. |

### 5.14 Platform-Specific Interaction Patterns

| Platform | Open Reader | Open Action Toolbar | Refresh Preview |
|---|---|---|---|
| **Web / Desktop** | Right-click → **Preview** | Toolbar visible inside the reader pane | Right-click bookmark → **Refresh preview** |
| **iOS** | Tap a bookmark (with in-app browser enabled) | Tap a control in the top bar | Bookmark action menu → **Refresh preview** |
| **Android** | Tap a bookmark (with in-app browser enabled) | Tap a control in the bottom bar | Bookmark action menu → **Refresh preview** |
| **Browser Extension** | Not the primary reader surface | n/a | n/a |
| **Cross-platform invariant** | The set of controls (theme, font, size, refresh, open original, share, Ask tab) MUST be available on every platform; only the gesture surface differs. | | |

---

### System Constants

### 6.1 Internal Reader Service Capabilities

| System Capability | Requirement |
|---|---|
| Classify content type | The system MUST classify each saved bookmark into a content type (`link`, `article`, `video`, `image`, `document`, `audio`, `book`) at save time. |
| Extract article body | The system MUST extract a cleaned article body for `article`-typed bookmarks at save time and store it durably. |
| Sanitize body | The system MUST strip scripts, third-party trackers, ad iframes, and event handlers before persistence. |
| Re-extract on refresh | The system MUST support re-extraction triggered by user Refresh preview. |
| Render reader | The system MUST render the parsed body with the requesting user's reader preferences applied. |
| Persist user preferences | The system MUST persist reader preferences (theme, font, text size) per user across sessions and devices. |
| Detect paywalls | The system SHOULD detect common paywall / login-wall patterns and refuse to persist misleading partial bodies. |
| Handoff to AI Assistant | The system MUST provide the parsed body and bookmark identity to the AI Assistant capability when the user opens the Ask tab. |

### 6.2 Reader Surface Composition Rules

| Component | Rule |
|---|---|
| **Read tab** | Always present when a parsed body, video, image, or file viewer is available. |
| **Ask tab** | Always present in the chrome; surfaces an unavailability state when the AI capability is not available to the user. |
| **Action toolbar** | Always present; minimum actions defined in §5.3. |
| **Highlight overlay** | Always present when the underlying surface supports text selection. |
| **No-preview state** | Surfaced when extraction failed, content is paywalled, or no rendering is possible for the bookmark's type. |

### 6.3 Error and Condition Handling

| Condition | Behavior |
|---|---|
| Parse-time fetch failure | The bookmark MUST still be saved with title/URL/thumbnail where available. The reader MUST surface "no preview available" until a successful Refresh preview. |
| Parse-time paywall detected | Same as fetch failure. The system MUST NOT attempt to bypass. |
| Refresh on a deleted source URL | The previously-parsed body MUST be retained. The user MUST be told the source is unreachable. |
| Manual `type` override conflicting with rendering | The reader chrome MUST honor the user-set `type`; if rendering for the new type is not possible (e.g. no parsed body), the no-preview state applies. |
| AI Assistant unavailable | The Ask tab MUST surface the unavailability state. The Read tab MUST continue to work. |
| Reader preferences sync conflict (two devices set different theme) | The system MUST converge to a single value per the conflict-resolution rule in §5.11. |
| User without read access on a shared collection opens the reader | Refused with a clear permission message. |
| User without edit access invokes Refresh preview | Refused with a clear permission message; Read MUST remain available. |

### 6.4 Reserved Field Values and Defaults

| Item | Rule |
|---|---|
| `DEFAULT_THEME` | `light`. |
| `DEFAULT_FONT` | `serif`. |
| `DEFAULT_TEXT_SIZE` | The middle step in the size scale (e.g. 3 of 5). |
| `READER_THEMES` | At minimum: `light`, `dark`, `sepia`. |
| `READER_FONTS` | At minimum: `serif`, `sans-serif`, `monospace`. |
| `READER_TEXT_SIZE_STEPS` | At minimum: 5 discrete steps. |
| `CONTENT_TYPES` | `link`, `article`, `video`, `image`, `document`, `audio`, `book`. |
| `NO_PREVIEW_STATE` | A reserved UI state surfaced when the reader cannot render meaningful content. |

### 6.5 Internal Action Types

| Action | Purpose |
|---|---|
| `reader.classify` | Run content-type classification on a saved bookmark. |
| `reader.extractBody` | Fetch the source URL and extract a cleaned article body. |
| `reader.sanitizeBody` | Apply the sanitization pipeline to a parsed body before persistence. |
| `reader.refresh` | Re-fetch and re-extract on user request. |
| `reader.render` | Compose the reader surface for a given bookmark and user. |
| `reader.preferenceWrite` | Persist a theme / font / text-size change for the current user. |
| `reader.preferenceRead` | Retrieve the current user's reader preferences. |
| `reader.askHandoff` | Hand the current bookmark and parsed body to the AI Assistant capability. |

### 6.6 Plan-Tier Gating

| Capability | Required Plan |
|---|---|
| Open the reader on any bookmark the user can read | Free. |
| Reader theme / font / text-size customization | Free. |
| Refresh preview | Free. |
| Inline highlight rendering | Free. |
| Open original page from reader | Free. |
| Ask tab (AI chat) | 🟠 Product Decision — owned by **AI Assistant PRD**. The reader does not gate the affordance itself; the AI capability gates the underlying chat. |
| Body-text search | ⚪ Capability Split — owned by **Search & Filters PRD §6.9**, paid. |

### 6.7 Sanitization Rules

| Removal Target | Rule |
|---|---|
| `<script>` tags | MUST be stripped. |
| Inline event handlers (`onclick`, `onerror`, etc.) | MUST be stripped. |
| Tracking pixels and analytics scripts | MUST be stripped. |
| Ad iframes (recognized ad-network origins) | MUST be stripped. |
| Third-party embeds from non-allowed origins | 🟠 Product Decision (recommendation: allowlist a small set of trusted embed origins; strip the rest). |
| `data:` URIs in HTML attributes | SHOULD be stripped or sandboxed. |
| `<style>` tags and inline `style` attributes | MAY be retained for layout fidelity, with risky properties (`position: fixed`, `behavior:`) stripped. |
| `<link rel="stylesheet">` to external origins | MUST be stripped or fetched and inlined via the application's CDN. |

### 6.8 Refresh Throttling

| Rule | Behavior |
|---|---|
| Per-bookmark throttle | Refresh preview SHOULD be rate-limited per bookmark (recommendation: at most 1 refresh per minute per bookmark) to protect the source server and the application's parse infrastructure. |
| Per-user throttle | Refresh preview SHOULD be rate-limited per user across all bookmarks (recommendation: a low-double-digit refreshes-per-minute ceiling). |
| Throttle response | A throttled refresh MUST surface a clear "try again shortly" message rather than silently doing nothing. |

---

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| User saves an article URL | The parser extracts the article body server-side and persists it. The bookmark `type` is set to `article`. |
| User saves a YouTube URL | The classifier sets `type: "video"`. The reader renders an inline player on next open. |
| User saves an image URL | The classifier sets `type: "image"`. The reader renders the image inline. |
| User saves a paywalled article URL | The bookmark is saved with title and URL but no parsed body. The reader surfaces "no preview available." |
| User right-clicks a bookmark and selects Preview | The reader opens with the parsed body, the user's saved theme/font/size, and any saved highlights rendered inline. |
| User taps a bookmark on iOS with in-app browser enabled | The reader opens automatically with the parsed body. |
| User taps a bookmark on iOS with in-app browser disabled | The system browser opens the source URL. The reader is not reached. The user MUST be able to find and toggle the in-app browser setting. |
| User changes theme to dark | The reader re-renders in dark theme. The choice persists across sessions on the same user account. |
| User changes text size on web | The same text size applies on iOS and Android on next reader open. |
| User invokes Refresh preview on a bookmark | The system re-fetches the URL, re-extracts the body, and replaces the persisted body. The bookmark's `lastUpdate` advances. |
| User invokes Refresh preview on a URL that has become paywalled | Refresh fails. The previously-parsed body remains available. The user is told the refresh failed. |
| User invokes Refresh preview rapidly on the same bookmark | The throttle kicks in. The user is told to try again shortly. |
| User adds a highlight inside the reader | The highlight is persisted per **Highlights PRD UC-02** and renders inline immediately. |
| User opens the Ask tab on an article | The AI Assistant capability handles the chat. |
| User opens the Ask tab when AI is unavailable for their plan | The Ask tab surfaces unavailability; the Read tab continues to work. |
| User clicks Open Original | The source URL opens in a new tab (web / desktop) or the system browser (mobile). |
| User opens the reader on a video bookmark | The inline player renders. Theme/font/size controls hide where not meaningful. |
| User opens the reader on an image bookmark | The image renders at full resolution with zoom/pan. |
| User opens the reader on an uploaded PDF | The Files PRD PDF viewer renders inside the reader chrome. Highlights, action toolbar, and Ask tab integrate. |
| User opens the reader on an uploaded EPUB | Same as PDF, with the EPUB viewer. |
| User manually changes a bookmark's `type` from `link` to `article` | On next reader open, the system attempts extraction (or surfaces "no preview available" if extraction fails). |
| User manually changes a bookmark's `type` from `article` to `video` | The reader chrome adjusts to render an inline player on next open. The previously-parsed article body MAY be retained but is not surfaced. |
| Refresh preview on a bookmark whose parsed body has changed substantially | Saved highlights re-anchor where possible; un-anchorable highlights are flagged as stale, not deleted. |
| Anonymous viewer opens the reader on a bookmark in a public collection | The reader renders with system defaults; no preferences are persisted for the viewer. |
| Collaborator with read-only access opens the reader on a shared bookmark | The reader works. Refresh preview is refused. The viewer's own theme/font/size preferences apply. |
| Collaborator with edit access invokes Refresh preview | Refresh succeeds. |
| User accesses the same bookmark on web and on mobile | The same reader preferences (theme, font, size) apply on both platforms. |
| Two devices set different theme preferences within seconds | The system converges to one value (last-write-wins on `lastUpdate` per §5.11). |
| User attempts to "force parse" a paywalled article | No such affordance exists. Refresh preview retries the same extraction and produces the same result. |
| User opens the reader on a bookmark whose parsed body contains malicious-looking HTML | The sanitization pipeline ensures the rendered output is safe. No script execution occurs. |
| User saves a bookmark; classification is uncertain | `type` defaults to `link`; the reader surfaces "no preview available" but the bookmark itself is fully saved. |
| User saves a bookmark for a page that loads its content via JavaScript and renders nothing for the parser | The classifier MAY assign `link` and the reader surfaces "no preview available." The user MAY try Refresh preview later or open the original. |
| User reclassifies an `article` bookmark to a different type, then back to `article` | The previously-parsed body MUST still be accessible if it was retained; otherwise the user MAY trigger Refresh preview to re-extract. |
| User opens the reader on a bookmark whose `extractionStatus` is `stale` | The reader renders the persisted body and surfaces a "refresh recommended" affordance. The user MAY trigger Refresh preview from the toolbar without leaving the reader. |
| User opens the reader from search results and closes it | The user is returned to the same search query, the same result list, and the prior scroll position. The search field still contains the original query. |
| User opens the reader from an active filter, intervening sync mutates the underlying list, user closes the reader | The system returns to the closest equivalent context (same filter still active, list refreshed); the user is NOT dumped to the top-level library. |

---

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

The reader's persisted state lives partly on the wrapping bookmark (owned by **Bookmarks PRD**) and partly on a derived **ArticleBody** record. User reader preferences live on the user account.

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| `bookmark.type` | enum | ✅ | One of `CONTENT_TYPES`. | Owned by **Bookmarks PRD**; classification is owned here. |
| `articleBody.bookmarkRef` | number | ✅ | Parent bookmark `_id`. | One ArticleBody per bookmark. |
| `articleBody.html` | string (sanitized HTML) | optional | Cleaned body content; sanitized per §6.7. | Absent when extraction failed or yielded no content. |
| `articleBody.text` | string | optional | Plain-text projection used for body-text search. | Indexed by **Search & Filters PRD**. |
| `articleBody.extractedAt` | string (ISO 8601) | system | Timestamp of the most recent successful extraction. | Server-set. |
| `articleBody.extractionStatus` | enum | system | One of `ExtractionStatus`. | See §8.2. |
| `articleBody.wordCount` | integer | optional | Word count of the parsed body. | Used for the optional reading-time estimate (F26). |
| `articleBody.readingTimeMinutes` | integer | optional | Pre-computed reading-time estimate (non-negative integer). | Derived from `wordCount`; stored to avoid recomputing on every render. The decision of whether to *display* it is F26. |
| `articleBody.language` | string | optional | BCP 47 language code if the extractor detected the article's language. | System-set when known; useful for typography (CJK fonts), translation, future TTS. |
| `articleBody.errorCode` | string | optional | Machine-readable failure code, present when `extractionStatus` is a failure value. | For operational visibility; the user-facing message is derived from `extractionStatus`. |
| `articleBody.errorMessage` | string | optional | Human-readable support / debug text. | UI MAY surface a simplified message; raw text is for support / observability. |
| `userPreferences.reader.theme` | enum | optional | One of `READER_THEMES`. | Persists per user. |
| `userPreferences.reader.font` | enum | optional | One of `READER_FONTS`. | Persists per user. |
| `userPreferences.reader.textSize` | integer | optional | 1..N (the configured number of steps). | Persists per user. |
| `userPreferences.reader.lineHeight` | enum or number | optional | Line-height adjustment. | 🟠 Product Decision (see §12); not committed in this PRD. |
| `userPreferences.reader.marginWidth` | enum or number | optional | Margin-width adjustment. | 🟠 Product Decision (see §12); not committed in this PRD. |
| `userPreferences.reader.lastUpdate` | string (ISO 8601) | system | Used for cross-device conflict resolution. | Server-set. |

## 12. Database / Schema Notes

### Enums

```ts
type ContentType =
  | "link"
  | "article"
  | "video"
  | "image"
  | "document"
  | "audio"
  | "book";

type ReaderTheme =
  | "light"
  | "dark"
  | "sepia";

type ReaderFont =
  | "serif"
  | "sans-serif"
  | "monospace";

type ExtractionStatus =
  | "pending"        // queued; not yet attempted
  | "success"        // body successfully extracted and persisted
  | "stale"          // a successful body exists, but signals suggest the source has changed since extraction; refresh recommended
  | "no_content"     // fetched OK but no meaningful body found (e.g. landing page)
  | "paywalled"      // paywall or login wall detected
  | "fetch_failed"   // source URL unreachable or returned non-2xx
  | "parse_failed"   // fetched OK but parser raised an error
  | "throttled";     // refresh attempt was throttled
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
| **Reader pane (web / desktop)** | The clean preview surface reached via right-click → Preview. |
| **Reader screen (iOS)** | The mobile reader opened on bookmark tap. |
| **Reader screen (Android)** | The mobile reader opened on bookmark tap. |
| **No-preview state** | Surfaced when extraction failed or the bookmark has no renderable preview. |
| **Reader preferences panel** | The control panel for theme, font, and text-size adjustments. |
| **Refresh preview affordance** | Right-click menu entry (web / desktop) and bookmark action menu entry (mobile). |
| **Open original affordance** | Always-available action that returns the user to the source URL. |
| **Ask tab** | The AI chat surface inside the reader (per **AI Assistant PRD**). |
| **In-app browser setting (mobile)** | The settings entry that controls whether bookmark taps open the reader or the system browser. |
| **Per-bookmark highlight strip (inside reader)** | Collapsible list of the bookmark's highlights, allowing jump-to-position (per **Highlights PRD §10.1**). |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| **Theme selector** | Light / Dark / Sepia toggle. |
| **Font selector** | Serif / Sans-serif / Monospace toggle. |
| **Text-size stepper** | Plus / minus controls or a discrete-step slider. |
| **Reset preferences action** | Returns reader preferences to defaults. |
| **Refresh preview button** | Triggers re-extraction. Shows a throttled state when rate-limited. |
| **Open original button** | Exits the reader to the source URL. |
| **Share button** | Shares the bookmark or the reader's permalink. |
| **Read / Ask tab switcher** | Switches between the article body and the AI chat surface. |
| **No-preview message** | Friendly explanation of why no parsed body is available, with the Open Original affordance. |
| **Inline highlight rendering** | Per-highlight visual overlay with click-to-toolbar gesture. |
| **Inline image / video / PDF / EPUB viewer** | Surface-specific renderers selected based on `bookmark.type`. |
| **Reading-time estimate (optional)** | Displays "N min read" when `wordCount` is available (F26). |

---

## 15. Workflow Requirements

| Operation | Required Behavior | Shared / Core Handling |
|---|---|---|
| **Create** | The reader surface is not a separately-created entity. The article body is extracted automatically at bookmark save time and is created alongside the bookmark. | Owned by this PRD; coordinates with **Bookmarks PRD** save-time parse and **Web archive PRD** snapshot. |
| **Edit** | A user MAY refresh the parsed article body to re-extract content from the source URL. The user MUST NOT be able to manually edit the parsed body (it is derived). | Refresh action owned by this PRD. |
| **Delete** | When a bookmark is deleted, its parsed article body MUST be deleted alongside the bookmark and its highlights. | Lifecycle delegated to **Bookmarks PRD**. |
| **Search** | The system MUST surface parsed article body content through the universal search field. Detailed search behavior is owned by **Search & Filters PRD**. | |

---

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|
| **Content classifier service** | Runs classification at bookmark save time and on user reclassification. |
| **Article extraction service** | Fetches source URLs and extracts cleaned article bodies. |
| **Sanitization service** | Applies the sanitization pipeline. |
| **Paywall / login-wall detector** | Recognizes inaccessible content. |
| **Article body persistence** | Stores `ArticleBody` records, including the plain-text projection for search. |
| **Refresh service** | Coordinates re-extraction; enforces throttles; preserves prior body on failure. |
| **Reader render service** | Composes the reader surface for a given bookmark and user. |
| **Reader preferences service** | Read / write per-user reader preferences with conflict resolution. |
| **Reclassification protector** | Tracks user-set `type` overrides and prevents silent re-classification overwrites. |
| **Sharing access guard** | Enforces read vs. edit access for open vs. refresh. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| **Save-time chat affordance** | Optional button inside the save / edit popup that opens an Ask conversation about the active page (per **AI Assistant PRD**). |
| **Reader handoff** | Links from the extension into the application's reader for the saved bookmark. |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| **Reader pane component** | Renders the reader inside the web / desktop application. |
| **Right-click context menu integration** | Surfaces **Preview** and **Refresh preview** entries on bookmarks. |
| **Reader preferences panel component** | UI for theme / font / text-size adjustments. |
| **Highlight overlay integration component** | Renders saved highlights inline and surfaces the action toolbar on click. |
| **Inline viewer routers** | Selects between article-body, video, image, PDF, and EPUB renderers based on `bookmark.type`. |
| **Ask tab component** | Hosts the AI chat surface (UI shell only; chat logic owned by **AI Assistant PRD**). |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| **iOS reader screen** | Opens automatically on bookmark tap when in-app browser is enabled. |
| **Android reader screen** | Same role on Android. |
| **In-app browser setting integration** | Settings entry exposed under iOS Settings → Browser → Open links in (the application) and Android Settings → Open in browser → In app. |
| **Mobile preferences panel** | Mobile-native theme / font / size controls, sharing the same persisted preferences as web. |
| **Mobile share / open original integration** | Routes Open Original to the system browser. |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| **Search index integration** | Propagates `articleBody.text` into the search index. |
| **Sync engine integration** | Propagates reader preference changes across devices. |
| **Throttle store** | Tracks per-bookmark and per-user refresh attempts for rate limiting. |
| **Sanitization library** | Centralized HTML sanitization used by extraction, refresh, and any future ingest path. |
| **Observability module** | Logs extraction outcomes, classifier confidence, throttle hits, sync conflicts. |

---

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| **Content classifier** | Determines `bookmark.type` at save time using meta tags, MIME, structural cues, and (for files) extension rules. |
| **Article body extractor** | Fetches the source URL and extracts the main article content. |
| **Sanitization pipeline** | Strips scripts, trackers, ads, event handlers, and risky CSS before body persistence. |
| **Paywall / login-wall detector** | Recognizes common paywall and login-wall patterns and refuses misleading partial-body persistence. |
| **Article body store** | Persists the cleaned body, plain-text projection, and extraction metadata per bookmark. |
| **Refresh worker** | Re-runs extraction on user request; respects throttles; preserves prior body on failure. |
| **Reader render service** | Composes the reader surface for a given bookmark and user, applying preferences and highlight overlays. |
| **Reader preferences store** | Persists per-user theme / font / text-size choices. |
| **Reader preference sync** | Propagates preference changes across devices with conflict resolution. |
| **Highlight overlay integration** | Coordinates with **Highlights PRD** to render saved highlights inline at their anchored positions. |
| **AI Assistant integration** | Hands the parsed body and bookmark identity to the **AI Assistant PRD** capability when the Ask tab is opened. |
| **File viewer integration** | Embeds the **Files PRD** PDF and EPUB viewers inside the reader chrome for file-backed bookmarks. |
| **Open-original gateway** | Opens the bookmark's `link` in a new tab (web / desktop) or the system browser (mobile). |
| **Throttle enforcer** | Per-bookmark and per-user rate limiting on Refresh preview. |
| **Search index integration** | Pushes `articleBody.text` updates into the search index used by **Search & Filters PRD**. |
| **Sharing access guard** | Enforces read vs. edit access for reader open vs. Refresh preview. |
| **Anonymous viewer renderer** | Renders the reader with system defaults for public-page viewers; suppresses preference writes. |
| **Reclassification protector** | Ensures a user-set `bookmark.type` is not silently overwritten by automated re-classification. |
| **Observability module** | Logs extraction failures, classification confidence, refresh throttle hits, and preference sync conflicts. |

---

## 19. OSS / Build-vs-Buy Decision

1. **The reader is a render surface, not a write surface.** Every persisted change the reader appears to make — highlights, classification overrides, preferences, refresh — is owned by another capability or a small server-side service that this PRD calls into. Keeping the reader thin protects against the reader becoming a side-channel for state changes that other capabilities don't see.

2. **Article body and web archive are two different things.** Both are derived from a fetch of the source URL, but they serve different purposes: the article body is a clean, sanitized projection optimized for reading; the web archive is a full-fidelity snapshot for the case where the source disappears. Keep them in separate storage and let each evolve independently. Conflating them is the kind of "convenient at first" decision that becomes expensive when one needs different sanitization rules from the other.

3. **Sanitization is not optional.** A naive renderer of a parsed body will execute scripts, load trackers, and render ads. Sanitization MUST be applied at extraction time, before persistence, so a malicious body never sits in storage. Re-sanitizing at render time is defense in depth but does not absolve the extractor of responsibility.

4. **Failed refresh MUST preserve the prior body.** This is a sharp edge that's easy to get wrong. The naive implementation overwrites the body on every refresh, including failed ones. The correct behavior is: only successful extractions update `extractedAt` and `html`; failed attempts only update `lastRefreshAttemptAt` and `extractionStatus`. The user's prior reading experience MUST survive a transient source outage.

5. **The user's manual `type` override is sacred.** A user who goes to the trouble of changing a bookmark from `link` to `article` is signaling intent. Re-classification jobs (scheduled re-parses, Refresh preview, post-deploy re-runs) MUST NOT silently overwrite the user's choice. Track the override flag explicitly.

6. **Reader preferences persist per user, not per device.** Setting dark mode on the laptop should mean dark mode on the phone. This requires server-side storage and a small sync path. It also requires conflict resolution — the simplest rule (last-write-wins on a timestamp) is probably right, but document it explicitly so future changes don't break user expectations.

7. **The Ask tab is integration, not a feature.** The reader provides the tab affordance; the AI capability provides the chat. The reader MUST NOT pretend the AI works when it doesn't, MUST NOT cache or fabricate AI responses, and MUST surface unavailability cleanly. Coupling the reader's success to the AI's success is the kind of cross-capability bug that's painful to debug.

8. **Highlights are not a reader concept; they're a Highlights concept.** The reader hosts the gesture surface and renders the overlay, but every highlight write goes through Highlights PRD's add/update/delete path. The reader MUST NOT keep its own copy of highlights or make local changes that bypass the Highlights write path.

9. **Throttling Refresh preview is a real product concern.** Without it, an enthusiastic user (or a misbehaving client) can hammer source servers and the application's parse infrastructure. Per-bookmark and per-user throttles, both server-enforced, are the right answer. Surface a clear "try again shortly" rather than failing silently.

10. **Paywall bypass is a permanent NO.** No "force parse" button, no header spoofing, no credential injection, no scraping evasion. The reader respects the source's access model. Document this explicitly so engineering doesn't try to be clever later.

11. **The mobile in-app browser setting is the most common reader-related support ticket.** Users tap a bookmark, the system browser opens, and they think the reader is broken. Make the setting easy to find, make the toggle obvious, and make the consequence ("bookmarks open in the application's reader" vs. "bookmarks open in your default browser") clear in plain language.

12. **The reader's no-preview state must always offer Open Original.** The user clicked something expecting to read it. If we can't render anything ourselves, we MUST give them the source URL in one click. A no-preview screen with no Open Original is a dead end and erodes trust in the entire capability.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| **Bookmarks PRD** | A reader surface always exists in the context of a saved bookmark. The bookmark provides the source URL, title, content type, parse hints, and lifecycle. |
| **Web archive PRD** | The web archive provides the full-fidelity snapshot of a saved page; the reader's cleaned article body is derived from the same fetch. The two storage layers MUST stay coordinated. |
| **Files PRD** | The reader surface for uploaded PDFs and EPUBs is provided by Files PRD's in-app viewers; this PRD provides the surrounding reader chrome (theme, font, text size, highlight overlay, action toolbar). |
| **Highlights PRD** | Highlight selection inside the reader uses Highlights PRD's identity, color enum, and persistence rules. |
| **Collections PRD** | The reader is reachable from any bookmark in any accessible collection; collection access rules govern who can open a reader on a shared bookmark. |
| **User / Account** | Reader theme, font, and text-size preferences MAY persist per user. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| **Highlights PRD** | The in-app reader is the surface where text selection becomes a saved highlight (Highlights PRD UC-02). |
| **Search & Filters PRD** | The Articles filter (`type:article`) and the body-text search target both depend on this capability's article-body extraction and content-type classification. |
| **AI Assistant PRD** | The "Ask" tab inside the reader is the surface where the AI chat about an article is reached. |
| **Public Page / Embed PRD** | When a collection is public, public viewers MAY open the reader on bookmarks in that collection; access rules apply. |

### Related Capabilities

| Capability | Relationship |
|---|---|
| **Bookmarks PRD** | Owns the bookmark entity and the save-time parse pipeline. This PRD owns the **content-type classification** that drives "is this an article" decisions and the **article-body extraction** that feeds the reader. |
| **Web archive PRD** | Owns the full-page snapshot. This PRD owns the cleaned, parsed article body — a derived projection of the same source content. |
| **Files PRD** | Owns the PDF and EPUB viewer renderers; this PRD owns the reader chrome that wraps them. |
| **Highlights PRD** | Owns highlight identity. This PRD owns the surface that hosts highlight gestures and renders saved highlights inline. |
| **AI Assistant PRD** | Owns the AI chat capability. This PRD owns the "Ask" tab affordance and the integration handoff. |

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
| Reader scroll-position persistence | 🟠 Product Decision | Whether the reader remembers per-bookmark scroll position across sessions. |
| Reading-time estimate display | 🟠 Product Decision | Whether to surface "N min read" using `wordCount`. The pre-computed value is available in `articleBody.readingTimeMinutes`. |
| Reader `lineHeight` and `marginWidth` controls | 🟠 Product Decision | Whether to expose line-height and margin-width adjustments alongside theme/font/text-size. Schema slots are defined as optional; defaults and discrete-step ranges require a product call. |
| Stale-state detection signals | 🟠 Product Decision | What signals trigger an `extractionStatus` transition from `success` to `stale` (e.g. age threshold, `Last-Modified` header change on source, ETag change, periodic re-fetch sample). |
| Inline embed handling (tweets, YouTube embeds, code blocks) | 🟠 Product Decision | Render inline, render as link, or strip. Recommendation: allowlist a small set of trusted embed origins; render code blocks inline; strip the rest. |
| Reader keyboard shortcuts | 🔴 Not Defined | Web / desktop reader shortcuts (next/prev bookmark, jump to highlights, theme toggle). |
| Audio bookmark playback inside reader | 🔴 Not Defined | Whether `audio`-type bookmarks get an inline player. |
| Highlight re-anchoring on Refresh preview | 🟠 Product Decision | Re-anchor where possible; flag stale otherwise; never silently drop. Recommendation: implement the recommended path. |
| Per-bookmark / per-collection reader preferences override | 🔴 Not Defined | Future feature; out of scope here. |
| Offline cached reader | 🔴 Not Defined | Whether the parsed body is cached on-device for offline reading. |
| TTS / read-aloud | 🔴 Not Defined | Text-to-speech of the parsed body. |
| Reader UI for `link`-typed bookmarks (no parsed body) | 🟠 Product Decision | Whether to even open the reader on a `link`-typed bookmark, or to skip directly to opening the original URL. |
| Sharing the reader as a deep link | 🟠 Product Decision | Whether to expose a stable URL for the reader on a public bookmark. |
| Reader preferences conflict resolution rule | 🟠 Product Decision | Last-write-wins on `lastUpdate` is the recommendation; alternatives include per-device local preferences. |
| Dark theme for `image` and `video` surfaces | 🟠 Product Decision | Whether the dark theme applies to surfaces that don't render text. |
| Default reader theme on system-dark devices | 🟠 Product Decision | Whether `light` is the universal default or whether the reader follows the OS theme on first use. |
| Extraction language detection | 🔴 Not Defined | Whether the extractor identifies article language for downstream features (translation, TTS). |
| Reading progress tracking | 🔴 Not Defined | Whether the reader records read / unread state per bookmark. |
| Body-text search of stale parsed bodies | 🟠 Product Decision | Whether search re-indexes after every Refresh preview or relies on a periodic sweep. |
| Auto-classification rules and weights | 🟠 Product Decision | The exact signal weighting (meta tags vs. structural cues vs. MIME) is an implementation choice. |
| Fallback when both reader and source are unavailable | 🟠 Product Decision | Whether to surface the **Web archive PRD** snapshot as a third reader fallback. |
| Behavior on click-bait short articles | 🟠 Product Decision | Whether to treat very short pages as `article` or fall back to `link`. |
| Article body persisted at save time | ✅ Decided | The parsed body is persisted at save; subsequent loss of the source MUST NOT remove it. |
| Paywall bypass | ✅ Decided | Forbidden. No mechanism exists. |
| Reader hosts highlights | ✅ Decided | Yes — text-selection gestures and inline rendering are first-class reader behavior. |
| Tracking / ad stripping | ✅ Decided | Required. Sanitization pipeline strips scripts, trackers, ads. |
| Refresh preview preserves prior body on failure | ✅ Decided | Yes — Schema Invariant 5. |
| User-set `type` override protected from re-classification | ✅ Decided | Yes — Schema Invariant 8. |
| Reader preferences persist per user across devices | ✅ Decided | Yes — F10. |
| In-app browser setting on mobile | ✅ Decided | Required for reader to be reached on tap; user-toggleable. |
| Reader is a context-menu action on web / desktop | ✅ Decided | Right-click → Preview; not a primary nav item. |
| Reader is a tap-action on mobile | ✅ Decided | Bookmark tap opens reader when parsed body is available. |
| Content-type enum | ✅ Decided | `link`, `article`, `video`, `image`, `document`, `audio`, `book`. |
| Default theme | ✅ Decided | `light`. |
| Default font | ✅ Decided | `serif`. |
| Default text size | ✅ Decided | Middle step in the configured scale. |
| Minimum theme options | ✅ Decided | Light, dark, sepia. |
| Minimum font options | ✅ Decided | Serif, sans-serif, monospace. |
| Minimum text-size steps | ✅ Decided | At least 5. |

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
