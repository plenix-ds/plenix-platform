const fs = require('fs');
const edit = (f, pairs) => { let s = fs.readFileSync(f, 'utf8'); for (const [a, b] of pairs) { const n = s.split(a).length - 1; if (!n) throw new Error(f + ' missing ' + a); s = s.split(a).join(b); } fs.writeFileSync(f, s); };
edit('ios-progress-indicators.json', [
  ['"A UILabel with DM Mono at the data role, scaled by UIFontMetrics(forTextStyle: .footnote)"', '"A UILabel with UIFont(name: Plenix.Font.mono, size: Plenix.Platform.textDataSize) (the data role), scaled by UIFontMetrics(forTextStyle: .footnote)"'],
  ['"An NSTextField with DM Mono at the data role"', '"An NSTextField with NSFont(name: Plenix.Font.mono, size: Plenix.Platform.textDataSize) (the data role)"'],
]);
edit('ios-sliders.json', [
  ['"A UILabel with DM Mono at the data role, scaled by UIFontMetrics(forTextStyle: .footnote)"', '"A UILabel with UIFont(name: Plenix.Font.mono, size: Plenix.Platform.textDataSize) (the data role), scaled by UIFontMetrics(forTextStyle: .footnote)"'],
  ['"An NSTextField with a NumberFormatter"', '"An NSTextField with a NumberFormatter and NSFont(name: Plenix.Font.mono, size: Plenix.Platform.textDataSize) (the data role)"'],
]);
edit('android-progress-indicators.json', [
  ['"Text(percent, style = TextStyle(fontFamily = Mono, fontSize = PlenixPlatform.textDataSize', '"Text(percent, style = TextStyle(fontFamily = FontFamily(Font(R.font.dm_mono_regular)), fontSize = PlenixPlatform.textDataSize'],
]);
