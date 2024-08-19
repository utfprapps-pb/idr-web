import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'

export const catchError = async (callback: Function, message?: string) => {
	try {
		await callback()
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(message ?? error.message)
		}
	}
}
