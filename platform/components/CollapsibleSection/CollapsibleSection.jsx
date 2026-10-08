/* Plenix · CollapsibleSection
   Summary: A titled section that expands and collapses.
   Usage:
     <CollapsibleSection title="Collections" icon="collection" defaultExpanded actions={<Button…/>}>…</CollapsibleSection>
   Props:
     title: the section title
     icon: an <Icon> (or an icon name) before the title
     expanded: the open state, when controlled
     defaultExpanded: the first open state, when uncontrolled (default true)
     onToggle(next): runs with the new open state when the header is clicked
     actions: controls beside the header, outside its button
     headingLevel: the heading level of the title (default 3; null for a plain label)
     className: more classes on the <section>
     bodyClassName: more classes on the body
     children: the body
   Behavior:
     Controlled with expanded and onToggle(next); uncontrolled with defaultExpanded.
     The header is one button (aria-expanded, pointing at the body).
     The chevron at the end points down while open.
     The body is removed from view, and from the accessibility tree, while collapsed.
   Notes:
     It keeps the legacy section header: an accent uppercase title with an optional icon, a divider beneath it and a
       chevron at the end.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useUid } from '../../utils/layer.js';
import { Icon } from '../Icon/Icon.jsx';

const asIcon = (i) => (typeof i === 'string' ? <Icon name={i} /> : i);

export function CollapsibleSection({ title, icon, expanded, defaultExpanded = true, onToggle, actions, headingLevel = 3, className, bodyClassName, children }) {
  const id = useUid('plx-collapsible-section');
  const [own, setOwn] = React.useState(defaultExpanded);
  const open = expanded !== undefined ? expanded : own;
  const toggle = () => { if (expanded === undefined) setOwn(!open); if (onToggle) onToggle(!open); };
  const Tag = headingLevel ? 'h' + headingLevel : 'div';
  return (
    <section className={cx('plx-collapsible-section', open && 'is-expanded', className)}>
      <Tag className="plx-collapsible-section__heading">
        <button type="button" className="plx-collapsible-section__toggle" aria-expanded={open} aria-controls={id + '-body'} onClick={toggle}>
          {icon ? <span className="plx-collapsible-section__icon" aria-hidden="true">{asIcon(icon)}</span> : null}
          <span className="plx-collapsible-section__title">{title}</span>
          <span className="plx-collapsible-section__chevron" aria-hidden="true"><Icon name="chevron-down" /></span>
        </button>
        {actions ? <span className="plx-collapsible-section__actions">{actions}</span> : null}
      </Tag>
      <div id={id + '-body'} className={cx('plx-collapsible-section__body', bodyClassName)} hidden={!open}>{children}</div>
    </section>
  );
}
