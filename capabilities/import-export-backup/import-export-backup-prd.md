# 10 — Import / Export / Backup PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Import / Export / Backup |
| **Capability ID** | import_export_backup |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-05-02 |
| **Revision summary** | Full specification with features, functionality, scenarios, and enablers |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST allow users to bring existing bookmarks into the library from external sources (browsers, other bookmark managers, read-later apps, PKM tools, note-taking apps), serialize the user's library out to portable formats for safety, transfer, or analysis, and create automatic backups that protect against accidental data loss. Imports MUST preserve folder structure as collection structure, MUST NEVER overwrite existing bookmarks, and MUST surface a pre-import summary before committing. Exports MUST be available at three scopes (whole account, single collection, selected bookmarks), with a separate path for highlight-only export and a separate path for the bulk ZIP export of uploaded file binaries.

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

### UC-01 — Import bookmarks from a browser

| Item | Detail |
|---|---|
| Actor | New user. |
| Goal | Bring existing browser bookmarks into the application. |
| Main Flow | 1. User exports their browser bookmarks to an HTML file. 2. User opens **Settings → Import**. 3. User uploads the HTML file. 4. System parses the file and shows a pre-import summary (bookmarks, folders, tags, highlights, duplicate count). 5. User clicks **Start import**. 6. System creates collections matching the folder structure and creates bookmarks. |
| System Response | The pre-import summary MUST be accurate. After commit, the user is dropped into the library. Thumbnails, search index entries, and (paid only) web archive captures are processed asynchronously; the user is emailed when ready. |
| Alternate Flow | If the file is larger than 300 MB, the user MUST be told to ZIP it. If the file format is unrecognized, the user MUST get a clear error message naming the supported formats. |

### UC-02 — Import bookmarks from a CSV the user prepared by hand

| Item | Detail |
|---|---|
| Actor | Power user with bookmarks in a spreadsheet. |
| Goal | Import a custom-prepared CSV. |
| Main Flow | 1. User prepares a CSV per the documented schema (§5.4). 2. User uploads via **Settings → Import**. 3. Pre-import summary appears. 4. User commits. |
| System Response | The system creates collections matching the `folder` column's values (using `/` as the nesting separator), parses tag strings (quoted comma lists), and accepts both Unix timestamps and ISO 8601 dates for `created`. |
| Alternate Flow | If the CSV is malformed (no `url` column, unquoted commas in tag strings, invalid dates), the system MUST surface specific row-level errors in the pre-import summary; the user MAY fix the file and retry. |

### UC-03 — Import a JSON export from another bookmark manager

| Item | Detail |
|---|---|
| Actor | User migrating from a different bookmark manager. |
| Goal | Import a JSON export whose schema differs from the application's own JSON exports. |
| Main Flow | 1. User uploads the JSON file. 2. The system auto-detects the JSON schema based on structural cues. 3. Pre-import summary appears. 4. User commits. |
| System Response | The auto-detection MUST handle a curated set of source schemas. Auto-detection failure MUST be reported clearly; the user MUST be able to convert the file or contact support. |
| Alternate Flow | If the JSON does not match a known schema, the system MUST refuse and tell the user which formats are supported, rather than silently importing a partial / wrong subset. |

### UC-04 — Restore from a previous backup

| Item | Detail |
|---|---|
| Actor | User who accidentally deleted a collection or wants to roll back. |
| Goal | Recover a previous library state from an automatic daily backup. |
| Main Flow | 1. User opens **Settings → Backups**. 2. User picks a backup from the list (up to 30 most recent). 3. User downloads it. 4. User goes to **Settings → Import** and uploads the backup file. 5. Pre-import summary shows that some bookmarks are duplicates of the current library (will be skipped). 6. User commits. 7. System imports only the non-duplicate bookmarks (i.e. items that had been deleted and are now restored). |
| System Response | The duplicate-skip rule (F06) protects the user's current library from being overwritten. The user gets back deleted items. |
| Alternate Flow | If the user wants to fully replace their library with the backup, they MUST first manually delete the relevant bookmarks (or use account-deletion flow) before re-importing. The system MUST NOT offer a destructive "replace library with backup" affordance — protects against accidental data loss. |

### UC-05 — Create an on-demand account backup

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Create a safety copy of the entire library. |
| Main Flow | 1. User opens **Settings → Backups**. 2. User clicks **Create new**. 3. System enqueues the backup job. 4. When complete, the system emails the user. 5. User returns to the page and downloads. |
| System Response | The backup MUST contain bookmark metadata, collection structure, tags, notes, and highlights. The backup MUST NOT contain uploaded file binaries (F17) or web archive payloads (F19). |
| Alternate Flow | The user MAY also use the bulk ZIP export (F18) on **All bookmarks** to download uploaded files separately. |

### UC-06 — Set up automatic daily cloud backups

| Item | Detail |
|---|---|
| Actor | Paid-plan user. |
| Goal | Have backups delivered automatically to Dropbox each day. |
| Main Flow | 1. User opens **Settings → Backups**. 2. User enables Dropbox under **Cloud backup**. 3. User authorizes the cloud connection (OAuth flow owned by an Integrations PRD). 4. Daily, when the user makes changes, a backup is created and pushed to `/Apps/<App>` on Dropbox. |
| System Response | The user has a continuously-updating safety copy off-platform. Older backups roll off as the 30-retention ceiling is hit. |
| Alternate Flow | The user MAY enable any combination of Dropbox, Google Drive, and OneDrive simultaneously. Disabling a destination stops new pushes but does not delete existing files at the destination. |

### UC-07 — Export a single collection

| Item | Detail |
|---|---|
| Actor | User. |
| Goal | Share a collection with someone or move it elsewhere. |
| Main Flow | 1. User opens the collection on web / desktop. 2. User clicks **Export** in the toolbar. 3. User chooses a format (HTML, CSV, or TXT). 4. The browser downloads the file. |
| System Response | The exported file contains every bookmark in the collection (recursively, including nested-collection contents — owned by **Collections PRD §5 nesting**), preserving title, URL, description, tags, notes, and (for HTML / CSV) `created` timestamps. |
| Alternate Flow | iOS uses Select → Select all → Actions → Share. Android does not yet expose this (F27 🔵). |

### UC-08 — Export a hand-picked selection

| Item | Detail |
|---|---|
| Actor | User. |
| Goal | Export a small subset of bookmarks (e.g. all the items tagged `research`). |
| Main Flow | 1. User selects bookmarks via per-row checkboxes (web / desktop). 2. User clicks **Export** in the bulk-action toolbar. 3. User chooses a format. 4. The file downloads. |
| System Response | Only the selected bookmarks are in the file. |
| Alternate Flow | iOS: Select → tap each bookmark → Actions → Share. Android: not yet. |

### UC-09 — Export the highlights from a single article

| Item | Detail |
|---|---|
| Actor | User. |
| Goal | Pull out the highlights from one article for use elsewhere. |
| Main Flow | 1. User opens the bookmark on web / desktop. 2. User opens the **Highlights** panel. 3. User clicks the **Export** icon. 4. User chooses text or CSV. 5. The file downloads. |
| System Response | The file contains every highlight on that bookmark with `text`, `color`, optional `note`, `created`, and parent bookmark reference (per **Highlights PRD §5.12**). |
| Alternate Flow | Mobile (iOS / Android) does not yet expose this (F34 🔵). |

### UC-10 — Try to upload an oversize import file

| Item | Detail |
|---|---|
| Actor | User. |
| Goal | (Negative case) Upload a 500 MB HTML export. |
| Main Flow | 1. User uploads the file. 2. System refuses with a "file too large; max 300 MB" error. 3. User ZIPs the file (`.zip` containing the original `.html`). 4. User uploads the ZIP. 5. System accepts the ZIP, unpacks it, and proceeds with the standard import flow. |
| System Response | The ZIP wrapper MUST contain exactly one supported import file. Multi-file ZIPs MUST be refused (or the system MUST clearly document which file inside the ZIP it picks). |
| Alternate Flow | None. |

### UC-11 — Try to overwrite an existing bookmark via import

