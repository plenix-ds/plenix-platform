/* Plenix · ConfidenceIndicator
   Summary: Caller supplied confidence with explicit text; numeric values use the data font.
   Usage: <ConfidenceIndicator level="medium" />
   Props: level: high|medium|low; variant: qualitative|numeric; value: numeric ratio0..1 for numeric; locale; strings: high,medium,low,unknown,label; className.
   Behavior: Never derives confidence from output. Invalid or absent numeric values show Unknown; qualitative levels use the same existing neutral role.
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
import { formatPercent } from '../../utils/format.ts';
import { useStrings } from '../../providers/LocaleProvider.jsx';
import SparkleIcon from 'plenix-platform/icons/plenix/sparkle';
export function ConfidenceIndicator({level,variant='qualitative',value,locale,strings,className,...rest}){
  devWarn('ConfidenceIndicator', { variant }, { variant: ['qualitative','numeric'] });
  const t=useStrings('confidenceIndicator', strings),valid=typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<=1,text=variant==='numeric'?(valid?formatPercent(value,{locale}):t.unknown):(t[level]&&['high','medium','low'].includes(level)?t[level]:t.unknown);return <Inline className={cx('plx-confidence-indicator',className)} {...rest}><Badge icon={SparkleIcon}>{variant==='numeric'&&valid?t.label:text}</Badge>{variant==='numeric'&&valid?<Text variant="data">{text}</Text>:null}</Inline>;}
