const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const issueTypeSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  order: { type: Number, required: true },
  projectId: { type: ObjectId, required: true },
})

module.exports = mongoose.model('issue_type', issueTypeSchema)
