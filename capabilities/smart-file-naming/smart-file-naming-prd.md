# Smart File Naming PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Smart File Naming |
| **Capability ID** | smart_file_naming |
| **Status** | Draft |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Full canonical specification — all 13 PRD sections documented |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST allow users to receive intelligent, context-aware file name suggestions for any file entering the platform — whether uploaded, captured, dragged in, shared from mobile, or imported — and MUST provide three distinct naming modes (template-based, metadata + AI template matching, and full AI) so users can choose their preferred balance between control and automation. The user MUST always have final say over the suggested name.

### Purpose

The problem is that users often save files quickly with weak names like:

- `Document1.pdf`
- `IMG_4891.png`
- `Screenshot 2025-03-02.png`
- `final_v3_REAL_final.docx`

Later, the file becomes hard to find because the filename does not describe the content, project, person, source, or purpose.

{APP_NAME} changes the saving experience. Instead of forcing the user to manually invent a filename, the system proposes a meaningful name based on the file's content and metadata.

### Core Principle

The file itself still exists physically on local disk, OneDrive (later Google Drive, later Dropbox). But {APP_NAME} adds an intelligent metadata layer around the file. The filename is not treated as the only source of organization — the filename becomes one visible part of a larger metadata system.

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

### UC-01 — Save a screenshot and get an intelligent name

| Item | Detail |
|---|---|
| **Actor** | User |
| **Goal** | Save a screenshot with a meaningful name instead of `Screenshot 2026-06-04.png`. |
| **Main Flow** | 1. User captures a screenshot via browser extension or desktop hotkey. 2. System receives the image. 3. System runs OCR on the image content. 4. System detects: company name "ABC Plumbing", document type "Estimate", reference number "#3021", date "2025-03-02". 5. System applies the user's default naming template. 6. System suggests: `2025-03-02_ABCPlumbing_Estimate_3021.png`. 7. User reviews and accepts. |
| **System Response** | File is saved with the suggested name. Original filename is stored in rename history. Both names are indexed for search. |
| **Alternate Flow** | If OCR returns no usable text, system falls back to AI summary of image content. If that also fails, system uses capture date + source + generic description. |

### UC-02 — Drag a PDF into a project and get a project-aware name

| Item | Detail |
|---|---|
| **Actor** | User |
| **Goal** | Add a downloaded PDF to a project and have the filename reflect the project context. |
| **Main Flow** | 1. User drags `download.pdf` into the "Kitchen Renovation" project. 2. System reads PDF content and AI-generates a summary: "Proposal from contractor for cabinet installation and plumbing modifications." 3. System detects project context: project name, linked contacts, category. 4. System suggests: `2025-03-02_KitchenReno_CabinetPlumbingProposal.pdf`. 5. User accepts. |
| **System Response** | File is linked to the project (not duplicated), renamed, and original name preserved in history. |
| **Alternate Flow** | If the user rejects the suggestion, the file keeps its original name. User can re-trigger naming later. |

### UC-03 — Bulk rename 50 screenshots from a project

| Item | Detail |
|---|---|
| **Actor** | Power user |
| **Goal** | Apply consistent naming to a batch of files captured during a project. |
| **Main Flow** | 1. User selects 50 screenshots in the project file view. 2. User chooses "Bulk Rename" and selects template `[Date]_[Project]_[DocType]_[Description]`. 3. System generates a preview showing the proposed name for each file. 4. User reviews, edits 3 names manually, and accepts. |
| **System Response** | All 50 files are renamed. Original names are stored in rename history. Activity feed shows the bulk operation. |
| **Alternate Flow** | If the system cannot determine meaningful content for some files, those rows show the original name with a "could not suggest" indicator. User can manually name them. |

### UC-04 — Re-trigger naming on an existing poorly named file

| Item | Detail |
|---|---|
| **Actor** | User |
| **Goal** | Fix a file that was saved months ago with a meaningless name. |
| **Main Flow** | 1. User opens file detail view for `IMG_4891.png`. 2. User clicks "Suggest Name." 3. System reads file content, metadata, project context, and tags. 4. System suggests: `2025-03-02_KitchenReno_ContractorQuote_ABCPlumbing.png`. 5. User accepts. |
| **System Response** | Display name is updated. Search indexes are updated. Original filename remains in history. |
| **Alternate Flow** | User edits the suggestion before accepting. The edited version becomes the current name. |

### UC-05 — Change default naming mode in Settings

| Item | Detail |
|---|---|
| **Actor** | User |
| **Goal** | Switch from template-based naming to full AI naming as the default. |
| **Main Flow** | 1. User opens Settings > File Naming. 2. User changes default mode from "Metadata + AI Template" to "Full AI." 3. User saves. |
| **System Response** | All future file captures use Full AI naming by default. Existing files are not affected. |
| **Alternate Flow** | User can override the default on any individual file at capture time. |

### UC-06 — Create a custom naming template

| Item | Detail |
|---|---|
| **Actor** | Power user |
| **Goal** | Define a naming convention specific to their workflow. |
| **Main Flow** | 1. User opens Settings > File Naming > Templates. 2. User clicks "New Template." 3. User builds: `[Date]_[Client]_[DocType]_[RefNumber]`. 4. User names the template "Client Invoices." 5. User saves. |
| **System Response** | Template is available in the template picker for manual application and for the AI template-matching engine. |
| **Alternate Flow** | If the template uses tokens the system cannot populate for a given file, those tokens are omitted or replaced with a placeholder. |

