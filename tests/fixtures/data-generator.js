const faker = require('faker')
const objectId = require('bson-objectid')
const { clone, mergeDeepRight } = require('ramda')

const createUser = (override = {}) => {
  const newObj = clone(override)
  return mergeDeepRight({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phone_number: faker.phone.phoneNumber('0277073834'),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(6)
  }, newObj)
}

const createPrescription = (override = {}) => {
  const newObj = clone(override)
  return mergeDeepRight({
    image_url: faker.internet.url(),
    user_id: objectId(),
    note: faker.random.words()
  }, newObj)
}

module.exports = {
  createUser,
  createPrescription
}
