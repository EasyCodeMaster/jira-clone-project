const { gql } = require('apollo-server-express')
const AssigneeIssue = require('../models/assigneeIssue.model')

const AssigneeIssueType = gql`
  type AssigneeIssue {
    _id: ID!
    userId: ID!
    issueId: ID!
  }
  extend type Mutation {
    createAssigneeIssue(userId: ID!, issueId: ID!): AssigneeIssue!
    deleteAssigneeIssue(userId: ID!, issueId: ID!): Boolean!
  }
`

const AssigneeIssueResolver = {
  Mutation: {
    createAssigneeIssue: (_, args) => AssigneeIssue.create(args),
    deleteAssigneeIssue: async (_, { _id }) => {
      await AssigneeIssue.remove({ _id })
      return true
    },
  },
}

module.exports = { AssigneeIssueType, AssigneeIssueResolver }
