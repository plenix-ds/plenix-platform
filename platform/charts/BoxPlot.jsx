/* Plenix · BoxPlot
   Summary: Distributions compared by their summaries (07 Data Display › Charts › Box plot): for each group a box from
     the first to the third quartile (the middle half of its values) with a line at the median, whiskers to the lowest
     and highest values within 1.5 times the box's length, and the values beyond them drawn as outlier points; vertical
     (groups along the bottom) or horizontal. Drawn in ChartFrame on one shared value axis, with a tooltip and the data
     table of every summary.
   Usage:
     <BoxPlot title="Review time by team" description="Design reviews take longest and vary most." valueLabel="Hours"
       groups={[{ id: 'design', label: 'Design', values: [4, 6, 7, 9, 12, 30] }, { id: 'legal', label: 'Legal', values: […] }]} />
     <BoxPlot orientation="horizontal" groups={[{ label: 'Q1', stats: { min: 2, q1: 4, median: 6, q3: 9, max: 14, outliers: [22] } }]} … />
   Props:
     title: the chart's name (required); description: its takeaway (ChartFrame)
     groups: [{ id, label, values }] (the raw values: the summary is computed) or [{ id, label, stats: { min, q1, median,
       q3, max, outliers } }] (a summary already made: min and max are the whiskers' ends)
     orientation: "vertical" (default: one box per group along the bottom) | "horizontal" (groups down the start side)
     showOutliers: draws the values beyond the whiskers as points (default true)
     valueLabel, categoryLabel: the axis titles; format: (value) => text (ticks, tooltip, table)
     tooltip: shows the group's summary under the pointer (default true)
     size, margin, hideCaption, className, legend, legendPosition: ChartFrame's
     strings: { group: "Group", min: "Minimum", q1: "First quartile", median: "Median", q3: "Third quartile", max: "Maximum",
       outliers: "Outliers", n: "Values" } and ChartFrame's strings
   Behavior:
     Quartiles are interpolated between the sorted values (the method spreadsheets use); whiskers end at the most extreme
       values within 1.5 × the interquartile range of the box (Tukey); say so in the description for a general audience.
     Every group shares one value axis. Hover a group: the tooltip lists its five numbers. The table lists them all, with
       the outliers and the number of values.
   Notes:
     The box is the frame's mark (the first categorical color); the median line takes the surface color across it, the
       whiskers the subtle content color, outliers the frame's point (box-plot tokens). For a few values plot the points.
*/
import React from 'react';
import { cx } from '../utils/cx.ts';
import { formatNumber } from '../utils/format.ts';
import { ChartFrame } from './ChartFrame.jsx';
import { scaleBand, scaleLinear, niceTicks } from './scales.js';
import { Axis } from './parts/Axis.jsx';
import { GridLines } from './parts/GridLines.jsx';
import { ChartTooltip } from './parts/ChartTooltip.jsx';
import { useChartHover, labelRoom, halfRoom, AXIS_TITLE_ROOM } from './chart-kit.js';
import { useStrings } from '../providers/LocaleProvider.tsx';

const CAP = 0.5;   // a whisker's cap, a share of the box's thickness

// a quantile of sorted values, interpolated between the two nearest
function quantile(sorted, p) {
  if (!sorted.length) return 0;
  const i = (sorted.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo);
}

// the five-number summary with Tukey's whiskers: { min, q1, median, q3, max, outliers, n }
export function boxStats(values) {
  const v = (values || []).map(Number).filter((x) => isFinite(x)).sort((a, b) => a - b);
  if (!v.length) return null;
  const q1 = quantile(v, 0.25), median = quantile(v, 0.5), q3 = quantile(v, 0.75), fence = (q3 - q1) * 1.5;
  const inside = v.filter((x) => x >= q1 - fence && x <= q3 + fence);
  return { min: inside[0], q1, median, q3, max: inside[inside.length - 1], outliers: v.filter((x) => x < q1 - fence || x > q3 + fence), n: v.length };
}

