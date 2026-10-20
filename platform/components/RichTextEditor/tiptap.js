/* Plenix · RichTextEditor engine (tiptap.js)
   Summary: Loads the engine every RichTextEditor runs on: Tiptap 3.31.3 (MIT, on ProseMirror), vendored as one file in
     platform/vendor/tiptap/tiptap.min.js that sets window.PlenixTiptap.
   Usage:
     loadTiptap().then((T) => new T.Editor({ element: { mount: el }, extensions: [T.StarterKit] }));
   Props:
     loadTiptap(win): adds the engine's script to the page once (the given window's, default this one: an editor in a
       frame runs on its frame's engine), and resolves with that window's PlenixTiptap
   Behavior:
     Only the first editor on a page loads the file; later editors reuse the same promise. Pages without an editor never
       load it (no prefetch): RichTextEditor.preload() starts the load early on a page whose first screen has an editor.
     The file comes from the shared vendor folder (utils/vendorBase.js: next to the
       Platform script or an explicit window.PlenixVendorBase). Package builds import their own local lazy engine chunk.
     The engine has no stylesheet of its own: the few rules ProseMirror needs are in rich-text-editor.css, on tokens.
   Notes:
     A failed load rejects and is forgotten, so the next editor that mounts tries again.
     The bundle holds @tiptap/core, @tiptap/pm, @tiptap/starter-kit (with its link, underline and list extensions),
       @tiptap/extension-list, -mention, -table, -text-style, -text-align, -highlight, -subscript, -superscript, -image and
       -typography, and their dependencies (platform/vendor/README.md: versions, licenses, how it is built). */

import { vendorBase } from '../../utils/vendorBase.js';

const loading = new WeakMap();
export function loadTiptap(win) {
  const w = win || (typeof window !== 'undefined' ? window : null);
  if (!w) return Promise.reject(new Error('Tiptap needs a browser'));
  if (loading.has(w)) return loading.get(w);
  // Package builds inject a local lazy module; classic script builds retain the explicit/local vendor path.
  if (typeof __PLENIX_PACKAGE__ !== 'undefined' && __PLENIX_PACKAGE__) { // eslint-disable-line no-undef
    const bundled = Promise.resolve().then(() => __PLENIX_TIPTAP_LOAD__(w)).catch(error => { loading.delete(w); throw error; }); // eslint-disable-line no-undef
    loading.set(w, bundled);
    return bundled;
  } else {
    if (w.PlenixTiptap) return Promise.resolve(w.PlenixTiptap);
    const doc = w.document;
    const p = new Promise((resolve, reject) => {
      const script = doc.createElement('script');
      let base;
      try { base = vendorBase(); } catch (error) { reject(error); return; }
      script.src = base + 'tiptap/tiptap.min.js'; script.async = true; script.setAttribute('data-plx-vendor', 'tiptap');
      script.onload = () => { if (w.PlenixTiptap) resolve(w.PlenixTiptap); else { loading.delete(w); script.remove(); reject(new Error('Tiptap did not load from ' + script.src)); } };
      script.onerror = () => { loading.delete(w); script.remove(); reject(new Error('Tiptap could not be loaded from ' + script.src)); };
      doc.head.appendChild(script);
    });
    const pending = p.catch(error => { loading.delete(w); throw error; });
    loading.set(w, pending);
    return pending;
  }
}
