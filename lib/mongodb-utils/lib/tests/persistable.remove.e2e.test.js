const { expect } = require('chai')
const utils = require('./utils')
const { createBaseModel } = require('../persistable')

const persistable = createBaseModel()

const { EmployeeModel } = utils

describe('Remove()', () => {
  let employee; let
    options

  before(async () => {
    await utils.setUp()
    employee = await utils.insertEmployee()
    options = { model: EmployeeModel, query: { _id: employee._id.toString() } }
  })

  after(async () => {
    await utils.tearDown()
  })

  it('should verify if employee data exits', async () => {
    const results = await persistable.get(options)
    return expect(results).is.not.null
  })
  it('should remove specified employee by id', async () => {
    await persistable.remove(options)
    const results = await persistable.get(options)
    return expect(results).to.be.null
  })
})
