# 12 — Browser Extension / Mobile Capture PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Browser Extension / Mobile Capture (save-from-anywhere surfaces) |
| **Capability ID** | browser_extension_mobile_capture |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-05-02 |
| **Revision summary** | Full specification with features, functionality, scenarios, and enablers |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST provide first-class capture surfaces across the user's primary browsing and mobile contexts, so saving a page, link, or selected text into the library never requires switching to the application's authenticated app. The supported surfaces are: a **browser extension** for Chrome, Safari, Edge, and Firefox (plus Chrome-derivative browsers); an **iOS app** with a Share extension, an optional Safari extension for highlights, and an optional one-tap **Add to Unsorted** share action; and an **Android app** that integrates with the system share sheet. Each surface MUST minimize permissions by default, MUST stay aligned with the bookmark-create flow owned by **Bookmarks PRD**, and MUST gracefully degrade where platform constraints prevent full feature parity (e.g. Android browser extensions, mobile tab-capture, Safari side panel).

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

### UC-01 — Save the current page from the browser extension

| Item | Detail |
|---|---|
| Actor | Authenticated user with the extension installed. |
| Goal | Save the page the user is currently viewing. |
| Main Flow | 1. User clicks the extension's toolbar icon. 2. The extension opens a save popup pre-filled with the page's title, description, and a parsed cover image. 3. User edits any field, picks a target collection, optionally adds tags. 4. User clicks **Save**. 5. Bookmark is created per **Bookmarks PRD**. |
| System Response | The popup MUST close on success and the toolbar icon MUST update to show the saved-page indicator (if enabled). |
| Alternate Flow | If Clipper one-click save is enabled (F07), step 1 commits immediately to Unsorted (or last-used collection) without opening the popup. |

### UC-02 — Save selected text as a highlight via keyboard shortcut

| Item | Detail |
|---|---|
| Actor | Authenticated user reading a page. |
| Goal | Capture a sentence as a highlight rather than saving the whole page. |
| Main Flow | 1. User selects text on the page. 2. User presses the save shortcut (`Ctrl+Shift+S`). 3. The system detects the selection and routes the action to highlight save (per **Bookmarks PRD UC-06**). 4. A highlight is created on the parent bookmark per **Highlights PRD**. |
| System Response | The shortcut MUST detect the presence of selected text and behave differently from a no-selection invocation, which saves the whole page. |
| Alternate Flow | If the shortcut conflicts with the browser or OS, the user MAY remap it via the browser's native extension shortcut settings. |

### UC-03 — Open the side panel and search

| Item | Detail |
|---|---|
| Actor | Authenticated user on Chrome / Edge / Firefox. |
| Goal | Browse and search the library without leaving the current page. |
| Main Flow | 1. User presses `Ctrl+.` (Windows/Linux) or `Cmd+.` (Mac), OR right-clicks the toolbar icon → **Open Sidebar**. 2. The sidebar opens persistently next to the current page. 3. User can browse collections, run searches, and drag links/images from the page into the sidebar to save them. |
| System Response | The sidebar MUST behave as a full mini-app version of the application's main UI. |
| Alternate Flow | On Firefox, the user MAY also reach the sidebar via View → Sidebar → the application's sidebar entry. On Safari and other browsers, the side panel MUST NOT appear (F13). |

### UC-04 — Search bookmarks from the address bar

| Item | Detail |
|---|---|
| Actor | Authenticated user on Chrome / Edge / Firefox. |
| Goal | Run a quick library search without opening the application. |
| Main Flow | 1. User clicks in the address bar. 2. User types `rd` and presses `Tab`. 3. The omnibox switches into search-bookmarks mode. 4. User types a query. 5. Live results appear in the omnibox dropdown. 6. User picks a result; the browser navigates to the bookmark's URL. |
| System Response | Search uses standard search behavior owned by **Search & Filters PRD**. |
| Alternate Flow | In Safari or Vivaldi, the omnibox path MUST NOT be available; the user is directed to the side panel or main app. In Chrome, the user MAY need to enable **Settings → Search engine → Keyboard shortcut → Space or tab** for `Tab` activation to work. |

### UC-05 — Save all open tabs as a batch

| Item | Detail |
|---|---|
| Actor | Authenticated user with many open tabs they want to save and close. |
| Goal | Park their open tabs as bookmarks they can return to later. |
| Main Flow | 1. User right-clicks the extension's toolbar icon and selects **Save tabs**. 2. The system lists every open tab in the current window. 3. User excludes any tabs they don't want by clicking the trash icon next to each (F10). 4. User picks a target collection (default: Unsorted). 5. User clicks **Save tabs**. 6. A batch of bookmarks is created, all auto-tagged with today's date (F09). |
| System Response | The system MUST create one bookmark per non-excluded tab. The tag MUST be applied to every bookmark in the batch. |
| Alternate Flow | If the user invokes Save tabs again later, the system MUST create a NEW batch — duplicate-suppression at save time is NOT applied (F11). The user cleans up afterward via the **Duplicates** capability. |

### UC-06 — Reopen a saved tab batch on desktop

| Item | Detail |
|---|---|
| Actor | User on web / desktop. |
| Goal | Restore a previous tab session by reopening every bookmark in the batch's collection. |
| Main Flow | 1. User finds the collection containing the saved batch (often filtering by the auto-tagged date). 2. User right-clicks the collection in the sidebar → **Open all bookmarks**. 3. The browser opens every bookmark in a new tab. |
| System Response | The system MUST open every bookmark in the collection. The order MAY follow the collection's sort. |
| Alternate Flow | The user MAY multi-select specific bookmarks and click **Open** in the toolbar to open only those. |

### UC-07 — Save a link to Unsorted from iOS Share sheet

| Item | Detail |
|---|---|
| Actor | iOS user who has installed the mobile app. |
| Goal | Save a link from any iOS app with one tap, without choosing a collection or editing metadata. |
| Main Flow | 1. User taps the iOS Share button in any app. 2. User taps the **Add to Unsorted** action. 3. The link is saved to the Unsorted system collection immediately. |
| System Response | The action MUST commit without showing a save dialog. The user MUST be able to find the new bookmark in Unsorted on any device (subject to sync). |
| Alternate Flow | If the user wants to choose a collection, edit metadata, or add tags, they tap the standard application Share extension (F21) instead of **Add to Unsorted**. |

### UC-08 — Save a link with collection / tag / metadata selection on iOS

| Item | Detail |
|---|---|
| Actor | iOS user. |
| Goal | Save a link with full metadata control via the system Share sheet. |
| Main Flow | 1. User taps Share in any iOS app. 2. User taps the application icon. 3. The Share extension opens with the link pre-filled. 4. User edits title, description, tags, target collection. 5. User taps **Save**. |
| System Response | Same bookmark create flow as UC-01; the iOS Share extension is the mobile equivalent of the desktop popup. |
| Alternate Flow | None. |

### UC-09 — Highlight text in iOS Safari

| Item | Detail |
|---|---|
| Actor | iOS user with the iOS app installed and the Safari extension enabled. |
| Goal | Highlight a paragraph on a Safari-rendered web page. |
| Main Flow | 1. User taps the Extensions button (puzzle icon) in Safari's toolbar. 2. User selects the application's Safari extension. 3. User uses the highlight gesture per **Highlights PRD §5.10**. 4. Highlight is created on the bookmark for that page (or the page is saved first, then highlighted, per **Highlights PRD**). |
| System Response | The Safari extension surfaces the same highlight behavior as the desktop browser extension. |
| Alternate Flow | If the Safari extension is not enabled, the user MUST go to iOS Settings → Safari → Extensions → enable. |

### UC-10 — Save a link from Android Share sheet

| Item | Detail |
|---|---|
| Actor | Android user who has installed the mobile app. |
| Goal | Save a link from any Android app via the system Share sheet. |
| Main Flow | 1. User taps Share in any Android app. 2. User taps the application icon in the Share sheet. 3. The save flow opens with the link pre-filled. 4. User edits and confirms. |
| System Response | After the first save, the application icon MUST move closer to the top of the Share sheet automatically. |
| Alternate Flow | If the application is not visible in the Share sheet immediately after install, the user scrolls or expands the Share-sheet target list. |

### UC-11 — Use bookmarklet on a browser without the extension

| Item | Detail |
|---|---|
| Actor | User on a browser where the application's extension is unavailable (or who prefers no-install). |
| Goal | Save the current page using a bookmarklet. |
| Main Flow | 1. User has previously created a browser bookmark labeled "Save to <App>" with the system-published `javascript:` URL as its location (F19). 2. User clicks the bookmarklet on any page. 3. A small save-dialog popup window opens with the page's URL and title pre-filled. 4. User confirms the save. |
| System Response | The popup MUST work with no special permissions; the save commits via the application's standard save flow. |
| Alternate Flow | None. |

