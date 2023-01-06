import Kdu, { PluginFunction } from 'kdu';

declare namespace KduI18n {
  type Path = string;
  type Locale = string;
  type Values = any[] | { [key: string]: any };
  type Choice = number;
  type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;
  interface LocaleMessageObject { [key: string]: LocaleMessage; }
  interface LocaleMessageArray { [index: number]: LocaleMessage; }
  interface LocaleMessages { [key: string]: LocaleMessageObject; }
  type TranslateResult = string | LocaleMessages;
  interface DateTimeFormatOptions {
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    minute?: string;
    second?: string;
    weekday?: string;
    hour12?: boolean;
    era?: string;
    timeZone?: string;
    timeZoneName?: string;
    localeMatcher?: string;
    formatMatcher?: string;
  }
  interface DateTimeFormat { [key: string]: DateTimeFormatOptions; }
  interface DateTimeFormats { [key: string]: DateTimeFormat; }
  type DateTimeFormatResult = string;
  interface NumberFormatOptions {
    style?: string;
    currency?: string;
    currencyDisplay?: string;
    useGrouping?: boolean;
    minimumIntegerDigits?: number;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    minimumSignificantDigits?: number;
    maximumSignificantDigits?: number;
    localeMatcher?: string;
    formatMatcher?: string;
  }
  interface NumberFormat { [key: string]: NumberFormatOptions; }
  interface NumberFormats { [key: string]: NumberFormat; }
  type NumberFormatResult = string;

  interface Formatter {
    interpolate(message: string, values?: Values): any[];
  }

  type MissingHandler = (locale: Locale, key: Path, vm?: Kdu) => string | void;

  interface IntlAvailability {
    dateTimeFormat: boolean;
    numberFormat: boolean;
  }

  // tslint:disable-next-line:interface-name
  interface I18nOptions {
    locale?: Locale;
    fallbackLocale?: Locale;
    messages?: LocaleMessages;
    dateTimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    formatter?: Formatter;
    missing?: MissingHandler;
    fallbackRoot?: boolean;
    sync?: boolean;
    silentTranslationWarn?: boolean;
  }
}

export type Path = KduI18n.Path;
export type Locale = KduI18n.Locale;
export type Values = KduI18n.Values;
export type Choice = KduI18n.Choice;
export type LocaleMessage = KduI18n.LocaleMessage;
export type LocaleMessageObject = KduI18n.LocaleMessageObject;
export type LocaleMessageArray = KduI18n.LocaleMessageArray;
export type LocaleMessages = KduI18n.LocaleMessages;
export type TranslateResult = KduI18n.TranslateResult;
export type DateTimeFormatOptions = KduI18n.DateTimeFormatOptions;
export type DateTimeFormat = KduI18n.DateTimeFormat;
export type DateTimeFormats = KduI18n.DateTimeFormats;
export type DateTimeFormatResult = KduI18n.DateTimeFormatResult;
export type NumberFormatOptions = KduI18n.NumberFormatOptions;
export type NumberFormat = KduI18n.NumberFormat;
export type NumberFormats = KduI18n.NumberFormats;
export type NumberFormatResult = KduI18n.NumberFormatResult;
export type Formatter = KduI18n.Formatter;
export type MissingHandler = KduI18n.MissingHandler;
export type IntlAvailability = KduI18n.IntlAvailability;
export type I18nOptions = KduI18n.I18nOptions;

export declare interface IKduI18n {
  readonly messages: KduI18n.LocaleMessages;
  readonly dateTimeFormats: KduI18n.DateTimeFormats;
  readonly numberFormats: KduI18n.NumberFormats;

  locale: KduI18n.Locale;
  fallbackLocale: KduI18n.Locale;
  missing: KduI18n.MissingHandler;
  formatter: KduI18n.Formatter;
  silentTranslationWarn: boolean;
}

declare class KduI18n {
  constructor(options?: KduI18n.I18nOptions)

  readonly messages: KduI18n.LocaleMessages;
  readonly dateTimeFormats: KduI18n.DateTimeFormats;
  readonly numberFormats: KduI18n.NumberFormats;

  locale: KduI18n.Locale;
  fallbackLocale: KduI18n.Locale;
  missing: KduI18n.MissingHandler;
  formatter: KduI18n.Formatter;
  silentTranslationWarn: boolean;

  t(key: KduI18n.Path, values?: KduI18n.Values): KduI18n.TranslateResult;
  t(key: KduI18n.Path, locale: KduI18n.Locale, values?: KduI18n.Values): KduI18n.TranslateResult;
  tc(key: KduI18n.Path, choice?: KduI18n.Choice, values?: KduI18n.Values): string;
  tc(key: KduI18n.Path, choice: KduI18n.Choice, locale: KduI18n.Locale, values?: KduI18n.Values): string;
  te(key: KduI18n.Path, locale?: KduI18n.Locale): boolean;
  d(value: number | Date, key?: KduI18n.Path, locale?: KduI18n.Locale): KduI18n.DateTimeFormatResult;
  d(value: number | Date, args?: { [key: string]: string }): KduI18n.DateTimeFormatResult;
  n(value: number, key?: KduI18n.Path, locale?: KduI18n.Locale): KduI18n.NumberFormatResult;
  n(value: number, args?: { [key: string]: string }): KduI18n.NumberFormatResult;

  getLocaleMessage(locale: KduI18n.Locale): KduI18n.LocaleMessageObject;
  setLocaleMessage(locale: KduI18n.Locale, message: KduI18n.LocaleMessageObject): void;
  mergeLocaleMessage(locale: KduI18n.Locale, message: KduI18n.LocaleMessageObject): void;

  getDateTimeFormat(locale: KduI18n.Locale): KduI18n.DateTimeFormat;
  setDateTimeFormat(locale: KduI18n.Locale, format: KduI18n.DateTimeFormat): void;
  mergeDateTimeFormat(locale: KduI18n.Locale, format: KduI18n.DateTimeFormat): void;

  getNumberFormat(locale: KduI18n.Locale): KduI18n.NumberFormat;
  setNumberFormat(locale: KduI18n.Locale, format: KduI18n.NumberFormat): void;
  mergeNumberFormat(locale: KduI18n.Locale, format: KduI18n.NumberFormat): void;

  static install: PluginFunction<never>;
  static version: string;
  static availabilities: KduI18n.IntlAvailability;
}

declare module 'kdu/types/kdu' {
  interface Kdu {
    readonly $i18n: KduI18n & IKduI18n;
    $t: typeof KduI18n.prototype.t;
    $tc: typeof KduI18n.prototype.tc;
    $te: typeof KduI18n.prototype.te;
    $d: typeof KduI18n.prototype.d;
    $n: typeof KduI18n.prototype.n;
  }
}

declare module 'kdu/types/options' {
  interface ComponentOptions<V extends Kdu> {
    i18n?: {
      messages?: KduI18n.LocaleMessages;
      dateTimeFormats?: KduI18n.DateTimeFormats;
      numberFormats?: KduI18n.NumberFormats;
    };
  }
}

export default KduI18n;
