import english from "./en";
import german from "./de";

/**
 * Locale enum
 *
 * @readonly
 * @enum {string}
 */
export const LOCALE = {
  EN: "en",
  DE: "de"
};

export const Translations = {
  [LOCALE.EN]: english,
  [LOCALE.DE]: german
};

const DEFAULT_LOCALE = "en";
const localeCacheKey = "__APP__locale";
let localeChangeListener;

export function registerLocaleChangeListener(listener) {
  localeChangeListener = listener;
}

export let selectedLocale =
  localStorage.getItem(localeCacheKey) || DEFAULT_LOCALE;

/**
 *
 * @param {LOCALE} locale
 */
export function updateLocale(locale) {
  selectedLocale = locale;
  localStorage.setItem(localeCacheKey, locale);

  if (localeChangeListener) {
    localeChangeListener(locale);
  }
}

/**
 *
 * @param {string} message
 * @return {string}
 */
export function translate(message) {
  if (!selectedLocale || !Translations[selectedLocale]) {
    throw new Error("Invalid locale: " + selectedLocale);
  }

  return Translations[selectedLocale][message] || message;
}
