// node emit.js → plan.json + plan.md
const fs = require('fs');
const G = require('./gen.js');
const { plan, waves, byKind, byRole, T, filesOf, errors } = G;
if (errors.length) { console.error('fix errors first'); process.exit(1); }

const WAVE0 = {
  title: 'Wave 0: the parts system (one writer, before any lane starts; no leaves)',
  why: 'inventory.js, inventory-docs.js, the *-labs.js files, ds-sample-*.css, components.tokens.json, web-native-map.json, platform/index.js and platform.css are shared by every lane. Each lane instead owns its own part files; generators flatten them, and only the integrator commits the generated results.',
  steps: [
    'platform/design-system/parts/ (new folder). A lane owns wNNL.records.js, wNNL.labs.js, wNNL.docs.js and wNNL.css (NN = wave, L = lane A/B/C), and nothing else in the folder.',
    'parts/wNNL.records.js: DSParts.records.push(function (H) { var h = H.h, P = H.P, box = H.box, row = H.row, eachV = H.eachV /* … */; return [ { id, sec, sub, leaf, plenix, src, css, covers, variantPages, examples, icon, … } ]; }); — variantPages and the icon live in the record (no edits to the ICON map, no add-pages.js into inventory.js).',
    'parts/wNNL.labs.js: if (window.DS && DS.registerLab) { DS.registerLab(\'<record id>\', spec); … } — the guard lets the Node loaders (check-spec, build-packages, build-native-guidance) read the bundle without a DOM.',
    'parts/wNNL.docs.js: DSParts.docs.push({ \'<record id>\': { purpose, anatomy, behavior, a11y, content } });',
    'parts/wNNL.css: the lab specimen frames for that lane (tokens only, no numbers), as ds-sample-<group>.css today.',
    'build-spec-parts.js (repo root, new): concatenates parts/*.records.js, *.labs.js, *.docs.js in name order into platform/design-system/spec-parts.js (each part wrapped in try/catch that logs the part name), and parts/*.css into ds-sample-parts.css. Deterministic; run by build-app.js.',
    'inventory.js (one edit): a HELPERS object with the closure helpers (h, P, S, W, noop, use, row, stack, box, surface, onAccent, TONES, cap, each, eachV, q, fieldStates, FIELD_STATES, OPTS, ROWS, TREE, FOPTS, header, A, C, M, F, D, m); before the defaults loop: (window.DSParts ? DSParts.records : []).forEach(function (f) { R.push.apply(R, f(HELPERS)); });',
    'inventory-docs.js (one edit, at the end): (window.DSParts ? DSParts.docs : []).forEach(function (d) { Object.assign(window.DSDocs, d); });',
    'index.html: <script src="spec-parts.js?v=…"> after layout-lab.js and before inventory-taxonomy.js (defines window.DSParts = {records:[], docs:[]} first); <link> ds-sample-parts.css. component-lab.js frame srcdoc: add ds-sample-parts.css to its stylesheet list.',
    'check-spec.js, build-packages.js (line 196 list), build-native-guidance.js: load spec-parts.js before inventory.js.',
    'Exports: each lane owns platform/exports/wNNL.js (export { X } from \'../components/X/X.jsx\'; …) and platform/exports/wNNL.css (@import url("../components/X/x.css"); …). build-exports.js (new) rewrites one GENERATED block in platform/index.js and one in platform/platform.css (between /* BEGIN library parts (generated) */ and /* END */ markers) as flat lines from those files, so spec.js (css from platform.css imports) and check-system (missing stylesheet) keep working unchanged.',
    'Tokens: build-tokens.js and platform/tokens/build.json accept a glob set ("components/*.tokens.json", also "semantic/*.tokens.json", "reference/*.tokens.json") in name order; each new component owns platform/tokens/components/<name>.tokens.json; foundations own platform/tokens/semantic/<topic>.tokens.json. components.tokens.json itself is never edited by a lane.',
    'Native map: build-native-guidance.js also reads platform/standards/web-native-map.d/*.json (each lane owns wNNL.json) and merges it with web-native-map.json, so every new web record gets its iOS/Android counterpart without a shared edit.',
    'Guidance: lanes never edit inventory-guidance.js (23k lines). A record\'s own fields win over guidance already; the integrator runs tools/prune-guidance.js (new) once per wave to drop the keys that now have a record.',
    'Census: tools/library-census.js reads plan.json and reports, per lane, which leaves are done (record or covers exists, src resolves, export public, lab registered when it has variant cards, variant pages present, native map present).',
    'Packages: build-packages.js runs every build-packages.d/*.js step (one loop added here), so the wave-15 package lanes add files instead of editing build-packages.js.',
    'Ports: lane A/B/C use LABS_PORT 8831/8832/8833 and their own serve ports for screenshots.',
    'Generated files (spec-parts.js, ds-sample-parts.css, the index.js/platform.css blocks, token CSS, tokens.index.json, dist/*, usage.js) are rebuilt locally by any lane for testing but committed only by the integrator, from a clean worktree (parallel-sessions rule).'
  ],
  integrator: [
    'After the three lanes of a wave report done: run build-spec-parts.js, build-exports.js, build-tokens.js, build-app.js, check-system (also with platform/design-system moved aside, for CI), check-spec, LABS_ONLY=<the wave\'s labs> labs.test.js, prune-guidance, census.',
    'Release the wave as one version (next version from the highest CHANGELOG entry; next free batch number from the work log), deploy from the clean worktree, tag, confirm CI green. The owner reviews live.'
  ]
};

