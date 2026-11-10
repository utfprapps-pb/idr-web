import type { AnimalFormSchema } from '../../validations/animal-form-schema'

export const ANIMAL_INITIAL_FORM_DATA: AnimalFormSchema = {
  name: '',
  breed: {
    label: '',
    value: '',
  },
}
