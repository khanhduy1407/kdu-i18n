import { useI18n } from '../i18n'
import { DatetimePartsSymbol } from '../composer'
import { renderFormatter } from './formatRenderer'
import { baseFormatProps } from './base'
import { assign } from '@kdu-i18n/shared'

import type { RenderFunction, SetupContext } from 'kdu'
import type { DateTimeOptions } from '@kdu-i18n/core-base'
import type { Composer, ComposerInternal } from '../composer'
import type { FormattableProps } from './formatRenderer'

/**
 * DatetimeFormat Component Props
 *
 * @KduI18nComponent
 */
export type DatetimeFormatProps = FormattableProps<
  number | Date,
  Intl.DateTimeFormatOptions
>

const DATETIME_FORMAT_KEYS = [
  'dateStyle',
  'timeStyle',
  'fractionalSecondDigits',
  'calendar',
  'dayPeriod',
  'numberingSystem',
  'localeMatcher',
  'timeZone',
  'hour12',
  'hourCycle',
  'formatMatcher',
  'weekday',
  'era',
  'year',
  'month',
  'day',
  'hour',
  'minute',
  'second',
  'timeZoneName'
]

/**
 * Datetime Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @KduI18nSee [FormattableProps](component#formattableprops)
 * @KduI18nSee [BaseFormatProps](component#baseformatprops)
 * @KduI18nSee [Custom Formatting](../guide/essentials/datetime#custom-formatting)
 *
 * @KduI18nDanger
 * Not supported IE, due to no support `Intl.DateTimeFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-datetimeformat)
 *
 * @KduI18nComponent
 */
export const DatetimeFormat = {
  /* eslint-disable */
  name: 'i18n-d',
  props: assign(
    {
      value: {
        type: [Number, Date],
        required: true
      },
      format: {
        type: [String, Object]
      }
    },
    baseFormatProps
  ),
  /* eslint-enable */
  setup(props: DatetimeFormatProps, context: SetupContext): RenderFunction {
    const i18n =
      props.i18n ||
      (useI18n({ useScope: 'parent', __useComponent: true }) as Composer &
        ComposerInternal)

    return renderFormatter<
      FormattableProps<number | Date, Intl.DateTimeFormatOptions>,
      number | Date,
      Intl.DateTimeFormatOptions,
      DateTimeOptions,
      Intl.DateTimeFormatPart
    >(props, context, DATETIME_FORMAT_KEYS, (...args: unknown[]) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (i18n as any)[DatetimePartsSymbol](...args)
    )
  }
}
