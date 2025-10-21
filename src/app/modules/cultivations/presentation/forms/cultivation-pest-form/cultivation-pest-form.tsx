import { CreateCultivationPestForm } from './create-cultivation-pest-form'
import { EditCultivationPestForm } from './edit-cultivation-pest-form'

type CultivationPestFormProps = {
  id?: number
}

export function CultivationPestForm({
  id,
}: Readonly<CultivationPestFormProps>) {
  if (id) {
    return <EditCultivationPestForm />
  }

  return <CreateCultivationPestForm />
}

CultivationPestForm.displayName = 'CultivationPestForm'
