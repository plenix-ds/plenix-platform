/* Plenix · Code
   Summary: A short piece of code inside a sentence (inline code): a file name, a class, a command, a token name, in the
     code font (Reddit Mono) on a neutral fill.
   Usage:
     <Text as="p">Add <Code>plx-link--standalone</Code> to the anchor.</Text>
     <Code onAccent>Ctrl K</Code>
     <Code truncate>platform/components/RichText/rich-text.css</Code>
   Props:
     onAccent: the version for the blue header and other accent surfaces (default false)
     truncate: keep it to one line, cut with an ellipsis where its box ends; the whole value is its title (default false)
     children: the code, as text
     className: more classes on the <code>
   Behavior:
     It takes the size and line height of the text around it, so the code font and the text share a baseline.
     A long value wraps anywhere rather than overflow its line; truncate keeps it to one line instead.
     It is not focusable and has no actions: to copy code, use a CodeBlock.
   Notes:
     Writing direction (owner, ctm-needs-34): always left to right (dir="ltr", which also isolates it), also in a right-to-left page.
     Code for code only: technical values that are not code (sizes, dates, IDs) use Text variant="data".
     Other props pass through to the <code>. forwardRef: the ref is the <code>.
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';

export type CodeProps = React.HTMLAttributes<HTMLElement> & { onAccent?: boolean; truncate?: boolean };
export const Code = React.forwardRef(function Code({ onAccent = false, truncate = false, className, children, ...rest }: CodeProps, ref: React.ForwardedRef<HTMLElement>) {
  const title = truncate && typeof children === 'string' ? children : undefined;
  return (
    <code ref={ref} title={title} dir="ltr" {...rest}
      className={cx('plx-code', onAccent && 'plx-code--on-accent', truncate && 'plx-code--truncate', className)}>{children}</code>
  );
});
