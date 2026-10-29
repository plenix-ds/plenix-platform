/* Plenix · paneLimit (platform/utils/paneLimit.js)
   Summary: How far a pane of the shell or a table column may be dragged for the room it has (owner, issue 463, option C): never more
     than the window-share token (--plx-sys-shell-pane-window-share, 90%) of the window, of the table for a column, taken down to
     the 4px grid. A smaller limit of the component or the app still applies: this only adds a ceiling.
   Usage:
     paneMax(limit, min, el): the limit a pane drags to: the smaller of limit, GRID_PANE_MAX and the window's share, never below min
     shareOf(px, el): the token's share of a measured width (a table's), on the grid; Infinity when px is 0 (not measured yet)
   Behavior: Read when the pane opens, on each drag and each render; nothing runs while the window edge is being dragged.
   Notes: Internal; not part of the public API. The share is a token, never a number here. */
import { GRID_PANE_MAX } from './sizeSteps.js';
import { snapToGrid } from './grid.js';

const share = (el) => {
  if (typeof document === 'undefined') return 0;
  const doc = (el && el.ownerDocument) || document;
  const v = parseFloat(doc.defaultView.getComputedStyle(doc.documentElement).getPropertyValue('--plx-sys-shell-pane-window-share'));
  return v > 0 ? v / 100 : 0;
};
export function shareOf(px, el) {
  const s = share(el);
  return s && px > 0 ? snapToGrid(px * s, { round: 'down', el }) : Infinity;
}
export function paneMax(limit, min, el) {
  const win = typeof window === 'undefined' ? 0 : ((el && el.ownerDocument && el.ownerDocument.defaultView) || window).innerWidth;
  return Math.max(min || 0, Math.min(limit, GRID_PANE_MAX, shareOf(win, el)));
}
