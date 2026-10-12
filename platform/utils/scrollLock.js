/* Plenix · scroll lock (platform/utils/scrollLock.js): stops a scroll container scrolling while a modal layer covers it.
   Summary: lockScroll(target) locks the page (the html element) or one scroll container and returns the function that
     releases it; useScrollLock(active, ref) does the same for as long as a component asks. Locks are counted per target,
     so nested modals release the page only when the last one closes.
   Usage:
     import { useScrollLock, lockScroll } from 'plenix-platform';
     useScrollLock(open);                          // the page, while open
     useScrollLock(open, listRef);                 // one scroll container
     const release = lockScroll(); … release();    // outside React
   Props:
     lockScroll(target?): target is an element (default document.documentElement); returns release(), safe to call twice
     useScrollLock(active, ref?): locks while active is true; ref (a React ref) names the container, else the page
     isScrollLocked(target?): true while the target holds a lock
     scrollLockCount(target?): how many locks the target holds
   Behavior:
     A locked target carries data-plx-scroll-lock="locked" and system/scroll-lock.css stops it scrolling: overflow hidden in
     both directions, the scrollbar's space kept (scrollbar-gutter: stable) so nothing shifts, overscroll contained. The
     scroll position is not touched, so it is exactly where it was when the lock is released. Content inside the modal
     scrolls as usual.
   Notes:
     Only for modal layers (Dialog, a modal drawer or sheet, a full-screen overlay): never for menus, popovers, tooltips or
     toasts. Pair it with the modal's focus trap (utils/layer.js) so assistive technology also stays inside. */
import React from 'react';

const ATTR = 'data-plx-scroll-lock';
const counts = new Map();

const pageOf = (target) => target || (typeof document !== 'undefined' ? document.documentElement : null);

export function lockScroll(target) {
  const el = pageOf(target);
  if (!el) return () => {};
  const n = (counts.get(el) || 0) + 1;
  counts.set(el, n);
  if (n === 1) el.setAttribute(ATTR, 'locked');
  let released = false;
  return function release() {
    if (released) return;
    released = true;
    const left = (counts.get(el) || 1) - 1;
    if (left > 0) { counts.set(el, left); return; }
    counts.delete(el);
    el.removeAttribute(ATTR);
  };
}

export function isScrollLocked(target) { return (counts.get(pageOf(target)) || 0) > 0; }
export function scrollLockCount(target) { return counts.get(pageOf(target)) || 0; }

export function useScrollLock(active, ref) {
  React.useEffect(() => {
    if (!active) return undefined;
    if (ref && !ref.current) return undefined;
    return lockScroll(ref ? ref.current : undefined);
  }, [active, ref]);
}
