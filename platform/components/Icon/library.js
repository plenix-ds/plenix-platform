/* Plenix · Icon library names
   Summary: The whole Material library's symbol names, for Icon (issue 702). Built in here: the browser global (plenix.js),
     the CDN's plenix.esm.js, the CommonJS build and the suite's pages read them from glyphs.js when Icon loads. The npm
     package's ES modules swap this file at build time (build-packages.js) for one whose LIBRARY is empty and whose
     loadLibrary() loads the names the first time Icon meets a name outside the Plenix set, so an app that imports one part
     does not carry the 54 KB list.
   Usage: import { LIBRARY, loadLibrary } from './library.js'   (Icon.jsx only)
   Props:
     LIBRARY: the library's symbol names, space separated (glyphs.js LIBRARY)
     loadLibrary: null when the names are built in; in the npm package, a function that returns a Promise of the names */
export { LIBRARY } from './glyphs.js';
export const loadLibrary = null;
