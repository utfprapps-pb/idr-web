import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'

export async function catchError(
  callback: () => Promise<void>,
  message?: string
) {
  try {
    await callback()
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(message ?? error.message)
    }
  }
}
