const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const utils = require('./utils')
const { createBaseModel } = require('../persistable')

chai.use(chaiAsPromised)

const { expect } = chai
const persistable = createBaseModel()

const { EmployeeModel, fixtures } = utils
const { dataGenerator: generator } = fixtures

describe('Persistence create()', () => {
  let employeeData; let department; let
    options

  before(async () => {
    await utils.setUp()
    department = await utils.insertDepartment()
  })

  after(async () => {
    await utils.tearDown()
  })

  beforeEach(async () => {
    employeeData = generator.createEmployee({
      department: department._id
    })

    options = {
      model: EmployeeModel,
      document: employeeData
    }
  })

  describe('Success', () => {
    it('should save document to the database', async () => {
      const employee = await persistable.create(options)
      return expect(employee)
        .to.be.an('object')
        .and.deep.include(employeeData)
    })
  })

  describe('Failure', () => {
    it('should throw error if document fails validation', async () => {
      delete employeeData.name
      const options = {
        model: EmployeeModel,
        document: employeeData
      }

      return expect(persistable.create(options))
        .to.eventually.be.rejected()
        .with.property('name', 'MongooseValidationError')
    })
  })
})
