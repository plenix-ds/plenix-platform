/* Plenix · ReviewFlow, ReviewQueue, WorkflowStatus
   Summary: The review of one item and the queue of many. ReviewFlow is a review panel: the item's status as a badge with
     its icon, the reviewers and their decisions, a comment, and the decisions in order (Reject, Request changes, Approve
     last); Reject and Request changes need a reason, said under the comment field. Its history lists every decision.
     kind="human" is the human review of generated content: a notice says a person must check it first. ReviewQueue is
     the data review workflow: a DataTable of items waiting for review under a CommandBar whose selection holds Approve,
     Request changes and Reject; the bulk decisions that need a reason ask for it with the count ("Reject 2 items?").
     WorkflowStatus is the status badge they share (10 Patterns › Review and approval).
   Usage:
     <ReviewFlow title="Easter banner" status="in-review" reviewers={reviewers} history={history}
       onDecision={(decision, comment) => save(decision, comment)} />
     <ReviewFlow kind="human" title="Summary of the vestry minutes" status="in-review" onDecision={decide} />
     <ReviewQueue label="Waiting for review" items={items} noun="item" onDecision={(ids, decision, reason) => …} />
     <WorkflowStatus status="changes-requested" />
   Props:
     WorkflowStatus.status: "draft" (neutral, pencil) | "in-review" (active, doc-search) | "approved" (success, circle-check)
       | "changes-requested" (action-required, alert) | "rejected" (negative, close) | "published" (success, visibility)
       | "scheduled" (waiting, schedule): a Badge of its meaning with its icon
     WorkflowStatus.label: other words for the status (default strings[status])
     WorkflowStatus.size: Badge's size: "md" (default) | "sm"
     ReviewFlow.status: the item's status (WorkflowStatus.status)
     ReviewFlow.title: what is reviewed (the item's name), a heading
     ReviewFlow.headingLevel: the title's level (default 3)
     ReviewFlow.detail: one line under the title ("Submitted by Maya Chen")
     ReviewFlow.kind: "review" (default) | "human" (the human review of generated content: the notice first)
     ReviewFlow.reviewers: [{ id, name, src, color, decision }]: each reviewer with their decision ("approved",
       "changes-requested", "rejected"; none yet: waiting)
     ReviewFlow.history: [{ id, name, src, color, decision, comment, time, dateTime }]: the decisions so far, newest first
     ReviewFlow.onDecision(decision, comment): runs with "approved", "changes-requested" or "rejected" and the comment;
       without it the panel is read only (no comment, no decisions)
     ReviewFlow.decisions: the decisions offered, in order (default ["rejected", "changes-requested", "approved"])
     ReviewFlow.reasonFor: the decisions that need a comment (default ["rejected", "changes-requested"])
     ReviewQueue.items: [{ id, name, type, submittedBy, submitted, status }] (submitted "YYYY-MM-DD")
     ReviewQueue.label: names the bar and the table ("Waiting for review")
     ReviewQueue.noun, plural: the item in words ("item", "items")
     ReviewQueue.onDecision(ids, decision, reason): runs for the selected rows
     ReviewQueue.selected, onSelectionChange(ids): the selection, when the page keeps it (default: kept inside)
     strings: the words, for other languages (ReviewFlow: { reviewers, history, comment, commentHint, reason, approved,
       "changes-requested", rejected, approve, changes, reject, waiting, human, needReason }; ReviewQueue: { name, type,
       submittedBy, submitted, status, approve, changes, reject, rejectTitle, changesTitle, reason, changesLabel,
       needReason, done })
     className: more classes
   Behavior:
     ReviewFlow: Approve runs at once with the comment if there is one. Reject and Request changes run only with a
       comment: without one, the field shows the error and takes focus (nothing is disabled). The decision is announced.
     The status is always a Badge with its icon (never a dot): the word says the state, the color and icon repeat it.
     ReviewQueue: the command bar swaps to the selection's commands while rows are selected; Approve runs at once,
       Reject and Request changes open a PromptDialog named with the count that asks for the reason, then run; the
       selection clears after a decision and a toast says what happened.
   Notes:
     The review panel goes in a side panel, a card or a page section; it draws no frame of its own.
     Decisions are final for the reviewer; to change one, decide again (the history keeps both).
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';
import { announce } from '../../utils/announce.jsx';
import { formatNumber, formatDate } from '../../utils/format.js';
import { Badge } from '../../components/Badge/Badge.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { Field } from '../../components/Field/Field.jsx';
import { Textarea } from '../../components/Input/Input.jsx';
import { Notice } from '../../components/Notice/Notice.jsx';
import { Persona } from '../../components/Persona/Persona.jsx';
import { Avatar } from '../../components/Avatar/Avatar.jsx';
import { Text } from '../../components/Text/Text.jsx';
import { PromptDialog } from '../../components/Dialog/Dialog.jsx';
import { DataTable } from '../../components/DataTableNext/DataTablePublic.jsx';
import { useToast } from '../../components/Toast/Toast.jsx';
import { ActivityList } from '../ActivityList/ActivityList.jsx';
import { CommandBar } from '../CommandBar/CommandBar.jsx';

// the workflow statuses: a Badge variant by meaning, and its icon (owner, 2026-10-15)
export const WORKFLOW_STATUSES = {
  draft: { tone: 'neutral', icon: 'pencil', label: 'Draft' },
  'in-review': { tone: 'active', icon: 'doc-search', label: 'In review' },
  approved: { tone: 'success', icon: 'circle-check', label: 'Approved' },
  'changes-requested': { tone: 'action-required', icon: 'alert', label: 'Changes requested' },
  rejected: { tone: 'negative', icon: 'close', label: 'Rejected' },
  published: { tone: 'success', icon: 'visibility', label: 'Published' },
  scheduled: { tone: 'waiting', icon: 'schedule', label: 'Scheduled' },
};

export function WorkflowStatus({ status = 'draft', label, size, strings, className, ...rest }) {
  devWarn('WorkflowStatus', { size }, { size: ['md','sm'] });
  const s = WORKFLOW_STATUSES[status] || WORKFLOW_STATUSES.draft;
  const words = label || (strings && strings[status]) || s.label;
  return <Badge tone={s.tone} icon={s.icon} size={size} className={cx('plx-workflow-status', className)} {...rest}>{words}</Badge>;
}

// a toast when the page has a ToastProvider; nothing otherwise (the decision is still announced)
export function useOptionalToast() {
  try { return useToast(); } catch (e) { return null; }
}

const fill = (s, v) => String(s).replace(/\{(\w+)\}/g, (m, k) => (v[k] !== undefined ? v[k] : m));
// a day ("YYYY-MM-DD") read as local midnight: Date reads a bare day as UTC, which is a day early west of Greenwich
export const localDay = (d) => (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d + 'T00:00' : d);

const FLOW_STRINGS = {
  reviewers: 'Reviewers', history: 'History', comment: 'Comment', commentHint: 'Needed to reject or request changes.',
  approve: 'Approve', changes: 'Request changes', reject: 'Reject', waiting: 'Waiting',
  human: 'Generated content. A person checks it before it is used.', needReason: 'Say why, so the author knows what to change.',
  done: '{decision}: {title}', decisions: 'Review decisions',
};
const VERB = { approved: 'approve', 'changes-requested': 'changes', rejected: 'reject' };
const LOOK = { approved: 'primary', 'changes-requested': 'secondary', rejected: 'danger-secondary' };

export function ReviewFlow({ status = 'in-review', title, headingLevel = 3, detail, kind = 'review', reviewers = [], history = [],
  onDecision, decisions = ['rejected', 'changes-requested', 'approved'], reasonFor = ['rejected', 'changes-requested'],
  strings, className, ...rest }) {
  const t = Object.assign({}, FLOW_STRINGS, strings);
  const toast = useOptionalToast();
  const [comment, setComment] = React.useState('');
  const [error, setError] = React.useState('');
  const field = React.useRef(null);
  const H = 'h' + Math.min(6, Math.max(2, headingLevel));
  const word = (d) => (t[d] || WORKFLOW_STATUSES[d].label);
  const decide = (d) => {
    if (reasonFor.indexOf(d) >= 0 && !comment.trim()) { setError(t.needReason); if (field.current) field.current.focus(); return; }
    setError('');
    onDecision(d, comment.trim());
    setComment('');
    const said = fill(t.done, { decision: word(d), title: title || '' });
    if (toast) toast.show(said, { tone: d === 'approved' ? 'success' : 'info' }); else announce(said);
  };
  return (
    <section className={cx('plx-review-flow', kind === 'human' && 'plx-review-flow--human', className)} aria-label={title} {...rest}>
      <div className="plx-review-flow__head">
        <div className="plx-review-flow__heading">
          {title ? <H className="plx-review-flow__title">{title}</H> : null}
          {detail ? <span className="plx-review-flow__detail">{detail}</span> : null}
        </div>
        <WorkflowStatus status={status} strings={strings} />
      </div>
      {kind === 'human' ? <Notice tone="info" icon="sparkle">{t.human}</Notice> : null}
      {reviewers.length ? (
        <div className="plx-review-flow__section">
          <p className="plx-review-flow__label">{t.reviewers}</p>
          <ul className="plx-review-flow__reviewers">
            {reviewers.map((r) => (
              <li key={r.id || r.name} className="plx-review-flow__reviewer">
                <Persona name={r.name} src={r.src} color={r.color} size="xs" />
                {r.decision ? <WorkflowStatus status={r.decision} strings={strings} />
                  : <span className="plx-review-flow__waiting">{t.waiting}</span>}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {onDecision ? (
        <div className="plx-review-flow__decide">
          <Field label={t.comment} description={t.commentHint} error={error || undefined}>
            <Textarea ref={field} rows={3} value={comment} onChange={(e) => { setComment(e.target.value); if (error) setError(''); }} />
          </Field>
          <div className="plx-review-flow__actions" role="group" aria-label={t.decisions}>
            {decisions.map((d) => <Button key={d} variant={LOOK[d]} onClick={() => decide(d)}>{t[VERB[d]]}</Button>)}
          </div>
        </div>
      ) : null}
      {history.length ? (
        <div className="plx-review-flow__section">
          <p className="plx-review-flow__label">{t.history}</p>
          <ActivityList label={t.history} stacked>
            {history.map((x) => (
              <ActivityList.Item key={x.id || x.name + x.time} leading={<Avatar name={x.name} src={x.src} color={x.color} size="xs" />}
                title={x.name} meta={word(x.decision) + (x.comment ? ': ' + x.comment : '')} time={x.time} dateTime={x.dateTime} />
            ))}
          </ActivityList>
        </div>
      ) : null}
    </section>
  );
}

const QUEUE_STRINGS = {
  name: 'Name', type: 'Type', submittedBy: 'Submitted by', submitted: 'Submitted', status: 'Status',
  approve: 'Approve', changes: 'Request changes', reject: 'Reject',
  rejectTitle: 'Reject {what}?', changesTitle: 'Request changes on {what}?', reason: 'Reason', changesLabel: 'What to change',
  reasonHint: 'The authors see it with the decision.', needReason: 'Say why, so the authors know what to change.',
  done: '{what} {decision}', count: '{n} {plural}',
};

export function ReviewQueue({ items = [], label = 'Waiting for review', noun = 'item', plural, onDecision, selected, onSelectionChange,
  strings, className, ...rest }) {
  const t = Object.assign({}, QUEUE_STRINGS, strings);
  const many = plural || noun + 's';
  const toast = useOptionalToast();
  const [own, setOwn] = React.useState([]);
  const sel = selected !== undefined ? selected : own;
  const setSel = (ids) => { if (selected === undefined) setOwn(ids); if (onSelectionChange) onSelectionChange(ids); };
  const [ask, setAsk] = React.useState(null);   // "rejected" | "changes-requested" while its dialog is open
  const what = (n) => (n === 1 ? '1 ' + noun : formatNumber(n) + ' ' + many);
  const run = (decision, reason) => {
    const ids = sel.slice();
    if (onDecision) onDecision(ids, decision, reason || '');
    setSel([]); setAsk(null);
    const said = fill(t.done, { what: what(ids.length), decision: WORKFLOW_STATUSES[decision].label.toLowerCase() });
    if (toast) toast.show(said, { tone: decision === 'approved' ? 'success' : 'info' }); else announce(said);
  };
  const columns = [
    { title: t.name, field: 'name', kind: 'name' },
    { title: t.type, field: 'type' },
    { title: t.submittedBy, field: 'submittedBy', type: 'person' },
    { title: t.submitted, field: 'submitted', kind: 'data', type: 'date', render: (r) => <Text variant="data">{formatDate(localDay(r.submitted))}</Text> },
    { title: t.status, field: 'status', kind: 'center', render: (r) => <WorkflowStatus status={r.status} strings={strings} /> },
  ];
  return (
    <div className={cx('plx-review-queue', className)} {...rest}>
      <CommandBar label={label} count={fill(t.count, { n: formatNumber(items.length), plural: items.length === 1 ? noun : many })}
        selection={{ count: sel.length, noun, plural: many, onClear: () => setSel([]), actions: [
          { id: 'approve', label: t.approve, icon: 'circle-check', onSelect: () => run('approved') },
          { id: 'changes', label: t.changes, icon: 'alert', onSelect: () => setAsk('changes-requested') },
          { id: 'reject', label: t.reject, icon: 'close', danger: true, onSelect: () => setAsk('rejected') },
        ] }} />
      <DataTable label={label} data={items} index="id" selectable selected={sel} onSelectionChange={setSel} columns={columns} />
      <PromptDialog open={!!ask} title={fill(ask === 'rejected' ? t.rejectTitle : t.changesTitle, { what: what(sel.length) })}
        label={ask === 'rejected' ? t.reason : t.changesLabel} description={t.reasonHint}
        confirmLabel={ask === 'rejected' ? t.reject : t.changes} validate={(v) => (v.trim() ? '' : t.needReason)}
        onSubmit={(v) => run(ask, v.trim())} onCancel={() => setAsk(null)} />
    </div>
  );
}
