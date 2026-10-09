/* Plenix · NavList
   Summary: A list of places in a side navigation (settings sections, folders of a screen).
   Usage:
     <NavList label="Settings" value={current} onSelect={go}
       groups={[{ heading: 'Account', items: [{ id, label, icon, count, href }] }]} />
   Props:
     label: the accessible name of the navigation
     items: one ungrouped list of items: [{ id, label, icon, count, href, muted, disabled, onPin, pinned, actions }]
     groups: groups of items, in order: [{ heading, icon, defaultExpanded, collapsible, items }]; use instead of items
     groups[].heading: the group's heading; a CollapsibleSection header (the accent section header with a chevron)
     groups[].icon: an icon in the group heading (optional)
     groups[].defaultExpanded: whether the group starts open; default true
     groups[].collapsible: false keeps the group always open and its heading stays a plain label; default true
     value: the id of the current item
     onSelect(id): runs when an item is chosen
     items[].href: makes the item a link; otherwise it is a button
     items[].icon: an icon name or element before the label; the current item's "folder" shows as "folder-open" (batch 242)
     items[].count: shown right after the name, small, italic and in parentheses ("Branding (326)")
     items[].muted: shows the row in the subtle text color (a place that exists but has nothing in it yet); it still opens
     items[].disabled: disables a button item
     items[].onPin(id): makes the row pinnable; runs from its pin button
     items[].pinned: the row is pinned; its pin button stays shown, filled
     items[].actions: other controls beside the row (a remove button)
     items[].children: makes the item a subgroup: a row with a chevron that folds the rows inside it (same item shape)
     items[].defaultExpanded: whether a subgroup starts open; default false (it also opens while it holds the current item)
     className: more classes on the navigation
     locale: the language the counts are formatted in (default: the page's language, document.documentElement.lang)
     strings: the words it shows and announces, for other languages: { pin: "Pin", unpin: "Unpin", pinItem: "Pin {label}",
       unpinItem: "Unpin {label}" } (pin and unpin are the pin button's tooltip; pinItem and unpinItem its name)
   Behavior:
     A row's actions (item.actions) show on hover and when the row holds keyboard focus; on touch they always show. The pin
       is different: it shows a state, so a pinned row keeps it (batch 272).
     The current item carries aria-current="page".
     An item with href is a link; otherwise it is a button and onSelect(id) runs.
     A collapsible group heading folds its rows, the same in every navigation pane.
     A subgroup row is a button with aria-expanded; its chevron points right while closed and down while open, and its
     count follows its name. A subgroup holding the current item opens when that item becomes current; while closed it
     marks its own row as holding the current page.
     The pin button shows while the row is hovered or focused, and stays (filled) while the row is pinned.
   Notes:
     item.actions are siblings of the row's own button, never inside it.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useUid } from '../../utils/layer.js';
import { Icon } from '../Icon/Icon.jsx';
import { CollapsibleSection } from '../CollapsibleSection/CollapsibleSection.jsx';

const STRINGS = { pin: 'Pin', unpin: 'Unpin', pinItem: 'Pin {label}', unpinItem: 'Unpin {label}' };

const asIcon = (i) => (typeof i === 'string' ? <Icon name={i} /> : i);
// the current item is the open one: a folder shows as an open folder (filled, like every current icon)
const OPEN_ICONS = { folder: 'folder-open' };
const iconOf = (icon, on) => (on && typeof icon === 'string' && OPEN_ICONS[icon]) || icon;

const holds = (item, current) => !!item.children && item.children.some((c) => c.id === current || holds(c, current));

function SubGroup({ item, current, onSelect, t, loc }) {
  const inside = holds(item, current);
  const [open, setOpen] = React.useState(!!item.defaultExpanded || inside);
  React.useEffect(() => { if (inside) setOpen(true); }, [inside, current]);
  const id = useUid('plx-nav-sub');
  return (
    <li className="plx-nav-list__entry">
      <button type="button" className={cx('plx-nav-list__item', 'plx-nav-list__item--group', inside && !open && 'is-current-parent')}
        aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span className="plx-nav-list__icon"><Icon name={open ? 'chevron-down' : 'chevron-right'} /></span>
        <span className="plx-nav-list__label"><span className="plx-nav-list__name">{item.label}</span>
          {item.count !== undefined ? <span className="plx-nav-list__count">({item.count})</span> : null}</span>
      </button>
      <ul id={id} aria-label={item.label} hidden={!open} className="plx-nav-list__items plx-nav-list__items--nested">
        {open ? item.children.map((it) => <Item key={it.id} item={it} current={current} onSelect={onSelect} t={t} loc={loc} />) : null}
      </ul>
    </li>
  );
}

function Item({ item, current, onSelect, t, loc }) {
  if (item.children) return <SubGroup item={item} current={current} onSelect={onSelect} t={t} loc={loc} />;
  const on = item.id === current;
  const props = { className: cx('plx-nav-list__item', item.muted && 'plx-nav-list__item--muted', on && 'is-current'), 'aria-current': on ? 'page' : undefined };
  const content = (
    <>
      {item.icon ? <span className="plx-nav-list__icon">{asIcon(iconOf(item.icon, on))}</span> : null}
      <span className="plx-nav-list__label"><span className="plx-nav-list__name">{item.label}</span>
        {item.count !== undefined ? <span className="plx-nav-list__count">({typeof item.count === 'number' ? item.count.toLocaleString(loc) : item.count})</span> : null}</span>
    </>
  );
  return (
    <li className={cx('plx-nav-list__entry', (item.actions || item.onPin) && 'plx-nav-list__entry--actions', item.pinned && 'is-pinned')}>
      {item.href ? <a href={item.href} {...props} onClick={onSelect ? () => onSelect(item.id) : undefined}>{content}</a>
        : <button type="button" {...props} disabled={item.disabled || undefined} onClick={() => onSelect && onSelect(item.id)}>{content}</button>}
      {item.actions || item.onPin ? <span className="plx-nav-list__actions">
        {item.onPin ? <button type="button" className="plx-nav-list__pin" aria-pressed={!!item.pinned} aria-label={(item.pinned ? t.unpinItem : t.pinItem).split('{label}').join(item.label)}
          title={item.pinned ? t.unpin : t.pin} onClick={() => item.onPin(item.id)}><Icon name={item.pinned ? 'pin-filled' : 'pin'} /></button> : null}
        {item.actions}
      </span> : null}
    </li>
  );
}

function Group({ heading, items, current, onSelect, collapsible = true, icon, defaultExpanded = true, t, loc }) {
  const id = useUid('plx-nav');
  if (heading && collapsible) {
    return (
      <CollapsibleSection className="plx-nav-list__group" title={heading} icon={icon} defaultExpanded={defaultExpanded} headingLevel={null}>
        <ul aria-label={heading} className="plx-nav-list__items">
          {items.map((it) => <Item key={it.id} item={it} current={current} onSelect={onSelect} t={t} loc={loc} />)}
        </ul>
      </CollapsibleSection>
    );
  }
  return (
    <div className="plx-nav-list__group">
      {heading ? <div id={id} className="plx-nav-list__heading">{heading}</div> : null}
      <ul aria-labelledby={heading ? id : undefined} className="plx-nav-list__items">
        {items.map((it) => <Item key={it.id} item={it} current={current} onSelect={onSelect} t={t} loc={loc} />)}
      </ul>
    </div>
  );
}

export function NavList({ label, items, groups, value, onSelect, locale, strings, className }) {
  const t = Object.assign({}, STRINGS, strings);
  const loc = locale || (typeof document !== 'undefined' && document.documentElement.lang) || undefined;
  const all = groups || [{ heading: null, items: items || [] }];
  return (
    <nav aria-label={label} className={cx('plx-nav-list', className)}>
      {all.map((g, i) => <Group key={g.heading || i} heading={g.heading} items={g.items} collapsible={g.collapsible} icon={g.icon} defaultExpanded={g.defaultExpanded} current={value} onSelect={onSelect} t={t} loc={loc} />)}
    </nav>
  );
}
