import { useCallback, useMemo } from 'react'

import { XCircle } from 'phosphor-react'

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

	const iconsEnd = useMemo(() => {
		const icons: React.ReactElement[] = []

		if (value) icons.push(<XCircle onClick={handleOnClear} />)

		return icons
	}, [handleOnClear, value])

	return {
		iconsEnd,
		...props
	}
}
