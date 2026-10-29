/* Plenix · monitorWidths (platform/utils/monitorWidths.js)
   Summary: The width a person dragged a pane to, remembered per monitor (owner, issue 463 option C, step 3): one saved value per panel per
     monitor, the monitor named by its physical size (screen size times devicePixelRatio, to the nearest 10px: "2560x1440"), so browser zoom does not change it. A laptop screen and an external monitor each keep their own.
   Usage:
     const [width, setWidth] = useMonitorWidth('side', { legacy: () => oldValue, min: () => px, max: () => px });
     width is the saved width for this monitor when it still fits the window (between min and the window's share, paneMax), else null
     (the pane starts at its default); setWidth(w) saves w for this monitor.
   Props: panel: "side" (the side panel) | "nav" (the navigation pane); legacy(): the single value saved before this change (read once);
     min(), max(): the limits now, in pixels (the component's tokens).
   Behavior:
     Storage: one localStorage object, plenix.paneWidths = { side: { "2560x1440": 560 }, nav: { … } }. The old single value (plenix.sidePanelWidth,
       plenix.sideNav.width) becomes the current monitor's value the first time a panel is read, and the old key stays where it is.
     A saved width that no longer fits the window (a smaller window, a lower limit) is not used and not deleted: it comes back when it fits.
     Moving the window to another monitor is noticed on the next window resize and the other monitor's width is read.
     Nothing stored (private window, blocked site data): the width lasts for this visit only.
   Notes: Internal; not part of the public API. The 90% share and the 4px grid come from paneMax (utils/paneLimit.js). */
import React from 'react';
import { paneMax } from './paneLimit.js';

const STORE = 'plenix.paneWidths';
// The monitor's identity is its physical size: the screen's CSS size times devicePixelRatio, to the nearest 10px (a fractional zoom step rounds to the same
// size). A browser reports screen.width in zoom-adjusted CSS pixels (1920 at 100% is about 1280 at 150%), so screen.width alone would change with every
// Ctrl+plus; multiplied by devicePixelRatio the zoom cancels out.
export const monitorKey = (win) => {
  const w = win || (typeof window !== 'undefined' ? window : null) || {}, s = w.screen, r = w.devicePixelRatio || 1;
  const tenth = (n) => Math.round((n * r) / 10) * 10;
  return s && s.width ? tenth(s.width) + 'x' + tenth(s.height) : 'unknown';
};
const load = () => { try { const o = JSON.parse(localStorage.getItem(STORE)); return o && typeof o === 'object' && !Array.isArray(o) ? o : {}; } catch (e) { return {}; } };
const save = (all) => { try { localStorage.setItem(STORE, JSON.stringify(all)); } catch (e) { /* this visit only */ } };
const whole = (v) => { const n = +v; return Number.isFinite(n) && n > 0 ? n : null; };

// the saved width for a monitor; the first read of a panel carries the old single value over as this monitor's (written by the caller, in an
// effect: reading never writes)
function read(panel, key, legacy) {
  const mine = load()[panel];
  if (mine && typeof mine === 'object') return { value: whole(mine[key]), carried: false };
  const old = legacy ? whole(legacy()) : null;
  return { value: old, carried: !!old };
}
function write(panel, key, w) { const all = load(); all[panel] = Object.assign({}, all[panel], { [key]: w }); save(all); }

export function useMonitorWidth(panel, { legacy, min, max }) {
  const [key, setKey] = React.useState(() => monitorKey());
  const [first] = React.useState(() => read(panel, key, legacy));
  const [raw, setRaw] = React.useState(first.value);
  // the old single value becomes this monitor's value: saved once, here, not while rendering
  React.useEffect(() => { if (first.carried) write(panel, key, first.value); }, []);   // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    const onResize = () => { const k = monitorKey(); if (k !== key) { setKey(k); const r = read(panel, k, legacy); setRaw(r.value); if (r.carried) write(panel, k, r.value); } };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [key, panel]);   // eslint-disable-line react-hooks/exhaustive-deps
  const set = React.useCallback((w) => { setRaw(w); write(panel, key, w); }, [panel, key]);
  const lo = min ? min() : 0, hi = max ? paneMax(max(), lo) : Infinity;
  return [raw && raw >= lo && raw <= hi ? raw : null, set];
}
