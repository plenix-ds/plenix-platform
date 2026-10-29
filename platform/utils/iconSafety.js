/* Plenix · iconSafety (platform/utils/iconSafety.js)
   Summary: An icon file or an icon module's drawing is untrusted (issue 285, stage 4 of issue 277): this reads it through an
     allow-list and returns only the drawing's values, never markup. Deny by default: anything not listed rejects the whole
     file, with the reason.
   Usage:
     const r = checkIconSvg(text);      // { ok: true, drawing: { viewBox, d, transform?, fillRule?, clipRule? } } | { ok: false, reason }
     const s = checkDrawing(drawing);   // the same values from a module (registerIcons, <Icon icon>): { ok } | { ok: false, reason }
   Props:
     checkIconSvg(text): one SVG file's text
     checkDrawing(drawing): { viewBox, d, transform?, fillRule?, clipRule? }
     ICON_LIMITS: { file: 32768, d: 16384 } characters (the largest shipped file is 4,272, its path 4,166)
   Behavior:
     A file is one <svg> (attributes xmlns = the SVG namespace, width, height, viewBox) holding exactly one <path>
       (attributes d, transform, fill-rule, clip-rule), with whitespace between them and an optional leading XML
       declaration. Everything else is refused: other elements (script, style, foreignObject, use, image, a, g, animate,
       set, and the basic shapes: circle, ellipse, rect, line, polyline, polygon, which an icon draws as one path), other
       attributes (event handlers, href, xlink:href, style, class, id, fill), doctypes, entities, CDATA, comments,
       processing instructions, text content, a second drawing.
     Values by grammar: viewBox four numbers with a positive width and height; width and height numbers; d path data only
       (commands and numbers), starting with a move; transform only matrix, translate, scale, rotate, skewX and skewY of
       numbers; fill-rule and clip-rule nonzero or evenodd. No value may hold anything else (no url(, no javascript:).
     Bounded: a file over ICON_LIMITS.file or a d over ICON_LIMITS.d characters is refused before it is read.
   Notes:
     Every file the library ships passes (17,120 files, platform/icons and its custom and library folders), and reads
       exactly as before. The Icon component renders the returned values as React props; nothing is ever inserted as HTML.
*/
export const ICON_LIMITS = { file: 32768, d: 16384 };
const SVG_NS = 'http://www.w3.org/2000/svg';
const NUM = '[+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:[eE][+-]?\\d+)?';
const IS_NUM = new RegExp('^' + NUM + '$');
const VIEWBOX = new RegExp('^\\s*(' + NUM + ')[\\s,]+(' + NUM + ')[\\s,]+(' + NUM + ')[\\s,]+(' + NUM + ')\\s*$');
const PATH_DATA = /^\s*[Mm][MmLlHhVvCcSsQqTtAaZz0-9eE.,+\-\s]*$/;
const TRANSFORM = new RegExp('^\\s*(?:(?:matrix|translate|scale|rotate|skewX|skewY)\\s*\\(\\s*' + NUM + '(?:\\s*[,\\s]\\s*' + NUM + ')*\\s*\\)\\s*,?\\s*)+$');
const RULE = /^(nonzero|evenodd)$/;
const SHAPES = { circle: 1, ellipse: 1, rect: 1, line: 1, polyline: 1, polygon: 1 };
const ALLOWED = {
  svg: { xmlns: 1, width: 1, height: 1, viewBox: 1 },
  path: { d: 1, transform: 1, 'fill-rule': 1, 'clip-rule': 1 },
};
const no = (reason) => ({ ok: false, reason });

// one drawing's values, the same rules for a file and a module
function checkValues(viewBox, d, transform, fillRule, clipRule) {
  if (typeof d !== 'string' || !d) return no('the path has no d');
  if (d.length > ICON_LIMITS.d) return no('the path data is longer than ' + ICON_LIMITS.d + ' characters');
  if (!PATH_DATA.test(d)) return no('d holds something other than path data');
  const box = typeof viewBox === 'string' && VIEWBOX.exec(viewBox);
  if (!box) return no('viewBox is not four numbers');
  if (!(parseFloat(box[3]) > 0 && parseFloat(box[4]) > 0)) return no('viewBox has no positive width and height');
  if (transform != null && (typeof transform !== 'string' || !TRANSFORM.test(transform))) return no('transform holds something other than matrix, translate, scale, rotate or skew of numbers');
  if (fillRule != null && !RULE.test(fillRule)) return no('fill-rule is not nonzero or evenodd');
  if (clipRule != null && !RULE.test(clipRule)) return no('clip-rule is not nonzero or evenodd');
  return { ok: true };
}

export function checkDrawing(drawing) {
  if (!drawing || typeof drawing !== 'object') return no('the drawing is not an object');
  for (const k of Object.keys(drawing)) if (!{ viewBox: 1, d: 1, transform: 1, fillRule: 1, clipRule: 1 }[k]) return no('the drawing has a field ' + k + ' that is not allowed');
  return checkValues(drawing.viewBox, drawing.d, drawing.transform, drawing.fillRule, drawing.clipRule);
}

