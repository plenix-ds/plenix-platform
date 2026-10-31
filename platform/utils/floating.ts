/* Plenix · useFloating
   Summary: Places a floating element (a menu, popover, tooltip, combobox list or date picker) beside its anchor and keeps it in view: a named placement, an offset step, flip, shift, the anchor's width, or a point (a context menu at the pointer). It writes data attributes only; system/floating.css places the element, so no position is ever written as a style.
   Usage:
     const anchor = React.useRef(null), panel = React.useRef(null);
     const { placement } = useFloating(anchor, panel, { open, placement: 'bottom-start' });
     <button ref={anchor} aria-expanded={open} aria-controls="list">Sort</button>
     {open ? <div ref={panel} id="list" popover="manual" className="plx-menu">…</div> : null}
     useFloating(anchor, panel, { open, placement: 'bottom-start', matchWidth: true })      // a select or combobox list
     useFloating(row, panel, { open, virtual: { x: event.clientX, y: event.clientY } })     // a context menu at the pointer
   Props:
     anchorRef: a ref to the element the floating element is placed against
     floatingRef: a ref to the floating element (best in the top layer: popover="manual", or inside a Portal)
     options.open (true): placed while open; the anchor slot is released when it closes or unmounts
     options.placement ('bottom-start'): top | bottom | start | end (the side; start and end follow the writing direction), centered or aligned: top-start, top-end, bottom-start, bottom-end, start-top, start-bottom, end-top, end-bottom
     options.offset ('xs'): the gap to the anchor: 'none' | 'xs' | 'sm' | 'md' (--plx-sys-floating-offset-*)
     options.flip (true): moves to the opposite side when there is no room
     options.shift (true): swaps the alignment (start to end) to stay in the window; a centered placement aligns to an edge
     options.matchWidth (false): at least as wide as the anchor
     options.virtual (null): { x, y } in window pixels (event.clientX / clientY): placed at that point, flipped and kept inside the window; the anchor is used where the browser cannot place a point
     returns { placement (the side and alignment in use where useFloating measures it), mode: 'anchor' | 'pointer' | 'inline' }
   Behavior:
     anchor: with CSS anchor positioning (Chrome 125, Safari 26, Firefox 147) the browser places the element, flips and shifts it, and follows the anchor on scroll and resize: nothing is measured.
     pointer: with typed attr() (Chrome 133) a virtual anchor is a point: useFloating measures the element, flips it to the other side of the point and keeps it --plx-sys-floating-viewport-margin inside the window, then writes the point (data-plx-floating-x / -y).
     inline: without anchor positioning the element is placed inside the anchor's parent (data-plx-floating-host) on its side; useFloating measures the room and flips or shifts the placement. Render the element next to its anchor for this fallback.
     The pair shares one of 16 anchor names while open (data-plx-floating-anchor / data-plx-floating), so each floating element finds its own anchor anywhere in the page.
   Notes:
     It positions only. Opening, Escape, focus and outside clicks are the overlay's (useLayer), the top layer is popover="manual" or Portal layer="top", and the ARIA link (aria-expanded, aria-controls, aria-describedby) is the component's.
     Menu, Tooltip and Popover adopt it in their own tasks.
*/
import React from 'react';

const SLOTS = 16;
const taken = new Array(SLOTS + 1).fill(false);
const take = (): number => { for (let i = 1; i <= SLOTS; i++) if (!taken[i]) { taken[i] = true; return i; } return 0; };
const release = (i: number) => { if (i) taken[i] = false; };

// what the browser can do, checked once
const supports = (decl: string) => typeof CSS !== 'undefined' && !!CSS.supports && CSS.supports(decl);
export const FLOATING_ANCHOR = supports('anchor-name: --plx-a');
// the top layer (the popover attribute) with CSS anchor positioning: where a floating part opens in the top layer and anchors to its trigger (Chrome 125, Firefox 147, Safari 26), checked once; one copy for every part (issue 693)
export const TOP_LAYER = FLOATING_ANCHOR && typeof HTMLElement !== 'undefined' && Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'popover');
const FLOATING_POINTER = supports('inset-block-start: attr(data-plx-floating-y px, 0px)');

