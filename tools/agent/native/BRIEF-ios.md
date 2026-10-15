# The Plenix iOS design: brief for each writer

Plenix is a design system (repo: your working directory; the spec site is
platform/design-system). Its owner wants every iOS component shown the way the iOS Buttons page now is: the Plenix
guidance turned into an actual Plenix control, Apple's kit default beside the same kit component styled with the Plenix
tokens (in Figma), its anatomy, every attribute from the Plenix token to SwiftUI, UIKit and AppKit, its states and code.
You do this for the iOS pages in your task. Scratchpad = your own session scratchpad (temporary files only); the shared tools are in tools/agent/

## Learn the model first (read, do not edit)
- tools/agent/native/ios-buttons.json: the finished Buttons entry. Your entries have exactly this shape.
- tools/agent/native/button-figma.js: the Figma script that drew the Buttons comparison (and the rules in its header).
- platform/standards/figma-map.json: the kit components of each iOS page (page id = the kit page to draw on, component
  ids, variant axes). platform/standards/native-guidance.json pages["<key>"]: Plenix's rules for the page; an
  attribute's "follows" must be one of its rule "section" values.
- The Plenix Web counterpart: its JSX and CSS in platform/components/<Name>/ or platform/patterns/<Name>/, its tokens in
  platform/tokens/components.tokens.json, and the resolved values in platform/tokens/tokens.index.json (each token:
  name, sets[].value; follow var(--…) chains). The Plenix iOS look = the Web component's own tokens and roles, with the
  iOS values where the platform sets them: touch heights (plx-sys-control-height-standard = 44), the iOS text roles
  (platform/tokens/platform-ios.tokens.json: label 15/20 semibold, body 17/22 ...), DM Sans, Plenix colors and radii.
  Keep the native structure and behavior (Apple's control, gestures, Dynamic Type, VoiceOver); change the look.
- platform/mobile/ios/PlenixTokens.swift: the generated Swift names (Plenix.Colors.*, Plenix.Radius.*, Plenix.Space.*,
  Plenix.Platform.*, Plenix.Font.sans(_:relativeTo:)). Code may use only names that exist there; no literal colors or
  numbers where a token exists.

## Figma (the owner's copy of Apple's iOS and iPadOS 27 kit, fileKey DmrfSZiICFRBqgOci5dRQ6)
1. Read the MCP resource skill://figma/figma-use/SKILL.md (server plugin:design:figma) with ReadMcpResourceTool before
   any use_figma call, and pass skillNames "resource:figma-use,resource:figma-generate-design".
2. Inspect the kit component set (read-only use_figma): its variants, layers (fills, radii, padding, text).
3. On the component's own kit page, build ONE wrapper named exactly "Plenix for iOS · <Leaf>" (remove an old one with
   that name first; never touch anything else; never create pages, variables or collections): a title, then 4 rows:
   Apple default · Light, Apple default · Dark (explicit mode on Apple's "Colors" collection: Light 404:0, Dark 404:1),
   Plenix · Light, Plenix · Dark (bind the "Plenix Light"/"Plenix Dark" variables). Each row shows the Plenix variants
   as columns (kit instances; the Plenix rows restyled by binding variables: fills, strokes, radii, padding, minHeight,
   DM Sans text). Place it right of the page's existing content.
4. Beside it (below), a frame "Plenix for iOS · <Leaf> · Anatomy": one Plenix-styled instance (Light), red C10000
   lettered markers with lines to its parts, a caption naming the parts, a title.
5. get_screenshot each frame (maxDimension 1400), download with curl -sL to
   platform/design-system/native/ios-<slug>-compare.png and ios-<slug>-anatomy.png (<slug> = the leaf in lowercase,
   spaces to hyphens). Look at the PNGs (Read) and fix anything clipped or wrong.
   If a component cannot be drawn this way (a system surface you cannot restyle), draw what you can and say why.

## Data
Write tools/agent/native/ios-<slug>.json: { "<page key>": { summary, figma: { compare, anatomy, page }, images: { compare:
{src: "native/ios-<slug>-compare.png", alt}, anatomy: {...} }, variants[], anatomy[], attributes[], states[], code:
{ swiftui[], uikit[], appkit[] } } } with the Buttons fields. Plenix's own words, American English, sentence case, the
typographic apostrophe ’ in prose. Never copy Apple's text. Variants map to the Plenix Web variants (web: a Web page key
such as "forms|Switch" that exists in inventory-taxonomy.js). AppKit: PlenixTokens.swift is iOS-only (UIColor), so AppKit
code names the tokens with a one-line comment that a macOS build of the tokens is needed (see the Buttons entry).
Run: node tools/agent/native/check.js tools/agent/native/ios-<slug>.json — it must print ALL OK.

## Rules
- Write only: your tools/agent/native/ios-<slug>.json files, the PNGs in platform/design-system/native/, and your Figma
  frames. Do not edit any other file, do not run builds, releases or deploys, do not commit.
- If Figma refuses (rate limit), wait and retry a few times; if it keeps failing, write the data without images
  (omit images/figma) and report it.

## Report
Per page: the key, the variants and the Figma frame ids, the files written, the checker result, and anything you could not
do (with the reason). Keep it short.
