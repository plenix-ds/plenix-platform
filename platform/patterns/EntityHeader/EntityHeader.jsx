/* Plenix · EntityHeader
   Summary: The header of a page that shows one entity (a contact, a project, an email, a note, a task list): its picture,
     its name, the actions that act on it, and one line of facts about it. Decided with the owner on 2026-10-09 (the page
     header study, docs/page-header-study.html).
   Usage:
     <EntityHeader media={{ person: 'Maya Chen', color: 'blue' }} context="Clients" status={{ tone: 'action-required', label: 'Reconnect due' }}
       title="Maya Chen" facts={['Creative Director', 'Apex Co', <>Last message <Text variant="data">10:24 AM</Text></>]}
       actions={[{ icon: 'phone', label: 'Call' }, { icon: 'message', label: 'Message', primary: true }, { icon: 'share', label: 'Share' }]} />
     <EntityHeader media={{ icon: 'briefcase', hue: 'blue' }} title="AI Writing Tools" description="Evaluating AI writing assistants" />
   Props:
     title: the entity's name; 18px bold; a long name wraps, never cut off
     media: the entity's picture, always shown: { person, src, color } draws an Avatar (48px); { icon, hue } a generic icon for
       the entity's kind, tinted in a data color (hue: blue, green, purple, red, brown, gray; default gray), or on the surface (hue: surface, a white tile); or an element
     context: the line above the title (optional; not a breadcrumb): a placeholder such as the item's category, or a control
       that places the entity (a period navigator); what it holds is still to be defined per capability
     status: the entity's status, a soft Badge in the upper-right status area: { tone, label } (tone: a Badge variant: neutral, success,
       active, waiting, action-required, negative; the old info, warning, danger still work) or an element
     actions: the actions that act on this entity, as 16px icon buttons side by side: [{ icon, label, onClick, primary,
       disabled }]; label is the tooltip and the accessible name; one primary (filled). Never capability actions (New …)
     moreActions: items only in the ⋯ menu, after the actions that did not fit: [{ icon, label, onSelect, danger }]
     (with neither actions nor moreActions there is no action area, not even ⋯: a documentation page, an overview)
     live: the live state, the first fact, as a small status badge with its icon (owner, 2026-10-14: never a dot):
       { tone (a Badge variant), icon, label }
     facts: key facts, one line joined by ·, at most four (live state included); what does not fit is cut with …;
       a technical value in a fact (a date, a time, a file name) is Text variant "data", at the facts' size
     description: a sentence instead of facts (never both)
     headingLevel: the title's heading level (default 1)
     className: more classes on the header
     strings: the words it shows and announces, for other languages: { more: "More actions" }
   Behavior:
     A card on the page (the shell floats its content as cards). Its background follows the user's settings on the page root:
       data-plx-header-tint none | gray | blue (default) | warm | green | purple | red, and data-plx-header-tint-style fade
       (default; the tint at the top fading to the surface) | flat.
     The media spans the three lines; nothing sits above it. The context line and the status area share the top line.
     Actions sit at the right, level with the title; the ⋯ menu is always last. When the row is too narrow the actions at
       the end fold into the ⋯ menu first; the title keeps at least half the width.
     A full-width line (border-subtle) runs above the facts, across the text column.
     Every fact is in the same font, size, weight and color; only the separators are muted.
   Notes:
     Not for settings screens or section titles: use RecordPage.Header.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useOverflow, splitAt } from '../../utils/overflow.js';
import { Avatar } from '../../components/Avatar/Avatar.jsx';
import { Badge } from '../../components/Badge/Badge.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { Icon } from '../../components/Icon/Icon.jsx';
import { Menu, MenuItem } from '../../components/Menu/Menu.jsx';

const HUES = ['blue', 'green', 'purple', 'red', 'brown', 'gray', 'surface'];

function Media({ media }) {
  if (React.isValidElement(media)) return <span className="plx-entity-header__media">{media}</span>;
  if (media.person || media.src) return <Avatar className="plx-entity-header__media plx-entity-header__avatar" name={media.person} src={media.src} color={media.color} size="xl" />;
  const hue = HUES.indexOf(media.hue) >= 0 ? media.hue : 'gray';
  return <span className="plx-entity-header__media plx-entity-header__tile" data-plx-media-hue={hue} aria-hidden="true"><Icon name={media.icon} size="lg" /></span>;
}

function Facts({ live, facts, description }) {
  const items = [];
  if (live) items.push(<Badge key="live" size="sm" tone={live.tone} icon={live.icon} className="plx-entity-header__live">{live.label}</Badge>);
  if (description) items.push(<span key="d">{description}</span>);
  else (facts || []).filter(Boolean).forEach((f, i) => items.push(<span key={'f' + i}>{f}</span>));
  if (!items.length) return null;
  return (
    <p className="plx-entity-header__facts">
      {items.map((it, i) => <React.Fragment key={i}>{i ? <span className="plx-entity-header__sep" aria-hidden="true">·</span> : null}{it}</React.Fragment>)}
    </p>
  );
}

function Actions({ actions, moreActions, strings }) {
  const ref = React.useRef(null);
  const list = actions || [];
  const fit = useOverflow(ref, list.length, list.map((a) => a.label).join('|'));
  const items = list.map((a) => (
    <span key={a.label} data-plx-overflow-item="" className="plx-entity-header__action">
      <Button size="xs" iconOnly icon={a.icon} label={a.label} title={a.label} variant={a.primary ? 'primary' : 'ghost'} disabled={a.disabled} onClick={a.onClick} />
    </span>
  ));
  const hidden = list.slice(fit);
  const extra = moreActions || [];
  const more = (
    <span key="plx-more" data-plx-overflow-more="" className="plx-entity-header__action">
      <Menu label={strings.more} placement="bottom-end" trigger={<Button size="xs" iconOnly icon="more" label={strings.more} title={strings.more} variant="ghost" />}>
        {hidden.map((a) => <MenuItem key={a.label} icon={a.icon} disabled={a.disabled} onSelect={a.onClick}>{a.label}</MenuItem>)}
        {extra.map((a) => <MenuItem key={a.label} icon={a.icon} danger={a.danger} onSelect={a.onSelect}>{a.label}</MenuItem>)}
      </Menu>
    </span>
  );
  return <div ref={ref} className="plx-entity-header__actions" data-plx-density="compact">{splitAt(items, fit, more)}</div>;
}

export function EntityHeader({ title, media, context, status, actions, moreActions, live, facts, description, headingLevel = 1, className, strings }) {
  const H = 'h' + headingLevel;
  const s = { more: 'More actions', ...strings };
  const badge = status && !React.isValidElement(status) ? <Badge tone={status.tone}>{status.label}</Badge> : status;
  return (
    <header className={cx('plx-entity-header', className)}>
      <Media media={media || { icon: 'doc-text' }} />
      <div className="plx-entity-header__top">
        {context ? <div className="plx-entity-header__context">{context}</div> : <span />}
        {badge ? <div className="plx-entity-header__status">{badge}</div> : null}
      </div>
      <H className="plx-entity-header__title">{title}</H>
      {(actions && actions.length) || (moreActions && moreActions.length) ? <Actions actions={actions} moreActions={moreActions} strings={s} /> : null}
      <Facts live={live} facts={facts} description={description} />
    </header>
  );
}
