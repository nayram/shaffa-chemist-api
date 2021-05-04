const jwt = require('jsonwebtoken')

const createToken = ({
  secret,
  expires,
  id
}) => jwt.sign({ data: id }, secret, { expiresIn: expires })

module.exports = createToken
