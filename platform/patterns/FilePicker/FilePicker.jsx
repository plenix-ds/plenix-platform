/* Plenix · FilePicker
   Summary: Pick stored files, assets or media from a folder tree in a dialog.
   Usage: <FilePicker open items={items} folders={folders} onPick={saveSelection} onClose={close}/>
   Props:
     open: show the dialog; default false.
     onClose(): cancel or close after successful persistence.
     items: [{ id, name, kind, type, folderId, size, disabled, asset }]; stored files.
     folders: Tree nodes for stored folders.
     mode: "files" (default) | "assets" | "media"; assets requires asset=true or kind="asset".
     multiple: allow several selected items; default false.
     initialSelected: selected file ids when opening.
     onPick(items): asynchronous persistence callback for explicit Choose.
     strings: { title, all, folders, search, empty, pick, cancel, failed }; plus FileRow strings.
     className: extra classes on the dialog content layout.
   Behavior: Folder and query filter visible rows; selection survives filters, but invalid/deleted items never submit.
     Cancel never commits; pending writes cannot repeat or dismiss. Reopening clears query and stale requests.
   Notes: Uses Tree and FileRow directly; no dependency on FileBrowser or implicit device access.
*/
import React from 'react';
import { Stack, Inline } from '../../components/Stack/Stack.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { Notice } from '../../components/Notice/Notice.jsx';
import { Text } from '../../components/Text/Text.jsx';
import { cx } from '../../utils/cx.js';
import { Dialog } from '../../components/Dialog/Dialog.jsx';
import { Tree } from '../../components/Tree/Tree.jsx';
import { FileRow,FileRowList } from '../../components/FileRow/FileRow.jsx';
import { SearchField } from '../../components/SearchField/SearchField.jsx';
const STRINGS={title:'Choose files',all:'All files',folders:'Folders',search:'Search files',empty:'No matching files.',pick:'Choose',cancel:'Cancel',failed:'Files could not be chosen. Try again.'};
export function FilePicker({open=false,onClose,items=[],folders=[],mode='files',multiple=false,initialSelected=[],onPick,strings,className}){
 const t={...STRINGS,...strings},[selected,setSelected]=React.useState(initialSelected),[folder,setFolder]=React.useState(null),[query,setQuery]=React.useState(''),[busy,setBusy]=React.useState(false),[error,setError]=React.useState('');
 const lock=React.useRef(false),epoch=React.useRef(0);
 React.useEffect(()=>{epoch.current++;lock.current=false;setBusy(false);setError('');setQuery('');setFolder(null);setSelected(initialSelected);return()=>{epoch.current++;};},[open]);
 const eligible=items.filter(f=>f.kind!=='folder'&&!f.disabled&&(mode!=='media'||/^(image|video|audio)\//.test(f.type||''))&&(mode!=='assets'||f.asset===true||f.kind==='asset'));
 const chosen=eligible.filter(f=>selected.includes(f.id));
 const visible=eligible.filter(f=>(folder===null||f.folderId===folder)&&f.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
 const toggle=(id,on)=>setSelected(v=>multiple?(on?[...new Set(v.concat(id))]:v.filter(x=>x!==id)):(on?[id]:[]));
 const pick=async()=>{if(lock.current||!chosen.length||!onPick)return;lock.current=true;setBusy(true);setError('');const at=epoch.current;try{await onPick(chosen);if(at===epoch.current)onClose?.();}catch(e){if(at===epoch.current)setError(e?.message||t.failed);}finally{if(at===epoch.current){lock.current=false;setBusy(false);}}};
 return <Dialog open={open} onClose={onClose} dismissible={!busy} title={t.title} size="lg" footer={<Inline justify="end"><Button disabled={busy} onClick={onClose}>{t.cancel}</Button><Button variant="primary" disabled={busy||!chosen.length||!onPick} onClick={pick}>{t.pick}</Button></Inline>}>
 <Stack className={cx('plx-file-picker',className)}>{folders.length?<><Button variant="ghost" disabled={busy} aria-pressed={folder===null} onClick={()=>setFolder(null)}>{t.all}</Button><Tree label={t.folders} nodes={folders} selected={folder} onSelect={id=>{if(!busy)setFolder(id);}}/></>:null}<SearchField label={t.search} value={query} disabled={busy} onChange={e=>setQuery(e.target.value)}/>
 {error?<Notice tone="danger">{error}</Notice>:null}{visible.length?<FileRowList label={t.title} inert={busy?'':undefined}>{visible.map(f=><FileRow strings={strings} as="li" key={f.id} file={f} selectable selected={selected.includes(f.id)} onSelectChange={on=>{if(!busy)toggle(f.id,on);}}/>)}</FileRowList>:<Text>{t.empty}</Text>}
 </Stack></Dialog>;
}
