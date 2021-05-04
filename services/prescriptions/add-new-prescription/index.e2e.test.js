/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
const { omit } = require('ramda')
const objectId = require('bson-objectid')
const chaiAsPromised = require('chai-as-promised')
const { expect } = require('chai').use(chaiAsPromised)
const { setUp, tearDown } = require('../../../lib/mongodb-utils/lib/tests/utils')
const utils = require('../../../tests/utils')
const addNewPrescription = require('./index')
const prescriptionModel = require('../../../models/prescriptions')

const omitIdVersionCreatedAtUpdatedAt = omit(['_id', '__v', 'created_at', 'updated_at'])

describe('Add new prescription', () => {
  let prescriptions; let
    user
  before(async () => {
    await setUp()
    user = await utils.insertUser()
  })
  after(async () => {
    await tearDown()
  })

  describe('failure', () => {
    it('should fail if user id is not passed', () => expect(() => addNewPrescription({ })).throws('user_id is required'))
    it('should fail if image_url is not passed', () => expect(() => addNewPrescription({ user_id: user._id })).throws('image_url is required'))
    it('should fail if user does not exist', () => {
      const userId = objectId()
      return expect(addNewPrescription({ user_id: userId, image_url: 'https://example.com/image.jpg' })).rejectedWith('user does not exist')
    })
  })

  describe('Success', () => {
    beforeEach(() => {
      prescriptions = utils.fixtures.createPrescription({ user_id: user._id })
    })
    it('should save prescriptions successfully', () => expect(addNewPrescription({ ...prescriptions })).eventually.fulfilled)
    it('should save the right prescription details', async () => {
      const prescription = await addNewPrescription(prescriptions)
      const getPrescription = await prescriptionModel.get({
        query: {
          _id: prescription._id
        }
      })
      return expect(
        omitIdVersionCreatedAtUpdatedAt(getPrescription)
      ).eql({ user_id: user._id, image_url: prescriptions.image_url, note: prescriptions.note })
    })
    it('should not fail if note is not provided', () => {
      delete prescriptions.note
      return expect(addNewPrescription(prescriptions)).is.fulfilled
    })
  })
})
