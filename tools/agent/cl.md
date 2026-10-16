### Fixed
- docs/reading-pane-study: the thin line under the reading pane's actions shows (it took a border-width role that does
  not exist, so it was 0px); it uses the table's border width and stops 16px short of each edge.
- The local preview server no longer stops after 15 minutes (.claude/launch.json lifts the test time limit for it).
