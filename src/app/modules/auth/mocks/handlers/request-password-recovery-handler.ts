import { HttpResponse } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay } from '@/core/mocks/middleware'
import { problemResponse } from '@/core/mocks/utils'

import type { ProblemDetails } from '@/core/utils'

export const requestPasswordRecoveryHandler = httpWithMiddleware<
  never,
  { email: string },
  { message: string } | ProblemDetails
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

    return problemResponse(
      400,
      'validacao',
      'Erro de validação',
      'Usuário com e-mail não encontrado'
    )
  },
})