### UC-07 — Detect duplicate content at save time

| Item | Detail |
|---|---|
| **Actor** | User |
| **Goal** | Avoid saving the same content twice. |
| **Main Flow** | 1. User captures a webpage via browser extension. 2. System normalizes the URL and checks against existing saved items. 3. System finds a match saved 3 weeks ago in a different project. 4. System shows: "You already saved this URL on May 14 in Project X." 5. User chooses to link to existing item instead of creating a duplicate. |
| **System Response** | No new file is created. The existing item is linked to the current project. |
| **Alternate Flow** | User chooses to save anyway. A new item is created. Both items are flagged as potential duplicates. |

### UC-08 — OCR detects invoice details from a screenshot

| Item | Detail |
|---|---|
| **Actor** | User |
| **Goal** | Save a screenshot of an invoice and have the system extract meaningful naming data. |
| **Main Flow** | 1. User screenshots an invoice on screen. 2. System runs OCR. 3. OCR extracts: "ABC Plumbing Estimate #3021", date, amounts. 4. System infers: Company = ABC Plumbing, DocType = Estimate, RefNumber = 3021. 5. System suggests: `2025-03-02_ABCPlumbing_Estimate_3021.png`. 6. User accepts. |
| **System Response** | File saved with structured name. Entities stored in metadata for search and filtering. |
| **Alternate Flow** | If OCR text is low quality or garbage, system falls back to AI summary or capture metadata only. |

---

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

Value-added behavior beyond Create, Edit, Delete, and Search.

Source feature area(s): Smart File Naming

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **Template-based naming (Mode 1)** | 🔵 Planned | The most controlled option. The user defines or selects a naming pattern using field tokens such as [Date]_[Project]_[Type]_[Description]. The system applies the pattern to produce a structured filename. Possible template fields include: Date, Project, Client, Contact, Company, Document type, Category, Source, Short description, Version, Status, File type. Best for power users who want consistency and control. |
| F02 | **Metadata + AI template matching (Mode 2)** | 🔵 Planned | The preferred smart default. The system reads the file and its metadata, then chooses the best naming template automatically. Example: user saves a screenshot, the system detects Project: Kitchen Renovation, Content: contractor quote, Company: ABC Plumbing, Date: March 2 2025, File type: PNG — then applies the best template and suggests 2025-03-02_KitchenReno_ContractorQuote_ABCPlumbing.png. This mode balances structure with intelligence — it still follows organized naming patterns, not random AI output. |
| F03 | **Full AI naming (Mode 3)** | 🔵 Planned | The most automated option. No template is required. AI analyzes the content and generates a meaningful file name from scratch. Example: ABCPlumbing_KitchenRenovation_QuoteForSinkAndCabinetWork_2025-03-02.pdf. Best for users who do not want to manage naming patterns manually. The user can still accept, edit, or override the result. |
| F04 | **User control — accept, edit, reject** | 🔵 Planned | The user always has final control. When the system suggests a name, the user can: accept it, edit it, reject it, choose another naming mode, set a default naming mode, or apply naming rules in bulk. Default behavior is configurable: always use metadata+AI template matching, always ask before renaming, auto-name screenshots, auto-name downloaded PDFs, use a project-specific naming template. |
| F05 | **Project context enrichment** | 🔵 Planned | File naming becomes smarter when the file is connected to a Project Home. A file inside a project can inherit: project name, project category, project contacts, project status, project tags, related notes, and (later) related tasks and messages. This makes the filename more meaningful without the user manually typing everything. |
| F06 | **OCR-driven naming** | 🔵 Planned | OCR is critical to the file naming system. For screenshots, PDFs, scanned documents, and images with text, the system extracts text and uses it to determine: document type, names, companies, dates, amounts, invoice numbers, quote numbers, addresses, event names, and topics. Example: a screenshot contains 'ABC Plumbing Estimate #3021' — the system infers Company: ABC Plumbing, Document type: Estimate, Reference number: 3021 and suggests 2025-03-02_ABCPlumbing_Estimate_3021.png. |
| F07 | **AI summary-driven naming** | 🔵 Planned | AI summarization helps when the file content is not obvious from the filename. Example: original file download.pdf, AI summary 'Proposal from contractor for kitchen cabinet installation and plumbing modifications', suggested filename KitchenRenovation_CabinetPlumbingProposal_2025-03-02.pdf. |
| F08 | **Contact and company detection** | 🔵 Planned | The system detects person and company names in file content and uses them in naming suggestions. Detected entities are cross-referenced against the Contacts module to use canonical names. |
| F09 | **Duplicate content detection at save time** | 🔵 Planned | The system detects if a URL, image, or file has already been saved. This is different from the link-don't-duplicate architecture. Two related ideas: (A) Architectural deduplication — the same file exists once and is linked many times. (B) Duplicate content detection — the system recognizes when the user is saving the same content again. Examples: 'You already saved this URL three weeks ago.' 'This image already exists in Project X.' 'This PDF appears to match an existing file.' Helps prevent clutter and repeated captures. |
| F10 | **Bulk rename** | 🔵 Planned | Power users need bulk control. Select multiple files and apply a naming template or AI rename to all of them in one operation. Example: select 50 screenshots from a project and apply [Date]_[Project]_[Type]_[ShortDescription]. A preview table shows original name to proposed name for each file before committing. |
| F11 | **Bulk retag, assign, move, export, metadata update** | 🔵 Planned | Beyond bulk rename, the system supports: bulk retag, bulk assign to project, bulk move/link, bulk delete, bulk export, and bulk metadata update — all from the same multi-select interface. |
| F12 | **Naming template library** | 🔵 Planned | Users can create, save, edit, and delete custom naming templates. The system provides at least 5 default templates: General, Invoice/Receipt, Screenshot, Project Document, Correspondence. Templates use field tokens like [Date], [Project], [Company], [DocType], [RefNumber], etc. |
| F13 | **Rename history and revert** | 🔵 Planned | The system stores the original filename and all previous names with timestamps and naming mode used. User can revert to any previous name. All names in history are indexed for search. |
| F14 | **Separator and case preferences** | 🔵 Planned | User can choose the separator character: underscore _ (default), hyphen -, period ., or space. Case normalization options: PascalCase (default), camelCase, lowercase, UPPERCASE, or original case. Date format configurable (default YYYY-MM-DD). |
| F15 | **Filename safety and length limits** | 🔵 Planned | Generated names are filesystem-safe: illegal characters replaced, 255-character max including extension, intelligent truncation preserving the most meaningful tokens, extension always preserved, no leading/trailing whitespace, consecutive separators collapsed. |
| F16 | **Naming suggestions on existing files** | 🔵 Planned | User can trigger a naming suggestion on any existing file at any time, not only at capture time. Useful for fixing files saved months ago with meaningless names. |

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Naming Mode Selection

