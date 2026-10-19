# Styling program: proof log

Every proof runs in the background (GitHub CI `styling-proof.yml`, or a local audit) while the work goes on. Each run
is listed here when it is dispatched; all results are read and explained together once every component is finished.

| Run | Branch commit | Touched | Pages (ds / apps) | Read |
| --- | --- | --- | --- | --- |
| 39331480744 | hooks batch (Toolbar inputs, MetricCard, NavList groups, CommandPalette, rich-cell avatars, ErrorSummary, BulkActions empty, find panel, Button truncate/stacked label, Drawer start, non-modal Dialog, TextExpand) | 9 components | toolbar, metric, dialog, type-styles, expandable-section, … / apps | yes: documentation tables only; components STYLES_SAME |
| 39333015170 | a9220ade last cross selectors (Thumbnail, Check, Link/Text cell target, SearchField frost, Button action slot + labelRow, BrandMark, FileInput hideSummary, BulkActions bar, FileRow hooks, ActionBar) | 11 components | button, toolbar, action-bar, link, data-table, table, avatar-upload, file-input, image-upload, search-input, checkbox, application-header, file-list, file-row / dashboard, files, settings, dam, projects | yes: documentation tables, new cards, ds-code-link; components STYLES_SAME |
| 39337672110 | 45e88fd2 legacy DataTable (Icon hooks, Avatar/Thumbnail context, text-follow on cells) | DataTable (Tabulator) | data-table, table, split-view, field / files, dam, projects, tasks | no |
