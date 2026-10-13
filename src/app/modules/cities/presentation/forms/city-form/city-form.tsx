import { CreateCityForm } from './create-city-form'
import { EditCityForm } from './edit-city-form'

type CityFormProps = {
  readonly id?: string
}

export function CityForm({ id }: CityFormProps) {
  if (id) {
    return <EditCityForm />
  }

  return <CreateCityForm />
}

CityForm.displayName = 'CityForm'
