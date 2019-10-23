/* eslint-disable */
import { ApolloLink, FetchResult, Observable, Operation } from "apollo-link";
import { ClientOptions, Observer, SubscriptionClient } from "subscriptions-transport-ws";

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
    // this.worker = new Worker();
    // this.worker.onmessage = this.onMessage;
    //
    // const initMsg: IWWData = {
    //   type: EVENT_TYPES.INIT
    // }
  //  this.worker.postMessage(initMsg)
  }

  private onMessage(msg: any) {
    console.log("MICHAL: msg", msg);
  }

  public request(operation: Operation): Observable<FetchResult> | null {
    return this.subscriptionClient.request(operation) as Observable<
      FetchResult
      >;
  }

  // public request(operation: Operation): Observable<FetchResult> | null {
  //   const reqId = nanoid();
  //
  //  let observerInst: any = null;
  //
  //   const requestObservable = new Observable<FetchResult>((observer) => {
  //     observerInst = observer;
  //    // observer.next({});
  //   //  observer.complete();
  //   }).subscribe(next => {
  //     console.log("MICHAL: 'from next!', next", 'from next!', next);
  //   });
  //
  //
  //   this.subscriptionMap.set(reqId, observerInst);
  //
  //   setInterval(() => {
  //     const ob = this.subscriptionMap.get(reqId);
  //     if(ob)
  //     ob.next!("elo elo" as any);
  //   }, 1000)
  //
  //
  //   this.worker.postMessage({type: EVENT_TYPES.REQUEST, value: operation});
  //
  //   return this.subscriptionClient.request(operation) as Observable<
  //     FetchResult
  //     >;
  // }

}
console.log("MICHAL: SubscriptionClient", SubscriptionClient);
const GRAPHQL_ENDPOINT = "ws://localhost:4000/graphql";
console.log("MICHAL: 'sdfsdf'", 'sdfsdf');
const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true
});

export const linkWS = new WebWorkerLinkWS(client);
