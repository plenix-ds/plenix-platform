/* Plenix · Resizable, PanelSplitter
   Summary: An area people make wider or taller by dragging its edge (10 Patterns › Selection and organization › Resize):
     Resizable is a box with a resize edge on its end (horizontal), its bottom (vertical) or both
     for those who do not drag; PanelSplitter is the same edge on a pane of the application shell (the navigation pane,
     a secondary pane, the inspector), promoted here from AppShell, which imports and re-exports it. Every size is on the
     4px grid: a drag moves one grid line at a time and lands on one when let go (owner, 2026-10-26), and a list of steps
     narrows the settled sizes further.
   Usage:
     <Resizable label="Preview" axis="horizontal" defaultWidth={320} minWidth={200} maxWidth={560}>…</Resizable>
     <Resizable label="Notes" axis="vertical" height={h} onResize={({ height }) => setH(height)} minHeight={120} maxHeight={400}>…</Resizable>
     <Resizable label="Image" axis="both" defaultWidth={240} defaultHeight={160} …>…</Resizable>
     <Resizable label="Panel" axis="horizontal" steps={[240, 320, 400, 560]} defaultWidth={320}>…</Resizable>   // snapped to steps
     <PanelSplitter label="Resize navigation" value={w} min={140} max={() => 320} onChange={setW} edge="end" />
   Props:
     label: what is resized ("Preview"): the edges' names ("Preview width", "Preview height") (required)
     variant: "default" (a hover line on the edge) | "divider" (the edge is the whole gap to the next panel: a line down
       its middle and a pill on it; its size is the container's --plx-comp-resizable-divider-size: SplitView)
     fill: the content is a column whose children fill it; default false
     axis: "horizontal" (default; the end edge changes the width) | "vertical" (the bottom edge changes the height) |
       "both" (both edges, and a corner the pointer drags in both directions)
     width, height: the size in pixels when the page keeps it; onResize({ width,
       height }) runs with each live size and the snapped release size
     defaultWidth, defaultHeight: the starting size when the box keeps it itself
     minWidth, maxWidth, minHeight, maxHeight: the limits in pixels (defaults: the tokens --plx-comp-resizable-min-width,
       -max-width, -min-height and -max-height: 120 to 560 wide, 80 to 400 high)
     steps: the only sizes allowed, smallest first (each a size token): an array for the resized axis, or { width: [],
       height: [] }; without it the settled size is on the 4px grid within the limits
     strings: the words it says, for other languages: { width: "{label} width", height: "{label} height" }
       "Reset size" }
     strings.minWidth, maxWidth, minHeight, maxHeight: optional explanations at those limits.
     className: more classes on the box; children: its content
     PanelSplitter.label, value, min, max() (a function: the widest it can be now), onChange(width), onCollapse(),
       defaultValue, edge: "end" (an area at the start) | "start" (an area at the end)
   Behavior:
     Pointer: drag an edge (or the corner); the size follows the pointer one grid line (4px) at a time within the limits
       and, when let go, stays on that grid line or settles on the nearest of the supplied steps; the page shows the
       resize pointer.
     Keyboard: each edge is a separator (aria-valuenow, -valuemin, -valuemax) in the Tab order: Arrow Left / Right (the
       end edge, mirrored in a right-to-left page) or Arrow Up / Down (the bottom edge) step to the next size, Home and End
       to the limits.
     No size menu (owner, 2026-10-16: removed, also for touch): the edge is dragged, or moved with the keyboard.
     PanelSplitter: drag (one grid line at a time, within min and max), or the arrow keys (--plx-sys-shell-splitter-step),
       Home and End; double-click or Enter collapses the area when it can collapse (onCollapse: the navigation pane folds
       to its rail).
   Notes:
     The size reaches the stylesheet as data-plx-width and data-plx-height with one rule per size token and one per grid
       line (system/steps.css; never a style attribute or a style element). The content fits itself: it wraps, or scrolls in a region of its own.
     Limit hints appear beside the divider, announce once per limit per drag, and dismiss on release, blur or Escape.
     Motion uses the existing duration token and is skipped when reduced motion is requested.
     A table's column widths are the DataGrid's own; a pane of the shell uses PanelSplitter through its pattern.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { arrowStep, isRtl } from '../../utils/direction.js';
import { SIZE_STEPS } from '../../utils/sizeSteps.js';
import { gridStep, gridWithin } from '../../utils/grid.js';
import { resizeScale } from './resize-scale.js';
import { useFloating } from '../../utils/floating.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.jsx';
const useSizeEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

/* the drag handle on a resizable area's inner edge: drag, or the arrow keys (--plx-sys-shell-splitter-step), Home and End;
   double-click or Enter collapses the area when it can collapse. While dragged the width moves one grid line at a time
   (the base spacing token, 4px) within the limits, so it lands on the grid when let go (owner, 2026-10-26). edge: "end" (an area at the start: dragging toward the end widens it) or
   "start" (an area at the end). In a right-to-left page the start is on the right, so the drag and Arrow Left / Right
   are mirrored (arrowStep gives the step in reading order). No size menu (owner, 2026-10-16). */
