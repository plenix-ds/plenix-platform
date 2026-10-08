# ResourceSpace — OSS Integration Spec

**Role:** DAM foundation for {APP_NAME}
**Repository:** https://github.com/resourcespace/resourcespace
**License:** Free / open-source (self-hosted)
**Integration type:** Self-hosted Docker service, headless (API only)
**API:** REST, JSON, signed requests, OpenAPI v11+

---

## Deployment

| Aspect | Decision |
|---|---|
| **Container** | ResourceSpace Docker image alongside {APP_NAME} stack |
| **Storage** | Shared object storage volume (MinIO or local filesystem) |
| **Database** | Dedicated MySQL/MariaDB instance (ResourceSpace requirement) |
| **Network** | Internal Docker network — not exposed to public internet |
| **Access** | {APP_NAME} backend communicates via ResourceSpace API on internal network |

## Data Flow

```
User → {APP_NAME} UI → {APP_NAME} API → ResourceSpace API → Storage
                                    ↕
                              {APP_NAME} DB
                          (anchor fields, cross-links,
                           search index sync)
```

### Upload Flow

1. User uploads asset through {APP_NAME} UI
2. {APP_NAME} API applies Smart File Naming rules
3. {APP_NAME} API calls ResourceSpace upload endpoint with file + metadata
4. ResourceSpace processes file (thumbnails, previews, EXIF extraction, AI tagging)
5. ResourceSpace returns resource ID
6. {APP_NAME} stores resource ID + anchor fields (projectType, projects[], categories[], tags[]) in its own DB
7. {APP_NAME} syncs asset to Meilisearch index

### Download Flow

1. User requests asset download through {APP_NAME} UI
2. {APP_NAME} checks permissions (own RBAC)
3. {APP_NAME} API calls ResourceSpace download endpoint
4. ResourceSpace checks its own permissions + returns file/URL
5. {APP_NAME} serves to user

### Search Flow

1. User searches in {APP_NAME} global search
2. {APP_NAME} queries Meilisearch (includes DAM asset records)
3. For DAM-specific advanced search, {APP_NAME} also queries ResourceSpace search API
4. Results merged and presented in unified UI

## Metadata Sync Strategy

| Direction | What syncs | Trigger |
|---|---|---|
| ResourceSpace → {APP_NAME} | Metadata fields, AI tags, EXIF data, thumbnails, workflow state | On upload completion, on metadata edit in ResourceSpace |
| {APP_NAME} → ResourceSpace | Anchor fields (project, category, tag assignments), custom metadata | On anchor field change in {APP_NAME} UI |

### Sync mechanism

- **Webhook preferred:** ResourceSpace fires webhook on asset events → {APP_NAME} processes
- **Polling fallback:** {APP_NAME} periodically queries ResourceSpace API for changed resources (if webhooks unavailable)
- **Conflict resolution:** {APP_NAME} is the authority for anchor fields; ResourceSpace is the authority for DAM-native metadata (EXIF, AI tags, workflow state)

## User / Permission Mapping

| {APP_NAME} Concept | ResourceSpace Concept | Mapping |
|---|---|---|
| User account | API key per user | {APP_NAME} creates/manages ResourceSpace API keys on user creation |
| Role (Owner, Admin, Member, Guest) | User group | Map {APP_NAME} roles to ResourceSpace permission groups |
| Project membership | Collection access | Project members get access to project-scoped collections |
| Client Portal user | Restricted user group | Limited to watermarked previews + specific collections |

## ResourceSpace Capabilities Used (101 total from catalog)

### Fully used (V1)

| # | Capability | How |
|---|---|---|
| 1-10 | Core DAM (library, upload, download, previews, versions, lifecycle states) | Primary asset engine |
| 11-23 | Metadata & taxonomy (custom fields, resource types, IPTC, ExifTool, export) | Metadata backbone |
| 24-31 | AI & automation (tagging, facial recognition, alt text, translations) | AI layer via ResourceSpace + {APP_NAME} model selection |
| 32-39 | Search & discovery (simple, advanced, metadata-driven, filters) | Wrapped in {APP_NAME} unified search |
| 40-52 | Collections & sharing (collections, featured, smart, public, tags) | Exposed as {APP_NAME} asset groupings |
| 53-62 | Permissions & access control (user groups, download restrictions, watermarks) | Mapped from {APP_NAME} RBAC |
| 63-71 | Workflow & review (pending, review, active, archive, notifications) | Asset approval pipeline |
| 77-86 | API (REST, upload, download, search, edit, transcode, OpenAPI) | Primary integration surface |
| 90-93 | Media processing (transcoding, previews, thumbnails, watermarks) | Server-side processing |

### Not used (handled by {APP_NAME})

| # | Capability | Why skipped |
|---|---|---|
| 72-76 | Branding & UX (homepage, language, account management) | {APP_NAME} owns UI and i18n |
| 87-89 | Plugins (Vimeo, TMS) | {APP_NAME} builds its own integrations |
| 94-101 | Administration (admin UI, user management, system config) | {APP_NAME} owns admin; ResourceSpace runs headless |

## V2 Gap Coverage (post-launch)

These gaps are NOT in ResourceSpace and will be built as {APP_NAME}-native features:

| Priority | Gap | Approach |
|---|---|---|
| 1 | External CDN usage tracking | {APP_NAME} analytics layer + CDN integration |
| 2 | Asset usage analytics | {APP_NAME} event system → dashboards |
| 3 | Omnichannel publishing | {APP_NAME} publishing destinations |
| 4 | CMS / DXP integrations | {APP_NAME} connectors |
| 5 | Creative proofing / annotations | {APP_NAME} annotation layer |
| 6 | Creative team boards | {APP_NAME} mood boards extension |
| — | Brand governance | {APP_NAME} brand rules engine |
| — | Creative tool integrations | {APP_NAME} connectors (Adobe CC, Canva, Figma) |
| — | Portal engagement analytics | {APP_NAME} analytics layer |
| — | Retail / product asset hub | {APP_NAME} PIM module |
| — | Developer media API | {APP_NAME} media delivery API |
| — | Similarity / duplicate detection | {APP_NAME} AI + vector search |
