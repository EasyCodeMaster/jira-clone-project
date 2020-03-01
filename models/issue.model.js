const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const IssueSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  point: { type: Number, required: true },
  completed: { type: Boolean, required: true },
  priorityId: { type: ObjectId, required: true },
  issueTypeId: { type: ObjectId, required: true },
  projectId: { type: ObjectId },
  projectOrder: { type: Number },
  sprintId: { type: ObjectId },
  sprintOrder: { type: Number },
  boardId: { type: ObjectId },
  boardOrder: { type: Number },
})

// IssueSchema.index({ projectId: 1, projectOrder: 1 }, { unique: true, sparse: true })
// IssueSchema.index({ sprintId: 1, sprintOrder: 1 }, { unique: true, sparse: true })
// IssueSchema.index({ boardId: 1, boardOrder: 1 }, { unique: true, sparse: true })

module.exports = mongoose.model('issue', IssueSchema)
