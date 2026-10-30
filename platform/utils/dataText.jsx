/* Plenix · dataText, dataPhrase, dataNumber (platform/utils/dataText.jsx)
   Summary: A phrase with its numbers in the data font and its words in the normal font (owner, 2026-10-24, issue 260):
     "7 files" is [7 in Reddit Mono] + " files" in DM Sans. Dates, times, sizes and money inside a phrase too.
   Usage:
     dataPhrase('{n} files', { n: 7 })                    // [<Text variant="data">7</Text>, ' files'], the number formatted
     dataPhrase(fill(t.range, { first, last, total }))    // a phrase already filled: each number found in it
     dataPhrase(strings.selected, { n: count })           // a catalog template, filled here
     dataNumber(1284)                                     // <Text variant="data">1,284</Text>
     dataText('4,546 assets | 12.4 GB')                   // the same as dataPhrase(text)
   Props:
     dataPhrase(text, values, options): text is a template ({name} placeholders) or a finished phrase. A number in values
       is written with formatNumber (options: formatNumber's: locale, digits, …) and set in the data font; a text value
       is written as it is and searched for numbers like the rest. Every date, time, size, percentage, money amount and
       number left in the words is set in the data font too. Returns a node (a fragment): a phrase inside a span, which
       keeps the data font at the phrase's own size.
     dataNumber(value, options): one number, formatted (formatNumber) and in the data font.
     dataText(text): a finished phrase, its numbers in the data font (dataPhrase(text) without values).
     dataWhenText(content): for a component's text prop: a string goes through dataText, anything else is returned as it is.
   Behavior:
     The data font takes the size of the text around it (the span carries plx-text, the Text component's base class,
     so the data span inherits the phrase's size and baseline; the phrase keeps its own color and weight).
     Arabic-Indic digits (٠-٩) count as digits; a number formatted for an Arabic locale stays in its digits, and the Text
     component writes ASCII digits in the reader's numerals as everywhere else. The order of the words never changes, so
     right to left reads as written.
     A value that is null or undefined leaves its placeholder empty.
   Notes:
     check-system's count-phrases rule (check-system.rules/count-phrases.js) finds a count joined to words in code; these
     helpers are what it asks for. A text for screen readers (aria-label, an announcement) stays a plain string. */
import React from 'react';
import { Text } from '../components/Text/Text.jsx';
import { formatNumber } from './format.js';

const D = '[0-9\\u0660-\\u0669]';
const MONTH = '(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\\.?';
// a date, a time, a size, money, a percentage, a measure or a number: each is one data run
const DATUM = new RegExp('(' + D + '{4}-' + D + '{2}-' + D + '{2}(?:[ T]' + D + '{1,2}:' + D + '{2})?|' + MONTH + ' ' + D + '{1,2}(?:, ' + D + '{4})?|' + D + '{1,2}:' + D + '{2}(?:\\s?[AP]M)?|[$€£]?' + D + '[0-9\\u0660-\\u0669,.\\u066B\\u066C]*(?:\\s?(?:%|٪|[kKMB]\\b|KB|MB|GB|TB))?(?:\\s?[×x]\\s?' + D + '[0-9\\u0660-\\u0669,.]*)?)', 'g');
const HAS_DIGIT = new RegExp(D);

// a finished text -> its runs: words as text, data in the data font
function runs(text, key) {
  if (typeof text !== 'string' || !HAS_DIGIT.test(text)) return [text];
  return text.split(DATUM).map((p, i) => (i % 2 ? <Text key={key + '-' + i} variant="data">{p}</Text> : p || null));
}

export function dataNumber(value, options) {
  if (value === null || value === undefined || value === '') return null;
  return <Text variant="data">{typeof value === 'number' ? formatNumber(value, options) : String(value)}</Text>;
}

export function dataPhrase(text, values, options) {
  if (text === null || text === undefined) return null;
  if (typeof text === 'number') return dataNumber(text, options);
  const s = String(text), out = [];
  if (values && typeof values === 'object') {
    s.split(/(\{\w+\})/).forEach((part, i) => {
      const m = /^\{(\w+)\}$/.exec(part);
      if (!m || !(m[1] in values)) { out.push(...runs(part, i)); return; }
      const v = values[m[1]];
      if (v === null || v === undefined) return;
      if (typeof v === 'number') out.push(<Text key={i} variant="data">{formatNumber(v, options)}</Text>);
      else if (React.isValidElement(v)) out.push(React.cloneElement(v, { key: i }));
      else out.push(...runs(String(v), i));
    });
  } else out.push(...runs(s, 0));
  return <span className="plx-text">{out}</span>;
}

export const dataText = (text) => dataPhrase(text);

// what a component draws for a text a page gave it: a plain string gets its numbers in the data font (a count in a hint, a banner, a
// description: issue 260, owner 2026-10-30); anything else (an element, a list of them) is the page's own markup and stays as given
export const dataWhenText = (content) => (typeof content === 'string' ? dataPhrase(content) : content);
