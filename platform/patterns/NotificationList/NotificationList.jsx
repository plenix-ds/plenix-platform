/* Plenix · NotificationList
   Summary: The signed-in person's notifications, as a list (the session's, unless items are given).
   Usage:
     <NotificationList limit={5} onViewAll={() => …} onOpen={(n) => …} />
   Props:
     items: [{ id, text, time, unread }] (default: useSession().notifications)
     onChange(next): runs with the updated list after a read
     onOpen(n): runs when a notification is opened
     onViewAll(): adds a "View all" button that runs it
     limit: how many to show (default: all)
     label: the list's accessible name (default "Notifications")
     footer: true (default) shows Mark all read and View all under the list; false when the page puts Mark all read in its
       own header (useSession().setNotifications)
     className: more classes
   Behavior:
     Unread ones are marked (ActivityList's unread dot) and bold.
     Opening one marks it read; Mark all read clears them, and is disabled when none are unread.
     Without items, the reads are saved to the session.
     With no notifications it says "No notifications".
   Notes:
     It lives in the page (the dashboard's Notifications section), not in the header: the header carries no notifications.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useSession } from '../../providers/SessionProvider.jsx';
import { ActivityList } from '../ActivityList/ActivityList.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { EmptyState } from '../../components/EmptyState/EmptyState.jsx';

export function NotificationList({ items, onChange, onOpen, onViewAll, limit, label = 'Notifications', footer = true, className }) {
  const session = useSession();
  const own = items || session.notifications;
  const unread = own.filter((n) => n.unread).length;
  const save = (next) => { if (!items) session.setNotifications(next); if (onChange) onChange(next); };
  const markAll = () => save(own.map((n) => Object.assign({}, n, { unread: false })));
  const open = (n) => { if (n.unread) save(own.map((x) => (x.id === n.id ? Object.assign({}, x, { unread: false }) : x))); if (onOpen) onOpen(n); };
  const shown = limit ? own.slice(0, limit) : own;
  return (
    <div className={cx('plx-notification-list', className)}>
      {shown.length ? (
        <ActivityList label={label}>
          {shown.map((n) => (
            <ActivityList.Item key={n.id} title={n.text} time={n.time} unread={!!n.unread} onOpen={() => open(n)} />
          ))}
        </ActivityList>
      ) : <EmptyState size="inline">No notifications</EmptyState>}
      {footer ? <div className="plx-notification-list__footer">
        <Button size="sm" variant="ghost" disabled={!unread} onClick={markAll}>Mark all read</Button>
        {onViewAll ? <Button size="sm" variant="ghost" onClick={onViewAll}>View all</Button> : null}
      </div> : null}
    </div>
  );
}
