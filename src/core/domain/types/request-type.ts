export type RequestInterface<TParams, TResponse, TCustomParams> = {
  execute: (params: TParams, customParams: TCustomParams) => Promise<TResponse>
}
