const fs = require('fs');
const p = 'D:/Documents/Projects/Projects_Applications/Plenix/platform/tokens/components.tokens.json';
let s = fs.readFileSync(p, 'utf8');
const anchor = '    "tabs-list-gap": {';
if (!s.includes(anchor)) throw new Error('anchor');
if (s.includes('"tabs-more-caret-size"')) { console.log('already'); process.exit(0); }
s = s.replace(anchor, `    "tabs-more-caret-size": {
      "$value": "{plx-ref.size-12px}",
      "$type": "dimension",
      "$description": "The chevron on the Tabs' More menu button (the tabs that do not fit): the arrow_drop_down glyph in its whole square, 12px like the Button caret."
    },
    "tabs-more-caret-duration": {
      "$value": "{plx-sys.motion-duration-fast}",
      "$type": "duration",
      "$description": "The More chevron turning while its menu opens, as fast as the Button caret."
    },
` + anchor);
fs.writeFileSync(p, s);
console.log('ok');
