/* eslint-disable */
import { ApolloLink, FetchResult, Observable, Operation } from "apollo-link";
import { ClientOptions, Observer, SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "apollo-link-ws";
//@ts-ignore
import Worker from "worker-loader!./Worker";

export enum EVENT_TYPES {
  INIT,
  REQUEST
}

export interface IWWData {
  type: EVENT_TYPES
  value?: any;
}

export interface IWWEvent {
  [key: string]: any;
  data: IWWData;
}

/**
   * Configuration to use when constructing the subscription client (subscriptions-transport-ws).
   */
  export interface Configuration {
    /**
     * The endpoint to connect to.
     */
    uri: string;

    /**
     * Options to pass when constructing the subscription client.
     */
    options?: ClientOptions;

    /**
     * A custom WebSocket implementation to use.
     */
    webSocketImpl?: any;
  }

export class WebWorkerLinkWS extends ApolloLink {
  private subscriptionClient: SubscriptionClient;
  private worker: Worker;
  private subscriptionMap: Map<string, Observer<FetchResult>> = new Map();

  constructor(
    paramsOrClient: Configuration | SubscriptionClient,
  ) {
    super();

    if (paramsOrClient instanceof SubscriptionClient) {
      this.subscriptionClient = paramsOrClient;
    } else {
      this.subscriptionClient = new SubscriptionClient(
        paramsOrClient.uri,
        paramsOrClient.options,
        paramsOrClient.webSocketImpl,
      );
    }

  }

  public request(operation: Operation): Observable<FetchResult> | null {
    return this.subscriptionClient.request(operation) as Observable<
      FetchResult
      >;
  }

}

const GRAPHQL_ENDPOINT = "ws://localhost:4000/graphql";
const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true
});

export const linkWS = new WebSocketLink(client);
