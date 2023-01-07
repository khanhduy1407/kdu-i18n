/* @flow */

import { warn, isString, isPlainObject, looseEqual } from './util'

export function bind (el: any, binding: Object, knode: any): void {
  if (!assert(el, knode)) { return }

  t(el, binding, knode)
}

export function update (el: any, binding: Object, knode: any, oldKNode: any): void {
  if (!assert(el, knode)) { return }

  const i18n: any = knode.context.$i18n
  if (localeEqual(el, knode) &&
    (looseEqual(binding.value, binding.oldValue) &&
     looseEqual(el._localeMessage, i18n.getLocaleMessage(i18n.locale)))) { return }

  t(el, binding, knode)
}

export function unbind (el: any, binding: Object, knode: any, oldKNode: any): void {
  const vm: any = knode.context
  if (!vm) {
    warn('Kdu instance does not exists in KNode context')
    return
  }

  const i18n: any = knode.context.$i18n || {}
  if (!binding.modifiers.preserve && !i18n.preserveDirectiveContent) {
    el.textContent = ''
  }
  el._kt = undefined
  delete el['_kt']
  el._locale = undefined
  delete el['_locale']
  el._localeMessage = undefined
  delete el['_localeMessage']
}

function assert (el: any, knode: any): boolean {
  const vm: any = knode.context
  if (!vm) {
    warn('Kdu instance does not exists in KNode context')
    return false
  }

  if (!vm.$i18n) {
    warn('KduI18n instance does not exists in Kdu instance')
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
    warn('value type not supported')
    return
  }

  if (!path) {
    warn('`path` is required in k-t directive')
    return
  }

  const vm: any = knode.context
  if (choice != null) {
    el._kt = el.textContent = vm.$i18n.tc(path, choice, ...makeParams(locale, args))
  } else {
    el._kt = el.textContent = vm.$i18n.t(path, ...makeParams(locale, args))
  }
  el._locale = vm.$i18n.locale
  el._localeMessage = vm.$i18n.getLocaleMessage(vm.$i18n.locale)
}

function parseValue (value: any): Object {
  let path: ?string
  let locale: ?Locale
  let args: any
  let choice: ?number

  if (isString(value)) {
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
