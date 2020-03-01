const { makeExecutableSchema } = require('graphql-tools')
const { merge } = require('lodash')
const { gql } = require('apollo-server-express')
const { ApolloServer } = require('apollo-server-express')
const { ProjectType, ProjectResolver, ProjectContext } = require('./project.schema')
const { UserType, UserResolver, UserContext } = require('./user.schema')
const { PictureType, PictureResolver } = require('./picture.schema')
const { PriorityType, PriorityResolver, PriorityContext } = require('./priority.schema')
const { IssueType, IssueResolver, IssueContext } = require('./issue.schema')
const { SprintType, SprintResolver, SprintContext } = require('./sprint.schema')
const { IssueTypeType, IssueTypeResolver } = require('./issueType.schema')
const { LabelType, LabelResolver } = require('./label.schema')
const { BoardType, BoardResolver, BoardContext } = require('./board.schema')
const { PermissionType, PermissionResolver } = require('./permission.schema')
const { SprintStatusType, SprintStatsusResolver } = require('./sprintStatus.schema')
const { RoleType, RoleResolver } = require('./role.schema')
const { AssigneeIssueType, AssigneeIssueResolver } = require('./assigneeIssue.schema')
const { IssueLabelType, IssueLabelResolver } = require('./IssueLabel.schema')
const { RolePermissionType, RolePermissionResolver } = require('./RolePermission.schema')
const { ProjectMemberType, ProjectMemberResolver } = require('./projectMember.schema')

const Query = gql`
  type Query {
    _empty: String
  }
`
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`

const schema = makeExecutableSchema({
  typeDefs: [
    Query,
    Mutation,
    ProjectType,
    UserType,
    PictureType,
    PriorityType,
    IssueType,
    SprintType,
    BoardType,
    IssueTypeType,
    LabelType,
    PermissionType,
    SprintStatusType,
    RoleType,
    AssigneeIssueType,
    IssueLabelType,
    RolePermissionType,
    ProjectMemberType,
  ],
  resolvers: merge(
    ProjectResolver,
    UserResolver,
    PictureResolver,
    PriorityResolver,
    IssueResolver,
    SprintResolver,
    BoardResolver,
    IssueTypeResolver,
    LabelResolver,
    PermissionResolver,
    SprintStatsusResolver,
    RoleResolver,
    AssigneeIssueResolver,
    IssueLabelResolver,
    RolePermissionResolver,
    ProjectMemberResolver,
  ),
})

const server = new ApolloServer({
  schema,
  context: () => ({
    ...UserContext,
    ...ProjectContext,
    ...SprintContext,
    ...BoardContext,
    ...IssueContext,
    ...PriorityContext,
  }),
})

module.exports = server
