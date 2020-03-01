const { gql } = require('apollo-server-express')
const DataLoader = require('dataloader')
const Issue = require('../models/issue.model')
const Priority = require('../models/priority.model')
const dbutl = require('./database.utils')
const IssueTypeModel = require('../models/issueType.model')
const IssueLabel = require('../models/issueLabel.model')

const IssueType = gql`
  type Issue {
    _id: ID!
    name: String!
    description: String
    point: String!
    completed: Boolean!
    proejctId: ID!
    projectOrder: Int
    sprintId: ID
    sprintOrder: Int
    boardId: ID
    boardOrder: Int
    priority: Priority!
    issueType: IssueType!
    labels: [Label]!
  }
  input IssueRequiredInput {
    name: String!
    description: String
    point: Int!
    priorityId: ID!
    issueTypeId: ID!
    completed: Boolean!
    projectId: ID!
    boardId: ID
    sprintId: ID
  }
  input IssueInput {
    name: String
    description: String
    point: Int
    priorityId: ID
    issueTypeId: ID
  }
  input IssueProjectInput {
    projectId: ID!
    projectOrder: ID!
  }
  input IssueSprintInput {
    sprintId: ID!
    sprintOrder: ID!
  }
  input IssueBoardInput {
    boardId: ID!
    boardOrder: ID!
  }
  extend type Query {
    issue(_id: ID!): Issue
    issues(issue: IssueInput): [Issue]!
  }
  extend type Mutation {
    createIssue(issue: IssueRequiredInput!): Issue!
    updateIssue(_id: ID!, issue: IssueInput): Boolean!
    deleteIssue(_id: ID!): Boolean!
    reorderIssue(_id: ID!, newOrder: Int!, issueProject: IssueProjectInput, issueSprint: IssueSprintInput, issueBoard: IssueBoardInput): Boolean!
    moveIssue(_id: ID!, projectId: ID, boardId: ID, sprintId: ID, completed: Boolean!): Boolean!
  }
`

const IssueResolver = {
  Issue: {
    priority: async (parent, _, context) => context.issuePriority.load(parent.priorityId),
    issueType: async (parent, _, context) => context.issueType.load(parent.issueTypeId),
    labels: async (parent, _, context) => context.issueLabels.load(parent._id),
  },
  Query: {
    issue: (_, { _id }) => Issue.findOne({ _id }),
    issues: (_, { issue }) => dbutl.queryByFields(Issue, issue),
  },
  Mutation: {
    createIssue: async (_, { issue }) => {
      const { boardId, sprintId, projectId } = issue
      const promises = [
        dbutl.nextOrder(Issue, { boardId }, 'boardOrder'),
        dbutl.nextOrder(Issue, { sprintId }, 'sprintOrder'),
        dbutl.nextOrder(Issue, { projectId }, 'projectOrder'),
      ]
      const orders = await Promise.all(promises)
      orders.forEach((order) => {
        if (order) issue = { ...issue, ...order }
      })
      return Issue.create(issue)
    },
    updateIssue: async (_, { _id, issue }) => {
      await Issue.updateOne({ _id }, { $set: issue })
      return true
    },
    deleteIssue: async (_, { _id }) => {
      const promises = [Issue.deleteOne({ _id }), IssueLabel.deleteMany({ issueId: _id })]
      await Promise.all(promises)
      return true
    },
    reorderIssue: async (_, { _id, newOrder, issueProject, issueSprint, issueBoard }) => {
      const { projectId, projectOrder } = issueProject || {}
      const { sprintId, sprintOrder } = issueSprint || {}
      const { boardId, boardOrder } = issueBoard || {}
      const promises = [
        dbutl.reorder(Issue, _id, projectOrder, newOrder, { projectId }, 'projectOrder'),
        dbutl.reorder(Issue, _id, sprintOrder, newOrder, { sprintId }, 'sprintOrder'),
        dbutl.reorder(Issue, _id, boardOrder, newOrder, { boardId }, 'boardOrder'),
      ]
      const results = await Promise.all(promises)
      return results.every((result) => result)
    },
    moveIssue: async (_, { _id, projectId, boardId, sprintId, completed }) => {
      const promises = [
        dbutl.nextOrder(Issue, { boardId }, 'boardOrder'),
        dbutl.nextOrder(Issue, { sprintId }, 'sprintOrder'),
        dbutl.nextOrder(Issue, { projectId }, 'projectOrder'),
      ]
      const ids = [{ boardId }, { sprintId }, { projectId }]
      const orders = await Promise.all(promises)
      let $set = { completed }
      orders.forEach((order, i) => {
        if (order) $set = { ...$set, ...order, ...ids[i] }
      })
      await Issue.updateOne({ _id }, $set)
      return true
    },
  },
}

const IssueContext = {
  issuePriority: new DataLoader((keys) => dbutl.queryManyToOne(Priority, keys)),
  issueType: new DataLoader((keys) => dbutl.queryManyToOne(IssueTypeModel, keys)),
  issueLabels: new DataLoader((keys) => dbutl.queryManyToMany(IssueLabel, keys, 'issueId', 'labels', 'labelId')),
}

module.exports = { IssueType, IssueResolver, IssueContext }
