const { Router } = require('express')
const validate = require('../../lib/express-joi-validator')
const { setErrorStatus } = require('../../lib/express-error')
const httpStatus = require('../../lib/http-status')()
const { addPrescription } = require('./actions')
const { addNewPrescriptionSchema } = require('./req-schema')
const { types } = require('../../services/common/errors')

const ERR_MAP = {
  [types.ERR_USER_DOES_NOT_EXIST]: httpStatus.NOT_FOUND,
  [types.ERR_USER_AUTHENTICATION_FAILED]: httpStatus.AUTHENTICATION_FAILED,
  ReqValidationError: httpStatus.BAD_REQUEST
}

const router = Router()
  .post('/', validate(addNewPrescriptionSchema), addPrescription)
  .use(setErrorStatus(ERR_MAP))

module.exports = () => router
