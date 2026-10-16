/* Plenix · AILabel
   Summary: Identify generated content through the existing sparkle icon and a readable label; no AI color.
   Usage: <AILabel variant="badge" explanation="Generated from the selected sources."/>
   Props:
     variant: "badge" (default) | "inline" | "explanation".
     children: the readable origin label; default strings.label.
     explanation: text or a trusted React node disclosed in the explanation variant.
     strings: { label, explain }; localized label and disclosure title.
     className: extra classes on the label or trigger.
     ref: forwarded to the explanation trigger button.
   Behavior: An explanation is an explicit Popover disclosure, with inherited keyboard and dismissal behavior.
   Notes: Identification does not imply accuracy, certainty or verified sources. No new accent or color is introduced.
*/
import React from 'react';
import { Badge } from '../Badge/Badge.jsx';
import { Inline } from '../Stack/Stack.jsx';
import { Icon } from '../Icon/Icon.jsx';
import { Text } from '../Text/Text.jsx';
import { Button } from '../Button/Button.jsx';
import { Popover } from '../Popover/Popover.jsx';
import { cx } from '../../utils/cx.js';
export const AILabel=React.forwardRef(function AILabel({variant='badge',children,explanation,strings,className},ref){
 const t={label:'AI-generated',explain:'About this AI content',...strings},label=children||t.label,cls=cx('plx-ai','plx-ai-label',className);
 if(variant==='explanation'&&explanation)return <Popover label={t.explain} title={t.explain} trigger={<Button ref={ref} className={cls} variant="ghost" size="sm" icon="sparkle">{label}</Button>}><Text>{explanation}</Text></Popover>;
 return variant==='inline'?<Inline as="span" className={cls}><Icon name="sparkle"/><Text as="span">{label}</Text></Inline>:<Badge className={cls} tone="neutral" icon="sparkle">{label}</Badge>;
});
