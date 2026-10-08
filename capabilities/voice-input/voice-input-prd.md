# Voice Input PRD

## Metadata

| Field | Value |
|---|---|
| **Capability name** | Voice Input |
| **Capability ID** | voice_input |
| **Status** | Skeleton |
| **Priority** | Not yet defined |
| **Phase** | Not yet defined |
| **Last revised** | 2026-06-05 |
| **Revision summary** | Features mapped from prototype with baseline ops and descriptions |

This PRD follows the 28-section structure defined in **00-conventions.md**.

---

## 1. Capability Summary

The system MUST support voice-to-text input across all text fields and the AI chat interface, with live waveform visualization, transcription, and review-before-send workflow.

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

Source feature area(s): Voice Input

| ID | Feature | Status | Description |
|---|---|---:|---|
| F01 | **System-wide voice dictation — type anywhere by speaking** | 🔵 Planned | Use case: The user wants to dictate text into any field in Plenix — a task title, a note, a WhatsApp message, a search bar, an email reply — without clicking a microphone button on each individual field. A global hotkey (configurable, e.g. Option+Space or a push-to-talk key) activates voice input from anywhere in the app. The user speaks, and transcribed text is inserted at the current cursor position. No field needs to be specifically voice-enabled — the system captures audio, transcribes it, and simulates keyboard input at the active cursor. This is the Superwhisper model applied natively within Plenix: voice as a universal input method rather than a per-feature bolt-on. The hotkey can be held for push-to-talk (release to transcribe) or tapped to toggle recording on/off. |
| F02 | **Context-aware AI modes — output adapts to what you are doing** | 🔵 Planned | Use case: Raw transcription produces a wall of unpunctuated words. The same spoken content should be formatted differently depending on where it is going: a voice note should be structured as a note with paragraphs; a task title should be short and imperative; a WhatsApp message should be casual and concise; an email should be properly structured with greeting and sign-off. Plenix's voice input uses context-aware AI modes that detect the active section and format the output accordingly. Modes: Note dictation (structured paragraphs, markdown headings if speaking section titles); Task capture (extracts action item, due date, priority from natural speech — 'remind me to follow up with the supplier on Friday high priority' → task titled 'Follow up with supplier', due Friday, priority High); Email draft (greeting, body, sign-off, professional tone); Message (casual, concise, appropriate for chat); and a Raw mode (pure transcription, no AI processing). The user can also create custom modes with a system prompt that transforms the dictation in any way they define. |
| F03 | **Offline and on-device processing — privacy-first transcription** | 🔵 Planned | Use case: The user does not want their voice recordings sent to a cloud server for transcription — especially when dictating sensitive business information, personal notes, or private messages. Plenix supports fully offline voice transcription using on-device AI models based on OpenAI's Whisper (specifically the whisper.cpp implementation, which is optimized for Apple Silicon and runs at near-real-time speed without an internet connection). The user chooses their processing preference: Local (audio never leaves the device, no internet required, smaller model, slightly lower accuracy) or Cloud (audio sent to a transcription API — OpenAI Whisper, Deepgram, or Groq — for higher accuracy and faster processing on longer recordings). The local option is the default for privacy. Cloud mode is opt-in and clearly labeled. Model tiers mirror Superwhisper's approach: Nano/Fast (local, instant), Standard (local, balanced), Pro/Ultra (cloud, highest accuracy). |
| F04 | **100+ language support with automatic detection and translation** | 🔵 Planned | Voice input supports transcription in over 100 languages with automatic language detection — the user does not need to specify which language they are speaking. The system detects the language from the first few words and transcribes accordingly. For multilingual users: the user can switch mid-sentence between languages and the system handles it. A translation mode allows the user to dictate in one language and have the output appear in another (e.g. dictate in Arabic, receive English text) — useful for drafting communications in a second language or translating field notes on the fly. Language preference can be pinned per mode (e.g. 'always transcribe Note mode in English, but Message mode follows the detected language'). |
| F05 | **Audio and video file transcription** | 🔵 Planned | Use case: The user has a recorded meeting, a voice note from their phone, a supplier call recording, or a video interview and needs the text. Beyond live dictation, Plenix accepts uploaded audio and video files for transcription. Supported formats: MP3, M4A, OGG, WAV, MP4, MOV, WEBM. The file is processed by the same transcription engine (local or cloud, user's choice) and the output is delivered as a Note in Plenix, timestamped and linked to the source file. Speaker diarisation (distinguishing between speakers and labeling their turns) is available when using cloud processing. Transcribed files are searchable — finding a word surfaces the exact timestamp in the original recording. |
| F06 | **Recording history — searchable, replayable** | 🔵 Planned | Every voice dictation session is stored in a Recording History log accessible from the Voice Input settings. Each entry shows the date, duration, the mode used, the raw transcript, and the final AI-processed output. The user can: replay the original audio, edit the transcript if the AI misheard something, re-run the AI processing with a different mode, copy the output, or delete the recording. The history is searchable by content — typing a word finds all recordings that contained it. This is useful for recovering a dictation that wasn't pasted correctly, reviewing what was captured during a walk, or auditing past voice notes. History can be cleared on a rolling schedule (e.g. keep 30 days) or manually. |
| F07 | **Custom modes — user-defined voice transformation prompts** | 🔵 Planned | Beyond the built-in context modes, the user can create custom modes with a name, a trigger (manual selection, or automatic when a specific section is active), and a system prompt that defines how the AI should transform the dictation. Examples: 'Morning Standup' mode (prompt: 'Convert this voice note into a bulleted standup update with Yesterday, Today, and Blockers sections'); 'Supplier Note' mode (prompt: 'Extract key details from this voice note: supplier name, product discussed, price mentioned, follow-up action'); 'Brain Dump to Tasks' mode (prompt: 'Convert this stream-of-consciousness voice note into a list of actionable tasks, each starting with a verb'). Custom modes use the same AI pipeline as the rest of Plenix. The user can bring their own API key for the language model step if they want to use a specific provider or model. Modes are shareable as JSON exports. |
| F08 | **Voice capture into Capture inbox** | 🔵 Planned | The Capture button in the Plenix header includes a voice option — pressing it and speaking creates a new item in the Capture inbox (the triage zone for all incoming tasks, notes, and ideas). The voice content is processed by the active mode (default: a general capture mode that extracts tasks, notes, and ideas from natural speech and structures them appropriately). A spoken capture like 'I need to call Marcus about the contract by Thursday, and I had an idea for the packaging design — maybe use a matte black finish' produces two Capture items: a task ('Call Marcus about contract', due Thursday) and a note ('Packaging idea: matte black finish'). The user reviews and triages these items from the Capture inbox before they flow into Tasks or Notes. |

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

1. **Primary OSS references — Whisper and WhisperLive.** Study and embed both libraries as the transcription core. OpenAI Whisper (MIT license, 101k stars) handles batch transcription of uploaded audio/video files (F05) and post-session processing. WhisperLive (Apache 2.0, 4.1k stars) handles real-time streaming transcription for live dictation (F01, F08). These two libraries cover the full surface of Plenix voice input without requiring a third transcription dependency.

2. **License classification.** Whisper: MIT — embed directly in the Plenix server with no restrictions. WhisperLive: Apache 2.0 — embed directly; requires preservation of the Apache 2.0 notice in distribution. Both licenses are permissive and compatible with a commercial product. CRITICAL: the code licenses (MIT/Apache) do not cover the Whisper model weights. Verify the OpenAI Whisper model weight license explicitly before shipping commercially — the weights are currently distributed under the MIT license as of the knowledge cutoff but this must be confirmed at integration time, as model weight licenses can differ from code licenses and may change.

3. **Architectural split: batch vs. live pipeline.** Implement two distinct pipelines internally. The batch pipeline (Whisper) accepts a complete audio buffer or uploaded file, runs inference once, and returns the full transcript — use this for file upload transcription (F05) and for push-to-talk sessions where the user releases the hotkey before the text appears. The live pipeline (WhisperLive) runs a streaming VAD-chunked inference loop and emits partial and final transcript segments in real time — use this for toggle-mode dictation where the user expects to see text appear as they speak (F01 live waveform feedback). Do not conflate the two pipelines; they have different latency profiles and different error modes.

4. **Deployment model — self-hosted service on the Plenix server.** Both Whisper and WhisperLive run as a local service on the Plenix server (not on the user's device). Audio is captured in the browser/desktop client, streamed or uploaded to the Plenix server over the existing authenticated connection, transcribed on-server, and the text is returned. Audio never leaves the server boundary. This satisfies F03's privacy requirement ("audio never leaves the server") without requiring on-device model execution. The server-side GPU or CPU handles inference. For cloud mode (opt-in, F03), the server proxies to an external API (OpenAI Whisper API, Deepgram, or Groq) — the client never contacts the external API directly.

5. **WhisperLive integration pattern.** WhisperLive exposes a WebSocket server that accepts audio chunks and returns transcript events. The Plenix desktop/web client opens a WebSocket to the Plenix server (not directly to WhisperLive), and the Plenix server maintains the WhisperLive session on behalf of the client. Use this intermediary pattern to enforce authentication, rate limiting, and session isolation. Do not expose the WhisperLive WebSocket port directly to clients.

6. **Multilingual and Arabic support.** Whisper natively supports transcription in 100+ languages including Arabic (F04). No additional model or pipeline is required for Arabic — the same base or large model handles it. For the translation mode (dictate in Arabic, receive English output), use Whisper's built-in translate task rather than a two-step transcribe-then-translate approach — this reduces latency and avoids a second model call. Pin language preference per mode in the user's settings and pass the language hint to the Whisper inference call to skip language detection overhead when the language is already known.

7. **Model tier strategy.** Map Plenix's local/cloud processing preference (F03) to specific Whisper model sizes. Local fast: whisper-tiny or whisper-base (runs on CPU, near-instant for short dictations). Local standard: whisper-small or whisper-medium (balanced accuracy/speed, suitable for note dictation). Cloud: route to the OpenAI Whisper API or Groq's Whisper endpoint for whisper-large-v3 accuracy. Do not bundle large model weights into the Plenix server image — download on first use or allow the administrator to pre-download. Expose model selection in server configuration, not in the per-user UI (model choice is an infrastructure decision, not a UX preference at launch).

8. **What Plenix builds natively vs. defers.** Build natively: the global hotkey capture layer (F01), the waveform visualization widget (F01 review UI), the context-aware AI mode layer that post-processes raw transcripts (F02), the custom mode prompt engine (F07), and the recording history store (F06). Defer to Whisper/WhisperLive: all audio-to-text inference. Defer to the existing Plenix AI pipeline: transcript-to-structured-output transformation (task extraction, email formatting, capture splitting in F02 and F08). Speaker diarisation (F05) is not in Whisper or WhisperLive — defer to a cloud service (Deepgram or AssemblyAI) for diarisation, and only offer it in cloud mode.

9. **Platform fragility warning — global hotkey capture.** The global hotkey (F01) that intercepts input system-wide while the user is in another field is OS-level functionality with known fragility points. On Windows, global hotkeys conflict with other apps using the same key combination and may be silently blocked by certain applications. On macOS, accessibility permissions must be granted by the user (the app will prompt on first use). On web (browser tab), global hotkeys are not possible — voice input in the web client must be triggered by a UI button within the Plenix tab. Design the hotkey layer as a platform-specific module with a fallback to UI-button-only mode on web. Do not promise global hotkey behavior in the web client.

10. **E2EE and privacy disclosure.** In cloud mode (opt-in), audio is transmitted to a third-party transcription provider. This must be disclosed clearly in the UI before the user enables cloud mode — a one-time consent prompt stating which provider receives the audio and that it is subject to that provider's data retention policy. In local/server mode, state explicitly in settings that audio is processed on the Plenix server and not retained after transcription (enforce this by deleting the audio buffer server-side after the transcript is returned, with no logging of raw audio). Recording history (F06) stores transcripts and optionally the audio file — clarify in the privacy settings whether audio playback is stored or transcript-only.

11. **Audio format and pre-processing.** Whisper expects 16kHz mono WAV or FLAC internally. The Plenix server should convert all incoming audio (regardless of browser codec — typically WebM/Opus or OGG) to 16kHz mono PCM before passing to Whisper. Use FFmpeg (LGPL) for this conversion — it is widely available and handles all common formats. Do not expose raw audio conversion to the client; normalize on the server. For uploaded files (F05), enforce a maximum file size limit server-side (suggested: 500 MB) and reject silently oversized files with a clear error message before starting transcription.

12. **Testing and accuracy baseline.** Before shipping, establish accuracy benchmarks using a held-out test set of representative dictations in the languages Plenix targets (at minimum: English, Arabic). Measure Word Error Rate (WER) for each model tier. Set an internal quality gate (suggested: WER below 10% for English on whisper-small in local standard mode) before enabling a tier for production users. WhisperLive's real-time mode will have higher WER than batch Whisper due to chunking — this is expected and should be documented in internal notes. Test the live pipeline under realistic network latency between browser and server to ensure partial transcript delivery does not exceed a 1.5-second lag target for a fluent speaker.

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
