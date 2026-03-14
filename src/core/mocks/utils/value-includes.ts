export function valueIncludes(haystack: unknown, needle: unknown): boolean {
  if (Array.isArray(haystack)) {
    return haystack.some((value) => valueIncludes(value, needle))
  }

  if (
    typeof haystack === 'string' ||
    typeof haystack === 'number' ||
    typeof haystack === 'boolean'
  ) {
    return String(haystack).toLowerCase().includes(String(needle).toLowerCase())
  }

  return false
}
