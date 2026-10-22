# DataGrid and Table in an application: what the CDN does, what the app does

Written for CTM's grid report (2026-10-22), checked on Plenix 0.63.1 and fixed in 0.64.0.

## What the CDN does (0.64.0)

| Behavior | How it works |
|---|---|
| Column widths | A column without `width` fits its header and its values, up to 360px (`--plx-comp-data-grid-auto-max-width`); longer text ends in "…" with the full text on hover. The last such column takes the room left, so the grid fills its width. |
| Headers | A content-sized column leaves room for its type icon and, in a DataGrid, for the column menu button, so a hovered title is never cut. The menu button and the sort arrow have a gap between them. |
| Pills (`cells="pill"`) | A column measures each pill with its padding, border and icon, so names are not cut. |
| Type icons ("Tt") | On in a DataGrid (they show what the column sorts and filters as); off in the static Table. `typeIcons={false}` hides them in a DataGrid. |
| One line per cell | Values stay on one line; a long one ends in "…". Only `kind: 'wrap'` or taller rows wrap. |
| Scrolling | When the columns need more room than the grid has, the grid scrolls inside itself; it never makes the page scroll. |

## What the application does

| Situation | Do this |
|---|---|
| A grid in a flex row | Give the grid's flex item `min-width: 0`, or use Plenix's `<Inline>` with a `grow` child (it sets that). A flex item keeps its content's width by default, so a grid that can become a narrow list (it asks for 720px) pushes the row wider and the page scrolls. |
| A date or a time that should stay short | Format it in the data ("10:00 AM"); a cell shows the text it gets on one line. Do not use `kind: 'wrap'` for it. |
| The same look in every view | Use one column definition per kind of value (case number `kind: 'data'`, people `type: 'person'` with `cells="pill"`, dates `type: 'date'`), so every grid sizes and draws them alike. |
| No type icons | `typeIcons={false}` on a DataGrid; a static `Table` has none. |
| Avoid local styles | Do not override `.plx-data-grid` or `.plx-table` rules: widths, wrapping and hover come from the component. |


## Uniform pill widths

Opt in with `uniformPillWidths={true}` and `cells="pill"` on DataGrid or Table. Standard pills in each currently rendered column share the widest natural value width, rounded up to an existing size token and bounded by the cell. Different columns remain independent. Filtering, pagination, virtual scrolling and font loading remeasure the current rendered window, so widths can change as that window changes. This is not a full-dataset measurement.

Custom renderers remain unchanged. Explicit `column.pill` fill keeps filling the cell and is excluded. No runtime style attributes or application CSS overrides are needed.
