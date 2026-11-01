/* Plenix · DataGrid engine · rare (draws a part of chromeRare.jsx once it has loaded)
   Summary: A part of the grid that is seldom drawn is a function in chromeRare.jsx, loaded with one dynamic import the first time it is drawn (issue 807).
     Rare asks for the file when it first mounts and draws the part when it arrives (nothing before: the dialog opens, or the error shows, one load later).
   Usage:
     {managing ? <Rare part="manageDialog" args={{ ... }} /> : null}
   Props:
     part: the name of the function in chromeRare.jsx ("manageDialog" | "failureState"); args: the object it takes.
   Behavior:
     The file is loaded once for the page and kept. In the iife builds the import is inlined, so it is ready on the first render.
*/
import React from 'react';

let loaded = null, loading = null;
const load = () => loading || (loading = import('./chromeRare.jsx').then((m) => (loaded = m)));

export function Rare({ part, args }) {
  const [, again] = React.useState(0);
  React.useEffect(() => { if (!loaded) load().then(() => again((n) => n + 1)); }, []);
  return loaded ? loaded[part](args) : null;
}
