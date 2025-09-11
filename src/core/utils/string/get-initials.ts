export function getInitials(value: string): string {
  if (!value || value.trim() === '') {
    return ''
  }

  const words = value.split(/\s+/)
  return words.map((word) => word.charAt(0)).join('')
}
