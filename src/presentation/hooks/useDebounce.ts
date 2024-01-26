import { DependencyList, useEffect } from 'react'

import { useTimeoutFn } from './useTimeout'

export type UseDebounceReturn = {
	isReady: () => boolean | null
	clear: () => void
}

export type UseDebounce = (params: {
	fn: () => void
	ms: number
	deps: DependencyList
}) => UseDebounceReturn

export const useDebounce: UseDebounce = ({ fn, ms = 0, deps = [] }) => {
	const { isReady, clear, set } = useTimeoutFn(fn, ms)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(set, deps)

	return { isReady, clear }
}
