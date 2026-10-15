/* Plenix · BarActions
   (platform/patterns/CommandBar; internal, not part of the public API: the commands of a bar, shared by CommandBar, the
   page's actions, and BulkActions, the selection's actions.)
   Usage:
     <BarActions actions={actions} iconOnly={step >= 1} fold={Math.max(0, step - 2)} moreLabel="More actions" dangerClass="plx-command-bar__danger" />
   Summary: A row of commands drawn by the button rule (owner, 2026-10-14): ghost buttons with their icon and label; icons
     only (each with its tooltip) when the bar does not fit; then the commands fold into "More actions" (⋮) one at a time
     from the end, the danger commands last. More shows only when something has folded.
   Props:
     actions: [{ id, label, icon, onSelect, items, danger, disabled, why, primary, single, toggle, pressed, choices, value, onChange }]
     actions[].toggle: an on/off command (owner, 2026-10-15, the Fluent model): a pressed button (pressed true or false);
       onSelect(next) runs with the new state; folded into More it is a checked menu item
     actions[].choices: a command that picks one of [{ value, label, icon }]: a menu button showing the current choice
       (named "label: choice"), onChange(value) runs on a pick; folded into More it is a submenu of radio items
     actions[].items: a menu: Menu children (MenuItem…) or [{ id, label, icon, danger, disabled, single, onSelect }]
     actions[].why: the tooltip of a disabled command, saying why (owner, 2026-10-14: commands are never hidden by state,
       only disabled, with a why-tooltip)
     iconOnly: draw the commands as icons with tooltips
     fold: how many commands are in More (from the end: the others first, the danger commands last)
     off(action): whether a command (or a menu item) is disabled now; default action.disabled
     why(action): the tooltip of a disabled command; default action.why
     moreLabel: the More button's name ("More actions")
     dangerClass: the class that draws a ghost button in the danger color
     extra: more menu nodes for More, after the folded commands (the bar's folded quick filters); More shows for them too
   Notes:
     The danger commands come last, after a divider. A primary command (the page's one, when it marks one) stays filled
     and keeps its label. */
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Button } from '../../components/Button/Button.jsx';
import { Menu, MenuItem, MenuGroup, MenuDivider, MenuRadioGroup, MenuSub } from '../../components/Menu/Menu.jsx';
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
  dangerClass, size = 'sm', extra = [] }) {
  const folded = new Set(foldOrder(actions).slice(0, fold).map((a) => a.id || a.label));
  const kept = actions.filter((a) => !folded.has(a.id || a.label));
  const away = actions.filter((a) => folded.has(a.id || a.label));
  // a choices command: its options as radio items, and the current one's label
  const radios = (a) => (
    <MenuRadioGroup label={a.label} value={a.value} onChange={(v) => a.onChange && a.onChange(v)}>
      {(a.choices || []).map((c) => <MenuItem key={c.value} value={c.value} icon={c.icon}>{c.label}</MenuItem>)}
    </MenuRadioGroup>
  );
  const current = (a) => { const c = (a.choices || []).find((x) => x.value === a.value); return c ? c.label : ''; };
  const one = (a) => {
    const disabled = off(a);
    const filled = !!a.primary;
    const only = iconOnly && !filled && !!a.icon;
    const menu = !!a.items || !!a.choices;
    // a choices command shows its current choice and is named by both ("Profile: Raphael")
    const name = a.choices ? a.label + ': ' + current(a) : a.label;
    const text = a.choices ? current(a) || a.label : a.label;
    const click = a.toggle ? () => a.onSelect && a.onSelect(!a.pressed) : menu ? undefined : a.onSelect;
    const button = (
      <Button size={size} variant={filled ? 'primary' : 'ghost'} icon={a.icon} iconOnly={only} label={only || a.choices ? name : undefined} caret={menu && !only}
        pressed={a.toggle ? !!a.pressed : undefined} disabled={disabled} className={a.danger && !filled ? dangerClass : undefined} onClick={click}>{text}</Button>
    );
    const el = a.choices ? <Menu label={a.label} trigger={button}>{radios(a)}</Menu> : a.items ? <Menu label={a.label} trigger={button}>{itemsOf(a, off)}</Menu> : button;
    const tip = disabled ? why(a) : only ? name : null;
    return <React.Fragment key={a.id || a.label}>{tip ? <Tooltip content={tip}>{el}</Tooltip> : el}</React.Fragment>;
  };
  const plain = kept.filter((a) => !a.danger), danger = kept.filter((a) => a.danger);
  const allOff = away.length > 0 && !extra.length && away.every((a) => off(a));
  const more = away.length || extra.length ? (
    <Tooltip key="plx-more" content={allOff ? why(away[0]) : moreLabel}>
      <Menu label={moreLabel} placement="bottom-end" trigger={<Button size={size} variant="ghost" icon="more" iconOnly label={moreLabel} disabled={allOff} />}>
        {away.map((a, i) => {
          const sep = a.danger && i > 0 && !away[i - 1].danger ? <MenuDivider key={(a.id || a.label) + '-sep'} /> : null;
          // folded (the Fluent model): a toggle is a checked item, a choices command a submenu of radio items
          const item = a.choices ? <MenuSub key={a.id || a.label} label={a.label + ': ' + current(a)} icon={a.icon} disabled={off(a)}>{radios(a)}</MenuSub>
            : a.toggle ? <MenuItem key={a.id || a.label} icon={a.icon} checked={!!a.pressed} disabled={off(a)} onSelect={() => a.onSelect && a.onSelect(!a.pressed)}>{a.label}</MenuItem>
            : a.items ? <MenuGroup key={a.id || a.label} label={a.label}>{itemsOf(a, off)}</MenuGroup>
            : <MenuItem key={a.id || a.label} icon={a.icon} danger={a.danger} disabled={off(a)} onSelect={a.onSelect}>{a.label}</MenuItem>;
          return sep ? [sep, item] : item;
        })}
        {away.length && extra.length ? <MenuDivider key="plx-extra-sep" /> : null}
        {extra}
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
