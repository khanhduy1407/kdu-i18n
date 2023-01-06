declare type $npm$Kdu$Dictionaly<T> = { [key: string]: T }

declare type Util = {
  extend: (to: Object, from: ?Object) => Object,
  hasOwn: (obj: Object, key: string) => boolean,
  isPlainObject: (obj: any) => boolean,
  isObject: (obj: mixed) => boolean,
}

declare type Config = {
  optionMergeStrategies: $npm$Kdu$Dictionaly<Function>,
  silent: boolean,
  productionTip: boolean,
  performance: boolean,
  devtools: boolean,
  errorHandler: ?(err: Error, vm: Kdu, info: string) => void,
  ignoredElements: Array<string>,
  keyCodes: $npm$Kdu$Dictionaly<number>,
  isReservedTag: (x?: string) => boolean,
  parsePlatformTagName: (x: string) => string,
  isUnknownElement: (x?: string) => boolean,
  getTagNamespace: (x?: string) => string | void,
  mustUseProp: (tag: string, type: ?string, name: string) => boolean,
}

declare interface Kdu {
  static config: Config,
  static util: Util,
  static version: string,
}
