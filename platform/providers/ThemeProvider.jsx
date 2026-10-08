/* Plenix · ThemeProvider
   Summary: Gives React components the density and interaction context.
   Usage:
     <ThemeProvider>{app}</ThemeProvider>
   Props:
     children: the application root or React island it wraps
   Behavior:
     It reads the density and interaction attributes on <html> and follows their changes.
     It sends changes back through the same runtime (window.PlenixWorkspace), so a person's saved choice is never reset.
   Notes:
     The attributes on <html> are set before the page draws by platform/providers/theme-boot.js (loaded in <head>, with
       the same saved preference keys as before).
     Wrap an application root, or a React island, in ThemeProvider.
     Read it with useDensity and useInteraction.
*/
import React from 'react';

export const ThemeContext = React.createContext(null);

function readRoot() {
  const root = document.documentElement;
  return { density: root.getAttribute('data-plx-density') || 'standard', interaction: root.getAttribute('data-plx-interaction') || 'pointer' };
}

export function ThemeProvider({ children }) {
  const [state, setState] = React.useState(readRoot);
  React.useEffect(() => {
    const observer = new MutationObserver(() => setState(readRoot()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-plx-density', 'data-plx-interaction'] });
    return () => observer.disconnect();
  }, []);
  const value = React.useMemo(() => ({
    density: state.density,
    interaction: state.interaction,
    setDensity: (d) => { if (window.PlenixWorkspace) window.PlenixWorkspace.setDensity(d); }
  }), [state.density, state.interaction]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