| Item | Detail |
|---|---|
| Actor | User. |
| Goal | (Negative case) Update a bookmark's metadata by re-importing the same URL with new title / tags / note. |
| Main Flow | 1. User has bookmark A in their library. 2. User uploads an import file containing the same URL with different title / tags / note. 3. The pre-import summary flags the URL as a duplicate. 4. User commits. 5. System SKIPS the duplicate — no fields are updated on bookmark A. |
| System Response | The pre-import summary MUST make the skip behavior explicit so the user understands why their re-import seemed to do nothing. |
| Alternate Flow | To actually update bookmark A, the user MUST delete it first, then re-import. The system MUST NOT offer a "force overwrite" affordance. |

### UC-12 — Backup eviction on retention ceiling

| Item | Detail |
|---|---|
| Actor | Paid-plan user with daily backups enabled for many months. |
| Goal | Verify that old backups are evicted automatically. |
| Main Flow | 1. The user has 30 backups already retained. 2. The next day, a new daily backup is created. 3. The system creates the new backup. 4. The system evicts the oldest backup to maintain the 30 ceiling. |
| System Response | The user always sees up to 30 most recent backups. The user MAY download any of them while present. |
| Alternate Flow | If the user disables automatic backups, the existing backups remain available until they would have been evicted by the natural rollover (or until the user manually deletes them). |

---

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Import from HTML (Netscape Bookmarks)** | ✅ Built | The system MUST accept HTML bookmark files in the standard Netscape Bookmarks format produced by every major browser. |
| F02 | **Import from CSV** | ✅ Built | The system MUST accept CSV files. The custom CSV schema is defined in §5.4. |
| F03 | **Import from JSON** | ✅ Built | The system MUST accept JSON files. Multiple JSON schemas in the wild are supported via auto-detection (see §5.5). |
| F04 | **Import from TXT (one URL per line)** | ✅ Built | The system MUST accept plain-text files with one URL per line. |
| F05 | **Import from ENEX (Evernote)** | ✅ Built | The system MUST accept ENEX (Evernote export) files. Only web clips are imported (not free-form notes); only `Source URL`, `Created Date`, and `Tags` fields are read. |
| F06 | **Import duplicate-skip vs. existing library** | ✅ Built | If a bookmark in the import file matches an existing bookmark in the user's account under bookmark-identity normalization (per **Bookmarks PRD §5**), the imported entry MUST be skipped. Existing bookmarks MUST NEVER be overwritten. |
| F07 | **Import within-file deduplication** | ✅ Built | If the import file contains duplicate URLs, only the first occurrence MUST be imported. |
| F08 | **Pre-import summary** | ✅ Built | Before committing the import, the system MUST present a summary showing the counts of bookmarks, folders, tags, and highlights detected in the file, plus the count of duplicates that will be skipped. The user MUST explicitly click **Start import** to commit. |
| F09 | **Folder-to-collection mapping** | ✅ Built | The folder structure in the source file MUST be reproduced as a collection structure in the user's library. Nested folders MUST become nested collections per **Collections PRD §5 nesting**. |
| F10 | **Bookmarks without folder go to Unsorted** | ✅ Built | Imported bookmarks that have no folder in the source file MUST be placed in the Unsorted system collection (`-1`). |
| F11 | **Maximum import file size: 300 MB** | ✅ Decided | The import upload path MUST accept files up to 300 MB. Larger files MUST be ZIPped before upload; the system MUST accept a ZIP archive containing a single supported import file. |
| F12 | **Background post-import processing** | ✅ Built | After import commits, the system MUST process thumbnails, search index entries, and (for paid users) web archive captures asynchronously. The user MUST receive an email notification when post-processing is complete. |
| F13 | **Custom CSV format documented for end users** | ✅ Built | The CSV schema (`url` required; `folder`, `title`, `note`, `tags`, `created` optional) MUST be documented end-user-facing so users can prepare their own files. The exact column rules are in §5.4. |
| F14 | **Import cannot target a specific collection** | ✅ Decided | Imports MUST always be placed by source folder structure (or Unsorted for unfoldered items). The system MUST NOT expose an "import into this collection" flow. |
| F15 | **Account-level backup (manual)** | ✅ Built | The user MUST be able to create an on-demand backup from a settings screen. The system runs the backup asynchronously and notifies the user by email when it's ready to download. |
| F16 | **Account-level export formats: HTML, CSV, TXT** | ✅ Built | Account-level backups and exports MUST be available in HTML (Netscape), CSV, and TXT formats. The user MAY choose any subset to download. |
| F17 | **Backups exclude uploaded file binaries** | ✅ Decided | Account-level backups MUST contain bookmark metadata (URL, title, description, tags, collection, notes, highlights) but MUST NOT include the bytes of uploaded files (PDFs, images, etc.). File payloads are retrieved via the bulk ZIP export (F18). Mirrors **Files PRD Schema Invariant 21**. |
| F18 | **Bulk ZIP export of uploaded file binaries** | ⚪ Capability Split | The user MUST be able to download all of their uploaded files as a ZIP archive from the **All bookmarks** view. Pipeline owned here; payload serialization owned by **Files PRD §6.9**. |
| F19 | **Backups exclude web archive payloads** | ✅ Decided | Account-level backups MUST NOT include web archive payloads. Mirrors **Web archive PRD Schema Invariant 22**. The per-bookmark **Download** action remains the only export channel for archive bytes. |
| F20 | **Automatic daily backups** | ✅ Built | Paid-plan users MUST have a backup automatically created once per day on days they make changes. |
| F21 | **Backup retention: 30 most recent** | ✅ Decided | The system MUST retain up to 30 most recent backups per user. Older backups MUST be evicted automatically as new ones are created. |
| F22 | **Cloud-backup destinations: Dropbox, Google Drive, OneDrive** | ✅ Built | Paid-plan users MAY enable cloud backups to Dropbox, Google Drive, or Microsoft OneDrive. Each cloud destination is an opt-in, per-provider toggle. |
| F23 | **Cloud-backup file paths** | ✅ Decided | The system MUST write backups to documented paths per provider: Dropbox at `/Apps/<App>`, Google Drive in the root folder, OneDrive at `/Apps/<App>`. |
| F24 | **Per-collection export** | ✅ Built | The user MUST be able to export a single collection in any of the supported formats. |
| F25 | **Per-selection export** | ✅ Built | The user MUST be able to export a hand-picked selection of bookmarks via per-row checkboxes (web / desktop). |
| F26 | **Mobile per-collection / per-selection export (iOS)** | ✅ Built | iOS MUST expose Select → Actions → Share to export selected bookmarks via the platform share sheet. |
| F27 | **Mobile per-collection / per-selection export (Android)** | 🔵 Planned | Android does not yet expose mobile-native export UI; users are directed to the web app. |
| F28 | **Per-bookmark highlight export (text / CSV)** | ✅ Built | From a single bookmark's Highlights surface, the user MUST be able to export that bookmark's highlights as text or CSV (web / desktop). |
| F29 | **Restore from a backup file** | ✅ Built | A backup file produced by this capability MUST be importable via the standard Import flow (F01–F05) — restoring is just importing one's own export. The system MUST NOT introduce a separate "restore" pipeline; the duplicate-skip rule (F06) MUST apply, so restoring into a non-empty library MUST NOT overwrite anything. |
| F30 | **Existing bookmarks never overwritten** | ✅ Decided | Imports MUST NEVER mutate fields on existing bookmarks. To replace a bookmark with imported content, the user MUST delete the old bookmark first, then re-import. |
| F31 | **Email notification when account-backup or post-import is ready** | ✅ Built | Account-level backups and post-import processing MUST notify the user by email when the work completes. |
| F32 | **No mobile-native export UI for backup creation** | ✅ Decided | Account-level backup creation (Settings → Backups) MUST be reachable through the web app on any device, but no mobile-native screen for it is committed. |
| F33 | **Format chooser at export time** | ✅ Built | Whenever the user invokes Export (whole account, single collection, selected bookmarks), the system MUST offer a format chooser with at least HTML, CSV, and TXT. |
| F34 | **Highlight-only export from mobile** | 🔵 Planned | Per-bookmark highlight export is not yet exposed on iOS or Android; users use the web app. |
| F35 | **Account transfer / delete data-portability path** | ⚪ Capability Split | The account transfer and account deletion flows reuse this PRD's backup as the data-portability mechanism. The flows themselves are owned by a future Account / Subscription PRD. |
| F36 | **Import-time tag identity reuse** | ✅ Decided | Tags in import files MUST be normalized through **Tags PRD** identity rules. Two source tags that normalize to the same identity MUST collapse to one tag on the imported bookmark. |
| F37 | **Import-time URL canonicalization** | ✅ Decided | The system MUST apply **Bookmarks PRD §5** URL normalization when matching imported URLs against existing bookmarks. The deeper duplicate-equivalence normalization (per **Duplicates & Broken Links PRD §5.1**) MUST NOT be used at import time — the import-time match is conservative; the post-import library-health view surfaces the aggressive matches. |

