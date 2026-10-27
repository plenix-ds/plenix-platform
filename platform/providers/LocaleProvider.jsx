/* Plenix · LocaleProvider, useLocale, createTranslator
   Summary: Locale-scoped message catalogs, plural rules, formatting and writing direction. Existing components receive
     their strings explicitly from the catalog; a region never changes another region's locale.
   Usage:
     <LocaleProvider locale="fr-FR" catalogs={{ fr: french }}><App /></LocaleProvider>
     const { t, strings, format } = useLocale();
     <Wizard strings={strings('wizard')} />; t('collection.selected', { count: 2 }); format.date('2026-03-08');
   Props:
     locale: a BCP 47 language tag; default the page's formatLocale()
     catalogs: messages by locale, with flat dot keys or nested sections; Plenix's built-in words for the language come after
       them (i18n/ar.js: Arabic, owner arabic-batch4-36), and English is always the last fallback
     messages: the current locale's catalog, as a convenience
     fallbackLocale: locale searched after the requested locale and its language; default "en"
     timeZone: optional Intl time zone for this provider's date/time formatters
     dir: explicit "ltr" or "rtl"; otherwise directionOf(locale)
     root: set the page's lang and dir through DirectionProvider; default false (a scoped region)
     children: the region's content
     useLocale(): { locale, dir, t, strings, plural, format }; format has number, unit, bytes, duration, compact, date,
       time, dateTime, relative, range, currency, percent, list, personName, address, phone and regionName
     createTranslator(locale, catalogs, fallbackLocale): the same t/strings/plural API outside React, plus section(name): a
       whole section merged across the catalogs
     useStrings(section, strings): a component's words: its catalog section for the locale (the app's catalog, Plenix's
       built-in language, English), with its strings prop on top (owner, arabic-words-37). Every built-in word lives in
       i18n/en.js; check-system's built-in-words rule keeps English literals out of the components
   Behavior:
     Fallback: exact locale, language, configured fallback, then English. Missing messages return their key.
     Messages interpolate {name} as plain text. Plural messages are objects with one/other (or any Intl category),
     optional "=0" exact-count keys; t(key, { count }) selects them with Intl.PluralRules. t's third argument may
     set ordinal:true. Missing interpolation values keep their placeholder. No HTML is parsed.
     strings(section, values) combines that section across fallbacks for a component's strings prop.
   Notes:
     Translators never mutate catalogs or global Intl state. Pass the bound format helpers to localized content;
     unmodified components keep their existing defaults. Catalog translations are application-owned. */
import React from 'react';
import { DirectionProvider } from './DirectionProvider.jsx';
import { directionOf } from '../utils/direction.js';
import * as F from '../utils/format.js';
import english from '../i18n/en.js';
import arabic from '../i18n/ar.js';

// Plenix's own words in other languages: used after the application's catalog for the same language, before English
const BUILT_IN = { ar: arabic };

const canonical = (value, fallback = 'en') => { try { return Intl.getCanonicalLocales(value || fallback)[0] || fallback; } catch (e) { return fallback; } };
const own = (value, key) => value && Object.prototype.hasOwnProperty.call(value, key);
const messageAt = (catalog, key) => {
  if (own(catalog, key)) return catalog[key];
  return String(key).split('.').reduce((node, part) => own(node, part) ? node[part] : undefined, catalog);
};
const text = (message, values) => String(message).replace(/\{(\w+)\}/g, (match, key) => own(values, key) ? String(values[key]) : match);

// a plural message: an object whose keys are only plural categories (zero, one, two, few, many, other) or exact counts ("=0"),
// with "other"; a section that merely has a key named "other" (TimeZoneSelect's "Other") is not one
const PLURAL_KEY = /^(zero|one|two|few|many|other|=\d+)$/;
const pluralMessage = (v) => !!v && typeof v === 'object' && !Array.isArray(v) && own(v, 'other') && Object.keys(v).every((k) => PLURAL_KEY.test(k));

