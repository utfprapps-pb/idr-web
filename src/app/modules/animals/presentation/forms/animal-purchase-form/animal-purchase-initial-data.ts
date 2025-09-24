import type { AnimalPurchaseFormSchema } from '../../validations/animal-purchase-form-schema'

export const ANIMAL_PURCHASE_INITIAL_FORM_DATA: AnimalPurchaseFormSchema = {
  date: new Date(),
  birthDate: new Date(),
  weight: '0',
  price: '0',
}
