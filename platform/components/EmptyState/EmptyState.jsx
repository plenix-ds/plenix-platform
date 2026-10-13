/* Plenix · EmptyState
   Summary: What a region shows when it has nothing yet, and how to add the first item; in a tone, what failed, what needs
     care or what went well, and the one action that follows (platforms.md 5.5); with a kind, the common system states
     (offline, degraded, permission denied, not found, maintenance, completion) with their icon, tone and words.
   Usage:
     <EmptyState size="page" icon="folder" title="No assets yet" action={<Button variant="primary">Upload</Button>}>
       Upload files to start.</EmptyState>
     <EmptyState tone="error" title="The assets could not load" action={<Button icon="refresh" onClick={reload}>Retry</Button>}>
       The server did not answer.</EmptyState>
     <EmptyState kind="offline" action={<Button icon="refresh" onClick={reload}>Try again</Button>} />
     <EmptyState kind="permission-denied" title="You can’t open this project">Ask its owner to share it with you.</EmptyState>
   Props:
     size: "inline" (default; a line inside a list or table area) | "page" (a whole view)
     tone: "neutral" (default; empty) | "error" (the content could not load: the title names the problem, the action
       recovers; announced as an alert, the icon in the danger color) | "warning" (something needs care before the region
       works fully: the icon in the warning color) | "success" (the work here is finished: the icon in the success color);
       warning and success are announced politely (role="status")
     kind: a system state that brings its icon, tone, title and text (each still overridable by the props):
       "offline" (warning) | "degraded" (warning) | "permission-denied" (neutral) | "not-found" (neutral)
       | "maintenance" (neutral) | "completion" (success)
     icon: an icon name or an <Icon> (or other mark); hidden from assistive technology; the default comes from the kind,
       else from the tone (error and warning "warning", success "circle-check")
     title: the main line (the kind's title unless given)
     action: a button (one: the action that fills the region, recovers from the error or moves on)
     children: the explaining text (the kind's text unless given)
     strings: the kinds' words, for other languages: { offline: { title, text }, degraded: { … }, … } (merged over the defaults)
     className: more classes on the region
   Behavior:
     The error tone is a live alert (role="alert"): a screen reader says it when it appears. Warning and success are a
       status (role="status"), read when the reader is idle. The neutral tone is not announced.
     Its words carry the meaning; the tone color on the icon is never the only sign (WCAG 1.4.1).
   Notes:
     Other props pass through to the <div>.
     A kind sets defaults only: an explicit tone, icon, title or children wins.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.jsx';

// the system states: their tone and icon, and their words (STRINGS, translatable through the strings prop)
const KINDS = {
  offline: { tone: 'warning', icon: 'warning' },
  degraded: { tone: 'warning', icon: 'warning' },
  'permission-denied': { tone: 'neutral', icon: 'lock' },
  'not-found': { tone: 'neutral', icon: 'doc-search' },
  maintenance: { tone: 'neutral', icon: 'settings-maintenance' },
  completion: { tone: 'success', icon: 'circle-check' }
};
const STRINGS = {
  offline: { title: 'You’re offline', text: 'Check your connection. This page updates when you’re back online.' },
  degraded: { title: 'Some features aren’t working', text: 'A service is slow or not responding, so what you see may be out of date.' },
  'permission-denied': { title: 'You don’t have access', text: 'Ask the owner to share it with you.' },
  'not-found': { title: 'This page doesn’t exist', text: 'It may have been moved or deleted. Check the address or go back.' },
  maintenance: { title: 'Down for maintenance', text: 'This service is being updated. Try again in a few minutes.' },
  completion: { title: 'All done', text: 'There’s nothing left to do here.' }
};
const TONE_ICONS = { error: 'warning', warning: 'warning', success: 'circle-check' };
const ROLES = { error: 'alert', warning: 'status', success: 'status' };

export function EmptyState({ size = 'inline', tone, kind, icon, title, action, strings, className, children, ...rest }) {
  const preset = KINDS[kind];
  const words = preset ? Object.assign({}, STRINGS[kind], strings && strings[kind]) : null;
  const t = tone || (preset ? preset.tone : 'neutral');
  const mark = icon !== undefined ? icon : preset ? preset.icon : TONE_ICONS[t];
  const head = title !== undefined ? title : words ? words.title : null;
  const text = children !== undefined && children !== null ? children : words ? words.text : null;
  return (
    <div className={cx('plx-empty-state', 'plx-empty-state--' + size, t !== 'neutral' && 'plx-empty-state--' + t, className)} role={ROLES[t]} {...rest}>
      {mark ? <div className="plx-empty-state__icon" aria-hidden="true">{typeof mark === 'string' ? <Icon name={mark} /> : mark}</div> : null}
      {head ? <div className="plx-empty-state__title">{head}</div> : null}
      {text ? <div className="plx-empty-state__text">{text}</div> : null}
      {action ? <div className="plx-empty-state__action">{action}</div> : null}
    </div>
  );
}
