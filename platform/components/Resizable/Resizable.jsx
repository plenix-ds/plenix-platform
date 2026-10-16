/* Plenix · Resizable, PanelSplitter
   Summary: An area people make wider or taller by dragging its edge (10 Patterns › Selection and organization › Resize):
     Resizable is a box with a resize edge on its end (horizontal), its bottom (vertical) or both, and a menu of sizes
     for those who do not drag; PanelSplitter is the same edge on a pane of the application shell (the navigation pane,
     a secondary pane, the inspector), promoted here from AppShell, which imports and re-exports it. Every size is a size
     token: a drag snaps to the nearest, the arrow keys step through them, and a list of steps narrows them further.
   Usage:
     <Resizable label="Preview" axis="horizontal" defaultWidth={320} minWidth={200} maxWidth={560}>…</Resizable>
     <Resizable label="Notes" axis="vertical" height={h} onResize={({ height }) => setH(height)} minHeight={120} maxHeight={400}>…</Resizable>
     <Resizable label="Image" axis="both" defaultWidth={240} defaultHeight={160} …>…</Resizable>
     <Resizable label="Panel" axis="horizontal" steps={[240, 320, 400, 560]} defaultWidth={320}>…</Resizable>   // snapped to steps
     <PanelSplitter label="Resize navigation" value={w} min={140} max={() => 320} onChange={setW} edge="end" />
   Props:
     label: what is resized ("Preview"): the edges' names ("Preview width", "Preview height") and the menu's (required)
     axis: "horizontal" (default; the end edge changes the width) | "vertical" (the bottom edge changes the height) |
       "both" (both edges, and a corner the pointer drags in both directions)
     width, height: the size in pixels, each a size token (--plx-ref-size-*), when the page keeps it; onResize({ width,
       height }) runs with each new size
     defaultWidth, defaultHeight: the starting size when the box keeps it itself; Reset size in the menu goes back to it
     minWidth, maxWidth, minHeight, maxHeight: the limits in pixels (defaults: the tokens --plx-comp-resizable-min-width,
       -max-width, -min-height and -max-height: 120 to 560 wide, 80 to 400 high)
     steps: the only sizes allowed, smallest first (each a size token): an array for the resized axis, or { width: [],
       height: [] }; without it every size token within the limits
     strings: the words it shows, for other languages: { width: "{label} width", height: "{label} height", options:
       "{label} size options", narrower: "Narrower", wider: "Wider", shorter: "Shorter", taller: "Taller", reset:
       "Reset size" }
     className: more classes on the box; children: its content
     PanelSplitter.label, value, min, max() (a function: the widest it can be now), onChange(width), onCollapse(),
       defaultValue, edge: "end" (an area at the start) | "start" (an area at the end)
   Behavior:
     Pointer: drag an edge (or the corner); the size follows in size-token steps; the page shows the resize pointer.
     Keyboard: each edge is a separator (aria-valuenow, -valuemin, -valuemax) in the Tab order: Arrow Left / Right (the
       end edge, mirrored in a right-to-left page) or Arrow Up / Down (the bottom edge) step to the next size, Home and End
       to the limits.
     Without dragging (WCAG 2.5.7): a small menu button inside the box's end corner (shown while the box is hovered or has
       focus inside, always with a touch interaction) offers Narrower, Wider, Shorter, Taller and Reset size.
     PanelSplitter: drag, or the arrow keys, Home and End; double-click or Enter collapses the area when it can collapse;
       its width menu offers Narrower, Wider, Reset width and Collapse.
   Notes:
     The size reaches the stylesheet as data-plx-width and data-plx-height with one rule per size token (never a style
       attribute). The content fits itself: it wraps, or scrolls in a region of its own.
     A table's column widths are the DataTable's own; a pane of the shell uses PanelSplitter through its pattern.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { arrowStep, isRtl } from '../../utils/direction.js';
import { snapSize, stepSize } from '../../utils/sizeSteps.js';
import { Menu, MenuItem } from '../Menu/Menu.jsx';
import { Button } from '../Button/Button.jsx';

/* the drag handle on a resizable area's inner edge: drag, or the arrow keys (16px), Home and End; double-click or Enter
   collapses the area when it can collapse. edge: "end" (an area at the start: dragging toward the end widens it) or
   "start" (an area at the end). In a right-to-left page the start is on the right, so the drag and Arrow Left / Right
   are mirrored (arrowStep gives the step in reading order).
   Without dragging (WCAG 2.5.7): a small menu button on the edge (shown while the edge is hovered or focused, always with
   a touch or mobile interaction) offers Narrower and Wider (one size token), Reset width (with defaultValue, the area's
   default width) and Collapse (with onCollapse). */
