import type { PropertyFormSchema } from '../../validations/property-form-schema'

export const PROPERTY_INITIAL_FORM_DATA: PropertyFormSchema = {
  general: {
    name: '',
    producer: '',
    state: '',
    city: '',
    nakedAveragePricePerHectare: '',
    leaseAveragePricePerHectare: '',
    responsibleTechnicians: [],
  },
  collaborators: [
    {
      name: '',
      hoursPerDay: '',
    },
  ],
  totalArea: {
    dairyCattleFarming: 0,
    perennialPasture: 0,
    summerPlowing: 0,
    winterPlowing: 0,
  },
  localization: {
    latitude: '',
    longitude: '',
    images: [],
  },
}
