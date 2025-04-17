import type { AnimalDiseaseFormSchema } from '../../validations/animal-disease-form-schema'

export const ANIMAL_DISEASE_INITIAL_FORM_DATA: AnimalDiseaseFormSchema = {
  diagnosticDate: new Date(),
  diagnostic: '',
}
