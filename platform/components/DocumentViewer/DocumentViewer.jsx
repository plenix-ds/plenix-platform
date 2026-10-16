/* Plenix · DocumentViewer
   Summary: Read PDF, image pages or text with page navigation, thumbnails and stepped zoom.
   Usage: <DocumentViewer kind="pdf" src="/files/report.pdf" label="Report"/>
   Props:
     kind: "pdf" | "images" | "text" (default).
     src: a PDF URL or Uint8Array; the viewer loads the vendored PDF.js lazily.
     pages: [{ id, src, alt, thumbnail }]; image document pages.
     text: plain document text for kind="text".
     label: the accessible document name; defaults to strings.document.
     thumbnails: show page thumbnails when more than one page exists; default true.
     initialPage: first page to show, 1-based; default 1.
     initialZoom: 50, 75, 100, 125, 150 or 200 percent; default 100.
     pdfModuleUrl: optional separate URL for the vendored PDF.js ES module.
     pdfWorkerUrl: optional separate URL for the matching PDF.js worker.
     strings: { document, previous, next, page, zoom, thumbnails, loading, failed, empty, retry }.
     onPageChange(page): called after explicit page navigation.
     className: extra classes on the document region.
   Behavior: Navigation clamps to available pages. PDF loading and rendering are cancellable; stale loads cannot replace
     a newer document. Errors offer Retry. PDF text is exposed alongside the canvas for assistive technology.
   Notes: PDF.js 4.10.38 (Apache-2.0) is vendored beside this component. URLs must obey the application CSP/CORS policy.
     PDF canvas dimensions are document geometry, never an inline style. No remote PDF code is downloaded.
*/
import React from 'react';
import { Stack,Inline } from '../Stack/Stack.jsx';
import { Button } from '../Button/Button.jsx';
import { Select } from '../Input/Input.jsx';
import { Field } from '../Field/Field.jsx';
import { Text } from '../Text/Text.jsx';
import { Notice } from '../Notice/Notice.jsx';
import { Image } from '../Image/Image.jsx';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.jsx';
import { cx } from '../../utils/cx.js';
const STRINGS={document:'Document',previous:'Previous page',next:'Next page',page:'Page',zoom:'Zoom',thumbnails:'Page thumbnails',loading:'Loading document',failed:'The document could not be opened.',empty:'No document.',retry:'Try again'};
const ZOOMS=[50,75,100,125,150,200];
function vendorUrl(name){const script=Array.from(document.scripts).find(s=>/\/platform\/(?:dist\/)?platform(?:\.min)?\.js(?:[?#]|$)/.test(s.src));return new URL(script?(script.src.includes('/dist/')?'../components/':'components/')+'DocumentViewer/vendor/'+name:'../components/DocumentViewer/vendor/'+name,script?script.src:document.baseURI).href;}
function PdfThumbnail({pdf,number,label}){const ref=React.useRef(null);React.useEffect(()=>{let live=true,task;const observer=new IntersectionObserver(async(entries)=>{if(!entries.some(e=>e.isIntersecting))return;observer.disconnect();try{const p=await pdf.getPage(number);if(!live)return;const v=p.getViewport({scale:1}),view=p.getViewport({scale:96/v.width}),c=ref.current;if(!c)return;c.width=Math.ceil(view.width);c.height=Math.ceil(view.height);task=p.render({canvasContext:c.getContext('2d'),viewport:view});await task.promise;}catch(e){/* Navigation remains available if a preview cannot render. */}});observer.observe(ref.current);return()=>{live=false;observer.disconnect();task?.cancel();};},[pdf,number]);return <canvas ref={ref} role="img" aria-label={label}/>;}
export function DocumentViewer({kind='text',src,pages=[],text='',label,thumbnails=true,initialPage=1,initialZoom=100,pdfModuleUrl,pdfWorkerUrl,strings,onPageChange,className}){
 const t={...STRINGS,...strings},[page,setPage]=React.useState(initialPage),[zoom,setZoom]=React.useState(ZOOMS.includes(initialZoom)?initialZoom:100),[pdf,setPdf]=React.useState(null),[loading,setLoading]=React.useState(false),[error,setError]=React.useState(''),[attempt,setAttempt]=React.useState(0),[accessible,setAccessible]=React.useState(''),canvas=React.useRef(null);
 React.useEffect(()=>{let live=true,task,doc;setPdf(null);setPage(initialPage);setAccessible('');setError('');setZoom(ZOOMS.includes(initialZoom)?initialZoom:100);
  if(kind!=='pdf'||!src){setLoading(false);return;}
  setLoading(true);
  (async()=>{try{const moduleUrl=pdfModuleUrl||vendorUrl('pdf.js');const engine=await import(moduleUrl);if(!live)return;engine.GlobalWorkerOptions.workerSrc=pdfWorkerUrl||new URL('pdf.worker.js',moduleUrl).href;task=engine.getDocument(typeof src==='string'?{url:src}:{data:src.slice()});doc=await task.promise;if(live){setPdf(doc);setLoading(false);}else doc.destroy();}catch(e){if(live){setError(t.failed);setLoading(false);}}})();
  return()=>{live=false;if(task)task.destroy();else if(doc)doc.destroy();};
 },[kind,src,attempt,pdfModuleUrl,pdfWorkerUrl]);
 const count=kind==='pdf'?(pdf?.numPages||0):kind==='images'?pages.length:text?1:0;
 const current=Math.max(1,Math.min(page,count||1));
 React.useEffect(()=>{if(kind!=='pdf'||!pdf)return;let live=true,render;
  setLoading(true);setError('');setAccessible('');
  (async()=>{try{const p=await pdf.getPage(current);if(!live)return;const viewport=p.getViewport({scale:zoom/100}),c=canvas.current;if(!c)return;c.width=Math.ceil(viewport.width);c.height=Math.ceil(viewport.height);render=p.render({canvasContext:c.getContext('2d'),viewport});await render.promise;const contents=await p.getTextContent();if(live){setAccessible(contents.items.map(x=>x.str||'').join(' '));setLoading(false);}}catch(e){if(live&&e.name!=='RenderingCancelledException'){setError(t.failed);setLoading(false);}}})();
  return()=>{live=false;render?.cancel();};
 },[kind,pdf,current,zoom]);
 const move=n=>{const next=Math.max(1,Math.min(count,n));setPage(next);onPageChange?.(next);};
 return <Stack className={cx('plx-document-viewer',className)} aria-label={label||t.document} role="region">
 <Inline wrap><Button onClick={()=>move(current-1)} disabled={current<=1||!count}>{t.previous}</Button><Text variant="data" role="status">{t.page+' '+current+' / '+count}</Text><Button onClick={()=>move(current+1)} disabled={current>=count||!count}>{t.next}</Button><Field label={t.zoom}><Select className="plx-document-viewer__zoom" value={zoom} onChange={e=>setZoom(Number(e.target.value))} options={ZOOMS.map(z=>({value:z,label:z+'%'}))}/></Field></Inline>
 {loading?<Text role="status">{t.loading}</Text>:null}{error?<Notice tone="danger" actions={<Button onClick={()=>setAttempt(v=>v+1)}>{t.retry}</Button>}>{error}</Notice>:null}
 {thumbnails&&count>1?<Inline wrap role="group" aria-label={t.thumbnails}>{Array.from({length:count},(_,i)=><Button key={i} aria-current={current===i+1?'page':undefined} onClick={()=>move(i+1)}>{kind==='pdf'&&pdf?<PdfThumbnail pdf={pdf} number={i+1} label={t.page+' '+(i+1)}/>:kind==='images'&&pages[i]?.thumbnail?<Image src={pages[i].thumbnail} alt={pages[i].alt||t.page+' '+(i+1)}/>:<>{t.page} <Text as="span" variant="data">{i+1}</Text></>}</Button>)}</Inline>:null}
 <div className="plx-document-viewer__viewport" data-zoom={zoom} tabIndex={0} role="region" aria-label={label||t.page} aria-busy={loading||undefined}>
 {kind==='pdf'&&pdf?<><canvas ref={canvas} role="img" aria-label={(label||t.page)+' '+current}/><Text className="plx-document-viewer__pdf-text">{accessible}</Text></>:kind==='images'&&pages[current-1]?<Image key={pages[current-1].src} src={pages[current-1].src} alt={pages[current-1].alt||t.page+' '+current} fit="contain"/>:kind==='text'&&text?<pre className="plx-document-viewer__text">{text}</pre>:!loading&&!error?<Text>{t.empty}</Text>:null}
 </div></Stack>;
}
