/* Plenix · IconTile
   Summary: An icon on a tinted, rounded square: the marker of an object type, a category or an integration in lists,
     cards and headers (the entity's kind in EntityHeader's { icon, hue } media).
   Usage:
     <IconTile icon="briefcase" hue="blue" />
     <IconTile icon="alert" tone="warning" size="sm" label="Overdue" />
     <IconTile icon="sparkle" hue="purple" size="lg" filled />
   Props:
     icon: the Plenix icon name (platform/icons/map.json)
     hue: the tile's data color: "blue" | "green" | "purple" | "red" | "brown" | "gray" (default) | "surface" (the page
       surface with the icon in the link blue)
     tone: a status tone instead of a hue: "neutral" | "info" | "success" | "warning" | "danger"; it wins over hue
     size: "sm" (a 32px tile, 16px icon) | "md" (40px, 20px; default) | "lg" (48px, 24px; EntityHeader's tile)
     filled: the filled version of the icon (default false)
     label: the accessible name, when the tile alone carries meaning; without it the tile is decorative
     className: more classes on the tile
   Behavior:
     Not interactive: no hover, no focus. A tile that opens something sits inside the row, card or button that does.
     The tile and its icon size together by the named size, on the 4px grid; the icon is centered.
     Hues are the data colors (the same in light and dark); tones are the feedback roles, which follow the theme.
   Notes:
     The icon is the Plenix set (Material Symbols, unedited); no letters or numbers in a tile.
     Other props pass through to the <span>.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.ts';
import { cx } from '../../utils/cx.ts';
import { Icon } from '../Icon/Icon.tsx';
import type { IconValue } from '../Icon/Icon.tsx';

const HUES = ['blue', 'green', 'purple', 'red', 'brown', 'gray', 'surface'];
const TONES = ['neutral', 'info', 'success', 'warning', 'danger'];
const SIZES = ['sm', 'md', 'lg'];

export type IconTileProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** an icon name or an imported icon module */
  icon?: IconValue | null;
  hue?: 'blue' | 'green' | 'purple' | 'red' | 'brown' | 'gray' | 'surface';
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  filled?: boolean;
  /** the accessible name; without it the tile is decorative */
  label?: string;
};
export function IconTile({ icon, hue = 'gray', tone, size = 'md', filled = false, label, className, ...rest }: IconTileProps) {
  devWarn('IconTile', { tone, size }, { tone: ['info','success','warning','danger','neutral'], size: ['sm','md','lg'] });
  const look = TONES.indexOf(tone as string) >= 0 ? tone : HUES.indexOf(hue) >= 0 ? hue : 'gray';
  const s = SIZES.indexOf(size) >= 0 ? size : 'md';
  return (
    <span className={cx('plx-icon-tile', 'plx-icon-tile--' + s, 'plx-icon-tile--' + look, className)}
      role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...rest}>
      <Icon name={icon} size={s as 'sm' | 'md' | 'lg'} filled={filled} />
    </span>
  );
}
