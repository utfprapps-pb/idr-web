import type { ImprovementFormData } from './validation'

export const PROPERTY_DEFAULT_VALUES: ImprovementFormData = {
  description: '',
  amount: '',
  unitPrice: '',
  percentDairyCattle: '',
  usefulLife: '',
  acquisitionDate: new Date(),
  moneyDairyCattle: '',
}
