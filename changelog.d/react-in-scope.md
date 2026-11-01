### Fixed
- The npm package's DataGrid (and `plenix.esm.js`) failed to draw with "React is not defined" (0.79.0): `engine/chrome.jsx` and `engine/headerRows.jsx` used JSX without importing React, which only works where React is a global (the CDN script and the applications). Both import React now (#847).
