import { type ForageAvailabilityFormSchema } from '../../validations/forage-availability-form-schema'

export const FORAGE_AVAILABILITY_INITIAL_FORM_DATA: ForageAvailabilityFormSchema =
  {
    date: new Date(),
    forage: { label: '', value: 0 },
    entranceCm: '',
    residueCm: '',
    kgPerSquareMeter: '',
    paddockArea: '',
    efficiencyPercent: '',
    numberOfCows: '',
  }
