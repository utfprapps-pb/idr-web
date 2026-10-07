export const MIMETYPE_MAPPER: Record<string, string[]> = {
  'image/*': ['jpeg', 'jpg', 'png', 'gif', 'svg'],
  'application/pdf': ['pdf'],
  'application/vnd.ms-excel': ['xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
}

export function mimeTypeToExtensions(
  mimeType: (string | keyof typeof MIMETYPE_MAPPER)[]
): string[] {
  return mimeType.reduce<string[]>((acc, type) => {
    const mapped = MIMETYPE_MAPPER[type]
    if (mapped) {
      acc.push(...mapped)
      return acc
    }

    const [, extension] = type.split('/')
    if (!extension) return acc

    acc.push(extension)
    return acc
  }, [])
}
