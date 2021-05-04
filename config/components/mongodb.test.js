const { expect } = require('chai')

const copyEnvs = () => ({ ...process.env })
const deleteRequireCache = (key) => delete require.cache[key]
const env = copyEnvs()

describe('Mongodb Component config', () => {
  const module = './mongodb.js'

  beforeEach(async () => {
    deleteRequireCache(require.resolve(module))
    process.env = {
      MONGODB_URL: 'mongodb://localhost:2701'
    }
  })

  after(async () => {
    process.env = env
  })

  it('should throw an error if MONGODB_URL content is not allowed', async () => {
    delete process.env.MONGODB_URL

    const errMsg = 'Mongodb validation error: "MONGODB_URL" is required'
    return expect(() => require(module).MONGODB_URL).to.throw(errMsg)
  })

  it('should contain  the right configs', async () => {
    const config = require(module)

    return expect(config).to.contain.all.keys(['MONGODB_URL'])
  })
})
