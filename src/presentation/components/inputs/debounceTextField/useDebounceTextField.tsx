import { useCallback, useMemo } from 'react'

import { XCircle } from 'phosphor-react'

import { DebounceTextFieldProps } from './types'
import { Loading } from '@/presentation/components'
import { useDebounce } from '@/presentation/hooks'

export const useDebounceTextField = (props: DebounceTextFieldProps) => {
	const { debounce = 500, value, onChange, onSearch } = props

	const handleOnChange = useCallback(
		(inputValue: string) => {
			onChange(inputValue)
			onSearch(inputValue)
		},
		[onChange, onSearch]
	)

	const { isReady, clear } = useDebounce({
		deps: [value, onChange, onSearch],
		ms: debounce,
		fn: () => handleOnChange
	})

	const iconsEnd = useMemo(() => {
		const icons: React.ReactElement[] = []

		if (!isReady()) icons.push(<Loading />)
		if (value) icons.push(<XCircle onClick={clear} />)

		return icons
	}, [clear, isReady, value])

	return {
		iconsEnd,
		handleOnChange,
		...props
	}
}
