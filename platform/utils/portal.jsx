/* Plenix · Portal
   Summary: Draws its children outside their parent's layout, so an overlay is never clipped by a scroll area, a card or a pane and never sits under a stacking context: into one shared root at the end of the page, into the browser's top layer, or into a container you name. The density, theme and direction of the place it is written go with it.
   Usage:
     <Portal><div className="plx-toast-region">…</div></Portal>
     <Portal layer="top"><div ref={panel} className="plx-menu">…</div></Portal>        // above every dialog and pane
     <Portal container={sideRef}>…</Portal>                                          // into an element of the page
   Props:
     children: what to draw
     layer ('page'): 'page' draws into the shared root at the end of <body> (plx-portal-root); 'top' into the browser's top layer (a manual popover over the whole window that lets the pointer through to the page except on its content)
     container (null): an element, or a ref to one, to draw into instead of the shared root
     className: more classes on the Portal's own container (plx-portal)
   Behavior:
     The Portal leaves an empty <template> where it is written and copies from its nearest ancestors the density (data-plx-density), the theme and mode of a theme zone (data-plx-theme, data-plx-mode), the direction (dir) and the language (lang) onto its own container, so the tokens and the reading direction inside are those of the place it came from. It copies them again on every render.
     Its container is created with it and removed when it unmounts; the shared root stays.
     Events from the content bubble through the React tree as if it were in place (React portals), not through the page.
   Notes:
     A Portal moves content, nothing else: focus into the content and back to its trigger, Escape and the modal veil are the overlay's (useLayer); the ARIA link between a trigger and its content (aria-controls, aria-describedby) is the component's, since the page order no longer shows it.
     Do not portal content that belongs in the reading order of the page.
     Dialog, Sheet, Toast and MediaViewer adopt it in their own tasks.
*/
import React from 'react';
import { createPortal } from 'react-dom';
import { cx } from './cx.js';

const ROOT_ID = 'plx-portal-root';
// what the Portal carries from where it is written: [attribute, the attributes that travel with it]
const CARRIED = [['data-plx-density'], ['data-plx-mode', 'data-plx-theme'], ['dir'], ['lang']];
const TOP_LAYER = typeof HTMLElement !== 'undefined' && Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'popover');

// the shared root at the end of <body>, made once
function sharedRoot() {
  let root = document.getElementById(ROOT_ID);
  if (!root) { root = document.createElement('div'); root.id = ROOT_ID; root.className = 'plx-portal-root'; document.body.appendChild(root); }
  return root;
}

// the origin's nearest ancestor (below <html>, whose attributes reach everything already) that sets each carried attribute
function carry(origin, node) {
  CARRIED.forEach((group) => {
    const from = origin && origin.parentElement ? origin.parentElement.closest('[' + group[0] + ']') : null;
    const own = from && from !== document.documentElement ? from : null;
    group.forEach((name) => { const v = own ? own.getAttribute(name) : null; if (v == null) node.removeAttribute(name); else node.setAttribute(name, v); });
  });
}

export function Portal({ children, layer = 'page', container = null, className }) {
  const origin = React.useRef(null);
  const [node] = React.useState(() => (typeof document === 'undefined' ? null : document.createElement('div')));
  const top = layer === 'top';

  // the container: placed in its parent while the Portal is mounted, in the top layer for layer="top"
  React.useLayoutEffect(() => {
    if (!node) return undefined;
    const target = container && 'current' in container ? container.current : container;
    const parent = target || sharedRoot();
    parent.appendChild(node);
    if (top && TOP_LAYER) { node.setAttribute('popover', 'manual'); if (node.showPopover && !node.matches(':popover-open')) node.showPopover(); }
    return () => {
      if (top && TOP_LAYER && node.matches(':popover-open')) node.hidePopover();
      node.removeAttribute('popover');
      if (node.parentNode) node.parentNode.removeChild(node);
    };
  }, [node, container, top]);

  // its class and the density, theme and direction of where it is written, on every render
  React.useLayoutEffect(() => {
    if (!node) return;
    node.className = cx('plx-portal', top && 'plx-portal--top', className);
    carry(origin.current, node);
  });

  if (!node) return null;
  return (
    <>
      <template ref={origin} data-plx-portal-origin="" />
      {createPortal(children, node)}
    </>
  );
}
