// Generates android-alertdialog.json, android-modalbottomsheet.json, android-tooltip.json, android-avatar.json
const fs = require('fs');
const OUT = 'C:/Users/AdminMan/AppData/Local/Temp/claude/D--Documents-Projects-Projects-Applications-Plenix---DAM/633e9d8d-5072-4d7b-9af9-d499099bde09/scratchpad/native/';
const C = (s) => s.replace(/^\n/, '').replace(/\n$/, '').split('\n');
const M3 = (name, url) => ({ follows: 'Material 3: ' + name, followsUrl: url });
const DIALOGS = 'https://m3.material.io/components/dialogs/specs';
const SHEETS = 'https://m3.material.io/components/bottom-sheets/specs';
const TIPS = 'https://m3.material.io/components/tooltips/specs';

const composeText = C(`
// Sans: the DM Sans family (PlenixFonts.SANS), set once in the app theme, e.g.
// val Sans = FontFamily(Font(GoogleFont(PlenixFonts.SANS), fontProvider, FontWeight.Normal), Font(GoogleFont(PlenixFonts.SANS), fontProvider, FontWeight.SemiBold), Font(GoogleFont(PlenixFonts.SANS), fontProvider, FontWeight.Bold))
fun textRole(size: TextUnit, lineHeight: TextUnit, weight: Int) =
    TextStyle(fontFamily = Sans, fontSize = size, lineHeight = lineHeight, fontWeight = FontWeight(weight))`);

const viewsHelpers = C(`
// Views read the same values from the generated plenix.tokens package through three helpers:
fun Context.argb(light: Color, dark: Color): Int {
    val night = (resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES
    return (if (night) dark else light).toArgb()
}
fun Context.px(dp: Dp): Int = (dp.value * resources.displayMetrics.density).roundToInt()
fun TextView.textRole(size: TextUnit, lineHeight: TextUnit, @FontRes font: Int) {
    typeface = ResourcesCompat.getFont(context, font)   // R.font.dm_sans_*: DM Sans (PlenixFonts.SANS) bundled with the app
    setTextSize(TypedValue.COMPLEX_UNIT_SP, size.value)
    TextViewCompat.setLineHeight(this, TypedValue.COMPLEX_UNIT_SP, lineHeight.value)
}`);

// the dialog header band, shared by the alert dialog and the bottom sheet (Compose)
const composeHeader = C(`
/** The Plenix dialog header band: the chrome fill, 48 dp, the title in DM Sans bold, a 1 dp line below. */
@Composable
fun DialogHeader(title: String, trailing: (@Composable () -> Unit)? = null) {
    Row(
        Modifier.fillMaxWidth().background(PlenixColors.surfaceDialogChrome.current())
            .heightIn(min = PlenixPlatform.controlTargetMin)
            .padding(start = PlenixSpace.spaceInsetLg, end = PlenixSpace.spaceInsetSm, top = PlenixSpace.spaceInsetSm, bottom = PlenixSpace.spaceInsetSm),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(title, Modifier.weight(1f).semantics { heading() }, color = PlenixColors.contentDialogChrome.current(),
            style = textRole(PlenixPlatform.textHeadingSize, PlenixPlatform.textHeadingLineHeight, 700))   // plx-comp-dialog-title-font-weight: bold
        trailing?.invoke()
    }
    HorizontalDivider(thickness = 1.dp, color = PlenixColors.borderDialogChrome.current())
}

/** The Plenix dialog footer band: a 1 dp line above, the chrome fill, actions at the end 8 dp apart. */
@Composable
fun DialogFooter(actions: @Composable RowScope.() -> Unit) {
    HorizontalDivider(thickness = 1.dp, color = PlenixColors.borderDialogChrome.current())
    Row(
        Modifier.fillMaxWidth().background(PlenixColors.surfaceDialogChrome.current())
            .padding(horizontal = PlenixSpace.spaceInsetLg, vertical = PlenixSpace.spaceInsetMd),
        horizontalArrangement = Arrangement.spacedBy(PlenixPlatform.dialogActionGap, Alignment.End),
        content = actions,
    )
}`);

