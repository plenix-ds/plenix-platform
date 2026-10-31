/* Plenix · dnd (platform/utils/dnd.ts)
   Summary: The drag-and-drop engine (13 Interaction › Behavioral utilities › Drag-and-drop engine): pointer, pen and touch
     dragging with a keyboard equivalent for every drag (WCAG 2.2, 2.1.1 and 2.5.7), announcements through the live
     region, auto-scroll near the edges and drop targets with a visible state. Four kinds of drag share it: a sortable
     list (reorder, and move between lists of one group), a data item dropped on a target (a file on a folder), a free
     move (reposition on a canvas) and the drop target itself.
   Usage:
     const s = useSortable({ items, onReorder: setItems, getName: (x) => x.name, label: 'Steps' });
     <ul {...s.listProps}>{items.map((x, i) => (
       <li key={x.id} {...s.itemProps(i)} className={cx('my-row', s.itemProps(i).className)}>
         <DragHandle dnd={s.handleProps(i)} />{x.name}</li>))}</ul>
     const d = useDraggable({ data: asset, type: 'asset', name: asset.name });          // a data item
     <div {...d.props}><DragHandle dnd={d.handleProps} />{asset.name}</div>
     const t = useDropTarget({ name: 'Archive', accepts: (data, type) => type === 'asset', onDrop: (data) => archive(data) });
     <div {...t.props}>Archive</div>
     const r = useReposition({ position, onMove: setPosition, bounds: canvasRef, name: 'Sticky note' });
     <div {...r.props}>…</div>
   Props:
     useSortable(options) → { listProps, itemProps(i), handleProps(i), moveTo(i, to), canMove(i, step), state }
       options.items: the list, in order (required); options.getId(item) (default item.id); options.getName(item): the name
         spoken in the announcements (default item.name, item.label, else the id)
       options.onReorder(next, { item, from, to }): runs with the new order after a drop or a key move
       options.id: the list's id among the lists of a group; options.group: lists that share a group take each other's
         items; options.onMove({ item, from: { list, index }, to: { list, index } }): runs once when an item moves to
         another list of the group (give every list of the group the same handler)
       options.label: the list's name, spoken when an item moves to it
       options.orientation: "vertical" (default) | "horizontal" | "grid": the arrow keys and the drop position follow it
       options.handle: true (default) the drag starts on the handle (handleProps); false the whole item drags (itemProps
         then carries the handlers, the tab stop and the name)
       options.disabled: no drag (default false); options.strings: the words it announces (the catalog's dnd section: Plenix's built-in words for the locale; this prop wins)
     useDraggable(options) → { props, handleProps, targets(), state }
       options.data, options.type: what is dragged and its kind, handed to the targets; options.name: its spoken name
       options.handle: as useSortable; options.disabled; options.strings
       targets(): the registered drop targets that take it, in page order ([{ id, name, drop() }]): a "Move to" menu
     useDropTarget(options) → { ref, props, state }
       options.name: the target's spoken name; options.accepts(data, type): true when it takes the item (default: all)
       options.onDrop(data, type): runs when an item is dropped on it
       options.native: { accepts(dataTransfer), onDrop(dataTransfer) }: also take the browser's own drags (files, text
         from other windows); accepts sees only the types while dragging (dataTransfer.types)
       options.disabled; state: null | "ready" (a drag it takes is under way) | "over" | "reject" (over, not taken)
     useReposition(options) → { props, position, picked, moveBy(dx, dy) }
       options.position: { x, y } in pixels from the element's place in the layout (on the grid); options.onMove(next)
       options.bounds: a ref to the element it stays inside (default its offset parent); options.name; options.disabled
     DND_STRINGS: the default English words (the catalog's dnd section); moveItem(list, from, to) and transferItem(from, fromIndex, to, toIndex): the list
       helpers; setDragOffset(el, dx, dy) and clearDragOffset(el, { settle }): move an element by a transform through
       the Web Animations API (never a style attribute), snapped to the grid; mergeDndProps(a, b): one element's props
       from the engine's and a component's (each event runs the engine's handler first; a handled event stops there)
   Behavior:
     Pointer: a press moves the item once it has traveled past --plx-sys-gesture-slop (on touch, a press held for the
       long-press delay on an item without a handle, so the page still scrolls); the item follows the pointer, raised
       (the Dragged treatment), and the place it will land shows: an insertion line in a list, the outline on a target.
       Release drops it; Escape, or a pointer the system cancels, puts it back.
     Keyboard (every drag): Space or Enter on the handle picks the item up; the arrow keys move it (in a list one place;
       between lists of a group Arrow Left / Right in a vertical list; to the next target for a data item; one step,
       Shift a large step, for a free move); Space or Enter drops it; Escape puts it back where it was; Tab drops it.
       The arrow keys follow the writing direction. Focus stays on the item's handle as it moves.
     Without dragging (WCAG 2.5.7): the patterns offer a menu of moves (Move up, Move down, Move to the start and end,
       Move to a target) or move buttons; canMove, moveTo and targets() give them their state.
     Every pick-up, move, drop and cancel is announced (announce()); the handle carries the instructions
       (aria-describedby) and aria-pressed while the item is picked up.
     Near the top or bottom (start or end) of the scrolling region, or the window, the region scrolls by itself while
       something is dragged (--plx-sys-dnd-autoscroll-edge, -speed); a key move scrolls the item into view.
   Notes:
     The engine never changes a list itself: onReorder and onMove hand the new order to the page, which keeps it.
     Positions are never written in a style attribute: the dragged item and a repositioned one move by a transform set
       through the Web Animations API, snapped to the grid (utils/grid.ts); reduced motion skips the settle.
     system/dnd.css draws the states from the attributes the hooks set (data-plx-dnd-state, data-plx-drop,
       data-plx-drop-state); a component may draw its own from the same attributes.
*/
import React from 'react';
import { announce } from './announce.tsx';
import { snapToGrid, gridPx } from './grid.ts';
import { arrowStep, isRtl } from './direction.ts';
import { tokenMs } from './tokenTime.ts';
import { gestureTokens } from '../hooks/useGesture.js';
import { useStrings } from '../providers/LocaleProvider.jsx';
import english from '../i18n/en.js';
import { fill } from './fill.ts';

