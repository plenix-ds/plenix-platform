/* Plenix · RenditionList
   Summary: Stored derivatives with format and byte size, as a DataTable or a menu of downloads.
   Usage: <RenditionList items={renditions} variant="table"/>
   Props:
     items: [{ id, name, format, size, href, fileName, onDownload, progress }]; stored derivatives.
     variant: "table" (default) | "menu".
     strings: { label, name, format, size, download, empty }.
     className: extra classes on the outer layout.
   Behavior: Each action downloads the specific stored rendition; busy downloads cannot repeat.
   Notes: Links retain browser download behavior. File preparation belongs to the caller.
*/
import React from 'react';
import { Stack, Inline } from '../../components/Stack/Stack.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { Notice } from '../../components/Notice/Notice.jsx';
import { Text } from '../../components/Text/Text.jsx';
import { cx } from '../../utils/cx.js';
import { DataTable } from '../../components/DataTable/DataTable.jsx';
import { DownloadButton } from '../../components/DownloadButton/DownloadButton.jsx';
import { Menu,MenuItem } from '../../components/Menu/Menu.jsx';
import { formatBytes } from '../../utils/format.js';
const STRINGS={label:'Renditions',name:'Name',format:'Format',size:'Size',download:'Download',empty:'No renditions.'};
export function RenditionList({items=[],variant='table',strings,className}){
 const t={...STRINGS,...strings};
 const download=r=><DownloadButton href={r.href} fileName={r.fileName||r.name} format={r.format} size={r.size} onDownload={r.onDownload} progress={r.progress} strings={{download:t.download}} disabled={!r.href&&!r.onDownload}/>;
 if(!items.length)return <Text className={cx('plx-rendition-list',className)}>{t.empty}</Text>;
 return <Stack className={cx('plx-rendition-list',className)}>{variant==='menu'?<Menu label={t.label} trigger={<Button icon="download-tray">{t.label}</Button>}>{items.map(r=><MenuItem className="plx-rendition-list__item" key={r.id} disabled={r.progress!==undefined||(!r.href&&!r.onDownload)} href={r.href} download={r.fileName||r.name} onSelect={r.onDownload}>{[r.name,r.format,typeof r.size==='number'?formatBytes(r.size):''].filter(Boolean).join(' · ')}</MenuItem>)}</Menu>:<DataTable label={t.label} data={items} columns={[{field:'name',title:t.name,kind:'data'},{field:'format',title:t.format,kind:'data'},{field:'size',title:t.size,kind:'data',render:r=>typeof r.size==='number'?formatBytes(r.size):''},{field:'_download',title:t.download,kind:'center',render:download}]} />}</Stack>;
}
