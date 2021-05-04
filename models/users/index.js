const { model } = require('./schema')
const { createBaseModel: baseModel } = require('../../lib/mongodb-utils')
const { required } = require('../../lib/utils')

const userModel = {
  create(user = required('user')) {
    return baseModel().create({ model, document: user })
  },
  get({ query = required('query'), fields }) {
    return baseModel().get({ query, fields, model })
  },
  update({ query = required('query'), update = required('update') }) {
    return baseModel().update({
      model,
      query,
      update
    })
  }
}

module.exports = userModel
