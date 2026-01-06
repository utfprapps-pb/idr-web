import { CreateGeneralCultivationForm } from './create-general-cultivation-form'
import { EditGeneralCultivationForm } from './edit-general-cultivation-form'

type GeneralCultivationFormProps = {
  readonly id?: number
}

export function GeneralCultivationForm({ id }: GeneralCultivationFormProps) {
  if (id) {
    return <EditGeneralCultivationForm />
  }

  return <CreateGeneralCultivationForm />
}
