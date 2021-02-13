const joi = require('joi')
const { path } = require('ramda')
const { required } = require('../utils')

const ERROR_MESSAGE = Symbol('error message')
const ERROR_CODE = Symbol('error code')
const ERROR_NAME = Symbol('error name')

const customError = ({
  name = required('name'),
  message = required('name'),
  code
}) => {
  const error = new Error(message)
  error.name = name
  error.code = code

  if (Error.captureStackTrace) Error.captureStackTrace(error, customError)

  Object.defineProperty(error, {
    [ERROR_MESSAGE]: {
      get() {
        return message
      }
    },
    [ERROR_CODE]: {
      get() {
        return code
      }
    },
    [ERROR_NAME]: {
      get() {
        return name
      }
    }
  })

  return error
}

const getMessage = path(ERROR_MESSAGE)
const getCode = path(ERROR_CODE)
const getName = path(ERROR_NAME)

Object.assign(customError, {
  getMessage,
  getCode,
  getName
})

const notFoundError = customError({
  name: 'NotFoundError',
  message: 'Not Found'
})

const notFound = (req, res, next) => {
  notFoundError.status = 404
  next(notFoundError)
}

const detailSchema = joi
  .object()
  .keys({
    param: joi.string().required(),
    value: joi.string(),
    message: joi.string().required()
  })
  .required()

const validationErrorSchema = joi
  .object({
    code: joi.string(),
    name: joi.string().required(),
    message: joi.string().required(),
    details: joi
      .array()
      .items(detailSchema)
      .required()
  })
  .required()

const validateWithJoi = (data = required('data'), schema = required('schema')) => {
  const { error } = joi.valid(data, schema)

  if (error) throw customError(error)

  return data
}

const validationError = ({
  code,
  name = 'ValidationError',
  message = required('message'),
  details = required('details')
}) => {
  const error = customError(
    validateWithJoi({
      name, code, message, details
    }, validationErrorSchema)
  )
  error.details = details

  return error
}

const setErrorStatus = (errorMap = required('errorMap')) => (error, req, res, next) => {
  error.status = errorMap[error.name]
  return next(error)
}

const sendError = (error, req, res, next) => {
  const {
    code, details, message, status: statusCode = 500
  } = error

  return res.status(statusCode).json(
    statusCode === 500
      ? { error: { message: 'internal server error' } }
      : {
        error: {
          code,
          details,
          message
        }
      }
  )
}

module.exports = {
  notFound,
  sendError,
  customError,
  setErrorStatus,
  validationError
}
