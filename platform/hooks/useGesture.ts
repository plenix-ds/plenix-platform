/* Plenix · useGesture
   Summary: Touch, pen and mouse gestures from pointer events, on the gesture motion tokens: tap, long press, pan (drag),
     swipe, fling, pinch to zoom and pull to refresh. It reports what the pointers do; the component decides what moves
     and always offers the same action as a visible control (a button or a menu item).
   Usage:
     const ref = React.useRef(null);
     useGesture(ref, { axis: 'x', onSwipe: (g) => { if (g.direction === 'left') archive(); } });          // swipe a row
     useGesture(ref, { onLongPress: (g) => openMenuAt(g.x, g.y) });                                         // long press
     useGesture(ref, { onPinch: (g) => setZoom(clamp(base * g.scale, 1, g.maxScale)) });                   // pinch to zoom
     useGesture(listRef, { pull: true, onPull: (g) => setPull(g), onRefresh: reload });                      // pull to refresh
     <div ref={ref} className="plx-gesture plx-gesture--pan-y">…</div>                                      // system/gesture.css
   Props:
     ref: a ref to the element that takes the gestures
     options.axis ("both"): "x" | "y" | "both": the pan and swipe axis; movement mostly along the other axis is left to
       the browser (the page still scrolls)
     options.onTap({ x, y, pointerType }): a press released without moving past the slop and before the long-press delay
     options.onLongPress({ x, y, pointerType }): held still for --plx-sys-gesture-long-press-delay
     options.onPanStart(g), options.onPan(g), options.onPanEnd(g): a drag past --plx-sys-gesture-slop; g = { dx, dy (from
       the start), vx, vy (px per ms), pointerType, canceled (onPanEnd: the pointer was canceled) }
     options.onSwipe({ direction, inline, distance, velocity }): a pan released past --plx-sys-gesture-swipe-distance, or
       faster than --plx-sys-gesture-fling-velocity; direction "left" | "right" | "up" | "down", inline "start" | "end"
       (left and right in reading order) or null
     options.onFling({ vx, vy, direction, travelX, travelY }): released faster than the fling velocity; travel is how
       far it would coast on --plx-sys-gesture-fling-decay (flingDistance)
     options.onPinch({ scale, originX, originY, maxScale, first }), options.onPinchEnd({ scale }): two pointers; scale is
       relative to the pinch's start, maxScale the --plx-sys-gesture-pinch-max-scale token
     options.pull (false): pull to refresh: a downward pan that starts with the element scrolled to its top
     options.onPull({ distance, progress, ready, released }): the pull after --plx-sys-gesture-pull-resistance; ready
       once it reaches --plx-sys-gesture-pull-distance; released when the finger lifts (distance 0)
     options.onRefresh(): the pull was released while ready
     options.disabled (false): no gestures
     returns { active }: the gesture under way: null, "press", "pan", "pinch" or "pull" (to style the element)
   Behavior:
     Gestures end on release, so moving back before lifting cancels a swipe (WCAG 2.2, 2.5.2); a pointer that leaves the
       window or is canceled by the system ends the pan with canceled true.
     The pointer is captured once a pan starts, so it is followed outside the element; a tap on a child still clicks it.
     Only the primary mouse button starts a gesture. A second finger turns a press or a pan into a pinch.
     Every distance, time and rate is a token read when the gesture starts, so the density and interaction contexts apply.
   Notes:
     A gesture is a shortcut, never the only way: swipe to archive has an Archive button, pinch has zoom buttons, pull to
       refresh has a Refresh button, a long press has the same menu on its button (WCAG 2.2, 2.5.1 and 2.5.7).
     Give the element touch-action through system/gesture.css (plx-gesture, plx-gesture--pan-x, plx-gesture--pan-y) so
       the browser does not scroll or zoom while the gesture is tracked.
     Moving an element with the finger is the component's own stylesheet's work (steps through a data attribute); the
       settle after it is .plx-gesture-settle (--plx-sys-gesture-settle-duration and -easing). Reduced motion settles at once.
*/
import React from 'react';
import { isRtl } from '../utils/direction.ts';

