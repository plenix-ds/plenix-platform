/* Plenix · Stack, Inline
   Summary: Lay children out in a column (Stack) or a row (Inline), spaced by the spacing tokens, never by a margin or a number.
   Usage:
     <Stack gap="md">
       <Inline gap="sm" justify="between">…</Inline>
       <Inline wrap>…</Inline>
     </Stack>
   Props:
     Stack.gap: "none" | "xs" | "sm" | "md" (default) | "lg" | "xl" (--plx-sys-space-stack-*)
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
     Stack.as: the element; "div" by default; ul, ol, section, header, footer, form, fieldset, …
     Stack.className: more classes on the element
     Stack.children: the content to lay out
   Behavior:
     A scrolling Stack or Inline shows its scroll bar on hover.
   Notes:
     Inline takes the same props as Stack.
     Any other prop reaches the element.
     Applications build their layouts from these (and the Platform's patterns) instead of styles.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

function layout(kind, { as: As = 'div', gap, align, justify, wrap, inset, grow, scroll, width, maxHeight, indent, push, className, children, ...rest }, defaults) {
  return (
    <As className={cx('plx-' + kind, 'plx-' + kind + '--gap-' + (gap || defaults.gap), (align || defaults.align) && 'plx-layout--align-' + (align || defaults.align),
      justify && 'plx-layout--justify-' + justify, wrap && 'plx-inline--wrap', inset && 'plx-layout--inset-' + inset, grow && 'plx-grow', scroll && 'plx-layout--scroll', width && 'plx-layout--width-' + width, maxHeight && 'plx-layout--max-' + maxHeight, indent && 'plx-layout--indent', push && 'plx-layout--push', className)} {...rest}>
      {children}
    </As>
  );
}
export function Stack(props) { return layout('stack', props, { gap: 'md' }); }
export function Inline(props) { return layout('inline', props, { gap: 'sm', align: 'center' }); }
