/* Plenix · RadarChart
   Summary: The profile of one item, or of two or three compared, across several measures on one scale (07 Data Display ›
     Charts › Radar chart): one spoke per measure from the center (zero) to the scale's end, rings at the scale's ticks,
     and each item a closed shape through its values, its outline in the series' color and its area lightly filled so
     overlapping shapes stay visible. Drawn in ChartFrame with a legend (compare), a tooltip and the data grid.
   Usage:
     <RadarChart title="Asset quality" description="The hero image scores high on every measure but file size."
       axes={[{ key: 'res', label: 'Resolution' }, { key: 'color', label: 'Color' }, { key: 'meta', label: 'Metadata' }, { key: 'size', label: 'File size' }, { key: 'rights', label: 'Rights' }]}
       series={[{ id: 'hero', label: 'Hero image', values: { res: 9, color: 8, meta: 7, size: 4, rights: 9 } }]} max={10} />
   Props:
     title: the chart's name (required); description: its takeaway (ChartFrame)
     axes: the measures, clockwise from the top: [{ key, label }] (four to eight read best)
     series: the items: [{ id, label, values, color }]; values an object by axis key or an array in the axes' order
     max: the scale's end (default the largest value on a round number); every spoke starts at zero
     rings: about how many rings (default 4: the scale's round ticks)
     format: (value) => text (ring values, tooltip, table); default formatNumber
     showPoints: draws a point at each value (default true); the points are the tooltip's targets
     legend: true | false (default: shown with two items or more); legendPosition: ChartFrame's
     tooltip: shows the item's value on the measure under the pointer (default true)
     size, margin, hideCaption, className: ChartFrame's
     strings: { measure: "Measure" } and ChartFrame's strings
   Behavior:
     Every measure shares the scale: normalize measures of different units first (to a score, a percentage), or use bars.
     Hover a point: the tooltip shows the item and the measure's value. The data grid lists every value.
   Notes:
     Shapes' outlines and points take the series' data-viz color (the frame's line and point); the area takes the same
       color at the low opacity (radar-chart tokens). Spokes and rings are the frame's grid lines; the measures' names are
       UI text, the ring values the data font. Compare three items at most.
*/
import React from 'react';
import { cx } from '../utils/cx.ts';
import { formatNumber } from '../utils/format.ts';
import { ChartFrame } from './ChartFrame.jsx';
import { scaleLinear } from './scales.js';
import { ChartLegend } from './parts/ChartLegend.jsx';
import { ChartTooltip } from './parts/ChartTooltip.jsx';
import { useChartHover, withColors, legendItems, finite } from './chart-kit.js';
import { useStrings } from '../providers/LocaleProvider.tsx';

// px: the room around the web for the measures' names (on the 4px grid); the start and end sides take the longest name
const WEB_MARGIN = { top: 24, bottom: 24 };
const CHAR = 7;   // px: about one character of the measures' names (the label font at 12px)

