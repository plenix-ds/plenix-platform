/* Plenix · SectionHeading
   Summary: A small uppercase heading that names a group (navigation sections, panel sections, settings), sized by its level.
   Usage:
     <SectionHeading collapsible expanded={open} onToggle={() => setOpen(!open)} controls="recent-body">Recent</SectionHeading>
     <SectionHeading level={2}>Appearance</SectionHeading>
   Props:
     level: the heading level; default 3; null for a plain label. Each level takes its own size from the type scale: 2 (13px)
       is larger than 3 (11px), which is larger than 4 (10px); a plain label and levels 5 and 6 are 10px
     collapsible: renders a button that shows or hides the section; default false
     expanded: whether the section is shown (collapsible only); default true
     onToggle(event): runs when the button is clicked (collapsible only)
     controls: the id of the section body (collapsible only)
     actions: controls at the end of the heading
     className: more classes on the heading
     children: the label text
     ...rest: other attributes go on the heading element
   Behavior:
     The chevron turns with expanded.
     The size follows the level (plx-section-heading--level-2, -3, -4), so pick the level from the outline, never for a size.
   Notes:
     It sets no outer margin: the list or panel it sits in spaces it. Unframed peer sections: <Stack gap="section"> of
     <Stack gap="sm"> (the heading and its content), see Stack.gap.
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';

// the levels with their own size (section-heading.css); the others keep the base size
const LEVELS = [2, 3, 4];

export type SectionHeadingProps = React.HTMLAttributes<HTMLElement> & {
  /** the heading level (h1 to h6); 0 or none: a div */
  level?: number;
  collapsible?: boolean;
  expanded?: boolean;
  onToggle?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** the id of the region the toggle shows and hides */
  controls?: string;
  actions?: React.ReactNode;
};
export function SectionHeading({ level = 3, collapsible = false, expanded = true, onToggle, controls, actions, className, children, ...rest }: SectionHeadingProps) {
  const Tag = (level ? 'h' + level : 'div') as React.ElementType;
  const sized = LEVELS.indexOf(level) >= 0 && 'plx-section-heading--level-' + level;
  if (collapsible) {
    return (
      <Tag className={cx('plx-section-heading', sized, 'plx-section-heading--collapsible', className)} {...rest}>
        <button type="button" className="plx-section-heading__toggle" aria-expanded={expanded} aria-controls={controls} onClick={onToggle}>
          <span className="plx-section-heading__label">{children}</span>
          <span className="plx-section-heading__chevron" aria-hidden="true" />
        </button>
        {actions ? <span className="plx-section-heading__actions">{actions}</span> : null}
      </Tag>
    );
  }
  return (
    <Tag className={cx('plx-section-heading', sized, className)} {...rest}>
      <span className="plx-section-heading__label">{children}</span>
      {actions ? <span className="plx-section-heading__actions">{actions}</span> : null}
    </Tag>
  );
}