/* ---------------------------------------------------------------- AlertDialog */
const alert = {
  'android-overlays|AlertDialog': {
    summary: 'A Plenix alert dialog on Android is a Material 3 dialog (BasicAlertDialog in Compose, MaterialAlertDialogBuilder in Views), kept native in behavior (a modal window, back to dismiss, focus held inside, the title read first by TalkBack) and styled with the Plenix dialog tokens: an 8 dp rounded window on the overlay surface, a filled header band with the title in DM Sans bold, the message in the body, and a filled footer band with the Plenix buttons, over a 50 % black scrim. Material’s default is a 28 dp tonal card with text buttons in one padded column; Plenix keeps Material’s behavior and replaces the look.',
    variants: [
      { name: 'Alert', material: 'AlertDialog with one confirm button', web: 'overlays|Alert dialog', background: 'plx-comp-dialog-background', content: 'plx-comp-dialog-text', border: null,
        compose: 'PlenixAlertDialog(title, message, confirmLabel = "OK", dismissLabel = null)', views: 'MaterialAlertDialogBuilder with setPositiveButton only', use: 'Something the person must read before going on, with one way out.' },
      { name: 'Confirmation', material: 'AlertDialog with confirm and dismiss buttons', web: 'overlays|Confirmation dialog', background: 'plx-comp-dialog-background', content: 'plx-comp-dialog-text', border: null,
        compose: 'PlenixAlertDialog(title, message, confirmLabel = "Publish")', views: 'setPositiveButton and setNegativeButton', use: 'Asking to confirm a significant action before it runs.' },
      { name: 'Destructive confirmation', material: 'AlertDialog with a destructive confirm', web: 'overlays|Destructive confirmation', background: 'plx-comp-dialog-background', content: 'plx-comp-dialog-text', border: null,
        compose: 'PlenixAlertDialog(…, confirmLabel = "Delete", destructive = true)', views: 'The positive button in the danger colors', use: 'Before deleting or discarding something that cannot be brought back.' }
    ],
    anatomy: [
      { part: 'A', name: 'Window', about: 'The rounded dialog surface, centered over the screen.' },
      { part: 'B', name: 'Header band', about: 'A filled band, at least 48 dp tall, with a line below it.' },
      { part: 'C', name: 'Title', about: 'A short question or statement in DM Sans bold; the dialog’s name for TalkBack.' },
      { part: 'D', name: 'Message', about: 'The explanation in the body, muted, at the secondary role.' },
      { part: 'E', name: 'Footer band', about: 'A filled band with a line above it that holds the actions.' },
      { part: 'F', name: 'Actions', about: 'Plenix buttons at the end: the dismissing one first, the confirming one last.' },
      { part: 'G', name: 'Scrim', about: 'Black at 50 % over the screen behind the dialog.' }
    ],
    attributes: [
      { part: 'A', attribute: 'Corner radius', token: 'plx-comp-dialog-radius', value: '8 dp (PlenixRadius.radiusDialog8px)', material: '28 dp',
        compose: 'Surface(shape = RoundedCornerShape(PlenixRadius.radiusDialog8px))', views: 'setBackground(MaterialShapeDrawable(ShapeAppearanceModel.builder().setAllCornerSizes(px(PlenixRadius.radiusDialog8px).toFloat()).build()))', ...M3('Dialogs', DIALOGS) },
      { part: 'A', attribute: 'Background', token: 'plx-comp-dialog-background', value: 'surfaceOverlay, no tonal tint', material: 'surfaceContainerHigh',
        compose: 'Surface(color = PlenixColors.surfaceOverlay.current(), tonalElevation = 0.dp)', views: 'fillColor = ColorStateList.valueOf(argb(PlenixColors.surfaceOverlay.light, PlenixColors.surfaceOverlay.dark))', ...M3('Dialogs', DIALOGS) },
      { part: 'A', attribute: 'Width', token: 'plx-comp-dialog-sm-max-width', value: 'Material’s 280 to 560 dp; the web’s 400 px small dialog sits inside it', material: '280 to 560 dp',
        compose: 'Set by BasicAlertDialog', views: 'Set by the dialog theme', ...M3('Dialogs', DIALOGS) },
      { part: 'B', attribute: 'Header band', token: 'plx-comp-dialog-header-background, plx-comp-dialog-header-border-bottom-color, plx-comp-dialog-header-border-bottom-width', value: 'surfaceDialogChrome, with a 1 dp line in borderDialogChrome', material: 'None',
        compose: 'Row(Modifier.background(PlenixColors.surfaceDialogChrome.current())); HorizontalDivider(thickness = 1.dp, color = PlenixColors.borderDialogChrome.current())', views: 'setCustomTitle(header) with setBackgroundColor(argb(PlenixColors.surfaceDialogChrome.light, PlenixColors.surfaceDialogChrome.dark))', ...M3('Dialogs', DIALOGS) },
      { part: 'B', attribute: 'Header height and padding', token: 'plx-comp-dialog-header-min-height, plx-comp-dialog-header-padding-inline-start, plx-comp-dialog-header-padding-inline-end, plx-comp-dialog-header-padding-block', value: 'At least 48 dp (PlenixPlatform.controlTargetMin); 16 dp start, 8 dp end and block (PlenixSpace.spaceInsetLg, spaceInsetSm)', material: '24 dp padding around the title',
        compose: 'Modifier.heightIn(min = PlenixPlatform.controlTargetMin).padding(start = PlenixSpace.spaceInsetLg, end = PlenixSpace.spaceInsetSm, …)', views: 'header.minHeight = px(PlenixPlatform.controlTargetMin); setPaddingRelative(…)', ...M3('Dialogs', DIALOGS) },
      { part: 'C', attribute: 'Title type', token: 'plx-comp-dialog-title-font-family, plx-comp-dialog-title-font-size, plx-comp-dialog-title-font-weight', value: 'DM Sans bold (700), 16 sp on 24 sp, Title medium (PlenixPlatform.textHeadingSize)', material: 'Roboto 24 sp, Headline small',
        compose: 'textRole(PlenixPlatform.textHeadingSize, PlenixPlatform.textHeadingLineHeight, 700); Modifier.semantics { heading() }', views: 'header.textRole(PlenixPlatform.textHeadingSize, PlenixPlatform.textHeadingLineHeight, R.font.dm_sans_bold); ViewCompat.setAccessibilityHeading(header, true)', ...M3('Dialogs', DIALOGS) },
      { part: 'C', attribute: 'Title color', token: 'plx-comp-dialog-header-text', value: 'contentDialogChrome', material: 'onSurface',
        compose: 'color = PlenixColors.contentDialogChrome.current()', views: 'setTextColor(argb(PlenixColors.contentDialogChrome.light, PlenixColors.contentDialogChrome.dark))', ...M3('Dialogs', DIALOGS) },
      { part: 'D', attribute: 'Message', token: 'plx-comp-dialog-description-text, plx-comp-dialog-description-line-height', value: 'DM Sans 14 sp on 20 sp, Body medium (PlenixPlatform.textSecondarySize), contentMuted', material: 'Body medium, onSurfaceVariant',
        compose: 'Text(message, style = textRole(PlenixPlatform.textSecondarySize, PlenixPlatform.textSecondaryLineHeight, PlenixPlatform.textSecondaryWeight), color = PlenixColors.contentMuted.current())', views: 'findViewById<TextView>(android.R.id.message)?.textRole(PlenixPlatform.textSecondarySize, PlenixPlatform.textSecondaryLineHeight, R.font.dm_sans_regular)', ...M3('Dialogs', DIALOGS) },
      { part: 'D', attribute: 'Body padding', token: 'plx-comp-dialog-padding', value: '24 dp (PlenixSpace.spaceInsetXl); 16 dp in Compact', material: '24 dp',
        compose: 'Modifier.padding(PlenixSpace.spaceInsetXl)', views: 'Material’s message padding (24 dp), which matches', ...M3('Dialogs', DIALOGS) },
      { part: 'E', attribute: 'Footer band', token: 'plx-comp-dialog-footer-background, plx-comp-dialog-footer-border-top-color, plx-comp-dialog-footer-padding-block, plx-comp-dialog-footer-padding-inline', value: 'surfaceDialogChrome with a 1 dp line above; 12 dp block, 16 dp inline (PlenixSpace.spaceInsetMd, spaceInsetLg)', material: 'None: the buttons sit in the card',
        compose: 'DialogFooter { … }', views: '(dialog.getButton(BUTTON_POSITIVE).parent as View).setBackgroundColor(argb(PlenixColors.surfaceDialogChrome.light, PlenixColors.surfaceDialogChrome.dark))', ...M3('Dialogs', DIALOGS) },
      { part: 'F', attribute: 'Actions', token: 'plx-comp-dialog-action-height, plx-comp-dialog-action-gap', value: 'Plenix buttons 40 dp tall (PlenixPlatform.buttonHeight), 8 dp apart (PlenixPlatform.dialogActionGap), at the end', material: 'Text buttons, 8 dp apart, at the end',
        compose: 'Arrangement.spacedBy(PlenixPlatform.dialogActionGap, Alignment.End); Modifier.heightIn(min = PlenixPlatform.buttonHeight)', views: 'The dialog’s MaterialButtons, tinted with backgroundTintList and setTextColor', ...M3('Dialogs', DIALOGS) },
      { part: 'F', attribute: 'Confirm button colors', token: 'plx-sys-action-primary-background, plx-sys-action-danger-background', value: 'Primary for a confirm, danger for a destructive confirm; the dismiss button is a secondary (outlined) button', material: 'primary text',
        compose: 'ButtonDefaults.buttonColors(containerColor = PlenixColors.actionPrimaryBackground.current() or PlenixColors.actionDangerBackground.current())', views: 'backgroundTintList = ColorStateList.valueOf(argb(PlenixColors.actionDangerBackground.light, PlenixColors.actionDangerBackground.dark))', ...M3('Dialogs', 'https://m3.material.io/components/dialogs/guidelines') },
      { part: 'G', attribute: 'Scrim', token: 'plx-comp-modal-layer-before-background, plx-comp-modal-layer-before-opacity', value: 'scrim (black) at 50 %', material: 'scrim at 32 %',
        compose: '(LocalView.current.parent as? DialogWindowProvider)?.window?.setDimAmount(0.5f)', views: 'dialog.window?.setDimAmount(0.5f)', ...M3('Dialogs', DIALOGS) }
    ],
    states: [
      { state: 'Open', token: 'plx-comp-dialog-background', compose: 'BasicAlertDialog shown while the state holds true', views: 'dialog.show()' },
      { state: 'Dismissed (back, outside tap)', token: 'None', compose: 'onDismissRequest; DialogProperties(dismissOnBackPress, dismissOnClickOutside)', views: 'setCancelable(true); setOnCancelListener' },
      { state: 'Not dismissible', token: 'Dialog dismissible false on the web', compose: 'DialogProperties(dismissOnBackPress = false, dismissOnClickOutside = false)', views: 'setCancelable(false)' },
      { state: 'Button pressed', token: 'plx-sys-action-primary-background-pressed, plx-sys-action-danger-background-pressed', compose: 'The Plenix button states (Android Buttons page)', views: 'The Plenix button states (Android Buttons page)' },
      { state: 'Focused (keyboard)', token: 'plx-sys-focus-ring-color', compose: 'Focus moves into the dialog and stays inside it', views: 'Focus moves into the dialog and stays inside it' }
    ],
    code: {
      compose: [
        'import androidx.compose.material3.*',
        'import androidx.compose.ui.window.DialogProperties',
        'import androidx.compose.ui.window.DialogWindowProvider',
        'import plenix.tokens.*',
        '',
        ...composeText,
        '',
        ...composeHeader,
        '',
        '/** The Plenix alert dialog on Android: a Material 3 BasicAlertDialog, styled with the Plenix dialog tokens. */',
        '@OptIn(ExperimentalMaterial3Api::class)',
        '@Composable',
        'fun PlenixAlertDialog(',
        '    title: String,',
        '    message: String,',
        '    confirmLabel: String,',
        '    onConfirm: () -> Unit,',
        '    onDismiss: () -> Unit,',
        '    dismissLabel: String? = "Cancel",',
        '    destructive: Boolean = false,',
        '    dismissible: Boolean = true,',
        ') {',
        '    BasicAlertDialog(onDismissRequest = onDismiss, properties = DialogProperties(dismissOnBackPress = dismissible, dismissOnClickOutside = dismissible)) {',
        '        val window = (LocalView.current.parent as? DialogWindowProvider)?.window',
        '        SideEffect { window?.setDimAmount(0.5f) }   // plx-comp-modal-layer-before-opacity',
        '        Surface(',
        '            modifier = Modifier.semantics { paneTitle = title },',
        '            shape = RoundedCornerShape(PlenixRadius.radiusDialog8px),',
        '            color = PlenixColors.surfaceOverlay.current(),',
        '            contentColor = PlenixColors.contentDefault.current(),',
        '            tonalElevation = 0.dp,',
        '        ) {',
        '            Column {',
        '                DialogHeader(title)',
        '                Text(message, Modifier.padding(PlenixSpace.spaceInsetXl), color = PlenixColors.contentMuted.current(),',
        '                    style = textRole(PlenixPlatform.textSecondarySize, PlenixPlatform.textSecondaryLineHeight, PlenixPlatform.textSecondaryWeight))',
        '                DialogFooter {',
        '                    val label = textRole(PlenixPlatform.textLabelSize, PlenixPlatform.textLabelLineHeight, PlenixPlatform.textLabelWeight)',
        '                    val shape = RoundedCornerShape(PlenixRadius.radiusControl)',
        '                    dismissLabel?.let {',
        '                        OutlinedButton(onClick = onDismiss, Modifier.heightIn(min = PlenixPlatform.buttonHeight), shape = shape,',
        '                            colors = ButtonDefaults.outlinedButtonColors(containerColor = PlenixColors.controlBackground.current(), contentColor = PlenixColors.contentDefault.current()),',
        '                            border = BorderStroke(1.dp, PlenixColors.controlBorder.current())) { Text(it, style = label) }',
        '                    }',
        '                    Button(onClick = onConfirm, Modifier.heightIn(min = PlenixPlatform.buttonHeight), shape = shape,',
        '                        colors = ButtonDefaults.buttonColors(',
        '                            containerColor = if (destructive) PlenixColors.actionDangerBackground.current() else PlenixColors.actionPrimaryBackground.current(),',
        '                            contentColor = if (destructive) PlenixColors.actionDangerContent.current() else PlenixColors.actionPrimaryContent.current())) { Text(confirmLabel, style = label) }',
        '                }',
        '            }',
        '        }',
        '    }',
        '}',
        '',
        '// In a screen',
        'if (confirmDelete) PlenixAlertDialog(',
        '    title = "Delete 3 assets?",',
        '    message = "They move to the trash for 30 days.",',
        '    confirmLabel = "Delete", destructive = true,',
        '    onConfirm = { delete(); confirmDelete = false }, onDismiss = { confirmDelete = false })'
      ],
      views: [
        'import android.content.res.ColorStateList',
        'import androidx.appcompat.app.AlertDialog',
        'import com.google.android.material.dialog.MaterialAlertDialogBuilder',
        'import com.google.android.material.shape.*',
        'import plenix.tokens.*',
        '',
        ...viewsHelpers,
        '',
        '/** A MaterialAlertDialogBuilder dialog styled with the Plenix dialog tokens. */',
        'fun plenixAlertDialog(c: Context, title: String, message: String, confirm: String, destructive: Boolean = false, onConfirm: () -> Unit): AlertDialog {',
        '    val chrome = c.argb(PlenixColors.surfaceDialogChrome.light, PlenixColors.surfaceDialogChrome.dark)',
        '    val header = TextView(c).apply {',
        '        text = title',
        '        textRole(PlenixPlatform.textHeadingSize, PlenixPlatform.textHeadingLineHeight, R.font.dm_sans_bold)',
        '        setTextColor(c.argb(PlenixColors.contentDialogChrome.light, PlenixColors.contentDialogChrome.dark))',
        '        minHeight = c.px(PlenixPlatform.controlTargetMin)',
        '        gravity = Gravity.CENTER_VERTICAL or Gravity.START',
        '        setPaddingRelative(c.px(PlenixSpace.spaceInsetLg), c.px(PlenixSpace.spaceInsetSm), c.px(PlenixSpace.spaceInsetSm), c.px(PlenixSpace.spaceInsetSm))',
        '        background = LayerDrawable(arrayOf(ColorDrawable(chrome), ColorDrawable(c.argb(PlenixColors.borderDialogChrome.light, PlenixColors.borderDialogChrome.dark)))).apply {',
        '            setLayerHeight(1, c.px(1.dp)); setLayerGravity(1, Gravity.BOTTOM or Gravity.FILL_HORIZONTAL)   // the line below the band',
        '        }',
        '        ViewCompat.setAccessibilityHeading(this, true)',
        '    }',
        '    val surface = MaterialShapeDrawable(ShapeAppearanceModel.builder().setAllCornerSizes(c.px(PlenixRadius.radiusDialog8px).toFloat()).build()).apply {',
        '        fillColor = ColorStateList.valueOf(c.argb(PlenixColors.surfaceOverlay.light, PlenixColors.surfaceOverlay.dark))',
        '    }',
        '    val dialog = MaterialAlertDialogBuilder(c)',
        '        .setCustomTitle(header)',
        '        .setMessage(message)',
        '        .setNegativeButton("Cancel", null)',
        '        .setPositiveButton(confirm) { _, _ -> onConfirm() }',
        '        .setBackground(surface)',
        '        .create()',
        '    dialog.setOnShowListener {',
        '        dialog.window?.setDimAmount(0.5f)   // plx-comp-modal-layer-before-opacity',
        '        dialog.findViewById<TextView>(android.R.id.message)?.apply {',
        '            textRole(PlenixPlatform.textSecondarySize, PlenixPlatform.textSecondaryLineHeight, R.font.dm_sans_regular)',
        '            setTextColor(c.argb(PlenixColors.contentMuted.light, PlenixColors.contentMuted.dark))',
        '        }',
        '        val ok = dialog.getButton(AlertDialog.BUTTON_POSITIVE) as MaterialButton',
        '        (ok.parent as View).setBackgroundColor(chrome)   // the footer band',
        '        ok.backgroundTintList = ColorStateList.valueOf(if (destructive) c.argb(PlenixColors.actionDangerBackground.light, PlenixColors.actionDangerBackground.dark)',
        '            else c.argb(PlenixColors.actionPrimaryBackground.light, PlenixColors.actionPrimaryBackground.dark))',
        '        ok.setTextColor(if (destructive) c.argb(PlenixColors.actionDangerContent.light, PlenixColors.actionDangerContent.dark)',
        '            else c.argb(PlenixColors.actionPrimaryContent.light, PlenixColors.actionPrimaryContent.dark))',
        '        ok.cornerRadius = c.px(PlenixRadius.radiusControl)',
        '    }',
        '    return dialog',
        '}',
        '',
        'plenixAlertDialog(this, "Delete 3 assets?", "They move to the trash for 30 days.", "Delete", destructive = true) { delete() }.show()'
      ]
    }
  }
};

