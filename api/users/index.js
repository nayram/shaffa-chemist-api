const { Router } = require('express')
const validate = require('../../lib/express-joi-validator')
const { setErrorStatus } = require('../../lib/express-error')
const httpStatus = require('../../lib/http-status')()
const { addNewUser, getUserById, getUserByEmailAndPassword } = require('./actions')
const { addNewUserSchema, getUserByIdSchema, getUserByEmailAndPasswordSchema } = require('./req-schema')
const { types } = require('../../services/common/errors')

const ERR_MAP = {
  [types.ERR_USER_ALREADY_EXIST]: httpStatus.BAD_REQUEST,
  [types.ERR_USER_DOES_NOT_EXIST]: httpStatus.NOT_FOUND,
  [types.ERR_USER_AUTHENTICATION_FAILED]: httpStatus.AUTHENTICATION_FAILED,
  [types.ERR_USER_CREDENTIALS_REQUIRED]: httpStatus.AUTHENTICATION_FAILED,
  ReqValidationError: httpStatus.BAD_REQUEST
}

const router = Router()
  .post('/authenticate', validate(getUserByEmailAndPasswordSchema), getUserByEmailAndPassword)
  .post('/signup', validate(addNewUserSchema), addNewUser)
  .get('/:user_id', validate(getUserByIdSchema), getUserById)
  .use(setErrorStatus(ERR_MAP))

module.exports = () => router
