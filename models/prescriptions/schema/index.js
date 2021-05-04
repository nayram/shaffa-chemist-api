const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

const model = mongoose.model('Prescription', schema)

module.exports = {
  model,
  schema
}
