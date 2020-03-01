const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const SprintSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  statusId: { type: ObjectId, required: true },
  projectId: { type: ObjectId, required: true },
  order: { type: Number, required: true },
})

module.exports = mongoose.model('Sprint', SprintSchema)
