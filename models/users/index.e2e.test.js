/* eslint-disable no-underscore-dangle */
const chaiAsPromise = require('chai-as-promised')
const { expect } = require('chai').use(chaiAsPromise)
const { createUser } = require('../../tests/fixtures/data-generator')
const { insertUser } = require('../../tests/utils')
const { setUp, tearDown } = require('../../lib/mongodb-utils/lib/tests/utils')
const { createBaseModel: baseModel } = require('../../lib/mongodb-utils')
const { model } = require('./schema')
const userModel = require('./index')
const { omitPassword } = require('../../lib/utils')

describe('User Model', () => {
  before(async () => {
    await setUp()
  })

  after(async () => {
    await tearDown()
  })

  describe('Create', () => {
    describe('Success', () => {
      let user
      before(() => {
        user = createUser()
      })
      it('should create user successfully', () => expect(userModel.create(user)).eventually.fulfilled)
      it('should save the right details', async () => {
        const { _id } = await userModel.create(user)
        const { name, phone_number: phoneNumber, email } = await baseModel().get({
          query: {
            _id
          },
          model
        })
        return expect({ name, phone_number: phoneNumber, email }).eql(omitPassword({ ...user }))
      })
    })

    describe('Failure', () => {
      it('should fail if user object is not passed', () => expect(() => userModel.create()).throws('user is required'))
    })
  })

  describe('Get', () => {
    describe('Success', () => {
      let user
      before(async () => {
        user = await insertUser()
      })
      it('should successfully get user', () => expect(userModel.get({ query: { _id: user._id } })).eventually.fulfilled())
      it('should return the right details', () => expect(userModel.get({ query: { _id: user._id } })).eventually.eql({
        ...user
      }))
    })
    describe('Failure', () => {
      it('should fail if query is not provided', () => expect(() => userModel.get({})).throws('query is required'))
    })
  })

  describe('Update', () => {
    describe('Success', () => {
      let user
      before(async () => {
        user = await insertUser()
      })
      it('should update user successfully', () => {
        const newObj = createUser()
        return expect(userModel.update({
          query: { _id: user._id },
          update: { ...newObj }
        })).eventually.fulfilled('fulfilled successfully')
      })

      it('should update with the right data', async () => {
        const updateObj = createUser()
        const { _id } = user
        await userModel.update({
          query: { _id: user._id },
          update: { ...updateObj }
        })
        const {
          name, phone_number: phoneNumber, email, password
        } = await baseModel().get({
          query: {
            _id
          },
          model
        })
        return expect({
          _id: _id.toString(), name, phone_number: phoneNumber, email, password
        }).eql({ ...updateObj, _id: _id.toString() })
      })
    })

    describe('Failure', () => {
      let user
      before(() => {
        user = createUser()
      })

      it('should fail if query is not provided', () => expect(() => userModel.update({ update: { ...user } })).throws('query is required'))

      it('should fail if update object is not provided', () => expect(() => userModel.update({ query: { _id: '123455' } })).throws('update is required'))
    })
  })
})
