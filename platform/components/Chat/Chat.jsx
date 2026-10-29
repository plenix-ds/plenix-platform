/* Plenix · Chat
   Summary: The live messaging surface of a conversation (12 › Collaboration and communication › Chat): its header, the
     thread of messages (mine on the end side, theirs on the start side), the typing dots and the composer.
   Usage:
     <Chat.Header title="Maya Chen" meta="Online" avatar={<Avatar name="Maya Chen" />} actions={<…/>} />
     <Chat.Thread label="Conversation with Maya Chen">
       <Chat.Message author="Maya Chen" time="10:24" avatar={<Avatar name="Maya Chen" size="xs" />}>Are the renders ready?</Chat.Message>
       <Chat.Message mine time="10:26">Uploading them now.</Chat.Message>
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
     Chat.Message.mine: the message is the person's own (end side, in the action color); default false
     Chat.Message.author: who wrote it (shown above theirs; announced for mine as "You")
     Chat.Message.time: when, as shown; dateTime: the same as a machine-readable date
     Chat.Message.avatar: an Avatar beside their messages
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

function Typing({ label, variant = 'typing', steps = [], current = 0, strings, className, ...rest }) {
  devWarn('Chat.Typing', { variant }, { variant: ['typing','thinking','steps'] });
  const t = useStrings('chat', strings);
  if (variant === 'thinking' || variant === 'steps') return <div className={cx('plx-chat__thinking', className)} role="status" {...rest}>
    <div className="plx-chat__thinking-label"><Spinner size="sm" aria-hidden="true" role="presentation" label="" /><Icon name="sparkle"/><Text>{label || t.thinking}</Text></div>
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

function Message({ mine = false, author, time, dateTime, avatar, className, children, ...rest }) {
  return (
    <div className={cx('plx-chat__message', mine && 'plx-chat__message--mine', className)} {...rest}>
      {!mine && avatar ? <span className="plx-chat__avatar">{avatar}</span> : null}
      <div className="plx-chat__bubble">
        {(author && !mine) || time ? (
          <div className="plx-chat__meta">
            {mine ? <VisuallyHidden>You</VisuallyHidden> : (author ? <span className="plx-chat__author">{author}</span> : null)}
            {time ? <time className="plx-chat__time" dateTime={dateTime}>{time}</time> : null}
          </div>
        ) : null}
        <div className="plx-chat__body">{children}</div>
      </div>
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

export const Chat = { Header, Thread, Message, Composer, Typing };
