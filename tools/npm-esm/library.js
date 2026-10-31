// The npm package's ES modules only (#702, #709 step 5): Icon's import of library.js resolves here
// (vite.packages.config.mjs, resolve.alias). The list is empty; loadLibrary() loads the names (the chunk icon-names, cut from
// glyphs.js by the config's plenix-icon-names plugin) the first time Icon meets a name outside the Plenix set.
export const LIBRARY = '';
export const loadLibrary = () => import('./icon-names.js').then((m) => m.LIBRARY);
