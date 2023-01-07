import { warn } from './util'
import extend from './extend'
import mixin from './mixin'
import interpolationComponent from './components/interpolation'
import numberComponent from './components/number'
import { bind, update, unbind } from './directive'

export let Kdu

export function install (_Kdu) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && install.installed && _Kdu === Kdu) {
    warn('already installed.')
    return
  }
  install.installed = true

  Kdu = _Kdu

  const version = (Kdu.version && Number(Kdu.version.split('.')[0])) || -1
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && version < 2) {
    warn(`kdu-i18n (${install.version}) need to use Kdu 2.0 or later (Kdu: ${Kdu.version}).`)
    return
  }

  extend(Kdu)
  Kdu.mixin(mixin)
  Kdu.directive('t', { bind, update, unbind })
  Kdu.component(interpolationComponent.name, interpolationComponent)
  Kdu.component(numberComponent.name, numberComponent)

  // use simple mergeStrategies to prevent i18n instance lose '__proto__'
  const strats = Kdu.config.optionMergeStrategies
  strats.i18n = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  }
}
