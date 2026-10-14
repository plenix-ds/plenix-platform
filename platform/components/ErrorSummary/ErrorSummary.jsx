/* Plenix · ErrorSummary
   Summary: The list of what stopped a form from being sent, at the top of the form after a failed submit: a danger
     Notice with a title that says how many problems there are and one link per problem, in the form's order, each
     taking focus to its field. Focus moves to the summary when it appears, so people hear it first.
   Usage:
     {errors.length ? <ErrorSummary errors={[{ target: 'asset-name', message: 'Enter a name' }, { target: 'asset-owner', message: 'Choose an owner' }]} /> : null}
     <ErrorSummary title="The asset was not saved" errors={errors} headingLevel={3} />
   Props:
     errors: the problems, in the form's order: [{ target, message }]; target is the id of the field to focus (the
       Field's control id), message the same words as the field's own error
     title: the heading (default strings.one or strings.many with the count)
     headingLevel: the heading's level, 2 to 6 (default 2)
     autoFocus: moves focus to the summary when it appears and when its errors change (default true)
     strings: the words it shows, for other languages: { one: "There is a problem", many: "There are {count} problems" }
     className: more classes on the summary
   Behavior:
     The summary is a group named by its heading; it takes focus (tabindex -1) when it appears, so a screen reader reads
       the heading and the list. It is not a live region: focus already brings it to people.
     Each problem is a link to #target: following it moves focus into the field and scrolls the field into view, with
       its label (block "center").
     Keep the same message beside each field (Field error); remove the summary when the form is sent again without
       problems.
   Notes:
     Other props pass through to the outer <div>.
     For a problem that is not about a field (the server did not answer), use a Notice or a Banner instead.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Notice } from '../Notice/Notice.jsx';
import { Link } from '../Link/Link.jsx';

const STRINGS = { one: 'There is a problem', many: 'There are {count} problems' };

export function ErrorSummary({ errors = [], title, headingLevel = 2, autoFocus = true, strings, className, ...rest }) {
  const t = Object.assign({}, STRINGS, strings);
  const ref = React.useRef(null);
  const titleId = 'plx-es' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const key = errors.map((e) => e.target + ':' + e.message).join('|');
  React.useEffect(() => { if (autoFocus && errors.length && ref.current) ref.current.focus(); }, [key, autoFocus]);
  const H = 'h' + Math.min(6, Math.max(2, headingLevel));
  const heading = title || (errors.length === 1 ? t.one : t.many.replace('{count}', errors.length));
  const go = (target) => (e) => {
    const field = typeof document !== 'undefined' && document.getElementById(target);
    if (!field) return;
    e.preventDefault();
    field.focus({ preventScroll: true });
    field.scrollIntoView({ block: 'center' });
  };
  return (
    <div ref={ref} className={cx('plx-error-summary', className)} tabIndex={-1} role="group" aria-labelledby={titleId} {...rest}>
      <Notice tone="danger" role={undefined} title={<H className="plx-error-summary__title" id={titleId}>{heading}</H>}>
        <ul className="plx-error-summary__list">
          {errors.map((e) => <li key={e.target + e.message} className="plx-error-summary__item"><Link href={'#' + e.target} onClick={go(e.target)}>{e.message}</Link></li>)}
        </ul>
      </Notice>
    </div>
  );
}
