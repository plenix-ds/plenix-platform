/* Plenix · ComboChart
   Summary: Two related measures on one category axis (07 Data Display › Charts › Combo chart): columns for the primary
     measure (an amount from zero) and a line with points for the second (a rate, a target, a running figure), on one
     shared value axis or on two (the columns' on the start side, the line's on the end side) when their units differ.
     Drawn in ChartFrame with both legends, a shared tooltip per category and the data grid.
   Usage:
     <ComboChart title="Uploads and approval rate" description="Uploads doubled while the approval rate held near 90%."
       categories={months} bars={[{ id: 'up', label: 'Uploads', values: […] }]}
       lines={[{ id: 'rate', label: 'Approval rate', values: […] }]} axis="dual" barLabel="Uploads" lineLabel="Approval rate"
       formatLine={(v) => formatPercent(v)} />
   Props:
     title: the chart's name (required); description: its takeaway (ChartFrame)
     categories: the category names, in order (periods left to right)
     bars: [{ id, label, values, color }]: the column series (grouped side by side when there are several)
     lines: [{ id, label, values, color }]: the line series (one point per category); colors continue after the bars'
     axis: "shared" (default: one value axis for both; same unit) | "dual" (the lines on their own axis at the end side;
       give both axes a title with its unit)
     barLabel, lineLabel: the value axes' titles (with dual: the start axis's and the end axis's); categoryLabel: the
       category axis's title
     formatBar, formatLine: (value) => text for each kind's values (axis ticks, tooltip, table); default formatNumber
     showPoints: draws a point at each line value (default true)
     legend: false hides the two legends (columns with square swatches, lines with line swatches)
     legendPosition, size, margin, hideCaption, className: ChartFrame's
     tooltip: shows every series' value at the category under the pointer (default true)
     strings: { category: "Category", bars: "Columns", lines: "Lines" } (the legends' names) and ChartFrame's strings
   Behavior:
     The column axis starts at zero; with axis="dual" the line axis is fitted to the line's values (nice round ends) and
       says so with its own ticks and title, so the two scales are never read as one.
     Hover anywhere over a category: a crosshair and one tooltip with every series' value in the legends' order.
   Notes:
     Two chart types at most: never a third. Colors come from the data-viz scales by the series' order (columns first).
     Points are the frame's point marks; their radius is a combo-chart token.
*/
import React from 'react';
import { cx } from '../utils/cx.js';
import { formatNumber } from '../utils/format.js';
import { ChartFrame } from './ChartFrame.jsx';
import { scaleBand, scaleLinear, niceTicks, seriesColor } from './scales.js';
import { Axis } from './parts/Axis.jsx';
import { GridLines } from './parts/GridLines.jsx';
import { ChartLegend } from './parts/ChartLegend.jsx';
import { ChartTooltip } from './parts/ChartTooltip.jsx';
import { scalePosition } from './parts/position.js';
import { useChartHover, labelRoom, legendItems, finite, AXIS_TITLE_ROOM } from './chart-kit.js';

const STRINGS = { category: 'Category', bars: 'Columns', lines: 'Lines' };
const extent = (list, from0) => {
  let lo = from0 ? 0 : Infinity, hi = from0 ? 0 : -Infinity;
  list.forEach((s) => (s.values || []).forEach((v) => { if (v === null || v === undefined || !isFinite(Number(v))) return; lo = Math.min(lo, Number(v)); hi = Math.max(hi, Number(v)); }));
  if (!isFinite(lo)) { lo = 0; hi = 1; }
  if (lo === hi) hi = lo + 1;
  return [lo, hi];
};

