/* Plenix · BarChart
   Summary: Amounts compared as the lengths of bars (07 Data Display › Charts › Bar chart, Column chart, Stacked bar
     chart, Histogram): one bar per category along a value axis that starts at zero, horizontal (bars: long names,
     ranking) or vertical (columns: periods), one series or several side by side (grouped), stacked into a total
     (stacked), or as shares of each category's total (percent); and the histogram, touching columns that count how
     many values fall in each range. Drawn in ChartFrame with its axes, grid lines, legend, tooltip and data grid.
   Usage:
     <BarChart title="Storage by team" description="Design uses the most storage." categories={['Design', 'Marketing', 'Sales']}
       series={[{ id: 'gb', label: 'Storage (GB)', values: [420, 310, 120] }]} valueLabel="Storage (GB)" showValues />
     <BarChart orientation="vertical" layout="stacked" title="Uploads per month" categories={months}
       series={[{ id: 'img', label: 'Images', values: […] }, { id: 'vid', label: 'Videos', values: […] }]} />
     <BarChart orientation="vertical" title="File sizes" histogram={{ values: sizes, bins: 8 }} categoryLabel="Size (MB)" valueLabel="Files" />
   Props:
     title: the chart's name (required); description: its takeaway in a sentence or two (ChartFrame)
     categories: the category names, in the order to draw them (sort by value unless the order is natural: months, steps)
     series: [{ id, label, values, color }]: values one per category (a missing value draws nothing); color an optional
       data-viz step (default seriesColor by the series' order)
     orientation: "horizontal" (default: bars, categories down the start side) | "vertical" (columns, categories along
       the bottom)
     layout: "grouped" (default: series side by side in each category) | "stacked" (series stacked into the category's
       total) | "percent" (stacked to 100%: each series' share of its category)
     histogram: { values, bins, domain, format } draws a histogram instead of categories and series: values are the raw
       numbers, bins about how many ranges (default from the number of values), on round edges of equal width; domain
       [min, max] limits the range; format(edge) writes the range axis's labels
     valueLabel, categoryLabel: the axis titles (the measure with its unit); room is made for them
     format: (value) => text for the values (tooltip, labels, table); default formatNumber in the reader's locale
     showValues: writes each value at its bar's end (grouped), each stack's total (stacked), each share inside its segment
       when it fits (percent), or each count (histogram) (default false)
     legend: true | false: the series' legend (default: shown when there are two series or more)
     legendPosition: "bottom" (default) | "top" | "end" (ChartFrame)
     tooltip: shows the values of the bar under the pointer (default true)
     size, margin, hideCaption, className: ChartFrame's (margin wins over the room computed for the labels)
     strings: { category: "Category", total: "Total", range: "Range", count: "Count" } and ChartFrame's strings
   Behavior:
     The value axis starts at zero (negative values go the other way from a zero line); stacked bars stack positive values
       up and negative values down; percent stacks only positive values.
     Hover a bar: the tooltip shows its value (grouped), its category's values (stacked, percent: with each share) or its
       range and count (histogram). The data grid lists every value: the chart's keyboard and screen reader view.
     Histogram bins touch (no gap: the range is continuous) and have equal widths on round edges.
   Notes:
     Colors come from the data-viz scales (seriesColor by the series' order); stacked segments and bins are parted by a
       thin line in the surface color (bar-chart tokens). Geometry only in the markup.
     Pointer interaction is the chart kit's minimal hover (chart-kit.js); the chart interaction foundation replaces it.
*/
import React from 'react';
import { cx } from '../utils/cx.js';
import { formatNumber, formatPercent } from '../utils/format.js';
import { ChartFrame } from './ChartFrame.jsx';
import { scaleBand, scaleLinear, niceTicks, seriesColor } from './scales.js';
import { Axis } from './parts/Axis.jsx';
import { GridLines } from './parts/GridLines.jsx';
import { ChartLegend } from './parts/ChartLegend.jsx';
import { ChartTooltip } from './parts/ChartTooltip.jsx';
import { DataLabel } from './parts/DataLabel.jsx';
import { useChartHover, labelRoom, halfRoom, withColors, legendItems, AXIS_TITLE_ROOM } from './chart-kit.js';

const STRINGS = { category: 'Category', total: 'Total', range: 'Range', count: 'Count' };
const LAYOUTS = ['grouped', 'stacked', 'percent'];
// px: the least room a segment needs for its share written inside it (percent)
const INSIDE_LABEL_MIN = 32;

