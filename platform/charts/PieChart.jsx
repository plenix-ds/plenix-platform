/* Plenix · PieChart
   Summary: The shares of a few parts in one whole (07 Data Display › Charts › Pie chart, Donut chart): a circle cut into
     slices from 12 o'clock, largest first, clockwise (pie); a ring with the total or a key value in its hollow center
     (donut); or a half ring across the top with its value under it (half). Small parts are grouped into Other. Drawn in
     ChartFrame with a legend that gives each part's share, a tooltip and the data grid.
   Usage:
     <PieChart title="Storage by file type" description="Videos take more than half of the storage."
       data={[{ id: 'video', label: 'Videos', value: 540 }, { id: 'img', label: 'Images', value: 260 }, { id: 'doc', label: 'Documents', value: 120 }]} />
     <PieChart variant="donut" title="Storage by file type" data={parts} centerLabel="GB used" format={(v) => formatNumber(v)} />
     <PieChart variant="half" title="Quota used" data={[{ id: 'used', label: 'Used', value: 72 }, { id: 'free', label: 'Free', value: 28 }]}
       centerValue="72%" centerLabel="of 1 TB" />
   Props:
     title: the chart's name (required); description: its takeaway (ChartFrame)
     data: the parts: [{ id, label, value, color }] (values above zero; color an optional data-viz step, default by the
       part's order in the data)
     variant: "pie" (default) | "donut" (a ring with a center value) | "half" (a half ring across the top, the value under
       its middle)
     centerValue: the donut's or the half ring's value (default the total, formatted); centerLabel: the words under it
       (default strings.total)
     sort: slices largest first, clockwise from the top (default true; false keeps the data's order); Other stays last
     maxSlices: the most slices drawn (default 6): the smallest parts beyond them are grouped into one Other slice
     format: (value) => text for the values (center, tooltip, table); default formatNumber
     showValues: writes each share on its slice when the slice is large enough (8% or more) (default false)
     legend: false hides the legend (default shown, each part with its share); legendPosition: ChartFrame's
     tooltip: shows the part under the pointer, its value and share (default true)
     size, margin, hideCaption, className: ChartFrame's
     strings: { part: "Part", value: "Value", share: "Share", total: "Total", other: "Other" } and ChartFrame's strings
   Behavior:
     A part keeps its color by its order in the data, not by its size; Other takes the neutral categorical color.
     Hover a slice: the tooltip shows its name, value and share. The legend and the data grid carry every part's value
       and share: the chart's keyboard and screen reader view.
   Notes:
     Two to five parts read best; for many parts or parts of similar size use a bar chart. Slices are parted by a thin line
       in the surface color (pie-chart tokens); the hole is 60% of the radius (geometry).
*/
import React from 'react';
import { cx } from '../utils/cx.js';
import { formatNumber, formatPercent } from '../utils/format.js';
import { ChartFrame } from './ChartFrame.jsx';
import { seriesColor } from './scales.js';
import { ChartLegend } from './parts/ChartLegend.jsx';
import { ChartTooltip } from './parts/ChartTooltip.jsx';
import { DataLabel } from './parts/DataLabel.jsx';
import { useChartHover, legendItems, finite } from './chart-kit.js';

const STRINGS = { part: 'Part', value: 'Value', share: 'Share', total: 'Total', other: 'Other' };
const VARIANTS = ['pie', 'donut', 'half'];
const HOLE = 0.6;            // the hollow center's radius, a share of the ring's radius
const LABEL_MIN = 0.08;      // the least share written on its slice
const FULL = Math.PI * 2 - 1e-6;
const OTHER_COLOR = 'categorical-6';
// px: a margin that keeps the ring off the frame's edges (on the 4px grid)
const RING_MARGIN = { top: 8, end: 8, bottom: 8, start: 8 };

// the point at an angle (0 = 12 o'clock, clockwise) and a radius from the center
const at = (cx0, cy0, r, a) => [cx0 + r * Math.sin(a), cy0 - r * Math.cos(a)];
function arcPath(cx0, cy0, r0, r1, a0, a1) {
  const span = Math.min(a1 - a0, FULL);
  const end = a0 + span, large = span > Math.PI ? 1 : 0;
  const [x0, y0] = at(cx0, cy0, r1, a0), [x1, y1] = at(cx0, cy0, r1, end);
  if (r0 <= 0) return 'M' + cx0 + ',' + cy0 + 'L' + x0 + ',' + y0 + 'A' + r1 + ',' + r1 + ' 0 ' + large + ' 1 ' + x1 + ',' + y1 + 'Z';
  const [x2, y2] = at(cx0, cy0, r0, end), [x3, y3] = at(cx0, cy0, r0, a0);
  return 'M' + x0 + ',' + y0 + 'A' + r1 + ',' + r1 + ' 0 ' + large + ' 1 ' + x1 + ',' + y1 + 'L' + x2 + ',' + y2 + 'A' + r0 + ',' + r0 + ' 0 ' + large + ' 0 ' + x3 + ',' + y3 + 'Z';
}

