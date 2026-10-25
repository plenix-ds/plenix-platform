# Icon tools

Tools for the icon inventory (`platform/icons/inventory/README.md`) and the icon guidance
(`platform/standards/icons.md`). Install once: `npm install --prefix tools/icons` (paper.js and paperjs-offset;
`node_modules` is not in git).

| Tool | What it does |
|---|---|
| `fetch-libraries.js` | Copies every allowed library (`platform/icons/inventory/libraries.json`) to the local store outside git and writes its `manifest.json`. `--only id,id` for some. |
| `measure-material.js` | Measures the working set (line weight, padding, live area, corners, grid); writes `platform/icons/inventory/material-measure.json`. Reads only. |
| `check-icon.js <file.svg> …` | Reports how an SVG is built against the guidance: canvas, construction, color, line weight, line ends, corners (with their positions), padding, keyline, grid. `--optical 20\|24`, `--json`. Exit 1 on a failed rule. |
| `restyle-icon.js <source.svg> --name n --out dir` | Makes the four Plenix files from another library's icon (see below). `--fill-from`, `--reference`, `--shape`. Refuses the Material files. |
| `build-inventory.js` | Restyles and checks every inventory record; writes `inventory.json` results and `inventory.js`. |
| `lib/svg.js`, `lib/guidance.js` | The SVG reader and geometry; the guidance's numbers. |

## What the restyle does

1. Reads the source as data: shapes, inherited paint and transforms; no scripts or external references.
2. Moves it onto the Plenix canvas (`0 -960 960 960`).
3. Sharpens corners: a short curve (up to 4.5px) joining two straight segments that turn 30–150° becomes their corner.
   An open path that ends where it starts is closed first.
4. Fits it: the main shape to its keyline (circle, square, portrait or landscape), or, for a smaller mark, the
   library's own scale (its `circle` icon mapped to the circle keyline), whichever is smaller. The outline and filled
   versions share one fit.
5. Snaps straight horizontal and vertical lines to the grid (20 units at 24, 4 units at 20).
6. Expands every stroke into a filled outline at the optical size's weight (60 or 52 units), flat ends, mitered joins
   (limit 4). A dot (a stroke shorter than its width) becomes a square.
7. Merges everything into one path, removes slivers under 0.15px, and straightens curves that stray less than 1 unit.
8. Filled version: the library's own (`--fill-from`), fitted the same way; otherwise generated (large closed shapes
   solid with the lines inside cut out, round shapes solid); with neither, the outline.

Filled-only sources (Fluent, Carbon, Bootstrap, MingCute) are fitted, sharpened and checked, but their line weight is
the library's: the check reports it, and such icons need a stroke source or a redraw.

Letters inside an icon (file types) keep their round bends; the check fails them, and they need squared letters drawn.