export type GestureTokens = { slop: number; swipeDistance: number; flingVelocity: number; flingDecay: number; longPressDelay: number; pullDistance: number; pullResistance: number; pinchMaxScale: number };
export type GesturePress = { x: number; y: number; pointerType: string };
export type GesturePan = { dx: number; dy: number; vx: number; vy: number; pointerType: string; canceled?: boolean };
export type GestureSwipe = { direction: 'left' | 'right' | 'up' | 'down'; inline: 'start' | 'end' | null; distance: number; velocity: number };
export type GestureFling = { vx: number; vy: number; direction: 'left' | 'right' | 'up' | 'down'; travelX: number; travelY: number };
export type GesturePinch = { scale: number; originX: number; originY: number; maxScale: number; first: boolean };
export type GesturePull = { distance: number; progress: number; ready: boolean; released: boolean };
export type GestureOptions = {
  axis?: 'x' | 'y' | 'both'; pull?: boolean; disabled?: boolean;
  onTap?(g: GesturePress): void; onLongPress?(g: GesturePress): void;
  onPanStart?(g: GesturePan): void; onPan?(g: GesturePan): void; onPanEnd?(g: GesturePan): void;
  onSwipe?(g: GestureSwipe): void; onFling?(g: GestureFling): void;
  onPinch?(g: GesturePinch): void; onPinchEnd?(g: { scale: number }): void;
  onPull?(g: GesturePull): void; onRefresh?(): void;
};
export type GestureMode = 'press' | 'pan' | 'pinch' | 'pull' | 'none';
type Point = { x: number; y: number };
type Sample = Point & { t: number };
// the gesture under way (a pinch keeps the press's fields, and adds its start distance and last scale)
type Gesture = {
  mode: GestureMode; pointerId: number; pointerType: string; start: Sample; samples: Sample[]; tokens: GestureTokens;
  timer: ReturnType<typeof setTimeout> | null; long: boolean; atTop: boolean; ready?: boolean; startDist?: number; lastScale?: number;
};

const VELOCITY_WINDOW = 100;   // the last 100 ms of movement give the release velocity (a sampling window, not a look)

// a token's value on the element: a length in px (rem converted), a time in ms, or a number
function tokenOn(el: Element, name: string): number {
  const cs = getComputedStyle(el), v = cs.getPropertyValue(name).trim(), n = parseFloat(v);
  if (isNaN(n)) return NaN;
  if (/rem$/.test(v)) return n * parseFloat(getComputedStyle(document.documentElement).fontSize);
  if (/ms$/.test(v)) return n;
  if (/s$/.test(v)) return n * 1000;
  return n;
}

// the gesture tokens as numbers, read from the element (or the page)
export function gestureTokens(el?: Element | null): GestureTokens {
  const at = el || (typeof document !== 'undefined' ? document.documentElement : null);
  const t = (name: string) => (at ? tokenOn(at, '--plx-sys-gesture-' + name) : NaN);
  return { slop: t('slop'), swipeDistance: t('swipe-distance'), flingVelocity: t('fling-velocity'), flingDecay: t('fling-decay'),
    longPressDelay: t('long-press-delay'), pullDistance: t('pull-distance'), pullResistance: t('pull-resistance'), pinchMaxScale: t('pinch-max-scale') };
}

// how far something released at velocity v (px per ms) coasts when it keeps decay of its speed each millisecond
export function flingDistance(v: number, decay: number): number {
  if (!(decay > 0 && decay < 1)) return 0;
  return v * decay / (1 - decay);
}

const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

