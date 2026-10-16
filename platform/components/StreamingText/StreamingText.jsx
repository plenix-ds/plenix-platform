/* Plenix · StreamingText
   Summary: Caller-owned streamed plain text with quiet progress and a complete final announcement.
   Usage: <StreamingText text={response} state="streaming" />
   Props:
     text: trusted plain text, never parsed as HTML; state: streaming | done (default) | stopped.
     strings: label, streaming, done, stopped; announce: false delegates announcements to a parent (default true); className.
   Behavior: Partial tokens stay readable without an announcement on each token. A persistent LiveRegion announces
     completion or cancellation with the retained answer. No focus movement and no motion, including reduced motion.
   Notes: The caller owns the transport, decoding and stop request; partial output is retained when stopped.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { LiveRegion } from '../../utils/announce.jsx';
import { Stack } from '../Stack/Stack.jsx';
import { Text } from '../Text/Text.jsx';
import { Badge } from '../Badge/Badge.jsx';
export function StreamingText({text='',state='done',announce=true,strings,className}){
 const t={label:'AI response',streaming:'Generating response',done:'Response complete',stopped:'Generation stopped',...strings},status=['streaming','stopped'].includes(state)?state:'done';
 const [announcement,setAnnouncement]=React.useState('');
 React.useEffect(()=>{setAnnouncement(status==='streaming'?t.streaming:t[status]+(text?' — '+text:''));},[text,status,t.streaming,t.done,t.stopped]);
 return <Stack className={cx('plx-streaming-text',className)} role="group" aria-label={t.label}>
 <Badge icon={status==='done'?'check':'sparkle'}>{t[status]}</Badge>
 <Text className="plx-streaming-text__content">{text}</Text>
 {announce?<LiveRegion kind="status">{announcement}</LiveRegion>:null}</Stack>;
}
