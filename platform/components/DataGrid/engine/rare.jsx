/* Plenix · DataGrid engine · rare (draws a part of chromeRare.jsx once it has loaded)
   Summary: A part of the grid that is seldom drawn is a function in chromeRare.jsx, loaded with one dynamic import the first time it is drawn (issue 807).
     Rare asks for the file when it first mounts and draws the part when it arrives (nothing before: the dialog opens one load later).
   Usage:
     {managing ? <Rare part="manageDialog" args={{ ... }} fallback={(retry) => manageFailed({ B, S, retry, close })} /> : null}
   Props:
     part: the name of the function in chromeRare.jsx ("manageDialog"); args: the object it takes;
     fallback(retry): what to draw when the file could not load; retry asks for it again. Without a fallback nothing is drawn.
   Behavior:
     The file is loaded once for the page and kept. A failed load is not kept: the promise is dropped, so the next Retry, or the next
       Rare that mounts (the next "Manage columns"), asks for the file again. In the iife builds the import is inlined, so nothing is fetched.
*/
import React from 'react';

let loaded = null, loading = null;
function load() {
  return loading || (loading = import('./chromeRare.jsx').then(
    (m) => (loaded = m),
    (error) => { loading = null; throw error; },
  ));
}

export function Rare({ part, args, fallback }) {
  const [failed, setFailed] = React.useState(false), [, again] = React.useState(0);
  const attempt = React.useCallback(() => {
    setFailed(false);
    load().then(() => again((n) => n + 1), () => setFailed(true));
  }, []);
  React.useEffect(() => { if (!loaded) attempt(); }, [attempt]);
  if (loaded) return loaded[part](args);
  return failed && fallback ? fallback(attempt) : null;
}
