(function () {
  var React = window.React, P = window.Plenix, h = React.createElement, M = P.MetricCard;
  function year() { return h(P.Select, { size: 'sm', 'aria-label': 'Year', defaultValue: '2025', options: [{ value: '2025', label: '2025' }, { value: '2024', label: '2024' }] }); }
  function more() { return [h(P.MenuItem, { key: 1, icon: 'open' }, 'Open details'), h(P.MenuItem, { key: 2, icon: 'download-alt' }, 'Export data')]; }
  var up = function (a, v) { return { amount: a, direction: 'up', versus: v }; };
  var down = function (a, v) { return { amount: a, direction: 'down', versus: v }; };
  function row(title, cards, wide) { return h('section', { className: 'plx-stack' }, h('h2', { className: 't-h' }, title), h('div', { className: 't-grid' + (wide ? ' t-grid--wide' : '') }, cards.map(function (c, i) { return React.cloneElement(c, { key: i }); }))); }
  var page = h('main', { className: 't-doc' },
    row('Value', [
      h(M, { icon: 'checklist', title: 'Open tasks', context: 'All projects', info: 'Tasks not marked done.', menu: more(), value: '128', change: up('12', 'since last week'), goodWhen: 'down' }),
      h(M, { icon: 'folder', title: 'Files', context: 'Shared with you', value: '2,480', change: up('4.1%', 'since last month'), goodWhen: 'up', href: '#files' }),
      h(M, { icon: 'alert', title: 'Open bugs', context: 'All projects', value: '130', status: { tone: 'waiting', icon: 'warning', label: 'Needs attention' }, footer: 'Healthy under 100 · critical from 300' })
    ]),
    row('Trend', [
      h(M, { type: 'trend', icon: 'image-b', title: 'Assets added', context: 'Last 30 days', value: '1,284', change: up('12.5%', 'vs previous 30 days'), goodWhen: 'up', trend: [38, 41, 40, 44, 47, 45, 52, 49, 55, 58, 54, 61], footer: 'Updated 5 minutes ago' }),
      h(M, { type: 'trend', icon: 'clock', title: 'Hours logged', context: 'This week', value: '32.5', unit: 'hrs', change: down('2.5 hrs', 'vs last week'), goodWhen: 'up', trend: [6.5, 7, 8, 5.5, 5.5, 0, 0], trendVariant: 'bar' }),
      h(M, { type: 'trend', layout: 'beside', icon: 'field-currency', title: 'Total revenue', context: 'This month', value: '$98,450', change: up('12.5%', 'from last month'), goodWhen: 'up', trend: [60, 52, 40, 48, 70, 90, 80], trendVariant: 'line' })
    ]),
    row('Progress', [
      h(M, { type: 'progress', icon: 'briefcase', title: 'Tasks done', context: 'Kitchen renovation', value: '36', target: '147', progress: { value: 36, max: 147 }, status: { tone: 'active', label: '24%' }, footer: 'On pace to finish by Nov 30' }),
      h(M, { type: 'progress', icon: 'checklist', title: 'Granted vs submitted', context: '2025', filter: year(), rows: [{ id: 'a', label: 'Annulments (both parties)', detail: '18 / 24', value: 18, max: 24, tone: 'good' }, { id: 'b', label: 'Annulments (one party)', detail: '6 / 8', value: 6, max: 8, tone: 'good' }, { id: 'c', label: 'Petitions denied', detail: '8 / 32', value: 8, max: 32, tone: 'bad' }] })
    ], true),
    row('Gauge, breakdown, comparison', [
      h(M, { type: 'gauge', icon: 'database', title: 'Storage used', context: 'Library · 1 TB', gauge: { value: 86, format: function (v) { return v + '%'; }, label: 'of 1 TB', thresholds: [{ value: 80, level: 'warning', label: 'Nearly full' }, { value: 95, level: 'critical', label: 'Full' }] } }),
      h(M, { type: 'breakdown', icon: 'chart', title: 'Tasks by status', context: 'All projects', value: '278', unit: 'tasks', parts: [{ id: 't', label: 'To do', value: 145 }, { id: 'p', label: 'In progress', value: 72 }, { id: 'r', label: 'Review', value: 39 }, { id: 'd', label: 'Done', value: 22, color: 'green' }] }),
      h(M, { type: 'breakdown', breakdown: 'donut', icon: 'person', title: 'Applicants by gender', context: '2025', filter: year(), value: '60', unit: 'applicants', parts: [{ id: 'f', label: 'Female', value: 33 }, { id: 'm', label: 'Male', value: 27 }] }),
      h(M, { type: 'breakdown', breakdown: 'ranges', icon: 'clock', title: 'Duration before divorce', context: '2025 · 60 cases', parts: [{ id: 1, label: '0–5 years', detail: '23 cases', value: 23 }, { id: 2, label: '6–10 years', detail: '21 cases', value: 21 }, { id: 3, label: '11–15 years', detail: '11 cases', value: 11 }, { id: 4, label: '16+ years', detail: '5 cases', value: 5 }] }),
      h(M, { type: 'comparison', icon: 'checklist', title: 'Done vs open', context: 'This sprint', compare: [{ label: 'Done', value: '29' }, { label: 'Open', value: '67' }] })
    ]),
    row('List and summary', [
      h(M, { type: 'list', icon: 'star', title: 'Most active projects', context: 'Last 30 days', items: [{ id: 1, label: 'Kitchen renovation', value: 471, icon: 'briefcase', color: 'blue' }, { id: 2, label: 'Brand refresh', value: 427, icon: 'briefcase', color: 'purple' }, { id: 3, label: 'Q4 launch', value: 383, icon: 'briefcase', color: 'green' }] }),
      h(M, { type: 'list', list: 'bars', icon: 'settings-users', title: 'Case load by member', context: '2025', items: [{ id: 1, label: 'Fr. Gawargious Kotta', value: '14' }, { id: 2, label: 'Fr. Youhana Ibrahim', value: '12' }, { id: 3, label: 'Fr. Boules Mikhail', value: '10' }] }),
      h(M, { type: 'list', list: 'records', icon: 'checklist', title: 'Overdue tasks', context: 'Assigned to you', items: [{ id: 1, label: 'Fix the upload limit', href: '#t1', status: { tone: 'negative', icon: 'alert', label: '5 days' } }, { id: 2, label: 'Review brand guide', status: { tone: 'waiting', icon: 'clock', label: '2 days' } }] }),
      h(M, { type: 'summary', icon: 'calendar', title: 'Today', context: 'Mon, Oct 19', metrics: [{ value: '5', label: 'Tasks due' }, { value: '6.5', unit: 'hrs', label: 'Logged' }, { label: 'Meetings' }] })
    ]),
    row('Person, week, month, table', [
      h(M, { type: 'person', person: { name: 'Maya Chen', role: 'Designer', gender: 'female' }, value: '12', unit: 'open tasks', change: up('3', 'since last week'), goodWhen: 'none' }),
      h(M, { type: 'person', person: { name: 'Daniel Okafor', role: 'Sales lead' }, value: '$48.2K', unit: 'this quarter', progress: { value: 80 }, footer: 'Quota $60K' }),
      h(M, { type: 'week', icon: 'clock', title: 'Hours logged', context: 'This week', value: '35.5', unit: 'hrs', days: [7, 8, 9, 6, 5.5, 0, null] }),
      h(M, { type: 'week', week: 'marks', icon: 'calendar', title: 'Hours goal hit', context: 'This week · 9.5 hrs a day', value: '4', target: '7 days', days: [true, false, true, true, false, true, null] }),
      h(M, { type: 'month', icon: 'calendar', title: 'Days worked', context: 'October 2026', value: '11', target: '22 work days', month: { year: 2026, month: 10, levels: [2, 3, 2, 0, 2, 3, 1, 2, 2, 3, 0, 2, 1], today: 19 }, footer: 'Darker: more hours' }),
      h(M, { type: 'table', icon: 'clock', title: 'Hours by project', context: 'This month', value: '128', unit: 'hrs', table: { columns: [{ title: 'Project', field: 'p', rowLabel: true }, { title: 'Hours', field: 'h', align: 'right', headerAlign: 'right' }], data: [{ id: 1, p: 'Kitchen renovation', h: '46' }, { id: 2, p: 'Brand refresh', h: '38' }, { id: 3, p: 'Q4 launch', h: '29' }] } })
    ]),
    row('Layouts', [
      h(M, { layout: 'inline', icon: 'document', title: 'New cases', context: 'This month', value: '8' }),
      h(M, { layout: 'tile', title: 'Cases to assign', value: '12', href: '#assign' }),
      h(M, { layout: 'icon-start', icon: 'upload', title: 'Surveys sent', value: '5,050' })
    ]),
    row('Styles', ['plain', 'edge', 'soft', 'filled', 'gradient'].map(function (a) {
      return h(M, { appearance: a, icon: 'field-currency', title: 'Sales revenue', context: 'This month', menu: more(), value: '$1.77M', change: up('15%', 'vs last month'), goodWhen: 'up' });
    })),
    row('States', [
      h(M, { state: 'loading', icon: 'image-b', title: 'Assets added', context: 'Last 30 days' }),
      h(M, { state: 'empty', icon: 'image-b', title: 'Assets added', context: '2024', emptyText: 'No assets were added in 2024' }),
      h(M, { state: 'error', icon: 'image-b', title: 'Assets added', context: 'Last 30 days', onRetry: function () {} }),
      h(M, { state: 'stale', icon: 'image-b', title: 'Assets added', context: 'Last 30 days', value: '1,284', footer: 'Last updated 3 days ago' })
    ])
  );
  ReactDOM.createRoot(document.getElementById('root')).render(page);
})();
