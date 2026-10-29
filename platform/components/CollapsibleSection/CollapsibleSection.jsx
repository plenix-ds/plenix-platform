/* Plenix · CollapsibleSection
   Summary: A titled section that expands and collapses.
   Usage:
     <CollapsibleSection title="Collections" icon="briefcase" defaultExpanded actions={<Button…/>}>…</CollapsibleSection>
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
     ShowMore: the "Show more" button under a list that shows only its first rows (owner, batch 276: it carries an icon):
       ShowMore.expanded: the rest is shown (aria-expanded); the label reads "Show less" and the chevron points up
       ShowMore.count: how many are hidden, shown as "Show more (count)" (a number, or text such as "+3")
       ShowMore.onToggle(next): runs with the new state
       ShowMore.size: the button size (default "2xs", the smallest); other props reach the Button (variant)
   Behavior:
     Controlled with expanded and onToggle(next); uncontrolled with defaultExpanded.
     The header is one button (aria-expanded, pointing at the body).
     The chevron at the end points down while open.
     The body is removed from view, and from the accessibility tree, while collapsed.
   Notes:
     It is the section header: an accent uppercase title with an optional icon, a divider beneath it and a
       chevron at the end.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';
import { useUid } from '../../utils/layer.js';
import { Icon, asIcon as iconElement } from '../Icon/Icon.jsx';
import { Button } from '../Button/Button.jsx';
import { useStrings } from '../../providers/LocaleProvider.jsx';
import ChevronDownIcon from 'plenix-platform/icons/plenix/chevron-down';
import ChevronUpIcon from 'plenix-platform/icons/plenix/chevron-up';

const asIcon = (i) => iconElement(i);   // a name or an imported module (#280)

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
          <span className="plx-collapsible-section__chevron" aria-hidden="true"><Icon name={ChevronDownIcon} /></span>
        </button>
        {actions ? <span className="plx-collapsible-section__actions">{actions}</span> : null}
      </Tag>
      <div id={id + '-body'} className={cx('plx-collapsible-section__body', bodyClassName)} hidden={!open}>{children}</div>
    </section>
  );
}

// "Show more (n)" / "Show less" with its chevron after the label: down to show more, up to show less (batch 276)
export function ShowMore({ expanded = false, count, onToggle, size = '2xs', strings, ...rest }) {
  devWarn('ShowMore', { size }, { size: ['md','sm','xs','2xs','lg'] });
  const t = useStrings('collapsibleSection', strings);
  return (
    <Button size={size} iconEnd={expanded ? ChevronUpIcon : ChevronDownIcon} aria-expanded={expanded} onClick={() => { if (onToggle) onToggle(!expanded); }} {...rest}>
      {expanded ? t.less : (count !== undefined && count !== null && count !== '' ? t.moreCount.replace('{n}', count) : t.more)}
    </Button>
  );
}
