/* Plenix · DataGrid engine · a pill's text measured as the page draws it
   Moved out of DataGridEngine.jsx without any change to the code (issue 688). The engine is documented in DataGridEngine.jsx. */

// a pill's text measured as the page draws it: a hidden probe pill (md, data or not) inside the grid gives its font, size,
// weight and word spacing, and the ratio between the page's width of a sample and the canvas's (the mono font's
// size-adjust and fitted spaces are not the canvas's); the canvas is left set to that font
const PROBE = '0123456789 ABCDEFGHIJ abcdefghij';

export function pillFont(at, ctx, data) {
  const doc = at.ownerDocument,
    box = doc.createElement('span'),
    pill = doc.createElement('span'),
    value = doc.createElement('span');
  box.className = 'plx-visually-hidden';
  pill.className = 'plx-data-pill plx-data-pill--md' + (data ? ' plx-data-pill--data' : '');
  value.className = 'plx-data-pill__value';
  value.textContent = PROBE;
  pill.appendChild(value);
  box.appendChild(pill);
  (at.querySelector('.plx-data-grid__grid-row .plx-data-grid__grid-cell') || at).appendChild(box); // in a body cell: the cell's own text size
  const cs = getComputedStyle(value),
    page = value.scrollWidth;
  ctx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
  ctx.wordSpacing = cs.wordSpacing || '0px';
  const canvas = ctx.measureText(PROBE).width;
  box.remove();
  return { scale: canvas ? page / canvas : 1, font: ctx.font, wordSpacing: ctx.wordSpacing };
}

// uniform pill widths: the widths live in one constructed sheet per document, one entry per grid
export function pillSheet(doc) {
  if (doc.__plxPillWidths) return doc.__plxPillWidths;
  const sheet = new doc.defaultView.CSSStyleSheet(),
    rules = new Map();
  doc.adoptedStyleSheets = [...doc.adoptedStyleSheets, sheet];
  return (doc.__plxPillWidths = { rules, flush: () => sheet.replaceSync([...rules.values()].join('\n')) });
}
