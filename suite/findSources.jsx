/* Plenix suite · the Search workspace (suite/findSources.jsx). Pressing Enter in the header search opens it in
   the main work area: inside an application (Notes, Files…) it searches only that application, with that application's
   filters; on the dashboard home it searches everything, with a Section filter. Each source says what its rows are, which
   text is searched, its filters and its result columns; FindWorkspace draws them with the Platform SearchWorkspace. */
import { SearchWorkspace, DataTable, Tag, Badge, Button } from 'plenix-platform';
import { ALL_BOOKMARKS, ALL_FILES, ALL_NOTES, ALL_TASKS, CAL_EVENTS, CONTACTS, PROJECTS, THREADS } from './shared.jsx';
const {useState}=React;

const PRI={high:"High",med:"Medium",low:"Low"};
const cap=(s)=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
// each source: label, noun, rows() → [{ key, name, sub, cells, facets, open }], filters, columns (Tabulator column
// definitions for the DataTable; a grid row is the source row's cells with its key as id, its name and its facets)
export const FIND_SOURCES={
  projects:{label:"Projects",noun:"project",filters:[{id:"status",label:"Status"},{id:"tags",label:"Tags",multiple:true}],
    columns:[{title:"Project",field:"name",kind:"name"},{title:"Status",field:"status",kind:"center",render:r=><Badge tone={r.status==="Active"?"success":"neutral"}>{r.status}</Badge>},{title:"Tags",field:"tags"},{title:"Files",field:"files",kind:"data",hozAlign:"right",headerHozAlign:"right"}],
    rows:()=>PROJECTS.map(p=>({key:"p"+p.id,name:p.name,sub:p.desc,cells:{status:cap(p.status),tags:p.tags.join(", "),files:p.files},facets:{status:cap(p.status),tags:p.tags}}))},
  messaging:{label:"Messages",noun:"conversation",filters:[{id:"ch",label:"Channel",multiple:true}],
    columns:[{title:"Conversation",field:"name",kind:"name"},{title:"Last message",field:"preview"},{title:"Channel",field:"ch"},{title:"Time",field:"time",kind:"data"}],
    rows:()=>THREADS.map(t=>({key:"t"+t.id,id:t.id,name:t.name,sub:t.preview,cells:{preview:t.preview,ch:t.ch,time:t.time},facets:{ch:t.ch}}))},
  contacts:{label:"Contacts",noun:"contact",filters:[{id:"co",label:"Company",multiple:true}],
    columns:[{title:"Name",field:"name",kind:"name"},{title:"Role",field:"role"},{title:"Company",field:"co"}],
    rows:()=>CONTACTS.map(c=>({key:"c"+c.id,name:c.name,sub:c.role+" · "+c.co,cells:{role:c.role,co:c.co},facets:{co:c.co}}))},
  calendar:{label:"Calendar",noun:"event",filters:[{id:"cal",label:"Calendar",multiple:true}],
    columns:[{title:"Event",field:"name",kind:"name"},{title:"Date",field:"date",kind:"data"},{title:"Time",field:"time",kind:"data"},{title:"Calendar",field:"cal"}],
    rows:()=>CAL_EVENTS.map(e=>({key:"e"+e.id,name:e.title,sub:"Mar "+e.date+" · "+e.time,cells:{date:"Mar "+e.date,time:e.time,cal:cap(e.cal)},facets:{cal:cap(e.cal)}}))},
  tasks:{label:"Tasks",noun:"task",filters:[{id:"proj",label:"Project",multiple:true},{id:"pri",label:"Priority"},{id:"state",label:"Status"}],
    columns:[{title:"Task",field:"name",kind:"name"},{title:"Project",field:"proj"},{title:"Priority",field:"pri"},{title:"Due",field:"due",kind:"data"},{title:"Status",field:"state"}],
    rows:()=>ALL_TASKS.map(t=>({key:"k"+t.id,name:t.title,sub:t.proj,cells:{proj:t.proj,pri:PRI[t.pri]||t.pri,due:t.due,state:t.done?"Done":"Open"},facets:{proj:t.proj,pri:PRI[t.pri]||t.pri,state:t.done?"Done":"Open"}}))},
  notes:{label:"Notes",noun:"note",filters:[{id:"folder",label:"Folder",multiple:true},{id:"tags",label:"Tags",multiple:true}],
    columns:[{title:"Note",field:"name",kind:"name"},{title:"Folder",field:"folder"},{title:"Tags",field:"tags",kind:"center",render:r=>r.facets.tags.map(t=><Tag key={t}>{t}</Tag>)},{title:"Date",field:"date",kind:"data"}],
    rows:()=>ALL_NOTES.map(n=>({key:"n"+n.id,name:n.title,sub:n.preview,cells:{folder:n.folder,date:n.date},facets:{folder:n.folder,tags:n.tags}}))},
  bookmarks:{label:"Bookmarks",noun:"bookmark",filters:[{id:"col",label:"Collection",multiple:true},{id:"tags",label:"Tags",multiple:true}],
    columns:[{title:"Bookmark",field:"name",kind:"name"},{title:"Site",field:"url",kind:"data"},{title:"Collection",field:"col"},{title:"Date",field:"date",kind:"data"}],
    rows:()=>ALL_BOOKMARKS.map(b=>({key:"b"+b.id,name:b.title,sub:b.url,cells:{url:b.url,col:b.col,date:b.date},facets:{col:b.col,tags:b.tags}}))},
  files:{label:"Files",noun:"file",filters:[{id:"t",label:"Type",multiple:true},{id:"folder",label:"Folder",multiple:true}],
    columns:[{title:"Name",field:"name",kind:"name"},{title:"Type",field:"t",kind:"data"},{title:"Size",field:"s",kind:"data",hozAlign:"right",headerHozAlign:"right"},{title:"Folder",field:"folder"},{title:"Modified",field:"d",kind:"data"}],
    rows:()=>ALL_FILES.map((f,i)=>({key:"f"+i,name:f.name,sub:f.folder,cells:{t:f.t,s:f.s,folder:f.folder,d:f.d},facets:{t:f.t,folder:f.folder}}))},
};
// the dashboard home: everything, with the section each row comes from
const ALL={label:"Everything",noun:"result",filters:[{id:"section",label:"Section",multiple:true}],
  columns:[{title:"Name",field:"name",kind:"name"},{title:"Section",field:"section"},{title:"Details",field:"sub"}],
  rows:()=>[].concat.apply([],Object.keys(FIND_SOURCES).map(id=>FIND_SOURCES[id].rows().map(r=>({...r,key:id+":"+r.key,app:id,cells:{...r.cells,section:FIND_SOURCES[id].label,sub:r.sub},facets:{...r.facets,section:FIND_SOURCES[id].label}}))))};

