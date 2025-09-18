import type { ImprovementFormSchema } from '../../validation/improvement-form-schema'

export const IMPROVEMENT_INITIAL_FORM_DATA: ImprovementFormSchema = {
  type: '',
  name: '',
  amount: '',
  unitPrice: '',
  percentDairyCattle: '',
  lifespan: '',
  acquisitionDate: new Date(),
  moneyDairyCattle: '',
}
