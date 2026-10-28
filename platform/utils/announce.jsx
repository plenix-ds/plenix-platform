/* Plenix · LiveRegion, announce (platform/utils/announce.jsx)
   Summary: Tells screen-reader users about a change they cannot see happen (a save, a count of results, an upload that
     finished, an error) without moving their focus. announce(text) speaks through one pair of page-wide regions;
     LiveRegion is a region of a component's own, for messages that also stay on screen (a status line, a log).
   Usage:
     announce('12 results');                               // polite: waits until the reader is idle
     announce('Couldn’t save. Check your connection.', { politeness: 'assertive' });   // interrupts: urgent errors only
     announce('Asset moved. Undo', { queue: true });       // every one is heard: a burst is read joined, in order (Toast)
     <LiveRegion kind="status">{saved ? 'Saved' : ''}</LiveRegion>
     <LiveRegion kind="log" visible>{lines.map((l) => <div key={l.id}>{l.text}</div>)}</LiveRegion>
   Props:
     announce(text, { politeness, queue }): politeness "polite" (default) or "assertive"; the same text twice is spoken
       twice; queue (default false): the message is never replaced, a burst reads every queued message, joined in order
     LiveRegion.kind: "polite" (default; aria-live="polite"), "assertive" (aria-live="assertive"), "status"
       (role="status": a polite advisory such as a count or a save) or "log" (role="log": new lines are read, old ones stay)
     LiveRegion.visible: show the region's text on screen (default false: read by screen readers only)
     LiveRegion.atomic: read the whole region on every change, not only what changed (default: true for status, else false)
     LiveRegion.children: the message (render the region empty first, then put the text in it)
     LiveRegion.className: more classes on the region
   Behavior:
     The page-wide regions are created on the first announce(), once per page, at the end of <body>, and are never removed.
     Each message replaces the last after a short pause (--plx-sys-live-region-delay), so rapid updates are read once, in their final state.
     A queued message is never replaced: the messages of one pause are read together, in order, the queued ones joined as
       sentences ("Asset moved. Undo. File deleted. Undo"), with the last plain message after them.
     A LiveRegion is in the page from its first render; screen readers only read changes made after it appeared.
   Notes:
     Not when focus already moves to the new content (a dialog, an error summary): that is announced by the focus itself.
     Never put a control inside a live region. Messages are plain text: no markup, icons or emoji names.
     Meets WCAG 2.2 SC 4.1.3 Status Messages.
*/
import React from 'react';
import { cx } from './cx.js';
import { tokenMs } from './tokenTime.js';

const regions = {};
const pending = {};
const waiting = { polite: [], assertive: [] };   // the messages of the current pause: { text, queue }

// sentences joined: a period between two messages unless the first already ends a sentence
const joinMessages = (list) => list.reduce((all, t) => (!all ? t : all + (/[.!?…]$/.test(all) ? ' ' : '. ') + t), '');

// the page-wide region for one politeness (made once, visually hidden)
function region(politeness) {
  if (regions[politeness] && regions[politeness].isConnected) return regions[politeness];
  const el = document.createElement('div');
  el.className = 'plx-visually-hidden';
  el.setAttribute('aria-live', politeness);
  el.setAttribute('aria-atomic', 'true');
  el.setAttribute('data-plx-announcer', politeness);
  if (politeness === 'assertive') el.setAttribute('role', 'alert');
  document.body.appendChild(el);
  regions[politeness] = el;
  return el;
}

export function announce(text, { politeness = 'polite', queue = false } = {}) {
  if (typeof document === 'undefined' || !document.body) return;
  const p = politeness === 'assertive' ? 'assertive' : 'polite';
  const el = region(p);
  // a plain message replaces the plain one before it in this pause; a queued one is kept
  const t = String(text || '');
  waiting[p] = pending[p] ? waiting[p].filter((m) => m.queue).concat({ text: t, queue }) : [{ text: t, queue }];
  // clear first, then write in the next frame: the same text twice is still a change, and a burst is read once
  el.textContent = '';
  if (pending[p]) clearTimeout(pending[p]);
  pending[p] = setTimeout(() => {
    pending[p] = null;
    const list = waiting[p].filter((m) => m.queue).concat(waiting[p].filter((m) => !m.queue)).map((m) => m.text).filter(Boolean);
    waiting[p] = [];
    el.textContent = joinMessages(list);
  }, tokenMs('--plx-sys-live-region-delay'));
}

const KINDS = {
  polite: { 'aria-live': 'polite' },
  assertive: { 'aria-live': 'assertive' },
  status: { role: 'status', 'aria-live': 'polite' },
  log: { role: 'log', 'aria-live': 'polite' },
};

export function LiveRegion({ kind = 'polite', visible = false, atomic, className, children, ...rest }) {
  const a = KINDS[kind] || KINDS.polite;
  return (
    <div {...a} aria-atomic={atomic !== undefined ? atomic : kind === 'status'} data-plx-live={kind}
      className={cx(!visible && 'plx-visually-hidden', className)} {...rest}>
      {children}
    </div>
  );
}