// the default (English) words, as before: the catalog's dnd section, so the words live in one place
export const DND_STRINGS = english.dnd;
export type DndStrings = typeof english.dnd;

type Mode = 'keyboard' | 'pointer';
type Orientation = 'vertical' | 'horizontal' | 'grid';
// the insertion line: before or after the item at index
type Mark = { index: number; side: 'before' | 'after' };
// where a dragged list item would land: the list and the place in it
type Over = { list: string; to: number; mark: Mark | null };
type Place = { list: string; index: number };
// the one drag on the page: a list item (sortable), a data item (item: over is the target's id) or a free move (move)
export type DndSession = {
  kind: 'sortable' | 'item' | 'move'; mode: Mode; id: unknown; name?: string; group?: string; list?: string;
  origin?: { list: string; index: number; items: unknown[] }; from?: number; over?: Over | string | null; data?: unknown; type?: string;
};
// a pointer drag as trackPointer reports it: the pointer and how far it moved (the scroll included)
type DragPoint = { x: number; y: number; dx: number; dy: number; canceled?: boolean };
type Track = { el: () => Element | null | undefined; hold: boolean; axis?: 'x' | 'y'; onStart: (p: DragPoint) => void; onMove: (p: DragPoint) => void; onEnd: (p: DragPoint) => void };
type Props = Record<string, unknown>;
export type SortableOptions<T> = {
  items: T[]; getId?: (item: T) => unknown; getName?: (item: T) => string; onReorder?: (next: T[], move: { item: T; from: number; to: number }) => void;
  id?: string; group?: string; onMove?: (move: { item: T; from: Place; to: Place }) => void; label?: string; orientation?: Orientation;
  handle?: boolean; disabled?: boolean; strings?: Partial<DndStrings>;
};
// a list's options as the engine keeps them (the defaults filled in)
type SortableLatest = SortableOptions<unknown> & { items: unknown[]; getId: (item: unknown) => unknown; getName: (item: unknown) => string; label: string; orientation: Orientation };
type ListEntry = { id: string; group?: string; readonly el: HTMLElement | null; readonly o: SortableLatest };
export type DropTargetOptions = {
  name?: string; accepts?: (data: unknown, type?: string) => boolean; onDrop?: (data: unknown, type?: string) => void;
  native?: { accepts?: (dataTransfer: DataTransfer) => boolean; onDrop?: (dataTransfer: DataTransfer) => void }; disabled?: boolean;
};
type TargetEntry = { id: string; readonly el: HTMLElement | null; readonly o: DropTargetOptions };
export type DropState = null | 'ready' | 'over' | 'reject';
export type DraggableOptions = { data?: unknown; type?: string; name?: string; handle?: boolean; disabled?: boolean; strings?: Partial<DndStrings> };
export type Position = { x: number; y: number };
export type RepositionOptions = { position?: Position; onMove?: (next: Position) => void; bounds?: React.RefObject<Element | null>; name?: string; disabled?: boolean; strings?: Partial<DndStrings> };

const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── list helpers ── */
export function moveItem<T>(list: T[], from: number, to: number): T[] {
  const next = list.slice();
  if (from < 0 || from >= next.length) return next;
  const [x] = next.splice(from, 1);
  next.splice(Math.max(0, Math.min(next.length, to)), 0, x);
  return next;
}
export function transferItem<T>(fromList: T[], fromIndex: number, toList: T[], toIndex: number): [T[], T[]] {
  const a = fromList.slice(), b = toList.slice();
  const [x] = a.splice(fromIndex, 1);
  b.splice(Math.max(0, Math.min(b.length, toIndex)), 0, x);
  return [a, b];
}

/* ── one element's props from two sets: an event runs the engine's handler first, the other unless it was handled ── */
export function mergeDndProps(a: Props | null | undefined, b: Props | null | undefined): Props {
  const out: Props = Object.assign({}, b, a);
  Object.keys(a || {}).forEach((k) => {
    if (/^on[A-Z]/.test(k) && b && typeof b[k] === 'function' && typeof a![k] === 'function') {
      type Handler = (e: { defaultPrevented: boolean }) => void;
      out[k] = (e: { defaultPrevented: boolean }) => { (a![k] as Handler)(e); if (!e.defaultPrevented) (b[k] as Handler)(e); };
    }
  });
  if (a && b && a.className && b.className) out.className = b.className + ' ' + a.className;
  return out;
}

