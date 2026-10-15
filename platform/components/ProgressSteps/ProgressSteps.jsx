/* Plenix · ProgressSteps
   Summary: The steps of a task done in order (setup, an import, a checkout) and where the person is: each step's marker,
     name and optional line, joined by connectors, with the done, current, upcoming and failed steps each told by an icon
     or number and in words. Horizontal or vertical; clickable to go back to a step; or compact ("Step 2 of 5" over a
     bar of segments) where names add nothing. The navigation Stepper, the Progress tracker and Step progress.
   Usage:
     <ProgressSteps label="Import" current={1} steps={[{ label: 'Upload' }, { label: 'Map columns' }, { label: 'Review' }]} />
     <ProgressSteps orientation="vertical" current={2} steps={[{ label: 'Details', description: 'Name and owner' }, …]} />
     <ProgressSteps current={2} onStepClick={setStep} steps={steps} />                                  // clickable
     <ProgressSteps current={1} steps={[{ label: 'Upload' }, { label: 'Map columns', status: 'error' }, …]} />
     <ProgressSteps variant="compact" current={1} steps={steps} />                                      // Step 2 of 5
   Props:
     steps: the steps, in order: [{ label, description, status, disabled }]
     steps[].label: the step's short name (a noun: Details, Review)
     steps[].description: a second line under the name (optional; not in the compact form)
     steps[].status: "complete" | "current" | "upcoming" | "error" (needs attention); default from current: the steps
       before it are complete, it is current, the steps after it upcoming
     steps[].disabled: the step cannot be chosen even when it is complete (clickable steps)
     current: the index of the current step (0-based)
     orientation: "horizontal" (default; one row, the connectors between) | "vertical" (one step under another, the
       connector down the marker column, room for descriptions)
     variant: "default" | "compact" ("Step 2 of 5: Review" over a bar of one segment per step)
     onStepClick(index): makes the done and current steps buttons that go to that step (clickable); upcoming steps stay
       text (people cannot skip ahead)
     label: the accessible name of the list ("Import steps")
     strings: the words it shows and announces, for other languages: { step: "Step {n} of {total}", complete:
       "Complete", current: "Current step", upcoming: "Not started", error: "Needs attention" }
     className: more classes on the steps
   Behavior:
     The steps are an ordered list; the current step is aria-current="step". Every step's state is said in words after its
       name (visually hidden: "Complete", "Needs attention"), never by color alone: a complete step shows a check, a
       failed one an alert, the others their number.
     Clickable: the done and current steps are buttons in the Tab order (Enter or Space goes to the step); upcoming and
       disabled steps are not focusable.
     Horizontal steps that do not fit their row wrap onto more lines; a vertical list is the choice on a narrow window.
     Compact: the text says the step and its name; the bar's segments are decoration (hidden from screen readers).
   Notes:
     Steps that can be done in any order are tabs or sections, not steps. Three to seven steps; two need no stepper.
     Statuses of records are a Badge; these markers belong to the steps only.
     Other props pass through to the outer element.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.jsx';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.jsx';

const STRINGS = { step: 'Step {n} of {total}', complete: 'Complete', current: 'Current step', upcoming: 'Not started', error: 'Needs attention' };
const fill = (s, n, total) => s.replace('{n}', n).replace('{total}', total);

export function ProgressSteps({ steps = [], current = 0, orientation = 'horizontal', variant = 'default', onStepClick, label, strings, className, ...rest }) {
  const t = Object.assign({}, STRINGS, strings);
  const statusOf = (s, i) => s.status || (i < current ? 'complete' : i === current ? 'current' : 'upcoming');
  if (variant === 'compact') {
    const at = Math.max(0, Math.min(current, steps.length - 1));
    const step = steps[at] || {};
    return (
      <div role="group" aria-label={label} className={cx('plx-progress-steps', 'plx-progress-steps--compact', className)} {...rest}>
        <p className="plx-progress-steps__count">{fill(t.step, at + 1, steps.length)}{step.label ? <span className="plx-progress-steps__count-label">{': ' + step.label}</span> : null}</p>
        <div className="plx-progress-steps__segments" aria-hidden="true">
          {steps.map((s, i) => <span key={i} className={cx('plx-progress-steps__segment', 'is-' + statusOf(s, i))} />)}
        </div>
      </div>
    );
  }
  return (
    <ol aria-label={label} className={cx('plx-progress-steps', 'plx-progress-steps--' + (orientation === 'vertical' ? 'vertical' : 'horizontal'), onStepClick && 'plx-progress-steps--clickable', className)} {...rest}>
      {steps.map((s, i) => {
        const status = statusOf(s, i);
        const canGo = onStepClick && !s.disabled && (status === 'complete' || status === 'current' || status === 'error');
        const marker = (
          <span className="plx-progress-steps__marker" aria-hidden="true">
            {status === 'complete' ? <Icon name="check" /> : status === 'error' ? <Icon name="alert" /> : <span className="plx-progress-steps__number">{i + 1}</span>}
          </span>
        );
        const words = <><span className="plx-progress-steps__label">{s.label}</span><VisuallyHidden>{', ' + t[status]}</VisuallyHidden></>;
        return (
          <li key={i} className={cx('plx-progress-steps__step', 'is-' + status)} aria-current={status === 'current' ? 'step' : undefined}>
            {canGo ? (
              <button type="button" className="plx-progress-steps__head plx-progress-steps__button" onClick={() => onStepClick(i)}>{marker}<span className="plx-progress-steps__text">{words}</span></button>
            ) : (
              <span className="plx-progress-steps__head">{marker}<span className="plx-progress-steps__text">{words}</span></span>
            )}
            {s.description ? <span className="plx-progress-steps__description">{s.description}</span> : null}
            {i < steps.length - 1 ? <span className="plx-progress-steps__connector" aria-hidden="true" /> : null}
          </li>
        );
      })}
    </ol>
  );
}
