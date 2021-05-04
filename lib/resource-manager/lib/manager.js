const { EventEmitter } = require('events')
const { customError } = require('../../express-error')

const name = 'resourceManager'

module.exports = function resourceManger(...resources) {
  const hasNoResourceName = resources.some((resource) => !resource.name)
  const hasNoConnectMethod = resources.some((resource) => !resource.connect)
  const hasNoDisConnectMethod = resources.some((resource) => !resource.disconnect)

  if (resources.length < 1) throw customError({ name, message: 'resources are required' })
  if (hasNoResourceName) throw customError({ name, message: 'all resources must have a name' })
  if (hasNoConnectMethod) throw customError({ name, message: 'resources must have a connect method' })
  if (hasNoDisConnectMethod) throw customError({ name, message: 'resources must have a disconnect method' })

  const connections = Object.create(EventEmitter.prototype)
  EventEmitter.call(connections)
  let numOfConnectedresources = 0

  const onReady = () => {
    numOfConnectedresources ++
    if (numOfConnectedresources === resources.length) {
      connections.emit('connected')
    }
  }

  const onDisconnected = () => {
    numOfConnectedresources --
    if (numOfConnectedresources === 0) {
      connections.emit('disconnected')
    }
  }

  return Object.assign(connections, {
    connect() {
      numOfConnectedresources = 0
      resources.forEach((resource) => {
        resource.on('connected', onReady)
        resource.connect()
      })
      return connections
    },
    disconnect() {
      if (numOfConnectedresources === 0) {
        throw customError({ name, message: 'no resources connected yet' })
      }

      resources
        .forEach((resource) => {
          resource.on('disconnected', onDisconnected)
          resource.disconnect()
        })
      return connections
    }
  })
}
