const { customError } = require('../lib/express-error')

let config

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'
if (process.env.NODE_ENV === 'development') require('dotenv').config()

if (!process.env.PROCESS_TYPE) throw new Error('PROCESS_TYPE must be set')

try {
  config = require(`./${process.env.PROCESS_TYPE}`)
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    throw customError({
      name: 'MODULE_NOT_FOUND',
      message: `Either process type ${
        process.env.PROCESS_TYPE
      } does not exists or '${error}' is the issue`
    })
  }
  throw error
}

module.exports = (env) => {
  if (config[env] === undefined) {
    throw customError({
      name: 'MODULE_NOT_FOUND',
      message: `No config for env variable ${env}`
    })
  }

  return config[env]
}
