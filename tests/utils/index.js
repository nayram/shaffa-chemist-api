const prescriptionModel = require('../../models/prescriptions')
const userModel = require('../../models/users')
const fixtures = require('../fixtures/data-generator')
const hashUserPassword = require('../../services/users/common/hash-user-password')

const utils = {
  insertPrescription(override = {}) {
    return prescriptionModel.create(fixtures.createPrescription(override))
  },
  insertUser(override = {}) {
    return userModel.create(hashUserPassword(fixtures.createUser(override)))
  },
  fixtures
}

module.exports = utils
