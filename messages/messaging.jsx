/* Plenix · messaging (messages/messaging.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 199: the conversations in a SecondaryPane, the open one as Chat (header, thread, composer).
   Screens (Platforms Standard 4.3, 5.2): the list (#/) and a conversation (#/thread/<id>), a history entry each. Wide and
   Medium open the first conversation when none is named; at Narrow one pane at a time (SecondaryPane detailOpen): the
   list first, a conversation with Back to the list. A reply being written is unsaved work: leaving asks. The list's
   scroll position is kept (plenix.messaging.view). */
import { Avatar, Chat, Count, EmptyState, EntityHeader, Inline, RowButton, SecondaryPane, Stack, Tag, Text, useAppLayout, useUnsavedGuard, useViewState } from 'plenix-platform';
import { MSGS, THREADS } from '../suite/shared.jsx';
const { useState } = React;

/* ─── Messaging ─────────────────────────────────────────────────── */
export function MessagingScreen({ screen }) {
  const layout = useAppLayout();
  const narrow = !!(layout && layout.narrow);
  const [view, updateView] = useViewState('messaging');
  const named = screen.parts[0] === 'thread' ? +screen.parts[1] : null;
  const thread = named !== null ? named : narrow ? null : 1;   // the first conversation where the panes sit side by side
  const setThread = (id) => screen.open(['thread', id]);
  const [input, setInput] = useState('');
  useUnsavedGuard(input.trim() !== '', 'Your reply has not been sent.');
  React.useEffect(() => { setInput(''); }, [thread]);
  const [msgs, setMsgs] = useState(MSGS);
  const thd = THREADS.find((t) => t.id === thread);
  const mList = msgs[thread] || [];
  const send = (text) => { setMsgs((m) => ({ ...m, [thread]: [...(m[thread] || []), { from: 'me', text, time: 'Now', mine: true }] })); setInput(''); };
  return (
    <div className="plx-page-panes">
      <SecondaryPane title="Messages" width="lg"
        scrollTop={view.scroll} onScrollChange={(top) => updateView({ scroll: top })} detailOpen={named !== null} onBack={() => screen.parent('/')}>
        <Stack gap="none">
          {THREADS.map((t) => (
            <RowButton key={t.id} selected={!narrow && thread === t.id} onClick={() => setThread(t.id)}>
              <Stack inset="sm" gap="xs">
                <Inline gap="sm" align="start">
                  <Avatar name={t.name} size="sm" />
                  <Stack gap="xs" grow>
                    <Inline justify="between" gap="sm">
                      <Text variant={t.unread > 0 ? 'heading' : 'strong'} truncate>{t.name}</Text>
                      <Text variant="data">{t.time}</Text>
                    </Inline>
                    <Text variant="secondary" truncate>{t.preview}</Text>
                    <Inline gap="xs">
                      <Tag>{t.ch}</Tag>
                      {t.unread > 0 ? <Count variant="pill" tone="info" value={t.unread} label={t.unread + ' unread'} /> : null}
                    </Inline>
                  </Stack>
                </Inline>
              </Stack>
            </RowButton>
          ))}
        </Stack>
      </SecondaryPane>
      <Stack gap="none" grow>
        {thd ? (
          <>
            <Stack inset="md">
              <EntityHeader title={thd.name} media={{ person: thd.name, color: thd.avColor }} subtitle={thd.ch}
                facts={[{ label: 'Unread', value: thd.unread || 0, data: true }, { label: 'Messages', value: mList.length, data: true }, { label: 'Last', value: thd.time, data: true }]}
                next={thd.preview ? { label: 'Latest', title: thd.preview, detail: <Text variant="data">{thd.time}</Text> } : undefined}
                actions={[{ icon: 'phone', label: 'Call' }, { icon: 'archive', label: 'Archive' }, { icon: 'mark-unread', label: 'Mark as unread' },
                  { icon: 'snooze', label: 'Snooze' }, { icon: 'trash', label: 'Delete' }]} />
            </Stack>
            <Chat.Thread label={'Conversation with ' + thd.name}>
              {mList.map((m, i) => <Chat.Message key={i} mine={m.mine} author={m.mine ? undefined : thd.name} time={m.time}>{m.text}</Chat.Message>)}
            </Chat.Thread>
            <Chat.Composer value={input} onChange={setInput} onSend={send} placeholder="Reply…" label="Reply" />
          </>
        ) : <EmptyState size="page" icon="message" title="Select a conversation" />}
      </Stack>
    </div>
  );
}
