/* Plenix · Pagination
   Summary: Page buttons, an optional summary ("1–30 of 120") and an optional per-page choice.
   Usage:
     <Pagination page={2} pageCount={4} onPageChange={setPage}
       total={120} perPage={30} perPageOptions={[30, 60, 120]} onPerPageChange={setPerPage} />
   Props:
     page: the current page, 1-based; default 1
     pageCount: the number of pages; default 1
     onPageChange(page): runs when another page is chosen
     total: the number of items; with it the summary shows
     perPage: the number of items per page
     perPageOptions: the per-page choices; with onPerPageChange the per-page choice shows
     onPerPageChange(n): runs when another per-page number is chosen
     label: the accessible name of the navigation; default strings.label: "Pages"
     className: more classes on the navigation
     strings: the words it shows and announces, for other languages (default: the locale's, through LocaleProvider; Arabic is
       built in): { label: "Pages", range: "{first}–{last} of {total}",
       previous: "Previous page", next: "Next page", page: "Page {n}", perPage: "Per page" }
     ...rest: other attributes go on the navigation element
   Behavior:
     Shows the first and last page, the current page and its neighbors, with "…" between gaps.
     Previous is disabled on the first page; Next on the last.
     The current page carries aria-current="page".
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useStrings } from '../../providers/LocaleProvider.jsx';
import { dataPhrase } from '../../utils/dataText.jsx';

const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));

function pagesToShow(page, count) {
  const set = new Set([1, count, page - 1, page, page + 1].filter((p) => p >= 1 && p <= count));
  const list = Array.from(set).sort((a, b) => a - b), out = [];
  list.forEach((p, i) => { if (i && p - list[i - 1] > 1) out.push('gap-' + p); out.push(p); });
  return out;
}

export function Pagination({ page = 1, pageCount = 1, onPageChange, total, perPage, perPageOptions, onPerPageChange, label, strings, className, ...rest }) {
  // the words: the catalog's for the locale (i18n/en.js, and Arabic says the range its own way: "31 إلى 60 من 120"),
  // then the strings prop
  const t = useStrings('pagination', strings);
  const go = (p) => { if (p >= 1 && p <= pageCount && p !== page && onPageChange) onPageChange(p); };
  const first = total ? (page - 1) * (perPage || 0) + 1 : null;
  const last = total ? Math.min(total, page * (perPage || total)) : null;
  return (
    <nav className={cx('plx-pagination', className)} aria-label={label || t.label} {...rest}>
      {total ? <div className="plx-pagination__info">{dataPhrase(t.range, { first, last, total })}</div> : null}
      <div className="plx-pagination__pages">
        <button type="button" className="plx-pagination__page plx-pagination__page--step" aria-label={t.previous} disabled={page <= 1} onClick={() => go(page - 1)}>‹</button>
        {pagesToShow(page, pageCount).map((p) => typeof p === 'string'
          ? <span key={p} className="plx-pagination__gap" aria-hidden="true">…</span>
          : <button type="button" key={p} className="plx-pagination__page" aria-current={p === page ? 'page' : undefined} aria-label={fill(t.page, { n: p })} onClick={() => go(p)}>{p}</button>)}
        <button type="button" className="plx-pagination__page plx-pagination__page--step" aria-label={t.next} disabled={page >= pageCount} onClick={() => go(page + 1)}>›</button>
      </div>
      {perPageOptions && onPerPageChange ? (
        <label className="plx-pagination__per-page">
          <span>{t.perPage}</span>
          <select className="plx-pagination__select" value={perPage} onChange={(e) => onPerPageChange(Number(e.target.value))}>
            {perPageOptions.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      ) : null}
    </nav>
  );
}
