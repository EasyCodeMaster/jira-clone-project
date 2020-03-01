const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const RoleSchema = new Schema({
  name: { type: String, required: true },
  order: { type: Number, required: true },
  admin: { type: Boolean, required: true },
  projectId: { type: ObjectId, required: true },
})

module.exports = mongoose.model('role', RoleSchema)
