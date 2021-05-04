const log = require('./logger')
const resourceManager = require('./manager')

const READINESS_PROBE_DELAY = 3 * 2 * 1000

const onConnectionsReady = (done) => async () => {
  await done()
}

const onConnectionsDead = () => {
  log.info('connections closed')
  process.emit('SIGINT')
}

const logAndExit = (err) => {
  if (err) log.error({ err })
  process.exit()
}

const closeResources = (manager) => (done) => {
  manager.disconnect()
  done()
}

const shutDown = (manager) => async ({ event, onShutDown }) => {
  log.info(`Shutting down on ${event} event`)
  await onShutDown()
  closeResources(manager)(logAndExit)
}

const start = ({
  resources,
  onReady,
  onShutDown,
  delay = READINESS_PROBE_DELAY
}) => {
  const manager = resourceManager(...resources)

  manager
    .on('connected', onConnectionsReady(onReady))
    .on('disconnected', onConnectionsDead)
    .connect()

  process
    .on('exit', (err) => {
      if (err) log.error({ err })
      return setTimeout(() => shutDown(manager)({ onShutDown, event: 'SIGTERM' }),
        delay)
    })
    .on('SIGINT', (err) => {
      if (err) log.error(err)
      return setTimeout(() => shutDown(manager)({ onShutDown, event: 'SIGINT' }), delay)
    })
    .on('unhandledRejection', (error) => {
      log.error(error)
      return setTimeout(() => shutDown(manager)({ onShutDown, event: 'SIGINT' }), delay)
    })
}

module.exports = {
  start
}
