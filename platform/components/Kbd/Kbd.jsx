/* Plenix · Kbd
   Summary: A key or shortcut ("Ctrl K").
   Usage:
     <Kbd>Ctrl K</Kbd>
     <Kbd onAccent>/</Kbd>
   Props:
     onAccent: the version for the blue header (default false)
     children: the key or shortcut text
     className: more classes on the <kbd>
   Notes:
     It uses the data font at a 16px label height.
     Other props pass through to the <kbd>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function Kbd({ onAccent = false, className, children, ...rest }) {
  return <kbd className={cx('plx-kbd', onAccent && 'plx-kbd--on-accent', className)} {...rest}>{children}</kbd>;
}