| Rule | Behavior |
|---|---|
| Default mode | Metadata + AI Template Matching (Mode 2). |
| User override | User MUST be able to switch modes at any time: per file, per bulk operation, or globally in Settings. |
| Mode persistence | The selected default mode persists across sessions and devices. |
| Fallback chain | If the active mode cannot produce a suggestion (e.g., template mode but no matching template), the system SHOULD fall back to the next mode: Template → Metadata+AI → Full AI → original filename. |

### 5.2 Template Engine

| Rule | Behavior |
|---|---|
| Token syntax | `[TokenName]` enclosed in square brackets. |
| Supported tokens | `[Date]`, `[Year]`, `[Month]`, `[Day]`, `[Project]`, `[Client]`, `[Contact]`, `[Company]`, `[DocType]`, `[Category]`, `[Source]`, `[Description]`, `[Version]`, `[Status]`, `[Tags]`, `[RefNumber]`, `[FileType]`, `[OriginalName]`. |
| Separator | User-configurable: `_` (default), `-`, `.`, or ` `. Applied between tokens. |
| Missing token behavior | If a token cannot be populated, it MUST be omitted from the output (not rendered as `[Unknown]` or blank). Adjacent separators MUST be collapsed. |
| Date format | `YYYY-MM-DD` by default. User MAY configure alternate formats in Settings. |
| Case normalization | Generated names SHOULD use PascalCase for multi-word values (e.g., `KitchenReno`, `ABCPlumbing`). User MAY configure: PascalCase, camelCase, lowercase, UPPERCASE, or original case. |
| Default templates | The system MUST ship with at least 5 default templates covering common patterns: general, invoice/receipt, screenshot, project document, and correspondence. |
| Custom templates | Users can create, edit, duplicate, and delete custom templates. Custom templates are stored per user. |

### 5.3 Metadata + AI Template Matching (Mode 2)

| Rule | Behavior |
|---|---|
| Input sources | File content, OCR text, AI summary, file metadata (EXIF, PDF properties, etc.), project context, tags, contacts, capture source, location data. |
| Template selection | The AI evaluates available templates (default + custom) and selects the best match based on detected content type and available metadata. |
| Confidence threshold | If no template matches above a minimum confidence threshold, the system SHOULD fall back to Full AI (Mode 3). |
| Transparency | The system SHOULD indicate which template was selected and why. |

### 5.4 Full AI Naming (Mode 3)

| Rule | Behavior |
|---|---|
| Input sources | Same as Mode 2. |
| Output | A single suggested filename string, not constrained by any template structure. |
| Constraints | The generated name MUST be filesystem-safe, MUST NOT exceed 255 characters, and SHOULD be human-readable. |
| Style guidance | The AI SHOULD produce names following naming best practices: date-first or date-included, descriptive, no special characters, consistent casing. |

### 5.5 OCR Integration

| Rule | Behavior |
|---|---|
| Trigger | OCR runs automatically on images, screenshots, and scanned PDFs when they enter the system. |
| Entity extraction | The OCR pipeline MUST attempt to extract: names, company names, dates, amounts, reference/invoice/estimate/quote numbers, addresses, event names, and topics. |
| Naming input | Extracted entities are passed to the naming engine as structured metadata, not raw text. |
| Failure behavior | If OCR produces no usable text, the naming engine MUST proceed with other available inputs. |

### 5.6 AI Summary Integration

| Rule | Behavior |
|---|---|
| Trigger | AI summarization runs on file content after upload/capture. |
| Naming input | The short summary is the primary input. The naming engine extracts key nouns and descriptors. |
| Latency | If the AI summary is not yet available when the naming suggestion is requested, the system SHOULD generate a preliminary name from available metadata and offer to refine once the summary completes. |

### 5.7 Project Context Enrichment

| Rule | Behavior |
|---|---|
| Trigger | When a file is added to a project (at capture time or later). |
| Available context | Project name, project category, project tags, linked contacts, project status, related notes, related tasks (later), related messages (later). |
| Naming impact | Project context tokens (`[Project]`, `[Client]`, `[Category]`) are populated from the linked project. |
| Multiple projects | If the file belongs to multiple projects, the naming engine uses the project the file was most recently added to, or the project the user is currently viewing. |

