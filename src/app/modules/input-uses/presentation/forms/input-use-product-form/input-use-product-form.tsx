import { CreateInputUseProductForm } from './create-input-use-product-form'
import { EditInputUseProductForm } from './edit-input-use-product-form'

type InputUseProductFormProps = {
  readonly id?: number
}

export function InputUseProductForm({
  id,
}: Readonly<InputUseProductFormProps>) {
  if (id) {
    return <EditInputUseProductForm />
  }

  return <CreateInputUseProductForm />
}

InputUseProductForm.displayName = 'InputUseProductForm'
