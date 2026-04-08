import { CreateInputUseProductCategoryForm } from './create-input-use-product-category-form'
import { EditInputUseProductCategoryForm } from './edit-input-use-product-category-form'

type InputUseProductCategoryFormProps = {
  id?: string | number
}

export function InputUseProductCategoryForm({
  id,
}: Readonly<InputUseProductCategoryFormProps>) {
  if (id) {
    return <EditInputUseProductCategoryForm />
  }

  return <CreateInputUseProductCategoryForm />
}

InputUseProductCategoryForm.displayName = 'InputUseProductCategoryForm'
