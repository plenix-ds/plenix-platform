/* Plenix · FeatureIntro
   Summary: A feature label with a New Badge, optional TeachingBubble and a what-is-new dialog.
   Usage: <FeatureIntro title="Saved views" target={<Button>Views</Button>} onDismiss={remember}>Save and reuse filters.</FeatureIntro>
   Props:
     title, children: feature explanation; target: optional Platform control; showBadge: default true.
     initiallyOpen: start the teaching bubble open (default false); onDismiss(): remember dismissal.
     strings: { new, whatsNew, gotIt, later, close }; className: extra classes.
   Behavior:
     The bubble is dismissible and does not trap focus. The what-is-new dialog opens only on request.
     Dismissal closes education and calls the caller without changing feature availability.
   Notes:
     Persist seen state in the application; new is informational, never a warning.
*/
import React from 'react';
import { Inline } from '../../components/Stack/Stack.jsx';
import { Badge } from '../../components/Badge/Badge.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { Dialog } from '../../components/Dialog/Dialog.jsx';
import { Text } from '../../components/Text/Text.jsx';
import { TeachingBubble } from '../../components/TeachingBubble/TeachingBubble.jsx';
import { cx } from '../../utils/cx.js';

export function FeatureIntro({ title, children, target, showBadge = true, initiallyOpen = false, onDismiss, strings, className }) {
  const t = Object.assign({ new: 'New', whatsNew: 'What is new', gotIt: 'Got it', later: 'Not now', close: 'Close' }, strings);
  const [bubble, setBubble] = React.useState(initiallyOpen), [dialog, setDialog] = React.useState(false);
  const done = () => { setBubble(false); setDialog(false); if (onDismiss) onDismiss(); };
  return <Inline className={cx('plx-feature-intro', className)} wrap>
    {target ? <TeachingBubble target={target} open={bubble} title={title} onDismiss={done} spotlight={false} strings={t}
      primaryAction={{ label: t.gotIt, onClick: done }} secondaryAction={{ label: t.later, onClick: done }}>{children}</TeachingBubble> : <Text>{title}</Text>}
    {showBadge ? <Badge tone="active" icon="circle-info">{t.new}</Badge> : null}
    <Button onClick={() => { setBubble(false); setDialog(true); }}>{t.whatsNew}</Button>
    <Dialog open={dialog} title={title} onClose={done} closeLabel={t.close} footer={<Button variant="primary" onClick={done}>{t.gotIt}</Button>}>{children}</Dialog>
  </Inline>;
}
