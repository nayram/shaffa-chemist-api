const { isNil, complement } = require('ramda')
const userModel = require('../../models/users')
const { makeSure, asyncPipe } = require('../../lib/utils')
const { userAuthenticationFailedError } = require('./errors')

const isNotNil = complement(isNil)

const hasExistingUser = asyncPipe(
  ({ email, password }) => ({
    query: {
      email,
      password
    }
  }),
  userModel.get,
  isNotNil
)
const ensureUserAlreadyExist = makeSure(hasExistingUser, userAuthenticationFailedError)

module.exports = ensureUserAlreadyExist
