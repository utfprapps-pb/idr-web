import { CreateMachineForm } from './createMachineForm'
import { EditMachineForm } from './editMachineForm'

type MachineFormProps = {
  id?: string
}

export const MachineForm: React.FC<MachineFormProps> = ({ id }) => {
  if (id) {
    return <EditMachineForm />
  }

  return <CreateMachineForm />
}
