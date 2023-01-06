import { warn } from './util'
import extend from './extend'
import mixin from './mixin'
import component from './component'
import { bind, update, unbind } from './directive'

export let Kdu

export function install (_Kdu) {
  Kdu = _Kdu

  const version = (Kdu.version && Number(Kdu.version.split('.')[0])) || -1
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && install.installed) {
    warn('already installed.')
    return
  }
  install.installed = true

  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && version < 2) {
    warn(`kdu-i18n (${install.version}) need to use Kdu 2.0 or later (Kdu: ${Kdu.version}).`)
    return
  }

  Object.defineProperty(Kdu.prototype, '$i18n', {
    get () { return this._i18n }
  })

  extend(Kdu)
  Kdu.mixin(mixin)
  Kdu.directive('t', { bind, update, unbind })
  Kdu.component(component.name, component)

  // use object-based merge strategy
  const strats = Kdu.config.optionMergeStrategies
  strats.i18n = strats.methods
}
