import type { Option } from '@/core/domain/types'

/**
 * Animal.breed field mapper.
 *
 * Real backend contract (`GetAnimalByIdOutput`): only a flat `breedId`
 * (no nested `breed` object, no `breedName`). The frontend needs
 * `{ label, value }` for the breed Combobox, so `breedName` is resolved
 * locally against the breed catalog already loaded by the module (see
 * `useAllBreedsQuery`) instead of adding a dedicated network call.
 */

export type AnimalBreedApiRequest = {
  id: number
}

export function toApi(breed: Option<number>): AnimalBreedApiRequest {
  return { id: Number(breed.value) }
}

export function fromApi(
  breedId: number,
  breeds: Option<number>[] = []
): Option<number> {
  return (
    breeds.find((breed) => breed.value === breedId) ?? {
      value: breedId,
      label: '',
    }
  )
}
