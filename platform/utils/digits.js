/* Plenix · Digits (platform/utils/digits.js)
   Summary: Writes the digits of a text in the reader's numerals: Arabic-Indic (٠-٩) in Arabic, Latin elsewhere (owner,
     arabic-digits-35, arabic-ids-35, arabic-digits-risk-36). Emails and web addresses keep their Latin digits.
   Usage:
     localDigits('Case 20261020-01 on 20 October')            // in Arabic: "Case ٢٠٢٦١٠٢٠-٠١ on ٢٠ October"
     localDigits('write to office2026@example.org')            // email kept: "office2026@example.org"
     toArabicIndic('2026')                                     // "٢٠٢٦"
   Props:
     localDigits(text, { digits, locale }): the text with its ASCII digits changed to the locale's; digits "arab" | "latn" |
       "auto" (default: from the locale, formatLocale() when none)
     toArabicIndic(text): the text with every ASCII digit changed to Arabic-Indic, except inside an email or a web address
   Behavior:
     An email (name@host) and a web address (http://, https://, www.) are left as written. Anything else changes, including
       case numbers, IDs, dates and phone numbers written as text. Only digits change; the order of characters never does.
     Copying a changed ID copies the Arabic-Indic digits (owner, arabic-digits-risk-36).
   Notes:
     Formatted numbers and dates change through the locale instead (format.js numeralLocale), not through this. */
import { digitsOf } from './format.js';

const KEEP = /([^\s@<>()]+@[^\s@<>()]+|(?:https?:\/\/|www\.)[^\s<>()]+)/gi;
const ARAB = (d) => String.fromCharCode(0x660 + Number(d));

export function toArabicIndic(text) {
  return String(text).split(KEEP).map((part, i) => (i % 2 ? part : part.replace(/[0-9]/g, ARAB))).join('');
}

export function localDigits(text, { digits = 'auto', locale } = {}) {
  if (text === null || text === undefined) return text;
  const want = digits === 'arab' || digits === 'latn' ? digits : digitsOf(locale);
  return want === 'arab' ? toArabicIndic(text) : String(text);
}
