import { getGlobalThis } from '@kdu-i18n/shared'

export * from '@kdu-i18n/message-resolver'
export * from '@kdu-i18n/runtime'
export {
  CompileError,
  CompileErrorCodes,
  createCompileError
} from '@kdu-i18n/message-compiler'
export * from './context'
export * from './compile'
export * from './translate'
export * from './datetime'
export * from './number'
export { getWarnMessage, CoreWarnCodes } from './warnings'
export { CoreError, CoreErrorCodes, createCoreError } from './errors'
export * from './types'
export * from './devtools'

if (__ESM_BUNDLER__ && !__TEST__) {
  if (typeof __FEATURE_PROD_KDU_I18N_DEVTOOLS__ !== 'boolean') {
    getGlobalThis().__KDU_I18N_PROD_DEVTOOLS__ = false
  }
}
