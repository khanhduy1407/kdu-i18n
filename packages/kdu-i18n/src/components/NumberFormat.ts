import { useI18n } from '../i18n'
import { NumberPartsSymbol } from '../composer'
import { renderFormatter } from './formatRenderer'
import { baseFormatProps } from './base'
import { assign } from '@kdu-i18n/shared'

import type { SetupContext, RenderFunction } from 'kdu'
import type { NumberOptions } from '@kdu-i18n/core-base'
import type { Composer, ComposerInternal } from '../composer'
import type { FormattableProps } from './formatRenderer'

/**
 * NumberFormat Component Props
 *
 * @KduI18nComponent
 */
export type NumberFormatProps = FormattableProps<
  number,
  Intl.NumberFormatOptions
>

const NUMBER_FORMAT_KEYS = [
  'localeMatcher',
  'style',
  'unit',
  'unitDisplay',
  'currency',
  'currencyDisplay',
  'useGrouping',
  'numberingSystem',
  'minimumIntegerDigits',
  'minimumFractionDigits',
  'maximumFractionDigits',
  'minimumSignificantDigits',
  'maximumSignificantDigits',
  'notation',
  'formatMatcher'
]

/**
 * Number Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @KduI18nSee [FormattableProps](component#formattableprops)
 * @KduI18nSee [BaseFormatProps](component#baseformatprops)
 * @KduI18nSee [Custom Formatting](../guide/essentials/number#custom-formatting)
 *
 * @KduI18nDanger
 * Not supported IE, due to no support `Intl.NumberFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-numberformat)
 *
 * @KduI18nComponent
 */
export const NumberFormat = {
  /* eslint-disable */
  name: 'i18n-n',
  props: assign(
    {
      value: {
        type: Number,
        required: true
      },
      format: {
        type: [String, Object]
      }
    },
    baseFormatProps
  ),
  /* eslint-enable */
  setup(props: NumberFormatProps, context: SetupContext): RenderFunction {
    const i18n =
      props.i18n ||
      (useI18n({ useScope: 'parent', __useComponent: true }) as Composer &
        ComposerInternal)

    return renderFormatter<
      FormattableProps<number, Intl.NumberFormatOptions>,
      number,
      Intl.NumberFormatOptions,
      NumberOptions,
      Intl.NumberFormatPart
    >(props, context, NUMBER_FORMAT_KEYS, (...args: unknown[]) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (i18n as any)[NumberPartsSymbol](...args)
    )
  }
}
