const Joi = require('joi')

module.exports = function joiValidator() {
  return Joi.extend((joi) => ({
    type: 'objectId',
    base: joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
  }))
}
