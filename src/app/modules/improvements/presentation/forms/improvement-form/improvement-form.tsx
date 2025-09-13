import { CreateImprovementForm } from './create-improvement-form'
import { EditImprovementForm } from './edit-improvement-form'

type ImprovementFormProps = {
  readonly id?: number
}

export function ImprovementForm({ id }: ImprovementFormProps) {
  if (id) {
    return <EditImprovementForm />
  }

  return <CreateImprovementForm />
}
