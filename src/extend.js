/* @flow */

export default function extend (Kdu: any): void {
  // $FlowFixMe
  Object.defineProperty(Kdu.prototype, '$t', {
    get () {
      return (key: Path, ...values: any): TranslateResult => {
        const i18n = this.$i18n
        return i18n._t(key, i18n.locale, i18n._getMessages(), this, ...values)
      }
    }
  })
  // $FlowFixMe
  Object.defineProperty(Kdu.prototype, '$tc', {
    get () {
      return (key: Path, choice?: number, ...values: any): TranslateResult => {
        const i18n = this.$i18n
        return i18n._tc(key, i18n.locale, i18n._getMessages(), this, choice, ...values)
      }
    }
  })
  // $FlowFixMe
  Object.defineProperty(Kdu.prototype, '$te', {
    get () {
      return (key: Path, locale?: Locale): boolean => {
        const i18n = this.$i18n
        return i18n._te(key, i18n.locale, i18n._getMessages(), locale)
      }
    }
  })
  // $FlowFixMe
  Object.defineProperty(Kdu.prototype, '$d', {
    get () {
      return (value: number | Date, ...args: any): DateTimeFormatResult => {
        return this.$i18n.d(value, ...args)
      }
    }
  })
  // $FlowFixMe
  Object.defineProperty(Kdu.prototype, '$n', {
    get () {
      return (value: number, ...args: any): NumberFormatResult => {
        return this.$i18n.n(value, ...args)
      }
    }
  })
}
