import * as React from 'react';
import {DataGrid,DataGridColumn,DataTable,Tabs,MediaViewer,MediaCard,Text,useCollectionView,useAppLayout} from '../../packages/react';
type Row={id:number;name:string}; const rows:Row[]=[{id:1,name:'Alpha'}];
const columns:DataGridColumn<Row>[]=[{field:'name',title:'Name',render:row=>row.name}];
const grid=<DataGrid data={rows} columns={columns} onRowClick={row=>row.name.toUpperCase()}/>;
const alias=<DataTable data={rows} columns={columns}/>;
const tabs=<Tabs items={[{value:'one',label:'One'}]} value="one" onChange={value=>value.toUpperCase()}/>;
const media=<MediaViewer items={[{src:'/a.png',kind:'image'}]} onIndexChange={index=>index.toFixed()}/>;
const card=<MediaCard aspect="4/3" title="Asset"/>; const text=<Text as="span">Text</Text>;
function View(){const view=useCollectionView([{value:'name',label:'Name'}],{data:rows,text:row=>row.name}); const shell=useAppLayout(); if(shell){const release=shell.claimPage('master-detail');release();shell.setWidth(320);}return <DataGrid data={rows} columns={columns} {...view.tableProps}/>;}
// @ts-expect-error columns are structural records, not a quoted string union
const badColumns=<DataGrid columns="name"/>;
// @ts-expect-error render receives Row
const badRender:DataGridColumn<Row>={render:row=>row.missing};
// @ts-expect-error Tabs callback receives a value, not a DOM event
const badTabs=<Tabs items={[]} onChange={(event:React.ChangeEvent<HTMLInputElement>)=>event.target.value}/>;
// @ts-expect-error media index is numeric
const badMedia=<MediaViewer items={[]} index="first"/>;
// @ts-expect-error only supported media kinds
const badKind=<MediaViewer items={[{src:'/a',kind:'spreadsheet'}]}/>;
// @ts-expect-error aspect must be a supported value
const badAspect=<MediaCard aspect="7/5"/>;
// @ts-expect-error row data is typed through the hook
useCollectionView([{value:'name'}],{data:rows,text:row=>row.missing});
// @ts-expect-error width must be numeric
useAppLayout()?.setWidth('wide');
type IsAny<T>=0 extends (1&T)?true:false;
const viewerTyped:false=null as unknown as IsAny<React.ComponentProps<typeof MediaViewer>>;
const layoutTyped:false=null as unknown as IsAny<ReturnType<typeof useAppLayout>>;
const collectionTyped:false=null as unknown as IsAny<ReturnType<typeof useCollectionView>>;
