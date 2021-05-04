'use strict'

const joi = require('joi')

const envVarsSchema = joi
  .object({
    MONGODB_URL: joi.string().required()
  })
  .unknown()
  .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
  throw new Error(`Mongodb validation error: ${error.message}`)
}

const config = {
  MONGODB_URL: envVars.MONGODB_URL
}

module.exports = config
