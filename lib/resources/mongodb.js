const { mongodb } = require('../mongodb-utils')
const config = require('../../config')

module.exports = () => mongodb(config('MONGODB_URL'))
