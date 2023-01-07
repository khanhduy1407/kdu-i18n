# Custom directive localization

:::tip Support Version
:new: 7.3+
:::

You can translate not only with `k-t` custom directive, but also with the `$t`
method.

## String syntax

You can pass the keypath of locale messages with string syntax.

Javascript:

```js
new Kdu({
  i18n: new KduI18n({
    locale: 'en',
    messages: {
      en: { hello: 'hi there!' },
      ja: { hello: 'こんにちは！' }
    }
  }),
  data: { path: 'hello' }
}).$mount('#string-syntax')
```

Templates:

```html
<div id="string-syntax">
  <!-- string literal -->
  <p k-t="'hello'"></p>
  <!-- keypath binding via data -->
  <p k-t="path"></p>
</div>
```

Outputs:

```html
<div id="string-syntax">
  <p>hi there!</p>
  <p>hi there!</p>
</div>
```

## Object syntax

You can use object syntax.

Javascript:

```js
new Kdu({
  i18n: new KduI18n({
    locale: 'en',
    messages: {
      en: { hello: 'hi {name}!' },
      ja: { hello: 'こんにちは、{name}！' }
    }
  }),
  computed: {
    nickName () { return 'nkduy' }
  },
  data: { path: 'hello' }
}).$mount('#object-syntax')
```

Templates:

```html
<div id="object-syntax">
  <!-- literal -->
  <p k-t="{ path: 'hello', locale: 'ja', args: { name: 'nkduy' } }"></p>
  <!-- data binding via data -->
  <p k-t="{ path: path, args: { name: nickName } }"></p>
</div>
```

Outputs:

```html
<div id="object-syntax">
  <p>こんにちは、nkduy！</p>
  <p>hi nkduy!</p>
</div>
```

## Use with transitions

:::tip Support Version
:new: 8.7+
:::

When `k-t` directive is applied to an element inside [`<transition>` component](https://kdujs-v2.web.app/v2/api/#transition), you may notice that the translated message disappears during the transition. This behavior is related to the nature of the `<transition>` component implementation – all directives in the disappearing element inside the `<transition>` component will be destroyed **before the transition starts**. This behavior may result in content flickering on short animations, but is most noticeable on long transitions.

To make sure directive content stays un-touched during a transition, just add the [`.preserve` modifier](../api/#k-t) to the `k-t` directive definition.

Javascript:

```js
new Kdu({
  i18n: new KduI18n({
    locale: 'en',
    messages: {
      en: { preserve: 'with preserve' },
    }
  }),
  data: { toggle: true }
}).$mount('#in-transitions')
```

Templates:

```html
<div id="in-transitions">
  <transition name="fade">
    <span k-if="toggle" k-t.preserve="'preserve'"></span>
  </transition>
  <button @click="toggle = !toggle">Toggle</button>
</div>
```

It is also possible to set global settings on the `KduI18n` instance itself, which will affect all `k-t` directives without modifier.

Javascript:

```js
new Kdu({
  i18n: new KduI18n({
    locale: 'en',
    messages: {
      en: { preserve: 'with preserve' },
    },
    preserveDirectiveContent: true
  }),
  data: { toggle: true }
}).$mount('#in-transitions')
```

Templates:

```html
<div id="in-transitions">
  <transition name="fade">
    <span k-if="toggle" k-t="'preserve'"></span>
  </transition>
  <button @click="toggle = !toggle">Toggle</button>
</div>
```

## `$t` vs `k-t`

### `$t`

`$t` is an extended Kdu instance method. It has the following pros and cons:

#### Pros

You can **flexibly** use mustache syntax `{{}}` in templates and also computed props and methods in Kdu instance.

#### Cons

`$t` is executed **every time** when re-render occurs, so it does have translation costs.

### `k-t`

`k-t` is a custom directive. It has the following pros and cons:

#### Pros

`k-t` has **better performance** than the `$t` method due to its cache with the custom directive, when translated once.

Therefore it's possible to make **more performance optimizations**.

#### Cons

`k-t` cannot be flexibly used like `$t`, it's rather **complex**. The translated content with `k-t` is inserted into the `textContent` of the element.
