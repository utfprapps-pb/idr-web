type FlattenedObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const flattenObject = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  parentKey = '',
  res: FlattenedObject = {}
): FlattenedObject => {
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const propName = parentKey ? `${parentKey}.${key}` : key

      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        flattenObject(obj[key], propName, res)
      } else {
        res[propName] = obj[key]
      }
    }
  }

  return res
}