export function ComboChart({ title, description, hideCaption, size, categories = [], bars = [], lines = [], axis = 'shared', barLabel, lineLabel, categoryLabel,
  formatBar, formatLine, showPoints = true, legend, legendPosition, tooltip = true, margin, strings, className }) {
  const t = Object.assign({}, STRINGS, strings);
  const dual = axis === 'dual';
  const fb = (v) => (typeof formatBar === 'function' ? formatBar(v) : formatNumber(v));
  const fl = (v) => (typeof formatLine === 'function' ? formatLine(v) : formatNumber(v));
  const [active, hover] = useChartHover();
  const cols = bars.map((s, i) => Object.assign({}, s, { id: s.id === undefined ? 'b' + i : s.id, color: s.color || seriesColor(i) }));
  const lns = lines.map((s, i) => Object.assign({}, s, { id: s.id === undefined ? 'l' + i : s.id, color: s.color || seriesColor(cols.length + i) }));
  const barDom = dual ? extent(cols, true) : extent(cols.concat(lns), true);
  const lineDom = dual ? extent(lns, false) : barDom;
  const startTexts = niceTicks(barDom[0], barDom[1], 5).ticks.map(fb);
  const endTexts = dual ? niceTicks(lineDom[0], lineDom[1], 5).ticks.map(fl) : [];
  const auto = { start: labelRoom(startTexts, barLabel ? AXIS_TITLE_ROOM : 0), end: dual ? labelRoom(endTexts, lineLabel ? AXIS_TITLE_ROOM : 0) : undefined,
    bottom: categoryLabel ? 24 + AXIS_TITLE_ROOM : undefined };
  const m = Object.assign({}, auto, margin);
  Object.keys(m).forEach((k) => { if (m[k] === undefined) delete m[k]; });
  const table = {
    columns: [{ title: categoryLabel || t.category, field: 'category', kind: 'name', rowLabel: true }]
      .concat(cols.map((s, i) => ({ title: s.label, field: 'b' + i, kind: 'data', align: 'right' })))
      .concat(lns.map((s, i) => ({ title: s.label, field: 'l' + i, kind: 'data', align: 'right' }))),
    data: categories.map((c, ci) => {
      const row = { id: ci + 1, category: String(c) };
      cols.forEach((s, i) => { const v = s.values[ci]; row['b' + i] = v === null || v === undefined ? '' : fb(v); });
      lns.forEach((s, i) => { const v = s.values[ci]; row['l' + i] = v === null || v === undefined ? '' : fl(v); });
      return row;
    })
  };
  const key = legend === false ? null : (
    <div className={cx('plx-combo-chart__legend', legendPosition === 'end' && 'plx-combo-chart__legend--vertical')}>
      {cols.length ? <ChartLegend items={legendItems(cols)} label={t.bars} orientation={legendPosition === 'end' ? 'vertical' : 'horizontal'} /> : null}
      {lns.length ? <ChartLegend items={legendItems(lns)} shape="line" label={t.lines} orientation={legendPosition === 'end' ? 'vertical' : 'horizontal'} /> : null}
    </div>
  );
  return (
    <ChartFrame title={title} description={description} hideCaption={hideCaption} size={size} margin={m} legend={key} legendPosition={legendPosition}
      table={table} strings={strings} className={cx('plx-combo-chart', dual && 'plx-combo-chart--dual', className)}>
      {({ inner, margin: fm }) => {
        const x = scaleBand({ domain: categories, range: [0, inner.width], paddingInner: 0.2, paddingOuter: 0.1 });
        const yb = scaleLinear({ domain: barDom, range: [inner.height, 0], nice: true });
        const yl = dual ? scaleLinear({ domain: lineDom, range: [inner.height, 0], nice: true }) : yb;
        const sub = scaleBand({ domain: cols.map((s) => s.id), range: [0, x.bandwidth()], paddingInner: cols.length > 1 ? 0.1 : 0, paddingOuter: 0 });
        const zero = yb(0);
        const path = (s) => {
          let d = '', pen = false;
          categories.forEach((c, ci) => {
            const v = s.values[ci];
            if (v === null || v === undefined || !isFinite(Number(v))) { pen = false; return; }
            d += (pen ? 'L' : 'M') + scalePosition(x, c) + ',' + yl(v); pen = true;
          });
          return d;
        };
        let tip = null;
        if (tooltip && active !== null && categories[active] !== undefined) {
          const ci = Number(active);
          tip = <ChartTooltip variant="shared" x={scalePosition(x, categories[ci])} inner={inner} title={String(categories[ci])}
            items={cols.map((s) => ({ label: s.label, value: s.values[ci] === undefined || s.values[ci] === null ? '–' : fb(s.values[ci]), color: s.color }))
              .concat(lns.map((s) => ({ label: s.label, value: s.values[ci] === undefined || s.values[ci] === null ? '–' : fl(s.values[ci]), color: s.color })))} />;
        }
        return (
          <g>
            <GridLines scale={yb} inner={inner} />
            {categories.map((c, ci) => cols.map((s) => {
              const v = s.values[ci];
              if (v === null || v === undefined || !isFinite(Number(v))) return null;
              const p = yb(v);
              return <rect key={ci + ':' + s.id} className="plx-chart__mark plx-combo-chart__bar" data-plx-dataviz={s.color}
                x={x(c) + sub(s.id)} y={Math.min(p, zero)} width={sub.bandwidth()} height={Math.abs(zero - p)} />;
            }))}
            <line className="plx-chart__axis-line" x1={0} x2={inner.width} y1={zero} y2={zero} />
            {lns.map((s) => <path key={s.id} className="plx-chart__line plx-combo-chart__line" data-plx-dataviz={s.color} d={path(s)} />)}
            {showPoints ? lns.map((s) => categories.map((c, ci) => {
              const v = s.values[ci];
              if (v === null || v === undefined || !isFinite(Number(v))) return null;
              return <circle key={s.id + ci} className="plx-chart__point plx-combo-chart__point" data-plx-dataviz={s.color} cx={scalePosition(x, c)} cy={yl(finite(v))} />;
            })) : null}
            <Axis scale={yb} orient="left" inner={inner} margin={fm} format={fb} label={barLabel} />
            {dual ? <Axis scale={yl} orient="right" inner={inner} margin={fm} format={fl} label={lineLabel} /> : null}
            <Axis scale={x} orient="bottom" inner={inner} margin={fm} line={false} label={categoryLabel} />
            {tooltip ? categories.map((c, ci) => <rect key={'hit' + ci} className="plx-combo-chart__hit" x={x(c) - x.step() * 0.1} y={0} width={x.step()} height={inner.height} {...hover(ci)} />) : null}
            {tip}
          </g>
        );
      }}
    </ChartFrame>
  );
}
