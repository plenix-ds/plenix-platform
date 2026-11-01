# tree-virtual-815

This test makes sure a folder tree with thousands of items stays fast: above 200 rows only the rows on screen are drawn. The keys, the screen reader positions and right to left still work.

- File: `tests/tree-virtual-815.test.js`

## What it checks
- A Tree of 5,000 rows:
  - is virtualized: only a few dozen rows are drawn, flat, without nested groups;
  - each row has its level and its place among its siblings (a file row is "1 of 5,000" at level 2);
  - End, Arrow Up, Home and 30 presses of Arrow Down reach rows that were not drawn yet; the active row is focused and on screen;
  - one more Arrow Down past the bottom scrolls exactly one row, not a page;
  - Enter selects the row the keys reached.
- A tree of 50 rows is unchanged (nested, every row drawn). `virtualized={true}` and `virtualized={false}` decide.
- A branch that loads its children (issue 814) shows its "Loading…" row in a virtualized tree, without a position of its own.
- A TreeSelect of 5,000:
  - its tree in the popover is virtualized; End and Enter choose the last item;
  - a search with 1,111 matches stays virtualized, and Arrow Down moves from the search field into the tree.
- Right to left in Arabic: a child row is indented from the right, and Arrow Left opens a branch.
- No script errors, including no update loop while the keys move through rows not drawn yet (the loop found while building this, fixed in useVirtualizer).

## Why it exists
- Issue #815 part 1, from the Semi study (#767, items D and E). The owner approved building it on 2026-11-01 ("Implement all semi items", chat). It supersedes part of #806 (TreeSelect speed).
- Part 2 (Cascader search results and long Combobox lists) follows after #819 and #822.

## How it checks
- Headless Chrome at 1000 by 800 pixels opens `tests/fixtures/platform-host.html`, draws each part in a 420-pixel box with thousands of rows, presses keys and reads the drawn rows, the focused row, its ARIA attributes and the scroll position.

## What a failure means
- Long folder lists could become slow to open or to scroll, or the keyboard could stop at the last drawn row.
- A screen reader could announce the wrong position or total.
- In Arabic the indents or the arrow keys could be wrong.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode, Layout starts it when Tree, TreeSelect or `hooks/useVirtualizer.ts` changes, or when this test's file changes.
- A full run always runs it. CI: the "fixtures" browser job (Layout's job).
- Written, not run: the owner starts the tests.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
