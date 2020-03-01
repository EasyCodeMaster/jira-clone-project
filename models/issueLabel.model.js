const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const IssueLabelSchema = new Schema({
  issueId: { type: ObjectId, required: true },
  labelId: { type: ObjectId, required: true },
})

IssueLabelSchema.index({ labelId: 1, issueId: 1 }, { unique: true })

module.exports = mongoose.model('issue_label', IssueLabelSchema)
