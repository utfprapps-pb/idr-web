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
