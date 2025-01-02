import type { ForageFormData } from './validation'

export const PROPERTY_DEFAULT_VALUES: ForageFormData = {
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
