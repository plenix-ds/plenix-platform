/* Plenix · data visualization colors (platform/utils/dataviz.js): which chart color a series or a value takes.
   Summary: The chart scales (--plx-sys-dataviz-*, platform/tokens/semantic/dataviz.tokens.json) by name: categorical (6
     hues, the data colors in order), sequential (7 steps of one hue), diverging (7 steps, two hues around a neutral
     midpoint), status (positive, caution, negative, informative, neutral) and alert (warning, critical). The helpers return
     the step's name; data-plx-dataviz="<name>" on an element makes it the element's data color (system/dataviz.css sets
     --plx-comp-data-color), so a chart part fills itself with var(--plx-comp-data-color) and no style is written.
   Usage:
     import { datavizCategory, datavizStep } from 'plenix-platform';
     series.map((s, i) => <path key={s.id} className="my-line" data-plx-dataviz={datavizCategory(i)} />)
     <rect data-plx-dataviz={datavizStep('sequential', value, 0, 100)} />     // "sequential-5"
     <rect data-plx-dataviz={datavizStep('diverging', change, -10, 10)} />     // midpoint 0 -> "diverging-4"
     <line data-plx-dataviz="alert-critical" />
   Props:
     DATAVIZ_SCALES: { categorical: 6, sequential: 7, diverging: 7 }, the number of steps of each scale
     DATAVIZ_STATUS: ['positive', 'caution', 'negative', 'informative', 'neutral'] (data-plx-dataviz="status-<name>")
     DATAVIZ_ALERT: ['warning', 'critical'] (data-plx-dataviz="alert-<name>")
     datavizCategory(index): "categorical-1" to "categorical-6" for series index 0, 1, …; after six it starts again
     datavizStep(scale, value, min?, max?): the step of "sequential" or "diverging" for a value between min and max
       (default 0 and 1; values outside are clamped); for diverging the midpoint is halfway between min and max
     datavizToken(name): the token of a step, "--plx-sys-dataviz-" + name
   Behavior:
     A series keeps its color in every view: assign by a stable order (the series' order in the data), never by rank.
     The scales are the same in light and dark mode; marks keep 3:1 against the chart surface (the Contrast rules page).
   Notes:
     Color is never the only cue: label series directly or add markers and patterns (Use of color). Status and alert colors
     only where the data is a status or a threshold, never for ordinary series. More than six categories: group or filter. */

export const DATAVIZ_SCALES = Object.freeze({ categorical: 6, sequential: 7, diverging: 7 });
export const DATAVIZ_STATUS = Object.freeze(['positive', 'caution', 'negative', 'informative', 'neutral']);
export const DATAVIZ_ALERT = Object.freeze(['warning', 'critical']);

export function datavizCategory(index) {
  const n = DATAVIZ_SCALES.categorical, i = Math.floor(Number(index) || 0);
  return 'categorical-' + ((((i % n) + n) % n) + 1);
}

export function datavizStep(scale, value, min = 0, max = 1) {
  const steps = DATAVIZ_SCALES[scale];
  if (!steps || scale === 'categorical') throw new Error('datavizStep: the scale is "sequential" or "diverging", not "' + scale + '"');
  const span = max - min;
  const t = span ? Math.min(1, Math.max(0, (Number(value) - min) / span)) : 0.5;
  return scale + '-' + Math.min(steps, Math.floor(t * steps) + 1);
}

export function datavizToken(name) { return '--plx-sys-dataviz-' + name; }