---

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Supported import formats

| Format | Extension | Source examples | Behavior |
|---|---|---|---|
| HTML (Netscape Bookmarks) | `.html` | Every major browser's "Export bookmarks" output. | Folder structure, bookmark URL, title, and (where present) tags / created date are imported. |
| CSV | `.csv` | Spreadsheet tools, several read-later apps, custom user-prepared files. | Schema in §5.4. |
| JSON | `.json` | Multiple bookmark-manager exports, each with its own schema. | Auto-detection of source schema (§5.5). |
| TXT | `.txt` | Plain URL list, custom user-prepared files. | One URL per line; no folder, tag, or metadata. |
| ENEX | `.enex` | Evernote export. | Web clips only. Reads `Source URL`, `Created Date`, `Tags` — other fields ignored. |
| ZIP wrapper | `.zip` | Any of the above wrapped in a ZIP archive. | Unpacked server-side; archive MUST contain exactly one supported import file. |

| Rule | Behavior |
|---|---|
| Format detection | The system MUST detect the format by file extension and (where ambiguous) by content sniffing. |
| Unsupported format | An unsupported format MUST be refused with a clear error message naming the supported set. |
| Mixed-content ZIP | A ZIP archive containing more than one supported file or any unsupported file MUST be refused (or the system MUST clearly document which file is picked, but ambiguity is hostile to users). |

### 5.2 Pre-import summary

| Element | Required Behavior |
|---|---|
| Bookmark count | The summary MUST show the number of bookmarks detected in the file. |
| Folder count | The summary MUST show the number of distinct folders that will become collections. |
| Tag count | The summary MUST show the number of distinct tags. |
| Highlight count | The summary MUST show the number of highlights detected (formats that carry them). |
| Duplicate count vs. library | The summary MUST show how many bookmarks would be skipped because they match an existing bookmark. |
| Within-file duplicate count | The summary MUST show how many duplicate URLs within the file itself will be collapsed (only the first kept). |
| Validation errors | Row-level or entry-level parse errors MUST be surfaced before commit. The user MAY fix the file and retry. |
| Commit gate | The user MUST explicitly click **Start import** to commit. There MUST be no auto-commit on upload. |

### 5.3 Import-time duplicate handling

| Rule | Behavior |
|---|---|
| Existing-library skip | If an imported URL matches an existing bookmark under bookmark-identity normalization (per **Bookmarks PRD §5**), the imported entry MUST be skipped. |
| Within-file dedupe | Within the import file, only the first occurrence of any normalized-equivalent URL MUST be imported; subsequent occurrences MUST be skipped. |
| Existing bookmarks never overwritten | The system MUST NEVER mutate the title, description, tags, notes, highlights, collection, or any other field of an existing bookmark on import. To update an existing bookmark, the user MUST delete it first, then re-import. |
| Normalization rule | The import-time duplicate match MUST use bookmark-identity normalization, NOT the more aggressive duplicate-equivalence normalization (owned by **Duplicates & Broken Links PRD §5.1**). The aggressive matches surface afterward through the duplicates filter. |
| Trash exclusion | A URL whose only matching bookmark is in Trash MUST be importable as a fresh bookmark — Trashed bookmarks do not block imports. |
| Skip transparency | The pre-import summary MUST show the user how many entries will be skipped, broken down by reason (existing in library vs. within-file duplicate). |

### 5.4 CSV schema (custom user-prepared files)

| Column | Required | Constraints |
|---|---:|---|
| `url` | ✅ | Valid HTTP / HTTPS URL. |
| `folder` | optional | Path expression using `/` as separator (e.g. `Work/Projects/Q1`). Empty or missing → bookmark goes to Unsorted (`-1`). |
| `title` | optional | Free text. If absent, the system MAY parse the source page for a title in post-processing. |
| `note` | optional | Free text. |
| `tags` | optional | Single tag as plain string OR multiple tags as a quoted comma-separated list (e.g. `"tag1, tag2"`). Tag identity follows **Tags PRD**. |
| `created` | optional | Unix timestamp (seconds since epoch) OR ISO 8601 date-time. If absent, defaults to import time. |

| Rule | Behavior |
|---|---|
| Header row | The first row MUST be a header naming the columns. Column order is not significant. |
| Quoting | RFC 4180 quoting rules. Multi-tag fields MUST be quoted because they contain commas. |
| Encoding | UTF-8 with or without BOM MUST be accepted. |
| Empty rows | Empty rows MUST be skipped without error. |
| Invalid `url` | Rows with an empty or unparseable `url` MUST be reported in the pre-import summary as validation errors. |
| Unknown columns | Columns not in the schema MUST be ignored without error. |

### 5.5 JSON schema auto-detection

| Rule | Behavior |
|---|---|
| Multiple source schemas | Multiple bookmark-manager JSON formats are supported. The auto-detector MUST recognize a curated set of source schemas. |
| Detection strategy | Detection MAY use top-level structural cues (root array vs. object, presence of distinguishing keys) and a small per-source schema fingerprint. |
| Detection failure | If the JSON does not match any known schema, the system MUST refuse with a clear error naming the supported formats and inviting the user to convert their file. The system MUST NOT silently import a wrong subset. |
| New source addition | Adding a new source schema is an internal operation; user-facing copy MUST list which sources are currently supported. |

### 5.6 Folder-to-collection mapping

| Rule | Behavior |
|---|---|
| Top-level folder → top-level collection | Each top-level folder in the source becomes a top-level collection in the target user's library. |
| Nested folders → nested collections | Nested folders MUST become nested collections per **Collections PRD §5 nesting**. |
| Path separator | The `/` character in CSV `folder` columns and the folder hierarchy in HTML / JSON / ENEX sources MUST all map to nesting. |
| Unsorted fallback | Bookmarks with no folder (CSV `folder` empty, HTML bookmark outside any `<DT>` group, JSON entries without parent, ENEX clips without category) MUST go to the Unsorted system collection (`-1`). |
| Existing-collection collision | If an imported folder name matches an existing collection at the same nesting path, the system MUST add to the existing collection (not create a duplicate). Bookmark-identity collision rules (F06) still apply per-bookmark within the collection. |

### 5.7 Background post-import processing

| Stage | Behavior |
|---|---|
| Bookmark creation | Synchronous: completes during the import job; the user sees their library populated immediately on commit. |
| Collection creation | Synchronous. |
| Tag creation | Synchronous. |
| Highlight creation | Synchronous. |
| Thumbnail / cover generation | Asynchronous: runs in the background after import completes. |
| Search index population | Asynchronous: bookmarks become searchable as the index catches up. |
| Web archive capture (paid only) | Asynchronous: per **Web archive PRD §5.3** backfill rate (~1,000 / 30 minutes / user). For very large imports, the backfill may take many hours. |
| Email notification | The user MUST receive an email when post-processing is complete (or at least when search-index and thumbnails are ready). |

### 5.8 Export formats and scopes

| Scope | Available formats | Trigger |
|---|---|---|
| Whole account (manual backup) | HTML, CSV, TXT | Settings → Backups → Create new |
| Whole account (automatic daily) | HTML and CSV (delivered together to cloud destinations) | Daily on change, paid-only |
| Single collection | HTML, CSV, TXT | Open collection → Export |
| Selected bookmarks | HTML, CSV, TXT | Multi-select + Export |
| Single-bookmark highlights | text, CSV | Bookmark → Highlights → Export icon (web / desktop only) |
| Bulk uploaded files | ZIP archive | All bookmarks → Export → ZIP (per **Files PRD F41**) |

