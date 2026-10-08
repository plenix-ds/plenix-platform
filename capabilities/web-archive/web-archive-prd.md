# 08 — Web archive PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Web archive |
| **Capability ID** | web_archive |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Full specification with features, functionality, scenarios, and enablers |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST automatically capture a frozen-in-time copy of every saved web page, store it in private cloud storage owned by the bookmark's owner, surface a one-click action to open or download the archived copy from any platform, and continue to make that copy available even when the original page changes, becomes paywalled, or disappears entirely. Web archive is a paid-plan capability with unlimited storage; per-item size is capped at 70 MB.

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

### UC-01 — Save a bookmark and have it auto-archived

| Item | Detail |
|---|---|
| Actor | Authenticated paid-plan user. |
| Goal | Save a web page and rely on the system to make a permanent copy without any setup. |
| Main Flow | 1. User saves a bookmark. 2. The system enqueues the bookmark for archive capture. 3. Within a few minutes, the worker fetches the source URL, sanitizes it, and stores the snapshot. 4. The bookmark's `cache.status` advances to `ready`; `cache.size` and `cache.created` are populated. |
| System Response | The bookmark surface MUST update to expose **Open web archive** when status is `ready`. |
| Alternate Flow | If the source is paywalled, login-walled, oversized, or actively blocking automation, the worker sets `cache.status` to the appropriate failure value and does not retry indefinitely. |

### UC-02 — Open an archived copy from web / desktop

| Item | Detail |
|---|---|
| Actor | Authenticated user with a `ready` archive. |
| Goal | View the page as it existed when the bookmark was saved. |
| Main Flow | 1. User right-clicks a bookmark and selects **Open web archive**. 2. The system resolves the authenticated archive URL. 3. The archive opens in a new tab. |
| System Response | The original page chrome and content render as captured, with ads and trackers stripped. |
| Alternate Flow | If the archive is not yet `ready`, the **Open web archive** action MUST surface an unavailable state explaining the current `cache.status` rather than navigating to a broken page. |

### UC-03 — Open an archived copy from mobile

| Item | Detail |
|---|---|
| Actor | iOS or Android user with a `ready` archive. |
| Goal | View the archived copy on mobile. |
| Main Flow | 1. User long-presses (iOS) or taps the action menu (Android) on a bookmark. 2. User selects **Open web archive**. 3. The archive opens in the system browser. |
| System Response | Same as UC-02. |
| Alternate Flow | None. |

### UC-04 — Download the archived copy

| Item | Detail |
|---|---|
| Actor | Authenticated user with a `ready` archive. |
| Goal | Save the archive locally — for offline use, sharing, or long-term preservation. |
| Main Flow | 1. User opens the bookmark's archive (UC-02 or UC-03). 2. User selects **Download**. 3. The system serves the archive payload as a downloadable file. |
| System Response | The browser or system download manager handles the file. |
| Alternate Flow | None. |

### UC-05 — Read a bookmark whose original page has disappeared

| Item | Detail |
|---|---|
| Actor | Authenticated user returning to an old bookmark. |
| Goal | Recover the content of a page that no longer exists at its original URL. |
| Main Flow | 1. User opens a bookmark whose source URL now returns 404 or is unreachable. 2. The system MUST still surface **Open web archive** if `cache.status = ready`. 3. User opens the archive. |
| System Response | The archived copy renders normally. The user reads the content as it existed at save time. |
| Alternate Flow | If no `ready` archive exists, the user MUST be told that the source is unreachable and no archive is available. |

### UC-06 — Try to archive a paywalled or login-walled page

| Item | Detail |
|---|---|
| Actor | Authenticated paid-plan user. |
| Goal | (Negative case) Save a page behind a paywall. |
| Main Flow | 1. User saves the URL. 2. The archive worker attempts to fetch the source. 3. The fetcher receives a paywall, login wall, or other access-restricted response. 4. The system sets `cache.status` to `invalid-origin`. |
| System Response | The bookmark itself remains saved with title and URL. The **Open web archive** action MUST be either hidden or surface a clear "no archive available — page not publicly accessible" state. |
| Alternate Flow | The user MUST NOT have any affordance to bypass the access restriction or inject credentials for archive capture. |

### UC-07 — Try to archive an oversize page

| Item | Detail |
|---|---|
| Actor | Authenticated paid-plan user. |
| Goal | (Negative case) Save a page or PDF whose size exceeds the per-item cap. |
| Main Flow | 1. User saves a URL whose payload is >70 MB. 2. The worker measures the size during fetch. 3. The system sets `cache.status` to `invalid-size`. |
| System Response | The bookmark remains saved. The **Open web archive** action MUST surface an "archive skipped — page exceeds the 70 MB limit" state. |
| Alternate Flow | None. |

### UC-08 — Failed capture is automatically retried

| Item | Detail |
|---|---|
| Actor | Authenticated paid-plan user. |
| Goal | A transient capture failure is recovered without user action. |
| Main Flow | 1. User saves a bookmark. 2. The worker attempts capture; the source is temporarily unreachable. 3. The system sets `cache.status` to `retry` (or `failed` if at the retry ceiling). 4. The retry scheduler attempts again later. 5. The capture eventually succeeds; `cache.status` advances to `ready`. |
| System Response | The bookmark transparently moves through the state machine. |
| Alternate Flow | If retries are exhausted and capture continues to fail, the system leaves `cache.status = failed`. The user MAY contact support per F21. |

### UC-09 — Permanently delete a bookmark

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Remove a bookmark and its archive. |
| Main Flow | 1. User permanently deletes a bookmark (from Trash or via empty Trash). 2. The system removes the bookmark per **Bookmarks PRD §5**. 3. The archive payload MUST be scheduled for storage reclamation. |
| System Response | The archive becomes immediately inaccessible. Storage cleanup MAY run asynchronously. |
| Alternate Flow | Restoring a bookmark from Trash before permanent deletion MUST preserve its archive. |

### UC-10 — Bulk backfill after first paid upgrade

| Item | Detail |
|---|---|
| Actor | A user who upgrades to a paid plan with an existing free-tier library of, e.g., 5,000 bookmarks. |
| Goal | Have all eligible existing bookmarks archived in the background. |
| Main Flow | 1. User's plan transitions to paid. 2. The system enqueues all of the user's eligible bookmarks (not in Trash, publicly reachable) for archive capture. 3. The worker processes the queue at approximately 1,000 archives per 30 minutes per user. 4. Over the next ~2.5 hours, all 5,000 bookmarks are processed. |
| System Response | Each bookmark's `cache.status` advances independently as its capture completes. |
| Alternate Flow | If the user saves new bookmarks during backfill, those new bookmarks MUST be processed at the normal per-bookmark latency (a few minutes) — they do not have to wait for the backfill queue to drain. |

### UC-11 — Plan downgrade with existing archives

| Item | Detail |
|---|---|
| Actor | Paid-plan user who downgrades to free. |
| Goal | (Negative case) Understand what happens to existing archives. |
| Main Flow | 1. User downgrades. 2. Archives become inaccessible immediately — the **Open web archive** action MUST refuse with a clear "archives require a paid plan" message. 3. After approximately one month, the system permanently deletes the archived payloads. |
| System Response | The bookmarks themselves MUST be unaffected — title, URL, tags, notes, highlights remain intact. |
| Alternate Flow | If the user re-upgrades within the grace period, archives MUST become accessible again with no data loss. After the grace period elapses, re-upgrading does not recover deleted archives — those bookmarks would need to be re-archived from scratch on next save or via manual delete-and-resave. |

### UC-12 — Filter to bookmarks with ready archives

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | See only bookmarks whose archive is `ready`. |
| Main Flow | 1. User applies the `cache.status:ready` filter (per **Search & Filters PRD**). 2. The list shows matching bookmarks. |
| System Response | Standard filtered list. |
| Alternate Flow | The user MAY combine multiple `cache.status:` values (e.g. `cache.status:invalid-origin` + `cache.status:failed`) using `match:OR` to surface failed archives for triage. Operator semantics are owned by **Search & Filters PRD**. |

