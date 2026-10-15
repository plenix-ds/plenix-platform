// Writes ios-pickers.json, ios-pop-up-buttons.json, ios-color-wells.json, ios-search-fields.json, ios-page-controls.json
const fs = require('fs');
const OUT = __dirname + '/';
const MAC = '// A Mac Catalyst app uses the iOS tokens and the UIKit code above. A native AppKit app needs a macOS build of\n// PlenixTokens.swift (it uses UIColor today; the macOS build is not generated yet). With it:';
const lines = (s) => s.replace(/^\n/, '').replace(/\n$/, '').split('\n');
const write = (slug, key, d) => fs.writeFileSync(OUT + 'ios-' + slug + '.json', JSON.stringify({ [key]: d }, null, 1));
const BODY_FONT_UIKIT = 'UIFontMetrics(forTextStyle: .body).scaledFont(for: UIFont(name: "DMSans-Regular", size: 17))';

// ---------------------------------------------------------------- Pickers
write('pickers', 'ios-forms|Pickers', {
  summary: 'A Plenix picker on iOS is the system date, time or value picker, kept native in behavior (the calendar grid, the wheels, Dynamic Type, VoiceOver adjustable values) and opened from a Plenix field: a 6-point rounded rectangle at least 44 points tall with the control background and border, the value in DM Sans at the body text role, and the Plenix primary color for the chosen day. Apple’s default shows the value on a gray pill in the system tint; Plenix keeps the system picker and replaces the field and the colors around it.',
  variants: [
    { name: 'Date field', apple: 'Date and time - Pickers, Style=Compact (Show Date)', web: 'forms|Date picker', background: 'plx-sys-control-background', content: 'plx-sys-content-default', border: 'plx-sys-control-border',
      swiftui: 'PlenixDateField(components: .date): a field button that opens DatePicker(.graphical) in a popover', uikit: 'A bordered UIButton that presents a UIDatePicker (preferredDatePickerStyle .inline) in a popover', appkit: 'NSDatePicker, datePickerStyle .textFieldAndStepper',
      use: 'One date in a form or a property row, where space is tight.' },
    { name: 'Time field', apple: 'Date and time - Pickers, Style=Compact (Show Time)', web: 'forms|Time picker', background: 'plx-sys-control-background', content: 'plx-sys-content-default', border: 'plx-sys-control-border',
      swiftui: 'PlenixDateField(components: .hourAndMinute): opens DatePicker(.wheel) in a popover', uikit: 'UIDatePicker, datePickerMode .time, preferredDatePickerStyle .wheels, minuteInterval', appkit: 'NSDatePicker with datePickerElements .hourMinute',
      use: 'A time of day; set a minute interval that divides 60 when exact minutes are not needed.' },
    { name: 'Calendar', apple: 'Date and time - Pickers, Style=Inline', web: 'forms|Date picker', background: 'plx-sys-surface-raised', content: 'plx-sys-content-default', border: null,
      swiftui: 'DatePicker with .datePickerStyle(.graphical) and .tint(Plenix.Colors.actionPrimaryBackground)', uikit: 'UIDatePicker, preferredDatePickerStyle .inline, tintColor', appkit: 'NSDatePicker, datePickerStyle .clockAndCalendar',
      use: 'Browsing days, when the date is the main task of the screen.' },
    { name: 'Value wheel', apple: 'UIPickerView (no kit component; the wheel of Date and time - Pickers)', web: 'forms|Select', background: null, content: 'plx-sys-content-default', border: null,
      swiftui: 'Picker with .pickerStyle(.wheel)', uikit: 'UIPickerView with a delegate that returns DM Sans attributed titles', appkit: 'NSPopUpButton (the Mac has no wheel)',
      use: 'A medium to long ordered list of values, shown in place next to the value it edits.' }
  ],
  anatomy: [
    { part: 'A', name: 'Field', about: 'The rounded rectangle that shows the value and opens the picker; at least 44 points tall.' },
    { part: 'B', name: 'Value', about: 'The chosen date or time in DM Sans at the body text role; scales with Dynamic Type.' },
    { part: 'C', name: 'Calendar', about: 'The system calendar or wheels, in place or in a popover beside the field.' },
    { part: 'D', name: 'Selected day', about: 'The chosen day, filled with the Plenix primary color.' }
  ],
  attributes: [
    { part: 'A', attribute: 'Minimum height', token: 'plx-comp-input-min-height (plx-sys-control-height-standard)', value: '44 pt (Plenix.Platform.controlTargetMin)', apple: '34 pt pill, 44 pt target',
      swiftui: '.frame(minHeight: Plenix.Platform.controlTargetMin)', uikit: 'heightAnchor.constraint(greaterThanOrEqualToConstant: Plenix.Platform.controlTargetMin)', appkit: 'controlSize = .large', follows: 'iOS, iPadOS' },
    { part: 'A', attribute: 'Corner radius', token: 'plx-comp-input-radius', value: '6 pt (Plenix.Radius.radiusControl)', apple: '6 pt',
      swiftui: '.background(_, in: .rect(cornerRadius: Plenix.Radius.radiusControl))', uikit: 'configuration.background.cornerRadius', appkit: 'Drawn by the date picker cell', follows: 'iOS, iPadOS' },
    { part: 'A', attribute: 'Background and border', token: 'plx-comp-input-background, plx-comp-input-border-color, plx-comp-input-border-width', value: 'Control background, control border, 1 pt', apple: 'A tertiary gray fill, no border',
      swiftui: '.background(Plenix.Colors.controlBackground, in:) and .overlay { strokeBorder(Plenix.Colors.controlBorder, lineWidth: 1) }', uikit: 'configuration.background.backgroundColor, strokeColor, strokeWidth', appkit: 'backgroundColor, isBordered', follows: 'iOS, iPadOS' },
    { part: 'A', attribute: 'Inline padding', token: 'plx-comp-input-padding-inline', value: '12 pt (Plenix.Space.spaceInsetMd)', apple: '11 pt',
      swiftui: '.padding(.horizontal, Plenix.Space.spaceInsetMd)', uikit: 'configuration.contentInsets', appkit: 'Set by the cell', follows: 'iOS, iPadOS' },
    { part: 'B', attribute: 'Value text', token: 'plx-comp-input-font-family, plx-comp-input-text (iOS body role)', value: 'DM Sans regular, 17 pt on 22 pt, relative to Body (Plenix.Platform.textBodySize)', apple: 'SF Pro Regular 17 pt in the label color',
      swiftui: '.font(Plenix.Font.sans(Plenix.Platform.textBodySize, relativeTo: .body)).foregroundStyle(Plenix.Colors.contentDefault)', uikit: 'titleTextAttributesTransformer with ' + BODY_FONT_UIKIT, appkit: 'font = NSFont(name: "DMSans-Regular", size: 13)', follows: 'Best practices' },
    { part: 'C', attribute: 'Placement', token: 'plx-comp-combobox-list-margin-block-start', value: '4 pt below the field, in place or in a popover (Plenix.Space.spaceStackXs)', apple: 'A popover from the pill',
      swiftui: '.popover(isPresented:) with .presentationCompactAdaptation(.popover)', uikit: 'modalPresentationStyle = .popover, sourceView = field', appkit: 'The calendar opens in a popover from the field', follows: 'Best practices' },
    { part: 'C', attribute: 'Minute interval', token: 'None (a behavior)', value: '1, 5, 10, 15 or 30 minutes', apple: '1 minute',
      swiftui: 'Not available; use UIDatePicker through UIViewRepresentable', uikit: 'datePicker.minuteInterval = 5', appkit: 'Not available; round the value', follows: 'Best practices' },
    { part: 'D', attribute: 'Selected day and today', token: 'plx-sys-action-primary-background, plx-sys-action-primary-content', value: 'Primary background behind the chosen day; today in the same color as text', apple: 'The system tint',
      swiftui: '.tint(Plenix.Colors.actionPrimaryBackground)', uikit: 'datePicker.tintColor = UIColor(Plenix.Colors.actionPrimaryBackground)', appkit: 'datePicker.textColor and the accent color', follows: 'iOS, iPadOS' }
  ],
  states: [
    { state: 'Default', token: 'plx-comp-input-background, plx-comp-input-border-color, plx-comp-input-text', swiftui: 'The field button', uikit: 'UIButton.Configuration', appkit: 'NSDatePicker' },
    { state: 'Open (picker shown)', token: 'plx-comp-input-focus-border-color (only the border changes)', swiftui: 'The popover’s isPresented binding colors the stroke', uikit: 'configurationUpdateHandler while the popover shows', appkit: 'The field’s focus ring' },
    { state: 'Invalid (out of range)', token: 'plx-comp-input-invalid-border-color', swiftui: 'DatePicker(in: range) keeps the value valid; a stroke for a server error', uikit: 'minimumDate, maximumDate', appkit: 'minDate, maxDate' },
    { state: 'Disabled', token: 'plx-comp-input-disabled-background, plx-comp-input-disabled-text', swiftui: '.disabled(true)', uikit: 'isEnabled = false', appkit: 'isEnabled = false' }
  ],
  code: {
    swiftui: lines(`
import SwiftUI

/// The Plenix date or time field on iOS: a Plenix field that opens the system DatePicker beside it.
struct PlenixDateField: View {
    let title: String
    @Binding var date: Date
    var components: DatePickerComponents = .date
    @State private var isOpen = false
    @Environment(\\.isEnabled) private var isEnabled

    var body: some View {
        let shape = RoundedRectangle(cornerRadius: Plenix.Radius.radiusControl)
        Button { isOpen = true } label: {
            Text(date, format: components == .date ? .dateTime.day().month().year() : .dateTime.hour().minute())
                .font(Plenix.Font.sans(Plenix.Platform.textBodySize, relativeTo: .body))
                .foregroundStyle(isEnabled ? Plenix.Colors.contentDefault : Plenix.Colors.contentDisabled)
                .padding(.horizontal, Plenix.Space.spaceInsetMd)
                .frame(maxWidth: .infinity, minHeight: Plenix.Platform.controlTargetMin, alignment: .leading)
                .background(isEnabled ? Plenix.Colors.controlBackground : Plenix.Colors.fillNeutral, in: shape)
                .overlay { shape.strokeBorder(isOpen ? Plenix.Colors.focusRingColor : Plenix.Colors.controlBorder, lineWidth: 1) }
        }
        .buttonStyle(.plain)
        .accessibilityLabel(title)
        .popover(isPresented: $isOpen) {
            Group {
                if components == .date {
                    DatePicker(title, selection: $date, displayedComponents: components).datePickerStyle(.graphical)
                } else {
                    DatePicker(title, selection: $date, displayedComponents: components).datePickerStyle(.wheel)
                }
            }
            .labelsHidden()
            .tint(Plenix.Colors.actionPrimaryBackground)
            .padding(Plenix.Space.spaceInsetMd)
            .presentationCompactAdaptation(.popover)
        }
    }
}

// A value list in place
Picker("Priority", selection: $priority) {
    ForEach(Priority.allCases) { Text($0.title).tag($0) }
}
.pickerStyle(.wheel)
.font(Plenix.Font.sans(Plenix.Platform.textBodySize, relativeTo: .body))`),
    uikit: lines(`
import UIKit
import SwiftUI

/// The Plenix date field in UIKit: a bordered button that presents the system UIDatePicker in a popover.
final class PlenixDateFieldController: UIViewController {
    let picker = UIDatePicker()
    let field = UIButton(configuration: .plain())

    override func viewDidLoad() {
        super.viewDidLoad()
        picker.datePickerMode = .date
        picker.preferredDatePickerStyle = .inline
        picker.tintColor = UIColor(Plenix.Colors.actionPrimaryBackground)

        var c = UIButton.Configuration.plain()
        c.background.backgroundColor = UIColor(Plenix.Colors.controlBackground)
        c.background.strokeColor = UIColor(Plenix.Colors.controlBorder)
        c.background.strokeWidth = 1
        c.background.cornerRadius = Plenix.Radius.radiusControl
        c.baseForegroundColor = UIColor(Plenix.Colors.contentDefault)
        c.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: Plenix.Space.spaceInsetMd, bottom: 0, trailing: Plenix.Space.spaceInsetMd)
        c.titleTextAttributesTransformer = UIConfigurationTextAttributesTransformer { a in
            var a = a
            a.font = ${BODY_FONT_UIKIT}
            return a
        }
        field.configuration = c
        field.configuration?.title = picker.date.formatted(date: .abbreviated, time: .omitted)
        field.heightAnchor.constraint(greaterThanOrEqualToConstant: Plenix.Platform.controlTargetMin).isActive = true
        field.addAction(UIAction { [weak self] _ in self?.open() }, for: .primaryActionTriggered)
        picker.addAction(UIAction { [weak self] _ in
            guard let self else { return }
            self.field.configuration?.title = self.picker.date.formatted(date: .abbreviated, time: .omitted)
        }, for: .valueChanged)
    }

    private func open() {
        let host = UIViewController()
        host.view = picker
        host.modalPresentationStyle = .popover
        host.popoverPresentationController?.sourceView = field
        host.presentationController?.delegate = self
        field.configuration?.background.strokeColor = UIColor(Plenix.Colors.focusRingColor)   // open: only the border changes
        present(host, animated: true)
    }
}

extension PlenixDateFieldController: UIPopoverPresentationControllerDelegate {
    func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle { .none }
    func presentationControllerDidDismiss(_ presentationController: UIPresentationController) {
        field.configuration?.background.strokeColor = UIColor(Plenix.Colors.controlBorder)
    }
}`),
    appkit: lines(`
import AppKit
import SwiftUI

${MAC}
let due = NSDatePicker()
due.datePickerStyle = .textFieldAndStepper      // exact entry in tight space
due.datePickerElements = .yearMonthDay
due.font = NSFont(name: "DMSans-Regular", size: 13)
due.textColor = NSColor(Plenix.Colors.contentDefault)
due.backgroundColor = NSColor(Plenix.Colors.controlBackground)

let calendar = NSDatePicker()
calendar.datePickerStyle = .clockAndCalendar    // browsing days or picking a range
calendar.datePickerMode = .range`)
  }
});

