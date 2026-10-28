/* Plenix · accessible descriptions (platform/utils/describedBy.js): one way to tie descriptions to an element.
   Summary: joinIds merges description ids into one aria-describedby value (empty and repeated ids dropped, the order kept);
     useDescriptionId gives a component a stable id for its description; useDescribedBy builds the attribute from the ids a
     component has now. Field and Tooltip use them, and so does every new component.
   Usage:
     import { joinIds, useDescriptionId, useDescribedBy } from 'plenix-platform';
     const hintId = useDescriptionId('hint');
     const describedBy = useDescribedBy(props['aria-describedby'], hint && hintId, error && errorId);
     <input aria-describedby={describedBy} />
     <p id={hintId}>Use letters and numbers only</p>
   Props:
     joinIds(...ids): a string of ids separated by spaces, or undefined when there is none; each argument may itself hold
       several ids ("a b"), or be empty, false or undefined
     useDescriptionId(prefix?): a stable, unique id for this component ("plx-" + prefix + a React id); default prefix "desc"
     useDescribedBy(...ids): joinIds of the arguments (the hook form, for symmetry with useDescriptionId)
   Behavior:
     The ids already on the element come first (what its owner set), then the component's own, so nothing the owner
     described is lost. A description that is not shown (a hint only for screen readers) is VisuallyHidden text with the id.
   Notes:
     A description adds to the name, it never repeats it. Visible text first: aria-describedby points at text everyone can
     read (the hint, the error message); a hidden description only for what sighted people get from the layout. */
import React from 'react';

export function joinIds(...ids) {
  const out = [];
  ids.forEach((v) => {
    if (!v) return;
    String(v).split(/\s+/).forEach((id) => { if (id && out.indexOf(id) < 0) out.push(id); });
  });
  return out.length ? out.join(' ') : undefined;
}

export function useDescriptionId(prefix = 'desc') {
  return 'plx-' + prefix + React.useId().replace(/[^a-zA-Z0-9]/g, '');
}

export function useDescribedBy(...ids) {
  return joinIds(...ids);
}
