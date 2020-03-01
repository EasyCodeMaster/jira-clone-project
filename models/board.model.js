const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const board = new Schema({
  name: { type: String, required: true },
  order: { type: Number, required: true },
  projectId: { type: ObjectId, required: true },
})

module.exports = mongoose.model('board', board)
