# AI provider logos

These are the built-in logos `Avatar` shows with `ai="<provider>"` (owner, 2026-10-29, #637: "use the known SVG logos, keep it simple").

- Each logo is the brand's own single-color mark, taken from Simple Icons 16.35.0 (npm `simple-icons@16.35.0`, the icon data released under CC0).
- The path data is unedited. A transform on the path places it on Material's grid (`viewBox="0 -960 960 960"`) with the set's padding.
- `tools/icons/import-brand-logos.js` writes the files from the unpacked package. The four files of a logo hold the same drawing.
- Like every icon, a logo draws in the current text color. Inside an Avatar it takes the avatar's colors, never the brand's.
- The logos are their owners' trademarks. They name the provider of an AI participant and imply no endorsement.
- Before using a logo elsewhere, read the brand's guidelines (Simple Icons' disclaimer: https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md).

| `ai=` | Icon name | Simple Icons slug | Source recorded by Simple Icons | Brand guidelines |
|---|---|---|---|---|
| `claude` | `ai-claude` | `claude` | https://claude.ai | not recorded |
| `anthropic` | `ai-anthropic` | `anthropic` | https://www.anthropic.com | not recorded |
| `gemini` | `ai-gemini` | `googlegemini` | https://gemini.google.com | not recorded |
| `perplexity` | `ai-perplexity` | `perplexity` | https://www.perplexity.ai | not recorded |
| `meta` | `ai-meta` | `meta` | https://www.meta.com | https://www.facebook.com/brand/resources/meta/company-brand |
| `mistral` | `ai-mistral` | `mistralai` | https://chat.mistral.ai | not recorded |
| `deepseek` | `ai-deepseek` | `deepseek` | https://www.deepseek.com | not recorded |

"Not recorded" means Simple Icons lists no guidelines link, which does not mean the brand has none.

## Not included

The rule (#637): a logo comes in only from a published single-color mark with a recorded source. A provider without one is listed here for a decision, not drawn.

| Provider | Why it is not included |
|---|---|
| OpenAI, ChatGPT, Codex | Not in Simple Icons 16.35.0. Adding it from OpenAI's own brand material needs a decision. |
| Microsoft Copilot | Not in Simple Icons 16.35.0. Adding it from Microsoft's own brand material needs a decision. |
| Muse | No public logo was found for a provider of this name. |

Until a decision is made, any of these can be shown through Avatar's `logo` prop with an icon module the application provides.
