export type RequestInterface<TParams, TResponse, TCustomParams = unknown> = {
  execute: (params: TParams, customParams?: TCustomParams) => Promise<TResponse>
}
