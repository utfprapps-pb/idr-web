import type { ForageFormSchema } from '../../validations/forage-form-schema'

export const FORAGE_INITIAL_FORM_DATA: ForageFormSchema = {
  cultivation: {
    label: '',
    value: '',
  },
  area: '',
  averageCost: '',
  usefulLife: '',
  formation: new Date(),
  ownershipType: 'OWNED_LAND',
  growthCycle: 'PERENNIAL',
  observation: '',
}
