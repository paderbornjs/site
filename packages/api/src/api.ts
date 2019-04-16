require('dotenv').config()

import {
  addMockFunctionsToSchema,
  ApolloServer,
  makeExecutableSchema,
} from 'apollo-server-express'
import casual from 'casual'
import express from 'express'
import helmet from 'helmet'
import * as typeDefs from '../../schema/schema.graphql'
import resolvers from './resolvers'
import createContext from './utils/createContext'

const isDev = process.env.NODE_ENV === 'development'

const app = express().use(helmet())

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

if (isDev) {
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
  debug: isDev,
  playground: isDev,
  schema,
  context: createContext,
})

server.applyMiddleware({
  app,
  path: '/',
  cors: {
    origin: isDev
      ? '*'
      : [
          'https://paderbornjs.org',
          /^https:\/\/deploy-preview-[0-9]+--paderbornjs.netlify.com$/,
        ],
  },
})

export default app
