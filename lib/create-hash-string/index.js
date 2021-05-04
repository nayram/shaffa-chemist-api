const crypto = require('crypto')

const createHashString = (secret, text) => {
  const sha256Hasher = crypto.createHmac('sha256', secret)
  const hash = sha256Hasher.update(text).digest('hex')
  return hash
}

module.exports = createHashString
