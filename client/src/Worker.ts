import { SubscriptionClient } from "subscriptions-transport-ws";
import { FetchResult, Observable, Operation } from "apollo-link";
declare let window: any;
const _global = typeof global !== 'undefined' ? global : (typeof window !== 'undefined' ? window : {});
const NativeWebSocket = _global.WebSocket || _global.MozWebSocket;
 enum EVENT_TYPES {
  INIT,
  REQUEST
}

 interface IWWEvent {
  [key: string]: any;
  data: {
    type: EVENT_TYPES
    value?: any;
  }
}

const GRAPHQL_ENDPOINT = "ws://localhost:4000/graphql";

class WebWorkerHandler {
  private worker: Worker;
  private client: SubscriptionClient | null = null;
  private initialised = false;

  constructor(ctx: any) {
        this.worker = ctx;
        this.registerListeners();
  }

  registerListeners() {
    this.worker.onmessage = (event: IWWEvent) => {
      switch (event.data.type) {
        case EVENT_TYPES.INIT: {
          this.onInit();
          break;
        }
        case EVENT_TYPES.REQUEST: {
          this.onRequest(event.data.value);
          break;
        }
        default: {
          console.error('Send unhandled EVENT_TYPE to the Worker')
        }
      }
    }

    //const d = new NativeWebSocket()
  }

  onInit() {
    if(this.initialised) return console.log('WebWorker Sub Client already initialised')
    this.client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
      reconnect: true
    });

    this.initialised = true;
  }

  onRequest(operation: Operation) {
    if(!this.client) return;

    this.worker.postMessage("elo elo from worker");
    // const dupa = new Observable(observer => {
    //   this.promiseWorker.postMessage(operation)
    //     .then(data => {
    //       observer.next(data);
    //       observer.complete();
    //     })
    //     .catch(observer.error.bind(observer));
    // });

    const obs = this.client.request(operation) as Observable<
      FetchResult
      >;

    obs.subscribe((next) => {
     // console.log(next);
    })
  }
}

new WebWorkerHandler(self);
