/* Plenix design system · w14B written guidance. */
DSParts.docs.push({
  "ai-label": {
    "purpose": "Identify generated content with the existing sparkle icon and readable text.",
    "anatomy": [
      "Sparkle icon",
      "Readable origin label",
      "Optional explanation disclosure"
    ],
    "behavior": {
      "pointer": "Disclose the explanation only on explicit activation. Identification never implies correctness or verification.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; AI actions remain explicit.",
      "focus": "Dialogs restore focus to their opener; viewports support keyboard scrolling.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; suggestions and citations have specific names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Existing content is retained after errors.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Regenerate, Helpful, Search and Open.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "generated-content": {
    "purpose": "Review generated content, give feedback and move between caller-owned versions.",
    "anatomy": [
      "AILabel",
      "Retained content",
      "Version pager",
      "Feedback and regenerate actions",
      "Recoverable error"
    ],
    "behavior": {
      "pointer": "Await actions once, retain content on failure and cancel obsolete work on version changes. The caller supplies regenerated versions.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; AI actions remain explicit.",
      "focus": "Dialogs restore focus to their opener; viewports support keyboard scrolling.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; suggestions and citations have specific names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Existing content is retained after errors.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Regenerate, Helpful, Search and Open.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "prompt-history": {
    "purpose": "Find and reuse a saved prompt without implicitly sending it to a model.",
    "anatomy": [
      "Optional SearchField",
      "Prompt actions",
      "Data-font timestamps",
      "Empty or error message"
    ],
    "behavior": {
      "pointer": "Filter without mutating history. An explicit selection invokes the caller once; failures preserve the prompt list.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; AI actions remain explicit.",
      "focus": "Dialogs restore focus to their opener; viewports support keyboard scrolling.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; suggestions and citations have specific names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Existing content is retained after errors.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Regenerate, Helpful, Search and Open.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "citation": {
    "purpose": "Show a numbered source reference with a real link and enough context to inspect it.",
    "anatomy": [
      "Numbered disclosure or source heading",
      "Source Link",
      "Author and excerpt"
    ],
    "behavior": {
      "pointer": "The marker opens a source Popover. Navigation remains a Link; unsafe URL protocols are not interactive.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; AI actions remain explicit.",
      "focus": "Dialogs restore focus to their opener; viewports support keyboard scrolling.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; suggestions and citations have specific names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Existing content is retained after errors.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Regenerate, Helpful, Search and Open.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "suggested-action": {
    "purpose": "Offer an optional action that runs only when explicitly activated.",
    "anatomy": [
      "Sparkle action button",
      "Optional description",
      "Pending or error message"
    ],
    "behavior": {
      "pointer": "Wait for the caller, prevent duplicate actions and expose a recoverable error without implying acceptance.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; AI actions remain explicit.",
      "focus": "Dialogs restore focus to their opener; viewports support keyboard scrolling.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; suggestions and citations have specific names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Existing content is retained after errors.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Regenerate, Helpful, Search and Open.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "ai-search": {
    "purpose": "Place an identified generated answer and citations above normal search results.",
    "anatomy": [
      "Search form",
      "Optional semantic Switch",
      "Generated answer and sources",
      "Result Links"
    ],
    "behavior": {
      "pointer": "Only submit searches. New requests abort and supersede stale results. Failed searches retain the previous answer; toggling semantic search never submits implicitly.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; AI actions remain explicit.",
      "focus": "Dialogs restore focus to their opener; viewports support keyboard scrolling.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; suggestions and citations have specific names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Existing content is retained after errors.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Regenerate, Helpful, Search and Open.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  },
  "recommendation": {
    "purpose": "Offer manually browsed recommendations with an explanation when one is available.",
    "anatomy": [
      "Named Carousel",
      "Recommendation content",
      "Optional reason Popover",
      "Explicit Link or action"
    ],
    "behavior": {
      "pointer": "Never autoplay or navigate on appearance. Reasons come from the caller; real links keep normal browser behavior.",
      "keyboard": "All actions use native Platform keyboard controls. Modal dialogs support Escape and trap focus; AI actions remain explicit.",
      "focus": "Dialogs restore focus to their opener; viewports support keyboard scrolling.",
      "responsive": "Use the responsive Platform Dialog, SidePanel and wrapping layout primitives.",
      "motion": "No new motion; inherited components honor reduced motion.",
      "loading": "Pending persistence prevents duplicate actions; callers retain draft data.",
      "error": "Failures remain visible and preserve editable values."
    },
    "a11y": {
      "name": "Forms, panels and controls have explicit names; suggestions and citations have specific names.",
      "announce": "Errors are alerts; progress and permission summaries announce changes politely.",
      "focus": "Native focus order is preserved. Existing content is retained after errors.",
      "contrast": "Existing theme and Badge roles only.",
      "motion": "Reduced motion is inherited from the Platform."
    },
    "content": {
      "labels": "Use short task-oriented labels and named roles.",
      "actions": "Explicit verbs: Regenerate, Helpful, Search and Open.",
      "errors": "Keep the user in context and preserve their work.",
      "localization": "Every built-in word is configurable through strings; article and task content comes from the caller."
    }
  }
});

DSParts.docs.push({
  "ai-visual-language": {
    "purpose": "Identify AI origin without creating a new color system or implying correctness.",
    "anatomy": [
      "Existing sparkle icon",
      "Readable origin label",
      "Optional explicit explanation"
    ],
    "behavior": {
      "pointer": "Origin text is static; an explanation uses the existing Popover.",
      "keyboard": "All interactive disclosures use Platform keyboard controls.",
      "focus": "Disclosures restore focus to their opener.",
      "responsive": "Labels wrap with the existing layout primitives.",
      "motion": "No new motion.",
      "loading": "Retain origin identification while caller work is pending.",
      "error": "Origin labels never replace an actionable error."
    },
    "a11y": {
      "name": "Readable labels identify origin; the sparkle is decorative.",
      "announce": "Do not announce a static origin label repeatedly.",
      "focus": "Static origin labels do not take focus.",
      "contrast": "Existing neutral component and theme roles only.",
      "motion": "No motion introduced."
    },
    "content": {
      "labels": "AI-generated identifies origin only.",
      "actions": "Use explicit task verbs for suggestions and regeneration.",
      "errors": "Keep previous content and describe recovery.",
      "localization": "The label and disclosure words are configurable through strings."
    }
  }
});