### 5.8 Duplicate Content Detection

| Rule | Behavior |
|---|---|
| URL matching | Normalized URL comparison against all previously saved URLs. |
| Content hash matching | File hash (SHA-256 or equivalent) comparison against existing files when available. |
| Visual similarity | 🔴 Not Defined — image similarity matching is not in V1 scope. |
| User notification | When a match is found, the system MUST notify the user before creating a new item. |
| User choice | User can: link to existing item, save as new item anyway, or cancel. |
| Scope | Detection runs across the entire library, not scoped to current project. |

### 5.9 Filesystem Safety

| Rule | Behavior |
|---|---|
| Illegal characters | The system MUST replace characters illegal on any major filesystem: `\ / : * ? " < > |` and control characters. |
| Replacement | Illegal characters are replaced with the configured separator or removed. |
| Length limit | 255 characters maximum including extension. |
| Truncation | When truncation is needed, the system MUST preserve: the file extension, the date (if present), and the most meaningful descriptive tokens. Least-meaningful tokens are removed from the end. |
| Extension preservation | The file extension MUST always be preserved and MUST NOT be modified by the naming engine. |

### 5.10 Rename History

| Rule | Behavior |
|---|---|
| Storage | The system MUST store: original filename at upload/capture, each subsequent name change with timestamp and naming mode used. |
| Revert | User can revert to any previous name in the history. |
| Search indexing | All names in the history MUST be indexed for search. |
| Export | Original filename MUST be included in metadata exports. |

### 5.11 Bulk Operations

| Rule | Behavior |
|---|---|
| Selection | User selects multiple files via standard multi-select. |
| Actions available | Bulk rename (apply template or AI), bulk retag, bulk assign to project, bulk move/link, bulk delete, bulk export, bulk metadata update. |
| Preview | Bulk rename MUST show a preview table: original name → proposed name, per file. |
| Partial failure | If naming fails for some files, successful renames MUST still be applied. Failures are reported per file. |
| Undo | Bulk rename SHOULD support a single undo action that reverts all files in the batch. |

---

### System Constants

### 6.1 Smart File Naming Inputs

The system can use the following to suggest a filename:

- File content
- OCR text
- AI-generated summary
- Project name
- Linked contact
- Source URL
- Original capture date
- File type
- Tags
- Location data (if available)
- User-defined naming rules
- Existing naming templates
- Detected document type
- Detected people, companies, or subjects

### 6.2 Internal Service Capabilities

| System Capability | Requirement |
|---|---|
| Generate naming suggestion | System MUST accept file content, metadata, and context and return a suggested filename. |
| Apply naming template | System MUST apply a named template with token substitution and produce a filename string. |
| Match template to content | System MUST evaluate all available templates and select the best match for given file content/metadata. |
| Extract entities from OCR | System MUST parse OCR output and return structured entities (names, dates, companies, reference numbers, amounts, addresses, topics). |
| Validate filename | System MUST check generated names against filesystem safety rules and length limits. |
| Store rename history | System MUST record every name change with timestamp and mode. |
| Revert filename | System MUST restore any previous name from the history. |
| Bulk rename | System MUST process batch rename operations with preview and partial-failure handling. |
| Detect duplicate content | System MUST check URL, file hash, and normalized name against existing library. |

### 6.3 Response Conventions

| Item | Product Requirement |
|---|---|
| Suggestion response | System MUST return: suggested filename, naming mode used, confidence indicator (when available), template name (when Mode 2), and detected entities that contributed. |
| Failure response | System MUST return a structured error with reason (e.g., `no_content`, `ocr_failed`, `ai_unavailable`). |
| Bulk response | System MUST return per-file results: success with new name, or failure with reason. |

### 6.4 Error and Retry Rules

| Condition | System Meaning | Retry Rule |
|---|---|---|
| AI service unavailable | Cannot generate AI-based suggestion. | Fall back to template-based or original name. Retry when AI is available. |
| OCR failed | Cannot extract text from image/PDF. | Proceed with other inputs. Do not retry OCR unless user explicitly requests. |
| No usable content | File content is empty or unreadable. | Use capture metadata only (date, source, project). |
| Template not found | Referenced template was deleted. | Fall back to default template. |
| Filename collision | Suggested name matches an existing file. | Append a numeric suffix: `_1`, `_2`, etc. |

### 6.5 Naming Mode Constants

| Constant | Value | Description |
|---|---|---|
| `MODE_TEMPLATE` | `1` | Template-based naming. |
| `MODE_AI_TEMPLATE` | `2` | Metadata + AI template matching. Default. |
| `MODE_FULL_AI` | `3` | Full AI naming. |
| `DEFAULT_MODE` | `2` | System default. User-configurable. |
| `DEFAULT_SEPARATOR` | `_` | Underscore. User-configurable. |
| `MAX_FILENAME_LENGTH` | `255` | Filesystem maximum including extension. |
| `DEFAULT_DATE_FORMAT` | `YYYY-MM-DD` | ISO 8601 date. User-configurable. |
| `DEFAULT_CASE_STYLE` | `PascalCase` | Multi-word token casing. User-configurable. |

### 6.6 Default Templates

