import { getGlobalThis } from '@kdu-i18n/shared'
import { setDevToolsHook } from '@kdu-i18n/core-base'
import { initDev, initFeatureFlags } from './misc'

export {
  Path,
  PathValue,
  NamedValue,
  Locale,
  FallbackLocale,
  LocaleMessageValue,
  LocaleMessageDictionary,
  LocaleMessageArray,
  LocaleMessages,
  NumberFormat as IntlNumberFormat,
  DateTimeFormat as IntlDateTimeFormat,
  DateTimeFormats as IntlDateTimeFormats,
  NumberFormats as IntlNumberFormats,
  LocaleMatcher as IntlLocaleMatcher,
  FormatMatcher as IntlFormatMatcher,
  MessageFunction,
  MessageFunctions,
  PluralizationRule,
  LinkedModifiers,
  TranslateOptions,
  DateTimeOptions,
  NumberOptions,
  PostTranslationHandler
} from '@kdu-i18n/core-base'
export {
  KduMessageType,
  MissingHandler,
  ComposerOptions,
  Composer,
  CustomBlocks
} from './composer'
export {
  TranslateResult,
  Choice,
  LocaleMessageObject,
  PluralizationRulesMap,
  WarnHtmlInMessageLevel,
  DateTimeFormatResult,
  NumberFormatResult,
  Formatter,
  KduI18nOptions,
  KduI18n
} from './legacy'
export {
  createI18n,
  useI18n,
  I18nOptions,
  I18nAdditionalOptions,
  I18n,
  I18nMode,
  I18nScope,
  ComposerAdditionalOptions,
  UseI18nOptions,
  ExportedGlobalComposer
} from './i18n'
export {
  Translation,
  TranslationProps,
  NumberFormat,
  NumberFormatProps,
  DatetimeFormat,
  DatetimeFormatProps,
  FormattableProps,
  BaseFormatProps,
  ComponetI18nScope
} from './components'
export { kTDirective, TranslationDirective } from './directive'
export { I18nPluginOptions } from './plugin'
export { VERSION } from './misc'

if (__ESM_BUNDLER__ && !__TEST__) {
  initFeatureFlags()
}

// NOTE: experimental !!
if (__DEV__ || __FEATURE_PROD_KDU_I18N_DEVTOOLS__) {
  const target = getGlobalThis()
  target.__KDU_I18N__ = true
  setDevToolsHook(target.__KDU_I18N_DEVTOOLS_GLOBAL_HOOK__)
}

if (__DEV__) {
  initDev()
}
