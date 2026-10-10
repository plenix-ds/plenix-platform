/* Plenix · NavPane
   Summary: The navigation pane, the same on every page of every application. Give it to the AppShell's sideNav (or a
     SideNavPortal); the shell owns its size and state.
   Usage:
     <NavPane label="Categories and collections" title="Asset Manager" actions={<…/>}
       header={<…/>} rail={<…/>} footer={<…/>}>{children}</NavPane>
   Props:
     label: names the navigation landmark (also the rail and the splitter)
     title: the pane's title, the application's or the page's name (Messages, Asset Manager, System Settings)
     actions: the pane's actions in the title row: small icon buttons such as Filter and New
     as: "nav" (default; a navigation landmark) | "div" (when the content brings its own landmark, a NavList)
     header: a second row under the title row, for the pane's own shortcuts (the asset browser's Home and Files)
     footer: a row pinned to the bottom (--plx-comp-pane-footer-height, its divider drawn inside): the app's or section's
       settings, or the way back from a settings screen
     rail: the page's rail items (<ToolRail.Item…/>), shown when the pane is collapsed
     collapseAt: "end" (default; the row's end, facing the main region) | "start" (only for a pane on the right)
     width: its own width outside an AppShell (default: the shell navigation width)
     className: more classes on the pane
     children: the body: NavList groups (whose headings are collapsible section headers), a filter field, buttons
   Behavior:
     Its size follows the Layout grid's shell: --plx-sys-shell-nav-width (240px), resizable 140–320px with the splitter on its edge.
     The first row is the same on every pane: the title, the actions, then the Collapse button at the row's end, on the side
       that faces the main region.
     Collapsed, it is a rail (ToolRail) of the page's rail items with Expand always first, at the top, then a divider.
     Below 768px it is a rail whose Expand opens the pane over the main region; Escape or a click outside closes it.
     The body scrolls; its bar shows on hover.
     Outside an AppShell it is a plain pane (width: its own, or the shell navigation width) with no Collapse button.
   Notes:
     The shared first row dates from batch 153.
     Every page's pane has a footer.
     The content is the page's.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useLayer } from '../../utils/layer.js';
import { Button } from '../../components/Button/Button.jsx';
import { ToolRail } from '../ToolRail/ToolRail.jsx';
import { useAppLayout, PanelSplitter, tokenPx } from '../AppShell/AppShell.jsx';
import { snapSize } from '../../utils/sizeSteps.js';

export function NavPane({ label, title, actions, as = 'nav', header, footer, rail, collapseAt = 'end', width, className, children }) {
  const layout = useAppLayout();
  const ref = React.useRef(null);
  const Tag = as;
  const mode = layout && layout.hasSideNav ? layout.mode : 'static';
  // the overlay is a layer: Escape closes it
  useLayer(ref, mode === 'overlay', { onEscape: layout ? layout.close : undefined });
  const expand = <ToolRail.Item icon="panel-left-open" label="Expand sidebar" onClick={layout ? layout.toggle : undefined} />;
  const railEl = mode === 'rail' || mode === 'overlay' ? (
    <ToolRail label={label || 'Navigation'} className="plx-nav-pane-rail">{rail ? <>{expand}<ToolRail.Divider />{rail}</> : expand}</ToolRail>
  ) : null;
  if (mode === 'rail') return railEl;
  // a width only the page or the person knows (the width prop, or the splitter's) reaches the stylesheet as the pane's width token
  const w = mode === 'static' ? width : layout.width;
  const paneWidth = w ? snapSize(parseInt(w, 10), tokenPx('--plx-sys-shell-nav-min-width'), tokenPx('--plx-sys-shell-nav-max-width')) + 'px' : undefined;
  const collapse = mode === 'static' ? null : (
    <span className={cx('plx-nav-pane__collapse', 'plx-nav-pane__collapse--' + collapseAt)}>
      <Button size="sm" variant="ghost" iconOnly icon="panel-left-close" label="Collapse sidebar" onClick={layout.toggle} />
    </span>
  );
  const pane = (
    <Tag ref={ref} aria-label={Tag === 'nav' ? label : undefined} className={cx('plx-nav-pane', mode !== 'static' && 'plx-nav-pane--' + mode, className)} data-plx-width={paneWidth}>
      {title || actions || collapse ? (
        <div className="plx-nav-pane__header">
          {collapseAt === 'start' ? collapse : null}
          {title ? <span className="plx-nav-pane__title">{title}</span> : null}
          {actions ? <span className="plx-nav-pane__actions">{actions}</span> : null}
          {collapseAt !== 'start' ? collapse : null}
        </div>) : null}
      {header ? <div className="plx-nav-pane__subheader">{header}</div> : null}
      <div className="plx-nav-pane__body">{children}</div>
      {footer ? <div className="plx-nav-pane__footer">{footer}</div> : null}
      {mode === 'inline' ? <PanelSplitter label={'Resize ' + (label || 'navigation')} value={layout.width || tokenPx('--plx-sys-shell-nav-width')}
        min={tokenPx('--plx-sys-shell-nav-min-width')} max={() => tokenPx('--plx-sys-shell-nav-max-width')} onChange={layout.setWidth} edge="end" /> : null}
    </Tag>
  );
  // below 768px: the rail stays in place; the pane opens over the main region
  return mode === 'overlay' ? <>{railEl}<div className="plx-app-shell__scrim" aria-hidden="true" onMouseDown={layout.close} />{pane}</> : pane;
}
