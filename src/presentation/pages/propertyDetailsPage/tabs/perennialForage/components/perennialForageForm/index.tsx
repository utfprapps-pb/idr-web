import { CreatePerennialForageForm } from './createPerennialForageForm'
import { EditPerennialForageForm } from './editPerennialForageForm'

type PerennialForageFormProps = {
  id?: string
}

export const PerennialForageForm: React.FC<PerennialForageFormProps> = ({
  id,
}) => {
  if (id) {
    return <EditPerennialForageForm />
  }

  return <CreatePerennialForageForm />
}