export function PanelSplitter({ label, value, min, max, onChange, onCollapse, edge = 'end' }) {
  const dir = edge === 'end' ? 1 : -1;
  // a width is always on the 4px grid (owner, 2026-10-26: smooth, then "the nearest grid line"), within the limits
  const clamp = (w) => gridWithin(w, min, max());
  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const x0 = e.clientX, w0 = value, flip = isRtl(e.currentTarget) ? -1 : 1;
    const move = (ev) => onChange(clamp(w0 + (ev.clientX - x0) * dir * flip));
    const up = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.documentElement.classList.remove('is-resizing-columns'); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.documentElement.classList.add('is-resizing-columns');
  };
  const onKeyDown = (e) => {
    const step = arrowStep(e, e.currentTarget, { vertical: false }) * dir;
    if (step) { e.preventDefault(); onChange(clamp(value + step * (tokenPx('--plx-sys-shell-splitter-step') || gridStep()))); }
    else if (e.key === 'Home') { e.preventDefault(); onChange(clamp(min)); }
    else if (e.key === 'End') { e.preventDefault(); onChange(clamp(max())); }
    else if (e.key === 'Enter' && onCollapse) { e.preventDefault(); onCollapse(); }
  };
  const top = clamp(max());
  return (
      <div role="separator" aria-orientation="vertical" aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={top} tabIndex={0}
        className={cx('plx-panel-splitter', 'plx-panel-splitter--' + edge)} onPointerDown={onPointerDown} onKeyDown={onKeyDown}
        onDoubleClick={onCollapse || undefined} />
  );
}

