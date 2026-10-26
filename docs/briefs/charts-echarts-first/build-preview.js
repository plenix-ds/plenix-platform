/* The "show me" preview of the four charts on ECharts (#353), without building the Platform: bundles the new
   LineChart, AreaChart, BarChart and PieChart from platform/charts/ into next.js (window.PlenixNext), next to today's
   Platform script on the same page. React comes from the page. Usage (repository root): node docs/briefs/charts-echarts-first/build-preview.js */
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
let esbuild;
try { esbuild = require('esbuild'); } catch (e) { esbuild = require(path.join(ROOT, '..', '..', '..', 'node_modules', 'esbuild')); }
const charts = path.join(ROOT, 'platform', 'charts').replace(/\\/g, '/');
const react = { name: 'react-global', setup(b) {
  b.onResolve({ filter: /^react(-dom)?$/ }, (a) => ({ path: a.path, namespace: 'global' }));
  b.onLoad({ filter: /.*/, namespace: 'global' }, (a) => ({ contents: 'module.exports = window.' + (a.path === 'react' ? 'React' : 'ReactDOM') + ';', loader: 'js' }));
} };
esbuild.build({
  stdin: { contents: ['LineChart', 'AreaChart', 'BarChart', 'PieChart'].map((n) => "export { " + n + " } from '" + charts + '/' + n + ".jsx';").join('\n'), resolveDir: ROOT, loader: 'js' },
  bundle: true, format: 'iife', globalName: 'PlenixNext', target: 'es2019', outfile: path.join(__dirname, 'next.js'),
  loader: { '.jsx': 'jsx' }, jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment', plugins: [react], logLevel: 'warning',
}).then(() => console.log('built next.js')).catch(() => process.exit(1));
