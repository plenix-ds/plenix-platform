/* Plenix · ThemeProvider, useTheme, ThemeZone
   Summary: Gives React components the theme, density and interaction context; a theme zone gives one region of a page
     another mode (or theme).
   Usage:
     <ThemeProvider>{app}</ThemeProvider>
     const { theme, mode, setTheme, themes } = useTheme();
     <ThemeZone mode="dark"><MediaViewer … /></ThemeZone>
     <ThemeZone mode="light" surface="default">…</ThemeZone>
   Props:
     children: the application root or React island it wraps
     useTheme(): { theme, mode, setTheme(name), themes, zone } — the current theme's name and mode ("light" | "dark"), a
       way to change the page's theme (kept for every page), the themes the design system defines (THEMES, from
       platform/standards/themes.json), and whether it is read inside a ThemeZone
     ThemeZone: a region with its own mode (or theme)
       mode: "light" | "dark" | none (default: the mode around it)
       theme: a theme name of THEMES | none (default: the theme around it)
       surface: "canvas" (default: the zone's canvas fill) | "default" (the default surface) | "none" (no fill of its own)
       as: the element (default "div"); label: names the region (with as="section", a landmark)
       className: more classes on the zone
   Behavior:
     It reads the theme, mode, density and interaction attributes on <html> and follows their changes.
     It sends changes back through the same runtime (window.PlenixWorkspace), so a person's saved choice is never reset.
     Outside a ThemeProvider, useTheme still reads and changes the theme on <html>.
     A ThemeZone writes data-plx-theme and data-plx-mode on its element, so every color role inside
       it resolves to that theme and mode; it also writes the density around it (data-plx-density), so the component
       tokens are resolved again inside it. Menus and dialogs opened from inside a zone keep its theme and mode (Portal).
     Nested zones work: the innermost decides.
   Notes:
     The attributes on <html> are set before the page draws by platform/providers/theme-boot.js (loaded in <head>, with
       the same saved preference keys as before).
     Wrap an application root, or a React island, in ThemeProvider.
     Read it with useTheme, useDensity and useInteraction.
     The themes are defined in the design system (platform/standards/themes.json); today "default", the Plenix look.
     A zone is for a region with a reason (a dark media viewer, a code panel, the shell header); never many small zones on
       one page, and never colors set by hand on components inside one.
     Other ThemeZone props pass through to its element.
*/
import React from 'react';
import { THEMES, DEFAULT_THEME } from './themes.js';
import { cx } from '../utils/cx.ts';

// the workspace runtime theme-boot.js puts on the page before React (only what the Platform's React code calls)
declare global {
  interface Window { PlenixWorkspace?: { setTheme?(name: string): void; setDensity(density: string): void } }
}

export type ThemeMode = 'light' | 'dark';
export type ThemeValue = {
  theme: string; mode: ThemeMode; setTheme(name: string): void; themes: typeof THEMES;
  density: string; interaction: string; zone: boolean; setDensity?(density: string): void;
};
export type ThemeProviderProps = { children?: React.ReactNode };
type RootState = { theme: string; density: string; interaction: string; mode: ThemeMode };
export type ThemeZoneProps = {
  mode?: ThemeMode; theme?: string; surface?: 'canvas' | 'default' | 'none'; as?: React.ElementType; label?: string; className?: string;
  children?: React.ReactNode; [attribute: string]: unknown;
};

export const ThemeContext = React.createContext<ThemeValue | null>(null);

function readRoot(): RootState {
  const root = document.documentElement;
  return { theme: root.getAttribute('data-plx-theme') || DEFAULT_THEME, density: root.getAttribute('data-plx-density') || 'standard',
    interaction: root.getAttribute('data-plx-interaction') || 'pointer', mode: root.getAttribute('data-plx-mode') === 'dark' ? 'dark' : 'light' };
}
// the theme is changed through the runtime when it is there (it remembers the choice), else on <html> directly
function changeTheme(name: string): void {
  if (!THEMES.some((t) => t.name === name)) return;
  if (window.PlenixWorkspace && window.PlenixWorkspace.setTheme) window.PlenixWorkspace.setTheme(name);
  else document.documentElement.setAttribute('data-plx-theme', name);
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, setState] = React.useState(readRoot);
  React.useEffect(() => {
    const observer = new MutationObserver(() => setState(readRoot()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-plx-theme', 'data-plx-density', 'data-plx-interaction', 'data-plx-mode'] });
    return () => observer.disconnect();
  }, []);
  const value = React.useMemo((): ThemeValue => ({
    theme: state.theme,
    mode: state.mode,
    setTheme: changeTheme,
    themes: THEMES,
    density: state.density,
    interaction: state.interaction,
    zone: false,
    setDensity: (d: string) => { if (window.PlenixWorkspace) window.PlenixWorkspace.setDensity(d); }
  }), [state.theme, state.mode, state.density, state.interaction]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): { theme: string; mode: ThemeMode; setTheme(name: string): void; themes: typeof THEMES; zone: boolean } {
  const ctx = React.useContext(ThemeContext);
  const [own, setOwn] = React.useState<RootState | null>(() => (ctx ? null : readRoot()));
  React.useEffect(() => {
    if (ctx) return undefined;
    const observer = new MutationObserver(() => setOwn(readRoot()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-plx-theme', 'data-plx-mode'] });
    return () => observer.disconnect();
  }, [ctx]);
  return { theme: ctx ? ctx.theme : own!.theme, mode: ctx ? ctx.mode : own!.mode, setTheme: changeTheme, themes: THEMES, zone: ctx ? !!ctx.zone : false };
}

const SURFACES = ['canvas', 'default', 'none'];

export function ThemeZone({ mode, theme, surface = 'canvas', as = 'div', label, className, children, ...rest }: ThemeZoneProps) {
  const outer = React.useContext(ThemeContext);
  const ref = React.useRef<HTMLElement>(null);
  const [root, setRoot] = React.useState(readRoot);
  const [density, setDensity] = React.useState<string | null>(null);
  // the density around the zone (the nearest region that sets one, else <html>) and the page's theme and mode, followed
  React.useEffect(() => {
    const read = () => {
      const up = ref.current && ref.current.parentElement, near = up && up.closest('[data-plx-density]');
      setDensity(near ? near.getAttribute('data-plx-density') : null);
      setRoot(readRoot());
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-plx-density', 'data-plx-theme', 'data-plx-mode'] });
    return () => observer.disconnect();
  }, []);
  const base = outer || root;
  const t = theme && THEMES.some((x) => x.name === theme) ? theme : base.theme;
  const m = mode === 'light' || mode === 'dark' ? mode : base.mode;
  const value = React.useMemo((): ThemeValue => Object.assign({ setTheme: changeTheme, themes: THEMES, density: density || root.density, interaction: root.interaction }, outer,
    { theme: t, mode: m, zone: true }), [outer, t, m, density, root]);
  const Tag = as;
  return (
    <ThemeContext.Provider value={value}>
      <Tag ref={ref} className={cx('plx-theme-zone', 'plx-theme-zone--' + (SURFACES.indexOf(surface) >= 0 ? surface : 'canvas'), className)}
        data-plx-theme={t} data-plx-mode={m} data-plx-density={density || undefined}
        aria-label={label} {...rest}>
        {children}
      </Tag>
    </ThemeContext.Provider>
  );
}
