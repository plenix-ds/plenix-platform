# Digital Asset Management — PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Digital Asset Management |
| **Capability ID** | digital_asset_management |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-11 |
| **Revision summary** | Initial creation. ResourceSpace selected as OSS foundation. |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

Provide a centralized, metadata-driven repository for managing all digital assets — images, video, audio, documents, design files, and rich media — with configurable taxonomy, workflow states, permissions, version control, and AI-powered tagging. Built on ResourceSpace OSS as the core DAM engine.

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

Not yet defined.

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

| ID | Feature | Status | Description |
|---|---|---|---|
| F01 | **Central asset library** | ResourceSpace | Searchable repository storing all digital assets with previews/thumbnails. |
| F02 | **Configurable metadata schema** | ResourceSpace | Admin-defined metadata fields per resource type — text, date, fixed-list, checkbox, etc. |
| F03 | **Resource types** | ResourceSpace | Multiple asset categories (Photo, Video, Document, Design, etc.) with type-specific metadata. |
| F04 | **Upload pipeline** | ResourceSpace | Single/batch upload with metadata capture, collection assignment, and workflow routing. |
| F05 | **Download with permissions** | ResourceSpace | Permission-controlled downloads with optional size/format selection. |
| F06 | **Previews and thumbnails** | ResourceSpace | Auto-generated previews including watermarked versions per permission group. |
| F07 | **Version control** | ResourceSpace | Track asset revisions, restore previous versions, compare versions. |
| F08 | **Lifecycle workflow states** | ResourceSpace | Pending Submission → Pending Review → Active → Waiting to Archive → Archived → Deleted. |
| F09 | **Collections** | ResourceSpace | Group assets into named collections with descriptions and tags. Public, featured, and smart collections. |
| F10 | **Advanced search** | ResourceSpace | Resource-type-aware search with global and type-specific metadata fields, faceted filtering. |
| F11 | **Permissions and access control** | ResourceSpace | Fine-grained per-group permissions: search, download, upload, edit, admin, confidential access, watermarking. |
| F12 | **AI automated tagging** | ResourceSpace | AI-powered metadata tagging at scale via OpenAI integration (GPT-3.5/4). |
| F13 | **Facial recognition** | ResourceSpace | Detect and tag faces in image assets for people-based search. |
| F14 | **AI-generated alt text** | ResourceSpace | Auto-generate accessibility alt text for images via AI. |
| F15 | **AI-generated translations** | ResourceSpace | Auto-translate metadata fields via AI integration. |
| F16 | **IPTC / ExifTool mapping** | ResourceSpace | Read/write industry-standard metadata (IPTC, EXIF) from asset files. |
| F17 | **Metadata export** | ResourceSpace | CSV and PDF export of metadata for search results and collections. |
| F18 | **REST API** | ResourceSpace | Full API with signed requests — upload, download, search, edit, transcode, collections. OpenAPI docs from v11. |
| F19 | **Plugin system** | ResourceSpace | Extensible via plugins (e.g., Vimeo embed, TMS integration). |
| F20 | **Transcoding** | ResourceSpace | Server-side transcoding for video/media via API. |
| F21 | **{APP_NAME} anchor integration** | Not yet defined | Every asset carries projectType, projects[], categories[], tags[] — the 4 universal anchor fields. |
| F22 | **Cross-capability linking** | Not yet defined | Assets linkable to any {APP_NAME} item: tasks, notes, contacts, invoices, projects, campaigns, mood boards. |
| F23 | **Smart File Naming sync** | Not yet defined | Assets auto-renamed per Smart File Naming rules when ingested or shared. |
| F24 | **Unified search integration** | Not yet defined | DAM assets appear in {APP_NAME} global search alongside all other item types. |

### V2 Features (deferred — ResourceSpace gaps)

| ID | Feature | Status | Description |
|---|---|---|---|
| V01 | **Creative proofing / annotations** | V2 | Comments, markups, annotations, version review, approvals, side-by-side comparison on assets. |
| V02 | **Brand consistency governance** | V2 | Brand rules, approved/expired status, usage notes, compliance checks, controlled download rules. |
| V03 | **Omnichannel publishing** | V2 | Push assets to websites, social, ecommerce, email, portals, CDN, marketplace channels. |
| V04 | **CMS / DXP integrations** | V2 | Connect assets to websites, CMS pages, portals, project pages, wikis, content blocks. |
| V05 | **Creative tool integrations** | V2 | Adobe CC, Canva, Figma, Office, Google Drive, design handoff integrations. |
| V06 | **Asset usage analytics** | V2 | Dashboards for views, downloads, shares, top assets, inactive assets, where-used reporting. |
| V07 | **External CDN usage tracking** | V2 | CDN link tracking, embed tracking, traffic, referrers, broken link detection, expired asset alerts. |
| V08 | **Creative team boards** | V2 | Mood boards, campaign boards, visual planning, favorites, shareable planning collections. |
| V09 | **Portal engagement analytics** | V2 | Portal logins, partner downloads, brand kit usage, ignored assets, engagement by audience. |
| V10 | **Retail / product asset hub** | V2 | Product-to-asset linking, SKU/variant relationships, product media rules, catalog publishing. |
| V11 | **Developer media API** | V2 | API-first uploads, transformations, CDN, optimization, signed delivery URLs, responsive media. |
| V12 | **Similarity search / duplicate detection** | V2 | Vector search, perceptual hashing, AI visual similarity, duplicate detection across the library. |

