# rte-insert-image-884

The text editor's Insert image puts the picture in the text, on left-to-right and right-to-left pages.

- File: `tests/rte-insert-image-884.test.js`

## What it checks
- In a left-to-right page and in a right-to-left (Arabic) page:
  - an https address with a description inserts one picture with that address and description;
  - an address without a scheme (`example.com/b.png`) is inserted as https;
  - a `javascript:` address inserts nothing;
  - no script errors.
- In the source: the editor takes its picture address check from the rich-text cleaner (`utils/richTextClean.ts`), with no copy of its own.

## Why it exists
- Issue #884, found by the code health check #882: Insert image threw an error and inserted nothing. The address check (`SAFE_SRC`) had moved into the cleaner in #178 and was no longer defined in the editor.

## How it checks
- Opens `tests/fixtures/platform-host.html` (an empty page with this checkout's Platform) from the local test server in Chrome, at 1300 by 900.
- Renders one RichTextEditor, opens Image from the toolbar (or from More formatting when the toolbar folds), types the address and the description, presses Enter, and reads the pictures in the editing area.
- Proved able to fail: on the code before #884 the first check finds no picture and the page error list holds "SAFE_SRC is not defined".
