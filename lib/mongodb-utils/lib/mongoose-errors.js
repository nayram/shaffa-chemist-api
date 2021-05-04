/* eslint-disable no-unused-expressions */
const { validationError } = require('../../express-error')

const MONGOOSE_CAST_ERROR = 'CastError'
const MONGOOSE_VALIDATION_ERROR = 'ValidationError'

const getMongooseValidationErrors = ({ error }) => {
  const mongooseErrors = (error && error.errors) || {}
  return Object.keys(mongooseErrors).map((field) => ({
    param: field,
    value: mongooseErrors[field].value || ' ',
    message: mongooseErrors[field].message
  }))
}

const getFieldNameFromError = ({ message }) => {
  const errorRegex = /index: (.+) dup key:/
  const matches = errorRegex.exec(message)
  const indexName = matches[1]
  return indexName.slice(0, -2)
}

const getMongooseUniqueErrors = ({ error }) => {
  const field = error.errors
    ? getMongooseValidationErrors({ error })[0].param
    : getFieldNameFromError(error)
  return [
    {
      value: ' ',
      param: field,
      message: `${field} already exists`
    }
  ]
}

const getMongooseCastError = ({ error }) => {
  const errors = []
  errors.push({
    param: error.path,
    value: error.value || ' ',
    message: error.message
  })
  return errors
}

const isMongooseValidationError = ({ error }) => error && error.name === MONGOOSE_VALIDATION_ERROR

const isMongooseCastError = ({ error }) => error && error.name === MONGOOSE_CAST_ERROR

const isUniqueError = (error) => (
  (error.name === 'MongoError' && error.code === 11000)
    || (getMongooseValidationErrors({ error }).length
      && /to be unique/i.test(getMongooseValidationErrors({ error })[0].message))
)

const isConvertibleToValidationError = ({ error }) => (isMongooseCastError({ error })
|| isMongooseValidationError({ error }) || isUniqueError(error))

const getDetails = (error) => (isMongooseCastError({ error })
  ? getMongooseCastError({ error }) : isUniqueError(error)
    ? getMongooseUniqueErrors({ error }) : getMongooseValidationErrors({ error }))

const getMessage = (error) => (isUniqueError(error) ? 'Field value already exists' : error.message)

const throwUniqueValidationError = (error) => {
  throw validationError({
    name: 'MongooseUniqueError',
    message: `${getDetails(error)[0].param} already exists`,
    details: getDetails(error)
  })
}

const throwValidationError = (error) => {
  throw validationError({
    name: 'MongooseValidationError',
    message: getMessage(error),
    details: getDetails(error)
  })
}

module.exports = {
  handleAndThrowMongooseError: ({ error }) => {
    if (!isConvertibleToValidationError({ error })) throw error
    isUniqueError(error)
      ? throwUniqueValidationError(error)
      : throwValidationError(error)
  }
}