const RECIPE = {
  component: ['platform/components/<Name>/<Name>.jsx with the standard header comment (Summary, Usage, Props, Behavior, Notes) — the spec reads overview and API from it; strings prop for every word; forwardRef where it wraps a control',
    '<name>.css with plx-<name> BEM classes, every value a --plx-comp-* token declared in platform/tokens/components/<name>.tokens.json (node tokenize-component.js <css> for a first pass); no raw values, no inline styles, 4px grid, focus = border color only, logical properties',
    'exported through platform/exports/wNNL.js + .css', 'a record in parts/wNNL.records.js: canonical sec/sub/leaf, plenix, src, css, level, interaction, aliases, use, avoid, related, map (Carbon, Atlassian, Material 3, Fluent 2, Polaris, Spectrum), covers (its variant and duplicate leaves), examples, variantPages (one per variant card, name = card name)',
    'docs in parts/wNNL.docs.js (purpose, anatomy, behavior pointer/keyboard/focus/responsive/motion/loading/error, a11y), moved from its inventory-guidance.js entry', 'a lab in parts/wNNL.labs.js (DS.registerLab: sizes, variants, states, content, props with a cat from the labs test MARK list, token(), html() with real classes and no style=)',
    'native counterparts in platform/standards/web-native-map.d/wNNL.json', 'done = node --check, check-system, check-spec, LABS_ONLY=<id> LABS_PORT=<lane port> node tests/labs.test.js ok, one screenshot of its page light + dark'],
  pattern: ['as component, under platform/patterns/<Name>/, composed only of Platform components (no new primitives inside a pattern; a missing primitive is its own component task first)', 'the lab covers the pattern\'s own tokens (spacing, regions); its variant pages show the compositions', 'done = as component'],
  extend: ['edit the existing component in place: the new prop/variant documented in its header comment, its CSS on (new) component tokens, existing behavior and snapshots unchanged', 'give the leaf its own record in parts/wNNL.records.js (home = the leaf, same src as the existing record) with examples and variantPages for the new variants; when the existing lab lives in a shared *-labs.js file, the lane re-registers it from its own labs part (spec-parts.js loads after every *-labs.js): DS.registerLab(id, Object.assign({}, DS.labs[id], { variants: DS.labs[id].variants.concat([...]) })), never editing the shared file',
    'covered-elsewhere and duplicate leaves: a thin record (home = the leaf) with plenix/src of the existing code, examples, use/avoid, related to the main record; no code change', 'done = check-system, check-spec, labs test for the touched lab, screenshot'],
  foundation: ['code in platform/system (CSS), platform/utils or platform/hooks (JS), platform/providers (context), or platform/tokens/semantic|reference/<topic>.tokens.json; exported if JS', 'a rules page: a record with level Foundation, guide { render } or examples drawn with Platform components, and the rules as use/avoid', 'a foundation task never edits the components that will adopt it: adoption is part of that component\'s extend task (or a later adoption task)', 'where it is a rule, a check-system rule (check-system.rules/<name>.js, registered by the integrator) or a test', 'done = check-system, check-spec, its test or rule passing, page screenshot'],
  template: ['platform/templates/<Name>/<Name>.jsx (+ css only for region placement, on tokens) built from existing components and patterns; exported; a live demo inside its record\'s examples', 'the 8 existing template records without code (listing-page, content-template, master-detail-workspace, single-pane-workspace, full-screen-workspace, detail-page, home-page, search-results-page) get src in the same wave', 'done = check-system, check-spec, pages render at Narrow/Medium/Wide (reflow test for that page)'],
  package: ['packages/<name>/ built by a build-packages.d/<name>.js step that build-packages.js runs for every file in build-packages.d/ (wave 0 adds that loop, so the lanes never edit build-packages.js)', 'published with the release as @plenix-ds/<name>; a record in 14 Implementation with install and usage', 'done = npm pack dry run, a sample app under packages/<name>/example builds']
};

