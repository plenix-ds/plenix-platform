/* Plenix · AnalyticsProvider, useAnalytics, track
   Summary: Opt-in vendor-neutral events; no network, storage or personal data collection.
   Usage: <AnalyticsProvider enabled onEvent={receive}><Application /></AnalyticsProvider>
   Props:
     enabled: false by default; onEvent(event): receives {name, properties}; children: application.
     allowedProperties: explicit property names permitted in track properties (default none).
     onError(error): optional sink failure handler; failures never interrupt the UI.
   Behavior: Delegated clicks read only data-plx-track. No text, URLs, field values or identifiers are collected.
   Notes: Provider-scoped track avoids a global user/session singleton. Native clicks and keyboard activation share one event.
*/
import React from 'react';
export type AnalyticsEvent = Readonly<{ name: string; properties: Readonly<Record<string, boolean | number>> }>;
// the application's receiver; it may return a promise, whose failure goes to onError
export type AnalyticsSink = (event: AnalyticsEvent) => unknown;
export type AnalyticsSend = (name: string, properties?: Record<string, unknown>) => boolean;
export type AnalyticsProviderProps = {
  enabled?: boolean; onEvent?: AnalyticsSink; allowedProperties?: string[]; onError?(error: unknown): void; children?: React.ReactNode;
};

const noop: AnalyticsSend = () => false;
const Context = React.createContext(noop);
export function track(sink: AnalyticsSink | null | undefined, name: string, properties: Record<string, unknown> | null | undefined = {}, allowedProperties: string[] = [], onError?: (error: unknown) => void): boolean {
  if (typeof sink !== 'function' || typeof name !== 'string' || !/^[a-z][a-z0-9_.-]{0,79}$/.test(name)) return false;
  const safe: Record<string, boolean | number> = {};
  for (const key of Array.isArray(allowedProperties) ? allowedProperties : []) {
    const value = properties?.[key];
    if (/^[a-z][a-z0-9_]{0,39}$/.test(key) && (typeof value === 'boolean' || typeof value === 'number' && Number.isFinite(value))) safe[key] = value as boolean | number;
  }
  const report = (error: unknown) => { if (onError) { try { onError(error); } catch (_) {} } };
  try {
    const pending = sink(Object.freeze({ name, properties: Object.freeze(safe) })) as { then?: unknown } | null | undefined;
    if (pending && typeof pending.then === 'function') Promise.resolve(pending).catch(report);
    return true;
  } catch (error) { report(error); return false; }
}
export function AnalyticsProvider({ enabled = false, onEvent, allowedProperties = [], onError, children }: AnalyticsProviderProps) {
  const send = React.useCallback((name: string, properties?: Record<string, unknown>) => {
    if (!enabled) return false;
    return track(onEvent, name, properties, allowedProperties, onError);
  }, [enabled, onEvent, allowedProperties, onError]);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const root = ref.current; if (!root || !enabled) return;
    const click = (event: MouseEvent) => { const node = (event.target as Element).closest?.('[data-plx-track]');
      if (node && root.contains(node) && node.closest('[data-plx-analytics-root]') === root && !node.closest('[disabled],[aria-disabled="true"]')) send(node.getAttribute('data-plx-track') as string); };
    root.addEventListener('click', click); return () => root.removeEventListener('click', click);
  }, [enabled, send]);
  return <Context.Provider value={send}><div ref={ref} data-plx-analytics-root="" className="plx-analytics-provider">{children}</div></Context.Provider>;
}
export function useAnalytics(): AnalyticsSend { return React.useContext(Context); }
