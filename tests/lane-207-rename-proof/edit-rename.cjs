// Guarded one-component migration; fails if the exact input differs.
const fs=require('fs');function replace(file,from,to){let s=fs.readFileSync(file,'utf8');if(s.split(from).length!==2)throw Error('Expected exactly one match: '+file);fs.writeFileSync(file,s.replace(from,to));}
replace('platform/patterns/RenameAction/rename-action.css','.plx-rename-action--inline>*{flex-grow:1;min-inline-size:0;}','.plx-rename-action__edit{flex-grow:1;}');
replace('platform/patterns/RenameAction/rename-action.css',"   dialog, its button in the flow and the form in the dialog's body. */","   dialog, its button in the flow and the form in the dialog's body. The edit part owns growth; InlineEdit owns its minimum. */");
replace('platform/patterns/RenameAction/RenameAction.jsx','<InlineEdit label={name} value={value}','<InlineEdit className="plx-rename-action__edit" label={name} value={value}');
replace('platform/patterns/RenameAction/RenameAction.jsx','   Behavior:\n','   Behavior:\n     The inline edit carries its own layout part class; its component owns its minimum width.\n');
replace('lanes/207-rename/design-system/parts/w10A.labs.js','class="plx-inline-edit plx-inline-edit--text"','class="plx-inline-edit plx-inline-edit--text plx-rename-action__edit"');
