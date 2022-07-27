import { h, Fragment } from 'kdu'
import { isString, isObject, isArray, assign } from '@kdu-i18n/shared'

import type {
  RenderFunction,
  SetupContext,
  KNodeChild,
  KNodeArrayChildren
} from 'kdu'
import type { NumberOptions, DateTimeOptions } from '@kdu-i18n/core-base'
import type { BaseFormatProps } from './base'

/**
 * Formattable Props
 *
 * @remarks
 * The props used in DatetimeFormat, or NumberFormat component
 *
 * @KduI18nComponent
 */
export interface FormattableProps<Value, Format> extends BaseFormatProps {
  /**
   * @remarks
   * The value specified for the target component
   */
  value: Value
  /**
   * @remarks
   * The format to use in the target component.
   *
   * Specify the format key string or the format as defined by the Intl API in ECMA 402.
   */
  format?: string | Format
}

type FormatOptions = NumberOptions | DateTimeOptions
type FormatPartReturn = Intl.NumberFormatPart | Intl.DateTimeFormatPart
type FormatOverrideOptions =
  | Intl.NumberFormatOptions
  | Intl.DateTimeFormatOptions

export function renderFormatter<
  Props extends FormattableProps<Value, Format>,
  Value,
  Format extends FormatOverrideOptions,
  Arg extends FormatOptions,
  Return extends FormatPartReturn
>(
  props: Props,
  context: SetupContext,
  slotKeys: string[],
  partFormatter: (...args: unknown[]) => string | Return[]
): RenderFunction {
  const { slots, attrs } = context

  return (): KNodeChild => {
    const options = { part: true } as Arg
    let overrides = {} as FormatOverrideOptions

    if (props.locale) {
      options.locale = props.locale
    }

    if (isString(props.format)) {
      options.key = props.format
    } else if (isObject(props.format)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (isString((props.format as any).key)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options.key = (props.format as any).key
      }
      // Filter out number format options only
      overrides = Object.keys(props.format).reduce((options, prop) => {
        return slotKeys.includes(prop)
          ? assign({}, options, { [prop]: (props.format as any)[prop] }) // eslint-disable-line @typescript-eslint/no-explicit-any
          : options
      }, {})
    }

    const parts = partFormatter(...[props.value, options, overrides])
    let children = [options.key] as KNodeArrayChildren
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type]
        return slot
          ? slot({ [part.type]: part.value, index, parts })
          : [part.value]
      })
    } else if (isString(parts)) {
      children = [parts]
    }

    const assignedAttrs = assign({}, attrs)
    // prettier-ignore
    return isString(props.tag)
      ? h(props.tag, assignedAttrs, children)
      : isObject(props.tag)
        ? h(props.tag, assignedAttrs, children)
        : h(Fragment, assignedAttrs, children)
  }
}
