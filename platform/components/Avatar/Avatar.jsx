/* Plenix · Avatar
   Summary: A person's picture, or their initials, in a rounded square (never a circle).
   Usage:
     <Avatar name="Raphael Maher" size="md" />
     <Avatar name="Raphael Maher" src="/people/rm.jpg" label="Raphael Maher" />
   Props:
     name: the person's name; without a picture the avatar shows its initials, from initialsOf(name)
     src: the URL of the person's picture; it replaces the initials
     initials: the text to show, only when there is no name to work from
     size: "2xs" 20px | "xs" 24px | "sm" 28px (default) | "md" 32px | "lg" 40px | "xl" 48px | "2xl" 64px; "2xs" is for inside a small control
       (the account row in a pane footer)
     background: the person's own background color when the data has one (otherwise the theme's avatar colors)
     color: the person's own text color when the data has one (otherwise the theme's avatar colors)
     label: the person's name for assistive technology when no visible name is nearby; without it the avatar is hidden from
       assistive technology
     className: more classes on the avatar
     style: more inline styles on the avatar
   Behavior:
     The corner and the text size follow the size.
     Initials are the first letters of the first and last name ("Raphael Maher" → RM).
     Titles such as "Fr." or "Dr." and parenthesized parts are skipped; one word gives one letter.
     With a label the avatar is an image (role="img") named by the label.
   Notes:
     Other props pass through to the <span>.
     initialsOf(name) is also exported for pages that need the same initials.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

const SIZES = [20, 24, 28, 32, 40, 48, 64];   // the scale its classes define (plx-avatar--24 …)
// the names pages use: 2xs 20 (inside a small control: the account row in a pane footer), xs 24, sm 28, md 32, lg 40, xl 48, 2xl 64 (numbers are rejected by the system check)
const NAMED = { '2xs': 20, xs: 24, sm: 28, md: 32, lg: 40, xl: 48, '2xl': 64 };

// first- and last-name initials: titles (a word ending in a period, e.g. "Fr.") and parenthesized parts are skipped
export function initialsOf(name) {
  const words = String(name || '').replace(/\([^)]*\)/g, ' ').split(/\s+/).filter((w) => w && !/\.$/.test(w) && /[A-Za-z0-9]/.test(w));
  if (!words.length) return '';
  const first = words[0].match(/[A-Za-z0-9]/)[0], last = words.length > 1 ? words[words.length - 1].match(/[A-Za-z0-9]/)[0] : '';
  return (first + last).toUpperCase();
}

export function Avatar({ name, src, initials, size = 'sm', background, color, label, className, ...rest }) {
  const n = NAMED[size] || size;
  const s = SIZES.indexOf(n) >= 0 ? n : NAMED.sm;
  const text = name ? initialsOf(name) : initials;
  return (
    <span className={cx('plx-avatar', 'plx-avatar--' + s, className)} data-plx-avatar="" style={{ '--plx-comp-avatar-own-background': background || undefined, '--plx-comp-avatar-own-content': color || undefined }} role={label ? 'img' : undefined}
      aria-label={label} aria-hidden={label ? undefined : true} {...rest}>{src ? <img className="plx-avatar__image" src={src} alt="" /> : text}</span>
  );
}