### UC-13 — User wants to refresh an archive

| Item | Detail |
|---|---|
| Actor | Authenticated user noticing that the source page has changed since they bookmarked it. |
| Goal | Get a fresh archive reflecting the current source. |
| Main Flow | 1. User confirms there is no manual "re-archive" action (per F20). 2. User deletes the bookmark. 3. User re-saves the same URL. 4. The new bookmark is queued for capture. 5. The new archive replaces the (now-deleted) old one in the user's library. |
| System Response | A new bookmark with a new `_id` and a new archive is created. The old bookmark and archive are gone. |
| Alternate Flow | The user MUST be aware that this operation loses any tags, notes, highlights, collection assignment, and reminder bound to the old bookmark unless they explicitly re-apply them. The system SHOULD make this consequence clear; the operation is not a true "refresh." |

### UC-14 — Collaborator opens an archived copy in a shared collection

| Item | Detail |
|---|---|
| Actor | Collaborator with at least read access (level ≥ 2) on a shared collection. |
| Goal | View the archived copy of a bookmark another user saved. |
| Main Flow | 1. Collaborator opens the bookmark. 2. Collaborator selects **Open web archive**. 3. The system serves the archive payload, mediated by the same authenticated path used by the owner. |
| System Response | Archive renders identically. The collaborator MAY also Download. |
| Alternate Flow | If the bookmark's owner has downgraded and the archive is in the grace-period inaccessible state, the collaborator MUST be told the archive is unavailable. |

---

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Automatic capture on every bookmark save** | ✅ Built | Every bookmark whose URL is publicly reachable MUST be queued for archive capture. The user MUST NOT be required to opt in or trigger anything manually. |
| F02 | **Archive payload contains full page content** | ✅ Built | The captured copy MUST include text, images, and visual formatting from the original page. |
| F03 | **Ad and tracker stripping** | ✅ Built | The captured copy MUST strip ads and tracking scripts. |
| F04 | **Video, audio, and iframe content not captured** | ✅ Decided | Video, audio, and iframes embedded in the page MUST NOT be captured. Their references MAY be retained but the underlying media is not stored in the archive. |
| F05 | **PDFs and EPUBs reachable at a URL captured as-is** | ✅ Built | A bookmark whose URL resolves to a PDF or EPUB on the web MUST archive the file as-is. (User-uploaded PDFs and EPUBs are owned by **Files PRD**, not by this capability.) |
| F06 | **Per-item 70 MB cap** | ✅ Decided | Captures larger than 70 MB MUST be skipped. The bookmark's `cache.status` MUST be set to `invalid-size`. |
| F07 | **Pages behind login or not publicly accessible cannot be archived** | ✅ Decided | Authenticated and access-restricted pages MUST NOT be captured. The bookmark's `cache.status` MUST be set to `invalid-origin`. |
| F08 | **Sites that block automated access cannot be archived** | ✅ Decided | When the source actively blocks automated capture (anti-bot, robots, IP block), the system MUST mark the archive as `failed` and not create a partial copy. |
| F09 | **Bookmarks in Trash are not archived** | ✅ Decided | While a bookmark is in Trash, the archive worker MUST skip it. On restore, the bookmark MUST be re-eligible for archival. |
| F10 | **Capture latency: a few minutes per bookmark** | ✅ Decided | New bookmarks MUST be archived within minutes of save, not seconds and not days. The exact latency is best-effort. |
| F11 | **Bulk backfill on first paid upgrade** | ✅ Built | When a user upgrades to a paid plan, the system MUST queue the user's existing eligible bookmarks for backfill capture at a sustained rate of approximately 1,000 archives per 30 minutes per user. |
| F12 | **Open archived copy from web / desktop** | ✅ Built | The user MUST be able to open the archived copy from a bookmark's right-click context menu via an **Open web archive** action. The archive MUST open in a new tab. |
| F13 | **Open archived copy from mobile** | ✅ Built | iOS (long-press) and Android (action menu via "···") MUST expose the same **Open web archive** action. |
| F14 | **Download archive to device** | ✅ Built | The user MUST be able to download the archived copy to their local device. This MUST be the only mechanism for sharing the archive's content with anyone else. |
| F15 | **Archives are private** | ✅ Decided | Archived copies MUST be visible only to the bookmark's owner and to collaborators with read access on the parent collection (see **Sharing / Collaboration PRD**). Public-collection visibility MUST NOT extend to archive payloads. |
| F16 | **Archives cannot be made public** | ✅ Decided | The system MUST NOT expose any mechanism to make an archive publicly viewable or generate a shareable link. The download workflow (F14) is the user's only sharing path. |
| F17 | **Storage is unlimited** | ✅ Decided | There MUST NOT be a per-account cap on total archive storage. Only the per-item size limit (F06) applies. |
| F18 | **Archive lifecycle on bookmark delete** | ✅ Built | When a bookmark is permanently deleted (from Trash), its archive MUST be deleted with it. Storage reclamation MAY run asynchronously per **Bookmarks PRD §5 permanent delete**. |
| F19 | **Archive lifecycle on plan downgrade** | ✅ Decided | When a user downgrades from a paid plan, archives MUST become inaccessible immediately and MUST be permanently deleted after a grace period of approximately one month. The user's bookmarks MUST NOT be affected. |
| F20 | **No manual re-archive action** | ✅ Decided | The system MUST NOT expose a user-facing "re-archive" button. The user's only path to refresh an archive is to delete and re-save the bookmark. |
| F21 | **Failed archives are retried automatically** | ✅ Built | When an archive attempt fails with `failed` (transient cause: server error, network blip), the system MUST retry automatically. The user MUST NOT need to take any action. |
| F22 | **`cache.status` field on every bookmark** | ✅ Built | Every bookmark MUST carry a `cache.status` field with one of the six enumerated values (§6.4). The field MUST be filterable (per **Search & Filters PRD**). |
| F23 | **`cache.size` and `cache.created` populated on success** | ✅ Built | When `cache.status = ready`, the bookmark MUST also carry `cache.size` (bytes) and `cache.created` (ISO 8601 timestamp). For other statuses these fields MAY be absent. |
| F24 | **Page-content search via archive** | ⚪ Capability Split | Full-text search across archived page content is owned by **Search & Filters PRD §3 F11**. Plan-gated. |
| F25 | **`cache.status:` filter operators** | ⚪ Capability Split | The `cache.status:ready`, `cache.status:failed`, etc. operator family is owned by **Search & Filters PRD §3 F12**. |
| F26 | **Authenticated access to archive payload** | ✅ Built | Direct storage URLs MUST NOT be reachable without authentication. The system MUST mediate every archive read through an authenticated redirect that respects the requesting user's access on the parent collection. |
| F27 | **Archive payload is immutable** | ✅ Decided | The captured bytes MUST NOT change after capture. The `cache.status` may transition (e.g. retry → ready) but a `ready` archive's bytes are frozen. |
| F28 | **Pages with scroll-based animations may render incorrectly** | ✅ Decided | The archive captures a static snapshot. Pages whose content depends on scroll-driven animations or runtime hydration MAY render incorrectly. The system MUST NOT promise pixel-perfect fidelity. |
| F29 | **Manual re-archive (future)** | 🔴 Not Defined | Whether to ever expose a user-triggered re-archive without delete-and-resave is not defined. |
| F30 | **Archive versioning** | 🔴 Not Defined | Whether a bookmark can carry multiple historical archives is not defined. The current model is one archive per bookmark. |
| F31 | **Per-bookmark "skip archive" opt-out** | 🔴 Not Defined | Whether the user can mark a bookmark as "do not archive" (e.g. for sensitive sources) is not defined. |
| F32 | **Archive of authenticated content via session cookie injection** | ✅ Decided | Forbidden. The system MUST NOT use the user's session cookies to capture pages they can access. Archives capture only what's publicly reachable. |
| F33 | **Per-domain throttling of archive captures** | ✅ Decided | The archive worker MUST rate-limit captures per source domain to avoid hammering individual origins. The exact rate is an implementation choice. |
| F34 | **Archive-failure transparency** | ✅ Built | When an archive fails, the bookmark's `cache.status` MUST surface the specific failure category (`invalid-origin`, `invalid-timeout`, `invalid-size`, `failed`) rather than collapsing all failures into a generic "error." |

