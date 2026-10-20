# Table engine review

Left: the optimized default engine from main 0.49.0 (#126). Right: the independent TanStack renderer (#140).
These are review captures, not replacement visual-test baselines. Both use the same rows, columns, theme and density.

| Example | Light | Dark |
| --- | --- | --- |
| Core | [Capture](light.png) | [Capture](dark.png) |
| Grouped, counts and sums | [Capture](grouped/light.png) | [Capture](grouped/dark.png) |
| Nested groups | [Capture](nested/light.png) | [Capture](nested/dark.png) |
| Tree rows | [Capture](tree/light.png) | [Capture](tree/dark.png) |
| Add to group | [Capture](add/light.png) | [Capture](add/dark.png) |

Each metrics.json records the checked row/header styles, viewport/frame sizes and visible group-header geometry.
The new renderer applies the existing documented neutral grouped-column tint; the current engine does not
consistently mark that column, so this role is more visible in the right-hand grouped examples. No new color is added.

performance.json contains one paired local Chrome run: identical rich 600-row fixtures with avatars, tags, bytes
and status badges, four plain/saved scenarios per engine. Values are milliseconds; lower is faster. Scroll results
are mixed. The test retains a virtual window in every case. These are local measurements, not a universal speed claim.
