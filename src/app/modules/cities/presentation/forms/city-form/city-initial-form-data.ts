import type { CityFormSchema } from '../../validations/city-form-schema'

export const CITY_INITIAL_FORM_DATA = {
  name: '',
  state: undefined,
  regionId: '',
} satisfies Partial<CityFormSchema>