// the attributes of one tag: name="value" or name='value', each once, nothing else
function attributes(text) {
  const out = {}, re = /\s+([a-zA-Z][a-zA-Z0-9:_-]*)\s*=\s*(?:"([^"<>]*)"|'([^'<>]*)')/y;
  let at = 0;
  while (at < text.length) {
    if (/^\s*$/.test(text.slice(at))) break;
    re.lastIndex = at;
    const m = re.exec(text);
    if (!m) return null;
    if (Object.prototype.hasOwnProperty.call(out, m[1])) return { duplicate: m[1] };
    out[m[1]] = m[2] != null ? m[2] : m[3];
    at = re.lastIndex;
  }
  return out;
}

export function checkIconSvg(text) {
  if (typeof text !== 'string') return no('the file is not text');
  if (text.length > ICON_LIMITS.file) return no('the file is larger than ' + ICON_LIMITS.file + ' characters');
  let s = text.replace(/^﻿/, '').replace(/^\s*<\?xml\s[^<>?]*\?>/, '');
  if (s.includes('<!')) return no('the file has a doctype, an entity, CDATA or a comment');
  if (s.includes('<?')) return no('the file has a processing instruction');
  if (s.includes('&')) return no('the file has an entity reference');
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(s)) return no('the file has control characters');
  // every element named anywhere first, so the reason names it (a script, a style, a foreignObject)
  for (const m of s.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9:_-]*)/g)) {
    if (SHAPES[m[1]]) return no('a basic shape (' + m[1] + ') is not accepted: an icon is drawn as one path');
    if (!ALLOWED[m[1]]) return no('the element ' + m[1] + ' is not allowed');
  }
  // the file as tags with only whitespace between them
  const tags = [], re = /\s*<(\/?)([a-zA-Z][a-zA-Z0-9:_-]*)((?:\s+[^<>]*?)?)\s*(\/?)>\s*/y;
  let at = 0;
  while (at < s.length) {
    re.lastIndex = at;
    const m = re.exec(s);
    if (!m) return no(/^\s*$/.test(s.slice(at)) ? 'the file ends early' : 'the file has text or markup outside its tags');
    tags.push({ close: !!m[1], name: m[2], attrs: m[3] || '', self: !!m[4] });
    at = re.lastIndex;
  }
  for (const t of tags) {
    if (SHAPES[t.name]) return no('a basic shape (' + t.name + ') is not accepted: an icon is drawn as one path');
    if (!ALLOWED[t.name]) return no('the element ' + t.name + ' is not allowed');
    if (t.close && (t.self || t.attrs.trim())) return no('a closing tag has attributes');
  }
  // the shape: <svg …> <path …/> </svg>, or <path …></path>
  const [svg, path, ...rest] = tags;
  const end = rest.length === 1 ? rest[0] : rest.length === 2 && rest[0].close && rest[0].name === 'path' ? rest[1] : null;
  if (!svg || svg.name !== 'svg' || svg.close || svg.self) return no('the file does not start with <svg>');
  if (!path || path.name !== 'path' || path.close) return no('the file has no path');
  if (rest.length === 2 && path.self) return no('the file has more than one drawing');
  if (!end || !end.close || end.name !== 'svg') return no(tags.filter((t) => !t.close && t.name === 'path').length > 1 ? 'the file has more than one drawing' : 'the file does not end with </svg>');
  if (rest.length === 1 && !path.self) return no('the path is not closed');
  const sa = attributes(svg.attrs), pa = attributes(path.attrs);
  if (!sa || !pa) return no('an attribute is not name="value"');
  if (sa.duplicate || pa.duplicate) return no('the attribute ' + (sa.duplicate || pa.duplicate) + ' is written twice');
  for (const k of Object.keys(sa)) if (!ALLOWED.svg[k]) return no('the attribute ' + k + ' is not allowed on svg');
  for (const k of Object.keys(pa)) if (!ALLOWED.path[k]) return no('the attribute ' + k + ' is not allowed on path');
  if (sa.xmlns != null && sa.xmlns !== SVG_NS) return no('xmlns is not the SVG namespace');
  for (const k of ['width', 'height']) if (sa[k] != null && !IS_NUM.test(sa[k])) return no(k + ' is not a number');
  const viewBox = sa.viewBox != null ? sa.viewBox : sa.width != null && sa.height != null ? '0 0 ' + sa.width + ' ' + sa.height : null;
  const v = checkValues(viewBox, pa.d, pa.transform, pa['fill-rule'], pa['clip-rule']);
  if (!v.ok) return v;
  const drawing = { viewBox, d: pa.d };
  if (pa.transform != null) drawing.transform = pa.transform;
  if (pa['fill-rule'] != null) drawing.fillRule = pa['fill-rule'];
  if (pa['clip-rule'] != null) drawing.clipRule = pa['clip-rule'];
  return { ok: true, drawing };
}
