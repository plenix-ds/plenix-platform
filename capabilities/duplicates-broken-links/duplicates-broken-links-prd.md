# 09 — Duplicates & Broken Links PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Duplicates & Broken Links (library-health checks) |
| **Capability ID** | duplicates_broken_links |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-05-02 |
| **Revision summary** | Full specification with features, functionality, scenarios, and enablers |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST automatically scan the user's library for two kinds of library-health issues — **duplicate bookmarks** (multiple bookmarks pointing at effectively the same URL) and **broken links** (bookmarks whose source URL no longer resolves) — and MUST surface each issue through dedicated filter views and visual indicators so the user can clean up their library before it grows unmanageable. Both capabilities are paid-plan-gated; broken-link detection is user-tunable along a strictness axis.

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

### UC-01 — Find and remove duplicates (web / desktop)

| Item | Detail |
|---|---|
| Actor | Authenticated paid-plan user. |
| Goal | Clean up duplicate bookmarks accumulated over time. |
| Main Flow | 1. User opens **All bookmarks** (or any scope; the filter scans the whole library by default). 2. User clicks the **Duplicates** filter in the sidebar. 3. The list shows only the duplicate copies — originals are not included. 4. User selects rows via per-row checkboxes or **Select all**. 5. User clicks **Delete** in the toolbar. 6. Selected duplicates move to Trash per **Bookmarks PRD §5**. |
| System Response | The duplicates list shrinks; remaining originals are unaffected. |
| Alternate Flow | If no duplicates exist, the empty state MUST explain what duplicate detection looks for and reassure that the user's library is clean. |

### UC-02 — Find and remove duplicates (iOS)

| Item | Detail |
|---|---|
| Actor | iOS user on a paid plan. |
| Goal | Same as UC-01 on mobile. |
| Main Flow | 1. User taps the icon in the top-right of the bookmark list. 2. User taps **Filter**. 3. User selects **Duplicates** from the suggestions list. 4. User taps **Select** in the top-right. 5. User selects the bookmarks to remove. 6. User taps **Actions → Delete**. |
| System Response | Same as UC-01. |
| Alternate Flow | None. |

### UC-03 — Find and remove duplicates (Android)

| Item | Detail |
|---|---|
| Actor | Android user on a paid plan. |
| Goal | Same as UC-01 on mobile. |
| Main Flow | 1. User taps the search field. 2. User selects **Duplicates** from the suggestions. 3. User taps and holds an item to enter selection mode (or uses **Select all**). 4. User taps **Delete** in the toolbar. |
| System Response | Same as UC-01. |
| Alternate Flow | None. |

### UC-04 — Discover the original of a duplicate group

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Verify which bookmark is the "original" before deleting duplicates, in case the user wants to migrate tags or notes. |
| Main Flow | 1. User opens the duplicates list. 2. User identifies a duplicate of interest. 3. User opens the bookmark detail and notes its URL. 4. User searches for the URL (or filters to **All bookmarks** and finds the unique remaining match). 5. User opens the original. |
| System Response | The original is reachable through normal search; the system MAY also surface a "see original" link from a duplicate's detail surface (🟠 Product Decision). |
| Alternate Flow | The duplicate-merge action (F26) would obviate this flow; it is 🔴 Not Defined. |

### UC-05 — Encounter a broken link

| Item | Detail |
|---|---|
| Actor | Authenticated paid-plan user. |
| Goal | (Negative case) The user notices a ghost icon next to a bookmark's domain. |
| Main Flow | 1. User opens a collection that contains broken bookmarks. 2. User sees the ghost icon adjacent to one bookmark's domain. 3. User opens the bookmark detail or hovers the icon. 4. UI explains the bookmark may be broken and offers the recovery options below. |
| System Response | The bookmark itself is not deleted or hidden; the visual indicator is the entire intervention. |
| Alternate Flow | A: User opens the web archive copy if `cache.status: ready` (recommended path; see **Web archive PRD UC-05**). B: User edits the URL to the new address; broken flag clears within a few hours. C: User deletes the bookmark. D: User does nothing; the flag persists until the URL is fixed, the page works again, or the user changes detection mode. |

### UC-06 — Filter to all broken links across the library

| Item | Detail |
|---|---|
| Actor | Authenticated paid-plan user. |
| Goal | Triage the library's broken bookmarks in one view. |
| Main Flow | 1. User opens the **Broken links** filter in the sidebar (web / desktop) or via the mobile filter sheet. 2. The list shows every bookmark currently flagged broken. |
| System Response | Standard filtered list per **Search & Filters PRD**. |
| Alternate Flow | The user MAY combine the broken-links filter with `cache.status:ready` via `match:OR` to identify broken bookmarks that have a ready web archive — i.e. content is recoverable — versus broken bookmarks with no archive — i.e. content may be lost. |

### UC-07 — Switch broken-link detection mode

| Item | Detail |
|---|---|
| Actor | Authenticated paid-plan user. |
| Goal | Reduce false positives or be more aggressive about flagging stale bookmarks. |
| Main Flow | 1. User opens **Settings → App** and locates the **Broken links** dropdown. 2. User selects one of `Off`, `Basic`, `Default`, `Strict`. 3. The system applies the new mode to all subsequent scans. |
| System Response | Within a few hours, existing `broken: true` flags are re-evaluated against the new mode. Some flags may clear; others may newly appear. |
| Alternate Flow | If the user selects **Off**, all existing `broken: true` flags MUST be cleared within a few hours of the next sweep (F20). |

### UC-08 — Fix a broken URL

| Item | Detail |
|---|---|
| Actor | Authenticated paid-plan user. |
| Goal | Repair a broken bookmark by updating its URL. |
| Main Flow | 1. User opens a broken bookmark in the bookmark editor. 2. User updates the `link` field to the new URL. 3. User saves. 4. The next periodic scan re-evaluates the bookmark; within a few hours, the broken flag clears. |
| System Response | The ghost icon disappears; the bookmark behaves normally again. |
| Alternate Flow | If the new URL also fails detection, the broken flag stays set (or re-appears after temporarily clearing). |

### UC-09 — False positive on a local-network bookmark

| Item | Detail |
|---|---|
| Actor | User who saves intranet or local-network URLs that the application's scanner cannot reach. |
| Goal | (Negative case) The bookmark is flagged broken even though it works fine for the user. |
| Main Flow | 1. User notices a working local-network bookmark flagged broken. 2. User opens **Settings → App**. 3. User changes the broken-link mode to **Basic** (which only flags explicit 404 / 410). 4. Within a few hours, the false-positive flag clears. |
| System Response | The library reduces to the conservative flagging set; intranet bookmarks no longer trip the false flag. |
| Alternate Flow | If the user has many such bookmarks and `Basic` is still too aggressive, they MAY set the mode to **Off** entirely. |

### UC-10 — Re-save a previously deleted URL (no longer a duplicate)

| Item | Detail |
|---|---|
| Actor | Authenticated paid-plan user. |
| Goal | Verify duplicate detection respects Trash. |
| Main Flow | 1. User had a bookmark for `https://example.com/page` and deleted it (now in Trash). 2. User saves the same URL again as a new bookmark. 3. The new bookmark is created in their default collection. 4. Duplicate detection runs. |
| System Response | The Trashed bookmark MUST NOT count as a duplicate of the new one (per F16). The new bookmark does NOT appear in the duplicates list. |
| Alternate Flow | If the user later restores the Trashed bookmark, the original-selection rule (F03) re-applies; the older one becomes the original; the newer one becomes a duplicate. |

