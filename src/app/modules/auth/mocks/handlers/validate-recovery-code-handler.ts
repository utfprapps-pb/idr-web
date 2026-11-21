import { HttpResponse } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay } from '@/core/mocks/middleware'
import { problemResponse } from '@/core/mocks/utils'

import type { ProblemDetails } from '@/core/utils'

export const validateRecoveryCodeHandler = httpWithMiddleware<
  never,
  { email: string; code: string },
  { message: string } | ProblemDetails
>({
  routePath: '/api/v1/email/validate-recuperation-code',
  method: 'post',
  middlewares: [withDelay()],
  resolver: async ({ request }) => {
    const { code } = await request.json()

    if (code) {
      return HttpResponse.json({ message: 'Código válido' })
    }

    return problemResponse(
      400,
      'validacao',
      'Erro de validação',
      'Código de recuperação inválido'
    )
  },
})
