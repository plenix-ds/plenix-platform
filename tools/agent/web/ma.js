const fs=require('fs');const R='D:/Documents/Projects/Projects_Applications/Plenix/';
function ed(f,pairs){let s=fs.readFileSync(R+f,'utf8');for(const[a,b]of pairs){if(!s.includes(a))throw new Error(f+' missing '+a.slice(0,60));s=s.replace(a,b);}fs.writeFileSync(R+f,s);}
ed('dam/app/pages/MyAccountPage.jsx',[
[`  const [prefs, setPrefs] = React.useState({ theme: 'Light', assets: '30',`,`  // the appearance (Platforms Standard 1.6): system (default), light or dark, the same choice as the suite's Settings › Mode;
  // theme-boot keeps it for every page and it applies at once, like the display density
  const ws = window.PlenixWorkspace;
  const [mode, setModeState] = React.useState(() => (ws && ws.mode ? ws.mode() : 'system'));
  const setMode = (m) => { setModeState(m); if (ws && ws.setMode) ws.setMode(m); };
  const [prefs, setPrefs] = React.useState({ assets: '30',`],
[`        <Field label="Default theme" layout="inline">
          <Select name="defaultTheme" value={prefs.theme} onChange={(e) => set('theme')(e.target.value)}><option>Light</option><option>Dark</option></Select>
        </Field>`,`        <Field label="Mode" layout="inline" info="System follows the light or dark setting of your device">
          <Select name="mode" value={mode} onChange={(e) => setMode(e.target.value)}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></Select>
        </Field>`],
[`<Input name="preferredDateFormat" placeholder`,`<Input name="preferredDateFormat" autoComplete="off" autoCapitalize="off" spellCheck={false} enterKeyHint="done" placeholder`],
[`<Input name="firstName" autoComplete="given-name"`,`<Input name="firstName" autoComplete="given-name" enterKeyHint="next"`],
[`<Input name="lastName" autoComplete="family-name"`,`<Input name="lastName" autoComplete="family-name" enterKeyHint="next"`],
[`<Input name="email" type="email" autoComplete="email"`,`<Input name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false} enterKeyHint="done"`],
]);
