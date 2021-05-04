/* eslint-disable no-underscore-dangle */
const chaiAsPromise = require('chai-as-promised')
const { expect } = require('chai').use(chaiAsPromise)
const { createBaseModel: baseModel } = require('../../lib/mongodb-utils')
const { model } = require('./schema')
const { setUp, tearDown } = require('../../lib/mongodb-utils/lib/tests/utils')
const { insertPrescription } = require('../../tests/utils')
const { createPrescription } = require('../../tests/fixtures/data-generator')
const prescriptionModel = require('./index')

describe('Prescription Model', () => {
  before(async () => {
    await setUp()
  })

  after(async () => {
    await tearDown()
  })
  describe('Create()', () => {
    describe('Success', () => {
      let prescription
      beforeEach(() => {
        prescription = createPrescription()
      })

      it('should successfully create prescription', () => expect(prescriptionModel.create(prescription)).to.eventually.fulfilled)

      it('should save the right details', async () => {
        await prescriptionModel.create(prescription)
        const { user_id: userId, image_url: imageUrl, note } = await baseModel().get({
          query: {
            user_id: prescription.user_id
          },
          model
        })
        return expect({ user_id: userId.toString(), image_url: imageUrl, note }).eql({
          user_id: prescription.user_id.toString(),
          image_url: prescription.image_url,
          note: prescription.note
        })
      })

      it('should not fail if note is not provided as a parameter', async () => {
        delete prescription.note
        return expect(prescriptionModel.create(prescription)).eventually.fulfilled
      })
    })

    describe('Failure', () => {
      let prescription
      beforeEach(() => {
        prescription = createPrescription()
      })

      it('should fail if image_url is not provided as a parameter', () => {
        delete prescription.user_id
        return expect(prescriptionModel.create(prescription)).rejectedWith('Prescription validation failed: user_id: Path `user_id` is required')
      })

      it('should fail if user_id is not provided as a parameter', () => {
        delete prescription.image_url
        return expect(prescriptionModel.create(prescription)).rejectedWith('Prescription validation failed: image_url: Path `image_url` is required')
      })
    })
  })

  describe('Get()', () => {
    let savedPrescription
    describe('Success', () => {
      before(async () => {
        savedPrescription = await insertPrescription()
      })
      it('should get prescription successfully', () => expect(prescriptionModel.get({ query: { _id: savedPrescription._id } })).eventually.fulfilled)
      it('should return the right details', async () => {
        const result = await prescriptionModel.get({ query: { _id: savedPrescription._id } })
        return expect(result).to.be.eql(savedPrescription)
      })
    })

    describe('Failure', () => {
      it('should fail if query object is not provided', () => expect(() => prescriptionModel.get({})).throws('query is required'))
    })
  })

  describe('Update', () => {
    let savedPrescription
    describe('Success', async () => {
      before(async () => {
        savedPrescription = await insertPrescription()
      })

      it('should update prescription successfully', () => {
        const newObj = createPrescription()
        return expect(prescriptionModel.update({
          query: { _id: savedPrescription._id },
          update: { ...newObj }
        })).eventually.fulfilled
      })

      it('should update with the right data', async () => {
        const updateObj = createPrescription()
        const { _id } = savedPrescription
        await prescriptionModel.update({
          query: { _id: savedPrescription._id },
          update: { ...updateObj }
        })
        const { note, image_url: imageUrl, user_id: userId } = await baseModel().get({
          query: {
            _id
          },
          model
        })
        return expect({
          _id: _id.toString(), note, image_url: imageUrl, user_id: userId.toString()
        }).eql({ ...updateObj, user_id: updateObj.user_id.toString(), _id: _id.toString() })
      })
    })

    describe('Failure', () => {
      let prescription
      before(() => {
        prescription = createPrescription()
      })

      it('should fail if query is not provided', () => expect(() => prescriptionModel.update({ update: { ...prescription } })).throws('query is required'))

      it('should fail if update object is not provided', () => expect(() => prescriptionModel.update({ query: { _id: '123455' } })).throws('update is required'))
    })
  })
})
