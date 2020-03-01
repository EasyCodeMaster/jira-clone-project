const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const AssigneeIssue = new Schema({
  userId: { type: ObjectId, required: true },
  issueId: { type: ObjectId, required: true },
})

AssigneeIssue.index({ userId: 1, issueId: 1 }, { unique: true })

module.exports = mongoose.model('assignee_issue', AssigneeIssue)