/* ── the session: one drag at a time, shared by every list, item and target on the page ── */
let session: DndSession | null = null;
const subscribers = new Set<() => void>();
const subscribe = (f: () => void) => { subscribers.add(f); return () => subscribers.delete(f); };
function setSession(next: DndSession | null): void {
  session = next;
  if (typeof document !== 'undefined') {
    if (next) document.documentElement.setAttribute('data-plx-dnd-active', next.mode);
    else document.documentElement.removeAttribute('data-plx-dnd-active');
  }
  subscribers.forEach((f) => f());
}
function patchSession(part: Partial<DndSession>): void { if (session) setSession(Object.assign({}, session, part)); }
export function useDndSession(): DndSession | null { return React.useSyncExternalStore(subscribe, () => session, () => null); }

// the drop targets and the sortable lists on the page
const targets = new Map<string, TargetEntry>();
const lists = new Map<string, ListEntry>();
let uid = 0;
const nextId = (p: string) => p + '-' + (++uid);
const inPageOrder = <E extends { el: Element | null }>(els: E[]): E[] => els.sort((a, b) => (a.el && b.el && (a.el.compareDocumentPosition(b.el) & 4) ? -1 : 1));

// the instructions every handle points to (aria-describedby): one hidden element per page and wording
const described: Record<string, HTMLElement> = {};
function instructionsId(text: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  if (described[text] && described[text].isConnected) return described[text].id;
  const el = document.createElement('div');
  el.id = nextId('plx-dnd-instructions');
  el.className = 'plx-visually-hidden';
  el.textContent = text;
  document.body.appendChild(el);
  described[text] = el;
  return el.id;
}

/* ── moving an element without a style attribute: a transform through the Web Animations API, on the grid ── */
const offsets = new WeakMap<Element, Animation>();
export function setDragOffset(el: Element | null | undefined, dx: number, dy: number): void {
  if (!el || !el.animate) return;
  const frame = [{ transform: 'translate(' + gridPx(dx, { el }) + ', ' + gridPx(dy, { el }) + ')' }];
  const a = offsets.get(el);
  if (a && a.effect && (a.effect as KeyframeEffect).setKeyframes) { (a.effect as KeyframeEffect).setKeyframes(frame); return; }
  offsets.set(el, el.animate(frame, { duration: 0, fill: 'forwards' }));
}
export function clearDragOffset(el: Element | null | undefined, opts?: { settle?: boolean }): void {
  const a = el && offsets.get(el);
  if (!a) return;
  offsets.delete(el!);
  if (opts && opts.settle && !reduced() && (el as { animate?: unknown }).animate) {
    const ms = tokenMs('--plx-sys-gesture-settle-duration', 0, el);
    const easing = getComputedStyle(el!).getPropertyValue('--plx-sys-gesture-settle-easing').trim() || 'ease';
    const from = a.effect && (a.effect as KeyframeEffect).getKeyframes ? (a.effect as KeyframeEffect).getKeyframes()[0] : null;
    a.cancel();
    if (ms > 0 && from && from.transform) el!.animate([{ transform: from.transform as string }, { transform: 'none' }], { duration: ms, easing });
    return;
  }
  a.cancel();
}

/* ── auto-scroll: the region that scrolls, and the speed near its edges ── */
function scrollParent(el: Element | null | undefined): Element {
  for (let p = el && el.parentElement; p; p = p.parentElement) {
    const cs = getComputedStyle(p);
    if (/(auto|scroll)/.test(cs.overflowY + cs.overflowX) && (p.scrollHeight > p.clientHeight || p.scrollWidth > p.clientWidth)) return p;
  }
  return document.scrollingElement || document.documentElement;
}
function lengthToken(name: string, el?: Element | null): number {
  const v = getComputedStyle(el || document.documentElement).getPropertyValue(name).trim(), n = parseFloat(v);
  if (isNaN(n)) return NaN;
  return /rem$/.test(v) ? n * parseFloat(getComputedStyle(document.documentElement).fontSize) : n;
}
function edgeSpeed(p: number, lo: number, hi: number, edge: number, speed: number): number {
  if (p < lo + edge) return -speed * Math.min(1, (lo + edge - p) / edge);
  if (p > hi - edge) return speed * Math.min(1, (p - (hi - edge)) / edge);
  return 0;
}

