/* Plenix charts on Apache ECharts: the prototype for the owner's review (#353, step 1: "show me"). Not Platform code.
   ELineChart and EBarChart take LineChart's and BarChart's props and draw with ECharts inside Plenix's own ChartFrame:
   the caption, the one Tab stop with the arrow keys, the live region, the legend toggles, the tooltip, the focus marks
   and "Show the data" are Plenix's (window.Plenix); ECharts draws the axes, grid lines, lines and bars.
   The look is an ECharts theme read from Plenix's chart classes (a hidden probe), so every color, width and font is a
   token: nothing is written here. Uses window.PlenixECharts (vendor/echarts-preview.min.js: ECharts' core, the SVG
   renderer, the line and bar charts and the grid, nothing else). */
(function () {
  'use strict';
  var h = React.createElement, P = window.Plenix, E = window.PlenixECharts;
  var NS = 'http://www.w3.org/2000/svg';
  var DASH = '—';
  var isNum = function (v) { return typeof v === 'number' && isFinite(v); };
  var px = function (v) { return parseFloat(v) || 0; };
  var ms = function (v) { var s = String(v).trim(); return /ms$/.test(s) ? px(s) : /s$/.test(s) ? px(s) * 1000 : px(s); };

  // 1. The tokens, as Plenix's own chart classes resolve them where the chart is (theme, density and scope included)
  function readTokens(where) {
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'plx-visually-hidden');
    svg.setAttribute('aria-hidden', 'true');
    var mk = function (tag, cls, attrs) {
      var e = document.createElementNS(NS, tag);
      e.setAttribute('class', cls);
      Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
      svg.appendChild(e);
      return e;
    };
    var lines = [1, 2, 3, 4, 5, 6].map(function (i) { return mk('path', 'plx-chart__line', { 'data-plx-dataviz': 'categorical-' + i }); });
    var tick = mk('text', 'plx-chart__tick-label'), title = mk('text', 'plx-chart-axis__label');
    var axis = mk('line', 'plx-chart__axis-line'), grid = mk('line', 'plx-chart__grid-line');
    var point = mk('circle', 'plx-chart__point plx-line-chart__point');
    where.appendChild(svg);
    var cs = function (e) { return getComputedStyle(e); };
    var font = function (e) { var s = cs(e); return { color: s.fill, fontFamily: s.fontFamily, fontSize: px(s.fontSize), fontWeight: s.fontWeight }; };
    var host = getComputedStyle(where);
    var t = {
      colors: lines.map(function (l) { return cs(l).stroke; }),
      lineWidth: px(cs(lines[0]).strokeWidth),
      tick: font(tick), title: font(title),
      axis: { color: cs(axis).stroke, width: px(cs(axis).strokeWidth) },
      grid: { color: cs(grid).stroke, width: px(cs(grid).strokeWidth) },
      point: { r: px(cs(point).r), outline: cs(point).stroke, outlineWidth: px(cs(point).strokeWidth) },
      // the room above the plot (for the top tick label) and the dimming of the values not in focus
      top: px(host.getPropertyValue('--plx-comp-chart-margin-block-start')),
      dim: px(host.getPropertyValue('--plx-comp-chart-interaction-dim-opacity')) || 1,
      // the drawing's animation: the motion token (reduced motion makes it 0)
      motion: ms(host.getPropertyValue('--plx-sys-motion-duration-slow')),
    };
    svg.remove();
    return t;
  }

  // 2. The ECharts theme built from those tokens (light first; dark mode re-reads the same classes)
  function plenixTheme(t) {
    var label = { color: t.tick.color, fontFamily: t.tick.fontFamily, fontSize: t.tick.fontSize };
    var name = { color: t.title.color, fontFamily: t.title.fontFamily, fontSize: t.title.fontSize, fontWeight: t.title.fontWeight };
    var base = { axisLabel: label, nameTextStyle: name, axisTick: { show: false } };
    var rule = { show: true, lineStyle: { color: t.axis.color, width: t.axis.width } };
    var grid = { show: true, lineStyle: { color: t.grid.color, width: t.grid.width } };
    return {
      color: t.colors,
      backgroundColor: 'transparent',
      textStyle: { fontFamily: t.tick.fontFamily, color: t.tick.color },
      categoryAxis: Object.assign({}, base, { axisLine: rule, splitLine: { show: false } }),
      timeAxis: Object.assign({}, base, { axisLine: rule, splitLine: { show: false } }),
      valueAxis: Object.assign({}, base, { axisLine: { show: false }, splitLine: grid }),
      line: { symbol: 'circle', symbolSize: t.point.r * 2, lineStyle: { width: t.lineWidth, cap: 'round', join: 'round' },
        itemStyle: { borderColor: t.point.outline, borderWidth: t.point.outlineWidth } },
      bar: { itemStyle: { borderWidth: 0 } },
    };
  }

  // 3. The ECharts drawing, inside ChartFrame's plot: one instance per chart, redrawn when the option or the size changes
  function EChartsHost(props) {
    var ref = React.useRef(null), inst = React.useRef(null), tk = React.useRef(null);
    var mode = React.useState(0), bump = mode[1];
    React.useEffect(function () {
      // dark mode last: the theme is read again when the page's mode changes
      var mo = new MutationObserver(function () { bump(function (n) { return n + 1; }); });
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-plx-mode', 'data-plx-density'] });
      return function () { mo.disconnect(); };
    }, []);
    React.useEffect(function () {
      tk.current = readTokens(ref.current);
      var c = E.init(ref.current, plenixTheme(tk.current), { renderer: 'svg', width: props.width, height: props.height });
      inst.current = c;
      return function () { c.dispose(); inst.current = null; };
    }, [mode[0]]);
    React.useEffect(function () {
      var c = inst.current;
      if (!c) return;
      c.resize({ width: props.width, height: props.height, animation: { duration: 0 } });
      c.setOption(props.option(tk.current), { replaceMerge: ['series'] });
      props.onDraw(c, tk.current);
    }, [props.option, props.width, props.height, mode[0]]);
    return h('div', { ref: ref, className: 'rv-ec-host' });
  }

  // the grid's rectangle (the plot inside the axis labels): the overlay is drawn in it
  var gridRect = function (c) { return c.getModel().getComponent('grid').coordinateSystem.getRect(); };

  // the frame both charts share: ChartFrame with no margins (ECharts fits its own labels inside the plot)
  function frame(o, draw) {
    return h(P.ChartFrame, { title: o.title, description: o.description, hideCaption: o.hideCaption, size: o.size || 'md',
      margin: { top: 0, end: 0, bottom: 0, start: 0 }, table: o.table, legend: o.legend, legendPosition: o.legendPosition,
      interaction: o.ia, strings: o.frameStrings, className: ['rv-ec-chart', o.className].filter(Boolean).join(' ') }, draw);
  }

  // ELineChart: LineChart's props (categories on x in this prototype; time and number axes in the build)
  function ELineChart(props) {
    var o = Object.assign({ data: [], x: 'x', series: [], curve: 'linear', step: 'after', points: false, zero: true, legend: 'auto', legendPosition: 'bottom', interactive: true }, props);
    var data = o.data;
    var list = o.series.map(function (s, i) { return { id: s.id === undefined ? 'series-' + i : s.id, label: s.label === undefined ? String(s.id) : s.label, field: s.field || s.id, color: s.color || P.seriesColor(i) }; });
    var fmtV = typeof o.format === 'function' ? o.format : function (v) { return P.formatNumber(v); };
    var fmtX = typeof o.formatX === 'function' ? o.formatX : function (v) { return String(v); };
    var raw = function (s, c) { var v = data[c] ? data[c][list[s].field] : undefined; return isNum(v) ? v : null; };
    var chart = React.useRef(null);
    var drawn = React.useState(0), redraw = drawn[1];
    var tipItems = function (c, first) {
      var items = [];
      list.forEach(function (s, i) { if (ia.visible(s.id)) items.push({ label: s.label, value: raw(i, c) === null ? DASH : fmtV(raw(i, c)), color: s.color, i: i }); });
      if (first !== undefined) items.sort(function (a, b) { return a.i === first ? -1 : b.i === first ? 1 : 0; });
      return items;
    };
    var ia = P.useChartInteraction({ rows: list.length, columns: data.length, mode: 'x', series: list, strings: o.interactionStrings,
      labelOf: function (c) { return fmtX(data[c][o.x]); },
      describe: function (cell) { return P.chartTooltipText({ title: fmtX(data[cell.c][o.x]), items: tipItems(cell.c, cell.r) }); } });
    var hiddenKey = list.map(function (s) { return ia.visible(s.id) ? 1 : 0; }).join('');
    // the ECharts option: LineChart's props, said the ECharts way; colors come from the theme by the series' order
    var option = React.useCallback(function (t) {
      return {
        animationDuration: t.motion, animationDurationUpdate: t.motion,
        grid: { left: 0, right: 0, top: t.top, bottom: 0, outerBoundsMode: 'same', outerBoundsContain: 'all' },
        xAxis: { type: 'category', boundaryGap: false, data: data.map(function (r) { return fmtX(r[o.x]); }), name: o.xLabel, nameLocation: 'middle', nameGap: t.tick.fontSize * 2 },
        yAxis: { type: 'value', scale: !o.zero, min: o.yDomain ? o.yDomain[0] : undefined, max: o.yDomain ? o.yDomain[1] : undefined,
          axisLabel: { formatter: function (v) { return fmtV(v); } }, name: o.yLabel, nameLocation: 'middle', nameGap: 0, nameMoveOverlap: true },
        series: list.map(function (s, i) {
          return { type: 'line', id: String(s.id), name: s.label, silent: true, showSymbol: !!o.points, connectNulls: false,
            step: o.curve === 'step' ? (o.step === 'before' ? 'start' : 'end') : false,
            data: hiddenKey[i] === '1' ? data.map(function (r, c) { return raw(i, c); }) : [] };
        }),
      };
    }, [data, o.series, hiddenKey, o.points, o.curve, o.zero]);
    var onDraw = React.useCallback(function (c) { chart.current = c; redraw(function (n) { return n + 1; }); }, []);
    var table = {
      columns: [{ title: o.xLabel || 'Category', field: 'x', kind: 'name', rowLabel: true }].concat(list.map(function (s, i) { return { title: s.label, field: 's' + i, kind: 'data', align: 'right' }; })),
      data: data.map(function (r, c) { var row = { id: c + 1, x: fmtX(r[o.x]) }; list.forEach(function (s, i) { row['s' + i] = raw(i, c) === null ? DASH : fmtV(raw(i, c)); }); return row; }),
    };
    var legend = o.legend === 'auto' ? (list.length > 1 ? h(P.ChartLegend, Object.assign({ items: list.map(function (s) { return { id: s.id, label: s.label, color: s.color }; }), shape: 'line' }, o.interactive ? ia.legendProps : {})) : null) : o.legend || null;
    var draw = function (dims) {
      var c = chart.current;
      var host = h('foreignObject', { key: 'ec', x: 0, y: 0, width: dims.width, height: dims.height }, h(EChartsHost, { width: dims.width, height: dims.height, option: option, onDraw: onDraw }));
      if (!c || c.isDisposed()) return host;
      var g = gridRect(c);
      var xAt = function (col) { return c.convertToPixel({ xAxisIndex: 0 }, col); };
      var yAt = function (v) { return c.convertToPixel({ yAxisIndex: 0 }, v); };
      var colAt = function (pxX) { var best = 0; data.forEach(function (r, col) { if (Math.abs(xAt(col) - pxX) < Math.abs(xAt(best) - pxX)) best = col; }); return best; };
      ia.register({
        columnAt: colAt,
        nearest: function (pxX, pxY) {
          var col = colAt(pxX), r = null, d = Infinity;
          list.forEach(function (s, i) { var v = ia.visible(s.id) ? raw(i, col) : null; if (v !== null && Math.abs(yAt(v) - pxY) < d) { d = Math.abs(yAt(v) - pxY); r = i; } });
          return r === null ? null : { r: r, c: col };
        },
      });
      var a = ia.active;
      var inner = { width: g.width, height: g.height };
      return [host, a ? h('g', { key: 'overlay', transform: 'translate(' + g.x + ',' + g.y + ')' },
        list.map(function (s, i) { var v = ia.visible(s.id) ? raw(i, a.c) : null; return v === null ? null : h(P.ChartFocusMark, { key: s.id, x: xAt(a.c) - g.x, y: yAt(v) - g.y, color: s.color }); }),
        h(P.ChartTooltip, { variant: 'shared', x: xAt(a.c) - g.x, inner: inner, title: fmtX(data[a.c][o.x]), items: tipItems(a.c) })) : null];
    };
    return frame(Object.assign({}, o, { table: table, legend: legend, ia: o.interactive ? ia : undefined }), draw);
  }

  // EBarChart: BarChart's props (grouped and stacked, horizontal and vertical); a value at a time, as heat maps do
  function EBarChart(props) {
    var o = Object.assign({ categories: [], series: [], orientation: 'horizontal', layout: 'grouped', tooltip: true, interactive: true }, props);
    var cats = o.categories, horiz = o.orientation !== 'vertical';
    var list = o.series.map(function (s, i) { return { id: s.id === undefined ? 'series-' + i : s.id, label: s.label === undefined ? String(s.id) : s.label, values: s.values || [], color: s.color || P.seriesColor(i) }; });
    var fmtV = typeof o.format === 'function' ? o.format : function (v) { return P.formatNumber(v); };
    var raw = function (s, c) { var v = list[s].values[c]; return isNum(v) ? v : null; };
    var chart = React.useRef(null);
    var drawn = React.useState(0), redraw = drawn[1];
    // bars across: the categories run down, so ↑ ↓ move between them and ← → between the series (columns: as usual)
    var across = function (cur, k) {
      var n = cats.length;
      if (k === 'ArrowUp') return { r: cur.r, c: Math.max(0, cur.c - 1) };
      if (k === 'ArrowDown') return { r: cur.r, c: Math.min(n - 1, cur.c + 1) };
      if (k === 'Home') return { r: cur.r, c: 0 };
      if (k === 'End') return { r: cur.r, c: n - 1 };
      var d = k === 'ArrowRight' ? 1 : -1;
      for (var r = cur.r + d; r >= 0 && r < list.length; r += d) if (ia.visible(list[r].id)) return { r: r, c: cur.c };
      return cur;
    };
    var ia = P.useChartInteraction({ rows: list.length, columns: cats.length, mode: 'point', series: list, strings: o.interactionStrings,
      move: horiz ? across : undefined,
      labelOf: function (c) { return cats[c]; },
      describe: function (cell) { return P.chartTooltipText({ title: cats[cell.c], items: [{ label: list[cell.r].label, value: raw(cell.r, cell.c) === null ? DASH : fmtV(raw(cell.r, cell.c)) }] }); } });
    var hiddenKey = list.map(function (s) { return ia.visible(s.id) ? 1 : 0; }).join('');
    var option = React.useCallback(function (t) {
      var catAxis = { type: 'category', data: cats, inverse: horiz, name: o.categoryLabel, nameLocation: 'middle', nameGap: 0, nameMoveOverlap: true };
      var valAxis = { type: 'value', axisLabel: { formatter: function (v) { return fmtV(v); } }, name: o.valueLabel, nameLocation: 'middle', nameGap: t.tick.fontSize * 2 };
      return {
        animationDuration: t.motion, animationDurationUpdate: t.motion,
        grid: { left: 0, right: t.top, top: horiz ? 0 : t.top, bottom: 0, outerBoundsMode: 'same', outerBoundsContain: 'all' },
        xAxis: horiz ? valAxis : catAxis, yAxis: horiz ? catAxis : valAxis,
        series: list.map(function (s, i) {
          return { type: 'bar', id: String(s.id), name: s.label, silent: true, stack: o.layout === 'grouped' ? undefined : 'all',
            emphasis: { focus: 'self', blurScope: 'coordinateSystem', itemStyle: { color: 'inherit' } }, blur: { itemStyle: { opacity: t.dim } },
            data: hiddenKey[i] === '1' ? list[i].values.map(function (v) { return isNum(v) ? v : null; }) : [] };
        }),
      };
    }, [cats, o.series, hiddenKey, o.layout, horiz]);
    var onDraw = React.useCallback(function (c) { chart.current = c; redraw(function (n) { return n + 1; }); }, []);
    // the value in focus is ECharts' emphasis (the others dim to the interaction's dim token)
    var activeKey = ia.active ? ia.active.r + ':' + ia.active.c : '';
    React.useEffect(function () {
      var c = chart.current;
      if (!c || c.isDisposed()) return;
      c.dispatchAction({ type: 'downplay' });
      if (ia.active) c.dispatchAction({ type: 'highlight', seriesIndex: ia.active.r, dataIndex: ia.active.c });
    }, [activeKey]);
    var table = {
      columns: [{ title: o.categoryLabel || 'Category', field: 'x', kind: 'name', rowLabel: true }].concat(list.map(function (s, i) { return { title: s.label, field: 's' + i, kind: 'data', align: 'right' }; })),
      data: cats.map(function (name, c) { var row = { id: c + 1, x: name }; list.forEach(function (s, i) { row['s' + i] = raw(i, c) === null ? DASH : fmtV(raw(i, c)); }); return row; }),
    };
    var legend = o.legend === false ? null : list.length > 1 || o.legend === true ? h(P.ChartLegend, Object.assign({ items: list.map(function (s) { return { id: s.id, label: s.label, color: s.color }; }) }, o.interactive ? ia.legendProps : {})) : null;
    var barBox = function (c, r, col) { var l = c.getModel().getSeriesByIndex(r).getData().getItemLayout(col); return l && isNum(l.x) ? l : null; };
    var draw = function (dims) {
      var c = chart.current;
      var host = h('foreignObject', { key: 'ec', x: 0, y: 0, width: dims.width, height: dims.height }, h(EChartsHost, { width: dims.width, height: dims.height, option: option, onDraw: onDraw }));
      if (!c || c.isDisposed()) return host;
      var g = gridRect(c);
      // the pointer: the bar under it, or the nearest bar in its category
      var catAt = function (p) { var at = c.convertFromPixel({ seriesIndex: 0 }, p); var k = Math.round(horiz ? at[1] : at[0]); return Math.max(0, Math.min(cats.length - 1, isNum(k) ? k : 0)); };
      ia.register({
        nearest: function (pxX, pxY) {
          var col = catAt([pxX, pxY]), r = null, d = Infinity;
          list.forEach(function (s, i) { var b = ia.visible(s.id) && raw(i, col) !== null ? barBox(c, i, col) : null; if (!b) return; var mid = horiz ? b.y + b.height / 2 : b.x + b.width / 2; var dist = Math.abs(mid - (horiz ? pxY : pxX)); if (dist < d) { d = dist; r = i; } });
          return r === null ? null : { r: r, c: col };
        },
      });
      var a = ia.active, b = a && o.tooltip ? barBox(c, a.r, a.c) : null;
      if (!b) return host;
      var tx = horiz ? b.x + b.width : b.x + b.width / 2, ty = horiz ? b.y + b.height / 2 : b.y;
      return [host, h('g', { key: 'overlay', transform: 'translate(' + g.x + ',' + g.y + ')' },
        h(P.ChartTooltip, { variant: 'single', x: tx - g.x, y: ty - g.y, inner: { width: g.width, height: g.height }, title: cats[a.c],
          items: [{ label: list[a.r].label, value: fmtV(raw(a.r, a.c)), color: list[a.r].color }] }))];
    };
    return frame(Object.assign({}, o, { table: table, legend: legend, ia: o.interactive ? ia : undefined }), draw);
  }

  window.PlenixEChartsPreview = { ELineChart: ELineChart, EBarChart: EBarChart, readTokens: readTokens, plenixTheme: plenixTheme };
})();
