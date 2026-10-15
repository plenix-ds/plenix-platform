# The Plenix Android design: brief for each writer

Plenix is a design system (repo: your working directory; the spec site is
platform/design-system). Each native component page shows the Plenix guidance turned into an actual Plenix control: its
variants, states, anatomy, every attribute from the Plenix token to the code that sets it, and code. iOS is done with
SwiftUI, UIKit and AppKit. You do the Android pages in your task, with Jetpack Compose (Material 3) and Android Views
(Material Components for Android). There are no Figma drawings for Android: write data and code only.
Scratchpad = your own session scratchpad (temporary files only); the shared tools are in tools/agent/

## Learn the model first (read, do not edit)
- tools/agent/native/ios-buttons.json: the finished iOS Buttons entry. Your entries have the same shape, with these
  differences: no "figma" and no "images"; the system-default column is "material" (not "apple"); the code columns
  are "compose" and "views" (not swiftui/uikit/appkit) in variants, attributes and states; code is
  { compose: [lines], views: [lines] } (Kotlin, and XML or Kotlin for Views). "follows": a short name of the Material 3
  guidance it follows (for example "Material 3: Buttons") with "followsUrl" set to its m3.material.io page (a link only;
  never copy Material's text).
- The Plenix Web counterpart: JSX and CSS in platform/components/<Name>/ or platform/patterns/<Name>/, its tokens in
  platform/tokens/components.tokens.json, resolved values in platform/tokens/tokens.index.json (each token: name,
  sets[].value; follow var(--…) chains). The Plenix Android look = the Web component's own tokens and roles with the
  Android values the platform sets (platform/tokens/platform-android.tokens.json: 48 dp targets, the Android text
  roles), DM Sans, Plenix colors and radii. Keep Material 3's structure and behavior (ripple, semantics, TalkBack,
  font scale); change the look.
- platform/mobile/android/PlenixTokens.kt: the generated names (PlenixColors.<role>.current() in a @Composable,
  PlenixRadius.*, PlenixSpace.*, PlenixPlatform.*, PlenixFonts.SANS). Code may use only names that exist there; no
  literal colors or numbers where a token exists.
- The page's iOS counterparts (native-guidance.js byAndroid / native-design entries in tools/agent/native/ios-*.json as
  they appear) for consistency of the Plenix variant names.

## Data
Write tools/agent/native/android-<slug>.json: { "<page key>": { summary, variants[], anatomy[], attributes[], states[],
code: { compose[], views[] } } }. Plenix's own words, American English, sentence case, the typographic apostrophe ’ in
prose. Variants map to the Plenix Web variants (web: an existing Web page key such as "forms|Switch").
Run: node tools/agent/native/check.js tools/agent/native/android-<slug>.json — it must print ALL OK.

## Rules
- Write only your tools/agent/native/android-<slug>.json files. Do not edit any other file, do not run builds, releases
  or deploys, do not commit, do not use Figma.

## Report
Per page: the key, the variants, the checker result, and anything you could not do. Keep it short.
