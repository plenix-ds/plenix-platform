/* Plenix · w13C written guidance. */
DSParts.docs.push({
  "mention-input": {
    "purpose": "Mention a directory entity in plain or formatted text while retaining its identity.",
    "anatomy": [
      "Named text editor",
      "Mention trigger or Add mention button",
      "EntityPicker or rich-text suggestion list"
    ],
    "behavior": {
      "pointer": "Plain text selections replace the stored caret query and return focus. Rich text delegates atomic mentions to the existing editor engine.",
      "keyboard": "Use native Platform controls in source order. Mention suggestions use combobox or rich editor keyboard behavior.",
      "focus": "Dialogs restore focus to their opener. Failed decisions preserve comments and focus.",
      "responsive": "Use wrapping Platform layouts and responsive dialogs and tables.",
      "motion": "No automatic dismissal or new motion. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every editor, table, announcement and approval stage.",
      "announce": "Announce errors, changes in workflow status and announcement dismissal.",
      "focus": "Use native Tab order and focus return from dialogs.",
      "contrast": "Use existing theme roles.",
      "motion": "Announcements and decisions remain under user control."
    },
    "content": {
      "labels": "Use precise entity, actor, stage and field names.",
      "actions": "Use Add mention, Dismiss announcement, Approve, Reject and Request changes explicitly.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; entity labels, events and announcement content belong to the caller."
    }
  },
  "announcement": {
    "purpose": "Show an announcement with explicit actions in the appropriate existing surface.",
    "anatomy": [
      "Title and content",
      "Banner, Card or Dialog",
      "Optional actions",
      "Dismiss action and failure notice"
    ],
    "behavior": {
      "pointer": "No automatic expiry. Dismissal waits for persistence and preserves the announcement after failure.",
      "keyboard": "Use native Platform controls in source order. Mention suggestions use combobox or rich editor keyboard behavior.",
      "focus": "Dialogs restore focus to their opener. Failed decisions preserve comments and focus.",
      "responsive": "Use wrapping Platform layouts and responsive dialogs and tables.",
      "motion": "No automatic dismissal or new motion. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every editor, table, announcement and approval stage.",
      "announce": "Announce errors, changes in workflow status and announcement dismissal.",
      "focus": "Use native Tab order and focus return from dialogs.",
      "contrast": "Use existing theme roles.",
      "motion": "Announcements and decisions remain under user control."
    },
    "content": {
      "labels": "Use precise entity, actor, stage and field names.",
      "actions": "Use Add mention, Dismiss announcement, Approve, Reject and Request changes explicitly.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; entity labels, events and announcement content belong to the caller."
    }
  },
  "audit-log": {
    "purpose": "Read immutable actor, time, action and target events and inspect their changes.",
    "anatomy": [
      "Audit DataTable",
      "Actor Persona",
      "Timestamp Time",
      "Optional before-and-after Dialog DataTable"
    ],
    "behavior": {
      "pointer": "Differences open only on request. Values render as text; audit events are never editable in the viewer.",
      "keyboard": "Use native Platform controls in source order. Mention suggestions use combobox or rich editor keyboard behavior.",
      "focus": "Dialogs restore focus to their opener. Failed decisions preserve comments and focus.",
      "responsive": "Use wrapping Platform layouts and responsive dialogs and tables.",
      "motion": "No automatic dismissal or new motion. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every editor, table, announcement and approval stage.",
      "announce": "Announce errors, changes in workflow status and announcement dismissal.",
      "focus": "Use native Tab order and focus return from dialogs.",
      "contrast": "Use existing theme roles.",
      "motion": "Announcements and decisions remain under user control."
    },
    "content": {
      "labels": "Use precise entity, actor, stage and field names.",
      "actions": "Use Add mention, Dismiss announcement, Approve, Reject and Request changes explicitly.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; entity labels, events and announcement content belong to the caller."
    }
  },
  "approval-workflow": {
    "purpose": "Collect authorized reviewer decisions in sequential or parallel stages.",
    "anatomy": [
      "Overall WorkflowStatus",
      "Sequential ProgressSteps",
      "Read-only ReviewFlow per stage",
      "Assigned reviewer comment and explicit decisions"
    ],
    "behavior": {
      "pointer": "Sequential stages wait for prior approvals. Parallel reviewers act independently; rejection or requested changes require a reason. Failed persistence preserves comments.",
      "keyboard": "Use native Platform controls in source order. Mention suggestions use combobox or rich editor keyboard behavior.",
      "focus": "Dialogs restore focus to their opener. Failed decisions preserve comments and focus.",
      "responsive": "Use wrapping Platform layouts and responsive dialogs and tables.",
      "motion": "No automatic dismissal or new motion. Existing components honor reduced motion.",
      "loading": "Display caller progress and prevent duplicate per-item requests.",
      "error": "Preserve input and offer explicit recovery."
    },
    "a11y": {
      "name": "Name every editor, table, announcement and approval stage.",
      "announce": "Announce errors, changes in workflow status and announcement dismissal.",
      "focus": "Use native Tab order and focus return from dialogs.",
      "contrast": "Use existing theme roles.",
      "motion": "Announcements and decisions remain under user control."
    },
    "content": {
      "labels": "Use precise entity, actor, stage and field names.",
      "actions": "Use Add mention, Dismiss announcement, Approve, Reject and Request changes explicitly.",
      "errors": "Describe how to recover without discarding work.",
      "localization": "Built-in text is configurable through strings; entity labels, events and announcement content belong to the caller."
    }
  }
});
