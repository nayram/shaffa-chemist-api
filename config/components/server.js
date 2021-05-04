const joi = require('joi')

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    LOG_ENABLED: joi.boolean().default(true),
    HASH_SECRET: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required()
  })
  .unknown()

const { error, value: envVars } = envVarsSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  PORT: envVars.PORT,
  LOG_ENABLED: envVars.LOG_ENABLED,
  HASH_SECRET: envVars.HASH_SECRET,
  JWT_SECRET: envVars.JWT_SECRET,
  JWT_EXPIRES_IN: envVars.JWT_EXPIRES_IN
}

module.exports = config
