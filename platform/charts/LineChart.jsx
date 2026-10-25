/* Plenix · LineChart
   Summary: A line chart (07 Data Display › Charts › Line chart, and its Step chart variant): one line per series through
     its values over an ordered range, usually time, drawn in ChartFrame with its axes, grid lines and data grid. Lines
     are straight between values (curve "linear") or hold each value until the next change (curve "step"); points mark
     the values when there are few of them. It is interactive: one Tab stop, the arrow keys and the pointer move a
     crosshair with the shared tooltip, the value is said in the live region, the legend shows and hides series, and a
     brush can zoom to a range.
   Usage:
     <LineChart title="Sign-ups by platform" description="Sign-ups grew on every platform; the web stays ahead."
       data={rows} x="month" series={[{ id: 'web', label: 'Web' }, { id: 'ios', label: 'iOS' }]} yLabel="Sign-ups" />
     <LineChart title="Price per seat" data={prices} x="date" series={[{ id: 'price', label: 'Price' }]} curve="step" points
       format={(v) => formatCurrency(v, 'USD')} />
     <LineChart … zoom onSelect={({ r, c }) => openDay(rows[c])} overlay={({ inner, y }) => <ReferenceLine scale={y} value={250} inner={inner} label="Target" />} />
   Props:
     title, description: the chart's name and its takeaway (ChartFrame) (title required)
     data: the rows, in the x order: [{ month: 'Jan', web: 120, ios: 80 }, …]; a missing value (null) breaks the line
     x: the field of each row that holds its x value (default "x"): a name (categories), a Date (time) or a number
     series: the lines, in the legend's order: [{ id, label, field }] (field defaults to id); colors follow that order
       (seriesColor(i))
     xType: "auto" (default: from the first x value) | "band" (categories) | "time" | "linear"
     curve: "linear" (default: straight between values) | "step" (holds each value until the next one: the Step chart)
     step: where a step changes: "after" (default: at the next value) | "before" (at this value)
     points: draws a point on every value (default false; true for few values, or when the moments matter)
     zero: starts the value axis at zero (default true); false lets a trend fill the plot (say so in the description)
     yDomain: [min, max] of the value axis, instead of the data's
     format: (value) => text for values (ticks, tooltip, table), default formatNumber; formatX: (x) => text for x values
       (default: formatDate for time, formatNumber for numbers, the name for categories)
     xLabel, yLabel: the axis titles (the measure and its unit); give margin room for them
     size, margin, legendPosition: as ChartFrame
     legend: "auto" (default: a legend when there are two or more series; interactive toggles) | false | a node
     interactive: keyboard, pointer, tooltip and live region (default true)
     zoom: a brush (a drag, or Shift with the arrow keys) zooms to a range of x values; Reset zoom shows all (default false)
     onSelect({ r, c, row, series }): a click or Enter on a value selects it (the selected value keeps its ring)
     overlay({ inner, x, y, at }): more SVG on top of the lines: reference lines, thresholds, annotations (x is the x
       scale of the shown range, at(i) the x position of row i)
     strings: the words it shows, for other languages: { category: "Category" } (the table's first column without
       xLabel); the frame's and the interaction's words are theirs (frameStrings, interactionStrings)
     className: more classes on the figure
   Behavior:
     One Tab stop: ← → move the crosshair along the values, ↑ ↓ between the series, Home and End to the ends; each move
       says the values at that x in the live region (the series in focus first). The pointer does the same on hover.
     A missing value is a gap: the line is not drawn across it, and the table shows a dash.
     The legend's toggles hide and show series (the last one shown stays); the value axis follows the series shown.
     With zoom, the axis shows the marked range only; the Reset zoom button above the plot brings back all values.
   Notes:
     Every color is a data-viz step (seriesColor by the series' order); lines, points and the focus ring take the frame's
       and the chart-interaction tokens; the point radius is --plx-comp-line-chart-point-radius. No style is written.
     Up to about five series; more lines tangle: use small multiples. Unordered categories: a bar or column chart.
*/
import React from 'react';
import { cx } from '../utils/cx.js';
import { formatNumber, formatDate, formatPercent } from '../utils/format.js';
import { ChartFrame } from './ChartFrame.jsx';
import { scaleLinear, scaleBand, scaleTime, seriesColor } from './scales.js';
import { scalePosition } from './parts/position.js';
import { Axis } from './parts/Axis.jsx';
import { GridLines } from './parts/GridLines.jsx';
import { ChartLegend } from './parts/ChartLegend.jsx';
import { ChartTooltip, chartTooltipText } from './parts/ChartTooltip.jsx';
import { useChartInteraction, ChartFocusMark, ChartBrush } from './interaction.js';

