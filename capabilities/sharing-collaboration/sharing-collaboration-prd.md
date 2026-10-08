# 11 — Sharing / Collaboration PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Sharing / Collaboration (members, public pages, embeds) |
| **Capability ID** | sharing_collaboration |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-05-02 |
| **Revision summary** | Full specification with features, functionality, scenarios, and enablers |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST allow users to share their collections with three distinct audiences using three distinct mechanisms: **named collaborators** (invited via a reusable join link, working inside the application as logged-in members), **the public web** (read-only HTML pages at a per-user subdomain, with no account required), and **third-party site embedders** (iframe-rendered widgets configurable to hide individual UI elements). Each mechanism MUST respect the collection scope, MUST inherit nested collections, MUST keep all unshared content private, and MUST refuse to expose private payloads (web archive, file binaries beyond hosted URLs) to audiences below the collection's access tier.

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

### UC-01 — Invite a collaborator to a collection

| Item | Detail |
|---|---|
| Actor | Collection owner. |
| Goal | Add a colleague as a contributor. |
| Main Flow | 1. Owner opens the collection. 2. Owner clicks **Share** (top-right). 3. Owner switches to the **Collaboration** tab. 4. Owner clicks **Invite**. 5. System generates a reusable join link. 6. Owner copies and sends the link. |
| System Response | The link MUST be reusable across multiple invitees. The owner MAY share the link via any channel (email, chat, paste-on-page); the system MUST NOT tie the link to a specific recipient. |
| Alternate Flow | If the owner is on the **All bookmarks** or **Unsorted** view, the **Share** button MUST NOT be visible (F01). |

### UC-02 — Accept a collection invite

| Item | Detail |
|---|---|
| Actor | A person who received an invite link. |
| Goal | Join a shared collection. |
| Main Flow | 1. Person opens the link in a browser. 2. If not signed in, they are prompted to sign up or log in. 3. After authentication, the system adds them to the collection's member list with the default role (Member, configurable by owner). 4. The collection becomes visible in their library. |
| System Response | The collection MUST appear in the collaborator's library with appropriate access level. They MUST be able to view the bookmarks and (if Member) add / edit / delete them. |
| Alternate Flow | If the link has been deactivated by the owner (e.g. they regenerated it), the system MUST surface a clear "this invite is no longer active" message. |

### UC-03 — Change a collaborator's role

| Item | Detail |
|---|---|
| Actor | Collection owner. |
| Goal | Demote a Member to Read-only or vice versa. |
| Main Flow | 1. Owner opens the Collaboration tab. 2. Owner finds the collaborator. 3. Owner toggles their role. 4. The change applies immediately. |
| System Response | The collaborator's effective access level MUST change without requiring them to re-accept anything. Their next request MUST be evaluated against the new role. |
| Alternate Flow | None. |

### UC-04 — Remove a collaborator

| Item | Detail |
|---|---|
| Actor | Collection owner. |
| Goal | Revoke someone's access. |
| Main Flow | 1. Owner opens the Collaboration tab. 2. Owner removes the collaborator from the list. 3. Access is revoked immediately. |
| System Response | The collaborator's next request to anything in the collection MUST be refused. The collection MUST disappear from their library. Cached client state MUST be invalidated; the collaborator MUST NOT continue to interact via stale session state. |
| Alternate Flow | None. |

### UC-05 — Publish a collection as a public page

| Item | Detail |
|---|---|
| Actor | Collection owner with a verified email. |
| Goal | Share a read-only collection with people who don't have accounts. |
| Main Flow | 1. Owner opens the collection. 2. Owner clicks **Share**. 3. Owner toggles on **Public Page**. 4. System exposes the collection's URL: `<username>.<public-domain>/<collection-slug>`. 5. Owner copies the link. |
| System Response | The URL MUST become reachable to anonymous viewers within seconds. Tags MUST be visible. The web archive payload MUST NOT be visible. |
| Alternate Flow | If the owner has not verified their email, the toggle MAY be flipped on but the URL MUST refuse to render to anonymous viewers — instead the system MUST present a "verify your email to make your public page live" message to the owner (F16). |

### UC-06 — Unpublish a public page

| Item | Detail |
|---|---|
| Actor | Collection owner. |
| Goal | Remove a collection from the public web. |
| Main Flow | 1. Owner opens the collection. 2. Owner clicks **Share**. 3. Owner toggles off **Public Page**. 4. The URL stops working immediately. |
| System Response | Anonymous viewers hitting the URL MUST get a 404 / "no longer available" state. If this was the user's only public collection, the personal page MUST also become inaccessible. Embedded widgets on third-party sites MUST render an inaccessible state. |
| Alternate Flow | None. |

### UC-07 — View a public page as an anonymous viewer

| Item | Detail |
|---|---|
| Actor | An anonymous person who received a public-page URL. |
| Goal | Browse a shared collection without signing up. |
| Main Flow | 1. Viewer opens the URL. 2. The system serves a static read-only HTML page with the collection's bookmarks, titles, descriptions, tags, covers. 3. Viewer browses, paginates (default 30 per page), or applies search via URL parameters. |
| System Response | The viewer MUST see bookmarks and tags. The viewer MUST NOT see private payloads (no archive URLs, no edit affordances, no member list). |
| Alternate Flow | If the page has been unpublished or the owner's email is unverified, the system MUST return 404 / a clear unavailability state. |

### UC-08 — Customize a public-page view via URL parameters

| Item | Detail |
|---|---|
| Actor | Anonymous viewer. |
| Goal | Sort, filter, or themes the page to taste. |
| Main Flow | 1. Viewer constructs a URL with parameters: `<base>/view/theme=dark&sort=-title&page=2`. 2. The system renders the collection with those parameters applied. |
| System Response | Each parameter MUST be recognized; unknown parameters MUST be ignored without erroring. Invalid values for known parameters (e.g. `perpage=999`) MUST clamp to allowed bounds (1..50 for `perpage`). |
| Alternate Flow | None. |

### UC-09 — Embed a public collection in a third-party site

| Item | Detail |
|---|---|
| Actor | Collection owner publishing a blog. |
| Goal | Show a curated list inline on their website. |
| Main Flow | 1. Owner ensures Public Page is on. 2. Owner clicks **Share** → **Embed**. 3. Owner optionally configures the **Hide** field with a comma-separated keyword list. 4. Owner copies the embed snippet. 5. Owner pastes the snippet on their site. |
| System Response | The third-party page MUST render the embedded widget. Hidden elements per the **Hide** configuration MUST NOT appear. |
| Alternate Flow | If the owner later turns off Public Page, the embed on the third-party site MUST render an empty / inaccessible state. |

### UC-10 — Profile embed

| Item | Detail |
|---|---|
| Actor | Owner with at least one public collection. |
| Goal | Embed their personal page (a list of all public collections). |
| Main Flow | 1. Owner navigates to their public profile path on the application's authenticated app. 2. Owner clicks **Embed**. 3. Owner copies the snippet. 4. Owner pastes it into their site. |
| System Response | The embed MUST display the same listing as the personal page. |
| Alternate Flow | If the owner has zero public collections at any point, the profile embed MUST render an inaccessible state. |

### UC-11 — Read a bookmark in a shared collection (collaborator)

| Item | Detail |
|---|---|
| Actor | Read-only collaborator. |
| Goal | Open the reader on a teammate's saved article. |
| Main Flow | 1. Collaborator opens the shared collection. 2. Collaborator opens the reader (per **Reader / Articles PRD §5.12**). 3. The reader renders the parsed article body. |
| System Response | Read access (level ≥ 2) MUST grant reader access. The collaborator's own theme/font/size preferences MUST apply (not the owner's). |
| Alternate Flow | The collaborator MUST NOT be able to **Refresh preview** (which requires edit access ≥ 3). |

### UC-12 — Search inside a Pro-owner's shared collection (free-tier collaborator)

