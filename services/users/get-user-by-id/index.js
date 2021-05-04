const { required, asyncPipe, omitPassword } = require('../../../lib/utils')
const { get } = require('../../../models/users')
const ensureUserAlreadyExist = require('../../common/ensure-user-already-exists')

const queryForUser = (id) => get({ query: { _id: id } })

const getUserById = (id = required('id')) => asyncPipe(
  ensureUserAlreadyExist,
  queryForUser,
  omitPassword
)(id)
module.exports = getUserById
