import { CreatePropertyForm } from './create-property-form'
import { EditPropertyForm } from './edit-property-form'

type PropertyFormProps = {
  readonly id?: string
}

export function PropertyForm({ id }: PropertyFormProps) {
  if (id) {
    return <EditPropertyForm />
  }

  return <CreatePropertyForm />
}

PropertyForm.displayName = 'PropertyForm'
