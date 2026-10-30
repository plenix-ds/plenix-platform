### Fixed
- Controls in a pane's header no longer run past the pane's edge (#677).
  - **The cause:** NavPane's title-row actions never shrank (`flex-shrink: 0`). A Select there, such as a project switcher, drew at the width of its longest option: 286px in a 240px pane.
  - **NavPane:** the actions and the second row now fit the pane.
    - A field shrinks to the fit-field minimum (`--plx-sys-fit-field-min-width`, 100px) and shows its cut text in full in a tooltip.
    - A button with words shrinks, and its label ends in an ellipsis.
    - Icon buttons, such as Collapse, keep their size.
    - With no title, the actions fill the row.
  - **SecondaryPane and SidePanel:** their header rows fit the same way.
- Button: the context hooks `--plx-comp-button-context-flex-shrink` and `--plx-comp-button-context-min-inline-size`, which a container sets so its buttons with words can shrink. An icon-only button never shrinks.
