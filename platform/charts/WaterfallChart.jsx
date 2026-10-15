/* Plenix · WaterfallChart
   Summary: A waterfall chart (07 Data Display › Charts › Waterfall): how a starting total becomes an end total through
     a series of increases and decreases. Totals are columns from zero; each change floats from the running total before
     it to the one after, with a thin connector between them, its signed value above it, and the increase, decrease and
     total colors named in a legend. With totals, subtotal columns show the running total part way.
   Usage:
     <WaterfallChart title="Revenue, last year to this year" description="New customers made up for the price change."
       data={[{ label: 'Last year', value: 820, total: true }, { label: 'New customers', value: 240 }, { label: 'Churn', value: -110 },
         { label: 'Price change', value: -60 }, { label: 'Upsell', value: 90 }]} endLabel="This year" format={(v) => formatCurrency(v * 1000, 'USD')} />
   Props:
     title, description: the chart's name and its takeaway (ChartFrame) (title required)
     data: the steps in order: [{ label, value, total }]; a change (value + or −) floats from the running total; a total
       (total: true) is a column from zero: with a value it sets the running total (the start), without one it shows the
       running total so far (a subtotal: the "with totals" variant)
     endLabel: the name of the end total column added after the last step (default strings.end); false: none
     format: (value) => text (default formatNumber); changes are written with their sign (+40, −25)
     yLabel: the value axis's title; size, margin: as ChartFrame
     legend: shows what the colors mean: Increase, Decrease, Total (default true)
     interactive: keyboard, pointer, tooltip and live region (default true); onSelect({ c, step }): a click or Enter
     strings: { end: "End", step: "Step", change: "Change", total: "Total", running: "Running total", increase: "Increase",
       decrease: "Decrease" }
     className: more classes on the figure
   Behavior:
     One Tab stop: ← → move from step to step, Home and End to the first and the end total; each says "<step>: change
       +40, running total 1,060" in the live region and shows it in the tooltip.
     Increases and decreases differ by color and by the sign of their labels, so color is never the only cue.
   Notes:
     Increase and decrease take the data-viz status steps (positive, negative), totals the first categorical color; the
       connector and the value axis are tokens (--plx-comp-waterfall-chart-*). Up to about ten steps: group the small ones.
*/
import React from 'react';
import { cx } from '../utils/cx.js';
import { formatNumber } from '../utils/format.js';
import { ChartFrame } from './ChartFrame.jsx';
import { scaleBand, scaleLinear, seriesColor } from './scales.js';
import { scalePosition } from './parts/position.js';
import { Axis } from './parts/Axis.jsx';
import { GridLines } from './parts/GridLines.jsx';
import { DataLabel } from './parts/DataLabel.jsx';
import { ChartLegend } from './parts/ChartLegend.jsx';
import { ChartTooltip, chartTooltipText } from './parts/ChartTooltip.jsx';
import { useChartInteraction } from './interaction.js';

const STRINGS = { end: 'End', step: 'Step', change: 'Change', total: 'Total', running: 'Running total', increase: 'Increase', decrease: 'Decrease' };
const COLORS = { up: 'status-positive', down: 'status-negative', total: seriesColor(0) };

// each bar: its kind, the running total before and after it
export function waterfallSteps(data = [], endLabel) {
  let run = 0;
  const out = data.map((d, i) => {
    const v = typeof d.value === 'number' && isFinite(d.value) ? d.value : null;
    if (d.total) {
      if (v !== null && (i === 0 || d.value !== undefined)) run = v;
      return { label: d.label, kind: 'total', from: 0, to: run, change: null };
    }
    const from = run; run += v || 0;
    return { label: d.label, kind: (v || 0) < 0 ? 'down' : 'up', from, to: run, change: v || 0 };
  });
  if (endLabel !== false && (!out.length || out[out.length - 1].kind !== 'total')) out.push({ label: endLabel, kind: 'total', from: 0, to: run, change: null, end: true });
  return out;
}