| Rule | Behavior |
|---|---|
| HTML format | Netscape Bookmarks file format; importable by every major browser and most third-party apps. |
| CSV format | The same schema documented in §5.4 — round-trip-compatible with custom user-prepared files. |
| TXT format | One URL per line. No metadata. |
| Default recommendation | When the user is offered a format chooser, HTML SHOULD be presented as the default / recommended option for maximum portability. |
| Format coverage | Highlights and notes MUST round-trip through HTML and CSV; the TXT format MUST NOT silently drop them — TXT is a deliberately lossy format and the user MUST understand that. |

### 5.9 Account backups

| Rule | Behavior |
|---|---|
| Manual backup | The user MAY create an on-demand backup at any time. The job runs asynchronously and emails the user on completion. |
| Automatic daily backup | Paid-plan users MUST get automatic daily backups, created once per day on days the user makes changes. |
| Retention | The system MUST retain up to 30 most recent backups per user. Older backups are evicted automatically. |
| User-initiated deletion | The user MAY manually delete a backup from the list before its retention rollover; this counts toward making slots available for new backups. |
| Backup contents — included | Bookmarks, collection structure, tags, notes, highlights. |
| Backup contents — excluded | Uploaded file binaries (F17), web archive payloads (F19). Mirrors **Files PRD §0 dependency** and **Web archive PRD Schema Invariant 22**. |
| Backup file format | Each backup MUST be available in HTML and CSV simultaneously (so the user can pick at download time). TXT MAY also be included. |
| Backup immutability | A backup file's contents MUST NOT change after creation. The download MUST always return the exact bytes that existed when the backup was created. |

### 5.10 Cloud backup destinations

| Provider | Default path |
|---|---|
| Dropbox | `/Apps/<App>` |
| Google Drive | Root folder (filenames `<App>-Export.html` and `<App>-Export.csv`) |
| Microsoft OneDrive | `/Apps/<App>` |

| Rule | Behavior |
|---|---|
| Per-provider opt-in | Each cloud destination MUST be enabled separately; users MAY enable any combination. |
| OAuth | Each destination requires OAuth authorization (owned by an Integrations PRD). |
| Push cadence | Cloud pushes MUST follow the daily-backup cadence (F20). |
| Disable behavior | Disabling a destination MUST stop new pushes but MUST NOT delete files already at the destination. |
| Provider-side retention | Files at the destination follow that provider's storage rules; this PRD does not manage retention at the destination. |
| Failure handling | A failed cloud push MUST NOT block the in-account backup creation — the in-account backup MUST still be created and retained. |

### 5.11 Per-bookmark highlight export

| Rule | Behavior |
|---|---|
| Surface | The Highlights panel inside a single bookmark MUST expose an Export icon on web / desktop (per **Highlights PRD §10.1**). Mobile platforms do NOT yet expose this surface (F34 🔵). |
| Formats | text and CSV. |
| Content | The export MUST include `text`, `color`, optional `note`, `created`, parent bookmark `link` and `title`, and (where supported) tags — per **Highlights PRD §5.12**. |
| Round-trip | Highlights round-trip through the standard import / export pipeline at the account / collection / selection scope; the per-bookmark text / CSV export is a discrete one-bookmark output. |

### 5.12 Mobile asymmetry

| Platform | Import | Export | Backup |
|---|---|---|---|
| **Web / Desktop** | Full Settings → Import flow with pre-import summary. | Single-collection, multi-select, account-level. | Settings → Backups; create-new and download. |
| **iOS** | Use web app (mobile browser). | Per-collection / per-selection via Select → Actions → Share. Highlight export not yet exposed. | Use web app. |
| **Android** | Use web app. | Mobile-native export not yet exposed (F27 🔵). | Use web app. |
| **Cross-platform invariant** | The data semantics (formats, dedupe rules, file-payload exclusion) MUST be identical across platforms. Only the gesture surface differs. | | |

### 5.13 Account transfer and account deletion (cross-PRD coordination)

| Rule | Behavior |
|---|---|
| Data-portability path | An account transfer or account deletion flow MUST allow the user to first create an account-level backup, so the user can take their data. The mechanism is this PRD's account backup. |
| Pre-deletion backup | A future Account / Subscription PRD MAY require a backup-creation step before destructive account operations. This PRD provides the underlying capability; the policy belongs there. |
| Storage residue after deletion | Existing backups MUST be reclaimed when the account is deleted, per the account-deletion lifecycle. The user is responsible for downloading anything they want to keep before initiating deletion. |

### 5.14 Cross-capability data flow

| Source | This capability uses it for |
|---|---|
| Bookmark-identity URL normalization (per **Bookmarks PRD §5**) | Import-time duplicate match. |
| Collection nesting rules (per **Collections PRD §5**) | Folder-to-collection mapping. |
| Tag identity rules (per **Tags PRD**) | Tag normalization at import; tag emission at export. |
| Highlight persistence shape (per **Highlights PRD §5.12**) | Highlight serialization in account / collection / per-bookmark exports. |
| Files PRD ZIP export pipeline | The bulk uploaded-files download (F18). |
| Web archive PRD privacy invariants | Excluding archive payloads from backups (F19). |
| User plan tier | Eligibility for automatic daily backups (F20) and cloud backups (F22). |

### 5.15 Long-running job lifecycle

Imports of large files, whole-account exports, file ZIP exports, and backup generation are all asynchronous jobs. They MUST follow a uniform lifecycle so the user-facing surfaces (progress indicators, ready notifications, expiration messaging) behave consistently across job types.

| Stage | Behavior |
|---|---|
| `queued` | Job has been accepted but not yet started. The system MUST surface this state in the relevant settings screen. |
| `running` | Worker is processing. The system SHOULD surface progress where the job type can report it (parsed / created / packaged counts during long imports; bytes packaged for ZIP exports). |
| `ready` | Output is available. For exports, this means the download is fetchable; for imports, this means the bookmarks are visible (synchronous create) and async post-processing has begun; for backups, this means the artifact is in the backup list. |
| `failed` | The job did not produce a usable output. The user MUST be told the reason in plain language and offered a retry where the failure is recoverable. |
| `expired` | The output existed but has aged out of its retention window. The user MUST be able to regenerate (export) or, for backups, see the artifact reclaimed per the 30-retention rule. |

| Rule | Behavior |
|---|---|
| Import preview retention | A parsed-but-not-committed import preview MUST be retained for at least a few hours so the user can walk away and return to commit. After the retention window, the preview MUST expire and the user MUST be told a fresh upload is required. The exact window is a 🟠 Product Decision (recommendation: 24 hours). |
| Generated export download window | A generated export download URL MUST be short-lived. The output file SHOULD be reclaimed after a few hours; the user can regenerate at any time. The exact window is a 🟠 Product Decision (recommendation: 24 hours). |
| Backup artifact retention | Backups follow the 30-retention rule (F21); they are not subject to the short-lived export window. |
| Concurrent jobs | The user MUST NOT have two simultaneously-running import jobs (per §6.7). Two simultaneously-running export jobs are acceptable. |
| Retry idempotency | Long-running job retries MUST be idempotent. A retry of a partially-completed import MUST NOT create duplicate bookmarks, and a retry of a partially-uploaded backup MUST reconcile to a single artifact. |
| Notification on completion | The user MUST be notified by email when account-level backups become `ready` and when post-import processing finishes (F31). Progress notifications for in-flight jobs MAY be additionally surfaced in-product. |

---

### System Constants

### 6.1 Internal Service Capabilities