| Template Name | Pattern | Use Case |
|---|---|---|
| General | `[Date]_[Project]_[Description]` | Generic files added to a project. |
| Invoice / Receipt | `[Date]_[Company]_[DocType]_[RefNumber]` | Financial documents with reference numbers. |
| Screenshot | `[Date]_[Source]_[Description]` | Browser or desktop screenshots. |
| Project Document | `[Date]_[Project]_[DocType]_[Description]` | Documents associated with a specific project. |
| Correspondence | `[Date]_[Contact]_[DocType]_[Description]` | Emails, letters, and communications saved as files. |

---

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|
| User captures a screenshot with readable text | OCR extracts text; naming engine detects entities; suggests a structured name. |
| User captures a screenshot with no readable text | AI describes the image content; suggests a name based on visual description and capture context. |
| User drags `download.pdf` into a project | AI reads PDF content; project context enriches the suggestion; structured name proposed. |
| User saves a file with no project context | Naming engine uses file content, capture date, source, and tags only. Project tokens are omitted. |
| User has set Mode 1 (Template) as default | Template is applied. If tokens cannot be populated, they are omitted. |
| User has set Mode 3 (Full AI) as default | AI generates a name from scratch without template constraints. |
| Template tokens cannot be populated | Missing tokens are omitted. Adjacent separators are collapsed. No `[Unknown]` placeholders. |
| Suggested name exceeds 255 characters | System truncates by removing least-meaningful tokens from the end, preserving extension and date. |
| Suggested name contains illegal characters | Illegal characters are replaced with the separator or removed. |
| User rejects the suggested name | File keeps its original name. User can re-trigger later. |
| User edits the suggested name | The edited version becomes the current name. Original and suggestion are both in history. |
| User bulk renames 50 files | Preview shown. User can edit individual names. Partial failures reported per file. |
| AI service is offline | System falls back to template-based or original name. No error prevents the file from being saved. |
| OCR returns garbage text | Naming engine SHOULD detect low-confidence OCR and fall back to AI summary or metadata. |
| User reverts to a previous name | Current name is replaced. Reverted name appears as a new entry in rename history. |
| File is linked to multiple projects | Naming uses the most recently linked project or the project the user is currently viewing. |
| Duplicate URL detected at save time | User is notified: "You already saved this URL on [date] in [project]." User chooses to link or save new. |
| Duplicate file hash detected at save time | User is notified: "This file appears to match [existing file]." User chooses to link or save new. |
| User creates a naming template with all tokens | Template is saved. At apply time, only tokens with available data are rendered. |
| Imported files are bulk-renamed after import | User selects imported files, applies a template or AI rename, reviews preview, and commits. |
| User changes the default separator from `_` to `-` | All future suggestions use `-`. Existing names are not retroactively changed. |
| File has rich EXIF metadata (camera, GPS, date) | Naming engine uses EXIF data as additional input. |
| Scanned document contains invoice number and company | OCR extracts both; naming engine populates `[RefNumber]` and `[Company]` tokens. |
| User is offline | AI features are unavailable. Template-based naming works with available local metadata. |
| Physical file on disk / cloud is renamed | 🟠 Product Decision — whether physical rename syncs or only display name changes. |
| Screenshot contains "ABC Plumbing Estimate #3021" | OCR extracts company, doc type, ref number → `2025-03-02_ABCPlumbing_Estimate_3021.png`. |

---

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|
| `naming.currentName` | string | System | Max 255 characters. Filesystem-safe. | The active display name. |
| `naming.originalName` | string | System | Preserved from upload/capture. | Never modified after initial capture. |
| `naming.history` | array | System | Array of `NamingHistoryEntry` objects. | Ordered chronologically. |
| `naming.mode` | enum | Optional | `template` \| `ai_template` \| `full_ai` \| `manual`. | Mode used for the current name. |
| `naming.templateId` | string | Optional | References a saved template. | Populated when Mode 1 or 2 was used. |
| `naming.confidence` | number | Optional | `0.0` – `1.0`. | AI confidence in the suggestion. |
| `naming.detectedEntities` | object | Optional | Structured entities from OCR/AI. | Companies, people, dates, reference numbers, topics. |
| `userSettings.naming.defaultMode` | enum | Optional | `template` \| `ai_template` \| `full_ai`. Default: `ai_template`. | User's preferred naming mode. |
| `userSettings.naming.separator` | string | Optional | `_` \| `-` \| `.` \| ` `. Default: `_`. | Separator between tokens. |
| `userSettings.naming.dateFormat` | string | Optional | Default: `YYYY-MM-DD`. | Date formatting pattern. |
| `userSettings.naming.caseStyle` | enum | Optional | `PascalCase` \| `camelCase` \| `lowercase` \| `UPPERCASE` \| `original`. Default: `PascalCase`. | Token casing rule. |
| `userSettings.naming.autoNameWithoutPrompt` | boolean | Optional | Default: `false`. | 🟠 Product Decision. |

## 12. Database / Schema Notes

### Enums

