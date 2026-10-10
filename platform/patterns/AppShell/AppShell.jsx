/* Plenix · AppShell, PageContent, SideNavPortal
   Summary: The root of an application page, after the Layout grid's shell: the header across the top, a body row with the
     navigation (left), the main region and the inspector panel (right), then the footer across the bottom.
   Usage:
     <AppShell header={<AppHeader…/>} sideNav={<NavPane…/>} panel={<SidePanel…/>} footer={<StatusBar…/>}>
       <PageContent>…</PageContent>
     </AppShell>
     <SideNavPortal><NavPane…/></SideNavPortal>
   Props:
     header: the header across the top (AppHeader)
     sideNav: the navigation on the left (NavPane); without it a screen can fill the area through SideNavPortal
     panel: the inspector panel on the right (SidePanel)
     footer: the footer across the bottom (StatusBar)
     page: what kind of page this is (default "workspace"): "workspace" | "dashboard" | "settings" | "form" | "detail" |
       "master-detail" | "editor". The design system's layout standard (providers/pageLayouts.js) decides its layout mode:
       fluid (full width), contained (one centered column at the 960px form width), hybrid (full width, text at 760px and
       forms at 960px), multi-pane (panes that each scroll on their own) or focus (navigation and inspector hidden).
       An application never sets the mode itself; a pattern that is a kind of page claims it (SettingsLayout: "settings").
     mainId: the main region's id, the skip link's target (default "main")
     mainClassName: more classes on the main region
     className: more classes on the shell
     children: the main region's content
     strings: the words it shows, for other languages: { skip: "Skip to main content" } (the skip link)
     PageContent.as: "section" (default) | "div"
     PageContent.className: more classes on the column
     PageContent.children: the page's parts
     SideNavPortal.children: the navigation (a NavPane) that a screen hands to the shell's navigation area
     useAppLayout(): the layout state for the panes, or null outside an AppShell:
       { mode, open, expanded, width, setWidth, toggle, close, small, narrow, barEl, parentEl, hasSideNav, page, layout,
         claimPage(kind) }; mode is "inline", "rail", "overlay" (Medium), "bar" or "screen" (Narrow) or "none"
   Behavior:
     The areas are the shell's immediate children.
     The header and the footer always span the full width, above and below both side areas.
     The side areas live between the header and the footer, also when they open as overlays.
     Navigation: --plx-sys-shell-nav-width (240px), resizable 140–320px with the splitter on its edge; the width is remembered.
     A dragged width snaps to the size tokens (--plx-ref-size-*) and the arrow keys step through them (batch 281).
     The splitters follow the writing direction: in a right-to-left page the edges are mirrored, so dragging and Arrow Left /
       Right move the edge the mirrored way (the key toward the outside widens the area).
     The navigation's own Collapse button (in the pane's header) or Ctrl+[ collapses it to a rail whose Expand button opens
       it again; this is remembered.
     The window classes (Platforms Standard 3.3) decide the navigation's form (4.1): Wide (840px and up, from
       --plx-sys-shell-rail-below) the pane beside the main region; Medium (600-839px) a rail whose Expand opens the
       expanded rail over the main region (Escape or a click outside closes it); Narrow (under 600px,
       --plx-sys-shell-phone-below) never a drawer: the page's top-level destinations in a bottom navigation bar, always
       visible and labeled, and the pane a screen of its own, opened from the bar's Browse destination or the parent row
       at the top (NavPane).
     The shell keeps the safe areas (viewport-fit=cover): the header below the top inset, the bottom bar or footer above
       the bottom inset, both sides inside theirs.
     Inspector panel: see SidePanel (--plx-sys-panel-inspector-width by density; it collapses to a rail).
     The main region fills the rest and scrolls itself; the content grid lives in it.
     The layout mode is data-plx-layout on the shell and on the main region; app-shell.css draws each mode (batch 217).
     The mode comes from the page's kind through the layout standard (providers/pageLayouts.js; batch 218).
     A skip link is the first stop.
     PageContent fills the rest of the main region (beside a SecondaryPane, if any) and scrolls itself.
     PageContent keeps the layout padding (--plx-sys-space-layout-*) and stacks its parts --plx-sys-space-stack-md apart.
     PageContent is positioned, so a DropZone overlay covers it.
   Notes:
     PageContent is the content column of a page inside the main region; other props go on its element.
     SideNavPortal is for a screen that owns its navigation's state (a settings screen, a project list): it hands the
       navigation to the shell's navigation area from inside the main content, where it then behaves as above.
     Outside an AppShell, SideNavPortal renders its children in place.
*/
import React from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx.js';
import { arrowStep, isRtl } from '../../utils/direction.js';
import { snapSize, stepSize } from '../../utils/sizeSteps.js';
import { pageLayout } from '../../providers/pageLayouts.js';

