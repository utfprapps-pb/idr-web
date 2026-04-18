import type { AnimalMedicationFormSchema } from '../../validations/animal-medication-form-schema'

export const ANIMAL_MEDICATION_INITIAL_FORM_DATA: AnimalMedicationFormSchema = {
  date: new Date(),
  applicationMethod: 'IM',
  appliedDose: '',
  product: {
    label: '',
    value: 0,
  },
}