export function BoxPlot({ title, description, hideCaption, size, groups = [], orientation = 'vertical', showOutliers = true, valueLabel, categoryLabel, format,
  tooltip = true, legend, legendPosition, margin, strings, className }) {
  const t = useStrings('chart.boxPlot', strings);
  const o = orientation === 'horizontal' ? 'horizontal' : 'vertical';
  const across = o === 'horizontal';
  const fmt = (v) => (typeof format === 'function' ? format(v) : formatNumber(v));
  const [active, hover] = useChartHover();
  const list = groups.map((g, i) => ({ id: g.id === undefined ? String(i) : g.id, label: g.label, s: g.stats ? Object.assign({ outliers: [] }, g.stats) : boxStats(g.values) })).filter((g) => g.s);
  let lo = Infinity, hi = -Infinity;
  list.forEach((g) => { [g.s.min, g.s.max].concat(showOutliers ? g.s.outliers : []).forEach((v) => { lo = Math.min(lo, v); hi = Math.max(hi, v); }); });
  if (!isFinite(lo)) { lo = 0; hi = 1; }
  if (lo > 0 && lo < (hi - lo)) lo = 0;   // from zero when zero is near the data
  const tickTexts = niceTicks(lo, hi, 5).ticks.map(fmt);
  const auto = across
    ? { start: labelRoom(list.map((g) => g.label), categoryLabel ? AXIS_TITLE_ROOM : 0), bottom: valueLabel ? 24 + AXIS_TITLE_ROOM : undefined, end: halfRoom(tickTexts[tickTexts.length - 1]) }
    : { start: labelRoom(tickTexts, valueLabel ? AXIS_TITLE_ROOM : 0), bottom: categoryLabel ? 24 + AXIS_TITLE_ROOM : undefined };
  const m = Object.assign({}, auto, margin);
  Object.keys(m).forEach((k) => { if (m[k] === undefined) delete m[k]; });
  const table = {
    columns: [{ title: categoryLabel || t.group, field: 'group', kind: 'name', rowLabel: true }]
      .concat(['min', 'q1', 'median', 'q3', 'max'].map((k) => ({ title: t[k], field: k, kind: 'data', align: 'right' })))
      .concat([{ title: t.outliers, field: 'outliers', kind: 'data' }, { title: t.n, field: 'n', kind: 'data', align: 'right' }]),
    data: list.map((g, i) => ({ id: i + 1, group: g.label, min: fmt(g.s.min), q1: fmt(g.s.q1), median: fmt(g.s.median), q3: fmt(g.s.q3), max: fmt(g.s.max),
      outliers: (g.s.outliers || []).map(fmt).join(', '), n: g.s.n === undefined ? '' : fmt(g.s.n) }))
  };
  return (
    <ChartFrame title={title} description={description} hideCaption={hideCaption} size={size} margin={m} legend={legend} legendPosition={legendPosition}
      table={table} strings={strings} className={cx('plx-box-plot', 'plx-box-plot--' + o, className)}>
      {({ inner, margin: fm }) => {
        const L = across ? inner.height : inner.width, V = across ? inner.width : inner.height;
        const band = scaleBand({ domain: list.map((g) => g.id), range: [0, L], paddingInner: 0.4, paddingOuter: 0.2 });
        const vs = scaleLinear({ domain: [lo, hi], range: across ? [0, V] : [V, 0], nice: true });
        // a line along the value axis (a = b: across it) at position p of the category axis
        const seg = (p0, p1, a, b) => (across ? { x1: vs(a), x2: vs(b), y1: p0, y2: p1 } : { x1: p0, x2: p1, y1: vs(a), y2: vs(b) });
        let tip = null;
        if (tooltip && active !== null) {
          const g = list.filter((x) => x.id === active)[0];
          if (g) {
            const mid = band(g.id) + band.bandwidth() / 2, end = vs(g.s.max);
            tip = <ChartTooltip x={across ? end : mid} y={across ? mid : end} inner={inner} title={g.label}
              items={['max', 'q3', 'median', 'q1', 'min'].map((k) => ({ label: t[k], value: fmt(g.s[k]), color: 'categorical-1' }))} />;
          }
        }
        return (
          <g>
            <GridLines scale={vs} direction={across ? 'vertical' : 'horizontal'} inner={inner} />
            {list.map((g) => {
              const start = band(g.id), thick = band.bandwidth(), mid = start + thick / 2, cap = thick * CAP;
              const b0 = vs(g.s.q1), b1 = vs(g.s.q3);
              const boxAttrs = across ? { x: Math.min(b0, b1), y: start, width: Math.abs(b1 - b0), height: thick } : { x: start, y: Math.min(b0, b1), width: thick, height: Math.abs(b1 - b0) };
              const along = (a, b) => (across ? { x1: vs(a), x2: vs(b), y1: mid, y2: mid } : { x1: mid, x2: mid, y1: vs(a), y2: vs(b) });
              return (
                <g key={g.id} className="plx-box-plot__group" {...(tooltip ? hover(g.id) : {})}>
                  <line className="plx-box-plot__whisker" {...along(g.s.min, g.s.q1)} />
                  <line className="plx-box-plot__whisker" {...along(g.s.q3, g.s.max)} />
                  <line className="plx-box-plot__whisker plx-box-plot__cap" {...seg(mid - cap / 2, mid + cap / 2, g.s.min, g.s.min)} />
                  <line className="plx-box-plot__whisker plx-box-plot__cap" {...seg(mid - cap / 2, mid + cap / 2, g.s.max, g.s.max)} />
                  <rect className="plx-chart__mark plx-box-plot__box" {...boxAttrs} />
                  <line className="plx-box-plot__median" {...seg(start, start + thick, g.s.median, g.s.median)} />
                  {showOutliers ? (g.s.outliers || []).map((v, i) => (
                    <circle key={i} className="plx-chart__point plx-box-plot__outlier" cx={across ? vs(v) : mid} cy={across ? mid : vs(v)} />
                  )) : null}
                </g>
              );
            })}
            <Axis scale={vs} orient={across ? 'bottom' : 'left'} inner={inner} margin={fm} format={fmt} label={valueLabel} line={across} />
            <Axis scale={band} orient={across ? 'left' : 'bottom'} inner={inner} margin={fm} line={!across} label={categoryLabel}
              format={(id) => (list.filter((x) => x.id === id)[0] || {}).label} />
            {tip}
          </g>
        );
      }}
    </ChartFrame>
  );
}
