/* Plenix · engines (platform/utils/engines.ts)
   Summary: Asks the page's engines script (platform/engines/plenix-engines.js) for an optional engine: rich text, charts or PDF.
   Usage: engine('tiptap', win).then((T) => …); engine('echarts', win); engine('pdf').then(({ module, worker }) => …)
   Behavior: Resolves with what the page's window.PlenixEngines gives. When the page has no engines script, rejects with a plain
     message that says so, and writes it once to the console (the editor, chart or document shows its own failure state); nothing is loaded from anywhere else.
   Notes: Internal; not part of the public API. plenix.js holds no engine address and injects no script (bundle rules P-38, P-45). */
export type EngineName = 'tiptap' | 'echarts' | 'pdf';
// the page's engines script (platform/engines/plenix-engines.js): one loader per engine
type EngineLoaders = Partial<Record<EngineName, (win?: Window | null) => Promise<unknown>>>;
type WithEngines = Window & { PlenixEngines?: EngineLoaders };
const WHAT: Record<EngineName, string> = { tiptap: 'The rich-text engine', echarts: 'The chart engine', pdf: 'The PDF engine' };
const told = new Set<EngineName>();
export function engine<T = unknown>(name: EngineName, win?: Window | null): Promise<T> {
  const w: WithEngines | null = typeof window !== 'undefined' ? window : null;
  const E = (win && (win as WithEngines).PlenixEngines) || (w && w.PlenixEngines);
  if (!E || typeof E[name] !== 'function') {
    const message = WHAT[name] + ' is missing on this page: add plenix-engines.js to the page, after plenix.js.';
    if (!told.has(name) && typeof console !== 'undefined') { told.add(name); console.warn('Plenix: ' + message); }   // once per engine
    return Promise.reject(new Error(message));
  }
  return E[name]!(win) as Promise<T>;
}
