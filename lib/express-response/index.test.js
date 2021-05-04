'use strict'
const { expect } = require('chai')
const express = require('express')
const request = require('supertest')

const respond = require('./index')

describe('Express response',() => {

  let app = express()
  let responseWithSingleData
  let responseWithArrayOfData

  before(() => {
    responseWithSingleData = { foo: 'bar' }
    responseWithArrayOfData = [{ foo: 'bar' }, { foo: 'bar_one' }]
    app.get('/blocks', (req, res, next) => {
      return respond({ res, status: 200 })({
        data: responseWithArrayOfData
      })
    })

    app.get('/details', (req, res, next) => {
      return respond({ res, status: 200 })({ data: responseWithSingleData })
    })
  })

  it('should throw if no status is passed', () => {
    expect(() => respond({ res: {} })).to.throw('status is required')
  })

  it('should throw if res is not passed', () => {
    expect(() => respond({})).to.throw('res is required')
  })

  it('should throw if no data is passed', () => {
    expect(() => respond({ res: {}, status: 200 })()).to.throw(
      'data is required'
    )
  })

  it('should return status 200 if status is passed', () => {
    return request(app)
      .get('/blocks')
      .expect(200)
  })

  it('should return data for single response object', () => {
    return request(app)
      .get('/details')
      .send()
      .then(({ body }) => {
        expect(body).to.eql({ data: { foo: 'bar' } })
      })
  })

  it('shoud return data for array response', () => {
    return request(app)
    .get('/blocks')
    .send()
    .expect(200)
    .then(({ body }) => {
      expect(body).to.eql({ data: [{ foo: 'bar' }, { foo: 'bar_one' }] })
    })
  })

})