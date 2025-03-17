import { CreateForageForm } from './create-forage-form'
import { EditForageForm } from './edit-forage-form'

type ForageFormProps = {
  id?: string
}

export function ForageForm({ id }: ForageFormProps) {
  if (id) {
    return <EditForageForm />
  }

  return <CreateForageForm />
}
