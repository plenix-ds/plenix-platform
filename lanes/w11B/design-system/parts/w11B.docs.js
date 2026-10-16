/* Plenix design system · w11B written guidance. */
var docs = {
  "share-dialog": {
    "purpose": "Manage explicit record access for people and existing share links.",
    "anatomy": [
      "People picker and role selector",
      "Current grants with role controls",
      "Restricted link and copy action",
      "Save and Cancel actions"
    ],
    "behavior": {
      "pointer": "Add unique people, edit their roles, await persistence, and keep the access draft on failure. Copy and Web Share never change permissions.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; tours remain non-modal.",
      "focus": "Dialogs restore focus to their opener; teaching bubbles focus actions only after the user starts a tour.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; matrix checkboxes include both row and subject.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Optional education can be dismissed.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Share, Save permissions, Resume tour, Dismiss checklist and Back to articles.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "permissions-editor": {
    "purpose": "Inspect and edit a capabilities matrix for roles or individual people.",
    "anatomy": [
      "Capability rows and subject columns",
      "Named permission checkboxes",
      "Subject selector",
      "PermissionSummary and optional save action"
    ],
    "behavior": {
      "pointer": "Controlled immutable updates leave locked subjects unchanged. Explicit Save awaits persistence and preserves the current draft on failure.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; tours remain non-modal.",
      "focus": "Dialogs restore focus to their opener; teaching bubbles focus actions only after the user starts a tour.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; matrix checkboxes include both row and subject.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Optional education can be dismissed.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Share, Save permissions, Resume tour, Dismiss checklist and Back to articles.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "tour": {
    "purpose": "Explain a few controls with a voluntary sequence of contextual steps.",
    "anatomy": [
      "Persistent target controls",
      "One active TeachingBubble",
      "Step count",
      "Next, Back, Skip and Resume actions"
    ],
    "behavior": {
      "pointer": "Only the current bubble opens. Skip and Escape close it without clearing the remembered step. Resume uses the persisted index; Finish reports completion.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; tours remain non-modal.",
      "focus": "Dialogs restore focus to their opener; teaching bubbles focus actions only after the user starts a tour.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; matrix checkboxes include both row and subject.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Optional education can be dismissed.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Share, Save permissions, Resume tour, Dismiss checklist and Back to articles.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "checklist": {
    "purpose": "Show a short set of setup tasks and the progress already made.",
    "anatomy": [
      "Task group title",
      "Progress bar and technical count",
      "Labeled native checkboxes",
      "Optional collapse and dismiss actions"
    ],
    "behavior": {
      "pointer": "Count only known completed tasks. Disabled tasks remain unchanged. Collapsing preserves completion, and dismissal belongs to the caller.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; tours remain non-modal.",
      "focus": "Dialogs restore focus to their opener; teaching bubbles focus actions only after the user starts a tour.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; matrix checkboxes include both row and subject.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Optional education can be dismissed.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Share, Save permissions, Resume tour, Dismiss checklist and Back to articles.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "onboarding": {
    "purpose": "Offer an optional welcome and reusable setup tasks without blocking product access.",
    "anatomy": [
      "Dismissible welcome Dialog",
      "Setup Checklist",
      "User-started Tour"
    ],
    "behavior": {
      "pointer": "Skipping welcome keeps the setup checklist available. The tour starts only after an explicit action. Callbacks let the application retain seen and completion state.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; tours remain non-modal.",
      "focus": "Dialogs restore focus to their opener; teaching bubbles focus actions only after the user starts a tour.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; matrix checkboxes include both row and subject.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Optional education can be dismissed.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Share, Save permissions, Resume tour, Dismiss checklist and Back to articles.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "feature-intro": {
    "purpose": "Introduce one new feature without turning education into an interruption.",
    "anatomy": [
      "Feature control or label",
      "New icon Badge",
      "Optional TeachingBubble",
      "Requested what-is-new Dialog"
    ],
    "behavior": {
      "pointer": "Show an informational New badge, open details on request, and report dismissal without disabling the feature.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; tours remain non-modal.",
      "focus": "Dialogs restore focus to their opener; teaching bubbles focus actions only after the user starts a tour.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; matrix checkboxes include both row and subject.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Optional education can be dismissed.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Share, Save permissions, Resume tour, Dismiss checklist and Back to articles.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "help-panel": {
    "purpose": "Keep searchable help and article details beside the current task.",
    "anatomy": [
      "Inspector heading",
      "Labeled search field",
      "Article results",
      "Detail content with Back and an optional Link"
    ],
    "behavior": {
      "pointer": "Search titles and summaries without changing context. Select an article to read it, return to results with Back, and retain query state across panel visibility.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; tours remain non-modal.",
      "focus": "Dialogs restore focus to their opener; teaching bubbles focus actions only after the user starts a tour.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; matrix checkboxes include both row and subject.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Optional education can be dismissed.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Share, Save permissions, Resume tour, Dismiss checklist and Back to articles.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  }
};
// The alias shares workflow text; its platform comparison uses the same dialog primitive.
docs.walkthrough = docs.tour;
DSParts.docs.push(docs);
