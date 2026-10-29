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
     Chat.Composer.onSend(text, files): runs on Send and, by default, on Enter (Shift+Enter starts a new line); files are the attachments that are ready
     Chat.Composer.sendOn: "enter" (default: Enter sends) | "mod-enter" (Ctrl or Command with Enter sends; Enter starts a new line)
     Chat.Composer.attachments: the files waiting to be sent: [{ id, name, size, previewUrl, status: "uploading" | "ready" | "error", progress (0-100), error }]; the app uploads and updates them
     Chat.Composer.onAttach(files): runs with the File objects picked with Attach or Image, pasted into the text or dropped on the box; without it there are no Attach and Image buttons and no drop
     Chat.Composer.onRemoveAttachment(file), onRetryAttachment(file), onCancelAttachment(file): the buttons of a file's card (Cancel while it uploads)
     Chat.Composer.accept: the file types Attach offers (default any); imageAccept: the types Image offers (default image/*)
     Chat.Composer.emoji: true (default: an Emoji button opens a panel; today a placeholder that says the picker is coming) | false (no button) | a function (insert) => node that draws the app's own picker and calls insert(text)
     Chat.Composer.voice: true (default: a microphone dictates into the box, only where the browser has speech recognition) | false (never)
     Chat.Composer.lang: the dictation language (default the page's: ar-EG for Arabic, en-US for English)
     Chat.Composer.strings: the words, for other languages
     Chat.Composer.placeholder: default "Write a message"; label: the field's accessible name (default "Message")
     Chat.Composer.sendLabel: default "Send"; disabled: the composer is inert
     Chat.Typing.label: the text announced to assistive technology (default "Typing")
     Chat.Typing.variant: typing (default) | thinking | steps; steps: [{label,status}], current: active step index
     Chat.Typing.strings: thinking and ProgressSteps state words; className: more classes
     className on every part: more classes
   Behavior:
     The thread is a log (role="log", aria-live="polite"): new messages are announced.
     Send is disabled while there is nothing to send (no text and no ready file) and while a file uploads.
     The composer is one outlined box (the input's 1px border and radius; the focus turns the border): the files waiting (the card standard), the text
       area without a border of its own (Input's context hooks), and a row of tools: Attach, Image and Emoji at the start; Listening, the microphone and Send
       (an arrow with its word) at the end. The text area starts at two lines and grows to its maximum height, then scrolls; at a phone width it starts at one.
     Dictation: the microphone starts the browser's speech recognition; the words appear in the box as they are spoken (the unfinished ones too), "Listening…"
       and a Stop button show with a red dot and a ring round the microphone; Stop, the microphone again, Send, typing in the box or the browser ending it
       stops it, and typing keeps the text exactly as typed. The microphone is looked for when the composer is drawn, so a browser that gains speech
       recognition shows it with no change. A blocked microphone says so. "Listening…" and a microphone problem are announced once each (announce()).
     Chat.Typing is a status region (role="status"), so its label is announced.
     The dots pulse one after another; people who ask their system for less motion see them still.
   Notes:
     Where speech goes: dictation uses the browser's own speech recognition, so the audio is handled by the browser's maker (Chrome sends it to Google's
       servers); Plenix has no speech service and keeps nothing.
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
import { Badge } from '../Badge/Badge.jsx';
import { Popover } from '../Popover/Popover.jsx';
import { ProgressBar } from '../ProgressBar/ProgressBar.jsx';
import { announce } from '../../utils/announce.jsx';
import { formatBytes } from '../../utils/format.js';
import SparkleIcon from 'plenix-platform/icons/plenix/sparkle';
import AttachmentIcon from 'plenix-platform/icons/plenix/attachment';
import ImageIcon from 'plenix-platform/icons/plenix/ed-image';
import MicIcon from 'plenix-platform/icons/plenix/mic';
import StopIcon from 'plenix-platform/icons/plenix/stop';
import CloseIcon from 'plenix-platform/icons/plenix/close';
import RefreshIcon from 'plenix-platform/icons/plenix/refresh';
import WarningIcon from 'plenix-platform/icons/plenix/warning';
import CheckIcon from 'plenix-platform/icons/plenix/check';
import DocumentIcon from 'plenix-platform/icons/plenix/document';
import FilePdfIcon from 'plenix-platform/icons/plenix/file-pdf';
import FileJpgIcon from 'plenix-platform/icons/plenix/file-jpg';
import FilePngIcon from 'plenix-platform/icons/plenix/file-png';
import FileSvgIcon from 'plenix-platform/icons/plenix/file-svg';
import FilePsdIcon from 'plenix-platform/icons/plenix/file-psd';
import FileAiIcon from 'plenix-platform/icons/plenix/file-ai';
import MoodIcon from 'plenix-platform/icons/material/mood';
import SendIcon from 'plenix-platform/icons/material/send';

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

function Message({ mine = false, author, time, dateTime, avatar, className, children, ...rest }) {
  const t = useStrings('chat');
  return (
    <div className={cx('plx-chat__message', mine && 'plx-chat__message--mine', className)} {...rest}>
      {!mine && avatar ? <span className="plx-chat__avatar">{avatar}</span> : null}
      <div className="plx-chat__bubble">
        {(author && !mine) || time ? (
          <div className="plx-chat__meta">
            {mine ? <VisuallyHidden>{t.you}</VisuallyHidden> : (author ? <span className="plx-chat__author">{author}</span> : null)}
            {time ? <time className="plx-chat__time" dateTime={dateTime}>{time}</time> : null}
          </div>
        ) : null}
        <div className="plx-chat__body">{children}</div>
      </div>
    </div>
  );
}

// the speech recognition the browser offers (Chrome and Safari today), looked for each time a composer mounts, so a browser that adds it later shows the microphone with no change here
const speechConstructor = () => (typeof window === 'undefined' ? null : window.SpeechRecognition || window.webkitSpeechRecognition || null);
// the page's language for dictation: Arabic is ar-EG, English en-US, any other the page's own tag
function speechLanguage(lang) {
  const tag = lang || (typeof document !== 'undefined' && document.documentElement.lang) || (typeof navigator !== 'undefined' && navigator.language) || 'en-US';
  if (/^ar(-|$)/i.test(tag)) return /^ar-/i.test(tag) ? tag : 'ar-EG';
  return /^en$/i.test(tag) ? 'en-US' : tag;
}
const joinSpoken = (base, spoken) => (base && spoken ? base + (/\s$/.test(base) ? '' : ' ') + spoken.trim() : base || spoken.trim());
const FILE_ICONS = { pdf: FilePdfIcon, jpg: FileJpgIcon, jpeg: FileJpgIcon, png: FilePngIcon, svg: FileSvgIcon, psd: FilePsdIcon, ai: FileAiIcon };
const fileIconOf = (name) => FILE_ICONS[String(name || '').split('.').pop().toLowerCase()] || DocumentIcon;
const fill = (text, values) => String(text).replace(/\{(\w+)\}/g, (m, k) => (values[k] === undefined ? m : values[k]));

// one file waiting to be sent: its picture or icon, its name, its state (a progress bar, ready, or an error with Retry) and a button to cancel or remove it
function ComposerFile({ file, t, onRemove, onRetry, onCancel }) {
  const status = file.status || 'ready';
  return (
    <li className="plx-chat__attachment" data-plx-status={status}>
      <span className="plx-chat__attachment-thumb">{file.previewUrl ? <img className="plx-chat__attachment-image" src={file.previewUrl} alt="" /> : <Icon icon={fileIconOf(file.name)} size="lg" />}</span>
      <span className="plx-chat__attachment-body">
        <span className="plx-chat__attachment-name">{file.name}</span>
        <span className="plx-chat__attachment-meta">
          {status === 'uploading' ? <>
            <span className="plx-chat__attachment-progress"><ProgressBar value={file.progress || 0} size="sm" label={file.progress === undefined ? t.uploadingPlain : fill(t.uploading, { percent: file.progress })} labelHidden /></span>
            <span>{file.progress === undefined ? t.uploadingPlain : fill(t.uploading, { percent: file.progress })}</span></> : null}
          {status === 'ready' ? <><Badge tone="success" icon={CheckIcon}>{t.ready}</Badge>{file.size ? <span>{formatBytes(file.size)}</span> : null}</> : null}
          {status === 'error' ? <><Badge tone="negative" icon={WarningIcon}>{file.error || t.failed}</Badge>{onRetry ? <Button variant="secondary" size="xs" icon={RefreshIcon} onClick={() => onRetry(file)}>{t.retry}</Button> : null}</> : null}
        </span>
      </span>
      <Button variant="ghost" size="sm" iconOnly icon={CloseIcon} label={status === 'uploading' ? t.cancelUpload : t.remove} onClick={() => (status === 'uploading' && onCancel ? onCancel(file) : onRemove && onRemove(file))} />
    </li>
  );
}

function Composer({ value = '', onChange, onSend, placeholder, label, sendLabel, disabled = false, attachments = [], onAttach, onRemoveAttachment, onRetryAttachment, onCancelAttachment,
  accept, imageAccept = 'image/*', emoji = true, voice = true, lang, sendOn = 'enter', strings, className, ...rest }) {
  const t = useStrings('chat', strings);
  placeholder = placeholder ?? t.placeholder; label = label ?? t.message; sendLabel = sendLabel ?? t.send;
  const [dragging, setDragging] = React.useState(false), [listening, setListening] = React.useState(false), [speech, setSpeech] = React.useState(false), [problem, setProblem] = React.useState('');
  const fileInput = React.useRef(null), imageInput = React.useRef(null), recognition = React.useRef(null), spoken = React.useRef({ base: '' }), latest = React.useRef(onChange);
  latest.current = onChange;
  React.useEffect(() => { setSpeech(!!speechConstructor()); }, []);
  React.useEffect(() => () => { if (recognition.current) recognition.current.abort(); }, []);
  const uploading = attachments.some((a) => a.status === 'uploading'), sendable = String(value).trim() || attachments.some((a) => (a.status || 'ready') === 'ready');
  const canSend = !disabled && !uploading && !!sendable;
  const stopListening = () => { if (recognition.current) recognition.current.stop(); };
  const send = () => { if (!canSend) return; spoken.current.open = false; stopListening(); if (onSend) onSend(value, attachments.filter((a) => (a.status || 'ready') === 'ready')); };
  const attach = (files) => { const list = Array.prototype.slice.call(files || []); if (list.length && onAttach) onAttach(list); };
  const listen = () => {
    const Recognition = speechConstructor();
    if (!Recognition || recognition.current) return;
    const r = new Recognition();
    r.lang = speechLanguage(lang); r.continuous = true; r.interimResults = true;
    const session = { base: String(value), open: true };
    spoken.current = session;
    r.onresult = (e) => {
      if (!session.open) return;
      let done = '', interim = '';
      for (let i = 0; i < e.results.length; i++) { if (e.results[i].isFinal) done += e.results[i][0].transcript; else interim += e.results[i][0].transcript; }
      if (latest.current) latest.current(joinSpoken(spoken.current.base, done + interim));
    };
    r.onerror = (e) => { const blocked = e.error === 'not-allowed' || e.error === 'service-not-allowed'; setProblem(blocked ? t.micBlocked : t.micStopped); announce(blocked ? t.micBlocked : t.micStopped, { politeness: 'assertive' }); };
    r.onend = () => { session.open = false; if (recognition.current === r) recognition.current = null; setListening(false); };
    recognition.current = r; setProblem('');
    try { r.start(); setListening(true); announce(t.listening); } catch (err) { session.open = false; recognition.current = null; setProblem(t.micStopped); announce(t.micStopped, { politeness: 'assertive' }); }
  };
  // typing while dictating ends the dictation and keeps the text as typed: a later speech result would otherwise write the starting text plus the speech over it
  const typed = (text) => { if (recognition.current) { spoken.current.open = false; stopListening(); } if (onChange) onChange(text); };
  const emojiPanel = typeof emoji === 'function' ? emoji((text) => { if (onChange) onChange(String(value) + text); }) : <Text variant="secondary">{t.emojiSoon}</Text>;
  const hasFiles = !!onAttach, dropping = dragging && hasFiles;
  return (
    <form className={cx('plx-chat__composer', className)} onSubmit={(e) => { e.preventDefault(); send(); }} {...rest}>
      <div className={cx('plx-chat__box', dropping && 'plx-chat__box--drop')}
        onDragOver={hasFiles ? (e) => { if (Array.prototype.indexOf.call(e.dataTransfer.types || [], 'Files') >= 0) { e.preventDefault(); setDragging(true); } } : undefined}
        onDragLeave={hasFiles ? (e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false); } : undefined}
        onDrop={hasFiles ? (e) => { e.preventDefault(); setDragging(false); attach(e.dataTransfer.files); } : undefined}>
        {dropping ? <div className="plx-chat__drop" role="status">{t.dropFiles}</div> : null}
        {attachments.length ? <ul className="plx-chat__strip" aria-label={t.attachments}>{attachments.map((a) => <ComposerFile key={a.id} file={a} t={t} onRemove={onRemoveAttachment} onRetry={onRetryAttachment} onCancel={onCancelAttachment} />)}</ul> : null}
        <Textarea className="plx-chat__field" rows={2} autoGrow value={value} placeholder={placeholder} aria-label={label} disabled={disabled}
          onChange={(e) => typed(e.target.value)}
          onPaste={hasFiles ? (e) => { const files = e.clipboardData && e.clipboardData.files; if (files && files.length) { e.preventDefault(); attach(files); } } : undefined}
          onKeyDown={(e) => {
            if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing) return;
            if (sendOn === 'mod-enter' ? (e.ctrlKey || e.metaKey) : !(e.ctrlKey || e.metaKey || e.altKey)) { e.preventDefault(); send(); }
          }} />
        {problem ? <div className="plx-chat__problem"><Text variant="caption">{problem}</Text></div> : null}
        <div className="plx-chat__tools">
          {hasFiles ? <>
            <Button variant="ghost" size="sm" iconOnly icon={AttachmentIcon} label={t.attach} disabled={disabled} onClick={() => fileInput.current && fileInput.current.click()} />
            <Button variant="ghost" size="sm" iconOnly icon={ImageIcon} label={t.image} disabled={disabled} onClick={() => imageInput.current && imageInput.current.click()} />
            <input ref={fileInput} type="file" multiple hidden accept={accept} onChange={(e) => { attach(e.target.files); e.target.value = ''; }} />
            <input ref={imageInput} type="file" multiple hidden accept={imageAccept} onChange={(e) => { attach(e.target.files); e.target.value = ''; }} /></> : null}
          {emoji ? <Popover title={t.emoji} size="sm" placement="top-start" trigger={<Button variant="ghost" size="sm" iconOnly icon={MoodIcon} label={t.emoji} disabled={disabled} />}><div className="plx-chat__panel">{emojiPanel}</div></Popover> : null}
          <span className="plx-chat__tools-end">
            {listening ? <span className="plx-chat__listening"><span className="plx-chat__dot" aria-hidden="true" />{t.listening}<Button variant="secondary" size="xs" icon={StopIcon} onClick={stopListening}>{t.stop}</Button></span> : null}
            {voice && speech ? <span className={cx('plx-chat__mic', listening && 'plx-chat__mic--listening')}><Button variant="ghost" size="sm" iconOnly icon={MicIcon} label={listening ? t.stop : t.dictate} disabled={disabled} onClick={listening ? stopListening : listen} /></span> : null}
            <Button type="submit" variant="primary" size="sm" icon={SendIcon} disabled={!canSend}>{sendLabel}</Button>
          </span>
        </div>
      </div>
    </form>
  );
}

export const Chat = { Header, Thread, Message, Composer, Typing };
