/* Plenix · List, List.Item
   Summary: A list of short statements, each with a leading icon in a tone (do and don't, features, requirements); or an
     ordered list, numbered (1, 2, 3) or lettered (a, b, c), or drawn as steps; lists nest one level inside an item.
   Usage:
     <List items={[{ icon: 'circle-check', tone: 'success', children: 'Use it for…' }]} />
     <List><List.Item icon="close" tone="danger">Avoid…</List.Item></List>
     <List ordered items={[{ children: 'Create the project' }, { children: 'Upload the files', items: [{ children: 'Photos' }], ordered: 'alpha' }]} />
     <List ordered variant="steps" items={[{ children: 'Choose the files' }, { children: 'Add the details' }]} />
     <List variant="bullets" items={[{ children: 'Presence: online, away, busy, offline.' }, { children: 'Workflow: done, in progress.' }]} />
   Props:
     List.items: the statements: [{ icon, tone, children, items, ordered }]; or pass List.Item children
     List.ordered: an ordered list (<ol>): "decimal" (true is the same) | "alpha"; without it, the icon list (<ul>)
     List.variant: "icons" (default) | "steps": an ordered list whose numbers sit in a circle, for steps to follow |
       "bullets": a plain list, each statement after a small square bullet (owner, 2026-10-15: for points of a text)
     List.label: names the list for assistive technology when its heading is not next to it
     List.children: List.Item elements, when there are no items
     List.className: more classes on the list
     List.Item.icon: the icon name (icon lists)
     List.Item.tone: "neutral" (default) | "success" | "danger" | "info" | "warning"
     List.Item.items: a nested list under the statement, of the same kind unless List.Item.ordered says otherwise
     List.Item.ordered: the kind of the nested list: "decimal" | "alpha" | false (an icon list)
     List.Item.children: the statement
     List.Item.className: more classes on the <li>
   Behavior:
     Items wrap; the icon, number or step sits on the first line.
     The icon is decorative and hidden from assistive technology (the text carries the meaning); an ordered list is an
       <ol>, so its numbers are announced with the items.
     A nested list starts under its statement's text (the same keyline); nest one level only (two at most).
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.jsx';

const kindOf = (ordered) => (ordered === 'alpha' ? 'alpha' : ordered ? 'decimal' : null);

export function List({ items, label, ordered, variant = 'icons', className, children }) {
  devWarn('List', { variant }, { variant: ['icons','steps','bullets'] });
  const kind = kindOf(ordered || (variant === 'steps' ? 'decimal' : null));
  const Tag = kind ? 'ol' : 'ul';
  return (
    <Tag aria-label={label}
      className={cx('plx-list', kind && 'plx-list--ordered', kind === 'alpha' && 'plx-list--alpha', kind && variant === 'steps' && 'plx-list--steps', !kind && variant === 'bullets' && 'plx-list--bullets', className)}>
      {items ? items.map((it, i) => <List.Item key={i} icon={it.icon} tone={it.tone} items={it.items}
        ordered={it.ordered === undefined ? kind : it.ordered}>{it.children}</List.Item>) : children}
    </Tag>
  );
}

List.Item = function ListItem({ icon, tone = 'neutral', items, ordered, className, children }) {
  devWarn('List.Item', { tone }, { tone: ['info','success','warning','danger','neutral'] });
  const text = <span className="plx-list__text">{children}</span>;
  return (
    <li className={cx('plx-list__item', 'plx-list__item--' + tone, className)}>
      {icon ? <span className="plx-list__icon" aria-hidden="true"><Icon name={icon} /></span> : null}
      {items && items.length ? <div className="plx-list__body">{text}<List items={items} ordered={ordered} className="plx-list--nested" /></div> : text}
    </li>
  );
};
