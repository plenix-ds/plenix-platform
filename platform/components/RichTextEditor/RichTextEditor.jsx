/* Plenix · RichTextEditor
   Summary: A field for formatted text: a formatting toolbar (the Platform Toolbar and Buttons) over an editing area that
     shows the text as RichText does (paragraphs, bold, italic, links, lists, headings, quotes, inline code), with Markdown
     shortcuts and an optional mentions list. It is a contenteditable area on the browser's Selection API.
   Usage:
     <RichTextEditor label="Description" defaultValue={html} onChange={(html) => …} />
     <RichTextEditor label="Notes" toolbar="full" placeholder="Describe the change" />
     <RichTextEditor label="Comment" mentions={{ search: (q) => people.filter((p) => p.label.startsWith(q)) }} />
     <RichTextEditor label="Description" readOnly defaultValue={html} />
   Props:
     label: the accessible name of the editing area (required; give a visible label with Field or a heading)
     defaultValue: the starting HTML; it is cleaned to the allowed elements (see Notes) before it is shown
     onChange(html): runs after each change with the cleaned HTML of the content
     toolbar: "basic" (default: bold, italic, link, bulleted and numbered list) | "full" (also heading, quote, inline code,
       clear formatting, undo and redo) | false (no toolbar; the shortcuts still work)
     markdownShortcuts: Markdown as you type (default true): "- " or "* " a bulleted list, "1. " a numbered list, "## " a
       heading, "> " a quote at the start of a line; **bold**, _italic_ and `code` around words
     mentions: the mentions slot: { trigger: "@" (default), search(query) → options or a Promise of them ([{ value, label }]),
       renderOption(option) (the row's content; default its label) }; typing the trigger opens the list under the caret
     placeholder: the hint in the empty area
     readOnly: shows the content without the toolbar; it can be selected and copied, not changed (default false)
     invalid: marks the area invalid (aria-invalid); put the message in Field's error
     disabled: the area cannot be used (default false)
     strings: the words it shows, for other languages: { toolbar: "Formatting", bold: "Bold", italic: "Italic", link: "Link",
       bulleted: "Bulleted list", numbered: "Numbered list", heading: "Heading", quote: "Quote", code: "Code", clear: "Clear
       formatting", undo: "Undo", redo: "Redo", linkAddress: "Link address", addLink: "Add link", cancel: "Cancel",
       mentions: "Suggestions", on: (name) => name + " on", off: (name) => name + " off" }
     className: more classes on the editor
     id: the id of the editing area (a Field sets it)
   Behavior:
     The toolbar is one Tab stop (arrow keys move inside it); each format button shows whether the text at the caret has
       that format (aria-pressed). Pressing a button keeps the selection in the area.
     Ctrl+B bold, Ctrl+I italic, Ctrl+K link, Ctrl+Shift+7 numbered list, Ctrl+Shift+8 bulleted list (Command on a Mac);
       a format turned on or off from the keyboard is announced.
     Link: with the caret in a link it removes the link; otherwise a link address field opens under the toolbar (Enter adds
       the link, Escape closes it); an address without a scheme gets https://.
     Paste inserts plain text, so formatting from other documents never comes in.
     Mentions: ↓ / ↑ move in the list, Enter or Tab inserts the mention (one unit, removed with one Backspace), Escape closes it.
     The area grows with its text up to its maximum height, then scrolls inside (it is focusable, so the keyboard reaches it).
   Notes:
     The browser's editing commands (document.execCommand: deprecated but supported everywhere) do the formatting; the
       Selection API reads the formats at the caret, finds Markdown shortcuts and mentions, and places the link field.
     Allowed elements: p, br, strong, em, a (href only: http, https, mailto or a relative address), ul, ol, li, h2, h3,
       blockquote, code, pre, and the mention span (data-mention). Everything else is unwrapped, every other attribute dropped.
     For collaborative editing, tables or embeds, a real editor engine is needed (not part of Plenix).
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useUid } from '../../utils/layer.js';
import { announce } from '../../utils/announce.jsx';
import { useFloating } from '../../utils/floating.js';
import { Toolbar } from '../Toolbar/Toolbar.jsx';
import { Button } from '../Button/Button.jsx';
import { Input } from '../Input/Input.jsx';

const STRINGS = { toolbar: 'Formatting', bold: 'Bold', italic: 'Italic', link: 'Link', bulleted: 'Bulleted list', numbered: 'Numbered list',
  heading: 'Heading', quote: 'Quote', code: 'Code', clear: 'Clear formatting', undo: 'Undo', redo: 'Redo', linkAddress: 'Link address',
  addLink: 'Add link', cancel: 'Cancel', mentions: 'Suggestions', on: (name) => name + ' on', off: (name) => name + ' off' };

const ALLOWED = { P: 1, BR: 1, STRONG: 1, EM: 1, A: 1, UL: 1, OL: 1, LI: 1, H2: 1, H3: 1, BLOCKQUOTE: 1, CODE: 1, PRE: 1, SPAN: 1 };
const RENAME = { B: 'strong', I: 'em', DIV: 'p', H1: 'h2' };
const SAFE_HREF = /^(https?:|mailto:|\/|\.|#|[^:]*$)/i;
const TOP_LAYER = typeof HTMLElement !== 'undefined' && Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'popover');

// the allow-list: a clean copy of the HTML (elements renamed or unwrapped, attributes dropped)
export function cleanRichText(html) {
  if (typeof document === 'undefined') return '';
  const from = document.createElement('template'); from.innerHTML = String(html || '');
  const copy = (node, into) => {
    node.childNodes.forEach((n) => {
      if (n.nodeType === 3) { const text = n.nodeValue.replace(/​/g, ''); if (text) into.appendChild(document.createTextNode(text)); return; }
      if (n.nodeType !== 1) return;
      const tag = RENAME[n.tagName] ? RENAME[n.tagName].toUpperCase() : n.tagName;
      const mention = tag === 'SPAN' && n.hasAttribute('data-mention');
      if (!ALLOWED[tag] || (tag === 'SPAN' && !mention)) { copy(n, into); return; }
      const el = document.createElement(tag.toLowerCase());
      if (tag === 'A') { const href = (n.getAttribute('href') || '').trim(); if (SAFE_HREF.test(href)) el.setAttribute('href', href); }
      if (mention) { el.setAttribute('data-mention', n.getAttribute('data-mention')); el.setAttribute('class', 'plx-rich-text-editor__mention'); el.setAttribute('contenteditable', 'false'); }
      copy(n, el); into.appendChild(el);
    });
  };
  const out = document.createElement('div'); copy(from.content, out);
  return out.innerHTML;
}

// an element put in place of a range with the DOM (insertHTML would copy computed styles onto it), then a text after it
// for the caret (a zero-width space, dropped from the output), so typing goes on outside the element
const place = (range, el, tail = '​') => {
  range.deleteContents(); range.insertNode(el);
  const after = document.createTextNode(tail); el.after(after);
  const sel = window.getSelection(), r = document.createRange(); r.setStart(after, tail.length); r.collapse(true);
  sel.removeAllRanges(); sel.addRange(r);
};
const run = (cmd, arg) => { try { return document.execCommand(cmd, false, arg); } catch (e) { return false; } };
const within = (root, node) => !!(root && node && (node === root || root.contains(node)));
const closestIn = (root, node, selector) => {
  let el = node && node.nodeType === 3 ? node.parentElement : node;
  while (el && el !== root) { if (el.matches && el.matches(selector)) return el; el = el.parentElement; }
  return null;
};

export function RichTextEditor({ label, defaultValue = '', onChange, toolbar = 'basic', markdownShortcuts = true, mentions, placeholder, readOnly = false,
  invalid, disabled = false, strings, className, id, ...rest }) {
  const t = Object.assign({}, STRINGS, strings);
  const auto = useUid('plx-rte');
  const areaId = id || auto + '-area';
  const area = React.useRef(null), list = React.useRef(null), linkInput = React.useRef(null), saved = React.useRef(null);
  const [formats, setFormats] = React.useState({});
  const [empty, setEmpty] = React.useState(true);
  const [linking, setLinking] = React.useState(false);
  const [href, setHref] = React.useState('');
  const [mention, setMention] = React.useState(null);   // { query, items, active, x, y }
  const editable = !readOnly && !disabled;

  // the starting content, cleaned, once
  React.useEffect(() => {
    if (!area.current) return;
    area.current.innerHTML = cleanRichText(defaultValue);
    setEmpty(!area.current.textContent.trim() && !area.current.querySelector('li,[data-mention]'));
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  // the formats at the caret (Selection API), on every selection change inside the area
  const read = React.useCallback(() => {
    const root = area.current, sel = typeof window !== 'undefined' ? window.getSelection() : null;
    if (!root || !sel || !sel.rangeCount || !within(root, sel.anchorNode)) return;
    saved.current = sel.getRangeAt(0).cloneRange();
    const at = (s) => !!closestIn(root, sel.anchorNode, s);
    setFormats({ bold: at('strong,b'), italic: at('em,i'), link: at('a'), bulleted: at('ul'), numbered: at('ol'), heading: at('h2,h3'), quote: at('blockquote'), code: at('code') });
  }, []);
  React.useEffect(() => {
    document.addEventListener('selectionchange', read);
    return () => document.removeEventListener('selectionchange', read);
  }, [read]);

  const changed = () => {
    const root = area.current; if (!root) return;
    setEmpty(!root.textContent.trim() && !root.querySelector('li,[data-mention]'));
    if (onChange) onChange(cleanRichText(root.innerHTML));
  };
  // put the selection back in the area (a toolbar button or the link field may hold the focus)
  const restore = () => {
    const root = area.current, sel = window.getSelection();
    if (!root) return;
    if (document.activeElement !== root) root.focus();
    if (saved.current && within(root, saved.current.startContainer) && (!sel.rangeCount || !within(root, sel.anchorNode))) { sel.removeAllRanges(); sel.addRange(saved.current); }
  };
  const inlineCode = () => {
    const sel = window.getSelection(); if (!sel.rangeCount) return;
    const code = closestIn(area.current, sel.anchorNode, 'code');
    if (code) { const text = document.createTextNode(code.textContent); code.replaceWith(text); return; }
    const text = sel.toString(); if (!text) return;
    const el = document.createElement('code'); el.textContent = text;
    place(sel.getRangeAt(0), el);
  };
  const block = (tag) => run('formatBlock', formats[tag === 'h2' ? 'heading' : 'quote'] ? 'p' : tag);
  const COMMANDS = {
    bold: () => run('bold'), italic: () => run('italic'),
    bulleted: () => run('insertUnorderedList'), numbered: () => run('insertOrderedList'),
    heading: () => block('h2'), quote: () => block('blockquote'), code: inlineCode,
    clear: () => { run('removeFormat'); run('formatBlock', 'p'); }, undo: () => run('undo'), redo: () => run('redo')
  };
  const apply = (name, fromKeys) => {
    if (!editable) return;
    restore();
    if (name === 'link') { openLink(); return; }
    const was = !!formats[name];
    COMMANDS[name]();
    read(); changed();
    if (fromKeys && name in formats) announce(was ? t.off(t[name]) : t.on(t[name]));
  };

  // the link field: opens under the toolbar for the selection kept in saved; Enter adds the link
  const openLink = () => {
    const sel = window.getSelection();
    const a = sel.rangeCount ? closestIn(area.current, sel.anchorNode, 'a') : null;
    if (a) { const r = document.createRange(); r.selectNodeContents(a); sel.removeAllRanges(); sel.addRange(r); run('unlink'); read(); changed(); return; }
    if (sel.rangeCount) saved.current = sel.getRangeAt(0).cloneRange();
    setHref(''); setLinking(true);
  };
  React.useEffect(() => { if (linking && linkInput.current) linkInput.current.focus(); }, [linking]);
  const addLink = () => {
    let to = href.trim();
    setLinking(false);
    restore();
    if (!to) return;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(to) && !/^[/#.]/.test(to)) to = 'https://' + to;
    if (!SAFE_HREF.test(to)) return;
    const sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt(0).collapsed) { const a = document.createElement('a'); a.setAttribute('href', to); a.textContent = href.trim(); place(sel.getRangeAt(0), a); }
    else run('createLink', to);
    read(); changed();
  };

  // Markdown shortcuts at the start of a line (on Space) and around words (as they are typed)
  const textBeforeCaret = () => {
    const sel = window.getSelection(); if (!sel.rangeCount) return null;
    const caret = sel.getRangeAt(0); if (!caret.collapsed) return null;
    const blockEl = closestIn(area.current, caret.startContainer, 'p,li,h2,h3,blockquote,pre') || area.current;
    const r = document.createRange(); r.setStart(blockEl, 0); r.setEnd(caret.startContainer, caret.startOffset);
    return { text: r.toString(), range: r, caret };
  };
  const BLOCK_MARKS = { '-': 'bulleted', '*': 'bulleted', '1.': 'numbered', '#': 'heading', '##': 'heading', '>': 'quote' };
  const blockShortcut = () => {
    const b = textBeforeCaret(); if (!b || !BLOCK_MARKS[b.text]) return false;
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(b.range); run('delete');
    COMMANDS[BLOCK_MARKS[b.text]]();
    return true;
  };
  const INLINE = [[/\*\*([^*]+)\*\*$/, 'strong'], [/(?:^|\s)_([^_]+)_$/, 'em'], [/`([^`]+)`$/, 'code']];
  const inlineShortcut = () => {
    const sel = window.getSelection(); if (!sel.rangeCount) return false;
    const caret = sel.getRangeAt(0); const node = caret.startContainer;
    if (!caret.collapsed || node.nodeType !== 3) return false;
    const before = node.nodeValue.slice(0, caret.startOffset);
    for (const [re, tag] of INLINE) {
      const m = re.exec(before); if (!m) continue;
      const start = caret.startOffset - m[0].length + (m[0].length - m[0].trimStart().length);
      const r = document.createRange(); r.setStart(node, start); r.setEnd(node, caret.startOffset);
      const el = document.createElement(tag); el.textContent = m[1];
      place(r, el);
      return true;
    }
    return false;
  };

  // mentions: the trigger and the word after it, before the caret
  const trigger = (mentions && mentions.trigger) || '@';
  const searchRef = React.useRef(null); searchRef.current = mentions && mentions.search;
  const lookup = React.useRef(0);
  const findMention = () => {
    if (!mentions) return;
    const sel = window.getSelection(); if (!sel.rangeCount) { setMention(null); return; }
    const caret = sel.getRangeAt(0), node = caret.startContainer;
    const before = node.nodeType === 3 ? node.nodeValue.slice(0, caret.startOffset) : '';
    const m = new RegExp('(?:^|\\s)' + trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([\\w.-]*)$').exec(before);
    if (!m) { setMention(null); return; }
    const box = caret.getBoundingClientRect();
    const n = ++lookup.current, query = m[1];
    Promise.resolve().then(() => searchRef.current(query)).then((items) => {
      if (n !== lookup.current) return;
      setMention({ query, items: Array.isArray(items) ? items : [], active: 0, x: box.left, y: box.bottom });
    }, () => { if (n === lookup.current) setMention(null); });
  };
  const insertMention = (o) => {
    const sel = window.getSelection(); if (!sel.rangeCount || !mention) return;
    const caret = sel.getRangeAt(0), node = caret.startContainer;
    const r = document.createRange(); r.setStart(node, caret.startOffset - mention.query.length - trigger.length); r.setEnd(node, caret.startOffset);
    const el = document.createElement('span'); el.setAttribute('data-mention', o.value); el.setAttribute('class', 'plx-rich-text-editor__mention');
    el.setAttribute('contenteditable', 'false'); el.textContent = trigger + o.label;
    place(r, el, ' ');
    lookup.current++; setMention(null); changed();
  };
  const mentionOpen = !!(mention && mention.items.length);
  useFloating(area, list, { open: mentionOpen, placement: 'bottom-start', virtual: mentionOpen ? { x: mention.x, y: mention.y } : null });
  React.useLayoutEffect(() => { const el = list.current; if (mentionOpen && TOP_LAYER && el && el.showPopover && !el.matches(':popover-open')) el.showPopover(); }, [mentionOpen]);

  const onKeyDown = (e) => {
    if (!editable) return;
    if (mentionOpen) {
      const n = mention.items.length;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); setMention(Object.assign({}, mention, { active: (mention.active + (e.key === 'ArrowDown' ? 1 : n - 1)) % n })); return; }
      if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); insertMention(mention.items[mention.active]); return; }
      if (e.key === 'Escape') { e.preventDefault(); lookup.current++; setMention(null); return; }
    }
    const mod = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
    if (mod && !e.shiftKey && !e.altKey && (k === 'b' || k === 'i' || k === 'k')) { e.preventDefault(); apply(k === 'b' ? 'bold' : k === 'i' ? 'italic' : 'link', true); return; }
    if (mod && e.shiftKey && (e.code === 'Digit7' || e.code === 'Digit8')) { e.preventDefault(); apply(e.code === 'Digit7' ? 'numbered' : 'bulleted', true); return; }
    if (markdownShortcuts && e.key === ' ' && !mod && blockShortcut()) { e.preventDefault(); read(); changed(); }
  };
  const onInput = () => { if (markdownShortcuts) inlineShortcut(); findMention(); read(); changed(); };
  const onPaste = (e) => { if (!editable) return; e.preventDefault(); run('insertText', (e.clipboardData && e.clipboardData.getData('text/plain')) || ''); };
  const onFocus = () => { run('defaultParagraphSeparator', 'p'); };

  // a format button says whether the text at the caret has its format (aria-pressed); undo, redo and clear are plain buttons
  const PLAIN = ['undo', 'redo', 'clear'];
  const toolButton = (name, icon) => (
    <Button key={name} variant="ghost" size="sm" pressed={PLAIN.indexOf(name) >= 0 ? undefined : !!formats[name]} icon={icon} iconOnly={!!icon}
      label={icon ? t[name] : undefined} disabled={!editable} onMouseDown={(e) => e.preventDefault()} onClick={() => apply(name)}>{t[name]}</Button>
  );
  const showToolbar = toolbar && !readOnly;
  const full = toolbar === 'full';
  return (
    <div className={cx('plx-rich-text-editor', readOnly && 'is-read-only', disabled && 'is-disabled', className)} {...rest}>
      {showToolbar ? (
        <Toolbar label={t.toolbar} className="plx-rich-text-editor__toolbar">
          <Toolbar.Group>{toolButton('bold')}{toolButton('italic')}{full ? toolButton('code') : null}{toolButton('link')}</Toolbar.Group>
          <Toolbar.Group>{full ? toolButton('heading') : null}{toolButton('bulleted', 'list-bullets')}{toolButton('numbered')}{full ? toolButton('quote') : null}</Toolbar.Group>
          {full ? <Toolbar.Group>{toolButton('clear')}{toolButton('undo', 'ed-undo')}{toolButton('redo', 'ed-redo')}</Toolbar.Group> : null}
        </Toolbar>
      ) : null}
      {linking ? (
        <div className="plx-rich-text-editor__link-bar">
          <Input ref={linkInput} type="url" aria-label={t.linkAddress} placeholder="https://" value={href} onChange={(e) => setHref(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addLink(); } else if (e.key === 'Escape') { e.preventDefault(); setLinking(false); restore(); } }} />
          <Button size="sm" variant="primary" onClick={addLink}>{t.addLink}</Button>
          <Button size="sm" onClick={() => { setLinking(false); restore(); }}>{t.cancel}</Button>
        </div>
      ) : null}
      <div ref={area} id={areaId} className={cx('plx-rich-text', 'plx-rich-text--compact', 'plx-rich-text-editor__area', empty && 'is-empty')}
        role="textbox" aria-multiline="true" aria-label={label} aria-readonly={readOnly || undefined} aria-disabled={disabled || undefined} aria-invalid={invalid || undefined}
        aria-placeholder={placeholder} data-placeholder={placeholder} tabIndex={disabled ? -1 : 0} contentEditable={editable} suppressContentEditableWarning
        aria-autocomplete={mentions ? 'list' : undefined} aria-controls={mentionOpen ? auto + '-mentions' : undefined}
        aria-activedescendant={mentionOpen ? auto + '-m' + mention.active : undefined}
        onKeyDown={onKeyDown} onInput={onInput} onPaste={onPaste} onFocus={onFocus} onBlur={() => { lookup.current++; setMention(null); }} />
      {mentionOpen ? (
        <ul ref={list} id={auto + '-mentions'} role="listbox" aria-label={t.mentions} popover={TOP_LAYER ? 'manual' : undefined} className="plx-rich-text-editor__mentions">
          {mention.items.map((o, i) => (
            <li key={o.value} id={auto + '-m' + i} role="option" aria-selected={i === mention.active} className={cx('plx-rich-text-editor__mention-option', i === mention.active && 'is-active')}
              onMouseDown={(e) => { e.preventDefault(); insertMention(o); }}>{mentions.renderOption ? mentions.renderOption(o) : o.label}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
