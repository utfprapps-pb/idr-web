import { HttpResponse } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay } from '@/core/mocks/middleware'

export const validateRecoveryCodeHandler = httpWithMiddleware<
  never,
  { email: string; code: string },
  { message: string }
>({
  routePath: '/api/v1/email/validate-recuperation-code',
  method: 'post',
  middlewares: [withDelay()],
  resolver: async ({ request }) => {
    const { code } = await request.json()

    if (code) {
      return HttpResponse.json({ message: 'Código válido' })
    }

    return HttpResponse.json({ message: 'Código inválido' }, { status: 404 })
  },
})
