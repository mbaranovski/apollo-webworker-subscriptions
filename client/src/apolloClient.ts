import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { linkWS } from "./WebWorkerLinkWS";

// setup your client
export const apolloClient = new ApolloClient({
  link: linkWS,
  cache: new InMemoryCache(),
});
