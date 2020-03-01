const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const RolePermissionSchema = new Schema({
  roleId: { type: ObjectId, required: true },
  permissionId: { type: ObjectId, required: true },
})

RolePermissionSchema.index({ roleId: 1, permissionId: 1 }, { unique: true })

module.exports = mongoose.model('role_permission', RolePermissionSchema)
