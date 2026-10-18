/* Plenix · Text
   Summary: A run of text in one of the system's text roles, from the type tokens.
   Usage:
     <Text variant="secondary" as="p" truncate>Last edited 2 days ago</Text>
     <Text variant="display" as="h1">1,284 assets</Text>
     <Text as="p" lines={3} expandable>A long description…</Text>
     <Text variant="secondary" tabular>12:40</Text>
   Props:
     variant: the text role: "body" (default) | "secondary" | "caption" | "data" | "label" | "strong" | "heading"
       | "accent" (a highlighted term, step number or key figure: the accent color) | "success" (a good outcome, the new value in a change)
       | "eyebrow" | "danger" | "link" | "title" | "display" | "lead".
       body: the UI text. secondary: muted, 12px (counts, hints, descriptions). caption: subtle, 11px.
       data: the data font, Reddit Mono, for technical values (IDs, file names and paths, versions, dates and
       times, sizes, counts, durations); 12px on its own, the size of the text around it inside other text.
       label: semibold 12px. strong: semibold, the current size.
       heading: a group's title inside a page or dialog, semibold 13px.
       eyebrow: a small uppercase title over a tool panel, 11px, bold, widest spacing, muted.
       danger: the danger color (a required marker). link: the link color, normal weight (the color only: a link is the Link component).
       title: a page title, the heading font, 20px, bold.
       display: the largest style, for one key figure or a sign-in or welcome heading: the heading font at the top
         step of the type scale, semibold, with a tight line height and letter spacing (library wave 2).
       lead: body text one step up (15px) with a relaxed line height, for the opening paragraph of a page or an
         empty state (body-lg; library wave 2).
     as: the element; "span" (default) | "p" | "div" | "h1"–"h4" | "dt" | "dd" | "label" | …
     truncate: one line, cut with an ellipsis; default false (lines wins when both are set)
     lines: 2 | 3 | 4: at most that many lines, the last one cut with an ellipsis (line clamp); default none
     expandable: with lines, a "Show more" button under the text while it is cut; it shows the rest and reads
       "Show less" to fold it again; default false
     defaultExpanded: an expandable text starts unfolded; default false
     tabular: digits of equal width (tabular figures), so numbers line up down a column and do not shift as they
       change; default false
     strings: the words of the expand button: { more: 'Show more', less: 'Show less' }
     className: more classes on the text
     children: the text
     ...rest: other attributes go on the element
   Behavior:
     lines clamps with the line-clamp property; the whole text stays in the page, so search, copy and screen readers
       get all of it.
     expandable measures the text: the button shows only while the text is cut (and while it is unfolded). It is a
       button with aria-expanded that points at the text (aria-controls); it measures again when the width changes.
     display and lead are type styles only: the element (as) gives the heading level.
   Notes:
     Applications never set a font, size, weight or color themselves.
     There are no margins in any case, whatever the element.
     The expand button has the look of ShowMore (CollapsibleSection): the smallest button, its chevron after the
       label, down to show more and up to show less.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';
import { useUid } from '../../utils/layer.js';
import { Button } from '../Button/Button.jsx';

const LINES = [2, 3, 4];
const STRINGS = { more: 'Show more', less: 'Show less' };

// a text's classes: its role, how it overflows (one line, or at most `clamp` lines while folded) and its figures
const textClass = (variant, truncate, clamp, open, tabular, className) => cx('plx-text', 'plx-text--' + variant,
  truncate && !clamp && 'plx-text--truncate', clamp && !open && 'plx-text--lines-' + clamp, tabular && 'plx-text--tabular', className);

export function Text({ as: As = 'span', variant = 'body', truncate = false, lines, expandable = false, defaultExpanded = false, tabular = false, strings, className, children, ...rest }) {
  devWarn('Text', { variant }, { variant: ['body','secondary','caption','data','label','strong','heading','accent','success','eyebrow','danger','link','title','display','lead'] });
  const clamp = LINES.indexOf(Number(lines)) >= 0 ? Number(lines) : null;
  if (expandable && clamp) {
    return <ExpandableText As={As} variant={variant} clamp={clamp} defaultExpanded={defaultExpanded} tabular={tabular} strings={strings} className={className} rest={rest}>{children}</ExpandableText>;
  }
  return <As dir="auto" className={textClass(variant, truncate, clamp, false, tabular, className)} {...rest}>{children}</As>;
}

// a clamped text and its Show more button: the button shows while the text is cut, and while it is unfolded
function ExpandableText({ As, variant, clamp, defaultExpanded, tabular, strings, className, rest, children }) {
  const own = useUid('plx-text');
  const id = rest.id || own;
  const ref = React.useRef(null);
  const [open, setOpen] = React.useState(defaultExpanded);
  const [cut, setCut] = React.useState(false);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || open) return undefined;
    const measure = () => setCut(el.scrollHeight > el.clientHeight);
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const watch = new ResizeObserver(measure);
    watch.observe(el);
    return () => watch.disconnect();
  }, [open, children]);
  const words = Object.assign({}, STRINGS, strings);
  return (
    <div className="plx-text-expand">
      <As dir="auto" {...rest} ref={ref} id={id} className={textClass(variant, false, clamp, open, tabular, className)}>{children}</As>
      {open || cut ? (
        <Button size="2xs" iconEnd={open ? 'chevron-up' : 'chevron-down'} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {open ? words.less : words.more}
        </Button>
      ) : null}
    </div>
  );
}
