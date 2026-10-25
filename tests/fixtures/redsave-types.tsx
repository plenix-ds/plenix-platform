// What RedSave writes (#170, #171): correct code that must compile, strict, against the generated plenix.d.ts.
import * as React from 'react';
import {
  DataGrid, DataTable, Tabs, MediaCard, MediaViewer, Text,
  FilterPanel, SortPanel, GroupPanel, ColumnsMenu, useCollectionView, useAppLayout,
} from '../../packages/react';

type Row = { id: number; name: string; status: string };
const rows: Row[] = [{ id: 1, name: 'Alpha', status: 'open' }];

// DataGrid columns are column records, not a string union; DataTable is the same component
const columns = [{ title: 'Name', field: 'name', kind: 'name' }, { title: 'Status', field: 'status', kind: ['center', 'badge'] }];
export const grid = <DataGrid label="Records" data={rows} columns={columns} />;
export const alias = <DataTable label="Records" data={rows} columns={columns} />;

// Tabs onChange receives the tab's value, not a DOM event
export function TabsUse() {
  const [tab, setTab] = React.useState('info');
  return <Tabs label="Details" value={tab} onChange={(value: string) => setTab(value.toUpperCase())}
    items={[{ value: 'info', label: 'Info' }, { value: 'log', label: 'Log' }]} />;
}

// the collection panels take useCollectionView's props as they come
export function Collection() {
  const view = useCollectionView<Row>([{ value: 'name', label: 'Name' }, { value: 'status', label: 'Status', kind: 'select' }], { data: rows });
  return (
    <>
      <FilterPanel {...view.filterProps} />
      <SortPanel {...view.sortProps} />
      <GroupPanel {...view.groupProps} />
      <ColumnsMenu {...view.columnsProps} />
      <DataGrid label="Records" data={rows} columns={columns} {...view.tableProps} />
    </>
  );
}

// MediaCard's default aspect, Text as an inline element and headings
export const card = <MediaCard src="/a.jpg" alt="" title="hero.jpg" aspect="4/3" />;
export const texts = [<Text as="span">a</Text>, <Text as="h2">b</Text>, <Text as="h3">c</Text>, <Text as="h4">d</Text>];

// typed, not any
export const viewer = <MediaViewer open items={[{ src: '/a.jpg' }]} onClose={() => {}} />;
export function Layout() {
  const layout = useAppLayout();
  if (layout) { layout.setWidth(320); const release = layout.claimPage('detail'); release(); }
  return null;
}

// wrong code still fails
// @ts-expect-error aspect is one of the listed shapes
export const badAspect = <MediaCard aspect="7/5" />;
// @ts-expect-error the layout's width is a number
export const badWidth = () => useAppLayout()?.setWidth('wide');
type IsAny<T> = 0 extends (1 & T) ? true : false;
export const layoutTyped: IsAny<ReturnType<typeof useAppLayout>> = false;
export const aliasTyped: IsAny<typeof DataTable> = false;
export const viewerTyped: IsAny<typeof MediaViewer> = false;
