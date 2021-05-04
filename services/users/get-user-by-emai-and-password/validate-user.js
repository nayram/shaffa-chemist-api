const joi = require('joi')
const { required } = require('../../../lib/utils')

const validateUser = (user = required('user')) => {
  const schema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required()
  })
  const { error, value } = schema.validate(user)
  if (error) {
    throw new Error(error.message)
  }

  return value
}

module.exports = validateUser