const SPLITTER = { options: '{label} options', narrower: 'Narrower', wider: 'Wider', reset: 'Reset width', collapse: 'Collapse' };
export function PanelSplitter({ label, value, min, max, onChange, onCollapse, defaultValue, edge = 'end' }) {
  const dir = edge === 'end' ? 1 : -1;
  // a width is always a size token (batch 281: Strict DS): dragging snaps to the nearest, the arrow keys step through them
  const clamp = (w) => snapSize(w, min, max());
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
    if (step) { e.preventDefault(); onChange(stepSize(value, step, min, max())); }
    else if (e.key === 'Home') { e.preventDefault(); onChange(clamp(min)); }
    else if (e.key === 'End') { e.preventDefault(); onChange(clamp(max())); }
    else if (e.key === 'Enter' && onCollapse) { e.preventDefault(); onCollapse(); }
  };
  const top = clamp(max()), now = clamp(value);
  return (
    <>
      <div role="separator" aria-orientation="vertical" aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={top} tabIndex={0}
        className={cx('plx-panel-splitter', 'plx-panel-splitter--' + edge)} onPointerDown={onPointerDown} onKeyDown={onKeyDown}
        data-plx-target-equivalent="the width menu beside it (WCAG 2.5.8 Equivalent)"
        onDoubleClick={onCollapse || undefined} />
      <Menu label={label} placement={edge === 'end' ? 'bottom-end' : 'bottom-start'} className={cx('plx-panel-splitter__menu', 'plx-panel-splitter__menu--' + edge)}
        trigger={<Button size="xs" iconOnly icon="more" label={SPLITTER.options.replace('{label}', label || '')} />}>
        <MenuItem disabled={now <= clamp(min)} onSelect={() => onChange(stepSize(value, -1, min, max()))}>{SPLITTER.narrower}</MenuItem>
        <MenuItem disabled={now >= top} onSelect={() => onChange(stepSize(value, 1, min, max()))}>{SPLITTER.wider}</MenuItem>
        {defaultValue != null ? <MenuItem icon="refresh" disabled={now === clamp(defaultValue)} onSelect={() => onChange(clamp(defaultValue))}>{SPLITTER.reset}</MenuItem> : null}
        {onCollapse ? <MenuItem icon={edge === 'end' ? 'panel-left-close' : 'panel-right-close'} onSelect={onCollapse}>{SPLITTER.collapse}</MenuItem> : null}
      </Menu>
    </>
  );
}

/* ── Resizable: a box with its own resize edges ── */
const STRINGS = { width: '{label} width', height: '{label} height', options: '{label} size options', narrower: 'Narrower', wider: 'Wider',
  shorter: 'Shorter', taller: 'Taller', reset: 'Reset size' };
const fill = (s, vars) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
// the default limits are the component's tokens (--plx-comp-resizable-min-width …), read from the page
const tokenPx = (name) => (typeof document === 'undefined' ? 0 : parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0);
const limit = (v, name) => (v != null ? v : tokenPx('--plx-comp-resizable-' + name));
// one axis's sizes: the steps given (within the limits), or every size token within them
function scaleOf(steps, min, max) {
  const list = Array.isArray(steps) ? steps.filter((s) => s >= min && s <= max) : null;
  const snap = (px) => (list && list.length ? list.reduce((a, b) => (Math.abs(b - px) < Math.abs(a - px) ? b : a)) : snapSize(px, min, max));
  const step = (px, dir) => {
    if (!list || !list.length) return stepSize(px, dir, min, max);
    const i = list.indexOf(snap(px)) + (dir > 0 ? 1 : -1);
    return list[Math.max(0, Math.min(list.length - 1, i))];
  };
  return { snap, step, lo: list && list.length ? list[0] : snap(min), hi: list && list.length ? list[list.length - 1] : snap(max) };
}

