// the last literals: shell widths, the toast duration and the dialog corner in XML now have generated names
const fs = require('fs');
const D = __dirname + '/';
const ed = (f, pairs) => { let s = fs.readFileSync(D + f, 'utf8'); for (const [a, b] of pairs) { if (!s.includes(a)) throw new Error(f + ': ' + a); s = s.split(a).join(b); } fs.writeFileSync(D + f, s); };
const shell = [
  ['.navigationSplitViewColumnWidth(min: 140, ideal: Plenix.Component.navPaneWidth, max: 320)', '.navigationSplitViewColumnWidth(min: Plenix.Shell.shellNavMinWidth, ideal: Plenix.Component.navPaneWidth, max: Plenix.Shell.shellNavMaxWidth)'],
  ['   // 140 to 320: plx-sys-shell-nav-min-width, plx-sys-shell-nav-max-width', ''],
  ['sidebar.minimumThickness = 140   // plx-sys-shell-nav-min-width (no generated name yet)', 'sidebar.minimumThickness = Plenix.Shell.shellNavMinWidth'],
  ['sidebar.maximumThickness = 320   // plx-sys-shell-nav-max-width (no generated name yet)', 'sidebar.maximumThickness = Plenix.Shell.shellNavMaxWidth']
];
ed('ios-sidebars.json', shell);
ed('ios-windows.json', shell.concat([
  ['split.minimumPrimaryColumnWidth = 140   // plx-sys-shell-nav-min-width (no generated name yet)', 'split.minimumPrimaryColumnWidth = Plenix.Shell.shellNavMinWidth'],
  ['split.maximumPrimaryColumnWidth = 320   // plx-sys-shell-nav-max-width (no generated name yet)', 'split.maximumPrimaryColumnWidth = Plenix.Shell.shellNavMaxWidth']]));
ed('android-snackbar.json', [
  ['"views": "setDuration(4000); Snackbar.LENGTH_INDEFINITE for danger"', '"views": "setDuration(PlenixComponent.toastDuration); Snackbar.LENGTH_INDEFINITE for danger (plx-comp-toast-duration)"'],
  ['if (danger) Snackbar.LENGTH_INDEFINITE else 4000)   // 4 s: the web ToastProvider default (no token yet)', 'if (danger) Snackbar.LENGTH_INDEFINITE else PlenixComponent.toastDuration)']]);
ed('android-date-time-pickers.json', [['<item name=\\"cornerSize\\">8dp</item>   <!-- PlenixRadius.radiusDialog8px: XML cannot read the generated Kotlin tokens -->', '<item name=\\"cornerSize\\">@dimen/plx_radius_radius_dialog_8px</item>']]);
console.log('ok');
