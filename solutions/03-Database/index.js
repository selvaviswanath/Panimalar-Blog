const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');

// Run our server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

// Construct a schema, using GraphQL's schema language
const typeDefs = gql`
  type Blog {
    id: ID
    content: String
    author: String
  }

  type Query {
    hello: String
    blogs: [Blog]
    blog(id: ID): Blog
  }

  type Mutation {
    newBlog(content: String!): Blog
  }
`;

// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    blogs: async () => {
      return await models.Blog.find();
    },
    blog: async (parent, args) => {
      return await models.Blog.findById(args.id);
    }
  },
  Mutation: {
    newBlog: async (parent, args) => {
      return await models.Blog.create({
        content: args.content,
        author: 'Adam Scott'
      });
    }
  }
};

const app = express();

db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
