import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'

type ApiErrorResponse = {
  message?: string
  errors?: Array<{ field: string; message: string }>
}

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Erro inesperado, tente novamente mais tarde'
): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | undefined
    return data?.message ?? fallback
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
