/* Plenix · WidgetGrid
   Summary: A dashboard's widgets in a grid that people reorder by dragging a widget's handle, or with the arrow keys on it
     (04 › Layout › Layout patterns › Dashboard grid).
   Usage:
     <WidgetGrid label="Dashboard" items={widgets} onReorder={(ids) => setOrder(ids)}
       renderItem={(w) => <Panel title={w.title} flush>{w.body}</Panel>} />
   Props:
     items: the widgets, in order: [{ id, title, span }] (span: "1" (default) | "2" columns)
     renderItem(item, handle): draws a widget (usually a Panel). A renderer that takes the second argument places the
       handle itself (in the Panel's actions); otherwise the grid puts it in the widget's top corner
     onReorder(ids): runs with the new order after a drop or a key move; without it the grid cannot be reordered
     label: the accessible name of the grid
     columns: "auto" (default; as many as fit) | 2 | 3 | 4
     className: more classes on the grid
     strings: the words it announces, for other languages: { widget: "Widget", widgetLower: "widget", move: "Move {title}
       (arrow keys)", position: "{title}, position {index} of {total}" } (widget and widgetLower stand in for a widget
       without a title, in the announcement and in the handle's name)
   Behavior:
     Each widget gets a handle (a button) when the grid can be reordered: drag it onto another widget to place it there;
     or focus it and press Arrow Up (earlier) or Arrow Down (later); Arrow Left / Right follow reading order (in a
     right-to-left page Arrow Right is earlier).
     While dragging, the widget under the pointer shows the drop ring.
     The new place is announced ("Site visits, position 2 of 6").
   Notes:
     The grid never changes the order by itself: onReorder hands the new order to the page, which keeps it.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../../components/Icon/Icon.jsx';
import { VisuallyHidden } from '../../components/VisuallyHidden/VisuallyHidden.jsx';
import { arrowStep } from '../../utils/direction.js';

const STRINGS = { widget: 'Widget', widgetLower: 'widget', move: 'Move {title} (arrow keys)', position: '{title}, position {index} of {total}' };
const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));

const move = (ids, from, to) => { const next = ids.slice(); const [x] = next.splice(from, 1); next.splice(to, 0, x); return next; };

export function WidgetGrid({ items = [], renderItem, onReorder, label, columns = 'auto', strings, className, ...rest }) {
  const t = Object.assign({}, STRINGS, strings);
  const [dragging, setDragging] = React.useState(null);
  const [over, setOver] = React.useState(null);
  const [said, setSaid] = React.useState('');
  const ids = items.map((i) => i.id);
  const place = (from, to) => {
    if (!onReorder || to < 0 || to >= ids.length || from === to) return;
    onReorder(move(ids, from, to));
    const it = items[from]; setSaid(fill(t.position, { title: it.title || t.widget, index: to + 1, total: ids.length }));
  };
  return (
    <>
    <div className={cx('plx-widget-grid', 'plx-widget-grid--' + columns, className)} role="list" aria-label={label} {...rest}>
      {items.map((it, i) => (
        <div key={it.id} role="listitem" className={cx('plx-widget-grid__item', it.span === '2' && 'plx-widget-grid__item--wide', dragging === it.id && 'is-dragging', over === it.id && dragging !== it.id && 'is-drop-target')}
          onDragOver={onReorder ? (e) => { e.preventDefault(); setOver(it.id); } : undefined}
          onDragLeave={onReorder ? () => setOver((o) => (o === it.id ? null : o)) : undefined}
          onDrop={onReorder ? (e) => { e.preventDefault(); const from = ids.indexOf(dragging); setOver(null); setDragging(null); place(from, i); } : undefined}>
          {(() => { const handle = onReorder ? (
            <button type="button" className={cx('plx-widget-grid__handle', renderItem && renderItem.length > 1 && 'plx-widget-grid__handle--inline')} draggable aria-label={fill(t.move, { title: it.title || t.widgetLower })}
              onDragStart={(e) => { setDragging(it.id); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(it.id)); }}
              onDragEnd={() => { setDragging(null); setOver(null); }}
              onKeyDown={(e) => {
                const step = arrowStep(e, e.currentTarget);
                if (step) { e.preventDefault(); place(i, i + step); }
              }}>
              <Icon name="move" size="sm" />
            </button>
          ) : null;
          return renderItem && renderItem.length > 1 ? renderItem(it, handle) : <>{handle}{renderItem ? renderItem(it) : null}</>; })()}
        </div>
      ))}
    </div>
    {/* the reorder announcement: beside the list, since a list holds only its items */}
    <VisuallyHidden role="status">{said}</VisuallyHidden>
    </>
  );
}
