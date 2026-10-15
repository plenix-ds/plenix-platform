// Owner decisions (2026-10-11):
// - a data value outside a table (a slider's or progress indicator's value) is the data role, DM Mono, as the Platforms
//   Standard 3.4 and the font-roles rule say; the iOS entries had DM Sans with tabular digits (Android already had Mono);
// - on mobile widths a conflict follows the platform's own guidelines: the iOS alert keeps Apple's width, not the web
//   dialog's 400.
const fs = require('fs');
const D = __dirname + '/';
const fix = (f, fn) => { const s = fs.readFileSync(D + f, 'utf8'), t = fn(s); if (t === s) throw new Error(f + ': nothing changed'); fs.writeFileSync(D + f, t); };
fix('ios-progress-indicators.json', (s) => s
  .split('Plenix.Font.sans(Plenix.Platform.textDataSize').join('Plenix.Font.mono(Plenix.Platform.textDataSize')
  .split('DM Sans, 13 pt on 18 pt, relative to Footnote (Plenix.Platform.textDataSize), tabular digits').join('DM Mono, 13 pt on 18 pt, relative to Footnote (Plenix.Platform.textDataSize): the data role')
  .split('A UILabel with UIFontDescriptor feature settings for tabular digits').join('A UILabel with DM Mono at the data role, scaled by UIFontMetrics(forTextStyle: .footnote)')
  .split('An NSTextField with monospacedDigitSystemFont, or DM Sans with tabular digits').join('An NSTextField with DM Mono at the data role')
  .split('in tabular digits at the data text role').join('in DM Mono at the data text role'));
fix('ios-sliders.json', (s) => s
  .split('Plenix.Font.sans(Plenix.Platform.textSecondarySize, relativeTo: .footnote)).monospacedDigit()').join('Plenix.Font.mono(Plenix.Platform.textDataSize, relativeTo: .footnote))')
  .split('13 pt on 18 pt, tabular digits (Plenix.Platform.textSecondarySize)').join('DM Mono, 13 pt on 18 pt, the data role (Plenix.Platform.textDataSize)')
  .split('A UILabel with UIFont.monospacedDigitSystemFont replaced by DM Sans and fontDescriptor feature tnum').join('A UILabel with DM Mono at the data role, scaled by UIFontMetrics(forTextStyle: .footnote)'));
fix('ios-alerts.json', (s) => s.split('.frame(maxWidth: Plenix.Component.dialogSmMaxWidth)').join('.frame(maxWidth: 270)   // Apple: the system alert width; on mobile the platform guideline wins'));
console.log('ok');
