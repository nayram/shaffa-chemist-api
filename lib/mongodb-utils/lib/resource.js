const mongoose = require('mongoose')
const util = require('util')
const { EventEmitter } = require('events')
const { validateMongodbUrl: validate } = require('../../utils')
const log = require('./logger')({ type: 'mongodb' })

mongoose.Promise = global.Promise

function MongooseConnector(
  url
) {
  this.url = url
  this.name = 'mongodb'
  EventEmitter.call(this)
}

util.inherits(MongooseConnector, EventEmitter)

MongooseConnector.prototype.connect = function connect() {
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)
  mongoose.set('useFindAndModify', false)
  mongoose.connect(this.url)
  this.connection = mongoose.connection
  const db = this.connection
  db.on('open', () => {
    this.emit('connected', {
      instance: db,
      name: 'mongodb'
    })
    log.info('Connected to mongodb successfully')
  })
    .on('error', (err) => {
      log.error(err)
    })
    .on('close', () => {
      log.info('Disconnected mongodb successfully')
    })
}

MongooseConnector.prototype.disconnect = function disconnect() {
  this.connection.close()
  this.emit('disconnected')
}

module.exports = {
  getDbConnector: (url) => new MongooseConnector(validate(url))
}
