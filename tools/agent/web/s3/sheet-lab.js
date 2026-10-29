  // History (#557): a past agent's draft, kept as written; its bare icon classes (plx-icon--<name>) stop drawing at icon stage 5c-2.
  // ---- Sheet (<Sheet>): the bottom sheet of a Narrow window, at its two heights, as a task (Cancel and Done) or with Close;
  // drawn in a frame the height of a phone's lower screen, so the large height shows taller than the medium one
  var SH = function (n) { return 'plx-comp-sheet-' + n; };
  DS.registerLab('sheet', {
    name: 'Sheet', title: 'Plenix sheet', file: 'platform/components/Sheet/sheet.css', compPrefix: /^plx-comp-sheet-/,
    store: 'plenix-sheet-lab-tokens',
    sizes: [['medium', 'Medium (about half the window)', '.plx-sheet--medium'], ['large', 'Large (the window less a strip)', '.plx-sheet--large']],
    variants: [['task', 'Task: Cancel and Done'], ['close', 'Close']], states: STATIC, content: [['form', 'A message and a footer']],
    labels: { size: 'Height', variant: 'Header', state: 'State', content: 'Content' },
    defaults: { size: 'medium', variant: 'task', state: 'default', content: 'form' },
    props: [
      { id: 'bg', label: 'Background color', css: ['background-color'], cat: 'color' },
      { id: 'fg', label: 'Text color', css: ['color'], cat: 'color' },
      { id: 'rad', label: 'Top corner radius', css: ['border-top-left-radius', 'border-top-right-radius'], show: 'border-top-left-radius', cat: 'radius', extra: ['0'] },
      { id: 'sh', label: 'Shadow', css: ['box-shadow'], cat: 'shadow' },
      { id: 'h', label: 'Height', css: ['block-size'], show: 'height', cat: 'size' },
      { id: 'band', label: 'Grabber band', css: ['padding-block-start'], show: 'padding-top', cat: 'space', extra: ['0'] },
      { id: 'gth', label: 'Grabber target height', css: ['block-size'], show: 'height', part: '.plx-sheet__grabber', cat: 'size' },
      { id: 'gtw', label: 'Grabber target width', css: ['inline-size'], show: 'width', part: '.plx-sheet__grabber', cat: 'size' },
      { id: 'hh', label: 'Header minimum height', css: ['min-block-size'], show: 'min-height', part: '.plx-sheet__header', cat: 'size' },
      { id: 'hgap', label: 'Header gap', css: ['column-gap'], part: '.plx-sheet__header', cat: 'space' },
      { id: 'hpx', label: 'Header padding left & right', css: ['padding-inline-start', 'padding-inline-end'], show: 'padding-left', part: '.plx-sheet__header', cat: 'space', extra: ['0'] },
      { id: 'hbc', label: 'Header divider color', css: ['border-bottom-color'], part: '.plx-sheet__header', cat: 'color' },
      { id: 'tfs', label: 'Title font size', css: ['font-size'], part: '.plx-sheet__title', cat: 'font-size' },
      { id: 'tfw', label: 'Title font weight', css: ['font-weight'], part: '.plx-sheet__title', cat: 'font-weight' },
      { id: 'bpy', label: 'Body padding top & bottom', css: ['padding-block-start', 'padding-block-end'], show: 'padding-top', part: '.plx-sheet__body', cat: 'space', extra: ['0'] },
      { id: 'bpx', label: 'Body padding left & right', css: ['padding-inline-start', 'padding-inline-end'], show: 'padding-left', part: '.plx-sheet__body', cat: 'space', extra: ['0'] },
      { id: 'fgap', label: 'Gap between footer actions', css: ['column-gap'], part: '.plx-sheet__footer', cat: 'space' },
      { id: 'fpx', label: 'Footer padding left & right', css: ['padding-inline-start', 'padding-inline-end'], show: 'padding-left', part: '.plx-sheet__footer', cat: 'space', extra: ['0'] },
      { id: 'fbc', label: 'Footer divider color', css: ['border-top-color'], part: '.plx-sheet__footer', cat: 'color' }
    ],
    token: function (id, size) {
      switch (id) {
        case 'bg': return SH('background');
        case 'fg': return SH('text');
        case 'rad': return SH('radius');
        case 'sh': return SH('shadow');
        case 'h': return SH(size + '-height');
        case 'band': return SH('band-height');
        case 'gth': return SH('grabber-target-height');
        case 'gtw': return SH('grabber-target-width');
        case 'hh': return SH('header-min-height');
        case 'hgap': return SH('header-gap');
        case 'hpx': return SH('header-padding-inline');
        case 'hbc': return SH('header-border-bottom-color');
        case 'tfs': return SH('title-font-size');
        case 'tfw': return SH('title-font-weight');
        case 'bpy': return SH('body-padding-block');
        case 'bpx': return SH('body-padding-inline');
        case 'fgap': return SH('footer-gap');
        case 'fpx': return SH('footer-padding-inline');
        case 'fbc': return SH('footer-border-top-color');
        default: return null;
      }
    },
    reach: function (full) { var m = /sheet-(medium|large)-height/.exec(full); return m ? 'every ' + m[1] + ' bottom sheet' : 'every bottom sheet'; },
    every: 'every bottom sheet',
    html: function (variant, size, state, extraCls) {
      var task = variant === 'task';
      var head = (task ? BTN('ghost plx-sheet__cancel', 'Cancel') : '') + '<h2 class="plx-sheet__title">Rename collection</h2>'
        + (task ? BTN('primary plx-sheet__done', 'Done') : '<button type="button" tabindex="-1" class="plx-button plx-button--ghost plx-button--icon-only plx-sheet__close" aria-label="Close"><span class="plx-icon plx-icon--close" aria-hidden="true"></span></button>');
      return '<div class="ds-demo-frame ' + DS.sampleClass('block-size', 'var(--plx-ref-size-600px)') + '">'
        + '<div role="dialog" aria-label="Rename collection" class="plx-sheet plx-sheet--' + size + (task ? ' plx-sheet--task' : '') + (extraCls ? ' ' + extraCls : '') + '">'
        + '<button type="button" tabindex="-1" class="plx-sheet__grabber" aria-label="' + (size === 'medium' ? 'Expand sheet' : 'Shrink sheet') + '"></button>'
        + '<div class="plx-sheet__header">' + head + '</div>'
        + '<div class="plx-sheet__body"><p class="plx-dialog__description">Give the collection a name people will recognize.</p></div>'
        + '<div class="plx-sheet__footer">' + BTN('secondary', 'Reset') + '</div></div></div>';
    },
    labelSelector: '.plx-sheet__title',
    parts: { bg: 'A', fg: 'A', rad: 'A', sh: 'A', h: 'A', band: 'B', gth: 'B', gtw: 'B', hh: 'C', hgap: 'C', hpx: 'C', hbc: 'C', tfs: 'C', tfw: 'C', bpy: 'D', bpx: 'D', fgap: 'E', fpx: 'E', fbc: 'E' },
    anchors: { A: { part: null, side: 'left' }, B: { part: '.plx-sheet__grabber', side: 'top' }, C: { part: '.plx-sheet__header', side: 'right' }, D: { part: '.plx-sheet__body', side: 'right' }, E: { part: '.plx-sheet__footer', side: 'bottom' } },
    sections: [['Surface', ['bg', 'fg', 'rad', 'sh', 'h']], ['Grabber', ['band', 'gth', 'gtw']], ['Header', ['hh', 'hgap', 'hpx', 'hbc', 'tfs', 'tfw']], ['Body', ['bpy', 'bpx']], ['Footer', ['fgap', 'fpx', 'fbc']]],
    matrixLabel: 'Sheet values by height and header', matrixColumnWidth: '--plx-ref-size-400px',
    statesHead: 'Heights and headers · every value (click one to inspect it; the dashed outline marks the one shown below)'
  });

