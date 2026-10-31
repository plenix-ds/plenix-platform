/* Plenix · Link
   Summary: A link to another page or place: inside a sentence (inline), on its own line (standalone), to another site
     (external) or back to the page above (back).
   Usage:
     <Text as="p">Read the <Link href="../guides/upload.html">upload guide</Link> first.</Text>
     <Link href="../projects/" variant="standalone">View all projects</Link>
     <Link href="https://m3.material.io" external>Material guidelines</Link>
     <Link href="../" back>Projects</Link>
     <Link href="#" variant="subtle">Terms</Link>   <Link href="#" onAccent>Help</Link>
   Props:
     href: where it goes (required: a link without one is a button)
     variant: "inline" (default: in running text, always underlined) | "standalone" (on its own: medium weight, underlined
       on hover, as tall as the minimum target) | "subtle" (the text color, underlined: footers and fine print)
     external: another site: opens in a new tab (target="_blank", rel="noopener noreferrer"), shows the open icon after
       the text and tells assistive technology (strings.newTab)
     back: the page above: a leading chevron that points back; it draws as standalone
     onAccent: the version for the blue header and other accent surfaces (default false)
     visited: draws the visited color in documentation (the browser draws it on its own with :visited)
     as: another element or component that renders the anchor (a router's link); it gets href, className and the rest
     strings: the words it announces, for other languages: { newTab: "opens in a new tab" }
     children: the link text: says where it goes ("Upload guide"), never "click here"
     className: more classes on the link
   Behavior:
     Enter follows the link; it is one Tab stop. Hover thickens the underline (inline, subtle, on accent) or draws it
       (standalone, back).
     Keyboard focus shows the focus ring around the text (:focus-visible); a click does not.
     The back chevron mirrors in right-to-left pages (the icon set's bidirectional icons).
   Notes:
     The underline is the non-color sign of a link in running text (WCAG 1.4.1); standalone links are recognized by their
       place and weight.
     Use a Button for an action that changes data; a Link only goes somewhere.
     Other props pass through to the <a>. forwardRef: the ref is the <a>.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.ts';
import { cx } from '../../utils/cx.ts';
import { Icon } from '../Icon/Icon.jsx';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.jsx';
import { useStrings } from '../../providers/LocaleProvider.jsx';
import ChevronLeftIcon from 'plenix-platform/icons/plenix/chevron-left';
import OpenIcon from 'plenix-platform/icons/plenix/open';


export const Link = React.forwardRef(function Link({ href, variant = 'inline', external = false, back = false, onAccent = false, visited = false,
  as: Tag = 'a', strings, className, children, ...rest }, ref) {
  devWarn('Link', { variant }, { variant: ['inline','standalone','subtle'] });
  const s = useStrings('link', strings);
  const kind = back ? 'standalone' : variant;
  const newTab = external ? { target: '_blank', rel: 'noopener noreferrer' } : null;
  return (
    <Tag ref={ref} href={href} {...newTab} {...rest}
      className={cx('plx-link', 'plx-link--' + kind, back && 'plx-link--back', external && 'plx-link--external', onAccent && 'plx-link--on-accent',
        visited && 'is-visited', className)}>
      {back ? <span className="plx-link__icon"><Icon name={ChevronLeftIcon} /></span> : null}
      {children}
      {external ? <span className="plx-link__icon"><Icon name={OpenIcon} /></span> : null}
      {external ? <VisuallyHidden> ({s.newTab})</VisuallyHidden> : null}
    </Tag>
  );
});
