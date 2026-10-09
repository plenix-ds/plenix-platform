/* Plenix · SidePanel
   Summary: The inspector panel on the right of the main region (details, a preview). Give it to the AppShell's panel.
   Usage:
     <SidePanel title="Details" icon="circle-info" open={open} onOpenChange={(next) => …} actions={<…/>} footer={<…/>}>…</SidePanel>
   Props:
     title: the panel's heading
     label: its landmark name (default: the title, or "Panel")
     icon: an icon name or element before the title
     open: true (default) shows the panel; false shows only its rail
     onOpenChange(open): runs from Collapse and Expand; without it there is no Collapse button and no rail
     actions: controls at the end of the header row
     footer: a row pinned to the panel's bottom (its actions: Save, Cancel), --plx-comp-pane-footer-height, its divider drawn inside
     collapseLabel: the Collapse button's label (default "Collapse panel")
     resizable: its start edge can be dragged (or moved with the arrow keys) between --plx-comp-side-panel-width-min and
       -max; the width is remembered; Home and End jump to the smallest and largest (batch 259); default false
     resizeLabel: the edge's accessible name (default "Resize panel")
     className: more classes
     children: the body
   Behavior:
     Width: --plx-sys-panel-inspector-width (by density: 320 / 360 / 400px), docked.
     Its own Collapse button starts its header row; collapsed, it is a rail with Expand.
     Below 1024px Expand opens it over the main region, between the header and the footer; Escape or a click outside closes it.
     When the window becomes that small, an open docked panel collapses to its rail.
   Notes:
     Not every capability has one; it shows only where it is given.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useLayer } from '../../utils/layer.js';
import { Button } from '../../components/Button/Button.jsx';
import { Icon } from '../../components/Icon/Icon.jsx';
import { ToolRail } from '../ToolRail/ToolRail.jsx';
import { useMedia, below, PanelSplitter, tokenPx } from '../AppShell/AppShell.jsx';

const WIDTH_KEY = 'plenix.sidePanelWidth';

export function SidePanel({ title, label, icon, open = true, onOpenChange, actions, footer, collapseLabel, resizable = false, resizeLabel, className, children }) {
  const small = useMedia(below('--plx-sys-shell-inspector-overlay-below'));
  const ref = React.useRef(null);
  const set = (next) => { if (onOpenChange) onOpenChange(next); };
  useLayer(ref, open && small, { onEscape: () => set(false) });
  // entering a small window: the docked panel would cover the main region, so it collapses to its rail
  React.useEffect(() => { if (small && open) set(false); }, [small]);
  const name = label || title || 'Panel';
  // the width dragged on its edge, remembered across visits (resizable, docked only)
  const [size, setSize] = React.useState(() => { try { return +localStorage.getItem(WIDTH_KEY) || null; } catch (e) { return null; } });
  const resize = (w) => { setSize(w); try { localStorage.setItem(WIDTH_KEY, String(w)); } catch (e) { /* this visit only */ } };
  const docked = resizable && !small;
  const railEl = onOpenChange ? (
    <ToolRail label={name + ' pane'} className="plx-side-panel-rail"><ToolRail.Item icon="panel-right-open" label="Expand panel" onClick={() => set(true)} /></ToolRail>
  ) : null;
  if (!open) return railEl;
  const pane = (
    <aside ref={ref} aria-label={name} className={cx('plx-side-panel', small && 'plx-side-panel--overlay', docked && 'plx-side-panel--resizable', docked && size && 'plx-side-panel--resized', className)}
      style={{ '--plx-comp-side-panel-width': docked && size ? size + 'px' : undefined }}>
      <div className="plx-side-panel__header">
        {onOpenChange ? <Button size="sm" variant="ghost" iconOnly icon="panel-right-close" label={collapseLabel || 'Collapse panel'} onClick={() => set(false)} /> : null}
        {icon ? <span className="plx-side-panel__icon" aria-hidden="true">{typeof icon === 'string' ? <Icon name={icon} /> : icon}</span> : null}
        <h2 className="plx-side-panel__title">{title}</h2>
        {actions}
      </div>
      <div className="plx-side-panel__body">{children}</div>
      {footer ? <div className="plx-side-panel__footer">{footer}</div> : null}
      {docked ? (
        <PanelSplitter label={resizeLabel || 'Resize panel'} edge="start" min={tokenPx('--plx-comp-side-panel-width-min')} max={() => tokenPx('--plx-comp-side-panel-width-max')}
          value={size || tokenPx('--plx-sys-panel-inspector-width')} onChange={resize} onCollapse={onOpenChange ? () => set(false) : undefined} />
      ) : null}
    </aside>
  );
  return small ? <>{railEl}<div className="plx-app-shell__scrim" aria-hidden="true" onMouseDown={() => set(false)} />{pane}</> : pane;
}