### UC-11 — Edit URL in a way that creates a duplicate

| Item | Detail |
|---|---|
| Actor | Authenticated paid-plan user. |
| Goal | Verify duplicate detection re-runs on URL change. |
| Main Flow | 1. User has bookmark A (`https://example.com/page`) and bookmark B (`https://example.org/other`). 2. User edits B's URL to `https://example.com/page` (now matching A under normalization). 3. Duplicate detection re-runs (F23). 4. B becomes a duplicate; B appears in the duplicates list (assuming A's `created` is earlier per F03). |
| System Response | The duplicates list reflects the new state within seconds. |
| Alternate Flow | None. |

### UC-12 — Free-tier user attempts to use the duplicates filter

| Item | Detail |
|---|---|
| Actor | Free-tier user. |
| Goal | (Negative case) The user opens the Duplicates filter. |
| Main Flow | 1. User opens **All bookmarks**. 2. User looks for the **Duplicates** filter. 3. The filter MAY be visible with an upgrade affordance, OR hidden entirely (UI choice owned by **Search & Filters PRD**). 4. The user MUST NOT see a misleading count (F21). |
| System Response | If shown, the filter MUST surface a clear "paid plan required" state and an upgrade path. No duplicate detection is computed. |
| Alternate Flow | Same applies for the broken-links filter. |

### UC-13 — Turn off broken-link checking entirely

| Item | Detail |
|---|---|
| Actor | Authenticated paid-plan user. |
| Goal | Stop broken-link scanning across the user's entire library — for example, the user has many intranet bookmarks and finds even **Basic** mode too noisy, or simply doesn't want the feature. |
| Main Flow | 1. User opens **Settings → App** and locates the **Broken links** dropdown. 2. User selects **Off**. 3. The system stops scheduling scans for the user's library. 4. Within a few hours of the next sweep, all existing `broken: true` flags are cleared (F20). 5. The Broken-links filter chip's entitlement state transitions to `disabled_by_user`. |
| System Response | Future scans do not run. Filter chip surfaces "broken-link detection is currently off" rather than implying the library has no broken links (per §5.12 empty states). The bookmarks themselves are unaffected — only the `broken` flag is cleared. |
| Alternate Flow | The user MAY change the mode back to `Basic`, `Default`, or `Strict` at any time; the system MUST resume scanning and re-evaluate within a few hours. |

---

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Duplicate detection across the user's library** | ✅ Built | The system MUST detect bookmarks whose URLs match another of the user's bookmarks under the duplicate-equivalence normalization (§5.1). Detection MUST scan across all of the user's accessible collections. |
| F02 | **Duplicates list shows only the duplicates, not the originals** | ✅ Decided | The duplicates list MUST contain only the extra copies. The original (the first-saved bookmark in each duplicate group) MUST NOT appear. The user MUST be able to safely delete everything in the list without losing any unique URL. |
| F03 | **Original-selection rule** | ✅ Decided | Within a duplicate group, the **original** is the bookmark with the earliest `created` timestamp. Ties are broken by the lowest `_id`. The remaining bookmarks in the group are the duplicates. |
| F04 | **Bulk-select and bulk-delete duplicates** | ✅ Built | The duplicates list MUST support per-row checkbox selection, **Select all**, and a single **Delete** action that moves all selected bookmarks to Trash. |
| F05 | **Mobile selection mode for duplicates** | ✅ Built | iOS MUST expose **Select** in the top-right of the duplicates list followed by **Actions → Delete**. Android MUST expose tap-and-hold selection plus **Select all**, then **Delete** in the toolbar. |
| F06 | **Duplicate URL normalization** | ✅ Built | Before comparing two URLs for duplicate detection, the system MUST normalize away differences that don't change the page: protocol (`http` vs `https`), `www.` prefix, trailing slashes, tracking query parameters, and hash fragments. (See §5.1 for the full rule list.) |
| F07 | **Broken-link automatic scanning** | ✅ Built | The system MUST periodically scan all of the user's bookmarks and set `broken: true` on bookmarks whose source URL fails the active detection mode. |
| F08 | **Broken-link visual indicator on bookmark card** | ✅ Built | A bookmark with `broken: true` MUST surface a ghost icon adjacent to the domain name on every bookmark surface. |
| F09 | **Detection-mode setting (Off / Basic / Default / Strict)** | ✅ Built | The user MUST be able to choose a broken-link detection mode in account settings. The four allowed values and their semantics are defined in §5.4. |
| F10 | **Auto-clear on URL fix** | ✅ Decided | When the user changes a broken bookmark's URL, the `broken` flag MUST clear automatically within a few hours of the next scan, without the user taking any further action. |
| F11 | **Auto-clear on detection-mode change** | ✅ Decided | When the user changes the detection mode (e.g. from Strict to Basic), the `broken` flag MUST be re-evaluated against the new mode within a few hours. |
| F12 | **Web archive coordination on broken** | ⚪ Capability Split | When a bookmark is broken AND a `cache.status: ready` web archive exists, the broken-link UI MUST surface the **Open web archive** action prominently as the recommended recovery path. Web archive itself is owned by **Web archive PRD**. |
| F13 | **Duplicates filter** | ⚪ Capability Split | The sidebar / mobile filter that surfaces the duplicates list is owned by **Search & Filters PRD §3 F12**. This PRD owns the underlying duplicate-detection logic. |
| F14 | **Broken-links filter** | ⚪ Capability Split | The sidebar / mobile filter that surfaces broken bookmarks is owned by **Search & Filters PRD §3 F12** (`broken:true` operator). This PRD owns the underlying `broken` flag state. |
| F15 | **All-bookmarks scope for duplicates** | ✅ Decided | The duplicates filter MUST scan the user's entire library by default (equivalent to opening **All bookmarks** and applying Duplicates). The system MUST NOT silently scope duplicates to a single collection. |
| F16 | **Trash exclusion** | ✅ Decided | Bookmarks in Trash MUST NOT participate in duplicate detection or broken-link scanning. A Trashed copy is not a duplicate of a non-Trashed copy; a Trashed broken bookmark MUST NOT keep its broken flag refreshed. |
| F17 | **Plan-gated** | ✅ Decided | Both capabilities require a paid plan. Free-tier users MUST NOT see duplicate or broken-link state computed for their library. The filters MAY be visible with an upgrade affordance. |
| F18 | **Periodic scan cadence** | ✅ Decided | Broken-link scans MUST run on a regular automatic schedule. The exact cadence is best-effort; "a few hours" turnaround after URL or mode changes is the source-aligned target. |
| F19 | **False-positive transparency** | ✅ Decided | The system MUST acknowledge that the broken flag is a hint, not a verdict. UI copy MUST make this explicit and direct users to the detection-mode setting when they encounter false positives. |
| F20 | **Off mode disables broken-link checking entirely** | ✅ Built | When the user sets detection mode to **Off**, the system MUST stop scanning their library for broken links and MUST clear all existing `broken: true` flags within a few hours of the next sweep. |
| F21 | **No false-positive count for free-tier** | ✅ Decided | Free-tier users MUST NOT see misleading broken-link or duplicate counts derived from a stale or partial scan. Filters MAY be visible with an upgrade affordance but MUST NOT report a count. |
| F22 | **Per-user detection mode** | ✅ Decided | Detection mode is a per-user setting; it is not per-bookmark, per-collection, or per-domain. Users with diverse libraries (intranet + public web) trade off precision globally. |
| F23 | **Duplicate-set membership recomputation** | ✅ Built | When a bookmark is created, deleted, restored from Trash, or has its `link` edited, duplicate-set membership MUST be recomputed promptly so the duplicates list stays accurate. |
| F24 | **Manual scan trigger** | 🔴 Not Defined | Whether the user can manually trigger an immediate broken-link scan rather than waiting for the next periodic run is not defined. |
| F25 | **Per-domain false-positive overrides** | 🔴 Not Defined | Whether the user can mark specific domains as "always trust" so they're never flagged broken (e.g. local intranet) is not defined. The Basic mode partially addresses this. |
| F26 | **Duplicate-merge action (combine into one)** | 🔴 Not Defined | Whether the user can merge two duplicate bookmarks (combining tags, notes, highlights into one and deleting the other) rather than deleting one is not defined. |
| F27 | **Save-time duplicate warning** | 🟠 Product Decision | Whether the system warns the user at save time (e.g. via the browser extension popup) that the URL is already saved is not pinned. The browser extension already shows a saved-page indicator (per **Bookmarks PRD**) but explicit "this would be a duplicate" affordance is open. |
| F28 | **Cross-account duplicates in shared collections** | 🟠 Product Decision | When a user views a shared collection containing a bookmark another collaborator saved that the user has also saved (in their own collection), whether this counts as a duplicate is open. Recommendation: show duplicates only within the requesting user's owned bookmarks; cross-user duplicates are out of scope. |
| F29 | **Last-scanned timestamp surfaced to user** | 🟠 Product Decision | Whether the broken-link scan exposes "last checked at" timestamps per bookmark or per library is open. Useful for users debugging false positives. |
| F30 | **Detection-mode change preview** | 🟠 Product Decision | Whether changing the mode shows a preview ("you'll have N broken links under Strict vs. M under Default") before committing is open. |

