/* Plenix · ToastProvider, useToast, useUndo
   Summary: A short message about something that just happened, at the end of the screen; with an action (Undo) it is the
     undo pattern.
   Usage:
     <ToastProvider>…the application…</ToastProvider>
     const toast = useToast();
     toast.show('Saved', { tone: 'success' });
     toast.show('Asset moved to Crosses', { action: { label: 'Undo', onAction: () => moveBack() } });
     const undoable = useUndo();
     undoable('3 assets archived', { onUndo: () => restore(ids), onCommit: () => purge(ids) });
   Props:
     ToastProvider.duration: the default milliseconds before a toast leaves by itself; default the --plx-comp-toast-duration token
     ToastProvider.children: the application
     toast.show(message, options): shows a toast and returns its id
     options.tone: "info" (default) | "success" | "warning" | "danger"
     options.duration: milliseconds before it leaves by itself; 0 keeps it until dismissed or its action is used
     options.action: { label, onAction() }: one action button in the toast (Undo, View); using it runs onAction and closes
       the toast
     options.onClose(reason): runs once when the toast leaves: "action" (its action was used), "dismiss" (the Dismiss
       button or toast.dismiss) or "timeout"
     toast.dismiss(id): removes the toast with that id
     useUndo(): returns undoable(message, options): a toast with an Undo action for something already done
       options.onUndo(): puts it back (the Undo action was used)
       options.onCommit(): runs when the toast leaves without Undo (timed out or dismissed): the moment to make it final
       options.label: the action's label (default "Undo")
       options.tone, options.duration: as toast.show
   Behavior:
     A danger toast stays until dismissed (unless a duration is given) and is announced at once (role="alert").
     The other toasts are announced politely.
     Every toast has a Dismiss button.
     A toast with an action stays while the pointer is over it or focus is inside it, and starts its time again when they
       leave, so the action is never taken away from someone reaching for it.
   Notes:
     Wrap the application once in ToastProvider; useToast needs it.
     Not for anything the person must act on: use a dialog or an inline message.
*/
import React from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.jsx';
import { Button } from '../Button/Button.jsx';
import { tokenMs } from '../../utils/tokenTime.js';

const ToastContext = React.createContext(null);
const TONE_ICON = { info: 'circle-info', success: 'circle-check', warning: 'warning', danger: 'alert' };
let nextId = 1;

export function ToastProvider({ duration, children }) {
  const [toasts, setToasts] = React.useState([]);
  const timers = React.useRef(new Map());   // id -> { wait, timer, onClose }
  const remove = React.useCallback((id) => setToasts((all) => all.filter((t) => t.id !== id)), []);
  const dismiss = React.useCallback((id, reason = 'dismiss') => {
    const t = timers.current.get(id);
    if (t) { clearTimeout(t.timer); timers.current.delete(id); if (t.onClose) t.onClose(reason); }
    setToasts((all) => all.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
    setTimeout(() => remove(id), tokenMs('--plx-comp-toast-animation-duration'));
  }, [remove]);
  const start = React.useCallback((id) => {
    const t = timers.current.get(id);
    if (!t || !(t.wait > 0)) return;
    clearTimeout(t.timer);
    t.timer = setTimeout(() => dismiss(id, 'timeout'), t.wait);
  }, [dismiss]);
  const hold = React.useCallback((id) => { const t = timers.current.get(id); if (t) clearTimeout(t.timer); }, []);
  const show = React.useCallback((message, { tone = 'info', duration: ms, action, onClose } = {}) => {
    const id = nextId++;
    const wait = ms !== undefined ? ms : (tone === 'danger' ? 0 : duration !== undefined ? duration : tokenMs('--plx-comp-toast-duration'));
    timers.current.set(id, { wait, timer: null, onClose });
    setToasts((all) => all.concat({ id, message, tone, action, leaving: false }));
    start(id);
    return id;
  }, [start, duration]);
  const api = React.useMemo(() => ({ show, dismiss }), [show, dismiss]);
  return (
    <ToastContext.Provider value={api}>
      {children}
      {createPortal(
        <div className="plx-toast-region" aria-live="polite">
          {toasts.map((t) => (
            <div key={t.id} role={t.tone === 'danger' ? 'alert' : undefined}
              className={cx('plx-toast', 'plx-toast--' + t.tone, t.leaving && 'is-leaving')}
              onAnimationEnd={t.leaving ? () => remove(t.id) : undefined}
              onPointerEnter={t.action ? () => hold(t.id) : undefined} onPointerLeave={t.action ? () => start(t.id) : undefined}
              onFocus={t.action ? () => hold(t.id) : undefined}
              onBlur={t.action ? (e) => { if (!e.currentTarget.contains(e.relatedTarget)) start(t.id); } : undefined}>
              <span className="plx-toast__icon"><Icon name={TONE_ICON[t.tone] || TONE_ICON.info} /></span>
              <span className="plx-toast__message">{t.message}</span>
              {t.action ? <Button size="xs" className="plx-toast__action" onClick={() => { if (t.action.onAction) t.action.onAction(); dismiss(t.id, 'action'); }}>{t.action.label}</Button> : null}
              <button type="button" className="plx-toast__close" aria-label="Dismiss" onClick={() => dismiss(t.id)}><Icon name="close" /></button>
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const api = React.useContext(ToastContext);
  if (!api) throw new Error('useToast needs a <ToastProvider> around the application');
  return api;
}

// the undo pattern: the action is already done; the toast offers Undo for as long as it shows, then the change is final
export function useUndo() {
  const toast = useToast();
  return React.useCallback((message, { onUndo, onCommit, label = 'Undo', tone, duration } = {}) => toast.show(message, {
    tone, duration, action: { label, onAction: onUndo },
    onClose: (reason) => { if (reason !== 'action' && onCommit) onCommit(); },
  }), [toast]);
}
