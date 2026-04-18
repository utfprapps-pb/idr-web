import type { InputUseProductFormSchema } from '../../validations/input-use-product-form-schema'

export const INPUT_USE_PRODUCT_INITIAL_FORM_DATA: InputUseProductFormSchema = {
  name: '',
  category: {
    label: '',
    value: 0,
  },
  activeIngredient: {
    label: '',
    value: 0,
  },
}
