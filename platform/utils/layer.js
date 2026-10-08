/* Plenix · layers (platform/utils/layer.js). Internal; not part of the public API.
   Every open menu, dialog, drawer and media viewer is a layer. Escape closes only the topmost layer, so Escape in a menu
   inside a dialog closes the menu first. A modal layer also keeps Tab inside itself, locks page scroll, moves focus in
   when it opens (initialFocus: a ref, or a function that returns the element) and returns focus to the element that opened it when it closes. */
import React from 'react';

const stack = [];
let modalCount = 0;

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function focusables(root) {
  if (!root) return [];
  return Array.prototype.filter.call(root.querySelectorAll(FOCUSABLE), (el) => !el.closest('[hidden]') && el.getClientRects().length > 0);
}

export function useLayer(ref, open, { modal = false, onEscape, initialFocus } = {}) {
  const escape = React.useRef(onEscape);
  escape.current = onEscape;
  React.useEffect(() => {
    if (!open) return undefined;
    const entry = { modal };
    stack.push(entry);
    const opener = document.activeElement;
    if (modal) {
      if (modalCount === 0) document.documentElement.classList.add('is-scroll-locked');
      modalCount += 1;
      const root = ref.current;
      const wanted = typeof initialFocus === 'function' ? initialFocus() : (initialFocus && initialFocus.current);
      const first = wanted || focusables(root)[0] || root;
      if (first) first.focus({ preventScroll: true });
    }
    const onKey = (e) => {
      if (stack[stack.length - 1] !== entry) return;
      if (e.key === 'Escape') {
        if (escape.current) { e.preventDefault(); e.stopPropagation(); escape.current(); }
        return;
      }
      if (!modal || e.key !== 'Tab') return;
      const root = ref.current;
      const items = focusables(root);
      if (!items.length) { e.preventDefault(); root.focus(); return; }
      const first = items[0], last = items[items.length - 1], active = document.activeElement;
      if (!root.contains(active)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && (active === first || active === root)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      stack.splice(stack.indexOf(entry), 1);
      if (modal) {
        modalCount -= 1;
        if (modalCount === 0) document.documentElement.classList.remove('is-scroll-locked');
        if (opener && opener.focus && document.contains(opener)) opener.focus({ preventScroll: true });
      }
    };
  }, [open]);
}

export function useUid(prefix) {
  return prefix + React.useId().replace(/[^a-zA-Z0-9]/g, '');
}