/* ── one pointer drag: slop (or the touch hold), the moves with scroll compensation and auto-scroll, the end ── */
function trackPointer(e: React.PointerEvent<Element>, o: Track): void {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  const at = e.currentTarget, tk = gestureTokens(at);
  const slop = tk.slop > 0 ? tk.slop : snapToGrid(8), holdMs = o.hold && e.pointerType === 'touch' ? (tk.longPressDelay > 0 ? tk.longPressDelay : 0) : 0;
  const edge = lengthToken('--plx-sys-dnd-autoscroll-edge', at), speed = lengthToken('--plx-sys-dnd-autoscroll-speed', at);
  const x0 = e.clientX, y0 = e.clientY, id = e.pointerId;
  const scroller = scrollParent(o.el());
  const s0 = { left: scroller.scrollLeft, top: scroller.scrollTop };
  let started = false, held = !holdMs, timer: number | null = null, raf: number | null = null, last = { x: x0, y: y0 }, t0 = 0, done = false;
  const point = (): DragPoint => ({ x: last.x, y: last.y, dx: last.x - x0 + scroller.scrollLeft - s0.left, dy: last.y - y0 + scroller.scrollTop - s0.top });
  const tick = (t: number) => {
    if (done) return;
    const dt = t0 ? Math.min(t - t0, 50) : 16; t0 = t;
    const root = scroller === document.scrollingElement || scroller === document.documentElement;
    const r = root ? { top: 0, left: 0, bottom: window.innerHeight, right: window.innerWidth } : scroller.getBoundingClientRect();
    const vy = edge > 0 && speed > 0 ? edgeSpeed(last.y, r.top, r.bottom, edge, speed) : 0;
    const vx = edge > 0 && speed > 0 && o.axis !== 'y' ? edgeSpeed(last.x, r.left, r.right, edge, speed) : 0;
    if (vx || vy) {
      const before = scroller.scrollTop + scroller.scrollLeft;
      scroller.scrollTop += vy * dt; scroller.scrollLeft += vx * dt;
      if (scroller.scrollTop + scroller.scrollLeft !== before) o.onMove(point());
    }
    raf = requestAnimationFrame(tick);
  };
  const begin = () => { started = true; o.onStart(point()); o.onMove(point()); raf = requestAnimationFrame(tick); };
  const move = (ev: PointerEvent) => {
    if (ev.pointerId !== id) return;
    last = { x: ev.clientX, y: ev.clientY };
    if (!started) {
      const far = Math.hypot(last.x - x0, last.y - y0) > slop;
      if (!held) { if (far) finish(true); return; }   // a touch that moves before the hold: the page scrolls
      if (!far && !holdMs) return;
      begin();
    }
    ev.preventDefault();
    o.onMove(point());
  };
  const block = (ev: Event) => { if (started) ev.preventDefault(); };   // no page scroll while a touch drag is under way
  const key = (ev: KeyboardEvent) => { if (ev.key === 'Escape' && started) { ev.preventDefault(); ev.stopPropagation(); finish(true); } };
  const up = (ev: PointerEvent) => { if (ev.pointerId === id) finish(ev.type === 'pointercancel'); };
  function finish(canceled: boolean): void {
    if (done) return;
    done = true;
    clearTimeout(timer!); if (raf) cancelAnimationFrame(raf);
    document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up);
    document.removeEventListener('touchmove', block); document.removeEventListener('keydown', key, true);
    if (started) o.onEnd(Object.assign(point(), { canceled }));
  }
  if (holdMs) timer = setTimeout(() => { held = true; begin(); }, holdMs);
  document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  document.addEventListener('touchmove', block, { passive: false }); document.addEventListener('keydown', key, true);
}

// a press that ended a drag is not also a click (the handle's menu does not open after a drag)
function useClickGuard() {
  const dragged = React.useRef(false);
  return {
    set: () => { dragged.current = true; setTimeout(() => { dragged.current = false; }, 0); },
    onClick: (e: React.MouseEvent) => { if (dragged.current) { e.preventDefault(); e.stopPropagation(); dragged.current = false; } }
  };
}

const isKey = (e: { key: string }, ...keys: string[]) => keys.indexOf(e.key) >= 0;
const pickKey = (e: { key: string }) => e.key === ' ' || e.key === 'Enter';

/* ── where an item lands: how many items (the dragged one left out) come before the pointer ── */
function landing(els: Element[], skip: number, x: number, y: number, orientation: Orientation, rtl: boolean): { to: number; kept: number[] } {
  let before = 0;
  const kept: number[] = [];
  els.forEach((el, i) => {
    if (i === skip) return;
    kept.push(i);
    const r = el.getBoundingClientRect(), mx = r.left + r.width / 2, my = r.top + r.height / 2;
    const ahead = rtl ? x < mx : x > mx;
    if (orientation === 'horizontal' ? ahead : orientation === 'grid' ? (y > r.bottom || (y >= r.top && ahead)) : y > my) before++;
  });
  return { to: before, kept };
}
// the insertion line for a landing place: before the item that will follow it, or after the last one
function markOf(kept: number[], to: number): Mark | null {
  if (!kept.length) return null;
  return to < kept.length ? { index: kept[to], side: 'before' } : { index: kept[kept.length - 1], side: 'after' };
}

