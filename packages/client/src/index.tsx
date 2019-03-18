import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { onError } from 'apollo-link-error'
import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import ReactDOM from 'react-dom'
import App from './components/App'
import GlobalStyle from './components/GlobalStyle'
import * as serviceWorker from './serviceWorker'

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

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
