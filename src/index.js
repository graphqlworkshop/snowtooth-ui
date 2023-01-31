import "./index.css";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "https://snowtooth-api-subscriptions.fly.dev/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://snowtooth-api-subscriptions.fly.dev/graphql",
  })
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
