// History (#557): a one-time patch a past agent ran on Windows, kept as written; the mask and glyph setting it names are gone
// (the Tabs caret is an Icon child since #551, and the glyph settings leave icon.css at icon stage 5c-2). Do not run it.
const fs = require('fs');
const p = 'D:/Documents/Projects/Projects_Applications/Plenix/platform/components/Tabs/tabs.css';
let s = fs.readFileSync(p, 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('missing: ' + a.slice(0, 80)); s = s.replace(a, b); };
rep(`.plx-tabs__list{align-items:flex-end;column-gap:var(--plx-comp-tabs-list-gap);display:flex;max-inline-size:100%;overflow-x:auto;scrollbar-width:none;}
`, `/* the strip: the tab list (role=tablist) and, when tabs do not fit, the More menu button after it (outside the tab list).
   Nothing scrolls sideways (reflow, Platforms Standard 3.5): the tab list clips sideways only while Tabs measures, before
   the browser paints, and the tabs that do not fit are hidden and listed in More. */
.plx-tabs__list{align-items:flex-end;column-gap:var(--plx-comp-tabs-list-gap);display:flex;max-inline-size:100%;min-inline-size:0;}
.plx-tabs__tablist{align-items:inherit;column-gap:inherit;display:flex;flex-grow:0;flex-shrink:1;min-inline-size:0;overflow-x:clip;}
.plx-tabs__tab[hidden]{display:none;}
.plx-tabs__more-anchor{display:inline-flex;flex-shrink:0;}
.plx-tabs__more-caret{-webkit-mask-image:var(--plx-comp-icon-glyph-arrow-drop-down);-webkit-mask-position:center;-webkit-mask-repeat:no-repeat;-webkit-mask-size:contain;background-color:currentcolor;block-size:var(--plx-comp-tabs-more-caret-size);flex-shrink:0;inline-size:var(--plx-comp-tabs-more-caret-size);mask-image:var(--plx-comp-icon-glyph-arrow-drop-down);mask-position:center;mask-repeat:no-repeat;mask-size:contain;transition-duration:var(--plx-comp-tabs-more-caret-duration);transition-property:transform;}
.plx-tabs__more[aria-expanded="true"] .plx-tabs__more-caret{transform:rotate(180deg);}
`);
rep(`.plx-tabs--contained:has(>.plx-tabs__list>.plx-tabs__tab:first-child[aria-selected="true"])>.plx-tabs__panel`, `.plx-tabs--contained:has(>.plx-tabs__list>.plx-tabs__tablist>.plx-tabs__tab:first-child[aria-selected="true"])>.plx-tabs__panel`);
rep(`The tab list
   scrolls sideways (overflow-x: auto), so it clips what reaches below it: it reaches one thin line further (padding) and
   gives that line back (margin), so the joint is not clipped and nothing below moves. */`, `The strip
   reaches one thin line further (padding) and gives that line back (margin), so the joint has room below the tabs and
   nothing below moves (the tab list clips only sideways, overflow-x: clip, never below). */`);
fs.writeFileSync(p, s);
console.log('ok');
