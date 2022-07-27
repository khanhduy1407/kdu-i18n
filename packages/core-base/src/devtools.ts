import { KduI18nDevToolsHooks } from '@kdu-i18n/devtools-if'

import type {
  KduI18nDevToolsEmitter,
  KduI18nDevToolsHookPayloads
} from '@kdu-i18n/devtools-if'

let devtools: KduI18nDevToolsEmitter | null = null

export function setDevToolsHook(hook: KduI18nDevToolsEmitter | null): void {
  devtools = hook
}

export function getDevToolsHook(): KduI18nDevToolsEmitter | null {
  return devtools
}

export function initI18nDevTools(
  i18n: unknown,
  version: string,
  meta?: Record<string, unknown>
): void {
  // TODO: queue if devtools is undefined
  devtools &&
    devtools.emit(KduI18nDevToolsHooks.I18nInit, {
      timestamp: Date.now(),
      i18n,
      version,
      meta
    })
}

export const translateDevTools = /* #__PURE__*/ createDevToolsHook(
  KduI18nDevToolsHooks.FunctionTranslate
)

function createDevToolsHook(hook: KduI18nDevToolsHooks) {
  return (payloads: KduI18nDevToolsHookPayloads[KduI18nDevToolsHooks]) =>
    devtools && devtools.emit(hook, payloads)
}
