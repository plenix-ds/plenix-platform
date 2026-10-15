const fs=require('fs');const R='D:/Documents/Projects/Projects_Applications/Plenix/';
function ed(f,pairs){let s=fs.readFileSync(R+f,'utf8');for(const[a,b]of pairs){if(!s.includes(a))throw new Error(f+' missing '+a.slice(0,60));s=s.replace(a,b);}fs.writeFileSync(R+f,s);}
ed('suite/suite.jsx',[[`  }, [prefs.headerTint, prefs.headerTintStyle]);
`,`  }, [prefs.headerTint, prefs.headerTintStyle]);
  // the appearance (Settings › Mode: system, light or dark; Platforms Standard 1.6): theme-boot keeps it for every page
  // (PlenixWorkspace.setMode) and applies it to <html data-plx-mode>. On load the kept choice wins (another app, such as
  // the DAM, may have changed it); a later change of prefs.theme is applied live; a change in another open page comes back
  const modeLoaded = React.useRef(false);
  React.useEffect(() => {
    const ws = window.PlenixWorkspace; if (!ws || !ws.setMode) return;
    if (!modeLoaded.current) { modeLoaded.current = true; if (prefs.theme !== ws.mode()) setPrefs((p) => ({ ...p, theme: ws.mode() })); return; }
    if (prefs.theme && prefs.theme !== ws.mode()) ws.setMode(prefs.theme);
  }, [prefs.theme]);
  React.useEffect(() => {
    const follow = (e) => setPrefs((p) => (p.theme === e.detail.mode ? p : { ...p, theme: e.detail.mode }));
    window.addEventListener('plenix:modechange', follow);
    return () => window.removeEventListener('plenix:modechange', follow);
  }, []);
`]]);
ed('settings/settings.jsx',[[`<Row label="Mode"><Seg opts={[{v:"light",l:"Light"},{v:"dark",l:"Dark"},{v:"system",l:"System"}]} val={prefs.theme||"light"} onChange={v=>set("theme",v)}/></Row>`,
`<Row label="Mode" desc="System follows the light or dark setting of your device"><Seg opts={[{v:"system",l:"System"},{v:"light",l:"Light"},{v:"dark",l:"Dark"}]} val={prefs.theme||"system"} onChange={v=>set("theme",v)}/></Row>`]]);
