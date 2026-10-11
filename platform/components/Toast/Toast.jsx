/* Plenix · ToastProvider, useToast
   Summary: A short message about something that just happened, at the end of the screen.
   Usage:
     <ToastProvider>…the application…</ToastProvider>
     const toast = useToast();
     toast.show('Saved', { tone: 'success' });
   Props:
     ToastProvider.duration: the default milliseconds before a toast leaves by itself; default the --plx-comp-toast-duration token
     ToastProvider.children: the application
     toast.show(message, options): shows a toast and returns its id
     options.tone: "info" (default) | "success" | "warning" | "danger"
     options.duration: milliseconds before it leaves by itself; 0 keeps it until dismissed
     toast.dismiss(id): removes the toast with that id
   Behavior:
     A danger toast stays until dismissed (unless a duration is given) and is announced at once (role="alert").
     The other toasts are announced politely.
     Every toast has a Dismiss button.
   Notes:
     Wrap the application once in ToastProvider; useToast needs it.
     Not for anything the person must act on: use a dialog or an inline message.
*/
import React from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.jsx';
import { tokenMs } from '../../utils/tokenTime.js';

const ToastContext = React.createContext(null);
const TONE_ICON = { info: 'circle-info', success: 'circle-check', warning: 'warning', danger: 'alert' };
let nextId = 1;

export function ToastProvider({ duration, children }) {
  const [toasts, setToasts] = React.useState([]);
  const remove = React.useCallback((id) => setToasts((all) => all.filter((t) => t.id !== id)), []);
  const dismiss = React.useCallback((id) => {
    setToasts((all) => all.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => remove(id), tokenMs('--plx-comp-toast-animation-duration'));
  }, [remove]);
  const show = React.useCallback((message, { tone = 'info', duration: ms } = {}) => {
    const id = nextId++;
    const wait = ms !== undefined ? ms : (tone === 'danger' ? 0 : duration !== undefined ? duration : tokenMs('--plx-comp-toast-duration'));
    setToasts((all) => all.concat({ id, message, tone, leaving: false }));
    if (wait > 0) setTimeout(() => dismiss(id), wait);
    return id;
  }, [dismiss, duration]);
  const api = React.useMemo(() => ({ show, dismiss }), [show, dismiss]);
  return (
    <ToastContext.Provider value={api}>
      {children}
      {createPortal(
        <div className="plx-toast-region" aria-live="polite">
          {toasts.map((t) => (
            <div key={t.id} role={t.tone === 'danger' ? 'alert' : undefined}
              className={cx('plx-toast', 'plx-toast--' + t.tone, t.leaving && 'is-leaving')}
              onAnimationEnd={t.leaving ? () => remove(t.id) : undefined}>
              <span className="plx-toast__icon"><Icon name={TONE_ICON[t.tone] || TONE_ICON.info} /></span>
              <span className="plx-toast__message">{t.message}</span>
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
