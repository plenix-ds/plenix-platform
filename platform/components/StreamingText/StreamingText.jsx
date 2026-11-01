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
import { cx } from '../../utils/cx.ts';
import { LiveRegion } from '../../utils/announce.tsx';
import { Stack } from '../Stack/Stack.tsx';
import { Text } from '../Text/Text.tsx';
import { Badge } from '../Badge/Badge.jsx';
import CheckIcon from 'plenix-platform/icons/plenix/check';
import SparkleIcon from 'plenix-platform/icons/plenix/sparkle';
export function StreamingText({text='',state='done',announce=true,strings,className}){
 const t={label:'AI response',streaming:'Generating response',done:'Response complete',stopped:'Generation stopped',...strings},status=['streaming','stopped'].includes(state)?state:'done';
 const [announcement,setAnnouncement]=React.useState('');
 React.useEffect(()=>{setAnnouncement(status==='streaming'?t.streaming:t[status]+(text?' — '+text:''));},[text,status,t.streaming,t.done,t.stopped]);
 return <Stack className={cx('plx-streaming-text',className)} role="group" aria-label={t.label}>
 <Badge icon={status==='done'?CheckIcon:SparkleIcon}>{t[status]}</Badge>
 <Text className="plx-streaming-text__content">{text}</Text>
 {announce?<LiveRegion kind="status">{announcement}</LiveRegion>:null}</Stack>;
}
