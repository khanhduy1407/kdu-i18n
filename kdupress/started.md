# Getting started

:::tip NOTE
We will be using [ES2015](https://github.com/lukehoban/es6features) in the
code samples in the guide.
:::

## HTML

```html
<script src="https://unpkg.com/kdu/dist/kdu.js"></script>
<script src="https://unpkg.com/kdu-i18n/dist/kdu-i18n.js"></script>

<div id="app">
  <p>{{ $t("message.hello") }}</p>
</div>
``` 

## JavaScript

```js
// If using a module system (e.g. via kdu-cli), import Kdu and KduI18n and then call Kdu.use(KduI18n).
// import Kdu from 'kdu'
// import KduI18n from 'kdu-i18n'
//
// Kdu.use(KduI18n)

// Ready translated locale messages
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

// Create KduI18n instance with options
const i18n = new KduI18n({
  locale: 'ja', // set locale
  messages, // set locale messages
})


// Create a Kdu instance with `i18n` option
new Kdu({ i18n }).$mount('#app')

// Now the app has started!
``` 

Output the following:

```html 
<div id="#app">
  <p>こんにちは、世界</p>
</div>
```
