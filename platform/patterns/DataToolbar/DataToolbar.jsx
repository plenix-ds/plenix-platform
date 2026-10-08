/* Plenix · DataToolbar
   Summary: The toolbar row above a list or grid (view switch, sort, size, export).
   Usage:
     <DataToolbar label="View options" start={<>…</>} end={<>…</>} />
   Props:
     label: the toolbar's accessible name
     start: a group of controls at the start of the row
     end: a group of controls at the end of the row
     children: controls after the start group
     className: more classes
   Behavior:
     It is a Toolbar: arrow keys move between the controls (one Tab stop sequence).
     Controls take the toolbar role height.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Toolbar } from '../../components/Toolbar/Toolbar.jsx';

export function DataToolbar({ label, start, end, className, children }) {
  return (
    <Toolbar label={label} className={cx('plx-data-toolbar', className)}>
      {start ? <Toolbar.Group className="plx-data-toolbar__group">{start}</Toolbar.Group> : null}
      {children}
      <Toolbar.Spacer />
      {end ? <Toolbar.Group className="plx-data-toolbar__group">{end}</Toolbar.Group> : null}
    </Toolbar>
  );
}