---

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Capture trigger and eligibility

| Rule | Behavior |
|---|---|
| Trigger on save | The system MUST enqueue every newly-saved bookmark for archive capture, transparent to the user. |
| Trigger on first paid upgrade | When a user transitions to a paid plan, the system MUST enqueue all of the user's existing eligible bookmarks for backfill capture. |
| Trash exclusion | A bookmark in Trash MUST NOT be captured. The archive worker MUST skip Trash entries. |
| Restore re-enqueue | When a bookmark is restored from Trash, it MUST become eligible for capture again. |
| Free-tier eligibility | Free-tier users MUST NOT have new captures created. Existing archives remain inaccessible per the lifecycle in §5.5. |
| File-backed bookmarks | Bookmarks created from user file uploads (per **Files PRD**) MUST NOT be archived through this capability — the file payload IS the durable copy. The bookmark's `cache.status` MAY remain absent or be set to a value indicating "not applicable." |

### 5.2 Capture process

| Stage | Behavior |
|---|---|
| Fetch | The worker fetches the source URL using a public-facing HTTP client. The system MUST NOT send any user-specific credentials, session cookies, or authorization headers. |
| Size check | If the response payload exceeds 70 MB, the worker MUST abort and set `cache.status = invalid-size`. |
| Access check | If the response indicates a paywall, login wall, or other access restriction (HTTP 401, 403, or content-pattern detection), the worker MUST set `cache.status = invalid-origin`. |
| Anti-bot detection | If the source actively blocks automation, the worker MUST set `cache.status = failed` and rely on the retry scheduler. |
| Sanitization | The captured page MUST have advertising scripts and tracking pixels removed before storage. |
| Media exclusion | Inline `<video>`, `<audio>`, and `<iframe>` content MUST NOT be captured. References to external media MAY be retained in the markup but the media bytes are not stored. |
| PDF / EPUB direct capture | When the source URL resolves to a PDF or EPUB, the worker MUST capture the file as-is, subject to the 70 MB cap. |
| Storage | The sanitized payload MUST be written to durable cloud storage. |
| Status update | On success, the system MUST set `cache.status = ready`, `cache.size = <bytes>`, and `cache.created = <ISO 8601>`. |
| Latency target | Single-bookmark captures SHOULD complete within minutes of save. |

### 5.3 Capture rate and throttling

| Rule | Behavior |
|---|---|
| Per-user backfill rate | When backfilling existing bookmarks for a newly upgraded user, the system MUST process approximately 1,000 archives per 30 minutes per user. |
| Per-domain throttle | The worker MUST rate-limit captures per source domain to avoid hammering individual origins. |
| New-bookmark priority | New bookmarks saved during a backfill MUST be processed at normal per-bookmark latency, not enqueued behind the backfill queue. |
| Retry scheduling | Failed captures MUST be retried automatically. The retry schedule MAY use exponential backoff. After a configured retry ceiling, the system MUST stop retrying and leave `cache.status = failed`. |

### 5.4 Archive payload immutability

| Rule | Behavior |
|---|---|
| Bytes are frozen | A `ready` archive's bytes MUST NOT change. The system MUST NOT silently re-capture an archive in place. |
| Status mutability | The `cache.status` field MAY transition (e.g. `retry` → `ready`, `failed` → `retry`) as the worker progresses. The `cache.size` and `cache.created` fields MUST be set on `ready` and MUST remain stable while the bookmark exists. |
| No manual re-archive | The system MUST NOT expose a user-facing re-archive action. The only path to a fresh archive is delete-and-resave (UC-13). |
| Source change is the user's signal | If the source page changes meaningfully and the user wants the new version, they MUST delete the bookmark and re-save it. The system MAY surface a future "stale" hint, but takes no destructive action automatically. |

### 5.5 Plan transitions

| Transition | Behavior |
|---|---|
| Free → Paid (first upgrade) | The system MUST enqueue all eligible existing bookmarks for backfill capture (§5.3). New bookmarks MUST be captured at normal per-bookmark latency. |
| Free → Paid (re-upgrade during grace period) | Inaccessible archives MUST become accessible again with no data loss. New bookmarks MUST be queued normally. |
| Free → Paid (re-upgrade after grace period) | Previously-captured archives that were permanently deleted are gone. New bookmarks MUST be captured normally; the user MAY delete-and-resave any prior bookmark to trigger a fresh capture. |
| Paid → Free (downgrade) | All existing archives MUST become inaccessible immediately. The **Open web archive** action MUST refuse with a clear "paid plan required" message. After approximately one month, the system MUST permanently delete the archive payloads. The user's bookmarks MUST be unaffected. |
| Paid → canceled / expired | Same as Paid → Free. |

### 5.6 Access mediation

| Rule | Behavior |
|---|---|
| Authenticated redirect | The user-facing archive URL MUST be an authenticated redirect, not the underlying storage URL. The redirect MUST verify the requesting user's access on the parent collection before serving the payload. |
| Direct storage URLs | Direct storage backend URLs (e.g. signed S3 URLs) MUST NOT leak. A leaked URL MUST NOT permit unauthenticated access. |
| Collaborator access | A collaborator with read access on the parent collection MAY open the archive. A user without access MUST be refused. |
| Public collections | Even when a parent collection is public (per **Public Page / Embed PRD**), the archive payload MUST remain private. The public bookmark page MAY display title / URL / cover but MUST NOT expose **Open web archive**. |
| Anonymous viewers | Anonymous viewers of public bookmark pages MUST NOT have any path to the archive. |

### 5.7 Archive listings and discovery

| Surface | Behavior |
|---|---|
| `cache.status:ready` filter | A pre-built filter that returns every bookmark with a ready archive. Implementation owned by **Search & Filters PRD**. |
| Failed-archive triage filter | The combination `cache.status:invalid-origin cache.status:failed match:OR` returns bookmarks whose archives could not be created for known reasons; useful for support. Owned by **Search & Filters PRD**. |
| Per-bookmark surface | Every bookmark detail surface MUST surface its `cache.status`. When `ready`, the **Open web archive** action MUST be exposed. When other, an explanatory state MUST be surfaced. |

### 5.8 Sharing and collaboration

