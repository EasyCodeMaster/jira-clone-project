const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pictureId: { type: ObjectId, required: true },
})

module.exports = mongoose.model('User', UserSchema)
