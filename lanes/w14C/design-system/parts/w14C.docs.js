/* Plenix design system · AI interaction guidance. */
DSParts.docs.push({
  "ai-button": {
    "purpose": "Request a clearly named AI action, never automatic generation.",
    "anatomy": [
      "Sparkle button with an explicit action name",
      "Optional menu of available actions",
      "Pending indication and recoverable error"
    ],
    "behavior": {
      "pointer": "A trigger requests its named action; a menu choice supplies its stable action ID. Disabled choices never request work.",
      "keyboard": "Existing Platform controls support Tab, Enter, Space and menu navigation.",
      "focus": "Menus and Popovers restore focus; failed custom instructions retain their fields.",
      "responsive": "Wrapping layouts, existing Dialog and Popover responsive behavior.",
      "motion": "Thinking reuses the existing Spinner and reduced motion behavior; no new animation.",
      "loading": "Synchronous request locks prevent duplicates and controls report pending state.",
      "error": "Preserve input and display a recoverable error. Confidence values are supplied, not estimated."
    },
    "a11y": {
      "name": "Every icon-only trigger has a name; confidence levels and changes have text.",
      "announce": "Failures use alerts; decisions and actual processing progress use status regions.",
      "focus": "Explicit keyboard controls remain available for every action.",
      "contrast": "Existing neutral Badge, text and action roles only; no AI color.",
      "motion": "Honor the Platform reduced motion preferences."
    },
    "content": {
      "labels": "State what the requested action will do.",
      "actions": "Explicit verbs: Summarize, Refine, Accept and Reject.",
      "errors": "Explain retry without promising accuracy.",
      "localization": "Built-in words use strings; generated content and factors belong to callers."
    }
  },
  "ai-disclaimer": {
    "purpose": "Remind people to check AI content and provide an optional policy link.",
    "anatomy": [
      "Existing sparkle icon",
      "Plain language review reminder",
      "Optional policy link"
    ],
    "behavior": {
      "pointer": "Render a persistent, readable reminder inline or in a footer. A policy address is a real link, with no scripted dismissal or accuracy promise.",
      "keyboard": "Existing Platform controls support Tab, Enter, Space and menu navigation.",
      "focus": "Menus and Popovers restore focus; failed custom instructions retain their fields.",
      "responsive": "Wrapping layouts, existing Dialog and Popover responsive behavior.",
      "motion": "Thinking reuses the existing Spinner and reduced motion behavior; no new animation.",
      "loading": "Synchronous request locks prevent duplicates and controls report pending state.",
      "error": "Preserve input and display a recoverable error. Confidence values are supplied, not estimated."
    },
    "a11y": {
      "name": "Every icon-only trigger has a name; confidence levels and changes have text.",
      "announce": "Failures use alerts; decisions and actual processing progress use status regions.",
      "focus": "Explicit keyboard controls remain available for every action.",
      "contrast": "Existing neutral Badge, text and action roles only; no AI color.",
      "motion": "Honor the Platform reduced motion preferences."
    },
    "content": {
      "labels": "State what the requested action will do.",
      "actions": "Explicit verbs: Summarize, Refine, Accept and Reject.",
      "errors": "Explain retry without promising accuracy.",
      "localization": "Built-in words use strings; generated content and factors belong to callers."
    }
  },
  "confidence-indicator": {
    "purpose": "Present supplied confidence without manufacturing a certainty score.",
    "anatomy": [
      "Neutral icon Badge naming the supplied confidence level",
      "Optional numeric ratio formatted in the data font",
      "Unavailable text for absent or invalid confidence"
    ],
    "behavior": {
      "pointer": "Accept qualitative confidence directly, or a finite ratio from zero through one. Do not infer confidence, clamp invalid scores or encode certainty only through color.",
      "keyboard": "Existing Platform controls support Tab, Enter, Space and menu navigation.",
      "focus": "Menus and Popovers restore focus; failed custom instructions retain their fields.",
      "responsive": "Wrapping layouts, existing Dialog and Popover responsive behavior.",
      "motion": "Thinking reuses the existing Spinner and reduced motion behavior; no new animation.",
      "loading": "Synchronous request locks prevent duplicates and controls report pending state.",
      "error": "Preserve input and display a recoverable error. Confidence values are supplied, not estimated."
    },
    "a11y": {
      "name": "Every icon-only trigger has a name; confidence levels and changes have text.",
      "announce": "Failures use alerts; decisions and actual processing progress use status regions.",
      "focus": "Explicit keyboard controls remain available for every action.",
      "contrast": "Existing neutral Badge, text and action roles only; no AI color.",
      "motion": "Honor the Platform reduced motion preferences."
    },
    "content": {
      "labels": "State what the requested action will do.",
      "actions": "Explicit verbs: Summarize, Refine, Accept and Reject.",
      "errors": "Explain retry without promising accuracy.",
      "localization": "Built-in words use strings; generated content and factors belong to callers."
    }
  },
  "ai-explanation": {
    "purpose": "Explain a recommendation with caller supplied reasons on request.",
    "anatomy": [
      "Named explanation trigger",
      "Contextual explanation Popover",
      "Caller supplied factors and optional confidence"
    ],
    "behavior": {
      "pointer": "Open reasons only when requested. Factors describe actual supplied evidence; an absent explanation is not replaced by an invented reason. Escape and Tab away close the existing Popover.",
      "keyboard": "Existing Platform controls support Tab, Enter, Space and menu navigation.",
      "focus": "Menus and Popovers restore focus; failed custom instructions retain their fields.",
      "responsive": "Wrapping layouts, existing Dialog and Popover responsive behavior.",
      "motion": "Thinking reuses the existing Spinner and reduced motion behavior; no new animation.",
      "loading": "Synchronous request locks prevent duplicates and controls report pending state.",
      "error": "Preserve input and display a recoverable error. Confidence values are supplied, not estimated."
    },
    "a11y": {
      "name": "Every icon-only trigger has a name; confidence levels and changes have text.",
      "announce": "Failures use alerts; decisions and actual processing progress use status regions.",
      "focus": "Explicit keyboard controls remain available for every action.",
      "contrast": "Existing neutral Badge, text and action roles only; no AI color.",
      "motion": "Honor the Platform reduced motion preferences."
    },
    "content": {
      "labels": "State what the requested action will do.",
      "actions": "Explicit verbs: Summarize, Refine, Accept and Reject.",
      "errors": "Explain retry without promising accuracy.",
      "localization": "Built-in words use strings; generated content and factors belong to callers."
    }
  },
  "prompt-suggestions": {
    "purpose": "Offer optional prompt choices with explicit selection.",
    "anatomy": [
      "Named suggestions group",
      "Prompt chips or cards with descriptions",
      "Pending state and retry message"
    ],
    "behavior": {
      "pointer": "A chip or card action sends the full selected option to the application. Disabled suggestions remain inert; failed selection remains available for retry.",
      "keyboard": "Existing Platform controls support Tab, Enter, Space and menu navigation.",
      "focus": "Menus and Popovers restore focus; failed custom instructions retain their fields.",
      "responsive": "Wrapping layouts, existing Dialog and Popover responsive behavior.",
      "motion": "Thinking reuses the existing Spinner and reduced motion behavior; no new animation.",
      "loading": "Synchronous request locks prevent duplicates and controls report pending state.",
      "error": "Preserve input and display a recoverable error. Confidence values are supplied, not estimated."
    },
    "a11y": {
      "name": "Every icon-only trigger has a name; confidence levels and changes have text.",
      "announce": "Failures use alerts; decisions and actual processing progress use status regions.",
      "focus": "Explicit keyboard controls remain available for every action.",
      "contrast": "Existing neutral Badge, text and action roles only; no AI color.",
      "motion": "Honor the Platform reduced motion preferences."
    },
    "content": {
      "labels": "State what the requested action will do.",
      "actions": "Explicit verbs: Summarize, Refine, Accept and Reject.",
      "errors": "Explain retry without promising accuracy.",
      "localization": "Built-in words use strings; generated content and factors belong to callers."
    }
  },
  "ai-thinking": {
    "purpose": "Communicate active work and caller supplied progress steps without invented completion.",
    "anatomy": [
      "Existing Spinner and sparkle identification",
      "Visible processing description",
      "Optional ordered caller supplied steps"
    ],
    "behavior": {
      "pointer": "Use thinking for ongoing work without a completion estimate. With steps, display the supplied current stage; completion is never timed or invented. The existing typing dots remain unchanged.",
      "keyboard": "Existing Platform controls support Tab, Enter, Space and menu navigation.",
      "focus": "Menus and Popovers restore focus; failed custom instructions retain their fields.",
      "responsive": "Wrapping layouts, existing Dialog and Popover responsive behavior.",
      "motion": "Thinking reuses the existing Spinner and reduced motion behavior; no new animation.",
      "loading": "Synchronous request locks prevent duplicates and controls report pending state.",
      "error": "Preserve input and display a recoverable error. Confidence values are supplied, not estimated."
    },
    "a11y": {
      "name": "Every icon-only trigger has a name; confidence levels and changes have text.",
      "announce": "Failures use alerts; decisions and actual processing progress use status regions.",
      "focus": "Explicit keyboard controls remain available for every action.",
      "contrast": "Existing neutral Badge, text and action roles only; no AI color.",
      "motion": "Honor the Platform reduced motion preferences."
    },
    "content": {
      "labels": "State what the requested action will do.",
      "actions": "Explicit verbs: Summarize, Refine, Accept and Reject.",
      "errors": "Explain retry without promising accuracy.",
      "localization": "Built-in words use strings; generated content and factors belong to callers."
    }
  },
  "suggested-edit": {
    "purpose": "Inspect a proposed text change and explicitly accept or reject it.",
    "anatomy": [
      "Original text marked as deletion",
      "Proposed text marked as insertion",
      "Explicit Accept and Reject actions, optional Accept all",
      "Recorded decision Badge or recoverable failure"
    ],
    "behavior": {
      "pointer": "An individual decision sends its edit ID; Accept all sends only outstanding IDs. Keep accepted edit versions inert while refreshed server data is pending. A changed before/after version becomes independently reviewable.",
      "keyboard": "Existing Platform controls support Tab, Enter, Space and menu navigation.",
      "focus": "Menus and Popovers restore focus; failed custom instructions retain their fields.",
      "responsive": "Wrapping layouts, existing Dialog and Popover responsive behavior.",
      "motion": "Thinking reuses the existing Spinner and reduced motion behavior; no new animation.",
      "loading": "Synchronous request locks prevent duplicates and controls report pending state.",
      "error": "Preserve input and display a recoverable error. Confidence values are supplied, not estimated."
    },
    "a11y": {
      "name": "Every icon-only trigger has a name; confidence levels and changes have text.",
      "announce": "Failures use alerts; decisions and actual processing progress use status regions.",
      "focus": "Explicit keyboard controls remain available for every action.",
      "contrast": "Existing neutral Badge, text and action roles only; no AI color.",
      "motion": "Honor the Platform reduced motion preferences."
    },
    "content": {
      "labels": "State what the requested action will do.",
      "actions": "Explicit verbs: Summarize, Refine, Accept and Reject.",
      "errors": "Explain retry without promising accuracy.",
      "localization": "Built-in words use strings; generated content and factors belong to callers."
    }
  },
  "refine-menu": {
    "purpose": "Request a length, tone or custom revision without silently changing the text.",
    "anatomy": [
      "Named sparkle menu trigger",
      "Length choices and tone submenu",
      "Custom instruction Dialog",
      "Preserved instruction and error after failure"
    ],
    "behavior": {
      "pointer": "Length and tone selections request one revision. A custom instruction must be nonblank, remains editable after failure and clears only after successful persistence. Never change the source text directly.",
      "keyboard": "Existing Platform controls support Tab, Enter, Space and menu navigation.",
      "focus": "Menus and Popovers restore focus; failed custom instructions retain their fields.",
      "responsive": "Wrapping layouts, existing Dialog and Popover responsive behavior.",
      "motion": "Thinking reuses the existing Spinner and reduced motion behavior; no new animation.",
      "loading": "Synchronous request locks prevent duplicates and controls report pending state.",
      "error": "Preserve input and display a recoverable error. Confidence values are supplied, not estimated."
    },
    "a11y": {
      "name": "Every icon-only trigger has a name; confidence levels and changes have text.",
      "announce": "Failures use alerts; decisions and actual processing progress use status regions.",
      "focus": "Explicit keyboard controls remain available for every action.",
      "contrast": "Existing neutral Badge, text and action roles only; no AI color.",
      "motion": "Honor the Platform reduced motion preferences."
    },
    "content": {
      "labels": "State what the requested action will do.",
      "actions": "Explicit verbs: Summarize, Refine, Accept and Reject.",
      "errors": "Explain retry without promising accuracy.",
      "localization": "Built-in words use strings; generated content and factors belong to callers."
    }
  },
  "ai-action": {
    "purpose": "Request a clearly named AI action, never automatic generation.",
    "anatomy": [
      "Sparkle button with an explicit action name",
      "Optional menu of available actions",
      "Pending indication and recoverable error"
    ],
    "behavior": {
      "pointer": "A trigger requests its named action; a menu choice supplies its stable action ID. Disabled choices never request work.",
      "keyboard": "Existing Platform controls support Tab, Enter, Space and menu navigation.",
      "focus": "Menus and Popovers restore focus; failed custom instructions retain their fields.",
      "responsive": "Wrapping layouts, existing Dialog and Popover responsive behavior.",
      "motion": "Thinking reuses the existing Spinner and reduced motion behavior; no new animation.",
      "loading": "Synchronous request locks prevent duplicates and controls report pending state.",
      "error": "Preserve input and display a recoverable error. Confidence values are supplied, not estimated."
    },
    "a11y": {
      "name": "Every icon-only trigger has a name; confidence levels and changes have text.",
      "announce": "Failures use alerts; decisions and actual processing progress use status regions.",
      "focus": "Explicit keyboard controls remain available for every action.",
      "contrast": "Existing neutral Badge, text and action roles only; no AI color.",
      "motion": "Honor the Platform reduced motion preferences."
    },
    "content": {
      "labels": "State what the requested action will do.",
      "actions": "Explicit verbs: Summarize, Refine, Accept and Reject.",
      "errors": "Explain retry without promising accuracy.",
      "localization": "Built-in words use strings; generated content and factors belong to callers."
    }
  },
  "suggestion-decision": {
    "purpose": "Inspect a proposed text change and explicitly accept or reject it.",
    "anatomy": [
      "Original text marked as deletion",
      "Proposed text marked as insertion",
      "Explicit Accept and Reject actions, optional Accept all",
      "Recorded decision Badge or recoverable failure"
    ],
    "behavior": {
      "pointer": "An individual decision sends its edit ID; Accept all sends only outstanding IDs. Keep accepted edit versions inert while refreshed server data is pending. A changed before/after version becomes independently reviewable.",
      "keyboard": "Existing Platform controls support Tab, Enter, Space and menu navigation.",
      "focus": "Menus and Popovers restore focus; failed custom instructions retain their fields.",
      "responsive": "Wrapping layouts, existing Dialog and Popover responsive behavior.",
      "motion": "Thinking reuses the existing Spinner and reduced motion behavior; no new animation.",
      "loading": "Synchronous request locks prevent duplicates and controls report pending state.",
      "error": "Preserve input and display a recoverable error. Confidence values are supplied, not estimated."
    },
    "a11y": {
      "name": "Every icon-only trigger has a name; confidence levels and changes have text.",
      "announce": "Failures use alerts; decisions and actual processing progress use status regions.",
      "focus": "Explicit keyboard controls remain available for every action.",
      "contrast": "Existing neutral Badge, text and action roles only; no AI color.",
      "motion": "Honor the Platform reduced motion preferences."
    },
    "content": {
      "labels": "State what the requested action will do.",
      "actions": "Explicit verbs: Summarize, Refine, Accept and Reject.",
      "errors": "Explain retry without promising accuracy.",
      "localization": "Built-in words use strings; generated content and factors belong to callers."
    }
  }
});
