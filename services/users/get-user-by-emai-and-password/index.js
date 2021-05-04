const validateUser = require('./validate-user')
const { asyncPipe, omitPassword } = require('../../../lib/utils')
const hashUserPassword = require('../common/hash-user-password')
const { get } = require('../../../models/users')
const authenticationEnsureUserAlreadyExist = require('../../common/authentication-ensure-user-exists')

const queryForUser = ({ email, password }) => get({ query: { email, password } })

const getUserByEmailAndPassword = asyncPipe(
  validateUser,
  hashUserPassword,
  authenticationEnsureUserAlreadyExist,
  queryForUser,
  omitPassword
)

module.exports = getUserByEmailAndPassword
