/* Plenix · Chat
   Summary: The live messaging surface of a conversation (12 › Collaboration and communication › Chat): its header, the
     thread of messages (mine on the end side, theirs on the start side), the typing dots and the composer.
   Usage:
     <Chat.Header title="Maya Chen" meta="Online" avatar={<Avatar name="Maya Chen" />} actions={<…/>} />
     <Chat.Thread label="Conversation with Maya Chen">
       <Chat.Divider>Today</Chat.Divider>
       <Chat.Group author="Maya Chen" avatar={<Avatar name="Maya Chen" size="sm" />}>
         <Chat.Message time="Oct 29, 10:24 AM">Are the renders ready?</Chat.Message>
         <Chat.Message time="Oct 29, 10:25 AM">The PDF is fine.</Chat.Message>
       </Chat.Group>
       <Chat.Message mine time="Oct 29, 10:26 AM" status="read" readTime="Oct 29, 10:27 AM">Uploading them now.</Chat.Message>
       <Chat.Divider unread />
       <Chat.Typing label="Maya is typing" />
     </Chat.Thread>
     <Chat.Composer value={text} onChange={setText} onSend={send} />
   Props:
     Chat.Header.title: who or what the conversation is with
     Chat.Header.meta: a short line under the title (presence, members)
     Chat.Header.avatar: an Avatar before the title
     Chat.Header.actions: buttons at the end
     Chat.Thread.label: the accessible name of the thread (default "Conversation")
     Chat.Thread.follow: opens at the newest message and keeps it in view as messages arrive, unless the person scrolled up
       to read (default true)
     Chat.Thread.children: the messages, in order (the oldest first)
     Chat.Message.mine: the message is the person's own (end side, the outgoing fill and outline); default false
     Chat.Group.author / avatar / mine: one sender's run of messages: the photo and the name go on the first message only,
       and the messages sit closer together; mine applies to every message of the run
     Chat.Divider.children: a line across the thread with a date ("Today"); unread: the "New messages" line (its default
       text), above the first unread message
     Chat.Message.author: who wrote it (shown above theirs; announced for mine as "You")
     Chat.Message.time: when it was sent, as shown, in the footer line at the bottom of the bubble ("Sent <time>");
       dateTime: the same as a machine-readable date
     Chat.Message.status: sending | sent | delivered | read (your messages): a clock, one gray check, two gray checks, two
       green checks, after the times; readTime / readDateTime: when it was read, shown as "| Read <time>" once read
     Chat.Message.avatar: the sender's Avatar (size "sm"), on the bubble's top edge, 8px in from the start edge for theirs and
       from the end edge for yours (the owner's mockup, issue 637), half above the bubble; it takes its bubble's fill, text
       color and outline. Leave it out on the following messages of a run from the same sender
     Chat.Message.children: the message text or content
     Chat.Composer.value / onChange(text): the message being written
     Chat.Composer.onSend(text): runs on Send and on Enter (Shift+Enter starts a new line)
     Chat.Composer.placeholder: default "Write a message"; label: the field's accessible name (default "Message")
     Chat.Composer.sendLabel: default "Send"; disabled: the composer is inert
     Chat.Typing.label: the text announced to assistive technology (default "Typing")
     Chat.Typing.variant: typing (default) | thinking | steps; steps: [{label,status}], current: active step index
     Chat.Typing.strings: thinking and ProgressSteps state words; className: more classes
     className on every part: more classes
   Behavior:
     Messages are outlined (the owner's chat colors, issue 637): theirs in the incoming fill and outline, yours in the outgoing
       ones, the text in the message text color; the card's corner (6px) and border (1px). Each color is a role
       (--plx-sys-message-*) with its own dark value; in dark mode both are grays (no blue), yours the lighter one.
     The footer line is the smallest text (10px) in the secondary gray, never on the message line. The status mark is named
       for assistive technology when no visible word says the state (delivered; read without a read time); green is never
       the only sign: "Read" is written.
     The thread is a log (role="log", aria-live="polite"): new messages are announced.
     Send is disabled while the message is empty.
     Chat.Typing is a status region (role="status"), so its label is announced.
     The dots pulse one after another; people who ask their system for less motion see them still.
   Notes:
     Other props pass through to the <span>.
     It was TypingIndicator in the loading family (batch 168); the owner placed it under Chat.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.jsx';
import { Button } from '../Button/Button.jsx';
import { Icon } from '../Icon/Icon.jsx';
import { Spinner } from '../Loading/Loading.jsx';
import { ProgressSteps } from '../ProgressSteps/ProgressSteps.jsx';
import { Text } from '../Text/Text.jsx';
import { Textarea } from '../Input/Input.jsx';
import { useStrings } from '../../providers/LocaleProvider.jsx';
import SparkleIcon from 'plenix-platform/icons/plenix/sparkle';
import ClockIcon from 'plenix-platform/icons/plenix/clock';
import DoneIcon from 'plenix-platform/icons/material/done';
import DoneAllIcon from 'plenix-platform/icons/material/done-all';

function Typing({ label, variant = 'typing', steps = [], current = 0, strings, className, ...rest }) {
  devWarn('Chat.Typing', { variant }, { variant: ['typing','thinking','steps'] });
  const t = useStrings('chat', strings);
  if (variant === 'thinking' || variant === 'steps') return <div className={cx('plx-chat__thinking', className)} role="status" {...rest}>
    <div className="plx-chat__thinking-label"><Spinner size="sm" aria-hidden="true" role="presentation" label="" /><Icon name={SparkleIcon}/><Text>{label || t.thinking}</Text></div>
    {variant === 'steps' && steps.length ? <ProgressSteps label={label || t.thinking} steps={steps} current={current} strings={strings} /> : null}
  </div>;
  if (label === undefined) label = t.typing;
  return (
    <span className={cx('plx-chat__typing', className)} role="status" {...rest}>
      <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  );
}

function Header({ title, meta, avatar, actions, className, ...rest }) {
  return (
    <div className={cx('plx-chat__header', className)} {...rest}>
      {avatar ? <span className="plx-chat__header-avatar">{avatar}</span> : null}
      <div className="plx-chat__header-text"><div className="plx-chat__header-title">{title}</div>{meta ? <div className="plx-chat__header-meta">{meta}</div> : null}</div>
      {actions ? <div className="plx-chat__header-actions">{actions}</div> : null}
    </div>
  );
}

function Thread({ label, follow = true, className, children, ...rest }) {
  const t = useStrings('chat');
  label = label ?? t.conversation;
  // it opens at the newest message and follows new ones, unless the person has scrolled up to read (batch 215)
  const ref = React.useRef(null), atEnd = React.useRef(true);
  const count = React.Children.count(children);
  React.useLayoutEffect(() => { const el = ref.current; if (follow && el && atEnd.current) el.scrollTop = el.scrollHeight; }, [count, follow]);
  const onScroll = (e) => { const el = e.currentTarget; atEnd.current = el.scrollHeight - el.scrollTop - el.clientHeight <= el.clientHeight / 4; if (rest.onScroll) rest.onScroll(e); };
  // it scrolls, so it is in the Tab order: the keyboard can scroll it too
  return <div ref={ref} className={cx('plx-chat__thread', className)} role="log" aria-live="polite" aria-label={label} tabIndex={0} {...rest} onScroll={onScroll}>{children}</div>;
}

// the status mark: sending a clock, sent one check, delivered two, read two in green (the owner, issue 637); it is named
// for assistive technology only when no visible word already says the state
const STATUS_ICON = { sending: ClockIcon, sent: DoneIcon, delivered: DoneAllIcon, read: DoneAllIcon };

function Footer({ status, time, dateTime, readTime, readDateTime, t }) {
  const sending = status === 'sending', read = status === 'read' && readTime;
  const said = sending || (status === 'sent' && time) || read;
  return (
    <div className="plx-chat__footer">
      {sending ? <span>{t.sending}</span> : time ? <span>{t.sent} <time className="plx-chat__time" dateTime={dateTime}>{time}</time></span> : null}
      {read ? <><span aria-hidden="true">|</span><span>{t.read} <time className="plx-chat__time" dateTime={readDateTime}>{readTime}</time></span></> : null}
      {STATUS_ICON[status] ? <span className={cx('plx-chat__status', status === 'read' && 'plx-chat__status--read')}><Icon name={STATUS_ICON[status]} size="xs" label={said ? undefined : t[status]} /></span> : null}
    </div>
  );
}

function Message({ mine = false, author, time, dateTime, status, readTime, readDateTime, avatar, className, children, ...rest }) {
  devWarn('Chat.Message', { status }, { status: [undefined, 'sending', 'sent', 'delivered', 'read'] });
  const t = useStrings('chat');
  return (
    <div className={cx('plx-chat__message', mine && 'plx-chat__message--mine', avatar && 'plx-chat__message--avatar', className)} {...rest}>
      {avatar ? <span className={cx('plx-chat__avatar', mine && 'plx-chat__avatar--mine')}>{avatar}</span> : null}
      <div className={cx('plx-chat__bubble', mine && 'plx-chat__bubble--mine', avatar && 'plx-chat__bubble--avatar')}>
        {mine ? <VisuallyHidden>{t.you}</VisuallyHidden> : author ? <div className="plx-chat__meta"><span className="plx-chat__author">{author}</span></div> : null}
        <div className="plx-chat__body">{children}</div>
        {time || status ? <Footer status={status} time={time} dateTime={dateTime} readTime={readTime} readDateTime={readDateTime} t={t} /> : null}
      </div>
    </div>
  );
}

// a run of messages from one sender: the photo and the name on the first message only, the run closer together
function Group({ mine = false, author, avatar, className, children, ...rest }) {
  let first = true;
  const items = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const more = first ? { mine, author, avatar } : { mine, author: undefined, avatar: undefined };
    first = false;
    return React.cloneElement(child, more);
  });
  return <div className={cx('plx-chat__group', className)} {...rest}>{items}</div>;
}

// a line across the thread: a date, or "New messages" (unread) above the first unread message
function Divider({ unread = false, className, children, ...rest }) {
  const t = useStrings('chat');
  return (
    <div className={cx('plx-chat__divider', unread && 'plx-chat__divider--unread', className)} {...rest}>
      <span className="plx-chat__divider-line" aria-hidden="true" />
      <span>{children ?? (unread ? t.newMessages : null)}</span>
      <span className="plx-chat__divider-line" aria-hidden="true" />
    </div>
  );
}

function Composer({ value = '', onChange, onSend, placeholder, label, sendLabel, disabled = false, className, ...rest }) {
  const t = useStrings('chat');
  placeholder = placeholder ?? t.placeholder; label = label ?? t.message; sendLabel = sendLabel ?? t.send;
  const empty = !String(value).trim();
  const send = () => { if (!empty && onSend) onSend(value); };
  return (
    <form className={cx('plx-chat__composer', className)} onSubmit={(e) => { e.preventDefault(); send(); }} {...rest}>
      <Textarea className="plx-chat__field" rows={1} value={value} placeholder={placeholder} aria-label={label} disabled={disabled}
        onChange={(e) => { if (onChange) onChange(e.target.value); }}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} />
      <Button type="submit" variant="primary" disabled={disabled || empty}>{sendLabel}</Button>
    </form>
  );
}

export const Chat = { Header, Thread, Group, Divider, Message, Composer, Typing };