---

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Duplicate URL normalization

The duplicate-equivalence normalization is **deliberately more aggressive** than the bookmark-identity normalization owned by **Bookmarks PRD §5 URL normalization**. The bookmark-identity rule treats two URLs as different bookmarks (so the user can save them separately on purpose); the duplicate-equivalence rule treats them as the same so they can be cleaned up.

| Step | Rule |
|---|---|
| Lowercase scheme and host | The scheme and host MUST be compared case-insensitively. |
| Strip protocol difference | `http://` and `https://` MUST be considered equivalent for duplicate purposes. |
| Strip `www.` prefix | A leading `www.` on the host MUST be normalized away. |
| Strip trailing slash | A trailing `/` on the path MUST be removed before comparison. |
| Strip tracking query parameters | Common ad / referral / tracking parameters MUST be removed before comparison. The exact list is an implementation choice; recommended starting set: `utm_*`, `gclid`, `fbclid`, `mc_cid`, `mc_eid`, `igshid`, `_ga`, `ref`, `referrer`, `source`. |
| Strip hash fragment | Anything after `#` MUST be removed before comparison. |
| Preserve meaningful query parameters | Non-tracking query parameters (e.g. `?id=42`, `?page=2`) MUST be preserved. They distinguish meaningful URL variants. |
| Preserve path | The path itself MUST NOT be normalized beyond trailing slash removal. |
| Preserve port | A non-default port (`:8080`) MUST be preserved. |

Two URLs are duplicates when, after all the above transformations, they are byte-identical strings.

### 5.2 Duplicate group identification

| Rule | Behavior |
|---|---|
| Grouping | The system MUST partition the user's bookmarks into duplicate groups by the normalized URL key. |
| Group of one | Singletons (groups of size 1) MUST NOT appear in the duplicates list — they are not duplicates. |
| Original selection | Within a group of size ≥ 2, the **original** is the bookmark with the earliest `created` timestamp. Ties on `created` MUST be broken by the lowest `_id`. |
| Duplicates list contents | The duplicates list MUST contain every bookmark in every group **except the original**. The user MAY safely delete every bookmark in the list without losing any unique URL. |
| Cross-collection | Duplicate groups MUST span the user's entire library; a duplicate may live in a different collection than its original. |
| Trash exclusion | Bookmarks in Trash (`removed: true`) MUST NOT participate in duplicate grouping. |
| File-backed bookmarks | Bookmarks created from file uploads (per **Files PRD**) MAY participate in duplicate detection if their `link` (the hosted file URL) matches another bookmark. In practice this is rare since each upload generates a unique hosted URL; the rule is "treat them like any other bookmark." |

### 5.3 Duplicate recomputation triggers

| Trigger | Required Behavior |
|---|---|
| Bookmark created | The new bookmark's normalized URL is checked against the existing library; if it matches an existing original, the new bookmark joins the group as a duplicate. |
| Bookmark URL edited | The bookmark's new normalized URL is re-checked. The bookmark MAY change duplicate-group membership (entering, leaving, or changing groups). |
| Bookmark moved to Trash | The bookmark is removed from duplicate grouping. If the group's original was Trashed, the next-earliest-created remaining bookmark becomes the new original; the duplicates list updates accordingly. |
| Bookmark restored from Trash | The restored bookmark re-enters duplicate grouping. The original-selection rule re-applies. |
| Bookmark permanently deleted | Same as Trash for grouping purposes; the bookmark no longer exists. |

### 5.4 Broken-link detection modes

| Mode | What gets flagged |
|---|---|
| **Off** | No checking; existing `broken: true` flags MUST be cleared within a few hours. |
| **Basic** | Only explicit "not found" responses (HTTP 404 and HTTP 410). Best for users with many intranet, local-network, or aggressively-firewalled bookmarks. |
| **Default** | `Basic` checks PLUS bookmarks whose domain does not exist or whose hostname cannot be resolved (DNS failure). |
| **Strict** | `Default` checks PLUS bookmarks with slow responses (above a configured time threshold), server errors (HTTP 5xx), and too many redirects. |

| Rule | Behavior |
|---|---|
| Default for new accounts | The default detection mode is `Default`. |
| Mode is per-user | The mode is a per-user setting on the user account. It is NOT per-bookmark, per-collection, or per-domain. |
| Mode change re-evaluates | Within a few hours of a mode change, the system MUST re-evaluate every bookmark against the new mode. |
| Mode change to Off | When the mode changes to `Off`, all existing `broken: true` flags MUST be cleared on the next sweep. |
| Server-side enforcement | The mode MUST be applied server-side; client-side display alone is insufficient. |

### 5.5 Broken-link scan pipeline

| Stage | Behavior |
|---|---|
| Schedule | The system MUST run scans on an automatic, regular schedule. The exact cadence is best-effort; the source-aligned target is "a few hours" turnaround after a URL or mode change. |
| Per-bookmark check | For each eligible bookmark, the worker fetches the source URL with a public, unauthenticated HTTP client and applies the active detection mode's rules. |
| Eligibility | The worker MUST skip bookmarks in Trash (F16). The worker MUST skip bookmarks belonging to free-tier users (F17). |
| Result write | The worker MUST set `broken: true` when the bookmark fails the active mode's checks; MUST set `broken: false` (or remove the field) when the bookmark passes. |
| Result rate | Status updates MUST propagate to all of the user's devices via the standard sync path. |
| Worker credentials | The worker MUST NOT send the user's session cookies, OAuth tokens, or other credentials. Same rule as **Web archive PRD Schema Invariant 8**. |
| Anti-bot tolerance | When a source actively blocks automated requests (e.g. CAPTCHA, IP block), the system MUST NOT silently flag the bookmark as broken in `Default` or `Basic` modes. The detection MUST distinguish "not 404" from "no answer at all." Only explicit failure modes per the active mode's rules MUST set `broken: true`. |
| Timeout | The worker MUST apply a per-request timeout. In `Strict` mode, exceeding this timeout flags as broken; in `Default` and `Basic`, it does not. |

