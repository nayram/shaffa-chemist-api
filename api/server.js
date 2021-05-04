const { start } = require('../lib/resource-manager')

const app = require('./app')()
const db = require('../lib/resources/mongodb')
const log = require('../lib/logger')({
  serviceName: 'api'
}).child({ type: 'api/server' })
const config = require('../config')

const PORT = config('PORT')
let server

const onReady = (_) => {
  if (server) return server

  server = app.listen(PORT, (_) => log.info(`server running on port ${PORT}`))
}

const onShutDown = (_) => {
  if (server) {
    log.info('shutting down server on port 3000')
    return server.close((err) => {
      if (err) {
        log.err(err)
      }
    })
  }
}

start({ resources: [db()], onReady, onShutDown })
