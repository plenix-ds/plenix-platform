/* Plenix · Dialog, ConfirmDialog, Drawer
   Summary: Modal layers. Dialog is a centered window; ConfirmDialog is an alert dialog that asks to confirm an action;
     Drawer is the same shell, docked to a side.
   Usage:
     <Dialog open={open} onClose={close} title="Rename" description="…" size="sm" footer={<>…</>}>…</Dialog>
     <ConfirmDialog open={open} title="Delete 3 assets?" message="…" confirmLabel="Delete" destructive
       onConfirm={() => …} onCancel={() => …} />
     <Drawer open={open} onClose={close} title="Details" side="end" size="md" footer={<>…</>}>…</Drawer>
   Props:
     Dialog.open: whether the layer is shown
     Dialog.onClose(): runs from the close button, Escape and a click on the veil
     Dialog.title: the title at the start of the header; it names the dialog
     Dialog.description: a paragraph at the top of the body; it describes the dialog
     Dialog.icon: an <Icon> (or an icon name) before the title
     Dialog.size: "sm" | "md" (default) | "lg" | "xl" | "full"
     Dialog.footer: the footer actions (their height is the dialog role)
     Dialog.initialFocus: a ref to the element that takes focus when the layer opens
     Dialog.closeLabel: the accessible name of the close button (default "Close")
     Dialog.dismissible: false turns off Escape and the veil click, and hides the close button (default true)
     Dialog.flush: true removes the body padding (default false)
     Dialog.className: more classes on the dialog
     Dialog.children: the body
     Drawer.side: "end" (default) | "start"
     Drawer.size: "sm" | "md" (default) | "lg"
     ConfirmDialog.open: whether the dialog is shown
     ConfirmDialog.title: the question
     ConfirmDialog.message: the explanation under the title
     ConfirmDialog.confirmLabel: the confirm button text (default "Confirm")
     ConfirmDialog.cancelLabel: the cancel button text (default "Cancel")
     ConfirmDialog.destructive: the action destroys something (default false)
     ConfirmDialog.onConfirm(): runs from the confirm button
     ConfirmDialog.onCancel(): runs from the cancel button, the close button, Escape and the veil
     ConfirmDialog.children: more content in the body
   Behavior:
     Focus moves in (initialFocus, else the first control in the body, else the first footer action) and returns to the opener.
     Tab stays inside the layer.
     Escape and a click on the veil close it, unless dismissible is false.
     The page does not scroll while the layer is open.
     A destructive ConfirmDialog starts on Cancel, uses a danger confirm button and the destructive dialog role.
   Notes:
     Drawer takes every Dialog prop (open, onClose, title, description, icon, footer, initialFocus, closeLabel, dismissible,
       flush, className, children), with its own side and size.
     Modal layers follow D3, option C.
     Header and footer are filled bands (--plx-sys-surface-dialog-chrome) with hairline dividers, always shown; the body is white.
     The title is at the start of the header, the close button at its end, the actions in the footer.
     The layer renders in a portal on document.body.
*/
import React from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx.js';
import { focusables, useLayer, useUid } from '../../utils/layer.js';
import { Icon } from '../Icon/Icon.jsx';
import { Button } from '../Button/Button.jsx';

const asIcon = (i) => (typeof i === 'string' ? <Icon name={i} /> : i);

function ModalShell({ kind, open, onClose, title, description, icon, size, side, role = 'dialog', footer, initialFocus,
  closeLabel = 'Close', dismissible = true, flush = false, className, children }) {
  const ref = React.useRef(null);
  const id = useUid('plx-dlg');
  const firstFocus = () => {
    if (initialFocus && initialFocus.current) return initialFocus.current;
    const root = ref.current;
    return focusables(root.querySelector('.plx-dialog__body'))[0] || focusables(root.querySelector('.plx-dialog__footer'))[0] || null;
  };
  useLayer(ref, open, { modal: true, onEscape: dismissible ? onClose : null, initialFocus: firstFocus });
  if (!open) return null;
  const onVeil = (e) => { if (dismissible && e.target === e.currentTarget && onClose) onClose(); };
  return createPortal(
    <div className={cx('plx-modal-layer', 'plx-modal-layer--' + kind, side && 'plx-modal-layer--' + side)} onMouseDown={onVeil}>
      <div ref={ref} role={role} aria-modal="true" aria-labelledby={id + 't'} aria-describedby={description ? id + 'd' : undefined}
        tabIndex={-1} className={cx('plx-dialog', kind === 'drawer' && 'plx-drawer', 'plx-' + kind + '--' + size, className)}>
        <div className="plx-dialog__header">
          {icon ? <span className="plx-dialog__icon">{asIcon(icon)}</span> : null}
          <h2 id={id + 't'} className="plx-dialog__title">{title}</h2>
          {dismissible ? <Button variant="ghost" iconOnly icon="close" label={closeLabel} className="plx-dialog__close" onClick={onClose} /> : null}
        </div>
        <div className={cx('plx-dialog__body', flush && 'plx-dialog__body--flush')}>
          {description ? <p id={id + 'd'} className="plx-dialog__description">{description}</p> : null}
          {children}
        </div>
        {footer ? <div className="plx-dialog__footer">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}

export function Dialog({ size = 'md', ...props }) {
  return <ModalShell kind="dialog" size={size} {...props} />;
}

export function Drawer({ size = 'md', side = 'end', ...props }) {
  return <ModalShell kind="drawer" size={size} side={side} {...props} />;
}

export function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', destructive = false, onConfirm, onCancel, children }) {
  const cancel = React.useRef(null);
  return (
    <ModalShell kind="dialog" size="sm" role="alertdialog" open={open} onClose={onCancel} title={title} description={message}
      initialFocus={destructive ? cancel : undefined} className={destructive ? 'plx-dialog--destructive' : undefined}
      footer={<><Button ref={cancel} onClick={onCancel}>{cancelLabel}</Button><Button variant={destructive ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button></>}>
      {children}
    </ModalShell>
  );
}
