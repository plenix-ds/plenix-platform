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
       from zero); the latest dot sits inside the box.
     It is one image to assistive technology, named by label and a summary of the trend ("Up 40% from 40 to 56; lowest 39,
       highest 56."); decorative removes it from the reading order instead.
   Notes:
     No axes, grid lines or legend: a sparkline gives the shape; the number beside it gives the value. Use the same time
       range for every sparkline of a set. Its color is a data-viz step (data-plx-dataviz); sizes, the line and the dot are
       --plx-comp-sparkline-* tokens. It keeps no "Show the data" table: it stands next to the number it describes, and its
       name says the trend; link to the full chart (with its table) when there is one.
*/
import React from 'react';
import { cx } from '../utils/cx.js';
import { scaleLinear, scaleBand } from './scales.js';
import { summarizeSeries } from './a11y.js';

// the room kept inside the box so the line and the dot are not cut (SVG geometry, the 4px grid)
const PAD = 4;
const VARIANTS = ['line', 'area', 'bar'];

export function Sparkline({ values = [], variant = 'line', size = 'inline', showLast = false, color, label, labels, format, decorative = false, strings, className, ...rest }) {
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
  let marks = null;
  if (box.width > 0 && box.height > 0 && nums.length) {
    const lo = Math.min.apply(null, nums), hi = Math.max.apply(null, nums);
    const W = box.width, H = box.height;
    if (v === 'bar') {
      const x = scaleBand({ domain: nums.map((n, i) => i), range: [0, W], paddingInner: 0.2, paddingOuter: 0 });
      const y = scaleLinear({ domain: [Math.min(0, lo), Math.max(0, hi)], range: [H, 0] });
      marks = nums.map((n, i) => {
        const top = Math.min(y(n), y(0)), bottom = Math.max(y(n), y(0));
        return <rect key={i} className="plx-sparkline__bar" x={x(i)} y={top} width={x.bandwidth()} height={Math.max(0, bottom - top)} />;
      });
    } else {
      const x = scaleLinear({ domain: [0, Math.max(1, nums.length - 1)], range: [PAD, W - PAD] });
      const y = scaleLinear({ domain: [lo, hi], range: [H - PAD, PAD] });
      const line = nums.map((n, i) => (i ? 'L' : 'M') + x(i) + ',' + y(n)).join('');
      const last = nums.length - 1;
      marks = [
        v === 'area' ? <path key="area" className="plx-sparkline__area" d={line + 'L' + x(last) + ',' + (H - PAD) + 'L' + x(0) + ',' + (H - PAD) + 'Z'} /> : null,
        <path key="line" className="plx-sparkline__line" d={line} />,
        showLast ? <circle key="last" className="plx-sparkline__last" cx={x(last)} cy={y(nums[last])} r={PAD} /> : null,
      ];
    }
  }
  return (
    <span ref={ref} className={cx('plx-sparkline', 'plx-sparkline--' + v, 'plx-sparkline--' + s, className)} data-plx-dataviz={color || undefined} {...a11y} {...rest}>
      {box.width > 0 && box.height > 0 ? (
        <svg className="plx-sparkline__svg" width={box.width} height={box.height} viewBox={'0 0 ' + box.width + ' ' + box.height} focusable="false" aria-hidden="true">{marks}</svg>
      ) : null}
    </span>
  );
}
