import { useCallback } from 'react'

type HandleChange<FD> = <K extends keyof FD>(key: K) => (value: FD[K]) => void

type UseHandleChangeFormData<FD> = {
	formData: FD
	setFormData: (data: FD) => void
}

export const useHandleChangeFormData = <FD>({
	formData,
	setFormData
}: UseHandleChangeFormData<FD>) => {
	const handleChange = useCallback<HandleChange<FD>>(
		(key) => (value) => {
			setFormData({
				...formData,
				[key]: value
			})
		},
		[formData, setFormData]
	)

	return { handleChange }
}
