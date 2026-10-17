/* DM Sans and DM Mono at the same size (docs/font-study/study.jsx; owner, 2026-10-16: "measure the font between DM
   Sans and DM Mono … the letters are the same size"). The numbers were measured from the fonts the Platform ships
   (platform/fonts), drawn at 800px and read pixel by pixel; the page draws each comparison live with the same files.
   Compiled to study.js with tools/agent/build-study.js docs/font-study study.jsx. */
const { AppShell, AppHeader, PageContent, Stack, Text, Panel, Table, SessionProvider, StatusBar, List } = Plenix;

// measured in the browser, glyph ink at 800px divided by the size (em), weight 400
const ROWS = [
  ['x-height (x)', '0.496', '0.496', 'Same'],
  ['Round lowercase (o, n, p)', '0.508', '0.508', 'Same'],
  ['Capital height (H)', '0.700', '0.700', 'Same'],
  ['Figure height (0, 8)', '0.711', '0.711', 'Same'],
  ['Ascender (d)', '0.700', '0.720', 'Mono 3% taller'],
  ['Stem thickness (l, n, H)', '0.084', '0.084', 'Same'],
  ['Advance width, lowercase', '0.477 (average)', '0.600 (every letter)', 'Mono 26% wider'],
  ['Advance width, figures', '0.531 (average)', '0.600', 'Mono 13% wider'],
  ['Font ascent / descent', '0.992 / 0.310', '0.992 / 0.310', 'Same line box'],
];

const SIZES = [['13px (the body size)', 'plx-font-study__s13'], ['20px', 'plx-font-study__s20'], ['48px', 'plx-font-study__s48']];

function Pair({ cls, text }) {
  return (
    <div className={'plx-font-study__pair ' + cls}>
      <span className="plx-font-study__sans">{text}</span>
      <span className="plx-font-study__mono">{text}</span>
    </div>
  );
}

// the options on one real line: a name in DM Sans, then its technical values in DM Mono
const LINE_SANS = 'Project brief, version 2', LINE_MONO = 'brief_v2.pdf · 2.4 MB · 2026-10-12';
function Line({ mono }) {
  return <p className="plx-font-study__line"><span className="plx-font-study__sans">{LINE_SANS} </span><span className={'plx-font-study__mono ' + (mono || '')}>{LINE_MONO}</span></p>;
}

// the two options side by side (owner, 2026-10-16: "what is the closest match … show me the 2 options side by side"):
// every value in DM Sans, then in DM Mono with each option; each line's width measured live, against DM Sans
const VALUES = ['brief_v2.pdf', 'IMG_4891.png', '2026-02-28_KitchenReno_Quote.pdf', '2.4 MB', '224 KB', '2026-10-12', '2026-10-16 09:30',
  '12:45', 'PRJ-1042', 'v0.53.1', 'INV-2026-0088', '1,240', '98%', '3 of 24', '#765600', 'www.plenix.com', 'Wallpaper_WW2.jpg'];
const OPTIONS = [
  ['DM Sans (the reference)', 'plx-font-study__sans'],
  ['1 · Closest: −0.07em, narrow spaces', 'plx-font-study__mono plx-font-study__opt1'],
  ['2 · Nothing touches: −0.02em, narrow spaces', 'plx-font-study__mono plx-font-study__opt2'],
];
function Compare({ size }) {
  const ref = React.useRef(null), [w, setW] = React.useState({});
  React.useLayoutEffect(() => {
    const measure = () => { const out = {}; ref.current.querySelectorAll('[data-k]').forEach((e) => { out[e.dataset.k] = e.getBoundingClientRect().width; }); setW(out); };
    document.fonts.ready.then(measure);
  }, [size]);
  const pct = (r, o) => { const a = w['0-' + r], b = w[o + '-' + r]; return a && b ? (b > a ? '+' : '') + Math.round((b / a - 1) * 100) + '%' : ''; };
  const total = (o) => { let a = 0, b = 0; VALUES.forEach((x, r) => { a += w['0-' + r] || 0; b += w[o + '-' + r] || 0; }); return a ? (b > a ? '+' : '') + Math.round((b / a - 1) * 100) + '% overall' : ''; };
  return (
    <div ref={ref} className={'plx-font-study__compare ' + size}>
      {OPTIONS.map((o, i) => <div key={'h' + i} className="plx-font-study__head"><Text variant="label">{o[0]}</Text>{i ? <Text variant="secondary">{total(i)}</Text> : null}</div>)}
      {VALUES.map((v, r) => OPTIONS.map((o, i) => (
        <div key={r + '-' + i} className="plx-font-study__cell">
          <span data-k={i + '-' + r} className={o[1]}>{v}</span>
          {i ? <Text variant="secondary">{pct(r, i)}</Text> : null}
        </div>)))}
    </div>
  );
}

