const { expect } = require('chai')
const utils = require('./utils')
const { createBaseModel } = require('../persistable')

const persistable = createBaseModel()
const { EmployeeModel } = utils

describe('Get()', () => {
  let employee, options
  before(async () => {
    await utils.setUp()
    employee = await utils.insertEmployee()
    options = { model: EmployeeModel, query: { name: employee.name } }

  })

  after(async () => {
    await utils.tearDown()
  })

  it('should return saved employee data', async () => {
    const result = await persistable.get(options)
    return expect(result._id.toString()).equal(employee.id.toString())
  })

  it('shoud return null if no employee data is found', async () => {
    const result = await persistable.get({ query: { name: 'Nayram' }, ...options })
    return expect(result).to.be.null
  })

})
