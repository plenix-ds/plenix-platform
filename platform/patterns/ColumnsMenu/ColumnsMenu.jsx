/* Plenix · ColumnsMenu, ManageColumnsDialog
   Summary: The command bar's Columns (owner, 2026-10-14: the first column is a must; a list with reordering): a "Columns"
     dropdown with one First column select and every column with its handle and shown/hidden checkbox; ManageColumnsDialog is the same list, larger, with a find field, Show all,
     Hide all and a First column select, applied with Apply.
   Usage:
     const [columns, setColumns] = React.useState({ order: ['name', 'type', 'size'], hidden: [] });
     <ColumnsMenu fields={fields} value={columns} onChange={setColumns} />
     <ManageColumnsDialog fields={fields} value={columns} onChange={setColumns} />
     <DataGrid … columnOrder={columns.order} hiddenColumns={columns.hidden} />      (or useCollectionView)
   Props:
     fields: the columns: [{ value, label }] (the collection's fields)
     value: { order: [field…], hidden: [field…] }; the first of the order is the first column (never hidden)
     onChange(value): runs on every change (the dialog: on Apply)
     inline: (ColumnsMenu) draws the list alone (open, in a frame); default false
     strings: { label: "Columns", manage: "Manage columns", first: "First column", makeFirst: "Make first column",
       moveUp: "Move {name} up", moveDown: "Move {name} down", up: "Move up", down: "Move down", find: "Find a column",
       showAll: "Show all", hideAll: "Hide all", apply: "Apply", cancel: "Cancel", shown: "{name} shown", hidden: "{name}
       hidden", isFirst: "{name} is the first column", moved: "{name}, position {position} of {total}", row: "{name}{first}.
       Alt + Arrow Up or Down moves it", firstMark: ", first column", none: "No column matches" }
   Behavior:
     Changes in the dropdown apply at once; the dialog applies them with Apply (Cancel leaves the columns as they were).
     A row moves by drag or Alt + Arrow Up / Down on the focused row; the First column select moves it to the top. Each change is announced politely. The first column cannot be hidden.
     The button reads "Columns" with the thin chevron; icons only, its icon and tooltip; hidden columns tint it and show
       their count. */
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Button } from '../../components/Button/Button.jsx';
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx';
import { Dialog } from '../../components/Dialog/Dialog.jsx';
import { Field } from '../../components/Field/Field.jsx';
import { Icon } from '../../components/Icon/Icon.jsx';
import { Select } from '../../components/Input/Input.jsx';
import { SearchField } from '../../components/SearchField/SearchField.jsx';
import { Text } from '../../components/Text/Text.jsx';
import { VisuallyHidden } from '../../components/VisuallyHidden/VisuallyHidden.jsx';
import { PanelTrigger, toggle, fill } from '../CommandBar/panel-parts.jsx';

const STRINGS = { label: 'Columns', manage: 'Manage columns', first: 'First column', makeFirst: 'Make first column', moveUp: 'Move {name} up', moveDown: 'Move {name} down',
  up: 'Move up', down: 'Move down', find: 'Find a column', showAll: 'Show all', hideAll: 'Hide all', apply: 'Apply', cancel: 'Cancel', shown: '{name} shown',
  hidden: '{name} hidden', isFirst: '{name} is the first column', moved: '{name}, position {position} of {total}', row: '{name}{first}. Alt + Arrow Up or Down moves it',
  firstMark: ', first column', none: 'No column matches' };
const moveTo = (order, f, i) => { const rest = order.filter((x) => x !== f); rest.splice(i, 0, f); return rest; };
const nameIn = (fields) => (f) => { const x = fields.find((y) => y.value === f); return x ? x.label : f; };

