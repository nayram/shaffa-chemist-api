const joi = require('joi');
const extend = require('extend');
const { customError } = require('../express-error')
const reformatJoiErrors = require('./reformat-joi-errors')

const validSchemaKeys = ['params', 'body']

const throwInvalidKeys = (_) => {
  throw customError({
    name: 'InvalidKeys',
    message: `keys should be ${validSchemaKeys.concat(' ')}`
  })
}

const ensureIsValidSchema = (schema) => (
  Object.keys(schema).every((key) => validSchemaKeys.includes(key))
  || throwInvalidKeys()
)

// eslint-disable-next-line max-len
const validate = (schema, options = { stripUnknown: true }) => validateRequest = (req, res, next) => {
  if (!schema) {
    return next()
  }

  ensureIsValidSchema(schema)

  const toValidate = {}
  validSchemaKeys.forEach((key) => {
    if (schema[key]) toValidate[key] = req[key]
  });
  const { error, value } = joi.object(schema).validate(
    toValidate,
    options
  )
  if (error) {
    return next(reformatJoiErrors(error))
  }

  extend(req, value)
  return next()
}

module.exports = validate
