const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = {
  schema: schema,
  model: mongoose.model('shop', schema)
}
