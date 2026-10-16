/* Plenix · AIExplanation
   Summary: A requested explanation and caller supplied factors, with optional confidence.
   Usage: <AIExplanation summary="Suggested because it matches your saved topics." factors={reasons} />
   Props: summary: explanation text; factors: [{id,label,detail}]; confidence: ConfidenceIndicator props; label,title; open,onOpenChange; strings: label,title,close; className.
   Behavior: Opens only on request, uses the existing Popover focus/escape behavior and never invents reasons or confidence.
   Notes: Existing roles and the existing sparkle icon only. Caller owns AI output, data, authorization and persistence.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Stack } from '../../components/Stack/Stack.jsx';
import { Text } from '../../components/Text/Text.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { Popover } from '../../components/Popover/Popover.jsx';
import { ConfidenceIndicator } from '../../components/ConfidenceIndicator/ConfidenceIndicator.jsx';
export function AIExplanation({summary,factors=[],confidence,label,title,open,onOpenChange,strings,className}){const t=Object.assign({label:'Why this?',title:'AI explanation',close:'Close'},strings);return <Popover title={title||t.title} open={open} onOpenChange={onOpenChange} closeButton strings={{close:t.close}} trigger={<Button icon="sparkle">{label||t.label}</Button>}><Stack className={cx('plx-ai-explanation',className)}><Text as="p">{summary}</Text>{factors.length?<Stack as="ul">{factors.map(f=><Text as="li" key={f.id}><Text variant="strong">{f.label}</Text>{f.detail?' — '+f.detail:null}</Text>)}</Stack>:null}{confidence?<ConfidenceIndicator {...confidence}/>:null}</Stack></Popover>;}
