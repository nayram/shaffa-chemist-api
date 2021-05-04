const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  }
})

const model = mongoose.model('User', schema)

module.exports = {
  model,
  schema
}