// the parts to draw: colors by the data's order, the smallest beyond maxSlices grouped into Other, sorted by size
export function pieSlices(data, { sort = true, maxSlices = 6, other = 'Other' } = {}) {
  const parts = (data || []).map((d, i) => ({ id: d.id === undefined ? String(i) : d.id, label: d.label, value: Math.max(0, finite(d.value)), color: d.color, index: i }))
    .filter((d) => d.value > 0);
  let kept = parts, rest = [];
  if (parts.length > maxSlices) {
    const bySize = parts.slice().sort((a, b) => b.value - a.value);
    const keep = new Set(bySize.slice(0, Math.max(1, maxSlices - 1)).map((d) => d.id));
    kept = parts.filter((d) => keep.has(d.id)); rest = parts.filter((d) => !keep.has(d.id));
  }
  kept = kept.map((d, i) => Object.assign({}, d, { color: d.color || seriesColor(i) }));
  if (sort) kept.sort((a, b) => b.value - a.value);
  if (rest.length) kept.push({ id: '__other', label: other, value: rest.reduce((a, d) => a + d.value, 0), color: OTHER_COLOR, index: -1, parts: rest });
  const total = kept.reduce((a, d) => a + d.value, 0);
  return kept.map((d) => Object.assign(d, { share: total ? d.value / total : 0 }));
}

export function PieChart({ title, description, hideCaption, size, data = [], variant = 'pie', centerValue, centerLabel, sort = true, maxSlices = 6,
  format, showValues = false, legend, legendPosition, tooltip = true, margin, strings, className }) {
  const t = Object.assign({}, STRINGS, strings);
  const v = VARIANTS.indexOf(variant) >= 0 ? variant : 'pie';
  const fmt = (x) => (typeof format === 'function' ? format(x) : formatNumber(x));
  const [active, hover] = useChartHover();
  const slices = pieSlices(data, { sort, maxSlices, other: t.other });
  const total = slices.reduce((a, d) => a + d.value, 0);
  const table = {
    columns: [{ title: t.part, field: 'part', kind: 'name', rowLabel: true }, { title: t.value, field: 'value', kind: 'data', hozAlign: 'right' }, { title: t.share, field: 'share', kind: 'data', hozAlign: 'right' }],
    data: slices.map((d, i) => ({ id: i + 1, part: d.label, value: fmt(d.value), share: formatPercent(d.share) }))
  };
  const key = legend === false ? null : <ChartLegend items={legendItems(slices, (d) => formatPercent(d.share))} orientation={legendPosition === 'end' ? 'vertical' : 'horizontal'} />;
  const m = Object.assign({}, RING_MARGIN, margin);
  const center = v === 'pie' ? null : { value: centerValue === undefined ? fmt(total) : centerValue, label: centerLabel === undefined ? t.total : centerLabel };
  return (
    <ChartFrame title={title} description={description} hideCaption={hideCaption} size={size} margin={m} legend={key} legendPosition={legendPosition}
      table={table} strings={strings} className={cx('plx-pie-chart', 'plx-pie-chart--' + v, className)}>
      {({ inner }) => {
        const half = v === 'half';
        const r1 = Math.max(0, half ? Math.min(inner.width / 2, inner.height) : Math.min(inner.width, inner.height) / 2);
        const r0 = v === 'pie' ? 0 : r1 * HOLE;
        const cx0 = inner.width / 2, cy0 = half ? inner.height : inner.height / 2;
        const from = half ? -Math.PI / 2 : 0, sweep = half ? Math.PI : Math.PI * 2;
        let a = from;
        const geo = slices.map((d) => { const a0 = a; a += d.share * sweep; return { d, a0, a1: a }; });
        let tip = null;
        if (tooltip && active !== null) {
          const g = geo.filter((x) => x.d.id === active)[0];
          if (g) {
            const [px, py] = at(cx0, cy0, (r0 + r1) / 2, (g.a0 + g.a1) / 2);
            tip = <ChartTooltip x={px} y={py} inner={inner} title={g.d.label} items={[{ label: t.value, value: fmt(g.d.value) + ' · ' + formatPercent(g.d.share), color: g.d.color }]} />;
          }
        }
        return (
          <g>
            {geo.map(({ d, a0, a1 }) => (
              <path key={d.id} className="plx-chart__mark plx-pie-chart__slice" data-plx-dataviz={d.color} d={arcPath(cx0, cy0, r0, r1, a0, a1)} {...(tooltip ? hover(d.id) : {})} />
            ))}
            {showValues ? geo.filter((g) => g.d.share >= LABEL_MIN).map(({ d, a0, a1 }) => {
              const [px, py] = at(cx0, cy0, r0 ? (r0 + r1) / 2 : r1 * 0.62, (a0 + a1) / 2);
              return <DataLabel key={'l' + d.id} x={px} y={py} value={formatPercent(d.share)} position="center" />;
            }) : null}
            {center ? (
              <g className="plx-pie-chart__center">
                <text className="plx-pie-chart__center-value" x={cx0} y={cy0}>{center.value}</text>
                {center.label ? <text className="plx-pie-chart__center-label" x={cx0} y={cy0}>{center.label}</text> : null}
              </g>
            ) : null}
            {tip}
          </g>
        );
      }}
    </ChartFrame>
  );
}
