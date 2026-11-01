/* Plenix · FunnelChart
   Summary: How many items remain at each step of an ordered process (07 Data Display › Charts › Funnel): one bar per
     stage on a zero baseline, its count and the share kept from the stage before, with the previous stage's length
     behind it so the drop shows. Vertical (stages top to bottom, the default) or horizontal (left to right).
   Usage:
     <FunnelChart title="Sign-up funnel, September" description="Most people drop between the form and the first upload."
       data={[{ label: 'Visited', value: 12400 }, { label: 'Started sign-up', value: 5200 }, { label: 'Signed up', value: 3900 }, …]} />
     <FunnelChart orientation="horizontal" … />
   Props:
     title: the chart's name (required); description: its takeaway (the step with the largest drop)
     data: the stages, in the process's order: [{ label, value }]; each stage a subset of the one before (required)
     orientation: "vertical" (default: stages down the side, bars across) | "horizontal" (stages along the bottom, columns up)
     color: the data-viz step of the bars ("categorical-1" by default)
     format: (value) => text for counts (default formatNumber)
     valueTitle: what is counted ("People"): the table's column and the tooltip's name
     size: the plot's height, as ChartFrame ("sm" | "md" default | "lg")
     strings: the words it says: { stage: "Stage", value: "Count", kept: "Kept from the step before", ofFirst: "Of the first
       step", hint } (hint: the chart interaction's)
     className: more classes on the figure
   Behavior:
     Bars are lengths on a zero baseline (no tapered shape), so they compare truly. Each label shows the count and, from
       the second stage on, the share kept from the stage before ("3,900 · 75%").
     The stage before's length is drawn behind each bar in the sunken surface color: the gap is the drop.
     Keyboard: one Tab stop; the arrow keys move through the stages, each spoken with its count and share; the pointer over
       a stage does the same. The active bar gets a ring and the tooltip.
     The frame's "Show the data" table lists each stage, its count, the share kept and the share of the first stage.
   Notes:
     Built on ChartFrame, the chart parts (Axis, DataLabel, ChartTooltip) and the chart-a11y helpers. Use a Sankey
       diagram when items can skip or repeat stages, a bar chart for categories that are not steps.
*/
import React from 'react';
import { cx } from '../utils/cx.ts';
import { formatNumber, formatPercent } from '../utils/format.ts';
import { ChartFrame } from './ChartFrame.jsx';
import { scaleLinear, scaleBand, seriesColor } from './scales.js';
import { Axis } from './parts/Axis.jsx';
import { DataLabel } from './parts/DataLabel.jsx';
import { ChartTooltip } from './parts/ChartTooltip.jsx';
import { scalePosition } from './parts/position.js';
import { useChartPoints } from './a11y.js';
import { useStrings } from '../providers/LocaleProvider.tsx';

// the room between the active bar and its ring (SVG geometry, the 4px grid)
const RING = 4, LINE = 12;
// a stage name in one or two lines, split at the word nearest its middle (the horizontal funnel's names under narrow columns)
const twoLines = (s) => {
  const w = s.split(' ');
  if (w.length < 2) return [s];
  let best = 1, diff = Infinity;
  for (let i = 1; i < w.length; i++) { const d = Math.abs(w.slice(0, i).join(' ').length - w.slice(i).join(' ').length); if (d < diff) { diff = d; best = i; } }
  return [w.slice(0, best).join(' '), w.slice(best).join(' ')];
};

