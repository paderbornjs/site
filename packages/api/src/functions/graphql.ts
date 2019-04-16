import { ApolloServer, makeExecutableSchema, gql } from 'apollo-server-lambda'
import resolvers from '../resolvers'
import createContext from '../utils/createContext'
import typeDefs from '../../../schema/schema.graphql'

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

const server = new ApolloServer({
  debug: true,
  schema,
  context: createContext,
})

// @todo implement cors origin logic from node-cors into apollo-server-lambda
// https://github.com/expressjs/cors/blob/master/lib/index.js
// https://github.com/apollographql/apollo-server/blob/master/packages/apollo-server-lambda/src/ApolloServer.ts
const handler = server.createHandler({
  cors: {
    origin: '*',
    allowedHeaders: '*',
  },
})

export { handler }
