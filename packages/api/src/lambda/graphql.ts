import { ApolloServer, makeExecutableSchema } from 'apollo-server-lambda'
import * as typeDefs from '../../../schema/schema.graphql'
import resolvers from '../resolvers'
import createContext from '../utils/createContext'
import getEnvironmentVariable from '../utils/getEnvironmentVariable'

const nodeEnv = getEnvironmentVariable('NODE_ENV')
const isDevEnvironment = nodeEnv === 'development'

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

const server = new ApolloServer({
  debug: isDevEnvironment,
  playground: isDevEnvironment,
  schema,
  context: createContext,
})

// @todo implement cors origin logic from node-cors into apollo-server-lambda
// https://github.com/expressjs/cors/blob/master/lib/index.js
// https://github.com/apollographql/apollo-server/blob/master/packages/apollo-server-lambda/src/ApolloServer.ts
const handler = server.createHandler()

export { handler }