// the list: one row per column
export function ColumnsList({ fields, value, onChange, filter = '', t, firstControl = true }) {
  const [msg, setMsg] = React.useState('');
  const [drag, setDrag] = React.useState(null);
  const box = React.useRef(null);
  const name = nameIn(fields);
  const order = value.order, hidden = value.hidden || [];
  const put = (o, h, words, focus) => {
    onChange({ order: o, hidden: h });
    setMsg(words);
    if (focus) setTimeout(() => { const el = box.current && box.current.querySelector('[data-plx-field="' + focus + '"]'); if (el) el.focus(); }, 0);
  };
  const move = (f, to, focus) => {
    if (to < 0 || to >= order.length) return;
    put(moveTo(order, f, to), to === 0 ? hidden.filter((x) => x !== f) : hidden,
      to === 0 ? fill(t.isFirst, { name: name(f) }) : fill(t.moved, { name: name(f), position: to + 1, total: order.length }), focus ? f : null);
  };
  const q = filter.trim().toLowerCase();
  const shown = order.filter((f) => !q || name(f).toLowerCase().indexOf(q) >= 0);
  return (
    <div className="plx-columns-list" ref={box}>
      {firstControl ? <Field label={t.first}><Select value={order[0] || ''} options={order.map(f => ({ value: f, label: name(f) }))}
        onChange={e => move(e.target.value, 0)} /></Field> : null}
      {shown.length ? null : <Text variant="secondary">{t.none}</Text>}
      {shown.map((f) => {
        const i = order.indexOf(f);
        return (
          <div key={f} data-plx-field={f} tabIndex={0} draggable aria-label={fill(t.row, { name: name(f), first: i === 0 ? t.firstMark : '' })} aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown"
            className={cx('plx-columns-list__row', drag === f && 'is-dragging')}
            onKeyDown={(e) => { if (e.target !== e.currentTarget || !e.altKey) return; if (e.key === 'ArrowUp') { e.preventDefault(); move(f, i - 1, true); } if (e.key === 'ArrowDown') { e.preventDefault(); move(f, i + 1, true); } }}
            onDragStart={(e) => { setDrag(f); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', f); }}
            onDragEnd={() => setDrag(null)} onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); const from = e.dataTransfer.getData('text/plain') || drag; setDrag(null); if (from && from !== f) move(from, i); }}>
            <span className="plx-columns-list__handle" aria-hidden="true"><Icon name="drag" /></span>
            <Checkbox label={name(f)} checked={hidden.indexOf(f) < 0} disabled={i === 0}
              onChange={() => put(order, toggle(hidden, f), fill(hidden.indexOf(f) >= 0 ? t.shown : t.hidden, { name: name(f) }))} />

          </div>
        );
      })}
      <VisuallyHidden role="status" aria-live="polite">{msg}</VisuallyHidden>
    </div>
  );
}

export function ColumnsMenu({ fields = [], value, onChange, inline = false, strings }) {
  const t = Object.assign({}, STRINGS, strings);
  const v = value || { order: fields.map((f) => f.value), hidden: [] };
  const list = <div className="plx-find-panel plx-find-panel--columns"><ColumnsList fields={fields} value={v} onChange={onChange} t={t} /></div>;
  return <PanelTrigger icon="fields" label={t.label} title={t.label} count={(v.hidden || []).length} caret size="lg" inline={inline}>{list}</PanelTrigger>;
}

export function ManageColumnsDialog({ fields = [], value, onChange, strings, trigger }) {
  const t = Object.assign({}, STRINGS, strings);
  const v = value || { order: fields.map((f) => f.value), hidden: [] };
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(v);
  const [q, setQ] = React.useState('');
  const name = nameIn(fields);
  const start = () => { setDraft(v); setQ(''); setOpen(true); };
  const button = trigger ? React.cloneElement(trigger, { onClick: start }) : <Button size="sm" variant="ghost" icon="fields" onClick={start}>{t.manage}</Button>;
  return (
    <>
      {button}
      <Dialog open={open} onClose={() => setOpen(false)} title={t.manage} icon="fields" size="md"
        footer={<><Button onClick={() => setOpen(false)}>{t.cancel}</Button><Button variant="primary" onClick={() => { onChange(draft); setOpen(false); }}>{t.apply}</Button></>}>
        <div className="plx-find-panel plx-find-panel--dialog">
          <Field label={t.first}><Select value={draft.order[0]} options={draft.order.map((f) => ({ value: f, label: name(f) }))}
            onChange={(e) => setDraft({ order: moveTo(draft.order, e.target.value, 0), hidden: (draft.hidden || []).filter((x) => x !== e.target.value) })} /></Field>
          <SearchField width="fill" value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder={t.find} label={t.find} />
          <div className="plx-find-panel__add">
            <Button size="sm" variant="ghost" icon="visibility" onClick={() => setDraft({ order: draft.order, hidden: [] })}>{t.showAll}</Button>
            <Button size="sm" variant="ghost" icon="visibility-off" onClick={() => setDraft({ order: draft.order, hidden: draft.order.slice(1) })}>{t.hideAll}</Button>
          </div>
          <ColumnsList fields={fields} value={draft} onChange={setDraft} filter={q} t={t} firstControl={false} />
        </div>
      </Dialog>
    </>
  );
}