| System Capability | Requirement |
|---|---|
| Detect import format | The system MUST detect the format from extension and / or content sniffing. |
| Parse HTML / CSV / JSON / TXT / ENEX | The system MUST have a parser per supported format. |
| Auto-detect JSON source schema | The system MUST recognize a curated set of source JSON schemas. |
| Compute pre-import summary | The system MUST produce accurate counts and validation errors before commit. |
| Skip duplicates at import | The system MUST apply bookmark-identity dedupe before creating any bookmark. |
| Map folders to collections | The system MUST create or reuse collections matching the source folder hierarchy. |
| Normalize tags | The system MUST apply Tags PRD identity rules to imported tag strings. |
| Create bookmarks / collections / tags / highlights | Synchronous import-side write. |
| Schedule async post-processing | The system MUST enqueue thumbnails, search-index updates, and (paid) web archive captures after import commit. |
| Email user on import completion | The system MUST notify by email when post-processing finishes. |
| Serialize library to HTML / CSV / TXT | One serializer per supported export format. |
| Schedule automatic daily backups | Paid-plan only; once per day on days the user made changes. |
| Push backups to cloud destinations | Per provider, when enabled. |
| Retain 30 most recent backups | The system MUST evict older backups automatically. |
| Stream backup downloads | The system MUST stream backup files on demand to authenticated download requests. |
| Reclaim backup storage on account deletion | The account-deletion lifecycle MUST trigger backup reclamation. |

### 6.2 System Response Conventions

| Response | Behavior |
|---|---|
| Import upload accepted | A pre-import summary returned synchronously (or via the import session that the client polls). |
| Import commit | Returns the count of created / skipped items per category. |
| Backup creation | Returns a job ID; backup is delivered via email + the Backups list. |
| Backup download | Streams the file with the correct content type (`text/html`, `text/csv`, `text/plain`). |
| Export action | Streams the file directly; no intermediate notification. |
| Validation errors | Returned with row / entry references where the format supports them. |

### 6.3 Error and Condition Handling

| Condition | Behavior |
|---|---|
| Unsupported file format | Refused with a clear error naming HTML / CSV / JSON / TXT / ENEX. |
| File too large (>300 MB) | Refused with a "max 300 MB; ZIP it instead" message. |
| ZIP archive with multiple files | Refused, OR documented behavior of which file is picked. Recommendation: refuse for clarity. |
| Malformed CSV (no `url` column) | Refused with a row-level error in the pre-import summary. |
| Malformed JSON (parse error) | Refused with a clear error before pre-import summary. |
| JSON schema not recognized | Refused with a "format not recognized" message naming supported sources. |
| ENEX with no web clips | Pre-import summary MUST show 0 bookmarks; user MAY abort. |
| Tab closed mid-upload | Upload aborted; partial uploads MUST NOT create partial library state. |
| Import job fails server-side | The user MUST be notified by email. The library MUST NOT be left in a half-imported state — the system SHOULD apply transactional creation per top-level collection or fall back to no-create-on-failure. |
| Duplicate URL inside the file | Only first occurrence imported; pre-import summary discloses the count. |
| Duplicate URL vs. existing bookmark | Skipped; pre-import summary discloses the count. |
| Backup creation fails | The user MUST be notified by email; the failed backup MUST NOT count against the 30-retention ceiling. |
| Cloud push fails for one provider | In-account backup still succeeds; the failed push is logged and retried per provider's backoff. |
| Cloud OAuth token expired | The system MUST surface a clear "reauthorize" affordance; future pushes are paused until reauthorized. |
| User downloads a backup that has been evicted | Refused with "this backup is no longer available." |
| Free-tier user opens cloud-backup settings | Settings visible with paid-plan-required affordance; configuration MUST NOT be persisted. |

### 6.4 Reserved Constants

| Item | Rule |
|---|---|
| `MAX_IMPORT_FILE_BYTES` | 300 MB (314,572,800 bytes). |
| `BACKUP_RETENTION` | 30 most recent backups per user. |
| `BACKUP_AUTOMATIC_FREQUENCY` | Once per day, paid-plan only, on days the user made changes. |
| `SUPPORTED_IMPORT_FORMATS` | `html`, `csv`, `json`, `txt`, `enex`. |
| `SUPPORTED_EXPORT_FORMATS` | `html`, `csv`, `txt`. |
| `SUPPORTED_HIGHLIGHT_EXPORT_FORMATS` | `text`, `csv`. |
| `IMPORT_ZIP_WRAPPER_ALLOWED` | Yes, with the constraint that the archive MUST contain exactly one supported file. |
| `CLOUD_DESTINATIONS` | `dropbox`, `google_drive`, `onedrive`. |
| `CLOUD_PATHS` | Dropbox: `/Apps/<App>`. Google Drive: root folder. OneDrive: `/Apps/<App>`. |

### 6.5 Internal Action Types

| Action | Purpose |
|---|---|
| `import.upload` | Receive an import file (with optional ZIP wrapper). |
| `import.parse` | Detect format and produce a pre-import summary. |
| `import.commit` | Create bookmarks / collections / tags / highlights from the parsed file. |
| `import.postProcess` | Enqueue thumbnails, search-index updates, and (paid) web archive captures. |
| `import.notifyComplete` | Send the post-import completion email. |
| `export.serializeAccount` | Emit a whole-library file in HTML / CSV / TXT. |
| `export.serializeCollection` | Emit a single-collection file. |
| `export.serializeSelection` | Emit a hand-picked-selection file. |
| `export.serializeHighlights` | Emit a single bookmark's highlights as text or CSV. |
| `backup.createManual` | On-demand account backup. |
| `backup.createAutomatic` | Daily automatic backup (paid-plan, on change). |
| `backup.evictOldest` | Maintain the 30-retention ceiling. |
| `backup.pushCloud` | Push a backup to a configured cloud destination. |
| `backup.download` | Stream a backup file to an authenticated download request. |

### 6.6 Plan-Tier Gating

| Capability | Free | Paid |
|---|---|---|
| Manual import in any format | ✅ | ✅ |
| Manual on-demand backup | ✅ | ✅ |
| Per-collection / per-selection / per-bookmark-highlight export | ✅ | ✅ |
| Automatic daily backups | ❌ | ✅ |
| Cloud-backup destinations (Dropbox / Google Drive / OneDrive) | ❌ | ✅ |
| Bulk ZIP export of uploaded files | ✅ (free-tier users have file uploads up to their per-plan quota; the export of those is universally free) | ✅ |

### 6.7 Idempotency and Concurrency