### UC-12 — Enable saved-page indicator (one-time setup)

| Item | Detail |
|---|---|
| Actor | User with the extension installed but with the indicator off (default). |
| Goal | Turn on the saved-page indicator so the toolbar icon shows when the current page is already saved. |
| Main Flow | 1. User right-clicks the extension's toolbar icon → **Settings**. 2. User finds **Saved page indicator** under **Permissions**. 3. User toggles it on. 4. The browser surfaces a permission prompt for "Access data on websites." 5. User grants permission. 6. The indicator now activates whenever the user visits a saved page. |
| System Response | The system MUST clearly explain the permission cost before requesting it. The system MUST function with the permission ungranted. |
| Alternate Flow | The user MAY revoke the permission at any time via the browser's native extension settings; the indicator MUST stop activating. |

### UC-13 — Auto-save (Clipper) one-click

| Item | Detail |
|---|---|
| Actor | Power user who saves frequently and rarely needs to edit metadata at save time. |
| Goal | Save with one click, no popup. |
| Main Flow | 1. User opens Settings → Appearance → Clipper. 2. User enables **Save automatically**. 3. From now on, clicking the extension's toolbar icon saves immediately to Unsorted (or last-used collection) without showing the popup. |
| System Response | The toolbar icon click MUST save without a popup interaction. The saved-page indicator (if enabled) MUST update to reflect the saved state. |
| Alternate Flow | If the user wants to edit metadata occasionally, they MUST temporarily disable Clipper (or use the right-click → Save with options affordance, where exposed). |

### UC-14 — Anonymous user invokes a capture surface

| Item | Detail |
|---|---|
| Actor | A user who has installed the extension or app but is not signed in. |
| Goal | (Negative case) Try to save a page. |
| Main Flow | 1. User clicks the extension's toolbar icon. 2. The popup opens with a sign-in prompt instead of the save form. 3. User signs in. 4. The popup re-renders with the save form pre-filled. |
| System Response | The capture flow MUST refuse to create a bookmark while the user is unauthenticated. The sign-in prompt MUST be the entire popup content. |
| Alternate Flow | If the user closes the popup without signing in, no bookmark is created. The next click re-prompts. |

### UC-15 — User on a mobile browser without app extension support tries to save

| Item | Detail |
|---|---|
| Actor | Android Chrome user (no extension support per F40). |
| Goal | Save the current page from the mobile browser. |
| Main Flow | 1. User taps the browser's Share button. 2. User picks the application icon from the Share sheet. 3. The application's Share-sheet integration receives the link. 4. The save flow proceeds per UC-10. |
| System Response | The browser-native Share path replaces the desktop browser extension. |
| Alternate Flow | None. |

### UC-16 — Tab capture on iOS Safari

| Item | Detail |
|---|---|
| Actor | iOS user with the iOS app and Safari extension installed. |
| Goal | Save every open tab in Safari as a batch. |
| Main Flow | 1. User opens Safari with multiple tabs open. 2. User taps the puzzle icon in Safari's address bar. 3. User taps the application's Safari extension entry. 4. User taps **Tabs**. 5. The system lists every open Safari tab. 6. User excludes tabs they don't want; picks a target collection. 7. User taps **Save tabs**. |
| System Response | Same semantics as desktop UC-05 — auto-tagged with today's date, no save-time dedupe. |
| Alternate Flow | None. |

---

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Browser extension on Chrome, Safari, Edge, Firefox** | ✅ Built | The system MUST ship browser extensions for Chrome, Safari, Edge, and Firefox. The Chrome extension MUST also work in Chromium-derivative browsers (Arc, Vivaldi, Opera, Brave). |
| F02 | **Toolbar icon click as primary capture** | ✅ Built | Clicking the extension's toolbar icon MUST open the save popup for the current page. The popup MUST allow editing title, description, tags, and target collection before committing. |
| F03 | **Right-click context menu** | ✅ Built | Right-clicking the extension's toolbar icon MUST surface secondary actions (Save tabs, Open Sidebar, Settings). Right-clicking on a page or link MUST surface "Save link" / "Save page" actions. |
| F04 | **Keyboard shortcut save** | ⚪ Capability Split | The keyboard shortcut for saving the current page (or selected text as a highlight) is owned by **Bookmarks PRD F14**. Default observed: `Ctrl+Shift+S` / `Cmd+Shift+S`. |
| F05 | **Saved-page indicator** | ⚪ Capability Split | The badge on the toolbar icon when the current page is already saved is owned by **Bookmarks PRD F20** (badge color `#0087EA`, badge text `✓`, text color `#FFFFFF`). The indicator is OFF by default; the user MUST opt in via Settings → Permissions. |
| F06 | **Saved-page indicator opt-in permission gate** | ✅ Decided | Enabling the saved-page indicator MUST require granting the "Access data on websites" permission. The system MUST surface this permission cost clearly when the user enables the indicator. The system MUST function with the permission ungranted. |
| F07 | **One-click auto-save (Clipper)** | ✅ Built | Settings → Appearance → Clipper → **Save automatically** option. When enabled, the toolbar icon click MUST save immediately to Unsorted (or the last-used collection per Bookmarks PRD default-collection logic) without showing the save popup. |
| F08 | **Save tabs (tab capture)** | ✅ Built | Right-click extension icon → **Save tabs** MUST save every open tab in the current window as a batch of bookmarks in the user's chosen target collection (default: Unsorted). |
| F09 | **Tab-capture default-tag** | ✅ Built | Every batch saved via Save tabs MUST be auto-tagged with today's date so the user can distinguish one session from another. The date format MUST be locale-aware (recommendation: ISO 8601 `YYYY-MM-DD`). |
| F10 | **Tab-capture per-tab exclusion** | ✅ Built | The Save tabs dialog MUST list every open tab and MUST allow the user to exclude individual tabs by hovering and clicking a remove (trash) icon before the save commits. |
| F11 | **Tab-capture creates a new set every time** | ✅ Decided | The Save tabs flow MUST NOT dedupe against the user's existing library at save time. Each invocation creates a fresh batch; users clean up duplicates afterward via the **Duplicates** capability (per **Duplicates & Broken Links PRD**). |
| F12 | **Side panel mini-app** | ⚪ Capability Split | The persistent sidebar (Ctrl+. / Cmd+.) is owned by **Bookmarks PRD F19**. This PRD owns the entry points (keyboard shortcut, right-click → Open Sidebar, View menu integration in Firefox). |
| F13 | **Side panel browser support** | ✅ Decided | Side panel MUST work in Chrome, Edge, and Firefox. Side panel MUST NOT be exposed in Safari or other browsers without sidebar support. |
| F14 | **Side panel drag-and-drop** | ✅ Built | The user MUST be able to drag links and images from the current page into the open sidebar to save them. |
| F15 | **Address-bar / omnibox search** | ✅ Built | In supported browsers, typing `rd` and pressing `Tab` in the address bar MUST switch the omnibox into search-bookmarks mode; subsequent typed characters MUST run a live search against the user's library. |
| F16 | **Address-bar search browser support** | ✅ Decided | Omnibox search MUST work in Chrome, Edge, and Firefox. Omnibox search MUST NOT be exposed in Safari or Vivaldi. In Chrome, the user MAY need to set **Settings → Search engine → Keyboard shortcut → Space or tab** to enable Tab activation. |
| F17 | **Permissions: minimal by default** | ✅ Decided | The extension MUST request only the minimum permission set required at install time. By default the extension MAY access only the current tab when the user actively clicks the toolbar icon. The system MUST NOT collect or transmit page data in the background under default permissions. |
| F18 | **Permissions: optional broader access** | ✅ Decided | Additional permission ("Access data on websites") MUST be requested ONLY when the user enables saved-page indicator (F06) or highlights on revisited pages (per **Highlights PRD**). The user MUST be able to revoke at any time via the browser's native extension settings. |
| F19 | **Bookmarklet alternative** | ✅ Built | The system MUST publish a bookmarklet (`javascript:` URL) that opens a small save-dialog popup for the current page. The bookmarklet MUST work in any browser without an installed extension and MUST NOT request additional permissions. |
| F20 | **iOS app on iOS / iPadOS 17+** | ✅ Built | The system MUST ship an iOS / iPadOS app supporting iOS / iPadOS 17 or higher. |
| F21 | **iOS Share extension** | ✅ Built | After installing the iOS app, the user MUST be able to enable the system Share extension to save links and files from any app via the iOS Share sheet. |
| F22 | **iOS Safari extension** | ✅ Built | The iOS app MUST include an optional Safari extension for highlighting selected text on web pages in Safari. The Safari extension is the iOS counterpart to the desktop browser extension's highlight capability. |
| F23 | **iOS one-tap "Add to Unsorted" action** | ✅ Built | The user MUST be able to enable a system Share-sheet action labeled **Add to Unsorted** that, when tapped, saves the link to the Unsorted system collection in a single tap with no save dialog. Optimized for speed. |
| F24 | **iOS Save tabs (Safari only)** | ✅ Built | From Safari on iOS, the puzzle / Extensions icon → the application's Safari extension entry → **Tabs** MUST list all open Safari tabs with the same exclusion and target-collection flow as the desktop Save tabs (F08–F10). |
| F25 | **Android app on Android 7.0+** | ✅ Built | The system MUST ship an Android app supporting Android 7.0 or higher. |
| F26 | **Android Share sheet integration** | ✅ Built | After installing the Android app, the application MUST appear automatically in the system Share sheet of any other app. No extra configuration step MUST be required. |
| F27 | **Android tab capture: not supported** | 🔴 Not Defined | Android does not support browser extensions in Chrome, so the Save tabs workflow is not available on Android. The mobile app MAY add native multi-tab capture in the future via system APIs. |
| F28 | **Mobile reopen-all-tabs: not supported on mobile** | 🔵 Planned | Reopen-all-bookmarks-in-collection (web/desktop F35) is NOT YET available on iOS or Android. Saved tab batches are individual bookmarks the user opens one at a time on mobile. |
| F29 | **Tab reopen on web/desktop** | ✅ Built | The user MUST be able to reopen every bookmark in a saved tab batch by right-clicking the collection in the sidebar → **Open all bookmarks**, or by multi-selecting bookmarks → **Open** in the toolbar. |
| F30 | **No offline mode** | ✅ Decided | The mobile apps MUST NOT support offline read or offline save. An internet connection MUST be required to sync changes and save new bookmarks. The user-facing copy MUST be explicit about this. |
| F31 | **Multi-device sync** | ✅ Decided | The user MUST be able to use the apps on as many devices as they want; the library MUST sync automatically across all devices where the user is signed in. |
| F32 | **Save link from page context menu** | ✅ Built | Right-clicking a link on a page MUST surface "Save link" via the browser's native context menu integration. |
| F33 | **Save image from page context menu** | ✅ Built | Right-clicking an image on a page MUST surface "Save image" via the browser's native context menu integration; the image's source URL is saved as a bookmark. |
| F34 | **Mobile app full feature parity** | ✅ Decided | The mobile app MUST be a full-featured client supporting tags, filters, collections, search, and all features the desktop app offers (modulo the mobile asymmetries documented across earlier PRDs — e.g. backups via web app per **Import / Export / Backup PRD F32**). |
| F35 | **Apple Shortcuts integration** | ✅ Built | The iOS app MUST expose its core actions (save link, save text, search) to Apple Shortcuts so users can build automation flows. |
| F36 | **No background data collection (default permissions)** | ✅ Decided | Under default permissions, the extension MUST NOT read, transmit, or log any page content the user has not explicitly chosen to save. |
| F37 | **Sign-in required** | ✅ Decided | All capture surfaces MUST require an authenticated session. An anonymous user invoking any capture flow MUST be routed through sign-in or sign-up before any bookmark is created. |
| F38 | **Saved-page indicator honors ownership, not access** | ⚪ Capability Split | The saved-page indicator MUST be triggered ONLY by bookmarks the user OWNS — bookmarks in collections shared TO the user MUST NOT trigger the indicator. Per **Sharing / Collaboration PRD Schema Invariant 23**. |
| F39 | **Browser extension does not own backups or full export** | ✅ Decided | Per **Import / Export / Backup PRD §11.2**, the browser extension is not a backup or full-export surface. Capture and search are its remit. |
| F40 | **Other mobile browsers (Chrome / Firefox on phones) use share menu** | ✅ Decided | Mobile Chrome and Firefox don't support extensions. Users MUST use the application's Share-sheet integration instead of expecting an in-browser extension. |
| F41 | **Persistent extension authentication** | ✅ Decided | The extension MUST persist the user's session token across browser restarts. Repeated sign-in MUST NOT be required at typical session boundaries. Token rotation and revocation are owned by **User / Account**. |
| F42 | **Save video from page context menu** | ✅ Built | Right-clicking a video element on a page MUST surface **Save video** via the browser's native context menu integration. The video element's source URL is saved as a bookmark. Where the source URL is a `blob:` or otherwise inaccessible reference, the system MUST fall back to saving the parent page URL with a clear message about the limitation. |

