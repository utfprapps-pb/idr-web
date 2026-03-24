import type { AnimalDeathFormSchema } from '../../validations/animal-death-form-schema'

export const ANIMAL_DEATH_INITIAL_FORM_DATA: AnimalDeathFormSchema = {
  date: new Date(),
  reason: '',
}
