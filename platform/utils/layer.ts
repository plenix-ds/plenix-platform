/* Plenix · layers (platform/utils/layer.ts). Internal; not part of the public API.
   Every open menu, dialog, drawer and media viewer is a layer. Escape closes only the topmost layer, so Escape in a menu
   inside a dialog closes the menu first. A modal layer also keeps Tab inside itself, locks page scroll, moves focus in
   when it opens (initialFocus: a ref, or a function that returns the element) and returns focus to the element that opened it when it closes. */
import React from 'react';
import { lockScroll } from './scrollLock.ts';

type Layer = { modal: boolean };
const stack: Layer[] = [];
// a layer's options: modal (traps Tab, locks the page, moves focus in), onEscape (closes it), initialFocus (a ref, or a function that returns the element)
export type LayerOptions = { modal?: boolean; onEscape?: (() => void) | null; initialFocus?: React.RefObject<HTMLElement | null> | (() => HTMLElement | null | undefined) | null };

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function focusables(root?: ParentNode | null): HTMLElement[] {
  if (!root) return [];
  return Array.prototype.filter.call(root.querySelectorAll(FOCUSABLE), (el: HTMLElement) => !el.closest('[hidden]') && el.getClientRects().length > 0) as HTMLElement[];
}

export function useLayer(ref: React.RefObject<HTMLElement | null>, open: unknown, { modal = false, onEscape, initialFocus }: LayerOptions = {}): void {
  const escape = React.useRef(onEscape);
  escape.current = onEscape;
  React.useEffect(() => {
    if (!open) return undefined;
    const entry: Layer = { modal };
    stack.push(entry);
    const opener = document.activeElement as HTMLElement | null;
    // a modal layer stops the page scrolling with the shared scroll lock (utils/scrollLock.ts: counted, so stacked layers
    // release the page only when the last one closes; system/scroll-lock.css keeps the scrollbar's space)
    const release = modal ? lockScroll() : null;
    if (modal) {
      const root = ref.current;
      const wanted = typeof initialFocus === 'function' ? initialFocus() : (initialFocus && initialFocus.current);
      const first: HTMLElement | null = wanted || focusables(root)[0] || root;
      if (first) first.focus({ preventScroll: true });
    }
    const onKey = (e: KeyboardEvent) => {
      if (stack[stack.length - 1] !== entry) return;
      if (e.key === 'Escape') {
        if (escape.current) { e.preventDefault(); e.stopPropagation(); escape.current(); }
        return;
      }
      if (!modal || e.key !== 'Tab') return;
      const root = ref.current!;
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
      if (release) release();
      if (modal) {
        if (opener && opener.focus && document.contains(opener)) opener.focus({ preventScroll: true });
      }
    };
  }, [open]);
}

export function useUid(prefix: string): string {
  return prefix + React.useId().replace(/[^a-zA-Z0-9]/g, '');
}
