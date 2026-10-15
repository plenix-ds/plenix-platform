/* Plenix · PermissionSummary
   Summary: Who can reach an item and what they may do with it, in a few lines: the access in words with its icon ("Your
     team can edit"), where it comes from ("From the Marketing folder · 12 people"), then what that access allows and does
     not allow as two lists, Can (a check in the success color) and Cannot (a cross in the danger color); compact folds
     each list into one sentence. Manage access opens the sharing dialog (03 Content & Identity › Permission summary).
   Usage:
     <PermissionSummary access="Your team can edit" detail="From the Marketing folder · 12 people"
       can={['View', 'Comment', 'Edit details']} cannot={['Share', 'Delete']} onManage={openSharing} />
     <PermissionSummary variant="compact" icon="lock" access="Only you" can={['View', 'Edit']} cannot={['Share']} />
   Props:
     access: the access in words, audience first ("Anyone with the link can view", "Only you")
     icon: the icon before it: "lock" (default: restricted) | "settings-users" (a team or group) | "link" (anyone with the
       link) | "person" (one person) | any icon of the set; it repeats the words, never replaces them
     detail: where the access comes from and how many it reaches ("From the Marketing folder · 12 people")
     can: what the access allows: ["View", "Comment"]
     cannot: what it does not allow: ["Share", "Delete"]
     variant: "list" (default: Can and Cannot as headed lists) | "compact" (one sentence each: "Can view and comment",
       "Cannot share or delete")
     onManage(): shows Manage access, a button that opens the sharing settings (a dialog)
     manageHref: instead, Manage access is a link to the access settings page
     live: changes are announced politely (aria-live), for a summary that updates while people change the access
     strings: the words, for other languages: { can: "Can", cannot: "Cannot", manage: "Manage access", canSentence:
       "Can {list}", cannotSentence: "Cannot {list}" }
     className: more classes on the summary
   Behavior:
     Read only: it states the access; changing it is the sharing dialog's (onManage) or the settings page's (manageHref).
     The icons are decorative: the words say the access and each right; the success and danger colors repeat the check
       and the cross, so meaning never rests on color.
     Compact joins each list in the reader's language (formatList: "view, comment, and edit"; Cannot with "or").
   Notes:
     Lead with the audience, then the right. List the rights people ask about (share, delete, download), not every
       permission: Manage access shows the rest. A role's full grid of rights is the permissions editor's.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { formatList } from '../../utils/format.js';
import { Icon } from '../../components/Icon/Icon.jsx';
import { List } from '../../components/List/List.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { Link } from '../../components/Link/Link.jsx';

const STRINGS = { can: 'Can', cannot: 'Cannot', manage: 'Manage access', canSentence: 'Can {list}', cannotSentence: 'Cannot {list}' };
const fill = (s, v) => String(s).replace(/\{(\w+)\}/g, (m, k) => (v[k] !== undefined ? v[k] : m));
const lower = (x) => String(x).charAt(0).toLowerCase() + String(x).slice(1);

export function PermissionSummary({ access, icon = 'lock', detail, can = [], cannot = [], variant = 'list', onManage, manageHref, live = false, strings, className, ...rest }) {
  const t = Object.assign({}, STRINGS, strings);
  const compact = variant === 'compact';
  const yes = (children) => ({ icon: 'check', tone: 'success', children });
  const no = (children) => ({ icon: 'close', tone: 'danger', children });
  const manage = manageHref ? <Link href={manageHref} className="plx-permission-summary__manage">{t.manage}</Link>
    : onManage ? <Button size="sm" variant="ghost" className="plx-permission-summary__manage" onClick={onManage}>{t.manage}</Button> : null;
  return (
    <div className={cx('plx-permission-summary', compact && 'plx-permission-summary--compact', className)} aria-live={live ? 'polite' : undefined} {...rest}>
      <div className="plx-permission-summary__head">
        <span className="plx-permission-summary__icon" aria-hidden="true"><Icon name={icon} /></span>
        <span className="plx-permission-summary__access">
          <span className="plx-permission-summary__level">{access}</span>
          {detail ? <span className="plx-permission-summary__detail">{detail}</span> : null}
        </span>
        {manage}
      </div>
      {compact ? (
        can.length || cannot.length ? (
          <List className="plx-permission-summary__list" items={[].concat(
            can.length ? [yes(fill(t.canSentence, { list: formatList(can.map(lower)) }))] : [],
            cannot.length ? [no(fill(t.cannotSentence, { list: formatList(cannot.map(lower), { type: 'disjunction' }) }))] : [])} />
        ) : null
      ) : can.length || cannot.length ? (
        <div className="plx-permission-summary__lists">
          {can.length ? (
            <div className="plx-permission-summary__section">
              <p className="plx-permission-summary__heading">{t.can}</p>
              <List className="plx-permission-summary__list" items={can.map(yes)} />
            </div>
          ) : null}
          {cannot.length ? (
            <div className="plx-permission-summary__section">
              <p className="plx-permission-summary__heading">{t.cannot}</p>
              <List className="plx-permission-summary__list" items={cannot.map(no)} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
