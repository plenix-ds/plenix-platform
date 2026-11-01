/* Plenix · Writing direction (platform/utils/direction.ts)
   Summary: Right-to-left and left-to-right in script: the direction of an element or a language, the arrow keys in reading
     order, and the physical side of a logical one. In a right-to-left page Arrow Right moves back and Arrow Left forward,
     as the eye reads; Up and Down are the same in both directions.
   Usage:
     const step = arrowStep(e, e.currentTarget);   // +1, -1 or 0
     if (step) { e.preventDefault(); move(index + step); }
     directionOf('ar-EG')          // "rtl"
     physicalSide('start', 'rtl')  // "right"
   Props:
     isRtl(el): true when the element is laid out right to left (its computed direction)
     arrowStep(event, el, { vertical }): +1 for the next item, -1 for the previous one, 0 for another key; with vertical:
       false, Up and Down are ignored (a horizontal-only control)
     getDirection(el): "rtl" | "ltr", the element's computed direction (the document's when no element is given)
     directionOf(locale): "rtl" for a language written right to left (Arabic, Hebrew, Persian, Urdu and the others in
       RTL_LANGUAGES), else "ltr"
     physicalSide(side, dir): "left" | "right" for a logical "start" or "end" in that direction (for a measurement API that
       only speaks physical sides, such as a pointer's clientX); "left" and "right" come back as they are
     readsLeftToRight(children): true when the children are only text and numbers with no letter of a right-to-left script (Arabic, Hebrew, Syriac, Thaana and
       the presentation forms): a phone number, an IBAN, a date, a version. A value like that is shown left to right as written (a left-to-right island),
       because with no strong letter the digit groups of a spaced value ("(617) 555-0142") would otherwise take the page's direction and swap places
       (Unicode rule N1, issue 838); a value with an Arabic letter in it keeps dir="auto"
     RTL_LANGUAGES: the language subtags written right to left
   Behavior:
     The direction comes from the dir attribute on the element or an ancestor (<html dir="rtl">, a DirectionProvider):
       stylesheets use logical properties (inline-start, inline-end), so the layout mirrors on its own; script reads the
       computed direction only where it measures or handles arrow keys.
*/
import React from 'react';
// a letter of a right-to-left script (written as escapes: a script that carries raw characters breaks when a page loads without a charset)
const RTL_LETTER = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/;
export function readsLeftToRight(children: React.ReactNode): boolean {
  let plain = true;
  React.Children.forEach(children, (c) => { if (typeof c === 'string' || typeof c === 'number') { if (RTL_LETTER.test(String(c))) plain = false; } else if (c != null && typeof c !== 'boolean') plain = false; });
  return plain;
}
export const RTL_LANGUAGES = ['ar', 'arc', 'ckb', 'dv', 'fa', 'he', 'iw', 'ps', 'sd', 'syr', 'ug', 'ur', 'yi'];

export type Direction = 'ltr' | 'rtl';
export function isRtl(el?: Element | null): boolean {
  return !!el && typeof window !== 'undefined' && window.getComputedStyle(el).direction === 'rtl';
}

export function getDirection(el?: Element | null): Direction {
  if (typeof window === 'undefined') return 'ltr';
  return isRtl(el || document.documentElement) ? 'rtl' : 'ltr';
}

export function directionOf(locale?: string | null): Direction {
  const lang = String(locale || '').toLowerCase().split(/[-_]/)[0];
  return RTL_LANGUAGES.indexOf(lang) >= 0 ? 'rtl' : 'ltr';
}

export function physicalSide<S extends string>(side: S, dir?: string | null): S | 'left' | 'right' {
  if (side !== 'start' && side !== 'end') return side;
  return (side === 'start') === (dir !== 'rtl') ? 'left' : 'right';
}

export function arrowStep(event: { key: string }, el?: Element | null, opts?: { vertical?: boolean } | null): -1 | 0 | 1 {
  const vertical = !opts || opts.vertical !== false;
  const rtl = isRtl(el);
  switch (event.key) {
    case 'ArrowRight': return rtl ? -1 : 1;
    case 'ArrowLeft': return rtl ? 1 : -1;
    case 'ArrowDown': return vertical ? 1 : 0;
    case 'ArrowUp': return vertical ? -1 : 0;
    default: return 0;
  }
}
