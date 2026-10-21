/* Plenix · pendingDelete
   Summary: Settles an undoable deletion once across toast and page lifecycle callbacks.
   Usage: const entry = pendingDelete({ commit, restore, settled });
   Props: commit and restore perform the operation; settled removes the entry from its owner.
   Behavior: The first commit or undo wins; subsequent callbacks are harmless.
   Notes: No browser globals, so lifecycle coordination can be tested independently.
*/
export function pendingDelete({ commit, restore, settled }) {
  let done = false;
  const finish = action => { if (done) return; done = true; settled(); action(); };
  return { commit: () => finish(commit), undo: () => finish(restore) };
}
