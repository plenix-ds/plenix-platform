/* Plenix · usePrint
   Summary: Prints the page laid out for paper: opens the browser's print dialog from a person's action, and while the page
     prints (from a Print button or the browser's own Print), switches it to the light theme so it prints black on
     white, then puts the theme back. system/print.css leaves the chrome off the paper.
   Usage:
     const { print, printing } = usePrint();
     <Button onClick={print}>Print</Button>                                   the Print action
     <Button onClick={() => print({ title: 'Invoice 2026-114' })}>Print invoice</Button>   a title for the printed page
     usePrint({ onBeforePrint: () => setAllExpanded(true), onAfterPrint: () => setAllExpanded(false) })
   Props:
     options.light (true): print in the light theme whatever the page's mode
     options.onBeforePrint(), options.onAfterPrint(): run around every print (open folded sections, load every page)
     returns { print({ title }), printing }: print opens the dialog (title is the document title while it prints: the
       name the browser offers for a PDF and puts in the page header); printing is true while the page prints
   Behavior:
     Listens to beforeprint and afterprint while mounted, so Ctrl+P and the browser's menu get the same light theme and
       callbacks as the button. data-plx-mode is set to "light" on <html> and restored after; nothing else is changed.
     print() calls window.print(): it must run from a press or a key (browsers block it otherwise).
   Notes:
     Label the action "Print" or "Print <object>". Put what only the paper needs (the date, the address) in Show print,
       and what the paper should not show in Hide print (ResponsiveVisibility).
*/
import React from 'react';

export function usePrint(options = {}) {
  const { light = true, onBeforePrint, onAfterPrint } = options;
  const [printing, setPrinting] = React.useState(false);
  const saved = React.useRef(null);
  const calls = React.useRef({ onBeforePrint, onAfterPrint });
  calls.current = { onBeforePrint, onAfterPrint };

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const root = document.documentElement;
    const before = () => {
      setPrinting(true);
      if (light) { saved.current = { mode: root.getAttribute('data-plx-mode') }; root.setAttribute('data-plx-mode', 'light'); }
      if (calls.current.onBeforePrint) calls.current.onBeforePrint();
    };
    const after = () => {
      if (saved.current) {
        if (saved.current.mode == null) root.removeAttribute('data-plx-mode'); else root.setAttribute('data-plx-mode', saved.current.mode);
        saved.current = null;
      }
      setPrinting(false);
      if (calls.current.onAfterPrint) calls.current.onAfterPrint();
    };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => { window.removeEventListener('beforeprint', before); window.removeEventListener('afterprint', after); };
  }, [light]);

  const print = React.useCallback((opts) => {
    if (typeof window === 'undefined' || !window.print) return;
    const title = opts && typeof opts === 'object' && typeof opts.title === 'string' ? opts.title : null;
    const was = document.title;
    if (title) document.title = title;
    try { window.print(); } finally { if (title) document.title = was; }
  }, []);

  return { print, printing };
}
