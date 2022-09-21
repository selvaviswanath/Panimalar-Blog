const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;

let blogs = [
  {
    id: '1',
    content: 'This is a blog',
    author: 'Adam Scott'
  },
  {
    id: '2',
    content: 'This is another blog',
    author: 'Harlow Everly'
  },
  {
    id: '3',
    content: 'Oh hey look, another blog!',
    author: 'Riley Harrison'
  }
];

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
    blogs: () => blogs,
    blog: (parent, args) => {
      return blogs.find(blog => blog.id === args.id);
    }
  },
  Mutation: {
    newBlog: (parent, args) => {
      let blogValue = {
        id: String(blogs.length + 1),
        content: args.content,
        author: 'Adam Scott'
      };
      blogs.push(blogValue);
      return blogValue;
    }
  }
};

const app = express();

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
