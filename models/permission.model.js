const mongoose = require('mongoose')

const { Schema } = mongoose

const PermissionSchema = new Schema({
  name: { type: String, required: true },
  order: { type: Number, required: true },
  admin: { type: Boolean, required: true },
  member: { type: Boolean, required: true },
})

module.exports = mongoose.model('permission', PermissionSchema)
