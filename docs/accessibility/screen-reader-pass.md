# Screen-reader pass: a manual checklist

Automatic tests cannot hear a page. This checklist is the owner's run with real screen readers, part by part. The results table at the end is empty on purpose: fill it as you listen.

## How to run it
- Run each part on the St. John test site (or the part's page in the design spec) with a screen reader and the keyboard only. Do not use the mouse.
- Run every row in a left-to-right page and, for the rows marked RTL, in an Arabic page (set the language to Arabic in the site).
- Write what the screen reader said in the table, in your own words. Mark Pass only when the name, the role and the state were all spoken and nothing was spoken twice.
- File a defect as a GitHub issue in `plenix-ds/plenix-platform` with the part, the screen reader and its version, the steps and what was said.

## The screen readers
| Screen reader | Browser | System | Start and stop | Notes |
|---|---|---|---|---|
| NVDA | Firefox | Windows | Ctrl+Alt+N starts it; Insert+Q quits | Use browse mode to read, focus mode to type. Insert+Space switches. |
| VoiceOver | Safari | macOS | Cmd+F5 | Use VO+Right Arrow to read. Quick Nav and Tab move between controls. |
| VoiceOver | Safari | iOS | Settings, Accessibility | Swipe right and left to read; double tap to activate. |
| TalkBack | Chrome | Android | Settings, Accessibility | Swipe right and left to read; double tap to activate. |

## What to listen for, in every row
- **Name:** the control says what it is for ("Rename", not "button").
- **Role:** it says what kind of control it is (button, menu, dialog, checkbox, tab, slider).
- **State:** it says its state (expanded or collapsed, checked, selected, disabled, busy, the value).
- **Change:** when something changes (a menu opens, a toast appears, a message arrives), it says so once, politely, without stealing focus.
- **Order:** the reading order is the visual order, in both writing directions.
- **Once:** nothing is spoken twice (a label and its tooltip, an icon and its text).

## The parts and what to listen for
| Part | Scenario | What to listen for |
|---|---|---|
| Button, icon-only button | Tab to it | The name is spoken (icon-only buttons say their label, never "button" alone); a pressed or expanded state is spoken. |
| Menu and MenuButton | Open with Enter, Arrow Down, choose an item | "Menu", the item names with "x of y"; a checked radio item says it is checked; Escape returns to the button and says its name. |
| Combobox | Type "ma", Arrow Down, Enter | "Combobox, collapsed" then "expanded"; each option is spoken as the active one with its position; the chosen value is spoken after Enter; the number of results is announced. |
| Dialog, Drawer, Sheet | Open, Tab through, Escape | "Dialog" and its title are spoken on open; the description is read; Tab never leaves it; closing returns to the opener, and says its name. |
| Popover and Popconfirm | Open and close | The title is spoken; an alert dialog (Popconfirm) is read at once; closing returns to the trigger. |
| Tabs | Arrow between tabs | "Tab, selected, 2 of 4"; the panel is spoken as the tab's panel; in Arabic the arrows follow the reading direction (RTL). |
| Tree | Arrow keys, expand and collapse | "Tree view", the level, "expanded" or "collapsed", the position; in Arabic Right and Left are mirrored (RTL). |
| Table and DataGrid | Move by cell | The column header is spoken with each cell; the row and column counts; sort state; a selected row is spoken as selected. |
| Calendar and DatePicker | Move by day, Page Down, Enter | "Grid"; each day is spoken with its full date and its selected state; an unavailable day says so; the month change is announced (RTL: the arrows mirror). |
| Slider | Arrow keys, Home, End | The value and its unit are spoken after each change; the minimum and maximum are available. |
| Checkbox, Switch, RadioGroup | Space and arrows | "Checkbox, checked"; "Switch, on"; a radio group is spoken with its legend and "1 of 3". |
| SplitView divider | Arrow keys | "Separator, vertical", with its value; the value is spoken after each step (RTL: the arrows mirror). |
| OtpInput | Type a code | Each box says its position ("1 of 6"); a wrong character is ignored without noise; the group has its name and description. |
| Banner, Notice, Toast | Trigger one | An alert is spoken at once; a status is spoken politely; nothing is spoken twice; a toast never takes focus. |
| Form field with an error | Submit with an error | The label, the description and the error are spoken with the field ("invalid entry"); an error summary links to each field. |
| Chat thread | A new message arrives | The thread is a live log: the sender and the text are spoken once, your own messages say "You"; the status (sent, read) is spoken in words. |
| Chat composer | Type, Enter, attach a file | The field has a name; Send says it is disabled when there is nothing to send; an upload says its progress and its end; "Listening" is spoken once when dictation starts. |
| Chat picture and file | Tab to a picture and a file card | The picture is a button ("Open image: name"); a file says its name and size; Download names the file. |
| Chat voice message | Play, seek with the arrows | "Play voice message" becomes "Pause"; the seek bar says "Voice message position" with "0:08 / 0:23"; the speed says its value. |
| Loading and progress | A page or a button loads | "Busy" or "Loading" is spoken once; a progress bar speaks its percent; the end is announced. |
| Pagination, Breadcrumb, Navigation | Tab and arrows | "Navigation" with its name; the current page is spoken as current; the numbers read as numbers. |
| Page structure | Jump by headings and landmarks | One level 1 heading; the landmarks (banner, navigation, main) are named; skip links work. |

## Results (left empty for the owner's run)
| Part | Scenario | NVDA with Firefox | VoiceOver with Safari (macOS) | VoiceOver with Safari (iOS) | TalkBack with Chrome | What was said, and the defect issue | Tested by and date |
|---|---|---|---|---|---|---|---|
| Button, icon-only button | | | | | | | |
| Menu and MenuButton | | | | | | | |
| Combobox | | | | | | | |
| Dialog, Drawer, Sheet | | | | | | | |
| Popover and Popconfirm | | | | | | | |
| Tabs | | | | | | | |
| Tree | | | | | | | |
| Table and DataGrid | | | | | | | |
| Calendar and DatePicker | | | | | | | |
| Slider | | | | | | | |
| Checkbox, Switch, RadioGroup | | | | | | | |
| SplitView divider | | | | | | | |
| OtpInput | | | | | | | |
| Banner, Notice, Toast | | | | | | | |
| Form field with an error | | | | | | | |
| Chat thread | | | | | | | |
| Chat composer | | | | | | | |
| Chat picture and file | | | | | | | |
| Chat voice message | | | | | | | |
| Loading and progress | | | | | | | |
| Pagination, Breadcrumb, Navigation | | | | | | | |
| Page structure | | | | | | | |

Mark each cell Pass, Fail (with the issue number) or Not tested.
