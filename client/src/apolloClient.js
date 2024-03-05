import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // your GraphQL server URI
  cache: new InMemoryCache(),
});