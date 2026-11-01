/* Plenix · useSearchHistory
   Summary: The person's last searches in one place (an application's global search, a list's search), kept in this browser,
     newest first, for SearchField's recent searches and a search history page.
   Usage:
     const history = useSearchHistory('assets');
     <SearchField value={q} onChange={…} recent={history.items} onSubmitSearch={(q) => { history.add(q); run(q); }}
       onSelect={(item) => run(item.value)} onRemoveRecent={history.remove} onClearRecent={history.clear} />
   Props:
     key: names the history (one per search box: 'assets', 'global'); stored as "plx-search-history:<key>"
     options.max (5): how many searches it keeps; the oldest goes when a new one comes
     returns { items (the searches, newest first), add(query), remove(query), clear() }
   Behavior:
     add trims the query, ignores an empty one, and moves a search made again to the top (no duplicates, compared without
       regard to case).
     The history is read once when the component appears and written on every change; every component with the same key
       on the page shares it (a storage event from another tab updates it too).
     Without storage (a private window, storage turned off) the history lives only until the page closes; nothing fails.
   Notes:
     Searches can be personal: offer Clear recent searches wherever the history shows, and use a key per person when
     several people share a browser.
*/
import React from 'react';

const PREFIX = 'plx-search-history:';
const listeners: Record<string, ((items: string[]) => void)[]> = {};
const memory: Record<string, string[]> = {};   // the page's copy: what storage holds, or all there is when storage is off

const read = (key: string): string[] => {
  try { const v = JSON.parse(window.localStorage.getItem(PREFIX + key) as string); if (Array.isArray(v)) return v.filter((x) => typeof x === 'string'); } catch (e) { /* storage off */ }
  return memory[key] || [];
};
const write = (key: string, items: string[]) => { memory[key] = items; try { window.localStorage.setItem(PREFIX + key, JSON.stringify(items)); } catch (e) { /* storage off: kept for this page only */ } };

export function useSearchHistory(key: string, options: { max?: number } = {}): { items: string[]; add(query: unknown): void; remove(query: string): void; clear(): void } {
  const max = Math.max(1, Number(options.max) || 5);
  const [items, setItems] = React.useState<string[]>(() => (typeof window === 'undefined' ? [] : read(key).slice(0, max)));
  React.useEffect(() => {
    const mine = (next: string[]) => setItems(next.slice(0, max));
    (listeners[key] = listeners[key] || []).push(mine);
    const fromTab = (e: StorageEvent) => { if (e.key === PREFIX + key) mine(read(key)); };
    window.addEventListener('storage', fromTab);
    return () => { listeners[key] = (listeners[key] || []).filter((f) => f !== mine); window.removeEventListener('storage', fromTab); };
  }, [key, max]);
  const save = React.useCallback((next: string[]) => { write(key, next); (listeners[key] || []).forEach((f) => f(next)); }, [key]);
  const add = React.useCallback((query: unknown) => {
    const q = String(query || '').trim();
    if (!q) return;
    save([q].concat(read(key).filter((x) => x.toLowerCase() !== q.toLowerCase())).slice(0, max));
  }, [key, max, save]);
  const remove = React.useCallback((query: string) => { save(read(key).filter((x) => x !== query)); }, [key, save]);
  const clear = React.useCallback(() => { save([]); }, [save]);
  return { items, add, remove, clear };
}
