/* Plenix · SurfaceContext
   Summary: Tells the components inside a colored surface which surface they sit on, so they take its look from their own
     classes: no rule reaches into the surface (Styling Standard 3.6).
   Usage:
     <SurfaceContext.Provider value="inverse">…</SurfaceContext.Provider>
   Props:
     value: "inverse" (a dark surface: TeachingBubble) | "accent" (the accent AppHeader) | null (the page's own surface)
   Behavior:
     TeachingBubble and the accent AppHeader provide it. A Button inside takes plx-button--on-inverse or
       plx-button--on-accent.
     A component that draws a colored surface of its own provides it for its content.
*/
import React from 'react';

export const SurfaceContext = React.createContext(null);
