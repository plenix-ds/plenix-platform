/* Plenix · Rating
   Summary: 1 to max stars as a radio group, for rating an item.
   Usage:
     <Rating value={rating} onChange={setRating} />
   Props:
     value: the number of stars; 0 = none (default)
     onChange(value): runs when the rating changes
     max: the number of stars; default 5
     label: the accessible name; default "Rating"
     readOnly: shows the stars as a picture that cannot be changed; default false
     className: more classes on the rating
     ...rest: other attributes go on the rating element
   Behavior:
     Arrow keys move the rating; Space or Enter chooses a star.
     Choosing the current value again clears it.
     Read-only, it is announced as "Rating: 3 of 5".
*/
import React from 'react';
import { arrowStep } from '../../utils/direction.js';
import { cx } from '../../utils/cx.js';

export function Rating({ value = 0, onChange, max = 5, label = 'Rating', readOnly = false, className, ...rest }) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  const starRefs = React.useRef({});
  const focusNext = React.useRef(0);   // the star the keyboard chose: focus moves there once the value has changed
  React.useEffect(() => {
    const el = focusNext.current && starRefs.current[focusNext.current];
    if (el) el.focus();
    focusNext.current = 0;
  }, [value]);
  if (readOnly) {
    return (
      <span className={cx('plx-rating', 'plx-rating--read-only', className)} role="img" aria-label={label + ': ' + value + ' of ' + max} {...rest}>
        {stars.map((n) => <span key={n} className={cx('plx-rating__star', n <= value && 'plx-rating__star--on')} aria-hidden="true">★</span>)}
      </span>
    );
  }
  const choose = (n) => onChange && onChange(n === value ? 0 : n);
  // the arrow keys in reading order (Up is more, Down is less); focus follows the chosen star, as in a radio group (batch 213)
  const onKey = (e, n) => {
    const step = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : arrowStep(e, e.currentTarget, { vertical: false });
    if (!step) return;
    e.preventDefault();
    const next = Math.min(max, Math.max(1, n + step));
    focusNext.current = next;
    if (onChange) onChange(next);
  };
  return (
    <span className={cx('plx-rating', className)} role="radiogroup" aria-label={label} {...rest}>
      {stars.map((n) => (
        <button type="button" key={n} ref={(el) => { starRefs.current[n] = el; }} role="radio" aria-checked={n === value} aria-label={n + (n === 1 ? ' star' : ' stars')}
          tabIndex={(value ? n === value : n === 1) ? 0 : -1} className={cx('plx-rating__star', n <= value && 'plx-rating__star--on')}
          onClick={() => choose(n)} onKeyDown={(e) => onKey(e, n)}>★</button>
      ))}
    </span>
  );
}