const optsOf=(rows,id)=>{const all=[].concat.apply([],rows.map(r=>[].concat(r.facets[id]===undefined?[]:r.facets[id])));return Array.from(new Set(all)).sort().map(v=>({value:v,label:String(v),count:all.filter(x=>x===v).length}));};

/* the workspace: app is a dashboard application id, or "home" for everything; onOpen(row, appId) opens a result */
export function FindWorkspace({app,query,onQuery,onOpen,onAskAI}){
  const src=app==="home"?ALL:FIND_SOURCES[app];
  const [filters,setFilters]=useState({});
  const [sort,setSort]=useState("Relevance");
  const rows=src.rows();
  const words=query.toLowerCase().split(/\s+/).filter(Boolean);
  let found=rows.filter(r=>{
    const hay=[r.name,r.sub].concat(Object.values(r.cells).map(String)).concat([].concat.apply([],Object.values(r.facets).map(v=>[].concat(v)))).join(" ").toLowerCase();
    if(words.some(w=>hay.indexOf(w)<0))return false;
 // a filter with several choices keeps rows that have any of them; a single choice must match
    return src.filters.every(f=>{
      const v=filters[f.id],has=[].concat(r.facets[f.id]===undefined?[]:r.facets[f.id]);
      if(f.multiple)return !(v&&v.length)||v.some(x=>has.indexOf(x)>=0);
      return !v||has.indexOf(v)>=0;
    });
  });
  if(sort==="Name A–Z")found=found.slice().sort((a,b)=>a.name.localeCompare(b.name));
  if(sort==="Name Z–A")found=found.slice().sort((a,b)=>b.name.localeCompare(a.name));
  const defs=src.filters.map(f=>({...f,options:optsOf(rows,f.id),value:f.multiple?(filters[f.id]||[]):(filters[f.id]||null)}));
  return(
    <div className="plx-u-px-32px plx-u-py-24px plx-u-flex-1 plx-u-flex plx-u-flex-column plx-u-min-h-0 plx-u-overflow-y-auto">
      <SearchWorkspace title={query?"Search results":"Search"} query={query} onQueryChange={onQuery} noun={src.noun}
        placeholder={app==="home"?"Search files, notes, tasks, contacts…":"Search "+src.label.toLowerCase()+"…"} count={found.length}
        filters={defs} onFilterChange={(id,v)=>setFilters({...filters,[id]:v})} onClearAll={()=>setFilters({})}
        sort={{value:sort,options:["Relevance","Name A–Z","Name Z–A"],onChange:setSort}}
        headEnd={app==="home"&&onAskAI?<Button size="sm" icon="sparkle" onClick={()=>onAskAI(query)}>Ask AI</Button>:null}>
        <DataTable label={(app==="home"?"Everything":src.label)+" search results"} columns={src.columns}
          data={found.map(r=>({...r.cells,id:r.key,name:r.name,facets:r.facets}))}
          on={{rowClick:(e,row)=>{const r=found.find(x=>x.key===row.getData().id);if(r)onOpen(r,r.app||app);}}}/>
      </SearchWorkspace>
    </div>
  );
}
