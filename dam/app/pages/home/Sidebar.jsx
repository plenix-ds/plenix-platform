/* Plenix asset app · home page sidebar (app/pages/home/Sidebar.jsx): categories, collections, saved searches, recent
   imports and trash — the left pane of the home page.
   <Sidebar mode="browse | search" active onOpen onAdd collapsed onCollapse onFiles/>
   mode "search" shows only Categories and Collections, as the search page did. Each section is a CollapsibleSection. Categories: a
   filter field, "Add category", pinned rows first, the first seven rows until "Show more (n)". active: the id of the row
   that is current; onOpen(kind, name) opens it (kind: categories | collections | saved | import | trash). onAdd(dialogId)
   opens an "Add …" dialog. It is the page's navigation pane: its Collapse button makes it a rail of Home, Files, Categories, Collections and Expand. */
import React from 'react';
import { NavList, NavPane, CollapsibleSection, ShowMore, Button, Input, ToolRail, Stack, Field } from 'plenix-platform';
import * as D from './homeData.js';


// a sidebar section: the Platform CollapsibleSection (the legacy section header), its rows stacked
const Section = ({ title, icon, defaultOpen = true, children }) => (
  <CollapsibleSection title={title} icon={icon} defaultExpanded={defaultOpen} headingLevel={null}><Stack gap="xs">{children}</Stack></CollapsibleSection>
);

const AddLink = ({ label, onClick }) => <div><Button size="xs" variant="ghost" icon="plus" onClick={onClick}>{label}</Button></div>;

function PinnedList({ items, setItems, kind, icon, label, active, onOpen, limit, filter = '' }) {
  const [more, setMore] = React.useState(false);
  const q = filter.trim().toLowerCase();
  const sorted = items.filter((it) => it.pinned).concat(items.filter((it) => !it.pinned));
  const shown = q ? sorted.filter((it) => it.name.toLowerCase().indexOf(q) >= 0) : (limit && !more ? sorted.slice(0, limit) : sorted);
  const hiddenCount = sorted.length - (limit ? Math.min(limit, sorted.length) : sorted.length);
  const pin = (name) => setItems(items.map((it) => (it.name === name ? { ...it, pinned: !it.pinned } : it)));
  return (
    <>
      <NavList label={label} value={active} onSelect={(id) => onOpen(kind, id)}
        items={shown.map((it) => ({ id: it.name, label: it.name, icon, count: it.count, pinned: it.pinned, onPin: pin }))} />
      {limit && !q && hiddenCount > 0 ? <div><ShowMore expanded={more} count={hiddenCount} onToggle={setMore} /></div> : null}
    </>
  );
}

export function Sidebar({ mode = 'browse', active, onOpen, onAdd, onFiles, filesOpen, saved = D.SAVED_SEARCHES, onRemoveSaved }) {
  const [cats, setCats] = React.useState(D.CATEGORIES);
  const [colls, setColls] = React.useState(D.COLLECTIONS);
  const [filter, setFilter] = React.useState('');
  return (
    <NavPane label={mode === 'search' ? 'Search filters' : 'Categories and collections'} title="Asset Manager" rail={<>
        <ToolRail.Item icon="home" label="Home" onClick={() => onOpen('categories', 'All categories')} />
        <ToolRail.Item icon="folder-open" label="Files" pressed={!!filesOpen} onClick={onFiles} />
        <ToolRail.Item icon="grid-2x2" label="Categories" pressed={mode === 'browse' && active === 'All categories'} onClick={() => onOpen('categories', 'All categories')} />
        <ToolRail.Item icon="briefcase" label="Collections" onClick={() => onOpen('collections', 'All collections')} />
      </>} footer={<Button size="sm" variant="ghost" icon="gear" href="settings-system.html">System settings</Button>} header={<>
        <Button size="sm" variant="ghost" icon="home" onClick={() => onOpen('categories', 'All categories')}>Home</Button>
        <Button size="sm" variant="ghost" icon="folder-open" pressed={!!filesOpen} onClick={onFiles}>Files</Button>
      </>}>
      <Section title="Categories" icon="grid-2x2">
        <Field label="Filter categories" hideLabel><Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter categories..." /></Field>
        <AddLink label="Add category" onClick={() => onAdd('newCatModal')} />
        <PinnedList items={cats} setItems={setCats} kind="categories" icon="folder" label="Categories" active={active} onOpen={onOpen} limit={mode === 'browse' ? D.CATEGORIES_SHOWN : 0} filter={filter} />
      </Section>
      <Section title="Collections" icon="briefcase">
        <AddLink label="Add collection" onClick={() => onAdd('newCollectionModal')} />
        <PinnedList items={colls} setItems={setColls} kind="collections" icon="briefcase" label="Collections" active={active} onOpen={onOpen} />
      </Section>
      {mode === 'browse' ? (
        <>
          <Section title="Saved searches" icon="search">
            <AddLink label="Add saved search" onClick={() => onAdd('saveSearchModal')} />
            <NavList label="Saved searches" value={active} onSelect={(id) => onOpen('saved', id)}
              items={saved.map((s) => ({ id: s.name, label: s.name, icon: 'doc-search', actions: onRemoveSaved ? <Button size="xs" variant="ghost" iconOnly icon="close" label={'Remove ' + s.name} onClick={() => onRemoveSaved(s.name)} /> : null }))} />
          </Section>
          <Section title="Recent imports" icon="clock">
            <NavList label="Recent imports" value={active} onSelect={(id) => onOpen('import', id)} items={D.RECENT_IMPORTS.map(([d, n]) => ({ id: d, label: d, icon: 'download-alt', count: n }))} />
          </Section>
          <Section title="Trash" icon="trash-simple" defaultOpen={false}>
            <NavList label="Trash" value={active} onSelect={(id) => onOpen('trash', id)} items={D.TRASH.map(([d, n]) => ({ id: d, label: d, icon: 'trash-simple', count: n }))} />
          </Section>
        </>
      ) : null}
    </NavPane>
  );
}
