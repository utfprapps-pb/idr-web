import { CreateForageForm } from './createForageForm'
import { EditForageForm } from './editForageForm'

type ForageFormProps = {
  id?: string
}

export const ForageForm: React.FC<ForageFormProps> = ({ id }) => {
  if (id) {
    return <EditForageForm />
  }

  return <CreateForageForm />
}
