export interface IRequestInterface<TParams, TResponse> {
	execute: (params: TParams) => Promise<TResponse>
}
