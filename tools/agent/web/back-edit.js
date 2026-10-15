const fs = require('fs');
const R = 'D:/Documents/Projects/Projects_Applications/Plenix/platform/patterns/';
function edit(file, pairs) {
  const p = R + file; let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) { if (!s.includes(a)) throw new Error(file + ' missing: ' + a.slice(0, 90)); s = s.replace(a, b); }
  fs.writeFileSync(p, s);
}
edit('AppShell/AppShell.jsx', [
  [`       { mode, open, expanded, width, setWidth, toggle, close, small, narrow, barEl, parentEl, hasSideNav, page, layout,
         claimPage(kind) }; mode is "inline", "rail", "overlay" (Medium), "bar" or "screen" (Narrow) or "none"`,
   `       { mode, open, expanded, width, setWidth, toggle, close, small, narrow, barEl, parentEl, hasSideNav, page, layout,
         claimPage(kind), parentRow, claimParentRow(), detailBack, claimBack({ label, onBack, ref }) }; mode is "inline",
         "rail", "overlay" (Medium), "bar" or "screen" (Narrow) or "none". parentRow is true while NavPane draws the parent
         row at Narrow; detailBack is a list-detail's Back (SecondaryPane, while its detail shows at Narrow), which the
         parent row then becomes; each claim returns its release`],
  [`  const hasSide = !!sideNav || portals > 0;`,
   `  const hasSide = !!sideNav || portals > 0;
  // one back control at Narrow: the parent row (NavPane) says it is drawn; a list-detail's Back (SecondaryPane) hands
  // itself to it while the detail shows, so the page never has two back rows
  const [parentRow, setParentRow] = React.useState(false);
  const [detailBack, setDetailBack] = React.useState(null);
  const claimParentRow = React.useCallback(() => { setParentRow(true); return () => setParentRow(false); }, []);
  const claimBack = React.useCallback((b) => { setDetailBack(b); return () => setDetailBack((x) => (x === b ? null : x)); }, []);`],
  [`    expanded: small ? overlay : expanded, width, setWidth, toggle, close: () => setOverlay(false), page: claimed || page, layout, claimPage }),
  [hasSide, slotEl, registerPortal, small, narrow, barEl, parentEl, mode, overlay, expanded, width, setWidth, toggle, claimed, page, layout, claimPage]);`,
   `    expanded: small ? overlay : expanded, width, setWidth, toggle, close: () => setOverlay(false), page: claimed || page, layout, claimPage,
    parentRow, claimParentRow, detailBack, claimBack }),
  [hasSide, slotEl, registerPortal, small, narrow, barEl, parentEl, mode, overlay, expanded, width, setWidth, toggle, claimed, page, layout, claimPage,
    parentRow, claimParentRow, detailBack, claimBack]);`],
]);
edit('NavPane/NavPane.jsx', [
  [`destination is in it). Without, the pane is the first screen of a stack, and a parent row at the top of the page
         (the pane's title after a back arrow) opens it.`,
   `destination is in it). Without, the pane is the first screen of a stack, and a parent row at the top of the page
         (the pane's title after a back arrow) opens it. While a list-detail's detail shows (SecondaryPane detailOpen),
         the parent row is that detail's Back instead ("Back to {list}"; it returns to the list), so the page has one back
         control; when the list shows again, the row opens the pane as before.`],
  [`  const narrow = mode === 'bar' || mode === 'screen';
`, `  const narrow = mode === 'bar' || mode === 'screen';
  const items = narrow ? railItems(rail) : [];
  // the parent row (Narrow, fewer than two destinations) tells the shell it is drawn, so a list-detail's Back joins it
  const rowed = narrow && items.length < 2 && !!(layout && layout.parentEl);
  const claimRow = layout ? layout.claimParentRow : null;
  React.useLayoutEffect(() => (rowed && claimRow ? claimRow() : undefined), [rowed, claimRow]);
`],
  [`    const items = railItems(rail);
    const close =`, `    const close =`],
  [`    } else if (layout.parentEl && mode === 'bar') {
      narrowEl = createPortal(
        <div className="plx-nav-pane-parent">
          <Button size="sm" variant="ghost" icon="arrow-left" onClick={layout.toggle}>{title || label || t.browse}</Button>
        </div>, layout.parentEl);`, `    } else if (layout.parentEl && mode === 'bar') {
      const back = layout.detailBack;   // a list-detail's detail shows: the row is its Back
      narrowEl = createPortal(
        <div className="plx-nav-pane-parent">
          {back
            ? <Button ref={back.ref} size="sm" variant="ghost" icon="arrow-left" onClick={back.onBack}>{back.label}</Button>
            : <Button size="sm" variant="ghost" icon="arrow-left" onClick={layout.toggle}>{title || label || t.browse}</Button>}
        </div>, layout.parentEl);`],
]);
edit('SecondaryPane/SecondaryPane.jsx', [
  [`       "Back to {name}" leads the detail; focus moves to it. Back brings the list back with focus on the item that was
       chosen.`, `       "Back to {name}" leads the detail; focus moves to it. Where the shell draws a parent row (NavPane at Narrow
       without a bottom navigation bar), that row becomes the Back and the pane draws no bar of its own: one back
       control. Back brings the list back with focus on the item that was chosen.`],
  [`import { PanelSplitter, tokenPx, below, useMedia } from '../AppShell/AppShell.jsx';`,
   `import { PanelSplitter, tokenPx, below, useMedia, useAppLayout } from '../AppShell/AppShell.jsx';`],
  [`  // focus: to the Back control when the detail opens at Narrow; back to the chosen item when the list returns
  const back = React.useRef(null);`, `  // the Back control: the shell's parent row when there is one (one back control at Narrow), else the pane's own bar
  const layout = useAppLayout();
  const back = React.useRef(null);
  const backAction = React.useRef(onBack);
  backAction.current = onBack;
  const backLabel = named(t.back);
  const claimBack = layout ? layout.claimBack : null;
  React.useLayoutEffect(() => (stepAside && claimBack
    ? claimBack({ label: backLabel, onBack: (e) => { if (backAction.current) backAction.current(e); }, ref: back }) : undefined), [stepAside, backLabel, claimBack]);
  const ownBar = stepAside && !(layout && layout.parentRow);
  // focus: to the Back control when the detail opens at Narrow; back to the chosen item when the list returns`],
  [`    if (stepAside) { if (back.current) back.current.focus(); return; }
    const items = body.current ? focusables(body.current) : [];
    const item = items[chosen.current] || items[0];
    const lost = !document.activeElement || document.activeElement === document.body;   // the Back control took focus with it`,
   `    if (stepAside) {   // the shell's row takes the control a moment later (its own render): focus it once it is there
      const go = () => { if (back.current) back.current.focus(); };
      if (back.current) go(); else requestAnimationFrame(go);
      return;
    }
    const items = body.current ? focusables(body.current) : [];
    const item = items[chosen.current] || items[0];
    // the Back control took focus with it, or focus stayed on the shell's row (which is now the way to the pane)
    const ae = document.activeElement;
    const lost = !ae || ae === document.body || !!(layout && layout.parentEl && layout.parentEl.contains(ae));`],
  [`  // at Narrow with the detail open: the list stays mounted (hidden) and the Back bar leads the detail
  return stepAside ? (`, `  // at Narrow with the detail open: the list stays mounted (hidden) and the Back bar leads the detail (unless the shell's
  // parent row is the Back)
  return ownBar ? (`],
  [`        <Button ref={back} size="sm" variant="ghost" icon="arrow-left" onClick={onBack}>{named(t.back)}</Button>`,
   `        <Button ref={back} size="sm" variant="ghost" icon="arrow-left" onClick={onBack}>{backLabel}</Button>`],
]);
console.log('ok');
