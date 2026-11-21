import {
  fromApiWeight,
  fromLocalDate,
  toApiWeight,
  toLocalDate,
} from '@/core/data/helpers'

import type {
  AnimalApiResponse,
  AnimalCreateApiRequest,
  AnimalDetailsModel,
  AnimalModel,
  AnimalUpdateApiRequest,
} from '../../domain/models/animals-model'

/**
 * Único ponto que traduz o animal entre a tela e a API: campo vazio na tela
 * vira `null` na API (o PUT apaga) e vice-versa. Valores fora das listas da
 * tela são preservados como vieram.
 */

function emptyToNull(value: string): string | null {
  return value === '' ? null : value
}

function toWriteRequest(model: AnimalDetailsModel): AnimalCreateApiRequest {
  return {
    identifier: model.name,
    breedId: model.breed.value,
    type: emptyToNull(model.type),
    gender: emptyToNull(model.gender),
    animalMotherId: emptyToNull(model.mother.value),
    bornDate: model.bornDate ? toLocalDate(model.bornDate) : null,
    bornWeight: toApiWeight(model.bornWeight),
    bornCondition: emptyToNull(model.bornCondition),
  }
}

export function toCreateRequest(
  model: AnimalDetailsModel
): AnimalCreateApiRequest {
  return toWriteRequest(model)
}

export function toUpdateRequest(
  model: AnimalDetailsModel
): AnimalUpdateApiRequest {
  return toWriteRequest(model)
}

export function fromApiDetails(record: AnimalApiResponse): AnimalDetailsModel {
  return {
    name: record.identifier,
    breed: { value: record.breedId, label: record.breedName ?? '' },
    type: record.type ?? '',
    gender: record.gender ?? '',
    mother: {
      value: record.animalMotherId ?? '',
      label: record.animalMotherIdentifier ?? '',
    },
    bornDate: record.bornDate ? fromLocalDate(record.bornDate) : null,
    bornWeight:
      record.bornWeight != null ? fromApiWeight(record.bornWeight) : '',
    bornCondition: record.bornCondition ?? '',
  }
}

export function fromApiListItem(record: AnimalApiResponse): AnimalModel {
  return {
    id: record.id,
    name: record.identifier,
    breed: record.breedName ?? '',
    weight: record.currentWeight != null ? String(record.currentWeight) : '',
    ecc: record.ecc != null ? String(record.ecc) : '',
    milkProduction: '',
  }
}
