import { format, parseISO } from 'date-fns'

/**
 * The backend exchanges calendar dates (`LocalDate`) as `yyyy-MM-dd`, with no
 * time or timezone. `new Date('2024-06-10')` reads that as UTC midnight, which
 * is the previous day in Brazil (UTC-3); and serialising a `Date` sends a UTC
 * timestamp that can land on another day. These helpers keep the calendar day.
 */

/** `yyyy-MM-dd` -> local midnight of that same day. */
export function fromLocalDate(value: string): Date {
  return parseISO(value)
}

/** Date picked in the UI -> `yyyy-MM-dd` of its local calendar day. */
export function toLocalDate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}
