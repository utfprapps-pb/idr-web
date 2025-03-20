import type { AnimalChildbirthFormSchema } from '../../validations/animal-childbirth-form-schema'

export const ANIMAL_CHILD_BIRTH_INITIAL_FORM_DATA: AnimalChildbirthFormSchema =
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
