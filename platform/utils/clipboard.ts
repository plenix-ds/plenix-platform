/* Plenix · Clipboard (platform/utils/clipboard.ts)
   Summary: Copies a value (an ID, a path, a link, a code sample, a picture) to the clipboard and confirms it: the copy
     functions write it, useClipboard keeps the "Copied" state for a moment and announces the result to screen readers.
   Usage:
     const clip = useClipboard();
     <Button icon={clip.copied ? 'check' : 'copy'} onClick={() => clip.copy(path)}>{clip.copied ? 'Copied' : 'Copy file path'}</Button>
     {clip.error && <Notice tone="danger">{clip.error}</Notice>}
     await copyText('ASSET-0142');
     await copyRich({ html: '<b>Cross 014</b>', text: 'Cross 014' });
     await copyImage(pngBlob);
   Props:
     copyText(text): writes plain text; resolves true when copied, false when the browser refused
     copyRich({ html, text }): writes HTML for editors that paste formatting, with the plain text for the others
     copyImage(blob): writes a picture (a PNG Blob, or a Promise of one); false where the browser cannot
     useClipboard({ timeout, strings }): returns { copy(value), copied, error, reset() }; value is text, { html, text } or a
       Blob. copied stays true for timeout milliseconds (default the --plx-sys-clipboard-feedback-duration token)
     strings: { copied: 'Copied', failed: 'Couldn’t copy. Select the text and copy it by hand.' }: what is announced and
       returned as error
   Behavior:
     Uses the asynchronous Clipboard API; for text, where it is missing or refused (an insecure page, an old browser), it
     falls back to a hidden text area and the copy command.
     Copies only from a person's action (a press or a key): browsers refuse it otherwise.
     Success and failure are announced through the polite live region (announce); the failure message says what to do.
   Notes:
     Never reads the clipboard. Name the button for what it copies ("Copy file path"), not just "Copy".
*/
import React from 'react';
import { announce } from './announce.tsx';
import { tokenMs } from './tokenTime.ts';

export type ClipboardStrings = { copied: string; failed: string };
export type RichText = { html?: string; text?: string };
const STRINGS: ClipboardStrings = { copied: 'Copied', failed: 'Couldn’t copy. Select the text and copy it by hand.' };

// the copy command on a hidden text area: for pages without the Clipboard API
function legacyCopy(text: string): boolean {
  if (typeof document === 'undefined' || !document.body) return false;
  const area = document.createElement('textarea');
  area.className = 'plx-visually-hidden';
  area.setAttribute('readonly', '');
  area.setAttribute('aria-hidden', 'true');
  area.value = text;
  const active = document.activeElement as HTMLElement | null;
  document.body.appendChild(area);
  area.select();
  let done = false;
  try { done = document.execCommand('copy'); } catch (e) { done = false; }
  area.remove();
  if (active && active.focus) active.focus();
  return done;
}

export async function copyText(text: unknown): Promise<boolean> {
  const value = String(text === undefined || text === null ? '' : text);
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch (e) { /* refused: try the copy command */ }
  return legacyCopy(value);
}

export async function copyRich({ html = '', text = '' }: RichText = {}): Promise<boolean> {
  try {
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard && navigator.clipboard.write) {
      await navigator.clipboard.write([new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' }),
      })]);
      return true;
    }
  } catch (e) { /* refused: plain text only */ }
  return copyText(text);
}

export async function copyImage(blob: Blob | Promise<Blob>): Promise<boolean> {
  try {
    if (typeof ClipboardItem === 'undefined' || !navigator.clipboard || !navigator.clipboard.write) return false;
    const b = await blob;
    await navigator.clipboard.write([new ClipboardItem({ [b.type || 'image/png']: b })]);
    return true;
  } catch (e) { return false; }
}

export type Clipboard = { copy: (value: unknown) => Promise<boolean>; copied: boolean; error: string | null; reset: () => void };
export function useClipboard({ timeout, strings }: { timeout?: number; strings?: Partial<ClipboardStrings> | null } = {}): Clipboard {
  const s = { ...STRINGS, ...(strings || {}) };
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const timer = React.useRef<number | null>(null);
  React.useEffect(() => () => clearTimeout(timer.current!), []);
  const reset = React.useCallback(() => { clearTimeout(timer.current!); setCopied(false); setError(null); }, []);
  const copy = React.useCallback(async (value: unknown) => {
    clearTimeout(timer.current!);
    const done = typeof Blob !== 'undefined' && value instanceof Blob ? await copyImage(value)
      : value && typeof value === 'object' && ('html' in value || 'text' in value) ? await copyRich(value as RichText)
      : await copyText(value);
    setCopied(done);
    setError(done ? null : s.failed);
    announce(done ? s.copied : s.failed, { politeness: done ? 'polite' : 'assertive' });
    if (done) timer.current = setTimeout(() => setCopied(false), timeout !== undefined ? timeout : tokenMs('--plx-sys-clipboard-feedback-duration'));
    return done;
  }, [timeout, s.copied, s.failed]);
  return { copy, copied, error, reset };
}