---

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Browser extension capture surfaces

| Surface | Trigger | Behavior |
|---|---|---|
| **Toolbar icon click** | Single click | Opens save popup; pre-fills metadata; user confirms or edits and saves. |
| **Toolbar icon click (Clipper enabled)** | Single click + Clipper on | Saves immediately to default collection; no popup. |
| **Right-click toolbar icon** | Context menu | Surfaces secondary actions: **Save tabs**, **Open Sidebar**, **Settings**. |
| **Right-click on page** | Context menu | Surfaces **Save page** action via browser-native context menu integration. |
| **Right-click on link** | Context menu | Surfaces **Save link** action. |
| **Right-click on image** | Context menu | Surfaces **Save image** action; saves the image's source URL as the bookmark. |
| **Keyboard shortcut** | `Ctrl+Shift+S` / `Cmd+Shift+S` | Routes to highlight save (if text selected) or page save (otherwise). Per **Bookmarks PRD F14**. |
| **Side panel toggle** | `Ctrl+.` / `Cmd+.` or right-click → Open Sidebar | Toggles persistent sidebar mini-app. Per **Bookmarks PRD F19**. |
| **Address-bar `rd` + Tab** | Type `rd`, press Tab | Switches omnibox into bookmark search; live results in dropdown. |

### 5.2 Save popup contents

| Field | Behavior |
|---|---|
| URL | Pre-filled with the current page URL; read-only by default; editable on user request. |
| Title | Pre-filled from page metadata; editable. |
| Description / excerpt | Pre-filled from parsed page metadata; editable. |
| Cover image | Pre-fetched from page meta tags; user MAY swap. |
| Tags | Empty by default; user MAY type or pick. |
| Target collection | Default per **Bookmarks PRD §5 default-collection logic** (Unsorted or last-used); user MAY pick another. |
| Reminder (optional) | If reminders are enabled per **Reminders PRD** (out of scope here), user MAY set one. |
| Favorite state (optional) | The save popup MAY expose the bookmark's `important` field (per **Bookmarks PRD §8**) as a Favorite toggle. Default value is `false`; the user MAY mark the new bookmark as a Favorite at save time. The mobile share-sheet save dialog MAY expose the same toggle behind a secondary control. |
| Action buttons | **Save** (primary), **Cancel**. |

### 5.3 Tab capture flow

| Rule | Behavior |
|---|---|
| Trigger | Right-click extension icon → **Save tabs**, OR (iOS) Safari → puzzle icon → application → Tabs. |
| Tab enumeration | The system MUST list every open tab in the CURRENT window only. Multi-window tab capture is 🔴 Not Defined. |
| Per-tab exclusion | Hover (or tap) → trash icon excludes that tab from the batch. |
| Target collection | Default Unsorted; user MAY pick. |
| Auto-tag | Every bookmark in the batch MUST be tagged with today's date in `YYYY-MM-DD` format (or locale-equivalent). |
| Per-batch metadata | The batch MUST NOT carry any per-batch entity — it is just a set of bookmarks that share the auto-tag. |
| Save-time dedupe | Forbidden — the flow MUST create one bookmark per included tab regardless of whether the URL is already saved. (F11) |
| Post-save | The user is dropped back into their browsing context; new bookmarks are visible in the target collection on any synced device. |

### 5.4 Saved-page indicator coordination

| Rule | Behavior |
|---|---|
| Default state | OFF. |
| Permission gate | Enabling MUST request "Access data on websites." |
| Trigger | When the user navigates to a URL that matches a bookmark they OWN (per **Bookmarks PRD §5 URL identity normalization**), the toolbar icon MUST display the badge. |
| Badge visual | Owned by **Bookmarks PRD F20**: background `#0087EA`, text `✓`, text color `#FFFFFF`. |
| Ownership-only rule | The indicator MUST NOT activate for bookmarks the user has access to but does not own (collections shared TO the user). Per **Sharing / Collaboration PRD Schema Invariant 23**. |
| URL match scope | The check uses bookmark-identity normalization (per **Bookmarks PRD §5**), NOT the more aggressive duplicate-equivalence normalization (per **Duplicates & Broken Links PRD §5.1**). |
| Privacy posture | When the indicator is OFF, the extension MUST NOT send URL lookups to the application server in the background. The lookup happens only when the user visits a page AND the indicator is ON. |

