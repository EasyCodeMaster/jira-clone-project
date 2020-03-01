const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const LabelSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  projectId: { type: ObjectId, required: true },
  order: { type: Number, required: true },
})

module.exports = mongoose.model('label', LabelSchema)
