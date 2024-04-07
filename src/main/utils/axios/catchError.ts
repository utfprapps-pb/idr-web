import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'

export const catchError = async (callback: Function) => {
	try {
		await callback()
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.message)
		}
	}
}
