/* Plenix · WordCloud
   Summary: A word cloud (07 Data Display › Charts › Word cloud): the main terms of a body of text, each sized by how
     often it appears (five steps of the type scale) and placed around the middle, the largest first: on a round spiral
     (spiral) or a square one (rectangular). Words stay horizontal; groups (a topic, a sentiment) take the categorical
     data-viz colors with a legend. A first impression only: the table under it lists every term and its count, sorted.
   Usage:
     <WordCloud title="What people asked for" description="Search and sharing lead the feedback." words={[{ text: 'search',
       value: 48 }, { text: 'sharing', value: 41 }, …]} valueLabel="Mentions" onSelect={({ word }) => filterBy(word.text)} />
     <WordCloud … layout="rectangular" groups={[{ id: 'praise', label: 'Praise' }, { id: 'issue', label: 'Issues' }]} />
   Props:
     title, description: the chart's name and its takeaway (ChartFrame) (title required)
     words: the terms: [{ text, value, group }]; group is the id of one of groups
     layout: "spiral" (default: round, the largest word in the middle) | "rectangular" (a square spiral: a boxier cloud
       that fills a wide plot)
     groups: [{ id, label }]: the groups words belong to, in the legend's order (their colors follow it)
     max: the most words drawn (default 50, the largest); the table keeps them all
     valueLabel: what a value is ("Mentions") (default strings.value); format: (value) => text (default formatNumber)
     size, margin: as ChartFrame
     interactive: keyboard, pointer, tooltip and live region (default true); onSelect({ c, word }): a click or Enter on a
       word (filter a list by it)
     strings: { value: "Count", word: "Term", group: "Group" }
     className: more classes on the figure
   Behavior:
     The words are placed by Apache ECharts' word-cloud extension (echarts-wordcloud, #353) in their own type, without
       overlapping, the largest first; a word that does not fit in the plot is left out of the picture (it stays in the
       table). The engine and the extension load the first time a word cloud mounts.
     One Tab stop: ← → ↑ ↓ move to the nearest word in that direction, Home and End to the largest and the smallest; each
       says "<word>: <count>" in the live region and shows it in the tooltip; the other words step back (dim).
   Notes:
     Sizes are the --plx-comp-word-cloud-size-1 … 5 tokens (the type scale), read by the ECharts theme (echarts/engine.js);
       words without a group take the content color, grouped words the categorical data-viz colors. No style is written
       here. wordCloudLayout (Plenix's own placing) stays exported for code that places words itself. Never use it to compare values exactly: a sorted bar chart.
*/
import React from 'react';
import { cx } from '../utils/cx.js';
import { formatNumber } from '../utils/format.js';
import { ChartFrame } from './ChartFrame.jsx';
import { seriesColor } from './scales.js';
import { ChartLegend } from './parts/ChartLegend.jsx';
import { ChartTooltip, chartTooltipText } from './parts/ChartTooltip.jsx';
import { useChartInteraction } from './interaction.js';
import { useEChartsPlot, NO_MARGIN } from './echarts/EChartsPlot.jsx';
import { loadEChartsWordCloud } from './echarts/engine.js';
import { snapToGrid } from '../utils/grid.js';

const STRINGS = { value: 'Count', word: 'Term', group: 'Group' };
const STEPS = 5;
// the space kept around each word while placing, and the spiral's step (SVG geometry, pixels)
const PAD = 4, STEP = 4;

// where each word goes: centers of non-overlapping boxes around the middle, the largest first; null when it does not fit
export function wordCloudLayout(boxes, width, height, layout = 'spiral') {
  const placed = [], out = [];
  const hit = (b) => placed.some((p) => b.x0 < p.x1 && b.x1 > p.x0 && b.y0 < p.y1 && b.y1 > p.y0);
  const ratio = width / Math.max(1, height);
  // the candidate offsets from the middle, nearest first: an Archimedean spiral, or the rings of a square spiral; both
  // stretched to the plot's shape
  const reach = Math.max(width / ratio, height) / 2 + STEP * 2;
  const candidates = [];
  if (layout === 'rectangular') {
    candidates.push([0, 0]);
    for (let r = STEP; r <= reach; r += STEP) {
      for (let a = -r; a < r; a += STEP) candidates.push([a, -r]);
      for (let a = -r; a < r; a += STEP) candidates.push([r, a]);
      for (let a = r; a > -r; a -= STEP) candidates.push([a, r]);
      for (let a = r; a > -r; a -= STEP) candidates.push([-r, a]);
    }
  } else {
    for (let i = 0, d = 0; d <= reach; i++) { const th = i * 0.1; d = (STEP * th) / (2 * Math.PI) * 2; candidates.push([d * Math.cos(th), d * Math.sin(th)]); }
  }
  boxes.forEach((s) => {
    const w = s.width + PAD, h = s.height + PAD;
    let spot = null;
    for (let i = 0; i < candidates.length && !spot; i++) {
      const cx0 = width / 2 + candidates[i][0] * ratio, cy0 = height / 2 + candidates[i][1];
      const b = { x0: cx0 - w / 2, x1: cx0 + w / 2, y0: cy0 - h / 2, y1: cy0 + h / 2 };
      if (b.x0 < 0 || b.y0 < 0 || b.x1 > width || b.y1 > height) continue;
      if (!hit(b)) spot = b;
    }
    if (spot) { placed.push(spot); out.push({ x: (spot.x0 + spot.x1) / 2, y: (spot.y0 + spot.y1) / 2 }); } else out.push(null);
  });
  return out;
}

