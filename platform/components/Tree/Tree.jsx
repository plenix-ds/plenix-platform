/* Plenix · Tree
   Summary: A hierarchy to choose from (folders, categories).
   Usage:
     <Tree label="Folders" nodes={[{ id, label, icon, meta, children: [...] }]} selected={id} onSelect={setId}
       expanded={ids} onExpandedChange={setIds} />
   Props:
     label: the accessible name of the tree
     nodes: the top-level items: [{ id, label, icon, meta, children }]
     nodes[].icon: an icon name or element before the label
     nodes[].openIcon: the icon while the item is open or selected; default: "folder" opens as "folder-open", others stay
     nodes[].meta: extra content at the end of the row
     nodes[].children: the item's child items, in the same shape
     selected: the id of the selected item
     onSelect(id): runs when an item is selected
     expanded: the ids of the open items (controlled)
     defaultExpanded: the ids of the open items at first (uncontrolled); default []
     onExpandedChange(ids): runs when items open or close
     className: more classes on the tree
   Behavior:
     Each item passes its own open/selected state to Icon.filled; child icons do not follow an ancestor item.
     The tree is one Tab stop. Each item's focus, and whether the keyboard moved it there (its row's focus ring), comes
       from useFocusable.
     Arrow Up and Down move through the visible items.
     Arrow Right opens an item or goes to its first child; Arrow Left closes it or goes to the parent.
     Home and End go to the first and last visible item.
     Enter or Space selects.
     Clicking the + box (a closed row) or the − box (an open row) opens or closes it; clicking the row selects.
     An open folder shows the open-folder icon (batch 239). Icons are outline while closed and open and filled while the item
     is open or selected (batch 241), by the item's own state only: a selected item does not fill the icons of the items inside it (batch 240).
*/
import React from 'react';
import { isRtl } from '../../utils/direction.ts';
import { cx } from '../../utils/cx.ts';
import { useUid } from '../../utils/layer.ts';
import { Icon, asIcon as iconElement, isIconModule, iconKey } from '../Icon/Icon.jsx';
import { useFocusable } from '../../hooks/useFocusable.js';
import FolderOpenIcon from 'plenix-platform/icons/plenix/folder-open';
import SquarePlusIcon from 'plenix-platform/icons/plenix/square-plus';
import SquareMinusIcon from 'plenix-platform/icons/plenix/square-minus';

const treeIcon = (i, filled) => (typeof i === 'string' || isIconModule(i) ? iconElement(i, { filled }) : React.isValidElement(i) && i.type === Icon ? React.cloneElement(i, { filled: filled || i.props.filled }) : i);
// the icon an open item shows: its own openIcon, else an open folder for a folder
const OPEN_ICONS = { folder: FolderOpenIcon };
const iconOf = (n, isOpen) => (isOpen ? n.openIcon || OPEN_ICONS[iconKey(n.icon)] || n.icon : n.icon);

// one item: its focus (and whether the keyboard moved it there, :focus-visible) comes from useFocusable; the tree keeps
// the one Tab stop (tabIndex) and the keys
function TreeItem({ n, level, tree }) {
  const { base, selected, active, open, refs, moveTo, toggle, onSelect, setFocusId } = tree;
  const { focusVisible, focusProps } = useFocusable({ tabStop: 'none', handlers: { onFocus: (e) => { if (e.target === e.currentTarget) setFocusId(n.id); } } });
  const kids = n.children && n.children.length;
  const isOpen = kids && open.has(n.id);
  return (
    <li ref={(el) => { refs.current[n.id] = el; }} id={base + '-' + n.id} role="treeitem" aria-level={level}
      aria-expanded={kids ? !!isOpen : undefined} aria-selected={n.id === selected} tabIndex={n.id === active ? 0 : -1}
      className={cx('plx-tree__item', n.id === selected && 'is-selected')} {...focusProps}>
      <div className={cx('plx-tree__row', n.id === selected && 'is-selected', focusVisible && 'is-focus-visible')} data-plx-level={Math.min(level, 12)} onClick={() => { moveTo(n.id); if (onSelect) onSelect(n.id); }}>
        <span className={cx('plx-tree__toggle', isOpen && 'is-open', !kids && 'is-leaf')} aria-hidden="true"
          onClick={kids ? (e) => { e.stopPropagation(); toggle(n.id); moveTo(n.id); } : undefined}>{kids ? <Icon icon={isOpen ? SquareMinusIcon : SquarePlusIcon} filled={false} /> : null}</span>
        {n.icon ? <span className="plx-tree__icon">{treeIcon(iconOf(n, isOpen || n.id === selected), !!isOpen || n.id === selected)}</span> : null}
        <span className="plx-tree__label">{n.label}</span>
        {n.meta !== undefined ? <span className="plx-tree__meta">{n.meta}</span> : null}
      </div>
      {isOpen ? <ul role="group" className="plx-tree__group">{n.children.map((c) => <TreeItem key={c.id} n={c} level={level + 1} tree={tree} />)}</ul> : null}
    </li>
  );
}

