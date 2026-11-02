// Plenix · time zone helpers (issue 813): the date and the wall-clock time of a moment in an IANA zone, the moment of a
// wall-clock time in a zone, today in a zone and the zone's name, so DatePicker and TimePicker follow LocaleProvider's
// timeZone instead of the computer's zone. Built on Intl only (no date library).
// - A wall-clock time the zone skips (the hour lost when the clocks go forward) reads with the offset before the change, so
//   02:30 on that day is 03:30 after it; a time the zone repeats (the hour when the clocks go back) is the earlier moment.
//   (Temporal's "compatible" choice.)
// - A zone the browser does not know is no zone: validZone returns undefined and the callers use the computer's zone.

const formats = new Map<string, Intl.DateTimeFormat>();
const formatFor = (zone: string): Intl.DateTimeFormat => {
  let f = formats.get(zone);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', { timeZone: zone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    formats.set(zone, f);
  }
  return f;
};
const pad = (n: number, size = 2): string => String(n).padStart(size, '0');

// the zone when the browser knows it, else undefined
export function validZone(zone?: string | null): string | undefined {
  if (!zone) return undefined;
  try { formatFor(zone); return zone; } catch (e) { return undefined; }
}

// a moment's wall clock in the zone: its date ("YYYY-MM-DD"), its time ("HH:MM") and that wall clock read as UTC milliseconds
export function wallOf(ms: number, zone: string): { date: string; time: string; wall: number } {
  const at: Record<string, number> = {};
  formatFor(zone).formatToParts(new Date(ms)).forEach((p) => { if (p.type !== 'literal') at[p.type] = +p.value; });
  const hour = at.hour % 24;   // some engines write midnight as 24 on a 23-hour cycle
  return {
    date: pad(at.year, 4) + '-' + pad(at.month) + '-' + pad(at.day),
    time: pad(hour) + ':' + pad(at.minute),
    wall: Date.UTC(at.year, at.month - 1, at.day, hour, at.minute, at.second),
  };
}

// the zone's offset from UTC at a moment, in milliseconds (east positive)
function zoneOffset(ms: number, zone: string): number {
  const whole = Math.floor(ms / 1000) * 1000;
  return wallOf(whole, zone).wall - whole;
}

// the moment (UTC milliseconds) of a date ("YYYY-MM-DD") and a wall-clock time ("HH:MM") in the zone; NaN when they do not read
export function instantOf(date: string, time: string, zone: string): number {
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date || ''), t = /^(\d{2}):(\d{2})$/.exec(time || '');
  if (!d || !t) return NaN;
  const wall = Date.UTC(+d[1], +d[2] - 1, +d[3], +t[1], +t[2]);
  const day = 86400000;
  const before = zoneOffset(wall - day, zone), after = zoneOffset(wall + day, zone);
  // the moments the two offsets give; a moment is right when the zone has that offset at it
  const fits = [wall - before, wall - after].filter((ms) => zoneOffset(ms, zone) === wall - ms);
  if (fits.length) return Math.min(...fits);   // the earlier one when the hour repeats
  return wall - before;   // a skipped time: the offset before the change
}

// a value that names one moment: an ISO date and time ending in Z or an offset ("2026-03-08T07:30:00.000Z", "…T09:30+02:00")
export function isInstant(value: unknown): boolean {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})$/i.test(value) && !Number.isNaN(Date.parse(value));
}

// the moment of a date and a time in the zone, as an ISO string in UTC ("2026-03-08T07:30:00.000Z"); null when they do not read
export function instantIso(date: string, time: string, zone: string): string | null {
  const ms = instantOf(date, time, zone);
  return Number.isNaN(ms) ? null : new Date(ms).toISOString();
}

// today's date in the zone ("YYYY-MM-DD")
export function todayIn(zone: string, now: number = Date.now()): string {
  return wallOf(now, zone).date;
}

// the zone's name at a moment in the locale ("EDT", "GMT+2"), or "" when the browser has none; no zone: the computer's
export function zoneName(locale: string, style: Intl.DateTimeFormatOptions['timeZoneName'], zone?: string, ms: number = Date.now()): string {
  try {
    const p = new Intl.DateTimeFormat(locale, { timeZoneName: style, timeZone: zone }).formatToParts(new Date(ms)).find((x) => x.type === 'timeZoneName');
    return p ? p.value : '';
  } catch (e) { return ''; }
}
