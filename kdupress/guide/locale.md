# Locale changing

Normally, using the root Kdu instance as the starting point, all child components are localized using the `locale` property of the `KduI18n` class as a reference.

Sometimes you might want to dynamically change the locale. In that case you can change the value of the `locale` property of the `KduI18n` instance.


```js
const i18n = new KduI18n({
  locale: 'ja', // set locale
  ...
})

// create root Kdu instance
new Kdu({
  i18n,
  ...
}).$mount('#app')

// change other locale
i18n.locale = 'en'
```

Each component contains a `KduI18n` instance referenced as the `$i18n` property that can also be used to change the locale.

Example:

```html
<template>
  <div class="locale-changer">
    <select k-model="$i18n.locale">
      <option k-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['ja', 'en'] }
  }
}
</script>
```

:::warning Notice
:warning: Locale changing is ignored for components that use `sync: false`.
:::

:::warning Component vs. root scope
:warning: Changing `$i18n.locale` inside a component does not update the root locale.
If you rely on the root locale, for example when using [root fallbacks](./fallback.html), use `$root.$i18n.locale` instead of `$i18n.locale`.
:::