### 5.6 Broken-link auto-clear

| Trigger | Behavior |
|---|---|
| URL edit | When the user edits a bookmark's `link`, the bookmark MUST be re-evaluated on the next scan cycle. The flag MUST clear within a few hours if the new URL passes the active mode's checks. |
| Mode change | Per §5.4, all bookmarks are re-evaluated on mode change. |
| Source recovery | If a previously-broken source URL becomes reachable on a subsequent scan, the flag MUST clear automatically. |
| Trash | When a broken bookmark is moved to Trash, the bookmark MUST NOT keep being scanned; the `broken` flag's value is irrelevant while the bookmark is in Trash. |

### 5.7 Coordination with Web archive

| Rule | Behavior |
|---|---|
| Recovery suggestion | When a user opens or hovers a broken bookmark and `cache.status: ready` is true, the UI MUST surface the **Open web archive** action as the recommended recovery path. |
| Filter combination | The user MAY combine `broken:true` and `cache.status:ready` filters via `match:OR` (per **Search & Filters PRD §3 F12**) to triage broken-but-recoverable bookmarks. |
| Cross-capability ordering | A broken-link flag MUST NOT block a successful web archive open. The web archive serves whatever was captured, regardless of the source URL's current state. |

### 5.8 Plan gating

| Capability | Free | Paid |
|---|---|---|
| Duplicate detection computed | ❌ | ✅ |
| Duplicates filter usable | ❌ | ✅ |
| Broken-link scanning | ❌ | ✅ |
| Broken-link visual indicator (ghost icon) | ❌ — flag never set | ✅ |
| Broken-link filter usable | ❌ | ✅ |
| Detection-mode setting | ❌ — setting MAY be visible read-only with upgrade affordance | ✅ |
| Misleading partial counts | ❌ MUST NOT be shown | n/a |

### 5.9 Sharing and access

| Rule | Behavior |
|---|---|
| Per-user computation | Both duplicate detection and broken-link scanning operate on each user's bookmarks independently. A user's duplicates view MUST contain only bookmarks the user owns or has at least edit access to. |
| Read-only collaborator | A read-only collaborator (level 2 per **Collections PRD §6.7**) MUST NOT see duplicate or broken-link state for bookmarks owned by another user, beyond the visual `broken` indicator that is visible to anyone with read access. |
| Cross-user duplicates | Whether a bookmark in a shared collection counts as a duplicate of one in the requesting user's owned collections is 🟠 Product Decision (F28). Recommendation: limit duplicate detection to bookmarks the user owns. |
| Public collections | The duplicates and broken-links filters MUST NOT be exposed to anonymous viewers of public bookmark pages. |

### 5.10 Cross-capability data flow

| Source | This capability uses it for |
|---|---|
| Bookmark `link` | URL normalization input (duplicates) and source URL to fetch (broken-link scanner). |
| Bookmark `created` | Original-selection rule (F03). |
| Bookmark `_id` | Original-selection tiebreaker. |
| Bookmark `removed` | Trash exclusion. |
| User plan tier | Plan gating (§5.8). |
| User detection-mode setting | Broken-link scanner behavior (§5.4). |
| Collection access level | Per-user list scoping (§5.9). |
| Web archive `cache.status` | Recovery suggestion when bookmark is broken (§5.7). |

### 5.11 Platform-Specific Interaction Patterns

| Platform | Open Duplicates | Open Broken Links | Bulk Delete |
|---|---|---|---|
| **Web / Desktop** | Sidebar → **Duplicates** filter. | Sidebar → **Broken links** filter. | Hover-checkbox per row + **Select all** + toolbar **Delete**. |
| **iOS** | Top-right icon → Filter → **Duplicates**. | Same path → **Broken links**. | **Select** mode + per-row tap + **Actions → Delete**. |
| **Android** | Search field → **Duplicates** suggestion. | Search field → **Broken links** suggestion. | Tap-and-hold to enter selection + **Select all** + toolbar **Delete**. |
| **Cross-platform invariant** | The detection rules and the original-selection rule MUST be identical across platforms; only the gesture surface differs. | | |

### 5.12 Empty states

| State | Required UI |
|---|---|
| No duplicates found | A clear "your library is clean — no duplicate URLs detected" state. The state MUST briefly explain what duplicate detection compares (so the user trusts the result). |
| No broken links found | A clear "no broken links detected" state. |
| Free-tier user attempts the filter | A "paid plan required" state with the upgrade affordance. MUST NOT show a count. |
| Detection mode is `Off` | The broken-links filter MUST surface a clear "broken-link detection is currently off — enable it in Settings → App" state rather than implying the library has no broken links. |

---

### System Constants

### 6.1 Internal Service Capabilities

| System Capability | Requirement |
|---|---|
| Compute duplicate groups | The system MUST compute duplicate groups for the user's library on demand and re-compute on every relevant write (§5.3). |
| Apply duplicate URL normalization | The system MUST apply the §5.1 normalization steps in the documented order. |
| Determine the original | The system MUST determine the original of every duplicate group per the F03 rule. |
| Schedule broken-link scans | The system MUST run periodic broken-link scans for paid-plan users. |
| Apply detection mode | The system MUST apply the user's detection mode to every scan. |
| Write `broken` field | The system MUST set or clear the `broken` field on the bookmark per scan results. |
| Re-evaluate on URL change | The system MUST re-evaluate a bookmark's broken state within a few hours of a URL edit. |
| Re-evaluate on mode change | The system MUST re-evaluate every bookmark within a few hours of a detection-mode change. |
| Clear flags on Off | When the user sets mode to `Off`, the system MUST clear all `broken: true` flags on the next sweep. |
| Compute filter counts | The system MUST provide accurate duplicate and broken-link counts to **Search & Filters PRD** for filter chip rendering. |

### 6.2 System Response Conventions

| Response | Behavior |
|---|---|
| Duplicates list response | An array of bookmark records, each member of a duplicate group of size ≥ 2 except the group's original. Sorted by group, then by `created` ascending within each group. |
| Broken-links list response | An array of bookmark records where `broken: true`. Sort and pagination follow standard list behavior. |
| Filter count response | An accurate per-user count for each filter, excluding Trash. |
| Free-tier on either filter | A typed "paid plan required" response; no list contents, no count. |

### 6.3 Error and Condition Handling

| Condition | Behavior |
|---|---|
| User is free-tier and queries the duplicates list | Refused with a "paid plan required" message; no duplicate computation. |
| User is free-tier and queries broken links | Same. |
| Detection mode is `Off` and user opens the broken-links filter | Filter resolves to an empty list with a clear "detection is currently off" state, NOT a misleading "your library has no broken links" message. |
| Source URL is unreachable for a transient reason | Per the active mode's rules. `Basic` does not flag; `Default` does not flag for transient connection issues; `Strict` flags slow responses and 5xx. |
| Source returns 401 / 403 | NOT broken — the page exists, the user just can't access it server-side. The bookmark MUST NOT be flagged. |
| Source returns 404 / 410 | Broken under all modes except `Off`. |
| DNS lookup fails | Broken under `Default` and `Strict`; not under `Basic`. |
| Worker timeout | Broken under `Strict` only; not under `Default` or `Basic`. |
| Worker fails internally | The bookmark's `broken` value MUST NOT be changed; the worker MUST retry on the next scan. |
| User edits URL on a broken bookmark | The flag is NOT cleared immediately on save; it MUST be cleared within a few hours of the next scan if the new URL passes. |
| User changes mode mid-scan | The change applies on the next scan; in-flight scans MAY complete under the old mode. |

