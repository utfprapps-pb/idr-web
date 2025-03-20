import type { AnimalChildBirthFormSchema } from '../../validations/animal-childbirth-form-schema'

export const ANIMAL_CHILD_BIRTH_INITIAL_FORM_DATA: AnimalChildBirthFormSchema =
  {
    date: new Date(),
    condition: 'ALIVE',
    gender: 'MALE',
    weight: '',
    breed: {
      label: '',
      value: '',
    },
  }