const STRINGS = { skip: 'Skip to main content' };
// the five layout modes (the Layout foundation; app-shell.css draws them)
const LAYOUTS = ['fluid', 'contained', 'hybrid', 'multi-pane', 'focus'];

export const LayoutContext = React.createContext(null);
export const useAppLayout = () => React.useContext(LayoutContext);
/* the shell's sizes and breakpoints come from the tokens, never from numbers here:
   --plx-sys-shell-nav-width, -min-width, -max-width, --plx-sys-shell-splitter-step, --plx-sys-shell-rail-below,
   --plx-sys-shell-inspector-overlay-below */
export const tokenValue = (name) => (typeof document === 'undefined' ? '' : getComputedStyle(document.documentElement).getPropertyValue(name).trim());
export const tokenPx = (name) => parseFloat(tokenValue(name)) || 0;
// a media query for "narrower than the breakpoint token" (range syntax: the token's value is used as written)
export const below = (name) => '(width < ' + (tokenValue(name) || '0px') + ')';

export function useMedia(query) {
  const get = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false);
  const [on, setOn] = React.useState(get);
  React.useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(query), f = () => setOn(mq.matches);
    f(); mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, [query]);
  return on;
}
export const readPref = (key, fallback) => { try { const v = JSON.parse(localStorage.getItem(key)); return v === null || v === undefined ? fallback : v; } catch (e) { return fallback; } };
export const writePref = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* not stored: it lasts for this visit */ } };

export function AppShell({ header, sideNav, panel, footer, page = 'workspace', mainId = 'main', mainClassName, strings, className, children }) {
  // the page's kind, claimed by a pattern on the page when it is that kind of page (SettingsLayout), else the page prop
  const [claimed, setClaimed] = React.useState(null);
  const claimPage = React.useCallback((kind) => { setClaimed(kind); return () => setClaimed((k) => (k === kind ? null : k)); }, []);
  const layout = pageLayout(claimed || page);   // the design system's layout standard decides the mode
  const t = Object.assign({}, STRINGS, strings);
  const small = useMedia(below('--plx-sys-shell-rail-below'));
  const narrow = useMedia(below('--plx-sys-shell-phone-below'));
  const [barEl, setBarEl] = React.useState(null);         // where NavPane puts the bottom navigation bar at Narrow
  const [parentEl, setParentEl] = React.useState(null);   // where it puts the parent row (the way to the pane) at Narrow
  const [expanded, setExpanded] = React.useState(() => readPref('plenix.sideNav.expanded', true));
  const [width, setWidthState] = React.useState(() => readPref('plenix.sideNav.width', null));
  const [overlay, setOverlay] = React.useState(false);
  const [slotEl, setSlotEl] = React.useState(null);   // the side-navigation area a screen fills through SideNavPortal
  const [portals, setPortals] = React.useState(0);
  const registerPortal = React.useCallback(() => { setPortals((n) => n + 1); return () => setPortals((n) => n - 1); }, []);
  const hasSide = !!sideNav || portals > 0;
  const setWidth = React.useCallback((w) => { setWidthState(w); writePref('plenix.sideNav.width', w); }, []);
  const toggle = React.useCallback(() => {
    if (small) setOverlay((o) => !o);
    else setExpanded((e) => { writePref('plenix.sideNav.expanded', !e); return !e; });
  }, [small]);
  React.useEffect(() => { setOverlay(false); }, [small, narrow]);
  // Ctrl+[ collapses and expands the navigation from anywhere on the page
  React.useEffect(() => {
    if (!hasSide) return undefined;
    const key = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === '[') { e.preventDefault(); toggle(); } };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [toggle, hasSide]);
  const mode = !hasSide ? 'none' : narrow ? (overlay ? 'screen' : 'bar') : small ? (overlay ? 'overlay' : 'rail') : expanded ? 'inline' : 'rail';
  const ctx = React.useMemo(() => ({ hasSideNav: hasSide, slotEl, registerPortal, small, narrow, barEl, parentEl, mode, open: mode === 'inline' || mode === 'overlay' || mode === 'screen',
    expanded: small ? overlay : expanded, width, setWidth, toggle, close: () => setOverlay(false), page: claimed || page, layout, claimPage }),
  [hasSide, slotEl, registerPortal, small, narrow, barEl, parentEl, mode, overlay, expanded, width, setWidth, toggle, claimed, page, layout, claimPage]);
  return (
    <LayoutContext.Provider value={ctx}>
      <div className={cx('plx-app-shell', className)} data-plx-layout={LAYOUTS.indexOf(layout) >= 0 ? layout : 'fluid'}>
        <a className="plx-app-shell__skip" href={'#' + mainId}>{t.skip}</a>
        {header}
        {narrow && hasSide ? <div ref={setParentEl} className="plx-app-shell__parent-slot" /> : null}
        <div className="plx-app-shell__body">
          {sideNav || <div ref={setSlotEl} className="plx-app-shell__slot" />}
          <main id={mainId} tabIndex={-1} className={cx('plx-app-shell__main', mainClassName)} data-plx-layout={LAYOUTS.indexOf(layout) >= 0 ? layout : 'fluid'}>{children}</main>
          {panel}
        </div>
        {footer}
        {narrow && hasSide ? <div ref={setBarEl} className="plx-app-shell__bar-slot" /> : null}
      </div>
    </LayoutContext.Provider>
  );
}

