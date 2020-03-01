const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const PrioritySchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  icon: { type: String, required: true },
  order: { type: Number, required: true },
  projectId: { type: ObjectId, required: true },
})

module.exports = mongoose.model('priority', PrioritySchema)
