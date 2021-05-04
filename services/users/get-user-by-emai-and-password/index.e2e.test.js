const chaiAsPromised = require('chai-as-promised')
const { expect } = require('chai').use(chaiAsPromised)
const { setUp, tearDown } = require('../../../lib/mongodb-utils/lib/tests/utils')
const utils = require('../../../tests/utils')
const getUserByEmailAndPassword = require('./index')

describe('get-user-by-email-and-password', () => {
  let user
  const userPassword = '12345'
  before(async () => {
    await setUp()
    user = await utils.insertUser({
      password: userPassword
    })
  })

  after(async () => {
    await tearDown()
  })

  it('should fail if email is not provided', () => expect(getUserByEmailAndPassword({
    password: user.password
  })).to.eventually.rejectedWith('"email" is required'))

  it('should fail if password is not provided', () => expect(getUserByEmailAndPassword({
    email: user.email
  })).to.eventually.rejectedWith('"password" is required'))

  it('should throw error if user authentication fails', () => expect(getUserByEmailAndPassword({
    email: user.email,
    password: 'password'
  })).rejectedWith('authentication failed'))

  it('should return the right user details', () => {
    const { email } = user
    delete user.password
    return expect(getUserByEmailAndPassword({
      email,
      password: userPassword
    })).eventually.eql(user)
  })
})
