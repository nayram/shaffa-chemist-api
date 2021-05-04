const faker = require('faker')
const { mergeDeepLeft, clone } = require('ramda')
const objectId = require('bson-objectid')

module.exports = {
  createEmployee(overrides = {}) {
    const newObj = clone(overrides)
    return mergeDeepLeft(newObj, {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      company: faker.company.companyName(),
      position: faker.lorem.word(),
      department: objectId()
    })
  },
  createDepartment(overrides = {}) {
    const newObj = clone(overrides)
    return mergeDeepLeft(newObj, {
      name: faker.lorem.word()
    })
  },
  createLocation(overrides = {}) {
    const newObj = clone(overrides)
    return mergeDeepLeft(newObj, {
      name: faker.lorem.word()
    })
  },
  createShop(overrides = {}) {
    const newObj = clone(overrides)
    return mergeDeepLeft(newObj, {
      id: faker.random.alphaNumeric(),
      name: faker.random.alphaNumeric()
    })
  }
}
