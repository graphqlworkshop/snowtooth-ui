import React from "react";
import { render } from "react-dom";
import App from "./App";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  split
} from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const httpLink = new HttpLink({
  uri: "https://snowtooth.moonhighway.com"
});

const wsLink = new WebSocketLink({
  uri: `ws://snowtooth.moonhighway.com/graphql`,
  options: {
    reconnect: true,
    lazy: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === "OperationDefinition" &&
      operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
