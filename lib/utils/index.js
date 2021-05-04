const joi = require('joi')
const { curry, omit } = require('ramda')
const ensureAsync = require('../ensure-async')
const hasString = require('../create-hash-string')

const omitPassword = omit(['password'])

module.exports = {
  asyncPipe: (...fns) => (param) => fns.reduce(async (result, next) => next(await result), param),
  required: (param) => {
    throw new Error(`${param} is required`)
  },
  validateMongodbUrl(dbURL) {
    const { error, value } = joi.string().regex(/^mongodb:\/\//).required().validate(dbURL)

    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
    return value
  },
  isFunction: (param) => typeof param === 'function',
  isNonEmptyObject: (obj) => Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length > 0,
  makeSure: curry(ensureAsync),
  createHashString: curry(hasString),
  omitPassword
}
