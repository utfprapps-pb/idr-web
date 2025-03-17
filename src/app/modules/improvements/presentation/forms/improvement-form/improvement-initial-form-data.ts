import type { ImprovementFormSchema } from '../../validation/improvement-form-schema'

export const IMPROVEMENT_INITIAL_FORM_DATA: ImprovementFormSchema = {
  description: '',
  amount: '',
  unitPrice: '',
  percentDairyCattle: '',
  usefulLife: '',
  acquisitionDate: new Date(),
  moneyDairyCattle: '',
}