const NOTCODE = plan.filter((p) => p.notCode).map((p) => ({ leaf: p.leaf, section: p.section, reason: p.note.split(' · ')[0].replace(/^NOT CODE: ?/, '') }));
// de-duplication: duplicates by target, and covered-elsewhere
const dup = {}; plan.filter((p) => p.role === 'duplicate').forEach((p) => { (dup[p.target] = dup[p.target] || { target: p.target, primary: p.duplicateOf, same: [] }).same.push(p.sec + '/' + p.leaf + (/^same as/.test(p.note) ? ' (' + p.note.split(' · ')[0] + ')' : '')); });
const covered = plan.filter((p) => p.role === 'covered-elsewhere').map((p) => ({ leaf: p.sec + '/' + p.leaf, answeredBy: p.recordOf || p.target, note: p.duplicateOf }));
const EXTRA_DEDUPE = [
  ['Popover (overlays) vs Tooltip', 'different: Tooltip stays a non-interactive label; Popover is new (interactive, focusable); Popup and Inline dialog are the same as Popover; Hover card is Popover trigger="hover"'],
  ['Context menu (actions) = Context menu (overlays)', 'one ContextMenu export in Menu.jsx (extend Menu); Dropdown surface is already the action-menu record'],
  ['Stepper (navigation) = Progress tracker = Step progress', 'one ProgressSteps component; Stepper (forms) is different: NumberInput with stepper buttons'],
  ['Presence (content) vs Presence (specialized)', 'different: content/Presence is the avatar dot (Avatar presence); specialized/Presence is who is here now (PresenceBar)'],
  ['Annotation (data-display) vs Annotation (specialized)', 'different: a chart annotation (chart-parts) vs pins on an image with comments (ImageAnnotation)'],
  ['Video / Audio (content) and Video player / Audio player / Captions and transcripts', 'one MediaPlayer component (video and audio modes)'],
  ['File picker = Asset picker = Media picker', 'one FilePicker pattern with modes'],
  ['User card = Profile card; Resource list = Object list', 'one target each'],
  ['Image gallery (content) vs Asset gallery (specialized)', 'one AssetGallery pattern; Image gallery is its generic image mode'],
  ['Export (actions) = Export (patterns) ⊃ Export workflow; Import (actions) = Import (patterns); Import workflow is the ImportWizard', ''],
  ['Text truncation = Truncate = Clamp; Truncate / expand', 'all Text props (truncate, lines, expandable)'],
  ['Anchored overlay = Floating positioning = Floating positioner; Portal ×2; Scroll lock ×2; Virtualization ×2; Color contrast = Contrast rules', 'one foundation each'],
  ['Brand marks / Logos (taxonomy plural) vs brand-mark covers "Brand mark" / "Logo" (singular)', 'a name mismatch: the existing covers never match the taxonomy; fix the covers names when BrandMark is extended']
];

const leafRows = plan.map((p) => ({ section: p.section, leaf: p.leaf, kind: p.kind, role: p.role, target: p.target, targetKind: p.targetKind,
  duplicateOf: p.role === 'duplicate' ? p.duplicateOf : undefined, coveredBy: p.role === 'covered-elsewhere' ? (p.recordOf || p.target) : undefined,
  notCode: p.notCode, files: p.files, laneFiles: p.laneFiles, dependsOn: p.dependsOn, size: p.size, variants: p.role === 'builds' ? p.variants : undefined,
  note: p.note || undefined, wave: p.wave, lane: p.lane }));