function visible(nodes, open, parent, out) {
  nodes.forEach((n) => {
    out.push({ node: n, parent });
    if (n.children && n.children.length && open.has(n.id)) visible(n.children, open, n.id, out);
  });
  return out;
}

export function Tree({ label, nodes, selected, onSelect, expanded, defaultExpanded = [], onExpandedChange, className }) {
  const base = useUid('plx-tree');
  const [ownOpen, setOwnOpen] = React.useState(defaultExpanded);
  const open = new Set(expanded !== undefined ? expanded : ownOpen);
  const setOpen = (next) => { const list = Array.from(next); if (expanded === undefined) setOwnOpen(list); if (onExpandedChange) onExpandedChange(list); };
  const flat = visible(nodes, open, null, []);
  const [focusId, setFocusId] = React.useState(null);
  const active = flat.some((v) => v.node.id === focusId) ? focusId : (flat.some((v) => v.node.id === selected) ? selected : (flat[0] && flat[0].node.id));
  const refs = React.useRef({});
  const moveTo = (id) => { setFocusId(id); if (refs.current[id]) refs.current[id].focus(); };
  const toggle = (id) => { const next = new Set(open); if (next.has(id)) next.delete(id); else next.add(id); setOpen(next); };
  const onKeyDown = (e) => {
    const at = flat.findIndex((v) => v.node.id === active);
    const cur = flat[at];
    if (!cur) return;
    const kids = cur.node.children && cur.node.children.length;
    if (e.key === 'ArrowDown') { if (flat[at + 1]) moveTo(flat[at + 1].node.id); }
    else if (e.key === 'ArrowUp') { if (flat[at - 1]) moveTo(flat[at - 1].node.id); }
    else if (e.key === 'Home') moveTo(flat[0].node.id);
    else if (e.key === 'End') moveTo(flat[flat.length - 1].node.id);
    // the key toward the reading end opens a branch, the other closes it or goes to the parent (right to left mirrors; batch 213)
    else if (e.key === (isRtl(e.currentTarget) ? 'ArrowLeft' : 'ArrowRight')) { if (kids && !open.has(cur.node.id)) toggle(cur.node.id); else if (kids) moveTo(cur.node.children[0].id); }
    else if (e.key === (isRtl(e.currentTarget) ? 'ArrowRight' : 'ArrowLeft')) { if (kids && open.has(cur.node.id)) toggle(cur.node.id); else if (cur.parent !== null) moveTo(cur.parent); }
    else if (e.key === 'Enter' || e.key === ' ') { if (onSelect) onSelect(cur.node.id); }
    else return;
    e.preventDefault();
  };
  const tree = { base, selected, active, open, refs, moveTo, toggle, onSelect, setFocusId };
  return <ul role="tree" aria-label={label} className={cx('plx-tree', className)} onKeyDown={onKeyDown}>{nodes.map((n) => <TreeItem key={n.id} n={n} level={1} tree={tree} />)}</ul>;
}
