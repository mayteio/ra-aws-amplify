
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ra-aws-amplify.cjs.production.min.js')
} else {
  module.exports = require('./ra-aws-amplify.cjs.development.js')
}
