import { CreateForageAvailabilityForm } from './create-forage-availability-form'
import { EditForageAvailabilityForm } from './edit-forage-availability-form'

type ForageAvailabilityFormProps = {
  id?: string | number
}

export function ForageAvailabilityForm({
  id,
}: Readonly<ForageAvailabilityFormProps>) {
  if (id) {
    return <EditForageAvailabilityForm />
  }

  return <CreateForageAvailabilityForm />
}

ForageAvailabilityForm.displayName = 'ForageAvailabilityForm'
