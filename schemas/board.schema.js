const DataLoader = require('dataloader')
const { gql } = require('apollo-server-express')
const Board = require('../models/board.model')
const Issue = require('../models/issue.model')
const dbutl = require('./database.utils')

const BoardType = gql`
  type Board {
    _id: ID!
    name: String!
    issues: [Issue]!
  }
  input BoardInput {
    name: String
  }
  input BoardRequiredInput {
    name: String!
  }
  extend type Query {
    board(_id: ID!): Board
    boards(board: BoardInput): [Board]!
  }
  extend type Mutation {
    createBoard(board: BoardRequiredInput!, projectId: ID!): Board!
    updateBoard(_id: ID!, board: BoardInput!): Boolean!
    deleteBoard(_id: ID!, newBoardId: ID!): Boolean!
    reorderBoard(_id: ID!, order: Int!, newOrder: Int!, projectId: ID!): Boolean!
  }
`

const BoardResolver = {
  Board: {
    issues: async (parent, _, context) => context.boardIssues.load(parent._id),
  },
  Query: {
    board: (_, { _id }) => Board.findOne({ _id }),
    boards: (_, { board }) => dbutl.queryByFields(Board, board),
  },
  Mutation: {
    createBoard: async (_, { board, projectId }) => {
      const { order } = await dbutl.nextOrder(Board, { projectId })
      return Board.create({ ...board, order })
    },
    updateBoard: async (_, { _id, board }) => {
      await Board.updateOne({ _id }, { $set: board })
      return true
    },
    deleteBoard: async (_, { _id, newBoardId }) => {
      const promises = [Board.deleteOne({ _id }), Issue.updateMany({ boardId: _id }, { $set: { boardId: newBoardId } })]
      await Promise.all(promises)
      return true
    },
    reorderBoard: (_, { _id, order, newOrder, projectId }) => dbutl.reorder(Board, _id, order, newOrder, { projectId }),
  },
}

const BoardContext = {
  boardIssues: new DataLoader((keys) => dbutl.queryOneToMany(Issue, keys)),
}

module.exports = { BoardType, BoardResolver, BoardContext }
