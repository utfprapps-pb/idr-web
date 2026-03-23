import { CreateGeneralCultivationPestForm } from './create-general-cultivation-pest-form'
import { EditGeneralCultivationPestForm } from './edit-general-cultivation-pest-form'

type GeneralCultivationPestFormProps = {
  readonly id?: number
}

export function GeneralCultivationPestForm({
  id,
}: GeneralCultivationPestFormProps) {
  if (id) {
    return <EditGeneralCultivationPestForm />
  }

  return <CreateGeneralCultivationPestForm />
}
