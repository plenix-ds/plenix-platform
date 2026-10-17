/* compiled from playground.jsx; do not edit */
(function () {
/* Font playground (docs/font-study/playground.jsx; owner, 2026-10-17: "I just want to play with weights and px sizing …
   or use another font … a 90% match is acceptable"). DM Sans is the reference and never changes; pick a monospace font,
   move its size, weight, word spacing (and width or letter spacing where the font has them) and read how close it comes, measured live on
   this screen (its pixel ratio included, so hinting shows as it really draws). The candidates load from Google Fonts and
   jsDelivr (a study page only; the Platform ships its fonts itself). Compiled to playground.js with
   tools/agent/build-study.js docs/font-study playground.jsx. */
const {
  AppShell,
  AppHeader,
  PageContent,
  Stack,
  Inline,
  Text,
  Panel,
  Table,
  SessionProvider,
  StatusBar,
  Select,
  Slider,
  Button,
  Field,
  List
} = Plenix;
const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;

// [label, family, weights: [min, max] for a variable font or a list of the static ones, width axis [min, max] or null]
const FONTS = [['DM Mono (today)', 'DM Mono', [300, 400, 500], null], ['Roboto Mono', 'Roboto Mono', [100, 700], null], ['Reddit Mono', 'Reddit Mono', [200, 900], null], ['Iosevka', 'Iosevka', [300, 400, 500, 600, 700], null], ['Iosevka Charon Mono', 'Iosevka Charon Mono', [300, 400, 500, 700], null], ['JetBrains Mono', 'JetBrains Mono', [100, 800], null], ['IBM Plex Mono', 'IBM Plex Mono', [100, 200, 300, 400, 500, 600, 700], null], ['Geist Mono', 'Geist Mono', [100, 900], null], ['Source Code Pro', 'Source Code Pro', [200, 900], null], ['Fira Code', 'Fira Code', [300, 700], null], ['Red Hat Mono', 'Red Hat Mono', [300, 700], null], ['Azeret Mono', 'Azeret Mono', [100, 900], null], ['Spline Sans Mono', 'Spline Sans Mono', [300, 700], null], ['Google Sans Code', 'Google Sans Code', [300, 800], null], ['Inconsolata', 'Inconsolata', [200, 900], [50, 200]], ['Martian Mono', 'Martian Mono', [100, 800], [75, 112.5]], ['Ubuntu Mono', 'Ubuntu Mono', [400, 700], null], ['Space Mono', 'Space Mono', [400, 700], null]];
const GOOGLE = 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100..700&family=Reddit+Mono:wght@200..900&family=Iosevka+Charon+Mono:wght@300;400;500;700' + '&family=JetBrains+Mono:wght@100..800&family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&family=Geist+Mono:wght@100..900&family=Source+Code+Pro:wght@200..900' + '&family=Fira+Code:wght@300..700&family=Red+Hat+Mono:wght@300..700&family=Azeret+Mono:wght@100..900&family=Spline+Sans+Mono:wght@300..700&family=Google+Sans+Code:wght@300..800' + '&family=Inconsolata:wdth,wght@50..200,200..900&family=Martian+Mono:wdth,wght@75..112.5,100..800&family=Ubuntu+Mono:wght@400;700&family=Space+Mono:wght@400;700&display=swap';
const IOSEVKA = [300, 400, 500, 600, 700].map(w => 'https://cdn.jsdelivr.net/npm/@fontsource/iosevka@5.3.0/' + w + '.css');
const SIZES = [11, 12, 13, 14, 15, 18, 20];
const LINES = ['Project brief 2026-10-12 · 2.4 MB · v0.53.1', 'Kitchen_Reno_Quote.pdf  224 KB  12:45  #765600', 'INV-2026-0088 · 1,240 · 98% · 3 of 24'];
const steps = f => f[2].length === 2 && f[2][1] - f[2][0] > 100 ? null : f[2]; // a list of static weights, or null (variable)
const clampWeight = (f, w) => {
  const s = steps(f);
  if (s) return s.reduce((a, b) => Math.abs(b - w) < Math.abs(a - w) ? b : a);
  return Math.min(f[2][1], Math.max(f[2][0], Math.round(w / 10) * 10));
};

// ---- measuring, on this screen: a canvas at the device pixel ratio, so the hinting and rounding are the real ones
const DPR = window.devicePixelRatio || 1;
const cv = document.createElement('canvas');
cv.width = 1600;
cv.height = 240;
const cx = cv.getContext('2d', {
  willReadFrequently: true
});
// the canvas takes a width only as a keyword, so the width control offers these steps
const STRETCH = [[50, 'ultra-condensed'], [62.5, 'extra-condensed'], [75, 'condensed'], [87.5, 'semi-condensed'], [100, 'normal'], [112.5, 'semi-expanded'], [125, 'expanded'], [150, 'extra-expanded'], [200, 'ultra-expanded']];
const fontCss = (family, weight, size, stretch) => {
  cx.fontStretch = (STRETCH.find(x => x[0] === stretch) || [0, 'normal'])[1];
  return weight + ' ' + size * DPR + 'px "' + family + '"';
};
function ink(css, text, spacing) {
  const B = 180;
  cx.clearRect(0, 0, cv.width, cv.height);
  cx.fillStyle = '#000';
  cx.font = css;
  cx.letterSpacing = (spacing || 0) + 'px';
  cx.fillText(text, 10, B);
  const d = cx.getImageData(0, 0, cv.width, cv.height).data;
  return {
    d,
    B
  };
}
// the optical height of a run: each row above the baseline counts its strongest coverage (a soft top row counts a part)
function height(css, text) {
  const {
    d,
    B
  } = ink(css, text);
  let h = 0;
  for (let y = 0; y < B; y++) {
    let m = 0;
    for (let x = 0; x < cv.width; x++) m = Math.max(m, d[(y * cv.width + x) * 4 + 3]);
    h += m / 255;
  }
  return h / DPR;
}
// the optical stroke: summed coverage across a row through the stems of "llll", per stem
function stroke(css, size) {
  const {
    d,
    B
  } = ink(css, 'llll');
  const y = B - Math.round(size * DPR * 0.3);
  let s = 0;
  for (let x = 0; x < cv.width; x++) s += d[(y * cv.width + x) * 4 + 3] / 255;
  return s / 4 / DPR;
}
function width(css, spacing, words) {
  cx.font = css;
  cx.letterSpacing = (spacing || 0) + 'px';
  cx.wordSpacing = (words || 0) + 'px';
  const w = LINES.reduce((a, t) => a + cx.measureText(t).width, 0) / DPR;
  cx.wordSpacing = '0px';
  return w;
}
// the width a space takes between two words (the letter spacing after it and the word spacing included)
function space(css, spacing, words) {
  cx.font = css;
  cx.letterSpacing = (spacing || 0) + 'px';
  cx.wordSpacing = (words || 0) + 'px';
  const w = cx.measureText('a a').width - cx.measureText('aa').width;
  cx.wordSpacing = '0px';
  return w / DPR;
}
function metrics(family, weight, size, stretch, spacingEm, wordEm) {
  const css = fontCss(family, weight, size, stretch),
    sp = (spacingEm || 0) * size * DPR,
    ws = (wordEm || 0) * size * DPR;
  return {
    x: height(css, 'xxxx'),
    cap: height(css, 'HHHH'),
    fig: height(css, '0000'),
    stroke: stroke(css, size),
    space: space(css, sp, ws),
    width: width(css, sp, ws)
  };
}
const pct = (a, b) => b ? Math.round(a / b * 1000) / 10 : 0;
const close = (a, b) => Math.max(0, 100 - Math.abs(100 - pct(a, b)));
function App() {
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem('plenix-font-playground') || 'null');
    } catch (e) {
      return null;
    }
  })();
  const [ref, setRef] = useState(saved ? saved.ref : {
    size: 13,
    weight: 400
  });
  const [font, setFont] = useState(saved ? saved.font : 'DM Mono');
  const [cand, setCand] = useState(saved ? saved.cand : {
    size: 13,
    weight: 400,
    stretch: 100,
    spacing: 0,
    words: 0
  });
  const [ready, setReady] = useState(0);
  const f = FONTS.find(x => x[1] === font) || FONTS[0];
  useEffect(() => {
    try {
      localStorage.setItem('plenix-font-playground', JSON.stringify({
        ref,
        font,
        cand
      }));
    } catch (e) {/* not kept */}
  }, [ref, font, cand]);
  // the candidates' stylesheets, once; then measure again as fonts arrive
  useEffect(() => {
    [GOOGLE].concat(IOSEVKA).forEach(href => {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      l.onload = () => setReady(n => n + 1);
      document.head.appendChild(l);
    });
    document.fonts.addEventListener('loadingdone', () => setReady(n => n + 1));
  }, []);
  useEffect(() => {
    Promise.all([300, 400, 500, 600, 700].map(w => document.fonts.load(w + ' 16px "' + f[1] + '"', 'xH0l').catch(() => null))).then(() => setReady(n => n + 1));
  }, [font]);
  // the specimens' sizes and weights: a constructed stylesheet (no style attribute, no style element)
  const sheet = useMemo(() => {
    const s = new CSSStyleSheet();
    document.adoptedStyleSheets = document.adoptedStyleSheets.concat(s);
    return s;
  }, []);
  useEffect(() => {
    sheet.replaceSync('.pg-ref{font-family:"DM Sans";font-size:' + ref.size + 'px;font-weight:' + ref.weight + ';}' + '.pg-cand{font-family:"' + f[1] + '";font-size:' + cand.size + 'px;font-weight:' + cand.weight + ';letter-spacing:' + cand.spacing + 'em;word-spacing:' + (cand.words || 0) + 'em;' + (f[3] ? 'font-stretch:' + cand.stretch + '%;' : '') + '}' + '.pg-big .pg-ref{font-size:' + ref.size * 6 + 'px;}.pg-big .pg-cand{font-size:' + cand.size * 6 + 'px;}');
  }, [ref, cand, font]);
  const m = useMemo(() => ({
    r: metrics('DM Sans', ref.weight, ref.size),
    c: metrics(f[1], cand.weight, cand.size, f[3] ? cand.stretch : null, cand.spacing, cand.words)
  }), [ref, cand, font, ready]);
  const parts = [['x-height', 'x'], ['Capital height', 'cap'], ['Figure height', 'fig'], ['Stroke', 'stroke'], ['Space between words', 'space'], ['Width of the lines', 'width']];
  const loaded = document.fonts.check(cand.weight + ' 16px "' + f[1] + '"');
  const score = Math.round(parts.reduce((a, p) => a + close(m.c[p[1]], m.r[p[1]]), 0) / parts.length * 10) / 10;
  const set = (k, v) => setCand(Object.assign({}, cand, {
    [k]: v
  }));
  const pickFont = fam => {
    const n = FONTS.find(x => x[1] === fam);
    setFont(fam);
    setCand(Object.assign({}, cand, {
      weight: clampWeight(n, cand.weight),
      stretch: n[3] ? Math.min(n[3][1], Math.max(n[3][0], 100)) : 100
    }));
  };
  // fit: the size whose x-height and capitals come closest, then the weight whose stroke comes closest
  const st = c => f[3] ? c.stretch : null;
  const bestSize = c => {
    let best = null;
    for (let s = ref.size - 3; s <= ref.size + 3.001; s += 0.125) {
      const k = metrics(f[1], c.weight, s, st(c), c.spacing, c.words);
      const e = Math.abs(k.x - m.r.x) + Math.abs(k.cap - m.r.cap);
      if (!best || e < best.e) best = {
        s,
        e
      };
    }
    return Math.round(best.s * 1000) / 1000;
  };
  const bestWeight = c => {
    const list = steps(f) || Array.from({
      length: (f[2][1] - f[2][0]) / 10 + 1
    }, (x, i) => f[2][0] + i * 10);
    let best = null;
    list.forEach(w => {
      const k = metrics(f[1], w, c.size, st(c), c.spacing, c.words);
      const e = Math.abs(k.stroke - m.r.stroke);
      if (!best || e < best.e) best = {
        w,
        e
      };
    });
    return best.w;
  };
  const fitSize = () => set('size', bestSize(cand));
  const fitWeight = () => set('weight', bestWeight(cand));
  const fitWidth = () => {
    if (!f[3]) return;
    let best = null;
    for (const s of STRETCH.map(x => x[0]).filter(x => x >= f[3][0] && x <= f[3][1])) {
      const k = metrics(f[1], cand.weight, cand.size, s, cand.spacing, cand.words);
      const e = Math.abs(k.width - m.r.width);
      if (!best || e < best.e) best = {
        s,
        e
      };
    }
    set('stretch', best.s);
  };
  // word spacing: the em value that makes a space exactly as wide as DM Sans's (its width moves one to one with it)
  const bestWords = c => {
    const now = metrics(f[1], c.weight, c.size, st(c), c.spacing, 0).space;
    return Math.round((m.r.space - now) / c.size * 1000) / 1000;
  };
  const fitWords = () => set('words', bestWords(cand));
  // both at once: the size first (at the current weight), then the weight at that size
  const fitAll = () => {
    const c = Object.assign({}, cand);
    c.size = bestSize(c);
    c.weight = bestWeight(c);
    c.words = bestWords(c);
    setCand(c);
  };
  const wl = steps(f);
  return /*#__PURE__*/React.createElement(AppShell, {
    page: "detail",
    header: /*#__PURE__*/React.createElement(AppHeader, {
      tone: "accent",
      appName: "Font playground",
      brandHref: "#"
    }),
    footer: /*#__PURE__*/React.createElement(StatusBar, {
      start: /*#__PURE__*/React.createElement("span", null, "DM Sans is the reference"),
      end: /*#__PURE__*/React.createElement("span", null, "Measured on this screen \xB7 pixel ratio ", DPR)
    })
  }, /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(Stack, {
    gap: "xl"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "h1",
    variant: "display"
  }, "Font playground"), /*#__PURE__*/React.createElement(List, {
    variant: "bullets",
    items: [{
      children: 'DM Sans is the reference and never changes; set the size and weight it has where the two fonts meet.'
    }, {
      children: 'Pick a monospace font and move its size, weight, width and spacing; every number is measured live on this screen.'
    }, {
      children: 'Fit finds the size, the weight and the word spacing that come closest; 90% or more is the target.'
    }]
  })), /*#__PURE__*/React.createElement(Panel, {
    title: loaded ? 'Match: ' + score + '%' : 'Loading ' + f[0] + '…',
    icon: "list-lines"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(Table, {
    label: "The match, part by part",
    columns: [{
      title: 'Measure',
      field: 'n',
      kind: 'name'
    }, {
      title: 'DM Sans',
      field: 'r',
      kind: 'data'
    }, {
      title: f[0],
      field: 'c',
      kind: 'data'
    }, {
      title: 'Match',
      field: 'p',
      kind: 'data'
    }],
    data: parts.map((p, i) => ({
      id: i,
      n: p[0],
      r: m.r[p[1]].toFixed(2) + ' px',
      c: m.c[p[1]].toFixed(2) + ' px',
      p: close(m.c[p[1]], m.r[p[1]]).toFixed(1) + '%'
    }))
  }), /*#__PURE__*/React.createElement(Text, {
    variant: "secondary"
  }, "CSS for the candidate: font-family \"", f[1], "\"; font-size ", cand.size, "px; font-weight ", cand.weight, f[3] ? '; font-stretch ' + cand.stretch + '%' : '', cand.spacing ? '; letter-spacing ' + cand.spacing + 'em' : '', cand.words ? '; word-spacing ' + cand.words + 'em' : '', " (beside DM Sans ", ref.size, "px ", ref.weight, ")"))), /*#__PURE__*/React.createElement(Panel, {
    title: "Settings",
    icon: "text-card"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(Inline, {
    gap: "lg",
    wrap: true
  }, /*#__PURE__*/React.createElement(Field, {
    label: "DM Sans size"
  }, /*#__PURE__*/React.createElement(Select, {
    value: String(ref.size),
    onChange: e => setRef(Object.assign({}, ref, {
      size: +e.target.value
    })),
    options: SIZES.map(s => ({
      value: String(s),
      label: s + 'px'
    }))
  })), /*#__PURE__*/React.createElement(Field, {
    label: "DM Sans weight"
  }, /*#__PURE__*/React.createElement(Select, {
    value: String(ref.weight),
    onChange: e => setRef(Object.assign({}, ref, {
      weight: +e.target.value
    })),
    options: [300, 400, 500, 600, 700].map(w => ({
      value: String(w),
      label: String(w)
    }))
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Monospace font"
  }, /*#__PURE__*/React.createElement(Select, {
    value: font,
    onChange: e => pickFont(e.target.value),
    options: FONTS.map(x => ({
      value: x[1],
      label: x[0]
    }))
  }))), /*#__PURE__*/React.createElement(Slider, {
    label: "Size",
    value: cand.size,
    min: ref.size - 3,
    max: ref.size + 3,
    step: 0.125,
    unit: "px",
    onChange: v => set('size', v)
  }), wl ? /*#__PURE__*/React.createElement(Field, {
    label: "Weight"
  }, /*#__PURE__*/React.createElement(Select, {
    value: String(cand.weight),
    onChange: e => set('weight', +e.target.value),
    options: wl.map(w => ({
      value: String(w),
      label: String(w)
    }))
  })) : /*#__PURE__*/React.createElement(Slider, {
    label: "Weight",
    value: cand.weight,
    min: f[2][0],
    max: f[2][1],
    step: 10,
    onChange: v => set('weight', v)
  }), f[3] ? /*#__PURE__*/React.createElement(Field, {
    label: "Width"
  }, /*#__PURE__*/React.createElement(Select, {
    value: String(cand.stretch),
    onChange: e => set('stretch', +e.target.value),
    options: STRETCH.filter(x => x[0] >= f[3][0] && x[0] <= f[3][1]).map(x => ({
      value: String(x[0]),
      label: x[0] + '%'
    }))
  })) : null, /*#__PURE__*/React.createElement(Slider, {
    label: "Letter spacing",
    value: cand.spacing,
    min: -0.1,
    max: 0.05,
    step: 0.005,
    unit: "em",
    onChange: v => set('spacing', v)
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Word spacing",
    value: cand.words || 0,
    min: -0.5,
    max: 0.1,
    step: 0.005,
    unit: "em",
    onChange: v => set('words', v)
  }), /*#__PURE__*/React.createElement(Inline, {
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: fitAll
  }, "Fit size, weight and word spacing"), /*#__PURE__*/React.createElement(Button, {
    onClick: fitSize
  }, "Fit size"), /*#__PURE__*/React.createElement(Button, {
    onClick: fitWeight
  }, "Fit weight"), /*#__PURE__*/React.createElement(Button, {
    onClick: fitWords
  }, "Fit word spacing"), f[3] ? /*#__PURE__*/React.createElement(Button, {
    onClick: fitWidth
  }, "Fit width") : null, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setCand({
      size: ref.size,
      weight: clampWeight(f, ref.weight),
      stretch: 100,
      spacing: 0,
      words: 0
    })
  }, "Reset")))), /*#__PURE__*/React.createElement(Panel, {
    title: "Side by side",
    icon: "ed-text"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, LINES.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "pg-pair"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pg-ref"
  }, t), /*#__PURE__*/React.createElement("span", {
    className: "pg-cand"
  }, t))), /*#__PURE__*/React.createElement("p", {
    className: "pg-line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pg-ref"
  }, "The brief "), /*#__PURE__*/React.createElement("span", {
    className: "pg-cand"
  }, "brief_v2.pdf"), /*#__PURE__*/React.createElement("span", {
    className: "pg-ref"
  }, " is "), /*#__PURE__*/React.createElement("span", {
    className: "pg-cand"
  }, "2.4 MB"), /*#__PURE__*/React.createElement("span", {
    className: "pg-ref"
  }, ", updated "), /*#__PURE__*/React.createElement("span", {
    className: "pg-cand"
  }, "2026-10-12"), /*#__PURE__*/React.createElement("span", {
    className: "pg-ref"
  }, ".")))), /*#__PURE__*/React.createElement(Panel, {
    title: "Overlaid, six times larger",
    icon: "ed-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pg-big pg-overlay"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pg-ref"
  }, "Hxo 08"), /*#__PURE__*/React.createElement("span", {
    className: "pg-cand"
  }, "Hxo 08"))))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(SessionProvider, null, /*#__PURE__*/React.createElement(App, null)));
})();
