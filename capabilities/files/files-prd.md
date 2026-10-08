# 06 — Files PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Files |
| **Capability ID** | files |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Full specification with features, functionality, scenarios, and enablers |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST allow users to upload files — images, videos, documents, and books — into their library, store them as bookmarks alongside link-based bookmarks, view them inside the application's own readers where supported, and have them obey the same organization, search, sharing, and backup rules as any other bookmark, subject to per-plan storage quotas and per-file size limits.

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

### UC-01 — Upload a file by drag-and-drop from desktop

| Item | Detail |
|---|---|
| Actor | Authenticated user (web or desktop). |
| Goal | Add a local file to a specific collection. |
| Main Flow | 1. User opens the destination collection. 2. User drags one or more files from the desktop onto the collection's drop zone. 3. System validates each file's type, size, and the user's remaining monthly quota. 4. System uploads each accepted file. 5. Each upload becomes a bookmark in the destination collection. |
| System Response | A progress indicator appears for each upload. On success, the bookmark appears in the collection. On failure, a clear per-file error message is shown. |
| Alternate Flow | If a file is rejected (unsupported format, oversize, quota), the system MUST still process the remaining files in the same drop and report only the affected file as failed. |

### UC-02 — Upload via the add-button file picker

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Pick a file from a native dialog and upload it. |
| Main Flow | 1. User clicks the "+" button in the top-right of the collection toolbar. 2. User selects "file" from the Add menu. 3. The native file picker opens. 4. User chooses one or more files. 5. System validates and uploads each file. |
| System Response | Same progress and final state as UC-01. |
| Alternate Flow | If the user cancels the picker, no upload occurs and no state changes. |

### UC-03 — Upload by dragging an image from a web page

| Item | Detail |
|---|---|
| Actor | Authenticated user (web app). |
| Goal | Save an image directly from another browser tab without downloading it first. |
| Main Flow | 1. User drags an image element from a third-party page onto a collection's drop zone. 2. System resolves the dragged content into either an image upload or a link save. 3. System uploads or saves accordingly. |
| System Response | If the dragged content resolves to an image upload, a file-backed bookmark is created. If it resolves to a link, an ordinary link bookmark is created. |
| Alternate Flow | If the dragged image cannot be resolved (CORS-protected, unreachable), the system MUST fall back to saving the source URL as a link bookmark and surface a clear note about why. |

### UC-04 — Upload a PDF and open it in the in-app reader

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Save a PDF and read it inside the application. |
| Main Flow | 1. User uploads a PDF (via UC-01, UC-02, or UC-03). 2. System creates a file-backed bookmark with `type: "document"`. 3. User opens the bookmark. 4. The application renders the PDF in its own viewer. |
| System Response | The PDF is displayed with text selection enabled. |
| Alternate Flow | The user MAY select text and save it as a highlight per **Highlights PRD UC-03**. |

### UC-05 — Upload an EPUB and read it in-app

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Save an EPUB and read it inside the application. |
| Main Flow | 1. User uploads an EPUB. 2. System creates a file-backed bookmark with `type: "book"`. 3. User opens the bookmark. 4. The application renders the EPUB in its own viewer. |
| System Response | The EPUB is displayed with text selection enabled. |
| Alternate Flow | The user MAY select text and save it as a highlight per **Highlights PRD UC-03**. |

### UC-06 — Try to upload an unsupported file format

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | (Negative case) The user attempts to upload a `docx` or `xlsx` file. |
| Main Flow | 1. User drags a `docx` file into a collection. 2. System detects the unsupported extension or MIME type. 3. System refuses the upload. |
| System Response | A clear "this file format is not supported" message identifying the file by name and listing the supported set. |
| Alternate Flow | None. The user MAY convert the file to a supported format (e.g. export `docx` → `pdf`) and retry. |

### UC-07 — Try to upload an oversize file

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | (Negative case) The user attempts to upload a file larger than the per-plan single-file limit. |
| Main Flow | 1. User selects a 250 MB PDF on the free tier. 2. System measures the file size and compares it against the per-plan limit. 3. System refuses the upload. |
| System Response | A clear "file size limit" message naming the file and the user's plan limit. |
| Alternate Flow | If the user upgrades to a paid plan, the same file MAY succeed on retry (as long as it remains within the paid-tier limit). |

### UC-08 — Try to upload after monthly quota is exhausted

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | (Negative case) The user has already uploaded their plan's monthly limit and attempts to upload another file. |
| Main Flow | 1. User attempts an upload. 2. System checks the user's month-to-date total. 3. System refuses the upload. |
| System Response | A clear quota-exhausted message that names the next reset date and surfaces the upgrade option. Existing files MUST remain fully accessible. |
| Alternate Flow | The user MAY upgrade to a paid plan to immediately gain a higher quota, or wait until the next reset. |

### UC-09 — Move an uploaded file to a different collection

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Reorganize a file-backed bookmark into a different collection. |
| Main Flow | 1. User opens the file-backed bookmark or selects it in a list. 2. User changes its collection assignment. |
| System Response | The bookmark moves to the new collection. The file payload is unaffected. |
| Alternate Flow | This flow is owned by **Bookmarks PRD**; from the file's point of view, only the parent collection reference changes. |

### UC-10 — Delete an uploaded file

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Remove an uploaded file from the library. |
| Main Flow | 1. User deletes the file-backed bookmark. 2. System moves the bookmark to Trash. 3. The user later empties Trash, or a Trash auto-purge policy kicks in. 4. System removes the underlying file payload from storage. |
| System Response | While in Trash, the file payload MUST remain available so the bookmark can be restored. After permanent deletion, the file payload MUST be removed and the user's stored-bytes total MUST decrease. |
| Alternate Flow | Whether the monthly quota counter decreases on deletion is ✅ Decided: it does not — the quota is a per-month upload counter, not a current-storage counter. See §6.4. |

### UC-11 — Download an uploaded file

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Retrieve the original file payload. |
| Main Flow | 1. User opens the file-backed bookmark. 2. User selects "Download". 3. System returns the original file payload. |
| System Response | The original file is downloaded with its original filename. |
| Alternate Flow | If the user lacks read access (e.g. a non-collaborator on a shared collection), the download MUST be refused. |

### UC-12 — Upload to a shared collection as a collaborator

| Item | Detail |
|---|---|
| Actor | Collaborator with write access on a shared collection. |
| Goal | Add a file to a collection owned by another user. |
| Main Flow | 1. Collaborator drags a file into the shared collection. 2. System checks the collaborator's `access.level`. 3. System validates type, size, and the **collaborator's** monthly quota. 4. System uploads the file. |
| System Response | The file becomes a bookmark inside the shared collection. The collaborator is recorded as creator. |
| Alternate Flow | Whose monthly quota the upload counts against (collaborator vs. collection owner) is 🟠 Product Decision. See §12. Recommendation: the collaborator's quota, since they are the upload source. |

### UC-13 — View the user's current month-to-date upload usage

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Understand how much of the monthly upload quota has been used. |
| Main Flow | 1. User opens an account / settings screen, or hovers a quota indicator near the upload UI. 2. System shows month-to-date bytes uploaded against the plan limit, and the next reset date. |
| System Response | A clear usage display (e.g. "23 MB of 100 MB used; resets on 2026-06-01"). |
| Alternate Flow | None. |

