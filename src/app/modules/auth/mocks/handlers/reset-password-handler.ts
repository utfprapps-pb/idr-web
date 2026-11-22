import { HttpResponse } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay } from '@/core/mocks/middleware'
import { problemResponse } from '@/core/mocks/utils'

import type { ProblemDetails } from '@/core/utils'

export const resetPasswordHandler = httpWithMiddleware<
  never,
  {
    email: string
    code: string
    password: string
    confirmPassword: string
  },
  { message: string } | ProblemDetails
>({
  routePath: '/api/v1/email/reset-password',
  method: 'post',
  middlewares: [withDelay()],
  resolver: async ({ request }) => {
    const { password, confirmPassword } = await request.json()

    if (password && confirmPassword && password === confirmPassword) {
      return HttpResponse.json({ message: 'Senha alterada com sucesso' })
    }

    return problemResponse(
      400,
      'validacao',
      'Erro de validação',
      'Senhas não conferem'
    )
  },
})
