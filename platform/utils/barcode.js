/* Plenix · Barcode encoding (platform/utils/barcode.js)
   Summary: Turns a value into the bars of a one-dimensional barcode: Code 128 (any printable ASCII text), EAN-13 and
     UPC-A (retail numbers, with their check digit). The Barcode component draws the result; nothing here touches the page.
   Usage:
     encodeBarcode('PLX-2026-0042')                 // { format: 'code128', modules: 167, bars: [[0, 2], …], text: 'PLX-2026-0042' }
     encodeBarcode('400638133393', 'ean13')         // the check digit is added: text '4 006381 333931'
     encodeBarcode('03600029145', 'upca')           // text '0 36000 29145 2'
     barcodeCheckDigit('400638133393')              // 1
   Props:
     encodeBarcode(value, format): format "code128" (default) | "ean13" | "upca"; returns { format, value, modules (the
       width in narrow bars), bars ([start, width] pairs in modules), text (the human-readable line) } or null when the
       value cannot be written in that format (letters in an EAN, a wrong check digit, text outside printable ASCII)
     barcodeCheckDigit(digits): the EAN / UPC check digit of 11 (UPC-A) or 12 (EAN-13) digits
     BARCODE_QUIET_ZONE: the empty modules kept on each side (10), so a scanner finds the first bar
   Behavior:
     Code 128 uses code set C (two digits per symbol) when the whole value is an even number of four or more digits, else
       code set B. The symbol check character is added.
     EAN-13 takes 12 digits (the check digit is computed) or 13 (the check digit must match); UPC-A takes 11 or 12, and
       is drawn as the EAN-13 with a leading 0, which is the same pattern.
   Notes:
     The bars are geometry for an SVG viewBox in modules: the stylesheet sets the height and the width follows.
*/

// Code 128: the bar and space widths of symbols 0–106 (106 is the stop, with its final bar)
const C128 = ('212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 221312 231212 112232 122132 122231 113222 '
  + '123122 123221 223211 221132 221231 213212 223112 312131 311222 321122 321221 312212 322112 322211 212123 212321 232121 '
  + '111323 131123 131321 112313 132113 132311 211313 231113 231311 112133 112331 132131 113123 113321 133121 313121 211331 '
  + '231131 213113 213311 213131 311123 311321 331121 312113 312311 332111 314111 221411 431111 111224 111422 121124 121421 '
  + '141122 141221 112214 112412 122114 122411 142112 142211 241211 221114 413111 241112 134111 111242 121142 121241 114212 '
  + '124112 124211 411212 421112 421211 212141 214121 412121 111143 111341 131141 114113 114311 411113 411311 113141 114131 '
  + '311141 411131 211412 211214 211232 2331112').split(' ');
const START_B = 104, START_C = 105, STOP = 106;

// EAN: the left odd (L) patterns; R is L inverted, G is R reversed; the first digit sets the left half's L/G parity
const L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
const R = L.map((p) => p.replace(/./g, (b) => (b === '1' ? '0' : '1')));
const G = R.map((p) => p.split('').reverse().join(''));
const PARITY = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];

export const BARCODE_QUIET_ZONE = 10;

// widths ("212222", bar first) to [start, width] bars from a module offset
function widthsToBars(widths, at, out) {
  let x = at;
  for (let i = 0; i < widths.length; i++) {
    const w = +widths[i];
    if (i % 2 === 0) out.push([x, w]);
    x += w;
  }
  return x;
}
// a module string ("1011…") to [start, width] bars
function modulesToBars(bits) {
  const out = [];
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] !== '1') continue;
    let j = i;
    while (bits[j + 1] === '1') j++;
    out.push([i, j - i + 1]);
    i = j;
  }
  return out;
}

function code128(value) {
  const text = String(value);
  if (!text.length || !/^[\x20-\x7E]+$/.test(text)) return null;
  const digits = /^\d+$/.test(text) && text.length >= 4 && text.length % 2 === 0;
  const codes = digits ? [START_C] : [START_B];
  if (digits) for (let i = 0; i < text.length; i += 2) codes.push(+text.slice(i, i + 2));
  else for (const ch of text) codes.push(ch.charCodeAt(0) - 32);
  const check = codes.reduce((sum, c, i) => sum + c * (i || 1), 0) % 103;
  codes.push(check, STOP);
  const bars = [];
  let x = 0;
  codes.forEach((c) => { x = widthsToBars(C128[c], x, bars); });
  return { format: 'code128', value: text, modules: x, bars, text };
}

export function barcodeCheckDigit(digits) {
  const d = String(digits).split('').map(Number);
  // weights from the right: 3, 1, 3, … (the digit next to the check digit weighs 3)
  const sum = d.reverse().reduce((s, n, i) => s + n * (i % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10;
}

function ean13(value, upc) {
  const raw = String(value).replace(/\s+/g, '');
  const len = upc ? 11 : 12;
  if (!/^\d+$/.test(raw) || (raw.length !== len && raw.length !== len + 1)) return null;
  const body = raw.slice(0, len);
  const check = barcodeCheckDigit(body);
  if (raw.length === len + 1 && +raw[len] !== check) return null;
  const full = (upc ? '0' : '') + body + check;   // UPC-A is EAN-13 with a leading 0
  const parity = PARITY[+full[0]];
  let bits = '101';
  for (let i = 1; i <= 6; i++) bits += (parity[i - 1] === 'L' ? L : G)[+full[i]];
  bits += '01010';
  for (let i = 7; i <= 12; i++) bits += R[+full[i]];
  bits += '101';
  const shown = upc ? full.slice(1) : full;
  const text = upc ? shown[0] + ' ' + shown.slice(1, 6) + ' ' + shown.slice(6, 11) + ' ' + shown[11] : full[0] + ' ' + full.slice(1, 7) + ' ' + full.slice(7);
  return { format: upc ? 'upca' : 'ean13', value: shown, modules: bits.length, bars: modulesToBars(bits), text };
}

export function encodeBarcode(value, format = 'code128') {
  if (value === undefined || value === null) return null;
  if (format === 'ean13') return ean13(value, false);
  if (format === 'upca') return ean13(value, true);
  return code128(value);
}
