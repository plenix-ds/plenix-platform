/* Plenix · Stack, Inline, Center, Bleed
   Summary: Lay children out in a column (Stack) or a row (Inline), spaced by the spacing tokens, never by a margin or a number;
     center a block at a readable width (Center); let a child reach past its parent's inset to the edge (Bleed).
   Usage:
     <Stack gap="md">
       <Inline gap="sm" justify="between">…</Inline>
       <Inline wrap>…</Inline>
     </Stack>
     <Inline reverseBelow="narrow"><Main /><Summary /></Inline>    the summary comes first on a narrow window
     <Center maxWidth="sm" text><EmptyState … /></Center>
     <Stack inset="md"><Bleed space="md"><Image … /></Bleed><Text>…</Text></Stack>
   Props:
     Stack.gap: "none" | "xs" | "sm" | "md" (default) | "lg" | "xl" (--plx-sys-space-stack-*) | "section" (--plx-sys-space-section)
       Stack.equal: every child as wide as the widest (stacked buttons, owner 2026-10-22): the Stack shrinks to its widest
       child and each Button takes its whole width; with align="end" or "center" the Stack itself sits at the end or middle
       Peer sections that are not framed (a SectionHeading and its table, list or text, then the next): <Stack gap="section">
       holding one <Stack gap="sm"> per section; the same in a page or a split pane, every density, either direction, phones
     Inline.gap: "none" | "xs" | "sm" (default) | "md" | "lg" | "xl" (--plx-sys-space-inline-*)
     Stack.align: "start" | "center" | "end" | "stretch" | "baseline" (the cross axis)
     Inline.align: the same values; default "center"
     Stack.justify: "start" | "center" | "end" | "between"
     Inline.wrap: an Inline that wraps onto more lines (its lines are --plx-sys-space-stack-xs apart)
     Stack.inset: "none" | "xs" | "sm" | "md" | "lg" | "xl" (padding on every side, --plx-sys-space-inset-*)
     Stack.grow: fills the rest of its parent row or column (it may shrink below its content)
     Stack.scroll: scrolls its own content
     Stack.width: "xs" | "sm" | "md" | "lg" (a fixed width from --plx-sys-field-width-*: a field narrower than its row)
     Stack.maxHeight: "sm" | "md" | "lg" (scrolls past --plx-sys-scroll-max-*)
     Stack.indent: starts one inline step in (a nested group)
     Stack.push: moves itself to the end of its row (a search box at the end of a toolbar)
     Stack.reverse: lays the children out in the other order (column-reverse, row-reverse); the reading and Tab order stay the markup's
     Stack.reverseBelow: "narrow" (under 600px) | "medium" (under 840px): reverses only below that window class
     Stack.order: "first" | "last": moves this element to the start or the end of its parent Stack or Inline
     Stack.orderBelow: "narrow" | "medium": applies order only below that window class
     Stack.as: the element; "div" by default; ul, ol, section, header, footer, form, fieldset, …
     Stack.className: more classes on the element
     Stack.children: the content to lay out
     Center.maxWidth: "sm" (400px: a sign-in form, an empty state) | "md" (default, 600px: a dialog-like page) | "lg" (900px:
       reading) | "page" (the contained layout's maximum) | "none": the widest it grows; narrower parents keep it narrower
     Center.intrinsic: centers each child at its own width (a column of centered children) instead of stretching it
     Center.vertical: centers the content in its parent's height too; content taller than the parent starts at the top
     Center.text: centers the lines of text (short headings and messages only)
     Center.as, Center.className: as for Stack
     Bleed.space: "xs" | "sm" | "md" (default) | "lg" | "xl": the parent's inset (Stack inset) it cancels
     Bleed.sides: "inline" (default: to the start and end edges) | "block" (top and bottom) | "all"
     Bleed.as, Bleed.className: as for Stack
   Behavior:
     A scrolling Stack or Inline shows its scroll bar on hover.
     reverse, reverseBelow and order change only where the children are drawn: assistive technology and the Tab key follow
       the markup. Use them for regions without a reading order between them (a summary and the content it sums up), never
       for steps, form fields or anything read in sequence; when the meaning changes, change the markup instead.
     Bleed cancels exactly the inset tokens of its parent (Stack inset), so its edges meet the parent's edges; its own content
       keeps no inset (text stays out of a Bleed).
   Notes:
     Inline takes the same props as Stack.
     Any other prop reaches the element.
     Applications build their layouts from these (and the Platform's patterns) instead of styles.
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';

function layout(kind, { as: As = 'div', gap, equal, align, justify, wrap, inset, grow, scroll, width, maxHeight, indent, push, reverse, reverseBelow, order, orderBelow, className, children, ...rest }, defaults) {
  return (
    <As className={cx('plx-' + kind, 'plx-' + kind + '--gap-' + (gap || defaults.gap), (align || defaults.align) && 'plx-layout--align-' + (align || defaults.align),
      justify && 'plx-layout--justify-' + justify, wrap && 'plx-inline--wrap', inset && 'plx-layout--inset-' + inset, grow && 'plx-grow', scroll && 'plx-layout--scroll', width && 'plx-layout--width-' + width, maxHeight && 'plx-layout--max-' + maxHeight, indent && 'plx-layout--indent', push && 'plx-layout--push',
      equal && kind === 'stack' && 'plx-stack--equal', equal && kind === 'stack' && (align === 'end' || align === 'center') && 'plx-stack--equal-' + align, reverse && 'plx-layout--reverse', reverseBelow && 'plx-layout--reverse-below-' + reverseBelow, order && 'plx-layout--order-' + order + (orderBelow ? '-below-' + orderBelow : ''), className)} {...rest}>
      {children}
    </As>
  );
}
export function Stack(props) { return layout('stack', props, { gap: 'md' }); }
export function Inline(props) { return layout('inline', props, { gap: 'sm', align: 'center' }); }
export function Center({ as: As = 'div', maxWidth = 'md', intrinsic, vertical, text, className, children, ...rest }) {
  return (
    <As className={cx('plx-center', 'plx-center--max-' + maxWidth, intrinsic && 'plx-center--intrinsic', vertical && 'plx-center--vertical', text && 'plx-center--text', className)} {...rest}>
      {children}
    </As>
  );
}
export function Bleed({ as: As = 'div', space = 'md', sides = 'inline', className, children, ...rest }) {
  return <As className={cx('plx-bleed', 'plx-bleed--' + space, 'plx-bleed--' + sides, className)} {...rest}>{children}</As>;
}
