import { useCallback } from 'react'

import { DebounceTextFieldProps } from './types'
import { useDebounce } from '@/presentation/hooks'

export const useDebounceTextField = (props: DebounceTextFieldProps) => {
	const { debounce = 500, value, onChange, callback } = props

	const { clear } = useDebounce({
		deps: [value],
		ms: debounce,
		fn: callback
	})

	const handleOnClear = useCallback(() => {
		onChange('')
		clear()
	}, [clear, onChange])

	return {
		handleOnClear,
		...props
	}
}
