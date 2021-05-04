const { createHashString } = require('../../../lib/utils')
const config = require('../../../config')

const secret = config('HASH_SECRET')

const hashPassword = createHashString(secret)

const hashUserPassword = ({
  password,
  ...rest
}) => ({ ...rest, password: hashPassword(password) })

module.exports = hashUserPassword
