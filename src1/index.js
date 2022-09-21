const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const port = process.env.PORT || 4000;
const app = express();

const typeDefs = gql`
    type Query{
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world'
    }
};
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
    console.log(`Graphql server running at localhost:${port}${server.graphqlPath}`)
)