import type { Emittable } from '@kdu-i18n/shared'
import type { Path, PathValue } from '@kdu-i18n/message-resolver'
import type { Locale, CoreMissingType } from '@kdu-i18n/runtime'

export const enum KduDevToolsIDs {
  PLUGIN = 'kdu-devtools-plugin-kdu-i18n',
  CUSTOM_INSPECTOR = 'kdu-i18n-resource-inspector',
  TIMELINE = 'kdu-i18n-timeline'
}

export const KduDevToolsLabels: Record<string, string> = {
  [KduDevToolsIDs.PLUGIN]: 'Kdu I18n devtools',
  [KduDevToolsIDs.CUSTOM_INSPECTOR]: 'I18n Resources',
  [KduDevToolsIDs.TIMELINE]: 'Kdu I18n'
}

export const KduDevToolsPlaceholders: Record<string, string> = {
  [KduDevToolsIDs.CUSTOM_INSPECTOR]: 'Search for scopes ...'
}

export const KduDevToolsTimelineColors: Record<string, number> = {
  [KduDevToolsIDs.TIMELINE]: 0xffcd19
}

export const enum KduDevToolsTimelineEvents {
  COMPILE_ERROR = 'compile-error',
  MISSING = 'missing',
  FALBACK = 'fallback',
  MESSAGE_RESOLVE = 'message-resolve',
  MESSAGE_COMPILATION = 'message-compilation',
  MESSAGE_EVALUATION = 'message-evaluation'
}

export type KduDevToolsTimelineEventPayloads = {
  [KduDevToolsTimelineEvents.COMPILE_ERROR]: {
    message: PathValue
    error: string
    start?: number
    end?: number
    groupId?: string
  }
  [KduDevToolsTimelineEvents.MISSING]: {
    locale: Locale
    key: Path
    type: CoreMissingType
    groupId?: string
  }
  [KduDevToolsTimelineEvents.FALBACK]: {
    key: Path
    type: CoreMissingType
    from?: Locale
    to: Locale | 'global'
    groupId?: string
  }
  [KduDevToolsTimelineEvents.MESSAGE_RESOLVE]: {
    type: KduDevToolsTimelineEvents.MESSAGE_RESOLVE
    key: Path
    message: PathValue
    time: number
    groupId?: string
  }
  [KduDevToolsTimelineEvents.MESSAGE_COMPILATION]: {
    type: KduDevToolsTimelineEvents.MESSAGE_COMPILATION
    message: PathValue
    time: number
    groupId?: string
  }
  [KduDevToolsTimelineEvents.MESSAGE_EVALUATION]: {
    type: KduDevToolsTimelineEvents.MESSAGE_EVALUATION
    value: unknown
    time: number
    groupId?: string
  }
}

export type KduDevToolsEmitterEvents = {
  [KduDevToolsTimelineEvents.COMPILE_ERROR]: KduDevToolsTimelineEventPayloads[KduDevToolsTimelineEvents.COMPILE_ERROR]
  [KduDevToolsTimelineEvents.MISSING]: KduDevToolsTimelineEventPayloads[KduDevToolsTimelineEvents.MISSING]
  [KduDevToolsTimelineEvents.FALBACK]: KduDevToolsTimelineEventPayloads[KduDevToolsTimelineEvents.FALBACK]
  [KduDevToolsTimelineEvents.MESSAGE_RESOLVE]: KduDevToolsTimelineEventPayloads[KduDevToolsTimelineEvents.MESSAGE_RESOLVE]
  [KduDevToolsTimelineEvents.MESSAGE_COMPILATION]: KduDevToolsTimelineEventPayloads[KduDevToolsTimelineEvents.MESSAGE_COMPILATION]
  [KduDevToolsTimelineEvents.MESSAGE_EVALUATION]: KduDevToolsTimelineEventPayloads[KduDevToolsTimelineEvents.MESSAGE_EVALUATION]
}
export type KduDevToolsEmitter = Emittable<KduDevToolsEmitterEvents>