| Rule | Behavior |
|---|---|
| Import idempotency | Re-uploading the same file MUST produce the same result (zero net new bookmarks if the library hasn't changed since the previous import). The duplicate-skip rule (F06) makes imports naturally idempotent. |
| Concurrent imports | Two import jobs from the same user MUST NOT both run simultaneously; the second MUST be queued. |
| Backup creation idempotency | Manual backup creation MUST be allowed even if a recent backup exists — different in time, different content possible. |
| Concurrent backup creation | Two manual backups created within seconds of each other are both valid; both count against the 30-retention ceiling. |

---

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| User uploads an HTML file from Chrome | Folder structure preserved as collections; bookmarks created with title, URL, created date. |
| User uploads a 2 MB CSV with the documented schema | Bookmarks created; folder column → collection nesting; tag string parsed; created accepts Unix timestamp or ISO 8601. |
| User uploads a CSV missing the `url` column | Pre-import summary surfaces a row-level validation error; commit gate disabled until the file is fixed. |
| User uploads a JSON export from a recognized source | Auto-detection succeeds; pre-import summary shows correct counts. |
| User uploads a JSON file with no recognized schema | Refused with "format not recognized" message; user is told which sources are supported. |
| User uploads a TXT file with one URL per line | Bookmarks created in Unsorted (no folder column / structure available). |
| User uploads an ENEX file with mixed clips and notes | Only web clips imported; regular notes ignored; pre-import summary discloses this. |
| User uploads a 350 MB HTML file | Refused with "max 300 MB; ZIP it" message. |
| User ZIPs the 350 MB HTML and uploads | Server unpacks the ZIP, finds the single HTML file, proceeds with import. |
| User ZIPs two HTML files and uploads | Refused (recommendation per §6.3). |
| User imports a file containing 3 copies of the same URL | Only the first is imported; pre-import summary shows "2 within-file duplicates collapsed." |
| User imports a file containing a URL that already exists in their library | Existing bookmark unchanged; new entry skipped; pre-import summary shows "1 already in library." |
| User imports their own backup into a non-empty library | All-bookmark duplicates are skipped (existing library preserved); only items present in the backup but not in the current library are restored. |
| User wants to update an existing bookmark by re-importing | Re-import is a no-op for the existing bookmark; user MUST delete first to refresh. |
| User commits an import; tab closed before async post-processing finishes | Bookmarks are visible immediately on commit (synchronous); thumbnails / search index / web archive captures continue server-side; email arrives when ready. |
| User imports 50,000 bookmarks at once | Synchronous create completes; async web archive backfill takes hours per **Web archive PRD §5.3**; user is emailed when ready. |
| User exports a single collection in HTML | Collection contents (recursively, including nested collections) serialized to a Netscape HTML file. |
| User exports a single collection in CSV | Same content, in CSV per §5.4 schema. |
| User exports a single collection in TXT | URL list only; tags / notes / highlights silently dropped (TXT is a deliberately lossy format). |
| User selects 10 bookmarks across collections and exports | Only those 10 in the file. |
| User on iOS uses Select → Actions → Share | The platform share sheet receives the export file. |
| User on Android tries to find an in-app export action | Not yet exposed; user is directed to the web app. |
| User opens a bookmark on web, opens Highlights panel, clicks Export | text or CSV file containing every highlight on that bookmark, per **Highlights PRD §5.12**. |
| User opens a bookmark on iOS and looks for highlight export | Not yet exposed (F34 🔵). |
| Free-tier user creates a manual backup | Backup created; user emailed; downloadable from Settings → Backups. |
| Free-tier user opens cloud-backup settings | Settings visible with "paid plan required" affordance; configuration MUST NOT be saved. |
| Paid-plan user enables Dropbox cloud backup | OAuth flow; subsequent daily backups push to `/Apps/<App>` on Dropbox. |
| Paid-plan user enables Google Drive cloud backup | Backups appear in the user's Google Drive root as `<App>-Export.html` and `<App>-Export.csv`. |
| Paid-plan user makes no changes one day | No automatic backup is created that day. |
| Paid-plan user has 30 backups; new daily backup is created | The oldest backup is evicted automatically; user always sees up to 30. |
| Paid-plan user disables Dropbox cloud backup | New pushes stop; existing files in Dropbox are NOT deleted by the system. |
| User downgrades from paid to free | Existing backups in account remain accessible until natural eviction; automatic daily backups stop; cloud pushes stop. Backups already pushed to user's cloud destinations remain at those destinations (the user owns that storage). |
| User initiates account deletion | A future Account PRD MAY prompt the user to create a backup first; once the account is deleted, all in-account backups are reclaimed; cloud-destination files remain at the user's cloud (the system does not delete from there). |
| Backup creation fails server-side | User emailed about the failure; failed backup does NOT count against the 30-retention ceiling. |
| Cloud OAuth token for Dropbox expires | Future Dropbox pushes pause; system surfaces a "reauthorize" affordance; in-account backups continue normally. |
| User imports a backup file that includes highlights | Highlights restored on imported bookmarks per **Highlights PRD §5.12** round-trip. |
| User imports a backup file that contains a tag rename history | Tag identity is the string itself (per **Tags PRD**); rename history is not part of the persisted shape and is not preserved. |

---

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| `import.fileFormat` | enum | ✅ | One of `ImportFormat`. | Detected by the system. |
| `import.fileSize` | integer | system | Bytes. Capped at 300 MB. | Rejected if exceeded. |
| `import.summary.bookmarks` | integer | system | Count of bookmarks detected in file. | Pre-import summary. |
| `import.summary.folders` | integer | system | Count of distinct folders. | |
| `import.summary.tags` | integer | system | Count of distinct tags. | |
| `import.summary.highlights` | integer | system | Count of highlights detected. | |
| `import.summary.duplicatesVsLibrary` | integer | system | Count of imported URLs that match an existing bookmark. | Will be skipped. |
| `import.summary.duplicatesInFile` | integer | system | Count of within-file duplicates. | Only first kept. |
| `import.summary.validationErrors` | array | system | Row-level / entry-level errors. | User must fix before commit. |
| `backup.createdAt` | string (ISO 8601) | system | When the backup was produced. | Immutable. |
| `backup.format` | enum | system | One of `BackupFormat`. | A backup MAY be available in multiple formats simultaneously. |
| `backup.size` | integer | system | Bytes in the most representative format (typically HTML). | For UI display. |
| `backup.cause` | enum | system | One of `BackupCause`. | Distinguishes manual vs. automatic. |
| `backup.cloudDestinations` | array of `CloudDestination` | optional | The destinations this backup was pushed to. | |
| `userSettings.cloudBackup.<provider>.enabled` | boolean | system | Per-provider opt-in. | OAuth state lives separately. |

## 12. Database / Schema Notes

### Enums

```ts
type ImportFormat =
  | "html"      // Netscape Bookmarks
  | "csv"
  | "json"
  | "txt"
  | "enex"      // Evernote
  | "zip";      // wrapper containing exactly one of the above

type ExportFormat =
  | "html"
  | "csv"
  | "txt";

type HighlightExportFormat =
  | "text"
  | "csv";

type BackupFormat =
  | "html"
  | "csv"
  | "txt";

type BackupCause =
  | "manual"      // user-initiated via Create new
  | "automatic"   // daily, paid-only, on change
  | "transfer"    // pre-account-transfer or pre-deletion (cross-PRD)
  | "cloud_push"; // a backup created specifically for cloud delivery (when separate from manual/automatic)

type CloudDestination =
  | "dropbox"
  | "google_drive"
  | "onedrive";

type ImportSourceJsonSchema =
  | "auto_detected"
  | "unrecognized";  // refused per §5.5

// Uniform state machine across all long-running job types
// (import, export, backup). Per-job-type sub-states (e.g.
// import's pre-commit `parsed` state) are layered over this.
type JobState =
  | "queued"
  | "running"
  | "ready"
  | "failed"
  | "expired";
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
| **Settings → Import** | The full import flow with file upload, pre-import summary, and commit gate. |
| **Pre-import summary panel** | Counts, duplicate breakdown, validation errors, **Start import** button. |
| **Import progress / completion state** | Shown after commit; reassures user the synchronous create is done and async post-processing is running. |
| **Settings → Backups** | List of available backups, **Create new** action, cloud-backup destination toggles. |
| **Backup detail / download dialog** | Format chooser (HTML / CSV / TXT) and download links per format. |
| **Per-collection Export action** | Toolbar entry on a collection page (web / desktop). |
| **Per-selection Export action** | Toolbar entry on the bulk-action toolbar (web / desktop). |
| **Mobile (iOS) Select / Actions / Share** | Mobile platform's multi-select export path. |
| **Per-bookmark Highlights panel → Export icon** | Web / desktop only; surfaces text / CSV chooser. |
| **Cloud-backup destination toggles** | Per-provider opt-in switches with OAuth status indicators. |
| **Import unsupported-format error state** | Clear messaging naming the supported set and inviting conversion. |
| **Import file-too-large error state** | Clear "max 300 MB; ZIP it" message with a link to documentation. |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| **File upload dropzone** | Drag-and-drop + file-picker entry point on the Import screen. |
| **Pre-import summary table** | Bookmarks / folders / tags / highlights / duplicates counts. |
| **Validation-error list** | Row-level / entry-level errors with line numbers where applicable. |
| **Format chooser radio group** | HTML / CSV / TXT selector for export and backup download flows. |
| **Backup list row** | One row per available backup with `createdAt`, `cause`, `size`, format chips, **Download** action. |
| **Cloud-backup destination toggle** | Per-provider switch with OAuth status. |
| **Format documentation link** | Inline link to the user-facing CSV schema documentation. |
| **Highlight Export icon** | Inside the per-bookmark Highlights panel. |
| **"Restore is just import" hint** | Surfaced near the backup download to remind the user. |

---

## 15. Workflow Requirements

| Operation | Required Behavior | Shared / Core Handling |
|---|---|---|
| **Create** | Imports create bookmarks, collections, tags, and (where the format supports it) highlights. Backups create immutable snapshots of the user's library serialized to one of the supported formats. | Owned here; bookmark / collection / tag creation logic owned by their respective PRDs. |
| **Edit** | Backups are immutable after creation. Imports MUST NOT edit existing bookmarks — existing bookmarks are skipped, never overwritten. | Owned here. |
| **Delete** | Backups have bounded retention (up to 30 most recent for automatic backups). Backup deletion happens automatically as new backups push older ones past the retention ceiling. The user MAY also manually delete a backup. Imports do not delete anything. | Owned here. |
| **Search** | Imports and exports are not searchable surfaces. The list of available backups is browsable from a settings screen but does not participate in the universal search. | n/a |

---

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|
| **Import orchestrator** | End-to-end import lifecycle: upload → parse → summary → commit → post-process → notify. |
| **Format detection service** | Identifies import file format. |
| **Parser pool** | One parser per format, with the JSON auto-detection layer. |
| **Pre-import summary service** | Produces accurate counts and validation errors. |
| **Synchronous import committer** | Creates bookmarks / collections / tags / highlights. |
| **Async post-processor** | Schedules thumbnails, search index, web archive. |
| **Email notifier** | Sends import / backup completion emails. |
| **Export orchestrator** | End-to-end export lifecycle for account / collection / selection / highlights scopes. |
| **Serializer pool** | One serializer per format and scope. |
| **Backup orchestrator** | Manual and automatic backup creation, retention enforcement, cloud push scheduling. |
| **Cloud backup pusher** | Per-provider push worker with OAuth integration. |
| **Backup download service** | Authenticated streaming downloads. |
| **Account-deletion integration** | Reclaims in-account backups on deletion. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| **(none directly)** | The browser extension is not a primary import / export / backup surface. The extension's saved-page indicator reuses bookmark-identity dedupe but does not reach this PRD's pipeline. |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| **Import screen** | Settings → Import: upload, summary, commit. |
| **Backups screen** | Settings → Backups: list, create, cloud-destination toggles. |
| **Per-collection Export action** | Toolbar entry on collection pages. |
| **Per-selection Export action** | Bulk-action toolbar entry. |
| **Highlight Export icon** | Inside the per-bookmark Highlights panel. |
| **Format chooser dialog** | Reusable component for picking HTML / CSV / TXT. |
| **Validation-errors panel** | Pre-import error list. |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| **iOS Select / Actions / Share path** | Per-collection / per-selection export via the platform share sheet. |
| **Android select-and-export path** | Not yet built (F27 🔵). |
| **Mobile export discoverability copy** | "Use the web app for backups and full export" guidance where mobile is asymmetric. |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| **Backup storage** | Holds the most recent 30 backup files per user. |
| **Generated-file storage** | Holds short-lived export artifacts; reclaims after the documented retention window. |
| **Cloud OAuth integration** | Token storage and refresh for Dropbox, Google Drive, OneDrive. |
| **Email service** | Delivers import / backup completion emails. |
| **Rate limit / throttle infrastructure** | Per-user simultaneous-import locking, per-user export concurrency, per-user backup creation cooldown, per-host cloud-push throttling. |
| **Audit log infrastructure** | Tamper-resistant record of import / export / backup / restore actions with actor, time, source, counts, outcome. |
| **Observability module** | Logs import outcomes, format usage, backup creation, cloud-push failures, retention evictions. |
| **Import ZIP-unpack sandbox** | Server-side decompression of import ZIP wrappers. |

---

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| **Format detector** | Identifies the import file's format from extension and content. |
| **HTML parser** | Parses Netscape Bookmarks files. |
| **CSV parser** | Parses the documented CSV schema with header-row column mapping. |
| **JSON parsers (per source)** | One parser per supported source JSON schema, plus the auto-detection layer. |
| **TXT parser** | Reads one URL per line. |
| **ENEX parser** | Reads Evernote `<en-export>` files; extracts web clips and selected fields. |
| **ZIP unpacker** | Extracts a single supported file from a ZIP wrapper. |
| **Pre-import summary computer** | Produces accurate counts and validation errors. |
| **Bookmark-identity dedupe service** | Applies bookmark-identity URL normalization to detect existing-library matches. |
| **Within-file dedupe service** | Collapses duplicate URLs inside the import file. |
| **Folder-to-collection mapper** | Creates or reuses collections to mirror the source folder hierarchy. |
| **Tag normalizer** | Applies Tags PRD identity rules to imported tag strings. |
| **Synchronous import committer** | Creates bookmarks / collections / tags / highlights from the parsed file. |
| **Async post-processor** | Enqueues thumbnails, search-index updates, and web archive captures. |
| **Email notification service** | Sends "import done" and "backup ready" emails. |
| **Account-export serializer** | Serializes the user's library to HTML / CSV / TXT. |
| **Collection-export serializer** | Serializes a single collection to HTML / CSV / TXT. |
| **Selection-export serializer** | Serializes a hand-picked selection. |
| **Highlight-export serializer** | Serializes a single bookmark's highlights to text or CSV. |
| **Backup creator** | Manages on-demand and daily automatic backup runs. |
| **Backup retention enforcer** | Maintains the 30-retention ceiling. |
| **Cloud-push worker** | Pushes backups to enabled cloud destinations. |
| **Cloud OAuth manager** | Handles authorization tokens for Dropbox, Google Drive, OneDrive. |
| **Backup download streamer** | Serves authenticated download requests for backup files. |
| **Account-deletion reclaimer** | Removes in-account backups when an account is deleted. |
| **Audit logger** | Records who initiated each import / export / backup / restore, when it ran, what counts resulted, and what outcome. Critical for support cases ("what happened to my data?") and for reconciling a partial-failure investigation. |
| **Rate limit / throttle module** | Protects shared infrastructure from large operations: per-user simultaneous-import lock, per-user export concurrency, per-user backup creation cooldown, per-host cloud-push throttling. |
| **Observability module** | Logs import outcomes, duplicate-skip rates, format usage, backup creation, cloud-push failures, retention evictions. |

---

## 19. OSS / Build-vs-Buy Decision

1. **The "never overwrite existing bookmarks" rule is the entire safety story of the import pipeline.** Users move bookmarks between tools because they want their data to be safe. Any "force overwrite" affordance — even one labeled clearly — invites accidents and erodes the trust that makes import the easy entry point. Hold this line firmly.

2. **Import-time dedupe uses bookmark-identity normalization, not duplicate-equivalence.** This is a deliberate split: imports are conservative ("this exact URL is already saved") so users don't lose what they meant to import. Post-import, the duplicates filter (per **Duplicates & Broken Links PRD**) surfaces aggressive matches for cleanup. Conflating the two normalizations would either silently skip imports the user wanted or fail to skip ones they didn't.

3. **The pre-import summary is the user's commit gate.** No auto-commit on upload — ever. The user must see the counts, the duplicates that will be skipped, the validation errors, and explicitly choose to proceed. Without this gate, the next big browser-export quirk corrupts thousands of users' libraries before anyone notices.

4. **Folder-to-collection mapping is the only placement rule.** "Import everything into [my chosen collection]" sounds reasonable but breaks every reasonable user's expectation: bookmarks from "Work/Projects" should end up in Work/Projects, not flattened into one folder. Source-aligned and right.

5. **Restore is just import.** There is no separate "restore from backup" pipeline. The duplicate-skip rule makes restoring into a non-empty library safe by construction. Removing the temptation to build a separate destructive "replace library" flow is good engineering — fewer code paths, fewer accidents.

6. **Backups exclude file binaries and archive payloads on purpose.** Both file binaries (Files PRD) and web archive payloads (Web archive PRD) are large, private, and have separate download paths. Keeping them out of the standard backup keeps the backup file size manageable, the backup format universally understandable (HTML/CSV/TXT have no notion of binary blobs anyway), and the privacy model consistent. Document this prominently — users who don't read it conclude the backup is incomplete.

7. **Backup retention at 30 is enough for daily restoration; not so much it becomes a storage liability.** Users who need longer retention can push to cloud destinations and rely on the cloud's own lifecycle. The number isn't arbitrary — it's "about a month of daily history." Lowering it cuts useful rollback options; raising it costs storage proportionally.

8. **Cloud-backup destinations are integrations, not features.** The OAuth flow, token refresh, error handling, and provider-specific path conventions all belong to an Integrations module that this PRD names but doesn't own. Don't conflate "backup pushed to Dropbox" with "Dropbox integration"; the former is a use case, the latter is a long-running concern.

9. **The HTML format is the universal lingua franca of bookmark portability.** Every browser, every bookmark manager, every read-later app speaks Netscape Bookmarks. When in doubt, recommend HTML. Don't ship a "more powerful" proprietary format; ship the format users can actually move to and from anywhere.

10. **Custom CSV is documentation, not just a parser.** The CSV format is a published contract: power users prepare files by hand, automation tools generate them, support cases reference them. Keep the schema stable, document it once and well, validate aggressively, and report errors with row numbers. Sloppy CSV parsing is the leading cause of "the import dropped half my bookmarks."

11. **Async post-processing is not invisible work.** Thumbnails, search-index updates, and web archive captures take real time, especially for large imports. Email the user when it's done; show progress where you can. A user who imports 10,000 bookmarks and wonders for hours whether something is happening is a user thinking about leaving. The asynchronous pipeline must communicate.

12. **Mobile asymmetry is acceptable but must be discoverable.** iOS exports work via Select / Actions / Share; Android doesn't yet; backup and full-account export are web-only. None of this is a problem unless mobile users can't find the path. Surface "Use the web app for backups" copy in the right places. Hidden asymmetry creates support tickets; documented asymmetry creates trust.

13. **Generated download URLs MUST be short-lived and access-controlled.** A user who downloads a backup file is fetching authenticated content; the URL that delivers it MUST NOT be a long-lived public URL. The right pattern is: each download request issues a fresh signed URL with a bounded lifetime (minutes, not days). A leaked URL must expire on its own; an old URL pasted into a chat must NOT permit unauthenticated reads later. The same rule applies to asynchronous export artifacts. Treat backup and export URLs the same way the web archive treats archive payloads (per **Web archive PRD §6.7**) — never long-lived, never public, always re-minted.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| **Bookmarks PRD** | Imports create bookmarks; exports serialize bookmarks. The bookmark-identity URL normalization is reused for import-time duplicate-skip. |
| **Collections PRD** | Imports create collections from the source folder structure; exports preserve collection / nested structure. The reserved Unsorted collection (`-1`) receives bookmarks without a folder. |
| **Tags PRD** | Imports parse tag strings and apply tag identity rules; exports include tags per format. |
| **Highlights PRD** | Highlight export (per-bookmark text / CSV) is a sibling export surface owned by this PRD's pipeline. The persisted highlight shape is owned by Highlights PRD. |
| **Files PRD** | Uploaded file binaries are EXCLUDED from normal account backups. The separate per-bookmark Download and the bulk ZIP export are owned here as integration points; the file payloads themselves are owned by **Files PRD**. |
| **Web archive PRD** | Web archive payloads are never serialized into backups or exports. The download path remains per-bookmark Download, owned by **Web archive PRD**. |
| **Duplicates & Broken Links PRD** | Import-time duplicate-skip semantics coordinate with this PRD; the deeper duplicate-equivalence normalization runs post-import as a library-health view. |
| **User / Account** | Account-level backup retention, automatic daily backups, and cloud-backup integrations require user-account state and plan tier. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| **Bookmarks PRD** | Bulk-create at import time runs through the bookmark pipeline; bulk-create observability and idempotency expectations flow back to bookmarks. |
| **Public Page / Embed PRD** | Public-page consumers MAY use this PRD's export formats to fetch a static snapshot of a public collection (out of scope here; flagged for cross-PRD coordination). |
| **Account / Subscription PRD** (future) | Account transfer and account deletion flows reuse this PRD's backup pipeline as the data-portability path. |

### Related Capabilities

| Capability | Relationship |
|---|---|
| **Files PRD** | Owns the file payload and the per-bookmark Download. This PRD owns the bulk ZIP export entry point and the rule that backups exclude file binaries. |
| **Web archive PRD** | Owns the archived copy. This PRD owns the rule that backups exclude archive payloads. |
| **Highlights PRD** | Owns highlight identity and the highlight-level export shape. This PRD owns the per-bookmark highlight export surface. |
| **Duplicates & Broken Links PRD** | Owns post-import library-health detection. This PRD owns the import-time duplicate-skip rule. |
| **Bookmarks PRD** | Owns bookmark identity. This PRD reuses bookmark-identity URL normalization for import-time duplicate-skip. |
| **Tags PRD** | Owns tag identity. This PRD applies that identity to imported tags and emits tags in exports. |

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
| Whether import should ever update existing bookmarks (force-overwrite) | ✅ Decided | No. Users delete first, then re-import. The safety guarantee is the entire point. |
| Whether the bulk ZIP file export is restricted to All bookmarks scope or extends to collection scope | 🟠 Product Decision | Source documents the All-bookmarks scope only. Collection-scoped ZIP export is a reasonable extension but not pinned. |
| Mobile-native import flow | 🔴 Not Defined | iOS and Android both currently route imports to the web app. |
| Mobile-native backup creation flow | 🔴 Not Defined | Same — backup creation is web-only. |
| Android-native export flow | 🔵 Planned | F27. Once parity with iOS is achieved, this becomes ✅ Built. |
| Mobile-native highlight export | 🔵 Planned | F34. |
| OPML import format | 🔴 Not Defined | OPML is a common format for outline-style bookmark exports; not currently supported. |
| Markdown import format | 🔴 Not Defined | Some PKM tools export bookmarks as Markdown lists. |
| Import target collection (override the folder mapping) | ✅ Decided | No. Folder structure is the only placement rule. |
| Restore as a destructive operation | ✅ Decided | No. Restore is just import; it is non-destructive by construction. |
| Cloud-backup retention beyond 30 | 🟠 Product Decision | Whether cloud destinations should retain more than 30 (the user's cloud storage is theirs) is open. Recommendation: push as many as the cloud destination accepts; rely on the cloud's own lifecycle. |
| Cloud-destination file naming for non-Google Drive providers | 🟠 Product Decision | Source confirms naming for Google Drive (`<App>-Export.html` and `<App>-Export.csv`). Naming for Dropbox and OneDrive is not pinned beyond the path. |
| Encryption at rest for backups | 🟠 Product Decision | Whether in-account backups are encrypted at rest with a key derived from the user's account. Recommendation: yes. |
| Per-backup user-set names / labels | 🔴 Not Defined | Whether the user can name backups (e.g. "before reorganizing") or only browse by date. |
| Manual backup deletion before retention rollover | 🟠 Product Decision | Whether the user can manually delete a specific backup. Recommendation: yes. |
| Import progress percentage during commit | 🟠 Product Decision | For very large imports, whether to show a progress bar during the synchronous commit phase. |
| Email throttling for high-volume importers | 🟠 Product Decision | Whether multiple backups in rapid succession produce one email or many. |
| Restore-from-backup automatic detection | 🟠 Product Decision | Whether the system detects "this is your own backup" and offers a streamlined restore UX. The duplicate-skip rule (F06) makes this safe regardless. |
| Maximum import file size | ✅ Decided | 300 MB. |
| ZIP wrapper acceptance | ✅ Decided | Yes, exactly one supported file inside. |
| Multi-file ZIP behavior | 🟠 Product Decision | Recommendation: refuse for clarity. |
| Pre-import summary required | ✅ Decided | Yes. No auto-commit. |
| Within-file duplicate behavior | ✅ Decided | First occurrence imported; rest skipped. |
| Library-vs-import duplicate behavior | ✅ Decided | Existing skipped; never overwritten. |
| Backup retention | ✅ Decided | 30 most recent. |
| Automatic daily backups gating | ✅ Decided | Paid plan only. |
| Cloud destinations | ✅ Decided | Dropbox, Google Drive, OneDrive. |
| Backup contents — file binaries excluded | ✅ Decided | Yes (mirrors Files PRD). |
| Backup contents — web archive payloads excluded | ✅ Decided | Yes (mirrors Web archive PRD). |
| Restore is non-destructive | ✅ Decided | Yes (duplicate-skip rule). |
| Folder-to-collection mapping | ✅ Decided | Source folders → target collections; bookmarks without folder → Unsorted. |
| Account-level export formats | ✅ Decided | HTML, CSV, TXT. |
| Highlight-only export formats | ✅ Decided | text, CSV. |

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
