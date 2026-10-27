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
     digits: "auto" (default: Arabic-Indic ٠-٩ for an Arabic locale, Latin for every other) | "arab" | "latn" (owner, arabic-digits-35):
       every format helper writes its digits so, and Isolate and Text write the digits of their text so; emails and web addresses keep Latin
     root: set the page's lang and dir through DirectionProvider; default false (a scoped region)
     children: the region's content
     useDigits(): "arab" or "latn", the digits of the nearest LocaleProvider (the page's language when there is none)
     useLocale(): { locale, dir, digits, t, strings, plural, format }; format has number, unit, bytes, duration, compact, date,
       time, dateTime, relative, range, currency, percent, list, personName, address, phone and regionName
     createTranslator(locale, catalogs, fallbackLocale): the same t/strings/plural API outside React
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
  return { locale: language, dir: directionOf(language), t, strings, plural };
}

const FORMATTERS = { number: ['formatNumber', 1], unit: ['formatUnit', 2], bytes: ['formatBytes', 1], duration: ['formatDuration', 1],
  compact: ['formatCompact', 1], date: ['formatDate', 1], time: ['formatTime', 1], dateTime: ['formatDateTime', 1], relative: ['formatRelative', 1],
  range: ['formatRange', 2], currency: ['formatCurrency', 2], percent: ['formatPercent', 1], list: ['formatList', 1],
  personName: ['formatPersonName', 1], address: ['formatAddress', 1], phone: ['formatPhone', 1], regionName: ['regionName', 1] };
const bind = (locale, timeZone, digits) => { const tag = F.numeralLocale(locale, digits); return Object.fromEntries(Object.entries(FORMATTERS).map(([name, [fn, count]]) =>
  [name, (...args) => F[fn](...Array.from({ length: count }, (_, index) => args[index]), Object.assign({ locale: tag, timeZone }, args[count]))])); };
const LocaleContext = React.createContext(null);

export function LocaleProvider({ locale, catalogs, messages, fallbackLocale = 'en', timeZone, dir, digits = 'auto', root = false, children }) {
  const language = canonical(locale || F.formatLocale());
  const value = React.useMemo(() => {
    const sources = Object.assign({}, catalogs, messages ? { [language]: messages } : {});
    return Object.assign(createTranslator(language, sources, fallbackLocale), { dir: dir || directionOf(language), digits: F.digitsOf(F.numeralLocale(language, digits === 'auto' ? undefined : digits)), format: bind(language, timeZone, digits === 'auto' ? undefined : digits) });
  }, [language, catalogs, messages, fallbackLocale, timeZone, dir, digits]);
  return <LocaleContext.Provider value={value}><DirectionProvider locale={language} dir={value.dir} root={root}>{children}</DirectionProvider></LocaleContext.Provider>;
}

export function useLocale() {
  const value = React.useContext(LocaleContext);
  const language = canonical(F.formatLocale());
  const fallback = React.useMemo(() => Object.assign(createTranslator(language), { format: bind(language) }), [language]);
  return value || fallback;
}

// the digits the text around uses ("arab" or "latn"): the nearest LocaleProvider's, else the page's language (cheap: no translator is built)
export function useDigits() {
  const value = React.useContext(LocaleContext);
  return value ? value.digits : F.digitsOf(F.formatLocale());
}
