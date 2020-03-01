const { gql } = require('apollo-server-express')
const dbutl = require('./database.utils')
const SprintStatus = require('../models/sprintStatus.model')

const SprintStatusType = gql`
  type SprintStatus {
    _id: ID!
    name: String!
  }
  extend type Query {
    sprintStatus: SprintStatus
    sprintStatuses: [SprintStatus]!
  }
  extend type Mutation {
    createDefaultSprintStatuses: [SprintStatus]
  }
`

const SprintStatsusResolver = {
  Query: {
    sprintStatus: (_, { _id }) => SprintStatus.findOne({ _id }),
    sprintStatuses: (_, { sprintStatus }) => dbutl.queryByFields(SprintStatus, sprintStatus),
  },
  Mutation: {
    createDefaultSprintStatuses: () => {
      const defaultStatus = [
        { name: 'waiting', waiting: true, ongoing: false, completed: false },
        { name: 'ongoing', waiting: false, ongoing: true, completed: false },
        { name: 'completed', waiting: false, ongoing: false, completed: true },
      ]
      return SprintStatus.create(defaultStatus)
    },
  },
}

module.exports = { SprintStatusType, SprintStatsusResolver }
