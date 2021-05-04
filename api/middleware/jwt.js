const expressJwt = require('express-jwt')
const config = require('../../config')

const jwt = () => expressJwt({ secret: config('JWT_SECRET'), algorithms: ['HS256'] }).unless({
  path: [
    '/v1/users/authenticate',
    '/v1/users/signup'
  ]
})

module.exports = jwt