function App() {
  return (
    <AppShell page="detail" header={<AppHeader tone="accent" appName="Font study" brandHref="#" />}
      footer={<StatusBar start={<span>DM Sans · DM Mono</span>} end={<span>Measured from platform/fonts</span>} />}>
      <PageContent>
        <Stack gap="xl">
          <Stack gap="sm">
            <Text as="h1" variant="display">DM Sans and DM Mono at the same size</Text>
            <List variant="bullets" items={[
              { children: 'At the same font size the letters are already the same size: x-height, capitals, figures and stroke thickness match exactly.' },
              { children: 'The two fonts are one family by the same designers, drawn on the same vertical grid.' },
              { children: 'What differs is width: every DM Mono character is 0.60 em wide, so a technical value runs 13% longer than DM Sans figures and 26% longer than DM Sans words.' },
              { children: 'That extra width, and the open spacing of a monospaced font, is what makes DM Mono look bigger.' },
            ]} />
          </Stack>
          <Panel title="The measurements" icon="list-lines">
            <Table label="DM Sans and DM Mono measured" columns={[{ title: 'Measure', field: 'm', kind: 'name' }, { title: 'DM Sans', field: 's', kind: 'data' }, { title: 'DM Mono', field: 'o', kind: 'data' }, { title: 'Result', field: 'r' }]}
              data={ROWS.map((r, i) => ({ id: i, m: r[0], s: r[1], o: r[2], r: r[3] }))} />
          </Panel>
          <Panel title="Side by side" icon="ed-text">
            <Stack gap="md">
              {SIZES.map((s) => <Stack key={s[1]} gap="xs"><Text variant="label">{s[0]}</Text><Pair cls={s[1]} text="Hxop 0148" /></Stack>)}
            </Stack>
          </Panel>
          <Panel title="The two options, side by side (13px)" icon="text-card">
            <Stack gap="md">
              <List variant="bullets" items={[
                { children: 'Same height and the same Regular stroke in all three; only DM Mono’s spacing changes.' },
                { children: 'Option 1 is the closest width; in it w, W and % touch their neighbor (see the close-up).' },
                { children: 'Option 2 keeps every letter apart; it stays wider.' },
                { children: 'Narrow spaces: a DM Mono space is 0.3em in both options (0.6em as designed; a DM Sans space is 0.2em, which reads cramped in DM Mono).' },
              ]} />
              <Compare size="plx-font-study__s13" />
            </Stack>
          </Panel>
          <Panel title="Close-up (48px)" icon="ed-text">
            <div className="plx-font-study__compare plx-font-study__s48">
              {OPTIONS.map((o, i) => <div key={i} className="plx-font-study__head"><Text variant="label">{o[0]}</Text></div>)}
              {['www', 'WW wm', '%% 2.4'].map((v, r) => OPTIONS.map((o, i) => <div key={r + '-' + i} className="plx-font-study__cell"><span className={o[1]}>{v}</span></div>))}
            </div>
          </Panel>
          <Panel title="Next: the playground" icon="text-card">
            <Stack gap="md">
              <List variant="bullets" items={[
                { children: 'Only the monospace font changes; DM Sans never does (owner, 2026-10-16).' },
                { children: 'Letter spacing is not the issue (owner, 2026-10-17): the height and the weight are. No spacing change was applied to the Platform.' },
                { children: 'The playground measures any monospace font against DM Sans on your own screen and fits its size and weight.' },
              ]} />
              <Text as="p"><a className="plx-link" href="playground.html">Open the font playground</a></Text>
              <Stack gap="xs"><Text variant="label">For reference: DM Mono with −0.07em spacing (not applied)</Text><Line mono="plx-font-study__fitted" /></Stack>
              <Stack gap="xs"><Text variant="label">Figures, DM Sans then DM Mono with −0.07em (not applied)</Text><div className="plx-font-study__pair plx-font-study__s20"><span className="plx-font-study__sans">2026-10-12 · 2.4 MB · 1,240</span><span className="plx-font-study__mono plx-font-study__fitted">2026-10-12 · 2.4 MB · 1,240</span></div></Stack>
            </Stack>
          </Panel>
        </Stack>
      </PageContent>
    </AppShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<SessionProvider><App /></SessionProvider>);