### 6.4 Reserved Field Values

| Item | Rule |
|---|---|
| `broken` field on bookmark | Boolean; absent or `false` means not broken. Server-set. The user MUST NOT directly edit this field. |
| `BROKEN_LINK_MODES` enum | `off`, `basic`, `default`, `strict`. |
| `DEFAULT_BROKEN_LINK_MODE` | `default`. |
| `BROKEN_LINK_RECHECK_LATENCY` | A few hours target after URL edit, mode change, or source recovery. |
| `DUPLICATE_NORMALIZATION_TRACKING_PARAMS` | At minimum: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `fbclid`, `mc_cid`, `mc_eid`, `igshid`, `_ga`, `ref`, `referrer`, `source`. |

### 6.5 Internal Action Types

| Action | Purpose |
|---|---|
| `duplicates.computeGroup` | Compute the duplicate group for one normalized-URL key. |
| `duplicates.list` | Return the user's duplicates list (every duplicate group's non-original members). |
| `duplicates.recompute` | Recompute affected groups after a bookmark create / edit / Trash / restore / delete. |
| `duplicates.normalizeUrl` | Apply the §5.1 normalization steps to one URL. |
| `brokenLinks.scanBookmark` | Fetch one bookmark's source URL and apply the active mode's rules. |
| `brokenLinks.fullSweep` | Schedule a full library scan for a user. |
| `brokenLinks.recheckBookmark` | Re-run the scan on one bookmark within the few-hour latency target after a URL edit. |
| `brokenLinks.clearAllOnOff` | Clear every `broken: true` flag on the user's library when mode transitions to `Off`. |
| `brokenLinks.modeWrite` | Persist the user's detection-mode setting. |
| `brokenLinks.modeRead` | Retrieve the user's detection-mode setting. |

### 6.6 Plan-Tier Gating

| Capability | Free | Paid |
|---|---|---|
| Duplicate detection | ❌ | ✅ |
| Duplicates filter | ❌ (filter MAY be visible with upgrade affordance; no count) | ✅ |
| Broken-link scanning | ❌ | ✅ |
| Broken-link `broken: true` flag set on bookmarks | ❌ | ✅ |
| Detection-mode setting | ❌ (setting MAY be visible read-only) | ✅ |
| Auto-clear on URL fix / mode change | n/a | ✅ |

### 6.7 Counts and Pagination

| Item | Rule |
|---|---|
| Duplicates count | The duplicates filter chip MUST surface the count of bookmarks that would appear in the list (i.e. all non-original duplicates). The count MUST exclude Trash. |
| Broken-links count | The broken-links filter chip MUST surface the count of bookmarks with `broken: true`. The count MUST exclude Trash. |
| List pagination | Both lists follow the standard pagination defaults (per **Search & Filters PRD §6.6**: `MAX_PER_PAGE = 50`, default `25`). |
| Sort order | Duplicates list default sort is by group then by `created` ascending within each group. Broken-links list default sort is `-created` (newest first), per the standard list default. |