export type FloatingPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'start' | 'start-top' | 'start-bottom' | 'end' | 'end-top' | 'end-bottom';
export type FloatingOffset = 'none' | 'xs' | 'sm' | 'md';
export type FloatingMode = 'anchor' | 'pointer' | 'inline';
export type FloatingOptions = { open?: boolean; placement?: FloatingPlacement | string; offset?: FloatingOffset | string; flip?: boolean; shift?: boolean; matchWidth?: boolean; virtual?: { x: number; y: number } | null };
type Side = 'top' | 'bottom' | 'start' | 'end';
export const PLACEMENTS: string[] = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'start', 'start-top', 'start-bottom', 'end', 'end-top', 'end-bottom'];
const OFFSETS: Record<string, string | null> = { none: null, xs: '--plx-sys-floating-offset-xs', sm: '--plx-sys-floating-offset-sm', md: '--plx-sys-floating-offset-md' };
const ATTRS = ['data-plx-floating', 'data-plx-floating-placement', 'data-plx-floating-offset', 'data-plx-floating-flip', 'data-plx-floating-shift', 'data-plx-floating-match', 'data-plx-floating-pointer', 'data-plx-floating-x', 'data-plx-floating-y'];

// a length token in pixels (the tokens are written in rem; a custom property's computed value has its var() resolved)
function tokenPixels(name: string | null): number {
  if (!name || typeof document === 'undefined') return 0;
  const root = document.documentElement, v = getComputedStyle(root).getPropertyValue(name).trim(), n = parseFloat(v) || 0;
  return /rem$/.test(v) ? n * parseFloat(getComputedStyle(root).fontSize) : n;
}
const set = (el: Element, name: string, value: unknown) => { if (value == null || value === false) el.removeAttribute(name); else el.setAttribute(name, String(value)); };
const isRtl = (el: Element) => getComputedStyle(el).direction === 'rtl';

// the inline fallback: the side with room (flip) and the alignment that stays in the window (shift), from the anchor's box
function measured(anchor: Element, floating: Element, placement: string, flip: boolean, shift: boolean, gap: number): string {
  const a = anchor.getBoundingClientRect(), f = floating.getBoundingClientRect();
  const W = window.innerWidth, H = window.innerHeight, rtl = isRtl(anchor);
  let [side, align] = placement.split('-') as [Side, string | undefined];
  const room: Record<Side, number> = { top: a.top - gap, bottom: H - a.bottom - gap, start: rtl ? W - a.right - gap : a.left - gap, end: rtl ? a.left - gap : W - a.right - gap };
  const need = side === 'top' || side === 'bottom' ? f.height : f.width;
  const opposite = ({ top: 'bottom', bottom: 'top', start: 'end', end: 'start' } as Record<Side, Side>)[side];
  if (flip && room[side] < need && room[opposite] > room[side]) side = opposite;
  if (shift && align && (side === 'top' || side === 'bottom')) {
    // aligned to the inline start, the element runs toward the inline end: does it leave the window there?
    const startEdge = rtl ? a.right : a.left, endRoom = rtl ? startEdge : W - startEdge;
    const endEdge = rtl ? a.left : a.right, startRoom = rtl ? W - endEdge : endEdge;
    if (align === 'start' && endRoom < f.width && startRoom > endRoom) align = 'end';
    else if (align === 'end' && startRoom < f.width && endRoom > startRoom) align = 'start';
  }
  if (shift && align && (side === 'start' || side === 'end')) {
    if (align === 'top' && H - a.top < f.height && a.bottom > H - a.top) align = 'bottom';
    else if (align === 'bottom' && a.bottom < f.height && H - a.top > a.bottom) align = 'top';
  }
  return align ? side + '-' + align : side;
}