const targets = Object.values(T).map((t) => ({ name: t.name, kind: t.kind, size: t.size, wave: t.wave, lane: t.lane, files: filesOf(t), dependsOn: t.deps, variants: t.variants, note: t.note,
  leaves: plan.filter((p) => p.target === t.name).map((p) => p.sec + '/' + p.leaf + (p.role === 'builds' ? '' : ' (' + p.role + ')')) })).sort((a, b) => a.wave - b.wave || a.lane.localeCompare(b.lane));
function topo(names) { const set = new Set(names), out = [], seen = new Set(); const visit = (n) => { if (seen.has(n)) return; seen.add(n); T[n].deps.forEach((d) => { if (set.has(d)) visit(d); }); out.push(n); }; names.slice().sort().forEach(visit); return out; }
const wavesOut = waves.map((w) => ({ wave: w.wave, leaves: w.leaves, lanes: w.lanes.map((l) => ({ lane: l.lane, leaves: l.leaves, effortPoints: l.effort,
  ownFiles: ['platform/design-system/parts/w' + String(w.wave).padStart(2, '0') + l.lane + '.{records,labs,docs}.js + .css', 'platform/exports/w' + String(w.wave).padStart(2, '0') + l.lane + '.{js,css}', 'platform/standards/web-native-map.d/w' + String(w.wave).padStart(2, '0') + l.lane + '.json']
    .concat([...new Set(l.targets.flatMap((n) => filesOf(T[n])))]),
  targets: topo(l.targets).map((n) => n + ' (' + T[n].kind + ', ' + T[n].size + ')'),
  leafList: plan.filter((p) => p.wave === w.wave && p.lane === l.lane).map((p) => p.sec + '/' + p.leaf) })) }));
const kindTargets = {}; Object.values(T).forEach((t) => { kindTargets[t.kind] = (kindTargets[t.kind] || 0) + 1; });
const sizeTargets = {}; Object.values(T).forEach((t) => { sizeTargets[t.size] = (sizeTargets[t.size] || 0) + 1; });
const out = {
  generated: '2026-10-11', source: 'C:/Users/AdminMan/AppData/Local/Temp/missing.json (486 web leaves with no record of their own)',
  findings: {
    crossSectionCovered: covered.length + ' of the 486 are already answered on another page through a cross-section covers entry (spec.js shows them as "Answered on another page"; strictly 437 leaves are "Not in Plenix yet"); the plan gives each its own thin record',
    existingRecordsWithoutCode: ['listing-page', 'content-template', 'master-detail-workspace', 'single-pane-workspace', 'full-screen-workspace', 'detail-page', 'home-page', 'search-results-page'],
    builtButUnrecorded: ['ColorSwatch (content/Color swatch)', 'ColorPicker (forms/Swatch picker)', 'Button pressed (forms/Toggle button)', 'Dialog size="full" (overlays/Full-screen dialog)', 'NavPane bar and overlay modes (Bottom navigation, Mobile tab bar, Navigation drawer)', 'PanelSplitter (patterns/Resize)', 'platforms-standard.js, build-mobile.js (14 Implementation leaves)', 'tests/a11y.test.js (Accessibility testing)']
  },
  counts: { leaves: plan.length, byKind, byRole, targets: Object.keys(T).length, targetsByKind: kindTargets, targetsBySize: sizeTargets, waves: wavesOut.length },
  kindsMeaning: 'kind of a leaf: what the leaf\'s own task is. A leaf that builds a new target has the target\'s kind; a variant, duplicate or covered leaf is "extend" (of the new or existing target). targetsByKind counts the units of code.',
  notCode: NOTCODE, dedupe: { duplicates: Object.values(dup), coveredElsewhere: covered, notes: EXTRA_DEDUPE.map(([a, b]) => ({ items: a, decision: b })) },
  wave0: WAVE0, recipes: RECIPE, waves: wavesOut, targets, leaves: leafRows
};
fs.writeFileSync('plan.json', JSON.stringify(out, null, 1));