export function FunnelChart({ title, description, data = [], orientation = 'vertical', color, format, valueTitle, size = 'md', strings, className }) {
  const t = useStrings('chart.funnelChart', strings);
  const o = orientation === 'horizontal' ? 'horizontal' : 'vertical';
  const rows = data.map((d, i) => ({ id: i + 1, label: String(d.label), value: Math.max(0, Number(d.value) || 0) }));
  const first = rows.length ? rows[0].value : 0;
  rows.forEach((r, i) => { r.kept = i && rows[i - 1].value ? r.value / rows[i - 1].value : null; r.share = first ? r.value / first : null; });
  const fmt = (v) => (typeof format === 'function' ? format(v) : formatNumber(v));
  const pct = (v) => (v === null ? '' : formatPercent(v, { decimals: 0 }));
  const keys = useChartPoints({ count: rows.length, describe: (i) => rows[i].label + ', ' + fmt(rows[i].value) + (rows[i].kept !== null ? ', ' + pct(rows[i].kept) + ' ' + t.kept.toLowerCase() : '') });
  const mark = color || seriesColor(0);
  const table = { columns: [{ title: t.stage, field: 'label', kind: 'name', rowLabel: true }, { title: valueTitle || t.value, field: 'shown', kind: 'data', align: 'right' },
    { title: t.kept, field: 'kept', kind: 'data', align: 'right' }, { title: t.ofFirst, field: 'share', kind: 'data', align: 'right' }],
    data: rows.map((r) => ({ id: r.id, label: r.label, shown: fmt(r.value), kept: pct(r.kept), share: pct(r.share) })) };
  return (
      <ChartFrame interaction={keys.interaction} title={title} description={description} size={size} table={table} className={cx('plx-funnel', 'plx-funnel--' + o, className)}>
        {({ inner, margin }) => {
          const stages = rows.map((r) => r.label);
          const band = scaleBand({ domain: stages, range: o === 'vertical' ? [0, inner.height] : [0, inner.width], paddingInner: 0.24 });
          const val = scaleLinear({ domain: [0, Math.max(1, first, ...rows.map((r) => r.value))], range: o === 'vertical' ? [0, inner.width] : [inner.height, 0], nice: true });
          // a bar of length v in its stage's band: { x, y, width, height }
          const bar = (r, v) => (o === 'vertical'
            ? { x: 0, y: band(r.label), width: val(v), height: band.bandwidth() }
            : { x: band(r.label), y: val(v), width: band.bandwidth(), height: inner.height - val(v) });
          const label = (r) => fmt(r.value) + (r.kept !== null ? ' · ' + pct(r.kept) : '');
          const a = keys.index !== null && keys.index !== undefined && rows[keys.index] ? keys.index : null;
          const end = (r) => (o === 'vertical' ? { x: val(r.value), y: scalePosition(band, r.label) } : { x: scalePosition(band, r.label), y: val(r.value) });
          return (
            <g>
              {o === 'vertical' ? <line className="plx-chart__axis-line" x1={0} x2={0} y1={0} y2={inner.height} /> : <line className="plx-chart__axis-line" x1={0} x2={inner.width} y1={inner.height} y2={inner.height} />}
              {rows.map((r, i) => (i ? <rect key={'p' + r.id} className="plx-funnel__drop" {...bar(r, rows[i - 1].value)} /> : null))}
              {rows.map((r) => <rect key={'b' + r.id} className="plx-chart__mark plx-funnel__bar" data-plx-dataviz={mark} {...bar(r, r.value)} />)}
              {rows.map((r) => <DataLabel key={'l' + r.id} x={end(r).x} y={end(r).y} value={label(r)} position={o === 'vertical' ? 'end' : 'top'} />)}
              {o === 'vertical' ? <Axis scale={band} orient="left" inner={inner} margin={margin} line={false} /> : (
                <g className="plx-chart-axis plx-chart-axis--bottom">
                  {rows.map((r) => { const mid = scalePosition(band, r.label); return <text key={'n' + r.id} className="plx-chart__tick-label plx-chart-axis__tick" x={mid} y={inner.height}>{twoLines(r.label).map((l, k) => <tspan key={k} x={mid} dy={k ? LINE : 0}>{l}</tspan>)}</text>; })}
                </g>
              )}
              {rows.map((r, i) => {
                const s = band(r.label), w = band.step(), off = (w - band.bandwidth()) / 2;
                return <rect key={'h' + r.id} className="plx-chart-keys__hit" x={o === 'vertical' ? 0 : s - off} y={o === 'vertical' ? s - off : 0} width={o === 'vertical' ? inner.width : w} height={o === 'vertical' ? w : inner.height}
                  onMouseEnter={() => keys.hover(i)} onMouseLeave={() => keys.hover(null)} />;
              })}
              {a !== null ? (() => { const b = bar(rows[a], rows[a].value); return <rect className="plx-chart-keys__ring" x={b.x - RING} y={b.y - RING} width={b.width + 2 * RING} height={b.height + 2 * RING} />; })() : null}
              {a !== null ? <ChartTooltip x={end(rows[a]).x} y={end(rows[a]).y} inner={inner} title={rows[a].label}
                items={[{ label: valueTitle || t.value, value: fmt(rows[a].value), color: mark }].concat(rows[a].kept !== null ? [{ label: t.kept, value: pct(rows[a].kept) }, { label: t.ofFirst, value: pct(rows[a].share) }] : [])} /> : null}
            </g>
          );
        }}
      </ChartFrame>
  );
}
