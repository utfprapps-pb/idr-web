import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * The `cn` function is a utility function that merges tailwind classes together.
 *
 *
 * @param {...any} inputs - The tailwind classes to merge.
 *
 * @returns {string} - The merged tailwind classes.
 *
 * @example
 * ```tsx
 * import { cn } from 'main/utils/tailwind'
 *
 * const className = cn('text-red-500', 'bg-blue-500', 'text-lg', 'bg-red-500')
 *
 * ```
 *
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
