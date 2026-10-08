/* Plenix · ThemeProvider, useTheme
   Summary: Gives React components the theme, density and interaction context.
   Usage:
     <ThemeProvider>{app}</ThemeProvider>
     const { theme, setTheme, themes } = useTheme();
   Props:
     children: the application root or React island it wraps
     useTheme(): { theme, setTheme(name), themes } — the current theme's name, a way to change it (kept for every page), and
       the themes the design system defines (THEMES, from platform/standards/themes.json)
   Behavior:
     It reads the theme, density and interaction attributes on <html> and follows their changes.
     It sends changes back through the same runtime (window.PlenixWorkspace), so a person's saved choice is never reset.
     Outside a ThemeProvider, useTheme still reads and changes the theme on <html>.
   Notes:
     The attributes on <html> are set before the page draws by platform/providers/theme-boot.js (loaded in <head>, with
       the same saved preference keys as before).
     Wrap an application root, or a React island, in ThemeProvider.
     Read it with useTheme, useDensity and useInteraction.
     The themes are defined in the design system (platform/standards/themes.json); the current look is the "default" theme.
*/
import React from 'react';
import { THEMES, DEFAULT_THEME } from './themes.js';

export const ThemeContext = React.createContext(null);

function readRoot() {
  const root = document.documentElement;
  return { theme: root.getAttribute('data-plx-theme') || DEFAULT_THEME, density: root.getAttribute('data-plx-density') || 'standard',
    interaction: root.getAttribute('data-plx-interaction') || 'pointer' };
}
// the theme is changed through the runtime when it is there (it remembers the choice), else on <html> directly
function changeTheme(name) {
  if (!THEMES.some((t) => t.name === name)) return;
  if (window.PlenixWorkspace && window.PlenixWorkspace.setTheme) window.PlenixWorkspace.setTheme(name);
  else document.documentElement.setAttribute('data-plx-theme', name);
}

export function ThemeProvider({ children }) {
  const [state, setState] = React.useState(readRoot);
  React.useEffect(() => {
    const observer = new MutationObserver(() => setState(readRoot()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-plx-theme', 'data-plx-density', 'data-plx-interaction'] });
    return () => observer.disconnect();
  }, []);
  const value = React.useMemo(() => ({
    theme: state.theme,
    setTheme: changeTheme,
    themes: THEMES,
    density: state.density,
    interaction: state.interaction,
    setDensity: (d) => { if (window.PlenixWorkspace) window.PlenixWorkspace.setDensity(d); }
  }), [state.theme, state.density, state.interaction]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  const [own, setOwn] = React.useState(() => (ctx ? null : readRoot().theme));
  React.useEffect(() => {
    if (ctx) return undefined;
    const observer = new MutationObserver(() => setOwn(readRoot().theme));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-plx-theme'] });
    return () => observer.disconnect();
  }, [ctx]);
  return { theme: ctx ? ctx.theme : own, setTheme: changeTheme, themes: THEMES };
}
