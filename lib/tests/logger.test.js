/* eslint-disable no-undef */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const split = require('split2')
const request = require('supertest')
const app = require('express')()
const logger = require('../logger')

chai.use(dirtyChai)

const { expect } = chai

const setup = (log) => {
  app
    .use(log.reqResLogger())
    .get('/error', (req, res, next) => {
      const error = new Error('err')
      error.details = [{
        message: 'required fields does not exist'
      }]
      error.status = 400
      next(error)
    })
    .get('/error500', (req, res, next) => {
      const error = new Error('err')
      next(error)
    })
    .get('/', (req, res, next) => {
      res.status(200).json({ a: 4 })
    })
    .use(log.errorLogger())
    .get('/attach', (req, res, next) => {
      req.log.info('attach')
      return res.status(200).send()
    })
    .use((err, req, res, next) => res.status(400).json({
      err: {
        msg: err.message
      }
    }))

  return app
}

describe('Logger', () => {
  it('should be a function', () => expect(logger).to.be.a('Function'))

  describe('Disable logs', () => {
    const destination = split(JSON.parse)
    let server; let jsonlog
    before(() => {
      // eslint-disable-next-line global-require
      const log = require('../logger')({
        serviceName: 'test',
        destination,
        enabled: false
      })
      server = setup(log)
      destination.on('data', (data) => {
        jsonlog = data
      })
      return request(server)
        .get('/')
    })
    it('should not log anything', () => expect(jsonlog).to.not.exist())
  })
})
