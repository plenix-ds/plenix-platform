/* Plenix · Text
   Summary: A run of text in one of the system's text roles, from the type tokens.
   Usage:
     <Text variant="secondary" as="p" truncate>Last edited 2 days ago</Text>
   Props:
     variant: the text role: "body" (default) | "secondary" | "caption" | "data" | "label" | "strong" | "heading"
       | "accent" (a highlighted term, step number or key figure: the accent color) | "success" (a good outcome, the new value in a change)
       | "eyebrow" | "danger" | "link" | "title".
       body: the UI text. secondary: muted, 12px (counts, hints, descriptions). caption: subtle, 11px.
       data: the data font, 11px (IDs, sizes, dates, paths). label: semibold 12px. strong: semibold, the current size.
       heading: a group's title inside a page or dialog, semibold 13px.
       eyebrow: a small uppercase title over a tool panel, 11px, bold, widest spacing, muted.
       danger: the danger color (a required marker). link: the link color, normal weight (an a element in running text).
       title: a page title, the heading font, 20px, bold.
     as: the element; "span" (default) | "p" | "div" | "h1"–"h4" | "dt" | "dd" | "label" | …
     truncate: one line, cut with an ellipsis; default false
     className: more classes on the text
     children: the text
     ...rest: other attributes go on the element
   Notes:
     Applications never set a font, size, weight or color themselves.
     There are no margins in any case, whatever the element.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function Text({ as: As = 'span', variant = 'body', truncate = false, className, children, ...rest }) {
  return <As className={cx('plx-text', 'plx-text--' + variant, truncate && 'plx-text--truncate', className)} {...rest}>{children}</As>;
}
