const logger = require('../../logger')

module.exports = function logSetup(options) {
  const log = logger({ serviceName: 'mongodb-utils' })
  return options ? log.child(options) : log
}
