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
import { cx } from '../../utils/cx.js';

export function Rating({ value = 0, onChange, max = 5, label = 'Rating', readOnly = false, className, ...rest }) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  if (readOnly) {
    return (
      <span className={cx('plx-rating', 'plx-rating--read-only', className)} role="img" aria-label={label + ': ' + value + ' of ' + max} {...rest}>
        {stars.map((n) => <span key={n} className={cx('plx-rating__star', n <= value && 'plx-rating__star--on')} aria-hidden="true">★</span>)}
      </span>
    );
  }
  const choose = (n) => onChange && onChange(n === value ? 0 : n);
  const onKey = (e, n) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); if (onChange) onChange(Math.min(max, n + 1)); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); if (onChange) onChange(Math.max(1, n - 1)); }
  };
  return (
    <span className={cx('plx-rating', className)} role="radiogroup" aria-label={label} {...rest}>
      {stars.map((n) => (
        <button type="button" key={n} role="radio" aria-checked={n === value} aria-label={n + (n === 1 ? ' star' : ' stars')}
          tabIndex={(value ? n === value : n === 1) ? 0 : -1} className={cx('plx-rating__star', n <= value && 'plx-rating__star--on')}
          onClick={() => choose(n)} onKeyDown={(e) => onKey(e, n)}>★</button>
      ))}
    </span>
  );
}
