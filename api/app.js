const express = require('express')
const { notFound, sendError } = require('../lib/express-error')
const jwt = require('./middleware/jwt')
const logger = require('../lib/logger')({
  serviceName: 'api'
})
const v1Router = require('./v1')()

const app = express()

const createApp = () => {
  app
    .use(logger.reqResLogger())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(jwt())
    .use('/v1', v1Router)
    .use(notFound)
    .use(logger.errorLogger())
    .use(sendError)

  return app
}

module.exports = createApp
