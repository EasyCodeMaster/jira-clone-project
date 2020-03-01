const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose
const ProjectMemberSchema = new Schema({
  projectId: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },
  roleId: { type: ObjectId, required: true },
  order: { type: Number, required: true },
})

ProjectMemberSchema.index({ projectId: 1, userId: 1 }, { unique: true })

module.exports = mongoose.model('project_member', ProjectMemberSchema)
