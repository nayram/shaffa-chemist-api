const request = require('supertest');
const { expect } = require('chai');
const joi = require('joi');
const app = require('express')();
const bodyParser = require('body-parser');
const validate = require('./index');

app.use(bodyParser.json());

const paramsSchema = {
  params: {
    id: joi.number().required()
  }
};

app.get('/users/:id', validate(paramsSchema), (req, res, next) => {
  res.send(req.params);
});

app.get('/', validate(), (req, res, next) => {
  res.send();
});

app.use((err, _req, res, next) => {
  res.status(err.status).send(err);
});

describe('express-joi-validator', () => {
  it('should return 400 bad request if the url param is invalid', () => {
    const error = [{
      message: '"params.id" must be a number',
      param: 'params.id',
      value: 'jack'
    }]
    return request(app)
      .get('/users/jack')
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.details).eql(error)
      })
  });

  it('should return 200 even if there\'s no schema to validate', () => request(app)
    .get('/')
    .expect(200));
});
