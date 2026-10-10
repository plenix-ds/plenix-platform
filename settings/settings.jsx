/* Plenix · Settings (settings/settings.jsx): the settings page of the suite. Split out of app/plenix.jsx in batch 113;
   its own application folder since batch 149. Rebuilt from Platform components: the sections in the shell's NavPane as
   NavLists, each settings screen as SettingsSections of SettingsRows, categories as collapsible Panels with ColorSwatches,
   tags and project types as renamable Tags, the header style as RadioTiles; the documentation pages from Text,
   SectionHeadings, PropertyLists, Tables, Cards, Notices, Badges, Metrics and ProgressBars. The style guide now points at
   the design system (../platform/design-system/), the point of truth. */
import { Avatar, Badge, Button, choosePicture, Card, ChoiceList, CollapsibleSection, ColorPicker, ColorSwatch, DATA_COLORS, ContentGrid, Count, EmptyState, Inline, Input, Kbd, List, Metric, NavList, NavPane, Notice, PageContent, Panel, ProgressBar, PropertyList, RadioTiles, RecordPage, SearchField, SectionHeading, SegmentedControl, Select, SettingsRow, SettingsSection, SideNavPortal, Stack, Switch, Table, Tag, TagList, Text, useDensity, useSession, useTheme } from 'plenix-platform';
import { Ico } from '../suite/shared.jsx';
import { CatEditModal } from '../suite/classification.jsx';
const {useState}=React;
// a name/value table as a static Table (batches 229, 234: every table runs on Tabulator): rows [name, value, technical?]; the names
// are the row header, values wrap, a value may be any React content
const facts=(label,rows)=>{const list=rows.filter(Boolean);return <Table label={label} headerMenu={false} options={{headerVisible:false}}
  data={list.map((r,i)=>({id:i,name:r[0],value:typeof r[1]==="string"||typeof r[1]==="number"?String(r[1]):""}))}
  columns={[{title:"Name",field:"name",kind:"wrap",rowLabel:true,width:"--plx-ref-size-240px",headerSort:false},
    {title:"Value",field:"value",kind:"wrap",headerSort:false,render:d=>{const r=list[d.id];return r?(r[2]?<Text variant="data">{r[1]}</Text>:r[1]):null;}}]}/>;};

/* A feature's status as a Badge: [tone, label] */
const FEATURE_STATUS={done:["success","Done"],planned:["info","Planned"],wip:["warning","In progress"]};
/* A capability feature's status as a Badge: [tone, label] */
const CAP_STATUS={built:["success","Built"],planned:["info","Planned"],todo:["danger","Not started"]};
const capBadge=s=>{const m=CAP_STATUS[s]||CAP_STATUS.todo;return <Badge tone={m[0]}>{m[1]}</Badge>;};

/* Expandable feature drawer: a collapsible Panel with the status as a Badge */
export const FeatureDrawer=({item})=>{
  const s=FEATURE_STATUS[item.status]||FEATURE_STATUS.planned;
  return(
    <Panel collapsible defaultExpanded={false} headingLevel={3} title={item.label} actions={<Badge tone={s[0]}>{s[1]}</Badge>}>
      <Text as="p" variant="secondary">{item.desc}</Text>
    </Panel>
  );
};

/* A titled part of a documentation page */
const DocSection=({title,children})=>(
  <Stack gap="sm">
    <SectionHeading level={2}>{title}</SectionHeading>
    {children}
  </Stack>
);

/* Wraps content in n nested indented Stacks (the layer hierarchy) */
const indent=(n,el)=>n>0?<Stack indent>{indent(n-1,el)}</Stack>:el;

