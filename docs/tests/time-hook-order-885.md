# time-hook-order-885

A date or time on the page does not crash when its value is empty at first and filled in later, or the other way around.

- File: `tests/time-hook-order-885.test.js`

## What it checks
- In each format (date and time, relative, day label, date, time), one Time is shown with a value that changes, in the same place: empty, not a date, a date, none, a date again.
  - Without a date it shows nothing; with one it shows the time element.
  - No render throws.
- No page error and no React error in the console.
- In the source: Time calls every React hook before its own first return.

## Why it exists
- Issue #885, found by the code health check #882: Time asked for its words (`useStrings`) after the line that returns nothing when there is no date. A Time whose value came or went between renders then had a different number of hooks, and React threw "Rendered more hooks than during the previous render".

## How it checks
- Opens `tests/fixtures/platform-host.html` (an empty page with this checkout's Platform) from the local test server in Chrome.
- Renders one Time in one root five times per format with `flushSync`, counting the time elements after each render, and listens for page and console errors.
- Proved able to fail: on the code before #885 the third render (the first with a date after one without) throws, and the source check names `useStrings`.
