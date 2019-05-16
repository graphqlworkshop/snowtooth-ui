import React from 'react'
import { render } from 'react-dom'
import App from './App'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
