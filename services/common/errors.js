const { customError } = require('../../lib/express-error')

const types = {
  ERR_USER_ALREADY_EXIST: 'UserAlreadyExistError',
  ERR_USER_DOES_NOT_EXIST: 'UserDoesNotExist',
  ERR_USER_AUTHENTICATION_FAILED: 'UserAuthenticationError',
  ERR_USER_CREDENTIALS_REQUIRED: 'UnauthorizedError'
}

const errors = {
  userAlreadyExistError() {
    const name = types.ERR_USER_ALREADY_EXIST
    const message = 'user already exist'

    return customError({ name, message })
  },
  userDoesNotExistError() {
    const name = types.ERR_USER_DOES_NOT_EXIST
    const message = 'user does not exist'

    return customError({ name, message })
  },
  userAuthenticationFailedError() {
    const name = types.ERR_USER_AUTHENTICATION_FAILED
    const message = 'authentication failed'

    return customError({ name, message })
  }

}

module.exports = {
  ...errors,
  types
}
