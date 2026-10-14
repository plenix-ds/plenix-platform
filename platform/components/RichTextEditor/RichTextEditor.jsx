/* Plenix · RichTextEditor
   Summary: A field for formatted text: a formatting toolbar (the Platform Toolbar and Buttons) over an editing area that
     shows the text as RichText does (paragraphs, bold, italic, links, lists, headings, quotes, inline code), with Markdown
     shortcuts and an optional mentions list. The editing engine is Tiptap 3.31.3 (MIT, on ProseMirror), vendored in
     platform/vendor/tiptap/ and loaded the first time an editor mounts.
   Usage:
     <RichTextEditor label="Description" defaultValue={html} onChange={(html) => …} />
     <RichTextEditor label="Notes" toolbar="full" placeholder="Describe the change" />
     <RichTextEditor label="Comment" mentions={{ search: (q) => people.filter((p) => p.label.startsWith(q)) }} />
     <RichTextEditor label="Description" readOnly defaultValue={html} />
     RichTextEditor.preload()   // a page whose first screen has an editor: starts loading the engine as its script starts
   Props:
     label: the accessible name of the editing area (required; give a visible label with Field or a heading)
     defaultValue: the starting HTML; it is cleaned to the allowed elements (see Notes) before it is shown
     onChange(html): runs after each change with the cleaned HTML of the content ('' when the area is empty)
     toolbar: "basic" (default: bold, italic, link, bulleted and numbered list) | "full" (also heading, quote, inline code,
       clear formatting, undo and redo) | false (no toolbar; the shortcuts still work)
     markdownShortcuts: Markdown as you type (default true): "- " or "* " a bulleted list, "1. " a numbered list, "# " or
       "## " a heading, "> " a quote at the start of a line; **bold**, _italic_ and `code` around words
     mentions: the mentions slot: { trigger: "@" (default), search(query) → options or a Promise of them ([{ value, label }]),
       renderOption(option) (the row's content; default its label) }; typing the trigger opens the list under the caret.
       Give it when the editor mounts (the engine is set up once); a new search function is used from the next keystroke.
     placeholder: the hint in the empty area
     readOnly: shows the content without the toolbar; it can be selected and copied, not changed (default false)
     invalid: marks the area invalid (aria-invalid); put the message in Field's error
     disabled: the area cannot be used (default false)
     strings: the words it shows, for other languages: { toolbar: "Formatting", bold: "Bold", italic: "Italic", link: "Link",
       bulleted: "Bulleted list", numbered: "Numbered list", heading: "Heading", quote: "Quote", code: "Code", clear: "Clear
       formatting", undo: "Undo", redo: "Redo", linkAddress: "Link address", addLink: "Add link", cancel: "Cancel",
       mentions: "Suggestions", on: (name) => name + " on", off: (name) => name + " off",
       tip: (name, keys) => name + " (" + keys + ")": a toolbar button's tooltip with its shortcut }
     className: more classes on the editor
     id: the id of the editing area (a Field sets it)
   Behavior:
     The toolbar is one Tab stop (arrow keys move inside it). Its buttons are icon-only ghost toggle buttons (owner,
       2026-10-14): bold format-bold, italic format-italic, inline code code, link link, heading heading, bulleted list
       list-bullets, numbered list format-list-numbered, quote format-quote, undo ed-undo, redo ed-redo; each is named by
       its word (aria-label) and has a tooltip with the word and its shortcut as hotkeyLabel writes it (Bold (Ctrl B);
       Bold (⌘ B) on a Mac) and aria-keyshortcuts. Clear formatting keeps its text label (the set has no approved icon for it). Each format button
       shows whether the text at the caret has that format (aria-pressed). Pressing a button keeps the selection in the area.
     Ctrl+B bold, Ctrl+I italic, Ctrl+K link, Ctrl+Shift+7 numbered list, Ctrl+Shift+8 bulleted list (Command on a Mac);
       a format turned on or off from the keyboard is announced. Undo and redo are the editor's own history (Ctrl+Z,
       Ctrl+Y or Ctrl+Shift+Z; ⌘Z, ⇧⌘Z on a Mac): one step per change, Markdown shortcuts included.
     Backspace right after a Markdown shortcut turns it back into the typed characters (Tiptap's input rules); otherwise it
       removes the character before the caret.
     Link: with the caret in a link it removes the link; otherwise a link address field opens under the toolbar (Enter adds
       the link, Escape closes it); an address without a scheme gets https://. Text typed after a link is not part of it.
     Paste inserts plain text (a line break starts a new paragraph), so formatting from other documents never comes in.
     Mentions: ↓ / ↑ move in the list, Enter or Tab inserts the mention (one unit, removed with one Backspace), Escape closes it.
     Tab and Shift+Tab move the focus, in a list too (they never insert a tab or nest a list item).
     The area grows with its text up to its maximum height, then scrolls inside (it is focusable, so the keyboard reaches it).
     Until the engine has loaded (the first editor on a page) the area shows the cleaned content without editing; a failed
       load leaves it so, and the next editor that mounts tries again.
   Notes:
     The engine: Tiptap (@tiptap/core, pm, starter-kit, extension-link, extension-mention 3.31.3, MIT), driven directly (no
       @tiptap/react): the area element is ProseMirror's editing element, its attributes set through editorProps. Its
       document schema is the allow-list below, so the editor can only hold what cleanRichText keeps. The same engine
       carries what Plenix can add later: tables (@tiptap/extension-table), editing together (Yjs through
       @tiptap/extension-collaboration) and embeds (custom nodes).
     Allowed elements: p, br, strong, em, a (href only: http, https, mailto or a relative address), ul, ol, li, h2, h3,
       blockquote, code, pre, and the mention span (data-mention). Everything else is unwrapped, every other attribute dropped.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useUid } from '../../utils/layer.js';
import { announce } from '../../utils/announce.jsx';
import { useFloating } from '../../utils/floating.js';
import { Toolbar } from '../Toolbar/Toolbar.jsx';
import { Button } from '../Button/Button.jsx';
import { Input } from '../Input/Input.jsx';
import { Tooltip } from '../Tooltip/Tooltip.jsx';
import { hotkeyLabel, isMac } from '../../utils/hotkey.js';
import { loadTiptap } from './tiptap.js';

const STRINGS = { toolbar: 'Formatting', bold: 'Bold', italic: 'Italic', link: 'Link', bulleted: 'Bulleted list', numbered: 'Numbered list',
  heading: 'Heading', quote: 'Quote', code: 'Code', clear: 'Clear formatting', undo: 'Undo', redo: 'Redo', linkAddress: 'Link address',
  addLink: 'Add link', cancel: 'Cancel', mentions: 'Suggestions', on: (name) => name + ' on', off: (name) => name + ' off',
  tip: (name, keys) => name + ' (' + keys + ')' };

// the toolbar's icons (Material Symbols Sharp, platform/icons/map.json) and the shortcuts its tooltips show
const ICONS = { bold: 'format-bold', italic: 'format-italic', code: 'code', link: 'link', heading: 'heading', bulleted: 'list-bullets',
  numbered: 'format-list-numbered', quote: 'format-quote', undo: 'ed-undo', redo: 'ed-redo' };
// each shortcut as a binding: shown as people read it (hotkeyLabel: Ctrl B, ⇧ ⌘ 7 on a Mac) and named for aria-keyshortcuts
const KEYS = { bold: 'Mod+B', italic: 'Mod+I', link: 'Mod+K', numbered: 'Mod+Shift+7', bulleted: 'Mod+Shift+8', undo: 'Mod+Z', redo: () => (isMac() ? 'Mod+Shift+Z' : 'Mod+Y') };
const keysAria = (binding) => binding.replace('Mod', isMac() ? 'Meta' : 'Control');

const ALLOWED = { P: 1, BR: 1, STRONG: 1, EM: 1, A: 1, UL: 1, OL: 1, LI: 1, H2: 1, H3: 1, BLOCKQUOTE: 1, CODE: 1, PRE: 1, SPAN: 1 };
const RENAME = { B: 'strong', I: 'em', DIV: 'p', H1: 'h2' };
const SAFE_HREF = /^(https?:|mailto:|\/|\.|#|[^:]*$)/i;
const TOP_LAYER = typeof HTMLElement !== 'undefined' && Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'popover');
const MENTION_CLASS = 'plx-rich-text-editor__mention';

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
      if (mention) { el.setAttribute('data-mention', n.getAttribute('data-mention')); el.setAttribute('class', MENTION_CLASS); el.setAttribute('contenteditable', 'false'); }
      copy(n, el); into.appendChild(el);
    });
  };
  const out = document.createElement('div'); copy(from.content, out);
  return out.innerHTML;
}

// the formats at the caret, as the toolbar names them, read from the editor
const FORMATS = { bold: ['bold'], italic: ['italic'], link: ['link'], bulleted: ['bulletList'], numbered: ['orderedList'], heading: ['heading'], quote: ['blockquote'], code: ['code'] };
const readFormats = (editor) => { const f = {}; Object.keys(FORMATS).forEach((k) => { f[k] = editor.isActive(FORMATS[k][0]); }); return f; };
const sameFormats = (a, b) => Object.keys(FORMATS).every((k) => !!a[k] === !!b[k]);

// the engine set up for this editor: the starter kit cut to the allow-list, list items without Tab, links, the mention node (its suggestion list
// only when the editor has a mentions slot), the Plenix shortcuts (announced) and the "# " heading rule
function makeEditor(T, el, o) {
  const trigger = o.trigger;
  const PlenixKeys = T.Extension.create({
    name: 'plenixKeys',
    priority: 1000,
    addKeyboardShortcuts() {
      const key = (name) => () => { o.apply(name, true); return true; };
      return { 'Mod-b': key('bold'), 'Mod-i': key('italic'), 'Mod-k': key('link'), 'Mod-Shift-7': key('numbered'), 'Mod-Shift-8': key('bulleted') };
    },
    addInputRules() {
      return [T.textblockTypeInputRule({ find: /^#\s$/, type: this.editor.schema.nodes.heading, getAttributes: { level: 2 } })];
    }
  });
  const PlenixMention = T.Mention.extend({
    parseHTML() { return [{ tag: 'span[data-mention]' }]; },
    addAttributes() {
      return {
        id: { default: null, parseHTML: (e) => e.getAttribute('data-mention'), renderHTML: (a) => ({ 'data-mention': a.id }) },
        label: { default: null, parseHTML: (e) => { const s = e.textContent || ''; return s.indexOf(trigger) === 0 ? s.slice(trigger.length) : s; }, renderHTML: () => ({}) },
        mentionSuggestionChar: { default: trigger, parseHTML: () => trigger, renderHTML: () => ({}) }
      };
    },
    addProseMirrorPlugins() { return o.mentions ? this.parent() : []; }
  }).configure({
    deleteTriggerWithBackspace: true,
    HTMLAttributes: { class: MENTION_CLASS, contenteditable: 'false' },
    suggestion: {
      char: trigger,
      decorationClass: 'plx-rich-text-editor__mention-query',
      items: ({ query }) => Promise.resolve(o.search(query)).then((items) => (Array.isArray(items) ? items : []), () => []),
      render: () => ({ onStart: o.suggest, onUpdate: o.suggest, onKeyDown: o.suggestKey, onExit: () => o.suggest(null) })
    }
  });
  return new T.Editor({
    element: { mount: el },
    injectCSS: false,
    content: o.content,
    editable: o.editable,
    enableInputRules: o.markdown,
    enablePasteRules: false,
    extensions: [
      T.StarterKit.configure({
        heading: { levels: [2, 3] }, listItem: false, underline: false, strike: false, horizontalRule: false, dropcursor: false, gapcursor: false, trailingNode: false,
        link: { openOnClick: false, autolink: false, linkOnPaste: false, HTMLAttributes: { target: null, rel: null, class: null }, isAllowedUri: (url) => SAFE_HREF.test(String(url || '').trim()) }
      }),
      // a list item without Tab and Shift+Tab (nesting): Tab always leaves the area
      T.ListItem.extend({ addKeyboardShortcuts() { return { Enter: () => this.editor.commands.splitListItem(this.name) }; } }),
      PlenixMention, PlenixKeys
    ],
    editorProps: { attributes: o.attributes, handlePaste: o.paste }
  });
}

export function RichTextEditor({ label, defaultValue = '', onChange, toolbar = 'basic', markdownShortcuts = true, mentions, placeholder, readOnly = false,
  invalid, disabled = false, strings, className, id, ...rest }) {
  const t = Object.assign({}, STRINGS, strings);
  const auto = useUid('plx-rte');
  const areaId = id || auto + '-area';
  const area = React.useRef(null), list = React.useRef(null), linkInput = React.useRef(null);
  const editorRef = React.useRef(null), saved = React.useRef(null), pasting = React.useRef(false);
  const [ready, setReady] = React.useState(false);
  const [formats, setFormats] = React.useState({});
  const [empty, setEmpty] = React.useState(() => !String(defaultValue || '').replace(/<[^>]*>/g, '').trim());
  const [linking, setLinking] = React.useState(false);
  const [href, setHref] = React.useState('');
  const [mention, setMention] = React.useState(null);   // { items, active, x, y, command }
  const editable = !readOnly && !disabled;
  const live = React.useRef({}); live.current = { onChange, editable, mentions, mention, t };

  const mentionOpen = !!(mention && mention.items.length);
  // the editing area's attributes: ProseMirror owns the element, so they go through the engine (and onto the element
  // itself until the engine has loaded)
  const attributes = { id: areaId, class: cx('plx-rich-text', 'plx-rich-text--compact', 'plx-rich-text-editor__area', empty && 'is-empty'),
    role: 'textbox', 'aria-multiline': 'true', 'aria-label': label, 'aria-readonly': readOnly ? 'true' : null, 'aria-disabled': disabled ? 'true' : null,
    'aria-invalid': invalid ? 'true' : null, 'aria-placeholder': placeholder || null, 'data-placeholder': placeholder || null, tabindex: disabled ? '-1' : '0',
    'aria-autocomplete': mentions ? 'list' : null, 'aria-controls': mentionOpen ? auto + '-mentions' : null,
    'aria-activedescendant': mentionOpen ? auto + '-m' + mention.active : null };
  Object.keys(attributes).forEach((k) => { if (attributes[k] == null || attributes[k] === false) delete attributes[k]; });
  const attrKey = JSON.stringify(attributes);
  const shown = React.useRef({});
  React.useLayoutEffect(() => {
    const ed = editorRef.current, el = area.current;
    if (ed && !ed.isDestroyed) { ed.view.setProps({ attributes }); return; }
    if (!el) return;
    Object.keys(shown.current).forEach((k) => { if (!(k in attributes)) el.removeAttribute(k); });
    Object.keys(attributes).forEach((k) => el.setAttribute(k, attributes[k]));
    shown.current = attributes;
  }, [attrKey, ready]);   // eslint-disable-line react-hooks/exhaustive-deps

  // the engine: the cleaned content shows at once; the editor takes over the same element once Tiptap has loaded
  React.useLayoutEffect(() => {
    const el = area.current; if (!el) return undefined;
    const content = cleanRichText(defaultValue);
    el.innerHTML = content;
    let gone = false;
    loadTiptap(el.ownerDocument.defaultView).then((T) => {
      if (gone) return;
      const ed = makeEditor(T, el, {
        content, editable: live.current.editable, markdown: markdownShortcuts, attributes,
        trigger: (mentions && mentions.trigger) || '@', mentions: !!mentions,
        apply: (name, fromKeys) => apply(name, fromKeys),
        search: (q) => { const m = live.current.mentions; return m && m.search ? m.search(q) : []; },
        suggest: (p) => {
          if (!p || !p.items || !p.items.length) { setMention(null); return; }
          const box = p.clientRect ? p.clientRect() : null;
          setMention({ items: p.items, active: 0, x: box ? box.left : 0, y: box ? box.bottom : 0, command: p.command });
        },
        suggestKey: ({ event }) => {
          const m = live.current.mention; if (!m || !m.items.length) return false;
          const n = m.items.length;
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { setMention(Object.assign({}, m, { active: (m.active + (event.key === 'ArrowDown' ? 1 : n - 1)) % n })); return true; }
          if (event.key === 'Enter' || event.key === 'Tab') { pick(m, m.items[m.active]); return true; }
          if (event.key === 'Escape') { setMention(null); return true; }
          return false;
        },
        paste: (view, event) => {
          if (pasting.current) return false;
          const text = event.clipboardData ? event.clipboardData.getData('text/plain') : '';
          event.preventDefault();
          if (!text || !live.current.editable) return true;
          pasting.current = true;
          try { view.pasteText(text, event); } finally { pasting.current = false; }
          return true;
        }
      });
      editorRef.current = ed;
      const sync = () => {
        const f = readFormats(ed);
        setFormats((prev) => (sameFormats(prev, f) ? prev : f));
        setEmpty(ed.isEmpty);
      };
      ed.on('transaction', sync);
      ed.on('update', () => { const cb = live.current.onChange; if (cb) cb(ed.isEmpty ? '' : cleanRichText(ed.getHTML())); });
      ed.on('blur', () => setMention(null));
      sync(); setReady(true);
    }, () => {});
    return () => { gone = true; const ed = editorRef.current; editorRef.current = null; if (ed) ed.destroy(); };
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => { const ed = editorRef.current; if (ed && !ed.isDestroyed && ed.isEditable !== editable) ed.setEditable(editable); }, [editable, ready]);

  const pick = (m, o) => { if (m && m.command && o) m.command({ id: o.value, label: o.label }); setMention(null); };

  const COMMANDS = {
    bold: (c) => c.toggleBold(), italic: (c) => c.toggleItalic(), code: (c) => c.toggleCode(),
    bulleted: (c) => c.toggleBulletList(), numbered: (c) => c.toggleOrderedList(),
    heading: (c) => c.toggleHeading({ level: 2 }), quote: (c) => c.toggleBlockquote(),
    clear: (c) => c.unsetAllMarks().clearNodes(), undo: (c) => c.undo(), redo: (c) => c.redo()
  };
  // a format from the toolbar or the keyboard; from the keyboard it is announced
  function apply(name, fromKeys) {
    const ed = editorRef.current, L = live.current;
    if (!ed || !L.editable) return;
    if (name === 'link') { openLink(); return; }
    const was = name in FORMATS ? ed.isActive(FORMATS[name][0]) : false;
    COMMANDS[name](ed.chain().focus()).run();
    if (fromKeys && name in FORMATS) announce(was ? L.t.off(L.t[name]) : L.t.on(L.t[name]));
  }

  // the link field: opens under the toolbar for the selection kept in saved; Enter adds the link
  function openLink() {
    const ed = editorRef.current; if (!ed) return;
    if (ed.isActive('link')) { ed.chain().focus().extendMarkRange('link').unsetLink().run(); return; }
    const { from, to } = ed.state.selection;
    saved.current = { from, to };
    setHref(''); setLinking(true);
  }
  React.useEffect(() => { if (linking && linkInput.current) linkInput.current.focus(); }, [linking]);
  const closeLink = () => {
    setLinking(false);
    const ed = editorRef.current; if (!ed) return;
    const s = saved.current;
    if (s) ed.chain().focus().setTextSelection(s).run(); else ed.commands.focus();
  };
  const addLink = () => {
    const text = href.trim();
    let to = text;
    closeLink();
    const ed = editorRef.current;
    if (!ed || !to) return;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(to) && !/^[/#.]/.test(to)) to = 'https://' + to;
    if (!SAFE_HREF.test(to)) return;
    if (ed.state.selection.empty) ed.chain().focus().insertContent({ type: 'text', text, marks: [{ type: 'link', attrs: { href: to } }] }).unsetMark('link').run();
    else ed.chain().focus().setLink({ href: to }).run();
  };

  useFloating(area, list, { open: mentionOpen, placement: 'bottom-start', virtual: mentionOpen ? { x: mention.x, y: mention.y } : null });
  React.useLayoutEffect(() => { const el = list.current; if (mentionOpen && TOP_LAYER && el && el.showPopover && !el.matches(':popover-open')) el.showPopover(); }, [mentionOpen]);

  // a format button says whether the text at the caret has its format (aria-pressed); undo, redo and clear are plain buttons
  const PLAIN = ['undo', 'redo', 'clear'];
  const usable = editable && ready;
  // icon-only, named by its word, with a tooltip of the word and its shortcut; Clear formatting keeps its text label
  const toolButton = (name) => {
    const icon = ICONS[name], keys = typeof KEYS[name] === 'function' ? KEYS[name]() : KEYS[name];
    const button = (
      <Button variant="ghost" size="sm" pressed={PLAIN.indexOf(name) >= 0 ? undefined : !!formats[name]} icon={icon} iconOnly={!!icon}
        label={icon ? t[name] : undefined} aria-keyshortcuts={keys ? keysAria(keys) : undefined} disabled={!usable}
        onMouseDown={(e) => e.preventDefault()} onClick={() => apply(name)}>{t[name]}</Button>
    );
    return icon ? <Tooltip key={name} content={keys ? t.tip(t[name], hotkeyLabel(keys)) : t[name]} disabled={!usable}>{button}</Tooltip> : React.cloneElement(button, { key: name });
  };
  const showToolbar = toolbar && !readOnly;
  const full = toolbar === 'full';
  return (
    <div className={cx('plx-rich-text-editor', readOnly && 'is-read-only', disabled && 'is-disabled', className)} {...rest}>
      {showToolbar ? (
        <Toolbar label={t.toolbar} className="plx-rich-text-editor__toolbar">
          <Toolbar.Group>{toolButton('bold')}{toolButton('italic')}{full ? toolButton('code') : null}{toolButton('link')}</Toolbar.Group>
          <Toolbar.Group>{full ? toolButton('heading') : null}{toolButton('bulleted')}{toolButton('numbered')}{full ? toolButton('quote') : null}</Toolbar.Group>
          {full ? <Toolbar.Group>{toolButton('clear')}{toolButton('undo')}{toolButton('redo')}</Toolbar.Group> : null}
        </Toolbar>
      ) : null}
      {linking ? (
        <div className="plx-rich-text-editor__link-bar">
          <Input ref={linkInput} type="url" aria-label={t.linkAddress} placeholder="https://" value={href} onChange={(e) => setHref(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addLink(); } else if (e.key === 'Escape') { e.preventDefault(); closeLink(); } }} />
          <Button size="sm" variant="primary" onClick={addLink}>{t.addLink}</Button>
          <Button size="sm" onClick={closeLink}>{t.cancel}</Button>
        </div>
      ) : null}
      {/* the editing area: ProseMirror's element (its attributes are set above, never by React) */}
      <div ref={area} />
      {mentionOpen ? (
        <ul ref={list} id={auto + '-mentions'} role="listbox" aria-label={t.mentions} popover={TOP_LAYER ? 'manual' : undefined} className="plx-rich-text-editor__mentions">
          {mention.items.map((o, i) => (
            <li key={o.value} id={auto + '-m' + i} role="option" aria-selected={i === mention.active} className={cx('plx-rich-text-editor__mention-option', i === mention.active && 'is-active')}
              onMouseDown={(e) => { e.preventDefault(); pick(mention, o); }}>{mentions && mentions.renderOption ? mentions.renderOption(o) : o.label}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

// starts loading the engine before the first editor mounts (a page whose first screen has an editor)
RichTextEditor.preload = () => { loadTiptap().catch(() => {}); };