/* the drag handle on a resizable area's inner edge: drag, or the arrow keys (16px), Home and End; double-click or Enter
   collapses the area when it can collapse. edge: "end" (an area at the start: dragging toward the end widens it) or
   "start" (an area at the end). In a right-to-left page the start is on the right, so the drag and Arrow Left / Right
   are mirrored (arrowStep gives the step in reading order). */
export function PanelSplitter({ label, value, min, max, onChange, onCollapse, edge = 'end' }) {
  const dir = edge === 'end' ? 1 : -1;
  // a width is always a size token (batch 281: Strict DS): dragging snaps to the nearest, the arrow keys step through them
  const clamp = (w) => snapSize(w, min, max());
  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const x0 = e.clientX, w0 = value, flip = isRtl(e.currentTarget) ? -1 : 1;
    const move = (ev) => onChange(clamp(w0 + (ev.clientX - x0) * dir * flip));
    const up = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.documentElement.classList.remove('is-resizing-columns'); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.documentElement.classList.add('is-resizing-columns');
  };
  const onKeyDown = (e) => {
    const step = arrowStep(e, e.currentTarget, { vertical: false }) * dir;
    if (step) { e.preventDefault(); onChange(stepSize(value, step, min, max())); }
    else if (e.key === 'Home') { e.preventDefault(); onChange(clamp(min)); }
    else if (e.key === 'End') { e.preventDefault(); onChange(clamp(max())); }
    else if (e.key === 'Enter' && onCollapse) { e.preventDefault(); onCollapse(); }
  };
  return (
    <div role="separator" aria-orientation="vertical" aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={clamp(max())} tabIndex={0}
      className={cx('plx-panel-splitter', 'plx-panel-splitter--' + edge)} onPointerDown={onPointerDown} onKeyDown={onKeyDown}
      onDoubleClick={onCollapse || undefined} />
  );
}

export function SideNavPortal({ children }) {
  const layout = useAppLayout();
  React.useEffect(() => (layout && layout.registerPortal ? layout.registerPortal() : undefined), []);
  if (!layout || !layout.registerPortal) return children;   // outside an AppShell: render in place
  return layout.slotEl ? createPortal(children, layout.slotEl) : null;
}

/* <PageContent>: the content column of a page inside the main region; see the header comment. */
export function PageContent({ as: As = 'section', className, children, ...rest }) {
  return <As className={cx('plx-page-content', className)} {...rest}>{children}</As>;
}