// ---------------------------------------------------------------- Pop-up buttons
write('pop-up-buttons', 'ios-actions|Pop-up buttons', {
  summary: 'A Plenix pop-up button on iOS is the system menu button that shows one choice from a flat list, kept native in behavior (the system menu, the checkmark on the current choice, VoiceOver) and styled as the Plenix select: a 6-point rounded rectangle at least 44 points tall with the control background and border, the current choice in DM Sans at the body text role and an up-down chevron in the muted content color. Apple’s default is borderless text in the system tint; Plenix keeps the system menu and replaces the button’s look.',
  variants: [
    { name: 'Field', apple: 'Popup Button, Is Enabled=True', web: 'forms|Select', background: 'plx-sys-control-background', content: 'plx-sys-content-default', border: 'plx-sys-control-border',
      swiftui: 'PlenixPopUpButton: a Menu holding a Picker, with a Plenix field label', uikit: 'UIButton with menu, showsMenuAsPrimaryAction and changesSelectionAsPrimaryAction', appkit: 'NSPopUpButton(frame:pullsDown: false)',
      use: 'A choice in a form, a sheet or a popover, where the options need not show all the time.' },
    { name: 'Plain', apple: 'Popup Button, Is Enabled=True (as Apple ships it)', web: 'forms|Native select', background: null, content: 'plx-sys-content-link', border: null,
      swiftui: 'Picker with .pickerStyle(.menu) and .tint(Plenix.Colors.contentLink)', uikit: 'UIButton.Configuration.plain() with the menu and indicator .popup', appkit: 'NSPopUpButton with isBordered = false',
      use: 'The trailing value of a list row or a toolbar, where a frame would crowd the row.' }
  ],
  anatomy: [
    { part: 'A', name: 'Container', about: 'The rounded rectangle that opens the menu; at least 44 points tall.' },
    { part: 'B', name: 'Current choice', about: 'The chosen option in DM Sans at the body text role; scales with Dynamic Type.' },
    { part: 'C', name: 'Indicator', about: 'The up-down chevron that marks a pop-up button, in the muted content color.' },
    { part: 'D', name: 'Menu', about: 'The system menu of options, with a checkmark on the current one.' }
  ],
  attributes: [
    { part: 'A', attribute: 'Minimum height', token: 'plx-comp-input-min-height (plx-sys-control-height-standard)', value: '44 pt (Plenix.Platform.controlTargetMin)', apple: '44 pt target',
      swiftui: '.frame(minHeight: Plenix.Platform.controlTargetMin)', uikit: 'heightAnchor.constraint(greaterThanOrEqualToConstant: Plenix.Platform.controlTargetMin)', appkit: 'controlSize = .large', follows: 'Best practices' },
    { part: 'A', attribute: 'Corner radius', token: 'plx-comp-input-radius', value: '6 pt (Plenix.Radius.radiusControl)', apple: 'None (borderless)',
      swiftui: '.background(_, in: .rect(cornerRadius: Plenix.Radius.radiusControl))', uikit: 'configuration.background.cornerRadius', appkit: 'Drawn by the bezel', follows: 'Best practices' },
    { part: 'A', attribute: 'Background and border', token: 'plx-comp-input-background, plx-comp-input-border-color, plx-comp-input-border-width', value: 'Control background, control border, 1 pt', apple: 'None',
      swiftui: '.background(Plenix.Colors.controlBackground, in:) and .overlay { strokeBorder(Plenix.Colors.controlBorder, lineWidth: 1) }', uikit: 'configuration.background.backgroundColor, strokeColor, strokeWidth', appkit: 'bezelStyle = .push', follows: 'Best practices' },
    { part: 'A', attribute: 'Padding', token: 'plx-comp-input-padding-inline, plx-comp-select-after-inset-inline-end', value: '12 pt on both sides (Plenix.Space.spaceInsetMd)', apple: '0 pt',
      swiftui: '.padding(.horizontal, Plenix.Space.spaceInsetMd)', uikit: 'configuration.contentInsets', appkit: 'Set by the cell', follows: 'Best practices' },
    { part: 'B', attribute: 'Current choice text', token: 'plx-comp-input-font-family, plx-comp-input-text (iOS body role)', value: 'DM Sans regular, 17 pt on 22 pt, relative to Body (Plenix.Platform.textBodySize)', apple: 'SF Pro Regular 17 pt in the tint',
      swiftui: '.font(Plenix.Font.sans(Plenix.Platform.textBodySize, relativeTo: .body)).foregroundStyle(Plenix.Colors.contentDefault)', uikit: 'titleTextAttributesTransformer with ' + BODY_FONT_UIKIT, appkit: 'font = NSFont(name: "DMSans-Regular", size: 13)', follows: 'Best practices' },
    { part: 'C', attribute: 'Indicator', token: 'plx-comp-select-after-background, plx-comp-select-after-width', value: 'chevron.up.chevron.down, muted content color, 12 pt', apple: 'The same symbol in the tint',
      swiftui: 'Image(systemName: "chevron.up.chevron.down").foregroundStyle(Plenix.Colors.contentMuted)', uikit: 'configuration.indicator = .popup; indicatorColorTransformer', appkit: 'Drawn by NSPopUpButtonCell (arrowPosition)', follows: 'Best practices' },
    { part: 'C', attribute: 'Choice and indicator gap', token: 'plx-sys-space-inline-sm', value: '8 pt (Plenix.Space.spaceInlineSm)', apple: '4 pt',
      swiftui: 'HStack(spacing: Plenix.Space.spaceInlineSm)', uikit: 'configuration.imagePadding', appkit: 'Set by the cell', follows: 'Best practices' },
    { part: 'D', attribute: 'Menu', token: 'plx-comp-menu-background, plx-comp-menu-radius (the web menu)', value: 'The system menu', apple: 'The system menu',
      swiftui: 'Menu { Picker(_:selection:) } (the system draws it)', uikit: 'UIMenu with UIAction state .on for the current choice', appkit: 'NSMenu with the selected item’s state = .on', follows: 'Best practices' }
  ],
  states: [
    { state: 'Default', token: 'plx-comp-input-background, plx-comp-input-border-color, plx-comp-input-text', swiftui: 'The Menu label', uikit: 'UIButton.Configuration', appkit: 'NSPopUpButton' },
    { state: 'Pressed', token: 'plx-sys-state-pressed', swiftui: 'The system highlights the label while the menu opens', uikit: 'configurationUpdateHandler reading button.isHighlighted', appkit: 'isHighlighted' },
    { state: 'Open', token: 'plx-comp-input-focus-border-color (only the border changes)', swiftui: 'The system presents the menu', uikit: 'contextMenuInteraction(_:willDisplayMenuFor:animator:)', appkit: 'NSPopUpButton.willPopUpNotification' },
    { state: 'Disabled', token: 'plx-comp-input-disabled-background, plx-comp-input-disabled-text', swiftui: '.disabled(true)', uikit: 'isEnabled = false', appkit: 'isEnabled = false' }
  ],
  code: {
    swiftui: lines(`
import SwiftUI

/// The Plenix pop-up button on iOS: the system menu of choices, opened from a Plenix select field.
struct PlenixPopUpButton<Value: Hashable & Identifiable>: View {
    let title: String
    @Binding var selection: Value
    let options: [Value]
    let name: (Value) -> String
    @Environment(\\.isEnabled) private var isEnabled

    var body: some View {
        let shape = RoundedRectangle(cornerRadius: Plenix.Radius.radiusControl)
        Menu {
            Picker(title, selection: $selection) {
                ForEach(options) { Text(name($0)).tag($0) }
            }
        } label: {
            HStack(spacing: Plenix.Space.spaceInlineSm) {
                Text(name(selection))
                    .foregroundStyle(isEnabled ? Plenix.Colors.contentDefault : Plenix.Colors.contentDisabled)
                Spacer(minLength: 0)
                Image(systemName: "chevron.up.chevron.down")
                    .foregroundStyle(Plenix.Colors.contentMuted)
                    .accessibilityHidden(true)
            }
            .font(Plenix.Font.sans(Plenix.Platform.textBodySize, relativeTo: .body))
            .padding(.horizontal, Plenix.Space.spaceInsetMd)
            .frame(minHeight: Plenix.Platform.controlTargetMin)
            .background(isEnabled ? Plenix.Colors.controlBackground : Plenix.Colors.fillNeutral, in: shape)
            .overlay { shape.strokeBorder(Plenix.Colors.controlBorder, lineWidth: 1) }
        }
        .accessibilityLabel(title)
        .accessibilityValue(name(selection))
    }
}

// The plain variant in a list row
Picker("Sort by", selection: $sort) { ForEach(Sort.allCases) { Text($0.title).tag($0) } }
    .pickerStyle(.menu)
    .tint(Plenix.Colors.contentLink)`),
    uikit: lines(`
import UIKit
import SwiftUI

/// The Plenix pop-up button in UIKit: a UIButton whose menu changes the selection.
func plenixPopUpButton(title: String, options: [String], selected: String, onChange: @escaping (String) -> Void) -> UIButton {
    var c = UIButton.Configuration.plain()
    c.background.backgroundColor = UIColor(Plenix.Colors.controlBackground)
    c.background.strokeColor = UIColor(Plenix.Colors.controlBorder)
    c.background.strokeWidth = 1
    c.background.cornerRadius = Plenix.Radius.radiusControl
    c.baseForegroundColor = UIColor(Plenix.Colors.contentDefault)
    c.indicator = .popup
    c.indicatorColorTransformer = UIConfigurationColorTransformer { _ in UIColor(Plenix.Colors.contentMuted) }
    c.imagePadding = Plenix.Space.spaceInlineSm
    c.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: Plenix.Space.spaceInsetMd, bottom: 0, trailing: Plenix.Space.spaceInsetMd)
    c.titleTextAttributesTransformer = UIConfigurationTextAttributesTransformer { a in
        var a = a
        a.font = ${BODY_FONT_UIKIT}
        return a
    }
    let button = UIButton(configuration: c)
    button.menu = UIMenu(title: title, options: .singleSelection, children: options.map { option in
        UIAction(title: option, state: option == selected ? .on : .off) { _ in onChange(option) }
    })
    button.showsMenuAsPrimaryAction = true
    button.changesSelectionAsPrimaryAction = true
    button.accessibilityLabel = title
    button.heightAnchor.constraint(greaterThanOrEqualToConstant: Plenix.Platform.controlTargetMin).isActive = true
    button.configurationUpdateHandler = { b in
        b.configuration?.background.backgroundColor = UIColor(b.isHighlighted ? Plenix.Colors.statePressed : Plenix.Colors.controlBackground)
    }
    return button
}`),
    appkit: lines(`
import AppKit
import SwiftUI

${MAC}
let sort = NSPopUpButton(frame: .zero, pullsDown: false)
sort.addItems(withTitles: ["Name", "Date added", "Size"])
sort.selectItem(withTitle: "Name")
sort.controlSize = .large
sort.font = NSFont(name: "DMSans-Regular", size: 13)
sort.contentTintColor = NSColor(Plenix.Colors.contentDefault)
sort.setAccessibilityLabel("Sort by")`)
  }
});

