const { createBaseModel } = require('./lib/persistable')
const { getDbConnector } = require('./lib/resource')
const { handleAndThrowMongooseError } = require('./lib/mongoose-errors')

module.exports = {
  mongodb: getDbConnector,
  createBaseModel,
  handleAndThrowMongooseError
}
