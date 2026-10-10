import {
  fromApiWeight,
  fromLocalDate,
  toApiWeight,
  toLocalDate,
} from '@/core/data/helpers'

import type {
  AnimalChildbirthApiResponse,
  AnimalChildbirthDetailsModel,
} from '../../domain/models/animal-childbirths-model'

/**
 * Real backend fields: `childbirthDate` (frontend: `date`), `breedId`/
 * `breedName` (frontend: `breed` option) and `calfId`/`calfIdentifier`
 * (frontend: `calf` option, `value: ''` when no calf is linked).
 * `gender`/`condition` use the same enum values on both sides. `weight` is
 * a number (kg) in the API and a masked string (`"35,50 kg"`) in the form.
 */

export type AnimalChildbirthApiRequest = {
  childbirthDate: string
  gender: AnimalChildbirthDetailsModel['gender']
  weight: number | null
  condition: AnimalChildbirthDetailsModel['condition']
  breedId: string
  calfId: string | null
}

export function toApi(
  model: AnimalChildbirthDetailsModel
): AnimalChildbirthApiRequest {
  return {
    childbirthDate: toLocalDate(model.date),
    gender: model.gender,
    weight: toApiWeight(model.weight),
    condition: model.condition,
    breedId: model.breed.value,
    calfId: model.calf.value || null,
  }
}

export function fromApi(
  record: AnimalChildbirthApiResponse
): AnimalChildbirthDetailsModel {
  return {
    date: fromLocalDate(record.childbirthDate),
    gender: record.gender,
    weight: fromApiWeight(record.weight),
    condition: record.condition,
    breed: { value: record.breedId, label: record.breedName ?? '' },
    calf: { value: record.calfId ?? '', label: record.calfIdentifier ?? '' },
  }
}
