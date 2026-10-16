/* Plenix design system · w11C written guidance. */
DSParts.docs.push({
  "import-dialog": {
    "purpose": "Choose a supported source before importing records.",
    "anatomy": [
      "Source mode tabs",
      "File picker and drop zone",
      "Pasted text or URL field",
      "Import action and recoverable error"
    ],
    "behavior": {
      "pointer": "Validate the source, await the caller reader and keep the draft after errors. No arbitrary URL is fetched by the component.",
      "keyboard": "Native controls retain Tab, Enter and Space behavior. Modal dialogs support Escape and trap focus; pending requests cannot dismiss.",
      "focus": "Dialogs restore focus to the opener; wizard step changes focus the current heading.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Fields, modal dialogs, review grids and shortcut groups have explicit accessible names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved; pending writes retain the current form.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task labels; file names, row counts and keyboard bindings use the data font.",
      "actions": "Explicit verbs: Import, Export, Request access, Upgrade and Delete account.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Built-in words come from strings. Source columns, plan terms and account names come from the caller."
    }
  },
  "import-wizard": {
    "purpose": "Map source columns to target fields, review values and report the persisted result.",
    "anatomy": [
      "Source ImportDialog",
      "Target-to-source mapping fields",
      "Review DataTable",
      "Completion status and row count"
    ],
    "behavior": {
      "pointer": "Required mappings must be complete. Finish persists once and displays results; failed writes preserve the mapping and rows.",
      "keyboard": "Native controls retain Tab, Enter and Space behavior. Modal dialogs support Escape and trap focus; pending requests cannot dismiss.",
      "focus": "Dialogs restore focus to the opener; wizard step changes focus the current heading.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Fields, modal dialogs, review grids and shortcut groups have explicit accessible names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved; pending writes retain the current form.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task labels; file names, row counts and keyboard bindings use the data font.",
      "actions": "Explicit verbs: Import, Export, Request access, Upgrade and Delete account.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Built-in words come from strings. Source columns, plan terms and account names come from the caller."
    }
  },
  "export-dialog": {
    "purpose": "Export an explicit record scope and format, immediately or in the background.",
    "anatomy": [
      "Format selector",
      "Selection or all-record scope",
      "Background option",
      "Queued or ready Badge and optional download Link"
    ],
    "behavior": {
      "pointer": "Selection is unavailable when empty. Export waits for the caller and retains options on error; no download file is fabricated.",
      "keyboard": "Native controls retain Tab, Enter and Space behavior. Modal dialogs support Escape and trap focus; pending requests cannot dismiss.",
      "focus": "Dialogs restore focus to the opener; wizard step changes focus the current heading.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Fields, modal dialogs, review grids and shortcut groups have explicit accessible names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved; pending writes retain the current form.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task labels; file names, row counts and keyboard bindings use the data font.",
      "actions": "Explicit verbs: Import, Export, Request access, Upgrade and Delete account.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Built-in words come from strings. Source columns, plan terms and account names come from the caller."
    }
  },
  "access-request": {
    "purpose": "Request permission without implying that submission grants access.",
    "anatomy": [
      "Resource access explanation",
      "Optional request message",
      "Pending, approved or denied icon Badge",
      "Request or Open action"
    ],
    "behavior": {
      "pointer": "Await the request, show Pending only after it succeeds, and retain a failed message. Only the server can approve access.",
      "keyboard": "Native controls retain Tab, Enter and Space behavior. Modal dialogs support Escape and trap focus; pending requests cannot dismiss.",
      "focus": "Dialogs restore focus to the opener; wizard step changes focus the current heading.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Fields, modal dialogs, review grids and shortcut groups have explicit accessible names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved; pending writes retain the current form.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task labels; file names, row counts and keyboard bindings use the data font.",
      "actions": "Explicit verbs: Import, Export, Request access, Upgrade and Delete account.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Built-in words come from strings. Source columns, plan terms and account names come from the caller."
    }
  },
  "trial-upgrade": {
    "purpose": "Explain a trial and compare caller-supplied plans before an explicit upgrade.",
    "anatomy": [
      "Trial Banner",
      "ComparisonView of plan features",
      "Plan selector",
      "Upgrade confirmation and failure Notice"
    ],
    "behavior": {
      "pointer": "Opening plans never purchases one. Upgrade waits for the caller and retains selection on failure; prices and billing terms belong to the application.",
      "keyboard": "Native controls retain Tab, Enter and Space behavior. Modal dialogs support Escape and trap focus; pending requests cannot dismiss.",
      "focus": "Dialogs restore focus to the opener; wizard step changes focus the current heading.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Fields, modal dialogs, review grids and shortcut groups have explicit accessible names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved; pending writes retain the current form.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task labels; file names, row counts and keyboard bindings use the data font.",
      "actions": "Explicit verbs: Import, Export, Request access, Upgrade and Delete account.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Built-in words come from strings. Source columns, plan terms and account names come from the caller."
    }
  },
  "offboarding": {
    "purpose": "Let people preserve their data before a clearly confirmed account or subscription change.",
    "anatomy": [
      "Backup step with ExportDialog",
      "Optional reason",
      "Exact account-name confirmation for deletion",
      "Final explicit action"
    ],
    "behavior": {
      "pointer": "Deletion requires the exact account name. Exports and final actions are separate; errors retain values and duplicate requests are prevented.",
      "keyboard": "Native controls retain Tab, Enter and Space behavior. Modal dialogs support Escape and trap focus; pending requests cannot dismiss.",
      "focus": "Dialogs restore focus to the opener; wizard step changes focus the current heading.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Fields, modal dialogs, review grids and shortcut groups have explicit accessible names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved; pending writes retain the current form.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task labels; file names, row counts and keyboard bindings use the data font.",
      "actions": "Explicit verbs: Import, Export, Request access, Upgrade and Delete account.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Built-in words come from strings. Source columns, plan terms and account names come from the caller."
    }
  },
  "shortcuts-dialog": {
    "purpose": "Find enabled keyboard shortcuts from the live Platform registry.",
    "anatomy": [
      "Search field",
      "Named command groups",
      "Action labels and Kbd bindings",
      "Close action"
    ],
    "behavior": {
      "pointer": "Registry changes update the list while open. Search matches labels, groups and native key names; disabled bindings are excluded.",
      "keyboard": "Native controls retain Tab, Enter and Space behavior. Modal dialogs support Escape and trap focus; pending requests cannot dismiss.",
      "focus": "Dialogs restore focus to the opener; wizard step changes focus the current heading.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Fields, modal dialogs, review grids and shortcut groups have explicit accessible names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved; pending writes retain the current form.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task labels; file names, row counts and keyboard bindings use the data font.",
      "actions": "Explicit verbs: Import, Export, Request access, Upgrade and Delete account.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Built-in words come from strings. Source columns, plan terms and account names come from the caller."
    }
  },
  "import-dialog-pattern": {
    "purpose": "Choose a supported source before importing records.",
    "anatomy": [
      "Source mode tabs",
      "File picker and drop zone",
      "Pasted text or URL field",
      "Import action and recoverable error"
    ],
    "behavior": {
      "pointer": "Validate the source, await the caller reader and keep the draft after errors. No arbitrary URL is fetched by the component.",
      "keyboard": "Native controls retain Tab, Enter and Space behavior. Modal dialogs support Escape and trap focus; pending requests cannot dismiss.",
      "focus": "Dialogs restore focus to the opener; wizard step changes focus the current heading.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Fields, modal dialogs, review grids and shortcut groups have explicit accessible names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved; pending writes retain the current form.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task labels; file names, row counts and keyboard bindings use the data font.",
      "actions": "Explicit verbs: Import, Export, Request access, Upgrade and Delete account.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Built-in words come from strings. Source columns, plan terms and account names come from the caller."
    }
  },
  "export-dialog-pattern": {
    "purpose": "Export an explicit record scope and format, immediately or in the background.",
    "anatomy": [
      "Format selector",
      "Selection or all-record scope",
      "Background option",
      "Queued or ready Badge and optional download Link"
    ],
    "behavior": {
      "pointer": "Selection is unavailable when empty. Export waits for the caller and retains options on error; no download file is fabricated.",
      "keyboard": "Native controls retain Tab, Enter and Space behavior. Modal dialogs support Escape and trap focus; pending requests cannot dismiss.",
      "focus": "Dialogs restore focus to the opener; wizard step changes focus the current heading.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Fields, modal dialogs, review grids and shortcut groups have explicit accessible names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved; pending writes retain the current form.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task labels; file names, row counts and keyboard bindings use the data font.",
      "actions": "Explicit verbs: Import, Export, Request access, Upgrade and Delete account.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Built-in words come from strings. Source columns, plan terms and account names come from the caller."
    }
  }
});
