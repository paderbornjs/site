require('dotenv').config()

import {
  addMockFunctionsToSchema,
  ApolloServer,
  makeExecutableSchema,
} from 'apollo-server-express'
import * as casual from 'casual'
import * as express from 'express'
import * as helmet from 'helmet'
import * as typeDefs from '../../schema/schema.graphql'
import resolvers from './resolvers'
import createContext from './utils/createContext'
import getEnvironmentVariable from './utils/getEnvironmentVariable'

const nodeEnv = getEnvironmentVariable('NODE_ENV')
const isDevEnvironment = nodeEnv === 'development'

const app = express().use(helmet())

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

if (isDevEnvironment) {
  addMockFunctionsToSchema({
    schema,
    mocks: {
      Organizer: () => ({
        name: casual.full_name,
      }),
    },
    preserveResolvers: true,
  })
}

const server = new ApolloServer({
  debug: isDevEnvironment,
  playground: isDevEnvironment,
  schema,
  context: createContext,
})

server.applyMiddleware({
  app,
  path: '/',
  cors: {
    origin: isDevEnvironment
      ? '*'
      : [
          'https://paderbornjs.org',
          /^https:\/\/deploy-preview-[0-9]+--paderbornjs.netlify.com$/,
        ],
  },
})

export default app
