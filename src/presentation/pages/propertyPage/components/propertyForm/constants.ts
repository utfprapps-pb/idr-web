import type { PropertySchema } from './validation'

export const PROPERTY_DEFAULT_VALUES: PropertySchema = {
  general: {
    name: '',
    producer: '',
    state: '',
    city: '',
    nakedAveragePricePerHectare: '',
    leaseAveragePricePerHectare: '',
    responsibleTechnicians: [{ value: '', label: '' }],
  },
  collaborators: [
    {
      name: '',
      hoursPerDay: '',
    },
  ],
  totalArea: {
    dairyCattleFarming: '',
    perennialPasture: '',
    summerPlowing: '',
    winterPlowing: '',
  },
  localization: {
    latitude: '',
    longitude: '',
    images: [],
  },
}
