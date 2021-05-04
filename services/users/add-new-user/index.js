const { asyncPipe, omitPassword } = require('../../../lib/utils')
const { create } = require('../../../models/users')
const validateUser = require('./validate-user')
const ensureUserDoesNotExist = require('../../common/ensure-user-does-not-exist')
const hashUserPassword = require('../common/hash-user-password')

const addNewUser = asyncPipe(
  validateUser,
  ensureUserDoesNotExist,
  hashUserPassword,
  create,
  omitPassword
)

module.exports = addNewUser
