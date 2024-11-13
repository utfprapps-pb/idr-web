import { ROUTES } from './routes'

import type { Route, TransformRouteParams } from './types'
import type { WithRequired } from '@/domain/shared/types'

type RecordStringOrUndefined = Record<string, string | undefined>

type GenerateRoutePathOptions<
  P extends RecordStringOrUndefined = RecordStringOrUndefined,
> = {
  locale?: string
  params?: P
  query?: Record<string, string>
}

export function generateRoutePath<T extends Route>(
  key: T,
  ...rest: (typeof ROUTES)[T] extends {
    params: infer P extends Record<string, boolean>
  }
    ? [
        options: WithRequired<
          GenerateRoutePathOptions<TransformRouteParams<P>>,
          'params'
        >,
      ]
    : [options?: GenerateRoutePathOptions]
): string {
  const [options = {}] = rest
  const route = ROUTES[key]
  let path: string = typeof route === 'string' ? route : route.path

  if (!path.startsWith('/')) {
    path = `/${path}`
  }

  if (options.locale) {
    path = `/${options.locale}${path}`
  }

  if (options.params && typeof route === 'object' && 'params' in route) {
    Object.keys(route.params).forEach((key) => {
      path = path.replace(`:${key}`, (options.params as never)[key])
    })
  }

  if (options.query) {
    path += '?'
    path += new URLSearchParams(options.query).toString()
  }

  return path
}
