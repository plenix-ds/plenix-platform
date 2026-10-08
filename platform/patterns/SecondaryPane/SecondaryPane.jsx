/* Plenix · SecondaryPane
   Summary: A narrow pane beside the main content, inside the main region (under the header, beside the navigation pane):
     the asset browser's Files pane, the spec's "On this page", a project's capabilities. It can collapse to a rail and be
     resized by dragging its edge.
   Usage:
     <SecondaryPane title="Files" icon="folder-open" actions={…} side="start" width="md">…</SecondaryPane>
     <SecondaryPane title="Kitchen Renovation" collapsible resizable rail={<><ToolRail.Item … /></>}>…</SecondaryPane>
   Props:
     title: the title in the header row
     label: its landmark name (default: the title)
     icon: an icon name or element at the start of the header row
     actions: controls at the end of the header row
     side: "start" (default; before the content) | "end"
     width: "sm" (180px) | "md" (220px, default) | "lg" (280px), from --plx-comp-secondary-pane-width-*
     collapsible: a Collapse button in the header folds the pane to a rail (an Expand button, then the rail items); default false
     collapsed / onCollapsedChange(next): the folded state, controlled; defaultCollapsed: its first state when not controlled
     rail: the items the folded rail shows under Expand (ToolRail.Item elements)
     resizable: the pane's content edge can be dragged (or moved with the arrow keys) between its sm width and
       --plx-comp-secondary-pane-width-max; default false
     className: more classes
     children: the body
     strings: the words it announces, for other languages: { expand: "Expand {name}", collapse: "Collapse {name}", resize:
       "Resize {name}" } ({name} is the label, or the title)
   Behavior:
     The body scrolls on its own while the content scrolls beside it.
     The resize edge is a separator (role="separator", aria-valuenow); Arrow Left / Right move the edge, mirrored in a
     right-to-left page (as is dragging); Home and End jump to the smallest and largest width;
     Enter or a double click folds the pane when it is collapsible.
   Notes:
     It has the page surface, a divider on its content side, a header row (icon, title, actions) and a body.
     A dragged width reaches the stylesheet as --plx-comp-secondary-pane-width (no style is written).
     Other props go on its aside element.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../../components/Icon/Icon.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { ToolRail } from '../ToolRail/ToolRail.jsx';
import { PanelSplitter, tokenPx } from '../AppShell/AppShell.jsx';

const STRINGS = { expand: 'Expand {name}', collapse: 'Collapse {name}', resize: 'Resize {name}' };

export function SecondaryPane({ title, label, icon, actions, side = 'start', width = 'md', collapsible = false, collapsed, defaultCollapsed = false,
  onCollapsedChange, rail, resizable = false, strings, className, children, ...rest }) {
  const t = Object.assign({}, STRINGS, strings);
  const [ownCollapsed, setOwnCollapsed] = React.useState(defaultCollapsed);
  const folded = collapsible && (collapsed !== undefined ? collapsed : ownCollapsed);
  const setFolded = (next) => { if (collapsed === undefined) setOwnCollapsed(next); if (onCollapsedChange) onCollapsedChange(next); };
  const [size, setSize] = React.useState(null);
  const name = label || title;
  const named = (s) => s.split('{name}').join(name);
  if (folded) {
    return (
      <ToolRail label={name} className={cx('plx-secondary-pane-rail', 'plx-secondary-pane-rail--' + side, className)}>
        <ToolRail.Item icon={side === 'start' ? 'panel-left-open' : 'panel-right-open'} label={named(t.expand)} onClick={() => setFolded(false)} />
        {rail ? <><ToolRail.Divider />{rail}</> : null}
      </ToolRail>
    );
  }
  const min = () => tokenPx('--plx-comp-secondary-pane-width-sm');
  const max = () => tokenPx('--plx-comp-secondary-pane-width-max');
  return (
    <aside aria-label={name} className={cx('plx-secondary-pane', 'plx-secondary-pane--' + side, 'plx-secondary-pane--' + width, size && 'plx-secondary-pane--resized', className)}
      style={{ '--plx-comp-secondary-pane-width': size ? size + 'px' : undefined }} {...rest}>
      <div className="plx-secondary-pane__header">
        {icon ? (typeof icon === 'string' ? <Icon name={icon} /> : icon) : null}
        <span className="plx-secondary-pane__title">{title}</span>
        {actions}
        {collapsible ? <Button size="xs" variant="ghost" iconOnly icon={side === 'start' ? 'panel-left-close' : 'panel-right-close'} label={named(t.collapse)} onClick={() => setFolded(true)} /> : null}
      </div>
      <div className="plx-secondary-pane__body">{children}</div>
      {resizable ? (
        <PanelSplitter label={named(t.resize)} edge={side === 'start' ? 'end' : 'start'} min={min()} max={max}
          value={size || (tokenPx('--plx-comp-secondary-pane-width-' + width) || min())} onChange={setSize}
          onCollapse={collapsible ? () => setFolded(true) : undefined} />
      ) : null}
    </aside>
  );
}
