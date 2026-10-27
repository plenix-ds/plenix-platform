/* Plenix · VoteTally
   Summary: A live vote: the members as a list, each with an avatar, the name and role, and three icon-only choices
     (Approve, Deny, Abstain); a turned-off member's lock badge in place of the choices; the totals, the quorum and the
     result under the list (owner, vote-live-36, vote-screen-36/37; the vote kit's shapes, packages/vote-kit).
   Usage:
     <VoteTally label="Motion 14: approve the 2027 budget" members={event.members} outcome={event.outcome}
       settings={event.settings} status={event.status} onVote={(memberId, option) => put(memberId, option)} />
   Props:
     label: the vote's name (the list's accessible name) (required)
     members: [{ memberId, name, role, picture, disabledReason, vote: "approve" | "deny" | "abstain" | null, voteHidden }]
       (the kit's member shape; disabledReason "Recused", "Absent" … turns the member off; voteHidden: the service holds
       this member's choice back from the viewer)
     outcome: { approve, deny, abstain, notVoted, turnedOff, present, quorum: { needed, present, met }, result } from the
       kit's counting; without it the part counts the three choices itself and shows no quorum or result
     settings: the vote's settings: labels { approve, deny, abstain, turnedOff } (the choices' words), liveVisibility
       ("totals" | "hidden-until-closed": the words shown for a held-back vote), changeVote ("final": a cast vote cannot be
       cleared)
     status: "open" (default) | "closed": closed, every choice is read-only
     readOnly: the choices only show the votes (default false)
     connection: "live" (default) | "reconnecting": while reconnecting a badge says so and the choices are read-only, so
       no vote is sent blind; the last totals stay
     onVote(memberId, option): a choice pressed; option null when the chosen one is pressed again (unless changeVote is
       "final")
     strings: the words, for other languages (the settings' labels win for the three choices)
     className: more classes on the section
   Behavior:
     Each member's choices are a group named "Vote of <name>": three toggle buttons (aria-pressed), each with its name and
       tooltip. The chosen one fills green, red or gray (Button tone); the others are plain buttons. While the choices are
       read-only (closed, readOnly, reconnecting) the chosen one keeps its color and the others are disabled.
     The totals show only the counts they are given: a vote that holds the choices back sends none for the three.
     A turned-off member shows a Badge with a lock and the reason, and is counted nowhere.
     A held-back vote (voteHidden) shows "Hidden until the vote closes" or "Totals only" in place of the choices.
     The totals row is a polite live region: a new result is announced.
     Narrow (under the stack width): the name and role above the choices.
   Notes:
     The part draws; it does not count the quorum or the result (the kit's rules do, the same function in the service).
     Every value is a --plx-comp-vote-tally-* token; the colors are Button's tone and Badge's.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Avatar } from '../Avatar/Avatar.jsx';
import { Badge } from '../Badge/Badge.jsx';
import { Button } from '../Button/Button.jsx';
import { Text } from '../Text/Text.jsx';

const STRINGS = {
  approve: 'Approve', deny: 'Deny', abstain: 'Abstain', turnedOff: 'turned off', notVoted: 'Not voted',
  voteOf: 'Vote of {name}', hiddenUntilClosed: 'Hidden until the vote closes', totalsOnly: 'Totals only',
  reconnecting: 'Reconnecting', quorum: 'Quorum: {present} present, {needed} needed ({state})', met: 'met', notMet: 'not met',
  result: { open: 'Open', passing: 'Passing', failing: 'Failing', passed: 'Passed', failed: 'Failed', tied: 'Tied', 'no-quorum': 'No quorum' },
};
const OPTIONS = [['approve', 'check', 'success'], ['deny', 'close', 'danger'], ['abstain', 'remove', 'neutral']];
const RESULT_TONE = { open: 'neutral', passing: 'active', failing: 'action-required', passed: 'success', failed: 'negative', tied: 'waiting', 'no-quorum': 'waiting' };
const fill = (s, v) => String(s).replace(/\{(\w+)\}/g, (m, k) => (v[k] === undefined || v[k] === null ? m : v[k]));

// the three counts when the app gives no outcome: only the members who are not turned off
function countOf(members) {
  const c = { approve: 0, deny: 0, abstain: 0, notVoted: 0, turnedOff: 0 };
  members.forEach((m) => { if (m.disabledReason) c.turnedOff += 1; else if (m.vote && c[m.vote] !== undefined) c[m.vote] += 1; else if (!m.voteHidden) c.notVoted += 1; });
  return c;
}

export function VoteTally({ label, members = [], outcome, settings = {}, status = 'open', readOnly = false, connection = 'live', onVote, strings, className }) {
  const t = Object.assign({}, STRINGS, strings, settings.labels || {});
  const words = Object.assign({}, STRINGS.result, strings && strings.result);
  const o = outcome || countOf(members);
  const locked = readOnly || status === 'closed' || connection === 'reconnecting' || typeof onVote !== 'function';
  const hiddenText = settings.liveVisibility === 'totals' ? t.totalsOnly : t.hiddenUntilClosed;
  const choose = (m, option) => { if (!locked) onVote(m.memberId, m.vote === option && settings.changeVote !== 'final' ? null : option); };
  return (
    <section className={cx('plx-vote-tally', className)} aria-label={label}>
      <ul className="plx-vote-tally__list">
        {members.map((m) => (
          <li key={m.memberId} className="plx-vote-tally__member">
            <Avatar name={m.name} src={m.picture || undefined} />
            <span className="plx-vote-tally__who"><Text variant="strong">{m.name}</Text>{m.role ? <Text variant="secondary">{m.role}</Text> : null}</span>
            {m.disabledReason ? <Badge tone="neutral" icon="lock">{m.disabledReason + ' (' + t.turnedOff + ')'}</Badge>
              : m.voteHidden ? <Badge tone="neutral" icon="visibility-off">{hiddenText}</Badge>
              : (
                <span className="plx-vote-tally__choices" role="group" aria-label={fill(t.voteOf, { name: m.name })}>
                  {OPTIONS.map(([option, icon, tone]) => (
                    <Button key={option} iconOnly icon={icon} label={t[option]} tone={tone} pressed={m.vote === option}
                      disabled={locked && m.vote !== option} onClick={() => choose(m, option)} />
                  ))}
                </span>
              )}
          </li>
        ))}
      </ul>
      <div className="plx-vote-tally__totals" aria-live="polite">
        {/* only the counts it is given: a vote that holds the choices back sends no approve, deny or abstain */}
        {o.approve !== undefined ? <Badge tone="success" icon="check">{t.approve + ' ' + o.approve}</Badge> : null}
        {o.deny !== undefined ? <Badge tone="negative" icon="close">{t.deny + ' ' + o.deny}</Badge> : null}
        {o.abstain !== undefined ? <Badge tone="neutral" icon="remove">{t.abstain + ' ' + o.abstain}</Badge> : null}
        {o.notVoted !== undefined ? <Badge tone="waiting" icon="schedule">{t.notVoted + ' ' + o.notVoted}</Badge> : null}
        {o.turnedOff ? <Badge tone="neutral" icon="lock">{t.turnedOff.charAt(0).toUpperCase() + t.turnedOff.slice(1) + ' ' + o.turnedOff}</Badge> : null}
        {o.result ? <Badge tone={RESULT_TONE[o.result] || 'neutral'} icon={o.result === 'passed' || o.result === 'passing' ? 'check' : 'schedule'}>{words[o.result] || o.result}</Badge> : null}
        {connection === 'reconnecting' ? <Badge tone="waiting" icon="schedule">{t.reconnecting}</Badge> : null}
        {o.quorum && o.quorum.needed ? <Text variant="secondary" className="plx-vote-tally__quorum">{fill(t.quorum, { present: o.quorum.present, needed: o.quorum.needed, state: o.quorum.met ? t.met : t.notMet })}</Text> : null}
      </div>
    </section>
  );
}