// ---------------------------------------------------------------- Color wells
write('color-wells', 'ios-forms|Color wells', {
  summary: 'A Plenix color well on iOS is the Plenix color swatch as a button that opens the system color picker, so people keep their saved colors, the eyedropper and VoiceOver color names. The swatch shows the chosen color with a 1-point default border, square with 2-point corners or round, inside a 44-point touch target; the chosen state adds the 2-point content-color ring of the Plenix swatch. Apple’s default is a round well with a color-wheel ring; Plenix keeps the system picker and replaces the well.',
  variants: [
    { name: 'Square', apple: 'Picker Button, Size=Large', web: 'forms|Color picker', background: 'plx-comp-color-swatch-value', content: null, border: 'plx-comp-color-swatch-border-color',
      swiftui: 'PlenixColorWell(shape: .square): a swatch button that presents UIColorPickerViewController', uikit: 'A UIButton with the swatch, presenting UIColorPickerViewController', appkit: 'NSColorWell, colorWellStyle .minimal',
      use: 'A color setting in a form or an inspector, beside its label.' },
    { name: 'Round', apple: 'Picker Button, Size=Small', web: 'forms|Swatch picker', background: 'plx-comp-color-swatch-value', content: null, border: 'plx-comp-color-swatch-border-color',
      swiftui: 'PlenixColorWell(shape: .round)', uikit: 'The same button with a circular swatch', appkit: 'NSColorWell, colorWellStyle .default',
      use: 'A row of swatches, such as a toolbar or a palette, where round chips read as colors to pick.' }
  ],
  anatomy: [
    { part: 'A', name: 'Target', about: 'The invisible 44 by 44 point area that takes the tap.' },
    { part: 'B', name: 'Swatch', about: 'The chosen color with a 1-point border, square with 2-point corners or round.' },
    { part: 'C', name: 'Chosen ring', about: 'The 2-point ring in the content color while the swatch is the chosen one or its picker is open.' },
    { part: 'D', name: 'Color picker', about: 'The system color picker sheet or popover that sets the color.' }
  ],
  attributes: [
    { part: 'A', attribute: 'Touch target', token: 'plx-sys-control-height-standard', value: '44 by 44 pt (Plenix.Platform.controlTargetMin)', apple: '44 pt',
      swiftui: '.frame(minWidth: Plenix.Platform.controlTargetMin, minHeight: Plenix.Platform.controlTargetMin).contentShape(.rect)', uikit: 'widthAnchor and heightAnchor ≥ Plenix.Platform.controlTargetMin', appkit: 'controlSize = .large', follows: 'Best practices' },
    { part: 'B', attribute: 'Swatch size', token: 'plx-comp-color-swatch-md-width, plx-comp-color-swatch-md-height', value: '20 pt (md); 16 pt (sm) in dense rows', apple: '28 pt ring',
      swiftui: '.frame(width: swatchSize, height: swatchSize) (20 pt, plx-comp-color-swatch-md-width; not in PlenixTokens.swift yet)', uikit: 'A 20 pt swatch view centered in the button', appkit: 'Set by the well style', follows: 'Best practices' },
    { part: 'B', attribute: 'Shape', token: 'plx-comp-color-swatch-radius, plx-comp-color-swatch-round-radius', value: '2 pt corners (square) or a circle (round)', apple: 'A circle',
      swiftui: 'RoundedRectangle(cornerRadius: swatchRadius) or Circle()', uikit: 'layer.cornerRadius = 2, or half the size', appkit: 'colorWellStyle (.minimal is square, .default is round)', follows: 'Best practices' },
    { part: 'B', attribute: 'Border', token: 'plx-comp-color-swatch-border-color, plx-comp-color-swatch-border-width', value: '1 pt, default border', apple: 'A color-wheel ring',
      swiftui: '.overlay { shape.strokeBorder(Plenix.Colors.borderDefault, lineWidth: 1) }', uikit: 'layer.borderColor, layer.borderWidth = 1', appkit: 'Drawn by the well', follows: 'Best practices' },
    { part: 'C', attribute: 'Chosen ring', token: 'plx-comp-color-swatch-pressed-shadow', value: '2 pt ring in the default content color', apple: 'A thicker ring',
      swiftui: '.padding(2).overlay { shape.stroke(Plenix.Colors.contentDefault, lineWidth: 2) } when chosen', uikit: 'A 2 pt outer ring layer in Plenix.Colors.contentDefault', appkit: 'isActive (the well highlights while its panel is open)', follows: 'macOS' },
    { part: 'D', attribute: 'Picker', token: 'None (the system picker)', value: 'UIColorPickerViewController; supportsAlpha off unless opacity matters', apple: 'The same picker',
      swiftui: '.sheet { SystemColorPicker(color: $color) } (a UIViewControllerRepresentable)', uikit: 'UIColorPickerViewController, delegate colorPickerViewController(_:didSelect:continuously:)', appkit: 'NSColorPanel.shared', follows: 'Best practices' }
  ],
  states: [
    { state: 'Default', token: 'plx-comp-color-swatch-border-color', swiftui: 'The swatch button', uikit: 'UIButton with the swatch', appkit: 'NSColorWell' },
    { state: 'Chosen (picker open, or the selected swatch in a row)', token: 'plx-comp-color-swatch-pressed-shadow', swiftui: 'isPicking or isSelected draws the ring; .accessibilityAddTraits(.isSelected)', uikit: 'isSelected; accessibilityTraits .selected', appkit: 'isActive' },
    { state: 'Focused (keyboard, iPad and Mac)', token: 'plx-comp-color-swatch-focus-outline-color', swiftui: 'The system focus effect', uikit: 'The focus system (canBecomeFocused)', appkit: 'focusRingType = .default' },
    { state: 'Disabled', token: 'plx-sys-content-disabled (border), the swatch at reduced opacity', swiftui: '.disabled(true)', uikit: 'isEnabled = false', appkit: 'isEnabled = false' }
  ],
  code: {
    swiftui: lines(`
import SwiftUI
import UIKit

/// The Plenix color well on iOS: the Plenix swatch as a button that opens the system color picker.
struct PlenixColorWell: View {
    enum Shape { case square, round }
    let title: String
    @Binding var color: Color
    var shape: Shape = .square
    @State private var isPicking = false
    private let swatchSize: CGFloat = 20     // plx-comp-color-swatch-md (not in PlenixTokens.swift yet)
    private let swatchRadius: CGFloat = 2    // plx-comp-color-swatch-radius (not in PlenixTokens.swift yet)

    var body: some View {
        Button { isPicking = true } label: {
            swatch
                .frame(minWidth: Plenix.Platform.controlTargetMin, minHeight: Plenix.Platform.controlTargetMin)
                .contentShape(.rect)
        }
        .buttonStyle(.plain)
        .accessibilityLabel(title)
        .accessibilityValue(UIColor(color).accessibilityName)
        .sheet(isPresented: $isPicking) { SystemColorPicker(color: $color).presentationDetents([.medium, .large]) }
    }

    @ViewBuilder private var swatch: some View {
        let ring: CGFloat = isPicking ? 2 : 0    // plx-comp-color-swatch-pressed-shadow
        switch shape {
        case .square:
            RoundedRectangle(cornerRadius: swatchRadius).fill(color)
                .overlay { RoundedRectangle(cornerRadius: swatchRadius).strokeBorder(Plenix.Colors.borderDefault, lineWidth: 1) }
                .frame(width: swatchSize, height: swatchSize)
                .padding(ring).overlay { if isPicking { RoundedRectangle(cornerRadius: swatchRadius + ring).stroke(Plenix.Colors.contentDefault, lineWidth: ring) } }
        case .round:
            Circle().fill(color)
                .overlay { Circle().strokeBorder(Plenix.Colors.borderDefault, lineWidth: 1) }
                .frame(width: swatchSize, height: swatchSize)
                .padding(ring).overlay { if isPicking { Circle().stroke(Plenix.Colors.contentDefault, lineWidth: ring) } }
        }
    }
}

/// The system color picker, so people keep their saved colors and the eyedropper.
struct SystemColorPicker: UIViewControllerRepresentable {
    @Binding var color: Color
    func makeUIViewController(context: Context) -> UIColorPickerViewController {
        let picker = UIColorPickerViewController()
        picker.supportsAlpha = false
        picker.selectedColor = UIColor(color)
        picker.delegate = context.coordinator
        return picker
    }
    func updateUIViewController(_ picker: UIColorPickerViewController, context: Context) {}
    func makeCoordinator() -> Coordinator { Coordinator(color: $color) }
    final class Coordinator: NSObject, UIColorPickerViewControllerDelegate {
        @Binding var color: Color
        init(color: Binding<Color>) { _color = color }
        func colorPickerViewController(_ picker: UIColorPickerViewController, didSelect selected: UIColor, continuously: Bool) { color = Color(selected) }
    }
}`),
    uikit: lines(`
import UIKit
import SwiftUI

/// The Plenix color well in UIKit: a 44-point button with a Plenix swatch that presents the system color picker.
final class PlenixColorWellButton: UIButton, UIColorPickerViewControllerDelegate {
    private let swatch = UIView()
    private let ring = CAShapeLayer()
    var selectedColor: UIColor = UIColor(Plenix.Colors.dataColorBlue) { didSet { swatch.backgroundColor = selectedColor; sendActions(for: .valueChanged) } }

    override init(frame: CGRect) {
        super.init(frame: frame)
        swatch.isUserInteractionEnabled = false
        swatch.backgroundColor = selectedColor
        swatch.layer.cornerRadius = 2                         // plx-comp-color-swatch-radius (round: half the size)
        swatch.layer.borderWidth = 1
        swatch.layer.borderColor = UIColor(Plenix.Colors.borderDefault).cgColor
        swatch.translatesAutoresizingMaskIntoConstraints = false
        addSubview(swatch)
        NSLayoutConstraint.activate([
            widthAnchor.constraint(greaterThanOrEqualToConstant: Plenix.Platform.controlTargetMin),
            heightAnchor.constraint(greaterThanOrEqualToConstant: Plenix.Platform.controlTargetMin),
            swatch.widthAnchor.constraint(equalToConstant: 20),   // plx-comp-color-swatch-md
            swatch.heightAnchor.constraint(equalTo: swatch.widthAnchor),
            swatch.centerXAnchor.constraint(equalTo: centerXAnchor),
            swatch.centerYAnchor.constraint(equalTo: centerYAnchor)
        ])
        addAction(UIAction { [weak self] _ in self?.openPicker() }, for: .primaryActionTriggered)
    }
    required init?(coder: NSCoder) { fatalError() }

    private func openPicker() {
        let picker = UIColorPickerViewController()
        picker.supportsAlpha = false
        picker.selectedColor = selectedColor
        picker.delegate = self
        isSelected = true                                     // draws the chosen ring
        window?.rootViewController?.present(picker, animated: true)
    }
    func colorPickerViewController(_ picker: UIColorPickerViewController, didSelect color: UIColor, continuously: Bool) { selectedColor = color }
    func colorPickerViewControllerDidFinish(_ picker: UIColorPickerViewController) { isSelected = false }

    override var isSelected: Bool {
        didSet {
            swatch.layer.shadowPath = nil
            swatch.layer.borderColor = UIColor(isSelected ? Plenix.Colors.contentDefault : Plenix.Colors.borderDefault).cgColor
            swatch.layer.borderWidth = isSelected ? 2 : 1          // plx-comp-color-swatch-pressed-shadow
        }
    }
}`),
    appkit: lines(`
import AppKit
import SwiftUI

${MAC}
// The Mac keeps its native color well: it highlights while the panel is open, updates at once and takes dragged colors.
let well = NSColorWell(style: .minimal)       // .minimal for the square swatch, .default for the round one
well.color = NSColor(Plenix.Colors.dataColorBlue)
well.supportsAlpha = false
well.setAccessibilityLabel("Label color")`)
  }
});