### 5.5 Side panel / sidebar capabilities

| Rule | Behavior |
|---|---|
| Browser support | Chrome, Edge, Firefox. |
| Activation | `Ctrl+.` / `Cmd+.` keyboard shortcut OR right-click toolbar → Open Sidebar OR (Firefox) View → Sidebar. |
| Functionality | Full mini-app: browse collections, search, view bookmark details, drag-and-drop saves. |
| Drag-and-drop | The user MUST be able to drag links and images from the page into the open sidebar to save them. The dragged target MUST resolve to a URL or image source URL the bookmark pipeline accepts. |
| Persistence | The sidebar MUST persist across navigations within the same window until the user closes it. |
| Safari and others | Sidebar MUST NOT appear on Safari or other browsers without sidebar support. |

### 5.6 Address-bar / omnibox search

| Rule | Behavior |
|---|---|
| Trigger | Type `rd` in the address bar, press Tab. |
| Search behavior | Live search owned by **Search & Filters PRD**. Results appear in the omnibox dropdown. |
| Selection | Selecting a result MUST navigate the browser to the bookmark's URL. |
| Browser support | Chrome, Edge, Firefox. NOT Safari, NOT Vivaldi. |
| Chrome activation hint | In Chrome, **Settings → Search engine → Keyboard shortcut → Space or tab** MAY need to be set to enable Tab activation. |
| Keyword conflict | If `rd` collides with another extension's omnibox keyword, the user MUST resolve via the browser's native keyword settings. |

### 5.7 Permissions model

| Permission | When requested | Why |
|---|---|---|
| `activeTab` (or equivalent) | Default | Read the URL and title of the current tab WHEN the user clicks the extension. |
| `storage` | Default | Persist the user's session token and per-extension preferences locally. |
| `contextMenus` | Default | Surface the right-click context menu items. |
| `tabs` (limited) | Default for Save tabs | List the user's currently open tabs in the current window for tab capture (F08). |
| **`Access data on websites` / `<all_urls>`** | OPTIONAL — only when user opts in | Required for saved-page indicator (F06) and highlight-on-revisit (per **Highlights PRD**). |

| Rule | Behavior |
|---|---|
| Privacy default | The extension MUST NOT collect or transmit any page content the user has not explicitly chosen to save under default permissions. |
| Permission revocation | The user MAY revoke any optional permission at any time via the browser's native extension settings. The dependent feature MUST stop functioning until re-granted. |
| Permission UX | When the user enables a feature requiring a broader permission, the system MUST explain the permission cost in plain language BEFORE the browser's native prompt. |
| Same-account, multiple browsers | The user MAY install the extension on multiple browsers; permissions are scoped per browser. |

### 5.8 Mobile capture surfaces

