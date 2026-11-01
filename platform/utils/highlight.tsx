/* Plenix · highlightMatch, matchesText (platform/utils/highlight.tsx)
   Summary: The typed text marked inside a result, the same way in every list that searches (issue 810, owner, 2026-11-01):
     SearchField, Combobox, Cascader and TreeSelect. One finder decides both what matches and what is marked, so a result is
     never listed for a match that is not marked.
   Usage:
     highlightMatch('Maya Chen', 'ch')        // ['Maya ', <span class="plx-match">Ch</span>, 'en'], the text unchanged
     highlightMatch(label, text)              // a string when the text is empty or not found
     matchesText(label, text)                 // true when the text is empty or found: the filter every search list uses
   Props:
     highlightMatch(label, text): label is the result's text (anything but a node is read with String); text is what was typed
       (trimmed). Every match is marked, not only the first. Returns a node: the label as a string when nothing is marked,
       otherwise a fragment of the pieces. The pieces are text and plain spans, so a screen reader reads the label as one
       text and keyboard movement in the list is untouched.
     matchesText(label, text): the same finder, as a yes or no.
   Behavior:
     Upper and lower case are the same (the reader's language rules). Arabic matches without its vowel marks (fatha, damma,
     kasra, shadda, sukun, the dagger alef) and without the stretching line (tatweel), in the text and in the label, so
     "محمد" finds "مُحَمَّد". A mark that belongs to the last matched letter is marked with it, so a letter is never split from
     its mark. A match is found in the label's own order, so right to left reads as written.
     A match made of Arabic letters gets plx-match--joined: it is underlined instead of set in a heavier weight, because a
     change of weight inside a word breaks the joined letter shapes (the pieces are still one word, with the same font).
   Notes:
     The class plx-match is styled in system/highlight.css from the highlight tokens (tokens/components/highlight.tokens.json).
     Letters are matched as written: accents on Latin letters count (é is not e), and Arabic letter forms (alef with hamza,
     alef maqsura, ta marbuta) are not folded together. */
import React from 'react';

// the Arabic vowel marks and the stretching line: ignored when matching (tatweel U+0640, U+064B to U+065F, the dagger alef U+0670)
const IGNORED = /[ـً-ٰٟ]/;
// a letter of the Arabic script (the joined one: its shapes depend on its neighbors)
const JOINED = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

interface Folded {
  text: string;
  start: number[];
  end: number[];
}

// the text lower-cased and without the ignored marks; for each character of it, where it begins and ends in the original
function fold(source: string): Folded {
  let text = '';
  const start: number[] = [];
  const end: number[] = [];
  let at = 0;
  for (const ch of source) {
    const next = at + ch.length;
    if (!IGNORED.test(ch)) {
      const low = ch.toLocaleLowerCase();
      for (let i = 0; i < low.length; i += 1) {
        start.push(at);
        end.push(next);
      }
      text += low;
    }
    at = next;
  }
  return { text, start, end };
}

// the ranges of the label that match the text: [from, to) in the original label, none for an empty or absent text
function ranges(label: string, typed: unknown): Array<[number, number]> {
  const query = fold(String(typed ?? '').trim()).text;
  if (!query) return [];
  const folded = fold(label);
  const found: Array<[number, number]> = [];
  let from = folded.text.indexOf(query);
  while (from >= 0) {
    const last = from + query.length - 1;
    let to = folded.end[last];
    // the vowel marks that follow the last matched letter belong to it
    while (to < label.length && IGNORED.test(label.charAt(to))) to += 1;
    found.push([folded.start[from], to]);
    from = folded.text.indexOf(query, from + query.length);
  }
  return found;
}

export function matchesText(label: unknown, typed: unknown): boolean {
  const query = fold(String(typed ?? '').trim()).text;
  return !query || fold(String(label ?? '')).text.indexOf(query) >= 0;
}

export function highlightMatch(label: unknown, typed: unknown): React.ReactNode {
  const text = String(label ?? '');
  const found = ranges(text, typed);
  if (!found.length) return text;
  const pieces: React.ReactNode[] = [];
  let at = 0;
  found.forEach(([from, to], i) => {
    if (from > at) pieces.push(text.slice(at, from));
    const part = text.slice(from, to);
    pieces.push(
      <span key={'m' + i} className={JOINED.test(part) ? 'plx-match plx-match--joined' : 'plx-match'}>
        {part}
      </span>
    );
    at = to;
  });
  if (at < text.length) pieces.push(text.slice(at));
  return <>{pieces}</>;
}