export function RadarChart({ title, description, hideCaption, size = 'lg', axes = [], series = [], max, rings = 4, format, showPoints = true, legend, legendPosition,
  tooltip = true, margin, strings, className }) {
  const t = useStrings('chart.radarChart', strings);
  const fmt = (v) => (typeof format === 'function' ? format(v) : formatNumber(v));
  const [active, hover] = useChartHover();
  const list = withColors(series);
  const valueOf = (s, ai) => finite(Array.isArray(s.values) ? s.values[ai] : (s.values || {})[axes[ai].key]);
  const top = max !== undefined ? Number(max) : list.reduce((a, s) => Math.max(a, Math.max.apply(null, [0].concat(axes.map((x, ai) => valueOf(s, ai))))), 0) || 1;
  const side = Math.ceil((axes.reduce((n, a) => Math.max(n, String(a.label || '').length), 0) * CHAR + 8) / 4) * 4;
  const m = Object.assign({}, WEB_MARGIN, { start: side, end: side }, margin);
  const table = {
    columns: [{ title: t.measure, field: 'measure', kind: 'name', rowLabel: true }].concat(list.map((s, si) => ({ title: s.label, field: 's' + si, kind: 'data', align: 'right' }))),
    data: axes.map((a, ai) => { const row = { id: ai + 1, measure: a.label }; list.forEach((s, si) => { row['s' + si] = fmt(valueOf(s, ai)); }); return row; })
  };
  const showLegend = legend === undefined ? list.length > 1 : !!legend;
  const key = showLegend ? <ChartLegend items={legendItems(list)} orientation={legendPosition === 'end' ? 'vertical' : 'horizontal'} /> : null;
  return (
    <ChartFrame title={title} description={description} hideCaption={hideCaption} size={size} margin={m} legend={key} legendPosition={legendPosition}
      table={table} strings={strings} className={cx('plx-radar-chart', list.length > 1 && 'plx-radar-chart--compare', className)}>
      {({ inner }) => {
        const R = Math.max(0, Math.min(inner.width, inner.height) / 2);
        const cx0 = inner.width / 2, cy0 = inner.height / 2;
        const r = scaleLinear({ domain: [0, top], range: [0, R], nice: max === undefined, count: rings });
        const n = Math.max(1, axes.length);
        const angle = (ai) => (Math.PI * 2 * ai) / n;
        const pt = (ai, radius) => [cx0 + radius * Math.sin(angle(ai)), cy0 - radius * Math.cos(angle(ai))];
        const poly = (radius) => axes.map((a, ai) => pt(ai, radius).join(',')).join(' ');
        const ticks = r.ticks(rings).filter((v) => v > 0);
        const end = r(r.domain()[1]);
        // the name's anchor at the end of its spoke: after it on the right, before it on the left, centered at the top and bottom
        const place = (ai) => {
          const s = Math.sin(angle(ai)), c = Math.cos(angle(ai));
          const h = Math.abs(s) < 0.2 ? 'middle' : s > 0 ? 'start' : 'end';
          const v = c > 0.8 ? 'above' : c < -0.8 ? 'below' : 'beside';
          return 'plx-radar-chart__axis-label--' + h + ' plx-radar-chart__axis-label--' + v;
        };
        let tip = null;
        if (tooltip && active !== null) {
          const [si, ai] = String(active).split(':').map(Number);
          if (list[si] && axes[ai]) {
            const [px, py] = pt(ai, r(valueOf(list[si], ai)));
            tip = <ChartTooltip x={px} y={py} inner={inner} title={axes[ai].label} items={[{ label: list[si].label, value: fmt(valueOf(list[si], ai)), color: list[si].color }]} />;
          }
        }
        return (
          <g>
            <g className="plx-radar-chart__web">
              {ticks.map((v) => <polygon key={v} className="plx-chart__grid-line plx-radar-chart__ring" points={poly(r(v))} />)}
              {axes.map((a, ai) => { const [x2, y2] = pt(ai, end); return <line key={a.key} className="plx-chart__grid-line plx-radar-chart__spoke" x1={cx0} y1={cy0} x2={x2} y2={y2} />; })}
            </g>
            {list.map((s, si) => (
              <polygon key={s.id} className="plx-chart__line plx-radar-chart__area" data-plx-dataviz={s.color} points={axes.map((a, ai) => pt(ai, r(valueOf(s, ai))).join(',')).join(' ')} />
            ))}
            {showPoints ? list.map((s, si) => axes.map((a, ai) => {
              const [px, py] = pt(ai, r(valueOf(s, ai)));
              return <circle key={s.id + a.key} className="plx-chart__point plx-radar-chart__point" data-plx-dataviz={s.color}
                cx={px} cy={py} {...(tooltip ? hover(si + ':' + ai) : {})} />;
            })) : null}
            {/* the rings' values up the first spoke; the outermost is left out: the first measure's name sits there */}
            {ticks.slice(0, -1).map((v) => <text key={'v' + v} className="plx-chart__tick-label plx-radar-chart__ring-label" x={cx0} y={cy0 - r(v)}>{fmt(v)}</text>)}
            {axes.map((a, ai) => { const [x2, y2] = pt(ai, end); return <text key={'l' + a.key} className={'plx-radar-chart__axis-label ' + place(ai)} x={x2} y={y2}>{a.label}</text>; })}
            {tip}
          </g>
        );
      }}
    </ChartFrame>
  );
}
