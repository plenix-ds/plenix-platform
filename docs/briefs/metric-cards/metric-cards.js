/* Metric cards brief: one anatomy, twelve types, five layouts, their states and the period filter, drawn with the Platform
   (window.Plenix). The card frame is the Platform's Panel; the body parts are the brief's (metric-cards.css). */
(function () {
  var React = window.React, P = window.Plenix, h = React.createElement;

  // ---- the parts of every card -------------------------------------------------------------------------------
  function delta(text, tone, arrow) {           // the change: arrow + amount, colored by good / bad (never the value)
    return h('span', { className: 'mc-delta mc-delta--' + tone },
      arrow ? h(P.Icon, { name: 'arrow-up', className: arrow === 'up' ? undefined : 'mc-icon--down' }) : null, text);
  }
  function change(text, tone, arrow, versus) {
    return h('div', { className: 'mc-change' }, delta(text, tone, arrow), h('span', { className: 'mc-versus' }, versus));
  }
  function figure(o) {                           // value · unit · target, with an optional badge at the end
    return h('div', { className: 'mc-figure' },
      h('span', { className: 'mc-value' + (o.size ? ' mc-value--' + o.size : '') + (o.empty ? ' mc-value--empty' : '') }, o.value),
      o.unit ? h('span', { className: 'mc-unit' }, o.unit) : null,
      o.target ? h('span', { className: 'mc-target' }, '/ ' + o.target) : null,
      o.badge ? h('span', { className: 'mc-figure__end' }, o.badge) : null);
  }
  function info(title, text) { return h(P.ContextualHelp, { title: title }, text); }
  function menu(title) {
    return h(P.Menu, { trigger: h(P.Button, { iconOnly: true, icon: 'more', label: 'More for ' + title, variant: 'ghost', size: 'sm' }), placement: 'bottom-end' },
      h(P.MenuItem, { icon: 'open' }, 'Open details'), h(P.MenuItem, { icon: 'download-alt' }, 'Export data'));
  }
  function period(value) {
    return h(P.Select, { size: 'sm', 'aria-label': 'Period', defaultValue: value || '2025',
      options: [{ value: '2026', label: '2026' }, { value: '2025', label: '2025' }, { value: '2024', label: '2024' }] });
  }
  // the card frame: Panel = header (icon, title, context line, actions) · body · footer
  function card(o) {
    var actions = [];
    if (o.info) actions.push(h(React.Fragment, { key: 'i' }, info(o.title, o.info)));
    if (o.filter) actions.push(h(React.Fragment, { key: 'f' }, o.filter));
    actions.push(h(React.Fragment, { key: 'm' }, menu(o.title)));
    return h(P.Panel, { icon: o.icon, title: o.title, description: o.context, headingLevel: 4, className: o.className,
      actions: h(P.Inline, { gap: 'xs' }, actions), footer: o.footer ? h('span', { className: 'mc-footnote' }, o.footer) : undefined },
      h('div', { className: 'mc-body' + (o.beside ? ' mc-body--beside' : '') }, o.body));
  }
  function frag() { return h.apply(null, [React.Fragment, null].concat([].slice.call(arguments))); }

  // ---- the twelve types ---------------------------------------------------------------------------------------
  var TYPES = [
    { n: 1, name: 'Value', data: 'One number', when: 'A count or an amount that matters on its own: open tasks, files, unread messages.',
      cards: [
        card({ icon: 'checklist', title: 'Open tasks', context: 'All projects', info: 'Tasks not marked done.',
          body: frag(figure({ value: '128' }), change('12', 'neutral', 'up', 'since last week')) }),
        card({ icon: 'folder', title: 'Files', context: 'Shared with you', body: frag(figure({ value: '2,480' }), change('4.1%', 'good', 'up', 'since last month')) }),
        card({ icon: 'mail', title: 'Unread messages', context: 'Today', body: frag(figure({ value: '7' }), change('3', 'bad', 'up', 'since yesterday')) }),
        card({ icon: 'alert', title: 'Open bugs', context: 'All projects', footer: 'Healthy under 100 · critical from 300',
          body: frag(figure({ value: '130', badge: h(P.Badge, { tone: 'waiting', icon: 'warning' }, 'Needs attention') }), change('18', 'bad', 'up', 'since last week')) })
      ] },
    { n: 2, name: 'Trend', data: 'One number and its recent history (5–30 points)', when: 'People need the direction, not only the level: assets added per day, hours logged per week.',
      cards: [
        card({ icon: 'image-b', title: 'Assets added', context: 'Last 30 days', info: 'New assets in the library, per day.', footer: 'Updated 5 minutes ago',
          body: frag(figure({ value: '1,284' }), change('12.5%', 'good', 'up', 'vs previous 30 days'),
            h(P.Sparkline, { values: [38, 41, 40, 44, 47, 45, 52, 49, 55, 58, 54, 61], variant: 'area', size: 'fill', showLast: true, label: 'Assets added per day' })) }),
        card({ icon: 'clock', title: 'Hours logged', context: 'This week', footer: 'Monday to Sunday',
          body: frag(figure({ value: '32.5', unit: 'hrs' }), change('2.5 hrs', 'neutral', 'down', 'vs last week'),
            h(P.Sparkline, { values: [6.5, 7, 8, 5.5, 5.5, 0, 0], variant: 'bar', size: 'fill', label: 'Hours per day' })) })
      ] },
    { wide: true, n: 3, name: 'Progress', data: 'A number against a target, a quota or a limit', when: 'There is a goal or a whole: tasks done of all tasks, budget spent, steps toward a goal.',
      cards: [
        card({ icon: 'briefcase', title: 'Tasks done', context: 'Kitchen renovation', footer: 'On pace to finish by Nov 30',
          body: frag(figure({ value: '36', target: '147', badge: h(P.Badge, { tone: 'active' }, '24%') }),
            h(P.ProgressBar, { value: 36, max: 147, label: 'Tasks done', labelHidden: true })) }),
        card({ icon: 'field-currency', title: 'Budget spent', context: 'Q4 2026', footer: 'Limit set by Finance',
          body: frag(figure({ value: '$41.2K', target: '$50K', badge: h(P.Badge, { tone: 'waiting', icon: 'warning' }, '82%') }),
            h(P.ProgressBar, { value: 82, tone: 'warning', label: 'Budget spent', labelHidden: true })) }),
        card({ icon: 'checklist', title: 'Granted vs submitted', context: '2025', filter: period('2025'), wide: true,
          body: rows([['Annulments (both parties)', 18, 24, 'good'], ['Annulments (one party)', 6, 8, 'good'], ['Petitions denied', 8, 32, 'bad']].map(function (r) {
            var pct = Math.round(r[1] / r[2] * 100);
            return progressRow(r[0], r[1] + ' / ' + r[2], pct + '%', r[3], pct);
          })) })
      ] },
    { n: 4, name: 'Gauge', data: 'A score inside a fixed range, with good and bad zones', when: 'The range is the point: storage used, a satisfaction score of 100. Use Progress when there is no zone to warn about.',
      cards: [
        card({ icon: 'database', title: 'Storage used', context: 'Library · 1 TB', footer: 'Warning at 80%, full at 95%',
          body: h(P.Gauge, { title: 'Storage used', hideCaption: true, size: 'sm', value: 86, format: function (v) { return v + '%'; }, label: 'of 1 TB',
            thresholds: [{ value: 80, level: 'warning', label: 'Nearly full' }, { value: 95, level: 'critical', label: 'Full' }] }) })
      ] },
    { wide: true, n: 5, name: 'Breakdown', data: 'A total split into 2–6 parts', when: 'The share of each part matters: storage by file type, tasks by status, visitors by source.',
      cards: [
        card({ icon: 'chart', title: 'Tasks by status', context: 'All projects',
          body: frag(figure({ value: '278', unit: 'tasks' }),
            h('div', { className: 'mc-split', role: 'img', 'aria-label': 'To do 52%, in progress 26%, review 14%, done 8%' },
              h('span', { className: 'mc-split__part mc-key-blue mc-w-52' }), h('span', { className: 'mc-split__part mc-key-purple mc-w-26' }),
              h('span', { className: 'mc-split__part mc-key-brown mc-w-14' }), h('span', { className: 'mc-split__part mc-key-green mc-w-8' })),
            legend([['blue', 'To do', '145', '52%'], ['purple', 'In progress', '72', '26%'], ['brown', 'Review', '39', '14%'], ['green', 'Done', '22', '8%']])) }),
        card({ icon: 'database', title: 'Storage by type', context: 'Library',
          body: h(P.PieChart, { variant: 'donut', hideCaption: true, size: 'sm', title: 'Storage by type', centerLabel: 'GB used',
            data: [{ id: 'v', label: 'Videos', value: 540 }, { id: 'i', label: 'Images', value: 260 }, { id: 'd', label: 'Documents', value: 120 }] }) }),
        card({ icon: 'person', title: 'Applicants by gender', context: '2025', filter: period('2025'),
          body: h(P.PieChart, { variant: 'donut', hideCaption: true, size: 'sm', title: 'Applicants by gender', centerLabel: 'applicants',
            data: [{ id: 'f', label: 'Female', value: 33 }, { id: 'm', label: 'Male', value: 27 }] }) }),
        card({ icon: 'clock', title: 'Duration before divorce', context: '2025 · 60 cases', filter: period('2025'), footer: 'Ranges keep their order; they are never sorted by size',
          body: rows([['0–5 years', 23], ['6–10 years', 21], ['11–15 years', 11], ['16+ years', 5]].map(function (r) {
            var pct = Math.round(r[1] / 60 * 100);
            return progressRow(r[0], r[1] + ' cases', pct + '%', 'neutral', pct);
          })) })
      ] },
    { n: 6, name: 'Comparison', data: 'Two numbers of the same unit, side by side', when: 'This against that: done against open, this year against last, plan against actual.',
      cards: [
        card({ icon: 'checklist', title: 'Done vs open', context: 'This sprint',
          body: frag(h('div', { className: 'mc-compare' },
              h('div', { className: 'mc-compare__side' }, h('span', { className: 'mc-value' }, '29'), h('span', { className: 'mc-compare__label' }, 'Done')),
              h('span', { className: 'mc-compare__vs' }, 'vs'),
              h('div', { className: 'mc-compare__side mc-compare__side--end' }, h('span', { className: 'mc-value' }, '67'), h('span', { className: 'mc-compare__label' }, 'Open'))),
            h('div', { className: 'mc-split', role: 'img', 'aria-label': 'Done 30%, open 70%' },
              h('span', { className: 'mc-split__part mc-key-green mc-w-30' }), h('span', { className: 'mc-split__part mc-key-gray mc-w-70' }))) })
      ] },
    { wide: true, n: 7, name: 'List', data: 'The top items by one number, or the few records that need action', when: 'Which ones lead (most active projects, case load per member), or which records to open (overdue tasks). Ranked rows, ranked bars, or record rows with a status.',
      cards: [
        card({ icon: 'star', title: 'Most active projects', context: 'Last 30 days', footer: 'By tasks updated',
          body: h('ol', { className: 'mc-rank' }, [['Kitchen renovation', 'blue', 471], ['Brand refresh', 'purple', 427], ['Q4 launch', 'green', 383], ['Office move', 'brown', 307], ['Hiring', 'gray', 306]].map(function (r, i) {
            return h('li', { key: i, className: 'mc-rank__row' }, h('span', { className: 'mc-rank__n' }, '#' + (i + 1)),
              h(P.IconTile, { icon: 'briefcase', hue: r[1], size: 'sm' }), h('span', null, r[0]), h(P.Count, { variant: 'pill', tone: 'neutral', value: r[2] }));
          })) }),
        card({ icon: 'settings-users', title: 'Case load by member', context: '2025', filter: period('2025'), footer: 'Open and closed cases',
          body: rows([['Fr. Gawargious Kotta', 14], ['Fr. Youhana Ibrahim', 12], ['Fr. Boules Mikhail', 10], ['Fr. David Elias', 9], ['Fr. Bishoy Bastawros', 8]].map(function (r) {
            return h('div', { key: r[0], className: 'mc-barrow' }, h('span', { className: 'mc-barrow__label' }, r[0]),
              h(P.ProgressBar, { value: r[1], max: 14, size: 'sm', label: r[0], labelHidden: true }), h('span', { className: 'mc-legend__val' }, r[1]));
          })) }),
        card({ icon: 'checklist', title: 'Overdue tasks', context: 'Assigned to you', footer: 'Oldest first',
          body: h('ul', { className: 'mc-rank' }, [['Fix the upload limit', 'negative', 'alert', '5 days'], ['Review brand guide', 'waiting', 'clock', '2 days'], ['Send the Q4 report', 'waiting', 'clock', '1 day']].map(function (r) {
            return h('li', { key: r[0], className: 'mc-rank__row mc-rank__row--record' }, h('span', null, r[0]), h(P.Badge, { tone: r[1], icon: r[2] }, r[3]));
          })) })
      ] },
    { n: 8, name: 'Summary', data: '2–4 related figures about one subject, each of a different unit', when: 'One subject, several measures: today (tasks, hours, meetings); one province (revenue, cost, volume).',
      cards: [
        card({ icon: 'calendar', title: 'Today', context: 'Mon, Oct 19',
          body: h(P.Metric.Group, { label: 'Today' }, h(P.Metric, { value: '5', label: 'Tasks due' }), h(P.Metric, { value: '6.5', unit: 'hrs', label: 'Logged' }), h(P.Metric, { value: '–', label: 'Meetings' })) })
      ] },
    { n: 9, name: 'Person', data: 'One number about one person (or one place, one project)', when: 'The figure belongs to someone: active cases per council member, tasks per teammate. The person’s picture sits inside the card, before the name and role; without a picture the avatar shows initials or the gender icon.',
      cards: [
        personInside('Fr. Gawargious Kotta', 'Member', 'people/p1.svg', '5', 'active cases'),
        personInside('Maya Chen', 'Designer', 'people/p2.svg', '12', 'open tasks', ['3', 'good', 'up', 'since last week']),
        personInside('Daniel Okafor', 'Sales lead', 'people/p3.svg', '$48.2K', 'this quarter', ['8.1%', 'good', 'up', 'vs Q3'], h(P.ProgressBar, { value: 80, size: 'sm', label: 'Toward the $60K quota', labelHidden: true }), 'Quota $60K'),
        personCard('Maya Chen', 'Designer', '12', 'open tasks', 'female')
      ] },
    { wide: true, n: 10, name: 'Week', data: 'One value or one yes / no for each day of a week', when: 'Day by day: hours logged per day, days the goal was hit, sleep or mood per day. The value is the week’s total; each day has its letter under it.',
      cards: [
        card({ icon: 'clock', title: 'Hours logged', context: 'This week · goal 8 hrs a day', footer: 'Today is Saturday',
          body: frag(figure({ value: '35.5', unit: 'hrs' }), change('2.5 hrs', 'bad', 'down', 'vs last week'), weekBars([7, 8, 9, 6, 5.5, 0, null], 9, 'Thursday')) }),
        card({ icon: 'calendar', title: 'Hours goal hit', context: 'This week · 9.5 hrs a day', body: frag(figure({ value: '4', target: '7 days' }), strip(['y', 'n', 'y', 'y', 'n', 'y', '-'])) })
      ] },
    { wide: true, n: 11, name: 'Month', data: 'One value or one level for each day of a month', when: 'A month at a glance: days worked, hearings per day, goal days. Each day is a cell of the month’s calendar, shaded by its level; the value is the month’s total.',
      cards: [
        card({ icon: 'calendar', title: 'Days worked', context: 'October 2026', filter: monthSelect(), footer: 'Darker: more hours',
          body: frag(figure({ value: '11', target: '22 work days' }), month(3, 31, [2, 3, 2, 0, 2, 3, 1, 2, 2, 3, 0, 2, 1], 19)) })
      ] },
    { wide: true, n: 12, name: 'Table', data: 'A total and the few rows it is made of (3–8 rows)', when: 'The figure needs its rows beside it: cost by city, hours by project. More than eight rows, or rows people sort and filter, is a DataTable in a Panel, not a card.',
      cards: [
        card({ icon: 'field-currency', title: 'Cost', context: 'Jiangsu · 2025', filter: period('2025'), footer: 'Top 5 of 13 cities',
          body: frag(figure({ value: '806.5K' }), change('4.2%', 'bad', 'up', 'vs 2024'),
            h(P.Table, { label: 'Cost by city', data: [
              { id: 1, city: 'Lianyungang', cost: '59,553.92', share: '7.4%' }, { id: 2, city: 'Yancheng', cost: '30,740.29', share: '3.8%' },
              { id: 3, city: 'Huai’an', cost: '27,850.11', share: '3.5%' }, { id: 4, city: 'Changzhou', cost: '21,888.55', share: '2.7%' },
              { id: 5, city: 'Zhenjiang', cost: '21,228.07', share: '2.6%' }],
              columns: [{ title: 'City', field: 'city', rowLabel: true }, { title: 'Cost', field: 'cost', hozAlign: 'right', headerHozAlign: 'right' }, { title: 'Share', field: 'share', hozAlign: 'right', headerHozAlign: 'right' }] })) }),
        card({ icon: 'clock', title: 'Hours by project', context: 'This month', footer: 'Billable hours only',
          body: frag(figure({ value: '128', unit: 'hrs' }),
            h(P.Table, { label: 'Hours by project', data: [{ id: 1, p: 'Kitchen renovation', h: '46' }, { id: 2, p: 'Brand refresh', h: '38' }, { id: 3, p: 'Q4 launch', h: '29' }, { id: 4, p: 'Hiring', h: '15' }],
              columns: [{ title: 'Project', field: 'p', rowLabel: true }, { title: 'Hours', field: 'h', hozAlign: 'right', headerHozAlign: 'right' }] })) })
      ] }
  ];
  function personInside(name, role, src, value, unit, ch, extra, note) {
    return h(P.Panel, { title: name, description: role, headingLevel: 4, className: 'mc-person',
      actions: menu(name), footer: note ? h('span', { className: 'mc-footnote' }, note) : undefined },
      h('div', { className: 'mc-person__body' },
        h(P.Avatar, { name: name, src: src, size: '2xl' }),
        h('div', { className: 'mc-body' }, figure({ value: value, unit: unit }), ch ? change(ch[0], ch[1], ch[2], ch[3]) : null, extra || null)));
  }
  function weekBars(vals, max, best) {
    var names = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    return h('div', { className: 'mc-strip', role: 'img', 'aria-label': 'Hours per day: ' + vals.map(function (v) { return v === null ? 'to come' : v; }).join(', ') + '; most on ' + best },
      vals.map(function (v, i) {
        var lv = v === null ? 0 : Math.round(v / max * 10);
        return h('span', { key: i, className: 'mc-strip__cell' },
          h('span', { className: 'mc-wbar' }, h('span', { className: 'mc-wbar__fill mc-lv-' + lv + (v === null ? ' mc-wbar__fill--none' : '') })),
          h('span', { className: 'mc-strip__day' }, names[i]));
      }));
  }
  function monthSelect() {
    return h(P.Select, { size: 'sm', 'aria-label': 'Month', defaultValue: '10', options: [{ value: '9', label: 'Sep 2026' }, { value: '10', label: 'Oct 2026' }] });
  }
  // a month calendar: Monday first; start = the weekday of the 1st (0 = Monday); levels 0–3 for the days so far
  function month(start, days, levels, today) {
    var cells = [];
    ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach(function (d, i) { cells.push(h('span', { key: 'h' + i, className: 'mc-cal__head' }, d)); });
    for (var i = 0; i < start; i++) cells.push(h('span', { key: 'e' + i }));
    var work = 0;
    for (var d = 1; d <= days; d++) {
      var wd = (start + d - 1) % 7, weekend = wd > 4, lv = weekend ? 0 : (levels[work++] || 0);
      cells.push(h('span', { key: d, className: 'mc-cal__day mc-heat-' + (d > today ? 'none' : lv) + (d === today ? ' mc-cal__day--today' : '') }, d));
    }
    return h('div', { className: 'mc-cal', role: 'img', 'aria-label': '11 of 13 work days worked so far in October' }, cells);
  }
  function layoutBox(name, text, el) {
    return h('div', { className: 'mc-type' }, h('span', { className: 'mc-h3' }, name), h('span', { className: 'mc-type__data' }, text), el);
  }
  function tile(label, value) {
    return h('a', { className: 'mc-tile', href: '#' }, h('span', { className: 'mc-tile__label' }, label), h('span', { className: 'mc-value' }, value));
  }
  function iconStart(icon, hue, value, label) {
    return h('div', { className: 'mc-iconstart' }, h(P.IconTile, { icon: icon, hue: hue, size: 'lg' }),
      h('div', { className: 'mc-iconstart__text' }, h('span', { className: 'mc-value mc-value--sm' }, value), h('span', { className: 'mc-compare__label' }, label)));
  }
  var COVER = [
    ['Cases assigned · Hearings (tinted rows)', 'Value', 'Tile', 'Soft style (a data color tint)'],
    ['60 In 2025 · 8 This month · 127 Days', 'Value', 'Inline', 'Year dropdown when the card’s period differs'],
    ['Parish miles “O”', 'Value', 'Stacked', 'Missing data is “–”, never 0 or O'],
    ['Steps 5450 / 10 000, watch error', 'Progress', 'Stacked', 'Error state with the message in the card'],
    ['Sales $1,234 · Positive', 'Value', 'Stacked', 'Status badge with an icon; footer “Aggregated by day”'],
    ['Total revenue, curve', 'Trend', 'Stacked or beside', 'Area sparkline'],
    ['Units sold, 42% to target (segments)', 'Progress', 'Stacked', 'One continuous bar; no segmented bars'],
    ['New customers 302 / 184', 'Comparison', 'Stacked', 'Two figures + split bar'],
    ['Purchase rate, monthly bars', 'Trend', 'Beside', 'Bar sparkline with month labels'],
    ['Patient growth, top specialists, top department', 'Summary · Person · Trend', 'Stacked', 'Avatars as an AvatarGroup in the body'],
    ['Jira: Metric with range colors', 'Value', 'Stacked', 'The range named in a status badge; footer states the ranges'],
    ['Jira: Trend, Progress, Comparison, Distribution', 'Trend · Progress · Comparison · Breakdown', 'Stacked', ''],
    ['Jira: Issue list', 'List (records)', 'Stacked', 'Record rows with a status badge'],
    ['Total products listed, 80% goal', 'Progress', 'Stacked', ''],
    ['Visitors segmentation donut', 'Breakdown', 'Beside', ''],
    ['Order completion rate, curve', 'Trend', 'Stacked', ''],
    ['In-stock 102 Adequate / 18 Low', 'Summary', 'Stacked', 'Each row a figure, a change and a status badge'],
    ['Customer satisfaction 75 / 100', 'Gauge', 'Stacked', 'Footer note explains the score'],
    ['Order breakdown, stacked bars', 'Trend', 'Stacked', 'Stacked bars are a chart: a Panel with a BarChart'],
    ['Mobile: Today, This week, Weekly summary', 'Summary', 'Stacked', 'Missing values “–”'],
    ['Charging stations (Type, Price, Slot)', 'Summary', 'Stacked', 'The station is the title; its figures a group'],
    ['Transaction revenue, CO2 saved, monthly revenue', 'Value · Summary', 'Stacked', ''],
    ['Claim status donut + footer figures', 'Breakdown', 'Beside', 'Footer figures become a Summary card beside it'],
    ['Total claims, approval rate (icon, curve)', 'Trend', 'Beside', ''],
    ['Weight, hydration, heart rate (M–S bars)', 'Week', 'Stacked', ''],
    ['Stress, mood, blood pressure, sleep (M–S)', 'Week', 'Stacked', 'One bar or mark per day; mood faces are icons, not emoji'],
    ['Design Q1 review 40% · 4.1 / 5 · Not started', 'Progress · Value', 'Stacked', '“Not started” is the no-data state'],
    ['Your ratings 161 / 72 / 67 gauges', 'Gauge', 'Stacked', 'Rows under the gauge become a Summary card'],
    ['Top patient endorsements #1–#5', 'List (ranked)', 'Stacked', ''],
    ['Single KPI by dimensions (Beijing)', 'Summary', 'Stacked', 'The dimension is the title'],
    ['Multi-KPI per province', 'Value', 'Stacked', 'The same card repeated per province'],
    ['KPI + table', 'Table', 'Stacked', 'Up to 8 rows; more is a DataTable in a Panel'],
    ['Current score vs potential', 'Comparison', 'Stacked', 'Two cards; the projected one in the Filled style'],
    ['Single-KPI gradient cards', 'Value', 'Stacked', 'Gradient style from two data colors; no illustrations'],
    ['Surveys sent / opened / completed', 'Value', 'Icon start', ''],
    ['KPI + area · KPI + gauge · KPI + bar', 'Trend · Gauge · Summary', 'Beside', ''],
    ['CleanSlate numbered sections', 'Not a metric card', '', 'Form sections in Panels'],
    ['New cases · Total cases · Avg. case duration', 'Value', 'Inline', 'Period dropdown in the header'],
    ['Council members (avatar, role, active)', 'Person', 'Stacked, in a section', 'Picture inside the card; a Panel holds the member cards'],
    ['Council member case load', 'List (ranked bars)', 'Stacked', ''],
    ['Cases by reason donut', 'Breakdown', 'Beside', ''],
    ['Granted vs submitted', 'Progress (rows)', 'Stacked', 'One row per measure, colored by good or bad'],
    ['Applicant gender, background, education', 'Breakdown', 'Beside', 'Small donut + legend with counts and shares'],
    ['Duration before divorce', 'Breakdown (ranges)', 'Stacked', 'Ordered ranges keep their order']
  ];
  function coverage() {
    return h('table', { className: 'mc-table mc-table--wrap' },
      h('thead', null, h('tr', null, h('th', null, 'Sample'), h('th', null, 'Type'), h('th', null, 'Layout'), h('th', null, 'Note'))),
      h('tbody', null, COVER.map(function (c, i) {
        return h('tr', { key: i }, h('td', null, c[0]), h('td', { className: 'mc-req' }, c[1]), h('td', null, c[2]), h('td', { className: 'mc-type__data' }, c[3]));
      })));
  }
  function rows(list) { return h('div', { className: 'mc-rows' }, list); }
  function progressRow(label, detail, pct, tone, value) {
    return h('div', { key: label, className: 'mc-prow' },
      h('div', { className: 'mc-prow__text' }, h('span', null, label), h('span', { className: 'mc-prow__detail' }, detail)),
      h('span', { className: 'mc-delta mc-delta--' + tone }, pct),
      h('div', { className: 'mc-prow__bar' }, h(P.ProgressBar, { value: value, size: 'sm', tone: tone === 'good' ? 'success' : tone === 'bad' ? 'danger' : 'neutral', label: label, labelHidden: true })));
  }
  function personCard(name, role, value, unit, gender, tone, delta) {
    return card({ icon: h(P.Avatar, { name: name, gender: gender, size: 'lg' }), title: name, context: role,
      body: frag(figure({ value: value, unit: unit }), delta ? change(delta, tone, 'up', 'since last week') : null) });
  }
  function strip(days) {
    var names = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    return h('div', { className: 'mc-strip', role: 'img', 'aria-label': 'Hit on Monday, Wednesday, Thursday and Saturday; missed Tuesday and Friday; Sunday to come' },
      days.map(function (d, i) {
        return h('span', { key: i, className: 'mc-strip__cell' },
          d === '-' ? h('span', { className: 'mc-strip__none' }, '–') : h('span', { className: 'mc-delta mc-delta--' + (d === 'y' ? 'good' : 'bad') }, h(P.Icon, { name: d === 'y' ? 'check' : 'close' })),
          h('span', { className: 'mc-strip__day' }, names[i]));
      }));
  }
  function legend(rows) {
    return h('ul', { className: 'mc-legend' }, rows.map(function (r) {
      return h('li', { key: r[1], className: 'mc-legend__row' }, h('span', { className: 'mc-legend__key mc-key-' + r[0] }), h('span', null, r[1]),
        h('span', { className: 'mc-legend__val' }, r[2]), h('span', { className: 'mc-legend__share' }, r[3]));
    }));
  }

  // ---- anatomy -----------------------------------------------------------------------------------------------
  var PARTS = [
    ['A', 'Icon', 'opt', 'What the figure is about, on the left of the title (IconTile sm or a plain icon). The same icon for the same subject everywhere.'],
    ['B', 'Title', 'req', 'What is measured: a short noun phrase in sentence case ("Tasks done"). Links to the details when the card opens something.'],
    ['C', 'Info', 'opt', 'How the figure is calculated (ContextualHelp). Only when the title alone can be misread.'],
    ['D', 'Period filter', 'opt', 'A small Select ("2025", "Last 30 days"). Only when this card’s period differs from the page’s; otherwise the page filter drives every card.'],
    ['E', 'Actions', 'opt', 'A "More" menu: open details, export the data. Never the card’s main action.'],
    ['F', 'Context line', 'req', 'The scope or the period the figure covers ("Last 30 days", "All projects"). Every figure says what it covers.'],
    ['G', 'Value', 'req', 'The figure: the largest text in the card, tabular numbers, never colored. Missing data shows "–", never 0.'],
    ['H', 'Unit or target', 'opt', 'A unit after the value ("hrs", "GB") or the target it counts toward ("/ 147"), smaller and muted.'],
    ['I', 'Status', 'opt', 'A status badge with an icon at the end of the value row ("24%", "Nearly full").'],
    ['J', 'Change', 'opt', 'Arrow + amount in the good, bad or neutral color, then what it is compared with ("vs last month"). Good or bad, never up or down.'],
    ['K', 'Visual', 'by type', 'The type’s one visual: sparkline, progress bar, gauge, split bar or donut, ranked rows. Under the figure; beside it when the card is two columns wide.'],
    ['L', 'Footer note', 'opt', 'One line: a status message, the source, when it was updated, the threshold rule.']
  ];
  function mark(l) { return h('span', { className: 'mc-mark', 'aria-hidden': 'true' }, l); }
  function box(cls, l) { return h('span', { className: 'mc-wire__box' + (cls ? ' mc-wire__box--' + cls : '') }, l ? mark(l) : null); }
  function zone(name, rows) { return h('div', { className: 'mc-wire__zone' }, h('span', { className: 'mc-wire__zone-name' }, name), rows); }
  function row(kids) { return h('div', { className: 'mc-wire__row' }, kids); }
  var wire = h('div', { className: 'mc-wire', role: 'img', 'aria-label': 'Anatomy of a metric card, parts A to L' },
    zone('Header', [row([box(null, 'A'), box('title', 'B'), box(null, 'C'), h('span', { key: 'p', className: 'mc-wire__push' }), box('title', 'D'), box(null, 'E')].map(k)), row([box('title', 'F')].map(k))].map(k)),
    zone('Body', [row([box('value', 'G'), box(null, 'H'), h('span', { key: 'p', className: 'mc-wire__push' }), box(null, 'I')].map(k)), row([box('title', 'J')].map(k)), row([box('viz', 'K')].map(k))].map(k)),
    zone('Footer', [row([box('grow', 'L')].map(k))].map(k)));
  function k(el, i) { return React.cloneElement(el, { key: i }); }
  var partsTable = h('table', { className: 'mc-table' },
    h('thead', null, h('tr', null, h('th', null, ''), h('th', null, 'Part'), h('th', null, ''), h('th', null, 'Rule'))),
    h('tbody', null, PARTS.map(function (p) {
      return h('tr', { key: p[0] }, h('td', null, mark(p[0])), h('td', null, p[1]),
        h('td', { className: p[2] === 'req' ? 'mc-req' : 'mc-opt' }, p[2] === 'req' ? 'Required' : p[2] === 'opt' ? 'Optional' : 'By type'), h('td', null, p[3]));
    })));

  // ---- states ------------------------------------------------------------------------------------------------
  var STATES = [
    card({ icon: 'image-b', title: 'Assets added', context: 'Last 30 days', body: frag(h(P.Skeleton, { width: '96px', height: '32px' }), h(P.Skeleton, { width: '160px', height: '16px' }), h(P.Skeleton, { height: '32px' })) }),
    card({ icon: 'image-b', title: 'Assets added', context: '2024', footer: 'No assets were added in 2024', body: figure({ value: '–', empty: true }) }),
    card({ icon: 'image-b', title: 'Assets added', context: 'Last 30 days', body: frag(figure({ value: '–', empty: true }),
      h(P.Notice, { tone: 'danger', actions: h(P.Button, { size: 'xs', icon: 'refresh' }, 'Try again') }, 'Couldn’t load the figures.')) }),
    card({ icon: 'image-b', title: 'Assets added', context: 'Last 30 days', footer: 'Last updated 3 days ago', body: frag(figure({ value: '1,284', badge: h(P.Badge, { tone: 'waiting', icon: 'clock' }, 'Out of date') }), change('12.5%', 'good', 'up', 'vs previous 30 days')) })
  ];
  var STATE_NAMES = ['Loading', 'No data', 'Error', 'Out of date'];

  // ---- the page ----------------------------------------------------------------------------------------------
  function section(title, lead, kids) {
    return h('section', { className: 'mc-section' }, h('h2', { className: 'mc-h2' }, title), lead ? h('p', { className: 'mc-lead' }, lead) : null, kids);
  }
  function chooser() {
    return h('table', { className: 'mc-table' },
      h('thead', null, h('tr', null, h('th', null, '#'), h('th', null, 'When the data is…'), h('th', null, 'Use'), h('th', null, 'Visual (K)'))),
      h('tbody', null, TYPES.map(function (t) {
        var viz = ['None', 'Sparkline: line, area or bars', 'Progress bar', 'Gauge with zones', 'Split bar + legend, or donut', 'Two figures + split bar', 'Ranked rows, ranked bars or record rows', 'Metric group', 'The person2019s picture in the card', 'One bar or mark per day', 'A month calendar', 'A short table'] [t.n - 1];
        return h('tr', { key: t.n }, h('td', null, t.n), h('td', null, t.data), h('td', { className: 'mc-req' }, t.name), h('td', null, viz));
      })));
  }
  var page = h('main', { className: 'mc-doc' },
    h('header', { className: 'mc-section' }, h('h1', { className: 'mc-h1' }, 'Metric cards'),
      h('p', { className: 'mc-lead' }, 'One anatomy for every metric card, twelve types chosen by the shape of the data, five layouts, and the same states and filter everywhere. Drawn with the Platform: Panel, Badge, Sparkline, ProgressBar, Gauge, PieChart, IconTile, Avatar, Count, Select.')),
    section('Anatomy', 'Every type uses the same parts in the same places. A type only fills the visual slot (K); everything else is shared.',
      h('div', { className: 'mc-anatomy' }, wire, partsTable)),
    section('Rules for every card', null, h('ul', { className: 'mc-rules' },
      ['One subject per card. Comparison and Summary are the only types with more than one figure.',
       'The value is always the largest text. Every card in a row uses the same value size and the same parts, so the rows line up.',
       'Color says good or bad: the change and the status carry it, with an arrow or an icon; the value, the title and the visual stay neutral.',
       'Each card sets its direction of good: higher is better (tasks done), lower is better (failed imports), or neither (files).',
       'Large numbers are shortened (12.5K, 1.8M) with two to three significant digits; the full number is in the tooltip and the accessible name.',
       'The whole card is one link only when it opens one place (its details). Other actions go in the More menu.',
       'The period is set once for the page. A card shows its own period filter only when its period differs from the page’s.',
       'The same metric for each dimension (each project, each region) is the same type repeated in a row, never a new type.'
      ].map(function (t, i) { return h('li', { key: i }, t); }))),
    section('Which type for which data', 'Pick by the shape of the data, not by the look.', chooser()),
    TYPES.map(function (t) {
      return h('section', { key: t.n, className: 'mc-type' },
        h('div', { className: 'mc-type__head' }, h('span', { className: 'mc-type__num' }, String(t.n).padStart(2, '0')), h('h3', { className: 'mc-h3' }, t.name), h('span', { className: 'mc-type__data' }, t.data)),
        h('p', { className: 'mc-p' }, t.when),
        h('div', { className: 'mc-grid' + (t.wide ? ' mc-grid--3' : '') }, t.cards.map(k)));
    }),
    section('Layouts', 'Five arrangements of the same parts. The type decides what the card shows; the layout decides how much room it takes. One layout per row.',
      h('div', { className: 'mc-grid' },
        layoutBox('Stacked (default)', 'Every type. Header, then the value, then the visual.', TYPES[0].cards[0]),
        layoutBox('Beside', 'Trend, Gauge and Breakdown in a card two columns wide: the visual at the end, beside the figure.',
          card({ icon: 'image-b', title: 'Assets added', context: 'Last 30 days', beside: true, body: frag(h('div', { className: 'mc-type' }, figure({ value: '1,284' }), change('12.5%', 'good', 'up', 'vs previous 30 days')),
            h(P.Sparkline, { values: [38, 41, 40, 44, 47, 45, 52, 49, 55, 58, 54, 61], variant: 'area', size: 'fill', showLast: true, label: 'Assets added per day' })) })),
        layoutBox('Inline', 'Value only, when the context is short: the context sits beside the value.',
          card({ icon: 'document', title: 'New cases', body: figure({ value: '8', unit: 'This month' }) })),
        layoutBox('Tile', 'A compact row of counts that each open a list: no header, the title before the value.',
          h('div', { className: 'mc-tiles' }, tile('Cases to assign', '12'), tile('Scheduled hearings', '20'))),
        layoutBox('Icon start', 'Value only, in a list of steps or a funnel: a large icon tile before the value and title.',
          h('div', { className: 'mc-tiles' }, iconStart('upload', 'blue', '5,050', 'Surveys sent'), iconStart('visibility', 'purple', '1,027', 'Surveys opened'), iconStart('circle-check', 'green', '610', 'Completed')))),
    ),
    section('A section of cards', 'Several cards of one type about one subject sit in a Panel that names the group: the council members, the team. Two frames deep, never three.',
      h(P.Panel, { title: 'Council members', description: '2025 · active cases', actions: period('2025') },
        h('div', { className: 'mc-grid mc-grid--row' }, [['H.E. Metropolitan Serapion', 'Presiding', '–','people/p1.svg'], ['Fr. Mauritius Mikhail', 'Secretary', '2', 'people/p3.svg'], ['Fr. Gawargious Kotta', 'Member', '5', 'people/p1.svg'], ['Fr. Bishoy Bastawros', 'Member', '2', 'people/p3.svg']].map(function (p) {
          return h(React.Fragment, { key: p[0] }, personInside(p[0], p[1], p[3], p[2], 'active'));
        })))),
    section('Card styles', 'Plain is the default. A card can take a style from the data colors (never new colors): an edge, a soft fill, a solid fill, or a gradient between two data colors. Filled and gradient cards turn every text white. One style per row.',
      h('div', { className: 'mc-grid' }, [['Plain (default)', ''], ['Edge', 'mc-style--edge'], ['Soft', 'mc-style--soft'], ['Filled', 'mc-style--filled'], ['Gradient', 'mc-style--gradient']].map(function (s) {
        return h('div', { key: s[0], className: 'mc-type' }, h('span', { className: 'mc-type__data' }, s[0]),
          card({ className: s[1] || undefined, icon: 'field-currency', title: 'Sales revenue', context: 'This month', body: frag(figure({ value: '$1.77M' }), change('15%', s[1] === 'mc-style--filled' || s[1] === 'mc-style--gradient' ? 'neutral' : 'good', 'up', 'vs last month')) }));
      }))),
    section('Coverage of the samples', 'Every sample card sent so far, and the type and layout it becomes in Plenix.', coverage()),
    section('States', 'The same four states in every type. The header always stays, so people know which card is loading or failed.',
      h('div', { className: 'mc-grid' }, STATES.map(function (c, i) { return h('div', { key: i, className: 'mc-type' }, h('span', { className: 'mc-type__data' }, STATE_NAMES[i]), c); }))),
    section('Period filter', 'When one card needs its own period, its filter sits in the header, before the More menu. The context line then says the scope only.',
      h('div', { className: 'mc-grid' },
        card({ icon: 'image-b', title: 'Assets added', context: 'Library', filter: period('2025'), body: frag(figure({ value: '14,920' }), change('8.2%', 'good', 'up', 'vs 2024'),
          h(P.Sparkline, { values: [980, 1040, 1100, 1210, 1190, 1260, 1300, 1250, 1320, 1400, 1380, 1290], variant: 'bar', size: 'fill', label: 'Assets added per month, 2025' })) }))),
    section('A row of cards', 'Cards in a row share the type’s height and value size. Most important first, at most four to six in a row.',
      h('div', { className: 'mc-grid mc-grid--row' }, TYPES[0].cards.concat([TYPES[2].cards[0]]).map(k)))
  );
  ReactDOM.createRoot(document.getElementById('root')).render(h(P.ThemeProvider || React.Fragment, null, page));
})();
