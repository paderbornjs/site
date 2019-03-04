import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { onError } from 'apollo-link-error'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Helmet } from 'react-helmet'
import GlobalStyle from '../GlobalStyle'
import HomePage from '../HomePage/HomePage'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
      }
    }),
    new BatchHttpLink({
      credentials: 'same-origin',
      uri:
        process.env.NODE_ENV === 'production'
          ? 'https://api.paderbornjs.org'
          : 'http://localhost:4000',
    }),
  ]),
})

const App: React.SFC = () => (
  <React.StrictMode>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <Helmet defaultTitle="Paderborn.JS" titleTemplate="%s – Paderborn.JS" />
      <HomePage />
    </ApolloProvider>
  </React.StrictMode>
)

export default App
