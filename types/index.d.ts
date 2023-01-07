import Kdu, { PluginFunction } from 'kdu';

declare namespace KduI18n {
  type Path = string;
  type Locale = string;
  type FallbackLocale = string | string[] | false | { [locale: string]: string[] }
  type Values = any[] | { [key: string]: any };
  type Choice = number;
  type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;
  interface LocaleMessageObject { [key: string]: LocaleMessage; }
  interface LocaleMessageArray { [index: number]: LocaleMessage; }
  interface LocaleMessages { [key: string]: LocaleMessageObject; }
  type TranslateResult = string | LocaleMessages;

  type LocaleMatcher = 'lookup' | 'best-fit';
  type FormatMatcher = 'basic' | 'best-fit';

  type DateTimeHumanReadable = 'long' | 'short' | 'narrow';
  type DateTimeDigital = 'numeric' | '2-digit';

  interface SpecificDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
    year?: DateTimeDigital;
    month?: DateTimeDigital | DateTimeHumanReadable;
    day?: DateTimeDigital;
    hour?: DateTimeDigital;
    minute?: DateTimeDigital;
    second?: DateTimeDigital;
    weekday?: DateTimeHumanReadable;
    era?: DateTimeHumanReadable;
    timeZoneName?: 'long' | 'short';
    localeMatcher?: LocaleMatcher;
    formatMatcher?: FormatMatcher;
  }

  type DateTimeFormatOptions = Intl.DateTimeFormatOptions | SpecificDateTimeFormatOptions;

  interface DateTimeFormat { [key: string]: DateTimeFormatOptions; }
  interface DateTimeFormats { [locale: string]: DateTimeFormat; }
  type DateTimeFormatResult = string;

  type CurrencyDisplay = 'symbol' | 'code' | 'name';

  interface SpecificNumberFormatOptions extends Intl.NumberFormatOptions {
    style?: 'decimal' | 'percent';
    currency?: string;
    currencyDisplay?: CurrencyDisplay;
    localeMatcher?: LocaleMatcher;
    formatMatcher?: FormatMatcher;
  }

  interface CurrencyNumberFormatOptions extends Intl.NumberFormatOptions {
    style: 'currency';
    currency: string; // Obligatory if style is 'currency'
    currencyDisplay?: CurrencyDisplay;
    localeMatcher?: LocaleMatcher;
    formatMatcher?: FormatMatcher;
  }

  type NumberFormatOptions = Intl.NumberFormatOptions | SpecificNumberFormatOptions | CurrencyNumberFormatOptions;

  interface NumberFormat { [key: string]: NumberFormatOptions; }
  interface NumberFormats { [locale: string]: NumberFormat; }
  type NumberFormatResult = string;
  type PluralizationRulesMap = {
    /**
     * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
     * @param choicesLength {number} an overall amount of available choices
     * @returns a final choice index
    */
    [lang: string]: (choice: number, choicesLength: number) => number;
  };
  type Modifiers = { [key: string]: (str : string) => string };

  type FormattedNumberPartType = 'currency' | 'decimal' | 'fraction' | 'group' | 'infinity' | 'integer' | 'literal' | 'minusSign' | 'nan' | 'plusSign' | 'percentSign';

  type WarnHtmlInMessageLevel = 'off' | 'warn' | 'error';

  interface FormattedNumberPart {
    type: FormattedNumberPartType;
    value: string;
  }
  interface NumberFormatToPartsResult { [index: number]: FormattedNumberPart; }

  interface Formatter {
    interpolate(message: string, values: Values | undefined, path: string): (any[] | null);
  }

  type MissingHandler = (locale: Locale, key: Path, vm: Kdu | null, values: any) => string | void;
  type PostTranslationHandler = (str: string, key?: string) => string;

  interface IntlAvailability {
    dateTimeFormat: boolean;
    numberFormat: boolean;
  }

  // tslint:disable-next-line:interface-name
  interface I18nOptions {
    locale?: Locale;
    fallbackLocale?: FallbackLocale;
    messages?: LocaleMessages;
    dateTimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    formatter?: Formatter;
    modifiers?: Modifiers,
    missing?: MissingHandler;
    fallbackRoot?: boolean;
    formatFallbackMessages?: boolean;
    sync?: boolean;
    silentTranslationWarn?: boolean | RegExp;
    silentFallbackWarn?: boolean | RegExp;
    preserveDirectiveContent?: boolean;
    pluralizationRules?: PluralizationRulesMap;
    warnHtmlInMessage?: WarnHtmlInMessageLevel;
    sharedMessages?: LocaleMessages;
    postTranslation?: PostTranslationHandler;
  }
}

export type Path = KduI18n.Path;
export type Locale = KduI18n.Locale;
export type FallbackLocale = KduI18n.FallbackLocale;
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
export type NumberFormatToPartsResult = KduI18n.NumberFormatToPartsResult;
export type WarnHtmlInMessageLevel = KduI18n.WarnHtmlInMessageLevel;
export type Formatter = KduI18n.Formatter;
export type MissingHandler = KduI18n.MissingHandler;
export type PostTranslationHandler = KduI18n.PostTranslationHandler;
export type IntlAvailability = KduI18n.IntlAvailability;
export type I18nOptions = KduI18n.I18nOptions;

export declare interface IKduI18n {
  readonly messages: KduI18n.LocaleMessages;
  readonly dateTimeFormats: KduI18n.DateTimeFormats;
  readonly numberFormats: KduI18n.NumberFormats;

  locale: KduI18n.Locale;
  fallbackLocale: KduI18n.FallbackLocale;
  missing: KduI18n.MissingHandler;
  formatter: KduI18n.Formatter;
  formatFallbackMessages: boolean;
  silentTranslationWarn: boolean | RegExp;
  silentFallbackWarn: boolean | RegExp;
  preserveDirectiveContent: boolean;
  pluralizationRules: KduI18n.PluralizationRulesMap;
  warnHtmlInMessage: KduI18n.WarnHtmlInMessageLevel;
}

declare class KduI18n {
  constructor(options?: KduI18n.I18nOptions)

  readonly messages: KduI18n.LocaleMessages;
  readonly dateTimeFormats: KduI18n.DateTimeFormats;
  readonly numberFormats: KduI18n.NumberFormats;
  readonly availableLocales: KduI18n.Locale[];

  locale: KduI18n.Locale;
  fallbackLocale: KduI18n.FallbackLocale;
  missing: KduI18n.MissingHandler;
  formatter: KduI18n.Formatter;
  formatFallbackMessages: boolean;
  silentTranslationWarn: boolean | RegExp;
  silentFallbackWarn: boolean | RegExp;
  preserveDirectiveContent: boolean;
  pluralizationRules: KduI18n.PluralizationRulesMap;
  warnHtmlInMessage: KduI18n.WarnHtmlInMessageLevel;
  postTranslation: KduI18n.PostTranslationHandler;

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

  /**
   * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
   * @param choicesLength {number} an overall amount of available choices
   * @returns a final choice index
  */
  getChoiceIndex: (choice: number, choicesLength: number) => number;

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
      sharedMessages?: KduI18n.LocaleMessages;
    };
  }
}

export default KduI18n;
