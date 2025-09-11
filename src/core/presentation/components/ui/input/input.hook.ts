import { useCallback, type ChangeEvent } from 'react'

import type { InputProps } from './input'

const ICON_SPACING = 28
const ICON_CONTAINER_PADDING = 8

export function useInput({
  isError,
  iconsStart,
  iconsEnd,
  mask,
  onChange,
}: InputProps) {
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (mask) {
        const maskedValue = mask(e.target.value)
        e.target.value = maskedValue
        return onChange?.(e)
      }

      return onChange?.(e)
    },
    [mask, onChange]
  )

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
  }
}
