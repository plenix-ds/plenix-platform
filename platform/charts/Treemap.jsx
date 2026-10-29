/* Plenix · Treemap
   Summary: The parts of a whole as rectangles whose areas are their sizes (07 Data Display › Charts › Treemap): many parts
     in little room, flat (one level) or nested (parts in their groups, each group framed and named). Laid out by the
     squarified algorithm, largest first from the top start corner.
   Usage:
     <Treemap title="Storage by folder" description="Video takes over half of the 412 GB." valueTitle="Size (GB)"
       data={[{ label: 'Video', value: 220 }, { label: 'Photos', value: 96 }, …]} />
     <Treemap title="Storage by team and folder" data={[{ label: 'Design', children: [{ label: 'Video', value: 120 }, …] }, …]} />
   Props:
     title: the chart's name (required); description: its takeaway
     data: the parts: [{ label, value }] (flat), or the groups [{ label, children: [{ label, value }] }] (nested) (required)
     variant: "flat" | "nested" (default: nested when the data has groups)
     color: the data-viz step of a flat treemap's tiles ("categorical-1" by default); nested groups take the categorical
       colors by their order
     format: (value) => text (default formatNumber)
     valueTitle: what the size measures, with its unit: the table's column and the tooltip's name
     size: the plot's height, as ChartFrame ("sm" | "md" | "lg" default)
     strings: the words it says: { group: "Group", item: "Part", value: "Value", share: "Share", hint } (hint: the chart interaction's)
     className: more classes on the figure
   Behavior:
     Each tile's area is its share of the whole; tiles are ordered largest to smallest. A tile shows its name, and its value
       under it, only when they fit (the tooltip and the table always have both); names are clipped to their tile.
     Nested: each group is framed and named above its tiles; its tiles take the group's color.
     Keyboard: one Tab stop; the arrow keys move through the tiles (by group, largest first), each spoken with its value and
       share; the pointer over a tile does the same. The active tile gets a ring and the tooltip.
     The frame's "Show the data" table lists every part with its value and share.
   Notes:
     Built on ChartFrame, ChartTooltip and the chart-a11y helpers. Tiles are separated by gaps in the surface color; tile
       names and values sit on a halo in the surface color (like centered data labels), so they read on any data color.
     For precise comparison use a bar chart; for two to five parts a donut or bars.
*/
import React from 'react';
import { cx } from '../utils/cx.js';
import { formatNumber, formatPercent } from '../utils/format.js';
import { ChartFrame } from './ChartFrame.jsx';
import { seriesColor } from './scales.js';
import { ChartTooltip } from './parts/ChartTooltip.jsx';
import { useChartPoints } from './a11y.js';
import { useStrings } from '../providers/LocaleProvider.jsx';

// SVG geometry on the 4px grid: a group's name row and inset, the label's inset in a tile, the smallest tile that shows a
// name (and a value), the ring's room
const GROUP_HEAD = 20, GROUP_PAD = 4, LABEL_PAD = 4, NAME_W = 40, NAME_H = 20, VALUE_H = 36, RING = 0;

// the squarified layout of values (sorted largest first) in a rectangle: [{ x, y, width, height }] in the values' order
function squarify(values, x, y, width, height) {
  const out = [];
  const total = values.reduce((a, b) => a + b, 0);
  if (!total || width <= 0 || height <= 0) return values.map(() => ({ x, y, width: 0, height: 0 }));
  const k = (width * height) / total;
  const areas = values.map((v) => v * k);
  let rx = x, ry = y, rw = width, rh = height, i = 0;
  const worst = (row, side) => {
    const s = row.reduce((a, b) => a + b, 0), mx = Math.max.apply(null, row), mn = Math.min.apply(null, row);
    return Math.max((side * side * mx) / (s * s), (s * s) / (side * side * mn));
  };
  while (i < areas.length) {
    const side = Math.min(rw, rh);
    const row = [areas[i]];
    let j = i + 1;
    while (j < areas.length && worst(row.concat([areas[j]]), side) <= worst(row, side)) { row.push(areas[j]); j++; }
    const s = row.reduce((a, b) => a + b, 0);
    if (rw >= rh) {   // a column along the start side
      const w = s / rh;
      let yy = ry;
      row.forEach((a) => { const hh = a / w; out.push({ x: rx, y: yy, width: w, height: hh }); yy += hh; });
      rx += w; rw -= w;
    } else {          // a row along the top
      const hh = s / rw;
      let xx = rx;
      row.forEach((a) => { const w = a / hh; out.push({ x: xx, y: ry, width: w, height: hh }); xx += w; });
      ry += hh; rh -= hh;
    }
    i = j;
  }
  return out;
}

