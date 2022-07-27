'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/kdu-devtools.cjs.prod.js')
} else {
  module.exports = require('./dist/kdu-devtools.cjs.js')
}
