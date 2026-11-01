/* Plenix · useInteraction
   Summary: Gives the current page's interaction mode: pointer, touch or mobile.
   Usage:
     const interaction = useInteraction();
   Props:
     returns: "pointer" | "touch" | "mobile" (the data-plx-interaction attribute on <html>; "pointer" when unset)
   Behavior:
     Inside a ThemeProvider it follows changes (a laptop folded into a tablet).
     Outside one it reads <html> once.
*/
import React from 'react';
import { ThemeContext } from '../providers/ThemeProvider.tsx';

export function useInteraction(): string {
  const ctx = React.useContext(ThemeContext);
  return ctx ? ctx.interaction : (document.documentElement.getAttribute('data-plx-interaction') || 'pointer');
}
