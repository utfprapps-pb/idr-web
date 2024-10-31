import {
  type DefaultBodyType,
  type HttpResponseResolver,
  type PathParams,
  http,
} from 'msw'

type Method = keyof typeof http

type HttpProps<
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType,
> = {
  routePath: string
  method: Method
  middlewares: Array<(resolver: HttpResponseResolver) => HttpResponseResolver>
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>
}

export const httpWithMiddleware = <
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType,
>({
  routePath,
  method,
  middlewares,
  resolver,
}: HttpProps<Params, RequestBodyType, ResponseBodyType>) => {
  const resolverHandler = middlewares.reduceRight<HttpResponseResolver>(
    (prevResolver, currentResolver) => currentResolver(prevResolver),
    resolver as HttpResponseResolver
  )

  return http[method](routePath, resolverHandler)
}
