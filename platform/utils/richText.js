/* Plenix · richText
   Summary: The single HTML sanitization entry point for prose and editor content, backed by vendored DOMPurify.
   Usage: sanitizeRichText(html, document) returns safe DOM nodes; cleanRichText(html) returns their HTML serialization.
   Props: Optional document selects the owning frame. The application's Trusted Types CSP must allow policy dompurify.
   Behavior: Parses with DOMPurify, then copies the existing Plenix prose allow-list and permitted user formatting.
     Never renders an untrusted HTML string. Factory instances and named policies are created only on first use.
   Notes: No default Trusted Types policy or permissive application policy is installed. No remote sanitizer code. */
import createDOMPurify from './vendor/dompurify.js';
const purifiers = new WeakMap();
const MENTION_CLASS = 'plx-rich-text-editor__mention', CHECK_CLASS = 'plx-check__input';
const ALLOWED = { P: 1, BR: 1, STRONG: 1, EM: 1, U: 1, S: 1, CODE: 1, SUB: 1, SUP: 1, MARK: 1, A: 1, SPAN: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1,
  UL: 1, OL: 1, LI: 1, BLOCKQUOTE: 1, PRE: 1, HR: 1, IMG: 1, TABLE: 1, TBODY: 1, TR: 1, TH: 1, TD: 1, LABEL: 1, INPUT: 1, DIV: 1 };
const RENAME = { B: 'strong', I: 'em', STRIKE: 's', DEL: 's', DIV: 'p' };
// the person's own formatting kept on their content: these style properties only, on these elements
const USER_STYLE = { SPAN: ['color', 'background-color', 'font-family', 'font-size'], MARK: ['color', 'background-color'],
  P: ['text-align'], H1: ['text-align'], H2: ['text-align'], H3: ['text-align'], H4: ['text-align'], H5: ['text-align'], H6: ['text-align'], TH: ['text-align'], TD: ['text-align'] };
export const RICH_TEXT_STYLE_PROPERTIES = ['color', 'background-color', 'font-family', 'font-size', 'text-align'];
const SAFE_HREF = /^(https?:|mailto:|\/|\.|#|[^:]*$)/i;
const SAFE_SRC = /^(https?:|\/|\.|[^:]*$)/i;
// the allow-list: a clean copy of the HTML (elements renamed or unwrapped, attributes dropped, styles kept to the person's formatting)
export function sanitizeRichText(html, doc = typeof document === 'undefined' ? null : document) {
  if (!doc || !doc.defaultView) return null;
  const document = doc;
  let purifier = purifiers.get(doc);
  if (!purifier) { purifier = createDOMPurify(doc.defaultView); purifiers.set(doc, purifier); }
  const from = { content: purifier.sanitize(String(html || ''), { RETURN_DOM_FRAGMENT: true, FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed'] }) };
  const copy = (node, into, task) => {
    node.childNodes.forEach((n) => {
      if (n.nodeType === 3) { const text = n.nodeValue.replace(/​/g, ''); if (text) into.appendChild(document.createTextNode(text)); return; }
      if (n.nodeType !== 1) return;
      // inside a task item its label, checkbox and content div stay as Tiptap writes them
      const inTask = task && n.parentNode && n.parentNode.getAttribute && n.parentNode.getAttribute('data-type') === 'taskItem';
      let tag = RENAME[n.tagName] && !(inTask && n.tagName === 'DIV') ? RENAME[n.tagName].toUpperCase() : n.tagName;
      if ((tag === 'LABEL' || tag === 'DIV') && !inTask) { copy(n, into, task); return; }
      if (tag === 'INPUT') {
        if (!(task && n.closest('li[data-type="taskItem"]') && /^checkbox$/i.test(n.getAttribute('type') || ''))) return;
        const box = document.createElement('input');
        const item = n.closest('li[data-type="taskItem"]'), body = item && item.querySelector(':scope > div');
        box.setAttribute('type', 'checkbox'); box.setAttribute('class', CHECK_CLASS); box.setAttribute('disabled', '');
        if (n.hasAttribute('checked') || (item && item.getAttribute('data-checked') === 'true')) box.setAttribute('checked', 'checked');
        box.setAttribute('aria-label', ((body ? body.textContent : '') || '').trim().slice(0, 200));
        into.appendChild(box); return;
      }
      const mention = tag === 'SPAN' && n.hasAttribute('data-mention');
      const styles = (USER_STYLE[tag] || []).map((p) => [p, n.style ? n.style.getPropertyValue(p) : '']).filter((s) => s[1] && !/url\(|expression|[<>]/i.test(s[1]));
      if (!ALLOWED[tag] || (tag === 'SPAN' && !mention && !styles.length)) { copy(n, into, task); return; }
      const el = document.createElement(tag.toLowerCase());
      if (tag === 'A') { const href = (n.getAttribute('href') || '').trim(); if (href && SAFE_HREF.test(href)) el.setAttribute('href', href); }
      if (tag === 'IMG') {
        const src = (n.getAttribute('src') || '').trim();
        if (!src || !SAFE_SRC.test(src)) return;
        el.setAttribute('src', src); el.setAttribute('alt', n.getAttribute('alt') || '');
        if (n.getAttribute('title')) el.setAttribute('title', n.getAttribute('title'));
      }
      if (tag === 'OL' && /^\d+$/.test(n.getAttribute('start') || '') && n.getAttribute('start') !== '1') el.setAttribute('start', n.getAttribute('start'));
      if ((tag === 'TD' || tag === 'TH')) ['colspan', 'rowspan'].forEach((a) => { const v = n.getAttribute(a); if (/^\d+$/.test(v || '') && v !== '1') el.setAttribute(a, v); });
      if (tag === 'UL' && n.getAttribute('data-type') === 'taskList') el.setAttribute('data-type', 'taskList');
      const isTask = tag === 'LI' && n.getAttribute('data-type') === 'taskItem';
      if (isTask) { el.setAttribute('data-type', 'taskItem'); el.setAttribute('data-checked', n.getAttribute('data-checked') === 'true' ? 'true' : 'false'); }
      if (tag === 'MARK' && n.getAttribute('data-color')) el.setAttribute('data-color', n.getAttribute('data-color'));
      if (mention) { el.setAttribute('data-mention', n.getAttribute('data-mention')); el.setAttribute('class', MENTION_CLASS); el.setAttribute('contenteditable', 'false'); }
      styles.forEach((s) => el.style.setProperty(s[0], s[1]));
      if (tag === 'LABEL') el.setAttribute('contenteditable', 'false');
      if (tag === 'IMG' || tag === 'HR' || tag === 'BR') { into.appendChild(el); return; }
      copy(n, el, task || isTask); into.appendChild(el);
    });
  };
  const out = document.createDocumentFragment(); copy(from.content, out, false);
  return out;
}


export function cleanRichText(html) {
  const fragment = sanitizeRichText(html);
  if (!fragment) return '';
  const out = fragment.ownerDocument.createElement('div');
  out.appendChild(fragment);
  return out.innerHTML; // serialization getter, never an HTML assignment
}

// The packaged editor's HTML parsers use the same sanitized entry point, with a TrustedHTML result when available.
export function trustedRichText(html, doc) {
  const fragment = sanitizeRichText(html, doc);
  if (!fragment) return '';
  const out = doc.createElement('div');
  out.appendChild(fragment);
  return purifiers.get(doc).sanitize(out.innerHTML, { RETURN_TRUSTED_TYPE: true });
}
