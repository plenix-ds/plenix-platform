/* Plenix · BarActions
   (platform/patterns/CommandBar; internal, not part of the public API: the commands of a bar, shared by CommandBar, the
   page's actions, and BulkActions, the selection's actions.)
   Usage:
     <BarActions actions={actions} iconOnly={step >= 1} fold={Math.max(0, step - 2)} moreLabel="More actions" dangerClass="plx-command-bar__danger" />
   Summary: A row of commands drawn by the button rule (owner, 2026-10-14): ghost buttons with their icon and label; icons
     only (each with its tooltip) when the bar does not fit; then the commands fold into "More actions" (⋮) one at a time
     from the end, the danger commands last. More shows only when something has folded.
   Props:
     actions: [{ id, label, icon, onSelect, items, danger, disabled, why, primary, single }]
     actions[].items: a menu: Menu children (MenuItem…) or [{ id, label, icon, danger, disabled, single, onSelect }]
     actions[].why: the tooltip of a disabled command, saying why (owner, 2026-10-14: commands are never hidden by state,
       only disabled, with a why-tooltip)
     iconOnly: draw the commands as icons with tooltips
     fold: how many commands are in More (from the end: the others first, the danger commands last)
     off(action): whether a command (or a menu item) is disabled now; default action.disabled
     why(action): the tooltip of a disabled command; default action.why
     moreLabel: the More button's name ("More actions")
     dangerClass: the class that draws a ghost button in the danger color
   Notes:
     The danger commands come last, after a divider. A primary command (the page's one, when it marks one) stays filled
     and keeps its label. */
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Button } from '../../components/Button/Button.jsx';
import { Menu, MenuItem, MenuGroup, MenuDivider } from '../../components/Menu/Menu.jsx';
import { Tooltip } from '../../components/Tooltip/Tooltip.jsx';

// a menu's items: Menu children, or descriptors drawn as MenuItems
const itemsOf = (a, off) => {
  const list = a.items;
  if (!Array.isArray(list) || !list.length || React.isValidElement(list[0])) return list;
  return list.map((it) => <MenuItem key={it.id || it.label} icon={it.icon} danger={it.danger} disabled={off(it)} onSelect={it.onSelect}>{it.label}</MenuItem>);
};

// the commands that fold, in their folding order: the others from the end, then the danger ones from the end
export const foldOrder = (actions) => {
  const plain = actions.filter((a) => !a.danger && !a.primary), danger = actions.filter((a) => a.danger && !a.primary);
  return plain.slice().reverse().concat(danger.slice().reverse());
};

export function BarActions({ actions = [], iconOnly = false, fold = 0, off = (a) => !!a.disabled, why = (a) => a.why, moreLabel = 'More actions',
  dangerClass, size = 'sm' }) {
  const folded = new Set(foldOrder(actions).slice(0, fold).map((a) => a.id || a.label));
  const kept = actions.filter((a) => !folded.has(a.id || a.label));
  const away = actions.filter((a) => folded.has(a.id || a.label));
  const one = (a) => {
    const disabled = off(a);
    const filled = !!a.primary;
    const only = iconOnly && !filled && !!a.icon;
    const button = (
      <Button size={size} variant={filled ? 'primary' : 'ghost'} icon={a.icon} iconOnly={only} label={only ? a.label : undefined} caret={!!a.items && !only}
        disabled={disabled} className={a.danger && !filled ? dangerClass : undefined} onClick={a.items ? undefined : a.onSelect}>{a.label}</Button>
    );
    const el = a.items ? <Menu label={a.label} trigger={button}>{itemsOf(a, off)}</Menu> : button;
    const tip = disabled ? why(a) : only ? a.label : null;
    return <React.Fragment key={a.id || a.label}>{tip ? <Tooltip content={tip}>{el}</Tooltip> : el}</React.Fragment>;
  };
  const plain = kept.filter((a) => !a.danger), danger = kept.filter((a) => a.danger);
  const allOff = away.length > 0 && away.every((a) => off(a));
  const more = away.length ? (
    <Tooltip key="plx-more" content={allOff ? why(away[0]) : moreLabel}>
      <Menu label={moreLabel} placement="bottom-end" trigger={<Button size={size} variant="ghost" icon="more" iconOnly label={moreLabel} disabled={allOff} />}>
        {away.map((a, i) => {
          const sep = a.danger && i > 0 && !away[i - 1].danger ? <MenuDivider key={(a.id || a.label) + '-sep'} /> : null;
          const item = a.items ? <MenuGroup key={a.id || a.label} label={a.label}>{itemsOf(a, off)}</MenuGroup>
            : <MenuItem key={a.id || a.label} icon={a.icon} danger={a.danger} disabled={off(a)} onSelect={a.onSelect}>{a.label}</MenuItem>;
          return sep ? [sep, item] : item;
        })}
      </Menu>
    </Tooltip>
  ) : null;
  return (
    <>
      {plain.map(one)}
      {more}
      {danger.length && (plain.length || more) ? <span key="plx-danger-divider" className={cx('plx-bar-actions__divider')} aria-hidden="true" /> : null}
      {danger.map(one)}
    </>
  );
}
