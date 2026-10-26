/* Plenix · Sparkline
   Summary: A word-sized chart without axes that shows the shape of a trend (07 Data Display › Charts › Sparkline): a line,
     a filled area or small bars, with an optional dot on the latest value, next to the number it describes: in a metric
     card, a table cell or a sentence.
   Usage:
     <Sparkline values={[40, 42, 39, 47, 51, 49, 56]} label="Downloads, last 7 days" />
     <Sparkline values={weekly} variant="area" size="fill" showLast label="Storage used, 12 weeks" format={(v) => v + ' GB'} />
     <Sparkline values={daily} variant="bar" color="categorical-2" decorative />   // the text beside it says the trend
   Props:
     values: the numbers, oldest first (required)
     variant: "line" (default) | "area" (the line with a light fill under it) | "bar" (one small column per value, from zero)
     size: "inline" (default: a word-sized 96 × 24, in a sentence or a table cell) | "fill" (the container's width, 32 tall:
       a metric card)
     showLast: a dot on the latest value (default false; line and area: on bars the latest is the last column)
     color: the data-viz step of its color ("categorical-1" by default, seriesColor(i) for a series' own)
     label: what it shows ("Downloads, last 7 days"); with the summary it is the accessible name
     labels: the values' labels (dates, months), for the summary's lowest and highest
     format: (value) => text for the summary (default formatNumber)
     decorative: hides it from assistive technology when the text beside it already says the trend (default false)
     strings: the summary's words, for other languages (summarizeSeries strings)
     className: more classes on the sparkline
   Behavior:
     It measures its own box and draws the values across it: the lowest value at the bottom, the highest at the top (bars
       from zero); the latest dot sits inside the box. Apache ECharts draws it (a line or bar chart with no axes, #353),
       once the chart engine has loaded (the first chart on a page loads it).
     It is one image to assistive technology, named by label and a summary of the trend ("Up 40% from 40 to 56; lowest 39,
       highest 56."); decorative removes it from the reading order instead.
   Notes:
     No axes, grid lines or legend: a sparkline gives the shape; the number beside it gives the value. Use the same time
       range for every sparkline of a set. Its color is a data-viz step (data-plx-dataviz); sizes, the line and the dot are
       --plx-comp-sparkline-* tokens, read by the ECharts theme (echarts/engine.js); no style is written here. It keeps no "Show the data" table: it stands next to the number it describes, and its
       name says the trend; link to the full chart (with its table) when there is one.
*/
import React from 'react';
import { cx } from '../utils/cx.js';
import { summarizeSeries } from './a11y.js';
import { EChartsHost } from './echarts/EChartsPlot.jsx';

// the room kept inside the box so the line and the dot are not cut (geometry, the 4px grid)
const PAD = 4;
const VARIANTS = ['line', 'area', 'bar'];
// the gap between bars, a share of each bar's band (geometry: the old scaleBand's padding)
const BAR_GAP = '20%';
const NONE = Object.freeze([]);

export function Sparkline({ values = NONE, variant = 'line', size = 'inline', showLast = false, color, label, labels, format, decorative = false, strings, className, ...rest }) {
  const ref = React.useRef(null);
  const [box, setBox] = React.useState({ width: 0, height: 0 });
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const next = { width: Math.floor(r.width), height: Math.floor(r.height) };
      setBox((b) => (b.width === next.width && b.height === next.height ? b : next));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const v = VARIANTS.indexOf(variant) >= 0 ? variant : 'line';
  const s = size === 'fill' ? 'fill' : 'inline';
  const nums = values.map(Number).filter((x) => isFinite(x));
  const name = [label, nums.length ? summarizeSeries(values, { labels, format, strings }) : null].filter(Boolean).join(': ');
  const a11y = decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': name };
  const key = nums.join(',');
  // a line or bar chart with no axes: the lowest value at the bottom, the highest at the top (bars from zero)
  const option = React.useCallback((tk) => {
    const k = tk.sparkline, last = nums.length - 1, bar = v === 'bar';
    const lo = Math.min.apply(null, nums), hi = Math.max.apply(null, nums);
    return {
      animationDuration: tk.motion, animationDurationUpdate: tk.motion,
      grid: bar ? { left: 0, right: 0, top: 0, bottom: 0 } : { left: PAD, right: PAD, top: PAD, bottom: PAD },
      xAxis: { type: 'category', show: false, boundaryGap: bar, data: nums.map((n, i) => i) },
      yAxis: bar ? { type: 'value', show: false, min: Math.min(0, lo), max: Math.max(0, hi) } : { type: 'value', show: false, min: lo, max: hi === lo ? lo + 1 : hi },
      series: [bar
        ? { type: 'bar', silent: true, barCategoryGap: BAR_GAP, itemStyle: { color: k.bar }, data: nums }
        : { type: 'line', silent: true, emphasis: { disabled: true }, lineStyle: { color: k.color, width: k.lineWidth, cap: 'round', join: 'round' },
          areaStyle: v === 'area' ? { color: k.color, opacity: k.areaOpacity, origin: 'start' } : undefined,
          data: nums.map((n, i) => (showLast && i === last
            ? { value: n, symbol: 'circle', symbolSize: k.last.r * 2, itemStyle: { color: k.color, borderColor: k.last.outline, borderWidth: k.last.outlineWidth } }
            : { value: n, symbol: 'none' })) }],
    };
  }, [key, v, showLast]);
  return (
    <span ref={ref} className={cx('plx-sparkline', 'plx-sparkline--' + v, 'plx-sparkline--' + s, className)} data-plx-dataviz={color || undefined} {...a11y} {...rest}>
      {box.width > 0 && box.height > 0 && nums.length ? (
        <EChartsHost width={box.width} height={box.height} option={option} className="plx-sparkline__engine" />
      ) : null}
    </span>
  );
}
