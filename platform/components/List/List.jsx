/* Plenix · List, List.Item
   Summary: A list of short statements, each with a leading icon in a tone (do and don't, features, requirements).
   Usage:
     <List items={[{ icon: 'circle-check', tone: 'success', children: 'Use it for…' }]} />
     <List><List.Item icon="close" tone="danger">Avoid…</List.Item></List>
   Props:
     List.items: the statements: [{ icon, tone, children }]; or pass List.Item children
     List.label: names the list for assistive technology when its heading is not next to it
     List.children: List.Item elements, when there are no items
     List.className: more classes on the <ul>
     List.Item.icon: the icon name
     List.Item.tone: "neutral" (default) | "success" | "danger" | "info" | "warning"
     List.Item.children: the statement
     List.Item.className: more classes on the <li>
   Behavior:
     Items wrap; the icon sits on the first line.
     The icon is decorative and hidden from assistive technology (the text carries the meaning).
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.jsx';

export function List({ items, label, className, children }) {
  return (
    <ul aria-label={label} className={cx('plx-list', className)}>
      {items ? items.map((it, i) => <List.Item key={i} icon={it.icon} tone={it.tone}>{it.children}</List.Item>) : children}
    </ul>
  );
}

List.Item = function ListItem({ icon, tone = 'neutral', className, children }) {
  return (
    <li className={cx('plx-list__item', 'plx-list__item--' + tone, className)}>
      {icon ? <span className="plx-list__icon" aria-hidden="true"><Icon name={icon} /></span> : null}
      <span className="plx-list__text">{children}</span>
    </li>
  );
};
