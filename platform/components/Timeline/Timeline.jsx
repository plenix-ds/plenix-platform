/* Plenix · Timeline
   Summary: Events in the order they happened (07 Data Display › Lists and collections › Timeline): each a marker on one
     line, with its date or time, a title and a few words; down the page (vertical), across it (horizontal), or on both
     sides of the line (alternating). A marker is a small circle, or the event's icon in a circle (with icons).
   Usage:
     <Timeline label="Project history" items={[
       { id: 1, time: 'Oct 2, 2026', dateTime: '2026-10-02', title: 'Project created', description: 'Maya Chen set up the project.' },
       { id: 2, time: 'Oct 9, 2026', dateTime: '2026-10-09', title: 'Quotes uploaded', icon: 'upload', badge: <Badge tone="success">Approved</Badge> }]} />
     <Timeline orientation="horizontal" label="Release plan" items={milestones} />
     <Timeline align="alternate" label="Our story" items={events} />
   Props:
     items: the events, oldest first (or newest first, as the page reads): [{ id, time, dateTime, title, description,
       icon, badge, content }]
     items[].time: the date or time as people read it (drawn in the data font)
     items[].dateTime: the machine-readable date of the <time> element (ISO 8601)
     items[].title: what happened (required)
     items[].description: a line or two about it
     items[].icon: an icon name (platform/icons/map.json): the marker is the icon in a circle; without it a small circle
     items[].badge: a Badge after the title, for the event's status (a status is always a Badge, never the marker)
     items[].content: more under the description (a link, a file, an avatar)
     orientation: "vertical" (default) | "horizontal" (the events in a row that scrolls sideways when it does not fit)
     align: "start" (default; every event after the line) | "alternate" (vertical only: the events take turns on each side
       of a line down the middle; one side again at Narrow widths)
     label: the timeline's accessible name (required when no heading names it)
     className: more classes on the list
   Behavior:
     The timeline is an ordered list (<ol>): each event is announced with its place (1 of 5), its time and title.
     It is static: put links or buttons inside an event's title or content when it opens something.
     Horizontal: the row scrolls sideways when it is wider than its container; the row is one Tab stop and the arrow keys
       scroll it (tabIndex 0, named by label).
     Alternating falls back to every event after the line below the Narrow width (600px).
   Notes:
     The markers and the line are neutral: they show order, not state. Show an event's state with a Badge (badge).
     More than about a dozen events: show the latest and a "Show earlier" button, or use the activity stream.
     Other props pass through to the <ol>.
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';
import { Icon } from '../Icon/Icon.jsx';

export function Timeline({ items = [], orientation = 'vertical', align = 'start', label, className, ...rest }) {
  const horizontal = orientation === 'horizontal';
  const alternate = !horizontal && align === 'alternate';
  return (
    <ol aria-label={label} tabIndex={horizontal ? 0 : undefined}
      className={cx('plx-timeline', horizontal && 'plx-timeline--horizontal', alternate && 'plx-timeline--alternate', className)} {...rest}>
      {items.map((it, i) => (
        <li key={it.id !== undefined ? it.id : i} className="plx-timeline__item">
          <span className={cx('plx-timeline__marker', it.icon && 'plx-timeline__marker--icon')} aria-hidden="true">
            {it.icon ? <Icon name={it.icon} /> : <span className="plx-timeline__dot" />}
          </span>
          <div className="plx-timeline__content">
            {it.time ? <time className="plx-timeline__time" dateTime={it.dateTime}>{it.time}</time> : null}
            <div className="plx-timeline__heading">
              <span className="plx-timeline__title">{it.title}</span>
              {it.badge ? <span className="plx-timeline__badge">{it.badge}</span> : null}
            </div>
            {it.description ? <p className="plx-timeline__description">{it.description}</p> : null}
            {it.content ? <div className="plx-timeline__extra">{it.content}</div> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
