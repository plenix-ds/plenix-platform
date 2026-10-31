/* Plenix · DataGrid engine · the virtual window of rows
   Moved out of DataGridEngine.jsx without any change to the code (issue 688). The engine is documented in DataGridEngine.jsx. */
import React from 'react';
import { flushSync } from 'react-dom';
import { observeElementRect, observeElementOffset, elementScroll, Virtualizer } from '@tanstack/react-virtual';

// TanStack Virtual, unmodified, driven like its React adapter but redrawing only when the window of rows changes: the
// rows sit between gaps (no position per row), so a scroll inside the same window needs no render at all
export function useVirtualizer(options) {
  const rerender = React.useReducer((x) => x + 1, 0)[1],
    shownRange = React.useRef('');
  const resolved = {
    observeElementRect,
    observeElementOffset,
    scrollToFn: elementScroll,
    ...options,
    onChange: (instance, sync) => {
      const r = instance.range,
        key = r ? r.startIndex + ':' + r.endIndex : '';
      if (key === shownRange.current) return;
      shownRange.current = key;
      if (sync) flushSync(rerender);
      else rerender();
    }
  };
  const [instance] = React.useState(() => new Virtualizer(resolved));
  instance.setOptions(resolved);
  React.useLayoutEffect(() => instance._didMount(), []);
  React.useLayoutEffect(() => instance._willUpdate());
  return instance;
}
