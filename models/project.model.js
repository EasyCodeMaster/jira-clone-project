const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  pictureId: { type: ObjectId, required: true },
})

module.exports = mongoose.model('Project', ProjectSchema)
