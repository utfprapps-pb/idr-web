export const MIMETYPE_MAPPER: Record<string, string[]> = {
  'image/*': ['jpeg', 'jpg', 'png', 'gif', 'svg'],
}

export const mimeTypeToExtensions = (
  mimeType: (string | keyof typeof MIMETYPE_MAPPER)[]
): string[] =>
  mimeType.reduce<string[]>((acc, type) => {
    if (type.endsWith('/*')) {
      const extensions = MIMETYPE_MAPPER[type] ?? []
      acc.push(...extensions)
      return acc
    }

    const [, extension] = type.split('/')
    acc.push(extension)

    return acc
  }, [])
