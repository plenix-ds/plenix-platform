/* Plenix design system · w12C written guidance. */
DSParts.docs.push({
  "attachment-picker": {
    "purpose": "Attach validated local files with a reversible selection.",
    "anatomy": [
      "Device FileInput",
      "Selected FileRows or removable chips",
      "Validation Notice"
    ],
    "behavior": {
      "pointer": "Validate types, per-file size and count before accepting a batch; remove without uploading.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; file and version choices remain explicit.",
      "focus": "Dialogs restore focus to their opener; viewports support keyboard scrolling.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; file rows and page controls name their targets.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Cancel preserves saved files.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Choose, Download, Preview, Restore and Remove.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "file-picker": {
    "purpose": "Choose existing files, assets or media within folders.",
    "anatomy": [
      "Named dialog",
      "Folder Tree",
      "Search field",
      "Selectable FileRows",
      "Explicit Choose action"
    ],
    "behavior": {
      "pointer": "Keep selection through filters; restrict media mode to audio, image and video. Cancel never commits; await persistence before closing.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; file and version choices remain explicit.",
      "focus": "Dialogs restore focus to their opener; viewports support keyboard scrolling.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; file rows and page controls name their targets.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Cancel preserves saved files.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Choose, Download, Preview, Restore and Remove.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "rendition-list": {
    "purpose": "Download a specific stored derivative with format and size visible.",
    "anatomy": [
      "Rendition name",
      "Format and byte size",
      "DataTable or download menu"
    ],
    "behavior": {
      "pointer": "Download only the selected rendition. Pending downloads cannot repeat; links keep native download semantics.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; file and version choices remain explicit.",
      "focus": "Dialogs restore focus to their opener; viewports support keyboard scrolling.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; file rows and page controls name their targets.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Cancel preserves saved files.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Choose, Download, Preview, Restore and Remove.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "document-viewer": {
    "purpose": "Read paginated PDFs, images and text without leaving the application.",
    "anatomy": [
      "Page navigation",
      "Stepped zoom",
      "Page thumbnails",
      "Named scroll viewport",
      "Accessible PDF text"
    ],
    "behavior": {
      "pointer": "Load PDF.js locally; cancel obsolete documents and canvas rendering. Expose PDF text, keyboard-accessible scrolling and recoverable load errors.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; file and version choices remain explicit.",
      "focus": "Dialogs restore focus to their opener; viewports support keyboard scrolling.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; file rows and page controls name their targets.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Cancel preserves saved files.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Choose, Download, Preview, Restore and Remove.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "version-history": {
    "purpose": "Inspect earlier versions and restore one only after explicit confirmation.",
    "anatomy": [
      "Timeline",
      "VersionLabel",
      "Optional preview",
      "Confirmed restore and result Badge"
    ],
    "behavior": {
      "pointer": "Preview never changes saved data. Await a confirmed restore, prevent repeats and retain the version on failure.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; file and version choices remain explicit.",
      "focus": "Dialogs restore focus to their opener; viewports support keyboard scrolling.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; file rows and page controls name their targets.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Cancel preserves saved files.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Choose, Download, Preview, Restore and Remove.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  }
});
