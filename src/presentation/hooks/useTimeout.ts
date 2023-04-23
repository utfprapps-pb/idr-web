import { useCallback, useEffect, useRef } from 'react'

export type UseTimeoutFnReturn = {
	isReady: () => boolean | null
	clear: () => void
	set: () => void
}

export type UseTimeoutFn = (fn: () => void, ms: number) => UseTimeoutFnReturn

export const useTimeoutFn: UseTimeoutFn = (fn, ms = 0) => {
	const ready = useRef<boolean | null>(false)
	const timeout = useRef<ReturnType<typeof setTimeout>>()
	const callback = useRef(fn)

	const isReady = useCallback(() => ready.current, [])

	const set = useCallback(() => {
		ready.current = false
		clearTimeout(timeout.current)

		timeout.current = setTimeout(() => {
			ready.current = true
			callback.current()
		}, ms)
	}, [ms])

	const clear = useCallback(() => {
		ready.current = null
		clearTimeout(timeout.current)
	}, [])

	useEffect(() => {
		callback.current = fn
	}, [fn])

	useEffect(() => {
		set()

		return clear
	}, [clear, ms, set])

	return { isReady, clear, set }
}
