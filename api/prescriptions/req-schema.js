const joi = require('../../lib/joi')()

const addNewPrescriptionSchema = {
  body: {
    user_id: joi.objectId().required(),
    image_url: joi.string().regex(/(https?:\/\/.*\.(?:png|jpg))/i).required(),
    note: joi.string().optional()
  }
}

module.exports = {
  addNewPrescriptionSchema
}
