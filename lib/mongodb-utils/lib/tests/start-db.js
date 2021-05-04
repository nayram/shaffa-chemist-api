const mongoose = require('mongoose')
const { getDbConnector } = require('../resource')

const { TEST_DB_URL } = process.env
const DB_CONNECTED = 1
const DB_CONNECTING = 2

const dbShouldConnect = ![DB_CONNECTED, DB_CONNECTING].includes(mongoose.connection.readyState)

module.exports = {
  async startDb(_) {
    await new Promise((resolve, reject) => {
      if (!dbShouldConnect) return resolve()
      const db = getDbConnector(TEST_DB_URL)
      db.connect()
      db.on('connected', resolve)
    })
  }
}