/* The full documentation of one capability */
function CapDoc({cap,backLabel,onBack,crumb}){
  const spec=cap.specification||{};
  const ui=cap.ui||{};
  const sections=[
    {title:"Baseline operations",content:(
      facts("Baseline operations",Object.entries(cap.baselineOps||{}).map(e=>[e[0].charAt(0).toUpperCase()+e[0].slice(1),e[1]==="Not started"?<Text variant="danger">{e[1]}</Text>:e[1]]))
    )},
    {title:"Features",content:(
      <Stack gap="xs">
        {(cap.features||[]).map(f=>(
          <Card key={f.id} title={f.name} actions={capBadge(f.status)}>
            <Text as="p" variant="secondary">{f.desc}</Text>
          </Card>
        ))}
      </Stack>
    )},
    {title:"Use cases",content:(
      <Stack gap="sm">
        {(cap.useCases||[]).map(uc=>(
          <Card key={uc.id} title={uc.title}>
            <PropertyList>
              {[["Actor",uc.actor],["Goal",uc.goal],["System response",uc.systemResponse],["Alternate flow",uc.alternateFlow]].map(r=>(
                <PropertyList.Item key={r[0]} label={r[0]}>{r[1]}</PropertyList.Item>
              ))}
              <PropertyList.Item label="Main flow">
                <Stack as="ol" gap="xs">
                  {(uc.mainFlow||[]).map((step,i)=>(
                    <Inline as="li" key={i} gap="sm" align="baseline"><Text variant="accent">{i+1}.</Text><Text>{step}</Text></Inline>
                  ))}
                </Stack>
              </PropertyList.Item>
            </PropertyList>
          </Card>
        ))}
      </Stack>
    )},
    {title:"Functionality",content:(
      facts("Functionality",(cap.functionality||[]).map(f=>[f.feature,f.behavior]))
    )},
    {title:"Scenarios",content:(
      <Table label="Scenarios" data={(cap.scenarios||[]).map((r,i)=>({...r,id:i}))} columns={[
        {title:"If",field:"condition",kind:"wrap",rowLabel:true,width:"--plx-ref-size-240px"},
        {title:"Then",field:"expected",kind:"wrap"},
      ]}/>
    )},
    {title:"Specification",content:(
      <Stack gap="sm">
        <Table label="Fields" data={(spec.ownFields||[]).map((f,i)=>({id:i,field:f.field+(f.required?" *":""),type:f.type,required:f.required?"Yes":"No",notes:f.notes||(f.default!==undefined?"Default: "+f.default:"")}))} columns={[
          {title:"Field",field:"field",kind:"name",rowLabel:true,width:"--plx-ref-size-240px"},
          {title:"Type",field:"type",kind:"data"},
          {title:"Required",field:"required"},
          {title:"Notes",field:"notes",kind:"wrap"},
        ]}/>
        <Text variant="secondary">+ 4 Anchor fields: <Text variant="data">projectType · projects[] · categories[] · tags[]</Text></Text>
        <Text variant="secondary">+ 3 base fields: <Text variant="data">id · createdAt · updatedAt</Text></Text>
        {(spec.rules||[]).length>0&&(
          <Stack gap="xs">
            <Text variant="eyebrow">Rules & Constraints</Text>
            <List label="Rules & Constraints" items={spec.rules.map(r=>({icon:"chevron-right",tone:"info",children:r}))}/>
          </Stack>
        )}
      </Stack>
    )},
    {title:"Enablers",content:(
      facts("Enablers",(cap.enablers||[]).map(e=>[e.name,e.desc]))
    )},
    {title:"UI",content:(
      facts("UI",[ui.screen&&ui.screen!=="Not started"&&["Screen",ui.screen,true],
        (ui.components||[]).length>0&&["Components",<Stack gap="xs">{ui.components.map((c,i)=><Text key={i}>{c}</Text>)}</Stack>],
        (ui.widgets||[]).length>0&&["Widgets",<Stack gap="xs">{ui.widgets.map((w,i)=><Text key={i} variant="data">{w}</Text>)}</Stack>]])
    )},
    {title:"Modules",content:(
      <TagList label="Modules">
        {(cap.modules||[]).map((m,i)=><Tag key={i}>{m==="Not started"?<Text variant="danger">{m}</Text>:m}</Tag>)}
      </TagList>
    )},
    {title:"Entity / Schema",content:(
      <Notice tone="info">
        <Inline gap="sm" wrap>
          <Text variant="eyebrow">Entity</Text>
          <Text variant="data">SCHEMA.types.{cap.entity}</Text>
          <Text variant="secondary">+</Text>
          <Text variant="data">SCHEMA.anchors</Text>
        </Inline>
      </Notice>
    )},
  ];
  return(
    <Stack gap="lg">
      <Inline gap="sm">
        <Button variant="ghost" size="xs" icon="arrow-left" onClick={onBack}>{backLabel}</Button>
        {crumb?<><Text variant="caption">Capabilities →</Text><Text variant="label">{cap.label}</Text></>:null}
      </Inline>
      <RecordPage.Header title={cap.label} description={cap.purpose} size="md" surface="card"
        meta={<Inline gap="sm"><Badge>{cap.layer}</Badge>{cap.stub?<Badge tone="danger">Not started</Badge>:null}</Inline>}/>
      {sections.map(s=><DocSection key={s.title} title={s.title}>{s.content}</DocSection>)}
    </Stack>
  );
}

  function DocsPanel({docSection,setDocSection}){
    const [selCap,setSelCap]=useState(null);
 /* About */
    if(docSection==="about") return(
      <Stack gap="lg">
        <RecordPage.Header title="About Plenix" description="The product, the name, and the vision behind it."/>
        <Panel title="Plenix" description={'"The completor" -- that which makes whole.'} actions={<Text variant="data">/PLEN-iks/</Text>}>
          <PropertyList>
            {(window.PV_NAME_ROWS||[]).map(r=><PropertyList.Item key={r.k} label={r.k}>{r.v}</PropertyList.Item>)}
          </PropertyList>
        </Panel>
        <DocSection title="Why it fits this product">
          <Text as="p">The entire vision of Plenix is about solving fragmentation. Context is lost. Data is duplicated. Retrieval fails. The result is an incomplete picture of your own information. Plenix is the answer to that incompleteness.</Text>
          {facts("Why Plenix fits",(window.PV_FIT||[]).map(p=>[p.principle,p.meaning]))}
        </DocSection>
        <DocSection title="Core data model">
          {facts("Core data model",(window.PV_MODEL||[]).map(m=>[m.name,m.desc]))}
        </DocSection>
        <Metric.Group label="Documentation figures">
          {[["Capabilities",74],["Features documented",807],["PRDs with content",50],["Project types",(window.ALL_PROJ_TYPES||[]).length]].map(s=>(
            <Metric key={s[0]} value={s[1]} label={s[0]}/>
          ))}
        </Metric.Group>
      </Stack>
    );

    if(docSection==="product-vision") return(
      <Stack gap="lg">
        <RecordPage.Header title="Product vision" description="The founding document. Why Plenix exists, what it solves, and how it works."/>
        <DocSection title="The problem">
          <Text as="p">Modern digital life is fragmented. A single person may use 8-12+ separate tools daily just to stay organized. This creates three core pain points:</Text>
          <Stack gap="xs">
            {(window.PV_PROBLEMS||[]).map(p=>(
              <Card key={p.label} title={p.label}><Text as="p" variant="secondary">{p.desc}</Text></Card>
            ))}
          </Stack>
        </DocSection>
        <Notice tone="info">
          <Stack gap="xs">
            <Text variant="eyebrow">The vision</Text>
            <Text as="p" variant="strong">A single, AI-powered ecosystem that unifies how a person captures, organizes, connects, communicates, retrieves, and acts on all forms of personal information -- without duplicating data or replacing the heavy-duty tools they already use.</Text>
          </Stack>
        </Notice>
        <DocSection title="Core philosophy">
          {facts("Core philosophy",(window.PV_PHILOSOPHY||[]).map(ph=>[ph.p,ph.d]))}
        </DocSection>
        <DocSection title="What the platform unifies">
          <Table label="What the platform unifies" data={(window.PV_UNIFIES||[]).map((r,i)=>({id:i,silo:r[0],unified:r[1]}))} columns={[
            {title:"Traditional silo",field:"silo",kind:"wrap",rowLabel:true,width:"--plx-ref-size-240px"},
            {title:"Unified in Plenix",field:"unified",kind:"wrap"},
          ]}/>
        </DocSection>
        <DocSection title="Unified messaging hub">
          <Text as="p">A single interface aggregating SMS, MMS, WhatsApp, and future channels. Messages sent and received through native platforms -- Plenix is the interface, not the infrastructure.</Text>
          {facts("Unified messaging hub",(window.PV_MESSAGING||[]).map(s=>[s.label,s.desc]))}
        </DocSection>
        <DocSection title="Smart File Naming">
          <Panel title="Example" headingLevel={3}>
            <Stack gap="sm">
              <Inline gap="sm" wrap>
                <Text variant="danger"><s>IMG_4891.png</s></Text>
                <Text variant="secondary" aria-hidden="true">→</Text>
                <Text variant="success">2025-03-02_KitchenReno_ContractorQuote_ABCPlumbing.png</Text>
              </Inline>
              <Text variant="caption">Derived from: date + linked project + OCR content + identified contact. User always has final say.</Text>
            </Stack>
          </Panel>
        </DocSection>
        <DocSection title="Project home">
          <TagList label="Project home">
            {["Linked files","Notes","Tasks & calendar events","Bookmarks & media","Contacts","Message threads","Virtual meeting launcher"].map(i=><Tag key={i}>{i}</Tag>)}
          </TagList>
          <Notice tone="info">
            <Stack gap="xs">
              <Text variant="strong">The presentation use case</Text>
              <Text as="p">Today a user presenting on Zoom alt-tabs frantically between PowerPoint, a spreadsheet, file explorer, and notes. With Project Home, all linked resources are accessible from one workspace. The project view becomes the cockpit for the meeting -- everything is one click away, not five windows deep.</Text>
            </Stack>
          </Notice>
        </DocSection>
        <DocSection title="Key use cases">
          {facts("Key use cases",(window.PV_USECASES||[]).map((u,i)=>[(i+1)+". "+u.uc,u.d]))}
        </DocSection>
        <DocSection title="What Plenix is not">
          <List label="What Plenix is not" items={(window.PV_NOT||[]).map(n=>({icon:"close",tone:"danger",children:n}))}/>
        </DocSection>
      </Stack>
    );

    if(docSection==="terminology") return(
      <Stack gap="lg">
        <RecordPage.Header title="Terminology" description="Plenix mapped to standard software development structure. Use these definitions consistently across design, development, and documentation."/>

        {/* Layer legend */}
        <TagList label="Layers">
          {["1 Product","2 Feature","3 Usage","4 Behavior","5 Scenario","6 Spec","7 Enabler","8 UI","9 Architecture","10 Data"].map(l=><Tag key={l}>{l}</Tag>)}
        </TagList>

        {/* 10 Layers */}
        {(window.TERM_LAYERS||[]).map(layer=>{
          // a layer's table: its headers as Tabulator columns (c0, c1…), its rows as grid rows; the first column names the row
          const tableColumns=t=>t.headers.map((h,j)=>({title:h,field:"c"+j,kind:"wrap",rowLabel:j===0,width:j===0?"--plx-ref-size-240px":undefined}));
          const tableRows=t=>t.rows.map((r,i)=>Object.assign({id:i},...r.map((v,j)=>({["c"+j]:v}))));
          return(
            <Panel key={layer.num} title={layer.num+". "+layer.term} description={layer.name}>
              <Stack gap="sm">
                <Text as="p">{layer.desc}</Text>
                {layer.note&&<Text variant="secondary">{layer.note}</Text>}
                {layer.table&&<Table label={layer.term} data={tableRows(layer.table)} columns={tableColumns(layer.table)}/>}
                {/* Sub-term (layer 4) */}
                {layer.subTerm&&(
                  <Stack gap="xs">
                    <Text variant="heading">{layer.subTerm} — {layer.subDesc}</Text>
                    <Table label={layer.subTerm} data={tableRows(layer.subTable)} columns={tableColumns(layer.subTable)}/>
                  </Stack>
                )}
                {/* Correction note */}
                {layer.correction&&<Notice tone="info"><Text variant="strong">Note: </Text>{layer.correction}</Notice>}
                {/* Schema note (layer 10) */}
                {layer.schemaNote&&<Notice tone="info">{layer.schemaNote}</Notice>}
              </Stack>
            </Panel>
          );
        })}

        {/* Hierarchy diagram */}
        <Panel title="How the layers relate">
          <Stack gap="xs">
            {(window.TERM_HIERARCHY||[]).map(item=>(
              <React.Fragment key={item.label}>
                {indent(item.indent||0,
                  <Inline gap="sm" align="baseline">
                    <Text variant={item.indent===0?"strong":"body"}>{item.label}</Text>
                    {item.note&&<Text variant="caption">— {item.note}</Text>}
                  </Inline>
                )}
              </React.Fragment>
            ))}
          </Stack>
        </Panel>

        {/* Fully mapped example */}
        <Panel title="Fully mapped example">
          {facts("Fully mapped example",window.TERM_EXAMPLE?Object.entries(window.TERM_EXAMPLE).map(entry=>{
            const labels={capability:"Capability",feature:"Feature",useCase:"Use case",functionality:"Functionality",scenario:"Scenario",specification:"Specification",enabler:"Enabler",ui:"UI",module:"Module",entity:"Entity",schema:"Schema"};
            const k=entry[0];const v=entry[1];
            const technical=v.includes("SCHEMA")||v.includes("Screen")||v.includes("Widget")||v.includes("Module");
            return [labels[k]||k,v,technical];
          }):[])}
        </Panel>
      </Stack>
    );

    if(docSection==="capabilities"){
      const cap=selCap&&(window.CAP_DOCS||{})[selCap];
      if(cap) return <CapDoc cap={cap} backLabel="Back" crumb onBack={()=>setSelCap(null)}/>;
 /* Capability list */
      return(
        <Stack gap="lg">
          <RecordPage.Header title="Capabilities" description="73 capabilities across 3 layers. Click any capability to view its full documentation."/>
          {(window.CAP_LAYERS||[]).map(layer=>{
            const groups=(window.CAPABILITY_GROUPS||[]).filter(g=>g.layer===layer.id);
            const total=groups.reduce((s,g)=>s+g.items.length,0);
            return(
              <Stack key={layer.id} gap="sm">
                <SectionHeading level={2} actions={<Text variant="secondary">{total} capabilities</Text>}>{layer.label}</SectionHeading>
                {groups.map(grp=>(
                  <Stack key={grp.id} gap="xs">
                    <Text variant="eyebrow">{grp.group}</Text>
                    <Inline gap="xs" wrap>
                      {grp.items.map(c=>{
                        const doc=(window.CAP_DOCS||{})[c.id];
                        const isStub=!doc||doc.stub;
                        return(
                          <Button size="xs" key={c.id} disabled={!doc} iconEnd={isStub?undefined:"circle-check"} onClick={()=>{if(doc)setSelCap(c.id);}}>
                            {c.label}
                            {isStub&&<Text variant="danger">Not started</Text>}
                          </Button>
                        );
                      })}
                    </Inline>
                  </Stack>
                ))}
              </Stack>
            );
          })}
          <Notice tone="info">✓ = documented · Not started = needs documentation. Click any capability to view or start documenting it.</Notice>
        </Stack>
      );
    }

 /* Data Model */
    if(docSection==="data-model"){
      const schema=window.SCHEMA||{anchorsApplied:[],types:{}};
      const types=schema.types||{};
      return(
        <Stack gap="lg">
          <RecordPage.Header title="Data model" description="Every item type in Plenix and the fields it carries. All types extend the 4 Anchor fields."/>

          {/* Anchors — the Classification Widget */}
          <Panel title="Anchors" description={'UI label: "Classification"'}>
            <Stack gap="sm">
              <Text as="p">The 4 universal fields present on every item in every capability. They connect items to the rest of the system — to projects, categories, and tags — enabling cross-cutting views, filtering, and retrieval.</Text>
              <Table label="Anchor fields" data={[
                ["projectType","string | null","Dropdown — single select from Settings > Project Types"],
                ["projects[]","string[]","Search-to-select with create — many-to-many"],
                ["categories[]","string[]","Grouped search-to-select with create — shows hierarchy"],
                ["tags[]","string[]","Grouped search-to-select with create — auto-lowercase-hyphen"],
              ].map((r,i)=>({id:i,field:r[0],type:r[1],ui:r[2]}))} columns={[
                {title:"Field",field:"field",kind:"name",rowLabel:true,width:"--plx-ref-size-240px"},
                {title:"Type",field:"type",kind:"data"},
                {title:"UI",field:"ui",kind:"wrap"},
              ]}/>
              <Text variant="secondary">Plus base fields on every item: <Text variant="data">id</Text> · <Text variant="data">createdAt</Text> · <Text variant="data">updatedAt</Text></Text>
            </Stack>
          </Panel>

          {/* Capabilities with Anchors */}
          <DocSection title={"Anchors applied to "+(schema.anchorsApplied||[]).length+" capabilities"}>
            <TagList label="Capabilities with anchors">
              {(schema.anchorsApplied||[]).map(c=><Tag key={c}>{c}</Tag>)}
            </TagList>
          </DocSection>

          {/* Item types */}
          <DocSection title={"Item Types ("+Object.keys(types).length+")"}>
            <Stack gap="sm">
              {Object.entries(types).map(entry=>{
                const key=entry[0];const type=entry[1];
                const fields=Object.entries(type.fields||{});
                const fieldCount=fields.length;
                return(
                  <Panel key={key} flush headingLevel={3} title={type.label} description={type.desc}
                    actions={<Inline gap="sm"><Ico n={type.icon||"file"}/><Text variant="data">{fieldCount} own field{fieldCount!==1?"s":""}</Text><Tag>{type.capability}</Tag></Inline>}>
                    <Table label={type.label+" fields"} empty="No own fields" data={fields.map(([n,d])=>({id:n,name:n+(d.required?" *":""),type:d.type,detail:d.enum?"enum: "+d.enum.join(", "):d.desc||d.unit?"unit: "+d.unit:""}))} columns={[
                      {title:"Field",field:"name",kind:"name",rowLabel:true,width:"--plx-ref-size-240px"},
                      {title:"Type",field:"type",kind:"data"},
                      {title:"Detail",field:"detail",kind:"wrap"},
                    ]}/>
                  </Panel>
                );
              })}
            </Stack>
          </DocSection>
          <Notice tone="info">* Required field. All item types also inherit the 4 Anchor fields + id + createdAt + updatedAt.</Notice>
        </Stack>
      );
    }

 /* Capability docs — individual capability */
    if(docSection&&docSection.startsWith("cap-")){
      const capKey=docSection.replace("cap-","");
      const cap=(window.CAP_DOCS||{})[capKey];
      if(!cap) return <EmptyState size="page" icon="doc-search" title={'Capability "'+capKey+'" not found.'}/>;
      return <CapDoc cap={cap} backLabel="Capabilities" onBack={()=>setDocSection("capabilities")}/>;
    }

 /* Overview */
    if(!docSection||docSection==="overview") return(
      <Stack gap="lg">
        <RecordPage.Header title="Documentation" description="Living documentation for Plenix -- architecture, features, and design system. Auto-generated from the codebase. Select a section from the sidebar."/>
        <ContentGrid size="lg" label="Documentation">
          <Card title="Style guide" onOpen={()=>setDocSection("style-guide")}>
            <Text as="p" variant="secondary">Design tokens, typography, color palette, spacing, and component patterns: the Plenix design system.</Text>
          </Card>
          <Card title="All feature areas" onOpen={()=>setDocSection("feat-"+window.FEATURES[0].area)}>
            <Text as="p" variant="secondary">{window.FEATURES.length+" areas, "+window.FEATURES.reduce((s,a)=>s+a.items.length,0)+" features documented."}</Text>
          </Card>
        </ContentGrid>
        <DocSection title="Feature areas">
          <ContentGrid size="md" label="Feature areas">
            {window.FEATURES.map(area=>{
              const done=area.items.filter(i=>i.status==="done").length;
              const pct=Math.round(done/area.items.length*100);
              return <Card key={area.area} title={area.area} meta={pct+"%"} accent={area.color} onOpen={()=>setDocSection("feat-"+area.area)}/>;
            })}
          </ContentGrid>
        </DocSection>
      </Stack>
    );

 /* Style Guide: the design system is the point of truth */
    if(docSection==="style-guide") return(
      <Stack gap="lg">
        <RecordPage.Header title="Style guide" description="Design tokens, typography, color, spacing and component patterns live in the Plenix design system."/>
        <Notice tone="info">The design system is the point of truth for every token and component in Plenix. This page no longer copies its values.</Notice>
        <Card title="Plenix Design System" href="../platform/design-system/" meta="../platform/design-system/">
          <Text as="p" variant="secondary">Tokens, typography, color palette, spacing, shadows and every Platform component, with their code.</Text>
        </Card>
      </Stack>
    );

 /* Feature area doc page */
    if(docSection&&docSection.startsWith("feat-")){
      const areaName=docSection.substring(5);
      const area=window.FEATURES.find(a=>a.area===areaName);
      if(!area) return null;
      return <FeatureArea area={area} stats/>;
    }
    return null;
  }

