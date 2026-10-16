/* Plenix · RecordPage, RecordPage.Header
   Summary: The Object / record page structure (11 › Page structures): a header region over the record's body and an
     optional aside. RecordPage.Header is the header region: the title block of a page, panel or record, also used alone.
   Usage:
     <RecordPage header={<RecordPage.Header title="Cross 014.png" meta={<…/>} actions={<…/>} />} aside={<…/>}>…</RecordPage>
     <RecordPage.Header title="General" description="Language, regional formats…" meta={<…/>} media={<…/>} actions={<…/>}
       size="lg" surface="card" headingLevel={1} />
   Props:
     header: the header region (a RecordPage.Header)
     aside: an optional column on the end side (facts, related items)
     children: the record's body (panels, tables)
     className: more classes on the page
     RecordPage.Header.title: the heading
     RecordPage.Header.description: a paragraph under the title
     RecordPage.Header.meta: a line of badges or technical values under the title
     RecordPage.Header.media: a thumbnail or avatar before the text
     RecordPage.Header.actions: controls at the end
     RecordPage.Header.size: "lg" (default; a page or settings screen title, 20px) | "md" (a record or panel title, 15px)
     RecordPage.Header.surface: "none" (default; the header sits on the page) | "card" (a card like the panels below it, with a soft warm
       gradient and the media in the header-card icon color; a page title that leads a column of panels)
     RecordPage.Header.headingLevel: the title's heading level (default 1)
     RecordPage.Header.className: more classes on the header
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';

function Header({ title, description, meta, media, actions, size = 'lg', surface = 'none', headingLevel = 1, className }) {
  devWarn('RecordPage.Header', { size }, { size: ['lg','md'] });
  const H = 'h' + headingLevel;
  return (
    <div className={cx('plx-record-page__header', 'plx-record-page__header--' + size, surface === 'card' && 'plx-record-page__header--card', className)}>
      {media ? <div className="plx-record-page__media">{media}</div> : null}
      <div className="plx-record-page__text">
        <H className="plx-record-page__title">{title}</H>
        {description ? <p className="plx-record-page__description">{description}</p> : null}
        {meta ? <div className="plx-record-page__meta">{meta}</div> : null}
      </div>
      {actions ? <div className="plx-record-page__actions">{actions}</div> : null}
    </div>
  );
}

export function RecordPage({ header, aside, className, children }) {
  return (
    <div className={cx('plx-record-page', className)}>
      {header}
      {aside ? <div className="plx-record-page__columns"><div className="plx-record-page__body">{children}</div><aside className="plx-record-page__aside">{aside}</aside></div>
        : <div className="plx-record-page__body">{children}</div>}
    </div>
  );
}
RecordPage.Header = Header;
