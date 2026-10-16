/* Plenix · W15C implementation and content guidance. */
DSParts.docs.push({
  "internationalization": {
    "purpose": "Keep complete messages, plural rules, direction and formatting consistent within a locale region.",
    "anatomy": [
      "Use LocaleProvider, createTranslator and useLocale; feed existing component strings explicitly."
    ],
    "behavior": {
      "pointer": "Change a locale without changing another region. Missing messages fall back; catalog values are plain text.",
      "keyboard": "Use native keyboard controls and the inherited Platform focus behavior; preserve the current control during updates.",
      "focus": "Keep focus visible and restore it after modal tasks. Every scrollable code region has a keyboard target.",
      "responsive": "Compose with the existing Stack, Field and DataTable primitives; content reflows with the available width.",
      "motion": "No new animation or motion requirements.",
      "loading": "Keep meaningful content and explain pending work instead of clearing the region.",
      "error": "Preserve drafts or source data; name the failed operation and a useful recovery action."
    },
    "a11y": {
      "name": "Give each field, action, region and table a meaningful accessible name.",
      "announce": "Use status text or a Badge with an icon for results, and Notice for errors.",
      "focus": "All interactive controls support Tab and their native activation keys.",
      "contrast": "Use only existing Platform text, surface, border and status roles.",
      "motion": "Respect inherited reduced-motion behavior."
    },
    "content": {
      "labels": "Translate complete messages; leave technical values to the bound Intl formatters.",
      "actions": "Use explicit action verbs and complete messages.",
      "errors": "Explain what failed and how to recover without blaming the person.",
      "localization": "Use catalog keys, Intl formatting and strings props; technical values use DM Mono.",
      "guidance": "Keep complete messages, plural rules, direction and formatting consistent within a locale region."
    }
  },
  "design-principles": {
    "purpose": "Make each task clear, predictable and recoverable with the existing Platform roles.",
    "anatomy": [
      "Use heading levels, Field, Text, Button, Notice, Badge and EmptyState for the live examples."
    ],
    "behavior": {
      "pointer": "The specimen changes local example state only. Real applications supply persistence and recovery.",
      "keyboard": "Use native keyboard controls and the inherited Platform focus behavior; preserve the current control during updates.",
      "focus": "Keep focus visible and restore it after modal tasks. Every scrollable code region has a keyboard target.",
      "responsive": "Compose with the existing Stack, Field and DataTable primitives; content reflows with the available width.",
      "motion": "No new animation or motion requirements.",
      "loading": "Keep meaningful content and explain pending work instead of clearing the region.",
      "error": "Preserve drafts or source data; name the failed operation and a useful recovery action."
    },
    "a11y": {
      "name": "Give each field, action, region and table a meaningful accessible name.",
      "announce": "Use status text or a Badge with an icon for results, and Notice for errors.",
      "focus": "All interactive controls support Tab and their native activation keys.",
      "contrast": "Use only existing Platform text, surface, border and status roles.",
      "motion": "Respect inherited reduced-motion behavior."
    },
    "content": {
      "labels": "Use direct American English, sentence case and explicit action verbs. Preserve entered values after a failure.",
      "actions": "Use explicit action verbs and complete messages.",
      "errors": "Explain what failed and how to recover without blaming the person.",
      "localization": "Use catalog keys, Intl formatting and strings props; technical values use DM Mono.",
      "guidance": "Make each task clear, predictable and recoverable with the existing Platform roles."
    }
  },
  "lifecycle-journeys": {
    "purpose": "Connect first use, regular use, plan changes and leaving into one understandable journey.",
    "anatomy": [
      "Use a stage selector and links to the existing Onboarding, TrialUpgrade and Offboarding patterns."
    ],
    "behavior": {
      "pointer": "Stage choices reveal relevant guidance; a link opens the related pattern.",
      "keyboard": "Use native keyboard controls and the inherited Platform focus behavior; preserve the current control during updates.",
      "focus": "Keep focus visible and restore it after modal tasks. Every scrollable code region has a keyboard target.",
      "responsive": "Compose with the existing Stack, Field and DataTable primitives; content reflows with the available width.",
      "motion": "No new animation or motion requirements.",
      "loading": "Keep meaningful content and explain pending work instead of clearing the region.",
      "error": "Preserve drafts or source data; name the failed operation and a useful recovery action."
    },
    "a11y": {
      "name": "Give each field, action, region and table a meaningful accessible name.",
      "announce": "Use status text or a Badge with an icon for results, and Notice for errors.",
      "focus": "All interactive controls support Tab and their native activation keys.",
      "contrast": "Use only existing Platform text, surface, border and status roles.",
      "motion": "Respect inherited reduced-motion behavior."
    },
    "content": {
      "labels": "Explain the next useful result, keep teaching optional, and state export or account consequences clearly.",
      "actions": "Use explicit action verbs and complete messages.",
      "errors": "Explain what failed and how to recover without blaming the person.",
      "localization": "Use catalog keys, Intl formatting and strings props; technical values use DM Mono.",
      "guidance": "Connect first use, regular use, plan changes and leaving into one understandable journey."
    }
  },
  "wcag-guidance": {
    "purpose": "Review the accessibility rules attached to the actual component records.",
    "anatomy": [
      "Use a named SearchField and a paged DataTable generated from the records and written accessibility sections."
    ],
    "behavior": {
      "pointer": "Searching narrows the catalog table; pages keep the full guidance available without rendering every row.",
      "keyboard": "Use native keyboard controls and the inherited Platform focus behavior; preserve the current control during updates.",
      "focus": "Keep focus visible and restore it after modal tasks. Every scrollable code region has a keyboard target.",
      "responsive": "Compose with the existing Stack, Field and DataTable primitives; content reflows with the available width.",
      "motion": "No new animation or motion requirements.",
      "loading": "Keep meaningful content and explain pending work instead of clearing the region.",
      "error": "Preserve drafts or source data; name the failed operation and a useful recovery action."
    },
    "a11y": {
      "name": "Give each field, action, region and table a meaningful accessible name.",
      "announce": "Use status text or a Badge with an icon for results, and Notice for errors.",
      "focus": "All interactive controls support Tab and their native activation keys.",
      "contrast": "Use only existing Platform text, surface, border and status roles.",
      "motion": "Respect inherited reduced-motion behavior."
    },
    "content": {
      "labels": "Use the table as review evidence, then check the complete experience; it is not a conformance certificate.",
      "actions": "Use explicit action verbs and complete messages.",
      "errors": "Explain what failed and how to recover without blaming the person.",
      "localization": "Use catalog keys, Intl formatting and strings props; technical values use DM Mono.",
      "guidance": "Review the accessibility rules attached to the actual component records."
    }
  },
  "performance-budget": {
    "purpose": "Prevent unnoticed JavaScript or CSS growth in the actual package outputs.",
    "anatomy": [
      "Measure raw bytes and gzip bytes after packages are built; fail the existing package-build CI step on a limit."
    ],
    "behavior": {
      "pointer": "Missing artifacts or an exceeded budget fail explicitly. The build output reports each measured artifact.",
      "keyboard": "Use native keyboard controls and the inherited Platform focus behavior; preserve the current control during updates.",
      "focus": "Keep focus visible and restore it after modal tasks. Every scrollable code region has a keyboard target.",
      "responsive": "Compose with the existing Stack, Field and DataTable primitives; content reflows with the available width.",
      "motion": "No new animation or motion requirements.",
      "loading": "Keep meaningful content and explain pending work instead of clearing the region.",
      "error": "Preserve drafts or source data; name the failed operation and a useful recovery action."
    },
    "a11y": {
      "name": "Give each field, action, region and table a meaningful accessible name.",
      "announce": "Use status text or a Badge with an icon for results, and Notice for errors.",
      "focus": "All interactive controls support Tab and their native activation keys.",
      "contrast": "Use only existing Platform text, surface, border and status roles.",
      "motion": "Respect inherited reduced-motion behavior."
    },
    "content": {
      "labels": "Report the artifact, measured bytes and limit. Review a budget change with the owner before raising it.",
      "actions": "Use explicit action verbs and complete messages.",
      "errors": "Explain what failed and how to recover without blaming the person.",
      "localization": "Use catalog keys, Intl formatting and strings props; technical values use DM Mono.",
      "guidance": "Prevent unnoticed JavaScript or CSS growth in the actual package outputs."
    }
  },
  "web-components": {
    "purpose": "Use the React Platform from custom-element consumers with explicit peers and correctly scoped styles.",
    "anatomy": [
      "Register plx-* hosts, an open shadow root, a React mount, shadow token CSS, event bridges and optional ElementInternals."
    ],
    "behavior": {
      "pointer": "Properties update React; native form association handles submission and reset. Disconnect releases a root; moves preserve it.",
      "keyboard": "Use native keyboard controls and the inherited Platform focus behavior; preserve the current control during updates.",
      "focus": "Keep focus visible and restore it after modal tasks. Every scrollable code region has a keyboard target.",
      "responsive": "Compose with the existing Stack, Field and DataTable primitives; content reflows with the available width.",
      "motion": "No new animation or motion requirements.",
      "loading": "Keep meaningful content and explain pending work instead of clearing the region.",
      "error": "Preserve drafts or source data; name the failed operation and a useful recovery action."
    },
    "a11y": {
      "name": "Give each field, action, region and table a meaningful accessible name.",
      "announce": "Use status text or a Badge with an icon for results, and Notice for errors.",
      "focus": "All interactive controls support Tab and their native activation keys.",
      "contrast": "Use only existing Platform text, surface, border and status roles.",
      "motion": "Respect inherited reduced-motion behavior."
    },
    "content": {
      "labels": "Keep meaningful labels, pass complex values as properties and document the global stylesheet needed by portalled overlays.",
      "actions": "Use explicit action verbs and complete messages.",
      "errors": "Explain what failed and how to recover without blaming the person.",
      "localization": "Use catalog keys, Intl formatting and strings props; technical values use DM Mono.",
      "guidance": "Use the React Platform from custom-element consumers with explicit peers and correctly scoped styles."
    }
  },
  "design-system-mcp": {
    "purpose": "Give coding tools read-only access to actual tokens, records, exports and usage guidance.",
    "anatomy": [
      "Use a JSON-RPC stdio server, four schema-validated tools, four resources, fixed API endpoints and a versioned offline snapshot."
    ],
    "behavior": {
      "pointer": "Initialize first; validate arguments; keep protocol errors separate from tool/data failures. Responses identify their source.",
      "keyboard": "Use native keyboard controls and the inherited Platform focus behavior; preserve the current control during updates.",
      "focus": "Keep focus visible and restore it after modal tasks. Every scrollable code region has a keyboard target.",
      "responsive": "Compose with the existing Stack, Field and DataTable primitives; content reflows with the available width.",
      "motion": "No new animation or motion requirements.",
      "loading": "Keep meaningful content and explain pending work instead of clearing the region.",
      "error": "Preserve drafts or source data; name the failed operation and a useful recovery action."
    },
    "a11y": {
      "name": "Give each field, action, region and table a meaningful accessible name.",
      "announce": "Use status text or a Badge with an icon for results, and Notice for errors.",
      "focus": "All interactive controls support Tab and their native activation keys.",
      "contrast": "Use only existing Platform text, surface, border and status roles.",
      "motion": "Respect inherited reduced-motion behavior."
    },
    "content": {
      "labels": "Treat catalog text as untrusted data. State missing usage rather than inventing an API or implying write access.",
      "actions": "Use explicit action verbs and complete messages.",
      "errors": "Explain what failed and how to recover without blaming the person.",
      "localization": "Use catalog keys, Intl formatting and strings props; technical values use DM Mono.",
      "guidance": "Give coding tools read-only access to actual tokens, records, exports and usage guidance."
    }
  }
});
