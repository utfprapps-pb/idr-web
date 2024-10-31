export function getInitials(value: string): string {
  if (!value || value.trim() === '') {
    throw new Error('getInitials function value must be a non-empty string')
  }

  const words = value.split(/\s+/)
  return words.map((word) => word.charAt(0)).join('')
}
