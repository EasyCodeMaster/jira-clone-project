const { gql } = require('apollo-server-express')
const DataLoader = require('dataloader')
const User = require('../models/user.model')
const AssigneeIssue = require('../models/assigneeIssue.model')
const Picture = require('../models/picture.model')
const ProjectMember = require('../models/projectMember.model')
const dbutl = require('./database.utils')

const UserType = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    picture: Picture!
    projects: [Project]!
    issues: [Issue]!
  }
  input UserInput {
    name: String
    email: String
    pictureId: ID
  }
  input UserRequiredInput {
    name: String!
    email: String!
    pictureId: ID!
  }
  extend type Query {
    user(_id: ID!): User
    users(user: UserInput): [User]!
  }
  extend type Mutation {
    createUser(user: UserRequiredInput!): User
    updateUser(_id: ID!, user: UserInput!): Boolean
  }
`

const UserResolver = {
  User: {
    projects: (parent, _, context) => context.userProjects.load(parent._id),
    picture: async (parent, _, context) => context.userPicture.load(parent.pictureId),
    issues: async (parent, _, context) => context.assigneeIssues.load(parent._id),
  },
  Query: {
    user: (_, { _id }) => User.findOne({ _id }),
    users: (_, { user }) => dbutl.queryByFields(User, user),
  },
  Mutation: {
    createUser: (_, { user }) => User.create(user),
    updateUser: async (_, { _id, user }) => {
      await User.updateOne({ _id }, { $set: user })
      return true
    },
  },
}

const UserContext = {
  userPicture: new DataLoader((keys) => dbutl.queryManyToOne(Picture, keys)),
  userProjects: new DataLoader((keys) => dbutl.queryManyToMany(ProjectMember, keys, 'userId', 'projects', 'projectId')),
  assigneeIssues: new DataLoader((keys) => dbutl.queryManyToMany(keys, AssigneeIssue, 'userId', 'issues', 'issueId')),
}

module.exports = { UserType, UserResolver, UserContext }