---

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| User has bookmarks for `https://example.com/page` and `http://example.com/page` (different protocol) | Detected as duplicates (protocol stripped per §5.1). The earlier-created one is the original. |
| User has bookmarks for `https://www.example.com/page` and `https://example.com/page` (www difference) | Detected as duplicates. |
| User has bookmarks for `https://example.com/page/` and `https://example.com/page` (trailing slash) | Detected as duplicates. |
| User has bookmarks for `https://example.com/page?utm_source=email` and `https://example.com/page` (tracking param) | Detected as duplicates. |
| User has bookmarks for `https://example.com/page#section1` and `https://example.com/page#section2` (different fragments) | Detected as duplicates (hash stripped). |
| User has bookmarks for `https://example.com/page?id=42` and `https://example.com/page?id=43` (meaningful param) | NOT duplicates — `id` is not a tracking parameter. |
| User has bookmarks for `https://example.com/PAGE` and `https://example.com/page` (path case difference) | NOT duplicates — path case is preserved. |
| User has bookmarks for `https://example.com:8080/page` and `https://example.com/page` (different port) | NOT duplicates — port is preserved. |
| User opens the duplicates filter on a clean library | Empty state shown explaining what duplicate detection compares. |
| User opens the duplicates filter; 8 duplicates exist across 3 groups | The list shows 8 bookmarks (the non-originals); 3 originals are excluded. User MAY safely select all and delete. |
| User selects all in the duplicates list and deletes | All selected bookmarks move to Trash per **Bookmarks PRD §5**. The 3 originals are unaffected and remain in the library. |
| User in the duplicates list deletes only some duplicates | Selected bookmarks move to Trash; remaining duplicates stay in the list; originals stay in the library. |
| User edits bookmark B's URL to match bookmark A | Duplicate detection re-runs (F23 / §5.3); B becomes a duplicate of A; B appears in the duplicates list (assuming A's `created` is earlier). |
| User Trashes a duplicate | The Trashed bookmark leaves the duplicates list immediately. |
| User Trashes the original of a duplicate group | The next-earliest-created remaining bookmark becomes the new original; the duplicates list updates. |
| User restores a Trashed bookmark | The bookmark re-enters duplicate grouping; original-selection rule re-applies. |
| User saves a URL that's already in Trash | The Trashed copy MUST NOT count as a duplicate; the new save does not appear in the duplicates list. |
| Free-tier user opens the duplicates filter | "Paid plan required" state with upgrade affordance; no count, no list. |
| Paid-plan user has a bookmark whose source returns 404 | Under `Basic`, `Default`, or `Strict`: flagged broken. Under `Off`: not flagged. |
| Paid-plan user has a bookmark whose source returns 410 | Same as 404. |
| Paid-plan user has a bookmark whose domain doesn't resolve | Under `Default` or `Strict`: flagged broken. Under `Basic` or `Off`: not flagged. |
| Paid-plan user has a bookmark on a slow but working server | Under `Strict`: flagged broken (false positive likely). Under `Default`, `Basic`, or `Off`: not flagged. User can downgrade to `Default` to clear the false positive. |
| Paid-plan user has a bookmark on a server returning 503 | Under `Strict`: flagged broken. Under `Default`, `Basic`, or `Off`: not flagged. |
| Paid-plan user has a bookmark on a redirect chain (5+ redirects) | Under `Strict`: flagged broken. Under `Default`, `Basic`, or `Off`: not flagged. |
| Paid-plan user has a bookmark requiring login (401) | NOT flagged broken — the page exists, just inaccessible to the worker. |
| Paid-plan user has a bookmark on a paywalled page (403) | NOT flagged broken — same reason. |
| Paid-plan user has a bookmark on an intranet URL the scanner can't reach | Under `Default`: likely flagged as DNS failure or unreachable. User switches to `Basic` to clear the false positive. |
| Paid-plan user changes detection mode from `Strict` to `Default` | Within a few hours, bookmarks flagged solely because of slow response or 5xx unflagging; bookmarks flagged for 404 / 410 / DNS failure remain flagged. |
| Paid-plan user changes mode to `Off` | Within a few hours, ALL `broken: true` flags clear. Future scans do not run. |
| User edits URL on a broken bookmark to a working URL | Flag clears within a few hours. |
| User edits URL on a broken bookmark to another broken URL | Flag stays set (or re-appears after temporarily clearing). |
| User opens a broken bookmark with a `cache.status: ready` web archive | UI surfaces **Open web archive** prominently as the recommended recovery path. |
| User combines `broken:true` and `cache.status:ready` with `match:OR` | The list shows broken-but-recoverable bookmarks (per **Search & Filters PRD §3 F12**). |
| Read-only collaborator on a shared collection sees a bookmark with `broken: true` | The ghost icon is visible (it's a public bookmark attribute on the collection scope). The collaborator MUST NOT see duplicate / broken-links *filters* for the owner's library. |
| User exports their library with broken bookmarks | The export includes the bookmarks with their current `broken` flag value (per **Import / Export / Backup PRD**). |
| Worker fails internally on a single bookmark | The bookmark's `broken` field MUST NOT be changed; the worker MUST retry on the next scan. |
| User saves the same URL twice in quick succession | Both bookmarks are created; duplicate detection groups them; the second is the duplicate and appears in the duplicates list. |
| User has 50 duplicates of the same URL | All 50 - 1 = 49 duplicates appear in the duplicates list, grouped together. The user can Select all + Delete. |

---

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| `bookmark.broken` | boolean | system | Set or cleared by the broken-link scanner per the active detection mode. The user MUST NOT directly edit this field. | Owned by **Bookmarks PRD §8**; written by this PRD. |
| `bookmark.brokenLastChecked` | string (ISO 8601) | optional system | Timestamp of the most recent broken-link scan attempt (success or failure). | For diagnostics; surfacing to the user is 🟠 Product Decision (F29). |
| `bookmark.brokenLastSuccessAt` | string (ISO 8601) | optional system | Timestamp of the most recent successful check (URL responded healthy under the active mode). | Drives "broken for N weeks" UX when paired with `brokenLastFailureAt`. |
| `bookmark.brokenLastFailureAt` | string (ISO 8601) | optional system | Timestamp of the most recent check that flagged the bookmark broken. | Drives "broken for N weeks" UX. |
| `bookmark.brokenStatusCode` | integer | optional system | HTTP status returned by the most recent failed check (e.g. 404, 410, 500), when known. | Improves user-facing diagnostics. MAY be absent for failures that did not yield a status code (DNS failure, timeout). |
| `bookmark.brokenReason` | enum | optional system | One of `BrokenLinkReason`. Finer-grained classification of the failure. | For diagnostics; surfacing to the user is 🟠 Product Decision (F29). |
| `bookmark.brokenConfidence` | enum | optional system | One of `BrokenLinkConfidence`. Indicates how confident the scanner is in the broken classification. | A 404 / 410 result has `high` confidence; a Strict-mode timeout flag has `low` or `medium` confidence. UI MAY differentiate ("we're not sure" vs. "definitely broken"). |
| `userSettings.brokenLinkMode` | enum | system | One of `BrokenLinkMode`. Default `default` for new accounts. | Per-user setting. |
| `userSettings.brokenLinkMode.lastUpdate` | string (ISO 8601) | system | When the user last changed the mode. | Used to schedule re-evaluation. |

The duplicate-set membership is **not** persisted as a per-bookmark field. It is computed on demand from the user's library state, the §5.1 normalization, and the §5.2 grouping rule.

## 12. Database / Schema Notes

### Enums

```ts
type BrokenLinkMode =
  | "off"
  | "basic"
  | "default"     // default for new accounts
  | "strict";

type DuplicateNormalizationStep =
  | "lowercase_scheme_host"
  | "strip_protocol"
  | "strip_www"
  | "strip_trailing_slash"
  | "strip_tracking_params"
  | "strip_hash";

// User-facing classifications of why a bookmark is flagged broken.
// Implementations MAY surface a finer-grained reason on hover or in the
// bookmark detail view; the surface field is just the boolean `broken`.
type BrokenLinkReason =
  | "not_found"          // 404 or 410
  | "dns_failure"        // host does not resolve
  | "timeout"            // exceeded scanner timeout
  | "server_error"       // 5xx
  | "too_many_redirects"
  | "unreachable";       // generic catch-all

// Confidence in the broken classification. A 404 / 410 result has high
// confidence; a Strict-mode timeout or anti-bot block has lower confidence.
// UI MAY use this to differentiate ("we're not sure" vs. "definitely broken").
type BrokenLinkConfidence =
  | "low"       // ambiguous signal (e.g. timeout, slow response)
  | "medium"    // strong signal but could be transient (e.g. DNS failure, 5xx)
  | "high";     // definitive signal (e.g. 404, 410)

// Per-user, per-feature availability state. Distinguishes "feature locked
// by plan" from "feature explicitly disabled by the user" — different
// UX scenarios that need different copy.
type HealthEntitlementState =
  | "available"          // feature is usable; counts and results may be shown
  | "locked"             // requires a paid plan; show upgrade affordance
  | "disabled_by_user"   // user has set broken-link mode to `off`; show disabled state
  | "processing";        // scan or recompute is currently running; counts may be pending
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
| **Duplicates filter view** | The list of duplicates surfaced via the filter (per **Search & Filters PRD**). |
| **Broken links filter view** | The list of broken bookmarks surfaced via the filter. |
| **Bookmark detail with broken indicator** | Surfaces the ghost icon and (on hover or expanded view) an explanation. |
| **Bookmark editor with URL field** | The fix-URL workflow per UC-08. |
| **Settings → App → Broken links dropdown** | The detection-mode setting (Off / Basic / Default / Strict). |
| **Empty states (per §5.12)** | "Your library is clean," "Detection is currently off," "Paid plan required." |
| **Selection mode (mobile)** | iOS Select mode and Android tap-and-hold mode for bulk delete. |
| **Bulk delete confirmation** | Per **Bookmarks PRD §5 Trash**; this PRD relies on the standard bulk-delete flow. |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| **Duplicates filter chip** | Sidebar / mobile filter chip with the duplicate count. |
| **Broken links filter chip** | Sidebar / mobile filter chip with the broken count. |
| **Ghost icon** | The visual indicator on a bookmark card when `broken: true`. |
| **Detection-mode selector** | Dropdown in Settings → App for choosing Off / Basic / Default / Strict. |
| **Detection-mode comparison hint** | Optional UI showing what each mode flags (per the source page's table). |
| **Bulk-select checkboxes** | Per-row selection on web / desktop. |
| **Select all button** | One-click selection of every row in the duplicates list. |
| **Mobile selection toolbar** | iOS Actions menu and Android selection toolbar. |
| **Recommended recovery affordance** | When a broken bookmark has `cache.status: ready`, a prominent **Open web archive** action. |
| **False-positive guidance** | Inline copy directing users to Settings → App when they encounter false positives. |

---

## 15. Workflow Requirements

| Operation | Required Behavior | Shared / Core Handling |
|---|---|---|
| **Create** | Neither capability has a user-facing create action. Duplicate detection is computed on demand from the current bookmark library; broken-link state is computed by a periodic scan. | Owned here. |
| **Edit** | The `broken` field on a bookmark is system-set. The user MAY clear it indirectly by editing the URL or by changing the broken-link detection mode. The duplicate state is purely derived; there is no per-bookmark "is duplicate" flag to edit. | Owned here. |
| **Delete** | The user removes a duplicate by deleting the duplicate bookmark (per **Bookmarks PRD §5 Trash**). The user removes a broken-link flag by fixing the URL or deleting the bookmark; the flag clears automatically. | Bulk delete entry point owned by **Bookmarks PRD**. |
| **Search** | Surfacing bookmarks by their library-health state happens through filters owned by **Search & Filters PRD**. This PRD provides the underlying state and counts. | |

---

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|
| **Duplicate detection service** | URL normalization, group computation, original selection, recomputation on writes. |
| **Broken-link scanner service** | Per-user periodic scans, per-bookmark check, mode-aware classification. |
| **Detection-mode service** | Read / write the user's mode setting; trigger re-evaluation on change. |
| **Plan-tier gate** | Enforces free-tier exclusions for both capabilities. |
| **Filter count service** | Provides counts to **Search & Filters PRD**. |
| **Trash exclusion guard** | Centralized check that both capabilities skip Trash. |
| **Web archive coordinator** | Joins broken-link state with `cache.status` for the recovery affordance. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| **(none directly)** | The extension is not a primary surface for either capability. The extension's saved-page indicator (per **Bookmarks PRD**) is a related but distinct surface. |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| **Duplicates list component** | Renders the filter results with bulk-select and Delete. |
| **Broken-links list component** | Renders the filter results with the recommended recovery affordance. |
| **Ghost-icon badge component** | Renders the broken indicator on bookmark cards. |
| **Settings → App detection-mode selector** | Renders the mode dropdown and persists the user's choice. |
| **Empty-state components** | Renders the various empty / unavailable / off states. |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| **iOS filter sheet integration** | Surfaces Duplicates and Broken links in the iOS filter sheet. |
| **iOS selection mode handler** | Implements Select / Actions → Delete on the duplicates list. |
| **Android filter suggestions integration** | Surfaces Duplicates and Broken links in the Android search-field suggestions. |
| **Android tap-and-hold selection handler** | Implements selection and bulk delete on the duplicates list. |
| **Mobile broken-link indicator renderer** | Renders the ghost icon on mobile bookmark cards. |
| **Mobile detection-mode setting** | Mobile-native version of the detection-mode selector. |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| **Sync engine integration** | Propagates `broken` flag transitions across devices. |
| **Search index integration** | Maintains the filter counts. |
| **Per-user setting store** | Persists the user's detection mode. |
| **Observability module** | Metrics for scan throughput, false-positive complaint patterns, mode-change frequency. |

---

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| **Duplicate URL normalizer** | Applies the §5.1 normalization steps to a URL. |
| **Duplicate group computer** | Partitions the user's library into duplicate groups by normalized URL key. |
| **Original selector** | Picks the original of each group per the F03 rule. |
| **Duplicate recomputation triggers** | Recomputes affected groups on bookmark create / edit / Trash / restore / delete. |
| **Tracking-parameter list** | The configured set of query parameter names treated as tracking by the normalizer. |
| **Broken-link scan scheduler** | Schedules per-user periodic scans. |
| **Broken-link scanner worker** | Fetches each bookmark's source URL, applies the active detection mode, writes the `broken` field. |
| **Detection-mode resolver** | Determines the active mode for each scan. |
| **Detection-mode change handler** | Re-evaluates the user's library within the few-hour latency target after a mode change. |
| **URL-edit re-check trigger** | Re-evaluates a bookmark's broken state within a few hours of a URL edit. |
| **Trash exclusion guard** | Ensures both capabilities skip Trashed bookmarks. |
| **Plan-tier gate** | Refuses scanning, computation, and filter access for free-tier users. |
| **Filter count integrator** | Provides duplicate and broken-link counts to **Search & Filters PRD** for filter chip rendering. |
| **Broken-flag clear-on-Off worker** | Clears all `broken: true` flags when the user sets mode to `Off`. |
| **Web archive coordinator** | Surfaces the **Open web archive** action as the recommended recovery path on broken bookmarks with a ready archive. |
| **Sync engine integration** | Propagates `broken` flag transitions across the user's devices. |
| **Per-user mode persistence** | Stores the user's detection mode setting and exposes it for read / write. |
| **Observability module** | Logs scan throughput, false-positive complaint patterns, mode-change events, duplicate-list query rates, anti-bot detection at scan time. |

---

## 19. OSS / Build-vs-Buy Decision

1. **The duplicate-equivalence normalization is more aggressive than the bookmark-identity normalization, on purpose.** Two URLs that the system treats as different bookmarks (so the user can save them separately at save time) can still be detected as duplicates afterward. This is not a contradiction — saving creates records; duplicates is a cleanup view. Don't try to unify the two normalizations into one rule. They serve different purposes.

2. **The "duplicates list contains only the non-originals" rule is a sharp UX promise.** Source explicitly says: "you can safely remove everything in the list without losing any bookmark." Code that ever puts the original into the list breaks the entire trust model. Test this by making the original-selection deterministic and verifying the list excludes it.

3. **Original selection by earliest `created` is intentional, not arbitrary.** Users intuitively expect "the one I saved first" to be the keeper. Selecting by lowest `_id` alone, or by the most-edited bookmark, or by the bookmark in the most prominent collection, all surprise users in different ways. Stick with `created` and use `_id` only as a tiebreaker.

4. **Trash exclusion is non-negotiable.** A Trashed copy is conceptually deleted; it must not influence duplicate grouping or broken-link scanning. This avoids confusing scenarios like "I deleted one of my duplicates, why does the other one suddenly appear in the duplicates list?"

5. **The four detection modes are the entire user-facing tuning surface.** Resist requests for per-bookmark, per-domain, or per-collection overrides until source-aligned demand emerges. The four-mode approach is simple to explain and easy to tune; per-X overrides explode UX complexity.

6. **The broken flag is a hint, not a verdict.** UI copy must reinforce this. Users will encounter false positives — local-network URLs, sites behind firewalls, anti-bot defenses — and they need to understand the flag is advisory. Telling them up front avoids angry support tickets.

7. **Auto-clear within a few hours is a real product commitment.** When a user fixes a URL, they expect the flag to disappear "soon." Users who don't see the flag clear in a few hours will conclude the system is broken. Build the recheck path explicitly, and budget for the few-hour latency in the engineering plan.

8. **The Off mode must actually stop scanning.** If a user sets the mode to Off, no further scans should run on their library. This is a privacy / control commitment, not just a UI choice. Verify that the scanner respects the per-user mode at every iteration.

9. **The recommended recovery path for a broken bookmark with a ready web archive is a real cross-capability win.** When both broken-link detection and web archive run on a user's library, the web archive turns broken-link encounters from frustrating dead-ends into "oh nice, I have a copy." Surface the **Open web archive** action prominently on broken bookmarks with `cache.status: ready` — this is one of the strongest "Pro plan is worth it" demonstrations the product has.

10. **Duplicate detection should never display the originals on a "delete all" path.** The bulk-delete UX promise is "this list is safe." Anything that compromises that — accidentally including an original, surfacing duplicates from collections the user can't write to, including Trashed bookmarks — destroys the trust that makes the feature usable.

11. **Filter counts are part of the integration contract with Search & Filters PRD.** When a duplicate group changes membership (a save, a Trash, an edit), the filter count must update promptly. A stale count of "12 duplicates" when the list shows 5 looks broken. Wire the recomputation triggers to invalidate the count alongside the list.

12. **Both capabilities are quiet workhorses.** Users don't think about them until something feels off ("why did this bookmark suddenly get flagged?"). The implementation effort is mostly invisible: a periodic scanner, a normalization library, a filter integration, an auto-clear path. The user experience is good when these systems work without drawing attention to themselves.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| **Bookmarks PRD** | Both capabilities operate over the user's bookmark records. They consume `link`, `created`, `_id`, `removed`, and `collection` fields and write the `broken` field. |
| **Collections PRD** | Both capabilities scan across the user's accessible collections; collection access rules govern which bookmarks each user sees in the duplicates and broken-links views. |
| **User / Account** | Both capabilities are paid-plan-gated. Broken-link detection has a per-user **detection-mode** setting that lives on the user account. |
| **Search & Filters PRD** | The two capabilities are surfaced through filter operators (`broken:true` for broken links; the Duplicates filter for duplicates) owned by Search & Filters PRD. This PRD provides the underlying state. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| **Search & Filters PRD** | The Duplicates and Broken Links filters surface the state computed here. |
| **Bookmarks PRD** | Bookmark cards surface a "broken" indicator (ghost icon by the domain) when the `broken` flag is true. |
| **Web archive PRD** | When a bookmark is broken, the user is encouraged to fall back to the web archive copy. The two capabilities reinforce each other. |

### Related Capabilities

| Capability | Relationship |
|---|---|
| **Bookmarks PRD** | Owns the bookmark entity, including the `broken` field which this PRD writes, and the `link` field which this PRD reads. Owns the bookmark-identity URL normalization, which is intentionally less aggressive than this PRD's duplicate-equivalence normalization. |
| **Collections PRD** | Owns access-level rules; this PRD respects them when computing per-user duplicates and broken-link lists. |
| **Web archive PRD** | Owns the archived-copy capability. This PRD's broken-link UX explicitly recommends opening the web archive copy when available. |
| **Search & Filters PRD** | Owns the filter operators and the count surface. This PRD owns the underlying detection logic. |
| **Trash / Lifecycle (Bookmarks PRD §5)** | Bookmarks in Trash are excluded from both detection passes. |

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
| Tracking-parameter list | 🟠 Product Decision | The exact set of query parameters treated as tracking is an implementation choice. The recommended starting set is captured in §6.4. The list MUST be evolvable as new tracking schemes appear. |
| Save-time duplicate warning | 🟠 Product Decision | Whether to warn at save time (browser extension popup) that the URL is already saved. The extension's saved-page indicator partially covers this; an explicit "would create a duplicate" affordance is open. |
| Duplicate-merge action | 🔴 Not Defined | Whether to combine two duplicates (merging tags / notes / highlights / collection / reminder into the original) instead of plain delete. |
| Cross-collection duplicates in shared workspaces | 🟠 Product Decision | Whether bookmarks in another collaborator's collection count as duplicates of the requesting user's owned bookmarks. Recommendation: scope duplicates to the requesting user's owned bookmarks only. |
| Per-domain false-positive overrides | 🔴 Not Defined | Whether the user can mark specific domains as "always trust." `Basic` mode partially addresses this. |
| Manual broken-link scan trigger | 🔴 Not Defined | Whether the user can force an immediate re-scan rather than waiting for the next periodic run. |
| Last-scanned timestamp surfaced | 🟠 Product Decision | Whether `bookmark.brokenLastChecked` is exposed in UI for diagnostics. |
| `brokenConfidence` UI surfacing | 🟠 Product Decision | Whether the user-facing UI distinguishes high-confidence broken (definite 404 / 410) from low-confidence broken (timeout, anti-bot block) — for example, a different icon variant or copy. The field is defined in §8.1; whether to surface it is a UX call. |
| `brokenStatusCode` UI surfacing | 🟠 Product Decision | Whether the bookmark detail surface shows the actual HTTP status code (e.g. "404 Not Found"). Recommendation: yes for the bookmark detail view; not on the bookmark card. |
| "Broken for N weeks" UX | 🟠 Product Decision | Whether to compute and display the duration since `bookmark.brokenLastSuccessAt` so users see "broken since Mar 5, 2026" rather than just "broken." |
| Detection-mode change preview | 🟠 Product Decision | Whether to show "you'll have N broken links under Strict vs. M under Default" before committing. |
| Broken-link scan cadence concrete SLO | 🟠 Product Decision | Source says "a few hours." Concrete cadence (every 24h? every 72h? per-domain throttled?) is not pinned. |
| Strict-mode timeout threshold | 🟠 Product Decision | The wall-clock threshold above which Strict flags a slow response. |
| Strict-mode redirect ceiling | 🟠 Product Decision | The number of redirects above which Strict flags as broken. |
| Per-domain scanner throttling | 🟠 Product Decision | Whether the broken-link scanner rate-limits per source domain. Recommendation: yes (mirror **Web archive PRD §6.1** per-domain throttle). |
| Anti-bot tolerance in Strict mode | 🟠 Product Decision | Whether Strict mode should treat anti-bot blocks as broken or as "unreachable but not necessarily broken." Recommendation: do not flag anti-bot as broken in any mode. |
| User-actionable retry on a flagged bookmark | 🔴 Not Defined | Whether the bookmark detail surface offers a "re-check now" button. |
| Cross-user duplicate hint | 🔴 Not Defined | Whether the system surfaces a "this URL is also saved by N other people" hint on bookmarks in shared collections. |
| Duplicate detection across import flows | 🟠 Product Decision | Whether bulk imports trigger a one-time duplicate scan after import completes, or whether the standard recomputation triggers (§5.3) suffice. |
| Broken-link export inclusion | 🟠 Product Decision | Whether exports include the `broken` flag value. Recommendation: yes. Coordinate with **Import / Export / Backup PRD**. |
| Duplicate-equivalence normalization vs. bookmark-identity normalization | ✅ Decided | Two distinct normalizations: bookmark identity (less aggressive, preserves user intent at save time) and duplicate equivalence (more aggressive, for cleanup). See Schema Invariant 1. |
| Duplicates list contains only non-originals | ✅ Decided | Source-confirmed. |
| Original selection rule | ✅ Decided | Earliest `created`, tiebreak by lowest `_id`. |
| Cross-library scan for duplicates (not per-collection) | ✅ Decided | Source-confirmed. |
| Trash exclusion for both capabilities | ✅ Decided | Mirror of **Web archive PRD** Schema Invariant 9. |
| Detection-mode enum values | ✅ Decided | `off`, `basic`, `default`, `strict`. |
| Default detection mode | ✅ Decided | `default`. |
| Mode change re-evaluation cadence | ✅ Decided | A few hours. |
| Off mode clears all flags | ✅ Decided | Source-confirmed. |
| Auto-clear on URL edit | ✅ Decided | Source-confirmed. |
| Both capabilities are paid-plan-gated | ✅ Decided | Source-confirmed. |
| 401 / 403 not flagged broken | ✅ Decided | Page exists, scanner just can't access. |
| 404 / 410 flagged broken under all non-Off modes | ✅ Decided | Source-confirmed. |
| Scanner uses no user credentials | ✅ Decided | Mirror of **Web archive PRD** Schema Invariant 8. |
| Free-tier users: no flag, no count | ✅ Decided | No misleading partial state. |
| Web archive recovery affordance on broken bookmarks | ✅ Decided | Source explicitly recommends. |

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
