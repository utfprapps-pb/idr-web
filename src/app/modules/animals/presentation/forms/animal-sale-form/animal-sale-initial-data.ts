import type { AnimalSaleFormSchema } from '../../validations/animal-sale-form-schema'

export const ANIMAL_SALE_INITIAL_FORM_DATA: AnimalSaleFormSchema = {
  date: new Date(),
  reason: 'VOLUNTARY',
  weight: '',
  price: '',
  destination: 'SLAUGHTER',
}
