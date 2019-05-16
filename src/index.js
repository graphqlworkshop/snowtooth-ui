import React from "react";
import { render } from "react-dom";
import App from "./App";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

const link = createHttpLink({ uri: "http://localhost:4000" });
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
