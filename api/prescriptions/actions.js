const presciptionService = require('../../services/prescriptions')()
const { asyncPipe } = require('../../lib/utils')
const respond = require('../../lib/express-response')
const httpStatus = require('../../lib/http-status')()
const prescriptionsTransformations = require('./transformations')

const addPrescription = (req, res, next) => asyncPipe(
  presciptionService.addNewPrescription,
  prescriptionsTransformations,
  respond({ res, status: httpStatus.OK })
)(req.body).catch(next)

module.exports = {
  addPrescription
}