/* ── Resizable: a box with its own resize edges ── */
const STRINGS = { width: '{label} width', height: '{label} height' };
const fill = (s, vars) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
// the default limits are the component's tokens (--plx-comp-resizable-min-width …), read from the page
const tokenPx = (name) => (typeof document === 'undefined' ? 0 : parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0);
const limit = (v, name) => (v != null ? v : tokenPx('--plx-comp-resizable-' + name));
// One axis's settled sizes: caller steps, or the 4px grid; while dragged the size moves one grid line at a time.
export function Resizable({ label, variant = 'default', fill: fillContent = false, axis = 'horizontal', width, height, onResize, defaultWidth, defaultHeight, minWidth: minW, maxWidth: maxW,
  minHeight: minH, maxHeight: maxH, steps, strings, className, children, ...rest }) {
  const t = Object.assign({}, STRINGS, strings);
  const minWidth = limit(minW, 'min-width'), maxWidth = limit(maxW, 'max-width'), minHeight = limit(minH, 'min-height'), maxHeight = limit(maxH, 'max-height');
  const doW = axis !== 'vertical', doH = axis !== 'horizontal';
  const wSteps = Array.isArray(steps) ? (doW ? steps : null) : steps && steps.width;
  const hSteps = Array.isArray(steps) ? (doW ? null : steps) : steps && steps.height;
  const W = resizeScale(wSteps, minWidth, maxWidth, SIZE_STEPS), H = resizeScale(hSteps, minHeight, maxHeight, SIZE_STEPS);
  const [own, setOwn] = React.useState(() => ({ width: defaultWidth != null ? W.snap(defaultWidth) : W.snap((minWidth + maxWidth) / 2), height: defaultHeight != null ? H.snap(defaultHeight) : H.snap((minHeight + maxHeight) / 2) }));
  const [dragging, setDragging] = React.useState(false);
  // live (dragging): one grid line at a time within the limits; settled: the steps, or the grid
  const live = (S, v) => gridWithin(v, S.lo, S.hi);
  const size = { width: width != null ? (dragging ? live(W, width) : W.snap(width)) : live(W, own.width), height: height != null ? (dragging ? live(H, height) : H.snap(height)) : live(H, own.height) };
  const root = React.useRef(null);
  // a size reaches the stylesheet as data-plx-width / data-plx-height: one rule per size token (resizable.css) and one per
  // grid line (system/steps.css, build-steps.js), never a style attribute or a style element
  const latest = React.useRef(size); latest.current = size;
  const dragCleanup = React.useRef(null), motion = React.useRef([]);
  const stopMotion = () => { motion.current.forEach(animation => animation.cancel()); motion.current = []; };
  const animate = (element, frames) => {
    const win = element && element.ownerDocument.defaultView;
    if (!win || !element.animate || win.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const duration = win.getComputedStyle(element).getPropertyValue('--plx-comp-resizable-edge-duration').trim();
    const milliseconds = parseFloat(duration) * (duration.endsWith('ms') ? 1 : 1000);
    if (milliseconds > 0) motion.current.push(element.animate(frames, { duration: milliseconds }));
  };
  React.useEffect(() => () => { if (dragCleanup.current) dragCleanup.current(); stopMotion(); }, []);
  const [notice, setNotice] = React.useState(''), [announcement, setAnnouncement] = React.useState('');
  const input = React.useRef('pointer');
  const announced = React.useRef(new Set()), anchor = React.useRef(null), bubble = React.useRef(null);
  useFloating(anchor, bubble, { open: !!notice, placement: 'end', offset: 'sm' });
  useSizeEffect(() => {
    const element = bubble.current;
    if (!notice || !element || !element.showPopover) return;
    element.showPopover();
    return () => { if (element.matches(':popover-open')) element.hidePopover(); };
  }, [notice]);
  const reportLimit = next => {
    let message = '';
    for (const [which, scale, active] of [['width', W, doW], ['height', H, doH]]) {
      if (!active || (next[which] > scale.lo && next[which] < scale.hi)) continue;
      const smallest = next[which] <= scale.lo, value = smallest ? scale.lo : scale.hi;
      message = t[(smallest ? 'min' : 'max') + (which === 'width' ? 'Width' : 'Height')] || (smallest ? 'Smallest ' : 'Largest ') + which + ' for ' + label + ' (' + value + 'px)';
      break;
    }
    setNotice(message);
    if (message && !announced.current.has(message)) {
      announced.current.add(message); setAnnouncement(message);
      const handle = anchor.current;
      const transform = handle && handle.classList.contains('plx-resizable__edge--block') ? 'translateY' : 'translateX';
      if (handle) animate(handle, [{ transform: transform + '(0)' }, { transform: transform + '(var(--plx-ref-size-4px))' }, { transform: transform + '(0)' }]);
    }
  };
  const set = (next, settle = true) => {
    reportLimit(next);
    const s = { width: doW ? (settle ? W.snap(next.width) : live(W, next.width)) : latest.current.width, height: doH ? (settle ? H.snap(next.height) : live(H, next.height)) : latest.current.height };
    if (s.width === latest.current.width && s.height === latest.current.height) return;
    latest.current = s;
    if (width == null || height == null) setOwn(s);
    if (onResize) onResize(s);
  };
  const drag = (dx, dy) => (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault(); input.current = 'pointer'; anchor.current = e.currentTarget;
    const x0 = e.clientX, y0 = e.clientY, w0 = latest.current.width, h0 = latest.current.height, flip = isRtl(e.currentTarget) ? -1 : 1;
    stopMotion(); announced.current.clear(); setAnnouncement('');
    setDragging(true);
    const cls = dx && dy ? 'is-resizing-both' : dy ? 'is-resizing-rows' : 'is-resizing-columns';
    const move = (ev) => set({ width: w0 + (ev.clientX - x0) * flip * dx, height: h0 + (ev.clientY - y0) * dy }, false);
    const doc = e.currentTarget.ownerDocument;
    if (dragCleanup.current) dragCleanup.current();
    const clear = () => { doc.removeEventListener('pointermove', move); doc.removeEventListener('pointerup', up); doc.removeEventListener('pointercancel', up); doc.documentElement.classList.remove(cls); dragCleanup.current = null; };
    const up = () => {
      const raw = latest.current, settled = { width: W.snap(raw.width), height: H.snap(raw.height) };
      const before = {}, after = {};
      if (doW) { before.inlineSize = raw.width + 'px'; after.inlineSize = settled.width + 'px'; }
      if (doH) { before.blockSize = raw.height + 'px'; after.blockSize = settled.height + 'px'; }
      if (raw.width !== settled.width || raw.height !== settled.height) animate(root.current, [before, after]);
      set(raw); setNotice(''); setDragging(false); clear();
    };
    dragCleanup.current = clear;
    doc.addEventListener('pointermove', move); doc.addEventListener('pointerup', up); doc.addEventListener('pointercancel', up); doc.documentElement.classList.add(cls);
  };
  const keys = (which) => (e) => {
    input.current = 'keyboard';
    if (e.key === 'Escape') { setNotice(''); return; }
    anchor.current = e.currentTarget;
    const S = which === 'width' ? W : H;
    const step = which === 'width' ? arrowStep(e, e.currentTarget, { vertical: false }) : (e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0);
    const cur = latest.current[which];
    let next = null;
    if (step) next = S.step(cur, step);
    else if (e.key === 'Home') next = S.lo;
    else if (e.key === 'End') next = S.hi;
    if (next == null) return;
    e.preventDefault();
    set(Object.assign({}, latest.current, { [which]: next }));
  };
  const edge = (which) => {
    const S = which === 'width' ? W : H;
    return (
      <div role="separator" tabIndex={0} aria-orientation={which === 'width' ? 'vertical' : 'horizontal'} aria-label={fill(t[which], { label })}
        aria-valuenow={size[which]} aria-valuemin={S.lo} aria-valuemax={S.hi} title={notice || undefined}
        className={cx('plx-resizable__edge', 'plx-resizable__edge--' + (which === 'width' ? 'inline' : 'block'), variant === 'divider' && 'plx-resizable__edge--divider')}
        onPointerDown={which === 'width' ? drag(1, 0) : drag(0, 1)} onKeyDown={keys(which)}
        onBlur={() => setNotice('')} onPointerLeave={() => { if (!dragging && input.current === 'pointer') setNotice(''); }} />
    );
  };
  return (
    <div {...rest} ref={root} className={cx('plx-resizable', 'plx-resizable--' + (doW && doH ? 'both' : doH ? 'vertical' : 'horizontal'), steps && 'plx-resizable--steps', variant === 'divider' && 'plx-resizable--divider', fillContent && 'plx-resizable--fill', className)}
      data-plx-width={doW ? size.width + 'px' : undefined} data-plx-height={doH ? size.height + 'px' : undefined}>
      <div className="plx-resizable__content">{children}</div>
      {notice ? <span ref={bubble} role="tooltip" popover="manual" className="plx-resizable-limit">{notice}</span> : null}
      <VisuallyHidden role="status" aria-live="polite" aria-atomic="true">{announcement}</VisuallyHidden>
      {doW ? edge('width') : null}
      {doH ? edge('height') : null}
      {doW && doH ? <div className="plx-resizable__corner" aria-hidden="true" onPointerDown={drag(1, 1)} /> : null}
    </div>
  );
}
