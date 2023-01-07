# Installation

## Compatibility Note

- Kdu.js `2.0.0`+

## Direct Download / CDN

<https://unpkg.com/kdu-i18n/dist/kdu-i18n>

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like <https://unpkg.com/kdu-i18n@8.17.7/dist/kdu-i18n.js>

Include kdu-i18n after Kdu and it will install itself automatically:

    
```html    
<script src="https://unpkg.com/kdu/dist/kdu.js"></script>
<script src="https://unpkg.com/kdu-i18n/dist/kdu-i18n.js"></script>
```

## NPM
    
```sh
npm install kdu-i18n
``` 

## Yarn
    
```sh
yarn add kdu-i18n
```

When using with a module system, you must explicitly install the `kdu-i18n`
via `Kdu.use()`:

    
```javascript
import Kdu from 'kdu'
import KduI18n from 'kdu-i18n'

Kdu.use(KduI18n)
```

You don't need to do this when using global script tags.

## Kdu Cli 3.x
    
```sh
kdu add i18n
```

You need Kdu cli 3.x as pre-requisite, you can install it on your shell with the next command:

```sh
npm install @kdujs/cli -g
```

## Dev Build

You will have to clone directly from GitHub and build `kdu-i18n` yourself if you want to use the latest dev build.

```sh
git clone https://github.com/khanhduy1407/kdu-i18n.git node_modules/kdu-i18n
cd node_modules/kdu-i18n
npm install # or `yarn`
npm run build  # or `yarn run build`
```

## Explanation of Different Builds

In the dist/ [directory of the NPM package](https://cdn.jsdelivr.net/npm/kdu-i18n/dist/) you will find many different builds of KduI18n. Here’s an overview of the difference between them:

- UMD: `kdu-i18n.js`
- CommonJS: `kdu-i18n.common.js`
- ES Module for bundlers: `kdu-i18n.esm.js`
- ES Module for browsers: `kdu-i18n.esm.browser.js`

### Terms

- **[UMD](https://github.com/umdjs/umd)**: UMD builds can be used directly in the browser via a `<script>` tag. The default file from Unpkg CDN at [https://unpkg.com/kdu-i18n](https://unpkg.com/kdu-i18n) is the UMD build (`kdu-i18n.js`).

- **[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)**: CommonJS builds are intended for use with older bundlers like [browserify](http://browserify.org/) or [webpack 1](https://webpack.github.io). The default file for these bundlers (`pkg.main`) is the Runtime only CommonJS build (`kdu-i18n.common.js`).

- **[ES Module](http://exploringjs.com/es6/ch_modules.html)**: starting in 8.11 KduI18n provides two ES Modules (ESM) builds:
  - ESM for bundlers: intended for use with modern bundlers like [webpack 2](https://webpack.js.org) or [Rollup](https://rollupjs.org/). ESM format is designed to be statically analyzable so the bundlers can take advantage of that to perform "tree-shaking" and eliminate unused code from your final bundle. The default file for these bundlers (`pkg.module`) is the Runtime only ES Module build (`kdu-i18n.esm.js`).
  - ESM for browsers (8.11+ only, `kdu-i18n.esm.browser.js`): intended for direct imports in modern browsers via `<script type="module">`.
