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

/**
 * `breedId` accepts both `number` (singular Get's current, pre-existing
 * typing — unchanged) and `string` (List's real wire shape, a UUID).
 * Overloads keep each caller's result precisely typed. The catalog
 * (`breeds`) is always `Option<number>[]` today, so the comparison is
 * done via `String(...)` to stay correct regardless of which actual
 * runtime type either side holds.
 */
export function fromApi(
  breedId: number,
  breeds?: Option<number>[]
): Option<number>
export function fromApi(
  breedId: string,
  breeds?: Option<number>[]
): Option<string>
export function fromApi(
  breedId: number | string,
  breeds: Option<number>[] = []
): Option<number> | Option<string> {
  const found = breeds.find((breed) => String(breed.value) === String(breedId))

  return (found ?? { value: breedId, label: '' }) as
    | Option<number>
    | Option<string>
}
