/* Plenix design system · w14A written guidance. */
DSParts.docs.push({
  "prompt-input": {
    "purpose": "Write, attach context and choose an available model before explicitly sending a prompt.",
    "anatomy": [
      "Visible Field label",
      "Input or Textarea",
      "Optional local FileInput",
      "Model chip menu",
      "Send or Stop action",
      "Retained error"
    ],
    "behavior": {
      "pointer": "Enter sends once; Shift+Enter starts a line. IME composition does not submit. Failed requests retain the draft; Stop delegates transport cancellation.",
      "keyboard": "Enter submits; Shift+Enter adds a line; composition keys never submit. Model menu uses arrow keys and Escape.",
      "focus": "Keep focus on the composer after sending. Suggestions focus it without submitting.",
      "responsive": "Existing components reflow at narrow widths; model and attachment controls wrap. Sheet uses native-inspired responsive forms.",
      "motion": "StreamingText has no animation or cursor motion, including when reduced motion is requested.",
      "loading": "Show caller-owned processing, prevent duplicate sends and expose Stop while streaming.",
      "error": "Retain the failed draft or partial answer and explain recovery in readable text."
    },
    "a11y": {
      "name": "Visible field and region names are configurable with strings.",
      "announce": "Do not announce every streamed token. Announce completion or stop through a persistent LiveRegion.",
      "focus": "Scrolling Chat threads are keyboard reachable and named.",
      "contrast": "Use existing component roles and readable sparkle identification; no AI color.",
      "motion": "No new animation."
    },
    "content": {
      "labels": "Use specific prompt, source and action labels. Never promise correctness.",
      "actions": "Send, stop, regenerate and refine only after an explicit request.",
      "errors": "Retain the draft and invite another attempt.",
      "localization": "Provide all visible words through strings and nested component strings."
    }
  },
  "streaming-text": {
    "purpose": "Read partial plain-text output without screen-reader interruption on every token.",
    "anatomy": [
      "Status Badge with icon",
      "Retained response text",
      "Persistent completion LiveRegion"
    ],
    "behavior": {
      "pointer": "Only lifecycle transitions announce. Streaming tokens stay quiet; completion or stop announces the retained response. Content is plain text, never model HTML.",
      "keyboard": "Existing controls support Enter and Space. Source links navigate normally. Escape dismisses overlays.",
      "focus": "Keep focus on the composer after sending. Suggestions focus it without submitting.",
      "responsive": "Existing components reflow at narrow widths; model and attachment controls wrap. Sheet uses native-inspired responsive forms.",
      "motion": "StreamingText has no animation or cursor motion, including when reduced motion is requested.",
      "loading": "Show caller-owned processing, prevent duplicate sends and expose Stop while streaming.",
      "error": "Retain the failed draft or partial answer and explain recovery in readable text."
    },
    "a11y": {
      "name": "Visible field and region names are configurable with strings.",
      "announce": "Do not announce every streamed token. Announce completion or stop through a persistent LiveRegion.",
      "focus": "Scrolling Chat threads are keyboard reachable and named.",
      "contrast": "Use existing component roles and readable sparkle identification; no AI color.",
      "motion": "No new animation."
    },
    "content": {
      "labels": "Use specific prompt, source and action labels. Never promise correctness.",
      "actions": "Send, stop, regenerate and refine only after an explicit request.",
      "errors": "Retain the draft and invite another attempt.",
      "localization": "Provide all visible words through strings and nested component strings."
    }
  },
  "ai-chat": {
    "purpose": "Have an explicitly identified conversation with AI while retaining review, citations and caller-owned history.",
    "anatomy": [
      "Chat header with AILabel",
      "Keyboard reachable Chat thread",
      "GeneratedContent and StreamingText",
      "Citation source links",
      "Optional RefineMenu and PromptSuggestions",
      "PromptInput and AIDisclaimer"
    ],
    "behavior": {
      "pointer": "Suggestions fill the draft and focus it without sending. Caller owns each response and transport. Source links navigate; feedback, regenerate and refine are explicit.",
      "keyboard": "Existing controls support Enter and Space. Source links navigate normally. Escape dismisses overlays.",
      "focus": "Keep focus on the composer after sending. Suggestions focus it without submitting.",
      "responsive": "Existing components reflow at narrow widths; model and attachment controls wrap. Sheet uses native-inspired responsive forms.",
      "motion": "StreamingText has no animation or cursor motion, including when reduced motion is requested.",
      "loading": "Show caller-owned processing, prevent duplicate sends and expose Stop while streaming.",
      "error": "Retain the failed draft or partial answer and explain recovery in readable text."
    },
    "a11y": {
      "name": "Visible field and region names are configurable with strings.",
      "announce": "Do not announce every streamed token. Announce completion or stop through a persistent LiveRegion.",
      "focus": "Scrolling Chat threads are keyboard reachable and named.",
      "contrast": "Use existing component roles and readable sparkle identification; no AI color.",
      "motion": "No new animation."
    },
    "content": {
      "labels": "Use specific prompt, source and action labels. Never promise correctness.",
      "actions": "Send, stop, regenerate and refine only after an explicit request.",
      "errors": "Retain the draft and invite another attempt.",
      "localization": "Provide all visible words through strings and nested component strings."
    }
  },
  "assistant-panel": {
    "purpose": "Bring an AI conversation alongside current work using an existing inspector or responsive overlay.",
    "anatomy": [
      "SidePanel or Sheet",
      "Named header and dismissal",
      "Caller-supplied context",
      "AIChat"
    ],
    "behavior": {
      "pointer": "Inspector adapts through SidePanel; overlay contains and restores focus through Sheet. Dismissal reports closed state and never sends or silently cancels transport.",
      "keyboard": "Existing controls support Enter and Space. Source links navigate normally. Escape dismisses overlays.",
      "focus": "Sheet contains focus and restores it to the opener. Inspector stays in normal page order.",
      "responsive": "Existing components reflow at narrow widths; model and attachment controls wrap. Sheet uses native-inspired responsive forms.",
      "motion": "StreamingText has no animation or cursor motion, including when reduced motion is requested.",
      "loading": "Show caller-owned processing, prevent duplicate sends and expose Stop while streaming.",
      "error": "Retain the failed draft or partial answer and explain recovery in readable text."
    },
    "a11y": {
      "name": "Visible field and region names are configurable with strings.",
      "announce": "Do not announce every streamed token. Announce completion or stop through a persistent LiveRegion.",
      "focus": "Scrolling Chat threads are keyboard reachable and named.",
      "contrast": "Use existing component roles and readable sparkle identification; no AI color.",
      "motion": "No new animation."
    },
    "content": {
      "labels": "Use specific prompt, source and action labels. Never promise correctness.",
      "actions": "Send, stop, regenerate and refine only after an explicit request.",
      "errors": "Retain the draft and invite another attempt.",
      "localization": "Provide all visible words through strings and nested component strings."
    }
  }
});
