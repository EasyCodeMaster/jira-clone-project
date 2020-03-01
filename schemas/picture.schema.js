const { gql } = require('apollo-server-express')
const Picture = require('../models/picture.model')

const PictureType = gql`
  type Picture {
    _id: ID!
    name: String!
    source: String!
  }
  extend type Query {
    pictures: [Picture]!
  }
  extend type Mutation {
    createDefaultPictures: [Picture]!
  }
`

const PictureResolver = {
  Query: {
    pictures: Picture.find(),
  },
  Mutation: {
    createDefaultPictures: () => {
      const defaultPictures = [
        { name: 'react', source: 'https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png' },
        { name: 'human', source: 'https://i.ya-webdesign.com/images/avatar-icon-png-9.png' },
      ]
      return Picture.create(defaultPictures)
    },
  },
}

module.exports = { PictureType, PictureResolver }
