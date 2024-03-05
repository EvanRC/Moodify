// Define your GraphQL schema using GraphQL SDL (Schema Definition Language)
const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    updateHello(newHello: String!): String
  }
`

module.exports = typeDefs
