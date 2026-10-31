/* Plenix · TreeSelect
   Summary: A field whose choices are a hierarchy (05 Forms › Select and lookup › Tree select): it shows the chosen item
     (or items) and opens a Popover with the hierarchy as a tree, optionally with a search field; one item, or several
     with checkboxes where a parent checks or clears everything under it.
   Usage:
     <Field label="Folder"><TreeSelect nodes={folders} value={folder} onChange={setFolder} /></Field>
     <TreeSelect label="Categories" multiple nodes={categories} values={chosen} onChange={setChosen} search />
   Props:
     width: "xs" | "sm" | "md" | "lg" (the field-width scale, --plx-sys-field-width-*: pick by what it holds) | "fill" (the whole
       width); without a pattern sizing it, the field is never wider than its container (P-52, owner 2026-10-19)
     nodes: the hierarchy, as Tree takes it: [{ id, label, icon, children: [...] }]
     value: the chosen item's id (one choice)
     values: the checked items' ids, with multiple (the leaves: items without children)
     onChange(id | ids): runs with the chosen item's id, or with multiple the new list of checked ids
     multiple: several choices with checkboxes (default false)
     search: a search field over the tree (default false): it keeps the items whose label matches and the items above
       them, opened
     placeholder: the text while nothing is chosen (default "Choose")
     label: the accessible name when there is no Field (also the popover's name)
     defaultExpanded: the ids of the items open when the tree first shows (default: the items above the chosen ones)
     invalid: shows the invalid state (a Field sets it)
     disabled: the field cannot be used
     readOnly: shows the choice and does not open the tree, so nothing changes; default the nearest ReadOnly region's (useReadOnly)
     required: a choice is required (a Field sets it)
     strings: the words it shows and announces, for other languages: { placeholder: "Choose", search: "Search",
       choose: "Choose an item", more: "{list} and {n} more", empty: "No matches" }
     id: the trigger's id (a Field sets it)
     className: more classes on the field
     Other props pass through to the trigger <button> (aria-describedby).
   Behavior:
     The trigger is a select-only combobox (a button with role combobox): Enter, Space or a click opens the popover;
       Escape, a click outside and Tab out close it, and focus returns to the trigger. At the Narrow window class the
       popover is a bottom Sheet (Popover's sheetOnNarrow).
     The tree is the Tree's keyboard and look: one Tab stop; ↑ ↓ move, → opens or goes to the first child, ← closes or
       goes to the parent, Home and End. One choice: Enter, Space or a click chooses the item and closes. Several: Enter,
       Space or a click checks or clears it and the popover stays open; a parent's checkbox is checked when every item
       under it is, mixed when some are, and checks or clears them all.
     Search keeps the matching items and their parents, opened; ↓ from the search field moves into the tree.
   Notes:
     The checkbox is the Checkbox control drawn in the row, not focusable and hidden from assistive technology: the
       item's aria-checked says its state. For a flat list use a select or Combobox; for picking among thousands of
       items in folders use a file or entity picker.
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';
import { isRtl } from '../../utils/direction.ts';
import { Icon, asIcon, iconKey } from '../Icon/Icon.jsx';
import { Popover } from '../Popover/Popover.jsx';
import { Tooltip } from '../Tooltip/Tooltip.jsx';
import { useTruncated } from '../../utils/overflow.ts';
import { SearchField } from '../SearchField/SearchField.jsx';
import { useStrings } from '../../providers/LocaleProvider.tsx';
import { useReadOnly } from '../../providers/ReadOnly.tsx';
import FolderOpenIcon from 'plenix-platform/icons/plenix/folder-open';
import SelectChevronIcon from 'plenix-platform/icons/plenix/select-chevron';
import SquarePlusIcon from 'plenix-platform/icons/plenix/square-plus';
import SquareMinusIcon from 'plenix-platform/icons/plenix/square-minus';

const OPEN_ICONS = { folder: FolderOpenIcon };
const iconOf = (n, isOpen) => (isOpen ? n.openIcon || OPEN_ICONS[iconKey(n.icon)] || n.icon : n.icon);
const kidsOf = (n) => (n.children && n.children.length ? n.children : null);
// every node by id, with its parent and the leaves under it
function index(nodes) {
  const byId = new Map();
  const walk = (list, parent) => list.forEach((n) => {
    byId.set(n.id, { node: n, parent });
    if (kidsOf(n)) walk(n.children, n.id);
  });
  walk(nodes, null);
  const leaves = (n) => (kidsOf(n) ? n.children.reduce((all, c) => all.concat(leaves(c)), []) : [n.id]);
  return { byId, leaves };
}
const ancestors = (byId, id) => { const out = []; let at = byId.get(id); while (at && at.parent !== null) { out.push(at.parent); at = byId.get(at.parent); } return out; };
// the nodes that match the text, with the nodes above them (only their matching branches)
function filterNodes(nodes, q) {
  return nodes.reduce((out, n) => {
    const own = String(n.label).toLowerCase().indexOf(q) >= 0;
    const kids = kidsOf(n) ? filterNodes(n.children, q) : [];
    if (own || kids.length) out.push(Object.assign({}, n, { children: own && !kids.length ? n.children : kids }));
    return out;
  }, []);
}
function flatten(nodes, open, parent, out) {
  nodes.forEach((n) => { out.push({ node: n, parent }); if (kidsOf(n) && open.has(n.id)) flatten(n.children, open, n.id, out); });
  return out;
}

export function TreeSelect({ nodes = [], value, values, onChange, multiple = false, search = false, placeholder, label, defaultExpanded, width,
  invalid, disabled, readOnly: readOnlyOwn, required, strings, id, className, ...rest }) {
  const locked = useReadOnly(readOnlyOwn);   // its own readOnly, else the nearest ReadOnly region's: the choice shows and the tree does not open
  const t = useStrings('treeSelect', strings);
  const base = 'plx-ts' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const { byId, leaves } = React.useMemo(() => index(nodes), [nodes]);
  const chosen = multiple ? (values || []) : (value !== undefined && value !== null && value !== '' ? [value] : []);
  const [open, setOpen] = React.useState(false);
  const valueRef = React.useRef(null), cut = useTruncated(valueRef);   // the chosen text is cut: its full text goes in a Tooltip
  const [text, setText] = React.useState('');
  const [expanded, setExpanded] = React.useState(() => {
    if (defaultExpanded) return defaultExpanded;
    const out = new Set(); chosen.forEach((c) => ancestors(byId, c).forEach((a) => out.add(a))); return Array.from(out);
  });
  const [focusId, setFocusId] = React.useState(null);
  const [ringId, setRingId] = React.useState(null);
  const refs = React.useRef({}), searchRef = React.useRef(null), firstRef = React.useRef(null);
  const q = text.trim().toLowerCase();
  const shownNodes = q ? filterNodes(nodes, q) : nodes;
  // while searching every branch that holds a match is open
  const openSet = q ? new Set(Array.from(byId.keys())) : new Set(expanded);
  const flat = flatten(shownNodes, openSet, null, []);
  const active = flat.some((v) => v.node.id === focusId) ? focusId : (flat.find((v) => chosen.indexOf(v.node.id) >= 0) || flat[0] || { node: {} }).node.id;
  // the popover focuses the active item when it opens (read after the tree is drawn)
  const activeRef = React.useRef(active); activeRef.current = active;
  if (!firstRef.current) firstRef.current = { get current() { return refs.current[activeRef.current] || null; } };

  // the state of a row: one choice, or its checkbox (a parent's from its leaves)
  const stateOf = (n) => {
    if (!multiple) return chosen.indexOf(n.id) >= 0 ? 'true' : 'false';
    const ls = leaves(n), on = ls.filter((l) => chosen.indexOf(l) >= 0).length;
    return on === 0 ? 'false' : on === ls.length ? 'true' : 'mixed';
  };
  const toggleOpen = (nid) => { if (q) return; const next = new Set(expanded); if (next.has(nid)) next.delete(nid); else next.add(nid); setExpanded(Array.from(next)); };
  const moveTo = (nid) => { setFocusId(nid); if (refs.current[nid]) refs.current[nid].focus(); };
  const choose = (n) => {
    if (!onChange) return;
    if (!multiple) { onChange(n.id); setOpen(false); setText(''); return; }
    const ls = leaves(n), all = ls.every((l) => chosen.indexOf(l) >= 0);
    onChange(all ? chosen.filter((c) => ls.indexOf(c) < 0) : chosen.concat(ls.filter((l) => chosen.indexOf(l) < 0)));
  };
  const onKeyDown = (e) => {
    const at = flat.findIndex((v) => v.node.id === active), cur = flat[at];
    if (!cur) return;
    const kids = kidsOf(cur.node), isOpen = kids && openSet.has(cur.node.id);
    const rtl = isRtl(e.currentTarget);
    if (e.key === 'ArrowDown') { if (flat[at + 1]) moveTo(flat[at + 1].node.id); }
    else if (e.key === 'ArrowUp') { if (flat[at - 1]) moveTo(flat[at - 1].node.id); else if (searchRef.current) searchRef.current.focus(); }
    else if (e.key === 'Home') moveTo(flat[0].node.id);
    else if (e.key === 'End') moveTo(flat[flat.length - 1].node.id);
    else if (e.key === (rtl ? 'ArrowLeft' : 'ArrowRight')) { if (kids && !isOpen) toggleOpen(cur.node.id); else if (kids) moveTo(cur.node.children[0].id); }
    else if (e.key === (rtl ? 'ArrowRight' : 'ArrowLeft')) { if (kids && isOpen && !q) toggleOpen(cur.node.id); else if (cur.parent !== null) moveTo(cur.parent); }
    else if (e.key === 'Enter' || e.key === ' ') choose(cur.node);
    else return;
    e.preventDefault();
  };
  const renderNodes = (list, level) => list.map((n) => {
    const kids = kidsOf(n), isOpen = kids && openSet.has(n.id), state = stateOf(n);
    return (
      <li key={n.id} ref={(el) => { refs.current[n.id] = el; }} id={base + '-' + n.id} role="treeitem" aria-level={level}
        aria-expanded={kids ? !!isOpen : undefined} aria-selected={multiple ? undefined : state === 'true'} aria-checked={multiple ? state : undefined}
        tabIndex={n.id === active ? 0 : -1} className={cx('plx-tree__item', !multiple && state === 'true' && 'is-selected')}
        onFocus={(e) => { if (e.target === e.currentTarget) { setFocusId(n.id); setRingId(e.currentTarget.matches(':focus-visible') ? n.id : null); } }}
        onBlur={(e) => { if (e.target === e.currentTarget) setRingId(null); }}
        onClick={(e) => { if (e.target.closest('[role="treeitem"]') !== e.currentTarget) return; moveTo(n.id); choose(n); }}>
        <div className={cx('plx-tree__row', !multiple && state === 'true' && 'is-selected', n.id === ringId && 'is-focus-visible')} data-plx-level={Math.min(level, 12)}>
          <span className={cx('plx-tree__toggle', isOpen && 'is-open', !kids && 'is-leaf')} aria-hidden="true"
            onClick={kids ? (e) => { e.stopPropagation(); toggleOpen(n.id); moveTo(n.id); } : undefined}>{kids ? <Icon icon={isOpen ? SquareMinusIcon : SquarePlusIcon} filled={false} /> : null}</span>
          {multiple ? <input type="checkbox" className="plx-check__input plx-tree-select__mark" tabIndex={-1} aria-hidden="true" inert="" readOnly checked={state === 'true'}
            ref={(el) => { if (el) el.indeterminate = state === 'mixed'; }} /> : null}
          {n.icon ? <span className="plx-tree__icon">{asIcon(iconOf(n, isOpen || state === 'true'))}</span> : null}
          <span className="plx-tree__label">{n.label}</span>
        </div>
        {isOpen ? <ul role="group" className="plx-tree__group">{renderNodes(n.children, level + 1)}</ul> : null}
      </li>
    );
  });

  // what the field shows: the chosen labels, the first two and how many more
  const names = chosen.map((c) => (byId.get(c) ? byId.get(c).node.label : c));
  const summary = names.length > 2 ? t.more.replace('{list}', names.slice(0, 2).join(', ')).replace('{n}', names.length - 2) : names.join(', ');
  const name = label || t.choose;
  const trigger = (
    <button type="button" id={id} role="combobox" aria-label={label} aria-invalid={invalid || undefined} aria-required={required || undefined} aria-readonly={locked || undefined} disabled={disabled}
      className={cx('plx-input', 'plx-tree-select__trigger', !names.length && 'is-empty')} {...rest}>
      <Tooltip content={names.length ? summary : ''} disabled={!cut || open || !names.length} className="plx-tree-select__tip"><span ref={valueRef} className={names.length ? 'plx-tree-select__value' : 'plx-tree-select__placeholder'}>{names.length ? summary : (placeholder || t.placeholder)}</span></Tooltip>
      <span className="plx-tree-select__chevron" aria-hidden="true"><Icon icon={SelectChevronIcon} filled={false} /></span>
    </button>
  );
  return (
    <div className={cx('plx-tree-select', width && 'plx-tree-select--width-' + width, multiple && 'plx-tree-select--multiple', open && 'is-open', disabled && 'is-disabled', className)}>
      <Popover anchorClassName="plx-tree-select__anchor" trigger={trigger} open={open} onOpenChange={(o) => { if (locked && o) return; setOpen(o); if (!o) setText(''); }} label={name} size="md"
        initialFocus={search ? searchRef : firstRef.current} className="plx-tree-select__popover">
        <div className="plx-tree-select__panel">
          {search ? <SearchField ref={searchRef} value={text} label={t.search + ': ' + name} placeholder={t.search} onChange={(e) => setText(e.target.value)} onClear={() => setText('')}
            onKeyDown={(e) => { if (e.key === 'ArrowDown' && flat.length) { e.preventDefault(); moveTo(flat[0].node.id); } }} /> : null}
          <div className="plx-tree-select__scroll">
            {flat.length ? <ul role="tree" aria-label={name} aria-multiselectable={multiple || undefined} className="plx-tree plx-tree-select__tree" onKeyDown={onKeyDown}>{renderNodes(shownNodes, 1)}</ul>
              : <p className="plx-tree-select__empty" role="status">{t.empty}</p>}
          </div>
        </div>
      </Popover>
    </div>
  );
}