/* One feature area: its figures, its progress and its features */
function FeatureArea({area,stats}){
  const done=area.items.filter(i=>i.status==="done").length;
  const pct=Math.round(done/area.items.length*100);
  const planned=area.items.filter(i=>i.status==="planned").length;
  const inprog=area.items.filter(i=>i.status==="in-progress").length;
  return(
    <Stack gap="lg">
      <RecordPage.Header title={area.area} meta={stats?null:<Text variant="data">{done}/{area.items.length} done</Text>}/>
      {stats?(
        <Metric.Group label={area.area+" figures"}>
          <Metric value={area.items.length} label="Total"/>
          <Metric value={done} label="Done"/>
          <Metric value={inprog} label="In progress"/>
          <Metric value={planned} label="Planned"/>
          <Metric value={pct+"%"} label="Progress"/>
        </Metric.Group>
      ):null}
      <ProgressBar value={pct} color={area.color} size="sm" label={pct+"% complete"} labelHidden={!!stats}/>
      <Stack gap="xs">
        {area.items.map((item,i)=><FeatureDrawer key={i} item={item}/>)}
      </Stack>
    </Stack>
  );
}

// the theme: the themes the design system defines (THEMES); the choice is kept for every page (batch 219)
function ThemeChoice(){const {theme,setTheme,themes}=useTheme();return <Select aria-label="Theme" value={theme} onChange={(e)=>setTheme(e.target.value)} options={themes.map(t=>({value:t.name,label:t.label}))}/>;}

