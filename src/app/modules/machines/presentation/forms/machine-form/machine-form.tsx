import { CreateMachineForm } from './create-machine-form'
import { EditMachineForm } from './edit-machine-form'

type MachineFormProps = {
  readonly id?: number
}

export function MachineForm({ id }: MachineFormProps) {
  if (id) {
    return <EditMachineForm />
  }

  return <CreateMachineForm />
}

MachineForm.displayName = 'MachineForm'
