/* Plenix · w12B written guidance. */
DSParts.docs.push({
  "asset-gallery": {
    "purpose": "Browse images in responsive columns or justified rows, with optional full-screen preview.",
    "anatomy": [
      "ContentGrid layout",
      "Named MediaCards",
      "Optional MediaViewer"
    ],
    "behavior": {
      "pointer": "Card titles open the preview when enabled. Keyboard navigation and focus return come from MediaViewer.",
      "keyboard": "Use native Platform controls in source order. Media controls retain browser keyboard support.",
      "focus": "Preview restores focus to its opener. Form errors preserve the active editing context.",
      "responsive": "ContentGrid and Carousel adapt to available width; media stays inside its container.",
      "motion": "No autoplay. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every gallery, file list and media element. Images require meaningful alternatives.",
      "announce": "Announce errors and saved status; progress is exposed by FileRow.",
      "focus": "Use native Tab order, visible controls and focus return from MediaViewer.",
      "contrast": "Use existing theme roles.",
      "motion": "Playback starts only at user request."
    },
    "content": {
      "labels": "Use precise asset and field names.",
      "actions": "Use Save metadata, Reset, Cancel and Try again for their respective actions.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; filenames, captions and metadata belong to the caller."
    }
  },
  "download-manager": {
    "purpose": "Review download jobs and explicitly retry, cancel or open their results.",
    "anatomy": [
      "Named panel or list",
      "FileRow per job",
      "Progress and status",
      "Retry, Cancel and ready file link"
    ],
    "behavior": {
      "pointer": "Rendering never starts a download. Actions lock per job while awaiting the caller, with recoverable errors.",
      "keyboard": "Use native Platform controls in source order. Media controls retain browser keyboard support.",
      "focus": "Preview restores focus to its opener. Form errors preserve the active editing context.",
      "responsive": "ContentGrid and Carousel adapt to available width; media stays inside its container.",
      "motion": "No autoplay. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every gallery, file list and media element. Images require meaningful alternatives.",
      "announce": "Announce errors and saved status; progress is exposed by FileRow.",
      "focus": "Use native Tab order, visible controls and focus return from MediaViewer.",
      "contrast": "Use existing theme roles.",
      "motion": "Playback starts only at user request."
    },
    "content": {
      "labels": "Use precise asset and field names.",
      "actions": "Use Save metadata, Reset, Cancel and Try again for their respective actions.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; filenames, captions and metadata belong to the caller."
    }
  },
  "media-player": {
    "purpose": "Play authorized audio and video with native controls, captions and a seekable transcript.",
    "anatomy": [
      "Native video or audio control",
      "WebVTT caption tracks",
      "Playback speed",
      "Transcript toggle and timed segments",
      "Optional picture in picture"
    ],
    "behavior": {
      "pointer": "Nothing autoplays. Captions use native controls. Transcript seeks require loaded metadata; PiP appears only in supporting browsers.",
      "keyboard": "Use native Platform controls in source order. Media controls retain browser keyboard support.",
      "focus": "Preview restores focus to its opener. Form errors preserve the active editing context.",
      "responsive": "ContentGrid and Carousel adapt to available width; media stays inside its container.",
      "motion": "No autoplay. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every gallery, file list and media element. Images require meaningful alternatives.",
      "announce": "Announce errors and saved status; progress is exposed by FileRow.",
      "focus": "Use native Tab order, visible controls and focus return from MediaViewer.",
      "contrast": "Use existing theme roles.",
      "motion": "Playback starts only at user request."
    },
    "content": {
      "labels": "Use precise asset and field names.",
      "actions": "Use Save metadata, Reset, Cancel and Try again for their respective actions.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; filenames, captions and metadata belong to the caller."
    }
  },
  "metadata-editor": {
    "purpose": "Edit asset metadata with inline saves or a validated form and explicit bulk field selection.",
    "anatomy": [
      "Schema-defined fields",
      "InlineEdit or form controls",
      "Bulk apply checkboxes",
      "Save, Reset and feedback"
    ],
    "behavior": {
      "pointer": "Bulk submission includes only checked fields. Validation and persistence failures preserve the draft; Reset guards unsaved edits.",
      "keyboard": "Use native Platform controls in source order. Media controls retain browser keyboard support.",
      "focus": "Preview restores focus to its opener. Form errors preserve the active editing context.",
      "responsive": "ContentGrid and Carousel adapt to available width; media stays inside its container.",
      "motion": "No autoplay. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every gallery, file list and media element. Images require meaningful alternatives.",
      "announce": "Announce errors and saved status; progress is exposed by FileRow.",
      "focus": "Use native Tab order, visible controls and focus return from MediaViewer.",
      "contrast": "Use existing theme roles.",
      "motion": "Playback starts only at user request."
    },
    "content": {
      "labels": "Use precise asset and field names.",
      "actions": "Use Save metadata, Reset, Cancel and Try again for their respective actions.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; filenames, captions and metadata belong to the caller."
    }
  },
  "related-assets": {
    "purpose": "Offer related assets in a manual carousel or a responsive card grid.",
    "anatomy": [
      "Named collection",
      "MediaCards with real links or callbacks",
      "Manual carousel controls"
    ],
    "behavior": {
      "pointer": "Recommendations stay caller-owned. Link titles navigate and callback titles open a view; carousel never autoplays.",
      "keyboard": "Use native Platform controls in source order. Media controls retain browser keyboard support.",
      "focus": "Preview restores focus to its opener. Form errors preserve the active editing context.",
      "responsive": "ContentGrid and Carousel adapt to available width; media stays inside its container.",
      "motion": "No autoplay. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every gallery, file list and media element. Images require meaningful alternatives.",
      "announce": "Announce errors and saved status; progress is exposed by FileRow.",
      "focus": "Use native Tab order, visible controls and focus return from MediaViewer.",
      "contrast": "Use existing theme roles.",
      "motion": "Playback starts only at user request."
    },
    "content": {
      "labels": "Use precise asset and field names.",
      "actions": "Use Save metadata, Reset, Cancel and Try again for their respective actions.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; filenames, captions and metadata belong to the caller."
    }
  },
  "image-gallery": {
    "purpose": "Browse images in responsive columns or justified rows, with optional full-screen preview.",
    "anatomy": [
      "ContentGrid layout",
      "Named MediaCards",
      "Optional MediaViewer"
    ],
    "behavior": {
      "pointer": "Card titles open the preview when enabled. Keyboard navigation and focus return come from MediaViewer.",
      "keyboard": "Use native Platform controls in source order. Media controls retain browser keyboard support.",
      "focus": "Preview restores focus to its opener. Form errors preserve the active editing context.",
      "responsive": "ContentGrid and Carousel adapt to available width; media stays inside its container.",
      "motion": "No autoplay. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every gallery, file list and media element. Images require meaningful alternatives.",
      "announce": "Announce errors and saved status; progress is exposed by FileRow.",
      "focus": "Use native Tab order, visible controls and focus return from MediaViewer.",
      "contrast": "Use existing theme roles.",
      "motion": "Playback starts only at user request."
    },
    "content": {
      "labels": "Use precise asset and field names.",
      "actions": "Use Save metadata, Reset, Cancel and Try again for their respective actions.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; filenames, captions and metadata belong to the caller."
    }
  },
  "video": {
    "purpose": "Play authorized audio and video with native controls, captions and a seekable transcript.",
    "anatomy": [
      "Native video or audio control",
      "WebVTT caption tracks",
      "Playback speed",
      "Transcript toggle and timed segments",
      "Optional picture in picture"
    ],
    "behavior": {
      "pointer": "Nothing autoplays. Captions use native controls. Transcript seeks require loaded metadata; PiP appears only in supporting browsers.",
      "keyboard": "Use native Platform controls in source order. Media controls retain browser keyboard support.",
      "focus": "Preview restores focus to its opener. Form errors preserve the active editing context.",
      "responsive": "ContentGrid and Carousel adapt to available width; media stays inside its container.",
      "motion": "No autoplay. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every gallery, file list and media element. Images require meaningful alternatives.",
      "announce": "Announce errors and saved status; progress is exposed by FileRow.",
      "focus": "Use native Tab order, visible controls and focus return from MediaViewer.",
      "contrast": "Use existing theme roles.",
      "motion": "Playback starts only at user request."
    },
    "content": {
      "labels": "Use precise asset and field names.",
      "actions": "Use Save metadata, Reset, Cancel and Try again for their respective actions.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; filenames, captions and metadata belong to the caller."
    }
  },
  "audio": {
    "purpose": "Play authorized audio and video with native controls, captions and a seekable transcript.",
    "anatomy": [
      "Native video or audio control",
      "WebVTT caption tracks",
      "Playback speed",
      "Transcript toggle and timed segments",
      "Optional picture in picture"
    ],
    "behavior": {
      "pointer": "Nothing autoplays. Captions use native controls. Transcript seeks require loaded metadata; PiP appears only in supporting browsers.",
      "keyboard": "Use native Platform controls in source order. Media controls retain browser keyboard support.",
      "focus": "Preview restores focus to its opener. Form errors preserve the active editing context.",
      "responsive": "ContentGrid and Carousel adapt to available width; media stays inside its container.",
      "motion": "No autoplay. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every gallery, file list and media element. Images require meaningful alternatives.",
      "announce": "Announce errors and saved status; progress is exposed by FileRow.",
      "focus": "Use native Tab order, visible controls and focus return from MediaViewer.",
      "contrast": "Use existing theme roles.",
      "motion": "Playback starts only at user request."
    },
    "content": {
      "labels": "Use precise asset and field names.",
      "actions": "Use Save metadata, Reset, Cancel and Try again for their respective actions.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; filenames, captions and metadata belong to the caller."
    }
  },
  "audio-player": {
    "purpose": "Play authorized audio and video with native controls, captions and a seekable transcript.",
    "anatomy": [
      "Native video or audio control",
      "WebVTT caption tracks",
      "Playback speed",
      "Transcript toggle and timed segments",
      "Optional picture in picture"
    ],
    "behavior": {
      "pointer": "Nothing autoplays. Captions use native controls. Transcript seeks require loaded metadata; PiP appears only in supporting browsers.",
      "keyboard": "Use native Platform controls in source order. Media controls retain browser keyboard support.",
      "focus": "Preview restores focus to its opener. Form errors preserve the active editing context.",
      "responsive": "ContentGrid and Carousel adapt to available width; media stays inside its container.",
      "motion": "No autoplay. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every gallery, file list and media element. Images require meaningful alternatives.",
      "announce": "Announce errors and saved status; progress is exposed by FileRow.",
      "focus": "Use native Tab order, visible controls and focus return from MediaViewer.",
      "contrast": "Use existing theme roles.",
      "motion": "Playback starts only at user request."
    },
    "content": {
      "labels": "Use precise asset and field names.",
      "actions": "Use Save metadata, Reset, Cancel and Try again for their respective actions.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; filenames, captions and metadata belong to the caller."
    }
  },
  "captions-transcripts": {
    "purpose": "Play authorized audio and video with native controls, captions and a seekable transcript.",
    "anatomy": [
      "Native video or audio control",
      "WebVTT caption tracks",
      "Playback speed",
      "Transcript toggle and timed segments",
      "Optional picture in picture"
    ],
    "behavior": {
      "pointer": "Nothing autoplays. Captions use native controls. Transcript seeks require loaded metadata; PiP appears only in supporting browsers.",
      "keyboard": "Use native Platform controls in source order. Media controls retain browser keyboard support.",
      "focus": "Preview restores focus to its opener. Form errors preserve the active editing context.",
      "responsive": "ContentGrid and Carousel adapt to available width; media stays inside its container.",
      "motion": "No autoplay. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every gallery, file list and media element. Images require meaningful alternatives.",
      "announce": "Announce errors and saved status; progress is exposed by FileRow.",
      "focus": "Use native Tab order, visible controls and focus return from MediaViewer.",
      "contrast": "Use existing theme roles.",
      "motion": "Playback starts only at user request."
    },
    "content": {
      "labels": "Use precise asset and field names.",
      "actions": "Use Save metadata, Reset, Cancel and Try again for their respective actions.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; filenames, captions and metadata belong to the caller."
    }
  }
});