/* ---------------------------------------------------------------- ModalBottomSheet */
const sheet = {
  'android-overlays|ModalBottomSheet': {
    summary: 'A Plenix bottom sheet on Android is the Material 3 ModalBottomSheet (BottomSheetDialog in Views), kept native in behavior (drag to resize and dismiss, back to close, the scrim, TalkBack pane semantics) and styled with the Plenix dialog tokens: the overlay surface with 8 dp top corners, the drag handle and the title on the filled header band, the content with the drawer padding, an optional filled footer band, and a 50 % black scrim. Material’s default is a tonal sheet with 28 dp corners; Plenix keeps Material’s structure and replaces the look.',
    variants: [
      { name: 'Standard', material: 'Modal bottom sheet, partially expanded first', web: 'overlays|Bottom sheet', background: 'plx-comp-dialog-background', content: 'plx-comp-dialog-text', border: null,
        compose: 'PlenixBottomSheet(title, onDismiss) { … }', views: 'BottomSheetDialog with the Plenix background', use: 'A short task or a set of choices that keeps the screen behind in view.' },
      { name: 'Full height', material: 'Modal bottom sheet, skipPartiallyExpanded', web: 'overlays|Full-height sheet', background: 'plx-comp-dialog-background', content: 'plx-comp-dialog-text', border: null,
        compose: 'PlenixBottomSheet(title, onDismiss, fullHeight = true) { … }', views: 'behavior.skipCollapsed = true; behavior.state = STATE_EXPANDED', use: 'A longer form or list that needs the whole height.' },
      { name: 'Actions', material: 'Modal bottom sheet with a list', web: 'overlays|Bottom sheet', background: 'plx-comp-dialog-background', content: 'plx-comp-dialog-text', border: null,
        compose: 'PlenixBottomSheet(title) { PlenixListRow(…, onClick = …) per action }', views: 'A RecyclerView of Plenix list rows in the sheet', use: 'Choosing one of a few actions the person asked for, such as Share or Move.' }
    ],
    anatomy: [
      { part: 'A', name: 'Sheet', about: 'The surface that rises from the bottom edge, with rounded top corners.' },
      { part: 'B', name: 'Drag handle', about: 'The grabber on the header band; drag to resize or close; TalkBack offers expand, collapse and dismiss.' },
      { part: 'C', name: 'Header band', about: 'The title in DM Sans bold and a close button, on the filled band with a line below.' },
      { part: 'D', name: 'Content', about: 'The body, with the drawer padding.' },
      { part: 'E', name: 'Footer band', about: 'Optional actions on a filled band with a line above, clear of the navigation bar.' },
      { part: 'F', name: 'Scrim', about: 'Black at 50 % over the screen; a tap on it closes the sheet.' }
    ],
    attributes: [
      { part: 'A', attribute: 'Top corners', token: 'plx-comp-dialog-radius', value: '8 dp on the top corners (PlenixRadius.radiusDialog8px)', material: '28 dp',
        compose: 'shape = RoundedCornerShape(topStart = PlenixRadius.radiusDialog8px, topEnd = PlenixRadius.radiusDialog8px)', views: 'MaterialShapeDrawable(ShapeAppearanceModel.builder().setTopLeftCorner(CornerFamily.ROUNDED, r).setTopRightCorner(CornerFamily.ROUNDED, r).build())', ...M3('Bottom sheets', SHEETS) },
      { part: 'A', attribute: 'Background', token: 'plx-comp-dialog-background', value: 'surfaceOverlay, no tonal tint', material: 'surfaceContainerLow',
        compose: 'containerColor = PlenixColors.surfaceOverlay.current(), tonalElevation = 0.dp', views: 'fillColor = ColorStateList.valueOf(argb(PlenixColors.surfaceOverlay.light, PlenixColors.surfaceOverlay.dark))', ...M3('Bottom sheets', SHEETS) },
      { part: 'A', attribute: 'Width', token: 'None: Material’s sheet width', value: 'Full width on a phone; at most 640 dp, centered, on wider windows', material: '640 dp maximum',
        compose: 'sheetMaxWidth = BottomSheetDefaults.SheetMaxWidth', views: 'behavior.maxWidth (the Material default)', ...M3('Bottom sheets', SHEETS) },
      { part: 'B', attribute: 'Drag handle', token: 'plx-sys-border-strong', value: 'Material’s 32 by 4 dp handle in borderStrong, on the header band', material: '32 by 4 dp in onSurfaceVariant',
        compose: 'dragHandle = { Box(Modifier.fillMaxWidth().background(chrome), Alignment.Center) { BottomSheetDefaults.DragHandle(color = PlenixColors.borderStrong.current()) } }', views: 'BottomSheetDragHandleView with imageTintList = ColorStateList.valueOf(argb(PlenixColors.borderStrong.light, PlenixColors.borderStrong.dark))', ...M3('Bottom sheets', SHEETS) },
      { part: 'C', attribute: 'Header band', token: 'plx-comp-dialog-header-background, plx-comp-dialog-header-border-bottom-color, plx-comp-dialog-header-min-height', value: 'surfaceDialogChrome, at least 48 dp (PlenixPlatform.controlTargetMin), a 1 dp line in borderDialogChrome', material: 'None',
        compose: 'DialogHeader(title) { close button }', views: 'A header row in the sheet layout with the chrome background', ...M3('Bottom sheets', SHEETS) },
      { part: 'C', attribute: 'Title type', token: 'plx-comp-dialog-title-font-size, plx-comp-dialog-title-font-weight, plx-comp-dialog-header-text', value: 'DM Sans bold (700), 16 sp on 24 sp, Title medium (PlenixPlatform.textHeadingSize), contentDialogChrome', material: 'Set by the content',
        compose: 'textRole(PlenixPlatform.textHeadingSize, PlenixPlatform.textHeadingLineHeight, 700)', views: 'title.textRole(PlenixPlatform.textHeadingSize, PlenixPlatform.textHeadingLineHeight, R.font.dm_sans_bold)', ...M3('Typography', 'https://m3.material.io/styles/typography/type-scale-tokens') },
      { part: 'C', attribute: 'Close button', token: 'plx-comp-dialog-close-text, plx-sys-control-target-min', value: 'A close icon in contentDialogChrome, a 48 dp target', material: 'None; drag or the scrim closes',
        compose: 'IconButton(onClick = close) { Icon(Icons.Sharp.Close, "Close", tint = PlenixColors.contentDialogChrome.current()) }', views: 'An ImageButton, 48 dp, contentDescription "Close"', ...M3('Bottom sheets', 'https://m3.material.io/components/bottom-sheets/accessibility') },
      { part: 'D', attribute: 'Content padding', token: 'plx-comp-drawer-padding', value: '16 dp (PlenixSpace.spaceContainerInsetMd); 12 dp in Compact', material: 'Set by the content',
        compose: 'Column(Modifier.padding(PlenixSpace.spaceContainerInsetMd))', views: 'setPadding(px(PlenixSpace.spaceContainerInsetMd), …)', ...M3('Bottom sheets', SHEETS) },
      { part: 'E', attribute: 'Footer band', token: 'plx-comp-dialog-footer-background, plx-comp-dialog-footer-border-top-color, plx-comp-dialog-action-gap', value: 'surfaceDialogChrome with a 1 dp line above; actions at the end, 8 dp apart (PlenixPlatform.dialogActionGap); padded clear of the navigation bar', material: 'None',
        compose: 'DialogFooter { … } with Modifier.navigationBarsPadding()', views: 'A footer row with the chrome background; ViewCompat.setOnApplyWindowInsetsListener for the navigation bar', ...M3('Bottom sheets', SHEETS) },
      { part: 'F', attribute: 'Scrim', token: 'plx-comp-modal-layer-before-background, plx-comp-modal-layer-before-opacity', value: 'scrim (black) at 50 %', material: 'scrim at 32 %',
        compose: 'scrimColor = PlenixColors.scrim.current().copy(alpha = 0.5f)', views: 'sheet.window?.setDimAmount(0.5f)', ...M3('Bottom sheets', SHEETS) }
    ],
    states: [
      { state: 'Partially expanded', token: 'None', compose: 'SheetValue.PartiallyExpanded (rememberModalBottomSheetState())', views: 'BottomSheetBehavior.STATE_COLLAPSED' },
      { state: 'Expanded', token: 'None', compose: 'SheetValue.Expanded; skipPartiallyExpanded = true opens here', views: 'STATE_EXPANDED; skipCollapsed = true' },
      { state: 'Dragging', token: 'plx-comp-drawer-animation-duration', compose: 'Material’s drag and settle motion', views: 'STATE_DRAGGING, STATE_SETTLING' },
      { state: 'Dismissed', token: 'None', compose: 'Drag down, back or a scrim tap: onDismissRequest; the close button calls sheetState.hide()', views: 'STATE_HIDDEN; setOnDismissListener' },
      { state: 'Kept open (unsaved work)', token: 'None', compose: 'rememberModalBottomSheetState(confirmValueChange = { it != SheetValue.Hidden || saved }) and ask first', views: 'behavior.isHideable = false; setCancelable(false) until saved' }
    ],
    code: {
      compose: [
        'import androidx.compose.material3.*',
        'import plenix.tokens.*',
        '',
        ...composeText,
        '',
        '// DialogHeader and DialogFooter: the Plenix dialog bands (Android AlertDialog page)',
        '',
        '/** The Plenix bottom sheet on Android: the Material 3 ModalBottomSheet, styled with the Plenix dialog tokens. */',
        '@OptIn(ExperimentalMaterial3Api::class)',
        '@Composable',
        'fun PlenixBottomSheet(',
        '    title: String,',
        '    onDismiss: () -> Unit,',
        '    fullHeight: Boolean = false,',
        '    footer: (@Composable RowScope.() -> Unit)? = null,',
        '    content: @Composable ColumnScope.() -> Unit,',
        ') {',
        '    val state = rememberModalBottomSheetState(skipPartiallyExpanded = fullHeight)',
        '    val scope = rememberCoroutineScope()',
        '    val chrome = PlenixColors.surfaceDialogChrome.current()',
        '    ModalBottomSheet(',
        '        onDismissRequest = onDismiss,',
        '        sheetState = state,',
        '        shape = RoundedCornerShape(topStart = PlenixRadius.radiusDialog8px, topEnd = PlenixRadius.radiusDialog8px),',
        '        containerColor = PlenixColors.surfaceOverlay.current(),',
        '        contentColor = PlenixColors.contentDefault.current(),',
        '        tonalElevation = 0.dp,',
        '        scrimColor = PlenixColors.scrim.current().copy(alpha = 0.5f),   // plx-comp-modal-layer-before-opacity',
        '        dragHandle = {',
        '            Box(Modifier.fillMaxWidth().background(chrome), contentAlignment = Alignment.Center) {',
        '                BottomSheetDefaults.DragHandle(color = PlenixColors.borderStrong.current())',
        '            }',
        '        },',
        '    ) {',
        '        DialogHeader(title) {',
        '            IconButton(onClick = { scope.launch { state.hide() }.invokeOnCompletion { onDismiss() } }) {',
        '                Icon(Icons.Sharp.Close, contentDescription = "Close", tint = PlenixColors.contentDialogChrome.current())',
        '            }',
        '        }',
        '        Column(Modifier.padding(PlenixSpace.spaceContainerInsetMd), content = content)',
        '        footer?.let { Box(Modifier.navigationBarsPadding()) { Column { DialogFooter(it) } } }',
        '    }',
        '}',
        '',
        '// In a screen',
        'if (showMove) PlenixBottomSheet(title = "Move 3 assets", onDismiss = { showMove = false }) {',
        '    folders.forEach { f -> PlenixListRow(f.name, onClick = { move(f); showMove = false }) }',
        '}'
      ],
      views: [
        'import android.content.res.ColorStateList',
        'import com.google.android.material.bottomsheet.*',
        'import com.google.android.material.shape.*',
        'import plenix.tokens.*',
        '',
        ...viewsHelpers,
        '',
        '// res/layout/sheet_move.xml: a header row (BottomSheetDragHandleView @id/drag_handle, @id/title, @id/close),',
        '// the content, and an optional footer row; the header and footer rows take the chrome color below.',
        '',
        '/** A BottomSheetDialog styled with the Plenix dialog tokens. */',
        'fun plenixBottomSheet(c: Context, @LayoutRes layout: Int, fullHeight: Boolean = false): BottomSheetDialog {',
        '    val sheet = BottomSheetDialog(c)',
        '    sheet.setContentView(layout)',
        '    val chrome = c.argb(PlenixColors.surfaceDialogChrome.light, PlenixColors.surfaceDialogChrome.dark)',
        '    sheet.findViewById<View>(R.id.header)?.setBackgroundColor(chrome)',
        '    sheet.findViewById<View>(R.id.footer)?.setBackgroundColor(chrome)',
        '    sheet.findViewById<BottomSheetDragHandleView>(R.id.drag_handle)?.imageTintList =',
        '        ColorStateList.valueOf(c.argb(PlenixColors.borderStrong.light, PlenixColors.borderStrong.dark))',
        '    sheet.findViewById<TextView>(R.id.title)?.apply {',
        '        textRole(PlenixPlatform.textHeadingSize, PlenixPlatform.textHeadingLineHeight, R.font.dm_sans_bold)',
        '        setTextColor(c.argb(PlenixColors.contentDialogChrome.light, PlenixColors.contentDialogChrome.dark))',
        '        ViewCompat.setAccessibilityHeading(this, true)',
        '    }',
        '    sheet.findViewById<View>(R.id.close)?.setOnClickListener { sheet.dismiss() }',
        '    if (fullHeight) { sheet.behavior.skipCollapsed = true; sheet.behavior.state = BottomSheetBehavior.STATE_EXPANDED }',
        '    sheet.setOnShowListener {',
        '        sheet.window?.setDimAmount(0.5f)   // plx-comp-modal-layer-before-opacity',
        '        val r = c.px(PlenixRadius.radiusDialog8px).toFloat()',
        '        sheet.findViewById<View>(com.google.android.material.R.id.design_bottom_sheet)?.background =',
        '            MaterialShapeDrawable(ShapeAppearanceModel.builder()',
        '                .setTopLeftCorner(CornerFamily.ROUNDED, r).setTopRightCorner(CornerFamily.ROUNDED, r).build()).apply {',
        '                fillColor = ColorStateList.valueOf(c.argb(PlenixColors.surfaceOverlay.light, PlenixColors.surfaceOverlay.dark))',
        '            }',
        '    }',
        '    return sheet',
        '}',
        '',
        'plenixBottomSheet(this, R.layout.sheet_move).show()'
      ]
    }
  }
};