const STRINGS = { category: 'Category' };
const DASH = '—';
// the room one tick label needs along the x axis, in pixels: fewer ticks on a narrow chart
const TICK_ROOM = 64, EDGE = TICK_ROOM / 2;

const isNum = (v) => typeof v === 'number' && isFinite(v);
const typeOf = (v) => (v instanceof Date ? 'time' : typeof v === 'number' ? 'linear' : 'band');

// a line's points made into a step path's corners: after (change at the next value) or before (at this value)
export function stepPoints(pts, step = 'after') {
  const out = [];
  pts.forEach((p, i) => {
    if (i) { const q = pts[i - 1]; out.push(step === 'before' ? [q[0], p[1]] : [p[0], q[1]]); }
    out.push(p);
  });
  return out;
}
export const pathOf = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ',' + p[1]).join('');
// runs of consecutive present values (a missing value breaks a line or an area)
function runs(cols, has) {
  const out = []; let cur = [];
  cols.forEach((c) => { if (has(c)) cur.push(c); else if (cur.length) { out.push(cur); cur = []; } });
  if (cur.length) out.push(cur);
  return out;
}

// the shared engine of LineChart and AreaChart (kind "area": filled down to the baseline or the series under it)
export function SeriesChart({ kind = 'line', title, description, data = [], x = 'x', series = [], xType = 'auto', curve = 'linear', step = 'after',
  points = false, stack = 'none', zero = true, yDomain, format, formatX, xLabel, yLabel, size = 'md', margin, legend = 'auto', legendPosition = 'bottom',
  interactive = true, zoom = false, onSelect, overlay, strings, frameStrings, interactionStrings, className }) {
  const t = Object.assign({}, STRINGS, strings);
  const area = kind === 'area';
  const stacked = area && (stack === 'stacked' || stack === 'percent');
  const percent = area && stack === 'percent';
  const list = series.map((s, i) => ({ id: s.id === undefined ? 'series-' + i : s.id, label: s.label === undefined ? String(s.id) : s.label, field: s.field || s.id, color: s.color || seriesColor(i) }));
  const xv = data.map((row) => (row ? row[x] : undefined));
  const type = xType === 'auto' ? typeOf(xv.find((v) => v !== undefined && v !== null)) : xType;
  const xs = type === 'time' ? xv.map((v) => (v instanceof Date ? v : new Date(v))) : xv;
  const raw = (s, c) => { const v = data[c] ? data[c][list[s].field] : undefined; return isNum(v) ? v : null; };
  const fmtX = typeof formatX === 'function' ? formatX : type === 'time' ? (v) => formatDate(v) : type === 'linear' ? (v) => formatNumber(v) : (v) => String(v);
  const fmtV = typeof format === 'function' ? format : (v) => formatNumber(v);
  const shown = (s) => ia.visible(list[s].id);

  const ia = useChartInteraction({
    rows: list.length, columns: data.length, mode: 'x', series: list, zoom, select: typeof onSelect === 'function',
    onSelect: (cell) => onSelect && onSelect(Object.assign({ row: data[cell.c], series: list[cell.r] }, cell)),
    labelOf: (c) => fmtX(xs[c]), strings: interactionStrings,
    describe: (cell) => chartTooltipText({ title: fmtX(xs[cell.c]), items: tipItems(cell.c, cell.r) }),
  });

  // stacked values: the bottom and the top of each series at each column (shown series only); percent: shares of 1
  const level = (s, c) => {
    if (!stacked) { const v = raw(s, c); return v === null ? null : [0, v]; }
    let base = 0, total = 0;
    for (let k = 0; k < list.length; k++) if (shown(k)) total += raw(k, c) || 0;
    for (let k = 0; k < s; k++) if (shown(k)) base += raw(k, c) || 0;
    const v = raw(s, c) || 0;
    const div = percent ? (total || 1) : 1;
    return [base / div, (base + v) / div];
  };
  function tipItems(c, first) {
    const items = [];
    list.forEach((s, i) => {
      if (!shown(i)) return;
      const v = raw(i, c);
      const share = percent && v !== null ? level(i, c) : null;
      items.push({ label: s.label, value: v === null ? DASH : percent ? formatPercent(share[1] - share[0]) + ' (' + fmtV(v) + ')' : fmtV(v), color: s.color, i });
    });
    if (first !== undefined) items.sort((a, b) => (a.i === first ? -1 : b.i === first ? 1 : 0));
    return items;
  }

  const table = {
    columns: [{ title: xLabel || t.category, field: 'x', kind: type === 'band' ? 'name' : 'data', rowLabel: true }]
      .concat(list.map((s, i) => ({ title: s.label, field: 's' + i, kind: 'data', align: 'right' }))),
    data: data.map((row, c) => { const o = { id: c + 1, x: fmtX(xs[c]) }; list.forEach((s, i) => { const v = raw(i, c); o['s' + i] = v === null ? DASH : fmtV(v); }); return o; }),
  };
  const legendNode = legend === 'auto' ? (list.length > 1
    ? <ChartLegend items={list.map((s) => ({ id: s.id, label: s.label, color: s.color }))} shape={area ? 'square' : 'line'} {...(interactive ? ia.legendProps : {})} />
    : null) : legend || null;

  const draw = ({ inner, margin: m }) => {
    const [v0, v1] = ia.view();
    const cols = []; for (let c = v0; c <= v1; c++) cols.push(c);
    if (!cols.length) return null;
    // x: categories in bands (a value at each band's middle), or a continuous time or number scale
    let xScale, posOf;
    if (type === 'band') { xScale = scaleBand({ domain: cols, range: [0, inner.width], paddingInner: 0, paddingOuter: 0 }); posOf = (c) => scalePosition(xScale, c); }
    // a continuous axis keeps half a tick label's room at each end, so the first and last labels stay inside the chart
    else if (type === 'time') { xScale = scaleTime({ domain: [xs[v0], xs[v1]], range: [EDGE, inner.width - EDGE] }); posOf = (c) => xScale(xs[c]); }
    else { xScale = scaleLinear({ domain: [Number(xs[v0]), Number(xs[v1])], range: [EDGE, inner.width - EDGE] }); posOf = (c) => xScale(Number(xs[c])); }
    // y: the shown series' values in the shown range (stacked: the tops; percent: 0 to 100%)
    let lo = Infinity, hi = -Infinity;
    list.forEach((s, i) => { if (!shown(i)) return; cols.forEach((c) => { const l = level(i, c); if (l) { lo = Math.min(lo, l[1], stacked ? l[0] : l[1]); hi = Math.max(hi, l[1]); } }); });
    if (!isFinite(lo)) { lo = 0; hi = 1; }
    if (zero || area) { lo = Math.min(0, lo); hi = Math.max(0, hi); }
    const dom = percent ? [0, 1] : Array.isArray(yDomain) ? yDomain : [lo, hi];
    const y = scaleLinear({ domain: dom, range: [inner.height, 0], nice: !percent && !Array.isArray(yDomain), count: Math.max(2, Math.min(5, Math.floor(inner.height / 40))) });
    const yFormat = percent ? (v) => formatPercent(v) : typeof format === 'function' ? format : undefined;
    const room = Math.max(2, Math.floor(inner.width / TICK_ROOM));
    const every = Math.max(1, Math.ceil(cols.length / room));
    const xTicks = type === 'band' ? cols.filter((c, k) => k % every === 0) : room;
    const xFormat = type === 'band' ? (c) => fmtX(xs[c]) : typeof formatX === 'function' ? formatX : undefined;

    // the pointer's geometry: the nearest shown column, then the nearest series at it
    const columnAt = (px) => cols.reduce((best, c) => (Math.abs(posOf(c) - px) < Math.abs(posOf(best) - px) ? c : best), cols[0]);
    ia.register({
      columnAt,
      nearest: (px, py) => {
        const c = columnAt(px); let r = null, d = Infinity;
        list.forEach((s, i) => { const l = shown(i) ? level(i, c) : null; if (l && Math.abs(y(l[1]) - py) < d) { d = Math.abs(y(l[1]) - py); r = i; } });
        return r === null ? null : { r, c };
      },
    });

    const marks = list.map((s, i) => {
      if (!shown(i)) return null;
      const segs = runs(cols, (c) => stacked ? true : raw(i, c) !== null);
      const top = (seg) => seg.map((c) => [posOf(c), y(level(i, c)[1])]);
      const bottom = (seg) => seg.map((c) => [posOf(c), y(stacked ? level(i, c)[0] : 0)]);
      const shape = (pts) => (curve === 'step' ? stepPoints(pts, step) : pts);
      return (
        <g key={s.id} className="plx-line-chart__series">
          {area ? segs.map((seg, k) => <path key={'a' + k} className="plx-chart__mark plx-area-chart__area" data-plx-dataviz={s.color} d={pathOf(shape(top(seg)).concat(shape(bottom(seg)).reverse())) + 'Z'} />) : null}
          {segs.map((seg, k) => <path key={'l' + k} className="plx-chart__line" data-plx-dataviz={s.color} d={pathOf(shape(top(seg)))} />)}
          {points ? cols.map((c) => { const l = raw(i, c) === null ? null : level(i, c); return l ? <circle key={c} className="plx-chart__point plx-line-chart__point" data-plx-dataviz={s.color} cx={posOf(c)} cy={y(l[1])} /> : null; }) : null}
        </g>
      );
    });
    const a = ia.active && ia.active.c >= v0 && ia.active.c <= v1 ? ia.active : null;
    const sel = ia.selected && ia.selected.c >= v0 && ia.selected.c <= v1 && shown(ia.selected.r) ? ia.selected : null;
    const selLevel = sel && raw(sel.r, sel.c) !== null ? level(sel.r, sel.c) : null;
    return (
      <g className={cx('plx-line-chart__plot', area && 'plx-area-chart__plot')}>
        <GridLines scale={y} inner={inner} ticks={y.ticks()} />
        {ia.brush ? <ChartBrush x0={posOf(ia.brush[0])} x1={posOf(ia.brush[1])} inner={inner} /> : null}
        {marks}
        <Axis scale={y} orient="left" inner={inner} margin={m} format={yFormat} label={yLabel} ticks={y.ticks()} />
        <Axis scale={xScale} orient="bottom" inner={inner} margin={m} format={xFormat} label={xLabel} ticks={xTicks} />
        {typeof overlay === 'function' ? overlay({ inner, x: xScale, y, at: posOf }) : null}
        {selLevel ? <ChartFocusMark className="plx-chart-selected" x={posOf(sel.c)} y={y(selLevel[1])} color={list[sel.r].color} /> : null}
        {a ? list.map((s, i) => { const l = shown(i) && raw(i, a.c) !== null ? level(i, a.c) : null; return l ? <ChartFocusMark key={s.id} x={posOf(a.c)} y={y(l[1])} color={s.color} /> : null; }) : null}
        {a ? <ChartTooltip variant="shared" x={posOf(a.c)} inner={inner} title={fmtX(xs[a.c])} titleKind={type === 'band' ? 'text' : 'data'} items={tipItems(a.c)} /> : null}
      </g>
    );
  };

  return (
    <ChartFrame title={title} description={description} size={size} margin={margin} table={table} legend={legendNode} legendPosition={legendPosition}
      interaction={interactive ? ia : undefined} strings={frameStrings}
      className={cx(area ? 'plx-area-chart' : 'plx-line-chart', area && stacked && 'plx-area-chart--stacked', className)}>
      {draw}
    </ChartFrame>
  );
}

export function LineChart(props) {
  return <SeriesChart {...props} kind="line" stack="none" />;
}
