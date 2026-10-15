const fs=require('fs');const R='D:/Documents/Projects/Projects_Applications/Plenix/';
function ed(f,pairs){let s=fs.readFileSync(R+f,'utf8');for(const[a,b]of pairs){if(!s.includes(a))throw new Error(f+' missing '+a.slice(0,60));s=s.split(a).join(b);}fs.writeFileSync(R+f,s);}
ed('projects/projects.jsx',[
[`<Input autoFocus value={newName} onChange={(e) => setNewName(e.target.value)} placeholder`,`<Input autoFocus autoComplete="off" autoCapitalize="words" enterKeyHint="done" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder`],
[`<Field label="Company name"><Input /></Field>`,`<Field label="Company name"><Input autoComplete="organization" autoCapitalize="words" enterKeyHint="next" /></Field>`],
[`<Field label="Contact name"><Input /></Field><Field label="Email"><Input type="email" /></Field>`,`<Field label="Contact name"><Input autoComplete="name" autoCapitalize="words" enterKeyHint="next" /></Field><Field label="Email"><Input type="email" autoComplete="email" enterKeyHint="done" /></Field>`],
]);
ed('settings/settings.jsx',[
[`<Input autoFocus aria-label={label} value={value}`,`<Input autoFocus autoComplete="off" enterKeyHint="done" aria-label={label} value={value}`],
[`<Input defaultValue={account.name} aria-label="Name"/>`,`<Input defaultValue={account.name} aria-label="Name" autoComplete="name" autoCapitalize="words" enterKeyHint="next"/>`],
[`<Input defaultValue={account.email} aria-label="Email"/>`,`<Input type="email" defaultValue={account.email} aria-label="Email" autoComplete="email" enterKeyHint="done"/>`],
]);
const off=' autoComplete="off" autoCapitalize="off" spellCheck={false}';
ed('dam/app/pages/SystemSettingsPage.jsx',[
[`const text = (k, extra) => ({ value: p[k], onChange: (e) => setP({ ...p, [k]: e.target.value }), name: k, ...extra });`,
 `// configuration values: no autofill; a path or a number gets its own keyboard (Platforms Standard 3.5)
  const text = (k, extra) => ({ value: p[k], onChange: (e) => setP({ ...p, [k]: e.target.value }), name: k, autoComplete: 'off', ...extra });
  const path = { autoCapitalize: 'off', spellCheck: false, inputMode: 'url' };`],
[`<Input {...text('uploadSourcepath')} />`,`<Input {...text('uploadSourcepath', path)} />`],
[`<Input {...text('rootFolderPath', { placeholder: 'Root folder path' })} />`,`<Input {...text('rootFolderPath', { placeholder: 'Root folder path', ...path })} />`],
[`<Input {...text('autoCreateAtFolderLevel')} />`,`<Input {...text('autoCreateAtFolderLevel', { inputMode: 'numeric', enterKeyHint: 'done' })} />`],
[`<Input name="newFieldName" width="lg"`,`<Input name="newFieldName" autoComplete="off" enterKeyHint="done" width="lg"`],
[`<Input name="name" value={t.name}`,`<Input name="name" autoComplete="off" value={t.name}`],
[`<Input name="paths" placeholder="Paths"`,`<Input name="paths"`+off+` placeholder="Paths"`],
[`<Input name="ordering" width="sm"`,`<Input name="ordering" inputMode="numeric" autoComplete="off" enterKeyHint="done" width="sm"`],
[`<Input name="name" value={names[i]}`,`<Input name="name" autoComplete="off" value={names[i]}`],
[`<Textarea name="extensions" value`,`<Textarea name="extensions"`+off+` value`],
]);
