const { gql } = require('apollo-server-express')
const DataLoader = require('dataloader')
const Project = require('../models/project.model')
const Priority = require('../models/priority.model')
const Issue = require('../models/issue.model')
const dbutl = require('./database.utils')

const PriorityType = gql`
  type Priority {
    _id: ID!
    name: String!
    color: String!
    icon: String!
    order: Int!
    projectId: ID!
    default: Boolean!
    project: Project!
    issues: [Issue]!
  }
  input PriorityRequiredInput {
    _id: ID!
    name: String!
    color: String!
    icon: String!
    order: Int!
    projectId: ID!
  }
  input PriorityInput {
    name: String
    color: String
    icon: String
    order: Int
  }
  extend type Query {
    priority(_id: ID!): Priority
    priorities(priority: PriorityInput): [Priority]!
  }
  extend type Mutation {
    createPriority(priority: PriorityRequiredInput!): Priority!
    updatePriority(_id: ID!, priority: PriorityInput): Boolean!
    deletePriority(_id: ID!, newPriorityId: ID!): Boolean!
    reorderPriority(_id: ID!, order: Int!, newOrder: Int!, projectId: ID!): Boolean!
  }
`

const PriorityResolver = {
  Priority: {
    project: async (parent, _, context) => context.priorityProject.load(parent.projectId),
    issues: (parent, _, context) => context.priorityIssues.load(parent._id),
  },
  Query: {
    priority: (_, { _id }) => Priority.findOne(_id),
    priorities: (_, { priority }) => dbutl.queryByFields(Priority, priority),
  },
  Mutation: {
    createPriority: async (_, { priority }) => {
      const { projectId } = priority
      const { order } = await dbutl.nextOrder(Priority, { projectId })
      return Priority.create({ ...priority, order })
    },
    updatePriority: async (_, { _id, priority }) => {
      await Priority.updateOne({ _id }, { $set: priority })
      return true
    },
    deletePriority: async (_, { _id, newPriorityId }) => {
      const promises = [Priority.deleteOne({ _id }), Issue.updateMany({ priorityId: _id }, { $set: { priorityId: newPriorityId } })]
      await Promise.all(promises)
      return true
    },
    reorderPriority: async (_, { _id, order, projectId, newOrder }) => dbutl.reorder(Priority, _id, order, newOrder, { projectId }),
  },
}

const PriorityContext = {
  priorityProject: new DataLoader((keys) => dbutl.queryManyToOne(Project, keys)),
  priorityIssues: new DataLoader((keys) => dbutl.queryOneToMany(Issue, keys, 'priorityId')),
}

module.exports = { PriorityType, PriorityResolver, PriorityContext }
