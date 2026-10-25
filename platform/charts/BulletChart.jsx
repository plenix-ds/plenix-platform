/* Plenix · BulletChart
   Summary: Key measures against their targets (07 Data Display › Charts › Bullet chart): for each measure a short value
     bar over bands that mark its qualitative ranges (poor, fair, good, in three neutral shades) and a line across at its
     target, on one value axis from zero; horizontal (rows) or vertical (columns). Takes far less room than a gauge, so a
     dashboard can stack several. Drawn in ChartFrame with a tooltip and the data grid.
   Usage:
     <BulletChart title="Quarter against targets" description="Uploads and reviews are on target; approvals are behind."
       items={[{ id: 'up', label: 'Uploads', value: 820, target: 750, ranges: [400, 700, 1000] },
               { id: 'rv', label: 'Reviews', value: 610, target: 600, ranges: [300, 550, 1000] }]} valueLabel="Count" />
   Props:
     title: the chart's name (required); description: its takeaway (ChartFrame)
     items: the measures: [{ id, label, value, target, ranges }]; ranges are the upper ends of up to three bands, lowest
       first (poor, fair, good); target is optional
     orientation: "horizontal" (default: one row per measure, names on the start side) | "vertical" (one column per
       measure, names along the bottom)
     max: the value axis's end (default the largest range, value or target, on a round number)
     valueLabel: the value axis's title (the measure's unit); format: (value) => text (ticks, tooltip, table)
     tooltip: shows the measure's value, target and ranges under the pointer (default true)
     size, margin, hideCaption, className, legend, legendPosition: ChartFrame's
     strings: { measure: "Measure", value: "Value", target: "Target", ranges: "Ranges", poor: "Poor", fair: "Fair",
       good: "Good" } and ChartFrame's strings
   Behavior:
     Every measure shares one value axis from zero: give measures of different units their own chart.
     Hover a measure: the tooltip lists its value, its target and the range it is in. The data grid lists them all.
   Notes:
     The value bar is the frame's mark (the first categorical color); the ranges are three neutral surface and border
       shades and the target the default content color (bullet-chart tokens): color is not the only cue, the target is
       a line across and the ranges are named in the tooltip and the table.
*/
import React from 'react';
import { cx } from '../utils/cx.js';
import { formatNumber } from '../utils/format.js';
import { ChartFrame } from './ChartFrame.jsx';
import { scaleBand, scaleLinear, niceTicks } from './scales.js';
import { Axis } from './parts/Axis.jsx';
import { ChartTooltip } from './parts/ChartTooltip.jsx';
import { useChartHover, labelRoom, halfRoom, finite, AXIS_TITLE_ROOM } from './chart-kit.js';

const STRINGS = { measure: 'Measure', value: 'Value', target: 'Target', ranges: 'Ranges', poor: 'Poor', fair: 'Fair', good: 'Good' };
const BAR = 1 / 3;      // the value bar's thickness, a share of the band
const TARGET = 2 / 3;   // the target line's length, a share of the band

