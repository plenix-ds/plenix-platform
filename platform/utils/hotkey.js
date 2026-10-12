/* Plenix · Hotkey (platform/utils/hotkey.js)
   Summary: Keyboard shortcuts in one place: useHotkey binds a key, a chord (Mod K) or a sequence (G then I) to a command,
     for the whole page or for one region, and every binding goes into one registry that the shortcuts dialog and the
     menus read their hints from (Kbd draws the label).
   Usage:
     useHotkey('Mod+K', () => openSearch(), { label: 'Search', group: 'General' });
     useHotkey('G I', () => goTo('inbox'), { label: 'Go to inbox', group: 'Navigation' });
     useHotkey('Delete', removeSelected, { scope: listRef, label: 'Delete the selected files' });
     <Kbd>{hotkeyLabel('Mod+K')}</Kbd>                     // "Ctrl K" on Windows and Linux, "⌘ K" on a Mac
     const all = useHotkeyList();                         // [{ binding, label, group, keys }] for the shortcuts dialog
   Props:
     useHotkey(binding, handler, options): binds while the component is mounted; handler(event) runs on a match
     binding: steps separated by spaces (a sequence: "G I"), each step keys joined by "+" ("Mod+Shift+P"); modifiers Mod
       (Cmd on a Mac, Ctrl elsewhere), Ctrl, Meta, Alt, Shift; keys as KeyboardEvent.key names ("K", "Escape", "/", "?")
     options.scope: a ref (or element) of the region the binding belongs to; it fires only when focus is inside it
     options.enabled: false unbinds it without unmounting (default true)
     options.allowInFields: also fire while focus is in a text field (default false)
     options.label: what the command does, as written in its menu item; options.group: its group in the shortcuts dialog
     registerHotkey(binding, handler, options): the same without React; returns the function that unbinds it
     hotkeyLabel(binding, { mac }): the binding as people read it ("Ctrl Shift P", "G then I")
     hotkeyList(): every labeled binding; useHotkeyList() the same, kept current; subscribeHotkeys(fn) for other code
     setSingleKeyHotkeys(on): turns every single-key shortcut (no modifier) off or on (WCAG 2.2 SC 2.1.4)
   Behavior:
     One keydown listener for the page. The binding of the innermost scope that contains the focus wins; page-wide
     bindings come last. A key that starts a sequence waits --plx-sys-hotkey-sequence-timeout for the next one.
     Ignored while focus is in a text field, a select or editable content, unless allowInFields. Ignored when an earlier
     handler called preventDefault. A match calls preventDefault, so the browser's own use of that key does not run.
   Notes:
     Never bind keys that assistive technology or the browser needs (Tab, the arrow keys outside a widget, Ctrl L, F6).
     Use the same label here as in the menu item, so the dialog and the menu agree.
*/
import React from 'react';
import { tokenMs } from './tokenTime.js';

const MODS = ['ctrl', 'meta', 'alt', 'shift'];
const NAMES = { esc: 'escape', del: 'delete', space: ' ', spacebar: ' ', return: 'enter', up: 'arrowup', down: 'arrowdown', left: 'arrowleft', right: 'arrowright', cmd: 'meta', command: 'meta', option: 'alt', control: 'ctrl' };
const entries = [];
const listeners = new Set();
let singleKeys = true;
let buffer = [], bufferAt = 0, installed = false, nextId = 1;

export function isMac() {
  if (typeof navigator === 'undefined') return false;
  const p = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
  return /mac|iphone|ipad|ipod/i.test(p);
}

// "Mod+Shift+P" → { ctrl, meta, alt, shift, key: 'p' }
function parseStep(step, mac) {
  const parts = step.split('+').filter((x, i, all) => x !== '' || i === all.length - 1).map((x) => (x === '' ? '+' : x));
  const s = { ctrl: false, meta: false, alt: false, shift: false, key: '' };
  parts.forEach((raw) => {
    let p = raw.toLowerCase();
    p = NAMES[p] || p;
    if (p === 'mod') s[mac ? 'meta' : 'ctrl'] = true;
    else if (MODS.indexOf(p) >= 0) s[p] = true;
    else s.key = p;
  });
  return s;
}
export function parseHotkey(binding, mac = isMac()) {
  return String(binding || '').trim().split(/\s+/).filter(Boolean).map((st) => parseStep(st, mac));
}

function matchStep(s, e) {
  const key = (e.key || '').toLowerCase();
  // a letter or digit typed with Alt (or Shift) on some layouts changes e.key: e.code still names the key
  const code = /^Key([A-Z])$|^Digit(\d)$/.exec(e.code || '');
  const sameKey = key === s.key || (!!code && (code[1] || code[2]).toLowerCase() === s.key);
  if (!sameKey) return false;
  // a symbol that needs Shift ("?") is written without it: Shift is then not compared
  const symbol = s.key.length === 1 && !/[a-z0-9]/.test(s.key);
  return e.ctrlKey === s.ctrl && e.metaKey === s.meta && e.altKey === s.alt && (symbol || e.shiftKey === s.shift);
}

const isSingle = (steps) => steps.length >= 1 && steps.every((s) => !s.ctrl && !s.meta && !s.alt) && steps[0].key.length === 1;