export function WaterfallChart({ title, description, data = [], endLabel, format, yLabel, size = 'md', margin, legend = true, interactive = true, onSelect,
  strings, frameStrings, interactionStrings, className }) {
  const t = Object.assign({}, STRINGS, strings);
  const fmt = typeof format === 'function' ? format : (v) => formatNumber(v);
  const signed = (v) => (v > 0 ? '+' + fmt(v) : v < 0 ? '−' + fmt(-v) : fmt(0));
  const bars = waterfallSteps(data, endLabel === undefined ? t.end : endLabel);
  const items = (b) => (b.kind === 'total' ? [{ label: t.total, value: fmt(b.to), color: COLORS.total }]
    : [{ label: t.change, value: signed(b.change), color: COLORS[b.kind] }, { label: t.running, value: fmt(b.to) }]);
  const ia = useChartInteraction({
    rows: 1, columns: bars.length, mode: 'point', select: typeof onSelect === 'function', strings: interactionStrings,
    onSelect: (cell) => onSelect && onSelect(Object.assign({ step: bars[cell.c] }, cell)),
    describe: (cell) => chartTooltipText({ title: bars[cell.c].label, items: items(bars[cell.c]) }),
  });
  const table = {
    columns: [{ title: t.step, field: 's', kind: 'name', rowLabel: true }, { title: t.change, field: 'c', kind: 'data', hozAlign: 'right' }, { title: t.running, field: 'r', kind: 'data', hozAlign: 'right' }],
    data: bars.map((b, i) => ({ id: i + 1, s: b.label, c: b.kind === 'total' ? t.total : signed(b.change), r: fmt(b.to) })),
  };
  const legendNode = legend ? <ChartLegend items={[{ id: 'up', label: t.increase, color: COLORS.up }, { id: 'down', label: t.decrease, color: COLORS.down }, { id: 'total', label: t.total, color: COLORS.total }]} /> : null;

  const draw = ({ inner, margin: m }) => {
    if (!bars.length) return null;
    const cols = bars.map((b, i) => i);
    const x = scaleBand({ domain: cols, range: [0, inner.width] });
    let lo = 0, hi = 0; bars.forEach((b) => { lo = Math.min(lo, b.from, b.to); hi = Math.max(hi, b.from, b.to); });
    const y = scaleLinear({ domain: [lo, hi], range: [inner.height, 0], nice: true, count: Math.max(2, Math.min(5, Math.floor(inner.height / 40))) });
    const columnAt = (px) => Math.min(bars.length - 1, Math.max(0, Math.floor(px / x.step())));
    ia.register({ columnAt, nearest: (px) => (px < 0 || px > inner.width ? null : { r: 0, c: columnAt(px) }) });
    const a = ia.active, sel = ia.selected;
    const top = (b) => y(Math.max(b.from, b.to));
    return (
      <g className="plx-waterfall-chart__plot">
        <GridLines scale={y} inner={inner} />
        {bars.map((b, i) => (i ? <line key={'k' + i} className="plx-waterfall-chart__connector" x1={x(i - 1) + x.bandwidth()} x2={x(i)} y1={y(bars[i - 1].to)} y2={y(bars[i - 1].to)} /> : null))}
        {bars.map((b, i) => (
          <rect key={i} className={cx('plx-chart__mark', 'plx-waterfall-chart__bar', 'plx-waterfall-chart__bar--' + b.kind, 'plx-chart-dim', a && a.c !== i && 'plx-chart-dim--off', sel && sel.c === i && 'plx-chart-selected')}
            data-plx-dataviz={COLORS[b.kind]} x={x(i)} y={top(b)} width={x.bandwidth()} height={Math.max(0, Math.abs(y(b.from) - y(b.to)))} />
        ))}
        {bars.map((b, i) => <DataLabel key={'l' + i} x={scalePosition(x, i)} y={top(b)} value={b.kind === 'total' ? fmt(b.to) : signed(b.change)} />)}
        <Axis scale={y} orient="left" inner={inner} margin={m} label={yLabel} format={typeof format === 'function' ? format : undefined} />
        <Axis scale={x} orient="bottom" inner={inner} margin={m} format={(i) => bars[i].label} />
        {a ? <ChartTooltip x={scalePosition(x, a.c)} y={top(bars[a.c])} inner={inner} title={bars[a.c].label} items={items(bars[a.c])} /> : null}
      </g>
    );
  };

  return (
    <ChartFrame title={title} description={description} size={size} margin={margin} table={table} legend={legendNode}
      interaction={interactive ? ia : undefined} strings={frameStrings}
      className={cx('plx-waterfall-chart', bars.some((b, i) => b.kind === 'total' && i > 0 && !b.end) && 'plx-waterfall-chart--subtotals', className)}>
      {draw}
    </ChartFrame>
  );
}
