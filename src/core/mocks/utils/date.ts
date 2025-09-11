export function isValidDate(value: unknown): value is Date {
  if (value instanceof Date) {
    return !Number.isNaN(value.getTime())
  }

  if (typeof value === 'string') {
    const date = new Date(value)
    return !Number.isNaN(date.getTime())
  }

  return false
}

export function isSameDay(firstDate: Date, secondDate: Date): boolean {
  return (
    firstDate.getDate() === secondDate.getDate() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getFullYear() === secondDate.getFullYear()
  )
}