| Rule | Behavior |
|---|---|
| Shared collection visibility | Collaborators with read access MAY open archives of bookmarks in the shared collection (subject to the bookmark owner's plan state — see §5.5). |
| Public-page constraint | Archives MUST NOT be reachable from a public bookmark page (F15, F16, §5.6). |
| Download permission | Collaborators with read access MAY download archives. The download path is the same authenticated channel used for in-browser viewing. |
| Bookmark owner's plan state | If the bookmark owner downgrades and their archives become inaccessible, the archives are inaccessible to collaborators too. The bookmark itself remains. |

### 5.9 Storage reclamation

| Trigger | Behavior |
|---|---|
| Bookmark permanently deleted | The archive payload MUST be scheduled for storage reclamation. The bookmark and the **Open web archive** action MUST disappear from user-visible surfaces immediately, even if storage cleanup runs asynchronously. |
| Plan grace period elapsed | After approximately one month following a paid → free transition, the system MUST permanently delete the user's archive payloads. The `cache.status`, `cache.size`, and `cache.created` fields MAY be retained on the bookmark or cleared (a 🟠 Product Decision; see §12). |
| Account deletion | When a user deletes their account, all archive payloads MUST be removed per the account-deletion lifecycle in **User / Account**. |

### 5.10 Failure categories and retry policy

| `cache.status` value | Cause | Retry? |
|---|---|---|
| `pending` (implicit / not yet attempted) | Bookmark just saved, queue not yet processed. | n/a — will progress to a status soon. |
| `retry` | Transient failure; queued for another attempt. | ✅ Automatic. |
| `failed` | Persistent failure (anti-bot, server error after retry ceiling). | ❌ No further automatic retries. User may contact support. |
| `invalid-origin` | Source is paywalled, login-walled, or otherwise not publicly reachable. | ❌ — not retryable; fundamental access issue. |
| `invalid-timeout` | Capture took too long; aborted. | ✅ MAY retry once or twice; otherwise becomes `failed`. |
| `invalid-size` | Payload exceeded 70 MB. | ❌ — not retryable; the page is too big. |
| `ready` | Successful capture. | n/a — terminal success state. |

### 5.11 Cross-capability data flow

| Source | This capability uses it for |
|---|---|
| Bookmark `_id`, `link`, `removed` | Identification, fetch URL, Trash exclusion. |
| User plan tier and billing state | Eligibility for capture; grace-period clock. |
| Collection `access.level` (per **Collections PRD**) | Collaborator visibility check. |
| Reader / Articles parsed body (separate, per **Reader / Articles PRD**) | Independent projection from the same source fetch; not the archive's payload. |
| Search index (per **Search & Filters PRD**) | Archived content is the source for page-content full-text search (paid). |

### 5.12 Platform-Specific Interaction Patterns

| Platform | Open web archive | Download |
|---|---|---|
| **Web / Desktop** | Right-click → **Open web archive**; opens in a new tab. | Action toolbar inside the archive view → **Download**. |
| **iOS** | Long-press → **Open web archive**; opens in the system browser. | iOS share-sheet save / download from within the browser. |
| **Android** | Tap **···** → **Open web archive**; opens in the system browser. | Android download from within the browser. |
| **Cross-platform invariant** | The action label, the `cache.status` enum, and the privacy / sharing rules MUST be identical across platforms. Only the gesture surface differs. | |

### 5.13 Frozen-in-time semantics

| Rule | Behavior |
|---|---|
| Source-of-truth boundary | The archive captures the page **at save time**, not the latest version of the page. This is a deliberate product feature, not a bug. |
| User communication | The user MUST understand that the archive may diverge from the live source over time. UI copy and the FAQ MUST make this explicit. |
| No automatic re-capture | The system MUST NOT periodically re-capture pages without explicit user action (delete-and-resave). |
| Stale / freshness signals | Whether the system tracks and surfaces "this archive is N months old" indicators is a 🟠 Product Decision (see §12). |

### 5.14 Capture exclusions (source-confirmed)

| Exclusion | Rule |
|---|---|
| Pages behind login or not publicly accessible | NOT captured. `cache.status = invalid-origin`. |
| Files larger than 70 MB | Skipped. `cache.status = invalid-size`. |
| Pages with scroll-based animations | MAY render incorrectly; capture is best-effort. The system MUST NOT promise pixel-perfect fidelity for such pages. |
| Sites that block automated access | NOT captured. `cache.status = failed`. |
| Bookmarks in Trash | NOT captured (worker skips). |
| Inline video / audio / iframe content | NOT captured (markup MAY remain; bytes do not). |

---

### System Constants

### 6.1 Internal Web Archive Service Capabilities

| System Capability | Requirement |
|---|---|
| Enqueue capture | The system MUST enqueue every eligible new bookmark for capture at save time. |
| Backfill enqueue | The system MUST enqueue all eligible existing bookmarks when a user transitions to a paid plan. |
| Worker fetch | The system MUST fetch source URLs using a public, unauthenticated HTTP client. |
| Sanitize payload | The system MUST strip ads, trackers, and exclude inline media before persistence. |
| Persist archive | The system MUST write the sanitized payload to durable cloud storage. |
| Update `cache` field | The system MUST set `cache.status`, `cache.size`, and `cache.created` on the wrapping bookmark per the rules in §5.10. |
| Mediate access | The system MUST serve archive payloads only through an authenticated redirect that respects the requesting user's access on the parent collection. |
| Reclaim storage | The system MUST schedule archive deletion when the parent bookmark is permanently deleted, when the user's plan downgrades and the grace period elapses, or when the user deletes their account. |
| Schedule retries | The system MUST automatically retry transient capture failures per the policy in §5.10. |
| Throttle per domain | The worker MUST rate-limit captures per source domain. |
| Throttle per user (backfill) | The worker MUST process backfill captures at approximately 1,000 per 30 minutes per user. |

### 6.2 System Response Conventions

| Response | Behavior |
|---|---|
| `cache.status: ready` | The bookmark surface MUST expose **Open web archive**. The action MUST resolve to an authenticated redirect to the archive payload. |
| `cache.status: pending / retry` | The action MUST surface a "capture in progress" state. |
| `cache.status: failed / invalid-origin / invalid-timeout / invalid-size` | The action MUST surface the specific failure category in plain language. |
| Archive missing on `ready` (orphan) | The system MUST treat this as a corrupted state, surface a clear error, and re-enqueue the bookmark for capture. |

### 6.3 Error and Condition Handling

| Condition | Behavior |
|---|---|
| Source returns 401 / 403 | Set `cache.status = invalid-origin`. Do not retry. |
| Source returns 5xx | Set `cache.status = retry`. Retry per backoff schedule. |
| Source unreachable (DNS, connection refused, timeout) | Set `cache.status = retry` initially; promote to `failed` after retry ceiling. |
| Capture timeout (configured ceiling) | Set `cache.status = invalid-timeout`. MAY retry once or twice. |
| Payload exceeds 70 MB | Abort fetch; set `cache.status = invalid-size`. Do not retry. |
| Anti-bot block (CAPTCHA, IP ban response) | Set `cache.status = failed`. Do not retry indefinitely. |
| Storage write failure | Treat as transient; do NOT set `cache.status = ready`. Schedule retry. |
| User on free tier saves a bookmark | The archive worker MUST skip the bookmark. `cache.status` MAY be absent or carry a "not applicable" value. |
| Collaborator without access requests an archive | Refused with a clear permission message. |
| Bookmark moved to Trash mid-capture | The worker MAY abort or complete the in-flight capture; on Trash, the bookmark MUST NOT be re-enqueued until restored. |

### 6.4 Reserved Field Values

| Item | Rule |
|---|---|
| `cache.status` enum | One of: `ready`, `retry`, `failed`, `invalid-origin`, `invalid-timeout`, `invalid-size`. The system MAY also represent an implicit `pending` (or absent) state for bookmarks not yet processed. |
| `cache.size` | Integer bytes; populated when status is `ready`. |
| `cache.created` | ISO 8601 timestamp of successful capture; populated when status is `ready`. |
| `MAX_ARCHIVE_BYTES` | 70 MB (73,400,320 bytes). |
| `BACKFILL_RATE_PER_USER` | Approximately 1,000 archives per 30 minutes per user. |
| `DOWNGRADE_GRACE_PERIOD` | Approximately 1 month from paid → free transition before payloads are permanently deleted. |
| `NEW_BOOKMARK_LATENCY_TARGET` | A few minutes from save to `cache.status = ready`. |

### 6.5 Internal Action Types

| Action | Purpose |
|---|---|
| `archive.enqueue` | Add a bookmark to the capture queue (new save or backfill). |
| `archive.capture` | Worker action: fetch, sanitize, persist; update `cache.status`. |
| `archive.retry` | Re-enqueue a `retry` or `invalid-timeout` bookmark per the backoff schedule. |
| `archive.serve` | Mediate an authenticated read of an archive payload. |
| `archive.download` | Stream the archive payload to the requesting user as a downloadable file. |
| `archive.reclaim` | Remove an archive payload from storage. |
| `archive.gracePeriodSweep` | Periodic job that finds users whose grace period has elapsed and triggers `archive.reclaim` for their archives. |
| `archive.backfillEnqueue` | Bulk-enqueue all of a user's eligible bookmarks on first paid upgrade. |

### 6.6 Plan-Tier Gating

| Capability | Free | Paid |
|---|---|---|
| New archive capture on save | ❌ | ✅ |
| Backfill of existing bookmarks on first upgrade | n/a | ✅ |
| Open web archive action | ❌ (action hidden / refused) | ✅ |
| Download archive | ❌ | ✅ |
| `cache.status` filter | ✅ (filter visible; no `ready` results without paid history) | ✅ |
| Archives included in normal account backups | ❌ — never (per **Files PRD §6.10** equivalent rule; backups are metadata-only) | ❌ — same |
| Page-content full-text search via archive | ❌ | ✅ (owned by **Search & Filters PRD**) |
| Grace-period inaccessible archives after downgrade | ❌ — readable only with re-upgrade | ✅ — accessible |

### 6.7 Privacy and Security Rules

| Rule | Behavior |
|---|---|
| No public archive URLs | The system MUST NOT generate publicly-shareable archive URLs. |
| Authenticated redirects only | All archive reads MUST go through an authenticated redirect that verifies the requesting user's access. |
| Storage backend opacity | Direct storage backend URLs MUST NOT be exposed. A leaked direct URL MUST NOT permit unauthenticated reads. |
| No credential injection | The capture worker MUST NOT use the user's session cookies, OAuth tokens, or other credentials when fetching source URLs. |
| Sanitization is mandatory | Captured payloads MUST be sanitized of advertising and tracking scripts before storage. Re-sanitizing at render time is defense in depth but does not absolve the worker. |
| No bypassing access models | The system MUST NOT include any feature designed to bypass paywalls, login walls, anti-bot systems, or robots.txt directives. |

### 6.8 Storage Reclamation Cadence

| Trigger | Cadence |
|---|---|
| Bookmark permanently deleted | Reclamation scheduled immediately; MAY run async on the next sweep. |
| Plan downgrade grace period elapsed | A periodic sweep job (`archive.gracePeriodSweep`) identifies users whose grace period has passed and triggers reclamation. |
| Account deletion | Reclamation runs as part of the account-deletion lifecycle. |
| Failed retries exhausted | No reclamation; `cache.status = failed` persists indefinitely until the bookmark is deleted or the user takes action. |

---

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| Paid-plan user saves a bookmark to a public article | Within minutes, `cache.status = ready`; `cache.size` and `cache.created` populated; **Open web archive** appears. |
| Paid-plan user saves a bookmark to a paywalled article | `cache.status = invalid-origin`; **Open web archive** is hidden or refuses with a clear message; bookmark itself is fully saved. |
| Paid-plan user saves a bookmark to a 90 MB PDF | `cache.status = invalid-size`; archive skipped. |
| Paid-plan user saves a bookmark to a JS-heavy site that blocks scrapers | `cache.status = failed`; the worker stops retrying after the ceiling; user MAY contact support per F21. |
| Paid-plan user saves a bookmark to a page with scroll-based animations | The archive captures a static snapshot. The page MAY render imperfectly; the user MUST not expect pixel-perfect fidelity. |
| Paid-plan user saves a bookmark; source returns 503 (server error) | `cache.status = retry`; the worker retries per backoff; eventually succeeds and advances to `ready`. |
| Paid-plan user moves a bookmark to Trash before the worker reaches it | The worker skips the Trashed bookmark. On restore, the bookmark is re-enqueued. |
| Free-tier user saves a bookmark | No archive is created. `cache.status` is absent or set to a "not applicable" sentinel. |
| Free-tier user upgrades to paid with 5,000 existing bookmarks | The system enqueues all eligible bookmarks for backfill at approximately 1,000 / 30 minutes / user. After ~2.5 hours, all are processed. New saves during the backfill are processed at normal latency (a few minutes). |
| User opens the **Open web archive** action on a bookmark whose archive is `ready` | The system serves the archive payload through an authenticated redirect; archive opens in a new tab. |
| User opens **Open web archive** on a bookmark whose archive is `pending` / `retry` | The action surfaces a "capture in progress" state; user MAY return later. |
| User opens **Open web archive** on a bookmark whose archive is `failed` | The action surfaces "archive failed" with the failure category in plain language; no retry button is exposed (retries are automatic). |
| User downloads an archive | The archive is delivered as a downloadable file. |
| User permanently deletes a bookmark with a `ready` archive | The archive payload is scheduled for storage reclamation; **Open web archive** disappears immediately. |
| User restores a bookmark from Trash whose archive was `ready` before Trashing | The archive remains accessible (Trash is a soft-delete; archive payload was retained). |
| Paid-plan user downgrades to free with 200 ready archives | All archives become inaccessible immediately. After ~1 month, the system permanently deletes the payloads. The bookmarks themselves remain. |
| Downgraded user re-upgrades within 2 weeks | All archives become accessible again with no data loss. |
| Downgraded user re-upgrades after 6 weeks | Previously captured archives are gone. New saves are captured normally. The user MAY delete-and-resave any prior bookmark to trigger fresh capture. |
| User wants to re-capture a page that has changed since save | The system has no manual re-archive button. The user MUST delete the bookmark and re-save. The new bookmark has a new `_id` and a new archive; tags / notes / highlights / collection / reminder on the old bookmark are lost unless re-applied. |
| User filters to `cache.status:ready` | The list shows every bookmark with a ready archive (per **Search & Filters PRD**). |
| User filters to `cache.status:invalid-origin cache.status:failed match:OR` | The list shows bookmarks whose archives could not be created for known reasons; useful for support triage. |
| Anonymous viewer opens a public bookmark page | The viewer can see title / URL / cover but MUST NOT see **Open web archive** or any path to the archive payload. |
| Collaborator with read access on a shared collection opens **Open web archive** | The archive serves through the same authenticated path; the collaborator can also Download. |
| Collaborator with no access on the parent collection requests the archive URL directly | Refused with a permission error. |
| Leaked direct storage URL is hit unauthenticated | The storage backend MUST refuse the request; the leaked URL MUST NOT permit reads. |
| User saves a bookmark whose source is reachable, but the worker can't extract meaningful HTML | The capture proceeds and stores whatever the worker captured. `cache.status = ready` if storage succeeded. The user MAY observe a partial archive — better than nothing. |
| User saves the same URL twice (two bookmarks) | Two bookmarks, two independent archives. Each has its own `cache.size` and `cache.created`. |
| User saves a bookmark whose URL hosts a PDF | The PDF is captured as-is, subject to the 70 MB cap. `cache.status = ready`; **Open web archive** opens the PDF. |
| User saves a bookmark whose URL hosts a video | The video bytes are NOT captured. The archive contains the page markup minus inline media. `cache.status = ready`. |
| User uploads a PDF via the file-upload flow (Files PRD) | Web archive is NOT triggered. The file payload IS the durable copy. The bookmark's `cache.status` MAY be absent. |
| Storage write fails after a successful fetch | The system MUST NOT set `cache.status = ready`. The capture is treated as a transient failure and re-enqueued. |
| User's account is deleted | All archive payloads are reclaimed as part of the account-deletion lifecycle. |

---

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

The web archive's persisted state lives partly on the wrapping bookmark (the `cache` object owned here but stored on the bookmark per **Bookmarks PRD §8**) and partly in cloud storage (the archive payload itself, opaque to the bookmark schema).

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| `cache.status` | enum | system | One of `CacheStatus`. MAY be absent for bookmarks not yet processed or for free-tier accounts. | The user-facing surface for capture state. |
| `cache.size` | integer | optional | Byte size of the archived payload. Populated when status is `ready`. | Server-set. |
| `cache.created` | string (ISO 8601) | optional | Timestamp of successful capture. Populated when status is `ready`. | Server-set; immutable while status remains `ready`. |
| `cache.storageKey` | string | system | Internal storage backend reference. Distinct from any user-visible URL. | MUST NOT be exposed unauthenticated. |
| `cache.captureType` | enum | optional | One of `WebArchiveCaptureType`. The kind of source content captured (web page, PDF, EPUB, unsupported). | Drives viewer routing and analytics. |
| `cache.failureReason` | enum | optional | One of `WebArchiveFailureReason`. Populated when `cache.status` is a failure value. Distinct from the surface `cache.status`: `cache.status: failed` says the capture didn't succeed; `cache.failureReason: blocked_by_origin` says why. | For support tooling and structured failure-mode reporting. |
| `cache.accessState` | enum | optional | One of `WebArchiveAccessState`. The user-facing access state, derived from `cache.status` + plan entitlement + collection access. | Pre-computed for fast list rendering. Consumers MAY also derive at request time. |
| `cache.retryCount` | integer | optional | Non-negative count of capture attempts. | For observability and bounding the retry ceiling. |
| `cache.lastAttemptAt` | string (ISO 8601) | optional | Timestamp of the most recent capture attempt (success or failure). | Server-set. |
| `cache.nextRetryAt` | string (ISO 8601) | optional | Scheduled time of the next retry attempt; absent when not scheduled. | Server-set. |
| `cache.expiresAt` | string (ISO 8601) | optional | When the user is in a paid → free grace period, the deadline at which the archive payload is permanently deleted. | Server-set on grace start; absent otherwise. Drives user-facing "your archives will be deleted on [date]" messaging. |

The wrapping bookmark's other fields (`_id`, `link`, `removed`, `collection`, `user`, etc.) follow **Bookmarks PRD §8**.

## 12. Database / Schema Notes

### Enums

```ts
type CacheStatus =
  | "ready"             // archive payload exists and is reachable
  | "retry"             // capture in progress; will retry automatically
  | "failed"            // capture failed after retry ceiling; no further automatic retries
  | "invalid-origin"    // source is paywalled, login-walled, or otherwise not publicly reachable
  | "invalid-timeout"   // capture exceeded the configured time ceiling
  | "invalid-size";     // payload exceeded the 70 MB per-item cap

// The kind of source content captured. Drives viewer routing
// (HTML viewer vs. PDF viewer vs. EPUB viewer) and analytics.
type WebArchiveCaptureType =
  | "web_page"
  | "pdf"
  | "epub"
  | "unsupported";

// Structured failure classification, separate from the surface CacheStatus.
// Multiple failure reasons MAY map to the same cache.status surface value
// (e.g. both `login_required` and `private_or_inaccessible` map to `invalid-origin`).
type WebArchiveFailureReason =
  | "login_required"           // page requires authentication
  | "private_or_inaccessible"  // not publicly reachable
  | "blocked_by_origin"        // anti-bot, robots.txt, IP block
  | "timeout"                  // capture exceeded time ceiling
  | "size_limit"               // payload exceeded 70 MB
  | "unsupported_content"      // content type the worker cannot process
  | "worker_failure"           // transient internal error
  | "unknown";                 // fallback when classification fails

// User-facing access state, derived from cache.status + plan entitlement +
// collection access. Pre-computed for fast list rendering; consumers MAY
// also derive at request time.
type WebArchiveAccessState =
  | "accessible"             // archive can be opened by the requesting user
  | "processing"             // status is `retry` or implicit pending; come back soon
  | "failed"                 // status is `failed` / `invalid-*`; no current path to access
  | "plan_required"          // requesting user's plan does not include archive access
  | "permission_denied"      // requesting user lacks read access on the parent collection
  | "grace_period_expired"   // user downgraded and grace period has elapsed; archive deleted
  | "deleted"                // bookmark permanently deleted; archive reclaimed
  | "missing";               // archive metadata or payload missing (corrupted state)
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
| **Bookmark right-click context menu (web / desktop)** | Surfaces **Open web archive** and **Download** when status is `ready`. |
| **Bookmark long-press action menu (iOS)** | Surfaces **Open web archive**. |
| **Bookmark "···" action menu (Android)** | Surfaces **Open web archive**. |
| **Archive viewer (new tab / system browser)** | Renders the captured page as it was at save time. |
| **No-archive state** | Surfaced when the bookmark has no `ready` archive — explains the status (`pending`, `retry`, `failed`, `invalid-origin`, `invalid-timeout`, `invalid-size`) in plain language. |
| **Plan-required state** | Surfaced when a free-tier user invokes the action — explains that a paid plan is required and offers the upgrade path. |
| **Grace-period state** | Surfaced when a downgraded user invokes the action — explains that archives become inaccessible immediately and are deleted after ~1 month. |
| **Backfill progress (settings or library banner)** | Optional surface showing progress when a user's backfill is in flight. |
| **Failed-archive triage view** | A list (powered by `cache.status:failed cache.status:invalid-origin match:OR` per **Search & Filters PRD**) for users to surface archive issues. |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| **Open web archive action** | The primary user affordance; reachable from every bookmark surface. |
| **Download archive action** | Secondary action available when an archive is `ready`. |
| **Cache-status badge** | A subtle indicator on bookmark cards showing the current `cache.status` (icon, color). |
| **No-archive explanation** | Inline copy explaining the specific failure category. |
| **Upgrade affordance** | Surfaced when free-tier users invoke an archive action. |
| **Backfill progress indicator** | Shows progress and ETA when bulk backfill is running. |
| **"Page may render imperfectly" notice** | Optional hint surfaced when the captured page is known to use scroll-based animations or other features that don't capture cleanly. |

---

## 15. Workflow Requirements

| Operation | Required Behavior | Shared / Core Handling |
|---|---|---|
| **Create** | Web archive creation is automatic on every bookmark save. There is no user-facing create action. | Owned here; bookmark creation is owned by **Bookmarks PRD**. |
| **Edit** | The archived payload is immutable after capture. The bookmark's `cache.status` advances through the state machine but the captured bytes do not change. There is no user-facing re-archive action. | Owned here. |
| **Delete** | When a bookmark is permanently deleted, its archive MUST be deleted with it. When a user downgrades from a paid plan, archives become inaccessible immediately and MUST be permanently deleted after a ~1-month grace period. | Owned here in coordination with **Bookmarks PRD** Trash lifecycle and account / billing state. |
| **Search** | The system MUST expose archived page content for full-text search (plan-gated) and MUST expose the `cache.status` field as a filter operator family. Detailed search behavior is owned by **Search & Filters PRD**. | |

---

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|
| **Capture orchestrator** | Enqueues, schedules, and dispatches capture jobs; coordinates new-save and backfill flows. |
| **Capture worker** | Performs fetch, sanitize, persist, and `cache.status` update. |
| **Sanitization service** | Strips ads, trackers, and inline media. |
| **Storage gateway** | Reads, writes, and reclaims archive payloads on the durable storage backend. |
| **Authenticated redirect service** | Issues short-lived authenticated URLs for archive reads. |
| **Plan-state resolver** | Determines paid / free / grace-period state for a user. |
| **Backfill orchestrator** | Manages the bulk-enqueue flow for newly upgraded users. |
| **Retry scheduler** | Manages backoff and retry ceilings for transient failures. |
| **Per-domain throttle** | Rate-limits captures per source domain. |
| **Failure classifier** | Maps fetch outcomes to the `CacheStatus` enum. |
| **Collection access guard** | Enforces shared-collection access on archive reads. |
| **Public-page exclusion guard** | Centralized check that public surfaces never expose archive URLs. |
| **Grace-period sweep job** | Identifies expired-grace users and triggers reclamation. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| **(none directly)** | The extension is not a primary archive surface in this PRD. The extension's bookmark-detail surface MAY surface the **Open web archive** action by deep-linking into the application. |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| **Right-click action handler** | Surfaces **Open web archive** and **Download** in bookmark context menus. |
| **Archive viewer chrome** | Optional chrome around the archive viewer (e.g. download button, close affordance). |
| **No-archive state component** | Renders the state when status is not `ready`. |
| **Plan-required state component** | Renders the state for free-tier users. |
| **Cache-status badge component** | Subtle status indicator on bookmark cards. |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| **iOS long-press action handler** | Surfaces **Open web archive** in the bookmark long-press menu. |
| **Android action menu handler** | Surfaces **Open web archive** in the **···** menu. |
| **Mobile system-browser handoff** | Routes archive opens to the system browser. |
| **Mobile archive download path** | Uses the platform download flow. |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| **Durable cloud storage** | Holds archive payloads. |
| **Capture queue infrastructure** | Backing data store for the capture queue. |
| **Search index integration** | Pushes archived content text to the search index. |
| **Cache-status filter integration** | Maintains operator counts for **Search & Filters PRD**. |
| **Observability module** | Metrics and logs for capture rates, failure categories, backfill throughput, reclamation events, leaked-URL access attempts. |
| **Audit module** | Records capture events, deletions, and access denials for compliance. |

---

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| **Capture queue** | Holds bookmarks awaiting capture; supports per-user prioritization (new saves vs. backfill) and per-domain throttling. |
| **Capture worker** | Fetches source URLs, applies sanitization, writes to storage, advances `cache.status`. |
| **Sanitization pipeline** | Strips ads, tracking scripts, and inline media from captured payloads. |
| **Storage backend client** | Writes, retrieves, and reclaims archive payloads on durable cloud storage. |
| **Authenticated redirect service** | Serves archive payloads through a short-lived authenticated URL that verifies the requesting user's access. |
| **Plan-state resolver** | Determines whether a user is currently eligible for capture, archive access, and backfill. |
| **Backfill orchestrator** | On first paid upgrade, enqueues a user's existing eligible bookmarks at the documented rate. |
| **Per-domain throttle store** | Per-domain rate limiting to avoid hammering individual origins. |
| **Retry scheduler** | Manages automatic retry of `retry` and `invalid-timeout` captures with backoff. |
| **Grace-period sweep job** | Periodic job that finds users past their `DOWNGRADE_GRACE_PERIOD` and triggers payload reclamation. |
| **Storage reclamation worker** | Removes archive payloads when a bookmark is permanently deleted, when grace expires, or when the account is deleted. |
| **Capture failure classifier** | Maps fetch outcomes to specific `cache.status` values (`invalid-origin`, `invalid-timeout`, `invalid-size`, `failed`, `retry`). |
| **Anti-bot detection** | Recognizes when a source actively blocks automated capture and stops retrying. |
| **Collection access guard** | Enforces that archive reads respect the requesting user's `access.level` on the parent collection. |
| **Public-page exclusion guard** | Ensures public bookmark pages never expose archive URLs or actions, regardless of UI state. |
| **Search index integration** | Pushes archived page text into the search index used by **Search & Filters PRD** for page-content search. |
| **Cache-status filter integration** | Maintains the `cache.status:` operator counts used by **Search & Filters PRD**. |
| **Observability module** | Logs capture outcomes by category, retry rates per domain, backfill throughput, grace-period reclamation events, leaked-URL access attempts. |

---

## 19. OSS / Build-vs-Buy Decision

1. **Study ArchiveBox (MIT, ~24k stars) as the primary reference implementation.** ArchiveBox is the most battle-tested OSS web archiving engine available. License classification: **embed or self-hosted service** — MIT permits embedding the library directly in Plenix's capture worker, or running it as an internal sidecar service. Read its extractor pipeline (`SingleFile`, `wget`, `chrome-headless`) to understand the hard problems: how to freeze CSS, inline fonts, rewrite asset URLs to relative paths, and handle JavaScript-heavy pages. Do not assume the naive `fetch()` + store approach will produce a usable archive — it won't.

2. **Karakeep (AGPL) is a reference for curation UX, not the capture stack.** Karakeep answers "how do I organize and retrieve saved bookmarks?" — Plenix already has its own answer to that. What Plenix is building in this PRD is the preservation layer (keep a page alive indefinitely, prove it existed, serve it faithfully years later), which is ArchiveBox's domain. License classification: **reference only** — AGPL means Plenix cannot embed Karakeep code. Study its UI patterns for `cache.status` surfacing and filter UX; borrow no source code.

3. **Key architectural decision: headless browser vs. lightweight HTTP fetcher.** The two capture approaches have very different cost and fidelity profiles. A lightweight HTTP fetcher (e.g. `node-fetch` + `cheerio` + asset inliner) is fast and cheap but will produce broken archives for any page that requires JavaScript to render. A headless Chromium instance (via Playwright or Puppeteer) captures nearly everything but costs ~10x the compute per capture and introduces significant infra complexity. ArchiveBox's answer is to use both — lightweight first, headless as a fallback or for known JS-heavy domains. Plenix should adopt the same two-tier approach rather than committing exclusively to one.

4. **SingleFile (MIT) is the right embed for full-fidelity HTML snapshots.** SingleFile is the library that ArchiveBox uses internally to produce self-contained single-file HTML archives (all assets inlined as data URIs). License classification: **embed** — MIT. It handles font inlining, CSS rewriting, image embedding, and `<noscript>` fallback in a way that is extremely hard to replicate from scratch. Wire Playwright to navigate to the target URL, wait for network idle, then invoke the SingleFile extension or its Node.js API to produce the output blob. This is the foundation of `WebArchiveCaptureType = "web_page"`.

5. **Readability.js (Apache 2.0) is already relevant upstream but belongs to the Reader PRD, not here.** The Reader / Articles PRD uses Readability.js for the cleaned article body. The web archive PRD stores the full-fidelity snapshot — these must remain separate storage paths. Do not pipe the archive payload through Readability; that destroys the preserved fidelity. The two are derived from the same fetch but stored independently, as specified in §0.

6. **WARC format is the archival standard — decide early whether to adopt it.** Web ARChive (WARC) is the ISO/Library of Congress standard for web preservation, and it is what ArchiveBox emits. It carries the raw HTTP request and response, metadata, and payload in a single seekable container. Adopting WARC means Plenix's archives are interoperable with Wayback Machine tooling, `warcio` (MIT), and any future migration path. The alternative — storing a self-contained HTML blob — is simpler to serve but is a proprietary format. Recommendation: store SingleFile HTML as the primary serve artifact (fast to open in a browser tab) and optionally emit a WARC sidecar for download/export fidelity. The WARC sidecar is what the user downloads via F14.

7. **Per-domain throttling must be implemented at the queue level, not inside the worker.** It is tempting to add `await sleep(1000)` inside the capture worker. Do not. Throttle at the job dispatch layer: the queue should hold per-domain token buckets and refuse to release a job for a domain that is currently cooling off. This keeps workers free to process other domains immediately. ArchiveBox's `ARCHIVEBOX_CRAWL_TOTALCOUNT` and `ARCHIVEBOX_CRAWL_TIMEOUT` settings illustrate the configuration surface; Plenix should expose equivalent constants (`MAX_CAPTURES_PER_DOMAIN_PER_MINUTE`) as server-level config, not hardcoded magic numbers.

8. **robots.txt compliance is a legal and ethical boundary, not just a courtesy.** ArchiveBox respects `robots.txt` by default. Plenix must do the same. The capture worker must fetch and parse the target domain's `robots.txt` before issuing the capture request, and must skip capture (set `cache.status = invalid-origin`) if the `User-agent: *` or `User-agent: PlenixArchiver` disallows the path. This is non-negotiable — bypassing `robots.txt` creates legal exposure and violates platform fragility norms with high-traffic sources.

9. **Warning: platform fragility on anti-bot systems is unpredictable and will worsen over time.** Sites actively invest in blocking automated capture. Cloudflare Bot Management, Akamai, and similar services will silently serve honeypot or empty pages to headless browsers. ArchiveBox's `failed` rate against such sites is high and growing. Plenix must accept that a meaningful percentage of archives will land in `cache.status = failed` for this reason, and must communicate this to users clearly (F34 / §5.10). Do not over-engineer anti-detection — it is an arms race Plenix will not win, and attempting it carries legal risk.

10. **Warning: E2EE is fundamentally incompatible with server-side archive capture.** The capture worker runs on Plenix's servers and must read the plaintext URL and fetch the page in the clear. If a future Plenix roadmap item introduces end-to-end encryption of bookmark data, the archive pipeline must be explicitly carved out — either capture happens before encryption, or E2EE bookmarks have no archive capability. Do not assume these two features can coexist without explicit architectural work.

11. **What Plenix builds natively:** the capture queue and prioritization logic (new save vs. backfill vs. retry lanes), the `cache.status` state machine and retry scheduler, the authenticated redirect service, the plan-tier gate, the grace-period sweep job, the storage reclamation worker, and the sanitization layer that strips ads and trackers from the captured payload (a custom allowlist-based approach tuned to Plenix's content mix, drawing on uBlock Origin's filter lists as a reference but not embedding the extension itself).

12. **What Plenix defers to established tools or services:** raw page rendering and asset inlining (SingleFile via Playwright — MIT, embed); headless browser infrastructure (Playwright managing Chromium — Apache 2.0, self-hosted); durable blob storage (existing cloud provider bucket — not OSS); `robots.txt` parsing (an MIT-licensed parser such as `robots-parser` on npm — embed). ArchiveBox may be run as an internal self-hosted sidecar during the early prototype phase to validate capture quality and measure the fidelity gap before committing to a fully custom pipeline.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| **Bookmarks PRD** | A web archive entry exists in the context of a saved bookmark. The bookmark provides the source URL, lifecycle state (Trash, restored, permanently deleted), and the parent collection. |
| **Collections PRD** | Archived bookmarks live inside collections; cross-collection lifecycle rules (move, share) flow through. |
| **User / Account** | Web archive is a paid-plan capability; subscription state determines whether new archives are made and how long existing archives remain accessible after a downgrade. |
| **Reader / Articles PRD** | The parsed article body and the web archive are two independent projections derived from the same source-page fetch. They MUST stay coordinated but are stored separately. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| **Search & Filters PRD** | The `cache.status:` operator family (`ready`, `failed`, `invalid-origin`, `invalid-timeout`, `invalid-size`, `retry`) and the page-content search target both depend on this capability's archived copies and status field. |
| **Bookmarks PRD** | Bookmark cards and detail surfaces show "Open web archive" actions when an archive is `ready`. |
| **Sharing / Collaboration PRD** | Shared collections include bookmarks whose owners have archives; collaborator visibility of those archives follows access rules and the privacy constraints in this PRD. |
| **Import / Export / Backup PRD** | Backup outputs need to honor the rule that archives are never exported in plain form (private-only); the user's own download path is the only export channel for archive payloads. |
| **Public Page / Embed PRD** | Public bookmark pages MUST NOT expose the archive URL or payload; archives are always private regardless of public-collection state. |

### Related Capabilities

| Capability | Relationship |
|---|---|
| **Bookmarks PRD** | Owns the bookmark entity. This PRD owns the archive payload, the `cache` field on the bookmark (status, size, created), and the lifecycle of archived copies. |
| **Reader / Articles PRD** | Owns the cleaned, sanitized article body for the reader surface. This PRD owns the full-fidelity snapshot. The two are derived from the same fetch but serve different purposes. |
| **Files PRD** | Owns user-uploaded PDFs, EPUBs, images, videos, and documents. This PRD covers archives of *web pages* (including web pages that happen to be PDFs or EPUBs reachable at a URL); user uploads are NOT archived through this capability. |
| **Search & Filters PRD** | Owns the filter operators that key on `cache.status` and the page-content full-text search target. This PRD provides the underlying status field and indexable archived content. |

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
| Field state on bookmark after grace-period reclamation | 🟠 Product Decision | Whether `cache.status`, `cache.size`, and `cache.created` are retained or cleared on the bookmark when archives are reclaimed after grace expiry. |
| Stale-archive freshness signal | 🟠 Product Decision | Whether the system surfaces a "this archive is N months old" indicator or recommends re-saving when the source has likely changed. |
| Per-bookmark "skip archive" opt-out | 🔴 Not Defined | Whether the user can mark sensitive bookmarks as "do not archive." |
| Archive versioning | 🔴 Not Defined | Whether to support multiple historical archives per bookmark. |
| Manual re-archive without delete | 🔴 Not Defined | Whether a future "re-archive" action without delete-and-resave is added. |
| Capture latency target for new saves | 🟠 Product Decision | Source says "a few minutes." Concrete SLO (e.g. 95th percentile < 5 minutes) is not pinned. |
| Backfill scheduling fairness across users | 🟠 Product Decision | Whether multiple users upgrading simultaneously share global capture capacity or each gets the per-user rate. Recommendation: per-user rate, with global capacity sized to absorb concurrent upgrades. |
| Anti-bot retry ceiling | 🟠 Product Decision | After how many `failed` retries the worker stops (recommendation: 3 with exponential backoff). |
| Capture timeout ceiling | 🟠 Product Decision | The wall-clock timeout that triggers `invalid-timeout` (recommendation: 60 seconds). |
| Sanitization aggressiveness | 🟠 Product Decision | Beyond the source-confirmed "ads and trackers stripped," whether to strip additional categories (analytics beacons, third-party fonts, web-font CDNs, social-share widgets). |
| Storage reclamation latency after permanent delete | 🟠 Product Decision | Source-aligned behavior is async; concrete latency (within minutes? hours?) is not pinned. |
| Grace-period exact duration | 🟠 Product Decision | Source says "about a month." Concrete value (28 / 30 / 31 / 35 days) requires a product call. |
| Grace-period notifications | 🟠 Product Decision | Whether to email / notify users at downgrade, halfway through grace, and just before deletion. |
| Surface backfill progress to users | 🟠 Product Decision | Whether to expose the backfill progress indicator (10.2) or run silently. |
| Capture of audio / video / iframe payloads | ✅ Decided | Not captured. Markup references MAY be retained. |
| Capture of pages behind login | ✅ Decided | Not captured. `cache.status = invalid-origin`. |
| Capture of pages > 70 MB | ✅ Decided | Not captured. `cache.status = invalid-size`. |
| Per-account total storage cap | ✅ Decided | None — storage is unlimited. |
| Per-item size cap | ✅ Decided | 70 MB. |
| Plan gating | ✅ Decided | New captures and archive access require a paid plan. |
| Free-tier behavior | ✅ Decided | No new captures; existing captures inaccessible (read: deleted after grace if user downgraded). |
| Bulk backfill rate on first paid upgrade | ✅ Decided | Approximately 1,000 archives per 30 minutes per user. |
| Grace period after downgrade | ✅ Decided | Approximately 1 month. |
| Manual re-archive button | ✅ Decided | Not provided. Workaround is delete-and-resave. |
| Failed archives auto-retried | ✅ Decided | Yes. |
| Bookmarks in Trash archived | ✅ Decided | No. |
| Archive privacy | ✅ Decided | Always private. No publicly-shareable URLs. Download is the only sharing path. |
| Public-page exposure of archive | ✅ Decided | Forbidden. Archives MUST NOT be reachable from public bookmark pages. |
| Credential injection for capture | ✅ Decided | Forbidden. Captures use only public, unauthenticated HTTP. |
| Bypass of paywalls / login walls / anti-bot | ✅ Decided | Forbidden. |
| Archive included in normal backups | ✅ Decided | No. Per-bookmark Download is the only export channel for archive payloads. |
| `cache.status` enum values | ✅ Decided | `ready`, `retry`, `failed`, `invalid-origin`, `invalid-timeout`, `invalid-size`. |
| Authentication required for archive payload reads | ✅ Decided | Yes — direct storage URLs MUST NOT be reachable without authentication. |
| Frozen-in-time semantics | ✅ Decided | Yes — captured at save time; never automatically refreshed. |

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
