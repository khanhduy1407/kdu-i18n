const fs = require('fs')
const pack = require('../package.json')

// update installation.md
const installation = fs
  .readFileSync('./kdupress/installation.md', 'utf-8')
  .replace(
    /https:\/\/unpkg\.com\/kdu-i18n@[\d.]+.[\d]+\/dist\/kdu-i18n\.js/,
    'https://unpkg.com/kdu-i18n@' + pack.version + '/dist/kdu-i18n.js'
  )
fs.writeFileSync('./kdupress/installation.md', installation)
