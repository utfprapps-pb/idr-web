export interface IRequestInterface<
  TParams,
  TResponse,
  TCustomParams = unknown,
> {
  execute: (params: TParams, customParams?: TCustomParams) => Promise<TResponse>
}
