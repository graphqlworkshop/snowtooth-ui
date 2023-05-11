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
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";

const httpLink = new HttpLink({
  uri: "https://snowtooth.moonhighway.com",
});

const wsLink = new WebSocketLink(
  new SubscriptionClient(
    "wss://snowtooth.moonhighway.com/graphql"
  )
);

// Here we'll show an example of the persisted query link
// const persistedLink = createPersistedQueryLink({
//   sha256,
// }).concat(httpLink);

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
const client = new ApolloClient({
  link,
  cache,
});

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
