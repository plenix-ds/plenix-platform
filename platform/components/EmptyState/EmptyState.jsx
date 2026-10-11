/* Plenix · EmptyState
   Summary: What a region shows when it has nothing yet, and how to add the first item; or, in the error tone, what failed
     and the one action that recovers (platforms.md 5.5).
   Usage:
     <EmptyState size="page" icon="folder" title="No assets yet" action={<Button variant="primary">Upload</Button>}>
       Upload files to start.</EmptyState>
     <EmptyState tone="error" title="The assets could not load" action={<Button icon="refresh" onClick={reload}>Retry</Button>}>
       The server did not answer.</EmptyState>
   Props:
     size: "inline" (default; a line inside a list or table area) | "page" (a whole view)
     tone: "neutral" (default; empty) | "error" (the content could not load: the title names the problem, the action
       recovers; announced as an alert, the icon in the danger color)
     icon: an icon name or an <Icon> (or other mark); hidden from assistive technology; the error tone's default is "warning"
     title: the main line
     action: a button (one: the action that fills the region, or that recovers from the error)
     children: the explaining text
     className: more classes on the region
   Behavior:
     The error tone is a live alert (role="alert"): a screen reader says it when it appears. Its words carry the meaning;
       the danger color on the icon is never the only sign (WCAG 1.4.1).
   Notes:
     Other props pass through to the <div>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.jsx';

export function EmptyState({ size = 'inline', tone = 'neutral', icon, title, action, className, children, ...rest }) {
  const error = tone === 'error';
  const mark = icon === undefined && error ? 'warning' : icon;
  return (
    <div className={cx('plx-empty-state', 'plx-empty-state--' + size, error && 'plx-empty-state--error', className)} role={error ? 'alert' : undefined} {...rest}>
      {mark ? <div className="plx-empty-state__icon" aria-hidden="true">{typeof mark === 'string' ? <Icon name={mark} /> : mark}</div> : null}
      {title ? <div className="plx-empty-state__title">{title}</div> : null}
      {children ? <div className="plx-empty-state__text">{children}</div> : null}
      {action ? <div className="plx-empty-state__action">{action}</div> : null}
    </div>
  );
}
