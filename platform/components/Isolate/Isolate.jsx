/* Plenix · Isolate
   Summary: Keeps a piece of text in its own writing direction inside text of the other direction (bidirectional
     isolation): an ID, a case number (20261020-01), an email, a URL, a phone number or code inside an Arabic sentence,
     so it reads as written and the words around it keep their places (owner, ctm-needs-34; #413 batch 3).
   Usage:
     <Text as="p">تم تسجيل القضية رقم <Isolate>20261020-01</Isolate> وستصل الإشعارات إلى <Isolate>office@example.org</Isolate>.</Text>
     <Isolate dir="auto">{fileName}</Isolate>          // a value that may be in either direction: its first letter decides
   Props:
     dir: "ltr" (default: IDs, numbers, emails, URLs, code) | "rtl" | "auto" (the first strong letter decides)
     as: the element; default "bdi"
     className: more classes on the element
     children: the text
     ...rest: other attributes go on the element
   Behavior:
     The element is isolated (unicode-bidi: isolate, as <bdi> is): the text inside never reorders the text around it,
       and the text around it never reorders it. In an Arabic sentence "20261020-01" stays "20261020-01" (without it,
       the two numbers swap places: "01-20261020").
     It keeps the order of its characters, not their digits: when Arabic-Indic digits are on (LocaleProvider, #413 step 5),
       the digits of an ID, a case number or an email inside it change too, and still read in the right order (owner,
       arabic-ids-35).
     It is inline and adds no box: alignment, wrapping and the ellipsis stay the container's.
   Notes:
     Plenix isolates by itself where it knows the value is technical: DataGrid and Table cells of kind data, id, email,
       url, phone and code; DataPill with data; PropertyList.Item with data; Code, Kbd and CodeBlock (always left to
       right); Text, which is dir="auto". Use Isolate for such a value inside running text.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function Isolate({ dir = 'ltr', as: Tag = 'bdi', className, children, ...rest }) {
  return <Tag className={cx('plx-isolate', className)} dir={dir} {...rest}>{children}</Tag>;
}
