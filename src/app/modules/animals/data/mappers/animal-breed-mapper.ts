import type { Option } from '@/core/domain/types'

/**
 * Animal.breed field mapper.
 *
 * Real backend contract (`GetAnimalByIdOutput`/`ListAnimalOutput`): only a
 * flat `breedId` (UUID string), no nested `breed` object, no `breedName`.
 * The frontend needs `{ label, value }` for the breed Combobox, so
 * `breedName` is resolved locally against the breed catalog already loaded
 * by the module (see `useAllBreedsQuery`) instead of adding a dedicated
 * network call.
 */

export function fromApi(
  breedId: string,
  breeds: Option<string>[] = []
): Option<string> {
  return (
    breeds.find((breed) => breed.value === breedId) ?? {
      value: breedId,
      label: '',
    }
  )
}
