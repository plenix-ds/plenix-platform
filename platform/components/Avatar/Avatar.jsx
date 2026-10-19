/* Plenix · Avatar
   Summary: A person's picture, or their initials, in a rounded square (never a circle).
   Usage:
     <Avatar name="Maya Chen" size="md" />
     <Avatar name="Maya Chen" src="/people/mc.jpg" label="Maya Chen" />
   Props:
     name: the person's name; without a picture the avatar shows its initials, from initialsOf(name)
     src: the URL of the person's picture; it replaces the initials
     initials: the text to show, only when there is no name to work from
     size: "2xs" 20px | "xs" 24px | "sm" 28px (default) | "md" 32px | "lg" 40px | "xl" 48px | "2xl" 64px; "2xs" is for inside a small control
       (the account row in a pane footer)
     color: the person's own color when the data has one, a data color: a hue name (blue, green, purple, red, brown, gray: the --plx-sys-data-color-<hue> tokens), set as data-plx-color; no value is written (batch 280): its soft fill with
       its text color (otherwise the theme's avatar colors)
     category: instead of color, a category color by name (an avatar standing for a category): the color as its fill,
       black or white text (batch 290)
     label: the person's name for assistive technology when no visible name is nearby; without it the avatar is hidden from
       assistive technology
     presence: the person's availability (library wave 4): "online" | "away" | "busy" | "dnd" (do not disturb)
       | "offline", a StatusDot at the avatar's bottom end corner in the presence roles of the Status colors, ringed in the surface color;
       its size follows the avatar (a 6px dot up to 32px, 12px at 40 and 48px, 16px at 64px), and from 40px it carries the
       availability's shape (a check, a clock, busy the solid dot, do not disturb a minus, a cross) so it never rests on
       color alone
     strings: the words of presence, for other languages: { online: "Online", away: "Away", busy: "Busy",
       dnd: "Do not disturb", offline: "Offline" }
     className: more classes on the avatar
   Behavior:
     A picture that fails to load falls back to the initials. The picture loads lazily and decodes off the main thread
     (loading="lazy", decoding="async"), so a long list or table of avatars fetches only the ones near the view.
     The corner and the text size follow the size.
     Initials are the first letters of the first and last name ("Maya Chen" → MC).
     Titles such as "Fr." or "Dr." and parenthesized parts are skipped; one word gives one letter.
     With a label the avatar is an image (role="img") named by the label; with presence too, the name and the state ("Maya Chen, Busy").
     Without a label the presence dot is hidden with the avatar: the page says the state in words next to it.
   Notes:
     Other props pass through to the <span>.
     initialsOf(name) is also exported for pages that need the same initials.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';
import { StatusDot } from '../StatusDot/StatusDot.jsx';

const SIZES = [20, 24, 28, 32, 40, 48, 64];   // the scale its classes define (plx-avatar--24 …)
// the names pages use: 2xs 20 (inside a small control: the account row in a pane footer), xs 24, sm 28, md 32, lg 40, xl 48, 2xl 64 (numbers are rejected by the system check)
const NAMED = { '2xs': 20, xs: 24, sm: 28, md: 32, lg: 40, xl: 48, '2xl': 64 };
// presence (library wave 4): the availability tones, the dot's size for each avatar size, and the words
const PRESENCE = ['online', 'away', 'busy', 'dnd', 'offline'];
const DOT = { 20: 'sm', 24: 'sm', 28: 'sm', 32: 'sm', 40: 'md', 48: 'md', 64: 'lg' };
const STRINGS = { online: 'Online', away: 'Away', busy: 'Busy', dnd: 'Do not disturb', offline: 'Offline' };

// first- and last-name initials: titles (a word ending in a period, e.g. "Fr.") and parenthesized parts are skipped
export function initialsOf(name) {
  const words = String(name || '').replace(/\([^)]*\)/g, ' ').split(/\s+/).filter((w) => w && !/\.$/.test(w) && /[A-Za-z0-9]/.test(w));
  if (!words.length) return '';
  const first = words[0].match(/[A-Za-z0-9]/)[0], last = words.length > 1 ? words[words.length - 1].match(/[A-Za-z0-9]/)[0] : '';
  return (first + last).toUpperCase();
}

export function Avatar({ name, src, initials, size = 'sm', color, category, label, presence, strings, className, ...rest }) {
  devWarn('Avatar', { size }, { size: ['2xs','xs','sm','md','lg','xl','2xl'] });
  const n = NAMED[size] || size;
  const s = SIZES.indexOf(n) >= 0 ? n : NAMED.sm;
  const text = name ? initialsOf(name) : initials;
  const p = PRESENCE.indexOf(presence) >= 0 ? presence : null;
  const words = Object.assign({}, STRINGS, strings);
  const named = label && p ? label + ', ' + words[p] : label;
  // a picture that fails to load falls back to the initials (batch 215)
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => { setFailed(false); }, [src]);
  return (
    <span className={cx('plx-avatar', 'plx-avatar--' + s, p && 'plx-avatar--presence', className)} data-plx-avatar="" data-plx-color={color || undefined} data-plx-category={category || undefined} role={label ? 'img' : undefined}
      aria-label={named} aria-hidden={label ? undefined : true} {...rest}>{src && !failed ? <img className="plx-avatar__image" src={src} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} /> : text}
      {p ? <StatusDot tone={p} size={DOT[s]} icon={DOT[s] !== 'sm'} className="plx-avatar__presence" /> : null}</span>
  );
}