/* ── useSortable: reorder a list, and move items between the lists of a group ── */
// an item's own fields the defaults read (id, name, label)
type Named = { id?: unknown; name?: unknown; label?: unknown };
export function useSortable<T>(options: SortableOptions<T>) {
  const o = (options || {}) as SortableOptions<T>;
  const items = o.items || [];
  const getId = o.getId || ((x: T) => (x as Named).id);
  const getName = o.getName || ((x: T) => String((x as Named).name != null ? (x as Named).name : (x as Named).label != null ? (x as Named).label : getId(x)));
  const orientation: Orientation = o.orientation || 'vertical', useHandle = o.handle !== false;
  const t = useStrings('dnd', o.strings) as DndStrings;
  const [listId] = React.useState(() => o.id || nextId('plx-dnd-list'));
  const listRef = React.useRef<HTMLElement>(null);
  const latest = React.useRef(o as unknown as SortableLatest); latest.current = Object.assign({}, o, { items, getId, getName, label: o.label || t.list, orientation }) as unknown as SortableLatest;
  const now = useDndSession();
  const guard = useClickGuard();
  const describe = instructionsId(t.instructions);

  React.useEffect(() => {
    const entry: ListEntry = { id: listId, group: o.group, get el() { return listRef.current; }, get o() { return latest.current; } };
    lists.set(listId, entry);
    return () => { lists.delete(listId); };
  }, [listId, o.group]);

  const ids = items.map(getId);
  const els = (): HTMLElement[] => (listRef.current ? Array.from(listRef.current.querySelectorAll<HTMLElement>('[data-plx-dnd-owner="' + listId + '"]')) : []);
  const handleOf = (id: unknown): HTMLElement | null | undefined => {
    const root = listRef.current;
    return root ? Array.from(root.querySelectorAll<HTMLElement>('[data-plx-dnd-key]')).find((el) => el.getAttribute('data-plx-dnd-key') === String(id)) : null;
  };
  const columns = () => { const e = els(); if (!e.length) return 1; const top = e[0].offsetTop; const n = e.filter((x) => x.offsetTop === top).length; return n || 1; };
  const group = () => Array.from(lists.values()).filter((l) => l.el && (l.id === listId || (o.group && l.group === o.group)));

  // a key move or a drop keeps focus on the moved item's handle (it may now be in another list)
  React.useLayoutEffect(() => {
    if (!now || now.kind !== 'sortable' || now.mode !== 'keyboard' || now.list !== listId || ids.indexOf(now.id) < 0) return;
    const el = handleOf(now.id);
    if (el && document.activeElement !== el) el.focus({ preventScroll: true });
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduced() ? 'auto' : 'smooth' });
  }, [now, ids.join('\n')]);

  const say = (s: string, vars: Record<string, unknown>) => announce(fill(s, vars));
  const reorder = (from: number, to: number): boolean => {
    const L = latest.current;
    if (to === from || to < 0 || to >= L.items.length || !L.onReorder) return false;
    const item = L.items[from];
    L.onReorder(moveItem(L.items, from, to), { item, from, to });
    return true;
  };
  // programmatic moves (a menu of moves, move buttons): announced, focus kept on the moved item's handle
  // opts.focus(itemEl): the element to focus in the moved item afterwards (default its handle)
  const moveTo = (i: number, to: number, opts?: { focus?: (itemEl: Element) => HTMLElement | null | undefined }): void => {
    const L = latest.current;
    to = Math.max(0, Math.min(L.items.length - 1, to));
    const item = L.items[i];
    if (!reorder(i, to)) return;
    say(t.moved, { name: L.getName(item), position: to + 1, total: L.items.length });
    const id = L.getId(item);
    setTimeout(() => {
      const h = handleOf(id), itemEl = h && h.closest('[data-plx-dnd-owner]');
      const el: HTMLElement | null | undefined = opts && opts.focus && itemEl ? opts.focus(itemEl) : h;
      if (el) el.focus();
    }, 0);
  };
  const canMove = (i: number, step: number): boolean => i + step >= 0 && i + step < items.length;

  const startKeyboard = (i: number) => {
    const item = items[i];
    setSession({ kind: 'sortable', mode: 'keyboard', group: o.group, id: getId(item), name: getName(item), list: listId,
      origin: { list: listId, index: i, items: items.slice() } });
    say(t.pickedUp, { name: getName(item), position: i + 1, total: items.length });
  };
  const keyDown = (i: number) => (e: React.KeyboardEvent<HTMLElement>) => {
    if (o.disabled || e.altKey || e.ctrlKey || e.metaKey) return;
    const item = items[i], id = getId(item), mine = now && now.kind === 'sortable' && now.mode === 'keyboard' && now.id === id && now.list === listId;
    if (!mine) {
      if (pickKey(e) && e.target === e.currentTarget) { e.preventDefault(); startKeyboard(i); }
      return;
    }
    const L = latest.current, name = L.getName(item);
    if (pickKey(e)) {
      e.preventDefault();
      setSession(null);
      say(now.origin!.list === listId ? t.dropped : t.droppedIn, { name, list: L.label, position: i + 1, total: L.items.length });
      return;
    }
    if (e.key === 'Tab') { setSession(null); say(t.dropped, { name, position: i + 1, total: L.items.length }); return; }
    if (e.key === 'Escape') {
      e.preventDefault(); e.stopPropagation();
      const back = now.origin!;
      if (back.list === listId) { if (L.onReorder) L.onReorder(back.items, { item, from: i, to: back.index }); }
      else if (L.onMove) L.onMove({ item, from: { list: listId, index: i }, to: { list: back.list, index: back.index } });
      setSession(Object.assign({}, now, { list: back.list }));
      setTimeout(() => { setSession(null); }, 0);
      say(t.canceled, { name, position: back.index + 1, total: back.items.length });
      return;
    }
    let step = 0, across = 0;
    if (orientation === 'vertical') {
      if (isKey(e, 'ArrowUp')) step = -1; else if (isKey(e, 'ArrowDown')) step = 1;
      else if (isKey(e, 'ArrowLeft', 'ArrowRight')) across = arrowStep(e, e.currentTarget, { vertical: false });
    } else if (orientation === 'horizontal') {
      step = arrowStep(e, e.currentTarget, { vertical: false });
      if (!step && isKey(e, 'ArrowUp', 'ArrowDown')) across = e.key === 'ArrowDown' ? 1 : -1;
    } else {
      step = isKey(e, 'ArrowUp') ? -columns() : isKey(e, 'ArrowDown') ? columns() : arrowStep(e, e.currentTarget, { vertical: false });
    }
    if (isKey(e, 'Home')) step = -i; else if (isKey(e, 'End')) step = L.items.length - 1 - i;
    if (!step && !across) return;
    e.preventDefault();
    if (step) {
      const to = Math.max(0, Math.min(L.items.length - 1, i + step));
      if (to !== i && reorder(i, to)) say(t.moved, { name, position: to + 1, total: L.items.length });
      return;
    }
    // to the neighboring list of the group, in page order (the writing direction decides Left and Right)
    if (!o.group || !L.onMove) return;
    const g = inPageOrder(group());
    const at = g.findIndex((l) => l.id === listId), nb = g[at + across] as ListEntry | undefined;
    if (!nb) return;
    const index = Math.min(i, nb.o.items.length);
    L.onMove({ item, from: { list: listId, index: i }, to: { list: nb.id, index } });
    patchSession({ list: nb.id });
    say(t.movedTo, { name, list: nb.o.label, position: index + 1, total: nb.o.items.length + 1 });
  };

  const pointerDown = (i: number) => (e: React.PointerEvent<HTMLElement>) => {
    if (o.disabled || (now && now.mode === 'keyboard')) return;
    const item = items[i], id = getId(item);
    const itemEl = () => els()[i];
    trackPointer(e, {
      el: itemEl, hold: !useHandle,
      onStart: () => setSession({ kind: 'sortable', mode: 'pointer', group: o.group, id, name: getName(item), list: listId, from: i, over: { list: listId, to: i, mark: null } }),
      onMove: (p) => {
        const el = itemEl(); if (el) setDragOffset(el, p.dx, p.dy);
        // the list under the pointer: this one, or another of the group
        const under = document.elementsFromPoint(p.x, p.y);
        const g = group();
        const hit = g.find((l) => l.el && under.some((u) => l.el!.contains(u))) || (session && session.over ? g.find((l) => l.id === (session!.over as Over).list) : null) || lists.get(listId);
        if (!hit || !hit.el) return;
        const hitEls = Array.from(hit.el.querySelectorAll<HTMLElement>('[data-plx-dnd-owner="' + hit.id + '"]'));
        const land = landing(hitEls, hit.id === listId ? i : -1, p.x, p.y, hit.o.orientation, isRtl(hit.el));
        const mark = hit.id === listId && land.to === i ? null : markOf(land.kept, land.to);
        const prev = session && (session.over as Over | null | undefined);
        if (!prev || prev.list !== hit.id || prev.to !== land.to) patchSession({ over: { list: hit.id, to: land.to, mark } });
      },
      onEnd: (p) => {
        const el = itemEl(), over = session && (session.over as Over | null | undefined), L = latest.current;
        guard.set();
        const still = !over || p.canceled || (over.list === listId && over.to === i);
        if (el) clearDragOffset(el, { settle: still });
        setSession(null);
        if (p.canceled) { say(t.canceled, { name: L.getName(item), position: i + 1, total: L.items.length }); return; }
        if (still) return;
        if (over!.list === listId) {
          if (reorder(i, over!.to)) say(t.dropped, { name: L.getName(item), position: over!.to + 1, total: L.items.length });
        } else if (L.onMove) {
          const dest = lists.get(over!.list);
          L.onMove({ item, from: { list: listId, index: i }, to: { list: over!.list, index: over!.to } });
          say(t.droppedIn, { name: L.getName(item), list: dest ? dest.o.label : t.list, position: over!.to + 1, total: dest ? dest.o.items.length + 1 : over!.to + 1 });
        }
      }
    });
  };

  const stateOf = (id: unknown) => (now && now.kind === 'sortable' && now.id === id && now.list === listId ? (now.mode === 'keyboard' ? 'picked' : 'dragging') : undefined);
  const markFor = (i: number) => (now && now.over && (now.over as Over).list === listId && (now.over as Over).mark && (now.over as Over).mark!.index === i ? (now.over as Over).mark!.side : undefined);
  const handlers = (i: number) => ({
    onPointerDown: pointerDown(i), onKeyDown: keyDown(i), onClick: guard.onClick,
    'aria-describedby': describe, 'aria-pressed': stateOf(getId(items[i])) === 'picked' ? true : undefined,
    'data-plx-dnd-key': String(getId(items[i])), 'data-plx-dnd-handle': ''
  });
  return {
    listProps: { ref: listRef, 'data-plx-dnd-list': listId, 'data-plx-dnd-orientation': orientation },
    itemProps: (i: number): Props => Object.assign({ className: 'plx-dnd-item', 'data-plx-dnd-orientation': orientation, 'data-plx-dnd-owner': listId, 'data-plx-dnd-state': stateOf(getId(items[i])), 'data-plx-drop': markFor(i) },
      useHandle ? null : Object.assign(handlers(i), { tabIndex: o.disabled ? undefined : 0, 'aria-label': fill(t.handle, { name: getName(items[i]) }) })),
    handleProps: (i: number): Props => (useHandle ? Object.assign(handlers(i), { 'aria-label': fill(t.handle, { name: getName(items[i]) }), disabled: o.disabled || undefined }) : {}),
    moveTo, canMove,
    state: { active: now && now.kind === 'sortable' && now.list === listId && ids.indexOf(now.id) >= 0 ? now : null, over: now && now.over && (now.over as Over).list === listId ? (now.over as Over) : null }
  };
}

