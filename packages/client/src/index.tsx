import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { onError } from 'apollo-link-error'
import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components/macro'
import 'typeface-merriweather'
import App from './components/App'
import GlobalStyle from './components/GlobalStyle'
import * as serviceWorker from './serviceWorker'
import theme from './style/theme'

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
          ? '/.netlify/functions/graphql'
          : 'http://localhost:9000/graphql',
    }),
  ]),
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <GlobalStyle />
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('⚛️')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