| Surface | Platform | Behavior |
|---|---|---|
| **iOS Share extension** | iOS / iPadOS 17+ | Saves links and files from any app via the iOS Share sheet; full save dialog with metadata editing. |
| **iOS Safari extension** | iOS / iPadOS 17+ | Highlights selected text on Safari-rendered pages; same highlight semantics as desktop browser extension. |
| **iOS "Add to Unsorted" share action** | iOS / iPadOS 17+ | One-tap save to Unsorted; no save dialog. |
| **iOS Save tabs** | iOS / iPadOS 17+ via Safari extension | Captures all open Safari tabs as a batch. |
| **iOS Apple Shortcuts** | iOS / iPadOS 17+ | Exposes save and search as Apple Shortcuts actions for user automation. |
| **Android Share-sheet integration** | Android 7.0+ | Application appears in the system Share sheet automatically; full save dialog. |
| **Android tab capture** | n/a | Not supported (browsers on Android don't expose extensions). |
| **Mobile Chrome / Firefox in-browser extension** | n/a | Not supported on these platforms. Users use the system Share sheet. |

### 5.9 Bookmarklet alternative

| Rule | Behavior |
|---|---|
| Format | A `javascript:` URL that the user installs as a browser bookmark labeled "Save to <App>". |
| Behavior | Clicking the bookmarklet MUST open a small popup window pre-filled with the current page's URL and title. The popup is the application's standard add-bookmark surface. |
| Permissions | The bookmarklet MUST NOT request additional browser permissions. |
| Cross-browser | The bookmarklet MUST work in any browser that supports `javascript:` URLs. |
| Discovery | The system MUST publish the bookmarklet on the help page or settings page so users can copy it. |

### 5.10 Cross-platform parity matrix

| Capability | Desktop browsers | iOS | Android |
|---|---|---|---|
| Save current page | ✅ Toolbar icon + popup | ✅ Share extension | ✅ Share sheet |
| Save link from page | ✅ Right-click context menu | ✅ Share from any app | ✅ Share from any app |
| Save image from page | ✅ Right-click context menu | ✅ Long-press → Share | ✅ Long-press → Share |
| One-click Save (auto-save) | ✅ Clipper | ✅ Add to Unsorted | 🔴 Not Defined |
| Save tabs (batch) | ✅ All four browsers | ✅ Safari only via extension | ❌ Not supported (F27) |
| Highlights on live page | ✅ Browser extension | ✅ Safari extension | 🔴 Not Defined |
| Saved-page indicator | ✅ Optional, opt-in | 🔴 Not Defined | 🔴 Not Defined |
| Sidebar mini-app | ✅ Chrome / Edge / Firefox | n/a | n/a |
| Address-bar search | ✅ Chrome / Edge / Firefox | n/a | n/a |
| Reopen-all-bookmarks-in-collection | ✅ | 🔵 Planned (F28) | 🔵 Planned (F28) |
| Apple Shortcuts | n/a | ✅ | n/a |
| Backup creation | ❌ Web app only (per **Import / Export / Backup PRD F32**) | ❌ Same | ❌ Same |

### 5.11 Authentication and session

| Rule | Behavior |
|---|---|
| Sign-in required | All capture surfaces MUST require an authenticated session. |
| Session persistence | The extension and apps MUST persist the session token across restarts. |
| Token rotation | Token rotation, expiration, and revocation are owned by **User / Account**. |
| Multi-device | The user MAY sign in on as many devices as they want; sync is automatic. |
| Sign-out | The user MAY sign out from any surface. Sign-out from one device MUST NOT sign out other devices unless the user explicitly revokes. |

### 5.12 Offline behavior

| Rule | Behavior |
|---|---|
| Mobile apps offline | NOT supported. The user MUST have an internet connection to save and to view their library. (F30) |
| Browser extension offline | The extension surfaces (popup, side panel, address-bar search) all require connectivity. The bookmarklet's dialog requires connectivity to commit a save. |
| Offline queueing | NOT supported. Saves attempted while offline MUST surface a clear error; the user MUST retry once online. |
| Cached bookmark list | The mobile app MAY cache the user's bookmarks for fast display, but operations (create, edit, delete) MUST require network and MUST refuse offline. |

### 5.13 Cross-capability data flow

| Source | This capability uses it for |
|---|---|
| Bookmark URL identity normalization (per **Bookmarks PRD §5**) | Saved-page indicator URL match. |
| Bookmark URL parser pipeline (per **Bookmarks PRD §5 URL parsing**) | Title / description / cover / tags pre-fill on the save popup. The page-metadata extraction details (Open Graph, JSON-LD, image-candidate filtering) are owned by Bookmarks PRD's parser, not by this PRD's surfaces. |
| Default-collection logic (per **Bookmarks PRD**) | Where to save when the user doesn't pick a target. |
| Tag identity (per **Tags PRD**) | Auto-tagging the tab-capture batch with today's date. |
| User session token | Authenticating capture and search calls. |
| Sharing access model (per **Sharing / Collaboration PRD**) | Excluding shared-to-the-user bookmarks from the saved-page indicator. |
| Search behavior (per **Search & Filters PRD**) | Address-bar / omnibox and side-panel search. |
| Highlight create flow (per **Highlights PRD**) | Selected-text capture from the browser extension and iOS Safari extension. |
| Files upload pipeline (per **Files PRD**) | Mobile share-sheet shared files MUST route through Files PRD's upload pipeline; this PRD owns the share-sheet entry point and Files PRD owns format validation, size limits, and persistence. |

---

### System Constants

### 6.1 Internal Service Capabilities

| System Capability | Requirement |
|---|---|
| Receive bookmark create from extension popup | The system MUST accept bookmark create payloads from the extension's authenticated session. |
| Receive batch bookmark create from tab capture | The system MUST accept a batch payload of `n` bookmarks with a shared auto-tag. |
| Receive bookmark create from iOS / Android share | Same as extension popup. |
| Receive one-tap "Add to Unsorted" save | The system MUST accept a minimal payload (URL, title, optional description) and route to Unsorted with no further metadata. |
| Receive highlight create from extension | The system MUST accept a highlight create call routed from the extension's content script. Per **Highlights PRD**. |
| Receive search query from omnibox | The system MUST accept the search query and return results in the standard search-response shape. |
| Resolve saved-page indicator state | The system MUST resolve "is this URL saved by this user (owned, not shared-to)" and return a boolean for the badge. |
| Persist auth token on the device | The extension and apps MUST persist the token securely in their respective storage layers. |
| Refresh / rotate auth token | Per **User / Account**. |
| Bookmarklet popup page | The system MUST serve a small popup page that pre-fills URL and title for the bookmarklet flow. |

### 6.2 System Response Conventions

| Response | Behavior |
|---|---|
| Save success | Returns the new bookmark's identifier and resolved fields per **Bookmarks PRD**. |
| Tab-capture success | Returns the count of bookmarks created and the shared auto-tag. |
| Save tab-capture partial failure | The system SHOULD attempt all tabs and return a per-tab outcome list (created vs. failed). The user MUST be able to retry failed tabs. |
| Save failure (any) | Returns a typed error code so the surface can render appropriate UX. |
| Save while offline | The surface MUST refuse and tell the user to retry online. NO silent queueing. |
| Saved-page indicator response | Boolean. The system MUST NOT return the bookmark's contents in this lookup. |

### 6.3 Error and Condition Handling

| Condition | Behavior |
|---|---|
| Anonymous user invokes capture | Surface routes to sign-in / sign-up before any save. |
| Save while offline | Surface refuses with a clear "no connection — try again" error. |
| URL is unreachable from the server | Save MAY still succeed with the user's input title / description (per **Bookmarks PRD URL parser fallback**); cover image and other parsed fields MAY be blank. |
| Tab capture with very many tabs | The system SHOULD impose a soft cap (recommendation: 100 tabs per single Save tabs invocation; the limit is a 🟠 Product Decision). Above the cap, the user MUST be told to invoke the flow multiple times. |
| Permission denied for saved-page indicator | The badge silently does not appear. The user is NOT spammed with errors on every page navigation. |
| Token expired | The surface MUST detect 401 / 403 responses and route to re-auth without losing the user's in-progress save data where possible. |
| Bookmarklet popup blocked by browser | The user is told to allow popups for the bookmarklet domain. |
| Browser-extension keyword conflict | The user is told to resolve via browser's native settings. |
| Extension uninstalled mid-save | The save was already submitted; the bookmark exists. The user can confirm in the application's web app. |

### 6.4 Reserved Constants

| Item | Rule |
|---|---|
| `EXTENSION_BROWSERS` | `chrome`, `safari`, `edge`, `firefox` (Chrome extension also runs in Arc, Vivaldi, Opera, Brave). |
| `MOBILE_PLATFORMS` | `ios` (iOS / iPadOS 17+), `android` (Android 7.0+). |
| `OMNIBOX_KEYWORD` | `rd`. |
| `SIDE_PANEL_KEYBOARD_SHORTCUT` | `Ctrl+.` (Windows / Linux), `Cmd+.` (Mac). Owned by **Bookmarks PRD F19**. |
| `SAVE_KEYBOARD_SHORTCUT` | `Ctrl+Shift+S` (Windows / Linux), `Cmd+Shift+S` (Mac). Owned by **Bookmarks PRD F14**. |
| `SAVED_PAGE_BADGE_BACKGROUND` | `#0087EA`. Owned by **Bookmarks PRD F20**. |
| `SAVED_PAGE_BADGE_TEXT` | `✓`. Owned by **Bookmarks PRD F20**. |
| `SAVED_PAGE_BADGE_TEXT_COLOR` | `#FFFFFF`. Owned by **Bookmarks PRD F20**. |
| `TAB_CAPTURE_AUTO_TAG_FORMAT` | ISO 8601 `YYYY-MM-DD` (recommended; locale-equivalents acceptable). |
| `TAB_CAPTURE_SOFT_MAX_PER_INVOCATION` | 🟠 Product Decision; recommendation: 100 tabs. |
| `BOOKMARKLET_POPUP_DIMENSIONS` | `450 × 600` pixels (per source-published bookmarklet code). |

### 6.5 Internal Action Types

| Action | Purpose |
|---|---|
| `capture.savePage` | Save the current page from any surface. |
| `capture.saveLink` | Save a specific link (right-click context menu). |
| `capture.saveImage` | Save a specific image's source URL. |
| `capture.saveSelection` | Route selected-text capture to highlight save. |
| `capture.saveTabs` | Save a batch of open tabs with shared auto-tag. |
| `capture.addToUnsorted` | One-tap save (iOS) — URL + title only, target Unsorted. |
| `capture.openSidePanel` | Toggle the persistent sidebar. |
| `capture.omniboxSearch` | Run a search from the address bar. |
| `capture.savedPageLookup` | Resolve saved-page indicator boolean for a URL. |
| `capture.bookmarkletPopup` | Serve the bookmarklet popup UI. |
| `capture.requestPermission` | Request the optional broader-access browser permission. |
| `capture.revokePermission` | Detect and respond to user-side permission revocation. |

### 6.6 Plan-Tier Gating

| Capability | Free | Paid |
|---|---|---|
| Browser extension | ✅ | ✅ |
| Mobile apps | ✅ | ✅ |
| Toolbar capture, context-menu capture, keyboard shortcut | ✅ | ✅ |
| Save tabs / Tab capture | ✅ | ✅ |
| Saved-page indicator (opt-in) | ✅ | ✅ |
| Side panel mini-app | ✅ | ✅ |
| Address-bar search | ✅ | ✅ |
| Bookmarklet | ✅ | ✅ |
| Multi-device sync | ✅ | ✅ |

The capture surfaces are universally free. Plan-gating happens at the underlying capability level (e.g. web archive captures during save are gated per **Web archive PRD**), not at the surface.

### 6.7 Privacy and Security Rules

| Rule | Behavior |
|---|---|
| Default-permission privacy | Under default permissions, the extension MUST NOT read, transmit, or log any page content the user has not explicitly chosen to save. |
| Optional permission disclosure | When the user opts into a feature requiring broader permissions, the system MUST explain the permission cost in plain language BEFORE the browser's native prompt. |
| Permission revocation | The user MAY revoke any optional permission at any time via the browser's native extension settings; the dependent feature MUST stop functioning until re-granted. |
| Saved-page indicator privacy | The URL lookup that powers the indicator MUST happen only when the indicator is enabled AND the user is on a real page. The lookup MUST NOT be sent during private/incognito browsing where the browser's API restricts it. |
| Background data exfiltration | NEVER. The extension MUST NOT collect or transmit data in the background under any circumstances. |
| Bookmarklet permission | The bookmarklet MUST NOT require any browser permissions. It opens a popup and uses standard web app save flows. |
| Token storage | The session token MUST be stored in the extension's secure storage layer (not page-accessible). |
| Cross-origin data | The extension's content scripts MUST honor the browser's same-origin and CSP rules. |

---

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| User clicks toolbar icon on a page | Save popup opens, pre-filled. |
| User clicks toolbar icon with Clipper enabled | Save commits immediately to default collection; no popup. |
| User right-clicks toolbar icon | Context menu: Save tabs, Open Sidebar, Settings. |
| User right-clicks a link on a page | Browser-native context menu surfaces "Save link." |
| User right-clicks an image on a page | Browser-native context menu surfaces "Save image"; image's source URL becomes the bookmark. |
| User selects text and presses save shortcut | Text is saved as a highlight on the parent page (per **Highlights PRD**). |
| User presses save shortcut with no selection | Whole page is saved per UC-01. |
| User opens side panel via `Ctrl+.` | Sidebar opens persistently. |
| User opens side panel via right-click → Open Sidebar | Same. |
| User on Safari tries to open side panel | Side panel MUST NOT appear (F13). |
| User types `rd` and Tab in Chrome address bar | Omnibox switches to bookmark search; live results. |
| User on Chrome without `Space or tab` setting tries `rd Tab` | Search activation fails; user is directed to enable the setting. |
| User on Safari tries `rd Tab` | Omnibox search MUST NOT activate. |
| User invokes Save tabs with 25 open tabs | All 25 listed; user excludes 3; remaining 22 saved with today's date tag. |
| User invokes Save tabs twice in a row | Two separate batches created; each tagged with the same date; user can clean up via Duplicates filter. |
| User invokes Save tabs with 200 tabs | 🟠 Product Decision per soft cap (recommendation: split into 2+ invocations). |
| User on iOS taps "Add to Unsorted" share action | Link saved to Unsorted, no dialog. |
| User on iOS taps the application's standard Share extension | Save dialog opens with metadata editing. |
| User on iOS uses Safari extension to highlight | Highlight created on the page's bookmark per **Highlights PRD**. |
| User on iOS uses Safari extension → Tabs | All open Safari tabs listed; flow matches desktop UC-05. |
| User on Android taps Share in Chrome | Application appears in Share sheet; save dialog opens. |
| First-time Android user doesn't see app in Share sheet | User scrolls / expands; after first use, app moves toward top. |
| User on Android tries to find Save tabs | Not available — Chrome on Android doesn't support extensions (F27). |
| User on Android tries to reopen all bookmarks in a collection | Not yet supported on mobile (F28); user opens one at a time. |
| User on web/desktop right-clicks a collection → Open all bookmarks | Browser opens every bookmark in a new tab. |
| User on web/desktop multi-selects 5 bookmarks → Open | Browser opens the 5 selected bookmarks. |
| User enables saved-page indicator | Browser prompts for "Access data on websites"; user grants; badge activates on saved pages. |
| User disables saved-page indicator | Permission MAY remain granted (controlled by user via browser settings); the extension stops querying. |
| User revokes "Access data on websites" via browser settings | Saved-page indicator stops activating; highlights-on-revisit stops working; the application MUST handle gracefully. |
| User on a mobile browser without app extension support | Uses system Share sheet (F40). |
| Anonymous user clicks the toolbar icon | Sign-in prompt fills the popup. |
| User saves while offline (mobile app) | Save refused with clear error; no silent queue. |
| User uses the bookmarklet on Safari (no extension) | Popup opens; save works via the application's standard save flow. |
| User installs extension on a 2nd browser (e.g. Edge after Chrome) | Permissions are scoped per browser; sign-in required separately. |
| User uses Apple Shortcuts to save a link | Shortcut invokes the iOS app's save action; bookmark created. |
| Token expired during a save | Surface detects 401 / 403; routes to re-auth; preserves in-progress save data. |
| User uses one-click Clipper but later wants to edit | Disables Clipper temporarily, OR uses right-click → Save with options if exposed (🟠). |
| User has the saved-page indicator on AND visits a page they were invited to via shared collection (but don't own) | Badge MUST NOT activate (F38 / **Sharing / Collaboration PRD Schema Invariant 23**). |
| Tab capture saves a tab whose URL the user already owns | New bookmark is still created (F11); the original bookmark is unaffected. |

---

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

The capture surfaces operate on bookmark records (owned by **Bookmarks PRD**) and tag records (owned by **Tags PRD**). This PRD does not introduce new persisted entities — its specification is about the surfaces' inputs, outputs, and configuration.

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| `extensionSettings.savedPageIndicator` | boolean | system | True when the user has opted in to the saved-page indicator. | Default false. |
| `extensionSettings.clipperAutoSave` | boolean | system | True when one-click Save is enabled (Clipper). | Default false. |
| `extensionSettings.lastUsedCollectionId` | number | system | The collection the user last saved into via the popup. Used as the default for subsequent saves per **Bookmarks PRD §5 default-collection logic**. | Reset to Unsorted (`-1`) on sign-out. |
| `extensionSettings.optionalPermissionsGranted` | array of `string` | system | Browser-permission identifiers the user has granted. | Browser-managed; the extension queries the browser's permission API, does not persist. |
| `iosShareSettings.addToUnsortedEnabled` | boolean | system | True when the user has enabled the iOS Add-to-Unsorted Share-sheet action. | iOS-managed; reflected for telemetry. |
| `iosShareSettings.shareExtensionEnabled` | boolean | system | True when the user has enabled the iOS Share extension. | iOS-managed. |
| `iosShareSettings.safariExtensionEnabled` | boolean | system | True when the user has enabled the iOS Safari extension. | iOS-managed. |
| `tabCaptureRequest.tabs` | array of `TabCaptureItem` | input | The tabs the user includes in the batch. | Excluded tabs MUST NOT be in this list. |
| `tabCaptureRequest.targetCollectionId` | number | input | The destination collection for the batch. | Default Unsorted (`-1`). |
| `tabCaptureRequest.autoTag` | string | system | The tag applied to every bookmark in the batch. | Default `YYYY-MM-DD`. |
| `omniboxSearchRequest.query` | string | input | The user's typed query. | Routed to **Search & Filters PRD**. |
| `savedPageLookupRequest.url` | string | input | The current page URL. | Used for bookmark-identity match. |
| `savedPageLookupResponse.matched` | boolean | system | True when the URL matches a bookmark the user OWNS. | False for shared-to-the-user matches. |

## 12. Database / Schema Notes

### Enums

```ts
type CaptureSurface =
  | "browser_extension_popup"
  | "browser_extension_context_menu"
  | "browser_extension_keyboard_shortcut"
  | "browser_extension_clipper_auto_save"
  | "browser_extension_save_tabs"
  | "browser_extension_side_panel"
  | "browser_extension_omnibox"
  | "browser_extension_bookmarklet"
  | "ios_share_extension"
  | "ios_safari_extension"
  | "ios_add_to_unsorted"
  | "ios_safari_save_tabs"
  | "ios_apple_shortcuts"
  | "android_share_sheet";

type Browser =
  | "chrome"
  | "safari"
  | "edge"
  | "firefox"
  | "arc"           // Chrome-derivative; uses Chrome extension
  | "vivaldi"       // Chrome-derivative; uses Chrome extension
  | "opera"         // Chrome-derivative; uses Chrome extension
  | "brave";        // Chrome-derivative; uses Chrome extension

type MobilePlatform =
  | "ios"
  | "ipados"
  | "android";

// Optional broader-access permission identifier; varies by browser
// API but conceptually the same across extensions.
type OptionalPermission =
  | "access_data_on_websites";

type TabCaptureExclusionReason =
  | "user_excluded"      // user clicked the trash icon next to the tab
  | "internal_url"       // browser-internal URL (e.g. chrome://...) ineligible
  | "permission_denied"; // permission to read tab URL was denied
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
| **Extension save popup** | Save the current page; edit title / description / tags / collection. |
| **Extension settings page** | Clipper, saved-page indicator opt-in, default-collection preferences. |
| **Extension Save tabs dialog** | List of open tabs with per-tab exclusion and target-collection picker. |
| **Extension side panel mini-app** | Persistent sidebar with browse / search / drag-and-drop. |
| **Bookmarklet popup window** | The `450 × 600` popup served when the bookmarklet runs. |
| **iOS Share extension save dialog** | Mobile equivalent of the desktop popup. |
| **iOS Safari extension highlight controls** | Selection-action overlay for highlights. |
| **iOS Save tabs dialog (Safari extension)** | iOS counterpart of the desktop Save tabs dialog. |
| **iOS one-tap Share-sheet action** | Visible as an action in the iOS Share-sheet action row; no dialog when tapped. |
| **Android Share-sheet save dialog** | Mobile equivalent of the desktop popup. |
| **Sign-in prompt (capture surface)** | Replaces the popup / dialog when the user is not signed in. |
| **Permission-explanation modal** | In-product copy shown before triggering the browser-native permission prompt. |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| **Toolbar icon** | The extension's persistent presence in the browser toolbar. |
| **Toolbar icon badge** | Saved-page indicator (when enabled) per **Bookmarks PRD F20**. |
| **Save popup form** | URL / title / description / cover / tags / collection / save-cancel. |
| **Tab list row** | One per open tab with a trash-icon exclude affordance. |
| **Target collection picker** | Reusable across surfaces. |
| **Tag chip input** | Reusable across surfaces. |
| **Side-panel drag-target zone** | Accepts dragged links and images from the page. |
| **Omnibox result row** | Title + URL + collection chip in the omnibox dropdown. |
| **Permission cost callout** | "Enabling this needs the X permission so we can Y" copy block. |
| **Mobile share-sheet action icon** | The application's icon as it appears in iOS / Android Share sheets. |

---

## 15. Workflow Requirements

| Operation | Required Behavior | Shared / Core Handling |
|---|---|---|
| **Create** | Capture surfaces create bookmarks (one or many — a single page, a selected-text highlight, or every open tab in the current window) and route them through the standard bookmark pipeline. | Owned here as the trigger; bookmark creation owned by **Bookmarks PRD**. |
| **Edit** | The post-save dialog from the browser extension popup MUST allow the user to edit title, description, tags, and target collection before committing. The mobile share sheet MUST allow the same with platform-appropriate UI. The one-tap **Add to Unsorted** flow on iOS is deliberately non-editing — speed beats edit fidelity. | Owned here. |
| **Delete** | The capture surfaces do not delete. A user accidentally saving a page can undo via the post-save dialog or via Trash per **Bookmarks PRD §5**. | n/a |
| **Search** | The browser extension MUST expose two search surfaces: address-bar / omnibox (where supported) and the side panel mini-app. Both MUST consume the standard search behavior owned by **Search & Filters PRD**. | Owned by **Search & Filters PRD**; entry points owned here. |

---

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|
| **Capture-side bookmark create handler** | Accepts `SavePageRequest`, `AddToUnsortedRequest`, batch `SaveTabsRequest`. |
| **Saved-page lookup service** | Resolves the boolean for the indicator with ownership check. |
| **Omnibox search relay** | Forwards omnibox queries to **Search & Filters PRD** with extension-surface attribution. |
| **Surface attribution observability** | Tags every save with the originating surface for analytics. |
| **Bookmarklet popup server** | Serves the hosted popup page. |
| **Permission-grant coordination** | Server-side state for whether the user has granted optional permissions on a given device. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| **Extension popup module** | The save UI when the toolbar is clicked. |
| **Extension context-menu module** | Right-click integrations. |
| **Extension content script** | Reads page metadata at user-initiated save time only. |
| **Extension background service worker** | Persistent runtime; handles omnibox, side panel, lookup polling. |
| **Saved-page indicator module** | URL-match lookup + badge display. |
| **Side panel module** | Mini-app rendering inside the browser sidebar. |
| **Omnibox module** | `rd` keyword integration. |
| **Tab capture module** | Tab enumeration, exclusion UI, batch save. |
| **Settings module** | User-side configuration: Clipper, indicator, default collection, sidebar. |
| **Permission orchestration module** | Coordinates broader-access permission requests with in-product explanation. |
| **Session token persistence module** | Secure storage of the auth token. |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| **Bookmarklet popup component** | The hosted save popup served by the application's web app for bookmarklet flows. |
| **Application web app extension installer prompt** | Optional onboarding that nudges users to install the extension. |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| **iOS Share extension module** | Receives links from the iOS Share sheet; opens the save dialog. |
| **iOS Safari extension module** | Highlights + tab capture via Safari's extension API. |
| **iOS Add-to-Unsorted action module** | One-tap save Share-sheet action. |
| **iOS Apple Shortcuts module** | Exposes save and search actions. |
| **Android Share-sheet receiver module** | Receives Share-sheet intents from the system. |
| **Mobile session token storage** | Secure platform keychain integration. |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| **Telemetry / surface attribution** | Captures originating surface for every save. |
| **Permission state observer** | Tracks browser-managed permission grants and revocations. |
| **Cross-device sync engine** | Standard sync — capture surfaces produce bookmarks the same as any other surface. |
| **Session-token rotation infrastructure** | Per **User / Account**. |
| **Feature flag infrastructure** | Phased rollout of new surfaces and behaviors (e.g. expanded omnibox support, new context-menu items, mobile reopen-all when it ships per F28). Critical when the same code path runs across 4 official browsers + 4 Chrome derivatives + 2 mobile platforms — gradual rollout limits blast radius of regressions. |
| **Observability module** | Logs save success rates by surface, tab-capture batch sizes, omnibox usage, sidebar usage, permission grant/revoke events. |

---

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| **Browser extension package (Chrome / Edge / Firefox / Safari)** | The four extension distributions; Chrome distribution also covers Arc, Vivaldi, Opera, Brave. |
| **Extension popup component** | The save-current-page popup with editable title, description, tags, collection picker. |
| **Extension context-menu integration** | Right-click toolbar / page / link / image actions. |
| **Extension keyboard-shortcut handler** | `Ctrl+Shift+S` save and `Ctrl+.` side panel. |
| **Extension content script** | Reads page metadata when the user actively saves; does not collect data in the background. |
| **Extension background service worker** | Handles the popup, context menus, omnibox, and side panel; persists session token. |
| **Extension settings page** | Clipper, saved-page indicator opt-in, default-collection preferences, sidebar toggle. |
| **Saved-page indicator worker** | Issues the URL-match lookup when the indicator is enabled. |
| **Side panel mini-app** | Persistent sidebar with search, browse, drag-and-drop. |
| **Omnibox handler** | `rd` keyword search integration. |
| **Tab capture orchestrator** | Lists current-window tabs, applies exclusions, batches the save. |
| **Auto-tag generator** | Produces today's date tag in the user's locale. |
| **Bookmarklet popup page** | The hosted page the bookmarklet opens for save. |
| **iOS app** | Full-featured native iOS / iPadOS client. |
| **iOS Share extension** | iOS Share-sheet integration. |
| **iOS Safari extension** | iOS Safari highlight + Tabs surface. |
| **iOS one-tap Share action** | The "Add to Unsorted" iOS Share-sheet action. |
| **iOS Apple Shortcuts integration** | Exposes save and search actions to Apple Shortcuts. |
| **Android app** | Full-featured native Android client. |
| **Android Share-sheet integration** | Auto-registration in the system Share sheet. |
| **Permission-prompt orchestration** | Coordinates the in-product explanation with the browser-native permission prompt. |
| **Session-token storage** | Per-extension and per-app secure storage. |
| **Surface telemetry / observability** | Tracks save attribution by surface (popup, shortcut, omnibox, share, etc.) for product analytics. |

---

## 19. OSS / Build-vs-Buy Decision

1. **The capture surfaces are the product's most-used surfaces.** Most users save bookmarks far more often than they organize them. The extension popup, the iOS Share sheet, and the Android Share sheet handle the vast majority of save volume. Optimize them ruthlessly: load fast, pre-fill accurately, fail gracefully. A clunky save flow is a deal-breaker; a clunky settings page is a footnote.

2. **Permissions are a privacy contract.** The extension's "minimal by default, opt-in for broader access" model is the right starting point. Saving bookmarks does not require reading every page the user visits — that's only true for the saved-page indicator and live-page highlights. Treat the broader permission as a real cost the user is paying, and surface that cost in plain language before the browser's native prompt. Don't hide it behind a checkbox; users who realize after the fact that an extension reads every page are users who uninstall.

3. **The saved-page indicator's ownership-only rule prevents a real privacy bug.** When a user is added as a collaborator on someone else's collection, the bookmarks in that collection are accessible TO them — but they shouldn't appear as "saved by me" indicators while browsing. That would falsely imply the user has an ongoing personal relationship with the content. Use ownership, not access. (This is **Sharing / Collaboration PRD Schema Invariant 23** — mirror it rigorously.)

4. **One-click Clipper is for the right user, not every user.** Save automatically is great for users who save dozens of pages a day and don't need to edit metadata. It's a footgun for users who occasionally want to add a note or change the collection — without the popup, those edits don't happen. Default Clipper to off; let power users enable it; provide a "Save with options" right-click affordance so occasional metadata edits don't require fully disabling Clipper.

5. **Tab capture is a power feature with a deliberate duplicate trade-off.** The "Save tabs" flow doesn't dedupe at save time, on purpose. Deduping would mean some tabs the user explicitly chose to save would silently be skipped — confusing. Instead, every Save tabs invocation creates a fresh batch, and the **Duplicates** capability cleans up afterward. Document this clearly in product copy — users who don't expect the duplicates think the save is broken.

6. **Auto-tag every tab batch with today's date.** This is the cheapest possible future-self gift: weeks later, when the user wants to find "those tabs I saved when researching project X," the date tag is the lookup key. It's a tiny implementation cost and a huge UX payoff. Use ISO 8601 `YYYY-MM-DD` so the tags sort lexically.

7. **Side panel and omnibox are browser-asymmetric — accept that.** Safari doesn't expose a sidebar API. Vivaldi rejects custom omnibox keywords. Don't try to backfill these gaps with awkward modal popovers or in-page injected UI; either the platform supports it or it doesn't, and the product is better for not faking parity. Document the asymmetry where users will look (settings copy, install pages); users on the unsupported browsers can fall back to the toolbar popup.

8. **The bookmarklet is more than a fallback — it's a no-install entry point.** Users on machines where they can't install extensions (corporate-locked browsers, kiosks) can still save with the bookmarklet. Make the bookmarklet's hosted popup-page URL a permanent URL — if that URL moves, every installed bookmarklet breaks. Treat the bookmarklet as a hard product commitment.

9. **"No offline" is a design statement, not a missing feature.** A bookmark manager whose value is "your library, anywhere, in sync" doesn't gracefully partial-fail offline. Saves attempted offline that silently queue create stale-state bugs and confusing UX. Refusing offline saves with a clear "no connection" message is honest and right. Document this prominently — users moving from local-first tools will ask.

10. **Mobile is full-featured, not capture-only.** Some products treat their mobile app as a save-and-search shell, expecting users to switch to desktop for "real work." The mobile app is a complete client — tags, filters, collections, search, all of it. Maintain feature parity rigorously, except where platform constraints prevent it (backups via web app, mobile reopen-all not yet, mobile highlight on Android not yet). Document the asymmetries; treat them as genuine gaps to close, not architectural choices.

11. **Surface attribution observability earns its keep at the product-decision boundary.** Knowing what fraction of saves come from the extension popup vs. context menu vs. shortcut vs. Share sheet vs. omnibox tells the product team where to invest. The `surface` discriminator on every save is cheap to capture and disproportionately valuable for prioritization.

12. **The capture surfaces are the front door of the product. Treat them with the care a front door deserves.** Speed, reliability, privacy posture, and graceful degradation across platforms are not features — they are table stakes. The user's first impression of the application is often a save flow. Make it one they remember for the right reasons.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| **Bookmarks PRD** | The extension and mobile capture surfaces all create bookmarks. The save flow, URL parser, default-collection logic, and saved-page-indicator badge are owned by Bookmarks PRD; this PRD owns the surfaces that trigger them. |
| **Collections PRD** | Capture flows let the user choose a destination collection; tab-capture creates bookmarks in a chosen collection; the Unsorted system collection (`-1`) is the default fallback. |
| **Tags PRD** | Capture flows let the user attach tags at save time; tab-capture auto-tags the batch with today's date. |
| **Highlights PRD** | Highlights are created from the browser extension's content surface and from the iOS Safari extension. |
| **Reader / Articles PRD** | The extension's saved-page indicator and side panel surface bookmark identity, which the reader is reachable from. |
| **Search & Filters PRD** | The browser extension's address-bar / omnibox search and the side panel search both consume the standard search behavior owned by Search & Filters PRD. |
| **Public Page / Embed PRD** | The browser extension's saved-page indicator MUST honor ownership — bookmarks in collections shared TO the user MUST NOT count as the user's own saves. |
| **User / Account** | Capture surfaces require an authenticated session. Anonymous users are routed to the sign-in / sign-up flow. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| **Bookmarks PRD** | The extension popup, context menu, keyboard shortcut, and mobile share sheet are the primary entry points for bookmark creation in the wild. The save observability and default-collection behavior flow through this PRD's surfaces. |
| **Highlights PRD** | The browser extension and iOS Safari extension are the only practical surfaces for creating highlights on a live web page. |
| **Tabs / Tab Capture** | The "save all open tabs" workflow lives entirely on this PRD's surfaces (browser extension + iOS Safari extension). |

### Related Capabilities

| Capability | Relationship |
|---|---|
| **Bookmarks PRD** | Owns bookmark identity, URL parsing, default-collection logic, the saved-page indicator badge style (color `#0087EA`, text `✓`), and the keyboard-shortcut commands (`Ctrl+Shift+S` save, `Ctrl+.` side panel). This PRD owns how the surfaces invoke those behaviors. |
| **Highlights PRD** | Owns highlight creation. This PRD owns the surfaces that capture text on a live page. |
| **Search & Filters PRD** | Owns search behavior. This PRD owns the address-bar / omnibox and side-panel search entry points. |
| **Duplicates & Broken Links PRD** | The tab-capture flow deliberately creates duplicates each time it runs; the Duplicates capability is the recommended cleanup path. |
| **Sharing / Collaboration PRD** | The saved-page indicator MUST use ownership, not access — bookmarks shared TO the user are NOT counted as their own saves. |
| **AI Assistant** (out of scope) | Both the browser extension popup and the mobile app surface an "Ask AI" entry point per source. The AI assistant itself is owned by a separate AI Assistant PRD (not in this 13-document suite). |

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
| Tab-capture soft cap | 🟠 Product Decision | Recommendation: 100 tabs per single Save tabs invocation. |
| Multi-window tab capture | 🔴 Not Defined | Currently only the current window's tabs are captured. |
| Android tab capture | 🔴 Not Defined | Browsers on Android don't expose extensions; native multi-tab capture via system APIs is a possible future feature. |
| Mobile reopen-all-bookmarks | 🔵 Planned | Not yet supported on iOS / Android (F28). |
| Browser-extension highlight UX (mobile) | 🔴 Not Defined | iOS Safari extension supports highlights; Android does not. |
| Saved-page indicator on mobile | 🔴 Not Defined | Currently desktop browser extension only. |
| Auto-tag format for tab capture | 🟠 Product Decision | Recommendation: ISO 8601 `YYYY-MM-DD`; locale-equivalents acceptable. |
| Omnibox keyword conflict resolution | 🟠 Product Decision | Whether the system surfaces a "your `rd` keyword conflicts with another extension" warning at install time. |
| Bookmarklet hosting durability | 🟠 Product Decision | The bookmarklet's `javascript:` URL embeds a hard-coded popup-page URL; if that URL moves, all installed bookmarklets break. Recommendation: make the popup page a permanent URL. |
| Context-menu Save image source URL vs. binary | 🟠 Product Decision | Recommendation: save the image's source URL as a regular bookmark; binary upload is a Files-PRD-owned flow. |
| Right-click → "Save with options" affordance when Clipper enabled | 🟠 Product Decision | Allows occasional metadata editing without disabling Clipper. |
| Extension auto-update cadence | 🟠 Product Decision | Browser stores manage auto-update; the system MUST track installed-version distribution for compatibility planning. |
| Apple Shortcuts feature surface | 🟠 Product Decision | Which actions to expose: save link, save text, search, open collection? Recommendation: at least the first three. |
| Extension and app disconnect after long inactivity | 🟠 Product Decision | Token rotation policy is owned by **User / Account**; user-facing UX for "you've been signed out — sign in again" should be smooth, not jarring. |
| One-tap save default collection per device | 🟠 Product Decision | Currently the iOS Add-to-Unsorted action saves to Unsorted. Whether to allow a per-device "default collection" override is open. Recommendation: keep it Unsorted-only — simplicity is the design point. |
| In-extension notification on successful save | 🟠 Product Decision | Whether to show a brief toast / sound. Recommendation: a subtle visual confirmation; sound off by default. |
| Browser-extension test coverage matrix | 🟠 Product Decision | Maintain a per-browser test-pass discipline given the 4 official browsers + 4 Chrome-derivatives + bookmarklet. |
| 4 official browsers | ✅ Decided | Chrome, Safari, Edge, Firefox. |
| Chrome-derivative coverage | ✅ Decided | Arc, Vivaldi, Opera, Brave use the Chrome extension. |
| iOS minimum version | ✅ Decided | iOS / iPadOS 17. |
| Android minimum version | ✅ Decided | Android 7.0. |
| One-click save (Clipper) | ✅ Decided | Settings → Appearance → Clipper → Save automatically. |
| Tab capture creates duplicates by design | ✅ Decided | Source-explicit; cleanup via Duplicates capability. |
| Auto-tag tab batches with today's date | ✅ Decided | Source-explicit. |
| Saved-page indicator OFF by default | ✅ Decided | Source-explicit. |
| Saved-page indicator requires opt-in permission | ✅ Decided | Source-explicit. |
| Saved-page indicator honors ownership not access | ✅ Decided | Mirrors Sharing PRD Schema Invariant 23. |
| Side panel browser support | ✅ Decided | Chrome, Edge, Firefox. NOT Safari, NOT others. |
| Omnibox browser support | ✅ Decided | Chrome, Edge, Firefox. NOT Safari, NOT Vivaldi. |
| iOS one-tap Add-to-Unsorted | ✅ Decided | Source-explicit. |
| iOS Safari extension covers highlights and tab capture | ✅ Decided | Source-explicit. |
| Android tab capture not supported | ✅ Decided | Browser limitation; F27. |
| No offline support | ✅ Decided | Source-explicit. |
| Multi-device sync is unlimited | ✅ Decided | Source-explicit. |
| Bookmarklet works in any browser, no permissions | ✅ Decided | Source-explicit. |
| Permissions: minimal default + opt-in broader access | ✅ Decided | Source-explicit. |
| No background data collection | ✅ Decided | Source-explicit. |
| Capture surfaces require sign-in | ✅ Decided | |

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