/* ── useDropTarget: a place that takes dragged items (and, with native, the browser's own drags) ── */
export function useDropTarget(options: DropTargetOptions) {
  const o = options || {};
  const [id] = React.useState(() => nextId('plx-dnd-target'));
  const ref = React.useRef<HTMLElement>(null);
  const latest = React.useRef(o); latest.current = o;
  const now = useDndSession();
  const [nativeState, setNative] = React.useState<DropState>(null);
  const depth = React.useRef(0);
  React.useEffect(() => {
    if (o.disabled) return undefined;
    targets.set(id, { id, get el() { return ref.current; }, get o() { return latest.current; } });
    return () => { targets.delete(id); };
  }, [id, o.disabled]);
  const takes = (s: DndSession) => !o.accepts || !!o.accepts(s.data, s.type);
  let state: DropState = null;
  if (now && now.kind === 'item' && !o.disabled) state = now.over === id ? (takes(now) ? 'over' : 'reject') : takes(now) ? 'ready' : null;
  if (nativeState) state = nativeState;
  const nat = o.native;
  const nativeProps = nat && !o.disabled ? {
    onDragEnter: (e: React.DragEvent) => { depth.current++; setNative(!nat.accepts || nat.accepts(e.dataTransfer) ? 'over' : 'reject'); },
    onDragOver: (e: React.DragEvent) => { if (!nat.accepts || nat.accepts(e.dataTransfer)) { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; } else e.dataTransfer.dropEffect = 'none'; },
    onDragLeave: () => { depth.current = Math.max(0, depth.current - 1); if (!depth.current) setNative(null); },
    onDrop: (e: React.DragEvent) => { e.preventDefault(); depth.current = 0; setNative(null); if ((!nat.accepts || nat.accepts(e.dataTransfer)) && nat.onDrop) nat.onDrop(e.dataTransfer); }
  } : {};
  return { ref, state, props: Object.assign({ ref, className: 'plx-dnd-target', 'data-plx-drop-state': state || undefined, 'data-plx-dnd-target': id }, nativeProps) };
}

