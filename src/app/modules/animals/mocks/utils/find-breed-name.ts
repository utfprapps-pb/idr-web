import allBreedsData from '@database/allBreedsData.json'

const BREED_NAMES = new Map(
  allBreedsData.map((breed) => [breed.id, breed.breedName])
)

/** `breedName` the real API resolves server-side, looked up in the seeded catalog. */
export function findBreedName(breedId: string): string | null {
  return BREED_NAMES.get(breedId) ?? null
}
