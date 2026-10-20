/* Plenix · GroupPanel
   Summary: The command bar's Group (owner, 2026-10-14: "just like Airtable"): a "Group" button (the group-by icon, stacked
     rows) that opens a panel of group levels: each a field, its order, a "…" menu, remove and a handle; "Add subgroup";
     Collapse all and Expand all at the top.
   Usage:
     const [groups, setGroups] = React.useState([]);
     <GroupPanel fields={fields.filter((f) => f.kind === 'select')} value={groups} onChange={setGroups} />
     <DataGrid … groupBy={groups.map((g) => g.field)} sort={groups.concat(sort)} />
     (or useCollectionView)
   Props:
     fields: the fields rows can be grouped by (utils/fields.js); usually the select fields
     value: the levels: [{ field, dir: "asc" | "desc", hideEmpty }], the first the outer group
     onChange(value): runs on every change
     table: the table controller, or a ref to it: Collapse all and Expand all close and open its
       groups; without it they are disabled
     inline: draws the panel alone (open, in a frame); default false
     strings: { label: "Group", title: "Group by", info, empty, add: "Add group", addSub: "Add subgroup", collapseAll:
       "Collapse all", expandAll: "Expand all", more: "More for {name}", hideEmpty: "Hide empty groups", remove: "Remove the
       grouping by {name}", removeTip: "Remove group", field, order, moved, row, reorder, moveUp, moveDown }
   Behavior:
     The bar button reads "Group" (never reworded); grouped, it takes the tint and a count badge (the levels).
     Each row: the field (its type icon), the order in the field type's words, the "…" menu (Hide empty groups), remove
       (trash) and the handle; a field is used once. Rows move by drag, the handle's menu or Alt + Arrow Up / Down,
       announced. The groups' order follows their levels' order (the page sorts by the levels first).
   Notes:
     The panel holds the levels; the page applies them (DataGrid groupBy, nested with several levels). */
import React from 'react';
import { Button } from '../../components/Button/Button.jsx';
import { Menu, MenuItem } from '../../components/Menu/Menu.jsx';
import { Text } from '../../components/Text/Text.jsx';
import { Tooltip } from '../../components/Tooltip/Tooltip.jsx';
import { PanelTrigger, PanelHead, Pick, useReorder, REORDER_STRINGS, fill } from '../CommandBar/panel-parts.jsx';
import { KIND_ICONS, DIRECTIONS, fieldOf, kindOf } from '../../utils/fields.js';

const STRINGS = Object.assign({
  label: 'Group', title: 'Group by', info: 'Rows with the same value are gathered under one header; a subgroup splits each group again.',
  empty: 'Gather the rows that share a value under one header.', add: 'Add group', addSub: 'Add subgroup', collapseAll: 'Collapse all', expandAll: 'Expand all',
  more: 'More for {name}', hideEmpty: 'Hide empty groups', remove: 'Remove the grouping by {name}', removeTip: 'Remove group', field: 'Field', order: 'Order',
}, REORDER_STRINGS);
const fieldOption = (f) => ({ value: f.value, label: f.label, icon: KIND_ICONS[kindOf(f)] });
// every group of the table, its subgroups too
const eachGroup = (t, fn) => {
  const table = t && t.current !== undefined && !t.getGroups ? t.current : t;
  if (!table || !table.getGroups) return;
  const walk = (gs) => gs.forEach((g) => { fn(g); walk(g.getSubGroups ? g.getSubGroups() : []); });
  walk(table.getGroups());
};

export function GroupPanel({ fields = [], value = [], onChange, table, inline = false, strings }) {
  const t = Object.assign({}, STRINGS, strings);
  const levels = value;
  const ro = useReorder(levels, onChange, (l) => fieldOf(fields, l.field).label, t);
  const put = (i, ch) => onChange(levels.map((l, j) => (j === i ? Object.assign({}, l, ch) : l)));
  const free = fields.filter((f) => !levels.some((l) => l.field === f.value));
  const off = !levels.length || !table;
  const body = (
    <div className="plx-find-panel plx-find-panel--group">
      <PanelHead title={t.title} info={t.info} actions={<>
        <Button size="sm" variant="ghost" disabled={off} onClick={() => eachGroup(table, (g) => g.hide())}>{t.collapseAll}</Button>
        <Button size="sm" variant="ghost" disabled={off} onClick={() => eachGroup(table, (g) => g.show())}>{t.expandAll}</Button>
      </>} />
      <div className="plx-find-panel__rows" ref={ro.box}>
        {levels.length ? null : <Text variant="secondary">{t.empty}</Text>}
        {levels.map((l, i) => {
          const f = fieldOf(fields, l.field), words = DIRECTIONS[kindOf(f)];
          return (
            <div key={l.field} {...ro.rowProps(i, f.label)}>
              <Pick label={t.field} value={l.field} options={fields.filter((x) => x.value === l.field || !levels.some((y) => y.field === x.value)).map(fieldOption)} onChange={(v) => put(i, { field: v })} />
              <Pick label={t.order} size="dir" value={l.dir || 'asc'} options={[{ value: 'asc', label: words[0] }, { value: 'desc', label: words[1] }]} onChange={(v) => put(i, { dir: v })} />
              <Menu label={fill(t.more, { name: f.label })} placement="bottom-end" trigger={<Button variant="ghost" icon="more" iconOnly label={fill(t.more, { name: f.label })} />}>
                <MenuItem checked={!!l.hideEmpty} keepOpen onSelect={() => put(i, { hideEmpty: !l.hideEmpty })}>{t.hideEmpty}</MenuItem>
              </Menu>
              <Tooltip content={t.removeTip}><Button variant="ghost" icon="trash" iconOnly label={fill(t.remove, { name: f.label })} onClick={() => onChange(levels.filter((_, j) => j !== i))} /></Tooltip>
              {ro.handle(i, f.label)}
            </div>
          );
        })}
        {ro.status}
      </div>
      <div className="plx-find-panel__add">
        <Button size="sm" variant="ghost" icon="plus" disabled={!free.length} onClick={() => onChange(levels.concat({ field: free[0].value, dir: 'asc' }))}>{levels.length ? t.addSub : t.add}</Button>
      </div>
    </div>
  );
  return <PanelTrigger icon="group-by" label={t.label} count={levels.length} inline={inline}>{body}</PanelTrigger>;
}
