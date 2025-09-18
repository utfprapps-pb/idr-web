import type { AnimalInseminationFormSchema } from '../../validations/animal-insemination-form-schema'

export const ANIMAL_INSEMINATION_INITIAL_FORM_DATA: AnimalInseminationFormSchema =
  {
    date: new Date(),
    sire: {
      label: '',
      value: 0,
    },
  }
