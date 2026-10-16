/* Plenix · MediaPlayer
   Summary: Native audio/video playback with captions, a seekable transcript, playback rate and optional picture in picture.
   Usage: <MediaPlayer src={url} label="Project walkthrough" tracks={captions} transcript={segments} />
   Props:
     src: media URL; kind: video (default) | audio; label: accessible media name; poster; crossOrigin.
     tracks: [{ src, label, language, kind: captions | subtitles, default }], WebVTT sources.
     transcript: [{ start: seconds, text }]; showTranscript: initial transcript visibility (default false).
     rates: positive playback speeds (default [0.5, 1, 1.5, 2]); pictureInPicture: offer the browser feature (default true).
     onTimeChange(seconds), onError(event): media events; strings: rate, transcript, hideTranscript, pip, exitPip,
       unsupported, failed, pipFailed, seek, fallback; className; ref: the HTMLMediaElement.
   Behavior:
     Browser controls provide play, pause, seek, volume and caption selection. Nothing autoplays.
     Transcript buttons seek only after media metadata is available. Failed PiP requests stay recoverable.
   Notes:
     Applications supply authorized sources, captions and transcripts. Browser controls follow the user's OS.
*/
import React from 'react';
import { Stack, Inline } from '../Stack/Stack.jsx';
import { Field } from '../Field/Field.jsx';
import { Select } from '../Input/Input.jsx';
import { Button } from '../Button/Button.jsx';
import { Text } from '../Text/Text.jsx';
import { Notice } from '../Notice/Notice.jsx';
import { Link } from '../Link/Link.jsx';
import { useUid } from '../../utils/layer.js';
import { cx } from '../../utils/cx.js';

const clock = (seconds) => { const n = Math.max(0, Math.floor(Number(seconds) || 0)); return Math.floor(n / 60) + ':' + String(n % 60).padStart(2, '0'); };
export const MediaPlayer = React.forwardRef(function MediaPlayer({ src, kind = 'video', label, poster, crossOrigin, tracks = [], transcript = [], showTranscript = false,
  rates = [0.5, 1, 1.5, 2], pictureInPicture = true, onTimeChange, onError, strings, className }, ref) {
  const t = Object.assign({ rate: 'Playback speed', transcript: 'Show transcript', hideTranscript: 'Hide transcript', pip: 'Picture in picture', exitPip: 'Exit picture in picture', unsupported: 'Picture in picture is unavailable.', failed: 'This media could not be played.', pipFailed: 'Could not change picture in picture. Try again.', seek: 'Seek to {time}', fallback: 'Open media file' }, strings);
  const media = React.useRef(null), id = useUid('plx-media-player'), epoch = React.useRef(0), lock = React.useRef(false);
  React.useImperativeHandle(ref, () => media.current, [kind, src]);
  const [rate, setRate] = React.useState(1), [visible, setVisible] = React.useState(showTranscript), [ready, setReady] = React.useState(false), [pip, setPip] = React.useState(false), [busy, setBusy] = React.useState(false), [error, setError] = React.useState('');
  React.useEffect(() => { epoch.current++; lock.current = false; setReady(false); setRate(1); setError(''); setPip(false); setBusy(false); return () => { epoch.current++; }; }, [src, kind]);
  const speeds = Array.from(new Set([1].concat(rates.filter((n) => Number.isFinite(n) && n > 0)))).sort((a, b) => a - b);
  const capable = kind !== 'audio' && typeof document !== 'undefined' && !!document.pictureInPictureEnabled;
  const togglePip = async () => {
    if (lock.current || !media.current) return; const at = epoch.current; lock.current = true; setBusy(true); setError('');
    try { if (document.pictureInPictureElement === media.current) await document.exitPictureInPicture(); else await media.current.requestPictureInPicture(); }
    catch (e) { if (at === epoch.current) setError(t.pipFailed); }
    finally { if (at === epoch.current) { lock.current = false; setBusy(false); } }
  };
  const Tag = kind === 'audio' ? 'audio' : 'video';
  return <Stack className={cx('plx-media-player', className)}>
    <Tag key={kind + ':' + src} ref={media} className="plx-media-player__media" src={src} poster={kind === 'audio' ? undefined : poster} controls playsInline preload="metadata" crossOrigin={crossOrigin} aria-label={label}
      onLoadedMetadata={() => { setReady(true); setError(''); }} onTimeUpdate={(e) => { if (onTimeChange) onTimeChange(e.currentTarget.currentTime); }}
      onEnterPictureInPicture={() => setPip(true)} onLeavePictureInPicture={() => setPip(false)}
      onError={(e) => { setReady(false); setError(t.failed); if (onError) onError(e); }}>
      {tracks.map((a, i) => <track key={a.src + i} src={a.src} kind={a.kind || 'captions'} srcLang={a.language} label={a.label} default={!!a.default} />)}
      {src ? <Link href={src}>{t.fallback}</Link> : null}
    </Tag>
    <Inline wrap>
      <Field label={t.rate}><Select value={String(rate)} options={speeds.map((n) => ({ value: String(n), label: n + '×' }))} onChange={(e) => { const next = Number(e.target.value); if (media.current) { media.current.playbackRate = next; setRate(next); } }} /></Field>
      {transcript.length ? <Button aria-expanded={visible} aria-controls={id} onClick={() => setVisible(!visible)}>{visible ? t.hideTranscript : t.transcript}</Button> : null}
      {pictureInPicture && capable ? <Button disabled={!ready || busy} onClick={togglePip}>{pip ? t.exitPip : t.pip}</Button> : null}
    </Inline>
    {visible && transcript.length ? <Stack id={id} as="ol" className="plx-media-player__transcript">{transcript.map((segment, i) => <Inline as="li" key={i} align="start">
      <Button disabled={!ready || !Number.isFinite(segment.start) || segment.start < 0} label={t.seek.replace('{time}', clock(segment.start))} onClick={() => { media.current.currentTime = segment.start; }}><Text variant="data">{clock(segment.start)}</Text></Button><Text>{segment.text}</Text>
    </Inline>)}</Stack> : null}
    {error ? <Notice tone="danger">{error}</Notice> : null}
  </Stack>;
});