// px: the room kept around the cloud (on the 4px grid)
const ROOM = { top: 8, end: 8, bottom: 8, start: 8 };
const NONE = Object.freeze([]);
const wordCloudReady = (w) => !!(w.PlenixECharts && w.PlenixECharts.wordCloudReady);
// frames the word count must hold still before the places are read (the extension places a word at a time)
const SETTLE = 4;

export function WordCloud({ title, description, words = NONE, layout = 'spiral', groups, max = 50, valueLabel, format, size = 'md', margin, interactive = true, onSelect,
  strings, frameStrings, interactionStrings, className }) {
  const t = Object.assign({}, STRINGS, strings);
  const fmt = typeof format === 'function' ? format : (v) => formatNumber(v);
  const vLabel = valueLabel || t.value;
  const sorted = words.filter((w) => w && w.text).slice().sort((a, b) => b.value - a.value);
  const shown = sorted.slice(0, Math.max(0, max));
  const vals = shown.map((w) => w.value);
  const lo = vals.length ? Math.min.apply(null, vals) : 0, hi = vals.length ? Math.max.apply(null, vals) : 1;
  // the size step: the square root of the value's place in the range, so the largest words do not crowd the rest
  const stepOf = (v) => (hi === lo ? 3 : Math.min(STEPS, 1 + Math.floor(Math.sqrt((v - lo) / (hi - lo)) * STEPS)));
  const gIndex = (g) => (groups || []).findIndex((x) => x.id === g);
  const colorOf = (w) => (w.group !== undefined && gIndex(w.group) >= 0 ? seriesColor(gIndex(w.group)) : undefined);
  // where each word was placed (its box in plot pixels), once the extension has placed them; null when left out
  const where = React.useRef([]);
  const [placed, setPlaced] = React.useState(0);

  const ia = useChartInteraction({
    rows: 1, columns: shown.length, mode: 'point', select: typeof onSelect === 'function', strings: interactionStrings,
    onSelect: (cell) => onSelect && onSelect(Object.assign({ word: shown[cell.c] }, cell)),
    describe: (cell) => chartTooltipText({ title: shown[cell.c].text, items: [{ label: vLabel, value: fmt(shown[cell.c].value) }] }),
    // the nearest placed word in the arrow's direction; Home the largest, End the smallest
    move: (a, k) => {
      const at = where.current;
      if (k === 'Home' || k === 'End') { const idx = at.map((p, i) => (p ? i : -1)).filter((i) => i >= 0); return idx.length ? { r: 0, c: k === 'Home' ? idx[0] : idx[idx.length - 1] } : a; }
      const p = at[a.c]; if (!p) return a;
      const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[k];
      let best = null, bd = Infinity;
      at.forEach((q, i) => {
        if (!q || i === a.c) return;
        const dx = q.x - p.x, dy = q.y - p.y, along = dx * d[0] + dy * d[1];
        if (along <= 0) return;
        const dist = along + 2 * Math.abs(dx * d[1] + dy * d[0]);
        if (dist < bd) { bd = dist; best = i; }
      });
      return best === null ? a : { r: 0, c: best };
    },
    first: () => { const i = where.current.findIndex((p) => !!p); return i >= 0 ? { r: 0, c: i } : null; },
  });

  const table = {
    columns: [{ title: t.word, field: 'w', kind: 'name', rowLabel: true }].concat(groups ? [{ title: t.group, field: 'g', kind: 'name' }] : [], [{ title: vLabel, field: 'v', kind: 'data', align: 'right' }]),
    data: sorted.map((w, i) => ({ id: i + 1, w: w.text, g: groups && gIndex(w.group) >= 0 ? groups[gIndex(w.group)].label : '', v: fmt(w.value) })),
  };
  const legendNode = groups && groups.length ? <ChartLegend items={groups.map((g, i) => ({ id: g.id, label: g.label, color: seriesColor(i) }))} /> : null;

  // the drawing: the extension's word-cloud series, horizontal words in five token sizes, the largest first
  const plot = useEChartsPlot({ load: loadEChartsWordCloud, ready: wordCloudReady });
  const m = {};
  Object.keys(ROOM).forEach((k) => { m[k] = snapToGrid(margin && margin[k] !== undefined ? margin[k] : ROOM[k]); });
  const key = shown.map((w) => w.text + ':' + w.value + ':' + (colorOf(w) || '')).join('|');
  const option = React.useCallback((tk, dims) => {
    const wc = tk.wordCloud;
    return {
      series: [{
        type: 'wordCloud', silent: true, shape: layout === 'rectangular' ? 'square' : 'circle',
        left: m.start, top: m.top, width: Math.max(0, dims.width - m.start - m.end), height: Math.max(0, dims.height - m.top - m.bottom),
        rotationRange: [0, 0], gridSize: tk.tickOffset + PAD, drawOutOfBound: false, shrinkToFit: false, layoutAnimation: tk.motion > 0,
        // the extension measures every word in the series' weight: the boldest step's, so bold words never touch
        textStyle: { fontFamily: wc.fontFamily, fontWeight: wc.weights[STEPS - 1] },
        emphasis: { focus: 'self' }, blur: { textStyle: { opacity: tk.dim } },
        data: shown.map((w) => {
          const step = stepOf(w.value);
          return { name: w.text, value: w.value, textStyle: { fontSize: wc.sizes[step - 1], fontWeight: wc.weights[step - 1], color: colorOf(w) ? tk.color(colorOf(w)) : wc.color } };
        }),
      }],
    };
  }, [key, layout, m.top, m.end, m.bottom, m.start]);

  // the words' places: read from the drawing once the extension has placed them
  const c = plot.chart;
  React.useEffect(() => {
    if (!c) return undefined;
    let frame = 0, last = -1, stable = 0, raf = 0;
    const read = () => {
      if (c.isDisposed()) return;
      // the extension adds each word after ECharts has drawn (it was made for ECharts 5): ECharts 6 paints them only
      // when asked, so the drawing is refreshed until every word is placed
      c.getZr().refresh();
      const series = c.getModel().getSeriesByIndex(0);
      const data = series ? series.getData() : null;
      const out = shown.map((w, i) => {
        const el = data ? data.getItemGraphicEl(i) : null;
        if (!el) return null;
        const r = el.getBoundingRect().clone();
        const tr = el.getComputedTransform();
        if (tr) r.applyTransform(tr);
        return { x: r.x + r.width / 2, y: r.y + r.height / 2, width: r.width, height: r.height };
      });
      const n = out.filter(Boolean).length;
      stable = n === last ? stable + 1 : 0; last = n;
      where.current = out;
      // done when the count has held still for a few frames after the first word (or nothing to place), or after 10 s
      if ((stable >= SETTLE && (n > 0 || !shown.length)) || ++frame > 600) { setPlaced((p) => p + 1); return; }
      raf = requestAnimationFrame(read);
    };
    raf = requestAnimationFrame(read);
    return () => cancelAnimationFrame(raf);
  }, [c, option]);

  // the word in focus is ECharts' emphasis: the others dim to the interaction's dim token
  const activeKey = ia.active ? String(ia.active.c) : '';
  React.useEffect(() => {
    if (!c) return;
    c.dispatchAction({ type: 'downplay', seriesIndex: 0 });
    if (ia.active) c.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: ia.active.c });
  }, [activeKey, c, placed]);

  const draw = (dims) => {
    const layer = plot.layer(dims, option);
    const at = where.current;
    ia.register({
      nearest: (px, py) => {
        let best = null;
        at.forEach((p, i) => { if (p && Math.abs(px - p.x) <= p.width / 2 && Math.abs(py - p.y) <= p.height / 2) best = i; });
        return best === null ? null : { r: 0, c: best };
      },
    });
    const a = ia.active && at[ia.active.c] ? ia.active : null;
    if (!a || !c) return layer;
    const p = at[a.c], inner = { width: dims.width, height: dims.height };
    return [layer, (
      <g key="plx-chart-overlay" className="plx-word-cloud__plot">
        <ChartTooltip x={p.x + (p.x > dims.width / 2 ? -1 : 1) * p.width / 2} y={p.y} inner={inner} title={shown[a.c].text} items={[{ label: vLabel, value: fmt(shown[a.c].value), color: colorOf(shown[a.c]) }]} />
      </g>
    )];
  };

  return (
    <ChartFrame title={title} description={description} size={size} margin={NO_MARGIN} table={table} legend={legendNode}
      interaction={interactive ? ia : undefined} strings={frameStrings}
      className={cx('plx-word-cloud', 'plx-word-cloud--' + (layout === 'rectangular' ? 'rectangular' : 'spiral'), className)}>
      {draw}
    </ChartFrame>
  );
}
