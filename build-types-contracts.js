// Precise contracts for structural values and callbacks whose shapes cannot be inferred from string defaults.
const fs=require('fs'),path=require('path');
const contracts={
DataGrid: `export interface DataGridColumn<Row = Record<string, unknown>> {
  field?: string; title?: React.ReactNode; kind?: string | string[]; type?: string;
  width?: number | string; minWidth?: number | string; maxWidth?: number | string;
  frozen?: boolean; rowLabel?: boolean; visible?: boolean; filter?: boolean | 'list';
  render?: (record: Row) => React.ReactNode;
  sorter?: 'string' | 'number' | 'date' | ((a: unknown,b: unknown,rowA: Row,rowB: Row,field: string,direction: 'asc'|'desc') => number);
  summary?: 'sum' | 'count' | 'average' | 'min' | 'max'; empty?: React.ReactNode;
  [option: string]: unknown;
}
export interface DataGridController<Row = Record<string, unknown>> { getData(): Row[]; [method: string]: unknown; }
export interface DataGridProps<Row = Record<string, unknown>> extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onSelect'> {
  label?: string; data?: Row[]; columns?: DataGridColumn<Row>[]; index?: string;
  selectable?: boolean; selected?: Array<string | number>; keepHiddenSelection?: boolean;
  onSelectionChange?: (keys: Array<string|number>, info: {count:number;hidden:number}) => void;
  onRowClick?: (record: Row,event: React.MouseEvent<HTMLElement>) => void;
  onRowDoubleClick?: (record: Row,event: React.MouseEvent<HTMLElement>) => void;
  onCellEdit?: (record: Row, change: {field:string;value:unknown;previous:unknown}) => void;
  onReady?: (controller: DataGridController<Row>) => void;
  filter?: (record: Row) => boolean; sort?: Array<{field:string;dir?:'asc'|'desc'}>;
  groupBy?: string | string[] | false; columnOrder?: string[]; hiddenColumns?: string[];
  rowHeight?: 'short'|'medium'|'tall'|'extra-tall'; [option: string]: unknown;
}
export declare function DataGrid<Row = Record<string, unknown>>(props: DataGridProps<Row> & React.RefAttributes<HTMLElement>): React.ReactElement | null;
export declare namespace DataGrid { function preload(): void; function useActions(...args: any[]): any; }`,
Tabs: `export interface TabsItem { value: string; label: React.ReactNode; icon?: React.ReactNode; count?: number; content?: React.ReactNode; disabled?: boolean; }
export interface TabsProps {
  variant?: 'contained'|'folder'|'segmented'; orientation?: 'horizontal'|'vertical'; items: TabsItem[];
  value?: string; defaultValue?: string; onChange?: (value: string) => void; label?: string;
  idBase?: string; className?: string; panelClassName?: string; strings?: {more?:string;moreLabel?:string};
}
export declare const Tabs: React.ComponentType<TabsProps>;`,
MediaViewer: `export interface MediaViewerItem { src: string; alt?: string; title?: React.ReactNode; meta?: React.ReactNode[]; kind?: 'image'|'video'; poster?: string; audio?: string; tracks?: Array<{src:string;kind?:string;label?:string;srcLang?:string;default?:boolean}>; }
export interface MediaViewerProps { open?: boolean; onClose?: () => void; items: MediaViewerItem[]; index?: number; defaultIndex?: number; onIndexChange?: (index:number) => void; label?: string; actions?: React.ReactNode; className?: string; strings?: Partial<Record<'label'|'close'|'previous'|'next'|'counter',string>>; }
export declare const MediaViewer: React.ComponentType<MediaViewerProps>;`,
useAppLayout: `export interface AppLayoutBack { label: React.ReactNode; onBack(): void; ref?: React.RefObject<HTMLElement | null>; }
export interface AppLayoutState {
  mode: 'inline'|'rail'|'overlay'|'bar'|'screen'|'none'; open:boolean; expanded:boolean; width:number|null;
  setWidth(width:number):void; toggle():void; close():void; small:boolean; narrow:boolean;
  barEl:HTMLElement|null; parentEl:HTMLElement|null; slotEl:HTMLElement|null; hasSideNav:boolean;
  page:string; layout:'fluid'|'contained'|'hybrid'|'multi-pane'|'focus';
  claimPage(kind:string):()=>void; parentRow:boolean; claimParentRow():()=>void;
  detailBack:AppLayoutBack|null; claimBack(back:AppLayoutBack):()=>void;
}
export declare function useAppLayout(): AppLayoutState | null;`
};
module.exports=function contract(name,platform){
  if(name==='useCollectionView') {
    const adjacent=path.join(platform,'hooks/useCollectionView.types.d.ts');
    if(fs.existsSync(adjacent)) return fs.readFileSync(adjacent,'utf8');
    return fs.readFileSync(path.join(__dirname,'build-types.d/collection-view.d.ts'),'utf8');
  }
  return contracts[name] || null;
};
