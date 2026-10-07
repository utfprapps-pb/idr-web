import { HttpResponse } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay } from '@/core/mocks/middleware'

export const resetPasswordHandler = httpWithMiddleware<
  never,
  {
    email: string
    code: string
    password: string
    confirmPassword: string
  },
  { message: string }
>({
  routePath: '/api/v1/email/reset-password',
  method: 'post',
  middlewares: [withDelay()],
  resolver: async ({ request }) => {
    const { password, confirmPassword } = await request.json()

    if (password && confirmPassword && password === confirmPassword) {
      return HttpResponse.json({ message: 'Senha alterada com sucesso' })
    }

    return HttpResponse.json(
      { message: 'As senhas não coincidem' },
      { status: 422 }
    )
  },
})
