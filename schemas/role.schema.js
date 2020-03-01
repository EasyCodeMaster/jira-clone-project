const { gql } = require('apollo-server-express')
const Role = require('../models/role.model')
const ProjectMember = require('../models/projectMember.model')
const dbutl = require('./database.utils')

const RoleType = gql`
  type Role {
    _id: ID!
    name: String!
    order: Int!
    admin: Boolean!
  }
  input RoleInput {
    name: String
  }
  input RoleRequiredInput {
    name: String!
    projectId: ID!
  }
  extend type Query {
    role(_id: ID!): Role
    roles(role: RoleInput): [Role]!
  }
  extend type Mutation {
    createRole(role: RoleRequiredInput!): Role
    updateRole(_id: ID!, role: RoleInput): Boolean
    deleteRole(_id: ID!): Boolean
    reorderRole(_id: ID!, order: Int!, newOrder: Int!, projectId: ID!): Boolean
  }
`

const RoleResolver = {
  Query: {
    role: (_, { _id }) => Role.findOne({ _id }),
    roles: (_, { role }) => dbutl.queryByFields(Role, role),
  },
  Mutation: {
    createRole: async (_, { role }) => {
      const { projectId } = role
      const { order } = await dbutl.nextOrder(Role, { projectId })
      return Role.create({ ...role, order })
    },
    updateRole: async (_, { _id, role }) => {
      await Role.updateOne({ _id }, { $set: role })
      return true
    },
    deleteRole: async (_, { _id }) => {
      const promises = [Role.deleteOne({ _id }), ProjectMember.deleteMany({ roleId: _id })]
      await Promise.all(promises)
      return true
    },
    reorderRole: (_, { _id, order, newOrder, projectId }) => dbutl.reorder(Role, _id, order, newOrder, { projectId }),
  },
}

module.exports = { RoleType, RoleResolver }
