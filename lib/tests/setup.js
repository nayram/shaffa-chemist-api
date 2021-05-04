'use strict'
process.env.PROCESS_TYPE === 'test' && require('dotenv').config()
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const dirtyChai = require('dirty-chai')
const chaiAsPromised = require('chai-as-promised')
const utils = require('./utils')
process.env.LOG_ENABLED = false

/* eslint-disable this/no-this */

process.on('unhandledRejection', err => {
  throw err
})

before(async () => {
  await utils.setUp()
  chai.use(sinonChai)
  chai.use(dirtyChai)
  chai.use(chaiAsPromised)
})

beforeEach(async function () {
  this.sandbox = sinon.createSandbox()
})

afterEach(async function () {
  this.sandbox.restore()
})
