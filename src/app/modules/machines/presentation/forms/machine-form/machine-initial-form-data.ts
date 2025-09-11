import type { MachineFormSchema } from '../../validation/machine-form-schema'

export const MACHINE_INITIAL_FORM_DATA: MachineFormSchema = {
  name: '',
  amount: '',
  unitPrice: '',
  percentDairyCattle: '',
  usefulLife: '',
  acquisitionDate: new Date(),
  moneyDairyCattle: '',
}