export function Treemap({ title, description, data = [], variant, color, format, valueTitle, size = 'lg', strings, className }) {
  const t = useStrings('chart.treemap', strings);
  const nested = variant ? variant === 'nested' : data.some((d) => Array.isArray(d.children));
  const v = nested ? 'nested' : 'flat';
  const uid = 'plx-treemap' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  // the groups (one unnamed group when flat), each with its parts largest first
  const groups = (nested ? data : [{ label: '', children: data }]).map((g, gi) => {
    const parts = (g.children || []).map((c) => ({ label: String(c.label), value: Math.max(0, Number(c.value) || 0) })).filter((c) => c.value > 0).sort((a, b) => b.value - a.value);
    return { label: String(g.label || ''), color: nested ? seriesColor(gi) : color || seriesColor(0), parts, value: parts.reduce((a, c) => a + c.value, 0) };
  }).filter((g) => g.value > 0).sort((a, b) => b.value - a.value);
  const total = groups.reduce((a, g) => a + g.value, 0);
  const tiles = [];
  groups.forEach((g) => g.parts.forEach((p) => tiles.push(Object.assign({ group: g, share: total ? p.value / total : 0 }, p))));
  const fmt = (n) => (typeof format === 'function' ? format(n) : formatNumber(n));
  const pct = (n) => formatPercent(n, { decimals: n < 0.1 ? 1 : 0 });
  const keys = useChartPoints({ count: tiles.length, describe: (i) => (nested ? tiles[i].group.label + ', ' : '') + tiles[i].label + ': ' + fmt(tiles[i].value) + ', ' + pct(tiles[i].share) });
  const table = { columns: [].concat(nested ? [{ title: t.group, field: 'group', kind: 'name' }] : [], [{ title: t.item, field: 'label', kind: 'name', rowLabel: true },
    { title: valueTitle || t.value, field: 'shown', kind: 'data', align: 'right' }, { title: t.share, field: 'share', kind: 'data', align: 'right' }]),
    data: tiles.map((p, i) => ({ id: i + 1, group: p.group.label, label: p.label, shown: fmt(p.value), share: pct(p.share) })) };
  return (
      <ChartFrame interaction={keys.interaction} title={title} description={description} size={size} table={table} margin={{ top: 0, end: 0, bottom: 0, start: 0 }} className={cx('plx-treemap', 'plx-treemap--' + v, className)}>
        {({ inner }) => {
          // groups first, then the parts inside each group's box (under its name row when nested)
          const boxes = squarify(groups.map((g) => g.value), 0, 0, inner.width, inner.height);
          let n = 0;
          const laid = [];
          groups.forEach((g, gi) => {
            const b = boxes[gi];
            const inside = nested ? { x: b.x + GROUP_PAD, y: b.y + GROUP_HEAD, width: Math.max(0, b.width - 2 * GROUP_PAD), height: Math.max(0, b.height - GROUP_HEAD - GROUP_PAD) } : b;
            squarify(g.parts.map((p) => p.value), inside.x, inside.y, inside.width, inside.height).forEach((r, pi) => { laid.push({ tile: tiles[n], rect: r, index: n }); n++; });
          });
          const a = keys.index !== null && keys.index !== undefined && laid[keys.index] ? laid[keys.index] : null;
          return (
            <g>
              {nested ? groups.map((g, gi) => (
                <g key={'g' + gi} className="plx-treemap__group">
                  <rect className="plx-treemap__group-frame" x={boxes[gi].x} y={boxes[gi].y} width={boxes[gi].width} height={boxes[gi].height} />
                  {boxes[gi].width >= NAME_W ? <text className="plx-treemap__group-label" x={boxes[gi].x + LABEL_PAD} y={boxes[gi].y + GROUP_HEAD / 2} clipPath={'url(#' + uid + '-g' + gi + ')'}>{g.label}</text> : null}
                  <clipPath id={uid + '-g' + gi}><rect x={boxes[gi].x} y={boxes[gi].y} width={Math.max(0, boxes[gi].width - LABEL_PAD)} height={GROUP_HEAD} /></clipPath>
                </g>
              )) : null}
              {laid.map(({ tile, rect, index }) => {
                const showName = rect.width >= NAME_W && rect.height >= NAME_H, showValue = rect.width >= NAME_W && rect.height >= VALUE_H;
                return (
                  <g key={index} className="plx-treemap__cell" onMouseEnter={() => keys.hover(index)} onMouseLeave={() => keys.hover(null)}>
                    <rect className="plx-chart__mark plx-treemap__tile" data-plx-dataviz={tile.group.color} x={rect.x} y={rect.y} width={rect.width} height={rect.height} />
                    {showName ? <clipPath id={uid + '-t' + index}><rect x={rect.x} y={rect.y} width={Math.max(0, rect.width - LABEL_PAD)} height={rect.height} /></clipPath> : null}
                    {showName ? <text className="plx-treemap__label" x={rect.x + LABEL_PAD} y={rect.y + LABEL_PAD} clipPath={'url(#' + uid + '-t' + index + ')'}>{tile.label}</text> : null}
                    {showValue ? <text className="plx-treemap__value" x={rect.x + LABEL_PAD} y={rect.y + NAME_H} clipPath={'url(#' + uid + '-t' + index + ')'}>{fmt(tile.value)}</text> : null}
                  </g>
                );
              })}
              {a ? <rect className="plx-chart-keys__ring" x={a.rect.x + RING} y={a.rect.y + RING} width={Math.max(0, a.rect.width - 2 * RING)} height={Math.max(0, a.rect.height - 2 * RING)} /> : null}
              {a ? <ChartTooltip x={a.rect.x + a.rect.width / 2} y={a.rect.y + a.rect.height / 2} inner={inner} title={(nested ? a.tile.group.label + ' · ' : '') + a.tile.label}
                items={[{ label: valueTitle || t.value, value: fmt(a.tile.value), color: a.tile.group.color }, { label: t.share, value: pct(a.tile.share) }]} /> : null}
            </g>
          );
        }}
      </ChartFrame>
  );
}
