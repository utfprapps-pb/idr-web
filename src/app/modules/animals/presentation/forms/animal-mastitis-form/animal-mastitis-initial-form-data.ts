import type { AnimalMastitisFormSchema } from '../../validations/animal-mastitis-form-schema'

export const ANIMAL_MASTITIS_INITIAL_FORM_DATA: AnimalMastitisFormSchema = {
  date: new Date(),
  type: 'CLINICAL',
  ad: 'PLUS-ONE',
  ae: 'PLUS-ONE',
  pd: 'PLUS-ONE',
  pe: 'PLUS-ONE',
}
