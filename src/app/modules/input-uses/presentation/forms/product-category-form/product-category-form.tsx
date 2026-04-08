import { CreateProductCategoryForm } from './create-product-category-form'
import { EditProductCategoryForm } from './edit-product-category-form'

type ProductCategoryFormProps = {
  id?: string | number
}

export function ProductCategoryForm({
  id,
}: Readonly<ProductCategoryFormProps>) {
  if (id) {
    return <EditProductCategoryForm />
  }

  return <CreateProductCategoryForm />
}

ProductCategoryForm.displayName = 'ProductCategoryForm'