export function useGesture(ref: React.RefObject<HTMLElement | null>, options: GestureOptions = {}): { active: GestureMode | null } {
  const [active, setActive] = React.useState<GestureMode | null>(null);
  const latest = React.useRef(options);
  latest.current = options;
  const disabled = !!options.disabled;

  React.useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return undefined;
    const pointers = new Map<number, Point>();
    let g: Gesture | null = null;        // the gesture: { mode, start, samples, tokens, timer, … }
    const call = (name: keyof GestureOptions, arg?: object) => { const f = latest.current[name] as ((a?: object) => void) | undefined; if (f) f(arg); };
    const mode = (m: GestureMode) => { if (g) g.mode = m; setActive(m); };
    const velocity = () => {
      const s = g!.samples, last = s[s.length - 1];
      let first = s[0];
      for (let i = s.length - 1; i >= 0; i--) { if (last.t - s[i].t > VELOCITY_WINDOW) break; first = s[i]; }
      const dt = last.t - first.t;
      return dt > 0 ? { vx: (last.x - first.x) / dt, vy: (last.y - first.y) / dt } : { vx: 0, vy: 0 };
    };
    const capture = (e: PointerEvent) => { if (el.setPointerCapture) { try { el.setPointerCapture(e.pointerId); } catch (err) { /* the pointer is gone */ } } };
    const clearTimer = () => { if (g && g.timer) { clearTimeout(g.timer); g.timer = null; } };
    const finish = () => { clearTimer(); g = null; setActive(null); };
    const pinchState = () => {
      const [a, b] = Array.from(pointers.values());
      return { a, b, d: dist(a, b), cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const o = latest.current;
      if (pointers.size === 2 && o.onPinch) {
        clearTimer();
        if (g && g.mode === 'pan') call('onPanEnd', { dx: 0, dy: 0, vx: 0, vy: 0, pointerType: g.pointerType, canceled: true });
        const p = pinchState();
        g = Object.assign(g || {} as Gesture, { startDist: p.d || 1, tokens: (g && g.tokens) || gestureTokens(el) });
        mode('pinch');
        call('onPinch', { scale: 1, originX: p.cx, originY: p.cy, maxScale: g.tokens.pinchMaxScale, first: true });
        return;
      }
      if (pointers.size > 1) return;
      const tokens = gestureTokens(el);
      g = { mode: 'press', pointerId: e.pointerId, pointerType: e.pointerType || 'mouse', start: { x: e.clientX, y: e.clientY, t: e.timeStamp },
        samples: [{ x: e.clientX, y: e.clientY, t: e.timeStamp }], tokens, timer: null, long: false, atTop: el.scrollTop <= 0 };
      setActive('press');
      if (o.onLongPress) {
        g.timer = setTimeout(() => {
          if (!g || g.mode !== 'press') return;
          g.long = true; g.timer = null;
          call('onLongPress', { x: g.start.x, y: g.start.y, pointerType: g.pointerType });
        }, tokens.longPressDelay || 0);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!g || !pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const o = latest.current;
      if (g.mode === 'pinch') {
        if (pointers.size < 2) return;
        const p = pinchState();
        call('onPinch', { scale: p.d / g.startDist!, originX: p.cx, originY: p.cy, maxScale: g.tokens.pinchMaxScale, first: false });
        return;
      }
      if (e.pointerId !== g.pointerId) return;
      g.samples.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });
      if (g.samples.length > 32) g.samples.shift();
      const dx = e.clientX - g.start.x, dy = e.clientY - g.start.y;
      if (g.mode === 'press') {
        if (Math.hypot(dx, dy) < (g.tokens.slop || 0)) return;
        clearTimer();
        if (g.long) { mode('none'); return; }          // moved after a long press: the long press stands, no pan
        const vertical = Math.abs(dy) > Math.abs(dx);
        if (o.pull && vertical && dy > 0 && g.atTop) { mode('pull'); capture(e); }
        else if ((o.axis === 'x' && vertical) || (o.axis === 'y' && !vertical)) { mode('none'); return; }   // the browser scrolls
        else if (o.onPan || o.onPanStart || o.onPanEnd || o.onSwipe || o.onFling) {
          mode('pan');
          capture(e);
          call('onPanStart', { dx, dy, vx: 0, vy: 0, pointerType: g.pointerType });
        } else { mode('none'); return; }
      }
      if (g.mode === 'pan') {
        const v = velocity();
        call('onPan', { dx: o.axis === 'y' ? 0 : dx, dy: o.axis === 'x' ? 0 : dy, vx: v.vx, vy: v.vy, pointerType: g.pointerType });
      } else if (g.mode === 'pull') {
        const distance = Math.max(0, dy) * (g.tokens.pullResistance || 0);
        const target = g.tokens.pullDistance || 0;
        g.ready = target > 0 && distance >= target;
        call('onPull', { distance, progress: target > 0 ? Math.min(1, distance / target) : 0, ready: g.ready, released: false });
      }
    };

    const onUp = (e: PointerEvent) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.delete(e.pointerId);
      if (!g) return;
      const canceled = e.type === 'pointercancel';
      if (g.mode === 'pinch') {
        if (pointers.size < 2) { call('onPinchEnd', { scale: g.lastScale || 1 }); finish(); pointers.clear(); }
        return;
      }
      if (e.pointerId !== g.pointerId) return;
      const o = latest.current;
      const dx = e.clientX - g.start.x, dy = e.clientY - g.start.y;
      if (g.mode === 'press' && !g.long && !canceled) call('onTap', { x: e.clientX, y: e.clientY, pointerType: g.pointerType });
      else if (g.mode === 'pan') {
        const v = velocity(), t = g.tokens;
        const px = o.axis === 'y' ? 0 : dx, py = o.axis === 'x' ? 0 : dy;
        const vx = o.axis === 'y' ? 0 : v.vx, vy = o.axis === 'x' ? 0 : v.vy;
        call('onPanEnd', { dx: px, dy: py, vx, vy, pointerType: g.pointerType, canceled });
        if (!canceled) {
          const horizontal = Math.abs(px) >= Math.abs(py);
          const d = horizontal ? px : py, vel = horizontal ? vx : vy;
          const fast = Math.hypot(vx, vy) >= (t.flingVelocity || Infinity);
          // a swipe ends moving the way it went: a pan dragged back toward its start does not commit
          if ((Math.abs(d) >= t.swipeDistance || (fast && Math.sign(vel) === Math.sign(d))) && d !== 0) {
            const direction = horizontal ? (d > 0 ? 'right' : 'left') : (d > 0 ? 'down' : 'up');
            const inline = horizontal ? ((d > 0) !== isRtl(el) ? 'end' : 'start') : null;
            call('onSwipe', { direction, inline, distance: Math.abs(d), velocity: Math.abs(vel) });
          }
          if (fast) {
            const direction = horizontal ? (vx > 0 ? 'right' : 'left') : (vy > 0 ? 'down' : 'up');
            call('onFling', { vx, vy, direction, travelX: flingDistance(vx, t.flingDecay), travelY: flingDistance(vy, t.flingDecay) });
          }
        }
      } else if (g.mode === 'pull') {
        const ready = g.ready && !canceled;
        call('onPull', { distance: 0, progress: 0, ready: false, released: true });
        if (ready) call('onRefresh');
      }
      finish();
    };

    // the pinch's last scale, kept for onPinchEnd
    const onPinchTrack = () => { if (g && g.mode === 'pinch' && pointers.size === 2) g.lastScale = pinchState().d / g.startDist!; };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointermove', onPinchTrack);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    window.addEventListener('pointerup', onUp);
    return () => {
      clearTimer();
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointermove', onPinchTrack);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      window.removeEventListener('pointerup', onUp);
    };
  }, [ref, disabled]);

  return { active };
}
