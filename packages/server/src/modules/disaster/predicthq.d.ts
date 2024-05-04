declare module 'predicthq' {

  export interface EventSearchResult {
    result: EventSearchResultResult;
  }
  interface EventSearchResultResult {
    count: number;
    overflow: boolean;
    next: string | null;
    previous: string | null;
    results: any[];
  }

  export default class Client {
    constructor(options: { access_token: string });
    events: {
      search(query: any): Promise<EventSearchResult>;
    };
  }
}