### UC-14 — Upload a Markdown or plain-text note as a file

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Save a `.md` or `.txt` document for reference inside the library. |
| Main Flow | 1. User uploads the file. 2. System creates a file-backed bookmark with `type: "document"`. 3. User opens it; the application renders the content. |
| System Response | Markdown is rendered with formatting; plain text is rendered monospaced. |
| Alternate Flow | None. |

### UC-15 — Upload a video and play it inline

| Item | Detail |
|---|---|
| Actor | Authenticated user. |
| Goal | Save a video clip and play it inside the library. |
| Main Flow | 1. User uploads a supported video format. 2. System creates a file-backed bookmark with `type: "video"` and generates a poster image. 3. User opens the bookmark. 4. System plays the video inline. |
| System Response | The video plays with standard transport controls. |
| Alternate Flow | None. |

---

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

Value-added behavior beyond Create, Edit, Delete, and Search.

Source feature area(s): Files

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **File table with columns** | ✅ Built / Required | The Files screen shows all files in a structured table with five columns: Name (with emoji type icon and AI badge where applicable), Type (tag pill), Size (monospace), Modified date, and Folder. Column headers use uppercase labels. Rows highlight on hover and the table is scrollable. The Upload button in the top-right opens the system file picker. |
| F02 | **AI badge on AI-named files** | ✅ Built / Required | Files whose names were generated by the AI File Naming feature (via Capture) are tagged with a small blue 'AI' badge next to their name. The name itself is also rendered in the accent dark blue rather than the default text color, making AI-named files immediately distinguishable. This badge can be toggled off in Settings → Files. |

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Supported file formats

| Type | Allowed extensions |
|---|---|
| Image | `jpeg`, `gif`, `png`, `webp`, `heic` |
| Video | `mp4`, `mov`, `wmv`, `webm` |
| Book | `epub` |
| Document | `pdf`, `md`, `txt` |

| Rule | Behavior |
|---|---|
| Format detection | The system MUST detect format by both file extension and (where available) MIME type. A mismatch (e.g. `.jpg` extension on a non-image MIME type) MUST be refused with the same "file invalid" error. |
| Case-insensitive extensions | `.JPG` and `.jpg` MUST be treated identically. |
| Compound extensions | The system MUST handle compound extensions (e.g. `.tar.gz`) by examining the meaningful trailing extension. The set above does not include archive formats; archives MUST be refused. |
| Unsupported formats | An unsupported format MUST surface the standardized "file invalid" error. |

### 5.2 Per-plan size and quota rules

| Constraint | Free tier | Paid tier |
|---|---|---|
| Single file maximum size | 100 MB | 300 MB |
| Monthly total upload size | 100 MB | 10 GB |

| Rule | Behavior |
|---|---|
| Quota scope | The monthly quota counts only manual file uploads. Saving a bookmark to a file hosted elsewhere, saving an ordinary link bookmark, or generating a web archive copy MUST NOT count against the quota. |
| Quota reset cadence | The quota MUST reset monthly per the user's billing cycle. Whether the reset day is the user's signup day, the calendar first-of-month, or another rule is 🟠 Product Decision; whatever rule is chosen MUST be communicated clearly to the user. |
| Quota measurement unit | The quota counter MUST track bytes. UI rounding to MB or GB is presentational. |
| Quota does not decrease on delete | Deleting an uploaded file MUST NOT add quota back. The quota is a per-month upload counter, not a current-storage counter. |
| Existing files at quota | Reaching the monthly quota MUST NOT delete or hide existing files. Only new uploads are blocked until the next reset. |
| Plan downgrade | If a user downgrades after exceeding the lower tier's storage in past months, existing files MUST remain accessible. New uploads MUST be subject to the new tier's quota and per-file limits. |
| Quota error message | The quota-exhausted error MUST name the user's plan, the limit, and the next reset date. |
| Per-file size error | The per-file size error MUST name the file's size and the user's plan's per-file limit. |

### 5.3 Upload pipeline

| Stage | Behavior |
|---|---|
| Client-side pre-check | The client SHOULD validate file extension, MIME type, and size before sending the upload to the server, to give immediate feedback on obviously invalid files. |
| Upload transport | The wire transport for an upload MUST be a multipart-style request that carries the file payload and an optional destination collection identifier. |
| Server-side validation | The server MUST re-validate every constraint (format, size, quota, permissions). Client-side validation MUST NOT be the source of truth. |
| Atomicity | A single upload MUST be atomic: the file is fully received and validated before the resulting bookmark is created. A partially-received file MUST NOT produce a half-formed bookmark. |
| Bookmark creation | On successful upload, the system MUST create a bookmark whose `link` is the hosted file URL, `domain` is the host domain, `file.name` is the original filename, `file.size` is the byte count, and `type` is the auto-classified content type. |
| Default collection | If `collectionId` is omitted, the bookmark MUST be placed in the collection the user is currently viewing, or in Unsorted (`-1`) when no specific collection is open. |
| Multi-file upload | A multi-file gesture MUST be processed as N independent uploads. Each MUST succeed or fail on its own. |
| Progress reporting | The upload pipeline MUST emit per-file progress events for client-side UI. |

### 5.4 File-backed bookmark fields

