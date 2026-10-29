/* Plenix · ScatterChart
   Summary: Items plotted as points by two measures, to show how they relate (07 Data Display › Charts › Scatter plot):
     clusters, a correlation, the outliers. As a bubble chart (Bubble chart) each point's area shows a third measure;
     a trend line can show the fit of each series.
   Usage:
     <ScatterChart title="Size and downloads of assets" description="Larger assets are downloaded less."
       xTitle="Size (MB)" yTitle="Downloads" series={[{ id: 'img', label: 'Images', points: [{ x: 2.4, y: 310, label: 'hero.jpg' }, …] }]} />
     <ScatterChart variant="bubble" sizeTitle="Views" series={teams} …/>      // points: { x, y, size }
     <ScatterChart trend series={…} …/>
   Props:
     title: the chart's name (required); description: its takeaway
     series: the groups of points, in order: [{ id, label, points: [{ x, y, size, label }] }]; one group needs no legend
       (a legend lists them when there are two or more)
     variant: "points" (default: a scatter plot, every point the same size) | "bubble" (the area of each point is its size)
     trend: draws each series' least-squares line across its points (default false)
     xTitle, yTitle: the measures with their units: the axis titles, the table's columns and the tooltip's names (required)
     sizeTitle: the third measure of a bubble chart, with its unit
     xFormat, yFormat, sizeFormat: (value) => text (default the axis's format / formatNumber)
     size: the plot's height, as ChartFrame ("sm" | "md" default | "lg")
     strings: the words it says: { series: "Series", item: "Item", hint } (hint: the chart interaction's)
     className: more classes on the figure
   Behavior:
     Both axes fit the data (they need not start at zero) on round ticks; the axis titles name the measures.
     Bubbles: area, not radius, follows the size (the largest bubble 24px across its radius); smaller bubbles are drawn on
       top of larger ones, and every point is a little transparent, so overlaps stay visible.
     Keyboard: one Tab stop; the arrow keys move through the points (by series, then left to right), each spoken with its
       values; the pointer over a point does the same. The active point gets a ring and the tooltip.
     The frame's "Show the data" table lists every point with its measures.
   Notes:
     Built on ChartFrame, the chart parts (Axis, GridLines, ChartLegend, ChartTooltip) and the chart-a11y helpers. Series take
       the categorical colors by their order; the trend line is dashed, so it is told from the points by more than color.
*/
import React from 'react';
import { cx } from '../utils/cx.js';
import { formatNumber } from '../utils/format.js';
import { ChartFrame } from './ChartFrame.jsx';
import { scaleLinear, seriesColor } from './scales.js';
import { Axis } from './parts/Axis.jsx';
import { GridLines } from './parts/GridLines.jsx';
import { ChartLegend } from './parts/ChartLegend.jsx';
import { ChartTooltip } from './parts/ChartTooltip.jsx';
import { useChartPoints } from './a11y.js';
import { useStrings } from '../providers/LocaleProvider.jsx';

// SVG geometry on the 4px grid: a point's radius, the largest and smallest bubble's, the active ring's room
const POINT = 4, BUBBLE_MAX = 24, BUBBLE_MIN = 4, RING = 4;

// the least-squares line through points: [[x0, y0], [x1, y1]] across their x range, or null
function fit(points) {
  const n = points.length;
  if (n < 2) return null;
  let sx = 0, sy = 0, sxx = 0, sxy = 0, lo = Infinity, hi = -Infinity;
  points.forEach((p) => { sx += p.x; sy += p.y; sxx += p.x * p.x; sxy += p.x * p.y; lo = Math.min(lo, p.x); hi = Math.max(hi, p.x); });
  const d = n * sxx - sx * sx;
  if (!d) return null;
  const m = (n * sxy - sx * sy) / d, b = (sy - m * sx) / n;
  return [[lo, m * lo + b], [hi, m * hi + b]];
}

