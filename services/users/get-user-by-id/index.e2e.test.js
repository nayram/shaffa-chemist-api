const objectId = require('bson-objectid')
const chaiAsPromised = require('chai-as-promised')
const { expect } = require('chai').use(chaiAsPromised)
const { setUp, tearDown } = require('../../../lib/mongodb-utils/lib/tests/utils')
const utils = require('../../../tests/utils')
const getUserById = require('./index')

describe('get-user-by-id', () => {
  let user
  before(async () => {
    await setUp()
    user = await utils.insertUser()
    delete user.password
  })

  after(async () => {
    await tearDown()
  })

  it('should fail if id is not provided', () => expect(() => getUserById()).throws('id is required'))
  it('should throw error if user does not exist', () => {
    const id = objectId()
    return expect(getUserById(id)).rejectedWith('user does not exist')
  })
  it('should return the right user details', () => expect(getUserById(user._id)).eventually.eql(user))
})
