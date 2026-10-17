/* compiled from study.jsx; do not edit */
(function () {
/* DM Sans and DM Mono at the same size (docs/font-study/study.jsx; owner, 2026-10-16: "measure the font between DM
   Sans and DM Mono … the letters are the same size"). The numbers were measured from the fonts the Platform ships
   (platform/fonts), drawn at 800px and read pixel by pixel; the page draws each comparison live with the same files.
   Compiled to study.js with tools/agent/build-study.js docs/font-study study.jsx. */
const {
  AppShell,
  AppHeader,
  PageContent,
  Stack,
  Text,
  Panel,
  Table,
  SessionProvider,
  StatusBar,
  List
} = Plenix;

// measured in the browser, glyph ink at 800px divided by the size (em), weight 400
const ROWS = [['x-height (x)', '0.496', '0.496', 'Same'], ['Round lowercase (o, n, p)', '0.508', '0.508', 'Same'], ['Capital height (H)', '0.700', '0.700', 'Same'], ['Figure height (0, 8)', '0.711', '0.711', 'Same'], ['Ascender (d)', '0.700', '0.720', 'Mono 3% taller'], ['Stem thickness (l, n, H)', '0.084', '0.084', 'Same'], ['Advance width, lowercase', '0.477 (average)', '0.600 (every letter)', 'Mono 26% wider'], ['Advance width, figures', '0.531 (average)', '0.600', 'Mono 13% wider'], ['Font ascent / descent', '0.992 / 0.310', '0.992 / 0.310', 'Same line box']];
const SIZES = [['13px (the body size)', 'plx-font-study__s13'], ['20px', 'plx-font-study__s20'], ['48px', 'plx-font-study__s48']];
function Pair({
  cls,
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'plx-font-study__pair ' + cls
  }, /*#__PURE__*/React.createElement("span", {
    className: "plx-font-study__sans"
  }, text), /*#__PURE__*/React.createElement("span", {
    className: "plx-font-study__mono"
  }, text));
}

// the options on one real line: a name in DM Sans, then its technical values in DM Mono
const LINE_SANS = 'Project brief, version 2',
  LINE_MONO = 'brief_v2.pdf · 2.4 MB · 2026-10-12';
function Line({
  mono
}) {
  return /*#__PURE__*/React.createElement("p", {
    className: "plx-font-study__line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "plx-font-study__sans"
  }, LINE_SANS, " "), /*#__PURE__*/React.createElement("span", {
    className: 'plx-font-study__mono ' + (mono || '')
  }, LINE_MONO));
}
function App() {
  return /*#__PURE__*/React.createElement(AppShell, {
    page: "detail",
    header: /*#__PURE__*/React.createElement(AppHeader, {
      tone: "accent",
      appName: "Font study",
      brandHref: "#"
    }),
    footer: /*#__PURE__*/React.createElement(StatusBar, {
      start: /*#__PURE__*/React.createElement("span", null, "DM Sans \xB7 DM Mono"),
      end: /*#__PURE__*/React.createElement("span", null, "Measured from platform/fonts")
    })
  }, /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(Stack, {
    gap: "xl"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "h1",
    variant: "display"
  }, "DM Sans and DM Mono at the same size"), /*#__PURE__*/React.createElement(List, {
    variant: "bullets",
    items: [{
      children: 'At the same font size the letters are already the same size: x-height, capitals, figures and stroke thickness match exactly.'
    }, {
      children: 'The two fonts are one family by the same designers, drawn on the same vertical grid.'
    }, {
      children: 'What differs is width: every DM Mono character is 0.60 em wide, so a technical value runs 13% longer than DM Sans figures and 26% longer than DM Sans words.'
    }, {
      children: 'That extra width, and the open spacing of a monospaced font, is what makes DM Mono look bigger.'
    }]
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "The measurements",
    icon: "list-lines"
  }, /*#__PURE__*/React.createElement(Table, {
    label: "DM Sans and DM Mono measured",
    columns: [{
      title: 'Measure',
      field: 'm',
      kind: 'name'
    }, {
      title: 'DM Sans',
      field: 's',
      kind: 'data'
    }, {
      title: 'DM Mono',
      field: 'o',
      kind: 'data'
    }, {
      title: 'Result',
      field: 'r'
    }],
    data: ROWS.map((r, i) => ({
      id: i,
      m: r[0],
      s: r[1],
      o: r[2],
      r: r[3]
    }))
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Side by side",
    icon: "ed-text"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "md"
  }, SIZES.map(s => /*#__PURE__*/React.createElement(Stack, {
    key: s[1],
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "label"
  }, s[0]), /*#__PURE__*/React.createElement(Pair, {
    cls: s[1],
    text: "Hxop 0148"
  }))))), /*#__PURE__*/React.createElement(Panel, {
    title: "The options, on one line",
    icon: "text-card"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "label"
  }, "A \xB7 Same size (today): heights and weight match, the values run wider"), /*#__PURE__*/React.createElement(Line, null)), /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "label"
  }, "B \xB7 DM Mono one step smaller (12px beside 13px): narrower, but its letters are visibly shorter than the words beside them"), /*#__PURE__*/React.createElement(Line, {
    mono: "plx-font-study__smaller"
  })), /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "label"
  }, "C \xB7 Same size, tighter spacing (\u22120.02em, the tight token): heights match, a little narrower"), /*#__PURE__*/React.createElement(Line, {
    mono: "plx-font-study__tight"
  })), /*#__PURE__*/React.createElement(Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(Text, {
    variant: "label"
  }, "D \xB7 Same size, much tighter spacing (\u22120.06em, needs a new token): heights match, about as wide as DM Sans figures"), /*#__PURE__*/React.createElement(Line, {
    mono: "plx-font-study__tighter"
  })))))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(SessionProvider, null, /*#__PURE__*/React.createElement(App, null)));
})();
