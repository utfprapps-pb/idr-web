import { CreateInputUseActiveIngredientForm } from './create-input-use-active-ingredient-form'
import { EditInputUseActiveIngredientForm } from './edit-input-use-active-ingredient-form'

type InputUseActiveIngredientFormProps = {
  id?: string | number
}

export function InputUseActiveIngredientForm({
  id,
}: Readonly<InputUseActiveIngredientFormProps>) {
  if (id) {
    return <EditInputUseActiveIngredientForm />
  }

  return <CreateInputUseActiveIngredientForm />
}

InputUseActiveIngredientForm.displayName = 'InputUseActiveIngredientForm'
