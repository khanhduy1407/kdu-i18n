/* @flow */

import { warn, isPlainObject, looseEqual } from './util'

export function bind (el: any, binding: Object, knode: any): void {
  if (!assert(el, knode)) { return }

  t(el, binding, knode)
}

export function update (el: any, binding: Object, knode: any, oldKNode: any): void {
  if (!assert(el, knode)) { return }

  if (localeEqual(el, knode) && looseEqual(binding.value, binding.oldValue)) { return }

  t(el, binding, knode)
}

export function unbind (el: any, binding: Object, knode: any, oldKNode: any): void {
  if (!assert(el, knode)) { return }

  el.textContent = ''
  el._kt = undefined
  delete el['_kt']
  el._locale = undefined
  delete el['_locale']
}

function assert (el: any, knode: any): boolean {
  const vm: any = knode.context
  if (!vm) {
    warn('not exist Kdu instance in KNode context')
    return false
  }

  if (!vm.$i18n) {
    warn('not exist KduI18n instance in Kdu instance')
    return false
  }

  return true
}

function localeEqual (el: any, knode: any): boolean {
  const vm: any = knode.context
  return el._locale === vm.$i18n.locale
}

function t (el: any, binding: Object, knode: any): void {
  const value: any = binding.value

  const { path, locale, args, choice } = parseValue(value)
  if (!path && !locale && !args) {
    warn('not support value type')
    return
  }

  if (!path) {
    warn('required `path` in k-t directive')
    return
  }

  const vm: any = knode.context
  if (choice) {
    el._kt = el.textContent = vm.$i18n.tc(path, choice, ...makeParams(locale, args))
  } else {
    el._kt = el.textContent = vm.$i18n.t(path, ...makeParams(locale, args))
  }
  el._locale = vm.$i18n.locale
}

function parseValue (value: any): Object {
  let path: ?string
  let locale: ?Locale
  let args: any
  let choice: ?number

  if (typeof value === 'string') {
    path = value
  } else if (isPlainObject(value)) {
    path = value.path
    locale = value.locale
    args = value.args
    choice = value.choice
  }

  return { path, locale, args, choice }
}

function makeParams (locale: Locale, args: any): Array<any> {
  const params: Array<any> = []

  locale && params.push(locale)
  if (args && (Array.isArray(args) || isPlainObject(args))) {
    params.push(args)
  }

  return params
}
