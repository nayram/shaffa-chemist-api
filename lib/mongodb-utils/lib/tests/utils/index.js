/* eslint-disable no-multi-assign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
require('../start-db').startDb()
// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('chai')
const dataGenerator = require('./fixtures/data-generator')
const { model: DepartmentModel } = require('./test-model/department')
const { model: EmployeeModel } = require('./test-model/employee')
const { model: LocationModel } = require('./test-model/location')
const { model: ShopModel } = require('./test-model/shop')

const utils = {
  async tearDown() {
    await mongoose.connection.dropDatabase()
  },
  async setUp() {
    await utils.tearDown()
  },
  async dropCollection(collection) {
    await mongoose.connection.dropCollection(collection)
  },
  async insertEmployee(overrides = {}) {
    return EmployeeModel.create(dataGenerator.createEmployee(overrides))
  },
  async insertDepartment(overrides = {}) {
    const model = new DepartmentModel(dataGenerator.createDepartment(overrides))

    const department = await model.save()

    return department.toObject()
  },
  insertShop(overrides = {}) {
    return ShopModel.create(dataGenerator.createShop(overrides))
  },
  async insertMultipleEmployees(overrides = {}, num = 2) {
    const promises = Array.from({ length: num }).map((_) => utils.insertEmployee(overrides))

    return Promise.all(promises)
  },
  async deleteAllEmployees() {
    return EmployeeModel.remove({})
  },
  async insertLocation(overrides = {}) {
    const model = new LocationModel(dataGenerator.createLocation(overrides))

    const location = await model.save()

    return location.toObject()
  },
  /**
   * Populates the database with the requested number of departments
   * @param {Object} options
   * @param {Number} options.numberToAdd - the number of departments to add to the database
   * @return {Promise[]} - array of promises which resolves to the departments
   */
  async populateDepartments({ numberToAdd = 2 } = {}) {
    return Array.from({ length: numberToAdd }, utils.insertDepartment)
  },
  /**
   * Populates the database with the requested number of employees
   * @param {Object} options
   * @param {Object} options.department - the department to assign employees to
   * @param {Number} options.numberToAdd - the number of employees to add to the database
   * @param {Object} options.location - the employees location
   * @return {Promise[]} - array of promises
   */
  async populateEmployees({ department, numberToAdd = 2, location }) {
    return Array.from({ length: numberToAdd }, (_) => {
      const options = { department: department._id }

      if (location) options.location = location

      return utils.insertEmployee(options)
    })
  },
  expectValidationErrorsToBeWellFormed(err) {
    expect(err.detail)
      .to.exist()
      .and.be.an('Array')

    err.detail.forEach((row) => {
      expect(row).to.have.all.keys(['param', 'value', 'msg'])
    })
  }
}

utils.fixtures = { dataGenerator }
utils.EmployeeModel = EmployeeModel
utils.DepartmentModel = DepartmentModel
utils.ShopModel = ShopModel

module.exports = utils
