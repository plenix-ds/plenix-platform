/* Plenix · UndoMessage
   Summary: Owns DeleteFlow's undo clock, keeping it paused while either pointer or focus is in its toast.
   Usage: DeleteFlow passes this as the toast message; ToastProvider's own timeout stays disabled.
   Props: duration (milliseconds, zero is persistent), entry (the exactly-once pending deletion), children (message).
   Behavior: Leaving both hover and focus restarts the full undo window. Removing the toast commits unless already undone.
   Notes: Lifecycle listeners and timers are removed with the message. No changes to the shared ToastProvider are needed.
*/
import React from 'react';

export function UndoMessage({ duration, entry, children }) {
  const ref = React.useRef(null), lifecycle = React.useRef(0);
  React.useEffect(() => {
    const generation = ++lifecycle.current;
    const node = ref.current, toast = node.closest('.plx-toast');
    let timer, hover = toast.matches(':hover'), focused = toast.contains(node.ownerDocument.activeElement);
    const restart = () => { clearTimeout(timer); if (duration && !hover && !focused) timer = setTimeout(entry.commit, duration); };
    const enter = () => { hover = true; restart(); };
    const leave = () => { hover = false; restart(); };
    const focus = () => { focused = true; restart(); };
    const blur = event => { focused = toast.contains(event.relatedTarget); restart(); };
    toast.addEventListener('pointerenter', enter);
    toast.addEventListener('pointerleave', leave);
    toast.addEventListener('focusin', focus);
    toast.addEventListener('focusout', blur);
    restart();
    return () => {
      clearTimeout(timer);
      toast.removeEventListener('pointerenter', enter);
      toast.removeEventListener('pointerleave', leave);
      toast.removeEventListener('focusin', focus);
      toast.removeEventListener('focusout', blur);
      queueMicrotask(() => { if (lifecycle.current === generation) entry.commit(); });
    };
  }, [duration, entry]);
  return <span ref={ref}>{children}</span>;
}
