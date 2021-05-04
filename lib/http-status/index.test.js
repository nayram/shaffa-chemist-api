'use strict'

const { expect } = require('chai')
const status = require('./index')()

describe('Status codes', () => {
  it('should return 200 for ok', () => {
    expect(status.OK).to.equal(200)
  })

  it('should return 404 for not found requests', () => {
    expect(status.NOT_FOUND).to.equal(404)
  })

  it('should return 400 for bad requests', () => {
    expect(status.BAD_REQUEST).to.equal(400)
  })

  it('should return 403 for failed authentication requests', () => {
    expect(status.AUTHENTICATION_FAILED).to.equal(403)
  })

  it('should return 500 for requests causing internal server error', () => {
    expect(status.INTERNAL_SERVER_ERROR).to.equal(500)
  })
})