| Item | Detail |
|---|---|
| Actor | Free-tier collaborator on a Pro-owner's shared collection. |
| Goal | Use full-text search on the shared collection (which they couldn't do on their own free-tier library). |
| Main Flow | 1. Collaborator opens the shared collection. 2. Collaborator runs a search against the page-content full-text index (per **Search & Filters PRD §3 F11**). 3. Results return. |
| System Response | The Pro-owner's entitlement MUST extend to the collaborator for that collection's bookmarks only. The collaborator's own free-tier limitations MUST otherwise apply (e.g. on their own non-shared library). |
| Alternate Flow | If the owner downgrades from Pro, the entitlement extension MUST cease; subsequent full-text searches on the collection MUST fall back to standard (free-tier) search behavior. |

### UC-13 — Anonymous viewer requests a private bookmark by URL

| Item | Detail |
|---|---|
| Actor | Anonymous person who has guessed or been given an internal bookmark identifier. |
| Goal | (Negative case) Try to access a private bookmark. |
| Main Flow | 1. Anonymous viewer constructs a URL pointing at a bookmark detail. 2. The system refuses with an authentication error or 404. |
| System Response | The system MUST NOT leak the bookmark's existence, owner identity, or any contents. The error response MUST be uniform whether the bookmark exists in a private collection or doesn't exist at all. |
| Alternate Flow | If the bookmark is in a public collection, the system MAY render the bookmark detail per anonymous-viewer rules; otherwise refuse. |

### UC-14 — Re-using an invite link after several uses

| Item | Detail |
|---|---|
| Actor | Owner. |
| Goal | Verify the same invite link works for multiple invitees. |
| Main Flow | 1. Owner sends the link to person A; A joins. 2. Owner sends the same link to person B; B joins. 3. Owner sends the same link to person C; C joins. |
| System Response | All three MUST be added as collaborators (default Member role). The link MUST NOT be invalidated by any single use. |
| Alternate Flow | The owner MAY rotate the link (regenerate) at any time — old link stops working; new link is the only valid one. |

### UC-15 — Email-unverified owner attempts to publish

| Item | Detail |
|---|---|
| Actor | Owner without a verified email. |
| Goal | (Negative case) Try to publish a public page. |
| Main Flow | 1. Owner toggles Public Page on. 2. The configuration MAY be saved server-side. 3. Anonymous viewers hitting the URL receive a 404 / unavailable state. 4. The owner sees a clear "verify your email to make your public page live" affordance with a verification CTA. |
| System Response | The configuration MUST persist (so once verified, the page becomes live without re-toggling) OR the toggle MUST be visibly held back (UI choice owned by Account / Subscription PRD); either way, the public URL MUST NOT serve content to anonymous viewers until verification completes. |
| Alternate Flow | None. |

### UC-16 — Leave a shared collection (collaborator self-removal)

| Item | Detail |
|---|---|
| Actor | Member or Read-only collaborator. |
| Goal | Remove their own access to a shared collection without bothering the owner. |
| Main Flow | 1. Collaborator opens the shared collection. 2. Collaborator opens the collection's settings or context menu. 3. Collaborator selects **Leave**. 4. Collaborator confirms. 5. The system removes ONLY the requesting collaborator from the member list. |
| System Response | The collection MUST disappear from the leaving collaborator's library immediately. The owner and other collaborators MUST be unaffected. The owner SHOULD be informed that the collaborator left (per a 🟠 Product Decision; recommendation: notification yes). |
| Alternate Flow | If the OWNER attempts the same path, the system MUST NOT remove them — owner-initiated leaving is conceptually unsharing (UC-04 with all members) or deletion. Owners cannot "leave" their own collection. |

---

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Share button on a collection** | ✅ Built | Every collection MUST surface a **Share** button in the top-right corner of its detail view (web / desktop) and in the **···** menu (mobile). The button MUST NOT be available on **All bookmarks** or **Unsorted** — sharing is collection-scoped only. |
| F02 | **Two-role access model: Member and Read-only** | ✅ Decided | The user-facing role surface is a 2-role enum: **Member** (view + add / edit / delete) and **Read-only** (view only). The owner has full control implicitly — they are not a "role" the user assigns. |
| F03 | **Underlying access-level enum (4 values)** | ✅ Decided | The system MUST track access at four numeric levels (per **Collections PRD §6.7 Access Levels**): `1` public read-only (anonymous viewer of a public collection), `2` read-only collaborator, `3` member with write access, `4` owner. The user-facing surface exposes only Member and Read-only; owner is implicit; the public-read level is implicit on a public collection's anonymous-viewer surface. |
| F04 | **Reusable invite link** | ✅ Built | Sharing a collection MUST generate a reusable join link. The same link MUST work for multiple people; the system MUST NOT require regenerating the link for each invitee. |
| F05 | **Members need a registered account** | ✅ Decided | Joining a shared collection MUST require an account (free or paid). Anonymous users following an invite link MUST be prompted to sign up before access is granted. |
| F06 | **Free with no member limit** | ✅ Decided | Collaboration MUST be free for both free-tier and paid-tier owners. The system MUST NOT cap the number of members on a shared collection. |
| F07 | **Pro-owner search entitlement extension** | ✅ Decided | When the collection owner has a paid plan that includes page-content full-text search (per **Search & Filters PRD §6.9**), every collaborator on that collection MUST get full-text search access on that collection — regardless of the collaborator's own plan tier. The entitlement extension is per-collection, not account-wide. |
| F08 | **Owner full control** | ✅ Decided | The collection owner MUST always retain full control: invite, change roles, remove members, unpublish public page, delete the collection. The owner's authority MUST NOT be transferable through sharing — only through ownership transfer (a future capability). |
| F09 | **Members cannot reshare** | ✅ Decided | Only the owner MAY invite new members. Members and Read-only collaborators MUST NOT have any path to invite further people, regenerate the join link, or expose the collection to the public. |
| F10 | **Member-visibility scoping** | ✅ Decided | A collaborator MUST see only the collections they have been invited to. The owner's other private content MUST NOT be visible to any collaborator under any circumstance. |
| F11 | **Nested collections inherit sharing** | ✅ Decided | When a collection is shared, every nested collection underneath it MUST inherit the same sharing configuration (member list, roles, public-page state). The system MUST NOT expose per-nested-collection sharing overrides. |
| F12 | **Immediate revocation on member removal** | ✅ Built | When the owner removes a collaborator, the collaborator's access MUST be revoked immediately. The collaborator's ongoing requests MUST start failing, the collection MUST disappear from their list view, and any cached client state MUST be invalidated. |
| F13 | **Public Page toggle** | ✅ Built | Every collection MUST expose a **Public Page** toggle in its Share dialog. Toggling on MUST publish the collection at a stable per-collection URL. Toggling off MUST deactivate the URL immediately. |
| F14 | **Public-collection URL pattern** | ✅ Decided | Public collections MUST be addressable at `<username>.<public-domain>/<collection-slug>`. The username and slug are owned by **User / Account** and **Collections PRD** respectively. The public-domain is a system-level configuration value distinct from the application's authenticated app domain. |
| F15 | **Personal public page** | ✅ Built | Once a user has at least one public collection, the system MUST auto-publish a personal page at `<username>.<public-domain>` listing all of the user's public collections. The personal page MUST become inaccessible automatically when the user has zero public collections. |
| F16 | **Email verification gates public pages** | ✅ Decided | A user MUST have a verified email before any of their public pages are accessible. Toggling **Public Page** on without verification MUST be allowed at the configuration level but MUST NOT make the page reachable to anonymous viewers; the system MUST tell the owner why their page is not yet live. |
| F17 | **Public pages are SEO-indexable** | ✅ Decided | Public pages MUST be reachable to search-engine crawlers without authentication and MAY appear in search results. The owner MUST be informed (in product copy) that public means publicly indexable. |
| F18 | **No password protection** | ✅ Decided | Public pages MUST NOT support password protection or any other form of restricted-access. Restricted access is the role of named collaboration (F04). The product MUST NOT add a "share with password" affordance. |
| F19 | **Tags visible on public pages** | ✅ Decided | Tags assigned to bookmarks in a public collection MUST be visible to anonymous viewers. There MUST NOT be a per-tag "public visibility" override. |
| F20 | **Web archive payload not visible on public pages** | ⚪ Capability Split | Public pages MUST NOT expose web archive URLs or surface the **Open web archive** action to anonymous viewers. Per **Web archive PRD Schema Invariant 14**. |
| F21 | **Public-page URL parameters** | ✅ Built | Public pages MUST accept URL parameters via a `/view/` path segment and `&`-joined `key=value` query expressions for customization: `sort`, `search`, `theme`, `page`, `perpage`. The full parameter set is defined in §5.5. |
| F22 | **Default `theme: light` on public pages** | ✅ Decided | Public pages MUST default to the light theme. The viewer MAY override via the `theme` URL parameter. |
| F23 | **Default `perpage: 30` on public pages** | ✅ Decided | Public pages MUST default to 30 bookmarks per page. The viewer MAY override via `perpage` (1..50). |
| F24 | **Default `sort: -sort` on public pages** | ✅ Decided | Public pages MUST default to the owner's manual sort order (descending). The viewer MAY override. |
| F25 | **Embed activation requires Public Page on** | ✅ Decided | The Embed action MUST be available only when the collection's Public Page is on. Turning off Public Page MUST cause embedded widgets on third-party sites to render an inaccessible state. |
| F26 | **Embed hide-element configuration** | ✅ Built | The Embed dialog MUST expose a **Hide** field that accepts a comma-separated keyword list. Supported keywords (per §5.7): `header`, `excerpt`, `note`, `tags`, `info`, `add`. |
| F27 | **Profile embed** | ✅ Built | A user with at least one public collection MUST be able to embed their profile from a profile-level Embed action, exposing the same listing as the personal page. |
| F28 | **Embed scope: web / desktop only** | ✅ Decided | The Embed configuration UI MUST be reachable from web / desktop only. Mobile platforms MUST NOT expose an Embed action — embedding is a web-publishing workflow. |
| F29 | **Cannot hide a public collection from personal page** | ✅ Decided | The personal page MUST list every public collection. There MUST NOT be a per-collection "exclude from personal page" toggle — once published, a collection appears on the personal page. (Future feature: 🔴 Not Defined.) |
| F30 | **Public page indexability override** | 🔴 Not Defined | Whether owners can opt out of search-engine indexing for individual public collections is not defined. |
| F31 | **Per-collaborator audit log** | 🔴 Not Defined | Whether the owner can see which collaborator made which change is not defined. |
| F32 | **Ownership transfer** | 🔴 Not Defined | Transferring ownership of a collection to another user is not defined; ownership is currently immutable. |
| F33 | **Group / team membership** | 🔴 Not Defined | Inviting a group as a single unit (rather than individual users) is not defined. |
| F34 | **Public-page custom domain** | 🔴 Not Defined | Whether owners can use a custom domain (e.g. `bookmarks.example.com`) instead of `<username>.<public-domain>` is not defined. |
| F35 | **Browser-extension share affordance** | 🔴 Not Defined | Whether the browser extension surfaces a one-click "share this bookmark's collection" affordance is not defined. |
| F36 | **Per-collection visibility override on personal page** | 🟠 Product Decision | An obvious user request (publish a collection but hide it from the personal page listing). Recommendation: defer until source surfaces it; if added, must coordinate with the personal-page generator. |
| F37 | **Sharing across PRD boundaries: highlights, reader, search** | ⚪ Capability Split | Highlight visibility on shared collections is owned by **Highlights PRD §5.13**. Reader access is owned by **Reader / Articles PRD §5.12**. Filter scoping for collaborators is owned by **Search & Filters PRD §5.9**. This PRD owns the access-level model; consuming PRDs read it. |
| F38 | **Leave shared collection (collaborator self-removal)** | ✅ Decided | A Member or Read-only collaborator MUST be able to leave a shared collection on their own initiative without owner involvement. Leaving removes only that collaborator's access; the owner and other collaborators MUST be unaffected. Distinct from owner-initiated removal (F12). |
| F39 | **Live embed updates** | ✅ Built | Embed widgets MUST reflect live changes to the underlying public collection. When the owner adds, edits, or removes a bookmark, the change MUST propagate to embedded widgets within minutes (subject to CDN caching per §6.7). The embed MUST NOT serve indefinitely-cached snapshots of stale collection state. |
| F40 | **No embed CSS customization** | ✅ Decided | The embed renderer MUST NOT accept arbitrary CSS, JavaScript, or HTML overrides. Customization is limited to the **Hide** keyword list (F26). The system MUST refuse to inject user-provided styling or scripting into the embed. |

---

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Role and access-level model

| Surface | Internal level | Permissions |
|---|---|---|
| **Owner** (implicit) | 4 | Full control: invite, change roles, remove members, toggle public page, edit collection metadata, transfer ownership (future), delete collection. |
| **Member** | 3 | View, add, edit, delete bookmarks; add highlights; can NOT change member roles, can NOT toggle public page, can NOT remove other members, can NOT delete the collection. |
| **Read-only** | 2 | View bookmarks, view highlights, open reader (per **Reader / Articles PRD §5.12**), open web archive (per **Web archive PRD §5.6**). Can NOT add / edit / delete bookmarks; can NOT add highlights; can NOT refresh preview. |
| **Public read** (anonymous viewer of a public collection) | 1 | Only on public collections. View bookmarks, view tags, open reader on bookmarks (per **Reader / Articles PRD §5.12**). Cannot see member list, cannot see archive URLs, cannot edit anything. Anonymous; no authenticated user identity. |

| Rule | Behavior |
|---|---|
| Surface-vs-internal mapping | The user-facing role surface is 2-value (Member / Read-only). The internal `access.level` is 1..4 per **Collections PRD §6.7 Access Levels**: `1` = public read-only (anonymous viewer of a public collection); `2` = read-only collaborator; `3` = member with write access; `4` = owner. Owner is implicit (always level 4 on their own collections) and MUST NOT be assigned through the current sharing UI. The mapping is defined by Collections PRD; this PRD MUST NOT redefine it. |
| Default role for new collaborators | Owner-configurable. Recommendation: Member. |
| Owner authority is non-transferable through sharing | A Member or Read-only collaborator MUST NEVER inherit owner-level rights, even if the owner intends to "promote" them. Promotion to owner requires the future ownership-transfer capability (F32 🔴). |
| Cross-capability access reads | Other PRDs (Highlights, Reader, Web archive, Search & Filters) MUST read `access.level` directly, not the user-facing role surface. Read access requires `level >= 2`; write access requires `level >= 3`; owner-only operations require `level = 4`. |

### 5.2 Invite link mechanics

| Rule | Behavior |
|---|---|
| Generation | Created on first share or on owner-initiated regenerate. The link encodes the collection identifier and a non-guessable token. |
| Reusability | The same link MUST work for multiple invitees. The system MUST NOT consume or invalidate it on individual uses. |
| Rotation | The owner MAY regenerate the link at any time. Regeneration MUST invalidate the previous link immediately. |
| Account requirement | Following the link in a logged-out browser MUST prompt sign-up or login before granting access. |
| Default role on accept | Owner-configurable; recommended default Member. |
| Existing-collaborator follow | A current collaborator following the link a second time MUST be a no-op — they remain in their current role. |
| Owner self-follow | The owner following their own invite link MUST be a no-op. |
| Revocation interaction | If the owner regenerates the link AFTER an invitee was added, the existing collaborator's access MUST persist — only the OLD link stops working. |

### 5.3 Collaborator visibility scoping

| Rule | Behavior |
|---|---|
| Collection list scope | Each collaborator's collection sidebar MUST show the owner's shared collection in the same place an owned collection would appear (typically a dedicated "shared" section per **Collections PRD §5**). Other collections owned by the same person MUST NOT be visible. |
| Bookmark cross-collection contamination | A search inside a shared collection MUST NOT surface bookmarks from the owner's other (private) collections, even when the search query would have matched. |
| Member list visibility | The member list of a shared collection is visible to the owner. Whether other collaborators can see the member list is a 🟠 Product Decision (recommendation: Member-tier and above can see; Read-only sees only the count). |
| Hidden ownership cues | Per-bookmark display in shared collections MUST clearly indicate the bookmark's saver (the user who originally created it), so collaborators can tell who added what. |

### 5.4 Public page mechanics

| Rule | Behavior |
|---|---|
| Toggle | Per-collection boolean. Stored on the collection. |
| URL pattern | `<username>.<public-domain>/<collection-slug>`. The username is the user account's `username`; the slug is derived from the collection's title per a slugification rule owned by **Collections PRD**. |
| Personal page | Auto-created at `<username>.<public-domain>` once any collection is public; auto-removed when zero remain. |
| Email verification | A user's public pages MUST refuse to serve content to anonymous viewers until the user's email is verified. The toggle MAY be flipped server-side regardless; the rendered output is gated on verification. |
| Activation latency | Toggling on MUST make the URL reachable within seconds of the configuration write. |
| Deactivation latency | Toggling off MUST make the URL refuse content within seconds. |
| Slug change handling | If the collection's title changes such that its slug changes, the previous slug-based URL MUST stop working (or redirect, per a 🟠 Product Decision; recommendation: redirect for the lifetime of the collection). |
| SEO indexability | Public pages MUST NOT include `noindex` directives by default. Content is publicly indexable. |
| Caching | The public-page renderer MAY cache aggressively (CDN-level) since the underlying state is read-only and changes infrequently. Owner-side updates MUST invalidate caches within minutes. |

### 5.5 Public page URL parameters

URL parameters are appended via a `/view/` path segment followed by an `&`-joined `key=value` query expression:

`<base>/<collection-slug>/view/theme=dark&sort=-title&page=2&perpage=20&search=apple`

| Parameter | Allowed values | Default | Behavior |
|---|---|---|---|
| `sort` | `-created`, `created`, `-title`, `title`, `-sort` | `-sort` | Bookmark order. `-sort` is the owner's manual sort order, descending. |
| `search` | Free-text or `#tag` | (empty) | Filter the collection's bookmarks by the query. Tag searches use the `#tag` form. |
| `theme` | `light`, `dark`, `auto` | `light` | Color theme. `auto` follows the OS theme. |
| `page` | non-negative integer | `0` | Pagination cursor. |
| `perpage` | 1..50 | `30` | Bookmarks per page. Values outside the range MUST clamp to bounds. |

| Rule | Behavior |
|---|---|
| Unknown parameters | MUST be ignored without error; the renderer MUST NOT 404 because of an unknown key. |
| Invalid values | MUST clamp to the closest valid value (e.g. `perpage=999` → 50). |
| Anonymous viewer | All parameters are available to anonymous viewers; no authentication required. |
| Owner viewing their own public page | Owner sees the same view as anonymous viewers; their account preferences (theme / font / sort) do NOT influence the rendered public output. |

### 5.6 Embed mechanics

| Rule | Behavior |
|---|---|
| Activation prerequisite | Public Page MUST be on for the collection. The Embed action MUST NOT be reachable when the page is private. |
| Surface | Web / desktop only (F28). |
| Output | An iframe-compatible HTML snippet the owner pastes into their third-party site. |
| Hide configuration | Comma-separated keyword list applied to the embed renderer; keywords listed in §5.7. |
| Profile embed | A separate snippet, available from the public profile path on the application's authenticated app. Renders the same listing as the personal page. |
| Public-page deactivation effect | When the parent public page is turned off, the embed MUST render an empty / inaccessible state on the third-party site. The embed MUST NOT continue to serve cached content from a now-private collection. |
| Authentication | The embed renderer MUST NOT carry authentication cookies; it serves the same anonymous-viewer subset of state that the public page does. |

### 5.7 Embed hide-element keywords

| Keyword | Hides |
|---|---|
| `header` | The top header strip (collection title + meta). |
| `excerpt` | Bookmark description / excerpt text. |
| `note` | Bookmark personal note text (alias for `excerpt` in some product versions; both keywords MUST be supported). |
| `tags` | The tag chip row on each bookmark card. |
| `info` | Domain + saved-date metadata. |
| `add` | The "Add to <App>" call-to-action button. |

| Rule | Behavior |
|---|---|
| Combinable | The keyword list MAY contain any subset of the supported keywords, comma-separated. |
| Unknown keywords | MUST be ignored without error. |
| Whitespace tolerance | The renderer MUST tolerate spaces around commas (`tags, info` and `tags,info` are equivalent). |
| Case-insensitive | Keywords MUST be matched case-insensitively. |

### 5.8 Privacy invariants on public surfaces

| Privacy concern | Rule |
|---|---|
| Web archive payload | NEVER exposed on public pages or embeds (F20 / **Web archive PRD Schema Invariant 14**). |
| Member list | NEVER exposed on public pages or embeds. The collaborator list of a public-collection-that-also-has-members is private. |
| Owner's other collections | NEVER reachable from a public page. The personal page lists ONLY the owner's currently-public collections. |
| Bookmark notes | Owner's personal notes on bookmarks (the `note` field) ARE visible on public pages (since the public page renders the bookmark detail per **Bookmarks PRD §8**). Owners MUST understand this; product copy SHOULD make it explicit. |
| Highlights on bookmarks | Highlights ARE visible on public pages (per **Highlights PRD §5.13** anonymous-viewer rules). |
| Bookmark file payloads | The hosted file URL on a file-backed bookmark renders on the public page (per **Bookmarks PRD §8** — `link` field). Whether the URL itself enforces authentication is owned by **Files PRD §12** (currently 🟠 Product Decision with a recommendation toward signed URLs with short expiry). Public page sharing MUST NOT bypass whatever access model Files PRD lands on — the file payload's protection is governed by the Files PRD path, not by the public-collection state. |
| Reader access | Anonymous viewers MAY open the reader on bookmarks in public collections (per **Reader / Articles PRD §5.12**). |
| Search operators | The `search` URL parameter exposes the same search behavior the owner sees, scoped to the public collection only. The full-text page-content search (paid) is NOT extended to anonymous viewers — only to invited collaborators per F07. |
| Owner identity | The username and avatar are visible on the personal page. The owner's email, real name, account metadata MUST NOT be exposed. |

### 5.9 Pro-plan entitlement extension

| Rule | Behavior |
|---|---|
| Trigger | Collection owner has a paid plan that includes page-content full-text search (per **Search & Filters PRD §6.9**). |
| Beneficiaries | Every collaborator on the collection (Member and Read-only). |
| Scope | Per-collection. The collaborator's own non-shared library remains under their own plan limits. |
| Other Pro features | The entitlement extension covers full-text search per source explicit statement. Other Pro-only features (web archive on the owner's collection, etc.) follow each capability's own rules — typically governed by the bookmark's owner, not the collaborator's plan. |
| Owner downgrade | When the owner downgrades, the entitlement extension MUST cease. Collaborators' searches in the now-not-Pro collection MUST fall back to standard search behavior. |
| Member upgrade / downgrade | Independent of the entitlement extension on shared collections. The collaborator's own plan changes do NOT affect what they can do on someone else's shared collection. |

### 5.10 Sharing lifecycle interactions with other capabilities

| Interaction | Rule |
|---|---|
| Bookmark created in a shared collection | Created by the acting user; appears in the shared list immediately for all collaborators (per **Bookmarks PRD** + sync). |
| Bookmark moved between shared collections | Standard move flow per **Bookmarks PRD § move**. Access automatically follows the destination collection's sharing state. |
| Bookmark moved out of a shared collection (into a private one) | Bookmark becomes invisible to collaborators immediately. They must NOT see ghost references. |
| Highlight added by a collaborator | Standard highlight create flow per **Highlights PRD**; visible to all collaborators (and to anonymous viewers if the parent collection is also public). |
| Web archive on a bookmark in a shared collection | Captured per the bookmark owner's plan. Collaborators can open the archive (read access ≥ 2 per **Web archive PRD §5.6**). |
| Bookmark deleted | Standard Trash flow per **Bookmarks PRD §5**. Collaborators see the deletion immediately. |
| Collection unshared (all members removed) | Collection reverts to private. Bookmarks remain — the bookmark entity does not move. |
| Collection unpublished (Public Page off) | Collection reverts to private from the public web's perspective; remains shared with named collaborators if any are configured. |

### 5.11 Cross-capability data flow

| Source | This capability uses it for |
|---|---|
| Collection `_id`, `access[]`, `public` flag | Sharing state lives on the collection. |
| User `username`, email-verification status | Public page URL construction; gating. |
| User `_id`, `name`, `avatar` | Member list rendering; personal page rendering. |
| Bookmark identity, fields, `removed` | Public page bookmark rendering. |
| Tag identity | Public page tag chip rendering. |
| Web archive `cache.status` | NOT used on public pages — public pages do NOT surface archive URLs. |
| Highlight identity | Public page highlight rendering (if configured). |
| Plan tier of collection owner | Pro-plan entitlement extension to collaborators. |

### 5.12 Platform-Specific Interaction Patterns

| Platform | Share / Collaborate | Public Page toggle | Embed |
|---|---|---|---|
| **Web / Desktop** | Collection top-right **Share** button → **Collaboration** tab; **Invite** action; member-list management. | Same dialog → **Public Page** toggle; URL copy. | Same dialog → **Embed** action with **Hide** field. |
| **iOS** | Collection **···** menu → **Share**; collaboration tab; invite link copy. | Same path → **Public Page** toggle. | NOT exposed (F28). |
| **Android** | Collection **···** menu → **Share**; collaboration tab; invite link copy. | Same path → **Public Page** toggle. | NOT exposed (F28). |
| **Cross-platform invariant** | The role model, access semantics, and privacy invariants MUST be identical across platforms; only the gesture surface differs. | | |

### 5.13 Email-verification gate (cross-PRD)

| Rule | Behavior |
|---|---|
| Verification source of truth | The user's email-verification state lives on the user account (owned by **Account / Subscription PRD**). |
| Effect on public pages | Public pages MUST refuse to render to anonymous viewers when the owner's email is unverified, regardless of the public-page toggle state. |
| Effect on collaboration | Email verification is NOT required for collaboration. Invited members MAY join even if the owner is not verified. |
| Effect on embed | Embed snippets MUST render an inaccessible state when the owner's email is unverified. |
| User communication | The toggle UI MUST surface a clear "verify your email to make this live" affordance when the user is unverified. The verification CTA MUST be one click away. |

---

### System Constants

### 6.1 Internal Service Capabilities

| System Capability | Requirement |
|---|---|
| Generate invite link | The system MUST mint an unguessable, reusable join link for a collection on demand. |
| Validate invite link | The system MUST resolve a join link to its target collection and add the requesting authenticated user as a collaborator at the configured default role. |
| Set / change collaborator role | The system MUST allow the owner to flip a collaborator between Member and Read-only. |
| Remove collaborator | The system MUST revoke access immediately upon owner-initiated removal. |
| Toggle public page | The system MUST persist the public-page boolean per collection. |
| Generate public-page URL | The system MUST resolve `<username>.<public-domain>/<slug>` to the configured collection. |
| Render public page | The system MUST serve the static read-only page to anonymous viewers, applying URL parameters for sort / search / theme / pagination. |
| Render embed | The system MUST serve the iframe-compatible widget for public collections, applying the configured Hide list. |
| Refuse on email-unverified | The system MUST gate public-page and embed rendering on owner email verification. |
| Extend Pro entitlement to collaborators | The system MUST extend page-content full-text search to collaborators on Pro-owner collections. |
| Invalidate cached client state on revoke | The system MUST invalidate collaborator client caches when their access is revoked. |
| Generate / regenerate invite token | The system MUST allow the owner to rotate the invite token; old tokens MUST stop working immediately. |

### 6.2 System Response Conventions

| Response | Behavior |
|---|---|
| Invite link request | Returns the link string; idempotent on a collection with an existing link. |
| Public-page render | Returns sanitized HTML with `Cache-Control` permitting CDN caching. |
| Embed render | Returns iframe-compatible HTML, no authentication cookies. |
| Access-denied response | Uniform 404 / 403 — the system MUST NOT differentiate "doesn't exist" from "you don't have access" in error responses, to avoid leaking existence. |
| Member-list response | Owner sees full list; Member-tier and above see same per a 🟠 Product Decision; Read-only sees count only per the recommendation. |
| Public-page-404 vs. unverified | Distinct messaging to the owner (in their authenticated app) vs. anonymous viewer (uniform 404). The owner is told why; the public viewer is not. |

### 6.3 Error and Condition Handling

| Condition | Behavior |
|---|---|
| Anonymous user follows invite link | Prompted to sign up / log in; access granted on authentication. |
| Invite link rotated and old user follows old link | Refused with "this invite link is no longer active"; no automatic re-add. |
| Member tries to invite another user | Refused with "only the owner can invite members." |
| Member tries to toggle public page | Refused with "only the owner can manage sharing." |
| Owner email unverified, public page toggled on | Configuration persists; renders 404 to anonymous viewers; owner sees verification CTA. |
| Public page rendered with `perpage=999` | Clamped to 50 (max). |
| Public page rendered with `theme=midnight` | Falls back to `light` (default). |
| Public-page request hits unknown URL parameter | Ignored without error. |
| Anonymous viewer tries to access bookmark in private collection | 404 — uniform with non-existent bookmark. |
| Owner downgrades from Pro mid-search | Future searches by collaborators on the (now non-Pro) collection fall back to standard search; in-flight queries MAY complete under the prior entitlement. |
| Collaborator on a Pro-owner collection downgrades | No effect on shared collection access. |
| Collection owner is deleted (account deletion) | Sharing state is reclaimed per **Account PRD** lifecycle; collaborators lose access; public page deactivates. |
| Collection deleted | All sharing state (member list, public-page toggle, embed snippets) is removed atomically per **Collections PRD §5 cascade delete**. |

### 6.4 Reserved Constants

| Item | Rule |
|---|---|
| `ACCESS_LEVEL_PUBLIC_READ` | 1. Anonymous viewer of a public collection; no authenticated user identity. |
| `ACCESS_LEVEL_READONLY` | 2. |
| `ACCESS_LEVEL_MEMBER` | 3. |
| `ACCESS_LEVEL_OWNER` | 4. |
| `DEFAULT_NEW_COLLABORATOR_ROLE` | Member (level 3). |
| `PUBLIC_PAGE_DEFAULT_SORT` | `-sort`. |
| `PUBLIC_PAGE_DEFAULT_THEME` | `light`. |
| `PUBLIC_PAGE_DEFAULT_PERPAGE` | 30. |
| `PUBLIC_PAGE_PERPAGE_MAX` | 50. |
| `PUBLIC_PAGE_PERPAGE_MIN` | 1. |
| `PUBLIC_DOMAIN` | A system-level configuration value distinct from the application's authenticated app domain. |
| `EMBED_HIDE_KEYWORDS` | `header`, `excerpt`, `note`, `tags`, `info`, `add`. |

### 6.5 Internal Action Types

| Action | Purpose |
|---|---|
| `share.generateInviteLink` | Mint or rotate the collection's invite token. |
| `share.acceptInvite` | Add the authenticated user as a collaborator on the link's target collection. |
| `share.changeRole` | Flip a collaborator between Member and Read-only. |
| `share.removeCollaborator` | Revoke access; invalidate caches. |
| `share.leaveCollection` | Collaborator self-removal; revoke own access (UC-16). |
| `share.publish` | Toggle Public Page on. |
| `share.unpublish` | Toggle Public Page off. |
| `share.renderPublicPage` | Serve the public-page HTML for an anonymous request. |
| `share.renderEmbed` | Serve the embed HTML for a third-party site. |
| `share.profileRender` | Serve the personal page or its embed. |
| `share.gateOnEmailVerification` | Apply the email-verification check before rendering public output. |
| `share.invalidateCache` | Invalidate CDN / client caches on configuration changes. |
| `share.extendProEntitlement` | Compute the entitlement extension for collaborators on Pro-owner collections. |

### 6.6 Plan-Tier Gating

| Capability | Free | Paid (collection owner) |
|---|---|---|
| Invite collaborators | ✅ (no member limit, both tiers) | ✅ |
| Member roles (Member / Read-only) | ✅ | ✅ |
| Public Page toggle | ✅ | ✅ |
| Embed configuration | ✅ | ✅ |
| Personal public page | ✅ | ✅ |
| Pro-plan entitlement extension to collaborators | n/a | ✅ — collaborators get full-text search regardless of their own plan |
| Web archive on owned collections | ❌ | ✅ — but archive payloads remain private (never on public pages) |

### 6.7 Caching and Invalidation

| Surface | Cache rule |
|---|---|
| Public page HTML | MAY be CDN-cached aggressively. Invalidation MUST happen within minutes of an owner-side update. |
| Personal page HTML | Same rule. |
| Embed HTML | Same rule; additionally invalidated when the parent public page is turned off. |
| Authenticated client list of accessible collections | MUST be invalidated when the user is added to or removed from a shared collection. |
| Collaborator client cache after role change | MUST be invalidated within seconds; the next request MUST be evaluated against the new role. |

### 6.8 Privacy and Security Rules

| Rule | Behavior |
|---|---|
| Uniform error responses | The system MUST NOT differentiate "private collection" from "non-existent collection" in error responses. |
| No password protection on public pages | Forbidden. Restricted access uses Collaboration. |
| No archive payload on public pages | Forbidden (mirrors Web archive PRD Schema Invariant 14). |
| No member list on public pages | Forbidden. The collaboration roster is owner-private. |
| No user metadata leakage on profile pages | Username and avatar only. Email, real name, plan tier, and account metadata MUST NOT be exposed. |
| No transitive sharing | A Member MUST NOT have any path to invite another user, raise a Read-only to Member, or expose the collection publicly. |
| Anonymous viewer credential isolation | Anonymous requests to public pages MUST NOT carry the requester's authenticated session, even if they happen to be logged in to another tab. |
| Slug-only URL surface | Public-page URLs MUST NOT expose internal numeric collection IDs to anonymous viewers. |
| Email verification gate enforced server-side | Client-side display alone is insufficient. |

---

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| Owner clicks Share on a collection | Share dialog opens with Collaboration and Public Page tabs. |
| Owner clicks Share on **All bookmarks** | Share button is hidden; F01 enforces this. |
| Owner clicks Share on **Unsorted** | Share button is hidden; F01 enforces this. |
| Owner generates an invite link and sends to 3 colleagues | All 3 join via the same link; F04 / UC-14. |
| Owner regenerates the invite link | Old link returns "no longer active"; existing collaborators retain access. |
| Owner removes a collaborator | Collaborator's access revoked immediately; their client cache invalidated; collection disappears from their list. |
| Member tries to invite another user | Refused with "only the owner can invite." |
| Read-only collaborator tries to add a bookmark | Refused per Bookmarks PRD permission check. |
| Read-only collaborator opens the reader | Reader works (read access ≥ 2 per Reader/Articles PRD §5.12). |
| Read-only collaborator clicks Refresh preview | Refused (requires edit access ≥ 3). |
| Free-tier collaborator on a Pro-owner collection runs full-text search | Search succeeds; entitlement extends per F07. |
| Free-tier collaborator runs full-text search on their own non-shared library | Refused per Search & Filters PRD plan gating. |
| Collection owner downgrades from Pro | Collaborators' full-text search on the now-non-Pro collection falls back to standard search. |
| Owner toggles Public Page on | URL becomes reachable within seconds; tags visible; archive URLs not exposed. |
| Owner toggles Public Page off | URL stops working immediately; embedded widgets render inaccessible; personal page becomes inaccessible if no other public collections. |
| Owner without verified email toggles Public Page on | Configuration persists server-side; URL returns 404 to anonymous viewers; owner sees "verify your email to make this live" CTA. |
| Anonymous viewer hits a public page URL | Static read-only page renders with bookmarks, titles, descriptions, tags, covers; no archive URLs; no edit affordances. |
| Anonymous viewer hits a public page with `theme=dark` | Dark theme renders. |
| Anonymous viewer hits a public page with `perpage=999` | Clamped to 50. |
| Anonymous viewer hits a public page with `theme=midnight` | Falls back to `light` default. |
| Anonymous viewer hits a public page with `unknownparam=foo` | Ignored without error. |
| Anonymous viewer tries to load `/bookmark/<id>` for a bookmark in a private collection | 404 — uniform with non-existent bookmark. |
| Owner navigates to their personal page | Lists all their public collections. |
| Owner has zero public collections; anonymous viewer tries personal page URL | 404. |
| Owner toggles their only public collection off | Personal page becomes inaccessible automatically. |
| Owner clicks Embed on a public collection | Snippet generated; copy-paste integrates on third-party site. |
| Owner clicks Embed on a private collection | Action unavailable — F25 gates on Public Page state. |
| Owner configures Hide field with `tags, info` | Embed renders without tag chips and without domain/date metadata. |
| Owner configures Hide field with `TAGS,Info` | Same as above (case-insensitive); whitespace-tolerant. |
| Owner configures Hide field with `unknownkeyword` | Ignored without error. |
| Owner turns off Public Page after embed is in production | Third-party embed renders inaccessible state; previous content not served from cache. |
| Public page is indexed by search engines | Yes, by default; product copy informs the owner. |
| Owner deletes their account | Sharing state reclaimed; collaborators lose access; public pages deactivate. |
| Owner deletes a shared collection | Cascade delete per Collections PRD §5; member list, public-page toggle, embed snippets all removed atomically. |
| Bookmark in a shared collection moves to a private collection | Becomes invisible to collaborators immediately. |
| Bookmark moves between two shared-with-different-collaborators collections | Visibility shifts to the new collection's collaborators. |
| Member adds a highlight on a bookmark in a shared collection | Highlight visible to all collaborators per Highlights PRD; visible on public page if parent collection is also public. |
| Read-only collaborator adds a highlight | Refused per Highlights PRD §5.13. |
| Two members simultaneously edit the same bookmark | Last-write-wins per Bookmarks PRD; both see each other's update through sync. |
| Anonymous viewer applies search filter `#research` on a public page | Page renders only bookmarks tagged `research`. |
| Read-only collaborator opens the web archive on a shared bookmark with `cache.status: ready` | Archive opens via authenticated redirect. |
| Anonymous viewer on a public collection tries to load the web archive | Refused — F20 / Web archive PRD §5.6. |

---

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

The sharing state lives on the collection (per **Collections PRD §8**). This PRD does not introduce a separate "share entity" — the relevant fields are part of the collection's record.

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| `collection.access[]` | array of `CollectionAccessGrant` | system | List of users granted access to the collection; the owner is included as level 4. | Owned by **Collections PRD**; populated and edited through this PRD's flows. |
| `collection.public` | boolean | system | True when Public Page is toggled on; false otherwise. | Owned by **Collections PRD**; managed through this PRD's flows. |
| `collection.publicSlug` | string | system | The slug used in the public URL. | Derived from collection title via slugification rule owned by **Collections PRD**. |
| `collection.inviteToken` | string | system | The non-guessable token in the invite link. | Rotated by owner; stored hashed for security. |
| `collection.embedHide` | string | optional | Comma-separated keyword list for embed customization. | Empty when no elements are hidden. |
| `userSettings.username` | string | system | The user's username, used in the public URL. | Owned by User / Account; consumed here. |
| `userSettings.emailVerified` | boolean | system | Email verification state. | Owned by Account / Subscription PRD; consumed here. |

## 12. Database / Schema Notes

### Enums

```ts
// Internal access level. Defined by Collections PRD §6.7 Access Levels.
// Higher number = more authority. Read access requires level >= 2;
// write access requires level >= 3; owner-only operations require level = 4.
type AccessLevel =
  | 1   // public read-only (anonymous viewer of a public collection)
  | 2   // read-only collaborator
  | 3   // member with write access
  | 4;  // owner

// User-facing role surface. The system maps this to AccessLevel internally.
type CollaboratorRole =
  | "member"
  | "read_only";

// Public-page sort parameter (URL value).
type PublicPageSort =
  | "-created"
  | "created"
  | "-title"
  | "title"
  | "-sort";   // owner's manual sort, descending (default)

// Public-page color theme.
type PublicPageTheme =
  | "light"
  | "dark"
  | "auto";

// Embed hide-element keywords.
type EmbedHideKeyword =
  | "header"
  | "excerpt"
  | "note"
  | "tags"
  | "info"
  | "add";

// Action types used by the sharing audit log (§9 Sharing audit logger)
// and observability layer. Maps 1:1 to the §6.5 internal action verbs.
type SharingActionType =
  | "generate_invite_link"
  | "rotate_invite_link"
  | "accept_invite"
  | "change_member_role"
  | "remove_member"
  | "leave_collection"          // collaborator self-removal
  | "publish_public_page"
  | "unpublish_public_page"
  | "configure_embed"
  | "render_public_page"        // observability-only; no audit row required
  | "render_embed"              // observability-only
  | "render_personal_page";     // observability-only
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
| **Collection Share dialog** | The Share button's modal — surfaces Collaboration and Public Page tabs. |
| **Collaboration tab** | Member list, role toggles, remove buttons, invite-link copy. |
| **Public Page tab** | Public Page toggle, URL copy, Embed action. |
| **Embed configuration sub-dialog** | Hide-field text input, snippet preview, copy button. |
| **Collaborator's view of a shared collection** | The shared collection in the collaborator's library (typically a "Shared" section in the sidebar). |
| **Anonymous viewer's public-page view** | The static HTML page rendered to anonymous viewers, with sort / search / theme / pagination controls. |
| **Personal page** | The auto-generated `<username>.<public-domain>` listing of public collections. |
| **Email-verification CTA on share** | When the owner is unverified, surfaces a clear "verify your email" affordance with a verification link. |
| **Embed widget on third-party site** | The iframe-rendered embed; renders an inaccessible state when the parent is private. |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| **Share button** | Top-right entry on collection detail (web / desktop); inside `···` menu (mobile). |
| **Invite link copy field** | Read-only text field with copy button. |
| **Member list row** | Username + avatar + role toggle + remove button. |
| **Role toggle** | Member ⇄ Read-only switch. |
| **Public Page toggle** | Boolean switch. |
| **Public URL copy field** | Read-only text field with copy button. |
| **Embed Hide field** | Text input accepting comma-separated keywords. |
| **Embed snippet preview** | Read-only code block with copy button. |
| **Anonymous viewer header** | Public-page top header with collection title; Embed `header` keyword can suppress it. |
| **Anonymous viewer pagination control** | Footer with page navigation; respects `page` and `perpage` URL parameters. |
| **Anonymous viewer theme selector** | Optional UI for switching between `light` / `dark` / `auto` (when the renderer chooses to expose it; the URL parameter remains the source of truth). |
| **Email verification CTA** | Inline copy on the Share dialog when unverified. |

---

## 15. Workflow Requirements

| Operation | Required Behavior | Shared / Core Handling |
|---|---|---|
| **Create** | Creating a share means: (a) generating an invite link for a collection, (b) toggling on the public page for a collection, or (c) generating an embed snippet for a public collection. None of these create a separate "share entity" with independent identity — each is a property of the collection. | Owned here; collection identity owned by **Collections PRD**. |
| **Edit** | Edits include: changing a collaborator's role between Member and Read-only, regenerating an invite link, customizing public-page parameters via the URL, configuring embed hide-elements. Edit rights are restricted to the collection owner. | Owned here. |
| **Delete** | Deletes include: removing a collaborator (immediate revocation), unpublishing a public page (immediate URL deactivation), removing an embed (the snippet on the third-party site cannot be revoked retroactively, but the underlying page becoming non-public makes the embed render an empty / inaccessible state). | Owned here. |
| **Search** | Search inside shared and public collections is owned by **Search & Filters PRD**, scoped per the requesting user's access level (or the public viewer's read-only access). | n/a |

---

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|
| **Sharing service** | Generates / rotates invite links; manages `access[]` on collections; revokes access; flips roles. |
| **Public-page service** | Handles the `public` boolean, slug derivation, render-time gating on email verification. |
| **Public-page renderer** | Serves read-only HTML for anonymous viewers. |
| **Personal-page renderer** | Serves the per-user listing of public collections. |
| **Embed service** | Handles embed configuration (Hide list, snippet generation). |
| **Embed renderer** | Serves the iframe-compatible widget. |
| **Email-verification gate** | Cross-capability check; integrates with Account / Subscription PRD. |
| **Pro-entitlement extender** | Computes the entitlement extension for collaborators on Pro-owner collections. |
| **Cross-capability access guard** | Centralized check called by Highlights, Reader, Web archive, Search & Filters, Bookmarks. |
| **Uniform-error responder** | Wraps refused requests in uniform errors to avoid existence leaks. |
| **Sharing audit logger** | Records all sharing-related changes. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| **Saved-page indicator (read-only)** | Honors ownership boundaries; collaborator-shared bookmarks do NOT count as "saved by the user." |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| **Share button + dialog** | The Share modal with Collaboration and Public Page tabs. |
| **Collaboration tab UI** | Member list rendering and editing. |
| **Public Page tab UI** | Toggle and URL copy. |
| **Embed configuration UI** | Hide field, snippet preview. |
| **Email-verification CTA** | Inline guidance when unverified. |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| **iOS / Android Share menu integration** | Surfaces the Share dialog from the `···` menu. |
| **Mobile Collaboration / Public Page UI** | Mobile-native versions of the desktop dialogs. |
| **Mobile Embed UI** | NOT exposed (F28). |

### 11.5 Public Web Layer (separate from authenticated app)

| Module | Responsibility |
|---|---|
| **Public-page server** | Serves anonymous-viewer HTML at `<username>.<public-domain>`. |
| **Public-page CDN integration** | Aggressive caching with on-change invalidation. |
| **Public-page URL parser** | Tolerant `/view/key=value&...` parser. |
| **Embed iframe handler** | Serves the embed snippet's iframe content; honors Hide configuration. |
| **Search-engine indexability** | Default `noindex: false`; sitemaps and metadata for crawlers. |

### 11.6 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| **Cache invalidation infrastructure** | Coordinates CDN and authenticated-client cache invalidation on share changes. |
| **Audit log infrastructure** | Tamper-resistant record of sharing events. |
| **Observability module** | Metrics for invite-link mint rates, public-page render volume, embed render volume, anonymous-viewer search patterns. |

---

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| **Invite token generator** | Mint unguessable, hashed-server-side join tokens. |
| **Invite token rotator** | Regenerate the token on owner request; invalidate the previous one. |
| **Access-level resolver** | Compute the requesting user's effective access level on a target collection. |
| **Role flip handler** | Change a collaborator's role between Member and Read-only. |
| **Collaborator removal worker** | Revoke access; invalidate caches; sync the collection list change to the collaborator's clients. |
| **Public-page state writer** | Persist the public-page boolean and slug. |
| **Public-page renderer** | Serve the static read-only HTML for anonymous viewers. |
| **Personal-page renderer** | Serve the per-user listing of public collections. |
| **Embed renderer** | Serve the iframe-compatible widget. |
| **Embed Hide-list parser** | Tolerant comma-separated keyword parser with case- and whitespace-tolerance. |
| **URL-parameter parser** | Parse `/view/sort=...&theme=...` parameter expressions; default and clamp values. |
| **Email-verification gate** | Refuse public rendering until the owner's email is verified. |
| **Pro-entitlement extender** | Compute and apply the page-content full-text search extension to collaborators on Pro-owner collections. |
| **Slug generator** | Compute and update the public URL slug when the collection's title changes. |
| **CDN cache invalidator** | Invalidate cached public-page output on owner changes. |
| **Cross-capability access guard** | Provides the access-level check that **Highlights**, **Reader**, **Web archive**, **Search & Filters**, and **Bookmarks** PRDs read for permission decisions. |
| **Uniform-error responder** | Wraps refused requests in a uniform 404 / 403 to prevent existence leaks. |
| **Sharing audit logger** | Records invite generations, role changes, removals, public-page toggles, and embed configurations for support and compliance. |
| **Observability module** | Logs share-button clicks, invite-link mints, public-page render rates, embed render rates, anonymous-viewer search patterns. |

---

## 19. OSS / Build-vs-Buy Decision

1. **Owner authority is non-transferable through sharing — and that's the point.** A Member is never one config-flip away from being able to invite people, regenerate the invite link, or publish the collection. This separation keeps the sharing model trustworthy. Adding a "promote to admin" affordance later is fine; making promotion a side-effect of an existing role flip is not.

2. **The two-role surface is a deliberate simplification.** Source ships only Member and Read-only. An "admin" tier or "comment-only" tier are future organizational features, not present-day sharing decisions. Keep the user-facing role enum small, even if the internal `AccessLevel` carries forward-compat slots. Users do not want to learn a permissions matrix to share a reading list with a friend.

3. **Reusable invite links are a UX feature.** Per-recipient links sound more secure but are operationally painful — owners would have to mint and manage one per invitee. The reusable-link model trades a small attack surface (someone forwards the link to an unintended recipient) for huge convenience (the owner posts the link in a Slack channel and forgets about it). Match the source product's tradeoff.

4. **Public means publicly indexable.** Owners often don't realize that "public" includes "search engine results page." Surface this in product copy at the moment of toggling — once a public collection is in Google's index, removing it requires more than just toggling off. Communicate before the toggle; don't apologize after.

5. **Email verification as a public-page gate is anti-spam.** Without it, anyone could sign up with a throwaway account and immediately publish abusive content under a fresh subdomain. The verification gate forces a minimal accountability check. Hold this line against feature requests for "let me publish first, verify later."

6. **The personal page auto-creates and auto-removes — no separate toggle.** Source's design is correct: if the user has any public collections, their profile page is reachable; if they don't, it isn't. Adding a third toggle ("publish my profile") creates more confusion than it solves. The personal page is a derived view, not an independently-managed entity.

7. **Public pages must NEVER serve archive payloads.** This is the single sharpest privacy invariant in the product. The web archive is the user's private safety net for *their* future access — not a publication channel. Even when the parent collection is public, the archive remains private. Mirror **Web archive PRD Schema Invariant 14** rigorously.

8. **The Pro-entitlement extension is a deliberate gift, not an accident.** When a Pro owner shares a collection, every collaborator gets full-text search on that collection — even free-tier collaborators. This is documented and source-explicit. It encourages adoption of paid plans by the user who hosts collaborations, not by the participants. Don't accidentally close the gift by gating per-collaborator on their own plan.

9. **Uniform error responses prevent existence leaks.** The system MUST NOT differentiate "this collection is private" from "this collection doesn't exist" in error messages — otherwise an attacker can enumerate private collection IDs. Build the access guard to return a uniform 404 / 403 regardless of the underlying reason.

10. **The embed must check parent state on every render.** A common bug is to cache the embed snippet output and forget to invalidate when the parent public page is turned off. The result is a third-party site continuing to display content from a now-private collection. Render-time check, server-side, every request — caching is fine, but it must invalidate on the parent toggle.

11. **Slug-only public URLs prevent ID enumeration.** Internal numeric collection IDs should never appear in a public-page URL. The slug is owner-controlled, public-by-intention, and discoverable only to people the owner has shared with. Numeric IDs leak structural information about the user's private library.

12. **Anonymous-viewer requests must be credential-isolated.** If a logged-in user happens to view their own public collection via the anonymous URL, the request MUST NOT carry their session credentials — otherwise the renderer would have to filter out private state at every step, which is fragile. Treat the public domain as a separate trust zone.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| **Collections PRD** | Sharing is collection-scoped: every share is a property of a collection, every collaborator's access is gated by `access.level` on the collection, and nested collections inherit sharing from their parent. |
| **Bookmarks PRD** | Public pages and embeds render bookmarks; collaborators with edit access can create, modify, and delete bookmarks within shared collections. |
| **User / Account** | Membership requires user accounts; public pages and personal pages key on `username`; email verification is a precondition for public-page activation. |
| **Highlights PRD** | Highlights inside shared collections are visible to collaborators per their access level; highlight-write rights track edit-access rights. |
| **Tags PRD** | Tags assigned to bookmarks in a public collection are visible to anonymous viewers. |
| **Reader / Articles PRD** | The reader is reachable from any bookmark a user can open, including collaborators on shared collections and (subject to access rules) anonymous viewers of public collections. |
| **Web archive PRD** | Web archive payloads are private — never exposed on public pages or embeds, even when the parent collection is public. |
| **Search & Filters PRD** | Full-text page-content search on a Pro owner's collection is extended to all collaborators; per-collaborator filter access follows their `access.level`. |
| **Files PRD** | File-backed bookmarks in shared or public collections are reachable per their hosted-URL access model owned by Files PRD. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| **Collections PRD** | Collection access-level rules (who can read / edit / admin a collection) are expressed by this PRD's role model. |
| **Search & Filters PRD** | Filter visibility, count scoping, and entitlement extension on shared collections all follow this PRD's access rules. |
| **Highlights PRD** | Highlight visibility on shared collections, and highlight write rights on a collaborator-by-collaborator basis. |
| **Reader / Articles PRD** | The reader's anonymous-viewer rendering on public bookmark pages. |
| **Web archive PRD** | Authenticated-redirect access for archive payloads on shared collections (read access ≥ 2). |
| **Public Page / Embed surface** | The static read-only page generator and the embed renderer both consume this PRD's public-collection state. |

### Related Capabilities

| Capability | Relationship |
|---|---|
| **Collections PRD** | Owns the collection entity and the `access.level` field. This PRD owns the role model, invite-link mechanism, public-page toggle, and embed configuration. |
| **Web archive PRD** | Owns the archive payload. This PRD owns the rule that public pages and embeds NEVER expose archive payloads. |
| **Files PRD** | Owns file payloads. File-backed bookmarks in public collections are reachable through their hosted URL; this PRD does not change that. |
| **Search & Filters PRD** | Owns search behavior. This PRD owns the entitlement extension where Pro-owner collections grant full-text search to free-tier collaborators. |
| **Account / Subscription PRD** (future) | Owns the email-verification flow. This PRD owns the rule that public pages require verified email. |

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
| Per-collaborator audit log | 🔴 Not Defined | Whether the owner can see which collaborator made which change. |
| Ownership transfer | 🔴 Not Defined | Transferring a collection to another user. |
| Group / team membership | 🔴 Not Defined | Inviting a group as a single unit. |
| Public-page custom domain | 🔴 Not Defined | Custom domain instead of `<username>.<public-domain>`. |
| Browser-extension share affordance | 🔴 Not Defined | One-click share from the extension. |
| Per-collection visibility override on personal page | 🟠 Product Decision | Allow publishing a collection but hiding it from the personal page listing. Recommendation: defer until source surfaces it. |
| Public-page indexability override per collection | 🔴 Not Defined | Per-collection `noindex` opt-out for owners. |
| Member list visibility to non-owner collaborators | 🟠 Product Decision | Recommendation: Member-tier sees the full list; Read-only sees count only. |
| Default role for newly accepted collaborators | 🟠 Product Decision | Recommendation: Member. |
| Slug-redirect on collection rename | 🟠 Product Decision | Recommendation: redirect old slug → new slug for the lifetime of the collection. |
| `note` field public visibility on public pages | 🟠 Product Decision | Source-aligned default is "visible." Recommendation: explicit owner-side warning when toggling public; per-bookmark "hide note from public" override is a future feature 🔴. |
| Public-page `lang` URL parameter | 🟠 Product Decision | Whether to accept a language parameter for localized rendering. |
| CDN cache TTL for public pages | 🟠 Product Decision | Concrete TTL (e.g. 5 minutes vs. 1 hour) is an implementation choice; invalidation on owner change is committed regardless. |
| Embed `theme` parameter | 🟠 Product Decision | Whether embeds accept the same `theme` URL parameter as public pages. |
| Embed maximum render width / height | 🟠 Product Decision | Whether the embed has a documented size envelope. |
| Embed analytics callback | 🔴 Not Defined | Whether owners can wire up analytics on embed views. |
| Profile-page bookmark-count summary | 🔴 Not Defined | Whether the personal page shows total counts per collection. |
| Email-verification grace period for new accounts | 🟠 Product Decision | Whether public pages are usable for the first N hours after signup pending verification. Recommendation: no grace period — verify first. |
| Removed-collaborator notification | 🟠 Product Decision | Whether the system notifies a collaborator (via email, in-product, or both) when the owner removes them. Recommendation: yes for transparency. Same question applies to "owner removed you from collection X" vs. "you left collection X" (UC-16); the leaving collaborator MAY want a confirmation, the owner MAY want a notification. |
| Offline sharing changes | 🔴 Not Defined | What happens when the owner toggles Public Page, invites a member, or removes a collaborator while the client is offline. Sync-replay semantics for sharing operations is not defined; the safest default is to treat sharing operations as online-only. |
| Two-role access model (Member, Read-only) | ✅ Decided | Source-explicit. |
| Owner is implicit (level 4) | ✅ Decided | Owner is the highest authority level per **Collections PRD §6.7**; not exposed as an assignable role through the sharing UI. |
| Public read-only (level 1) reserved for anonymous viewers of public collections | ✅ Decided | Anonymous viewers of a public collection have effective `level = 1` per **Collections PRD §6.7**. No authenticated user identity is associated with this level. |
| Collaboration is free, no member limit | ✅ Decided | Source-explicit. |
| Pro-owner entitlement extension to collaborators | ✅ Decided | Source-explicit (full-text search). |
| Members cannot reshare | ✅ Decided | Source-explicit. |
| Members cannot see owner's other collections | ✅ Decided | Source-explicit. |
| Reusable invite link | ✅ Decided | Source-explicit. |
| Members need an account | ✅ Decided | Source-explicit. |
| Nested collections inherit sharing | ✅ Decided | Source-explicit. |
| Cannot share **All bookmarks** or **Unsorted** | ✅ Decided | Source-explicit. |
| Public Page is per-collection | ✅ Decided | |
| Public Page nested-collection inheritance | ✅ Decided | Source-explicit. |
| Personal page auto-creates / auto-removes | ✅ Decided | Source-explicit. |
| Public pages are SEO-indexable by default | ✅ Decided | Source-explicit. |
| No password protection on public pages | ✅ Decided | Source-explicit. |
| Tags visible on public pages | ✅ Decided | Source-explicit. |
| Cannot hide a public collection from personal page (current behavior) | ✅ Decided | Source-explicit. |
| Email verification gates public-page rendering | ✅ Decided | Source-explicit. |
| Public-page URL parameters: `sort` / `search` / `theme` / `page` / `perpage` | ✅ Decided | Source-explicit. |
| Default `theme: light` | ✅ Decided | |
| Default `perpage: 30` | ✅ Decided | |
| Default `sort: -sort` | ✅ Decided | |
| `perpage` clamped to 1..50 | ✅ Decided | |
| Embed activation requires Public Page on | ✅ Decided | |
| Embed Hide keywords | ✅ Decided | `header`, `excerpt`, `note`, `tags`, `info`, `add`. |
| Profile embed | ✅ Decided | Source-explicit. |
| Embed web/desktop only | ✅ Decided | Source-explicit. |
| Web archive payload not on public pages | ✅ Decided | Mirrors Web archive PRD Schema Invariant 14. |

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
