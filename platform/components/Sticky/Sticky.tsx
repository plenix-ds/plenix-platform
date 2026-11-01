/* Plenix · Sticky
   Summary: A region that scrolls with its content until it reaches the top or bottom edge of its scroll area, then stays there
     (a sticky header, a form's action bar), or one fixed to an edge of the window; it draws a separating shadow while stuck.
   Usage:
     <Stack scroll>
       <Sticky label="Project header"><EntityHeader … /></Sticky>
       …long content…
       <Sticky edge="bottom" label="Actions"><Inline justify="end"><Button>Cancel</Button><Button variant="primary">Save</Button></Inline></Sticky>
     </Stack>
     <Sticky fixed edge="bottom" safeArea label="Selection">…</Sticky>      fixed to the window's bottom edge, clear of the home indicator
   Props:
     Sticky.edge: "top" (default) | "bottom": the edge of the scroll area (or the window) it stays at
     Sticky.fixed: fixed to that edge of the window instead of sticking inside its scroll area (position: fixed)
     Sticky.shadow: "stuck" (default: the shadow and the separator show only while it is stuck) | "always" | "none"
     Sticky.safeArea: pads the stuck edge and both sides by the device's safe-area insets (a notch, the home indicator)
     Sticky.stuck: draws it as stuck (documentation and tests; the browser decides otherwise)
     Sticky.label: names the region (role="region"); without it the element has no role of its own
     Sticky.as: the element; "div" by default (header, footer, section, …)
     Sticky.className, Sticky.children: more classes; the content
   Behavior:
     It sticks inside its nearest scroll area (a Stack with scroll, the main region): never to the page behind a fixed shell.
     While stuck it lies on the sticky layer (--plx-sys-layer-sticky) on the surface, with a shadow and its hairline
       around it. The browser reports the stuck state (a scroll-state container query); where a browser does not, the
       region still sticks, without the shadow.
     A fixed region leaves the flow: the page reserves its space (AppShell's regions do this for the header and the bars).
   Notes:
     Keep it short: two sticky regions in one scroll area at most, and none taller than a toolbar on a narrow window.
     Other props pass through to the element.
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';

export const Sticky = React.forwardRef(function Sticky({ as: As = 'div', edge = 'top', fixed = false, shadow = 'stuck', safeArea = false, stuck = false, label, className, children, ...rest }, ref) {
  return (
    <As ref={ref} role={label ? 'region' : undefined} aria-label={label}
      className={cx('plx-sticky', 'plx-sticky--' + edge, fixed && 'plx-sticky--fixed', 'plx-sticky--shadow-' + shadow, safeArea && 'plx-sticky--safe-area', stuck && 'is-stuck', className)} {...rest}>
      <div className="plx-sticky__body">{children}</div>
    </As>
  );
});