// a point: the element's corner at the point, flipped to the other side of it when it does not fit, then kept inside the window
function pointAt(floating: Element, x: number, y: number): [number, number] {
  const f = floating.getBoundingClientRect(), W = window.innerWidth, H = window.innerHeight, m = tokenPixels('--plx-sys-floating-viewport-margin');
  const rtl = isRtl(floating);
  // the inline-start inset of the point, measured from the window's inline-start edge
  let ix = rtl ? W - x : x, iy = y;
  if (ix + f.width > W - m && ix - f.width >= m) ix -= f.width;
  if (iy + f.height > H - m && iy - f.height >= m) iy -= f.height;
  ix = Math.max(m, Math.min(ix, W - m - f.width));
  iy = Math.max(m, Math.min(iy, H - m - f.height));
  return [Math.round(ix), Math.round(iy)];
}

export function useFloating(anchorRef: React.RefObject<Element | null> | null | undefined, floatingRef: React.RefObject<Element | null> | null | undefined, options: FloatingOptions = {}): { placement: string; mode: FloatingMode } {
  const { open = true, placement = 'bottom-start', offset = 'xs', flip = true, shift = true, matchWidth = false, virtual = null } = options;
  const wanted = PLACEMENTS.indexOf(placement) >= 0 ? placement : 'bottom-start';
  const pointer = !!(virtual && FLOATING_POINTER);
  const mode: FloatingMode = pointer ? 'pointer' : FLOATING_ANCHOR ? 'anchor' : 'inline';
  const [used, setUsed] = React.useState(wanted);
  const slot = React.useRef(0);
  const vx = virtual ? virtual.x : null, vy = virtual ? virtual.y : null;

  React.useLayoutEffect(() => {
    const anchor = anchorRef && anchorRef.current, floating = floatingRef && floatingRef.current;
    if (!open || !floating) return undefined;
    const host = !pointer && mode === 'inline' && anchor ? anchor.parentElement : null;
    if (pointer) {
      set(floating, 'data-plx-floating-pointer', '');
      const [ix, iy] = pointAt(floating, vx as number, vy as number);
      set(floating, 'data-plx-floating-x', ix); set(floating, 'data-plx-floating-y', iy);
    } else if (anchor) {
      if (!slot.current) slot.current = take();
      set(anchor, 'data-plx-floating-anchor', slot.current || null);
      set(floating, 'data-plx-floating', slot.current || 'inline');
      set(floating, 'data-plx-floating-offset', offset === 'xs' || !(offset in OFFSETS) ? null : offset);
      set(floating, 'data-plx-floating-flip', flip ? null : 'off');
      set(floating, 'data-plx-floating-shift', shift ? null : 'off');
      set(floating, 'data-plx-floating-match', matchWidth ? 'width' : null);
      if (host) set(host, 'data-plx-floating-host', '');
      set(floating, 'data-plx-floating-placement', wanted);
      let next = wanted;
      if (mode === 'inline') {
        next = measured(anchor, floating, wanted, flip, shift, tokenPixels(OFFSETS[offset] || null));
        set(floating, 'data-plx-floating-placement', next);
      }
      setUsed(next);
    }
    return () => {
      ATTRS.forEach((n) => floating.removeAttribute(n));
      if (anchor) anchor.removeAttribute('data-plx-floating-anchor');
      if (host) host.removeAttribute('data-plx-floating-host');
      release(slot.current); slot.current = 0;
    };
  }, [open, wanted, offset, flip, shift, matchWidth, pointer, mode, vx, vy, anchorRef, floatingRef]);

  // the inline fallback measures again when the window changes size
  React.useEffect(() => {
    if (!open || mode !== 'inline' || typeof window === 'undefined') return undefined;
    const again = () => {
      const anchor = anchorRef!.current, floating = floatingRef!.current;
      if (!anchor || !floating) return;
      set(floating, 'data-plx-floating-placement', wanted);
      const next = measured(anchor, floating, wanted, flip, shift, tokenPixels(OFFSETS[offset] || null));
      set(floating, 'data-plx-floating-placement', next); setUsed(next);
    };
    window.addEventListener('resize', again);
    return () => window.removeEventListener('resize', again);
  }, [open, mode, wanted, flip, shift, offset, anchorRef, floatingRef]);

  return { placement: mode === 'anchor' ? wanted : used, mode };
}
