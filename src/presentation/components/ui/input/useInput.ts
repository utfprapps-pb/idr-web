import { useCallback } from 'react'

import { useDebounce } from '@/presentation/hooks'

import { InputProps } from './types'

const ICON_SPACING = 28
const ICON_CONTAINER_PADDING = 8

export const useInput = ({
	isError,
	iconsStart,
	iconsEnd,
	value,
	debounce = 0,
	// eslint-disable-next-line no-empty-function
	debounceCallback = () => {},
	mask,
	onChange,
	handleOnClearDebounce
}: InputProps) => {
	const handleOnChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (mask) {
				const maskedValue = mask(e.target.value)
				e.target.value = maskedValue
				return onChange?.(e)
			}

			return onChange?.(e)
		},
		[mask, onChange]
	)

	const { clear } = useDebounce({
		deps: [value],
		ms: debounce,
		fn: debounceCallback
	})

	const handleOnClear = useCallback(() => {
		clear()

		const event = {
			target: {
				value: ''
			}
		} as React.ChangeEvent<HTMLInputElement>
		handleOnChange(event)

		handleOnClearDebounce?.()
	}, [clear, handleOnChange, handleOnClearDebounce])

	const iconContainerSize = (iconContainerLength: number) =>
		iconContainerLength * ICON_SPACING

	const iconsStartLength = iconsStart?.length ?? 0
	const iconsEndLength = iconsEnd?.length ?? 0

	return {
		paddingLeft: ICON_CONTAINER_PADDING + iconContainerSize(iconsStartLength),
		paddingRight: isError
			? ICON_CONTAINER_PADDING +
				ICON_SPACING +
				iconContainerSize(iconsEndLength)
			: ICON_CONTAINER_PADDING + iconContainerSize(iconsEndLength),
		handleOnChange,
		handleOnClear
	}
}
