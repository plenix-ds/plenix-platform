# ECharts for the preview only

`echarts-preview.min.js` is Apache ECharts 6.1.0 (Apache-2.0; `LICENSE` and `NOTICE` here are the package's own), built
locally on 2026-10-26 with esbuild from the npm package `echarts@6.1.0`. It holds only what the preview uses: the core,
the SVG renderer, the line and bar charts and the grid (`window.PlenixECharts`). 509 KB minified, 176 KB gzipped.

It is for the review page in this folder only. When the owner approves #353, ECharts goes into `platform/vendor/` with
its checksums and build steps, like React and Tiptap.