function inField(el) {
  if (!el || !el.tagName) return false;
  if (el.isContentEditable) return true;
  const t = el.tagName.toLowerCase();
  if (t === 'textarea' || t === 'select') return true;
  if (t !== 'input') return false;
  return ['checkbox', 'radio', 'button', 'submit', 'reset', 'range', 'color', 'file', 'image'].indexOf((el.type || '').toLowerCase()) < 0;
}

const scopeOf = (x) => (x && 'current' in x ? x.current : x) || null;
const depth = (el) => { let n = 0; for (let x = el; x; x = x.parentElement) n++; return n; };

function onKeyDown(e) {
  if (e.defaultPrevented || e.isComposing || ['Control', 'Meta', 'Alt', 'Shift'].indexOf(e.key) >= 0) return;
  const now = Date.now();
  if (now - bufferAt > tokenMs('--plx-sys-hotkey-sequence-timeout')) buffer = [];
  const target = e.target, field = inField(target);
  const live = entries.filter((x) => x.enabled && (!field || x.allowInFields) && (singleKeys || !isSingle(x.steps)))
    .map((x) => ({ x, scope: scopeOf(x.scope) }))
    .filter((c) => !c.x.scope || (c.scope && c.scope.contains(target)))
    .sort((a, b) => (b.scope ? depth(b.scope) : 0) - (a.scope ? depth(a.scope) : 0));
  const step = buffer.length;
  const fits = (c, at) => c.x.steps.length > at && buffer.slice(buffer.length - at).every((ev, i) => matchStep(c.x.steps[i], ev)) && matchStep(c.x.steps[at], e);
  // the longest waiting sequence first, then a fresh start
  for (const at of [step, 0].filter((v, i, all) => all.indexOf(v) === i)) {
    const full = live.find((c) => c.x.steps.length === at + 1 && fits(c, at));
    if (full) { buffer = []; e.preventDefault(); full.x.handler(e); return; }
    if (live.some((c) => c.x.steps.length > at + 1 && fits(c, at))) {
      buffer = buffer.slice(buffer.length - at).concat([{ key: e.key, code: e.code, ctrlKey: e.ctrlKey, metaKey: e.metaKey, altKey: e.altKey, shiftKey: e.shiftKey }]);
      bufferAt = now;
      return;
    }
  }
  buffer = [];
}

function install() {
  if (installed || typeof document === 'undefined') return;
  document.addEventListener('keydown', onKeyDown);
  installed = true;
}
const notify = () => listeners.forEach((fn) => fn());

export function registerHotkey(binding, handler, options = {}) {
  install();
  const entry = { id: nextId++, binding, steps: parseHotkey(binding), handler, scope: options.scope || null,
    enabled: options.enabled !== false, allowInFields: !!options.allowInFields, label: options.label || '', group: options.group || '' };
  entries.push(entry);
  if (entry.label) notify();
  return () => { const i = entries.indexOf(entry); if (i >= 0) { entries.splice(i, 1); if (entry.label) notify(); } };
}

export function useHotkey(binding, handler, options = {}) {
  const ref = React.useRef(handler);
  ref.current = handler;
  const { scope, enabled = true, allowInFields = false, label, group } = options;
  React.useEffect(() => {
    if (!enabled || !binding) return undefined;
    return registerHotkey(binding, (e) => ref.current && ref.current(e), { scope, allowInFields, label, group });
  }, [binding, scope, enabled, allowInFields, label, group]);
}

const MAC_NAMES = { meta: '⌘', ctrl: '⌃', alt: '⌥', shift: '⇧' };
const PC_NAMES = { meta: 'Win', ctrl: 'Ctrl', alt: 'Alt', shift: 'Shift' };
const KEY_NAMES = { ' ': 'Space', escape: 'Esc', arrowup: '↑', arrowdown: '↓', arrowleft: '←', arrowright: '→', enter: 'Enter', delete: 'Delete', backspace: 'Backspace', tab: 'Tab' };
export function hotkeyKeys(binding, { mac = isMac() } = {}) {
  const names = mac ? MAC_NAMES : PC_NAMES;
  return parseHotkey(binding, mac).map((s) => (mac ? ['ctrl', 'alt', 'shift', 'meta'] : ['ctrl', 'meta', 'alt', 'shift']).filter((m) => s[m]).map((m) => names[m])
    .concat([KEY_NAMES[s.key] || (s.key.length === 1 ? s.key.toUpperCase() : s.key.charAt(0).toUpperCase() + s.key.slice(1))]));
}
export function hotkeyLabel(binding, options) {
  return hotkeyKeys(binding, options).map((k) => k.join(' ')).join(' then ');
}

export function hotkeyList() {
  return entries.filter((x) => x.label).map((x) => ({ binding: x.binding, label: x.label, group: x.group, keys: hotkeyLabel(x.binding), enabled: x.enabled }));
}
export function subscribeHotkeys(fn) { listeners.add(fn); return () => listeners.delete(fn); }
export function useHotkeyList() {
  const [list, setList] = React.useState(hotkeyList);
  React.useEffect(() => { setList(hotkeyList()); return subscribeHotkeys(() => setList(hotkeyList())); }, []);
  return list;
}

export function setSingleKeyHotkeys(on) { singleKeys = !!on; buffer = []; }
export function singleKeyHotkeys() { return singleKeys; }