export function BulletChart({ title, description, hideCaption, size, items = [], orientation = 'horizontal', max, valueLabel, format, tooltip = true,
  legend, legendPosition, margin, strings, className }) {
  const t = Object.assign({}, STRINGS, strings);
  const o = orientation === 'vertical' ? 'vertical' : 'horizontal';
  const across = o === 'horizontal';
  const fmt = (v) => (typeof format === 'function' ? format(v) : formatNumber(v));
  const [active, hover] = useChartHover();
  const list = items.map((it, i) => Object.assign({}, it, { id: it.id === undefined ? String(i) : it.id, ranges: (it.ranges || []).slice(0, 3).map(finite) }));
  const top = max !== undefined ? Number(max) : list.reduce((a, it) => Math.max(a, finite(it.value), finite(it.target), Math.max.apply(null, [0].concat(it.ranges))), 0) || 1;
  const names = [t.poor, t.fair, t.good];
  const rangeOf = (it) => { const v = finite(it.value); for (let i = 0; i < it.ranges.length; i++) if (v <= it.ranges[i]) return names[i + (3 - it.ranges.length)]; return names[2]; };
  const tickTexts = niceTicks(0, top, 5).ticks.map(fmt);
  const auto = across
    ? { start: labelRoom(list.map((it) => it.label)), bottom: valueLabel ? 24 + AXIS_TITLE_ROOM : undefined, end: halfRoom(tickTexts[tickTexts.length - 1]) }
    : { start: labelRoom(tickTexts, valueLabel ? AXIS_TITLE_ROOM : 0) };
  const m = Object.assign({}, auto, margin);
  Object.keys(m).forEach((k) => { if (m[k] === undefined) delete m[k]; });
  const table = {
    columns: [{ title: t.measure, field: 'measure', kind: 'name', rowLabel: true }, { title: t.value, field: 'value', kind: 'data', align: 'right' },
      { title: t.target, field: 'target', kind: 'data', align: 'right' }, { title: t.ranges, field: 'ranges', kind: 'data' }],
    data: list.map((it, i) => ({ id: i + 1, measure: it.label, value: fmt(finite(it.value)), target: it.target === undefined || it.target === null ? '' : fmt(it.target),
      ranges: it.ranges.map(fmt).join(' · ') + (it.ranges.length ? ' (' + rangeOf(it) + ')' : '') }))
  };
  return (
    <ChartFrame title={title} description={description} hideCaption={hideCaption} size={size} margin={m} legend={legend} legendPosition={legendPosition}
      table={table} strings={strings} className={cx('plx-bullet-chart', 'plx-bullet-chart--' + o, className)}>
      {({ inner, margin: fm }) => {
        const L = across ? inner.height : inner.width, V = across ? inner.width : inner.height;
        const band = scaleBand({ domain: list.map((it) => it.id), range: [0, L], paddingInner: 0.4, paddingOuter: 0.2 });
        const vs = scaleLinear({ domain: [0, top], range: across ? [0, V] : [V, 0], nice: max === undefined });
        const span = (start, thick, a, b) => {
          const p0 = vs(a), p1 = vs(b), low = Math.min(p0, p1), len = Math.abs(p1 - p0);
          return across ? { x: low, y: start, width: len, height: thick } : { x: start, y: low, width: thick, height: len };
        };
        let tip = null;
        if (tooltip && active !== null) {
          const it = list.filter((x) => x.id === active)[0];
          if (it) {
            const mid = band(it.id) + band.bandwidth() / 2, end = vs(finite(it.value));
            const shown = fmt(finite(it.value)) + (it.target === undefined || it.target === null ? '' : ' · ' + t.target + ' ' + fmt(it.target));
            tip = <ChartTooltip x={across ? end : mid} y={across ? mid : end} inner={inner} title={it.label + (it.ranges.length ? ' · ' + rangeOf(it) : '')}
              items={[{ label: t.value, value: shown, color: 'categorical-1' }]} />;
          }
        }
        return (
          <g>
            {list.map((it) => {
              const start = band(it.id), thick = band.bandwidth();
              const n = it.ranges.length;
              const bar = thick * BAR, tl = thick * TARGET;
              const tp = it.target === undefined || it.target === null ? null : vs(finite(it.target));
              return (
                <g key={it.id} className="plx-bullet-chart__item" {...(tooltip ? hover(it.id) : {})}>
                  {it.ranges.map((r, i) => i).reverse().map((i) => (
                    <rect key={'r' + i} className={cx('plx-bullet-chart__range', 'plx-bullet-chart__range--' + (i + 1 + (3 - n)))} {...span(start, thick, 0, it.ranges[i])} />
                  ))}
                  <rect className="plx-chart__mark plx-bullet-chart__value" {...span(start + (thick - bar) / 2, bar, 0, finite(it.value))} />
                  {tp === null ? null : across
                    ? <line className="plx-bullet-chart__target" x1={tp} x2={tp} y1={start + (thick - tl) / 2} y2={start + (thick + tl) / 2} />
                    : <line className="plx-bullet-chart__target" x1={start + (thick - tl) / 2} x2={start + (thick + tl) / 2} y1={tp} y2={tp} />}
                </g>
              );
            })}
            <Axis scale={vs} orient={across ? 'bottom' : 'left'} inner={inner} margin={fm} format={fmt} label={valueLabel} line={across} />
            <Axis scale={band} orient={across ? 'left' : 'bottom'} inner={inner} margin={fm} line={false} format={(id) => (list.filter((x) => x.id === id)[0] || {}).label} />
            {tip}
          </g>
        );
      }}
    </ChartFrame>
  );
}
