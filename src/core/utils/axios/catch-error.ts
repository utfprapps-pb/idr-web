import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'

/** Corpo de erro da API no formato Problem Details (RFC 9457). */
export type ProblemDetails = {
  type?: string
  title?: string
  status?: number
  detail?: string
  instance?: string
  errors?: Array<{ field: string; message: string }>
}

/** Mensagem para o usuário: o `detail` da ocorrência ou, sem ele, o `title` do tipo de erro. */
export function getProblemDetailMessage(body: unknown): string | undefined {
  if (typeof body !== 'object' || body === null) return undefined

  const { detail, title } = body as ProblemDetails

  return detail || title || undefined
}

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Erro inesperado, tente novamente mais tarde'
): string {
  if (isAxiosError(error)) {
    return getProblemDetailMessage(error.response?.data) ?? fallback
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

export async function catchError(
  callback: () => Promise<void>,
  message?: string
) {
  try {
    await callback()
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(message ?? getApiErrorMessage(error))
    }
  }
}
