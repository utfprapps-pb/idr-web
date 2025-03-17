import { HttpResponseResolver, delay } from 'msw'

const ONE_SECOND = 1000

export function withDelay(durationMs = ONE_SECOND) {
  return (resolver: HttpResponseResolver): HttpResponseResolver =>
    async (...args) => {
      await delay(durationMs)
      return resolver(...args)
    }
}
