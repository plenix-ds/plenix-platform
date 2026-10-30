### Added
- Avatar `ai`: an AI participant shows its provider's logo (#637; owner: "use the known SVG logos, keep it simple"). The built-in logos are Claude, Anthropic, Gemini, Perplexity, Meta, Mistral and DeepSeek.
  - Each is the brand's own single-color mark from Simple Icons 16.35.0, its path unedited, drawn through the icon path like every icon (never markup) and in the avatar's own colors.
  - Their sources, and the providers not included (OpenAI, Microsoft Copilot, Muse) with the reason, are in `platform/icons/custom/BRANDS.md`.
- Avatar `logo`: any other logo, as an icon module or icon name.
- The order: a logo first, then the picture, then the gender icon or the initials.
- The icon names `ai-claude`, `ai-anthropic`, `ai-gemini`, `ai-perplexity`, `ai-meta`, `ai-mistral` and `ai-deepseek`, and the `--plx-comp-avatar-logo-size` token (75% of the square, as the gender icon).
- `tools/icons/import-brand-logos.js` writes the logo files from the pinned package.
