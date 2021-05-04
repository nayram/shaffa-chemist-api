const { isNil } = require('ramda')
const userModel = require('../../models/users')

const { makeSure, asyncPipe } = require('../../lib/utils')
const { userAlreadyExistError } = require('./errors')

const hasNoExistingUser = asyncPipe(
  (user) => ({
    query: {
      phone_number: user.phone_number
    }
  }),
  userModel.get,
  isNil
)

const ensureUserDoesNotExist = makeSure(
  hasNoExistingUser,
  userAlreadyExistError
)

module.exports = ensureUserDoesNotExist
