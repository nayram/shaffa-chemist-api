const joi = require('joi')
const { required } = require('../../../lib/utils')

const validateUser = (user = required('user')) => {
  const schema = joi.object().keys({
    name: joi.string().required(),
    phone_number: joi.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/).required(),
    email: joi.string().email().optional(),
    password: joi.string().required()
  })
  const { error, value } = schema.validate(user)
  if (error) {
    throw new Error(error.message)
  }

  return value
}

module.exports = validateUser
