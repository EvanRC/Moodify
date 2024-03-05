// Define resolver functions for your GraphQL schema
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
  Mutation: {
    updateHello: (_, { newHello }) => {
      // Logic to update and return the new value of "hello"
      return newHello
    },
  },
}

module.exports = resolvers