/* ── useDraggable: a data item people drop on a target (a file on a folder, a card on a column) ── */
export function useDraggable(options: DraggableOptions) {
  const o = options || {};
  const t = useStrings('dnd', o.strings) as DndStrings;
  const [id] = React.useState(() => nextId('plx-dnd-item'));
  const ref = React.useRef<HTMLElement>(null);
  const now = useDndSession();
  const guard = useClickGuard();
  const describe = instructionsId(t.instructions);
  const mine = now && now.kind === 'item' && now.id === id;
  const takers = () => inPageOrder(Array.from(targets.values()).filter((x) => x.el && (!x.o.accepts || x.o.accepts(o.data, o.type))));
  const drop = (target: TargetEntry) => {
    if (target.o.onDrop) target.o.onDrop(o.data, o.type);
    announce(fill(t.droppedOn, { name: o.name, target: target.o.name }));
  };
  const keyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (o.disabled || e.altKey || e.ctrlKey || e.metaKey) return;
    if (!mine) {
      if (!pickKey(e) || e.target !== e.currentTarget) return;
      e.preventDefault();
      const list = takers();
      if (!list.length) { announce(fill(t.noTargets, { name: o.name })); return; }
      setSession({ kind: 'item', mode: 'keyboard', id, data: o.data, type: o.type, name: o.name, over: list[0].id });
      announce(fill(t.itemPickedUp, { name: o.name, count: list.length }) + ' ' + fill(t.over, { target: list[0].o.name }));
      return;
    }
    if (pickKey(e) || e.key === 'Tab') {
      if (pickKey(e)) e.preventDefault();
      const target = targets.get(now!.over as string);
      setSession(null);
      if (target) drop(target);
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); setSession(null); announce(fill(t.itemCanceled, { name: o.name })); return; }
    const step = arrowStep(e, e.currentTarget);
    if (!step) return;
    e.preventDefault();
    const list = takers();
    const at = list.findIndex((x) => x.id === now!.over);
    const next = list[(at + step + list.length) % list.length];
    if (!next) return;
    patchSession({ over: next.id });
    if (next.el && next.el.scrollIntoView) next.el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduced() ? 'auto' : 'smooth' });
    announce(fill(t.over, { target: next.o.name }));
  };
  const pointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (o.disabled || (now && now.mode === 'keyboard')) return;
    trackPointer(e, {
      el: () => ref.current, hold: o.handle === false,
      onStart: () => setSession({ kind: 'item', mode: 'pointer', id, data: o.data, type: o.type, name: o.name, over: null }),
      onMove: (p) => {
        if (ref.current) setDragOffset(ref.current, p.dx, p.dy);
        const under = document.elementsFromPoint(p.x, p.y);
        let hit: TargetEntry | null = null as TargetEntry | null;
        targets.forEach((x) => { if (!hit && x.el && under.some((u) => x.el!.contains(u))) hit = x; });
        const over = hit ? hit.id : null;
        if (session && session.over !== over) {
          patchSession({ over });
          if (hit) announce(fill(hit.o.accepts && !hit.o.accepts(o.data, o.type) ? t.overReject : t.over, { target: hit.o.name, name: o.name }));
        }
      },
      onEnd: (p) => {
        const target = session && session.over ? targets.get(session.over as string) : null;
        const ok = !p.canceled && target && (!target.o.accepts || target.o.accepts(o.data, o.type));
        guard.set();
        if (ref.current) clearDragOffset(ref.current, { settle: !ok });
        setSession(null);
        if (ok) drop(target!);
        else announce(fill(t.itemCanceled, { name: o.name }));
      }
    });
  };
  const handlers = { onPointerDown: pointerDown, onKeyDown: keyDown, onClick: guard.onClick, 'aria-describedby': describe, 'aria-pressed': mine && now!.mode === 'keyboard' ? true : undefined, 'data-plx-dnd-handle': '' };
  const st = mine ? (now!.mode === 'keyboard' ? 'picked' : 'dragging') : undefined;
  return {
    props: Object.assign({ ref, className: 'plx-dnd-item', 'data-plx-dnd-state': st }, o.handle === false ? Object.assign({}, handlers, { tabIndex: 0, 'aria-label': fill(t.handle, { name: o.name }) }) : null),
    handleProps: o.handle === false ? {} : Object.assign({}, handlers, { 'aria-label': fill(t.handle, { name: o.name }), disabled: o.disabled || undefined }),
    targets: () => takers().map((x) => ({ id: x.id, name: x.o.name, drop: () => drop(x) })),
    state: st || null
  };
}

