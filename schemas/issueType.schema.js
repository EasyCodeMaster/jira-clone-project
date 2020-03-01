const { gql } = require('apollo-server-express')
const IssueType = require('../models/issueType.model')
const Issue = require('../models/issue.model')
const dbutl = require('./database.utils')

const IssueTypeType = gql`
  type IssueType {
    _id: ID!
    name: String!
    icon: String!
    projectId: ID!
  }
  input issueRequiredType {
    name: String!
    icon: String!
    projectId: ID!
  }
  input issueTypeInput {
    name: String
    icon: String
    projectId: ID
  }
  extend type Query {
    type(_id: ID!): IssueType
    types(issueType: issueTypeInput): [IssueType]!
  }
  extend type Mutation {
    createIssueType(issue: issueRequiredType!): IssueType!
    updateIssueType(_id: ID!, issue: issueTypeInput!): Boolean!
    deleteIssueType(_id: ID!, newTypeId: ID!): Boolean!
    reorderIssueType(_id: ID!, order: Int!, newIndex: Int!, projectId: ID!): Boolean!
  }
`

const IssueTypeResolver = {
  Query: {
    type: (_, { _id }) => IssueType.findOne({ _id }),
    types: (_, { issueType }) => dbutl.queryByFields(IssueType, issueType),
  },
  Mutation: {
    createIssueType: async (_, { issueType }) => {
      const { projectId } = issueType
      const { order } = await dbutl.nextOrder(IssueType, { projectId })
      return IssueType.create({ ...issueType, order })
    },
    updateIssueType: async (_, { _id, issue }) => {
      await IssueType.update({ _id }, issue)
      return true
    },
    deleteIssueType: async (_, { _id, newTypeId }) => {
      const promises = [Issue.updateMany({ issueTypeId: _id }, { $set: { IssueTypeId: newTypeId } }), IssueType.deleteOne({ _id })]
      await Promise.all(promises)
      return true
    },
    reorderIssueType: (_, { _id, order, newIndex, projectId }) => dbutl.reorder(IssueType, _id, order, newIndex, { projectId }),
  },
}

module.exports = { IssueTypeType, IssueTypeResolver }
