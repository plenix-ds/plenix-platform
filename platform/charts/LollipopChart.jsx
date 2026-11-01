/* Plenix · LollipopChart
   Summary: A bar chart drawn light (07 Data Display › Charts › Lollipop chart): each category's value is a thin stem from
     zero ending in a dot, so many similar values compare without a wall of bars. Horizontal (categories down the side,
     the default) or vertical (categories along the bottom).
   Usage:
     <LollipopChart title="Uploads by team" description="Design uploads the most; legal the least."
       data={[{ label: 'Design', value: 412 }, { label: 'Marketing', value: 356 }, …]} valueTitle="Uploads" sort="desc" />
     <LollipopChart orientation="vertical" title="Downloads per month" data={months} showValues />
   Props:
     title: the chart's name (required); description: its takeaway, one or two sentences
     data: the categories, in order: [{ label, value }] (required)
     orientation: "horizontal" (default: stems across, the names down the start side) | "vertical" (stems up)
     sort: "none" (default: the data's order; categories with an order of their own, such as months) | "desc" (largest
       first) | "asc"
     color: the data-viz step of the marks ("categorical-1" by default)
     showValues: writes each value at the end of its stem (DataLabel; default false)
     format: (value) => text for values in the axis, the tooltip and the labels (default the scale's / formatNumber)
     categoryTitle, valueTitle: the data grid's column names; valueTitle (the measure, with its unit) also names the value
       in the tooltip
     size: the plot's height, as ChartFrame ("sm" | "md" default | "lg")
     strings: the words it says, for other languages: { category: "Category", value: "Value", hint } (hint: the chart interaction's)
     className: more classes on the figure
   Behavior:
     The value axis starts at zero (stems are lengths); negative values point the other way from zero.
     Keyboard: the chart is one Tab stop; the arrow keys move through the categories in order (Home, End), each spoken with
       its value; the pointer over a category does the same. The active dot gets a ring and the tooltip.
     The frame's "Show the data" table lists every category and its value.
   Notes:
     Built on ChartFrame, the chart parts (Axis, GridLines, DataLabel, ChartTooltip) and the chart-a11y helpers. Stems and
       dots take the data-viz color; the dot's radius and the stem's width are --plx-comp-lollipop-* tokens. Use bars for
       stacked or grouped values.
*/
import React from 'react';
import { cx } from '../utils/cx.ts';
import { formatNumber } from '../utils/format.ts';
import { ChartFrame } from './ChartFrame.jsx';
import { scaleLinear, scaleBand, seriesColor } from './scales.js';
import { Axis } from './parts/Axis.jsx';
import { GridLines } from './parts/GridLines.jsx';
import { DataLabel } from './parts/DataLabel.jsx';
import { ChartTooltip } from './parts/ChartTooltip.jsx';
import { scalePosition } from './parts/position.js';
import { useChartPoints } from './a11y.js';
import { useStrings } from '../providers/LocaleProvider.tsx';

// the ring around the active dot (SVG geometry, the 4px grid): its radius
const RING = 8;

