import type { Emittable } from '@kdu-i18n/shared'

export interface KduI18nRecord {
  id: number
  i18n: unknown // TODO:
  version: string
  types: Record<string, string | Symbol> // TODO
}

export const KduI18nDevToolsHooks = {
  I18nInit: 'i18n:init',
  FunctionTranslate: 'function:translate'
} as const

export type AdditionalPayloads = {
  meta?: Record<string, unknown>
}

export type KduI18nDevToolsHooks = typeof KduI18nDevToolsHooks[keyof typeof KduI18nDevToolsHooks]

export type KduI18nDevToolsHookPayloads = {
  [KduI18nDevToolsHooks.I18nInit]: {
    timestamp: number
    i18n: unknown // TODO:
    version: string
  } & AdditionalPayloads
  [KduI18nDevToolsHooks.FunctionTranslate]: {
    timestamp: number
    message: string | number
    key: string
    locale: string
    format?: string
  } & AdditionalPayloads
}

export type KduI18nDevToolsEmitterHooks = {
  [KduI18nDevToolsHooks.I18nInit]: KduI18nDevToolsHookPayloads[typeof KduI18nDevToolsHooks.I18nInit]
  [KduI18nDevToolsHooks.FunctionTranslate]: KduI18nDevToolsHookPayloads[typeof KduI18nDevToolsHooks.FunctionTranslate]
}

export type KduI18nDevToolsEmitter = Emittable<KduI18nDevToolsEmitterHooks>
