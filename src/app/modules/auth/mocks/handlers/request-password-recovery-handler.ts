import { HttpResponse } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay } from '@/core/mocks/middleware'

export const requestPasswordRecoveryHandler = httpWithMiddleware<
  never,
  { email: string },
  { message: string }
>({
  routePath: '/api/v1/email/send-recuperation-code',
  method: 'post',
  middlewares: [withDelay()],
  resolver: async ({ request }) => {
    const { email } = await request.json()

    if (email) {
      return HttpResponse.json({
        message: 'Código enviado para o e-mail informado',
      })
    }

    return HttpResponse.json({ message: 'E-mail inválido' }, { status: 400 })
  },
})