// equal bins on round edges: [{ x0, x1, count }]
export function binValues(values, { bins, domain } = {}) {
  const v = (values || []).map(Number).filter((x) => isFinite(x));
  if (!v.length) return [];
  const lo = domain ? Number(domain[0]) : Math.min.apply(null, v);
  const hi = domain ? Number(domain[1]) : Math.max.apply(null, v);
  const n = Math.max(1, Math.round(bins || Math.ceil(Math.log2(v.length) + 1)));
  const t = niceTicks(lo, hi, n);
  let edges = t.ticks;
  if (edges.length < 2) edges = [t.start, t.start + t.step];
  const out = edges.slice(0, -1).map((x0, i) => ({ x0, x1: edges[i + 1], count: 0 }));
  v.forEach((x) => {
    if (x < edges[0] || x > edges[edges.length - 1]) return;
    const i = Math.min(out.length - 1, Math.floor((x - edges[0]) / t.step));
    if (i >= 0) out[i].count += 1;
  });
  return out;
}

export function BarChart({ title, description, hideCaption, size, categories = [], series = [], orientation = 'horizontal', layout = 'grouped',
  histogram, valueLabel, categoryLabel, format, showValues = false, legend, legendPosition, tooltip = true, margin, strings, className }) {
  const t = Object.assign({}, STRINGS, strings);
  const o = orientation === 'vertical' ? 'vertical' : 'horizontal';
  const across = o === 'horizontal';
  const bins = histogram && Array.isArray(histogram.values) ? binValues(histogram.values, histogram) : null;
  const mode = bins ? 'histogram' : LAYOUTS.indexOf(layout) >= 0 ? layout : 'grouped';
  const fmt = (v) => (typeof format === 'function' ? format(v) : formatNumber(v));
  const edgeFmt = (v) => (bins && typeof histogram.format === 'function' ? histogram.format(v) : formatNumber(v));
  const [active, hover] = useChartHover();

  const list = bins ? [{ id: 'count', label: valueLabel || t.count, values: bins.map((b) => b.count), color: seriesColor(0) }] : withColors(series);
  const cats = bins ? bins.map((b, i) => i) : categories;
  const val = (si, ci) => { const x = Number(list[si].values[ci]); return isFinite(x) ? x : null; };
  const totals = cats.map((c, ci) => list.reduce((a, s, si) => a + Math.max(0, val(si, ci) || 0), 0));
  // each bar's span on the value axis: spans[category][series] = [from, to]
  const spans = cats.map((c, ci) => {
    let pos = 0, neg = 0;
    return list.map((s, si) => {
      const v = val(si, ci);
      if (v === null) return null;
      if (mode === 'percent') { const from = pos; pos += totals[ci] ? Math.max(0, v) / totals[ci] : 0; return [from, pos]; }
      if (mode === 'stacked') { if (v >= 0) { const from = pos; pos += v; return [from, pos]; } const from = neg; neg += v; return [from, neg]; }
      return [0, v];
    });
  });
  let lo = 0, hi = 0;
  spans.forEach((row) => row.forEach((sp) => { if (sp) { lo = Math.min(lo, sp[0], sp[1]); hi = Math.max(hi, sp[0], sp[1]); } }));
  if (mode === 'percent') { lo = 0; hi = 1; }
  if (hi === lo) hi = lo + 1;
  const tickFmt = mode === 'percent' ? (v) => formatPercent(v) : typeof format === 'function' ? format : undefined;
  const tickTexts = niceTicks(lo, hi, 5).ticks.map((v) => (tickFmt ? tickFmt(v) : formatNumber(v)));
  const catTexts = bins ? bins.map((b) => edgeFmt(b.x0)).concat([edgeFmt(bins.length ? bins[bins.length - 1].x1 : 0)]) : cats.map(String);
  const endTexts = showValues && across ? (mode === 'stacked' ? totals.map(fmt) : list.reduce((a, s, si) => a.concat(cats.map((c, ci) => (val(si, ci) === null ? '' : fmt(val(si, ci))))), [])) : [];
  // the room the labels need: the category names (bars) or the value ticks (columns) before the plot, axis titles, values
  const auto = across
    ? { start: labelRoom(catTexts, categoryLabel ? AXIS_TITLE_ROOM : 0), bottom: valueLabel ? 24 + AXIS_TITLE_ROOM : undefined, end: Math.max(showValues && mode !== 'percent' ? labelRoom(endTexts) : 0, halfRoom(tickTexts[tickTexts.length - 1])) }
    : { start: labelRoom(tickTexts, valueLabel ? AXIS_TITLE_ROOM : 0), bottom: categoryLabel ? 24 + AXIS_TITLE_ROOM : undefined, top: showValues ? 24 : undefined, end: bins ? halfRoom(catTexts[catTexts.length - 1]) : undefined };
  const m = Object.assign({}, auto, margin);
  Object.keys(m).forEach((k) => { if (m[k] === undefined) delete m[k]; });

  const rangeText = (b) => edgeFmt(b.x0) + '–' + edgeFmt(b.x1);
  const table = bins
    ? { columns: [{ title: categoryLabel || t.range, field: 'range', kind: 'data', rowLabel: true }, { title: valueLabel || t.count, field: 'count', kind: 'data', hozAlign: 'right' }],
      data: bins.map((b, i) => ({ id: i + 1, range: rangeText(b), count: fmt(b.count) })) }
    : { columns: [{ title: categoryLabel || t.category, field: 'category', kind: 'name', rowLabel: true }]
      .concat(list.map((s, si) => ({ title: s.label, field: 's' + si, kind: 'data', hozAlign: 'right' })))
      .concat(mode !== 'grouped' && list.length > 1 ? [{ title: t.total, field: 'total', kind: 'data', hozAlign: 'right' }] : []),
    data: cats.map((c, ci) => {
      const row = { id: ci + 1, category: String(c) };
      list.forEach((s, si) => { const v = val(si, ci); row['s' + si] = v === null ? '' : mode === 'percent' && totals[ci] ? fmt(v) + ' (' + formatPercent(Math.max(0, v) / totals[ci]) + ')' : fmt(v); });
      row.total = fmt(totals[ci]);
      return row;
    }) };
  const showLegend = legend === undefined ? !bins && list.length > 1 : !!legend && !bins;
  const key = showLegend ? <ChartLegend items={legendItems(list)} orientation={legendPosition === 'end' ? 'vertical' : 'horizontal'} /> : null;

  return (
    <ChartFrame title={title} description={description} hideCaption={hideCaption} size={size} margin={m} legend={key} legendPosition={legendPosition}
      table={table} strings={strings} className={cx('plx-bar-chart', 'plx-bar-chart--' + o, 'plx-bar-chart--' + mode, className)}>
      {({ inner, margin: fm }) => {
        const L = across ? inner.height : inner.width;   // the category axis's length
        const V = across ? inner.width : inner.height;   // the value axis's length
        const vs = scaleLinear({ domain: [lo, hi], range: across ? [0, V] : [V, 0], nice: mode !== 'percent' });
        const band = bins ? null : scaleBand({ domain: cats, range: [0, L], paddingInner: 0.2, paddingOuter: 0.1 });
        const cs = bins ? scaleLinear({ domain: [bins[0].x0, bins[bins.length - 1].x1], range: [0, L] }) : null;
        const sub = band && mode === 'grouped' ? scaleBand({ domain: list.map((s) => s.id), range: [0, band.bandwidth()], paddingInner: list.length > 1 ? 0.1 : 0, paddingOuter: 0 }) : null;
        // a bar from a to b on the value axis, at start along the category axis with its thickness
        const box = (start, thick, a, b) => {
          const p0 = vs(a), p1 = vs(b), low = Math.min(p0, p1), len = Math.abs(p1 - p0);
          return across ? { x: low, y: start, width: len, height: thick } : { x: start, y: low, width: thick, height: len };
        };
        const place = (ci, si) => {
          if (bins) return [cs(bins[ci].x0), cs(bins[ci].x1) - cs(bins[ci].x0)];
          if (sub) return [band(cats[ci]) + sub(list[si].id), sub.bandwidth()];
          return [band(cats[ci]), band.bandwidth()];
        };
        // the anchor of a bar's end: the middle of its thickness at the value's end
        const endOf = (start, thick, v) => (across ? { x: vs(v), y: start + thick / 2 } : { x: start + thick / 2, y: vs(v) });
        const joined = mode !== 'grouped';
        const marks = [], labels = [];
        cats.forEach((c, ci) => list.forEach((s, si) => {
          const sp = spans[ci][si];
          if (!sp) return;
          const [start, thick] = place(ci, si);
          const k = mode === 'stacked' || mode === 'percent' ? String(ci) : ci + ':' + si;
          marks.push(<rect key={ci + ':' + si} className={cx('plx-chart__mark', 'plx-bar-chart__bar', joined && 'plx-bar-chart__bar--joined')} data-plx-dataviz={s.color}
            {...box(start, thick, sp[0], sp[1])} {...(tooltip ? hover(k) : {})} />);
          if (!showValues) return;
          if (mode === 'grouped' || mode === 'histogram') {
            const e = endOf(start, thick, Math.max(0, sp[1]));   // a negative value's label sits on the empty side of the zero line
            labels.push(<DataLabel key={'l' + ci + ':' + si} x={e.x} y={e.y} value={fmt(val(si, ci))} position={across ? 'end' : 'top'} />);
          } else if (mode === 'percent' && Math.abs(vs(sp[1]) - vs(sp[0])) >= INSIDE_LABEL_MIN) {
            const mid = endOf(start, thick, (sp[0] + sp[1]) / 2);
            labels.push(<DataLabel key={'l' + ci + ':' + si} x={mid.x} y={mid.y} value={formatPercent(sp[1] - sp[0])} position="center" />);
          }
        }));
        if (showValues && mode === 'stacked') cats.forEach((c, ci) => {
          const [start, thick] = place(ci, 0);
          const e = endOf(start, thick, totals[ci]);
          labels.push(<DataLabel key={'t' + ci} x={e.x} y={e.y} value={fmt(totals[ci])} position={across ? 'end' : 'top'} />);
        });
        // the tooltip of the bar (grouped, histogram) or the category (stacked, percent) under the pointer
        let tip = null;
        if (tooltip && active !== null) {
          const [ci, si] = String(active).split(':').map(Number);
          if (cats[ci] !== undefined) {
            if (bins) {
              const [start, thick] = place(ci, 0), e = endOf(start, thick, bins[ci].count);
              tip = <ChartTooltip x={e.x} y={e.y} inner={inner} title={rangeText(bins[ci])} titleKind="data" items={[{ label: valueLabel || t.count, value: fmt(bins[ci].count), color: list[0].color }]} />;
            } else if (mode === 'grouped' && list[si]) {
              const [start, thick] = place(ci, si), v = val(si, ci), e = endOf(start, thick, Math.max(0, v || 0));
              tip = <ChartTooltip x={e.x} y={e.y} inner={inner} title={String(cats[ci])} items={[{ label: list[si].label, value: fmt(v), color: list[si].color }]} />;
            } else {
              const [start, thick] = place(ci, 0), e = endOf(start, thick, mode === 'percent' ? 1 : totals[ci]);
              tip = <ChartTooltip x={e.x} y={e.y} inner={inner} title={String(cats[ci]) + ' · ' + fmt(totals[ci])} titleKind="text"
                items={list.map((s, i) => { const v = val(i, ci); return { label: s.label, value: v === null ? '–' : mode === 'percent' && totals[ci] ? formatPercent(Math.max(0, v) / totals[ci]) : fmt(v), color: s.color }; })} />;
            }
          }
        }
        const catAxis = bins
          ? <Axis scale={cs} orient={across ? 'left' : 'bottom'} inner={inner} margin={fm} line={false}
            ticks={bins.length <= 12 ? [bins[0].x0].concat(bins.map((b) => b.x1)) : undefined} format={edgeFmt} label={categoryLabel} />
          : <Axis scale={band} orient={across ? 'left' : 'bottom'} inner={inner} margin={fm} line={false} label={categoryLabel} />;
        const zero = vs(0);
        return (
          <g>
            <GridLines scale={vs} direction={across ? 'vertical' : 'horizontal'} inner={inner} />
            {marks}
            {across ? <line className="plx-chart__axis-line" x1={zero} x2={zero} y1={0} y2={inner.height} /> : <line className="plx-chart__axis-line" x1={0} x2={inner.width} y1={zero} y2={zero} />}
            {labels}
            <Axis scale={vs} orient={across ? 'bottom' : 'left'} inner={inner} margin={fm} line={false}
              format={tickFmt} label={valueLabel} />
            {catAxis}
            {tip}
          </g>
        );
      }}
    </ChartFrame>
  );
}
