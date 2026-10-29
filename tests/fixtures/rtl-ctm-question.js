/* Plenix tests · CTM's question block (issue 413, rtl-413-d): CTM's report form (council-case.js, the question categories
   and the question selection) drawn with the Platform alone, without CTM's own direction rules (ctm.css 295 to 304).
   ?page=ltr (default): an English page with an Arabic block (#ar, the way CTM writes it today: dir on a wrapper) and the
     supported way (#ar-set: dir and lang on the Fieldset, the wrapper with dir and lang)
   ?page=rtl: an Arabic page with an English block (#en: dir="ltr" lang="en" on the wrapper and the Fieldset)
   Used by tests/rtl-ctm-question.test.js. */
(function () {
  const page = new URLSearchParams(location.search).get('page') === 'rtl' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', page);
  document.documentElement.setAttribute('lang', page === 'rtl' ? 'ar' : 'en');
  const start = () => {
    const h = React.createElement, P = window.Plenix, noop = () => {};
    const QUESTIONS = [
      { code: 'q1', ar: 'هل حضر الطرفان الجلسة؟', en: 'Did both parties attend the session?', foundational: true },
      { code: 'q2', ar: 'هل تم توقيع الاتفاق؟', en: 'Was the agreement signed?' },
      { code: 'q3', ar: 'هل يحتاج الطرفان إلى جلسة أخرى؟', en: 'Do the parties need another session?' },
    ];
    const WORDS = {
      ar: { attendance: 'الحضور', agreement: 'الاتفاق', foundational: 'أساسي' },
      en: { attendance: 'Attendance', agreement: 'Agreement', foundational: 'Foundational' },
    };
    // one block, as CTM draws it: wrap carries the wrapper's attributes, set the Fieldset's
    function Block({ id, language, wrap, set }) {
      const w = WORDS[language];
      return h(P.SplitView, {
        label: 'Report templates', firstLabel: 'Question categories',
        first: h(P.Panel, { title: 'Question categories' }, h('div', Object.assign({ id: id + '-nav' }, wrap),
          h(P.NavList, { label: 'Question categories', value: 'attendance', onSelect: noop,
            items: [{ id: 'attendance', label: w.attendance, count: 3 }, { id: 'agreement', label: w.agreement, count: 1 }] }))),
        second: h(P.FormSection, { title: 'Question selection', description: '1 selected' },
          h('div', Object.assign({ id }, wrap),
            h(P.Fieldset, Object.assign({ legend: w.attendance }, set),
              ...QUESTIONS.map((q) => h(P.Checkbox, { key: q.code, label: q[language], description: q.foundational ? w.foundational : undefined,
                checked: !!q.foundational, disabled: !!q.foundational, onChange: noop }))))),
      });
    }
    const blocks = page === 'ltr'
      ? [h(Block, { key: 'ar', id: 'ar', language: 'ar', wrap: { dir: 'rtl' }, set: {} }),
        h(Block, { key: 'ar-set', id: 'ar-set', language: 'ar', wrap: { dir: 'rtl', lang: 'ar' }, set: { dir: 'rtl', lang: 'ar' } })]
      : [h(Block, { key: 'en', id: 'en', language: 'en', wrap: { dir: 'ltr', lang: 'en' }, set: { dir: 'ltr', lang: 'en' } })];
    ReactDOM.createRoot(document.getElementById('main')).render(h(P.Stack, { gap: 'xl' }, ...blocks));
    document.documentElement.setAttribute('data-fixture-ready', 'true');
  };
  const wait = () => (window.Plenix && window.ReactDOM && document.getElementById('main') ? start() : setTimeout(wait, 50));
  wait();
})();