| Field | Behavior |
|---|---|
| `link` | MUST point to the hosted file URL (the storage system's address for the payload). |
| `domain` | MUST be reported as the host domain (the storage system's domain, not the original source). |
| `type` | MUST be auto-classified by extension into `image`, `video`, `document`, or `book`. |
| `file.name` | MUST be the original filename as supplied by the user, preserving extension. |
| `file.size` | MUST be the byte size of the upload. |
| `cover` | The system SHOULD generate a thumbnail or first-page preview where supported and store it as the bookmark's cover. |
| `media` | For images and videos, the system SHOULD populate `media[]` with the canonical viewable URL. |

The bookmark identity, lifecycle, tags, sharing, and other behavior follow **Bookmarks PRD**. The fields above are file-specific extensions of the bookmark record.

### 5.5 In-app file viewers

| Format | Viewer Behavior |
|---|---|
| PDF | Rendered inside the application's own PDF viewer. Text selection MUST be supported. Highlight integration is owned by **Highlights PRD**. |
| EPUB | Rendered inside the application's own EPUB viewer. Text selection MUST be supported. Highlight integration is owned by **Highlights PRD**. |
| Markdown (`.md`) | Rendered with Markdown formatting (headings, lists, code blocks, links). |
| Plain text (`.txt`) | Rendered in a monospaced viewer with line wrapping. |
| Image | Rendered inline at full resolution; the user MAY zoom and pan. |
| Video | Rendered in an inline player with play / pause / seek / volume / fullscreen controls. |
| Browser-native PDF viewer | Not used by the application. The host browser's built-in PDF viewer MUST NOT be relied on for in-app behaviors (highlights, annotations). |

### 5.6 File payload immutability

| Rule | Behavior |
|---|---|
| Payload is immutable | The bytes of an uploaded file MUST NOT change after upload. The hosted file URL points to a fixed payload. |
| Edit means re-upload | To replace the file, the user MUST upload a new version (which is a new bookmark) and delete the old one if desired. |
| Versioning | The system does not support file versioning in this PRD. See §12. |
| Bookmark fields editable | The bookmark fields wrapping a file (title, description, tags, collection) ARE editable per **Bookmarks PRD**; only the file payload itself is immutable. |

### 5.7 Trash and permanent deletion

| Rule | Behavior |
|---|---|
| Trash | When a file-backed bookmark is moved to Trash, the file payload MUST remain available so the bookmark can be restored. |
| Restore from Trash | Restoring a file-backed bookmark MUST also re-link the payload to the bookmark; the same file URL MUST resolve. |
| Permanent deletion | When a file-backed bookmark is permanently deleted, the system MUST remove the file payload from storage. The user's stored-bytes total MUST decrease by the file's size. |
| Quota counter | The monthly quota counter MUST NOT decrease on deletion (see §5.2). |
| Storage reclamation timing | Storage reclamation MAY be asynchronous; the bookmark MUST disappear from user-visible surfaces immediately, even if storage cleanup runs in the background. |

### 5.8 Sharing and permissions

| Rule | Behavior |
|---|---|
| Visibility | A file-backed bookmark inside a shared collection MUST be visible to collaborators with read access. |
| Collaborator upload | A collaborator with write access (level ≥ 3, see **Collections PRD §6.7**) MUST be able to upload files into the shared collection. |
| Quota attribution | When a collaborator uploads into another user's shared collection, whose monthly quota the upload counts against is 🟠 Product Decision (see §12). Recommendation: the uploading user's quota. |
| Direct download permission | The download flow MUST require the same access level as the bookmark itself. Viewers (level 2) MAY download; users with no access MUST be refused. |
| Public-page exposure | When a collection is public, whether file-backed bookmarks expose the underlying file URL or only a link to the bookmark page is owned by **Public Page / Embed PRD**. |

### 5.9 Auto-classification of content type

| Extension(s) | Type |
|---|---|
| `jpeg`, `jpg`, `gif`, `png`, `webp`, `heic` | `image` |
| `mp4`, `mov`, `wmv`, `webm` | `video` |
| `pdf`, `md`, `txt` | `document` |
| `epub` | `book` |

| Rule | Behavior |
|---|---|
| Source of truth | Auto-classification MUST be deterministic from the extension. The system MUST NOT classify `.pdf` as anything other than `document` based on content. |
| Override | The user MAY manually re-classify a bookmark's `type` via bookmark edit per **Bookmarks PRD**. The file remains the same; only the bookmark's `type` field changes. |
| Type filters | The Search & Filters PRD's `type:` operator and content-type filters surface this classification. |

### 5.10 Thumbnail and preview generation

| Rule | Behavior |
|---|---|
| Image | The image itself serves as both the cover and the inline view. |
| Video | The system SHOULD extract a poster frame for use as the cover. |
| PDF | The system SHOULD render the first page as the cover thumbnail. |
| EPUB | The system SHOULD use the EPUB's cover image (where present) or the first page as the cover thumbnail. |
| Markdown / plain text | The system MAY use a generic document icon, or render a snippet of the first lines as a text preview. |
| Failure | Thumbnail generation failure MUST NOT cause the upload to fail. The bookmark MUST still be created, with a fallback generic cover. |

### 5.11 Indexing and search

| Rule | Behavior |
|---|---|
| Metadata indexing | `file.name`, `title`, `description`, and `link` MUST be indexed immediately upon upload, per **Search & Filters PRD §5.11 Indexing lifecycle**. |
| PDF body content indexing | PDF text content SHOULD be indexed asynchronously after upload. Plan-gated: paid tier only. |
| EPUB body content indexing | EPUB text content SHOULD be indexed asynchronously after upload. Plan-gated: paid tier only. |
| Markdown / plain-text indexing | `.md` and `.txt` text content SHOULD be indexed (paid tier only, per the same plan-gating rules). |
| Image OCR | OCR of text inside images MUST NOT be performed (✅ Decided in **Search & Filters PRD §3 F35**). |
| Video / audio transcript indexing | Transcript indexing MUST NOT be performed (✅ Decided in **Search & Filters PRD §3 F35**). |
| `file:true` operator | The Search & Filters operator that surfaces only file-backed bookmarks is owned by **Search & Filters PRD**. |

### 5.12 Backup and export

| Rule | Behavior |
|---|---|
| Backup inclusion | Files MUST be included in account backups. |
| Export shape | The exact backup-format representation of a file-backed bookmark — whether it carries the file payload inline, a download URL, or both — is owned by **Import / Export / Backup PRD**. |
| Restore from backup | Restoring from a backup MUST recreate file-backed bookmarks with their original `file.name`, `file.size`, and content classification. The hosted file URL MAY be regenerated. |

### 5.13 Cross-capability data flow

| Source | This capability uses it for |
|---|---|
| User plan tier | Per-file size limits and monthly upload quotas. |
| User billing cycle | Quota reset cadence. |
| Collection access level | Upload permissions for collaborators. |
| Bookmark `_id`, `link`, `tags`, `collection` | The wrapping bookmark record for the uploaded file. |
| Web archive cache state | Equivalent role for HTML pages; this PRD plays the equivalent role for file-backed bookmarks. |

### 5.14 Platform-Specific Interaction Patterns

| Platform | Upload | View |
|---|---|---|
| **Web / Desktop** | Drag-and-drop into a collection; "+" button → "file" picker; drag from another browser tab. | In-app PDF, EPUB, image, video, Markdown, and text viewers. |
| **Browser Extension** | Not a primary upload surface. Saving a page that hosts a file (e.g. a `.pdf` URL) creates a link bookmark, not a file upload. | Inherits the browser-native viewer for the page; the in-app viewer is reached by opening the bookmark inside the application. |
| **iOS** | Mobile upload from the camera or photo library is 🔵 Planned (F39). Files saved through the Share sheet behave per **Browser Extension / Mobile Capture PRD**. | In-app PDF and EPUB viewers; image and video inline. |
| **Android** | Same as iOS. | Same as iOS. |
| **Cross-platform invariant** | Validation rules (supported formats, per-file size, monthly quota) and the resulting bookmark shape MUST be identical across platforms. | |

---

### System Constants

### 6.1 Internal File Service Capabilities

| System Capability | Requirement |
|---|---|
| Validate upload | The system MUST validate format, MIME, size, and quota before accepting an upload. |
| Persist file payload | The system MUST persist the file payload to durable storage and return a hosted URL. |
| Create file-backed bookmark | The system MUST create the wrapping bookmark with the file-specific fields populated. |
| Generate thumbnail / preview | The system SHOULD generate a thumbnail or preview asynchronously without blocking upload completion. |
| Reject and report errors | The system MUST emit standardized error codes for "no file", "file invalid", and "file size limit". |
| Track quota usage | The system MUST maintain a per-user month-to-date upload-bytes counter and reset it on the user's billing cycle. |
| Reclaim storage | The system MUST reclaim the underlying file payload when the bookmark is permanently deleted. |
| Serve hosted file | The system MUST serve the hosted file payload via authenticated requests, respecting the bookmark's access rules. |

### 6.2 System Response Conventions

| Response | Behavior |
|---|---|
| Upload success | The full bookmark record, including `file.name`, `file.size`, `type`, `link`, `domain`. |
| Upload failure | A typed error with `error` code and human-readable `errorMessage`. |
| Quota response | A current-month usage object: bytes used, limit, next reset date. |
| Cleanup response | An asynchronous storage-reclamation event MAY be unobservable to the user. |

### 6.3 Error and Condition Handling

| Condition | Standardized Code | Behavior |
|---|---|---|
| File payload missing in request | `no_file` (or equivalent: `error: -1`, `errorMessage: "no file"`) | Refused with a clear "file is missing from the request" message. |
| Unsupported format | `file_invalid` (`errorMessage: "File is invalid"`) | Refused with a clear "this file format is not supported" message naming the file. |
| Single-file size exceeded | `file_size_limit` (`errorMessage: "File size limit"`) | Refused with a clear message naming the file's size and the per-plan limit. |
| Monthly quota exhausted | `quota_exhausted` | Refused with a clear message naming the plan limit and next reset date. |
| Collection inaccessible | `permission_denied` | Refused with a clear access-level explanation. |
| Storage backend failure | `storage_error` | Retry with backoff is acceptable; the bookmark MUST NOT be created until the upload completes successfully. |
| Concurrent uploads racing the quota | `quota_exhausted` (on losing upload) | The first upload to commit MUST succeed; subsequent uploads that would push past the quota MUST be refused, even if validated when started. |

### 6.4 Quota Mechanics

| Item | Rule |
|---|---|
| Counter scope | Per-user, month-to-date. |
| Counter unit | Bytes. |
| Counter increment | Each successful upload increments by `file.size`. |
| Counter decrement on delete | The counter MUST NOT decrement when a file is deleted. The quota is a per-month upload counter, not a current-storage counter. |
| Counter reset | The counter MUST reset at the start of each billing cycle for the user's plan. |
| Counter race | Concurrent uploads MUST be serialized at the quota check. Two uploads that together would exceed the quota MUST NOT both succeed. |
| Plan upgrade mid-month | When a user upgrades mid-month, the higher tier's limit MUST apply immediately. The current month-to-date count carries forward. |
| Plan downgrade mid-month | When a user downgrades mid-month and is already over the new lower tier's monthly limit, no new uploads MUST be accepted until the next reset, but existing files MUST remain accessible. |

### 6.5 Reserved Field Values and Error Codes

| Item | Rule |
|---|---|
| `error: -1` / `errorMessage: "no file"` | Reserved for "file payload missing in request". |
| `error: "file_invalid"` / `errorMessage: "File is invalid"` | Reserved for unsupported format. |
| `error: "file_size_limit"` / `errorMessage: "File size limit"` | Reserved for single-file size exceeded. |
| `type` enum values | `image`, `video`, `document`, `book`. The Search & Filters operator `type:` keys on these. |
| Hosted file URL prefix | An internal storage host. The user-visible `link` field MUST point to this prefix and the `domain` MUST be the storage host. The original source domain (e.g. where the user originally drag-dropped from) is NOT the file's `domain`. |

### 6.6 Result Limits and Constants

| Item | Rule |
|---|---|
| `MAX_SINGLE_FILE_FREE` | 100 MB (104,857,600 bytes). |
| `MAX_SINGLE_FILE_PAID` | 300 MB (314,572,800 bytes). |
| `MONTHLY_QUOTA_FREE` | 100 MB (104,857,600 bytes). |
| `MONTHLY_QUOTA_PAID` | 10 GB (10,737,418,240 bytes). |
| `SUPPORTED_IMAGE_EXTS` | `jpeg`, `jpg`, `gif`, `png`, `webp`, `heic`. |
| `SUPPORTED_VIDEO_EXTS` | `mp4`, `mov`, `wmv`, `webm`. |
| `SUPPORTED_DOC_EXTS` | `pdf`, `md`, `txt`. |
| `SUPPORTED_BOOK_EXTS` | `epub`. |

### 6.7 Supported Format Matrix

A consolidated reference for what each supported format gets in the product. The "Highlighting" column refers to highlight selection inside the application's own viewer (per **Highlights PRD**); the "Full-text indexing" column is plan-gated to paid (per §6.10).

| Category | Extensions | Preview / Viewer | Full-text indexing | Highlighting |
|---|---|---:|---:|---:|
| Image | `jpeg`, `jpg`, `gif`, `png`, `webp`, `heic` | Inline image viewer (zoom + pan). | ❌ — no OCR. | ❌ |
| Video | `mp4`, `mov`, `wmv`, `webm` | Inline video player (transport controls). | ❌ — no transcript. | ❌ |
| PDF | `pdf` | In-app PDF viewer with text selection. | ✅ Paid (text-based PDFs only; scanned PDFs require OCR — not supported). | ✅ |
| EPUB | `epub` | In-app EPUB viewer with text selection. | ✅ Paid. | ✅ |
| Markdown | `md` | Rendered with formatting; embedded HTML sanitized. | ✅ Paid. | 🟠 Product Decision (text-selection inside the rendered Markdown view). |
| Plain text | `txt` | Monospaced viewer. | ✅ Paid. | 🟠 Product Decision. |

The host browser's built-in PDF viewer MUST NOT be used as a substitute for the in-app PDF viewer when highlight features are required (✅ Decided per F27).

### 6.8 Status Enums

The system MUST track three independent status fields on every uploaded file, exposed on the file-backed bookmark for UI rendering and engineering observability.

**`UploadStatus`** — the file's progression through the upload pipeline.

| Value | Meaning |
|---|---|
| `queued` | Upload is queued client-side and has not yet started transmitting. |
| `uploading` | Binary transfer in progress. |
| `processing` | Upload accepted by storage; thumbnail / preview / indexing jobs are running. |
| `complete` | The wrapping bookmark is fully created and visible in the library. |
| `failed` | Upload did not complete (network, storage, validation). |
| `canceled` | The user canceled the upload before completion. |
| `blocked_quota` | Upload was refused by the monthly quota check; surfaces alongside the standardized `quota_exhausted` error. |
| `blocked_size` | Upload was refused for exceeding the per-plan single-file size limit; surfaces alongside `file_size_limit`. |
| `blocked_type` | Upload was refused for unsupported format; surfaces alongside `file_invalid`. |
| `blocked_permission` | Upload was refused because the requesting user lacked write access on the destination collection; surfaces alongside `permission_denied`. |

**`FileIndexingStatus`** — the file's progression through the content-indexing pipeline.

| Value | Meaning |
|---|---|
| `not_applicable` | The file's type is not eligible for full-text indexing (image, video). |
| `pending` | The file is eligible and the indexing job has been queued. |
| `indexed` | Text was successfully extracted and is searchable. |
| `failed` | Extraction or indexing failed; the file remains stored and viewable. |
| `unsupported` | The file is in an eligible category but the specific content cannot be extracted (e.g. scanned-image PDF, encoding error). |
| `plan_gated` | The user's plan does not include content indexing for this file's category. |

**`FilePreviewStatus`** — the file's progression through the preview / cover generation pipeline.

| Value | Meaning |
|---|---|
| `pending` | Preview generation is queued. |
| `available` | A preview / cover is ready and renders in the bookmark card and viewer. |
| `unavailable` | The file's category does not produce a preview (`md`, `txt` may use a generic fallback). |
| `failed` | Preview generation failed; a fallback generic cover MUST be used. The bookmark MUST still be created. |
| `unsupported` | The file's category is not preview-eligible. |

The standardized error codes (`no_file`, `file_invalid`, `file_size_limit`, `quota_exhausted`, `permission_denied`, `storage_error`) remain the user-facing product surface (see §6.5). The status enums above are the internal state machine; UI MAY surface them directly when useful (e.g. "Indexing in progress" for `pending` indexing) but MUST NOT replace the standardized error codes for hard failures.

### 6.9 Internal Action Types

| Action | Purpose |
|---|---|
| `file.upload` | Validate and persist a file payload, then create the wrapping bookmark. |
| `file.classifyType` | Determine the bookmark `type` from the file's extension. |
| `file.generateCover` | Asynchronously generate a thumbnail or preview. |
| `file.indexContent` | Asynchronously extract and index PDF / EPUB / Markdown / plain-text content for search. (Plan-gated.) |
| `file.serve` | Stream a hosted file payload to an authenticated requester. |
| `file.reclaim` | Remove a file payload from storage when its bookmark is permanently deleted. |
| `file.exportZip` | Package the user's original uploaded files (whole library, single collection, or selection) into a ZIP archive for download. |
| `quota.check` | Return whether a hypothetical upload of N bytes would succeed for the current user this month. |
| `quota.consume` | Atomically increment the monthly quota counter on a successful upload. |

### 6.10 Plan-Tier Gating

| Capability | Free | Paid |
|---|---|---|
| Upload supported file formats | ✅ | ✅ |
| Single file up to 100 MB | ✅ | ✅ |
| Single file up to 300 MB | ❌ | ✅ |
| Monthly upload total up to 100 MB | ✅ | ✅ |
| Monthly upload total up to 10 GB | ❌ | ✅ |
| In-app PDF / EPUB / image / video / Markdown / text viewers | ✅ | ✅ |
| Direct download of an uploaded file | ✅ | ✅ |
| Bulk file ZIP export | ✅ | ✅ |
| PDF / EPUB / Markdown / text content indexing | ❌ | ✅ |
| Normal account backups (bookmark metadata only — files excluded; see F30) | ✅ | ✅ |

---

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| User drags 3 PDFs into a collection on the free tier, total 50 MB, current month-to-date 60 MB | All three uploads succeed (60 + 50 = 110 MB > 100 MB cap). **Wait — fail.** The third upload that would push past 100 MB MUST be refused with `quota_exhausted`. The first two succeed. |
| User uploads a single 250 MB PDF on the free tier | Refused with `file_size_limit` (250 MB > 100 MB free per-file limit). |
| User uploads a single 250 MB PDF on the paid tier | Accepted (250 MB ≤ 300 MB paid per-file limit) provided monthly quota is sufficient. |
| User uploads a `.docx` file | Refused with `file_invalid`. |
| User uploads a `.JPG` (uppercase extension) | Accepted as an image. Extensions are case-insensitive. |
| User uploads a `.tar.gz` file | Refused — archives are not in the supported set. |
| User drags an image element from another browser tab | If the image bytes can be resolved, it is uploaded as an image file. If not, the source URL is saved as an ordinary link bookmark with a clear note. |
| User uploads via the picker without a destination collection in view | Bookmark is placed in Unsorted. |
| User uploads with a destination collection open | Bookmark is placed in that collection. |
| User uploads multiple files in one drag, one is unsupported | Supported files are uploaded; the unsupported file is reported per-file as failed. The drop is not aborted. |
| User uploads a file, network fails partway | The system MUST NOT create a half-formed bookmark. The user is informed of the failure and MAY retry. |
| User uploads a 50 MB file, current month-to-date 99 MB on free tier | Refused with `quota_exhausted` — adding 50 MB would exceed the 100 MB free monthly limit. The user is told the next reset date. |
| User reaches monthly quota, then deletes 80 MB of old uploads | Quota counter MUST NOT decrease. New uploads MUST still be refused until the next monthly reset. |
| User opens a PDF inside the in-app viewer | PDF renders with text selection enabled. |
| User opens an EPUB inside the in-app viewer | EPUB renders with text selection enabled. |
| User opens an image-backed bookmark | Image renders inline at full resolution. |
| User opens a video-backed bookmark | Video plays inline with transport controls. |
| User opens a Markdown file | `.md` is rendered with formatting (headings, lists, code blocks). |
| User opens a plain-text file | `.txt` renders monospaced. |
| User selects text inside a PDF and saves a highlight | Highlight is persisted per **Highlights PRD UC-03**. |
| User selects text inside an EPUB and saves a highlight | Highlight is persisted per **Highlights PRD UC-03**. |
| User opens a PDF in the host browser's built-in viewer rather than the app's viewer | In-app highlights are not available. The user MUST be told to open the file inside the application. |
| User downloads an uploaded file | The original payload is delivered with the original filename. |
| User attempts to download a file from a shared collection where they have no access | Refused with `permission_denied`. |
| Collaborator with write access uploads to a shared collection | Upload succeeds. Quota is attributed to the collaborator (per recommendation in §5.8 / §12). |
| Collaborator without write access (viewer level 2) attempts to upload | Refused with `permission_denied`. |
| User permanently deletes a file-backed bookmark | The wrapping bookmark is removed and the file payload is reclaimed from storage on the next sweep. |
| User restores a file-backed bookmark from Trash | The bookmark and its file payload are restored together; the same hosted URL resolves. |
| User uploads two large files concurrently from two devices, total just over the monthly limit | The first upload to commit MUST succeed; the second MUST be refused with `quota_exhausted`. |
| User upgrades to paid mid-month after hitting the free monthly cap | Higher monthly limit applies immediately; the user's month-to-date counter carries over. New uploads MAY proceed up to the paid cap. |
| User downgrades to free mid-month while over the new free cap | No new uploads MUST be accepted until the next monthly reset. Existing files MUST remain accessible. |
| Thumbnail generation fails for an EPUB | Upload still succeeds; bookmark is created with a fallback generic cover. |
| User uploads a `.md` note that contains malicious-looking content | Content is rendered with Markdown formatting; the system MUST sanitize HTML embedded in Markdown to prevent script injection. |
| User uploads a file whose `file.name` contains unusual characters (Unicode, emoji, very long string) | The filename MUST be preserved as-is on storage and surfaced in `file.name`. The system MAY truncate for display purposes only. |

---

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| `file.name` | string | ✅ | Original filename including extension. | Server-set from upload. |
| `file.size` | integer | ✅ | Byte size of the upload. | Server-set from upload. |
| `file.checksum` | string | optional | Content hash of the binary payload (algorithm is an implementation detail). | Server-set when computed. Useful for integrity checks and future deduplication; no behavior is required to depend on it. |
| `file.storageKey` | string | system | Internal storage backend reference for the payload. | Server-set; MUST NOT be exposed as an unauthenticated direct path unless the file is intentionally public. Distinct from the user-visible `link`. |
| `file.uploadStatus` | enum | system | One of the `UploadStatus` values defined in §8.2. | Tracks pipeline state from queued through complete or failed. |
| `file.indexingStatus` | enum | system | One of the `FileIndexingStatus` values defined in §8.2. | Tracks content-extraction state for searchable formats. |
| `file.previewStatus` | enum | system | One of the `FilePreviewStatus` values defined in §8.2. | Tracks thumbnail / preview generation state. |
| `file.sourcePlatform` | enum | optional | One of the `SourcePlatform` values defined in §8.2. | Server-set when supplied by the upload surface; provenance for analytics and platform-specific debugging. |
| `link` | string (URL) | ✅ | Hosted file URL on the storage backend. | Server-set; not the original source URL if drag-dropped from a web page. |
| `domain` | string | ✅ | The storage host's domain. | Server-set. |
| `type` | enum | ✅ | One of the four classified types. | Auto-classified by extension. |
| `cover` | string (URL) | optional | Thumbnail / preview URL. | Server-generated where supported. |
| `media` | array of `{ link: string }` | optional | Canonical viewable URLs. | Used for image and video bookmarks. |

The wrapping bookmark's other fields (`_id`, `title`, `excerpt`, `note`, `tags`, `collection`, `created`, `lastUpdate`, `important`, `highlights`, etc.) follow **Bookmarks PRD §8**.

## 12. Database / Schema Notes

### Enums

```ts
type FileType =
  | "image"
  | "video"
  | "document"
  | "book";

type FileExtension =
  // images
  | "jpeg" | "jpg" | "gif" | "png" | "webp" | "heic"
  // videos
  | "mp4" | "mov" | "wmv" | "webm"
  // documents
  | "pdf" | "md" | "txt"
  // books
  | "epub";

type UploadErrorCode =
  | "no_file"
  | "file_invalid"
  | "file_size_limit"
  | "quota_exhausted"
  | "permission_denied"
  | "storage_error";

type UploadStatus =
  | "queued"
  | "uploading"
  | "processing"
  | "complete"
  | "failed"
  | "canceled"
  | "blocked_quota"
  | "blocked_size"
  | "blocked_type"
  | "blocked_permission";

type FileIndexingStatus =
  | "not_applicable"   // category not eligible (image, video)
  | "pending"          // eligible; queued
  | "indexed"          // text extracted and searchable
  | "failed"           // extraction failed; file remains stored
  | "unsupported"      // eligible category but content cannot be extracted
  | "plan_gated";      // user's plan does not include indexing

type FilePreviewStatus =
  | "pending"
  | "available"
  | "unavailable"
  | "failed"
  | "unsupported";

type SourcePlatform =
  | "web"
  | "desktop"
  | "ios_app"
  | "ios_share_sheet"
  | "android_app"
  | "android_share"
  | "browser_extension"
  | "import";

type PlanTier =
  | "free"
  | "paid";
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
| **Collection drop zone** | The collection list view's drop target for drag-and-drop uploads. |
| **Add menu** | The "+" button's menu, exposing "link" and "file" options. |
| **File picker (native)** | The host OS's file selection dialog. |
| **Upload progress overlay** | A panel showing per-file upload progress with success and failure states. |
| **Upload error toast / modal** | The user-facing surface for `file_invalid`, `file_size_limit`, and `quota_exhausted` errors. |
| **Quota usage indicator** | A persistent affordance (in settings or near the upload UI) showing month-to-date usage and next reset date. |
| **In-app PDF viewer** | Renders uploaded PDFs with text selection. |
| **In-app EPUB viewer** | Renders uploaded EPUBs with text selection. |
| **Image viewer** | Inline image display with zoom and pan. |
| **Video player** | Inline video player with transport controls. |
| **Markdown renderer** | Inline Markdown rendering with formatting applied. |
| **Plain-text renderer** | Inline monospaced text display. |
| **Direct-download affordance** | A button or menu item on a file-backed bookmark that triggers download of the original payload. |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| **Drop zone overlay** | Visual indication that a drop is welcome; appears when files are dragged over a collection. |
| **Per-file progress bar** | Shows upload percentage for one file in the upload-progress overlay. |
| **Per-file status badge** | Indicates pending / uploading / success / failed state for one file. |
| **Quota usage bar** | Visual representation of bytes used vs. limit. |
| **Quota warning banner** | Surfaced when the user is near or past the monthly quota. |
| **Upgrade-to-paid affordance** | Inline call-to-action when the user hits the free-tier limit. |
| **File type chip** | Small badge on a bookmark card indicating the file's type and extension. |
| **Download button** | Per-bookmark action for direct download. |
| **Cover thumbnail** | Image used as the bookmark cover; generated for image, video, PDF, EPUB uploads. |
| **In-PDF text selection toolbar** | Floating toolbar surfaced when text is selected inside the PDF viewer; integrates with **Highlights PRD**. |
| **In-EPUB text selection toolbar** | Same role for EPUBs. |

---

## 15. Workflow Requirements

| Operation | Required Behavior | Shared / Core Handling |
|---|---|---|
| **Create** | The system MUST allow uploading a supported file. The resulting record is a bookmark; subsequent bookmark-side rules apply. | Upload pipeline owned here; bookmark creation logic owned by **Bookmarks PRD**. |
| **Edit** | A user MAY edit the bookmark fields of a file-backed bookmark (title, description, tags, collection). The file payload itself MUST be immutable after upload. | Bookmark edits go through **Bookmarks PRD**; file payload immutability is enforced here. |
| **Delete** | Deleting a file-backed bookmark moves it to Trash. Permanent deletion MUST also remove the underlying file payload from storage. | Trash and permanent-delete lifecycle owned by **Bookmarks PRD**; storage cleanup owned here. |
| **Search** | The system MUST surface file metadata (`name`, `size`, `type`) and, where indexed, file content through the universal search field. Detailed search behavior is owned by **Search & Filters PRD**. |

---

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|
| **Upload service** | Receives, validates, persists, and confirms file uploads. |
| **Bookmark wrapper service** | Creates the wrapping bookmark record after a successful upload. |
| **Type classifier** | Maps extensions to bookmark `type`. |
| **Quota service** | Tracks per-user month-to-date upload bytes and serializes concurrent checks. |
| **Storage gateway** | Reads, writes, and reclaims file payloads on the durable storage backend. |
| **Authenticated download service** | Streams file payloads to authenticated callers. |
| **Permission guard** | Enforces shared-collection access on upload and download. |
| **Plan-tier resolver** | Determines the user's per-file and monthly limits. |
| **Content indexing pipeline** | Asynchronously indexes file content for search (plan-gated). |
| **Storage reclamation worker** | Removes payloads when bookmarks are permanently deleted. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| **(none directly)** | The extension is not a primary file-upload surface in this PRD. Saving a page that links to a file MUST create a link bookmark, not a file upload, per **Browser Extension / Mobile Capture PRD**. |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| **Drop zone component** | Detects drag events on collections and routes accepted drops to the upload service. |
| **Add menu component** | The "+" button's menu, including the "file" picker entry point. |
| **Upload progress overlay component** | Renders per-file progress and final state for a multi-file upload. |
| **Quota usage component** | Renders the user's month-to-date usage and next reset date. |
| **In-app PDF viewer component** | Renders PDF uploads with text selection. |
| **In-app EPUB viewer component** | Renders EPUB uploads with text selection. |
| **Markdown renderer component** | Renders `.md` files with formatting and HTML sanitization. |
| **Plain-text renderer component** | Renders `.txt` files in a monospaced viewer. |
| **Image viewer component** | Renders image-type bookmarks. |
| **Video player component** | Renders video-type bookmarks. |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| **iOS in-app PDF viewer** | Renders PDF uploads on iOS with text selection. |
| **iOS in-app EPUB viewer** | Renders EPUB uploads on iOS with text selection. |
| **iOS image / video / Markdown / text renderers** | Mobile equivalents of the web components. |
| **Android in-app PDF viewer** | Renders PDF uploads on Android with text selection. |
| **Android in-app EPUB viewer** | Renders EPUB uploads on Android with text selection. |
| **Android image / video / Markdown / text renderers** | Mobile equivalents of the web components. |
| **Mobile camera / photo-library upload flow (Planned)** | Surface for capturing or picking files on mobile (F39 🔵 Planned). |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| **Durable file storage** | The backend that holds file payloads. |
| **CDN / hosted-URL serving** | The path through which `link` URLs resolve. |
| **Thumbnail / preview generation pipeline** | Asynchronously generates covers for image, video, PDF, EPUB uploads. |
| **Search index integration** | Pushes indexed file content into the search index (plan-gated). |
| **Quota counter store** | Persistent per-user month-to-date counters. |
| **Plan-tier policy** | Centralized definition of per-file and monthly limits per plan. |
| **Observability module** | Logs upload failures, quota refusals, validation rejections, and storage errors. |

---

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| **Upload validator** | Validates extension, MIME type, byte size, and per-plan limits at request time. |
| **Multipart upload handler** | Accepts the file payload as a streaming multipart upload and writes it to durable storage. |
| **Storage backend client** | Uploads, retrieves, and reclaims file payloads on the durable storage backend. |
| **Hosted-URL allocator** | Generates the canonical `link` URL for each uploaded file. |
| **Type classifier** | Maps file extensions to `image` / `video` / `document` / `book`. |
| **Bookmark wrapper service** | Creates the wrapping bookmark record after a successful upload. |
| **Thumbnail generator** | Generates a cover image for image, video, PDF, and EPUB uploads asynchronously. |
| **Quota tracker** | Maintains per-user month-to-date upload-bytes counters and serializes concurrent quota checks. |
| **Quota reset scheduler** | Resets quota counters at the user's billing cycle. |
| **Error standardizer** | Emits the standardized error codes (`no_file`, `file_invalid`, `file_size_limit`, `quota_exhausted`, `permission_denied`, `storage_error`). |
| **Plan-tier resolver** | Determines the user's current per-file size limit and monthly quota. |
| **PDF viewer (in-app)** | Renders uploaded PDFs with text selection; integrates with **Highlights PRD**. |
| **EPUB viewer (in-app)** | Renders uploaded EPUBs with text selection; integrates with **Highlights PRD**. |
| **Markdown renderer** | Renders `.md` files with formatting and HTML sanitization. |
| **Plain-text renderer** | Renders `.txt` files in a monospaced viewer. |
| **Image viewer** | Renders image-type bookmarks at full resolution with zoom and pan. |
| **Video player** | Renders video-type bookmarks with transport controls. |
| **Content indexing pipeline** | Asynchronously indexes PDF, EPUB, Markdown, and plain-text content (plan-gated) for search. |
| **Storage reclamation worker** | Removes file payloads when their bookmarks are permanently deleted. |
| **Authenticated download gateway** | Streams file payloads to authenticated requests, enforcing access rules. |
| **Permission guard** | Enforces shared-collection access rules on upload and download. |
| **ZIP export worker** | Packages selected / collection-scoped / library-wide original file binaries into a downloadable ZIP archive. |
| **Mobile share-intake service** | Receives a file from the host OS share sheet and copies it into durable storage before the source app's shared reference expires. |
| **Status transition coordinator** | Advances `file.uploadStatus`, `file.indexingStatus`, and `file.previewStatus` through their state machines and exposes the values to the UI. |
| **Checksum computer** | Computes a content hash of the binary payload (for `file.checksum`); used for integrity checks and future deduplication. |
| **Observability module** | Logs upload failures, quota refusals, validation rejections, and storage errors. |

---

## 19. OSS / Build-vs-Buy Decision

1. **Two paradigms, one data model.** The Files capability operates in two distinct modes that must coexist under the same bookmark entity. Paradigm 1 (External Cloud Sync): files live in OneDrive, Google Drive, or Dropbox; Plenix abstracts each provider's API, mirrors metadata, and streams payloads on demand via OAuth2 — "link, do not duplicate." Paradigm 2 (Native Self-Hosted Storage): files are created or uploaded directly into Plenix; Plenix is the storage. Both paradigms produce a `FileBookmark` with the same field shape; the only difference is whether `file.storageKey` points to Plenix-owned storage or to a provider-proxied reference. Study Rclone (MIT) for Paradigm 1 provider abstraction patterns and Nextcloud Files (AGPL, self-hosted) for Paradigm 2 sync client architecture. Neither is embedded; both are reference implementations.

2. **Rclone (MIT — reference only) as the map for cloud-provider abstraction.** Rclone supports 70+ cloud backends behind a single CLI/API surface. Use it as an architectural reference when designing Plenix's provider-abstraction layer for Paradigm 1: how it normalizes list, read, write, and delete operations across S3, GCS, Azure Blob, OneDrive, Google Drive, Dropbox, and dozens of others is directly applicable. Rclone's MIT license means its source can be read and referenced without obligation. Do not embed the Rclone binary or link its library into the Plenix server process — call it as a subprocess or reimplement the patterns natively to avoid introducing a large transitive dependency surface.

3. **Alist (AGPL — reference only, not embedded).** Alist mounts distributed cloud drives into a single unified web-based file view and supports WebDAV passthrough. Study it for the Paradigm 1 unified-presentation layer: how it federates multiple cloud accounts into one browsable namespace, handles authentication per provider, and exposes a WebDAV endpoint. AGPL license: because Alist is AGPL, embedding or distributing a modified version would require open-sourcing the combined work. Use it as a reference and design inspiration only; re-implement the interface patterns natively inside Plenix.

4. **Nextcloud Files (AGPL — self-hosted reference) for Paradigm 2 sync architecture.** Nextcloud is the primary reference for the native-storage paradigm: desktop and mobile sync clients, WebDAV server, sharing permissions, public links, and chunked upload. Study its chunked upload protocol (NCCO / TUS-compatible), conflict resolution strategy, and its permission model (owner, editor, viewer) for direct mapping to Plenix's `access.level` tiers. Nextcloud's AGPL license applies to the Nextcloud source itself; Plenix builds a clean-room implementation informed by its design, not a fork.

5. **Syncthing (MPL 2.0 — reference) for P2P sync and conflict resolution.** Syncthing implements bi-directional sync with block-level change tracking, conflict resolution, and a distributed discovery/relay network — all without a central server in its default mode. Reference it for Paradigm 2 sync client architecture: block-level diffing to minimize transfer size, the conflict-renaming strategy (append `.sync-conflict-` suffix rather than silently overwriting), and the event bus that notifies clients of remote changes. MPL 2.0 is file-scoped copyleft: files taken directly from Syncthing require MPL 2.0 disclosure; clean-room implementations of its protocols do not. Do not embed the Syncthing binary; Plenix builds its own sync daemon using Syncthing's design as a blueprint.

6. **Seafile (AGPL — reference) for lean sync patterns.** Seafile is a faster, leaner alternative to Nextcloud with a custom binary protocol that minimizes overhead for large libraries. Study it for performance-sensitive Paradigm 2 paths: its block-deduplication approach (content-addressed chunks), differential sync, and the separation of metadata store from block store. Like Nextcloud, Seafile is AGPL — reference the architecture, do not fork or redistribute.

7. **WebDAV endpoint is a first-class integration surface.** Both Nextcloud and Alist expose WebDAV, making the protocol the de-facto interoperability standard for self-hosted file storage. Plenix MUST expose a WebDAV endpoint so that any WebDAV-compatible client (desktop sync tools, iOS Files app, third-party apps) can access Plenix-hosted files without a custom client. Design the WebDAV layer as a thin translation shim over the internal storage gateway; do not make it the primary storage path.

8. **OAuth2 token lifecycle is the critical fragility point for Paradigm 1.** External provider integrations (Google Drive, OneDrive, Dropbox) are entirely dependent on OAuth2 access and refresh tokens. Tokens expire, scopes get revoked, and providers change their API surface without notice. Build a token-refresh loop with exponential backoff, surface provider-disconnection errors clearly to the user, and degrade gracefully (show cached metadata, block new uploads to that provider) rather than failing silently. This is the primary operational fragility risk for Paradigm 1.

9. **No data leaves Plenix infrastructure.** Both paradigms operate on Plenix-controlled servers. For Paradigm 1, Plenix proxies provider API calls server-side; file bytes are fetched from OneDrive/Google Drive/Dropbox through the Plenix backend and served to the Plenix client — they are never passed through the user's browser directly to a third-party CDN in a way that bypasses Plenix access controls. This is a security and compliance requirement, not just an architectural preference.

10. **License classification summary and embed/defer decision.** Rclone (MIT): reference — read source, reimplement patterns, do not embed. Alist (AGPL): reference — design inspiration only, do not embed or distribute modified versions. Nextcloud Files (AGPL): self-hosted reference — study protocol and permission model, build clean-room implementation. Syncthing (MPL 2.0): reference — study block-level sync and conflict resolution, do not embed binary. Seafile (AGPL): reference — study deduplication and differential sync, do not fork. Plenix builds natively: the upload pipeline, quota enforcement, bookmark wrapper, WebDAV endpoint, authenticated download gateway, storage reclamation worker, and the Paradigm 1 provider-abstraction layer. Plenix defers to a managed service: object storage (S3-compatible or equivalent) for the underlying blob store in Paradigm 2.

11. **E2EE is architecturally deferred.** The current PRD does not specify end-to-end encryption of file payloads. Nextcloud and Syncthing both support client-side E2EE (encrypting before bytes leave the device). If E2EE is added in a future iteration, it fundamentally changes server-side content indexing (encrypted bytes cannot be indexed), thumbnail generation (encrypted bytes cannot be decoded server-side), and Paradigm 1 streaming (the proxy cannot re-encrypt on the fly without the user's key). Flag this as a design fork point before committing to an encryption architecture.

12. **Platform fragility warning for Paradigm 1 provider integrations.** Cloud storage providers (Google Drive, OneDrive, Dropbox) have historically changed API rate limits, authentication flows, and data-export policies with short notice. Treat each provider integration as a fragile external dependency: isolate provider-specific adapter code behind a clean interface so a single provider's breaking change does not destabilize the others, monitor API deprecation announcements as a routine operational task, and communicate provider-outage degradation clearly to users rather than surfacing it as a Plenix bug.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| **Bookmarks PRD** | An uploaded file becomes a bookmark in the user's library. This PRD owns the upload pipeline; the resulting record is a bookmark and follows Bookmarks PRD rules for lifecycle, identity, sharing, and core operations. |
| **Collections PRD** | Files are uploaded into a destination collection (or default to Unsorted). Collection scope, access rules, and capacity rules from Collections PRD apply. |
| **User / Account** | Monthly upload quotas and per-file size limits depend on the user's plan tier and billing cycle. |
| **Web archive PRD** | When a file is opened inside the application's reader, the file content is the equivalent of the bookmark's archived copy. Some search behaviors that key on `cache.status` apply equivalently to file-backed bookmarks. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| **Highlights PRD** | Highlights inside uploaded PDF and EPUB files require this capability's in-app viewer for text selection and rendering. |
| **Search & Filters PRD** | The Files filter (`file:true`), the Document and Book content-type filters, and PDF / EPUB content search depend on file metadata and indexing surfaces this capability owns. |
| **Reader / Articles PRD** | The reader surface for files (PDF, EPUB) is a specialization of the broader reader surface; this PRD defines the file-specific behavior. |
| **Import / Export / Backup PRD** | Normal account backups MUST NOT include uploaded file binaries — backups carry bookmark metadata only. A separate file-export workflow (e.g. ZIP archive of original files) is owned by Import / Export / Backup PRD; this capability provides the file payloads it serializes. |
| **Sharing / Collaboration PRD** | Shared collections include uploaded files; access-level rules apply to file viewing and download. |

### Related Capabilities

| Capability | Relationship |
|---|---|
| **Bookmarks PRD** | Owns the bookmark entity. This PRD owns the upload pipeline and the file-specific fields (`file.name`, `file.size`, `type` classification). |
| **Highlights PRD** | Owns highlight identity and lifecycle. This PRD owns the file viewer surface that hosts in-PDF and in-EPUB highlight selection. |
| **Reader / Articles PRD** | Owns the HTML reader; this PRD owns the PDF and EPUB viewers as specializations. |
| **Web archive PRD** | Owns the saved-copy lifecycle for HTML pages; this PRD owns the equivalent role for uploaded files. |

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
| Quota reset cadence | 🟠 Product Decision | Whether the monthly reset day is the user's signup day, the calendar first-of-month, or another rule. Recommendation: user's billing-cycle anniversary day. |
| Collaborator quota attribution | 🟠 Product Decision | When a collaborator uploads to a shared collection, whose monthly quota the upload counts against. Recommendation: the uploading user. |
| Audio file uploads (`mp3`, `wav`, `m4a`, `ogg`) | 🔴 Not Defined | Whether to extend the supported set. The current set has no audio category. |
| Mobile camera / photo-library upload | 🔵 Planned | A first-class mobile upload flow distinct from the share-sheet flow. |
| File replacement in place | 🔴 Not Defined | Whether a file payload can be swapped while keeping the same bookmark identity. Conflicts with payload-immutability invariant 12 unless explicit. |
| File hash and deduplication | 🔴 Not Defined | Whether the system computes a content hash and offers deduplication of uploaded files. |
| OCR for scanned PDFs | 🔴 Not Defined | Whether scanned-image PDFs are passed through OCR before content indexing. |
| File versioning | 🔴 Not Defined | Whether multiple versions of the same logical file can coexist on one bookmark. |
| Direct-download enforcement of access level | 🟠 Product Decision | Whether the hosted file URL itself is access-controlled or whether it is reachable to anyone with the URL. Recommendation: signed URLs with short expiry, regenerated on each authenticated download. |
| Public-page exposure of file payload vs. bookmark page | 🟠 Product Decision | When a collection is public, whether a file-backed bookmark exposes the underlying file URL to anonymous viewers, only the bookmark page, or neither. Coordinate with **Public Page / Embed PRD**. |
| Behavior when a user downgrades and is over the new tier's storage | ✅ Decided | Existing files MUST remain accessible; new uploads MUST be subject to the new tier's limits. |
| Behavior when monthly quota is reached | ✅ Decided | New uploads refused with `quota_exhausted`; existing files remain accessible until next reset. |
| Quota counter on delete | ✅ Decided | MUST NOT decrement; quota is a per-month upload counter, not a current-storage counter. |
| File payload immutability | ✅ Decided | Immutable after upload; replace = new bookmark. |
| Supported format set | ✅ Decided | Images: jpeg/jpg/gif/png/webp/heic. Videos: mp4/mov/wmv/webm. Books: epub. Documents: pdf/md/txt. |
| Per-file size limits | ✅ Decided | Free 100 MB; Paid 300 MB. |
| Monthly upload quotas | ✅ Decided | Free 100 MB; Paid 10 GB. |
| Auto-classification rules | ✅ Decided | Deterministic from extension; the user MAY override the bookmark's `type` field. |
| Browser-native PDF viewer for in-app highlights | ✅ Decided | Not supported. |
| OCR on images | ✅ Decided | Not supported (mirrors **Search & Filters PRD**). |
| Audio / video transcript indexing | ✅ Decided | Not supported (mirrors **Search & Filters PRD**). |
| Standardized upload error codes | ✅ Decided | `no_file`, `file_invalid`, `file_size_limit`, `quota_exhausted`, `permission_denied`, `storage_error`. |
| Normal account backups include uploaded files | ✅ Decided | No — backups carry bookmark metadata only. Uploaded file binaries are retrieved via the separate file-export workflow (F41). |
| Bulk file ZIP export | ✅ Decided | The system MUST provide a separate ZIP-export workflow for original uploaded file binaries; scope rules owned by **Import / Export / Backup PRD**. |

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
