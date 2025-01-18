import { CreateImprovementForm } from './createImprovementForm'
import { EditImprovementForm } from './editImprovementForm'

type ImprovementFormProps = {
  id?: string
}

export const ImprovementForm: React.FC<ImprovementFormProps> = ({ id }) => {
  if (id) {
    return <EditImprovementForm />
  }

  return <CreateImprovementForm />
}
