// Icon stage 5a (#280) proof: with no stylesheet on the page, a converted component's icon draws (its path is there); a
// name still written as text draws nothing until the stylesheet arrives (the first-paint quirk the conversion removes).
// Copy first-paint.html to platform/dist/icons/ after a build. A proof script, not a test.
const puppeteer = require(process.env.HOME + '/work/plenix-b1/node_modules/puppeteer-core');
const cases = JSON.parse(process.argv[2] || '{}');   // { label: "P.X props as JSON" } is not needed: the cases are below
(async () => {
  const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] }); const p = await b.newPage();
  await p.goto('http://127.0.0.1:8791/plenix-b1/platform/dist/icons/first-paint.html', { waitUntil: 'networkidle2' });
  console.log(JSON.stringify(await p.evaluate(() => {
    const P = Plenix, h = React.createElement, host = document.getElementById('host'), root = ReactDOM.createRoot(host);
    const drawn = (el) => { ReactDOM.flushSync(() => root.render(el)); const icons = [...host.querySelectorAll('.plx-icon')]; return { icons: icons.length, withPath: icons.filter((i) => i.querySelector('path')).length }; };
    return {
      stylesheet: !!document.querySelector('link[rel=stylesheet]'),
      'CopyButton (converted)': drawn(h(P.CopyButton, { value: 'x' })),
      'BackToTop (converted)': drawn(h(P.BackToTop, { visible: true })),
      'Details (converted)': drawn(h(P.Details, { summary: 'S' }, 'x')),
      'Banner (its dismiss icon converted; its status icon comes from StatusIcon in Icon.jsx, a later group)': drawn(h(P.Banner, { tone: 'info', onDismiss: () => {} }, 'x')),
      'EmptyState (group 2)': drawn(h(P.EmptyState, { kind: 'offline', title: 'Offline' })),
      'Notice (group 2)': drawn(h(P.Notice, { tone: 'warning' }, 'x')),
      'SearchField (group 2)': drawn(h(P.SearchField, { label: 'Search', value: 'x', onChange: () => {} })),
      'File (group 2)': drawn(h(P.File, { name: 'report.pdf' })),
      'Button icon="add" (a name, not converted)': drawn(h(P.Button, { icon: 'add' }, 'Add')),
    };
  }), null, 1)); await b.close();
})();
