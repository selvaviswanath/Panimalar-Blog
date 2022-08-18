const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Blog {
    id: ID!
    content: String!
    author: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    blogs: [Blog!]!
    blog(id: ID): Blog!
  }

  type Mutation {
    newBlog(content: String!): Blog
    updateBlog(id: ID!, content: String!): Blog!
    deleteBlog(id: ID!): Boolean!
  }
`;
