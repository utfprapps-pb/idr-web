import { missingRequiredFields } from './event-mock-rules'

import type { AnimalMedicationApiRequest } from '../../data/mappers/animal-medication-api-mapper'

type MedicationBody = {
  [TKey in keyof AnimalMedicationApiRequest]?: unknown
}

/**
 * Campos que a API exige na medicação: data (`@NotNull` no request), dose e
 * via (validação do agregado `Medication`).
 */
const MEDICATION_REQUIRED_FIELDS = [
  'applicationDate',
  'appliedDose',
  'applicationWay',
] as const

/**
 * Campos obrigatórios ausentes na medicação. O nome do produto só é exigido
 * sem `productId`: com ele, a API copia o nome do catálogo.
 */
export function missingMedicationFields(
  body: MedicationBody | null | undefined
): (keyof AnimalMedicationApiRequest)[] {
  const missing: (keyof AnimalMedicationApiRequest)[] = missingRequiredFields(
    body,
    MEDICATION_REQUIRED_FIELDS
  )

  if (!body?.productId) {
    missing.push(...missingRequiredFields(body, ['productName'] as const))
  }

  return missing
}
