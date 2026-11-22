import { format, parseISO } from 'date-fns'

/**
 * The backend exchanges calendar dates (`LocalDate`) as `yyyy-MM-dd`, with no
 * time or timezone. `new Date('2024-06-10')` reads that as UTC midnight, which
 * is the previous day in Brazil (UTC-3); and serialising a `Date` sends a UTC
 * timestamp that can land on another day. These helpers keep the calendar day.
 */

/**
 * `yyyy-MM-dd` -> local midnight of that same day. A missing date (the API
 * accepts `null` in most animal events) stays `null`.
 */
export function fromLocalDate(value: string): Date
export function fromLocalDate(value: string | null | undefined): Date | null
export function fromLocalDate(value: string | null | undefined): Date | null {
  return value ? parseISO(value) : null
}

/** Date picked in the UI -> `yyyy-MM-dd` of its local calendar day; no date -> `null`. */
export function toLocalDate(date: Date): string
export function toLocalDate(date: Date | null | undefined): string | null
export function toLocalDate(date: Date | null | undefined): string | null {
  return date ? format(date, 'yyyy-MM-dd') : null
}
