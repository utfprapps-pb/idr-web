import type { PerennialForageSchema } from './validation'

export const PROPERTY_DEFAULT_VALUES: PerennialForageSchema = {
  cultivation: {
    label: '',
    value: '',
  },
  area: '',
  averageCost: '',
  usefulLife: '',
  formation: new Date(),
  type: 'OWNED_LAND',
  observation: '',
}