export function Settings({prefs,setPrefs,startCat="general",onBack}){
  const [cat,setCat]=useState(startCat);
  const {account,setPicture}=useSession(); // who is signed in (the Platform session)
  const [featArea,setFeatArea]=useState(null);
  const [featOpen,setFeatOpen]=useState(false);
  const [docOpen,setDocOpen]=useState(false);
  const [docSection,setDocSection]=useState(null);
  const set=(k,v)=>setPrefs(p=>({...p,[k]:v}));

 /* ── Categories state ── (each color is data the person chose; it reaches the page only through ColorSwatch) */
  const [cats,setCats]=useState([
    {id:1,name:"Personal",color:"green",icon:null,subs:[{id:11,name:"Health"},{id:12,name:"Finance"},{id:13,name:"Family"}]},
    {id:2,name:"Client Work",color:"blue",icon:null,subs:[{id:21,name:"Design"},{id:22,name:"Development"},{id:23,name:"Strategy"}]},
    {id:3,name:"Research",color:"purple",icon:null,subs:[{id:31,name:"Market Research"},{id:32,name:"Competitive Analysis"}]},
    {id:4,name:"Travel",color:"brown",icon:null,subs:[]},
    {id:5,name:"Archive",color:"grey",icon:null,subs:[]},
  ]);
  const [catEdit,setCatEdit]=useState(null);
  const [expandedCats,setExpandedCats]=useState(new Set([1,2,3]));
  const saveEdit=()=>{
    if(!catEdit||!catEdit.name.trim()) return;
    if(catEdit.type==='cat'){
      if(catEdit.isNew) setCats(prev=>[...prev,{id:Date.now(),name:catEdit.name.trim(),color:catEdit.color||"blue",icon:catEdit.icon||null,subs:[]}]);
      else setCats(prev=>prev.map(c=>c.id===catEdit.catId?{...c,name:catEdit.name.trim(),color:catEdit.color,icon:catEdit.icon||null}:c));
    } else {
      if(catEdit.isNew) setCats(prev=>prev.map(c=>c.id===catEdit.catId?{...c,subs:[...c.subs,{id:Date.now(),name:catEdit.name.trim()}]}:c));
      else setCats(prev=>prev.map(c=>c.id===catEdit.catId?{...c,subs:c.subs.map(s=>s.id===catEdit.subId?{...s,name:catEdit.name.trim()}:s)}:c));
    }
    setCatEdit(null);
  };
  const deleteCat=id=>setCats(prev=>prev.filter(c=>c.id!==id));
  const deleteSub=(catId,subId)=>setCats(prev=>prev.map(c=>c.id===catId?{...c,subs:c.subs.filter(s=>s.id!==subId)}:c));
  const toggleExpand=id=>setExpandedCats(prev=>{const n=new Set(prev);n.has(id)?n.delete(id):n.add(id);return n;});

 /* ── Tags state ── */
  const [tags,setTags]=useState([
    {id:1,name:"mountain"},{id:2,name:"snow"},{id:3,name:"lake"},{id:4,name:"architecture"},
    {id:5,name:"portrait"},{id:6,name:"nature"},{id:7,name:"urban"},{id:8,name:"aerial"},
    {id:9,name:"interior"},{id:10,name:"product"},{id:11,name:"black-and-white"},
    {id:12,name:"supplier"},{id:13,name:"VIP"},{id:14,name:"strategy"},{id:15,name:"Q2"},
    {id:16,name:"inspiration"},{id:17,name:"typography"},{id:18,name:"branding"},
  ]);
  const [tagSearch,setTagSearch]=useState("");
  const [tagAdding,setTagAdding]=useState(false);
  const [tagEditVal,setTagEditVal]=useState("");
  const tagName=v=>v.trim().toLowerCase().replace(/\s+/g,"-");
  const addTag=()=>{
    const n=tagName(tagEditVal);
    if(!n) return;
    if(!tags.some(t=>t.name===n))setTags(prev=>[...prev,{id:Date.now(),name:n}]);
    setTagAdding(false);setTagEditVal("");
  };
  const renameTag=(id,text)=>{const n=tagName(text);if(n)setTags(prev=>prev.map(t=>t.id===id?{...t,name:n}:t));};
  const deleteTag=id=>setTags(prev=>prev.filter(t=>t.id!==id));
  const cancelTag=()=>{setTagAdding(false);setTagEditVal("");};

 /* ── Project Types state ── */
  const defaultTypes=(window.PROJ_TYPES||[]).flatMap((g,gi)=>g.types.map((t,ti)=>({id:gi*100+ti+1,name:t,group:g.group})));
  const [projTypes,setProjTypes]=useState(defaultTypes);
  const [ptSearch,setPtSearch]=useState("");
  const [ptAdding,setPtAdding]=useState(false);
  const [ptEditVal,setPtEditVal]=useState("");
  const addPT=()=>{
    const n=ptEditVal.trim();
    if(!n) return;
    if(!projTypes.some(t=>t.name.toLowerCase()===n.toLowerCase()))setProjTypes(prev=>[...prev,{id:Date.now(),name:n,group:"Other"}]);
    setPtAdding(false);setPtEditVal("");
  };
  const renamePT=(id,text)=>{const n=text.trim();if(n)setProjTypes(prev=>prev.map(t=>t.id===id?{...t,name:n}:t));};
  const deletePT=id=>setProjTypes(prev=>prev.filter(t=>t.id!==id));
  const cancelPT=()=>{setPtAdding(false);setPtEditVal("");};

  const SETTINGS_CATS=[
    {id:"account",    label:"Account",      icon:"settings-profile"},
    {id:"appearance", label:"Appearance",   icon:"settings-customize"},
    {id:"calendar",   label:"Calendar",     icon:"calendar"},
    {id:"categories", label:"Categories",   icon:"settings-categories"},
    {id:"contacts",   label:"Contacts",     icon:"person"},
    {id:"dashboard",  label:"Dashboard",    icon:"home"},
    {id:"email",      label:"Email",        icon:"settings-email"},
    {id:"files",      label:"Files",        icon:"document"},
    {id:"general",    label:"General",      icon:"settings-general"},
    {id:"notes",      label:"Notes",        icon:"text-card"},
    {id:"projects",   label:"Projects",     icon:"briefcase"},
    {id:"projtypes",  label:"Project types",icon:"briefcase-plus"},
    {id:"tags",       label:"Tags",         icon:"tags"},
    {id:"tasks",      label:"Tasks",        icon:"circle-check"},
  ];

  const RowLabel=React.createContext(null);
  const Row=({label,desc,children})=>(<RowLabel.Provider value={label}><SettingsRow label={label} description={desc}>{children}</SettingsRow></RowLabel.Provider>);
  const Toggle=({val,onChange,label})=>{const row=React.useContext(RowLabel);return <Switch checked={!!val} onChange={e=>onChange(e.target.checked)} label={label||row||"On"} labelHidden/>;};
  const Seg=({opts,val,onChange,label})=>{const row=React.useContext(RowLabel);return <SegmentedControl label={label||row} value={val} onChange={onChange} options={opts.map(o=>({value:o.v,label:o.l}))}/>;};
 // the shared "Display density" choice (platform/providers/theme-boot.js): the same control and storage on every page
  const DensityChoice=()=>{const [d,setD]=useDensity();const opts=(window.PlenixWorkspace?window.PlenixWorkspace.densities():[]);return <ChoiceList legend="Display density" value={d} onChange={setD} options={opts}/>;};
 // a settings screen: its title, then its sections
  const Screen=({title,desc,children})=>(<Stack gap="lg"><RecordPage.Header title={title} description={desc}/>{children}</Stack>);
 // a new-item row (a tag, a project type): a field with Add and Cancel
  const AddRow=({label,value,onChange,placeholder,onAdd,onCancel})=>(
    <Panel title={label} headingLevel={2}>
      <Inline gap="sm">
        <Stack grow><Input autoFocus aria-label={label} value={value} onChange={onChange} placeholder={placeholder} onKeyDown={e=>{if(e.key==="Enter")onAdd();if(e.key==="Escape")onCancel();}}/></Stack>
        <Button variant="primary" onClick={onAdd} size="sm">Add</Button>
        <Button onClick={onCancel} size="sm">Cancel</Button>
      </Inline>
    </Panel>
  );
 // the accent colors to choose from: data handed to ColorSwatch (prefs.accent keeps the chosen value)
  
  const accent=DATA_COLORS.indexOf(prefs.accent)>=0?prefs.accent:DATA_COLORS[0];

  const visibleTags=tags.filter(t=>!tagSearch||t.name.includes(tagSearch.toLowerCase()));

  const panels={
    categories:(
      <Screen title="Categories" desc="Organize your projects, tasks, and content with custom categories and subcategories.">
        <Inline justify="end">
          <Button variant="primary" icon="plus" onClick={()=>setCatEdit({type:"cat",isNew:true,name:"",color:"blue",icon:null})}>New category</Button>
        </Inline>
        <Stack gap="xs">
          {cats.map(cat=>(
            <Panel key={cat.id} collapsible headingLevel={2} title={cat.name} expanded={expandedCats.has(cat.id)} onToggle={()=>toggleExpand(cat.id)}
              actions={<Inline gap="xs">
                <ColorSwatch category={cat.color} size="sm"/>
                <Text variant="secondary">{cat.subs.length} sub</Text>
                <Button size="xs" iconOnly icon="pencil" label={"Edit "+cat.name} onClick={()=>setCatEdit({type:"cat",catId:cat.id,isNew:false,name:cat.name,color:cat.color,icon:cat.icon||null})}/>
                <Button size="xs" iconOnly icon="trash" label={"Delete "+cat.name} onClick={()=>{if(window.confirm('Delete "'+cat.name+'"?'))deleteCat(cat.id);}}/>
              </Inline>}>
              <Stack gap="xs">
                {cat.subs.length===0&&<EmptyState title="No subcategories yet"/>}
                {cat.subs.map(sub=>(
                  <Inline key={sub.id} gap="xs">
                    <Stack grow><Text>{sub.name}</Text></Stack>
                    <Button variant="ghost" size="xs" iconOnly icon="pencil" label={"Edit "+sub.name} onClick={()=>setCatEdit({type:"sub",catId:cat.id,subId:sub.id,isNew:false,name:sub.name})}/>
                    <Button variant="ghost" size="xs" iconOnly icon="trash" label={"Delete "+sub.name} onClick={()=>deleteSub(cat.id,sub.id)}/>
                  </Inline>
                ))}
                <Inline><Button variant="ghost" size="xs" icon="plus" onClick={()=>setCatEdit({type:"sub",catId:cat.id,isNew:true,name:""})}>Add subcategory</Button></Inline>
              </Stack>
            </Panel>
          ))}
        </Stack>
        {catEdit&&<CatEditModal catEdit={catEdit} setCatEdit={setCatEdit} saveEdit={saveEdit}/>}
      </Screen>
    ),
    tags:(
      <Screen title="Tags" desc="Tags are flat keyword identifiers applied to any item -- images, notes, contacts, bookmarks, files, and more. Create them here and apply them anywhere.">
        <Inline gap="sm">
          <Stack grow><SearchField value={tagSearch} onChange={e=>setTagSearch(e.target.value)} onClear={()=>setTagSearch("")} placeholder="Search tags..." label="Search tags"/></Stack>
          <Button variant="primary" icon="plus" onClick={()=>{setTagAdding(true);setTagEditVal("");}}>New tag</Button>
        </Inline>
        <Text variant="secondary">{visibleTags.length} of {tags.length} tags</Text>
        {visibleTags.length>0?(
          <TagList label="Tags">
            {[...visibleTags].sort((a,b)=>a.name.localeCompare(b.name)).map(tag=>(
              <Tag key={tag.id} onRename={text=>renameTag(tag.id,text)} renameLabel={"Rename tag "+tag.name} onRemove={()=>deleteTag(tag.id)} removeLabel={"Delete tag "+tag.name}>{tag.name}</Tag>
            ))}
          </TagList>
        ):<EmptyState title="No tags match."/>}
        {tagAdding&&<AddRow label="New tag name" value={tagEditVal} onChange={e=>setTagEditVal(e.target.value.toLowerCase().replace(/\s+/g,"-"))} placeholder="tag-name" onAdd={addTag} onCancel={cancelTag}/>}
        <Notice tone="info">
          <Text variant="strong">How tags work:</Text> Tags are flat keywords -- no hierarchy. Click any tag name to rename it inline. Tags apply to images, notes, contacts, bookmarks, tasks, files, and any other item. Use them to describe content: <em>mountain, snow, supplier, VIP, Q2, typography, inspiration</em>.
        </Notice>
      </Screen>
    ),
    projtypes:(
      <Screen title="Project types" desc="Define the types of projects in your workspace. Applied when creating a project.">
        <Inline gap="sm">
          <Stack grow><SearchField value={ptSearch} onChange={e=>setPtSearch(e.target.value)} onClear={()=>setPtSearch("")} placeholder="Search project types..." label="Search project types"/></Stack>
          <Button variant="primary" icon="plus" onClick={()=>{setPtAdding(true);setPtEditVal("");}}>New type</Button>
        </Inline>
        {(()=>{
          const filtered=projTypes.filter(t=>!ptSearch||t.name.toLowerCase().includes(ptSearch.toLowerCase()));
          const groups={};filtered.forEach(t=>{if(!groups[t.group])groups[t.group]=[];groups[t.group].push(t);});
          if(filtered.length===0)return <EmptyState title="No project types match."/>;
          return Object.entries(groups).map(([grp,items])=>(
            <Stack key={grp} gap="sm">
              <SectionHeading level={2}>{grp}</SectionHeading>
              <TagList label={grp}>
                {items.sort((a,b)=>a.name.localeCompare(b.name)).map(pt=>(
                  <Tag key={pt.id} onRename={text=>renamePT(pt.id,text)} renameLabel={"Rename project type "+pt.name} onRemove={()=>deletePT(pt.id)} removeLabel={"Delete project type "+pt.name}>{pt.name}</Tag>
                ))}
              </TagList>
            </Stack>
          ));
        })()}
        {ptAdding&&<AddRow label="New project type name" value={ptEditVal} onChange={e=>setPtEditVal(e.target.value)} placeholder="e.g. Product Launch" onAdd={addPT} onCancel={cancelPT}/>}
        <Text variant="secondary">{projTypes.length} project types defined</Text>
      </Screen>
    ),
    general:(
      <Screen title="General" desc="Language, regional formats and core behavior.">
        <SettingsSection title="Regional">
          <Row label="Date format"><Seg opts={[{v:"mdy",l:"MM/DD/YY"},{v:"dmy",l:"DD/MM/YY"},{v:"iso",l:"ISO"}]} val={prefs.dateFmt||"mdy"} onChange={v=>set("dateFmt",v)}/></Row>
          <Row label="Time format"><Seg opts={[{v:"12",l:"12h"},{v:"24",l:"24h"}]} val={prefs.timeFmt||"12"} onChange={v=>set("timeFmt",v)}/></Row>
          <Row label="Language">
            <Select value={prefs.lang||"en"} onChange={e=>set("lang",e.target.value)} aria-label="Language">
              <option value="en">English</option><option value="fr">French</option><option value="de">German</option><option value="es">Spanish</option>
            </Select>
          </Row>
        </SettingsSection>
        <SettingsSection title="Behavior">
          <Row label="Animations" desc="Disable for reduced motion"><Toggle val={prefs.animations!==false} onChange={v=>set("animations",v)}/></Row>
          <Row label="Keyboard shortcut" desc="Open command palette"><Kbd>Ctrl K</Kbd></Row>
        </SettingsSection>
      </Screen>
    ),
    appearance:(
      <Screen title="Appearance" desc="Theme, header style, accent color and typography.">
        <SettingsSection title="Theme">
          <Row label="Theme" desc="The look of every Plenix application; themes are defined in the design system"><ThemeChoice/></Row>
          <Row label="Mode"><Seg opts={[{v:"light",l:"Light"},{v:"dark",l:"Dark"},{v:"system",l:"System"}]} val={prefs.theme||"light"} onChange={v=>set("theme",v)}/></Row>
        </SettingsSection>
        <DensityChoice/>
        <SettingsSection title="Header and accent">
          <Row label="Header bar style">
            <RadioTiles legend="Header bar style" legendHidden size="sm" value={prefs.headerBar||"blue"} onChange={v=>set("headerBar",v)} options={[
              {value:"blue",label:"Accent",preview:<ColorSwatch shape="square" tone="accent"/>},
              {value:"white",label:"White",preview:<ColorSwatch shape="square" tone="surface"/>},
              {value:"frost",label:"Frost",preview:<ColorSwatch shape="square" tone="frost"/>},
            ]}/>
          </Row>
          <Row label="Accent color">
            <ColorPicker label="Accent color" value={accent} onChange={h=>set("accent",h)}/>
          </Row>
        </SettingsSection>
        <SettingsSection title="Typography">
          <Row label="Font size"><Seg opts={[{v:"sm",l:"Small"},{v:"md",l:"Medium"},{v:"lg",l:"Large"}]} val={prefs.fontSize||"md"} onChange={v=>set("fontSize",v)}/></Row>
        </SettingsSection>
      </Screen>
    ),
    dashboard:(
      <Screen title="Dashboard" desc="Widget layout, columns and what appears on the home screen.">
        <SettingsSection title="Layout">
          <Row label="Column proportions"><Seg opts={[{v:"2-1-1",l:"50/25/25"},{v:"3-1-1",l:"60/20/20"},{v:"1-1-1",l:"Equal"}]} val={prefs.dashCols||"2-1-1"} onChange={v=>set("dashCols",v)}/></Row>
        </SettingsSection>
        <SettingsSection title="Widgets">
          <Row label="Show date/time strip" desc="Compact live clock above widgets"><Toggle val={prefs.showDateStrip!==false} onChange={v=>set("showDateStrip",v)}/></Row>
          <Row label="Drag-to-rearrange" desc="Drag handle on top of each widget card"><Toggle val={prefs.draggable!==false} onChange={v=>set("draggable",v)}/></Row>
        </SettingsSection>
      </Screen>
    ),
    projects:(
      <Screen title="Projects" desc="Card layout, visible fields and filtering options.">
        <SettingsSection title="Layout">
          <Row label="Default view"><Seg opts={[{v:"card",l:"Cards"},{v:"1",l:"List"}]} val={prefs.projDensity||"card"} onChange={v=>set("projDensity",v)}/></Row>
        </SettingsSection>
        <SettingsSection title="Visible fields">
          <Row label="Category"><Toggle val={prefs.projCategory!==false} onChange={v=>set("projCategory",v)}/></Row>
          <Row label="Status indicator"><Toggle val={prefs.projStatus!==false} onChange={v=>set("projStatus",v)}/></Row>
          <Row label="File count"><Toggle val={prefs.projFiles||false} onChange={v=>set("projFiles",v)}/></Row>
          <Row label="Tags"><Toggle val={prefs.projTags||false} onChange={v=>set("projTags",v)}/></Row>
          <Row label="Description"><Toggle val={prefs.projDesc||false} onChange={v=>set("projDesc",v)}/></Row>
        </SettingsSection>
        <SettingsSection title="Filtering">
          <Row label="Show archived projects"><Toggle val={prefs.projArchive||false} onChange={v=>set("projArchive",v)}/></Row>
          <Row label="Show paused projects"><Toggle val={prefs.projPaused!==false} onChange={v=>set("projPaused",v)}/></Row>
        </SettingsSection>
      </Screen>
    ),
    calendar:(
      <Screen title="Calendar" desc="Default view, week start and event display preferences.">
        <SettingsSection title="Display">
          <Row label="Default view"><Seg opts={[{v:"month",l:"Month"},{v:"week",l:"Week"},{v:"day",l:"Day"}]} val={prefs.calView||"month"} onChange={v=>set("calView",v)}/></Row>
          <Row label="Week starts on"><Seg opts={[{v:"sun",l:"Sunday"},{v:"mon",l:"Monday"}]} val={prefs.calStart||"sun"} onChange={v=>set("calStart",v)}/></Row>
          <Row label="Show event duration"><Toggle val={prefs.calDuration!==false} onChange={v=>set("calDuration",v)}/></Row>
        </SettingsSection>
        <SettingsSection title="Filtering">
          <Row label="Show declined events"><Toggle val={prefs.calDeclined||false} onChange={v=>set("calDeclined",v)}/></Row>
          <Row label="Widget shows today only" desc="Off = show next 3 days"><Toggle val={prefs.calTodayOnly!==false} onChange={v=>set("calTodayOnly",v)}/></Row>
        </SettingsSection>
      </Screen>
    ),
    tasks:(
      <Screen title="Tasks" desc="Sort order, display fields and widget quantity.">
        <SettingsSection title="Sorting & Filtering">
          <Row label="Sort by"><Seg opts={[{v:"due",l:"Due date"},{v:"pri",l:"Priority"},{v:"proj",l:"Project"}]} val={prefs.taskSort||"due"} onChange={v=>set("taskSort",v)}/></Row>
          <Row label="Show completed tasks"><Toggle val={prefs.taskShowDone||false} onChange={v=>set("taskShowDone",v)}/></Row>
        </SettingsSection>
        <SettingsSection title="Visible fields">
          <Row label="Priority dot"><Toggle val={prefs.taskPri!==false} onChange={v=>set("taskPri",v)}/></Row>
          <Row label="Project label"><Toggle val={prefs.taskProj!==false} onChange={v=>set("taskProj",v)}/></Row>
          <Row label="Due date"><Toggle val={prefs.taskDue!==false} onChange={v=>set("taskDue",v)}/></Row>
        </SettingsSection>
        <SettingsSection title="Widget">
          <Row label="Max tasks shown"><Seg opts={[{v:"5",l:"5"},{v:"7",l:"7"},{v:"10",l:"10"}]} val={prefs.taskMax||"7"} onChange={v=>set("taskMax",v)}/></Row>
        </SettingsSection>
      </Screen>
    ),
    notes:(
      <Screen title="Notes" desc="Editor preferences and default folder behavior.">
        <SettingsSection title="Display">
          <Row label="Default sort"><Seg opts={[{v:"date",l:"Date"},{v:"az",l:"A-Z"},{v:"folder",l:"Folder"}]} val={prefs.noteSort||"date"} onChange={v=>set("noteSort",v)}/></Row>
          <Row label="Show folder label in list"><Toggle val={prefs.noteFolder!==false} onChange={v=>set("noteFolder",v)}/></Row>
          <Row label="Show tags in list"><Toggle val={prefs.noteTags!==false} onChange={v=>set("noteTags",v)}/></Row>
        </SettingsSection>
        <SettingsSection title="Editor (Planned)">
          <Row label="Toolbar" desc="Format bar above note editor -- coming soon"><Toggle val={false} onChange={()=>{}}/></Row>
          <Row label="Word count" desc="Live word/char count -- coming soon"><Toggle val={false} onChange={()=>{}}/></Row>
        </SettingsSection>
      </Screen>
    ),
    files:(
      <Screen title="Files" desc="Browser layout, column visibility and cloud storage.">
        <SettingsSection title="Display">
          <Row label="Default sort"><Seg opts={[{v:"date",l:"Date"},{v:"name",l:"Name"},{v:"type",l:"Type"}]} val={prefs.fileSort||"date"} onChange={v=>set("fileSort",v)}/></Row>
          <Row label="Show AI badge"><Toggle val={prefs.fileAI!==false} onChange={v=>set("fileAI",v)}/></Row>
          <Row label="Show file size"><Toggle val={prefs.fileSize!==false} onChange={v=>set("fileSize",v)}/></Row>
          <Row label="Show folder column"><Toggle val={prefs.fileFolder!==false} onChange={v=>set("fileFolder",v)}/></Row>
        </SettingsSection>
        <SettingsSection title="Cloud storage">
          <Row label="Storage provider">
            <Select defaultValue="onedrive" aria-label="Storage provider">
              <option value="onedrive">OneDrive</option><option value="gdrive">Google Drive</option><option value="dropbox">Dropbox</option><option value="icloud">iCloud</option>
            </Select>
          </Row>
          <Row label="Auto-organize on upload" desc="AI suggests folder and filename"><Toggle val={prefs.fileAutoOrg!==false} onChange={v=>set("fileAutoOrg",v)}/></Row>
        </SettingsSection>
      </Screen>
    ),
    email:(
      <Screen title="Email" desc="Inbox display, signature and sync settings.">
        <SettingsSection title="Display">
          <Row label="Show avatar in widget"><Toggle val={prefs.emailAvatar!==false} onChange={v=>set("emailAvatar",v)}/></Row>
          <Row label="Show preview text"><Toggle val={prefs.emailPreview!==false} onChange={v=>set("emailPreview",v)}/></Row>
          <Row label="Show time" desc="Relative or absolute time on each email"><Toggle val={prefs.emailTime!==false} onChange={v=>set("emailTime",v)}/></Row>
        </SettingsSection>
        <SettingsSection title="Sync">
          <Row label="Connected account">
            <Select defaultValue="outlook" aria-label="Connected account">
              <option value="outlook">Outlook</option><option value="gmail">Gmail</option>
            </Select>
          </Row>
          <Row label="Sync frequency"><Seg opts={[{v:"realtime",l:"Real-time"},{v:"15",l:"15 min"},{v:"30",l:"30 min"}]} val={prefs.emailSync||"realtime"} onChange={v=>set("emailSync",v)}/></Row>
        </SettingsSection>
      </Screen>
    ),
    contacts:(
      <Screen title="Contacts" desc="Widget layout and field visibility.">
        <SettingsSection title="Widget">
          <Row label="Show avatar"><Toggle val={prefs.contactAvatar!==false} onChange={v=>set("contactAvatar",v)}/></Row>
          <Row label="Show message icon"><Toggle val={prefs.contactMsg!==false} onChange={v=>set("contactMsg",v)}/></Row>
          <Row label="Show call icon"><Toggle val={prefs.contactCall!==false} onChange={v=>set("contactCall",v)}/></Row>
        </SettingsSection>
        <SettingsSection title="List view">
          <Row label="Show role"><Toggle val={prefs.contactRole!==false} onChange={v=>set("contactRole",v)}/></Row>
          <Row label="Show company"><Toggle val={prefs.contactCompany!==false} onChange={v=>set("contactCompany",v)}/></Row>
          <Row label="Show last message time"><Toggle val={prefs.contactTime||false} onChange={v=>set("contactTime",v)}/></Row>
        </SettingsSection>
      </Screen>
    ),
    account:(
      <Screen title="Account" desc="Profile, integrations and connected services.">
        <SettingsSection title="Profile">
          <Row label="Picture"><Inline gap="sm" align="center"><Avatar name={account.name} src={account.src} size="md"/><Button size="sm" icon="settings-camera" onClick={()=>choosePicture().then(p=>{if(p)setPicture(p);})}>Change picture</Button>{account.src?<Button size="sm" variant="ghost" onClick={()=>setPicture(null)}>Remove</Button>:null}</Inline></Row>
          <Row label="Name"><Stack width="sm"><Input defaultValue={account.name} aria-label="Name"/></Stack></Row>
          <Row label="Email"><Stack width="md"><Input defaultValue={account.email} aria-label="Email"/></Stack></Row>
        </SettingsSection>
        <SettingsSection title="Integrations">
          <Row label="Calendar source">
            <Select defaultValue="outlook" aria-label="Calendar source">
              <option value="outlook">Outlook Calendar</option><option value="gcal">Google Calendar</option><option value="apple">Apple Calendar</option>
            </Select>
          </Row>
          <Row label="Email source">
            <Select defaultValue="outlook" aria-label="Email source">
              <option value="outlook">Outlook</option><option value="gmail">Gmail</option>
            </Select>
          </Row>
        </SettingsSection>
        <SettingsSection title="Security">
          <Row label="Browser notifications"><Toggle val={prefs.notifs!==false} onChange={v=>set("notifs",v)}/></Row>
          <Row label="Sign out"><Button variant="danger-secondary" icon="sign-out" href="/outpost.goauthentik.io/sign_out">Sign out</Button></Row>
        </SettingsSection>
      </Screen>
    ),
  };

 /* Which content to show on the right */
  const isFeatures=cat==="features";
  const isDocs=cat==="docs";

  const activePanel=isFeatures
    ? featArea
      ? (()=>{
          const area=window.FEATURES.find(a=>a.area===featArea);
          return area?<FeatureArea area={area}/>:null;
        })()
      : (
        <Stack gap="lg">
          <RecordPage.Header title="Features to build progress" description="Every significant feature in Plenix -- what it does, how it works, and what's planned. Select an area from the sidebar to explore it."/>
          <ContentGrid size="md" label="Feature areas">
            {window.FEATURES.map(area=>{
              const done=area.items.filter(i=>i.status==="done").length;
              const pct=Math.round(done/area.items.length*100);
              return(
                <Card key={area.area} title={area.area} meta={done+"/"+area.items.length} accent={area.color} onOpen={()=>setFeatArea(area.area)}>
                  <ProgressBar value={pct} color={area.color} size="sm" label={area.area+" progress"} labelHidden/>
                </Card>
              );
            })}
          </ContentGrid>
        </Stack>
      )
    : isDocs
      ? <DocsPanel docSection={docSection} setDocSection={setDocSection}/>
      : panels[cat]||(
        <Screen title={SETTINGS_CATS.find(c=>c.id===cat)?.label||cat} desc="Settings controls for this section are planned.">
          <Notice tone="info">Full configuration options coming in a future update.</Notice>
        </Screen>
      );

 /* The documentation pages in the side navigation */
  const docGroups=[
    {heading:null,items:[
      {id:"about",label:"About Plenix"},
      {id:"product-vision",label:"Product vision"},
      {id:"terminology",label:"Terminology"},
      {id:"data-model",label:"Data model"},
      {id:"capabilities",label:"Capabilities"},
      {id:"overview",label:"All feature areas"},
      {id:"style-guide",label:"Style guide"},
    ]},
    ...(window.CAP_LAYERS||[]).map(layer=>{
      const groups=(window.CAPABILITY_GROUPS||[]).filter(g=>g.layer===layer.id);
      const layerLabel={universal:"Universal",client:"Client",project:"Project / Work"}[layer.id]||layer.id;
      return {heading:"Capabilities · "+layerLabel,defaultExpanded:false,items:groups.map(g=>({
        id:"grp-"+g.id,label:g.group,
        children:g.items.map(c=>{
          const doc=(window.CAP_DOCS||{})[c.id];
          const stub=doc?doc.stub:true;
          return {id:"cap-"+c.id,label:c.label,muted:stub,icon:stub?undefined:"circle-check"};
        }),
      }))};
    }),
    {heading:"Feature areas",defaultExpanded:false,items:window.FEATURES.map(a=>({id:"feat-"+a.area,label:a.area,icon:<ColorSwatch color={a.color} size="sm"/>}))},
  ];

  return(
    <div className="plx-page-panes">

      {/* ── Left sidebar ── */}
      <SideNavPortal><NavPane label="Settings" title="Settings" footer={onBack?<Button size="sm" variant="ghost" icon="arrow-left" onClick={onBack}>Back to Dashboard</Button>:null}>
        <NavList label="Settings sections" value={cat!=="features"&&cat!=="docs"?cat:null} onSelect={id=>{setCat(id);setFeatArea(null);setDocSection(null);}}
          groups={[{heading:"Settings",items:SETTINGS_CATS.map(c=>({id:c.id,label:c.label,icon:c.icon}))}]}/>
        {/* Features and Documentation */}
        <CollapsibleSection headingLevel={null} expanded={featOpen} onToggle={()=>{setCat("features");setFeatArea(null);setFeatOpen(o=>!o);}}
          icon="circle-check" title="Features to build progress" actions={<Count variant="pill" tone="info" value={window.FEATURES.length} label={window.FEATURES.length+" feature areas"}/>}>
          <NavList label="Feature areas" value={cat==="features"?featArea:null} onSelect={id=>{setCat("features");setFeatArea(id);}}
            items={window.FEATURES.map(area=>({id:area.area,label:area.area,icon:<ColorSwatch color={area.color} size="sm"/>,count:area.items.filter(i=>i.status==="done").length+"/"+area.items.length}))}/>
        </CollapsibleSection>

        <CollapsibleSection headingLevel={null} expanded={docOpen} onToggle={()=>{setCat("docs");setDocSection("about");setDocOpen(o=>!o);}}
          icon="doc-text" title="Documentation">
          <NavList label="Documentation" value={cat==="docs"?docSection:null} onSelect={id=>{setCat("docs");setDocSection(id);}} groups={docGroups}/>
        </CollapsibleSection>
      </NavPane></SideNavPortal>

      {/* ── Content panel ── */}
      <PageContent>
        {activePanel}
      </PageContent>
    </div>
  );
}
