/* Plenix design system · w10C: workflow guidance. */
DSParts.docs.push({
  "wizard": {
    "purpose": "Guide a task through named steps without losing earlier edits.",
    "anatomy": [
      "ProgressSteps",
      "step heading and fields",
      "validation notice",
      "Back and Next or Finish."
    ],
    "behavior": {
      "pointer": "Next validates the current step; Finish validates every step before awaiting persistence. Back preserves values.",
      "keyboard": "Native controls retain their Tab, Enter and Space behavior. Modal layers trap focus and support Escape when not saving.",
      "focus": "A changed step focuses its heading. Invalid submission keeps the current step available.",
      "responsive": "Regions wrap with the Platform layout primitives; fields fill the available width.",
      "motion": "No additional animation; inherited Platform transitions respect reduced motion.",
      "loading": "Pending persistence blocks duplicate actions and announces its busy or save state.",
      "error": "Inline errors preserve values and offer another attempt."
    },
    "a11y": {
      "name": "Each form or dialog has a visible title or an accessible label. Fields use connected labels.",
      "announce": "Failures use an alert Notice; save states use a status Badge with text and an icon.",
      "focus": "All actions are keyboard controls; no status depends on color alone.",
      "contrast": "Only existing Platform surface, text, border and status roles.",
      "motion": "No workflow depends on animation."
    },
    "content": {
      "labels": "Short names for fields and steps; technical values use the data font.",
      "actions": "Explicit verbs: Next, Finish, Save copy, Resume draft, Discard draft, Archive and Restore.",
      "errors": "Explain the failure without clearing entered values.",
      "localization": "All component text is supplied through strings; field and step text belongs to the caller.",
      "guidance": "Use it for infrequent, complex setup tasks with a fixed order. Use it when each step depends on choices made earlier."
    }
  },
  "wizard-dialog": {
    "purpose": "Keep a short stepped task in a modal layer.",
    "anatomy": [
      "Dialog header",
      "Wizard body",
      "guarded close."
    ],
    "behavior": {
      "pointer": "Close, Escape, veil and Cancel ask before discarding dirty changes. A pending finish cannot close.",
      "keyboard": "Native controls retain their Tab, Enter and Space behavior. Modal layers trap focus and support Escape when not saving.",
      "focus": "Controls keep focus through inline failures. Modal layers restore focus to the opener.",
      "responsive": "Regions wrap with the Platform layout primitives; fields fill the available width.",
      "motion": "No additional animation; inherited Platform transitions respect reduced motion.",
      "loading": "Pending persistence blocks duplicate actions and announces its busy or save state.",
      "error": "Inline errors preserve values and offer another attempt."
    },
    "a11y": {
      "name": "Each form or dialog has a visible title or an accessible label. Fields use connected labels.",
      "announce": "Failures use an alert Notice; save states use a status Badge with text and an icon.",
      "focus": "All actions are keyboard controls; no status depends on color alone.",
      "contrast": "Only existing Platform surface, text, border and status roles.",
      "motion": "No workflow depends on animation."
    },
    "content": {
      "labels": "Short names for fields and steps; technical values use the data font.",
      "actions": "Explicit verbs: Next, Finish, Save copy, Resume draft, Discard draft, Archive and Restore.",
      "errors": "Explain the failure without clearing entered values.",
      "localization": "All component text is supplied through strings; field and step text belongs to the caller.",
      "guidance": "Use for three to five steps where later steps depend on earlier choices. Use when the task is short enough to finish in one sitting."
    }
  },
  "form-flow": {
    "purpose": "Create or update a record with a consistent save and cancel contract.",
    "anatomy": [
      "Form fields",
      "error Notice",
      "actions",
      "optional Dialog or Drawer."
    ],
    "behavior": {
      "pointer": "Validate, await persistence, then mark clean and show a Toast. Failed submissions retain all values.",
      "keyboard": "Native controls retain their Tab, Enter and Space behavior. Modal layers trap focus and support Escape when not saving.",
      "focus": "Controls keep focus through inline failures. Modal layers restore focus to the opener.",
      "responsive": "Regions wrap with the Platform layout primitives; fields fill the available width.",
      "motion": "No additional animation; inherited Platform transitions respect reduced motion.",
      "loading": "Pending persistence blocks duplicate actions and announces its busy or save state.",
      "error": "Inline errors preserve values and offer another attempt."
    },
    "a11y": {
      "name": "Each form or dialog has a visible title or an accessible label. Fields use connected labels.",
      "announce": "Failures use an alert Notice; save states use a status Badge with text and an icon.",
      "focus": "All actions are keyboard controls; no status depends on color alone.",
      "contrast": "Only existing Platform surface, text, border and status roles.",
      "motion": "No workflow depends on animation."
    },
    "content": {
      "labels": "Short names for fields and steps; technical values use the data font.",
      "actions": "Explicit verbs: Next, Finish, Save copy, Resume draft, Discard draft, Archive and Restore.",
      "errors": "Explain the failure without clearing entered values.",
      "localization": "All component text is supplied through strings; field and step text belongs to the caller.",
      "guidance": "Use a modal or side panel for simple objects with a few fields. Use a full page or multi-step flow for complex objects with many fields or dependencies. Use inline creation in lists when only a name is needed."
    }
  },
  "autosave": {
    "purpose": "Persist private edits without an explicit save action.",
    "anatomy": [
      "SaveStatus icon Badge and Retry action when a save fails."
    ],
    "behavior": {
      "pointer": "Debounce edits, serialize writes, retain pending work while offline, and retry on reconnect. The initial value is already saved.",
      "keyboard": "Native controls retain their Tab, Enter and Space behavior. Modal layers trap focus and support Escape when not saving.",
      "focus": "Controls keep focus through inline failures. Modal layers restore focus to the opener.",
      "responsive": "Regions wrap with the Platform layout primitives; fields fill the available width.",
      "motion": "No additional animation; inherited Platform transitions respect reduced motion.",
      "loading": "Pending persistence blocks duplicate actions and announces its busy or save state.",
      "error": "Inline errors preserve values and offer another attempt."
    },
    "a11y": {
      "name": "Each form or dialog has a visible title or an accessible label. Fields use connected labels.",
      "announce": "Failures use an alert Notice; save states use a status Badge with text and an icon.",
      "focus": "All actions are keyboard controls; no status depends on color alone.",
      "contrast": "Only existing Platform surface, text, border and status roles.",
      "motion": "No workflow depends on animation."
    },
    "content": {
      "labels": "Short names for fields and steps; technical values use the data font.",
      "actions": "Explicit verbs: Next, Finish, Save copy, Resume draft, Discard draft, Archive and Restore.",
      "errors": "Explain the failure without clearing entered values.",
      "localization": "All component text is supplied through strings; field and step text belongs to the caller.",
      "guidance": "Use it for documents, notes, settings, and long forms where work builds up over time. Use it when each change is safe to keep and easy to undo."
    }
  },
  "draft-state": {
    "purpose": "Make unfinished work discoverable and safe to resume or discard.",
    "anatomy": [
      "Draft icon Badge",
      "optional VersionLabel and save status",
      "resume and discard actions."
    ],
    "behavior": {
      "pointer": "Resume invokes the caller; Discard asks for destructive confirmation and waits for successful removal.",
      "keyboard": "Native controls retain their Tab, Enter and Space behavior. Modal layers trap focus and support Escape when not saving.",
      "focus": "Controls keep focus through inline failures. Modal layers restore focus to the opener.",
      "responsive": "Regions wrap with the Platform layout primitives; fields fill the available width.",
      "motion": "No additional animation; inherited Platform transitions respect reduced motion.",
      "loading": "Pending persistence blocks duplicate actions and announces its busy or save state.",
      "error": "Inline errors preserve values and offer another attempt."
    },
    "a11y": {
      "name": "Each form or dialog has a visible title or an accessible label. Fields use connected labels.",
      "announce": "Failures use an alert Notice; save states use a status Badge with text and an icon.",
      "focus": "All actions are keyboard controls; no status depends on color alone.",
      "contrast": "Only existing Platform surface, text, border and status roles.",
      "motion": "No workflow depends on animation."
    },
    "content": {
      "labels": "Short names for fields and steps; technical values use the data font.",
      "actions": "Explicit verbs: Next, Finish, Save copy, Resume draft, Discard draft, Archive and Restore.",
      "errors": "Explain the failure without clearing entered values.",
      "localization": "All component text is supplied through strings; field and step text belongs to the caller.",
      "guidance": "Use it when objects are published or shared and need preparation first. Use it to keep work in progress that is not ready for review."
    }
  },
  "save-as": {
    "purpose": "Save a separate copy with an explicit name, destination and format.",
    "anatomy": [
      "Name Field",
      "TreeSelect location",
      "optional format Select",
      "error Notice and actions."
    ],
    "behavior": {
      "pointer": "Require a nonblank name and destination, await persistence and keep entered values when it fails.",
      "keyboard": "Native controls retain their Tab, Enter and Space behavior. Modal layers trap focus and support Escape when not saving.",
      "focus": "Controls keep focus through inline failures. Modal layers restore focus to the opener.",
      "responsive": "Regions wrap with the Platform layout primitives; fields fill the available width.",
      "motion": "No additional animation; inherited Platform transitions respect reduced motion.",
      "loading": "Pending persistence blocks duplicate actions and announces its busy or save state.",
      "error": "Inline errors preserve values and offer another attempt."
    },
    "a11y": {
      "name": "Each form or dialog has a visible title or an accessible label. Fields use connected labels.",
      "announce": "Failures use an alert Notice; save states use a status Badge with text and an icon.",
      "focus": "All actions are keyboard controls; no status depends on color alone.",
      "contrast": "Only existing Platform surface, text, border and status roles.",
      "motion": "No workflow depends on animation."
    },
    "content": {
      "labels": "Short names for fields and steps; technical values use the data font.",
      "actions": "Explicit verbs: Next, Finish, Save copy, Resume draft, Discard draft, Archive and Restore.",
      "errors": "Explain the failure without clearing entered values.",
      "localization": "All component text is supplied through strings; field and step text belongs to the caller.",
      "guidance": "Use it for saved views, filters, templates, and documents. Use it when people often start from an existing setup."
    }
  },
  "archive-restore": {
    "purpose": "Remove a record from active use while preserving a clear route to restoration.",
    "anatomy": [
      "Archive action",
      "archived Banner with icon Badge",
      "Restore action and error Notice."
    ],
    "behavior": {
      "pointer": "The caller updates the controlled archived state only after persistence succeeds. Failed writes keep the existing state.",
      "keyboard": "Native controls retain their Tab, Enter and Space behavior. Modal layers trap focus and support Escape when not saving.",
      "focus": "Controls keep focus through inline failures. Modal layers restore focus to the opener.",
      "responsive": "Regions wrap with the Platform layout primitives; fields fill the available width.",
      "motion": "No additional animation; inherited Platform transitions respect reduced motion.",
      "loading": "Pending persistence blocks duplicate actions and announces its busy or save state.",
      "error": "Inline errors preserve values and offer another attempt."
    },
    "a11y": {
      "name": "Each form or dialog has a visible title or an accessible label. Fields use connected labels.",
      "announce": "Failures use an alert Notice; save states use a status Badge with text and an icon.",
      "focus": "All actions are keyboard controls; no status depends on color alone.",
      "contrast": "Only existing Platform surface, text, border and status roles.",
      "motion": "No workflow depends on animation."
    },
    "content": {
      "labels": "Short names for fields and steps; technical values use the data font.",
      "actions": "Explicit verbs: Next, Finish, Save copy, Resume draft, Discard draft, Archive and Restore.",
      "errors": "Explain the failure without clearing entered values.",
      "localization": "All component text is supplied through strings; field and step text belongs to the caller.",
      "guidance": "Use it for finished or inactive items people may need later. Use it as a safe alternative to deleting."
    }
  }
});
