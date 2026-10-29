### Fixed
- Eight more controls follow a read-only region and their own `readOnly` prop (#262, PR 2; the Tech Lead's decision: a control inside a ReadOnly region follows the region, as the region promises). Measured before the change: with the region around them, `NumberInput` (its step buttons), `DatePicker`, `Combobox`, `CountrySelect`, `TransferList` and `RichTextEditor` still changed their value; with their own `readOnly`, `Combobox`, `CountrySelect`, `TreeSelect`, `TransferList` and `InlineEdit` still changed (`DatePicker`, `TreeSelect` and `InlineEdit` had no `readOnly` prop at all). Now none changes: the value shows, the control stays focusable, and
  - `DatePicker`: the field is read-only and the calendar button is not shown;
  - `Combobox` (and `CountrySelect`, which is one): the list does not open, nothing is chosen or created, and the tags lose their remove button;
  - `TreeSelect`: the tree does not open;
  - `TransferList`: the move and reorder buttons are off (items can still be checked to read them);
  - `InlineEdit`: it does not open for editing and shows no edit hint;
  - `NumberInput`, `RichTextEditor`, `CodeEditor` and `MentionInput` had their own `readOnly` and now also follow the region.
- The read-only test changes each control the way a person does before it checks that nothing changes: it types a date and presses Enter, types one and leaves the field, and picks a day in the calendar (`DatePicker`); it opens the list and clicks an option (`Combobox`, `CountrySelect`, `RelativeDateInput`). Each step must change the free control, so a zero in a region or with `readOnly` proves the control holds. `RelativeDateInput` already holds (its Select follows the region) and is now checked.
- Not fixed yet: `TimePicker` and `Cascader` do not follow read-only: inside a ReadOnly region and with their own `readOnly`, a click on an option of their list still changes the value (measured: 1 change each; typed text is held). The test checks only that they change while free; their read-only check is left for a later change (#262).

### Changed
- `DatePicker`, `Combobox`, `CountrySelect`, `TreeSelect`, `TransferList` and `InlineEdit` take a `readOnly` prop (default: the nearest ReadOnly region's, through `useReadOnly`). Nothing changes outside a read-only region.
- The `hook-adoption` check now requires an actual `import { hook } from …` and a call of the hook in the code, not just the name: a mention in a comment or a string no longer counts (QA's note on #583). The list gains the nine components above.
