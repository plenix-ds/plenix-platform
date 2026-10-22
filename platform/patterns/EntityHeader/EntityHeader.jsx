/* Plenix · EntityHeader
   Summary: The header of a page that shows one entity (a contact, a project, an email, a note, a component page), and of a
     section inside it. Header style 1, Structured · Top row · Small (owner, 2026-10-19, "Plenix page headers"): the media
     beside the title and subtitle, an accent rule, a row of fact tiles with the Status tile first, and an aside with the
     next step over the entity's actions. A section header is the same anatomy one step smaller.
   Usage:
     <EntityHeader media={{ person: 'Maya Chen', color: 'blue' }} title="Maya Chen" subtitle="Creative Director · Apex Co"
       status={{ tone: 'action-required', icon: 'alert', label: 'Reconnect due' }}
       facts={[{ label: 'Last message', value: '10:24 AM', data: true }, { label: 'Owner', value: 'Sam Patel' }]}
       next={{ title: 'Send the revised quote', detail: 'Due tomorrow · Sam Patel' }}
       actions={[{ icon: 'phone', label: 'Call' }, { icon: 'message', label: 'Message', primary: true }, { icon: 'share', label: 'Share' }]} />
     <EntityHeader kind="section" media={{ icon: 'message', hue: 'blue' }} title="Comments" summary="3 open · 5 resolved"
       actions={[{ icon: 'plus', label: 'Add comment' }]} />
   Props:
     kind: "page" (default) | "section": a section header (32px icon, 15px title, 4px rule, a summary instead of tiles)
     title: the entity's name; 18px medium (15px in a section); a long name wraps, never cut off
     subtitle: the line under the title: the entity's description, where it belongs or who it involves; wraps
     media: the entity's picture, always shown: { person, src, color, gender } an Avatar (gender: its icon when there is no
       picture); { icon, hue } a generic icon for the
       entity's kind, tinted in a data color (hue: blue, green, purple, red, brown, gray; default gray) or on the surface
       (hue: surface, a white tile); or an element. 44px square (32px in a section)
     status: the Status tile, first in the details, in its tone as a whole: { tone, label, icon } (tone: a Badge tone:
       neutral, success, active, waiting, action-required, negative; info, warning and danger still work)
     facts: up to four fact tiles after the Status tile, each as wide as its content: [{ label, value, data }] (data: a
       technical value, in the data font); a plain string or element is a tile with no label
     summary: a section header's summary under its rule (a count, a state): text
     next: the aside's next step: { title, detail, label } (label: the eyebrow; default strings.next, "Next step")
     actions: the actions that act on this entity, 32px icon buttons at the end of the aside: [{ icon, label, onClick,
       primary, disabled }]; label is the tooltip and the accessible name; at most four buttons, More last. Never
       capability actions (New …)
     actionLabels: "icon" (default: icon buttons, the label as tooltip and name) | "text" (the icon and its label)
     actionsLayout: "row" (default: side by side, folding into More from the end) | "column" (stacked at the end, each as
       wide as the widest)
     control: a control that sets the entity's state, in the aside above the actions (a SegmentedControl for Draft · In
       session · Adjourned, a Select); it keeps its own label
     moreActions: items only in the More menu: [{ icon, label, onSelect, danger }]
     headingLevel: the title's heading level (default 1; 2 in a section)
     className: more classes on the header
     strings: the words it shows and announces, for other languages: { more: "More actions", status: "Status",
       next: "Next step" }
     description, context: the older names for the subtitle (description wins); live: the older name for the status
   Behavior:
     A card. Its background follows the user's settings on the page root: data-plx-header-tint none (default: white) | gray
       | blue | warm | green | purple | red, and data-plx-header-tint-style fade (default) | flat.
     Two columns, main 1.7 to aside 1, with a divider between them; with no next step and no actions there is no aside.
     The accent rule runs 10% past the wider of the heading and the details.
     The tiles wrap on narrow screens; under 640px of the header's own width the aside moves under the main column (its
       divider above it, at the start edge).
     The actions fold from the end into More when the aside is too narrow.
   Notes:
     Not for settings screens: use RecordPage.Header. A small uppercase group label is SectionHeading.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useOverflow, splitAt } from '../../utils/overflow.js';
import { Avatar } from '../../components/Avatar/Avatar.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { Icon } from '../../components/Icon/Icon.jsx';
import { Menu, MenuItem } from '../../components/Menu/Menu.jsx';
import { Text } from '../../components/Text/Text.jsx';

const HUES = ['blue', 'green', 'purple', 'red', 'brown', 'gray', 'surface'];
const TONES = ['neutral', 'success', 'active', 'waiting', 'action-required', 'negative'];
const ALIASES = { info: 'active', warning: 'waiting', danger: 'negative' };
const MAX_BUTTONS = 4;   // at most four buttons in the aside: three actions, then More (always last)

function Media({ media, section }) {
  let inner;
  if (React.isValidElement(media)) inner = media;
  else if (media.person || media.src) inner = <Avatar className="plx-entity-header__avatar" name={media.person} src={media.src} color={media.color} gender={media.gender} size={section ? 'md' : 'xl'} />;
  else {
    const hue = HUES.indexOf(media.hue) >= 0 ? media.hue : 'gray';
    inner = <span className="plx-entity-header__tile" data-plx-media-hue={hue} aria-hidden="true"><Icon name={media.icon} size={section ? 'md' : 'lg'} /></span>;
  }
  return <span className="plx-entity-header__media">{inner}</span>;
}

function Details({ status, facts, strings }) {
  const tiles = [];
  if (status && React.isValidElement(status)) tiles.push(<div key="st" className="plx-entity-header__fact">{status}</div>);
  else if (status) {
    const tone = TONES.indexOf(ALIASES[status.tone] || status.tone) >= 0 ? (ALIASES[status.tone] || status.tone) : 'neutral';
    tiles.push(
      <div key="st" className="plx-entity-header__fact plx-entity-header__fact--status" data-plx-tone={tone}>
        <dt className="plx-entity-header__fact-label">{strings.status}</dt>
        <dd className="plx-entity-header__fact-value plx-entity-header__status-value">{status.icon ? <Icon name={status.icon} size="sm" /> : null}{status.label}</dd>
      </div>
    );
  }
  (facts || []).filter(Boolean).slice(0, 4).forEach((f, i) => {
    const plain = typeof f === 'string' || typeof f === 'number' || React.isValidElement(f);
    const value = plain ? f : (f.data ? <Text variant="data">{f.value}</Text> : f.value);
    tiles.push(
      <div key={'f' + i} className="plx-entity-header__fact">
        {!plain && f.label ? <dt className="plx-entity-header__fact-label">{f.label}</dt> : null}
        <dd className="plx-entity-header__fact-value">{value}</dd>
      </div>
    );
  });
  return tiles.length ? <dl className="plx-entity-header__details">{tiles}</dl> : null;
}

function Actions({ actions, moreActions, size, strings, labels = 'icon', layout = 'row' }) {
  const text = labels === 'text', column = layout === 'column';
  const ref = React.useRef(null);
  const extra = moreActions || [];
  let list = actions || [];
  let folded = [];
  if (list.length > MAX_BUTTONS - 1) { folded = list.slice(MAX_BUTTONS - 1); list = list.slice(0, MAX_BUTTONS - 1); }
  const none = React.useRef(null);   // a column is not measured: the helper would hide what sits below the first row
  const measured = useOverflow(column ? none : ref, list.length, list.map((a) => a.label).join('|') + labels + layout);
  const fit = column ? list.length : measured;   // a column has room for every action: nothing folds
  const items = list.map((a) => (
    <span key={a.label} data-plx-overflow-item="" className={cx('plx-entity-header__action', column && 'plx-entity-header__action--stretch')}>
      {text
        ? <Button size={size} icon={a.icon} variant={a.primary ? 'primary' : 'secondary'} disabled={a.disabled} onClick={a.onClick}>{a.label}</Button>
        : <Button size={size} iconOnly icon={a.icon} label={a.label} title={a.label} variant={a.primary ? 'primary' : 'secondary'} disabled={a.disabled} onClick={a.onClick} />}
    </span>
  ));
  const hidden = list.slice(fit).concat(folded);
  const more = (
    <span key="plx-more" data-plx-overflow-more="" className={cx('plx-entity-header__action', column && 'plx-entity-header__action--stretch')}>
      <Menu label={strings.more} placement="bottom-end" trigger={text ? <Button size={size} icon="more" variant="secondary">{strings.more}</Button> : <Button size={size} iconOnly icon="more" label={strings.more} title={strings.more} variant="secondary" />}>
        {hidden.map((a) => <MenuItem key={a.label} icon={a.icon} disabled={a.disabled} onSelect={a.onClick}>{a.label}</MenuItem>)}
        {extra.map((a) => <MenuItem key={a.label} icon={a.icon} danger={a.danger} onSelect={a.onSelect}>{a.label}</MenuItem>)}
      </Menu>
    </span>
  );
  return <div ref={ref} className={cx('plx-entity-header__actions', column && 'plx-entity-header__actions--column', size === 'sm' && 'plx-entity-header__actions--sm')}>{splitAt(items, fit, more)}</div>;
}

export function EntityHeader({ kind = 'page', title, subtitle, media, status, facts, summary, next, actions, moreActions,
  actionLabels = 'icon', actionsLayout = 'row', control, description, context, live, headingLevel, className, strings }) {
  const section = kind === 'section';
  const H = 'h' + (headingLevel || (section ? 2 : 1));
  const s = { more: 'More actions', status: 'Status', next: 'Next step', ...strings };
  const sub = subtitle !== undefined ? subtitle : (description !== undefined ? description : context);
  const st = status || live;
  const hasActions = (actions && actions.length) || (moreActions && moreActions.length);
  const aside = !!(next && !section) || !!hasActions || !!control;
  return (
    <header className={cx('plx-entity-header', section && 'plx-entity-header--section', !aside && 'plx-entity-header--solo', className)}>
      <div className="plx-entity-header__layout">
        <div className="plx-entity-header__main">
          <div className="plx-entity-header__lead">
            <div className="plx-entity-header__heading">
              <Media media={media || { icon: 'doc-text' }} section={section} />
              <div className="plx-entity-header__text">
                <H className="plx-entity-header__title">{title}</H>
                {sub && !section ? <p className="plx-entity-header__subtitle">{sub}</p> : null}
              </div>
            </div>
            <div className="plx-entity-header__rule" aria-hidden="true" />
            {section ? (summary || sub ? <p className="plx-entity-header__summary">{summary || sub}</p> : null) : <Details status={st} facts={facts} strings={s} />}
          </div>
        </div>
        {aside ? (
          <div className="plx-entity-header__aside">
            {next && !section ? (
              <div className="plx-entity-header__next">
                <p className="plx-entity-header__eyebrow">{next.label || s.next}</p>
                <p className="plx-entity-header__next-title">{next.title}</p>
                {next.detail ? <p className="plx-entity-header__next-detail">{next.detail}</p> : null}
              </div>
            ) : null}
            {control || hasActions ? (
              <div className="plx-entity-header__tools">
                {control ? <div className="plx-entity-header__control">{control}</div> : null}
                {hasActions ? <Actions actions={actions} moreActions={moreActions} size={section ? 'sm' : 'md'} strings={s} labels={actionLabels} layout={actionsLayout} /> : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