## 9. Business Rules & Edge Cases

Not yet defined.

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

| Field | Type | Required | Searchable | Filterable | AI-readable | Client-visible | Notes |
|---|---|---:|---:|---:|---:|---:|---|

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

Not yet defined.

## 15. Workflow Requirements

| Op | Behavior |
|---|---|
| **Create** | Upload one or more assets with metadata, assign to resource type, optionally add to collection. Upload can route through pending/review workflow. |
| **Edit** | Update metadata fields, replace asset file (new version), change resource state, move between collections, batch-edit multiple assets. |
| **Delete** | Move asset to Deleted state (soft delete). Permanent purge available to admins. |
| **Search** | Full-text + metadata + AI tag search. Simple search, advanced search with resource-type-specific fields, faceted filtering. |

## 16. API Requirements

Not yet defined.

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

Not yet defined.

## 19. OSS / Build-vs-Buy Decision

### OSS Foundation: ResourceSpace

- **Repository:** https://github.com/resourcespace/resourcespace
- **License:** Free / open-source for self-hosted deployment
- **Deployment:** Docker container alongside {APP_NAME} stack
- **Integration model:** Self-hosted service — {APP_NAME} communicates via ResourceSpace REST API
- **API:** RESTful, JSON responses, signed requests, OpenAPI docs (v11+)

### What {APP_NAME} takes from ResourceSpace (V1)

| ResourceSpace Capability | How {APP_NAME} uses it |
|---|---|
| Central asset library + upload/download | Core DAM storage engine — all assets stored in ResourceSpace |
| Configurable metadata schema + custom fields | Admin configures asset metadata through ResourceSpace; {APP_NAME} syncs display |
| Resource types | Map to {APP_NAME} media categories (Photo, Video, Audio, Document, Design, etc.) |
| Lifecycle workflow states | Drive asset approval flow — Pending → Review → Active → Archive → Deleted |
| Collections | Expose as asset groupings within {APP_NAME} UI; sync with bookmark folders where applicable |
| Permissions + access control | Inherit {APP_NAME} RBAC; map user groups to ResourceSpace permission groups |
| AI tagging + facial recognition | Expose through {APP_NAME} AI pipeline; augment with {APP_NAME}'s own model selection |
| Advanced search | Wrap ResourceSpace search API in {APP_NAME} unified search |
| Version control | Expose in {APP_NAME} file detail panel |
| REST API | Primary integration surface — all CRUD via API calls |
| Previews + thumbnails + watermarks | Serve ResourceSpace-generated previews in {APP_NAME} UI |
| IPTC / ExifTool mapping | Automatic metadata extraction on upload |
| Transcoding | Server-side media processing for video/audio |

### What {APP_NAME} adds on top (V1)

| {APP_NAME} Addition | Why |
|---|---|
| Anchor field integration | Every asset gets projectType, projects[], categories[], tags[] — connecting assets to the full {APP_NAME} data fabric |
| Cross-capability linking | Assets linked to tasks, notes, contacts, invoices, campaigns, mood boards — not isolated in a DAM silo |
| Smart File Naming | Automated naming rules applied on ingest |
| Unified search | DAM assets discoverable alongside notes, tasks, bookmarks, contacts in one search |
| {APP_NAME} UI shell | Assets presented in the {APP_NAME} design system, not ResourceSpace's native UI |
| AI model selection | Users choose which AI model tags their assets (not locked to OpenAI) |

### What {APP_NAME} does NOT take from ResourceSpace

| ResourceSpace Feature | Why skipped |
|---|---|
| ResourceSpace native web UI | {APP_NAME} provides its own UI; ResourceSpace runs headless behind the API |
| ResourceSpace user management | {APP_NAME} owns auth/identity; maps users to ResourceSpace API keys |
| ResourceSpace homepage / dashboard | {APP_NAME} has its own dashboard capability |
| ResourceSpace language/i18n | {APP_NAME} handles its own localization |

### V2 Gap Coverage Plan

See V2 Features table above. Gaps grouped by family:

| Gap Family | Priority | Approach |
|---|---|---|
| Analytics / usage reporting | 1-2 | Build native {APP_NAME} analytics layer tracking asset views, downloads, shares, CDN usage |
| Publishing / CMS integration | 3-4 | Build publishing destinations + CMS connectors |
| Proofing / creative collaboration | 5-6 | Build annotation/proofing layer + creative boards |
| Brand governance | — | Add brand rules, approved/expired status, compliance |
| Creative tool integrations | — | Adobe CC, Canva, Figma connectors |
| PIM / product hub | — | Product-to-asset linking, SKU relationships |
| Developer media API | — | Cloudinary-style transformation + CDN delivery API |

## 20. Integration Map

| Capability | Direction | Data Flow |
|---|---|---|


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

| # | Question | Status |
|---|---|---|
| OQ1 | How does ResourceSpace's user/permission model map to {APP_NAME}'s RBAC? | Open |
| OQ2 | Single shared ResourceSpace instance or per-user instances? | Open |
| OQ3 | How do ResourceSpace collections relate to {APP_NAME} bookmark folders? | Open |
| OQ4 | Should ResourceSpace's workflow states be configurable per project type? | Open |
| OQ5 | What is the sync strategy between ResourceSpace metadata and {APP_NAME} anchor fields? | Open |

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
