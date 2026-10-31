/* Plenix · fill (platform/utils/fill.ts)
   Summary: Fills the {name} placeholders of a catalog text (a component's strings, an announcement, an aria-label).
   Usage: import { fill } from '../../utils/fill.ts'; fill(t.page, { n: 3 })  // "Go to page {n}" -> "Go to page 3"
   Props: fill(text, values): text is turned into a string; each {name} is replaced by values[name] (every occurrence); a
     placeholder whose value is undefined or null stays as written, so a missing value shows as "{name}" and is easy to
     spot, never as the words "undefined" or "null". A key the text does not name is ignored.
   Notes: One helper for every component (issue 693: it was copied into 44 files in four versions). Returns a string; a
     phrase with numbers in the data font is dataPhrase (utils/dataText.tsx), and one with nodes is fillNodes
     (utils/fillNodes.tsx). check-system's shared-fill rule refuses a new local copy. */
export const fill = (text: unknown, values: Record<string, unknown>): string => String(text).replace(/\{(\w+)\}/g, (match, key: string) => (values[key] != null ? values[key] as string : match));