// ---------------------------------------------------------------- Search fields
write('search-fields', 'ios-navigation|Search fields', {
  summary: 'A Plenix search field on iOS is the system search text field, kept native in behavior (the search keyboard, dictation, the clear button, scope bars and tokens, VoiceOver’s search field trait) and styled as the Plenix search input: a 6-point rounded rectangle at least 44 points tall on the neutral fill with the control border, a magnifying glass in the muted content color, and DM Sans at the body text role. Apple’s default is a gray capsule with an SF Pro prompt; Plenix keeps the system field and its placements and replaces the look.',
  variants: [
    { name: 'Field', apple: 'Sidebar Search Field', web: 'forms|Search input', background: 'plx-comp-search-input-background', content: 'plx-comp-search-input-text', border: 'plx-comp-search-input-border-color',
      swiftui: 'PlenixSearchField (inline above content), or .searchable with the UISearchTextField appearance below', uikit: 'UISearchController.searchBar.searchTextField with the Plenix colors, font and corner radius', appkit: 'NSSearchField',
      use: 'Search in a list, a sidebar or a toolbar on the default surfaces.' },
    { name: 'On accent', apple: 'Sidebar Search Field (no accent kit variant)', web: 'navigation|Search bar', background: 'plx-comp-search-on-accent-input-background', content: 'plx-comp-search-on-accent-input-text', border: 'plx-comp-search-on-accent-input-border-color',
      swiftui: 'PlenixSearchField(onAccent: true)', uikit: 'The same search text field with the accent field colors', appkit: 'NSSearchField with the accent field colors on a custom bar',
      use: 'Search in a Plenix accent header, the blue bar of the app.' }
  ],
  anatomy: [
    { part: 'A', name: 'Field', about: 'The rounded rectangle that takes the text; at least 44 points tall.' },
    { part: 'B', name: 'Search symbol', about: 'The magnifying glass at the leading end, in the muted content color.' },
    { part: 'C', name: 'Text or placeholder', about: 'The query in DM Sans at the body text role, or a placeholder that names what can be searched.' },
    { part: 'D', name: 'Clear button', about: 'The trailing button that empties the field; it shows only while there is text.' }
  ],
  attributes: [
    { part: 'A', attribute: 'Minimum height', token: 'plx-comp-search-input-min-height (plx-sys-control-height-standard on touch)', value: '44 pt (Plenix.Platform.controlTargetMin)', apple: '36 pt field, 44 pt target',
      swiftui: '.frame(minHeight: Plenix.Platform.controlTargetMin)', uikit: 'searchTextField.heightAnchor ≥ Plenix.Platform.controlTargetMin (a custom bar), or the system height in a navigation bar', appkit: 'controlSize = .large', follows: 'iOS' },
    { part: 'A', attribute: 'Corner radius', token: 'plx-comp-search-input-radius', value: '6 pt (Plenix.Radius.radiusControl)', apple: 'Capsule',
      swiftui: '.background(_, in: .rect(cornerRadius: Plenix.Radius.radiusControl))', uikit: 'searchTextField.layer.cornerRadius = Plenix.Radius.radiusControl; borderStyle = .none', appkit: 'Drawn by the cell (bezelStyle .roundedBezel)', follows: 'iOS' },
    { part: 'A', attribute: 'Background and border', token: 'plx-comp-search-input-background, plx-comp-search-input-border-color, plx-comp-search-input-border-width', value: 'Neutral fill, control border, 1 pt', apple: 'A tertiary gray fill, no border',
      swiftui: '.background(Plenix.Colors.fillNeutral, in:) and .overlay { strokeBorder(Plenix.Colors.controlBorder, lineWidth: 1) }', uikit: 'searchTextField.backgroundColor, layer.borderColor, layer.borderWidth', appkit: 'backgroundColor, drawsBackground', follows: 'iOS' },
    { part: 'B', attribute: 'Search symbol', token: 'plx-comp-search-icon-text, plx-comp-search-icon-inset-inline-start', value: 'magnifyingglass, muted content color, 12 pt from the edge (Plenix.Space.spaceInsetMd)', apple: 'The same symbol in the secondary label color',
      swiftui: 'Image(systemName: "magnifyingglass").foregroundStyle(Plenix.Colors.contentMuted)', uikit: 'searchTextField.leftView?.tintColor = UIColor(Plenix.Colors.contentMuted)', appkit: 'Drawn by NSSearchFieldCell (searchButtonCell)', follows: 'Best practices' },
    { part: 'C', attribute: 'Text', token: 'plx-comp-search-input-font-family, plx-comp-search-input-text (iOS body role)', value: 'DM Sans regular, 17 pt on 22 pt, relative to Body (Plenix.Platform.textBodySize)', apple: 'SF Pro Regular 17 pt',
      swiftui: '.font(Plenix.Font.sans(Plenix.Platform.textBodySize, relativeTo: .body))', uikit: 'searchTextField.font = ' + BODY_FONT_UIKIT + '; adjustsFontForContentSizeCategory', appkit: 'font = NSFont(name: "DMSans-Regular", size: 13)', follows: 'Best practices' },
    { part: 'C', attribute: 'Placeholder', token: 'plx-comp-search-input-placeholder-text', value: 'Field placeholder color; names the content, such as “Search assets”', apple: 'Secondary label color, “Search”',
      swiftui: 'TextField(_, text:, prompt: Text("Search assets").foregroundStyle(Plenix.Colors.fieldPlaceholder))', uikit: 'searchTextField.attributedPlaceholder with .foregroundColor UIColor(Plenix.Colors.fieldPlaceholder)', appkit: 'placeholderAttributedString', follows: 'Best practices' },
    { part: 'D', attribute: 'Clear button', token: 'plx-comp-search-clear-text, plx-comp-search-clear-width', value: 'xmark.circle.fill, muted content color, in a 28 pt area at the trailing end', apple: 'The same symbol',
      swiftui: 'Button { text = "" } label: { Image(systemName: "xmark.circle.fill") }.foregroundStyle(Plenix.Colors.contentMuted)', uikit: 'searchTextField.clearButtonMode = .whileEditing', appkit: 'Drawn by NSSearchFieldCell (cancelButtonCell)', follows: 'Best practices' },
    { part: 'C', attribute: 'Tokens and scopes', token: 'plx-comp-chip-selected-background (the web filter chip)', value: 'System search tokens in the field; a scope bar below it', apple: 'The same',
      swiftui: '.searchable(text:tokens:token:) and .searchScopes(_:scopes:)', uikit: 'searchTextField.tokens (UISearchToken); searchBar.scopeButtonTitles', appkit: 'NSSearchToolbarItem; a segmented control for scopes', follows: 'Scope bars and tokens' }
  ],
  states: [
    { state: 'Empty', token: 'plx-comp-search-input-placeholder-text', swiftui: 'text is empty; the prompt shows', uikit: 'searchTextField.text == nil', appkit: 'stringValue is empty' },
    { state: 'Focused (editing)', token: 'plx-comp-search-input-focus-border-color (only the border changes)', swiftui: '@FocusState colors the stroke', uikit: 'textFieldDidBeginEditing sets layer.borderColor', appkit: 'The field editor; focusRingType = .default' },
    { state: 'With text', token: 'plx-comp-search-input-text, plx-comp-search-clear-text', swiftui: 'The clear button shows', uikit: 'clearButtonMode = .whileEditing', appkit: 'The cancel button shows' },
    { state: 'Searching', token: 'The loading spinner of SearchField on the web', swiftui: 'A ProgressView in place of the symbol', uikit: 'searchTextField.leftView = UIActivityIndicatorView', appkit: 'An NSProgressIndicator beside the field' },
    { state: 'Disabled', token: 'plx-comp-input-disabled-background, plx-comp-input-disabled-text', swiftui: '.disabled(true)', uikit: 'searchTextField.isEnabled = false', appkit: 'isEnabled = false' }
  ],
  code: {
    swiftui: lines(`
import SwiftUI

/// The Plenix search field on iOS, inline above content: a system TextField with the Plenix search look.
struct PlenixSearchField: View {
    @Binding var text: String
    var prompt: String = "Search"
    var onAccent = false
    @FocusState private var isFocused: Bool

    var body: some View {
        let shape = RoundedRectangle(cornerRadius: Plenix.Radius.radiusControl)
        HStack(spacing: Plenix.Space.spaceInlineSm) {
            Image(systemName: "magnifyingglass")
                .foregroundStyle(onAccent ? Plenix.Colors.accentFieldPlaceholder : Plenix.Colors.contentMuted)
                .accessibilityHidden(true)
            TextField(prompt, text: $text, prompt: Text(prompt).foregroundStyle(onAccent ? Plenix.Colors.accentFieldPlaceholder : Plenix.Colors.fieldPlaceholder))
                .focused($isFocused)
                .submitLabel(.search)
                .autocorrectionDisabled()
                .foregroundStyle(onAccent ? Plenix.Colors.accentContent : Plenix.Colors.contentDefault)
            if !text.isEmpty {
                Button { text = "" } label: { Image(systemName: "xmark.circle.fill") }
                    .foregroundStyle(Plenix.Colors.contentMuted)
                    .accessibilityLabel("Clear search")
            }
        }
        .font(Plenix.Font.sans(Plenix.Platform.textBodySize, relativeTo: .body))
        .padding(.horizontal, Plenix.Space.spaceInsetMd)
        .frame(minHeight: Plenix.Platform.controlTargetMin)
        .background(onAccent ? Plenix.Colors.accentFieldBackground : Plenix.Colors.fillNeutral, in: shape)
        .overlay { shape.strokeBorder(isFocused ? Plenix.Colors.focusRingColor : (onAccent ? Plenix.Colors.accentFieldBorder : Plenix.Colors.controlBorder), lineWidth: 1) }
        .accessibilityElement(children: .contain)
        .accessibilityAddTraits(.isSearchField)
    }
}

// System placements (search tab, toolbar, navigation bar) keep .searchable; the UIKit appearance below gives them the Plenix look.
List(results) { AssetRow(asset: $0) }
    .searchable(text: $query, prompt: "Search assets")
    .searchScopes($scope) { ForEach(Scope.allCases) { Text($0.title).tag($0) } }`),
    uikit: lines(`
import UIKit
import SwiftUI

/// The Plenix search field in UIKit: the system search controller with the Plenix search look.
func applyPlenixSearchStyle(to bar: UISearchBar, placeholder: String) {
    let field = bar.searchTextField
    field.borderStyle = .none
    field.backgroundColor = UIColor(Plenix.Colors.fillNeutral)
    field.layer.cornerRadius = Plenix.Radius.radiusControl
    field.layer.borderWidth = 1
    field.layer.borderColor = UIColor(Plenix.Colors.controlBorder).cgColor
    field.clipsToBounds = true
    field.textColor = UIColor(Plenix.Colors.contentDefault)
    field.font = ${BODY_FONT_UIKIT}
    field.adjustsFontForContentSizeCategory = true
    field.leftView?.tintColor = UIColor(Plenix.Colors.contentMuted)
    field.clearButtonMode = .whileEditing
    field.attributedPlaceholder = NSAttributedString(string: placeholder, attributes: [.foregroundColor: UIColor(Plenix.Colors.fieldPlaceholder)])
    bar.tintColor = UIColor(Plenix.Colors.actionPrimaryBackground)   // the cursor and the Cancel button
    bar.searchBarStyle = .minimal
}

let search = UISearchController(searchResultsController: results)
search.searchResultsUpdater = results            // update the results as the person types
search.searchBar.scopeButtonTitles = ["All", "Images", "Video"]
applyPlenixSearchStyle(to: search.searchBar, placeholder: "Search assets")
navigationItem.searchController = search
navigationItem.preferredSearchBarPlacement = .integratedButton

// Focused: only the border changes
NotificationCenter.default.addObserver(forName: UITextField.textDidBeginEditingNotification, object: search.searchBar.searchTextField, queue: .main) { _ in
    search.searchBar.searchTextField.layer.borderColor = UIColor(Plenix.Colors.focusRingColor).cgColor
}
NotificationCenter.default.addObserver(forName: UITextField.textDidEndEditingNotification, object: search.searchBar.searchTextField, queue: .main) { _ in
    search.searchBar.searchTextField.layer.borderColor = UIColor(Plenix.Colors.controlBorder).cgColor
}`),
    appkit: lines(`
import AppKit
import SwiftUI

${MAC}
let search = NSSearchField()
search.placeholderString = "Search assets"
search.font = NSFont(name: "DMSans-Regular", size: 13)
search.textColor = NSColor(Plenix.Colors.contentDefault)
search.sendsSearchStringImmediately = true       // results update as the person types
let item = NSSearchToolbarItem(itemIdentifier: .init("search"))   // the trailing end of the toolbar
item.searchField = search`)
  }
});