export function ScatterChart({ title, description, series = [], variant = 'points', trend = false, xTitle, yTitle, sizeTitle, xFormat, yFormat, sizeFormat,
  size = 'md', strings, className }) {
  const t = useStrings('chart.scatterChart', strings);
  const v = variant === 'bubble' ? 'bubble' : 'points';
  const groups = series.map((s, i) => ({ id: s.id === undefined ? i : s.id, label: s.label, color: seriesColor(i),
    points: (s.points || []).map((p) => ({ x: Number(p.x), y: Number(p.y), size: Number(p.size), label: p.label })).filter((p) => isFinite(p.x) && isFinite(p.y)) }));
  // every point in reading order (by series, then left to right): the keyboard's and the table's order
  const all = [];
  groups.forEach((g) => g.points.slice().sort((a, b) => a.x - b.x).forEach((p) => all.push(Object.assign({ series: g }, p))));
  const fx = (n) => (typeof xFormat === 'function' ? xFormat(n) : formatNumber(n));
  const fy = (n) => (typeof yFormat === 'function' ? yFormat(n) : formatNumber(n));
  const fs = (n) => (typeof sizeFormat === 'function' ? sizeFormat(n) : formatNumber(n));
  const many = groups.length > 1, named = all.some((p) => p.label !== undefined);
  const say = (p) => [many ? p.series.label : null, p.label].filter(Boolean).join(', ') + ': ' + xTitle + ' ' + fx(p.x) + ', ' + yTitle + ' ' + fy(p.y) + (v === 'bubble' && sizeTitle ? ', ' + sizeTitle + ' ' + fs(p.size) : '');
  const keys = useChartPoints({ count: all.length, describe: (i) => say(all[i]) });
  const columns = [].concat(many ? [{ title: t.series, field: 'series', kind: 'name' }] : [], named ? [{ title: t.item, field: 'item', kind: 'name', rowLabel: true }] : [],
    [{ title: xTitle, field: 'x', kind: 'data', align: 'right' }, { title: yTitle, field: 'y', kind: 'data', align: 'right' }],
    v === 'bubble' ? [{ title: sizeTitle || '', field: 'size', kind: 'data', align: 'right' }] : []);
  const table = { columns, data: all.map((p, i) => ({ id: i + 1, series: p.series.label, item: p.label, x: fx(p.x), y: fy(p.y), size: fs(p.size) })) };
  const legend = many ? <ChartLegend items={groups.map((g) => ({ id: g.id, label: g.label, color: g.color }))} /> : undefined;
  // the trend lines' ends count in the y range, so a line stays inside the plot
  const fits = trend ? groups.map((g) => fit(g.points)) : [];
  const ext = (k) => { const vals = all.map((p) => p[k]).concat(k === 'y' ? fits.filter(Boolean).flatMap((l) => [l[0][1], l[1][1]]) : []); return vals.length ? [Math.min.apply(null, vals), Math.max.apply(null, vals)] : [0, 1]; };
  const maxSize = Math.max(0, ...all.map((p) => (isFinite(p.size) ? p.size : 0)));
  const radius = (p) => (v !== 'bubble' || !maxSize || !isFinite(p.size) ? POINT : Math.max(BUBBLE_MIN, BUBBLE_MAX * Math.sqrt(Math.max(0, p.size) / maxSize)));
  return (
      <ChartFrame interaction={keys.interaction} title={title} description={description} size={size} table={table} legend={legend} className={cx('plx-scatter', 'plx-scatter--' + v, className)}>
        {({ inner, margin }) => {
          // bubbles keep the largest radius of room inside the plot, so none is cut at an edge
          const room = v === 'bubble' ? Math.min(BUBBLE_MAX, inner.width / 4, inner.height / 4) : 0;
          const x = scaleLinear({ domain: ext('x'), range: [room, inner.width - room], nice: !room });
          const y = scaleLinear({ domain: ext('y'), range: [inner.height - room, room], nice: !room });
          // larger bubbles first, so the smaller ones sit on top
          const order = all.map((p, i) => i).sort((a, b) => radius(all[b]) - radius(all[a]));
          const a = keys.index !== null && keys.index !== undefined && all[keys.index] ? all[keys.index] : null;
          return (
            <g>
              <GridLines scale={y} inner={inner} />
              <GridLines scale={x} direction="vertical" inner={inner} />
              {trend ? groups.map((g, gi) => { const l = fits[gi]; return l ? <line key={'t' + g.id} className="plx-scatter__trend" data-plx-dataviz={g.color} x1={x(l[0][0])} y1={y(l[0][1])} x2={x(l[1][0])} y2={y(l[1][1])} /> : null; }) : null}
              {order.map((i) => { const p = all[i]; return <circle key={i} className="plx-scatter__point" data-plx-dataviz={p.series.color} cx={x(p.x)} cy={y(p.y)} r={radius(p)}
                onMouseEnter={() => keys.hover(i)} onMouseLeave={() => keys.hover(null)} />; })}
              <Axis scale={x} orient="bottom" inner={inner} margin={margin} format={xFormat} label={xTitle} />
              <Axis scale={y} orient="left" inner={inner} margin={margin} format={yFormat} label={yTitle} />
              {a ? <circle className="plx-chart-keys__ring" cx={x(a.x)} cy={y(a.y)} r={radius(a) + RING} /> : null}
              {a ? <ChartTooltip x={x(a.x)} y={y(a.y)} inner={inner} title={a.label || a.series.label}                items={[{ label: xTitle, value: fx(a.x), color: a.series.color }, { label: yTitle, value: fy(a.y), color: a.series.color }].concat(v === 'bubble' && sizeTitle ? [{ label: sizeTitle, value: fs(a.size), color: a.series.color }] : [])} /> : null}
            </g>
          );
        }}
      </ChartFrame>
  );
}
