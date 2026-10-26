# Apache ECharts (vendored)

Plenix's charts draw with Apache ECharts (owner, 2026-10-26: "use apache charts", #353). The Platform chart components
keep their names and props and their own layer (ChartFrame's caption, the keyboard and pointer interaction, the live
region, the legend, the tooltip and "Show the data"); ECharts draws the plot: axes, grid lines, lines, areas, bars and
slices, in an ECharts theme read from the Platform's chart tokens (`platform/charts/echarts/engine.js`).

| File | Package | Version | License | SHA-256 |
|---|---|---|---|---|
| `echarts.min.js` | echarts (with zrender 6.1.0, tslib 2.3.0) | 6.1.0 | Apache-2.0 (zrender BSD-3-Clause, tslib 0BSD) | `6a0f4705c675f119aca01cef9a61e06870af926dd3933eaff71eef711ba5c112` |
| `LICENSE`, `NOTICE` | echarts | 6.1.0 | Apache-2.0 | `634293835b43a6dd2094fa39182a3d9a6b9ca43b7fdb9ac354e8037af2a3093a`, `d491d358344f842685c1b1585970999db65fe30ecf7ef3867af8814f4016c016` |
| `LICENSE-zrender` | zrender | 6.1.0 | BSD-3-Clause | `a681e9d183c72b4af4856935893805eb48c08f0f5a3f260203db7444c20fb98a` |
| `LICENSE-tslib` | tslib | 2.3.0 | 0BSD | `210b19e543130388c68654b7497e967119ce17145f66ab7d85688fbd70f08751` |

Built on 2026-10-26: 525,691 bytes, 181,117 bytes gzipped (gzip -9). All of ECharts (`dist/echarts.min.js`) is 360 KB
gzipped: this file holds only what the Platform's charts use ("ship only what is used", #277).

## What it holds

The modular build: ECharts' core, the SVG renderer (marks stay vector, crisp at every zoom and in print), the line, bar
and pie charts and the cartesian grid. `window.PlenixECharts` exposes `init` and `version` only. The entry file:

```js
import { use, init, version } from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
use([SVGRenderer, LineChart, BarChart, PieChart, GridComponent]);
export { init, version };
```

The charts that use it: LineChart and AreaChart (line), BarChart (bar), PieChart (pie). ECharts' own legend, tooltip,
title, data zoom, toolbox and aria parts are not included: the Platform draws those. Later chart types add their
ECharts chart (and only the parts they need) to the entry file.

## How pages load it

Only pages that show a chart load it. A chart calls `loadECharts()` (`platform/charts/echarts/engine.js`) the first time
it mounts: it adds `echarts.min.js` from this folder once per page and waits for `window.PlenixECharts`. Until it
arrives the chart shows its caption, legend and "Show the data"; the plot is drawn as soon as the engine is there. The
folder is found as the shared resolver (`vendorBase()` in `utils/vendorBase.js`). `build-packages.js` copies this folder
to the CDN (`/cdn/<version>/vendor/echarts/`) and the React package (`dist/vendor/echarts/`).

## Updating

1. Pick a stable ECharts release at least two weeks old (https://github.com/apache/echarts/releases).
2. In a new empty folder outside the repository: `npm install --ignore-scripts --save-exact echarts@<v>`; check the
   licenses (echarts Apache-2.0, zrender BSD-3-Clause, tslib 0BSD).
3. Bundle the entry file above with esbuild (the repository's devDependency): `bundle: true, minify: true, format:
   'iife', globalName: 'PlenixECharts', target: 'es2019', legalComments: 'none'`, `define: { 'process.env.NODE_ENV':
   '"production"', __DEV__: 'false' }`, and a banner naming the version and this folder's licenses.
4. Copy `LICENSE` and `NOTICE` from echarts, `LICENSE` from zrender (as `LICENSE-zrender`) and `LICENSE.txt` from tslib
   (as `LICENSE-tslib`).
5. Record the versions, sizes and SHA-256 values (`sha256sum echarts.min.js LICENSE* NOTICE`) and the date here and in
   `../README.md`.
6. Run `node build-app.js`, `node check-system.js`, `node check-spec.js`, the tests, and look at every chart page of the
   design spec.
