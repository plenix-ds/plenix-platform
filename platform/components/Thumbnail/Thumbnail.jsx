/* Plenix · Thumbnail
   Summary: A small picture of a file or an item beside its name (a table's name cell, a list row).
     It shows the picture, or an icon when there is none, in a 28px rounded square on the sunken surface.
   Usage:
     <Thumbnail src={asset.thumbUrl} icon="image" />
   Props:
     src: the picture's URL
     alt: the picture's text alternative; default "" (empty when the name is next to it)
     icon: the icon shown without src; default "document"
   Behavior:
     The picture loads lazily.
     The icon is decorative and hidden from assistive technology.
*/
import React from 'react';
import { Icon } from '../Icon/Icon.jsx';

export function Thumbnail({ src, alt = '', icon = 'document' }) {
  return src ? <img className="plx-thumbnail" src={src} alt={alt} loading="lazy" /> : <span className="plx-thumbnail plx-thumbnail--icon" aria-hidden="true"><Icon name={icon} size="sm" /></span>;
}
