const { isNil, complement } = require('ramda')
const userModel = require('../../models/users')
const { makeSure, asyncPipe } = require('../../lib/utils')
const { userDoesNotExistError } = require('./errors')

const isNotNil = complement(isNil)

const hasExistingUser = asyncPipe(
  (id) => ({
    query: {
      _id: id
    }
  }),
  userModel.get,
  isNotNil
)
const ensureUserAlreadyExist = makeSure(hasExistingUser, userDoesNotExistError)

module.exports = ensureUserAlreadyExist