/* ── useReposition: a free move (a note on a board, a layer on a canvas), on the grid ── */
export function useReposition(options: RepositionOptions) {
  const o = options || {};
  const t = useStrings('dnd', o.strings) as DndStrings;
  const pos: Position = o.position || { x: 0, y: 0 };
  const ref = React.useRef<HTMLElement>(null);
  const [id] = React.useState(() => nextId('plx-dnd-move'));
  const [preview, setPreview] = React.useState<Position | null>(null);
  const origin = React.useRef<Position | null>(null);
  const now = useDndSession();
  const describe = instructionsId(t.instructions);
  const picked = !!(now && now.kind === 'move' && now.id === id && now.mode === 'keyboard');
  const shown = preview || pos;
  const current = React.useRef(shown); current.current = shown;   // the offset drawn now (the pointer handlers outlive a render)
  // the resting place (and the preview while it moves): a transform through the Web Animations API
  React.useLayoutEffect(() => { if (ref.current) setDragOffset(ref.current, shown.x, shown.y); }, [shown.x, shown.y]);
  React.useEffect(() => () => { if (ref.current) clearDragOffset(ref.current); }, []);
  // inside the bounds: the element's place in the layout (without its offset) and the frame it may move in
  const clamp = (x: number, y: number): Position => {
    const el = ref.current, frame = (o.bounds && o.bounds.current) || (el && el.offsetParent);
    x = snapToGrid(x, { el }); y = snapToGrid(y, { el });
    if (!el || !frame) return { x, y };
    const r = el.getBoundingClientRect(), f = frame.getBoundingClientRect();
    const left = r.left - current.current.x, top = r.top - current.current.y;
    const minX = snapToGrid(f.left - left, { round: 'up', el }), maxX = snapToGrid(f.right - left - r.width, { round: 'down', el });
    const minY = snapToGrid(f.top - top, { round: 'up', el }), maxY = snapToGrid(f.bottom - top - r.height, { round: 'down', el });
    return { x: Math.max(minX, Math.min(maxX, x)), y: Math.max(minY, Math.min(maxY, y)) };
  };
  const commit = (next: Position) => { if (o.onMove && (next.x !== pos.x || next.y !== pos.y)) o.onMove(next); };
  const moveBy = (dx: number, dy: number) => { const next = clamp(pos.x + dx, pos.y + dy); commit(next); announce(fill(t.repositioned, { name: o.name })); };
  const keyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (o.disabled || e.altKey || e.ctrlKey || e.metaKey) return;
    if (!picked) {
      if (pickKey(e) && e.target === e.currentTarget) {
        e.preventDefault(); origin.current = pos; setPreview(pos);
        setSession({ kind: 'move', mode: 'keyboard', id, name: o.name });
        announce(fill(t.repositionPicked, { name: o.name }));
      }
      return;
    }
    if (pickKey(e) || e.key === 'Tab') {
      if (pickKey(e)) e.preventDefault();
      commit(preview || pos); setPreview(null); setSession(null); announce(fill(t.repositionDropped, { name: o.name }));
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault(); e.stopPropagation();
      setPreview(null); setSession(null); announce(fill(t.repositionCanceled, { name: o.name }));
      return;
    }
    // a free move goes the way the arrow points, in either writing direction
    const sx = isKey(e, 'ArrowRight') ? 1 : isKey(e, 'ArrowLeft') ? -1 : 0, sy = isKey(e, 'ArrowDown') ? 1 : isKey(e, 'ArrowUp') ? -1 : 0;
    if (!sx && !sy) return;
    e.preventDefault();
    const step = lengthToken(e.shiftKey ? '--plx-sys-dnd-keyboard-step-large' : '--plx-sys-dnd-keyboard-step', e.currentTarget) || snapToGrid(8);
    const base = preview || pos;
    const next = clamp(base.x + sx * step, base.y + sy * step);
    setPreview(next);
    announce(fill(t.repositioned, { name: o.name }));
  };
  const pointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (o.disabled || picked) return;
    const start = pos;
    trackPointer(e, {
      el: () => ref.current, hold: false,
      onStart: () => setSession({ kind: 'move', mode: 'pointer', id, name: o.name }),
      onMove: (p) => setPreview(clamp(start.x + p.dx, start.y + p.dy)),
      onEnd: (p) => {
        const next = p.canceled ? null : clamp(start.x + p.dx, start.y + p.dy);
        setPreview(null); setSession(null);
        if (next) { commit(next); announce(fill(t.repositionDropped, { name: o.name })); }
      }
    });
  };
  const st = now && now.kind === 'move' && now.id === id ? (now.mode === 'keyboard' ? 'picked' : 'dragging') : undefined;
  return {
    props: { ref, tabIndex: o.disabled ? undefined : 0, className: 'plx-dnd-item plx-dnd-move', 'data-plx-dnd-state': st, 'aria-label': o.name,
      'aria-roledescription': t.movable || undefined, 'aria-describedby': describe, 'aria-pressed': picked ? true : undefined,
      onPointerDown: pointerDown, onKeyDown: keyDown },
    position: shown, picked, moveBy
  };
}
