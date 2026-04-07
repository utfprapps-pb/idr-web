import { CreateInputUseLocationForm } from './create-input-use-location-form'
import { EditInputUseLocationForm } from './edit-input-use-location-form'

type InputUseLocationFormProps = {
  id?: string | number
}

export function InputUseLocationForm({
  id,
}: Readonly<InputUseLocationFormProps>) {
  if (id) {
    return <EditInputUseLocationForm />
  }

  return <CreateInputUseLocationForm />
}

InputUseLocationForm.displayName = 'InputUseLocationForm'