// ---------------------------------------------------------------- Page controls
write('page-controls', 'ios-navigation|Page controls', {
  summary: 'A Plenix page control on iOS is the system page control, kept native in behavior (tapping and scrubbing to change pages, the animated change, VoiceOver’s adjustable page value) with its indicator colors set to Plenix content roles that keep the system’s contrast relation: the current page in the default content color, the other pages in the strong border color, in both themes. It sits centered near the bottom of the view. Apple’s default uses the system label colors; Plenix keeps the system control, its sizes and its background styles.',
  variants: [
    { name: 'Minimal', apple: 'Page Control, Pages=1-6 (no background)', web: 'data-display|Carousel', background: null, content: 'plx-sys-content-default', border: null,
      swiftui: 'PlenixPageControl(background: .minimal) (UIPageControl through UIViewRepresentable)', uikit: 'UIPageControl, backgroundStyle .minimal, allowsContinuousInteraction = false', appkit: 'No page control; dots drawn beside an NSPageController',
      use: 'A carousel of peer pages, such as a set of media or onboarding screens, where the dots only show the position.' },
    { name: 'Prominent', apple: 'Page Control, Pages=1-6 (with background)', web: 'navigation|Pagination', background: 'plx-sys-fill-neutral', content: 'plx-sys-content-default', border: null,
      swiftui: 'PlenixPageControl(background: .prominent)', uikit: 'UIPageControl, backgroundStyle .prominent', appkit: 'No page control; dots drawn beside an NSPageController',
      use: 'When the page control is the main way to move between pages and scrubbing should be easy to find.' }
  ],
  anatomy: [
    { part: 'A', name: 'Current indicator', about: 'The dot of the page on screen, in the default content color.' },
    { part: 'B', name: 'Page indicators', about: 'One dot for each other page, in the strong border color.' },
    { part: 'C', name: 'Background', about: 'The system platter behind the dots, shown with the prominent style or while scrubbing.' }
  ],
  attributes: [
    { part: 'A', attribute: 'Current indicator color', token: 'plx-sys-content-default', value: 'Black in light, near white in dark (Plenix.Colors.contentDefault)', apple: 'The label color',
      swiftui: 'currentPageIndicatorTintColor in the representable', uikit: 'currentPageIndicatorTintColor = UIColor(Plenix.Colors.contentDefault)', appkit: 'The dot fill of the custom indicator', follows: 'Customizing indicators' },
    { part: 'B', attribute: 'Page indicator color', token: 'plx-sys-border-strong', value: 'Gray 500 in both themes, at least 3 to 1 against the canvas (Plenix.Colors.borderStrong)', apple: 'The label color at 30 percent',
      swiftui: 'pageIndicatorTintColor in the representable', uikit: 'pageIndicatorTintColor = UIColor(Plenix.Colors.borderStrong)', appkit: 'The dot fill of the custom indicator', follows: 'Customizing indicators' },
    { part: 'B', attribute: 'Indicator image', token: 'None (an SF Symbol)', value: 'The dot; one special page may use a symbol, two images at most', apple: 'The dot',
      swiftui: 'setIndicatorImage(UIImage(systemName: "location.fill"), forPage: 0) in the representable', uikit: 'setIndicatorImage(_:forPage:), preferredIndicatorImage', appkit: 'An NSImage in the custom indicator', follows: 'Customizing indicators' },
    { part: 'C', attribute: 'Background style', token: 'None (a system platter)', value: '.minimal for decoration, .prominent when it is the main navigation', apple: '.automatic',
      swiftui: '.indexViewStyle(.page(backgroundDisplayMode: .always)) on a page TabView, or backgroundStyle in the representable', uikit: 'backgroundStyle = .minimal or .prominent', appkit: 'Not available', follows: 'iOS, iPadOS' },
    { part: 'C', attribute: 'Scrubbing', token: 'None (a behavior)', value: 'On with the prominent style, off with the minimal one', apple: 'On',
      swiftui: 'allowsContinuousInteraction in the representable', uikit: 'allowsContinuousInteraction = (backgroundStyle == .prominent)', appkit: 'Not available', follows: 'iOS, iPadOS' },
    { part: 'C', attribute: 'Placement', token: 'plx-sys-space-stack-lg', value: 'Centered, 16 pt above the bottom safe area (Plenix.Space.spaceStackLg)', apple: 'Centered near the bottom',
      swiftui: '.frame(maxWidth: .infinity).padding(.bottom, Plenix.Space.spaceStackLg)', uikit: 'centerXAnchor, bottomAnchor.constraint(equalTo: safeArea.bottomAnchor, constant: -Plenix.Space.spaceStackLg)', appkit: 'Centered under the page controller’s view', follows: 'Best practices' },
    { part: 'C', attribute: 'Number of pages', token: 'None', value: 'About ten at most; more pages need a grid or a list', apple: 'Dots shrink past the visible limit',
      swiftui: 'numberOfPages', uikit: 'numberOfPages', appkit: 'arrangedObjects.count', follows: 'Best practices' }
  ],
  states: [
    { state: 'Default', token: 'plx-sys-content-default (current), plx-sys-border-strong (others)', swiftui: 'currentPage', uikit: 'currentPage', appkit: 'selectedIndex' },
    { state: 'Tapped (page changes with animation)', token: 'The same colors', swiftui: 'withAnimation { page = newValue }', uikit: '.valueChanged, then scroll with animation', appkit: 'animator().selectedIndex' },
    { state: 'Scrubbing (no animation)', token: 'The system platter', swiftui: 'interactionState == .continuous: set the page without animation', uikit: 'interactionState == .continuous', appkit: 'Not available' },
    { state: 'Disabled', token: 'plx-sys-content-disabled', swiftui: '.disabled(true)', uikit: 'isEnabled = false', appkit: 'Not available' }
  ],
  code: {
    swiftui: lines(`
import SwiftUI
import UIKit

/// The Plenix page control on iOS: the system UIPageControl with the Plenix indicator colors.
struct PlenixPageControl: UIViewRepresentable {
    @Binding var currentPage: Int
    let numberOfPages: Int
    var background: UIPageControl.BackgroundStyle = .minimal

    func makeUIView(context: Context) -> UIPageControl {
        let control = UIPageControl()
        control.currentPageIndicatorTintColor = UIColor(Plenix.Colors.contentDefault)
        control.pageIndicatorTintColor = UIColor(Plenix.Colors.borderStrong)
        control.backgroundStyle = background
        control.allowsContinuousInteraction = background == .prominent   // no scrubbing with the minimal style
        control.addAction(UIAction { [weak control] _ in
            guard let control else { return }
            if control.interactionState == .continuous { currentPage = control.currentPage }
            else { withAnimation { currentPage = control.currentPage } }   // animate taps, not scrubbing
        }, for: .valueChanged)
        return control
    }
    func updateUIView(_ control: UIPageControl, context: Context) {
        control.numberOfPages = numberOfPages
        control.currentPage = currentPage
    }
}

// In a view: an ordered, flat set of peer pages, the control centered near the bottom
ZStack(alignment: .bottom) {
    TabView(selection: $page) {
        ForEach(slides.indices, id: \\.self) { SlideView(slide: slides[$0]).tag($0) }
    }
    .tabViewStyle(.page(indexDisplayMode: .never))
    PlenixPageControl(currentPage: $page, numberOfPages: slides.count)
        .fixedSize()
        .padding(.bottom, Plenix.Space.spaceStackLg)
}`),
    uikit: lines(`
import UIKit
import SwiftUI

/// The Plenix page control in UIKit.
let pageControl = UIPageControl()
pageControl.numberOfPages = slides.count
pageControl.currentPageIndicatorTintColor = UIColor(Plenix.Colors.contentDefault)
pageControl.pageIndicatorTintColor = UIColor(Plenix.Colors.borderStrong)
pageControl.backgroundStyle = .minimal
pageControl.allowsContinuousInteraction = false
pageControl.translatesAutoresizingMaskIntoConstraints = false
view.addSubview(pageControl)
NSLayoutConstraint.activate([
    pageControl.centerXAnchor.constraint(equalTo: view.centerXAnchor),
    pageControl.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -Plenix.Space.spaceStackLg)
])
pageControl.addAction(UIAction { [weak self] _ in
    guard let self else { return }
    let animated = pageControl.interactionState != .continuous   // animate taps, not scrubbing
    self.scrollTo(page: pageControl.currentPage, animated: animated)
}, for: .valueChanged)`),
    appkit: lines(`
import AppKit
import SwiftUI

${MAC}
// AppKit has no page control. A Mac app pages with NSPageController (swipe and arrow keys) and, when it needs the
// dots, draws them in Plenix.Colors.contentDefault (current) and Plenix.Colors.borderStrong (others).
let pager = NSPageController()
pager.transitionStyle = .horizontalStrip
pager.arrangedObjects = slides
pager.selectedIndex = 0`)
  }
});
console.log('written');
