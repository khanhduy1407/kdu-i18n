/** @KduI18nGeneral */
export type Locale = string

/** @KduI18nGeneral */
export type FallbackLocale =
  | Locale
  | Locale[]
  | { [locale in string]: Locale[] }
  | false

export type CoreMissingType = 'translate' | 'datetime format' | 'number format'
