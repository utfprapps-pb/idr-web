export function onlyNumbersMask(value: string) {
  return value.replaceAll(/[^\d]/g, '')
}
