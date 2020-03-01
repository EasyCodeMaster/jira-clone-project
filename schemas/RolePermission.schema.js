const { gql } = require('apollo-server-express')
const RolePermission = require('../models/rolePermission.model')

const RolePermissionType = gql`
  type RolePermission {
    _id: ID!
    roleId: ID!
    permissionId: ID!
  }
  extend type Mutation {
    createRolePermission(roleId: ID!, permissionId: ID!): RolePermission
    deleteRolePermission(_id: ID!): Boolean
  }
`

const RolePermissionResolver = {
  Mutation: {
    createRolePermission: (_, args) => RolePermission.create(args),
    deleteRolePermission: async (_, { _id }) => {
      await RolePermission.deleteOne({ _id })
      return true
    },
  },
}

module.exports = { RolePermissionType, RolePermissionResolver }