/* ---------------------------------------------------------------- Tooltip */
const tooltip = {
  'android-overlays|Tooltip': {
    summary: 'A Plenix tooltip on Android is the Material 3 PlainTooltip in a TooltipBox, kept native in behavior (shown on long-press, on mouse hover and on keyboard focus, placed above the control, read by TalkBack) and styled with the Plenix tooltip tokens: a 4 dp rounded bubble in the tooltip color with a small caret, and DM Sans text at the caption role. Rich tooltips use the overlay surface and the menu radius. Material’s default is an inverse-surface bubble without a caret and Roboto text; Plenix keeps Material’s structure and replaces the look.',
    variants: [
      { name: 'Plain', material: 'Plain tooltip', web: 'overlays|Tooltip', background: 'plx-comp-tooltip-bubble-background', content: 'plx-comp-tooltip-bubble-text', border: null,
        compose: 'PlenixTooltip("Upload files") { IconButton(…) }', views: 'anchor.plainTooltip("Upload files")', use: 'A short label for a control, most of all an icon-only one.' },
      { name: 'Rich', material: 'Rich tooltip', web: 'overlays|Rich tooltip', background: 'plx-sys-surface-overlay', content: 'plx-sys-content-default', border: 'plx-sys-border-default',
        compose: 'TooltipBox with RichTooltip(title, action) and the Plenix colors; rememberTooltipState(isPersistent = true)', views: 'No Material Views rich tooltip: a PopupWindow with the Plenix surface', use: 'A sentence or two of help with an optional action, opened from an info button.' }
    ],
    anatomy: [
      { part: 'A', name: 'Bubble', about: 'The rounded container, above the control.' },
      { part: 'B', name: 'Caret', about: 'A small triangle that points at the control.' },
      { part: 'C', name: 'Text', about: 'A few words in DM Sans at the caption role; never essential or interactive content.' },
      { part: 'D', name: 'Title', about: 'Rich only: a short heading above the text.' },
      { part: 'E', name: 'Action', about: 'Rich only: one text action, such as Learn more.' }
    ],
    attributes: [
      { part: 'A', attribute: 'Background', token: 'plx-comp-tooltip-bubble-background', value: 'tooltipBackground (black; light gray in dark)', material: 'inverseSurface',
        compose: 'containerColor = PlenixColors.tooltipBackground.current()', views: 'fillColor = ColorStateList.valueOf(argb(PlenixColors.tooltipBackground.light, PlenixColors.tooltipBackground.dark))', ...M3('Tooltips', TIPS) },
      { part: 'A', attribute: 'Corner radius', token: 'plx-comp-tooltip-bubble-radius', value: '4 dp (PlenixRadius.radiusCompact4px); rich: 8 dp (PlenixRadius.radiusMenu8px)', material: '4 dp plain, 12 dp rich',
        compose: 'shape = RoundedCornerShape(PlenixRadius.radiusCompact4px)', views: 'ShapeAppearanceModel.builder().setAllCornerSizes(px(PlenixRadius.radiusCompact4px).toFloat())', ...M3('Tooltips', TIPS) },
      { part: 'A', attribute: 'Padding', token: 'plx-comp-tooltip-bubble-padding-block, plx-comp-tooltip-bubble-padding-inline', value: '4 dp block, 8 dp inline (PlenixSpace.spaceInsetXs, spaceInsetSm)', material: '4 dp block, 8 dp inline',
        compose: 'Material’s padding, which matches', views: 'setPadding(px(PlenixSpace.spaceInsetSm), px(PlenixSpace.spaceInsetXs), px(PlenixSpace.spaceInsetSm), px(PlenixSpace.spaceInsetXs))', ...M3('Tooltips', TIPS) },
      { part: 'A', attribute: 'Distance and placement', token: 'plx-comp-tooltip-bubble-top-inset-block-end', value: '8 dp from the control (PlenixSpace.spaceStackSm), above it; below when there is no room', material: 'Above, 4 dp away',
        compose: 'TooltipDefaults.rememberPlainTooltipPositionProvider(spacingBetweenTooltipAndAnchor = PlenixSpace.spaceStackSm)', views: 'popup.showAsDropDown(anchor, 0, -(anchor.height + bubble.measuredHeight + px(PlenixSpace.spaceStackSm)))', ...M3('Tooltips', TIPS) },
      { part: 'B', attribute: 'Caret', token: 'plx-comp-tooltip-bubble-before-border-width', value: '8 dp wide, 4 dp tall, in the bubble color', material: 'None by default',
        compose: 'PlainTooltip(caretSize = DpSize(8.dp, 4.dp))', views: 'Not drawn in Views: the bubble alone', ...M3('Tooltips', TIPS) },
      { part: 'C', attribute: 'Text type', token: 'plx-comp-tooltip-bubble-font-family, plx-comp-tooltip-bubble-font-size, plx-comp-tooltip-bubble-line-height', value: 'DM Sans 12 sp on 16 sp, Body small (PlenixPlatform.textCaptionSize)', material: 'Roboto 12 sp, Body small',
        compose: 'textRole(PlenixPlatform.textCaptionSize, PlenixPlatform.textCaptionLineHeight, PlenixPlatform.textCaptionWeight)', views: 'bubble.textRole(PlenixPlatform.textCaptionSize, PlenixPlatform.textCaptionLineHeight, R.font.dm_sans_regular)', ...M3('Typography', 'https://m3.material.io/styles/typography/type-scale-tokens') },
      { part: 'C', attribute: 'Text color', token: 'plx-comp-tooltip-bubble-text', value: 'tooltipContent', material: 'inverseOnSurface',
        compose: 'contentColor = PlenixColors.tooltipContent.current()', views: 'bubble.setTextColor(argb(PlenixColors.tooltipContent.light, PlenixColors.tooltipContent.dark))', ...M3('Tooltips', TIPS) },
      { part: 'D', attribute: 'Rich title', token: 'plx-sys-content-default', value: 'DM Sans semibold 14 sp, Label large (PlenixPlatform.textLabelSize)', material: 'Title small, onSurfaceVariant',
        compose: 'RichTooltip(title = { Text(t, style = textRole(PlenixPlatform.textLabelSize, PlenixPlatform.textLabelLineHeight, PlenixPlatform.textLabelWeight)) })', views: 'title.textRole(PlenixPlatform.textLabelSize, PlenixPlatform.textLabelLineHeight, R.font.dm_sans_semibold)', ...M3('Tooltips', TIPS) },
      { part: 'E', attribute: 'Rich action', token: 'plx-sys-content-link', value: 'A text button in contentLink, Label large', material: 'A text button in primary',
        compose: 'RichTooltip(action = { TextButton(onClick, colors = ButtonDefaults.textButtonColors(contentColor = PlenixColors.contentLink.current())) { … } })', views: 'A MaterialButton (TextButton style) with setTextColor(argb(PlenixColors.contentLink.light, PlenixColors.contentLink.dark))', ...M3('Tooltips', TIPS) },
      { part: 'A', attribute: 'Trigger', token: 'None', value: 'Long-press on touch, hover with a mouse, focus with a keyboard; the label is also the control’s TalkBack description', material: 'The same',
        compose: 'TooltipBox handles it; IconButton keeps its own contentDescription', views: 'setOnLongClickListener and setOnHoverListener; contentDescription stays the label', ...M3('Tooltips', 'https://m3.material.io/components/tooltips/accessibility') }
    ],
    states: [
      { state: 'Hidden', token: 'None', compose: 'tooltipState.isVisible == false', views: 'No popup' },
      { state: 'Shown', token: 'plx-comp-tooltip-bubble-duration', compose: 'Long-press, hover or focus shows it; Material’s fade', views: 'popup.showAsDropDown(…)' },
      { state: 'Timed out', token: 'None', compose: 'A plain tooltip hides after Material’s 1.5 s', views: 'anchor.postDelayed({ popup.dismiss() }, 1500)' },
      { state: 'Persistent (rich)', token: 'None', compose: 'rememberTooltipState(isPersistent = true): stays until a tap outside', views: 'isOutsideTouchable = true; dismissed by a tap outside' }
    ],
    code: {
      compose: [
        'import androidx.compose.material3.*',
        'import plenix.tokens.*',
        '',
        ...composeText,
        '',
        '/** The Plenix tooltip on Android: the Material 3 PlainTooltip, styled with the Plenix tooltip tokens. */',
        '@OptIn(ExperimentalMaterial3Api::class)',
        '@Composable',
        'fun PlenixTooltip(text: String, anchor: @Composable () -> Unit) {',
        '    TooltipBox(',
        '        positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(spacingBetweenTooltipAndAnchor = PlenixSpace.spaceStackSm),',
        '        tooltip = {',
        '            PlainTooltip(',
        '                caretSize = DpSize(8.dp, 4.dp),',
        '                shape = RoundedCornerShape(PlenixRadius.radiusCompact4px),',
        '                containerColor = PlenixColors.tooltipBackground.current(),',
        '                contentColor = PlenixColors.tooltipContent.current(),',
        '            ) { Text(text, style = textRole(PlenixPlatform.textCaptionSize, PlenixPlatform.textCaptionLineHeight, PlenixPlatform.textCaptionWeight)) }',
        '        },',
        '        state = rememberTooltipState(),',
        '        content = anchor,',
        '    )',
        '}',
        '',
        '/** A rich tooltip: the overlay surface, the menu radius, a title and one action. */',
        '@OptIn(ExperimentalMaterial3Api::class)',
        '@Composable',
        'fun PlenixRichTooltip(title: String, text: String, action: String, onAction: () -> Unit, anchor: @Composable () -> Unit) {',
        '    TooltipBox(',
        '        positionProvider = TooltipDefaults.rememberRichTooltipPositionProvider(spacingBetweenTooltipAndAnchor = PlenixSpace.spaceStackSm),',
        '        tooltip = {',
        '            RichTooltip(',
        '                title = { Text(title, style = textRole(PlenixPlatform.textLabelSize, PlenixPlatform.textLabelLineHeight, PlenixPlatform.textLabelWeight)) },',
        '                action = { TextButton(onClick = onAction, colors = ButtonDefaults.textButtonColors(contentColor = PlenixColors.contentLink.current())) { Text(action) } },',
        '                shape = RoundedCornerShape(PlenixRadius.radiusMenu8px),',
        '                colors = TooltipDefaults.richTooltipColors(',
        '                    containerColor = PlenixColors.surfaceOverlay.current(),',
        '                    contentColor = PlenixColors.contentMuted.current(),',
        '                    titleContentColor = PlenixColors.contentDefault.current(),',
        '                    actionContentColor = PlenixColors.contentLink.current(),',
        '                ),',
        '            ) { Text(text, style = textRole(PlenixPlatform.textSecondarySize, PlenixPlatform.textSecondaryLineHeight, PlenixPlatform.textSecondaryWeight)) }',
        '        },',
        '        state = rememberTooltipState(isPersistent = true),',
        '        content = anchor,',
        '    )',
        '}',
        '',
        '// In a toolbar',
        'PlenixTooltip("Upload files") {',
        '    IconButton(onClick = upload) { Icon(Icons.Sharp.Upload, contentDescription = "Upload files") }',
        '}'
      ],
      views: [
        'import android.content.res.ColorStateList',
        'import android.widget.PopupWindow',
        'import com.google.android.material.shape.*',
        'import plenix.tokens.*',
        '',
        ...viewsHelpers,
        '',
        '/** A Plenix plain tooltip for a View: long-press or hover shows the bubble above it; the label stays its contentDescription. */',
        'fun View.plainTooltip(text: String) {',
        '    if (contentDescription == null) contentDescription = text',
        '    setOnLongClickListener { showTooltip(this, text); true }',
        '    setOnHoverListener { v, e -> if (e.action == MotionEvent.ACTION_HOVER_ENTER) showTooltip(v, text); false }',
        '}',
        '',
        'fun showTooltip(anchor: View, text: String) {',
        '    val c = anchor.context',
        '    val bubble = TextView(c).apply {',
        '        this.text = text',
        '        textRole(PlenixPlatform.textCaptionSize, PlenixPlatform.textCaptionLineHeight, R.font.dm_sans_regular)',
        '        setTextColor(c.argb(PlenixColors.tooltipContent.light, PlenixColors.tooltipContent.dark))',
        '        setPadding(c.px(PlenixSpace.spaceInsetSm), c.px(PlenixSpace.spaceInsetXs), c.px(PlenixSpace.spaceInsetSm), c.px(PlenixSpace.spaceInsetXs))',
        '        background = MaterialShapeDrawable(ShapeAppearanceModel.builder().setAllCornerSizes(c.px(PlenixRadius.radiusCompact4px).toFloat()).build()).apply {',
        '            fillColor = ColorStateList.valueOf(c.argb(PlenixColors.tooltipBackground.light, PlenixColors.tooltipBackground.dark))',
        '        }',
        '        importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO   // TalkBack reads the anchor’s label',
        '    }',
        '    bubble.measure(View.MeasureSpec.UNSPECIFIED, View.MeasureSpec.UNSPECIFIED)',
        '    val popup = PopupWindow(bubble, ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT, false).apply { isOutsideTouchable = true }',
        '    popup.showAsDropDown(anchor, (anchor.width - bubble.measuredWidth) / 2, -(anchor.height + bubble.measuredHeight + c.px(PlenixSpace.spaceStackSm)))',
        '    anchor.postDelayed({ popup.dismiss() }, 1500)',
        '}',
        '',
        'uploadButton.plainTooltip("Upload files")'
      ]
    }
  }
};

