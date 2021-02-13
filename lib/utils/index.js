const joi = require('joi')

module.exports = {
  required: (param) => {
    throw new Error(`${param} is required`)
  },
  validateMongodbUrl(dbURL) {
    const { error, value } = joi.validate(dbURL, joi.string().regex(/^mongodb:\/\//).required())

    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
    return value
  },
  isFunction: (param) => typeof param === 'function',
  isNonEmptyObject: (obj) => Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length > 0
}
