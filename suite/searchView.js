// Plenix suite · afterSearchView (suite/searchView.js): one copy for the suite's shell (suite/suite.jsx) and the Asset Manager's
// (dam/app/shell/AssetShell.jsx), #882.
// the full-screen search view (AppHeader at Narrow) is a history entry of its own: leave it (Back, which closes it) before
// opening a screen, so the screen's entry replaces it in the history instead of following it
export const afterSearchView = (open) => {
  const st = window.history.state;
  if (!(st && st.plxSearch)) { open(); return; }
  const go = () => { window.removeEventListener('popstate', go); open(); };
  window.addEventListener('popstate', go);
  window.history.back();
};
