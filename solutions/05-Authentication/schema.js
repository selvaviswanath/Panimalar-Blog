const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Blog {
    id: ID!
    content: String!
    author: User!
    favoriteCount: Int!
    favoritedBy: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    blogs: [Blog!]!
    favorites: [Blog!]!
  }

  type Query {
    blogs: [Blog!]!
    blog(id: ID): Blog!
    user(username: String!): User
    users: [User!]!
    me: User!
  }

  type Mutation {
    newBlog(content: String!): Blog
    updateBlog(id: ID!, content: String!): Blog!
    deleteBlog(id: ID!): Boolean!
    toggleFavorite(id: ID!): Blog!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;
