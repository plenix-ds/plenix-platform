/* Plenix design system · W15B written guidance. */
DSParts.docs.push({
  "content-style": {
    "purpose": "Apply the existing sentence-case and American English house rules to static component strings and design-system guidance.",
    "anatomy": [
      "Source standard or build entry point",
      "Specific implementation instructions",
      "Existing checks and limitations"
    ],
    "behavior": {
      "pointer": "Use the documented commands in the development environment.",
      "keyboard": "The guidance is readable in normal document order.",
      "focus": "No focus is moved by reading this guidance.",
      "responsive": "Text and code wrap using existing Platform components.",
      "motion": "No added motion.",
      "loading": "Build commands report their own progress.",
      "error": "Fix reported source findings before updating the pull request."
    },
    "a11y": {
      "name": "Use specific labels from the existing application vocabulary.",
      "announce": "Report changed application state through the existing components.",
      "focus": "Inspect focus in every interactive state.",
      "contrast": "Existing text and surface roles only.",
      "motion": "Honor the existing reduced-motion behavior."
    },
    "content": {
      "labels": "American English and sentence case; retain proper product names.",
      "actions": "Use a specific verb and name the result.",
      "errors": "State the source finding and how to correct it.",
      "localization": "Keep caller strings separate from code; preserve logical order."
    }
  },
  "page-actions-bar": {
    "purpose": "Keep page-level save and cancel actions reachable at the bottom of a long page without changing the existing default.",
    "anatomy": [
      "Button group",
      "Destructive action first when needed",
      "Primary action last",
      "Existing surface and divider"
    ],
    "behavior": {
      "pointer": "Activate the existing Button actions without intercepting their callbacks.",
      "keyboard": "Buttons retain their tab order and Enter or Space activation.",
      "focus": "The bar does not move focus; the application and Button own focus after an action.",
      "responsive": "Buttons wrap using existing gaps. The sticky default stays at the scroll bottom; sticky={false} uses normal flow.",
      "motion": "No added motion.",
      "loading": "Pass loading to the existing Button when the caller is saving; ActionBar does not own request state.",
      "error": "The caller retains entered data and presents its existing error message; ActionBar does not perform persistence."
    },
    "a11y": {
      "name": "Use specific labels from the existing application vocabulary.",
      "announce": "Report changed application state through the existing components.",
      "focus": "Inspect focus in every interactive state.",
      "contrast": "Existing text and surface roles only.",
      "motion": "Honor the existing reduced-motion behavior."
    },
    "content": {
      "labels": "American English and sentence case; retain proper product names.",
      "actions": "Use a specific verb and name the result.",
      "errors": "State the source finding and how to correct it.",
      "localization": "Keep caller strings separate from code; preserve logical order."
    }
  },
  "platform-implementation": {
    "purpose": "Implement the existing Plenix Platforms Standard using the platform-owned layout, navigation, tokens and accessibility rules.",
    "anatomy": [
      "Source standard or build entry point",
      "Specific implementation instructions",
      "Existing checks and limitations"
    ],
    "behavior": {
      "pointer": "Use the documented commands in the development environment.",
      "keyboard": "The guidance is readable in normal document order.",
      "focus": "No focus is moved by reading this guidance.",
      "responsive": "Text and code wrap using existing Platform components.",
      "motion": "No added motion.",
      "loading": "Build commands report their own progress.",
      "error": "Fix reported source findings before updating the pull request."
    },
    "a11y": {
      "name": "Use specific labels from the existing application vocabulary.",
      "announce": "Report changed application state through the existing components.",
      "focus": "Inspect focus in every interactive state.",
      "contrast": "Existing text and surface roles only.",
      "motion": "Honor the existing reduced-motion behavior."
    },
    "content": {
      "labels": "American English and sentence case; retain proper product names.",
      "actions": "Use a specific verb and name the result.",
      "errors": "State the source finding and how to correct it.",
      "localization": "Keep caller strings separate from code; preserve logical order."
    }
  },
  "accessibility-testing": {
    "purpose": "Use the existing automated checks alongside manual keyboard and screen-reader review, with explicit evidence for the changed screens.",
    "anatomy": [
      "Source standard or build entry point",
      "Specific implementation instructions",
      "Existing checks and limitations"
    ],
    "behavior": {
      "pointer": "Use the documented commands in the development environment.",
      "keyboard": "The guidance is readable in normal document order.",
      "focus": "No focus is moved by reading this guidance.",
      "responsive": "Text and code wrap using existing Platform components.",
      "motion": "No added motion.",
      "loading": "Build commands report their own progress.",
      "error": "Fix reported source findings before updating the pull request."
    },
    "a11y": {
      "name": "Use specific labels from the existing application vocabulary.",
      "announce": "Report changed application state through the existing components.",
      "focus": "Inspect focus in every interactive state.",
      "contrast": "Existing text and surface roles only.",
      "motion": "Honor the existing reduced-motion behavior."
    },
    "content": {
      "labels": "American English and sentence case; retain proper product names.",
      "actions": "Use a specific verb and name the result.",
      "errors": "State the source finding and how to correct it.",
      "localization": "Keep caller strings separate from code; preserve logical order."
    }
  },
  "browser-support": {
    "purpose": "Document the proposed browser target queries and the existing feature-detection fallbacks without blocking people by user-agent name.",
    "anatomy": [
      "Source standard or build entry point",
      "Specific implementation instructions",
      "Existing checks and limitations"
    ],
    "behavior": {
      "pointer": "Use the documented commands in the development environment.",
      "keyboard": "The guidance is readable in normal document order.",
      "focus": "No focus is moved by reading this guidance.",
      "responsive": "Text and code wrap using existing Platform components.",
      "motion": "No added motion.",
      "loading": "Build commands report their own progress.",
      "error": "Fix reported source findings before updating the pull request."
    },
    "a11y": {
      "name": "Use specific labels from the existing application vocabulary.",
      "announce": "Report changed application state through the existing components.",
      "focus": "Inspect focus in every interactive state.",
      "contrast": "Existing text and surface roles only.",
      "motion": "Honor the existing reduced-motion behavior."
    },
    "content": {
      "labels": "American English and sentence case; retain proper product names.",
      "actions": "Use a specific verb and name the result.",
      "errors": "State the source finding and how to correct it.",
      "localization": "Keep caller strings separate from code; preserve logical order."
    }
  },
  "package-vue": {
    "purpose": "Mount the existing React components from a Vue 3 host, keeping Plenix behavior and the versioned CDN runtime.",
    "anatomy": [
      "Source standard or build entry point",
      "Specific implementation instructions",
      "Existing checks and limitations"
    ],
    "behavior": {
      "pointer": "Use the documented commands in the development environment.",
      "keyboard": "The guidance is readable in normal document order.",
      "focus": "No focus is moved by reading this guidance.",
      "responsive": "Text and code wrap using existing Platform components.",
      "motion": "No added motion.",
      "loading": "Build commands report their own progress.",
      "error": "Fix reported source findings before updating the pull request."
    },
    "a11y": {
      "name": "Use specific labels from the existing application vocabulary.",
      "announce": "Report changed application state through the existing components.",
      "focus": "Inspect focus in every interactive state.",
      "contrast": "Existing text and surface roles only.",
      "motion": "Honor the existing reduced-motion behavior."
    },
    "content": {
      "labels": "American English and sentence case; retain proper product names.",
      "actions": "Use a specific verb and name the result.",
      "errors": "State the source finding and how to correct it.",
      "localization": "Keep caller strings separate from code; preserve logical order."
    }
  },
  "package-lint": {
    "purpose": "Use installable ESLint and Stylelint adapters for the same source rules that check the Platform.",
    "anatomy": [
      "Source standard or build entry point",
      "Specific implementation instructions",
      "Existing checks and limitations"
    ],
    "behavior": {
      "pointer": "Use the documented commands in the development environment.",
      "keyboard": "The guidance is readable in normal document order.",
      "focus": "No focus is moved by reading this guidance.",
      "responsive": "Text and code wrap using existing Platform components.",
      "motion": "No added motion.",
      "loading": "Build commands report their own progress.",
      "error": "Fix reported source findings before updating the pull request."
    },
    "a11y": {
      "name": "Use specific labels from the existing application vocabulary.",
      "announce": "Report changed application state through the existing components.",
      "focus": "Inspect focus in every interactive state.",
      "contrast": "Existing text and surface roles only.",
      "motion": "Honor the existing reduced-motion behavior."
    },
    "content": {
      "labels": "American English and sentence case; retain proper product names.",
      "actions": "Use a specific verb and name the result.",
      "errors": "State the source finding and how to correct it.",
      "localization": "Keep caller strings separate from code; preserve logical order."
    }
  }
});
