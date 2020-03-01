const { gql } = require('apollo-server-express')
const Permission = require('../models/permission.model')

const PermissionType = gql`
  type Permission {
    _id: ID!
    name: String!
  }
  extend type Query {
    permissions: [Permission]!
  }
  extend type Mutation {
    createDefaultPermissions: [Permission]!
  }
`

const PermissionResolver = {
  Query: {
    permissions: Permission.find(),
  },
  Mutation: {
    createDefaultPermissions: () => {
      const defaultPermissions = [
        { name: 'delete team member', order: 0, admin: 1, member: 0 },
        { name: 'create issue', order: 1, admin: 1, member: 1 },
      ]
      return Permission.create(defaultPermissions)
    },
  },
}

module.exports = { PermissionType, PermissionResolver }
