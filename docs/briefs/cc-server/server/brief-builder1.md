# Brief for Plenix · Builder 1 (2026-10-26): Charts on ECharts (#353)

The owner moved Plenix work to this server today. Standby is over. Your first task is Charts on ECharts, issue #353, taken over from a session on the old Windows VM.

## What's approved
- Charts draw with Apache ECharts. The look passed (PR #354, the step-1 study).
- Line, Area, Bar and Pie were shown and approved to ship (owner: "ship all four ... Ship it").
- ECharts may write its own sizes and fonts from token values inside `.plx-chart__engine`. This is an exception, like the text editor. Everything else follows the normal Plenix rules.

## Where the work is
- Branch `claude/charts-echarts-first`. The last commit seen is 08033caa ("ECharts vendor: tslib license with LF line ends, its checksum"), on top of "Charts on ECharts: LineChart, AreaChart, BarChart and PieChart".
- It is still only on the old Windows VM. Its session has been asked to push it and to send a note of what's left. Wait until `git ls-remote origin claude/charts-echarts-first` shows it. Don't recreate the work.

## Then
1. In `~/work/plenix-b1`: `git fetch origin claude/charts-echarts-first` and `git switch claude/charts-echarts-first`.
2. Finish Line, Area, Bar and Pie for shipping.
3. Right before the push, and only then, run the checks and tests for the changed files.
4. Push, open the pull request for #353, and tell the Lead and the Reviewer its number. Don't merge; the Lead merges.
5. Next, after the Lead says so:
   - Retire Diagram (approved, breaking: the `Diagram` export is removed, and the release lists it under Removed (breaking) in CHANGELOG.md; point people to Tree, SankeyDiagram and NetworkGraph).
   - Move Sparkline and WordCloud (echarts-wordcloud) to ECharts. Show me first: a live preview and one picture, no build.

If anything is unclear, send the Lead one short question.
