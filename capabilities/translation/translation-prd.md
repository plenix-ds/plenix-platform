# Translation & Dictionary PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Translation & Dictionary |
| **Capability ID** | translation |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST provide inline translation and dictionary lookup for selected text, with support for multiple languages and integration with AI translation services.

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

### UC-01 — Not yet defined

| Item | Detail |
|---|---|
| Actor | Not yet defined. |
| Goal | Not yet defined. |
| Main Flow | Not yet defined. |
| System Response | Not yet defined. |
| Alternate Flow | Not yet defined. |

## 7. Scope: MVP vs Future

### MVP Scope

Not yet defined.

### Future Scope

Not yet defined.

## 8. Feature List

Value-added behavior beyond Create, Edit, Delete, and Search.

Source feature area(s): Translation & Dictionary

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **In-app translation — select text and translate anywhere** | 🔵 Planned | Use case: The user is reading a supplier email in Arabic, reviewing a contract clause in French, or composing a WhatsApp message to a contact who speaks Spanish. Rather than copying text to a separate app, Plenix provides inline translation accessible from anywhere text appears. Selecting any text in Plenix — in a note, an email, a message thread, a task description, a database cell — surfaces a contextual action bar with a Translate option. The translation appears immediately below the selection in a tooltip or inline panel, showing the detected source language and the translated text. The user can replace the original with the translation, copy the translation, or dismiss it. The target language defaults to the user's interface language but can be changed per translation or set permanently in Settings. |
| F02 | **Google Translate integration** | 🔵 Planned | Google Translate is the primary translation engine for broad language coverage. Plenix connects via the Google Cloud Translation API (v3), which supports 130+ languages with automatic source language detection. Used for: translating selected text inline, translating entire notes or email bodies, translating incoming WhatsApp messages in the Unified Inbox (each message can show a 'Show translation' toggle), and translating file contents (PDFs, documents). The Google Translate connector is configured in Settings → Connectors with a Google Cloud API key. For users without an API key, a fallback uses the public Google Translate endpoint for limited volume. The API returns the translated text and the detected source language, both displayed in the translation panel. |
| F03 | **AI translation — GPT and Claude for nuanced, context-aware output** | 🔵 Planned | Use case: Google Translate produces accurate literal translations but sometimes misses tone, idiom, and context — especially for business communication, legal text, or creative writing. Plenix offers AI-powered translation using GPT (OpenAI) or Claude (Anthropic) as an alternative or complement to Google Translate. AI translation is invoked with a prompt that includes context: 'Translate the following [source language] text to [target language]. The context is a [professional email / WhatsApp message / legal clause / product description]. Preserve tone and adapt idioms naturally.' The output is more natural-sounding for human communication. The user can toggle between Google Translate (faster, more literal) and AI translation (slower, more nuanced) per translation or set a default in Settings. AI translation uses the same model and API key already configured for the AI assistant — no additional setup required. |
| F04 | **WordReference Dictionary — definitions, conjugations, forum results** | 🔵 Planned | Use case: The user is composing in a second language and wants to verify a word choice, check its gender (in Spanish/French/Italian), see conjugation tables, or understand subtle usage differences. WordReference is the gold-standard multilingual dictionary for European languages. Plenix integrates WordReference lookup: double-clicking a foreign-language word (or selecting it and choosing 'Look up') opens a dictionary panel showing the word's definitions, part of speech, gender, example sentences, and — uniquely to WordReference — a curated set of forum discussion results where native speakers have debated the correct usage of that exact word or phrase. Supported language pairs include Spanish, French, Italian, Portuguese, German, English, and others. The WordReference panel appears as a side drawer so the user can continue composing while consulting the dictionary. |
| F05 | **iTranslate — conversation and voice translation** | 🔵 Planned | Use case: The user is on a voice or video call with a supplier, client, or partner who speaks a different language, or needs to translate spoken content in real time. iTranslate (itranslate.com) provides conversation-mode translation — two people speaking in different languages, with the app translating each utterance in real time. Plenix integrates the iTranslate API for: voice-to-translated-text (speak in one language, receive translated text in another — distinct from Superwhisper's transcription which outputs in the same language), conversation mode in the AI Chat section (useful for bilingual meetings), and transliterating text between scripts (e.g. Arabic ↔ Latin romanisation). iTranslate supports 100+ languages and 40+ text-to-speech voices for reading translations aloud. |
| F06 | **Unified Inbox — auto-translate incoming messages** | 🔵 Planned | Use case: Messages arrive in the Unified Inbox from contacts who write in different languages. The user needs to understand the content without manually triggering a translation on each one. Each message in the Unified Inbox (WhatsApp, email, Instagram DM, etc.) that is detected as a non-preferred language shows a 'Translate' button inline. Tapping it expands the translated version beneath the original. A 'Always translate from [language]' option in the inbox settings auto-translates all future messages from that language without requiring a tap. The source language and translation engine are shown as a small label ('Translated from Arabic · Google'). The reply composer also offers a 'Compose in [language] and translate before sending' mode — the user writes naturally in their language and the outbound message is translated before delivery. |
| F07 | **Note and document translation — full-body translate** | 🔵 Planned | Use case: The user receives a supplier contract, a product specification, or a research document in a foreign language and needs a working translation of the entire content. In the Notes section, a 'Translate note' action in the note toolbar sends the full text to the selected translation engine and creates a new note titled '[Original title] — Translated' containing the output, preserving the original's formatting (headings, bullets, tables). In the Files section, PDFs and documents can be submitted for full-document translation — the translated version is saved as a new file alongside the original. Both the original and translated versions are linked in their metadata so the user can compare them. For long documents, translation is processed in sections to stay within API token limits. |
| F08 | **Translation settings — engine preference, target language, glossary** | 🔵 Planned | Settings → Translation covers: Default engine (Google Translate / GPT / Claude / iTranslate — selectable globally or per context); Default target language (the language all translations output to, defaults to interface language); Auto-detect source language (on by default); Custom glossary (user-defined term pairs that override the translation engine — e.g. 'always translate [company name] as [X]', or 'keep the word RFQ untranslated'); API key management for Google Cloud Translation and iTranslate; and a Translation history log (all translations performed, searchable, useful for auditing or re-using translated content). The glossary is particularly important for procurement and business contexts where product names, technical terms, and brand names must be rendered consistently regardless of which engine is used. |

## 9. Business Rules & Edge Cases

### Business Rules

### 5.1 Not yet defined

| Rule | Behavior |
|---|---|

### Edge Cases / Scenarios

| Scenario | Expected Behavior |
|---|---|

## 10. Data Model

Not yet defined.

## 11. Field-Level Specification

| Field | Type | Required | Constraints / Rules | Notes |
|---|---|---:|---|---|

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

### 10.1 Screens

| Screen | Purpose |
|---|---|

### 10.2 Components / Widgets

| Component | Purpose |
|---|---|

## 15. Workflow Requirements

| Operation | Required Behavior | Shared/Core Handling |
|---|---|---|
| Create | Not yet defined. | |
| Edit | Not yet defined. | |
| Delete | Not yet defined. | |
| Search | Not yet defined. | |

## 16. API Requirements

### Modules

### 11.1 Server / Core Application Layer

| Module | Responsibility |
|---|---|

### 11.2 Browser Extension Layer

| Module | Responsibility |
|---|---|

### 11.3 Web / Desktop Layer

| Module | Responsibility |
|---|---|

### 11.4 Mobile Layer

| Module | Responsibility |
|---|---|

### 11.5 Shared / Infrastructure Layer

| Module | Responsibility |
|---|---|

## 17. Search / Indexing Rules

Not yet defined.

## 18. AI Requirements

| Enabler | Purpose |
|---|---|

## 19. OSS / Build-vs-Buy Decision

1. **Primary embedded engine — Argos Translate (MIT).** Study and embed Argos Translate directly into the Plenix Python backend. MIT license permits commercial embedding without copyleft obligations. Supports 30+ language pairs fully offline. No Google or cloud dependency required for core translation. GitHub: argosopentech/argos-translate (6.1k stars).

2. **Self-hosted API alternative — LibreTranslate (AGPL).** If an API-first approach is preferred over direct embedding, run LibreTranslate as a self-hosted service. Built on top of Argos Translate. Exposes a clean REST API compatible with many translation clients. AGPL license — do not embed the LibreTranslate server code directly into Plenix; run it as a separate containerized service. GitHub: LibreTranslate/LibreTranslate (14k stars).

3. **License classification summary.**
   - Argos Translate: MIT — embed directly in the Plenix application bundle.
   - LibreTranslate: AGPL — self-hosted service only; never link or embed its server code into Plenix source.
   - Verify both the code license AND the underlying model license before any commercial release. Language model weights may carry separate non-commercial or attribution-only terms independent of the software license.

4. **Architectural decision — embedded vs. service.** Default to embedding Argos Translate for offline-first capability on desktop and mobile. Keep LibreTranslate as an optional self-hosted path for enterprise deployments or server-side translation pipelines. Do not make cloud translation the only path — offline parity is a core {APP_NAME} principle.

5. **Integration pattern — translation adapter interface.** Define a single internal `TranslationAdapter` interface that all engines implement: `translate(text, sourceLang, targetLang) -> TranslatedResult`. Concrete adapters: `ArgosAdapter` (embedded), `LibreTranslateAdapter` (self-hosted REST), `GoogleTranslateAdapter` (cloud API), `OpenAIAdapter`, `ClaudeAdapter`. The active adapter is selected from Settings → Translation without any call-site changes.

6. **Language detection.** Argos Translate includes language detection. Use it as the default offline detector. Fall back to the cloud engine's own detection only when the active adapter is a cloud engine. Never send text to a cloud service solely for language detection if an offline alternative is available.

7. **Glossary override layer.** Implement the custom glossary (F08) as a pre- and post-processing step that runs outside the translation engine. Before sending text to any adapter, replace glossary source terms with placeholders. After receiving the translation, substitute placeholders back with the target-language glossary values. This keeps glossary enforcement engine-agnostic.

8. **Warning — AGPL copyleft contagion.** If any LibreTranslate server code is imported into the Plenix process (rather than called over HTTP), AGPL requires the entire combined work to be released under AGPL. Enforce a strict process boundary: LibreTranslate runs only as a separate Docker/process service. All communication goes through its REST API. No shared memory, no in-process import.

9. **Warning — model weight licensing.** Argos Translate uses CTranslate2 models derived from Helsinki-NLP/Opus-MT. Opus-MT models are CC BY 4.0, which requires attribution. Display "Translation by Argos Translate / Opus-MT (CC BY 4.0)" in the Settings → Translation screen and in any export that includes translated content. Confirm this for each language pair — model licenses can differ per pair.

10. **What Plenix builds natively.** Translation adapter interface and routing logic; glossary pre/post-processing pipeline; inline translation UI (tooltip, side drawer, inline panel); translation history log; Unified Inbox auto-translate toggle; note and document full-body translation with section chunking for token limit compliance.

11. **What Plenix defers to external services.** Voice/conversation translation (deferred to iTranslate API — F05); high-volume or 130+ language coverage beyond Argos Translate's supported pairs (deferred to Google Cloud Translation API — F02); nuanced tone-aware translation for business communication (deferred to OpenAI/Claude — F03); multilingual dictionary with forum results (deferred to WordReference — F04).

12. **Platform fragility warning — third-party APIs.** Google Cloud Translation, iTranslate, and WordReference integrations depend on external API availability and pricing. Google Cloud Translation v2 public endpoint is rate-limited and unsupported for production use — require a valid API key. WordReference does not publish an official API; any integration should be treated as fragile and monitored. iTranslate API terms should be reviewed for commercial sublicensing restrictions before shipping F05.

## 20. Integration Map

### Depends On

| Capability / Module | Why it is needed |
|---|---|

### Depended On By

| Capability / Module | Why it depends on this capability |
|---|---|

### Related Capabilities

| Capability | Relationship |
|---|---|

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