export function LollipopChart({ title, description, data = [], orientation = 'horizontal', sort = 'none', color, showValues = false, format,
  categoryTitle, valueTitle, size = 'md', strings, className }) {
  const t = useStrings('chart.lollipopChart', strings);
  const o = orientation === 'vertical' ? 'vertical' : 'horizontal';
  const rows = React.useMemo(() => {
    const r = data.map((d, i) => ({ id: i + 1, label: String(d.label), value: Number(d.value) }));
    if (sort === 'desc') r.sort((a, b) => b.value - a.value);
    if (sort === 'asc') r.sort((a, b) => a.value - b.value);
    return r;
  }, [data, sort]);
  const fmt = (v) => (typeof format === 'function' ? format(v) : formatNumber(v));
  const keys = useChartPoints({ count: rows.length, describe: (i) => rows[i].label + ', ' + fmt(rows[i].value) });
  const mark = color || seriesColor(0);
  const table = { columns: [{ title: categoryTitle || t.category, field: 'label', kind: 'name', rowLabel: true }, { title: valueTitle || t.value, field: 'shown', kind: 'data', align: 'right' }],
    data: rows.map((r) => ({ id: r.id, label: r.label, shown: fmt(r.value) })) };
  const lo = Math.min(0, ...rows.map((r) => r.value)), hi = Math.max(0, ...rows.map((r) => r.value));
  return (
      <ChartFrame interaction={keys.interaction} title={title} description={description} size={size} table={table} className={cx('plx-lollipop', 'plx-lollipop--' + o, className)}>
        {({ inner, margin }) => {
          const cats = rows.map((r) => r.label);
          const band = scaleBand({ domain: cats, range: o === 'horizontal' ? [0, inner.height] : [0, inner.width], paddingInner: 0.4 });
          const val = scaleLinear({ domain: [lo, hi === lo ? lo + 1 : hi], range: o === 'horizontal' ? [0, inner.width] : [inner.height, 0], nice: true });
          const zero = val(0);
          const at = (r) => { const c = scalePosition(band, r.label), v = val(r.value); return o === 'horizontal' ? { x: v, y: c, x0: zero, y0: c } : { x: c, y: v, x0: c, y0: zero }; };
          const a = keys.index !== null && keys.index !== undefined && rows[keys.index] ? keys.index : null;
          return (
            <g>
              <GridLines scale={val} direction={o === 'horizontal' ? 'vertical' : 'horizontal'} inner={inner} />
              {o === 'horizontal'
                ? <line className="plx-chart__axis-line" x1={zero} x2={zero} y1={0} y2={inner.height} />
                : <line className="plx-chart__axis-line" x1={0} x2={inner.width} y1={zero} y2={zero} />}
              {rows.map((r) => { const p = at(r); return <line key={'s' + r.id} className="plx-lollipop__stem" data-plx-dataviz={mark} x1={p.x0} y1={p.y0} x2={p.x} y2={p.y} />; })}
              {rows.map((r, i) => { const p = at(r); return <circle key={'d' + r.id} className="plx-lollipop__dot" data-plx-dataviz={mark} cx={p.x} cy={p.y} r={RING / 2} />; })}
              {showValues ? rows.map((r) => { const p = at(r); return <DataLabel key={'v' + r.id} x={o === 'horizontal' ? p.x + RING / 2 : p.x} y={o === 'horizontal' ? p.y : p.y - RING / 2} value={fmt(r.value)} position={o === 'horizontal' ? 'end' : 'top'} className="plx-lollipop__value" />; }) : null}
              <Axis scale={band} orient={o === 'horizontal' ? 'left' : 'bottom'} inner={inner} margin={margin} line={false} />
              <Axis scale={val} orient={o === 'horizontal' ? 'bottom' : 'left'} inner={inner} margin={margin} format={format} line={false} />
              {rows.map((r, i) => {
                const s = band(r.label), w = band.step();
                return o === 'horizontal'
                  ? <rect key={'h' + r.id} className="plx-chart-keys__hit" x={0} y={s - (w - band.bandwidth()) / 2} width={inner.width} height={w} onMouseEnter={() => keys.hover(i)} onMouseLeave={() => keys.hover(null)} />
                  : <rect key={'h' + r.id} className="plx-chart-keys__hit" x={s - (w - band.bandwidth()) / 2} y={0} width={w} height={inner.height} onMouseEnter={() => keys.hover(i)} onMouseLeave={() => keys.hover(null)} />;
              })}
              {a !== null ? <circle className="plx-chart-keys__ring" cx={at(rows[a]).x} cy={at(rows[a]).y} r={RING} /> : null}
              {a !== null ? <ChartTooltip x={at(rows[a]).x} y={at(rows[a]).y} inner={inner} title={rows[a].label} items={[{ label: valueTitle || t.value, value: fmt(rows[a].value), color: mark }]} /> : null}
            </g>
          );
        }}
      </ChartFrame>
  );
}
