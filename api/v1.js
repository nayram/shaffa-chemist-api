const { Router } = require('express')
const userRouter = require('./users')()
const prescriptionRouter = require('./prescriptions')()

const v1Router = Router()

v1Router
  .use('/users', userRouter)
  .use('/prescriptions', prescriptionRouter)

module.exports = () => v1Router
