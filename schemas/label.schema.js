const { gql } = require('apollo-server-express')
const Label = require('../models/label.model')
const IssueLabel = require('../models/issueLabel.model')
const dbutl = require('./database.utils')

const LabelType = gql`
  type Label {
    _id: ID!
    name: String!
    color: String!
    order: Int!
  }
  input LabelRequiredInput {
    name: String!
    color: String!
    projectId: ID!
  }
  input LabelInput {
    name: String
    color: String
  }
  extend type Query {
    label(_id: ID!): Label
    labels(label: LabelInput): [Label]!
  }
  extend type Mutation {
    createLabel(label: LabelRequiredInput!, issueId: ID!): Label
  }
`

const LabelResolver = {
  Query: {
    label: (_, { _id }) => Label.find({ _id }),
    labels: (_, { label }) => dbutl.queryByFields(Label, label),
  },
  Mutation: {
    createLabel: async (_, { label, issueId }) => {
      const { projectId } = label
      const { order } = await dbutl.nextOrder(Label, { projectId })
      const { _id } = Label.create({ ...label, order })
      await IssueLabel({ labelId: _id, issueId })
      return label
    },
  },
}

module.exports = { LabelType, LabelResolver }
