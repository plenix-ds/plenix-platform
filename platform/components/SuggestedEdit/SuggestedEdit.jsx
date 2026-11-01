/* Plenix · SuggestedEdit
   Summary: Review plain text changes and explicitly accept or reject individual edits or all outstanding edits.
   Usage: <SuggestedEdit edits={edits} onDecision={persistDecision} />
   Props: edits: [{id,before,after,status:"pending"|"accepted"|"rejected"}]; variant: diff|accept|reject|all; onDecision({ids,decision}): async; disabled; strings: label,before,after,accept,reject,acceptAll,accepted,rejected,empty,failed; className.
   Behavior: Never applies edits automatically. Success records only the submitted edit version, failures preserve pending text, and a synchronous lock blocks duplicate requests.
   Notes: Existing roles and the existing sparkle icon only. Caller owns AI output, data, authorization and persistence.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.ts';
import { cx } from '../../utils/cx.ts';
import { Stack, Inline } from '../Stack/Stack.jsx';
import { Button } from '../Button/Button.jsx';
import { Text } from '../Text/Text.jsx';
import { Notice } from '../Notice/Notice.jsx';
import { Badge } from '../Badge/Badge.jsx';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.jsx';
import { useStrings } from '../../providers/LocaleProvider.tsx';
import CheckIcon from 'plenix-platform/icons/plenix/check';
import CloseIcon from 'plenix-platform/icons/plenix/close';
import SparkleIcon from 'plenix-platform/icons/plenix/sparkle';
const version = (e) => JSON.stringify([e.id, e.before, e.after]);
export function SuggestedEdit({ edits = [], variant = 'diff', onDecision, disabled = false, strings, className }) {
  devWarn('SuggestedEdit', { variant }, { variant: ['diff', 'accept', 'reject', 'all'] });
  const t = useStrings('suggestedEdit', strings),
    [done, setDone] = React.useState({}),
    [busy, setBusy] = React.useState(false),
    [error, setError] = React.useState('');
  const lock = React.useRef(false),
    alive = React.useRef(true);
  React.useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  const state = (e) => (e.status && e.status !== 'pending' ? e.status : done[version(e)]),
    pending = edits.filter((e) => !state(e));
  async function decide(list, decision) {
    if (disabled || lock.current || !onDecision || !list.length) return;
    const keys = list.map(version);
    lock.current = true;
    setBusy(true);
    setError('');
    try {
      await onDecision({ ids: list.map((e) => e.id), decision });
      if (alive.current)
        setDone((p) => {
          const next = { ...p };
          keys.forEach((k) => {
            next[k] = decision;
          });
          return next;
        });
    } catch (e) {
      if (alive.current) setError(t.failed);
    } finally {
      lock.current = false;
      if (alive.current) setBusy(false);
    }
  }
  return (
    <Stack
      className={cx('plx-suggested-edit', className)}
      role="group"
      aria-label={t.label}
      aria-busy={busy || undefined}
    >
      <Badge icon={SparkleIcon}>{t.label}</Badge>
      {!edits.length ? <Text>{t.empty}</Text> : null}
      {edits.map((e) => {
        const s = state(e);
        return (
          <Stack key={e.id} className="plx-suggested-edit__item">
            <Text as="p">
              <VisuallyHidden>{t.before + ': '}</VisuallyHidden>
              <del className="plx-suggested-edit__before">{e.before}</del>{' '}
              <VisuallyHidden>{t.after + ': '}</VisuallyHidden>
              <ins className="plx-suggested-edit__after">{e.after}</ins>
            </Text>
            {s ? (
              <Badge icon={s === 'accepted' ? CheckIcon : CloseIcon} role="status">
                {s === 'accepted' ? t.accepted : t.rejected}
              </Badge>
            ) : (
              <Inline wrap>
                {variant !== 'reject' ? (
                  <Button disabled={disabled || busy || !onDecision} onClick={() => decide([e], 'accepted')}>
                    {t.accept}
                  </Button>
                ) : null}
                {variant !== 'accept' ? (
                  <Button
                    variant="secondary"
                    disabled={disabled || busy || !onDecision}
                    onClick={() => decide([e], 'rejected')}
                  >
                    {t.reject}
                  </Button>
                ) : null}
              </Inline>
            )}
          </Stack>
        );
      })}
      {variant === 'all' && pending.length ? (
        <Button disabled={disabled || busy || !onDecision} onClick={() => decide(pending, 'accepted')}>
          {t.acceptAll}
        </Button>
      ) : null}
      {error ? <Notice tone="danger">{error}</Notice> : null}
    </Stack>
  );
}
