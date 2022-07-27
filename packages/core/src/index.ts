import { registerMessageCompiler, compileToFunction } from '@kdu-i18n/core-base'

// register message compiler at @kdu-i18n/core
registerMessageCompiler(compileToFunction)

export * from '@kdu-i18n/core-base'
