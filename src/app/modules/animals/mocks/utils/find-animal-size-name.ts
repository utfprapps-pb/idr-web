import allAnimalSizesData from '@database/allAnimalSizesData.json'

const SIZE_NAMES = new Map(
  allAnimalSizesData.map((size) => [size.id, size.sizeName])
)

/** `sizeName` que a API resolve no servidor, procurado no catálogo semeado. */
export function findAnimalSizeName(sizeId: string): string | null {
  return SIZE_NAMES.get(sizeId) ?? null
}
