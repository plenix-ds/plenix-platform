/* Plenix · ActionBar
   Summary: A page's or a form's buttons in one bar on the right, kept in view at the bottom of the page while it scrolls.
   Usage:
     <ActionBar label="Asset type actions">
       <Button variant="danger-secondary" onClick={remove}>Delete</Button>
       <Button type="submit" variant="primary">Save changes</Button>
     </ActionBar>
   Props:
     label: names the group of buttons for screen readers; default "Actions"
     sticky: true (default) keeps page actions at the scroll bottom; false keeps an embedded bar in normal flow
     className: more classes on the bar
     children: the buttons, in reading order, the primary action last (it sits at the right edge); a destructive action
       first, away from the primary
   Behavior:
     The bar sticks to the bottom of the scrolling page (or form) it is in, so its buttons stay reachable on a long page;
     at the end of the page it sits in its place under the content. Buttons wrap to a new line, still on the right, when
     the bar is too narrow.
   Notes:
     Every page or form with actions uses it (the owner, batch 231: buttons on the right, in a bar that sticks to the
     bottom); SettingsSection's actions are drawn in one. Dialogs, panels and side panels keep their own footers (also
     on the right). A toolbar of tools (an editor's Save, Export) is a Toolbar, not an ActionBar.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function ActionBar({ label = 'Actions', sticky = true, className, children }) {
  return <div role="group" aria-label={label} className={cx('plx-action-bar', !sticky && 'plx-action-bar--static', className)}>{children}</div>;
}
