const chaiAsPromise = require('chai-as-promised')
const { expect } = require('chai').use(chaiAsPromise)
const { setUp, tearDown } = require('../../../lib/mongodb-utils/lib/tests/utils')
const fixtures = require('../../../tests/fixtures/data-generator')
const addNewUser = require('./index')

describe('User Service', () => {
  before(async () => {
    await setUp()
  })

  after(async () => {
    await tearDown()
  })

  describe('Success', () => {
    let user
    beforeEach(() => {
      user = fixtures.createUser()
    })

    it('should create a user successfully', () => expect(addNewUser(user)).is.eventually.fulfilled())
  })

  describe('Failure', () => {
    let user
    beforeEach(async () => {
      user = fixtures.createUser()
    })
    it('should fail if name is not provided', () => {
      delete user.name
      return expect(addNewUser(user)).to.eventually.rejectedWith('"name" is required')
    })
    it('should fail if phone_number is not provided', () => {
      delete user.phone_number
      return expect(addNewUser(user)).to.eventually.rejectedWith('"phone_number" is required')
    })
    it('should fail if password is not provided', () => {
      delete user.password
      return expect(addNewUser(user)).to.eventually.rejectedWith('"password" is required')
    })
    it('should fail if user with same phone number already exist', async () => expect(addNewUser(user)).to.eventually.rejectedWith('user already exist'))
  })
})
