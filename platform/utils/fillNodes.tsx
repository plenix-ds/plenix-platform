/* Plenix · fillNodes (platform/utils/fillNodes.tsx)
   Summary: Fills the {name} placeholders of a catalog text with the data font: each value that is given is drawn as a data
     Text, the words around it stay as they are (the text comes back as a list of strings and elements).
   Usage: import { fillNodes } from '../../utils/fillNodes.tsx'; <p>{fillNodes(t.step, { n: 2, total: 5 })}</p>
   Props: fillNodes(template, values): a placeholder whose value is undefined stays as written.
   Notes: Shared by TeachingBubble and RetryNotice (issue 693: one copy of the same function in each). */
import React from 'react';
import { Text } from '../components/Text/Text.jsx';

// Text as this file draws it (Text.jsx is not typed yet: its inferred props would all be required)
const DataText = Text as React.ComponentType<{ variant?: string; children?: React.ReactNode }>;

export const fillNodes = (template: string, values: Record<string, React.ReactNode>): React.ReactNode[] =>
  template
    .split(/(\{\w+\})/)
    .filter(Boolean)
    .map((part, i) => {
      const m = /^\{(\w+)\}$/.exec(part);
      return m && values[m[1]] !== undefined ? <DataText key={i} variant="data">{values[m[1]]}</DataText> : part;
    });
