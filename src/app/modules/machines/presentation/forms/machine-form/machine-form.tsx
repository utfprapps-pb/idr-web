import { CreateMachineForm } from './create-machine-form'
import { EditMachineForm } from './edit-machine-form'

type MachineFormProps = {
  id?: string
}

export function MachineForm({ id }: MachineFormProps) {
  if (id) {
    return <EditMachineForm />
  }

  return <CreateMachineForm />
}

MachineForm.displayName = 'MachineForm'
