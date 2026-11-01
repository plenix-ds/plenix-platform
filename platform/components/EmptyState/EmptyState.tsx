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
       "offline" (warning, wifi-off) | "degraded" (warning, cloud-off) | "permission-denied" (neutral) | "not-found" (neutral)
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
import { devWarn } from '../../utils/devWarn.ts';
import { cx } from '../../utils/cx.ts';
import { asIcon as iconElement } from '../Icon/Icon.tsx';
import type { IconModule, IconValue } from '../Icon/Icon.tsx';
import { useStrings } from '../../providers/LocaleProvider.tsx';
import type { Catalog } from '../../providers/LocaleProvider.tsx';
import CircleCheckIcon from 'plenix-platform/icons/plenix/circle-check';
import CloudOffIcon from 'plenix-platform/icons/plenix/cloud-off';
import DocSearchIcon from 'plenix-platform/icons/plenix/doc-search';
import LockIcon from 'plenix-platform/icons/plenix/lock';
import SettingsMaintenanceIcon from 'plenix-platform/icons/plenix/settings-maintenance';
import WarningIcon from 'plenix-platform/icons/plenix/warning';
import WifiOffIcon from 'plenix-platform/icons/plenix/wifi-off';

// the system states: their tone and icon, and their words (STRINGS, translatable through the strings prop)
const KINDS: Record<string, { tone: string; icon: IconModule }> = {
  offline: { tone: 'warning', icon: WifiOffIcon },
  degraded: { tone: 'warning', icon: CloudOffIcon },
  'permission-denied': { tone: 'neutral', icon: LockIcon },
  'not-found': { tone: 'neutral', icon: DocSearchIcon },
  maintenance: { tone: 'neutral', icon: SettingsMaintenanceIcon },
  completion: { tone: 'success', icon: CircleCheckIcon }
};
const TONE_ICONS: Record<string, IconModule> = { error: WarningIcon, warning: WarningIcon, success: CircleCheckIcon };
const ROLES: Record<string, string> = { error: 'alert', warning: 'status', success: 'status' };

// a system state's words (strings.emptyState.<kind>)
type KindWords = { title?: React.ReactNode; text?: React.ReactNode };
export type EmptyStateProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  size?: 'inline' | 'page';
  tone?: 'neutral' | 'error' | 'warning' | 'success';
  /** a system state, with its tone, icon and words */
  kind?: 'offline' | 'degraded' | 'permission-denied' | 'not-found' | 'maintenance' | 'completion';
  /** an icon name, an imported module or an element; null: none */
  icon?: IconValue | React.ReactNode;
  title?: React.ReactNode;
  action?: React.ReactNode;
  strings?: Catalog | null;
};
export function EmptyState({ size = 'inline', tone, kind, icon, title, action, strings, className, children, ...rest }: EmptyStateProps) {
  devWarn('EmptyState', { size, tone }, { size: ['inline','page'], tone: ['neutral','error','warning','success'] });
  const preset = KINDS[kind as string];
  const all = useStrings('emptyState', strings);   // every system state's words, the strings prop on top
  const words = preset ? (all[kind as string] as KindWords) : null;
  const t = tone || (preset ? preset.tone : 'neutral');
  const mark = icon !== undefined ? icon : preset ? preset.icon : TONE_ICONS[t];
  const head = title !== undefined ? title : words ? words.title : null;
  const text = children !== undefined && children !== null ? children : words ? words.text : null;
  return (
    <div className={cx('plx-empty-state', 'plx-empty-state--' + size, t !== 'neutral' && 'plx-empty-state--' + t, className)} role={ROLES[t]} {...rest}>
      {mark ? <div className="plx-empty-state__icon" aria-hidden="true">{iconElement(mark)}</div> : null}
      {head ? <div className="plx-empty-state__title">{head}</div> : null}
      {text ? <div className="plx-empty-state__text">{text}</div> : null}
      {action ? <div className="plx-empty-state__action">{action}</div> : null}
    </div>
  );
}