export function Resizable({ label, axis = 'horizontal', width, height, onResize, defaultWidth, defaultHeight, minWidth: minW, maxWidth: maxW,
  minHeight: minH, maxHeight: maxH, steps, strings, className, children, ...rest }) {
  const t = Object.assign({}, STRINGS, strings);
  const minWidth = limit(minW, 'min-width'), maxWidth = limit(maxW, 'max-width'), minHeight = limit(minH, 'min-height'), maxHeight = limit(maxH, 'max-height');
  const doW = axis !== 'vertical', doH = axis !== 'horizontal';
  const wSteps = Array.isArray(steps) ? (doW ? steps : null) : steps && steps.width;
  const hSteps = Array.isArray(steps) ? (doW ? null : steps) : steps && steps.height;
  const W = scaleOf(wSteps, minWidth, maxWidth), H = scaleOf(hSteps, minHeight, maxHeight);
  const [own, setOwn] = React.useState(() => ({ width: defaultWidth != null ? W.snap(defaultWidth) : W.snap((minWidth + maxWidth) / 2), height: defaultHeight != null ? H.snap(defaultHeight) : H.snap((minHeight + maxHeight) / 2) }));
  const size = { width: width != null ? W.snap(width) : own.width, height: height != null ? H.snap(height) : own.height };
  const latest = React.useRef(size); latest.current = size;
  const set = (next) => {
    const s = { width: doW ? W.snap(next.width) : latest.current.width, height: doH ? H.snap(next.height) : latest.current.height };
    if (s.width === latest.current.width && s.height === latest.current.height) return;
    latest.current = s;
    if (width == null || height == null) setOwn(s);
    if (onResize) onResize(s);
  };
  const drag = (dx, dy) => (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    const x0 = e.clientX, y0 = e.clientY, w0 = latest.current.width, h0 = latest.current.height, flip = isRtl(e.currentTarget) ? -1 : 1;
    const cls = dx && dy ? 'is-resizing-both' : dy ? 'is-resizing-rows' : 'is-resizing-columns';
    const move = (ev) => set({ width: w0 + (ev.clientX - x0) * flip * dx, height: h0 + (ev.clientY - y0) * dy });
    const up = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up); document.documentElement.classList.remove(cls); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up); document.documentElement.classList.add(cls);
  };
  const keys = (which) => (e) => {
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
  const reset = { width: defaultWidth != null ? W.snap(defaultWidth) : null, height: defaultHeight != null ? H.snap(defaultHeight) : null };
  const canReset = (doW && reset.width != null && reset.width !== size.width) || (doH && reset.height != null && reset.height !== size.height);
  const edge = (which) => {
    const S = which === 'width' ? W : H;
    return (
      <div role="separator" tabIndex={0} aria-orientation={which === 'width' ? 'vertical' : 'horizontal'} aria-label={fill(t[which], { label })}
        aria-valuenow={size[which]} aria-valuemin={S.lo} aria-valuemax={S.hi} data-plx-target-equivalent="the size menu in the box (WCAG 2.5.8 Equivalent)"
        className={cx('plx-resizable__edge', 'plx-resizable__edge--' + (which === 'width' ? 'inline' : 'block'))}
        onPointerDown={which === 'width' ? drag(1, 0) : drag(0, 1)} onKeyDown={keys(which)} />
    );
  };
  return (
    <div {...rest} className={cx('plx-resizable', 'plx-resizable--' + (doW && doH ? 'both' : doH ? 'vertical' : 'horizontal'), steps && 'plx-resizable--steps', className)}
      data-plx-width={doW ? size.width + 'px' : undefined} data-plx-height={doH ? size.height + 'px' : undefined}>
      <div className="plx-resizable__content">{children}</div>
      {doW ? edge('width') : null}
      {doH ? edge('height') : null}
      {doW && doH ? <div className="plx-resizable__corner" aria-hidden="true" onPointerDown={drag(1, 1)} /> : null}
      <Menu label={fill(t.options, { label })} placement="bottom-end" className="plx-resizable__menu"
        trigger={<Button size="xs" iconOnly icon="more" label={fill(t.options, { label })} />}>
        {doW ? <MenuItem disabled={size.width <= W.lo} onSelect={() => set(Object.assign({}, latest.current, { width: W.step(size.width, -1) }))}>{t.narrower}</MenuItem> : null}
        {doW ? <MenuItem disabled={size.width >= W.hi} onSelect={() => set(Object.assign({}, latest.current, { width: W.step(size.width, 1) }))}>{t.wider}</MenuItem> : null}
        {doH ? <MenuItem disabled={size.height <= H.lo} onSelect={() => set(Object.assign({}, latest.current, { height: H.step(size.height, -1) }))}>{t.shorter}</MenuItem> : null}
        {doH ? <MenuItem disabled={size.height >= H.hi} onSelect={() => set(Object.assign({}, latest.current, { height: H.step(size.height, 1) }))}>{t.taller}</MenuItem> : null}
        {reset.width != null || reset.height != null ? <MenuItem icon="refresh" disabled={!canReset} onSelect={() => set({ width: reset.width != null ? reset.width : size.width, height: reset.height != null ? reset.height : size.height })}>{t.reset}</MenuItem> : null}
      </Menu>
    </div>
  );
}
