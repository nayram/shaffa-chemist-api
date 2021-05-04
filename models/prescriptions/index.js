const { required } = require('../../lib/utils')
const { createBaseModel: baseModel } = require('../../lib/mongodb-utils')
const { model } = require('./schema')

const prescriptionModel = {
  create(prescription) {
    return baseModel().create({ model, document: prescription })
  },
  get({ query = required('query'), fields }) {
    return baseModel().get({
      model,
      query,
      fields
    })
  },
  update({ query = required('query'), update = required('update') }) {
    return baseModel().update({
      model,
      query,
      update
    })
  }
}

module.exports = prescriptionModel