export function createTranslator(locale = 'en', catalogs = {}, fallbackLocale = 'en') {
  const language = canonical(locale), fallback = canonical(fallbackLocale);
  const normalized = Object.fromEntries(Object.entries(catalogs || {}).map(([key, value]) => [canonical(key), value]));
  const chain = [...new Set([language, language.split('-')[0], fallback, fallback.split('-')[0], 'en'])];
  const sources = chain.flatMap((key) => [normalized[key], BUILT_IN[key]]).filter(Boolean).concat(english);
  const cardinal = new Intl.PluralRules(language), ordinal = new Intl.PluralRules(language, { type: 'ordinal' });
  const plural = (count, options = {}) => (options.ordinal ? ordinal : cardinal).select(Number(count));
  const choose = (value, values, options) => {
    if (typeof value === 'string' || typeof value === 'number') return text(value, values);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
    const exact = '=' + Number(values.count), category = plural(values.count, options);
    const item = own(value, exact) ? value[exact] : value[category] !== undefined ? value[category] : value.other;
    return typeof item === 'string' || typeof item === 'number' ? text(item, values) : undefined;
  };
  const t = (key, values = {}, options = {}) => {
    for (const source of sources) { const result = choose(messageAt(source, key), values, options); if (result !== undefined) return result; }
    return String(key);
  };
  const strings = (section, values = {}) => {
    const keys = new Set();
    sources.forEach((source) => {
      const node = messageAt(source, section);
      if (node && typeof node === 'object' && !Array.isArray(node)) Object.keys(node).forEach((key) => keys.add(key));
      Object.keys(source).filter((key) => key.startsWith(section + '.') && !key.slice(section.length + 1).includes('.')).forEach((key) => keys.add(key.slice(section.length + 1)));
    });
    return Object.fromEntries([...keys].map((key) => [key, t(section + '.' + key, values)]));
  };
  // a component's words: the whole section, merged across the catalogs (English at the bottom, the language on top); nested
  // sections merge key by key, a plural message (an object with "other") is kept whole, so two languages never mix
  const isPlural = pluralMessage;
  const merge = (a, b) => {
    if (!b || typeof b !== 'object' || Array.isArray(b) || isPlural(b)) return b === undefined ? a : b;
    const out = Object.assign({}, a && typeof a === 'object' && !isPlural(a) ? a : {});
    Object.keys(b).forEach((k) => { out[k] = merge(out[k], b[k]); });
    return out;
  };
  const section = (name) => sources.slice().reverse().reduce((acc, source) => merge(acc, messageAt(source, name)), {});
  return { locale: language, dir: directionOf(language), t, strings, plural, section };
}

const FORMATTERS = { number: ['formatNumber', 1], unit: ['formatUnit', 2], bytes: ['formatBytes', 1], duration: ['formatDuration', 1],
  compact: ['formatCompact', 1], date: ['formatDate', 1], time: ['formatTime', 1], dateTime: ['formatDateTime', 1], relative: ['formatRelative', 1],
  range: ['formatRange', 2], currency: ['formatCurrency', 2], percent: ['formatPercent', 1], list: ['formatList', 1],
  personName: ['formatPersonName', 1], address: ['formatAddress', 1], phone: ['formatPhone', 1], regionName: ['regionName', 1] };
const bind = (locale, timeZone) => Object.fromEntries(Object.entries(FORMATTERS).map(([name, [fn, count]]) =>
  [name, (...args) => F[fn](...Array.from({ length: count }, (_, index) => args[index]), Object.assign({ locale, timeZone }, args[count]))]));
const LocaleContext = React.createContext(null);

export function LocaleProvider({ locale, catalogs, messages, fallbackLocale = 'en', timeZone, dir, root = false, children }) {
  const language = canonical(locale || F.formatLocale());
  const value = React.useMemo(() => {
    const sources = Object.assign({}, catalogs, messages ? { [language]: messages } : {});
    return Object.assign(createTranslator(language, sources, fallbackLocale), { dir: dir || directionOf(language), format: bind(language, timeZone) });
  }, [language, catalogs, messages, fallbackLocale, timeZone, dir]);
  return <LocaleContext.Provider value={value}><DirectionProvider locale={language} dir={value.dir} root={root}>{children}</DirectionProvider></LocaleContext.Provider>;
}

// a component's words (owner, arabic-words-37): its section of the catalogs for the locale, with the component's strings
// prop on top (an app's own words still win). useStrings('pagination', strings) -> { label, range, previous, … }
export function useStrings(name, strings) {
  const loc = useLocale();
  return React.useMemo(() => {
    const base = loc.section(name);
    if (!strings) return base;
    const out = Object.assign({}, base);
    Object.keys(strings).forEach((k) => {
      const v = strings[k], b = base[k];
      out[k] = v && typeof v === 'object' && !Array.isArray(v) && b && typeof b === 'object' && !Array.isArray(b) && !pluralMessage(v) ? Object.assign({}, b, v) : v;
    });
    return out;
  }, [loc, name, strings]);
}

export function useLocale() {
  const value = React.useContext(LocaleContext);
  const language = canonical(F.formatLocale());
  const fallback = React.useMemo(() => Object.assign(createTranslator(language), { format: bind(language) }), [language]);
  return value || fallback;
}
