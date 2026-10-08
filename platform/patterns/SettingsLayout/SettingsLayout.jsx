/* Plenix · SettingsLayout, SettingsSection, SettingsRow
   Summary: Navigation beside the settings form. SettingsSection is a titled group of rows; SettingsRow puts the label and
     description at the start and the control at the end.
   Usage:
     <SettingsLayout nav={<NavList…/>}>
       <SettingsSection title="Regional" description="…">
         <SettingsRow label="Date format" description="…">{control}</SettingsRow>
       </SettingsSection>
     </SettingsLayout>
   Props:
     nav: the navigation (a NavList), drawn in a NavPane beside the content
     className: more classes
     children: the settings sections
     SettingsSection.title: the section's heading; it names the section landmark
     SettingsSection.description: a paragraph under the title
     SettingsSection.card: true draws it as a bordered card (asset-app style) for a form that needs grouping; default false
     SettingsSection.actions: the form's buttons, under the rows
     SettingsSection.headingLevel: the title's heading level (default 2)
     SettingsSection.className: more classes
     SettingsSection.children: the rows
     SettingsRow.label: the row's label, at the start
     SettingsRow.description: a line under the label
     SettingsRow.htmlFor: the control's id, so the label is a label element for it
     SettingsRow.className: more classes
     SettingsRow.children: the control, at the end
   Behavior:
     Each row is divided from the next.
     On a narrow layout the navigation stacks above the content.
   Notes:
     Fields (layout="inline" or "row") can be rows too.
     Give the control the row's label as its own accessible name.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useUid } from '../../utils/layer.js';
import { NavPane } from '../NavPane/NavPane.jsx';

export function SettingsLayout({ nav, className, children }) {
  return (
    <div className={cx('plx-settings', className)}>
      <div className="plx-settings__frame">
        {nav ? <NavPane as="div" className="plx-settings__nav">{nav}</NavPane> : null}
        <div className="plx-settings__content">{children}</div>
      </div>
    </div>
  );
}

export function SettingsSection({ title, description, card = false, actions, headingLevel = 2, className, children }) {
  const id = useUid('plx-set');
  const H = 'h' + headingLevel;
  return (
    <section aria-labelledby={title ? id : undefined} className={cx('plx-settings__section', card && 'plx-settings__section--card', className)}>
      {title ? <H id={id} className="plx-settings__section-title">{title}</H> : null}
      {description ? <p className="plx-settings__section-description">{description}</p> : null}
      <div className="plx-settings__rows">{children}</div>
      {actions ? <div className="plx-settings__actions">{actions}</div> : null}
    </section>
  );
}

export function SettingsRow({ label, description, htmlFor, className, children }) {
  return (
    <div className={cx('plx-settings__row', className)}>
      <div className="plx-settings__row-text">
        {htmlFor ? <label htmlFor={htmlFor} className="plx-settings__row-label">{label}</label> : <div className="plx-settings__row-label">{label}</div>}
        {description ? <div className="plx-settings__row-description">{description}</div> : null}
      </div>
      <div className="plx-settings__row-control">{children}</div>
    </div>
  );
}
