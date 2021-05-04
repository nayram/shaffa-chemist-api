/* eslint-disable no-underscore-dangle */
const { expect } = require('chai')
const faker = require('faker')
const utils = require('./utils')
const { createBaseModel } = require('../persistable')

const persistable = createBaseModel()
const { EmployeeModel } = utils

describe('Update()', () => {
  let document; let department; let updateDetails;

  before(async () => {
    await utils.setUp()

    department = await utils.insertDepartment()
    document = await utils.insertEmployee({
      department: department._id
    })
  })

  after(async () => {
    utils.tearDown()
  })

  describe('Success', () => {
    let updated; let
      options

    before(async () => {
      updateDetails = { name: faker.name.firstName(), position: 'Branch Manager' }

      options = {
        model: EmployeeModel,
        query: {
          _id: document._id.toString()
        },
        update: updateDetails
      }
      updated = await persistable.update(options)
    })

    it('should update existing document', async () => {
      const { _id, name, position } = updated
      expect({ _id: _id.toString(), name, position }).to.eql({
        _id: document._id.toString(),
        name: updateDetails.name,
        position: updateDetails.position
      })
    })
  })
})
