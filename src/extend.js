/* @flow */

export default function extend (Kdu: any): void {
  if (!Kdu.prototype.hasOwnProperty('$i18n')) {
    // $FlowFixMe
    Object.defineProperty(Kdu.prototype, '$i18n', {
      get () { return this._i18n }
    })
  }

  Kdu.prototype.$t = function (key: Path, ...values: any): TranslateResult {
    const i18n = this.$i18n
    return i18n._t(key, i18n.locale, i18n._getMessages(), this, ...values)
  }

  Kdu.prototype.$tc = function (key: Path, choice?: number, ...values: any): TranslateResult {
    const i18n = this.$i18n
    return i18n._tc(key, i18n.locale, i18n._getMessages(), this, choice, ...values)
  }

  Kdu.prototype.$te = function (key: Path, locale?: Locale): boolean {
    const i18n = this.$i18n
    return i18n._te(key, i18n.locale, i18n._getMessages(), locale)
  }

  Kdu.prototype.$d = function (value: number | Date, ...args: any): DateTimeFormatResult {
    return this.$i18n.d(value, ...args)
  }

  Kdu.prototype.$n = function (value: number, ...args: any): NumberFormatResult {
    return this.$i18n.n(value, ...args)
  }
}
