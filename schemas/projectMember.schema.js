const { gql } = require('apollo-server-express')
const ProjectMember = require('../models/projectMember.model')

const ProjectMemberType = gql`
  type ProjectMember {
    _id: ID!
    projectId: ID!
    userId: ID!
    roleId: ID!
  }
  extend type Mutation {
    createProjectMember(projectId: ID!, userId: ID!, roleId: ID!): ProjectMember!
    deleteProjectMember(_id: ID!): Boolean!
  }
`

const ProjectMemberResolver = {
  Mutation: {
    createProjectMember: (_, args) => ProjectMember.create(args),
    deleteProjectMember: async (_, { _id }) => {
      await ProjectMember.deleteOne({ _id })
      return true
    },
  },
}

module.exports = { ProjectMemberType, ProjectMemberResolver }
