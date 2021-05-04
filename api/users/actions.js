const userService = require('../../services/users')()
const authenticateService = require('../../services/authenticate')()
const { asyncPipe } = require('../../lib/utils')
const respond = require('../../lib/express-response')
const httpStatus = require('../../lib/http-status')()
const userTransformation = require('./transformations')

const config = require('../../config')

const addJWTToken = (user) => ({
  user,
  token: authenticateService({ secret: config('JWT_SECRET'), expires: config('JWT_EXPIRES_IN'), id: user.id })
})

const addNewUser = (req, res, next) => asyncPipe(
  userService.addNewUser,
  userTransformation,
  addJWTToken,
  respond({ res, status: httpStatus.OK })
)(req.body).catch(next)

const getUserByEmailAndPassword = (req, res, next) => asyncPipe(
  userService.getUserByEmailAndPassword,
  userTransformation,
  addJWTToken,
  respond({ res, status: httpStatus.OK })
)(req.body).catch(next)

const getUserById = (req, res, next) => asyncPipe(
  userService.getUserById,
  userTransformation,
  respond({ res, status: httpStatus.OK })
)(req.params.user_id).catch(next)

module.exports = {
  addNewUser,
  getUserById,
  getUserByEmailAndPassword
}
