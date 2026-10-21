const fs=require('fs');function rep(file,from,to){const s=fs.readFileSync(file,'utf8');if(s.split(from).length!==2)throw Error('Expected one match: '+file);fs.writeFileSync(file,s.replace(from,to));}
rep('platform/patterns/SearchWorkspace/search-workspace.css','.plx-search-ws__query>*{inline-size:100%;}','.plx-search-ws__field{inline-size:100%;}');
rep('platform/patterns/SearchWorkspace/SearchWorkspace.jsx','<SearchField ref={field} label=','<SearchField ref={field} className="plx-search-ws__field" label=');
rep('platform/patterns/SearchWorkspace/SearchWorkspace.jsx','   Behavior:\n','   Behavior:\n     The query field carries its own sizing part class; the pattern never sizes arbitrary descendants.\n');
