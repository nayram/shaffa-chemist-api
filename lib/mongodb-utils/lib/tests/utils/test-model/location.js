const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = {
  schema,
  model: mongoose.model('location', schema, 'locations')
}
