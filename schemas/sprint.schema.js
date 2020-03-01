const { gql } = require('apollo-server-express')
const DataLoader = require('dataloader')
const Issue = require('../models/issue.model')
const dbutl = require('./database.utils')
const Sprint = require('../models/sprint.model')
const SprintStatus = require('../models/sprintStatus.model')

const SprintType = gql`
  type Sprint {
    _id: ID!
    name: String!
    description: String
    status: SprintStatus!
    order: Int!
    project: Project!
    issues: [Issue]!
  }
  extend type Query {
    sprint: Sprint
    sprints: [Sprint]!
  }
  input SprintInput {
    name: String
    description: String
    statusId: ID
  }
  input SprintRequiredInput {
    name: String!
    description: String
    projectId: ID!
    statusId: ID!
  }
  extend type Mutation {
    createSprint(sprint: SprintRequiredInput): Sprint!
    updateSprint(_id: ID!, sprint: SprintInput!): Boolean!
    deleteSprint(_id: ID!, newSprintId: ID!): Boolean!
  }
`

const SprintResolver = {
  Sprint: {
    status: async (parent, _, context) => context.sprintStatus.load(parent.statusId),
    issues: async (parent, _, context) => context.sprintIssue.load(parent._id),
  },
  Query: {
    sprint: (_, { _id }) => Sprint.findOne({ _id }),
    sprints: (_, { sprint }) => dbutl.queryByFields(Sprint, sprint),
  },
  Mutation: {
    createSprint: async (_, { sprint }) => {
      const { projectId } = sprint
      const { order } = dbutl.nextOrder(Sprint, { projectId })
      return Sprint.create({ ...sprint, order })
    },
    updateSprint: async (_, { _id, sprint }) => {
      await Sprint.updateOne({ _id }, { $set: sprint })
      return true
    },
    deleteSprint: async (_, { _id, newSprintId }) => {
      const promises = [await Sprint.deleteOne({ _id }), Issue.updateMany({ sprintId: _id }, { $set: { sprintId: newSprintId } })]
      await Promise.all(promises)
      return true
    },
  },
}

const SprintContext = {
  sprintStatus: new DataLoader((keys) => dbutl.queryManyToOne(SprintStatus, keys)),
  sprintIssue: new DataLoader(async (keys) => dbutl.queryManyToOne(Issue, keys)),
}

module.exports = { SprintType, SprintResolver, SprintContext }