// ---------- plan.md ----------
const L = [];
const P = (s) => L.push(s);
P('# Plenix library plan: the 486 missing web leaves');
P('');
P('Analysis only (no product code). Data: plan.json (every leaf: kind, target, files, dependencies, size, variants, wave, lane). Generated by scratchpad/library/emit.js from data.js, leaves.js, waves.js.');
P('');
P('## Counts');
P('');
P('- Leaves: ' + plan.length + ' · units of code (targets): ' + Object.keys(T).length + ' · waves: 15 (+ wave 0 infrastructure)');
P('- Leaves by kind: ' + Object.entries(byKind).map(([k, v]) => k + ' ' + v).join(' · '));
P('- Leaves by role: ' + Object.entries(byRole).map(([k, v]) => k + ' ' + v).join(' · '));
P('- Targets by kind: ' + Object.entries(kindTargets).map(([k, v]) => k + ' ' + v).join(' · ') + ' · by size: ' + Object.entries(sizeTargets).map(([k, v]) => k + ' ' + v).join(' · '));
P('- ' + out.findings.crossSectionCovered + '.');
P('- Records that exist but have no code (bonus, built in wave 15 with the templates): ' + out.findings.existingRecordsWithoutCode.join(', ') + '.');
P('- Built but without a record of their own: ' + out.findings.builtButUnrecorded.join('; ') + '.');
P('');
P('## Not built as code (' + NOTCODE.length + ')');
P('');
NOTCODE.forEach((n) => P('- ' + n.leaf + ' (' + n.section + '): ' + n.reason));
P('');
P('Each still gets a real record page (guidance, live examples drawn with Platform components). Everything else is code.');
P('');
P('## De-duplication');
P('');
EXTRA_DEDUPE.forEach(([a, b]) => P('- ' + a + (b ? ': ' + b : '')));
P('');
P('Duplicates (one build, one record each, the duplicate a thin record pointing at it):');
P('');
Object.values(dup).forEach((d) => P('- ' + d.target + ' (' + d.primary + '): ' + d.same.join(', ')));
P('');
P('Covered elsewhere (49, records only, no code change):');
P('');
P(covered.map((c) => c.leaf + ' → ' + c.answeredBy).join(' · '));
P('');
P('## Avoiding conflicts: ' + WAVE0.title);
P('');
P(WAVE0.why);
P('');
WAVE0.steps.forEach((s, i) => P((i + 1) + '. ' + s));
P('');
P('Integrator, per wave:');
P('');
WAVE0.integrator.forEach((s) => P('- ' + s));
P('');
P('## Recipe per kind (what done means)');
P('');
P('Reuses the Every Variant recipe (scratchpad/variants/BRIEF.md; memory plenix-variant-pages-program): tokens, an All lab with one --plx-comp-* token per value, a variant page per card, labs.test.js. Lanes edit only their own files.');
P('');
Object.entries(RECIPE).forEach(([k, v]) => { P('### ' + k); P(''); v.forEach((s) => P('- ' + s)); P(''); });
P('## Waves');
P('');
P('Order: dependencies first (a dependency is built in an earlier wave, or earlier in the same lane). Lanes are computed: targets sharing a file or a same-wave dependency stay in one lane; groups go to the lane with the least effort (S=1, M=2, L=4 points, +0.5 per extra leaf). Files never overlap between lanes of a wave (checked).');
P('');
wavesOut.forEach((w) => {
  P('### Wave ' + w.wave + ' — ' + w.leaves + ' leaves');
  P('');
  w.lanes.forEach((l) => {
    P('- **Lane ' + l.lane + '** (' + l.leaves + ' leaves, ' + l.effortPoints + ' pts): ' + l.targets.join(', '));
    P('  - leaves: ' + l.leafList.join(' · '));
  });
  P('');
});
P('## Targets');
P('');
P('| Wave | Lane | Target | Kind | Size | Depends on | Variants | Leaves |');
P('|---|---|---|---|---|---|---|---|');
targets.forEach((t) => P('| ' + t.wave + ' | ' + t.lane + ' | ' + t.name + ' | ' + t.kind + ' | ' + t.size + ' | ' + (t.dependsOn.join(', ') || '—') + ' | ' + (t.variants.join('; ') || '—') + ' | ' + t.leaves.join('; ') + ' |'));
P('');
fs.writeFileSync('plan.md', L.join('\n'));
console.log('written', fs.statSync('plan.json').size, fs.statSync('plan.md').size);
