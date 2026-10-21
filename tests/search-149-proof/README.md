# Search regression proof (task 149)

Exact base: 61577d19628ebfab6ce92077a1e16b0f81b06e77. Same Windows runner, Node 22.23.3, Chrome and design-system revision 11f3ad20e33236f73088d96c296400467586542b. Light only. No baseline updates or relaxed assertions.

The browser mounts 600 records and eleven columns, with a controlled numeric text sort. It types `Record 59` through a real input and waits for the ten sorted results Record 590 through Record 599. It counts localeCompare calls and computed-style reads during typing. The exact-base run fails the regression with 4367 localeCompare calls and 9596 style reads; current source produces zero and two respectively. Single end-to-end timing samples include browser input and settling overhead and are not a statistical speed claim.

The test also changes the grid-step token under a density change, verifies cached widths refresh, then removes the override and checks recovery. The production stylesheet is unchanged. The existing DataGrid CI test invokes this regression whenever DataGrid changes.

The shared barFit.js optimization is awaiting scope authorization; it has not been edited. No appearance changes are intended, and no dark-mode proof is included.
