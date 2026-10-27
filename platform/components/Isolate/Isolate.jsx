/* Plenix · Isolate
   Summary: Keeps a piece of text in its own writing direction inside text of the other direction (bidirectional
     isolation): an ID, a case number (20261020-01), an email, a URL, a phone number or code inside an Arabic sentence,
     so it reads as written and the words around it keep their places (owner, ctm-needs-34; #413 batch 3).
   Usage:
     <Text as="p">تم تسجيل القضية رقم <Isolate>20261020-01</Isolate> وستصل الإشعارات إلى <Isolate>office@example.org</Isolate>.</Text>
     <Isolate dir="auto">{fileName}</Isolate>          // a value that may be in either direction: its first letter decides
   Props:
     dir: "ltr" (default: IDs, numbers, emails, URLs, code) | "rtl" | "auto" (the first strong letter decides)
     kind: "email" | "url": keeps its Latin digits when the page writes Arabic-Indic digits (owner, arabic-digits-risk-36); any other
       value (an ID, a case number, a phone number, code) takes the page's digits, ٠-٩ in Arabic
     as: the element; default "bdi"
     className: more classes on the element
     children: the text
     ...rest: other attributes go on the element
   Behavior:
     The element is isolated (unicode-bidi: isolate, as <bdi> is): the text inside never reorders the text around it,
       and the text around it never reorders it. In an Arabic sentence "20261020-01" stays "20261020-01" (without it,
       the two numbers swap places: "01-20261020").
     Digits: in Arabic (LocaleProvider digits, "auto" for an Arabic locale) the digits of its text are written Arabic-Indic, case
       numbers and IDs included, and an email or a web address (kind) keeps Latin (owner, arabic-ids-35, arabic-digits-risk-36).
     A left-to-right island overrides the order (unicode-bidi: isolate-override): Arabic-Indic digits would otherwise let a hyphen
       swap the two numbers around it ("٢٠٢٦١٠٢٠-٠١" reads "٠١-٢٠٢٦١٠٢٠"). The order of its characters is kept as written.
     It is inline and adds no box: alignment, wrapping and the ellipsis stay the container's.
   Notes:
     Plenix isolates by itself where it knows the value is technical: DataGrid and Table cells of kind data, id, email,
       url, phone and code; DataPill with data; PropertyList.Item with data; Code, Kbd and CodeBlock (always left to
       right); Text, which is dir="auto". Use Isolate for such a value inside running text.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useDigits } from '../../providers/LocaleProvider.jsx';
import { localDigits } from '../../utils/digits.js';

export function Isolate({ dir = 'ltr', as: Tag = 'bdi', kind, className, children, ...rest }) {
  const digits = useDigits();
  // an email or a web address keeps its Latin digits; any other value takes the page's digits (Arabic-Indic in Arabic)
  const own = kind === 'email' || kind === 'url' ? 'latn' : digits;
  const shown = React.Children.map(children, (child) => (typeof child === 'string' || typeof child === 'number' ? localDigits(String(child), { digits: own }) : child));
  return <Tag className={cx('plx-isolate', className)} dir={dir} {...rest}>{shown}</Tag>;
}
