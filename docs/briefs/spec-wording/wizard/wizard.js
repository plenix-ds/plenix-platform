/* Spec questions wizard. Reads questions.json and sections/<section>.json (the authored renders, options and
   recommendations), shows one question at a time, and keeps the owner's answers in this browser (localStorage), with
   an export to JSON. A render is { caption, width, html } (Platform markup and classes) or { caption, width, jsx }
   (an expression using h = React.createElement and P = window.Plenix). */
(function () {
  const h = React.createElement, P = window.Plenix, KEY = 'plx-spec-wizard-answers';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } };
  const save = (a) => { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) { /* private window */ } };
  const NAMES = { actions: 'Actions', layout: 'Layout', forms: 'Forms', navigation: 'Navigation', content: 'Content', 'data-display': 'Data display',
    feedback: 'Feedback', overlays: 'Overlays', specialized: 'Specialized', 'page-structures': 'Page structures', implementation: 'Implementation',
    patterns: 'Patterns', interaction: 'Interaction', foundations: 'Foundations' };

  class Boundary extends React.Component {
    constructor(p) { super(p); this.state = { error: null }; }
    static getDerivedStateFromError(error) { return { error }; }
    componentDidUpdate(prev) { if (prev.code !== this.props.code && this.state.error) this.setState({ error: null }); }
    render() { return this.state.error ? h('p', { className: 'wz-stage__error' }, 'This drawing failed: ' + this.state.error.message) : this.props.children; }
  }
  function Html({ html }) { return h('div', { dangerouslySetInnerHTML: { __html: html } }); }
  function Jsx({ code }) { const el = React.useMemo(() => new Function('h', 'P', 'React', 'return (' + code + ');')(h, P, React), [code]); return el; }
  function Stage({ render }) {
    if (!render) return null;
    const list = Array.isArray(render) ? render : [render];
    return h(React.Fragment, null, list.map((r, i) => h('div', { key: i, className: 'wz-stage' },
      r.caption && h('p', { className: 'wz-stage__caption' }, r.caption),
      h('div', { className: 'wz-stage__frame' + (r.width ? ' wz-stage__frame--' + r.width : '') },
        h(Boundary, { code: r.html || r.jsx }, r.jsx ? h(Jsx, { code: r.jsx }) : h(Html, { html: r.html || '' }))))));
  }

  function App() {
    const [qs, setQs] = React.useState(null), [answers, setAnswers] = React.useState(load), [error, setError] = React.useState(null);
    const [index, setIndex] = React.useState(0), [section, setSection] = React.useState(null), [onlyOpen, setOnlyOpen] = React.useState(false);
    React.useEffect(() => {
      fetch('questions.json').then((r) => r.json()).then(async (list) => {
        const sections = [...new Set(list.map((q) => q.section))], authored = {};
        await Promise.all(sections.map((s) => fetch('sections/' + s + '.json').then((r) => (r.ok ? r.json() : [])).catch(() => [])
          .then((items) => items.forEach((it) => { authored[it.id] = it; }))));
        const merged = list.map((q) => Object.assign({}, q, authored[q.id] || {}));
        setQs(merged);
        const at = merged.findIndex((q) => '#' + q.id === decodeURIComponent(location.hash));
        if (at >= 0) setIndex(at);
      }).catch((e) => setError(e.message));
    }, []);
    React.useEffect(() => {
      if (!qs) return undefined;
      const follow = () => { const at = qs.findIndex((x) => '#' + x.id === decodeURIComponent(location.hash)); if (at >= 0) setIndex(at); };
      window.addEventListener('hashchange', follow);
      return () => window.removeEventListener('hashchange', follow);
    }, [qs]);
    React.useEffect(() => { if (qs && qs[index]) { history.replaceState(null, '', '#' + qs[index].id); window.scrollTo(0, 0); } }, [qs, index]);
    if (error) return h('p', { className: 'wz-pending' }, 'Could not load the questions: ' + error + '. Open this page from the local server (http://localhost:8767/Plenix/docs/briefs/spec-wording/wizard/).');
    if (!qs) return h('p', { className: 'wz-pending' }, 'Loading the questions…');
    const q = qs[index], a = answers[q.id] || {};
    const setAnswer = (patch) => { const next = Object.assign({}, answers, { [q.id]: Object.assign({}, a, patch, { at: new Date().toISOString() }) }); setAnswers(next); save(next); };
    const done = (x) => answers[x.id] && (answers[x.id].choice || answers[x.id].note);
    const sections = [...new Set(qs.map((x) => x.section))];
    const go = (step) => { let i = index; do { i += step; } while (i >= 0 && i < qs.length && onlyOpen && done(qs[i])); if (i >= 0 && i < qs.length) setIndex(i); };
    const exportAnswers = () => {
      const out = qs.filter(done).map((x) => { const an = answers[x.id], opt = (x.options || []).find((o) => o.key === an.choice);
        return { id: x.id, question: x.title || x.text, choice: an.choice || null, chosen: opt ? opt.label : null, note: an.note || '', at: an.at }; });
      const blob = new Blob([JSON.stringify({ exported: new Date().toISOString(), answered: out.length, of: qs.length, answers: out }, null, 1)], { type: 'application/json' });
      const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'spec-answers-' + new Date().toISOString().slice(0, 10) + '.json'; link.click();
    };
    const total = qs.filter(done).length;
    const settledOpen = qs.filter((x) => x.settled && !done(x));
    const confirmSettled = () => {
      const next = Object.assign({}, answers), at = new Date().toISOString();
      settledOpen.forEach((x) => { const rec = (x.options || []).find((o) => o.recommended); next[x.id] = { choice: rec ? rec.key : 'confirm', note: 'Confirmed: already fixed in the spec', at }; });
      setAnswers(next); save(next);
    };
    return h('div', { className: 'wz-shell' },
      h('aside', { className: 'wz-side' },
        h('h1', { className: 'wz-side__title' }, 'Spec questions'),
        h('p', { className: 'wz-side__meta' }, total + ' of ' + qs.length + ' answered'),
        h(P.ProgressBar, { value: total, max: qs.length, label: 'Answered', labelHidden: true, size: 'sm' }),
        h('div', { className: 'wz-sections' }, sections.map((s) => {
          const inS = qs.filter((x) => x.section === s), n = inS.filter(done).length;
          return h('button', { key: s, type: 'button', className: 'wz-sec' + (q.section === s ? ' wz-sec--on' : ''), onClick: () => setIndex(qs.indexOf(inS.find((x) => !done(x)) || inS[0])) },
            h('span', null, NAMES[s] || s), h('span', { className: 'wz-sec__count' }, n + '/' + inS.length));
        })),
        h('div', { className: 'wz-side__actions' },
          settledOpen.length > 0 && h('p', { className: 'wz-side__meta' }, settledOpen.length + ' questions are already fixed in the spec: review any, or confirm them all.'),
          settledOpen.length > 0 && h(P.Button, { onClick: confirmSettled }, 'Confirm all already fixed (' + settledOpen.length + ')'),
          h(P.Switch || 'label', P.Switch ? { label: 'Skip answered ones', checked: onlyOpen, onChange: (e) => setOnlyOpen(typeof e === 'boolean' ? e : e.target.checked) } : null),
          h(P.Button, { onClick: exportAnswers }, 'Export answers (JSON)'))),
      h('main', { className: 'wz-main' },
        h('p', { className: 'wz-crumb' }, (index + 1) + ' / ' + qs.length + ' · ' + (NAMES[q.section] || q.section) + ' › ' + q.page + ' · ' + q.fields),
        q.settled && h('div', null, h(P.Badge, { tone: 'success', icon: 'check' }, 'Already fixed in the spec: confirm')),
        h('h2', { className: 'wz-h1' }, q.title || q.text),
        q.context && h('p', { className: 'wz-lead' }, q.context),
        !q.options && h('p', { className: 'wz-lead' }, q.text),
        q.current && h('section', { className: 'wz-block' }, h('h3', { className: 'wz-h2' }, 'What the spec says now'),
          h('div', { className: 'wz-quotes' }, q.current.map((c, i) => h('div', { key: i, className: 'wz-quote' + (c.conflict ? ' wz-quote--conflict' : '') },
            h('span', { className: 'wz-quote__where' }, c.where), h('p', { className: 'wz-quote__text' }, c.text))))),
        q.renders && h('section', { className: 'wz-block' }, h('h3', { className: 'wz-h2' }, 'How it looks today'), h('div', { className: 'wz-current' }, h(Stage, { render: q.renders }))),
        q.options && h('section', { className: 'wz-block' }, h('h3', { className: 'wz-h2' }, 'Options'),
          h('div', { className: 'wz-options' }, q.options.map((o) => h('article', { key: o.key, className: 'wz-option' + (a.choice === o.key ? ' wz-option--chosen' : '') },
            h('div', { className: 'wz-option__head' }, h('span', { className: 'wz-option__key' }, o.key), h('span', { className: 'wz-option__label' }, o.label),
              o.recommended && h(P.Badge, { tone: 'success', icon: 'check' }, 'Recommended')),
            h('div', { className: 'wz-option__body' }, o.text && h('p', { className: 'wz-option__text' }, o.text), h(Stage, { render: o.render })),
            h('div', { className: 'wz-option__foot' }, h(P.Button, { variant: a.choice === o.key ? 'primary' : 'secondary', size: 'sm', onClick: () => setAnswer({ choice: a.choice === o.key ? null : o.key }) }, a.choice === o.key ? 'Chosen' : 'Choose ' + o.key)))))),
        q.recommendation && h('section', { className: 'wz-rec' }, h('h3', { className: 'wz-h2' }, 'Recommendation'), h('p', { className: 'wz-rec__text' }, q.recommendation),
          q.sources && q.sources.length > 0 && h('ul', { className: 'wz-sources' }, q.sources.map((s, i) => h('li', { key: i }, s)))),
        h('section', { className: 'wz-answer' }, h('h3', { className: 'wz-h2' }, 'Your answer or notes'),
          h('textarea', { className: 'wz-note', value: a.note || '', placeholder: 'Optional: another answer, or a note for this question', onChange: (e) => setAnswer({ note: e.target.value }) })),
        h('nav', { className: 'wz-nav' },
          h('div', { className: 'wz-nav__group' }, h(P.Button, { onClick: () => go(-1), disabled: index === 0 }, 'Previous')),
          h('div', { className: 'wz-nav__group' },
            h(P.Button, { variant: 'ghost', onClick: () => { setAnswer({ choice: 'skip' }); go(1); } }, 'Skip for now'),
            h(P.Button, { variant: 'primary', onClick: () => go(1), disabled: index === qs.length - 1 }, 'Next')))));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
