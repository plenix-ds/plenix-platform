# Task #134: MediaViewer video, MediaPlayer with a separate sound track (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/134 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

RedSave #29. `MediaViewer` shows images only: its `items` accept `kind: 'video'` (with `src`, `poster`, `audio`,
`tracks`), drawn with `MediaPlayer`; arrows and swipes still move between items and pause the one left behind.
`MediaPlayer` takes `audio`: a separate sound source kept in sync with the video (Reddit's DASH videos ship sound
apart): play, pause, seek, rate, volume and mute drive both; the audio re-syncs when drift exceeds a quarter second;
when the audio fails the video plays muted and says so. No new colors; controls are the existing MediaPlayer controls.

### Files you own

- `platform/components/MediaViewer/` · `platform/components/MediaPlayer/` · their design-system records through
  `lanes/134/design-system/` (a video item, a video with separate audio)

### Done means

- The quick gates pass; a lab plays a video with a separate audio file in sync (seek and rate checked).
- One pull request from `codex/134-media-video-audio`, `Closes #134`.
