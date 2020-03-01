const { gql } = require('apollo-server-express')
const IssueLabel = require('../models/issueLabel.model')
const Label = require('../models/label.model')

const IssueLabelType = gql`
  type IssueLabel {
    _id: ID!
    labelId: ID!
    issueId: ID!
  }
  extend type Mutation {
    createIssueLabel(labelId: ID!, issueId: ID!): IssueLabel!
    deleteIssueLabel(_id: ID!, labelId: ID!): Boolean!
  }
`

const IssueLabelResolver = {
  Mutation: {
    createIssueLabel: (_, args) => IssueLabel.create(args),
    deleteIssueLabel: async (_, { _id, labelId }) => {
      const promises = [IssueLabel.deleteOne({ _id })]
      const issueLabels = await IssueLabel.find({ labelId })
      if (issueLabels.length === 0) {
        promises.push(Label.deleteOne({ labelId }))
      }
      await Promise.all(promises)
      return true
    },
  },
}

module.exports = { IssueLabelType, IssueLabelResolver }
