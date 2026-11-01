/* Plenix · Preview
   Summary: The large picture of the item an inspector shows (or a placeholder with its icon and count).
     It is the sunken surface, rounded, in a shape of the aspect-ratio scale (4:3 by default), with its content centered.
   Usage:
     <Preview ratio="16-9" fit="cover"><img className="plx-preview__media" src={src} alt="Kitchen, before" /></Preview>
     <Preview as="button" onClick={openViewer} topStart={<Tag>PNG</Tag>} bottomEnd={<Icon name="expand" />}>
       <img src={src} alt="" />
     </Preview>
   Props:
     as: "div" (default) | "button" (opens the item, e.g. the media viewer)
     ratio: the shape, from the aspect-ratio scale (--plx-ref-ratio-*): "4-3" (default) | "1-1" | "3-2" | "16-9" | "21-9" |
       "3-4" | "9-16" (the last two portrait)
     aspect: the older name of ratio, as a photo's: "4/3" | "3/2" | "1/1" | "16/9" (as MediaCard's); ratio wins
     fit: how a picture (.plx-preview__media) fills the frame: none (default: a thumbnail at its own size, centered) |
       "cover" (it fills the frame and is cropped to it) | "contain" (it fills the frame, the whole picture showing)
     topStart: a small mark in the top-start corner (the type)
     bottomEnd: a small mark in the bottom-end corner (an expand icon)
     className: more classes on the preview
     children: the picture or placeholder
     ...rest: other attributes go on the preview element (onClick for a button)
   Behavior:
     The frame keeps its ratio at every width, so the space is reserved before the picture loads.
     cover and contain never stretch the picture; cover crops what does not fit, contain leaves the sunken surface around it.
   Notes:
     A ratio outside the scale falls back to 4:3: add it to the scale (a token) first.
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';

// the aspect-ratio scale (the Aspect-ratio scale foundation, platform/tokens/reference/ratio.tokens.json)
const RATIOS = ['1-1', '4-3', '3-2', '16-9', '21-9', '3-4', '9-16'];
const FITS = ['cover', 'contain'];

export type PreviewProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  /** a step of the aspect-ratio scale: '1-1' | '4-3' | '3-2' | '16-9' | '21-9' | '3-4' | '9-16' */
  ratio?: string;
  /** the same written with a slash ('16/9'), when ratio is not given */
  aspect?: string;
  fit?: 'cover' | 'contain';
  topStart?: React.ReactNode;
  bottomEnd?: React.ReactNode;
};
export function Preview({ as: As = 'div', ratio, aspect = '4/3', fit, topStart, bottomEnd, className, children, ...rest }: PreviewProps) {
  const r = ratio || String(aspect).replace('/', '-');
  return (
    <As type={As === 'button' ? 'button' : undefined} data-plx-ratio={RATIOS.indexOf(r) >= 0 ? r : '4-3'} {...rest}
      className={cx('plx-preview', As === 'button' && 'plx-preview--button', FITS.indexOf(fit as string) >= 0 && 'plx-preview--' + fit, className)}>
      {children}
      {topStart ? <span className="plx-preview__corner plx-preview__corner--top-start">{topStart}</span> : null}
      {bottomEnd ? <span className="plx-preview__corner plx-preview__corner--bottom-end">{bottomEnd}</span> : null}
    </As>
  );
}
