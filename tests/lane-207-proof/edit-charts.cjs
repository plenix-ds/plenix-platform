const fs=require('fs');function edit(file,changes){let s=fs.readFileSync(file,'utf8');for(const[a,b]of changes){if(s.split(a).length!==2)throw Error(file+' unmatched or repeated '+a);s=s.replace(a,b)}fs.writeFileSync(file,s)}
edit('platform/charts/gauge.css',[
['fill and the threshold bands take their data-viz steps (data-plx-dataviz). */','fill and the threshold bands take their data-viz steps (data-plx-dataviz). Size belongs to the meter itself;\n   its exclusive size classes and data-viz fill assign noninheriting state values, each property declared once. */\n@property --plx-state-gauge-width{syntax:"*";inherits:false;}\n@property --plx-state-gauge-fill-stroke{syntax:"*";inherits:false;}'],
['inline-size:var(--plx-comp-gauge-width-md);','inline-size:var(--plx-state-gauge-width,var(--plx-comp-gauge-width-md));'],
['.plx-gauge--sm .plx-gauge__meter{inline-size:var(--plx-comp-gauge-width-sm);}','.plx-gauge__meter--sm{--plx-state-gauge-width:var(--plx-comp-gauge-width-sm);}'],
['.plx-gauge--lg .plx-gauge__meter{inline-size:var(--plx-comp-gauge-width-lg);}','.plx-gauge__meter--lg{--plx-state-gauge-width:var(--plx-comp-gauge-width-lg);}'],
['--plx-comp-gauge-fill-stroke:var(--plx-comp-chart-mark-default-color);stroke:var(--plx-comp-gauge-fill-stroke);','stroke:var(--plx-state-gauge-fill-stroke,var(--plx-comp-chart-mark-default-color));'],
['{--plx-comp-gauge-fill-stroke:var(--plx-comp-data-color);}','{--plx-state-gauge-fill-stroke:var(--plx-comp-data-color);}']]);
edit('platform/charts/Gauge.jsx',[
['     Static: it has no keyboard stop','     The meter carries its own size class; no root selector sizes nested parts.\n     Static: it has no keyboard stop'],
['className="plx-gauge__meter"','className={cx(\'plx-gauge__meter\', \'plx-gauge__meter--\' + s)}']]);
edit('platform/charts/pie-chart.css',[
['(the data font) and its label. Every value is a --plx-comp-pie-chart-* token on an existing role. */','(the data font) and its label. Every value is a --plx-comp-pie-chart-* token on an existing role.\n   Half-ring center parts carry their own variant; the label baseline has one assignment per condition. */\n@property --plx-state-pie-chart-center-baseline{syntax:"*";inherits:false;}'],
['.plx-pie-chart__center-label{dominant-baseline:hanging;','.plx-pie-chart__center-label{dominant-baseline:var(--plx-state-pie-chart-center-baseline,hanging);'],
['.plx-pie-chart--half .plx-pie-chart__center-label{dominant-baseline:text-after-edge;}','.plx-pie-chart__center-label--half{--plx-state-pie-chart-center-baseline:text-after-edge;}'],
['.plx-pie-chart--half .plx-pie-chart__center-value{','.plx-pie-chart__center-value--half{']]);
edit('platform/charts/PieChart.jsx',[
['     Hover a slice:','     Half-ring center parts carry their own variant classes, so nested chart instances stay independent.\n     Hover a slice:'],
['className="plx-pie-chart__center-value"','className={cx(\'plx-pie-chart__center-value\', half && \'plx-pie-chart__center-value--half\')}'],
['className="plx-pie-chart__center-label"','className={cx(\'plx-pie-chart__center-label\', half && \'plx-pie-chart__center-label--half\')}']]);