/* ---------------------------------------------------------------- Avatar */
const avatar = {
  'android-content|Avatar': {
    summary: 'A Plenix avatar on Android is a small composable (a ShapeableImageView or a TextView in Views), since Material 3 has no avatar component: a person’s picture or initials in a rounded square, never a circle, with the corner and the text size following the size. Initials are DM Sans bold in the avatar colors; a person’s own color uses its soft fill and text color; a category uses its category color. It is hidden from TalkBack unless it carries a label. Material’s lists show a 40 dp circle; Plenix keeps the list placement and replaces the shape and colors.',
    variants: [
      { name: 'Initials', material: 'Circular monogram in a list', web: 'content|Avatar', background: 'plx-comp-avatar-background', content: 'plx-comp-avatar-content', border: null,
        compose: 'PlenixAvatar(name = "Jordan Avery")', views: 'avatarView(context, "Jordan Avery")', use: 'A person without a picture.' },
      { name: 'Picture', material: 'Circular image in a list', web: 'content|Avatar', background: null, content: null, border: null,
        compose: 'PlenixAvatar(name, pictureUrl = url)', views: 'ShapeableImageView with the avatar shape', use: 'A person with a picture; the initials show if it fails to load.' },
      { name: 'Own color', material: '—', web: 'content|Avatar', background: 'plx-comp-avatar-own-background', content: 'plx-comp-avatar-own-content', border: null,
        compose: 'PlenixAvatar(name, hue = DataHue.Blue)', views: 'avatarView(…, fill = dataColorBlueSoft, text = dataColorBlueOnSoft)', use: 'A person whose data carries their own color.' },
      { name: 'Category', material: '—', web: 'content|Avatar', background: 'plx-sys-category-blue', content: 'plx-sys-category-blue-on', border: null,
        compose: 'PlenixAvatar(name, category = PlenixColors.categoryBlue.current() to PlenixColors.categoryBlueOn.current())', views: 'avatarView(…, fill = categoryBlue, text = categoryBlueOn)', use: 'An avatar standing for a category rather than a person.' }
    ],
    anatomy: [
      { part: 'A', name: 'Container', about: 'A rounded square; its corner grows with its size. Never a circle.' },
      { part: 'B', name: 'Initials', about: 'The first letters of the first and last name, in DM Sans bold; titles such as Fr. or Dr. are skipped.' },
      { part: 'C', name: 'Picture', about: 'The person’s picture, cropped to fill the square.' }
    ],
    attributes: [
      { part: 'A', attribute: 'Size', token: 'plx-comp-avatar-20-width, plx-comp-avatar-24-width, plx-comp-avatar-28-width, plx-comp-avatar-32-width, plx-comp-avatar-40-width, plx-comp-avatar-48-width, plx-comp-avatar-64-width', value: '20, 24, 28 (default), 32, 40, 48 or 64 dp; 40 dp in a list row', material: '40 dp in a list',
        compose: 'Modifier.size(size.dp)', views: 'layoutParams = ViewGroup.LayoutParams(px(size.dp), px(size.dp))', ...M3('Lists', 'https://m3.material.io/components/lists/specs') },
      { part: 'A', attribute: 'Corner radius', token: 'plx-comp-avatar-20-radius, plx-comp-avatar-28-radius, plx-comp-avatar-48-radius', value: '4 dp at 20–24 dp, 6 dp at 28–40 dp, 8 dp at 48–64 dp (PlenixRadius.radiusAvatar4px, radiusAvatar6px, radiusAvatar8px)', material: 'A circle',
        compose: 'Modifier.clip(RoundedCornerShape(avatarRadius(size)))', views: 'ShapeAppearanceModel.builder().setAllCornerSizes(px(avatarRadius(size)).toFloat())', ...M3('Shape', 'https://m3.material.io/styles/shape/corner-radius-scale') },
      { part: 'A', attribute: 'Fill', token: 'plx-comp-avatar-background', value: 'avatarBackground; a person’s own color uses its soft fill; a category its category color', material: 'primaryContainer',
        compose: 'Modifier.background(PlenixColors.avatarBackground.current())', views: 'fillColor = ColorStateList.valueOf(argb(PlenixColors.avatarBackground.light, PlenixColors.avatarBackground.dark))', ...M3('Color roles', 'https://m3.material.io/styles/color/roles') },
      { part: 'B', attribute: 'Initials type', token: 'plx-comp-avatar-font-weight, plx-comp-avatar-line-height, plx-comp-avatar-28-font-size', value: 'DM Sans bold; 10, 10, 11, 12, 15, 18 or 20 by size; fixed, so the initials never outgrow the square', material: 'Title medium',
        compose: 'TextStyle(fontFamily = Sans, fontWeight = FontWeight.Bold, fontSize = with(LocalDensity.current) { avatarText(size).dp.toSp() })', views: 'setTextSize(TypedValue.COMPLEX_UNIT_DIP, avatarText(size).toFloat()); typeface DM Sans Bold', ...M3('Typography', 'https://m3.material.io/styles/typography/type-scale-tokens') },
      { part: 'B', attribute: 'Initials color', token: 'plx-comp-avatar-content', value: 'avatarContent; with an own color its on-soft color; with a category black or white (the category’s On color)', material: 'onPrimaryContainer',
        compose: 'color = PlenixColors.avatarContent.current()', views: 'setTextColor(argb(PlenixColors.avatarContent.light, PlenixColors.avatarContent.dark))', ...M3('Color roles', 'https://m3.material.io/styles/color/roles') },
      { part: 'B', attribute: 'Initials rule', token: 'initialsOf(name) on the web', value: 'First and last name initials; titles ending in a period and parenthesized parts are skipped; one word gives one letter', material: 'None',
        compose: 'initialsOf(name)', views: 'initialsOf(name)', ...M3('Lists', 'https://m3.material.io/components/lists/specs') },
      { part: 'C', attribute: 'Picture', token: 'None', value: 'Cropped to fill the square; the initials show while it loads and if it fails', material: 'Cropped to a circle',
        compose: 'SubcomposeAsyncImage(model = url, contentScale = ContentScale.Crop, error = { Initials() }) (Coil)', views: 'ShapeableImageView, scaleType = CENTER_CROP; the TextView avatar on an error', ...M3('Lists', 'https://m3.material.io/components/lists/specs') },
      { part: 'A', attribute: 'Accessible name', token: 'None', value: 'With a label: an image named by the label; without: hidden from TalkBack, as a name is usually beside it', material: 'Decorative in a list',
        compose: 'Modifier.semantics { contentDescription = label; role = Role.Image }, or Modifier.clearAndSetSemantics {}', views: 'contentDescription = label, or importantForAccessibility = IMPORTANT_FOR_ACCESSIBILITY_NO', ...M3('Accessibility', 'https://m3.material.io/foundations/designing/structure') }
    ],
    states: [
      { state: 'Initials', token: 'plx-comp-avatar-background, plx-comp-avatar-content', compose: 'No picture: the Text', views: 'The TextView avatar' },
      { state: 'Picture loading', token: 'plx-comp-avatar-background', compose: 'SubcomposeAsyncImage loading = { Initials() }', views: 'The TextView avatar until the image is set' },
      { state: 'Picture failed', token: 'plx-comp-avatar-background, plx-comp-avatar-content', compose: 'SubcomposeAsyncImage error = { Initials() }', views: 'Keep the TextView avatar' },
      { state: 'In a button', token: 'None', compose: 'The surrounding button’s pressed, focused and disabled states', views: 'The surrounding button’s states' }
    ],
    code: {
      compose: [
        'import coil.compose.SubcomposeAsyncImage',
        'import plenix.tokens.*',
        '',
        '// Sans: the DM Sans family (PlenixFonts.SANS), set once in the app theme',
        '',
        '/** Initials: first and last name, skipping titles ("Fr.") and parenthesized parts; one word gives one letter. */',
        'fun initialsOf(name: String): String {',
        '    val words = name.replace(Regex("\\\\(.*?\\\\)"), " ").split(\' \').filter { it.isNotBlank() && !it.endsWith(".") }',
        '    return when (words.size) { 0 -> ""; 1 -> words[0].take(1); else -> words.first().take(1) + words.last().take(1) }.uppercase()',
        '}',
        '',
        'fun avatarRadius(size: Int): Dp = when {',
        '    size <= 24 -> PlenixRadius.radiusAvatar4px',
        '    size <= 40 -> PlenixRadius.radiusAvatar6px',
        '    else -> PlenixRadius.radiusAvatar8px',
        '}',
        '/** The initials size per avatar size (plx-comp-avatar-<size>-font-size). */',
        'fun avatarText(size: Int): Int = when (size) { 20, 24 -> 10; 28 -> 11; 32 -> 12; 40 -> 15; 48 -> 18; else -> 20 }',
        '',
        'enum class DataHue { Blue, Green, Purple, Red, Brown, Gray }',
        '',
        '@Composable',
        'private fun hueColors(hue: DataHue): Pair<Color, Color> = when (hue) {',
        '    DataHue.Blue -> PlenixColors.dataColorBlueSoft.current() to PlenixColors.dataColorBlueOnSoft.current()',
        '    DataHue.Green -> PlenixColors.dataColorGreenSoft.current() to PlenixColors.dataColorGreenOnSoft.current()',
        '    DataHue.Purple -> PlenixColors.dataColorPurpleSoft.current() to PlenixColors.dataColorPurpleOnSoft.current()',
        '    DataHue.Red -> PlenixColors.dataColorRedSoft.current() to PlenixColors.dataColorRedOnSoft.current()',
        '    DataHue.Brown -> PlenixColors.dataColorBrownSoft.current() to PlenixColors.dataColorBrownOnSoft.current()',
        '    DataHue.Gray -> PlenixColors.dataColorGraySoft.current() to PlenixColors.dataColorGrayOnSoft.current()',
        '}',
        '',
        '/** The Plenix avatar on Android: a picture or initials in a rounded square, with the Plenix avatar tokens. */',
        '@Composable',
        'fun PlenixAvatar(',
        '    name: String,',
        '    size: Int = 28,                              // 20, 24, 28, 32, 40, 48 or 64',
        '    pictureUrl: String? = null,',
        '    hue: DataHue? = null,                        // the person’s own color',
        '    category: Pair<Color, Color>? = null,        // a category color and its On color',
        '    label: String? = null,',
        ') {',
        '    val (fill, text) = category ?: hue?.let { hueColors(it) }',
        '        ?: (PlenixColors.avatarBackground.current() to PlenixColors.avatarContent.current())',
        '    val a11y = if (label != null) Modifier.semantics { contentDescription = label; role = Role.Image } else Modifier.clearAndSetSemantics { }',
        '    val initials = @Composable {',
        '        Box(Modifier.fillMaxSize().background(fill), contentAlignment = Alignment.Center) {',
        '            Text(initialsOf(name), color = text, maxLines = 1, style = TextStyle(fontFamily = Sans, fontWeight = FontWeight.Bold,',
        '                fontSize = with(LocalDensity.current) { avatarText(size).dp.toSp() }, lineHeight = with(LocalDensity.current) { avatarText(size).dp.toSp() }))',
        '        }',
        '    }',
        '    Box(Modifier.size(size.dp).clip(RoundedCornerShape(avatarRadius(size))).then(a11y)) {',
        '        if (pictureUrl != null) SubcomposeAsyncImage(model = pictureUrl, contentDescription = null, contentScale = ContentScale.Crop,',
        '            modifier = Modifier.matchParentSize(), loading = { initials() }, error = { initials() })',
        '        else initials()',
        '    }',
        '}',
        '',
        '// In a list row',
        'PlenixListRow("Jordan Avery", supporting = "Owner", leading = { PlenixAvatar("Jordan Avery", size = 40) })'
      ],
      views: [
        'import android.content.res.ColorStateList',
        'import com.google.android.material.imageview.ShapeableImageView',
        'import com.google.android.material.shape.*',
        'import plenix.tokens.*',
        '',
        ...viewsHelpers,
        '',
        '// initialsOf, avatarRadius and avatarText: as in the Compose code',
        '',
        '/** A Plenix initials avatar for Views: a TextView on a rounded-square MaterialShapeDrawable. */',
        'fun avatarView(c: Context, name: String, size: Int = 28, fill: Int? = null, text: Int? = null, label: String? = null): TextView = TextView(c).apply {',
        '    layoutParams = ViewGroup.LayoutParams(c.px(size.dp), c.px(size.dp))',
        '    gravity = Gravity.CENTER',
        '    maxLines = 1',
        '    this.text = initialsOf(name)',
        '    typeface = ResourcesCompat.getFont(c, R.font.dm_sans_bold)',
        '    setTextSize(TypedValue.COMPLEX_UNIT_DIP, avatarText(size).toFloat())   // fixed: the square does not grow',
        '    setTextColor(text ?: c.argb(PlenixColors.avatarContent.light, PlenixColors.avatarContent.dark))',
        '    background = MaterialShapeDrawable(ShapeAppearanceModel.builder().setAllCornerSizes(c.px(avatarRadius(size)).toFloat()).build()).apply {',
        '        fillColor = ColorStateList.valueOf(fill ?: c.argb(PlenixColors.avatarBackground.light, PlenixColors.avatarBackground.dark))',
        '    }',
        '    if (label != null) contentDescription = label else importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO',
        '}',
        '',
        '/** A picture avatar: a ShapeableImageView with the same shape. */',
        'fun pictureAvatar(c: Context, size: Int = 28, label: String? = null) = ShapeableImageView(c).apply {',
        '    layoutParams = ViewGroup.LayoutParams(c.px(size.dp), c.px(size.dp))',
        '    scaleType = ImageView.ScaleType.CENTER_CROP',
        '    shapeAppearanceModel = ShapeAppearanceModel.builder().setAllCornerSizes(c.px(avatarRadius(size)).toFloat()).build()',
        '    if (label != null) contentDescription = label else importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO',
        '}',
        '',
        'row.addView(avatarView(this, "Jordan Avery", size = 40))',
        'row.addView(avatarView(this, "Website", fill = argb(PlenixColors.categoryBlue.light, PlenixColors.categoryBlue.dark),',
        '    text = argb(PlenixColors.categoryBlueOn.light, PlenixColors.categoryBlueOn.dark)))'
      ]
    }
  }
};

for (const [file, data] of [['android-alertdialog.json', alert], ['android-modalbottomsheet.json', sheet], ['android-tooltip.json', tooltip], ['android-avatar.json', avatar]]) {
  fs.writeFileSync(OUT + file, JSON.stringify(data, null, 1) + '\n');
  console.log('wrote ' + file);
}
