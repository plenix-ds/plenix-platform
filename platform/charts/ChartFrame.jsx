/* Plenix · ChartFrame
   Summary: The frame every Plenix chart is drawn in (07 Data Display › Charts › Chart foundations): a figure with the
     chart's title and description, a responsive SVG plot that measures itself (a ResizeObserver) and hands its size and
     inner area (the plot less its margins) to the chart, and the data as a table for people who cannot see the chart.
   Usage:
     <ChartFrame title="Uploads per month" description="Uploads rose every month from January to June."
       table={{ columns: [{ title: 'Month', field: 'month', kind: 'name' }, { title: 'Uploads', field: 'n', kind: 'data' }], data: rows }}>
       {({ inner }) => { const x = scaleBand({ domain: months, range: [0, inner.width] }); … return <g>…</g>; }}
     </ChartFrame>
   Props:
     title: the chart's name (required): the caption's title and the SVG's accessible name
     description: one or two sentences that say what the chart shows (its takeaway); the SVG's description
     hideCaption: keeps the title and description for assistive technology only (default false), when a heading beside
       the chart already shows them
     size: the plot's height: "sm" (160px) | "md" (240px, default) | "lg" (320px); the width is the container's
     margin: the room around the plot for axes and labels, in pixels: { top, end, bottom, start } (each optional; the
       defaults are the --plx-comp-chart-margin-* tokens); values snap to the 4px grid; start and end follow the writing
       direction
     table: the data as a table under the chart: { columns, data } as the Table takes them (technical values kind
       "data"); shown behind a Details line ("Show the data") so it is always one click away
     legend: the chart's legend (a ChartLegend), placed by legendPosition (chart parts, wave 8)
     legendPosition: "bottom" (default: under the plot) | "top" (between the caption and the plot: tight dashboard
       cards) | "end" (beside the
       plot, after it; give the legend orientation="vertical"); the plot keeps the rest of the width
     children: a function ({ width, height, inner: { width, height }, margin }) returning the chart's SVG content, drawn
       inside a group already moved by the margins; or SVG nodes
     strings: the words it shows, for other languages: { showData: "Show the data", table: "{title}: data" }
     className: more classes on the figure
   Behavior:
     The plot fills its container's width and follows it when it resizes; the chart is drawn once the size is known.
     The SVG is one image to assistive technology (role img, named by the title and described by the description);
       its marks are hidden from it, so the table carries the values.
     Marks take their colors from the data-viz scales: data-plx-dataviz="<scale>-<step>" on a mark (seriesColor(i))
       and the frame's mark classes (plx-chart__mark, plx-chart__line, plx-chart__point) fill or stroke it with that
       step; axis lines, grid lines and tick labels have their classes too (plx-chart__axis-line, plx-chart__grid-line,
       plx-chart__tick-label: the data font).
   Notes:
     No color, size or font is written in a chart: only SVG geometry (x, y, width, height, d, transform) and classes.
     Chart parts (platform/charts/parts: Axis, GridLines, ChartLegend, ChartTooltip, DataLabel, ReferenceLine,
       ChartAnnotation; wave 8) and the charts themselves (wave 9) build on this frame.
*/
import React from 'react';
import { cx } from '../utils/cx.js';
import { isRtl } from '../utils/direction.js';
import { Details } from '../components/Details/Details.jsx';
import { Table } from '../components/Table/Table.jsx';
import { snapToGrid } from '../utils/grid.js';

const STRINGS = { showData: 'Show the data', table: '{title}: data' };
const MARGIN_TOKENS = { top: '--plx-comp-chart-margin-block-start', end: '--plx-comp-chart-margin-inline-end', bottom: '--plx-comp-chart-margin-block-end', start: '--plx-comp-chart-margin-inline-start' };

export function ChartFrame({ title, description, hideCaption = false, size = 'md', margin, legend, legendPosition = 'bottom', table, strings, className, children }) {
  const t = Object.assign({}, STRINGS, strings);
  const uid = 'plx-chart' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const frame = React.useRef(null), plot = React.useRef(null);
  const [box, setBox] = React.useState({ width: 0, height: 0, rtl: false, tokens: null });
  React.useLayoutEffect(() => {
    const el = plot.current;
    if (!el) return undefined;
    const measure = () => {
      const cs = getComputedStyle(frame.current);
      const tokens = {};
      Object.keys(MARGIN_TOKENS).forEach((k) => { tokens[k] = parseFloat(cs.getPropertyValue(MARGIN_TOKENS[k])) || 0; });
      const r = el.getBoundingClientRect();
      const next = { width: Math.floor(r.width), height: Math.floor(r.height), rtl: isRtl(el), tokens };
      setBox((b) => (b.width === next.width && b.height === next.height && b.rtl === next.rtl && JSON.stringify(b.tokens) === JSON.stringify(tokens) ? b : next));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const m = {};
  Object.keys(MARGIN_TOKENS).forEach((k) => { m[k] = snapToGrid(margin && margin[k] !== undefined ? margin[k] : box.tokens ? box.tokens[k] : 0); });
  const left = box.rtl ? m.end : m.start;
  const inner = { width: Math.max(0, box.width - m.start - m.end), height: Math.max(0, box.height - m.top - m.bottom) };
  const dims = { width: box.width, height: box.height, inner, margin: m };
  const titleId = uid + '-title', descId = uid + '-desc';
  const caption = (
    <figcaption className={cx('plx-chart__caption', hideCaption && 'plx-visually-hidden')}>
      <span id={titleId} className="plx-chart__title">{title}</span>
      {description ? <span id={descId} className="plx-chart__description">{description}</span> : null}
    </figcaption>
  );
  // the legend (chart parts): before the plot, after it, or beside it in a row with it
  const lp = ['top', 'bottom', 'end'].indexOf(legendPosition) >= 0 ? legendPosition : 'bottom';
  const key = legend ? <div className={cx('plx-chart__legend', 'plx-chart__legend--' + lp)}>{legend}</div> : null;
  const plotArea = (
    <div ref={plot} className="plx-chart__plot">
      {box.width > 0 && box.height > 0 ? (
        <svg className="plx-chart__svg" width={box.width} height={box.height} viewBox={'0 0 ' + box.width + ' ' + box.height}
          role="img" aria-labelledby={titleId} aria-describedby={description ? descId : undefined} focusable="false">
          <g transform={'translate(' + left + ',' + m.top + ')'} aria-hidden="true">
            {typeof children === 'function' ? children(dims) : children}
          </g>
        </svg>
      ) : null}
    </div>
  );
  return (
    <figure ref={frame} className={cx('plx-chart', 'plx-chart--' + size, className)}>
      {caption}
      {lp === 'top' ? key : null}
      {lp === 'end' && key ? <div className="plx-chart__body">{plotArea}{key}</div> : plotArea}
      {lp === 'bottom' ? key : null}
      {table && table.data ? (
        <Details summary={t.showData} variant="inline" className="plx-chart__data">
          <Table label={t.table.replace('{title}', title || '')} columns={table.columns} data={table.data} index={table.index} />
        </Details>
      ) : null}
    </figure>
  );
}
