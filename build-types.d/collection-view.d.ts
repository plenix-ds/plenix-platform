export interface CollectionField<Row = Record<string, unknown>> { value:string; label?:React.ReactNode; kind?:string; get?:(row:Row)=>unknown; options?:Array<{value:string|number|boolean;label?:React.ReactNode;color?:string}>; [option:string]:unknown; }
export interface CollectionLevel {field:string;dir?:'asc'|'desc';hideEmpty?:boolean;}
export interface CollectionFilter {join:'and'|'or';items:Array<{field?:string;op?:string;value?:unknown;group?:boolean;join?:'and'|'or';items?:CollectionFilter['items']}>;}
export interface CollectionColumns {order:string[];hidden:string[];}
export interface CollectionDisplay {layout:'list'|'gallery';size:'s'|'m'|'l';height:'short'|'medium'|'tall'|'extra-tall';}
export type CollectionQuickValue=Array<string|number|boolean>|{preset:string;from?:string;to?:string};
export interface CollectionViewOptions<Row> {text?:(row:Row)=>string;data?:Row[];today?:string;storageKey?:string;sort?:CollectionLevel[];columns?:CollectionColumns;view?:Partial<CollectionDisplay>;quick?:Record<string,'list'|'date'|{kind:'list'|'date'|'single';required?:boolean;options?:CollectionField<Row>['options']}>;}
export interface CollectionView<Row> {
  search:string;filter:CollectionFilter;quick:Record<string,CollectionQuickValue>;sort:CollectionLevel[];group:CollectionLevel[];columns:CollectionColumns;view:CollectionDisplay;
  setSearch:React.Dispatch<React.SetStateAction<string>>;setFilter:React.Dispatch<React.SetStateAction<CollectionFilter>>;setSort:React.Dispatch<React.SetStateAction<CollectionLevel[]>>;setGroup:React.Dispatch<React.SetStateAction<CollectionLevel[]>>;setColumns:React.Dispatch<React.SetStateAction<CollectionColumns>>;setView:React.Dispatch<React.SetStateAction<CollectionDisplay>>;
  setQuick(key:string,value:CollectionQuickValue):void;reset():void;test(row:Row):boolean;count(rows:Row[]):number;table:React.MutableRefObject<DataGridController<Row>|null>;
  searchProps:{value:string;onChange(event:React.ChangeEvent<HTMLInputElement>):void;onClear():void};
  filterProps:{fields:CollectionField<Row>[];value:CollectionFilter;onChange:CollectionView<Row>['setFilter']};
  sortProps:{fields:CollectionField<Row>[];value:CollectionLevel[];onChange:CollectionView<Row>['setSort'];grouped:boolean};
  groupProps:{fields:CollectionField<Row>[];value:CollectionLevel[];onChange:CollectionView<Row>['setGroup'];table:CollectionView<Row>['table']};
  columnsProps:{fields:CollectionField<Row>[];value:CollectionColumns;onChange:CollectionView<Row>['setColumns']};
  viewProps:{value:CollectionDisplay;onChange:CollectionView<Row>['setView'];onReset():void};
  quickProps(key:string):{kind:string;required:boolean;value:CollectionQuickValue;onChange(value:CollectionQuickValue):void;counts?:Map<unknown,number>};
  tableProps:{filter(row:Row):boolean;sort:CollectionLevel[];groupBy:string[]|false;columnOrder:string[];hiddenColumns:string[];rowHeight:CollectionDisplay['height'];onReady(controller:DataGridController<Row>):void};
}
export declare function useCollectionView<Row = Record<string,unknown>>(fields:CollectionField<Row>[],options?:CollectionViewOptions<Row>):CollectionView<Row>;
