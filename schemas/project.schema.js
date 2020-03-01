const { gql } = require('apollo-server-express')
const DataLoader = require('dataloader')
const Project = require('../models/project.model')
const ProjectMember = require('../models/projectMember.model')
const Picture = require('../models/picture.model')
const Priority = require('../models/priority.model')
const dbutl = require('./database.utils')
const Sprint = require('../models/sprint.model')
const Board = require('../models/board.model')
const IssueType = require('../models/issueType.model')
const Permission = require('../models/permission.model')
const Role = require('../models/role.model')
const RolePermission = require('../models/rolePermission.model')
const Issue = require('../models/issue.model')
const Label = require('../models/label.model')
const IssueLabel = require('../models/label.model')
const AssigneeIssue = require('../models/assigneeIssue.model')

const ProjectType = gql`
  type Project {
    _id: ID!
    name: String!
    description: String
    members: [User]!
    picture: Picture!
    priorities: [Priority]!
    sprints: [Sprint]
    boards: [Board]
  }
  input ProjectRequiredInput {
    name: String!
    description: String
    userId: ID!
    pictureId: ID!
  }
  input ProjectInput {
    name: String
    description: String
    pictureId: ID
  }
  extend type Query {
    project(_id: ID!): Project!
    projects(project: ProjectInput): [Project]!
  }
  extend type Mutation {
    createProject(project: ProjectRequiredInput!): Project
    updateProject(_id: ID!, project: ProjectInput): Boolean
    deleteProject(_id: ID!): Boolean
  }
`

const ProjectResolver = {
  Project: {
    members: async (parent, _, context) => context.projectMembers.load(parent._id),
    picture: async (parent, _, context) => context.projectPicture.load(parent.pictureId),
    priorities: async (parent, _, context) => context.projectPriorities.load(parent._id),
    sprints: async (parent, _, context) => context.projectSprints.load(parent._id),
    boards: async (parent, _, context) => context.projectBoards.load(parent._id),
  },
  Query: {
    project: (_, { _id }) => Project.findOne({ _id }),
    projects: (_, { project }) => dbutl.queryByFields(Project, project),
  },
  Mutation: {
    createProject: async (_, { project }) => {
      const { userId } = project
      const promises = [Project.create(project), Permission.find()]
      const results = await Promise.all(promises)
      const newProject = results[0]
      const permissions = results[1]
      const { _id: projectId } = newProject
      const defaultRoles = [
        { name: 'admin', order: 0, projectId, admin: true },
        { name: 'member', order: 1, projectId, admin: false },
      ]
      const createRolesPromise = new Promise((resolve) => {
        defaultRoles.map(async (role) => {
          const { _id: roleId, admin } = await Role.create(role)
          if (admin) {
            const adminRolePermissions = permissions.map(({ _id: permissionId }) => {
              return { roleId, permissionId }
            })
            const promises = [ProjectMember.create({ projectId, userId, roleId, order: 0 }), RolePermission.create(adminRolePermissions)]
            await Promise.all(promises)
          } else {
            const memberRolePermissions = permissions.map(({ id: permissionId, admin }) => {
              if (!admin) {
                return { roleId, permissionId }
              }
            })
            await RolePermission.create(memberRolePermissions)
          }
        })
        resolve(true)
      })
      const defaultBoards = [
        { name: 'todo', order: 0, projectId },
        { name: 'doing', order: 1, projectId },
        { name: 'done', order: 2, projectId },
      ]
      const defaultTypes = [
        {
          name: 'story',
          icon: 'story',
          order: 0,
          projectId,
        },
        {
          name: 'task',
          icon: 'task',
          order: 1,
          projectId,
        },
        {
          name: 'bug',
          icon: 'bug',
          order: 2,
          projectId,
        },
      ]
      const defaultPriority = [
        {
          name: 'high',
          color: '#d41d13',
          icon: 'up',
          order: 0,
          projectId,
        },
        {
          name: 'normal',
          color: '#fcba03',
          icon: 'hyphen',
          order: 1,
          projectId,
        },
        {
          name: 'low',
          color: '#2e9117',
          icon: 'down',
          order: 2,
          projectId,
        },
      ]
      const promises2 = [createRolesPromise, Board.create(defaultBoards), IssueType.create(defaultTypes), Priority.create(defaultPriority)]
      await Promise.all(promises2)
      return newProject
    },
    updateProject: async (_, { _id, project }) => {
      await Project.updateOne({ _id }, { $set: project })
      return true
    },
    deleteProject: async (_, { _id }) => {
      const projectId = _id
      const promises = [
        Priority.deleteMany({ projectId }),
        ProjectMember.deleteMany({ projectId }),
        Issue.find({ projectId }).then(async (issues) => {
          const issueIds = issues.map((issue) => issue._id)
          const promises = [
            Issue.deleteMany({ _id: { $in: issueIds } }),
            IssueLabel.deleteMany({ issueId: { $in: issueIds } }),
            AssigneeIssue.deleteMany({ issueId: { $in: issueIds } }),
          ]
          await Promise.all(promises)
        }),
        Sprint.deleteMany({ projectId }),
        Board.deleteMany({ projectId }),
        IssueType.deleteMany({ projectId }),
        Label.deleteMany({ projectId }),
        Role.find({ projectId }).then(async (roles) => {
          const roleIds = roles.map((role) => role._id)
          const promises = [Role.deleteMany({ _id: { $in: roleIds } }), RolePermission.deleteMany({ roleId: { $in: roleIds } })]
          await Promise.all(promises)
        }),
        Project.deleteOne({ _id }),
      ]
      await Promise.all(promises)
      return true
    },
  },
}

const ProjectContext = {
  projectPicture: new DataLoader((keys) => dbutl.queryManyToOne(Picture, keys)),
  projectMembers: new DataLoader((keys) => dbutl.queryManyToMany(ProjectMember, keys, 'projectId', 'users', 'userId')),
  projectPriorities: new DataLoader((keys) => dbutl.queryOneToMany(Priority, keys, 'projectId')),
  projectSprints: new DataLoader((keys) => dbutl.queryOneToMany(Sprint, keys, 'projectId')),
  projectBoards: new DataLoader((keys) => dbutl.queryOneToMany(Board, keys, 'projectId')),
}

module.exports = { ProjectType, ProjectResolver, ProjectContext }
