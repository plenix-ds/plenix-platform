/* Plenix · calendar (calendar/calendar.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 201: the month as RowButton day cells with EventChips, the chosen day's events as Cards (accent: the calendar's
   color), the week and the day as TimeGrid. */
import { Button, Card, Chip, DateBadge, EventChip, Icon, Inline, SegmentedControl, Stack, Tag, TagList, Text, TimeGrid, RowButton } from 'plenix-platform';
import { ClassificationWidget } from '../suite/classification.jsx';
import { CALENDARS, CAL_EVENTS } from '../suite/shared.jsx';
const { useState } = React;

/* ─── Calendar ──────────────────────────────────────────────────── */
export function CalendarScreen() {
  const TODAY = 5;
  const [selDay, setSelDay] = useState(TODAY);
  const [selEv, setSelEv] = useState(null);
  const [evMeta, setEvMeta] = useState({});
  const [view, setView] = useState('month');
  const [activeCals] = useState(() => Object.fromEntries(CALENDARS.map((c) => [c.id, true])));
  const [activeTag, setActiveTag] = useState(null);

  const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DAYS_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const firstDay = new Date(2026, 2, 1).getDay();
  const cells = []; for (let i = 0; i < firstDay; i++) cells.push(null); for (let d = 1; d <= 31; d++) cells.push(d);

  const allTags = [...new Set(CAL_EVENTS.map((e) => e.title.split('—')[0].split('(')[0].trim()))];
  const visibleEvs = CAL_EVENTS.filter((e) => activeCals[e.cal] && (!activeTag || e.title.toLowerCase().includes(activeTag.toLowerCase())));
  const evFor = (n) => visibleEvs.filter((e) => e.date === n);
  const calName = (id) => (CALENDARS.find((c) => c.id === id) || {}).label;
  // "2:00 PM" → 14; all-day events have no hour
  const hourOf = (t) => { if (t === 'All day') return null; const [h, rest] = t.split(':'); const ap = rest.split(' ')[1]; let hr = parseInt(h, 10); if (ap === 'PM' && hr !== 12) hr += 12; return hr; };
  const gridEvents = (days) => visibleEvs.filter((e) => days.indexOf(e.date) >= 0 && hourOf(e.time) !== null)
    .map((e) => ({ id: e.id, day: String(e.date), start: hourOf(e.time), end: hourOf(e.time) + 1, title: e.title, time: e.time, color: e.color, onClick: () => setSelEv(e.id) }));
  const dayCol = (d) => ({ key: String(d), weekday: DAYS_SHORT[new Date(2026, 2, d).getDay()], day: d, today: d === TODAY, dateTime: '2026-03-' + String(d).padStart(2, '0') });
  const weekDays = [1, 2, 3, 4, 5, 6, 7];   // Mar 1–7 (starts Sun Mar 1)

  return (
    <Stack gap="none" grow className="plx-motion-enter">
      <Stack inset="md" gap="sm">
        <Inline justify="between" wrap>
          <Inline gap="sm">
            <Button size="sm" iconOnly label="Previous" icon={<Icon name="chevron-left" />} />
            <Text as="h1" variant="heading">{view === 'day' ? `March ${selDay}, 2026` : view === 'week' ? 'Mar 1–7, 2026' : 'March 2026'}</Text>
            <Button size="sm" iconOnly label="Next" icon={<Icon name="chevron-right" />} />
            <Button size="sm" onClick={() => { setSelDay(TODAY); setView('day'); }}>Today</Button>
          </Inline>
          <Inline gap="sm">
            <SegmentedControl size="sm" label="Calendar view" value={view} onChange={setView} options={[{ value: 'month', label: 'Month' }, { value: 'week', label: 'Week' }, { value: 'day', label: 'Day' }]} />
            <Button variant="primary" size="sm" icon={<Icon name="plus" />}>Add event</Button>
          </Inline>
        </Inline>
        <TagList label="Filter events">
          <Chip selected={!activeTag} onClick={() => setActiveTag(null)}>All</Chip>
          {allTags.map((tag) => <Chip key={tag} selected={activeTag === tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)}>{tag}</Chip>)}
        </TagList>
      </Stack>

      {view === 'month' ? (
        <Stack inset="md" gap="md" grow scroll>
          <div className="plx-u-grid plx-u-cols-repeat-7-1fr plx-u-gap-x-cluster-xs plx-u-gap-y-cluster-xs" role="group" aria-label="March 2026">
            {/* the weekday names are for the eye: each day button says its full date */}
            {DAYS_SHORT.map((d) => <Text key={d} variant="eyebrow" aria-hidden="true">{d}</Text>)}
            {cells.map((d, i) => d === null ? <span key={i} aria-hidden="true" /> : (
              <RowButton key={i} selected={d === selDay} current={d === TODAY ? 'date' : undefined} onClick={() => setSelDay(d)}
                aria-label={'March ' + d + (evFor(d).length ? ', ' + evFor(d).length + (evFor(d).length === 1 ? ' event' : ' events') : '')}>
                <Stack gap="xs" inset="xs" className="plx-u-min-h-80px">
                  <Inline justify="end"><DateBadge day={d} today={d === TODAY} /></Inline>
                  {evFor(d).slice(0, 2).map((e) => <EventChip key={e.id} title={e.title} color={e.color} />)}
                  {evFor(d).length > 2 ? <Text variant="caption">+{evFor(d).length - 2} more</Text> : null}
                </Stack>
              </RowButton>
            ))}
          </div>
          {evFor(selDay).length > 0 ? (
            <Stack gap="sm">
              <Text variant="eyebrow">March {selDay}</Text>
              {evFor(selDay).map((e) => (
                <Card key={e.id} title={e.title} meta={e.time} accent={e.color} selected={selEv === e.id} onOpen={() => setSelEv(selEv === e.id ? null : e.id)}
                  actions={<Tag>{calName(e.cal)}</Tag>}>
                  {selEv === e.id ? <ClassificationWidget value={evMeta[e.id]} onChange={(m) => setEvMeta((p) => ({ ...p, [e.id]: m }))} /> : null}
                </Card>
              ))}
            </Stack>
          ) : null}
        </Stack>
      ) : null}

      {view === 'week' ? (
        <Stack grow scroll>
          <TimeGrid label="Week of March 1, 2026" startHour={8} endHour={19} days={weekDays.map(dayCol)} events={gridEvents(weekDays)} hourLabel={(h) => (h > 12 ? h - 12 : h) + (h >= 12 ? ' PM' : ' AM')} />
        </Stack>
      ) : null}

      {view === 'day' ? (
        <Stack grow scroll gap="sm">
          <Stack inset="md" gap="sm">
            <Text variant="secondary">{DAYS_FULL[new Date(2026, 2, selDay).getDay()]}</Text>
            {evFor(selDay).length === 0 ? <Text variant="secondary">No events</Text> : null}
            {visibleEvs.filter((e) => e.date === selDay && e.time === 'All day').map((e) => <EventChip key={e.id} title={e.title} time="All day" color={e.color} />)}
          </Stack>
          <TimeGrid label={'March ' + selDay + ', 2026'} startHour={8} endHour={19} days={[dayCol(selDay)]} events={gridEvents([selDay])} hourLabel={(h) => (h > 12 ? h - 12 : h) + (h >= 12 ? ' PM' : ' AM')} />
        </Stack>
      ) : null}
    </Stack>
  );
}
