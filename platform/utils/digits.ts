/* Plenix · Digits (platform/utils/digits.ts)
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
     toLatinDigits(text): the text with Arabic-Indic (٠-٩) and Persian (۰-۹) digits changed to ASCII, for reading what a person typed
   Behavior:
     An email (name@host) and a web address (http://, https://, www.) are left as written. Anything else changes, including
       case numbers, IDs, dates and phone numbers written as text. Only digits change; the order of characters never does.
     Copying a changed ID copies the Arabic-Indic digits (owner, arabic-digits-risk-36).
   Notes:
     Formatted numbers and dates change through the locale instead (format.ts numeralLocale), not through this. */
import { digitsOf } from './format.ts';

const KEEP = /([^\s@<>()]+@[^\s@<>()]+|(?:https?:\/\/|www\.)[^\s<>()]+)/gi;
const ARAB = (d: string) => String.fromCharCode(0x660 + Number(d));

function toArabicIndic(text: unknown): string {
  return String(text).split(KEEP).map((part, i) => (i % 2 ? part : part.replace(/[0-9]/g, ARAB))).join('');
}

export const toLatinDigits = (text: unknown): string => String(text).replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x660)).replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x6F0));

export function localDigits<T>(text: T, { digits = 'auto', locale }: { digits?: 'arab' | 'latn' | 'auto'; locale?: string } = {}): T extends null | undefined ? T : string {
  type Out = T extends null | undefined ? T : string;
  if (text === null || text === undefined) return text as Out;
  const want = digits === 'arab' || digits === 'latn' ? digits : digitsOf(locale);
  return (want === 'arab' ? toArabicIndic(text) : String(text)) as Out;
}
