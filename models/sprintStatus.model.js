const mongoose = require('mongoose')

const { Schema } = mongoose

const SprintStatusSchema = new Schema({
  name: { type: String, required: true },
  waiting: { type: Boolean, required: true },
  ongoing: { type: Boolean, required: true },
  completed: { type: Boolean, required: true },
})

module.exports = mongoose.model('Sprint_status', SprintStatusSchema)
