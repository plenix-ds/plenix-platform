/* Plenix · BarActions
   (platform/patterns/CommandBar; internal, not part of the public API: the commands of a bar, shared by CommandBar, the
   page's actions, and BulkActions, the selection's actions.)
   Usage:
     <BarActions actions={actions} iconOnly={step >= 1} fold={Math.max(0, step - 2)} moreLabel="More actions" dangerClass="plx-command-bar__danger" />
   Summary: A row of commands drawn by the button rule (owner, 2026-10-14): ghost buttons with their icon and label; icons
     only (each with its tooltip) when the bar does not fit; then the commands fold into "More actions" (⋮) one at a time
     from the end, the danger commands last. More shows only when something has folded.
   Props:
     actions: [{ id, label, icon, onSelect, items, danger, disabled, why, primary, single, toggle, pressed, choices, value, onChange, loading, tooltip, panel }]
     actions[].toggle: an on/off command (owner, 2026-10-15, the Fluent model): a pressed button (pressed true or false);
       onSelect(next) runs with the new state; folded into More it is a checked menu item
     actions[].choices: a command that picks one of [{ value, label, icon }]: a menu button showing the current choice
       (named "label: choice"), onChange(value) runs on a pick; folded into More it is a submenu of radio items
     actions[].items: a menu: Menu children (MenuItem…) or [{ id, label, icon, danger, disabled, single, onSelect }]
     actions[].why: the tooltip of a disabled command, saying why (owner, 2026-10-14: commands are never hidden by state,
       only disabled, with a why-tooltip)
     actions[].loading: uses the existing Button spinner and busy state; folded commands are busy and cannot be chosen
     actions[].tooltip: additional help on hover and keyboard focus, with labels or icons; disabled why takes precedence
     actions[].panel({ close }): returns a small form in the existing Popover; Escape returns focus to the action
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
import { Button } from '../../components/Button/Button.jsx';
import { Menu, MenuItem, MenuGroup, MenuDivider, MenuRadioGroup, MenuSub } from '../../components/Menu/Menu.jsx';
import { Tooltip } from '../../components/Tooltip/Tooltip.jsx';
import { Popover } from '../../components/Popover/Popover.jsx';
import { Spinner } from '../../components/Loading/Loading.jsx';
import { focusables } from '../../utils/layer.js';


// Composite triggers do not all forward arbitrary props. Keep Tooltip's description on the real control.
function HintTarget({ children, 'aria-describedby': description }) {
  const wrap = React.useRef(null);
  React.useLayoutEffect(() => {
    const button = wrap.current && wrap.current.querySelector('button,a[href]');
    if (!button || !description) return undefined;
    const before = button.getAttribute('aria-describedby');
    const ids = [...new Set((before || '').split(' ').concat(description.split(' ')).filter(Boolean))];
    button.setAttribute('aria-describedby', ids.join(' '));
    return () => { if (before) button.setAttribute('aria-describedby', before); else button.removeAttribute('aria-describedby'); };
  });
  return <span ref={wrap} className="plx-bar-actions__hint-target">{children}</span>;
}
function ActionHint({ content, children, className }) {
  return <Tooltip content={content} className={className}><HintTarget>{children}</HintTarget></Tooltip>;
}

// MenuItem intentionally has no public ref. This adapter exposes its real button to Popover's focus/anchor handling.
const PanelMenuTrigger = React.forwardRef(function PanelMenuTrigger(props, ref) {
  const wrap = React.useRef(null);
  React.useImperativeHandle(ref, () => wrap.current && wrap.current.querySelector('[data-plx-menu-item]'));
  return <span ref={wrap} className="plx-bar-actions__panel-item"><MenuItem {...props} keepOpen /></span>;
});
function ActionPanel({ action, trigger }) {
  const [open, setOpen] = React.useState(false);
  const holder = React.useRef(null);
  const unavailable = !!action.disabled || !!action.loading;
  const show = open && !unavailable;
  const close = () => setOpen(false);
  // If dismissing a narrow sheet also closes More, its item is gone: return to the surviving More trigger.
  React.useEffect(() => {
    if (!show) return undefined;
    const menu = holder.current && holder.current.closest('[role="menu"]');
    const more = menu && menu.parentElement.querySelector(':scope > button');
    return () => { requestAnimationFrame(() => { if (more && more.isConnected && document.activeElement === document.body) more.focus({ preventScroll: true }); }); };
  }, [show]);
  React.useEffect(() => { if (unavailable) setOpen(false); }, [unavailable]);
  const contain = (e) => {
    const dialog = e.target.closest('[role="dialog"]');
    if (!dialog) return;
    // The non-modal form is outside the toolbar's roving order. Tab past its last control leaves the whole bar.
    if (e.type === 'keydown' && e.key === 'Tab' && !e.shiftKey && dialog.getAttribute('aria-modal') !== 'true') {
      const controls = focusables(dialog).filter((el) => el.tabIndex >= 0);
      const toolbar = holder.current && holder.current.closest('[role="toolbar"]');
      if (toolbar && e.target === controls[controls.length - 1]) {
        const next = focusables(document.body).find((el) => el.tabIndex >= 0 && !toolbar.contains(el) && !el.closest('[role="menu"],[role="dialog"],[inert]') && (toolbar.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING));
        if (next) { e.preventDefault(); next.focus(); }
      }
    }
    e.stopPropagation();
  };
  const leave = (e) => {
    const next = e.relatedTarget, menu = e.currentTarget.closest('[role="menu"]');
    if (!menu || !next || menu.contains(next) || next.closest('[role="dialog"]')) return;
    const more = menu.parentElement.querySelector(':scope > button');
    if (more) more.click();
  };
  return <span ref={holder} className="plx-bar-actions__panel" onKeyDown={contain} onFocus={contain} onMouseDown={contain} onBlur={leave}><Popover trigger={trigger} title={action.label} closeButton open={show}
    onOpenChange={(next) => { if (!next || !unavailable) setOpen(next); }}
    >
    {show ? action.panel({ close }) : null}
  </Popover></span>;
}

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
  dangerClass, size = 'sm', extra = [], foldStart = 2 }) {
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
    const disabled = off(a), loading = !!a.loading;
    const filled = !!a.primary;
    const only = iconOnly && !filled && !!a.icon;
    const panel = typeof a.panel === 'function';
    const menu = !!a.items || !!a.choices;
    // a choices command shows its current choice and is named by both ("Profile: Raphael")
    const name = a.choices ? a.label + ': ' + current(a) : a.label;
    const text = a.choices ? current(a) || a.label : a.label;
    const click = panel ? undefined : a.toggle ? () => a.onSelect && a.onSelect(!a.pressed) : menu ? undefined : a.onSelect;
    const button = (
      <Button size={size} variant={filled ? 'primary' : 'ghost'} icon={a.icon} iconOnly={only} label={only || a.choices ? name : undefined} caret={menu && !only}
        aria-haspopup={panel ? 'dialog' : menu ? 'menu' : undefined} expanded={loading && (panel || menu) ? false : undefined}
        pressed={a.toggle ? !!a.pressed : undefined} disabled={disabled} loading={loading} className={a.danger && !filled ? dangerClass : undefined} onClick={click}>{text}</Button>
    );
    const el = loading ? button : panel ? <ActionPanel action={Object.assign({}, a, { disabled })} trigger={button} /> : a.choices ? <Menu label={a.label} trigger={button}>{radios(a)}</Menu> : a.items ? <Menu label={a.label} trigger={button}>{itemsOf(a, off)}</Menu> : button;
    const tip = (disabled && why(a)) || a.tooltip || (only ? name : null);
    const index = foldOrder(actions).indexOf(a);
    return <span key={a.id || a.label} className="plx-bar-actions__hint-target" data-plx-fit-until={index >= 0 ? foldStart + index + 1 : undefined}>{tip ? <ActionHint content={tip}>{el}</ActionHint> : el}</span>;
  };
  const allOff = away.length > 0 && !extra.length && away.every((a) => off(a));
  const more = away.length || extra.length ? (
    <Tooltip key="plx-more" content={allOff ? why(away[0]) : moreLabel}>
      <Menu label={moreLabel} placement="bottom-end" trigger={<Button size={size} variant="ghost" icon="more" iconOnly label={moreLabel} disabled={allOff} />}>
        {away.map((a, i) => {
          const sep = i > 0 && (a.barSection !== away[i - 1].barSection || (a.danger && !away[i - 1].danger)) ? <MenuDivider key={(a.id || a.label) + '-sep'} /> : null;
          // folded (the Fluent model): a toggle is a checked item, a choices command a submenu of radio items
          const busy = !!a.loading, disabled = off(a) || busy;
          const item = busy ? <MenuItem key={a.id || a.label} icon={<Spinner size="sm" label={a.label} />} danger={a.danger} checked={a.toggle ? !!a.pressed : undefined} aria-label={a.choices ? a.label + ': ' + current(a) : a.label} aria-busy disabled>{a.choices ? a.label + ': ' + current(a) : a.label}</MenuItem>
            : typeof a.panel === 'function' ? <ActionPanel key={a.id || a.label} action={Object.assign({}, a, { disabled })}
                trigger={<PanelMenuTrigger icon={a.icon} danger={a.danger} disabled={disabled}>{a.label}</PanelMenuTrigger>} />
            : a.choices ? <MenuSub key={a.id || a.label} label={a.label + ': ' + current(a)} icon={a.icon} disabled={off(a)}>{radios(a)}</MenuSub>
            : a.toggle ? <MenuItem key={a.id || a.label} icon={a.icon} checked={!!a.pressed} disabled={off(a)} onSelect={() => a.onSelect && a.onSelect(!a.pressed)}>{a.label}</MenuItem>
            : a.items ? <MenuGroup key={a.id || a.label} label={a.label}>{itemsOf(a, off)}</MenuGroup>
            : <MenuItem key={a.id || a.label} icon={a.icon} danger={a.danger} disabled={off(a)} onSelect={a.onSelect}>{a.label}</MenuItem>;
          const tip = (off(a) && why(a)) || a.tooltip;
          const described = tip ? <ActionHint key={a.id || a.label} content={tip} className="plx-bar-actions__tooltip">{item}</ActionHint> : item;
          return sep ? [sep, described] : described;
        })}
        {away.length && extra.length ? <MenuDivider key="plx-extra-sep" /> : null}
        {extra}
      </Menu>
    </Tooltip>
  ) : null;
  return (
    <>
      {kept.some(a => a.barSection === 'selection') ? ['selection', undefined].map(section => {
        const group = kept.filter(a => a.barSection === section);
        const regular = group.filter(a => !a.danger), destructive = group.filter(a => a.danger);
        return group.length ? <React.Fragment key={section || 'page'}>
          {section === undefined && kept.some(a => a.barSection === 'selection') ? <span className="plx-bar-actions__divider" aria-hidden="true" /> : null}
          {regular.map(one)}
          {destructive.length && regular.length ? <span className="plx-bar-actions__divider" aria-hidden="true" /> : null}
          {destructive.map(one)}
        </React.Fragment> : null;
      }) : <>{kept.filter(a => !a.danger).map(one)}{more}
        {kept.some(a => a.danger) && (kept.some(a => !a.danger) || more) ? <span className="plx-bar-actions__divider" aria-hidden="true" /> : null}
        {kept.filter(a => a.danger).map(one)}</>}
      {kept.some(a => a.barSection === 'selection') ? more : null}
    </>
  );
}
