import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: '/graphql', // your GraphQL server URI
  cache: new InMemoryCache(),
});