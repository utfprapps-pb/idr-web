import { isValidDate, isSameDay } from './date'

export function valueEquals(
  firstValue: unknown,
  secondValue: unknown
): boolean {
  if (isValidDate(firstValue) || isValidDate(secondValue)) {
    const firstValueDate = new Date(firstValue as string | Date)
    const secondValueDate = new Date(secondValue as string | Date)
    return isSameDay(firstValueDate, secondValueDate)
  }

  return String(firstValue).toLowerCase() === String(secondValue).toLowerCase()
}
