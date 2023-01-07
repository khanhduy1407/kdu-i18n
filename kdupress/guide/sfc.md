# Single file components

## Basic Usage

If you are building Kdu component or Kdu application using single file components, you can manage the locale messages `i18n` custom block.

```js
<i18n>
{
  "en": {
    "hello": "hello world!"
  },
  "ja": {
    "hello": "こんにちは、世界！"
  }
}
</i18n>

<template>
  <div id="app">
    <label for="locale">locale</label>
    <select k-model="locale">
      <option>en</option>
      <option>ja</option>
    </select>
    <p>message: {{ $t('hello') }}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    this.$i18n.locale = 'en';
    return { locale: 'en' }
  },
  watch: {
    locale (val) {
      this.$i18n.locale = val
    }
  }
}
</script>
```

## Multiple custom blocks

You can use locale messages with multiple `i18n` custom blocks.

```html
<i18n src="./common/locales.json"></i18n>
<i18n>
  {
    "en": {
      "hello": "hello world!"
    },
    "ja": {
      "hello": "こんにちは、世界！"
    }
  }
</i18n>
```

In the above, first custom block load the common locale message with `src` attribute, second custom block load the locale message that is defined only at single file component. These locale messages will be merged as locale message of component.

In this way, multiple custom blocks useful when want to be used as module.

## Scoped style

When using `Kdu-i18n` with `scoped style`, it's important to remember to use a [deep selector](https://Kdujs-loader.web.app/guide/scoped-css.html#child-component-root-elements) for styling an element __*inside*__ the translation string. For example:

__Translation contains only text__ (Work without deep selector)

```html
...
<i18n>
{
  "en": {
    "hello": "hello world!"
  },
  "ja": {
    "hello": "こんにちは、世界"
  }
}
</i18n>
...
<template>
  <div class="parent">
    <p>message: {{ $t('hello') }}</p>
  </div>
</template>
...
<!-- Will work -->
<style>
.parent p {
  color: #42b883;
}
</style>
```

__Translation with HTML element__ (Must use deep selector)
```html
...
<i18n>
{
  "en": {
    "hello": "hello<span>world!</span>"
  },
  "ja": {
    "hello": "こんにちは、<span>世界！</span>"
  }
}
</i18n>
...
<template>
  <div class="parent">
    <p k-html="$t('hello')"></p>
  </div>
</template>
...
<!-- Won't work -->
<style>
.parent p {
  color: #03a9f4;
}

.parent p span{
  color: red;
}
</style>

<!-- Will work -->
<style>
.parent p {
  color: #03a9f4;
}

.parent p >>> span{
  color: red;
}
</style>
```



## Custom blocks in functional component

If the single file components have the template using a functional component, and you had been defined `i18n` custom blocks, note you cannot localize using locale messages.

For example, the following code cannot localize with the locale message of `i18n` custom block.

```html
<i18n>
{
  "en": {
    "hello": "hello world"
  },
  "ja": {
    "hello": "こんにちは、世界"
  }
}
</i18n>

<template functional>
  <!-- 'hello' of locale messages of parent instance -->
  <p>{{ parent.$t('hello') }}</p>
</template>
```
