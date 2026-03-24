import type { AnimalPregnancyDiagnosisFormSchema } from '../../validations/animal-pregnancy-diagnosis-form-schema'

export const ANIMAL_PREGNANCY_DIAGNOSIS_INITIAL_FORM_DATA: AnimalPregnancyDiagnosisFormSchema =
  {
    date: new Date(),
    lastInseminationDate: new Date(),
  }
