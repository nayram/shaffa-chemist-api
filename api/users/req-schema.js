const joi = require('../../lib/joi')()

const addNewUserSchema = {
  body: {
    name: joi.string().required(),
    email: joi.string().optional(),
    phone_number: joi.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/).required(),
    password: joi.string().required()
  }
}

const getUserByEmailAndPasswordSchema = {
  body: {
    email: joi.string().required(),
    password: joi.string().required()
  }
}

const getUserByIdSchema = {
  params: {
    user_id: joi.objectId().required()
  }
}

module.exports = {
  addNewUserSchema,
  getUserByIdSchema,
  getUserByEmailAndPasswordSchema
}
