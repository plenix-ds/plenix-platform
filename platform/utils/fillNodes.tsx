/* Plenix · fillNodes (platform/utils/fillNodes.tsx)
   Summary: Fills the {name} placeholders of a catalog text with the data font: each value that is given is drawn as a data
     Text, the words around it stay as they are (the text comes back as a list of strings and elements).
   Usage: import { fillNodes } from '../../utils/fillNodes.tsx'; <p>{fillNodes(t.step, { n: 2, total: 5 })}</p>
   Props: fillNodes(template, values): a placeholder whose value is undefined stays as written.
   Notes: Shared by TeachingBubble and RetryNotice (issue 693: one copy of the same function in each).
     around(text, key, node) (below) puts one element in place of one {key}, for Auth, ConnectedAccounts, RoleManager and
     SessionTimeout (#882). */
import React from 'react';
import { Text } from '../components/Text/Text.tsx';


export const fillNodes = (template: string, values: Record<string, React.ReactNode>): React.ReactNode[] =>
  template
    .split(/(\{\w+\})/)
    .filter(Boolean)
    .map((part, i) => {
      const m = /^\{(\w+)\}$/.exec(part);
      return m && values[m[1]] !== undefined ? <Text key={i} variant="data">{values[m[1]]}</Text> : part;
    });

// one {key} placeholder of a catalog text replaced by an element (a link, a button, a field): the words before it, the
// element, the words after it; without the placeholder the text alone. Shared by Auth, ConnectedAccounts, RoleManager and
// SessionTimeout (one copy, #882)
export const around = (s: unknown, key: string, node: React.ReactNode) => { const p = String(s).split('{' + key + '}'); return <>{p[0]}{p.length > 1 ? node : null}{p.slice(1).join('')}</>; };
