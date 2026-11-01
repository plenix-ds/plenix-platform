/* Plenix · Isolate
   Summary: Keeps a piece of text in its own writing direction inside text of the other direction (bidirectional
     isolation): an ID, a case number (20261020-01), an email, a URL, a phone number or code inside an Arabic sentence,
     so the words around it keep their places. An email, a URL, a phone number and code read as written; a computed identifier
     (kind="id") reads as the page reads, 01-20261020 in a right-to-left page (owner, ctm-needs-34, issues 590 and 606).
   Usage:
     <Text as="p">تم تسجيل القضية رقم <Isolate kind="id">20261020-01</Isolate> وستصل الإشعارات إلى <Isolate kind="email">office@example.org</Isolate>.</Text>   // reads 01-20261020, and the email as written
     <Isolate dir="auto">{fileName}</Isolate>          // a value that may be in either direction: its first letter decides
   Props:
     dir: "ltr" (default: numbers, phone numbers, emails, URLs, code) | "rtl" | "auto" (the first strong letter decides). With kind="id"
       there is no default: the ID follows the direction around it
     kind: "id" | "email" | "url". "id" is a computed identifier or case number (20261020-01): it follows the direction of the text around it,
       so in an Arabic sentence it reads 01-20261020, and in a left-to-right page 20261020-01 (owner, issues 590 and 606: "01-20261020
       everywhere"). "email" and "url" keep their Latin digits when the page writes Arabic-Indic digits (owner, arabic-digits-risk-36)
       and stay left to right. Any other value (an ID, a case number, a phone number, code) takes the page's digits, ٠-٩ in Arabic
     as: the element; default "bdi"
     className: more classes on the element
     children: the text
     ...rest: other attributes go on the element
   Behavior:
     The element is isolated (unicode-bidi: isolate, as <bdi> is): the text inside never reorders the text around it,
       and the text around it never reorders it. Left to right (the default) keeps "20261020-01" as written in an Arabic sentence;
       kind="id" lets a computed identifier read as the page reads, "01-20261020" (the two numbers swap places, each stays in its own order).
       Use kind="id" for a computed identifier and the default for an email, a URL, a phone number or code.
     Digits: in Arabic (LocaleProvider digits, "auto" for an Arabic locale) the digits of its text are written Arabic-Indic, case
       numbers and IDs included, and an email or a web address (kind) keeps Latin (owner, arabic-ids-35, arabic-digits-risk-36).
     A left-to-right island (dir="ltr") overrides the order (unicode-bidi: isolate-override): Arabic-Indic digits would otherwise let a hyphen
       swap the two numbers around it ("٢٠٢٦١٠٢٠-٠١" reads "٠١-٢٠٢٦١٠٢٠"). The order of its characters is kept as written.
     It is inline and adds no box: alignment, wrapping and the ellipsis stay the container's.
   Notes:
     Plenix isolates by itself where it knows the value is technical: DataGrid and Table cells of kind data, id, email,
       url, phone and code; DataPill with data; PropertyList.Item with data; Code, Kbd and CodeBlock (always left to
       right); Text, which is dir="auto". Use Isolate for such a value inside running text.
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';
import { useDigits } from '../../providers/LocaleProvider.tsx';
import { localDigits } from '../../utils/digits.ts';

export function Isolate({ dir, as, kind, className, children, ...rest }) {
  const digits = useDigits();
  // an email or a web address keeps its Latin digits; any other value takes the page's digits (Arabic-Indic in Arabic)
  const own = kind === 'email' || kind === 'url' ? 'latn' : digits;
  const text = (child) => localDigits(String(child), { digits: own });
  // an ID is told apart piece by piece: each run of letters and digits keeps its own order (a left-to-right island of its own) and the runs
  // follow the direction around them, so "20261020-01" reads 01-20261020 in a right-to-left sentence and as written in a left-to-right one.
  // The text is unchanged (copy, search and screen readers get "20261020-01"); with Arabic-Indic digits a hyphen alone would do it, with Latin digits it would not
  const pieces = (child) => {
    const tokens = text(child).match(/[\p{L}\p{N}]+|[^\p{L}\p{N}]+/gu) || [];
    return tokens.length < 2 ? tokens : tokens.map((x, i) => (/^[\p{L}\p{N}]/u.test(x) ? <bdi key={i} dir="ltr">{x}</bdi> : x));
  };
  const shown = React.Children.map(children, (child) => (typeof child === 'string' || typeof child === 'number' ? (kind === 'id' ? pieces(child) : text(child)) : child));
  // an ID follows the direction around it: no dir of its own (a <bdi> without one would read its first letter), so it is a span; every other value keeps its own, left to right unless said
  const Tag = as || (kind === 'id' ? 'span' : 'bdi');
  const own_dir = kind === 'id' ? dir : (dir || 'ltr');
  return <Tag className={cx('plx-isolate', className)} dir={own_dir} {...rest}>{shown}</Tag>;
}