```ts
type NamingMode =
  | "template"
  | "ai_template"
  | "full_ai"
  | "manual";

type SeparatorStyle = "_" | "-" | "." | " ";

type CaseStyle =
  | "PascalCase"
  | "camelCase"
  | "lowercase"
  | "UPPERCASE"
  | "original";

type NamingErrorCode =
  | "no_content"
  | "ocr_failed"
  | "ai_unavailable"
  | "template_not_found"
  | "filename_collision"
  | "filesystem_unsafe"
  | "length_exceeded";

type TemplateToken =
  | "Date" | "Year" | "Month" | "Day"
  | "Project" | "Client" | "Contact" | "Company"
  | "DocType" | "Category" | "Source" | "Description"
  | "Version" | "Status" | "Tags" | "RefNumber"
  | "FileType" | "OriginalName";
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
| **Naming Suggestion Dialog** | Shown when a file enters the system. Displays suggested name, mode indicator, detected entities, accept/edit/reject controls. |
| **Bulk Rename Preview** | Table view: original name → proposed name for each selected file. Inline edit per row. Accept all / cancel. |
| **Settings > File Naming** | Default mode picker, separator preference, date format, case style, auto-name toggles, template library management. |
| **File Detail > Naming Section** | Shows current name, original name, rename history, re-trigger suggestion button, revert controls. |

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|
| **Name Suggestion Bar** | Inline bar showing the suggested name with accept (checkmark), edit (pencil), and reject (×) buttons. |
| **Template Builder** | Visual editor for creating naming templates with drag-and-drop token ordering and live preview. |
| **Template Picker** | Dropdown or modal for selecting a template to apply. |
| **Detected Entities Panel** | Shows what the system detected (company, date, doc type, etc.) that contributed to the name suggestion. |
| **Rename History List** | Chronological list of all previous names for a file, with revert button per entry. |
| **Mode Switcher** | Segmented control: Template / AI+Template / Full AI. Shown in suggestion dialog and settings. |
| **Confidence Indicator** | Visual indicator showing naming confidence. |
| **Separator Preview** | Live preview in settings showing how the selected separator and case style affect a sample filename. |

---

## 15. Workflow Requirements

| Operation | Required Behavior | Shared/Core Handling |
|---|---|---|
| **Create** | Generate a naming suggestion when a file enters the system. The suggestion MUST be presented before or immediately after the file is saved. | Triggered by file upload, capture, import, or drag-and-drop flows. |
| **Edit** | User can accept, modify, or reject any suggested name. User can re-trigger naming suggestion at any time on any existing file. | Standard inline edit on file detail view. |
| **Delete** | User can revert to the original filename at any time. Reverting clears the suggested name and restores `file.name` to the original value. | Revert action on file detail view. |
| **Search** | Files MUST be searchable by both original filename and current/suggested filename. Both values MUST be indexed. | Handled by shared search engine. |

---

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|
| **Naming Engine Module** | Core naming logic: mode selection, template application, token substitution, AI integration, fallback chain. |
| **Template Engine Module** | Template CRUD, token parsing, pattern validation, default templates. |
| **Entity Extraction Module** | Parse OCR output and document text into structured entities. |
| **Rename History Module** | Store and retrieve naming history per file. |
| **Duplicate Detection Module** | URL normalization, hash comparison, match notification. |
| **Filesystem Safety Module** | Validate and sanitize filenames across platforms. |
| **Bulk Rename Module** | Batch processing, preview generation, per-file result tracking, undo. |
| **Naming Preference Module** | User settings for default mode, separator, date format, case style. |

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|
| Not applicable. | File naming is triggered server-side after capture; the browser extension sends capture context (URL, tab title, selected text) which feeds the naming engine. |

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|
| **Naming Suggestion UI Module** | Render suggestion dialog, accept/edit/reject flow, mode switcher. |
| **Bulk Rename UI Module** | Render preview table, inline editing, batch commit. |
| **Template Builder UI Module** | Visual template editor with token palette and live preview. |
| **Naming Settings UI Module** | Settings panel for naming preferences and template management. |
| **File Detail Naming UI Module** | Display naming section in file detail: current name, history, re-trigger, revert. |

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|
| **Mobile Naming Dialog Module** | Simplified suggestion UI for mobile share-sheet captures. Accept / edit / dismiss. |

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|
| **OCR Service** | Text extraction from images and PDFs. Shared with other capabilities. |
| **AI Summarization Service** | Content summarization. Shared with other capabilities. |
| **Search Index Service** | Index updates on rename. Shared with other capabilities. |
| **Project Context Service** | Resolve project context for a given file. Shared with other capabilities. |

---

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|
| **OCR pipeline** | Extract text from images, screenshots, and scanned PDFs to feed entity extraction. |
| **Entity extraction service** | Parse OCR and document text to identify structured entities: names, companies, dates, amounts, reference numbers, topics, document types. |
| **AI summarization service** | Generate short summaries that the naming engine uses when OCR and metadata are insufficient. |
| **AI content description service** | Describe visual content for images/videos with no extractable text. |
| **Template engine** | Token parser, substitution logic, separator handling, case normalization, and missing-token omission. |
| **AI template matching model** | Evaluate available templates against detected content/metadata and select the best fit. |
| **Full AI naming model** | Generate human-readable, filesystem-safe filenames from raw content and context. |
| **Rename history store** | Append-only log per file tracking every name change with timestamp, mode, and actor. |
| **Filesystem safety validator** | Check and sanitize filenames against cross-platform filesystem rules. |
| **Duplicate content detector** | URL normalization, file hashing (SHA-256), and match lookup against existing library. |
| **Search index updater** | Update search indexes when a file is renamed to include both original and new names. |
| **Naming preference store** | Persist user settings: default mode, separator, date format, case style, per-file-type rules. |
| **Template library store** | CRUD operations for user-created naming templates, plus immutable default templates. |
| **Bulk operation processor** | Batch rename with preview, per-file success/failure, and undo support. |
| **Confidence scorer** | Estimate and surface the naming engine's confidence in each suggestion. |
| **Project context resolver** | Given a file, resolve the most relevant project and extract project name, category, contacts, tags. |
| **Contact cross-reference** | Match detected person/company names against the Contacts module. |

---

## 19. OSS / Build-vs-Buy Decision

1. The naming engine is a **cross-cutting service**, not a standalone module. It hooks into every file entry point: upload, capture, import, drag-and-drop, mobile share. Architect it as a service called by those flows, not as a separate screen.
2. **Naming MUST NEVER block file saving.** If the AI is slow, the file saves with its original name and the suggestion arrives asynchronously. The user is notified when a suggestion is ready.
3. **Template tokens are the contract** between the template engine and the entity extraction pipeline. Adding a new token requires both sides to agree. Document the token contract explicitly.
4. **OCR quality varies wildly.** Screenshots of clean text produce excellent results. Photos of handwritten notes produce garbage. The naming engine MUST handle low-quality OCR gracefully — fall back, don't suggest garbage names.
5. **Mode 2 (Metadata + AI Template Matching) is the sweet spot.** It gives structure (via templates) with intelligence (via AI selection). Default to this and let power users choose Mode 1 for control or Mode 3 for maximum automation.
6. **Rename history is cheap insurance.** An append-only history log with revert is trivial to implement and prevents panic when users rename files and change their minds.
7. **Physical file rename is the hardest decision.** Display-only rename is safe but creates a disconnect between platform and file system. Recommend: display-only by default, physical rename as explicit "Sync name to disk" action.
8. **Duplicate detection at naming time is a natural fit.** The system is already analyzing the file — checking for duplicates adds minimal cost. Keep the UX non-blocking: notify, don't prevent.
9. **Bulk rename is a power-user feature.** Design the UI for 5–50 files, not 5000. If someone needs to rename thousands of files, that's a background job with email notification.
10. **Search indexing both names is critical.** A user who renamed `IMG_4891.png` to `KitchenReno_ContractorQuote.png` might search for either. Both must return results.
11. **Test with real-world filenames.** `download.pdf`, `image.png`, `Screenshot 2026-06-04 at 10.32.45 AM.png`, `final_v3_REAL_final.docx`, `新文档.pdf`, and names with emoji.
12. **This is one of the platform's signature differentiators.** It directly addresses the founding vision's file naming problem. Invest in quality — a bad auto-name is worse than no auto-name.

### OSS Reference Stack

#### Document Pipeline Reference Tools

| Tool | License | Usage Classification | Notes |
|---|---|---|---|
| **Paperless-ngx** | GPL v3 | Reference only (self-hosted) | Document archive and OCR metadata model. 42k stars. Reference architecture for document ingestion workflow. Do NOT embed — GPL contamination risk. Study the ingestion pipeline and metadata schema design only. |
| **paperless-gpt** | MIT | Embed candidate | LLM Vision for automated document title and tag generation. 2.4k stars. MIT — can be embedded. Use as a reference pattern for how LLM vision is applied to document classification and title suggestion. |
| **paperless-ai** | MIT | Embed candidate | AI document analysis — classification, smart tagging, semantic search. 5.7k stars. MIT — can be embedded. Study its classification and semantic search patterns as a reference for entity extraction pipeline design. |

#### OCR Stack

| Tool | License | Usage Classification | Notes |
|---|---|---|---|
| **PaddleOCR** | Apache 2.0 | Embed | General OCR — images, screenshots, multilingual (100+ languages). 76k stars. Fastest and most accurate general-purpose OCR. Primary candidate for screenshot and image ingestion. |
| **Tesseract** | Apache 2.0 | Embed | Classic OCR engine used by OCRmyPDF. 73k stars. Stable, mature, fully offline. Used within OCRmyPDF pipeline for scanned PDF handling. |
| **OCRmyPDF** | MPL 2.0 | Embed | Scanned PDF to searchable PDF pipeline. 32k stars. Non-destructive, archival-grade PDF/A output. MPL 2.0 is file-level copyleft — safe to embed as a service component without GPL contamination. |
| **Docling** | MIT | Embed — PRIMARY AI pipeline candidate | AI-ready document parsing — layout, tables, reading order, Markdown and JSON output. IBM Research. 61k stars. Cleanest embeddable license in the AI document pipeline space. Architecturally selected as the primary candidate for structured document ingestion feeding the naming engine. |
| **Unstructured** | Apache 2.0 | Embed | Document ETL for LLMs — 30+ file types, chunking, LangChain integration. 15k stars. Useful as a fallback ETL layer for unusual file types not handled by Docling. |
| **MinerU** | Custom Apache-based | Self-hosted only — verify before use | Complex PDF and document parsing with strong Markdown and JSON output. 62k stars. LICENSE CHANGED from AGPL to custom Apache-based with additional commercial conditions — verify current terms against Plenix commercial use before embedding. Do not embed until legal review is complete. |
| **Surya** | Apache 2.0 code / OpenRAIL-M model weights | Self-hosted only — verify before use | Layout analysis, tables, reading order, 90+ languages. 20k stars. CODE is Apache 2.0 but MODEL WEIGHTS use OpenRAIL-M style with commercial conditions. CRITICAL: verify model weight license separately before embedding. Code license and weight license are different documents. |
| **Marker** | GPL v3 | Self-hosted service only | PDF to Markdown and JSON conversion. 34k stars. GPL v3 — MUST NOT be embedded in a proprietary codebase. Run as a background service with a clean API boundary if used at all. |
| **olmOCR** | Apache 2.0 | Embed candidate | PDF linearization for LLMs via Vision Language Models. 17k stars. Benchmark candidate for complex PDF handling. Pending benchmark testing on real Plenix documents. |
| **Tabula** | MIT | Embed — narrow fallback | Table extraction from text-based PDFs. 5k stars. Use only for table-specific extraction when Docling table output is insufficient. |
| **Camelot** | MIT | Embed — narrow fallback | Python PDF table extraction — lattice and stream modes. 3k stars. Narrow fallback alongside Tabula for text-based PDF tables. |
| **Calamari** | Apache 2.0 | Embed — V2+ only | Handwriting recognition with multi-model voting. 1k stars. Not in V1 scope. Evaluate in V2+ for handwritten document support. |
| **Kraken** | MIT | Embed — V2+ only | Historical and handwritten OCR with custom trainable models. 2k stars. Not in V1 scope. Evaluate in V2+ for historical document or custom handwriting support. |

#### OSS Pipeline Architecture Notes

13. **Smart File Naming is a Plenix-owned pipeline** — not dependent on Paperless-ngx assumptions, data models, or deployment patterns. Paperless-ngx is a reference architecture only. The Plenix pipeline is custom-built: OCR output + Docling structured extraction + LLM analysis + Plenix metadata → suggested filename.
14. **Pipeline routing by content type:** Screenshot or image → PaddleOCR. Scanned PDF → OCRmyPDF + Tesseract. Structured document or AI pipeline → Docling. Table-only PDF → Tabula or Camelot as fallback. Handwriting (V2+) → Calamari or Kraken.
15. **CRITICAL LICENSE RULE: verify both the code license AND the model weight license before embedding any AI or OCR tool.** These are frequently separate documents with different commercial terms. MinerU and Surya are the primary examples where this distinction matters for Plenix.
16. **Docling (MIT) is the cleanest primary embeddable candidate** for the AI document pipeline. Architecturally selected — pending benchmark testing on real Plenix documents (contracts, invoices, receipts, church documents) before finalizing.
17. **paperless-gpt and paperless-ai (both MIT) may be embedded** but should be used as reference patterns for LLM Vision document classification and title generation — not as hard dependencies. The Plenix naming pipeline should own its logic and use these as inspiration, not as coupled libraries.
18. **Marker (GPL v3) must only be run as an isolated background service** with a clean REST or IPC API boundary if used at all. Never import or link GPL v3 code into Plenix's proprietary codebase. The same applies to Paperless-ngx.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|
| **Files** | Smart File Naming operates on uploaded and linked files; it reads `file.name`, `file.size`, `file.type`, and content payload. |
| **AI Engine (OCR)** | OCR extracts text from screenshots, scanned documents, and image-based PDFs — primary input for entity extraction. |
| **AI Engine (Summarization)** | AI summary feeds the naming engine when OCR and metadata are insufficient. |
| **AI Engine (Content Description)** | AI describes visual content for images and videos that have no extractable text. |
| **Projects** | Project context (name, category, contacts, tags, status) enriches naming suggestions. |
| **Tags** | Tags assigned to a file or inherited from a project feed naming template fields. |
| **Contacts** | Detected or linked contact/company names appear in suggested filenames. Cross-referenced against the Contacts module. |
| **Capture** | Capture surfaces (browser extension, share sheet, drag-and-drop, hotkey) provide source context that informs naming. |
| **Search & Filters** | Renamed files MUST remain searchable by both original and suggested name. |

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|
| **Files** | Files capability surfaces the AI-suggested name during and after upload. |
| **Import / Export / Backup** | Imported files MAY be offered a bulk rename pass after import. |
| **Dashboard** | Recently renamed files MAY appear in the activity feed. |
| **Search & Filters** | Search indexes MUST include both original and current filenames. |
| **Bookmarks** | File-backed bookmarks inherit the renamed display name. |

### Related Capabilities

| Capability | Relationship |
|---|---|
| **Bookmarks** | File-backed bookmarks carry `file.name`; renaming updates the display name. |
| **Highlights** | OCR text extracted for naming MAY also be used for highlight creation. |
| **Web Archive** | Archived content MAY contribute source context for naming. |
| **Duplicates & Broken Links** | Duplicate detection operates on content hashes, not filenames; renaming MUST NOT affect duplicate detection. |

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
| Should the physical file on disk / cloud be renamed, or only the display name? | 🟠 Product Decision | Renaming physical files on OneDrive/GDrive has sync implications. Recommend: display-only by default, physical rename as explicit user action. |
| Should the system auto-name files without prompting for specific file types? | 🟠 Product Decision | Power users may want screenshots auto-named silently. Recommend: off by default, opt-in per file type. |
| What is the AI provider for naming? | 🔴 Not Defined | Depends on broader AI provider decision for the platform. |
| Should visual similarity detection be used for duplicate content? | 🔴 Not Defined | Image perceptual hashing deferred to V2+. |
| Should the naming engine learn from user edits? | 🔵 Planned | V2+. |
| Should naming suggestions be available for non-file items? | 🟠 Product Decision | Notes already have titles. Bookmarks have extracted titles. File naming is the clearest use case. |
| Should renamed files show both names in list views? | 🟠 Product Decision | Could show current name with original in smaller text beneath. |
| What is the exact confidence threshold for template matching? | 🔴 Not Defined | Needs tuning based on real AI performance. |
| Should the system suggest folder organization alongside filename? | 🔵 Planned | V2+. |
| How should naming handle non-Latin characters in content? | 🟠 Product Decision | OCR may extract Arabic, Chinese, Cyrillic text. Must handle mixed scripts. |

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
